var P1=Object.defineProperty;var q1=(Ft,Oe,In)=>Oe in Ft?P1(Ft,Oe,{enumerable:!0,configurable:!0,writable:!0,value:In}):Ft[Oe]=In;var le=(Ft,Oe,In)=>q1(Ft,typeof Oe!="symbol"?Oe+"":Oe,In);(function(){"use strict";var nu;function Ft(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Oe=Ft();function In(e){Oe=e}var Xi={exec:()=>null};function J(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(He.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var He={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},_v=/^(?:[ \t]*(?:\n|$))+/,Ev=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,xv=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ji=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Sv=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Gr=/(?:[*+-]|\d{1,9}[.)])/,vu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,bu=J(vu).replace(/bull/g,Gr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Iv=J(vu).replace(/bull/g,Gr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),zr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Lv=/^[^\n]+/,Vr=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Tv=J(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Vr).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Av=J(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Gr).getRegex(),Ia="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Wr=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Cv=J("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Wr).replace("tag",Ia).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),yu=J(zr).replace("hr",Ji).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ia).getRegex(),Bv=J(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",yu).getRegex(),Kr={blockquote:Bv,code:Ev,def:Tv,fences:xv,heading:Sv,hr:Ji,html:Cv,lheading:bu,list:Av,newline:_v,paragraph:yu,table:Xi,text:Lv},wu=J("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ji).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ia).getRegex(),Dv={...Kr,lheading:Iv,table:wu,paragraph:J(zr).replace("hr",Ji).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",wu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ia).getRegex()},Mv={...Kr,html:J(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Wr).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Xi,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:J(zr).replace("hr",Ji).replace("heading",` *#{1,6} *[^
]`).replace("lheading",bu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},jv=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Rv=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,$u=/^( {2,}|\\)\n(?!\s*$)/,Pv=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,La=/[\p{P}\p{S}]/u,Yr=/[\s\p{P}\p{S}]/u,ku=/[^\s\p{P}\p{S}]/u,qv=J(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Yr).getRegex(),_u=/(?!~)[\p{P}\p{S}]/u,Nv=/(?!~)[\s\p{P}\p{S}]/u,Ov=/(?:[^\s\p{P}\p{S}]|~)/u,Hv=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Eu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Fv=J(Eu,"u").replace(/punct/g,La).getRegex(),Uv=J(Eu,"u").replace(/punct/g,_u).getRegex(),xu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Gv=J(xu,"gu").replace(/notPunctSpace/g,ku).replace(/punctSpace/g,Yr).replace(/punct/g,La).getRegex(),zv=J(xu,"gu").replace(/notPunctSpace/g,Ov).replace(/punctSpace/g,Nv).replace(/punct/g,_u).getRegex(),Vv=J("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ku).replace(/punctSpace/g,Yr).replace(/punct/g,La).getRegex(),Wv=J(/\\(punct)/,"gu").replace(/punct/g,La).getRegex(),Kv=J(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Yv=J(Wr).replace("(?:-->|$)","-->").getRegex(),Qv=J("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Yv).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ta=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Zv=J(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ta).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Su=J(/^!?\[(label)\]\[(ref)\]/).replace("label",Ta).replace("ref",Vr).getRegex(),Iu=J(/^!?\[(ref)\](?:\[\])?/).replace("ref",Vr).getRegex(),Xv=J("reflink|nolink(?!\\()","g").replace("reflink",Su).replace("nolink",Iu).getRegex(),Qr={_backpedal:Xi,anyPunctuation:Wv,autolink:Kv,blockSkip:Hv,br:$u,code:Rv,del:Xi,emStrongLDelim:Fv,emStrongRDelimAst:Gv,emStrongRDelimUnd:Vv,escape:jv,link:Zv,nolink:Iu,punctuation:qv,reflink:Su,reflinkSearch:Xv,tag:Qv,text:Pv,url:Xi},Jv={...Qr,link:J(/^!?\[(label)\]\((.*?)\)/).replace("label",Ta).getRegex(),reflink:J(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ta).getRegex()},Zr={...Qr,emStrongRDelimAst:zv,emStrongLDelim:Uv,url:J(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},eb={...Zr,br:J($u).replace("{2,}","*").getRegex(),text:J(Zr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Aa={normal:Kr,gfm:Dv,pedantic:Mv},es={normal:Qr,gfm:Zr,breaks:eb,pedantic:Jv},tb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Lu=e=>tb[e];function St(e,t){if(t){if(He.escapeTest.test(e))return e.replace(He.escapeReplace,Lu)}else if(He.escapeTestNoEncode.test(e))return e.replace(He.escapeReplaceNoEncode,Lu);return e}function Tu(e){try{e=encodeURI(e).replace(He.percentDecode,"%")}catch{return null}return e}function Au(e,t){var a;const n=e.replace(He.findPipe,(o,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(He.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(He.slashPipe,"|");return i}function ts(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function nb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Cu(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function ib(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var Ca=class{constructor(e){le(this,"options");le(this,"rules");le(this,"lexer");this.options=e||Oe}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ts(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=ib(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=ts(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ts(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=ts(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),o=!0;else if(!o)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=u,n.length===0)break;const f=a.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const g=f,b=g.raw+`
`+n.join(`
`),y=this.blockquote(b);a[a.length-1]=y,i=i.substring(0,i.length-g.raw.length)+y.raw,s=s.substring(0,s.length-g.text.length)+y.text;break}else if((f==null?void 0:f.type)==="list"){const g=f,b=g.raw+`
`+n.join(`
`),y=this.list(b);a[a.length-1]=y,i=i.substring(0,i.length-f.raw.length)+y.raw,s=s.substring(0,s.length-g.raw.length)+y.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let l=!1,c="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,_=>" ".repeat(3*_.length)),f=e.split(`
`,1)[0],g=!u.trim(),b=0;if(this.options.pedantic?(b=2,d=u.trimStart()):g?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,d=u.slice(b),b+=t[1].length),g&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),l=!0),!l){const _=this.rules.other.nextBulletRegex(b),L=this.rules.other.hrRegex(b),T=this.rules.other.fencesBeginRegex(b),j=this.rules.other.headingBeginRegex(b),E=this.rules.other.htmlBeginRegex(b);for(;e;){const w=e.split(`
`,1)[0];let D;if(f=w,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),D=f):D=f.replace(this.rules.other.tabCharGlobal,"    "),T.test(f)||j.test(f)||E.test(f)||_.test(f)||L.test(f))break;if(D.search(this.rules.other.nonSpaceChar)>=b||!f.trim())d+=`
`+D.slice(b);else{if(g||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||T.test(u)||j.test(u)||L.test(u))break;d+=`
`+f}!g&&!f.trim()&&(g=!0),c+=w+`
`,e=e.substring(w.length+1),u=D.slice(b)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let y=null,x;this.options.gfm&&(y=this.rules.other.listIsTask.exec(d),y&&(x=y[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!y,checked:x,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(u=>u.type==="space"),d=c.length>0&&c.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Au(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(Au(r,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=ts(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=nb(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Cu(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Cu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,l=a,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const u=[...i[0]][0].length,f=e.slice(0,a+i.index+u+r);if(Math.min(a,r)%2){const b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}const g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ut=class gu{constructor(t){le(this,"tokens");le(this,"options");le(this,"state");le(this,"tokenizer");le(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Oe,this.options.tokenizer=this.options.tokenizer||new Ca,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:He,block:Aa.normal,inline:es.normal};this.options.pedantic?(n.block=Aa.pedantic,n.inline=es.pedantic):this.options.gfm&&(n.block=Aa.gfm,this.options.breaks?n.inline=es.breaks:n.inline=es.gfm),this.tokenizer.rules=n}static get rules(){return{block:Aa,inline:es}}static lex(t,n){return new gu(n).lex(t)}static lexInline(t,n){return new gu(n).inlineTokens(t)}lex(t){t=t.replace(He.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(He.tabCharGlobal,"    ").replace(He.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const d=t.slice(1);let u;this.options.extensions.startBlock.forEach(f=>{u=f.call({lexer:this},d),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const f=n.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let u=t;if((c=this.options.extensions)!=null&&c.startInline){let f=1/0;const g=t.slice(1);let b;this.options.extensions.startInline.forEach(y=>{b=y.call({lexer:this},g),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(u)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},Ba=class{constructor(e){le(this,"options");le(this,"parser");this.options=e||Oe}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(He.notSpaceStart))==null?void 0:a[0],s=e.replace(He.endingNewline,"")+`
`;return i?'<pre><code class="language-'+St(i)+'">'+(n?s:St(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:St(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let o=0;o<e.items.length;o++){const r=e.items[o];i+=this.listitem(r)}const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+St(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const a=e.rows[s];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${St(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=Tu(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+St(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=Tu(e);if(s===null)return St(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${St(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:St(e.text)}},Xr=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Gt=class hu{constructor(t){le(this,"options");le(this,"renderer");le(this,"textRenderer");this.options=t||Oe,this.options.renderer=this.options.renderer||new Ba,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Xr}static parse(t,n){return new hu(n).parse(t)}static parseInline(t,n){return new hu(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},Da=(nu=class{constructor(e){le(this,"options");le(this,"block");this.options=e||Oe}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Ut.lex:Ut.lexInline}provideParser(){return this.block?Gt.parse:Gt.parseInline}},le(nu,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),nu),sb=class{constructor(...e){le(this,"defaults",Ft());le(this,"options",this.setOptions);le(this,"parse",this.parseMarkdown(!0));le(this,"parseInline",this.parseMarkdown(!1));le(this,"Parser",Gt);le(this,"Renderer",Ba);le(this,"TextRenderer",Xr);le(this,"Lexer",Ut);le(this,"Tokenizer",Ca);le(this,"Hooks",Da);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new Ba(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new Ca(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new Da;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=s[o];Da.passThroughHooks.has(a)?s[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(u=>l.call(s,u));const d=r.call(s,c);return l.call(s,d)}:s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ut.lex(e,t??this.defaults)}parser(e,t){return Gt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Ut.lex:Ut.lexInline,l=a.hooks?a.hooks.provideParser():e?Gt.parse:Gt.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>l(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let d=l(c,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+St(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},Ln=new sb;function Q(e,t){return Ln.parse(e,t)}Q.options=Q.setOptions=function(e){return Ln.setOptions(e),Q.defaults=Ln.defaults,In(Q.defaults),Q},Q.getDefaults=Ft,Q.defaults=Oe,Q.use=function(...e){return Ln.use(...e),Q.defaults=Ln.defaults,In(Q.defaults),Q},Q.walkTokens=function(e,t){return Ln.walkTokens(e,t)},Q.parseInline=Ln.parseInline,Q.Parser=Gt,Q.parser=Gt.parse,Q.Renderer=Ba,Q.TextRenderer=Xr,Q.Lexer=Ut,Q.lexer=Ut.lex,Q.Tokenizer=Ca,Q.Hooks=Da,Q.parse=Q,Q.options,Q.setOptions,Q.use,Q.walkTokens,Q.parseInline,Gt.parse,Ut.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Bu,setPrototypeOf:Du,isFrozen:ab,getPrototypeOf:ob,getOwnPropertyDescriptor:rb}=Object;let{freeze:Fe,seal:lt,create:Jr}=Object,{apply:el,construct:tl}=typeof Reflect<"u"&&Reflect;Fe||(Fe=function(t){return t}),lt||(lt=function(t){return t}),el||(el=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),tl||(tl=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Ma=Ge(Array.prototype.forEach),lb=Ge(Array.prototype.lastIndexOf),Mu=Ge(Array.prototype.pop),ns=Ge(Array.prototype.push),cb=Ge(Array.prototype.splice),ja=Ge(String.prototype.toLowerCase),nl=Ge(String.prototype.toString),il=Ge(String.prototype.match),is=Ge(String.prototype.replace),db=Ge(String.prototype.indexOf),ub=Ge(String.prototype.trim),vt=Ge(Object.prototype.hasOwnProperty),Ue=Ge(RegExp.prototype.test),ss=pb(TypeError);function Ge(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return el(e,t,i)}}function pb(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return tl(e,n)}}function V(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ja;Du&&Du(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(ab(t)||(t[i]=a),s=a)}e[s]=!0}return e}function mb(e){for(let t=0;t<e.length;t++)vt(e,t)||(e[t]=null);return e}function It(e){const t=Jr(null);for(const[n,i]of Bu(e))vt(e,n)&&(Array.isArray(i)?t[n]=mb(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=It(i):t[n]=i);return t}function as(e,t){for(;e!==null;){const i=rb(e,t);if(i){if(i.get)return Ge(i.get);if(typeof i.value=="function")return Ge(i.value)}e=ob(e)}function n(){return null}return n}const ju=Fe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),sl=Fe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),al=Fe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),fb=Fe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ol=Fe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),gb=Fe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ru=Fe(["#text"]),Pu=Fe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),rl=Fe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),qu=Fe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ra=Fe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),hb=lt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),vb=lt(/<%[\w\W]*|[\w\W]*%>/gm),bb=lt(/\$\{[\w\W]*/gm),yb=lt(/^data-[\-\w.\u00B7-\uFFFF]+$/),wb=lt(/^aria-[\-\w]+$/),Nu=lt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),$b=lt(/^(?:\w+script|data):/i),kb=lt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ou=lt(/^html$/i),_b=lt(/^[a-z][.\w]*(-[.\w]+)+$/i);var Hu=Object.freeze({__proto__:null,ARIA_ATTR:wb,ATTR_WHITESPACE:kb,CUSTOM_ELEMENT:_b,DATA_ATTR:yb,DOCTYPE_NAME:Ou,ERB_EXPR:vb,IS_ALLOWED_URI:Nu,IS_SCRIPT_OR_DATA:$b,MUSTACHE_EXPR:hb,TMPLIT_EXPR:bb});const os={element:1,text:3,progressingInstruction:7,comment:8,document:9},Eb=function(){return typeof window>"u"?null:window},xb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Fu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Uu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Eb();const t=q=>Uu(q);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==os.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:f,trustedTypes:g}=e,b=l.prototype,y=as(b,"cloneNode"),x=as(b,"remove"),_=as(b,"nextSibling"),L=as(b,"childNodes"),T=as(b,"parentNode");if(typeof o=="function"){const q=n.createElement("template");q.content&&q.content.ownerDocument&&(n=q.content.ownerDocument)}let j,E="";const{implementation:w,createNodeIterator:D,createDocumentFragment:H,getElementsByTagName:te}=n,{importNode:ae}=i;let ne=Fu();t.isSupported=typeof Bu=="function"&&typeof T=="function"&&w&&w.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:S,ERB_EXPR:M,TMPLIT_EXPR:P,DATA_ATTR:Z,ARIA_ATTR:ve,IS_SCRIPT_OR_DATA:Me,ATTR_WHITESPACE:qe,CUSTOM_ELEMENT:Sn}=Hu;let{IS_ALLOWED_URI:B}=Hu,U=null;const Y=V({},[...ju,...sl,...al,...ol,...Ru]);let $e=null;const _a=V({},[...Pu,...rl,...qu,...Ra]);let be=Object.seal(Jr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ea=null,iu=null;const zi=Object.seal(Jr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let iv=!0,su=!0,sv=!1,av=!0,Vi=!1,Pr=!0,Zn=!1,au=!1,ou=!1,Wi=!1,qr=!1,Nr=!1,ov=!0,rv=!1;const T1="user-content-";let ru=!0,xa=!1,Ki={},Ot=null;const lu=V({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let lv=null;const cv=V({},["audio","video","img","source","image","track"]);let cu=null;const dv=V({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Or="http://www.w3.org/1998/Math/MathML",Hr="http://www.w3.org/2000/svg",sn="http://www.w3.org/1999/xhtml";let Yi=sn,du=!1,uu=null;const A1=V({},[Or,Hr,sn],nl);let Fr=V({},["mi","mo","mn","ms","mtext"]),Ur=V({},["annotation-xml"]);const C1=V({},["title","style","font","a","script"]);let Sa=null;const B1=["application/xhtml+xml","text/html"],D1="text/html";let xe=null,Qi=null;const M1=n.createElement("form"),uv=function(v){return v instanceof RegExp||v instanceof Function},pu=function(){let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Qi&&Qi===v)){if((!v||typeof v!="object")&&(v={}),v=It(v),Sa=B1.indexOf(v.PARSER_MEDIA_TYPE)===-1?D1:v.PARSER_MEDIA_TYPE,xe=Sa==="application/xhtml+xml"?nl:ja,U=vt(v,"ALLOWED_TAGS")?V({},v.ALLOWED_TAGS,xe):Y,$e=vt(v,"ALLOWED_ATTR")?V({},v.ALLOWED_ATTR,xe):_a,uu=vt(v,"ALLOWED_NAMESPACES")?V({},v.ALLOWED_NAMESPACES,nl):A1,cu=vt(v,"ADD_URI_SAFE_ATTR")?V(It(dv),v.ADD_URI_SAFE_ATTR,xe):dv,lv=vt(v,"ADD_DATA_URI_TAGS")?V(It(cv),v.ADD_DATA_URI_TAGS,xe):cv,Ot=vt(v,"FORBID_CONTENTS")?V({},v.FORBID_CONTENTS,xe):lu,Ea=vt(v,"FORBID_TAGS")?V({},v.FORBID_TAGS,xe):It({}),iu=vt(v,"FORBID_ATTR")?V({},v.FORBID_ATTR,xe):It({}),Ki=vt(v,"USE_PROFILES")?v.USE_PROFILES:!1,iv=v.ALLOW_ARIA_ATTR!==!1,su=v.ALLOW_DATA_ATTR!==!1,sv=v.ALLOW_UNKNOWN_PROTOCOLS||!1,av=v.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Vi=v.SAFE_FOR_TEMPLATES||!1,Pr=v.SAFE_FOR_XML!==!1,Zn=v.WHOLE_DOCUMENT||!1,Wi=v.RETURN_DOM||!1,qr=v.RETURN_DOM_FRAGMENT||!1,Nr=v.RETURN_TRUSTED_TYPE||!1,ou=v.FORCE_BODY||!1,ov=v.SANITIZE_DOM!==!1,rv=v.SANITIZE_NAMED_PROPS||!1,ru=v.KEEP_CONTENT!==!1,xa=v.IN_PLACE||!1,B=v.ALLOWED_URI_REGEXP||Nu,Yi=v.NAMESPACE||sn,Fr=v.MATHML_TEXT_INTEGRATION_POINTS||Fr,Ur=v.HTML_INTEGRATION_POINTS||Ur,be=v.CUSTOM_ELEMENT_HANDLING||{},v.CUSTOM_ELEMENT_HANDLING&&uv(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(be.tagNameCheck=v.CUSTOM_ELEMENT_HANDLING.tagNameCheck),v.CUSTOM_ELEMENT_HANDLING&&uv(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(be.attributeNameCheck=v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),v.CUSTOM_ELEMENT_HANDLING&&typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(be.allowCustomizedBuiltInElements=v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Vi&&(su=!1),qr&&(Wi=!0),Ki&&(U=V({},Ru),$e=[],Ki.html===!0&&(V(U,ju),V($e,Pu)),Ki.svg===!0&&(V(U,sl),V($e,rl),V($e,Ra)),Ki.svgFilters===!0&&(V(U,al),V($e,rl),V($e,Ra)),Ki.mathMl===!0&&(V(U,ol),V($e,qu),V($e,Ra))),v.ADD_TAGS&&(typeof v.ADD_TAGS=="function"?zi.tagCheck=v.ADD_TAGS:(U===Y&&(U=It(U)),V(U,v.ADD_TAGS,xe))),v.ADD_ATTR&&(typeof v.ADD_ATTR=="function"?zi.attributeCheck=v.ADD_ATTR:($e===_a&&($e=It($e)),V($e,v.ADD_ATTR,xe))),v.ADD_URI_SAFE_ATTR&&V(cu,v.ADD_URI_SAFE_ATTR,xe),v.FORBID_CONTENTS&&(Ot===lu&&(Ot=It(Ot)),V(Ot,v.FORBID_CONTENTS,xe)),v.ADD_FORBID_CONTENTS&&(Ot===lu&&(Ot=It(Ot)),V(Ot,v.ADD_FORBID_CONTENTS,xe)),ru&&(U["#text"]=!0),Zn&&V(U,["html","head","body"]),U.table&&(V(U,["tbody"]),delete Ea.tbody),v.TRUSTED_TYPES_POLICY){if(typeof v.TRUSTED_TYPES_POLICY.createHTML!="function")throw ss('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof v.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ss('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=v.TRUSTED_TYPES_POLICY,E=j.createHTML("")}else j===void 0&&(j=xb(g,s)),j!==null&&typeof E=="string"&&(E=j.createHTML(""));Fe&&Fe(v),Qi=v}},pv=V({},[...sl,...al,...fb]),mv=V({},[...ol,...gb]),j1=function(v){let I=T(v);(!I||!I.tagName)&&(I={namespaceURI:Yi,tagName:"template"});const R=ja(v.tagName),me=ja(I.tagName);return uu[v.namespaceURI]?v.namespaceURI===Hr?I.namespaceURI===sn?R==="svg":I.namespaceURI===Or?R==="svg"&&(me==="annotation-xml"||Fr[me]):!!pv[R]:v.namespaceURI===Or?I.namespaceURI===sn?R==="math":I.namespaceURI===Hr?R==="math"&&Ur[me]:!!mv[R]:v.namespaceURI===sn?I.namespaceURI===Hr&&!Ur[me]||I.namespaceURI===Or&&!Fr[me]?!1:!mv[R]&&(C1[R]||!pv[R]):!!(Sa==="application/xhtml+xml"&&uu[v.namespaceURI]):!1},Ht=function(v){ns(t.removed,{element:v});try{T(v).removeChild(v)}catch{x(v)}},Xn=function(v,I){try{ns(t.removed,{attribute:I.getAttributeNode(v),from:I})}catch{ns(t.removed,{attribute:null,from:I})}if(I.removeAttribute(v),v==="is")if(Wi||qr)try{Ht(I)}catch{}else try{I.setAttribute(v,"")}catch{}},fv=function(v){let I=null,R=null;if(ou)v="<remove></remove>"+v;else{const ke=il(v,/^[\r\n\t ]+/);R=ke&&ke[0]}Sa==="application/xhtml+xml"&&Yi===sn&&(v='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+v+"</body></html>");const me=j?j.createHTML(v):v;if(Yi===sn)try{I=new f().parseFromString(me,Sa)}catch{}if(!I||!I.documentElement){I=w.createDocument(Yi,"template",null);try{I.documentElement.innerHTML=du?E:me}catch{}}const Ne=I.body||I.documentElement;return v&&R&&Ne.insertBefore(n.createTextNode(R),Ne.childNodes[0]||null),Yi===sn?te.call(I,Zn?"html":"body")[0]:Zn?I.documentElement:Ne},gv=function(v){return D.call(v.ownerDocument||v,v,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},mu=function(v){return v instanceof u&&(typeof v.nodeName!="string"||typeof v.textContent!="string"||typeof v.removeChild!="function"||!(v.attributes instanceof d)||typeof v.removeAttribute!="function"||typeof v.setAttribute!="function"||typeof v.namespaceURI!="string"||typeof v.insertBefore!="function"||typeof v.hasChildNodes!="function")},hv=function(v){return typeof r=="function"&&v instanceof r};function an(q,v,I){Ma(q,R=>{R.call(t,v,I,Qi)})}const vv=function(v){let I=null;if(an(ne.beforeSanitizeElements,v,null),mu(v))return Ht(v),!0;const R=xe(v.nodeName);if(an(ne.uponSanitizeElement,v,{tagName:R,allowedTags:U}),Pr&&v.hasChildNodes()&&!hv(v.firstElementChild)&&Ue(/<[/\w!]/g,v.innerHTML)&&Ue(/<[/\w!]/g,v.textContent)||v.nodeType===os.progressingInstruction||Pr&&v.nodeType===os.comment&&Ue(/<[/\w]/g,v.data))return Ht(v),!0;if(!(zi.tagCheck instanceof Function&&zi.tagCheck(R))&&(!U[R]||Ea[R])){if(!Ea[R]&&yv(R)&&(be.tagNameCheck instanceof RegExp&&Ue(be.tagNameCheck,R)||be.tagNameCheck instanceof Function&&be.tagNameCheck(R)))return!1;if(ru&&!Ot[R]){const me=T(v)||v.parentNode,Ne=L(v)||v.childNodes;if(Ne&&me){const ke=Ne.length;for(let at=ke-1;at>=0;--at){const on=y(Ne[at],!0);on.__removalCount=(v.__removalCount||0)+1,me.insertBefore(on,_(v))}}}return Ht(v),!0}return v instanceof l&&!j1(v)||(R==="noscript"||R==="noembed"||R==="noframes")&&Ue(/<\/no(script|embed|frames)/i,v.innerHTML)?(Ht(v),!0):(Vi&&v.nodeType===os.text&&(I=v.textContent,Ma([S,M,P],me=>{I=is(I,me," ")}),v.textContent!==I&&(ns(t.removed,{element:v.cloneNode()}),v.textContent=I)),an(ne.afterSanitizeElements,v,null),!1)},bv=function(v,I,R){if(ov&&(I==="id"||I==="name")&&(R in n||R in M1))return!1;if(!(su&&!iu[I]&&Ue(Z,I))){if(!(iv&&Ue(ve,I))){if(!(zi.attributeCheck instanceof Function&&zi.attributeCheck(I,v))){if(!$e[I]||iu[I]){if(!(yv(v)&&(be.tagNameCheck instanceof RegExp&&Ue(be.tagNameCheck,v)||be.tagNameCheck instanceof Function&&be.tagNameCheck(v))&&(be.attributeNameCheck instanceof RegExp&&Ue(be.attributeNameCheck,I)||be.attributeNameCheck instanceof Function&&be.attributeNameCheck(I,v))||I==="is"&&be.allowCustomizedBuiltInElements&&(be.tagNameCheck instanceof RegExp&&Ue(be.tagNameCheck,R)||be.tagNameCheck instanceof Function&&be.tagNameCheck(R))))return!1}else if(!cu[I]){if(!Ue(B,is(R,qe,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&v!=="script"&&db(R,"data:")===0&&lv[v])){if(!(sv&&!Ue(Me,is(R,qe,"")))){if(R)return!1}}}}}}}return!0},yv=function(v){return v!=="annotation-xml"&&il(v,Sn)},wv=function(v){an(ne.beforeSanitizeAttributes,v,null);const{attributes:I}=v;if(!I||mu(v))return;const R={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:$e,forceKeepAttr:void 0};let me=I.length;for(;me--;){const Ne=I[me],{name:ke,namespaceURI:at,value:on}=Ne,Zi=xe(ke),fu=on;let je=ke==="value"?fu:ub(fu);if(R.attrName=Zi,R.attrValue=je,R.keepAttr=!0,R.forceKeepAttr=void 0,an(ne.uponSanitizeAttribute,v,R),je=R.attrValue,rv&&(Zi==="id"||Zi==="name")&&(Xn(ke,v),je=T1+je),Pr&&Ue(/((--!?|])>)|<\/(style|title|textarea)/i,je)){Xn(ke,v);continue}if(Zi==="attributename"&&il(je,"href")){Xn(ke,v);continue}if(R.forceKeepAttr)continue;if(!R.keepAttr){Xn(ke,v);continue}if(!av&&Ue(/\/>/i,je)){Xn(ke,v);continue}Vi&&Ma([S,M,P],kv=>{je=is(je,kv," ")});const $v=xe(v.nodeName);if(!bv($v,Zi,je)){Xn(ke,v);continue}if(j&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!at)switch(g.getAttributeType($v,Zi)){case"TrustedHTML":{je=j.createHTML(je);break}case"TrustedScriptURL":{je=j.createScriptURL(je);break}}if(je!==fu)try{at?v.setAttributeNS(at,ke,je):v.setAttribute(ke,je),mu(v)?Ht(v):Mu(t.removed)}catch{Xn(ke,v)}}an(ne.afterSanitizeAttributes,v,null)},R1=function q(v){let I=null;const R=gv(v);for(an(ne.beforeSanitizeShadowDOM,v,null);I=R.nextNode();)an(ne.uponSanitizeShadowNode,I,null),vv(I),wv(I),I.content instanceof a&&q(I.content);an(ne.afterSanitizeShadowDOM,v,null)};return t.sanitize=function(q){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,R=null,me=null,Ne=null;if(du=!q,du&&(q="<!-->"),typeof q!="string"&&!hv(q))if(typeof q.toString=="function"){if(q=q.toString(),typeof q!="string")throw ss("dirty is not a string, aborting")}else throw ss("toString is not a function");if(!t.isSupported)return q;if(au||pu(v),t.removed=[],typeof q=="string"&&(xa=!1),xa){if(q.nodeName){const on=xe(q.nodeName);if(!U[on]||Ea[on])throw ss("root node is forbidden and cannot be sanitized in-place")}}else if(q instanceof r)I=fv("<!---->"),R=I.ownerDocument.importNode(q,!0),R.nodeType===os.element&&R.nodeName==="BODY"||R.nodeName==="HTML"?I=R:I.appendChild(R);else{if(!Wi&&!Vi&&!Zn&&q.indexOf("<")===-1)return j&&Nr?j.createHTML(q):q;if(I=fv(q),!I)return Wi?null:Nr?E:""}I&&ou&&Ht(I.firstChild);const ke=gv(xa?q:I);for(;me=ke.nextNode();)vv(me),wv(me),me.content instanceof a&&R1(me.content);if(xa)return q;if(Wi){if(qr)for(Ne=H.call(I.ownerDocument);I.firstChild;)Ne.appendChild(I.firstChild);else Ne=I;return($e.shadowroot||$e.shadowrootmode)&&(Ne=ae.call(i,Ne,!0)),Ne}let at=Zn?I.outerHTML:I.innerHTML;return Zn&&U["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&Ue(Ou,I.ownerDocument.doctype.name)&&(at="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+at),Vi&&Ma([S,M,P],on=>{at=is(at,on," ")}),j&&Nr?j.createHTML(at):at},t.setConfig=function(){let q=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};pu(q),au=!0},t.clearConfig=function(){Qi=null,au=!1},t.isValidAttribute=function(q,v,I){Qi||pu({});const R=xe(q),me=xe(v);return bv(R,me,I)},t.addHook=function(q,v){typeof v=="function"&&ns(ne[q],v)},t.removeHook=function(q,v){if(v!==void 0){const I=lb(ne[q],v);return I===-1?void 0:cb(ne[q],I,1)[0]}return Mu(ne[q])},t.removeHooks=function(q){ne[q]=[]},t.removeAllHooks=function(){ne=Fu()},t}var Gu=Uu();const ll="chaotic_";function ze(e){try{return localStorage.getItem(ll+e)}catch{return null}}function ot(e,t){try{localStorage.setItem(ll+e,t)}catch{}}function Lt(e){try{localStorage.removeItem(ll+e)}catch{}}function cl(){return ze("token")}function Sb(e){e?ot("token",e):Lt("token")}function Ib(){return ze("theme")}function Lb(e){ot("theme",e)}function zu(){return ze("last_project")}function Vu(e){ot("last_project",e)}function Tb(){return ze("onboarding_complete")==="true"}function Ab(){ot("onboarding_complete","true")}function Cb(){Lt("onboarding_complete")}function Bb(e){return e?ze(`issues_filters_${e}`):null}function Db(e,t){e&&(t?ot(`issues_filters_${e}`,t):Lt(`issues_filters_${e}`))}function Wu(e){return ze(`comment_draft_${e}`)}function Pa(e,t){t?ot(`comment_draft_${e}`,t):Lt(`comment_draft_${e}`)}function Ku(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function rs(e){const t=ze(`description_draft_${e}`);if(!t)return null;const n=Ku(t);return n?n.draft:t}function Yu(e){const t=ze(`description_draft_${e}`);if(!t)return null;const n=Ku(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function Tn(e,t,n=""){t?ot(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):Lt(`description_draft_${e}`)}function Qu(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function Zu(e){var n;const t=ze(`document_draft_${e}`);return t?((n=Qu(t))==null?void 0:n.draft)??null:null}function Mb(e){const t=ze(`document_draft_${e}`);if(!t)return null;const n=Qu(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function qa(e,t,n=null){t&&(t.title||t.content||t.icon)?ot(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):Lt(`document_draft_${e}`)}function jb(){return{title:ze("create_issue_title"),description:ze("create_issue_description")}}function Xu(e,t){e?ot("create_issue_title",e):Lt("create_issue_title"),t?ot("create_issue_description",t):Lt("create_issue_description")}function Rb(){Lt("create_issue_title"),Lt("create_issue_description")}function Pb(){return ze("doc_view_mode")}function qb(e){ot("doc_view_mode",e)}function Nb(){return ze("approvals_explainer_dismissed")==="1"}function Ob(){ot("approvals_explainer_dismissed","1")}function Hb(){return ze("composer_mode")==="markdown"?"markdown":"rich"}function Ju(e){ot("composer_mode",e==="markdown"?"markdown":"rich")}const Fb="chaotic-boot-cache",dl="snapshot",ul="last",ep=1,Ub=336*60*60*1e3,Gb=250;let An=null;function zb(){return An||(An=new Promise((e,t)=>{var i;let n;try{n=(i=globalThis.indexedDB)==null?void 0:i.open(Fb,1)}catch(s){t(s);return}if(!n){t(new Error("IndexedDB unavailable"));return}n.onupgradeneeded=()=>n.result.createObjectStore(dl),n.onsuccess=()=>{const s=n.result;s.onversionchange=()=>{s.close(),An=null},e(s)},n.onerror=()=>t(n.error),n.onblocked=()=>t(new Error("IndexedDB blocked"))}),An.catch(()=>{An=null}),An)}function pl(e,t){return zb().then(n=>new Promise((i,s)=>{const a=n.transaction(dl,e),o=t(a.objectStore(dl));a.oncomplete=()=>i(o==null?void 0:o.result),a.onerror=()=>s(a.error),a.onabort=()=>s(a.error)}))}function tp(e){var t;try{const n=String(e).split(".")[1];if(!n)return null;const i=atob(n.replace(/-/g,"+").replace(/_/g,"/")),s=(t=JSON.parse(i))==null?void 0:t.sub;return typeof s=="string"&&s?s:null}catch{return null}}function Vb(e){if(!e)return Promise.resolve(null);const t=pl("readonly",i=>i.get(ul)).then(i=>!i||i.version!==ep||i.userId!==e||!(Date.now()-i.savedAt<Ub)?null:i).catch(()=>null),n=new Promise(i=>setTimeout(()=>i(null),Gb));return Promise.race([t,n])}function Wb(e,t){if(!e)return Promise.resolve();const n={...t,version:ep,userId:e,savedAt:Date.now()};return pl("readwrite",i=>i.put(n,ul)).then(()=>{},()=>{})}function ml(){return pl("readwrite",e=>e.delete(ul)).then(()=>{},()=>{})}const ls=/^[0-9a-f-]{36}$/,Kb=/^\/api\/attachments\/([0-9a-f-]{36})\/content$/;function np(e){if(typeof e!="string"||e==="")return null;const t=window.location.origin;let n;try{n=new URL(e,t)}catch{return null}if(n.origin!==t||n.search!==""||n.hash!==""||n.username||n.password)return null;const i=Kb.exec(n.pathname);return i?i[1]:null}function Yb(e){for(const t of e.querySelectorAll("img[src]")){const n=np(t.getAttribute("src"));n&&(t.removeAttribute("src"),t.removeAttribute("srcset"),t.setAttribute("data-attachment-id",n),t.classList.add("attachment-inline"),!t.closest("a[href]")&&(t.setAttribute("data-action","open-attachment"),t.setAttribute("tabindex","0"),t.setAttribute("role","button"),t.setAttribute("aria-label",`View ${t.getAttribute("alt")||"image"}`)))}for(const t of e.querySelectorAll("a[href]")){const n=np(t.getAttribute("href"));n&&(t.setAttribute("data-attachment-ref",n),t.setAttribute("data-action","open-attachment"),t.classList.add("attachment-link"))}}const ip="/api";class Qb{constructor(){this.token=cl()}setToken(t){this.token=t,Sb(t)}getToken(){return this.token}async request(t,n,i=null,{headers:s=null}={}){const a={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(a.Authorization=`Bearer ${this.token}`),s&&Object.assign(a,s);const o={method:t,headers:a},r=typeof Blob<"u"&&i instanceof Blob;r&&(a["Content-Type"]=i.type||"application/octet-stream"),i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(o.body=r?i:JSON.stringify(i));let l;try{l=await fetch(`${ip}${n}`,o)}catch(d){const u=new Error("Network error - check your connection");throw u.isNetworkError=!0,u.cause=d,u}if(l.status===204)return null;let c;try{c=await l.json()}catch{const d=l.headers.get("content-type")||"unknown";throw l.ok?new Error(`Invalid response from server (expected JSON, got ${d})`):new Error(`Request failed (${l.status})`)}if(!l.ok){let d;typeof c.detail=="string"?d=c.detail:c.detail&&typeof c.detail=="object"&&c.detail.message?d=c.detail.message:d="An error occurred";const u=new Error(d);throw u.status=l.status,u.detail=c.detail,u}return c}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null),ml()}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async uploadAvatar(t){return this.request("PUT","/users/me/avatar",t)}async deleteAvatar(){return this.request("DELETE","/users/me/avatar")}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:a=null,skip:o=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),a&&c.set("order",a),c.set("skip",String(o)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getAttachments(t){return this.request("GET",`/issues/${t}/attachments`)}async uploadAttachment(t,n,{idempotencyKey:i}={}){const s=encodeURIComponent(n.name||"file"),a=i?{"Idempotency-Key":i}:null;return this.request("POST",`/issues/${t}/attachments?filename=${s}`,n,{headers:a})}async deleteAttachment(t){return this.request("DELETE",`/attachments/${encodeURIComponent(t)}`)}async fetchAttachmentContent(t){if(!ls.test(t))throw new Error("Not an attachment id");const n={};this.token&&(n.Authorization=`Bearer ${this.token}`);let i;try{i=await fetch(`${ip}/attachments/${t}/content`,{headers:n,credentials:"same-origin",redirect:"error"})}catch(s){const a=new Error("Network error - check your connection");throw a.isNetworkError=!0,a.cause=s,a}if(!i.ok){let s=null;try{s=(await i.json()).detail}catch{}const a=typeof s=="string"?s:(s==null?void 0:s.message)||`Request failed (${i.status})`,o=new Error(a);throw o.status=i.status,o.detail=s,o}return i.blob()}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/teams/${t}/agents`,a)}async createProjectAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/projects/${t}/agents`,a)}async getTeamRoster(t,{includeIdle:n=!1}={}){const i=n?"?include_idle=true":"";return this.request("GET",`/teams/${t}/roster${i}`)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getAgentKeys(t){return this.request("GET",`/agents/${encodeURIComponent(t)}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const h=new Qb;let Jn=null;const Zb='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let ei=null,cs=!1;function fl(){cs=!0}function Xb(){cs=!1}function sp(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function Jb(){if(cs)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function G(){ei=document.activeElement,cs=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function F(){var e;zt(),cs=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),ei&&document.contains(ei)&&typeof ei.focus=="function"&&ei.focus(),ei=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(Zb);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function Ve(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function $(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),u=setTimeout(o,l);return a.addEventListener("click",()=>{clearTimeout(u),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(u),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),u=setTimeout(o,Math.max(c,500))}),i}function Na(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=$(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function ey(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function k(e,t){const n=ey(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";$(`Failed to ${e}: ${n}${i}`,"error")}function zt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Jn&&(document.removeEventListener("keydown",Jn),Jn=null)}function ty(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));zt(),t&&Ve()&&sp()}function ds(e){Jn&&document.removeEventListener("keydown",Jn),Jn=e,e&&document.addEventListener("keydown",e)}function us(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(zt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function Le(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Te(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Se(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function re(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function p(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function m(e){return p(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function ny(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function et(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function ct(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}const gl=/^\/api\/avatars\/[0-9a-f]{64}$/;function ap(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||gl.test(e))}function Vt(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?ap(i)?`<img class="${t} avatar-img" src="${m(i)}" alt="${m(n)}">`:`<div class="${t} avatar-emoji">${p(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function op(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${m(n)}">agent</span>`}function Oa(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${m(i)}">${p(n)}</span>`}return op(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let de={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const hl=new Set;function ge(e,t){if(typeof e=="string"){const n=de[e];de[e]=t,rp(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=de[i];de[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{rp(i,s,a)})}}function dt(e){return hl.add(e),()=>hl.delete(e)}function rp(e,t,n){t!==n&&hl.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const ue=()=>de.currentUser,Tt=e=>ge("currentUser",e),A=()=>de.currentView,Cn=e=>ge("currentView",e),ie=()=>de.issues,tt=e=>ge("issues",e),ps=()=>de.detailNavContext,At=e=>ge("detailNavContext",e),vl=()=>de.labels,ms=e=>ge("labels",e),lp=()=>de.activeFilterCategory,iy=e=>ge("activeFilterCategory",e),cp=()=>de.selectedIssueIndex,Bn=e=>ge("selectedIssueIndex",e),sy=()=>de.selectedDocIndex,dp=e=>ge("selectedDocIndex",e),up=()=>de.selectedBoardIndex,Ha=e=>ge("selectedBoardIndex",e),ay=()=>de.selectedInboxIndex,Fa=e=>ge("selectedInboxIndex",e),oy=()=>de.selectedSprintIndex,pp=e=>ge("selectedSprintIndex",e),ry=()=>de.selectedEpicIndex,bl=e=>ge("selectedEpicIndex",e),ly=()=>de.pendingGates,cy=e=>ge("pendingGates",e),he=()=>de.inboxEntries,Wt=e=>ge("inboxEntries",e),Ua=()=>de.inboxUnreadCount,fs=e=>ge("inboxUnreadCount",e),dy=()=>de.searchDebounceTimer,uy=e=>ge("searchDebounceTimer",e),py=()=>de.websocket,yl=e=>ge("websocket",e),C=()=>de.currentTeam,ti=e=>ge("currentTeam",e),X=()=>de.currentProject,bt=e=>ge("currentProject",e||null),_e=()=>de.currentDetailIssue,ni=e=>ge("currentDetailIssue",e),my=()=>de.currentDetailSprints,mp=e=>ge("currentDetailSprints",e),wl=["backlog","todo","in_progress","in_review","done","canceled"],gs=["backlog","todo","in_progress","in_review"],fp=["urgent","high","medium","low","no_priority"],$l=["no_priority","urgent","high","medium","low"],gp=["backlog","todo","in_progress","in_review","done"],Ga="#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row";function Dn(e){if(!e)return!1;const t=e.tagName;return t==="INPUT"||t==="TEXTAREA"||t==="SELECT"||!!e.isContentEditable}const kl={};function oe(e){Object.assign(kl,e)}function fy(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target&&Dn(e.target)||n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=kl[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let hp=!1;function gy(){if(!hp){hp=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,fy);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=kl[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}function K({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${m(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${m(r)}="${m(l)}"`).join(""):""}>${p(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${p(t)}</h3>
            <p>${p(n)}</p>
            ${a}
        </div>
    `}const z={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},vp=24,nt=new Map,ye=new Map,yt=new Map;let Kt=null;function hy(e){return Array.isArray(e)?[...e].map(String).sort():e}function bp(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,hy(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function za(e,t){for(ye.delete(e),ye.set(e,t);ye.size>vp;){const n=ye.keys().next().value;ye.delete(n)}yp()}function yp(){if(nt.size===0)return;const e=new Set;ye.forEach(t=>t.ids.forEach(n=>e.add(n))),nt.forEach((t,n)=>{e.has(n)||nt.delete(n)})}function vy(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function wp(e){const t=ye.get(e);return t?(za(e,t),t.ids.map(n=>nt.get(n)).filter(Boolean)):null}function _l(e){return nt.get(e)}function by(e){var t;return((t=ye.get(e))==null?void 0:t.meta)||{}}function $p(e,t){if(!e||!t)return!1;const n=Date.parse(e),i=Date.parse(t);return Number.isNaN(n)||Number.isNaN(i)?e>t:n>i}function El(e){const t=nt.get(e.id);if(!$p(t==null?void 0:t.updated_at,e.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){nt.set(e.id,{...e,description:t.description});return}nt.set(e.id,e)}}const xl=new Set;function yy(e){return xl.add(e),()=>xl.delete(e)}function kp(e,t,n){if(!Array.isArray(t))return;const i=vy(t);i.forEach(El);const s=ye.get(e);za(e,{ids:i.map(a=>a.id),meta:n??(s==null?void 0:s.meta)??{}}),xl.forEach(a=>{try{a(e)}catch(o){console.error(o)}})}function wy(e,t){const n=ye.get(e);n&&(n.meta=t)}function Va(e){e!=null&&e.id&&nt.has(e.id)&&El(e)}function $y(e){ye.delete(e),yt.forEach((t,n)=>{t===e&&yt.delete(n)}),Kt===e&&(Kt=null),yp()}function ky(e){nt.delete(e),ye.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function Wa(e){Kt=e}function _y(){return Kt}function _p(e,t){for(yt.delete(e),yt.set(e,t);yt.size>vp;)yt.delete(yt.keys().next().value)}function Ey(e){const t=yt.get(e);return t&&ye.has(t)?t:null}function xy({maxQueries:e=3}={}){const t=[...ye.entries()].slice(-e),n=new Set(t.map(([s])=>s)),i=new Set;return t.forEach(([,s])=>s.ids.forEach(a=>i.add(a))),{queries:t.map(([s,a])=>[s,{ids:[...a.ids],meta:a.meta||{}}]),entities:[...i].map(s=>nt.get(s)).filter(Boolean),views:[...yt.entries()].filter(([,s])=>n.has(s))}}function Sy(e){if(!e||!Array.isArray(e.queries))return;const t=new Map((e.entities||[]).filter(n=>n==null?void 0:n.id).map(n=>[n.id,n]));e.queries.forEach(([n,i])=>{ye.has(n)||!Array.isArray(i==null?void 0:i.ids)||(i.ids.forEach(s=>{t.has(s)&&El(t.get(s))}),za(n,{ids:i.ids.filter(s=>nt.has(s)),meta:i.meta||{}}))}),(e.views||[]).forEach(([n,i])=>{!yt.has(n)&&ye.has(i)&&_p(n,i)})}function Ep(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function xp(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(Ep(e[n])!==Ep(t[n]))return!1;return!0}const Sp=["status","priority"],Ip=["assignee_id","sprint_id","issue_type"],Iy={assignee_id:"unassigned",sprint_id:"no_sprint"},Ly=["scope","project_id","sort_by","order","limit"],Mn=e=>(e||[]).map(t=>String(t).toLowerCase());function Ty(e,t){if(e.search||t.search||t.sort_by==="random"||Ly.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of Sp)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of Ip)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=Mn(e.label);if(!Mn(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=Mn(t.exclude_label);if(!Mn(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function Lp(e){const t=e.label===void 0?null:Mn(e.label),n=e.exclude_label===void 0?null:Mn(e.exclude_label);return i=>{for(const s of Sp)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of Ip){if(e[s]===void 0)continue;const a=e[s]===Iy[s]?null:e[s];if((i[s]??null)!==a)return!1}if(t||n){const s=Mn((i.labels||[]).map(a=>a.name));if(t&&!t.some(a=>s.includes(a))||n&&n.some(a=>s.includes(a)))return!1}return!0}}function Ay(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(bp(e)));let n=null,i=null;if(ye.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let c;try{c=Object.fromEntries(JSON.parse(l))}catch{return}Ty(c,t)&&(n=r,i=l)}),!n)return null;za(i,n);const s=Lp(t),a=n.ids.map(r=>nt.get(r)).filter(r=>r&&s(r)),o=t.limit;return{rows:a,complete:!(typeof o=="number"&&n.ids.length>=o)}}function Cy(){nt.clear(),ye.clear(),yt.clear(),Kt=null}dt((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Cy();return}if(e!=="issues"||Kt===null||!ye.has(Kt)||A()!=="issues")return;const i=ye.get(Kt);kp(Kt,ie(),i.meta)});let Sl=[];function By(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function Dy(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function hs(e,t){const n=e().map(By),i=t().map(Dy);Sl=[...n,...i]}function wt(e){return e&&Sl.find(t=>t.id===e)||null}function ut(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Ka(e,t=!1){const n=p(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${p(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function vs({includeIdle:e=!1,keepId:t=null}={}){const n=Sl.filter(b=>e||!b.idle||b.id===t),i=n.filter(b=>!b.is_agent),s=new Set(i.map(b=>b.id)),a=n.filter(b=>b.is_agent),o=new Set(a.map(b=>b.id)),r=(b,y)=>b.name.localeCompare(y.name),l=b=>b.registered_by_id&&o.has(b.registered_by_id),c=new Map,d=new Map;a.forEach(b=>{const[y,x]=l(b)?[c,b.registered_by_id]:[d,b.parent_user_id];y.has(x)||y.set(x,[]),y.get(x).push(b)});const u=[],f=(b,y)=>{u.push({assignee:b,indent:y}),(c.get(b.id)||[]).sort(r).forEach(_=>u.push({assignee:_,indent:2}))};return i.forEach(b=>{u.push({assignee:b,indent:!1}),(d.get(b.id)||[]).sort(r).forEach(y=>f(y,!0))}),a.filter(b=>!l(b)&&!s.has(b.parent_user_id)).sort(r).forEach(b=>f(b,!1)),u}function ii({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;vs({keepId:n}).forEach(({assignee:s,indent:a})=>{i+=`<option value="${m(s.id)}">${Ka(s,a)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function My(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&wt(e)&&ii({keepId:e}),t.value=e}let Ct=[],Il=[],Ya=-1,Ll=null;const Tp=5,jy=new Set(["done","canceled"]),Ap=new Set;function Ry(){return Ya}function Py(e){Ya=e;const t=e>=0?document.querySelectorAll("#my-issues-list .issue-row")[e]:null;Ll=(t==null?void 0:t.dataset.issueId)??null}const Cp=[{status:"in_progress",label:"In progress"},{status:"in_review",label:"In review"},{status:"todo",label:"Todo"},{status:"backlog",label:"Backlog"},{status:"done",label:"Done"},{status:"canceled",label:"Canceled"}];function Bp(e){const t=new Set(Cp.map(s=>s.status)),n=Cp.map(s=>({...s,issues:e.filter(a=>a.status===s.status)})),i=e.filter(s=>!t.has(s.status));return i.length&&n.push({status:"other",label:"Other",issues:i}),n.filter(s=>s.issues.length)}dt(e=>{e==="currentProject"&&A()==="my-issues"&&(si(),bs(),ai())});function We(){return Ct}function jn(e){Ct=e}let Tl=0;async function si(){var a;const e=C(),t=ue();if(!e||!t)return;const n=++Tl,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=X();Ny();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await h.getIssues({...o,project_id:s}):r=await h.getTeamIssues(e.id,o),n!==Tl)return;Ct=Bp(r).flatMap(l=>l.issues),A()==="my-issues"&&At(Ct),Rn()}catch(o){if(n!==Tl)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=K({icon:z.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),k("load issues",o)}}async function ai({showLoading:e=!0}={}){const t=C();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=X();Il=await h.getTeamActivities(t.id,0,10,{projectId:i}),qy()}catch{n&&(n.innerHTML=K({icon:z.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function qy(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Il.length){e.innerHTML=K({icon:z.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=Il.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${m(t.issue_identifier)}"><strong>${p(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${m(t.document_id)}"><strong>${s} ${p(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${p(t.document_title)}</strong>`);const i=_c(t);return`
        <div class="activity-item">
            <div class="activity-icon" aria-hidden="true">${yf(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${xc(t)}${n}</span>
                <span class="activity-actor">by ${p(i)}</span>
                <time class="activity-time" datetime="${m(t.created_at||"")}">${et(t.created_at)}</time>
            </div>
        </div>
    `}).join("")}}function Ny(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function Dp(){si()}function Rn(){var o,r;const e=document.getElementById("my-issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=Bp(Ct);Ct=t.flatMap(l=>l.issues),A()==="my-issues"&&At(Ct),Ya=-1;const n=document.getElementById("my-issues-count");if(n&&(n.textContent=Ct.length?String(Ct.length):""),Ct.length===0){e.innerHTML=K({icon:z.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}const i=document.activeElement,s=e.contains(i)?(o=i.closest(".issue-row"))==null?void 0:o.dataset.issueId:null,a=s?(r=i.dataset)==null?void 0:r.dropdownType:null;if(e.innerHTML=t.map(l=>{const c=jy.has(l.status)&&!Ap.has(l.status)&&l.issues.length>Tp,d=c?l.issues.slice(0,Tp):l.issues;return`
        <div class="dash-group" role="group" aria-labelledby="dash-group-${l.status}">
            <h4 class="dash-group-header" id="dash-group-${l.status}">
                <span class="dash-group-dot status-${l.status}" aria-hidden="true"></span>
                ${p(l.label)} <span class="dash-group-count">${l.issues.length}</span>
            </h4>
            ${d.map(u=>gi(u)).join("")}
            ${c?`<button type="button" class="dash-group-more" data-action="dash-show-all" data-status="${l.status}">Show all ${l.issues.length}</button>`:""}
        </div>`}).join(""),s){const l=[...e.querySelectorAll(".issue-row")].find(d=>d.dataset.issueId===s),c=l&&(a?l.querySelector(`[data-dropdown-type="${a}"]`):l.querySelector(".issue-title"));c==null||c.focus({preventScroll:!0})}if(Ll){const l=[...e.querySelectorAll(".issue-row")],c=l.findIndex(d=>d.dataset.issueId===Ll);c!==-1&&(l[c].classList.add("keyboard-selected"),Ya=c)}}let Al=0,Qa=[],Mp=null;async function bs(){var o;const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++Al,n=X(),i=`${((o=C())==null?void 0:o.id)??""}:${n??""}`;i!==Mp&&(Mp=i,ys=!1),Qa=[];const s=se(),a=n?s.filter(r=>r.id===n):s;if(!a.length){e.innerHTML="";return}try{const r=a.map(async c=>{try{const d=await h.getCurrentSprint(c.id);if(!d)return null;let u={},f=!1;if(!n)return{project:c,sprint:d,statusCounts:u};try{const g=await h.getIssues({sprint_id:d.id,project_id:c.id,limit:500});for(const b of g)u[b.status]=(u[b.status]||0)+1}catch(g){console.error(`Failed to load issue counts for sprint ${d.id}:`,g),f=!0}return{project:c,sprint:d,statusCounts:u,countsFailed:f}}catch(d){return console.error(`Failed to load current sprint for project ${c.id}:`,d),null}}),l=(await Promise.all(r)).filter(Boolean);if(t!==Al)return;Qa=l,Op(l,{single:!!n})}catch(r){if(t!==Al)return;console.error("Failed to load sprint status:",r),e.innerHTML=K({icon:z.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}const jp=5;let ys=!1;const Rp=["done","in_review","in_progress","todo","backlog"];function Za(e){const t=e.points_spent||0,n=e.budget!==null&&e.budget!==void 0,i=n?e.budget:null,s=n&&t>i,a=n?i>0?Math.min(100,Math.round(t/i*100)):t>0?100:0:null,o=e.limbo?"limbo":s?"arrears":n&&a>=80?"near":"";return{spent:t,budget:i,hasBudget:n,overBudget:s,pct:a,state:o}}function Oy(e){const t=({sprint:n})=>{const i=Za(n);return n.limbo?[0,0]:i.overBudget?[1,-(i.spent-i.budget)]:i.hasBudget?[2,-i.pct]:[3,-i.spent]};return e.map((n,i)=>({d:n,r:t(n),i})).sort((n,i)=>n.r[0]-i.r[0]||n.r[1]-i.r[1]||n.i-i.i).map(n=>n.d)}function Hy(e){if(!e.activated_at)return null;const t=Date.now()-new Date(e.activated_at);return Number.isFinite(t)?Math.max(0,Math.floor(t/864e5))+1:null}function Fy(e){return e.hasBudget?e.overBudget?`<strong>${e.spent-e.budget}</strong> pts over budget <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.budget-e.spent}</strong> pts left <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.spent}</strong> pts spent <span class="sprint-focus-muted">· no budget</span>`}function Uy(e,t){return e.limbo?'<span class="badge badge-warning" title="Closed, waiting on sprint rituals">Limbo</span>':t.overBudget?'<span class="badge badge-danger" title="Over budget: close the sprint to keep working">Arrears</span>':""}const Gy={near:"is-near",arrears:"is-over",limbo:"is-limbo"};function Pp(e){return Gy[e.state]||""}function qp(e){return`<span class="meter ${Pp(e)}" aria-hidden="true"><span class="meter-fill" style="width: ${e.pct}%"></span></span>`}function zy(e,t){return e.limbo?"in limbo":t.overBudget?"in arrears":t.state==="near"?"nearly spent":""}function Np(e){return`data-action="view-sprint" data-sprint-id="${m(e.id)}" data-sprint-url="/sprint/${m(e.id)}"`}function Vy({sprint:e,statusCounts:t,countsFailed:n}){const i=Za(e),s=t||{},a=Object.values(s).reduce((d,u)=>d+u,0),o=Hy(e),r=n?"Issue counts unavailable":a?`${a} issue${a===1?"":"s"}`:"No issues planned",l=[o?`Day ${o}`:"",r].filter(Boolean).join(" · ");let c="";return e.limbo?c="Closed and waiting on sprint rituals before the next sprint starts.":i.overBudget&&(c="Over budget. Close the sprint to keep moving tickets."),`
        <button type="button" class="sprint-focus ${i.state}" ${Np(e)}>
            <span class="sprint-focus-top">
                <span class="sprint-focus-name">${p(e.name)}</span>
                ${Uy(e,i)}
                <span class="sprint-focus-meta">${p(l)}</span>
            </span>
            <span class="sprint-focus-headline">${Fy(i)}</span>
            ${i.hasBudget?qp(i):""}
            ${a?`
                <span class="sprint-issue-breakdown">
                    <span class="sprint-stacked-bar" aria-hidden="true">
                        ${Rp.filter(d=>s[d]).map(d=>`<span class="sprint-stacked-segment status-${d}" style="width: ${s[d]/a*100}%"></span>`).join("")}
                    </span>
                    <span class="sprint-status-counts">
                        ${Rp.filter(d=>s[d]).map(d=>`<span class="sprint-count-label status-${d}">${s[d]} ${Le(d)}</span>`).join("")}
                    </span>
                </span>
            `:""}
            ${c?`<span class="sprint-focus-note ${i.state}">${c}</span>`:""}
        </button>
    `}function Wy({project:e,sprint:t}){const n=Za(t),i=n.hasBudget?`${n.spent}/${n.budget}`:`${n.spent}`,s=zy(t,n),a=`${e.name}: ${t.name}, ${n.hasBudget?`${n.spent} of ${n.budget} pts`:`${n.spent} pts, no budget`}${s?`, ${s}`:""}`;return`
        <li>
            <button type="button" class="sprint-row ${n.state}" ${Np(t)} title="${m(a)}">
                <span class="state-dot ${Pp(n)}" aria-hidden="true"></span>
                <span class="sprint-row-project">${p(e.name)}</span>
                <span class="sprint-row-sprint">${p(t.name)}</span>
                ${n.hasBudget?qp(n):'<span class="sprint-row-nometer" aria-hidden="true"></span>'}
                <span class="meter-label">${i}<span class="sprint-row-unit"> pts</span>${n.hasBudget?"":'<span class="sr-only">, no budget</span>'}</span>
                ${s?`<span class="sr-only">, ${s}</span>`:""}
            </button>
        </li>
    `}function Op(e,{single:t=e.length===1&&!!X()}={}){const n=document.getElementById("dashboard-sprint-status");if(!n)return;if(!e.length){n.innerHTML="";return}if(t){n.innerHTML=`
            <div class="section-header">
                <h3>Current sprint</h3>
            </div>
            ${Vy(e[0])}
        `;return}const i=Oy(e),s=i.filter(({sprint:d})=>d.limbo).length,a=i.filter(({sprint:d})=>!d.limbo&&Za(d).overBudget).length,o=[a?`${a} in arrears`:"",s?`${s} in limbo`:""].filter(Boolean).join(" · "),r=i.length>jp,l=ys?i:i.slice(0,jp),c=i.length-l.length;n.innerHTML=`
        <div class="section-header">
            <h3>Active sprints</h3>
            <span class="section-count">${i.length}</span>
            ${o?`<span class="sprint-attention">${o}</span>`:""}
        </div>
        <ul class="sprint-rows" id="dashboard-sprint-rows">
            ${l.map(Wy).join("")}
        </ul>
        ${r?`<button type="button" class="dash-group-more sprint-rows-more" data-action="dash-sprints-toggle" aria-expanded="${ys}" aria-controls="dashboard-sprint-rows">${c>0?`Show all ${i.length}`:"Show fewer"}</button>`:""}
    `}oe({"filter-my-issues":()=>Dp(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),Ko(t.identifier)},"retry-load-my-issues":()=>si(),"dash-show-all":(e,t)=>{Ap.add(t.status),Rn()},"retry-load-sprint-status":()=>bs(),"dash-sprints-toggle":()=>{var e;Qa.length&&(ys=!ys,Op(Qa,{single:!1}),(e=document.querySelector('#dashboard-sprint-status [data-action="dash-sprints-toggle"]'))==null||e.focus())}});const Hp=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function ws(e=null){const t=e||X()||"";rm([]);const n=se().map(o=>`
        <option value="${o.id}" ${o.id===t?"selected":""}>${p(o.name)}</option>
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
                        ${mt("no_priority")}
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
                                ${Hp.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
    `,G(),no();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=jb();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{Xu(i.value,s.value)}),s.addEventListener("input",()=>{Xu(i.value,s.value)}),i.focus()}function Ky(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function Yy(e){const t=Hp.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function Fp(e,t){const n=se().find(i=>i.id===t);rm([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?p(n.name):"Project"}</span>
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
                        ${mt("no_priority")}
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
    `,G(),no(),document.getElementById("create-issue-title").focus()}async function Qy(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){$("Please enter a title","error");return}try{const d=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:om(),parent_id:e});F(),$(`Created sub-issue ${d.identifier}`,"success"),ce(e)}catch(d){k("create sub-issue",d)}}async function Zy(e,t,n){var o,r;zt();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${gp.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${m(Le(c))}">
                    ${Xe(c)}
                    <span>${Le(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${$l.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${m(Te(c))}">
                    ${mt(c)}
                    <span>${Te(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${m(ct(c))}">
                    <span class="issue-type-badge type-${c}">${ct(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!C())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=vl(),c=!1;if(l.length===0)try{l=await h.getLabels(C().id),ms(l)}catch(d){console.error("Failed to load labels:",d),c=!0}Ml(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),us(a,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=vs({keepId:l});a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:u})=>{const f=ut(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${m(d.id)}" data-label="${m(f)}">
                    ${Vt(d,"avatar-small")}
                    <span>${Ka(d,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=Ii(c);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${d.map(u=>{const f=u.value===null?"":String(u.value);return`
                <button class="dropdown-option ${f===l?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${m(f)}" data-label="${m(u.value?u.label:"Estimate")}">
                    <span>${p(u.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const l=document.getElementById("create-issue-sprint").value,c=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!c)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const u=(await h.getSprints(c)).filter(f=>f.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${u.map(f=>`
                        <button class="dropdown-option ${f.id===l?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${m(f.id)}" data-label="${m(f.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${p(f.name)}${f.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),us(a)}function Xy(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Jy(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,fl();const i=p(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${Xe(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${mt(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${ct(t)}</span><span id="create-issue-type-label">${i}</span>`)}zt(),s==null||s.focus()}async function Up({keepOpen:e=!1}={}){var y,x;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((y=document.getElementById("create-issue-sprint"))==null?void 0:y.value)||null,u=(x=document.getElementById("create-issue-due-date"))==null?void 0:x.value,f=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),b&&(b.disabled=!0);try{const _=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:d,label_ids:om(),due_date:f});$(`Created ${_.identifier}`,"success"),Rb(),A()==="issues"?Dt():A()==="my-issues"&&si(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",Xb(),document.getElementById("create-issue-title").focus()):(F(),ce(_.id))}catch(_){k("create issue",_)}finally{g&&(g.disabled=!1),b&&(b.disabled=!1)}}async function ew(){await Up({keepOpen:!1})}async function tw(){await Up({keepOpen:!0})}oe({"toggle-create-dropdown":(e,t,n)=>{Zy(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Jy(t.field,t.value,t.label)},"create-issue-submit":()=>{ew()},"create-issue-and-new":()=>{tw()},"update-create-project":()=>{Xy()},"apply-template":e=>{Yy(e.target.value)},"toggle-create-options":()=>{Ky()},"create-sub-issue-submit":(e,t)=>{Qy(t.parentId,t.projectId)}});function $s(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&($(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(nw(n,e.project_id),t=!0),t}function nw(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
        <div class="parent-prompt">
            <p>${p(e.message)}</p>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-dismiss">Not now</button>
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-add"
                    data-parent-id="${m(e.id)}" data-project-id="${m(t||"")}">Add more</button>
                <button type="button" class="btn btn-primary" data-action="parent-prompt-close"
                    data-parent-id="${m(e.id)}" data-identifier="${m(e.identifier)}">Close ${p(e.identifier)}</button>
            </div>
        </div>
    `,G())}async function iw(e,t){try{const n=await h.updateIssue(e,{status:"done"});F(),$(`${t} closed`,"success"),$s(n)}catch(n){k(`close ${t}`,n)}}oe({"parent-prompt-dismiss":()=>F(),"parent-prompt-close":(e,t)=>iw(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{F(),Fp(t.parentId,t.projectId)}});function rn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Pn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function qn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Nn(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Xa(){const e=document.getElementById("group-by-select");return e?e.value:""}const Gp=[{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],Cl=["done","canceled"],sw=gs,aw="all";function zp(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function oi(e=rn()){return e.length===0?"all":zp(e,gs)?"open":zp(e,Cl)?"closed":null}function Vp(e){var t,n,i;switch(e){case"status":{const s=oi();return s==="all"?0:s?1:rn().length}case"priority":return Pn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return qn().length;case"exclude_labels":return Nn().length;default:return 0}}function Bl(){let e=0;return Gp.forEach(t=>{e+=Vp(t.key)}),e}function Wp(){var b,y,x,_,L,T;const e=new URLSearchParams,t=rn(),n=Pn(),i=qn(),s=Nn(),a=(b=document.getElementById("assignee-filter"))==null?void 0:b.value,o=X()||"",r=(y=document.getElementById("sprint-filter"))==null?void 0:y.value,l=(x=document.getElementById("issue-type-filter"))==null?void 0:x.value,c=(_=document.getElementById("group-by-select"))==null?void 0:_.value,d=(L=document.getElementById("sort-by-select"))==null?void 0:L.value,u=oi(t);u==="all"?e.append("status",aw):u!=="open"&&t.forEach(j=>e.append("status",j)),n.forEach(j=>e.append("priority",j)),i.forEach(j=>e.append("label",j)),s.forEach(j=>e.append("exclude_label",j)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const f=e.toString(),g=f?`/issues?${f}`:"/issues";history.replaceState({view:"issues"},"",g),Db((T=C())==null?void 0:T.id,f)}function ow(e){var x;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(_=>t.has(_))){const _=Bb((x=C())==null?void 0:x.id);if(_){t=new URLSearchParams(_);const L=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",L)}}const s=t.getAll("status"),a=document.getElementById("status-filter-dropdown");if(a&&(s.length>0||!a.dataset.statusApplied)){const _=s.length>0?s:sw;a.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=_.includes(T.value)}),a.dataset.statusApplied="true",Kp()}const o=t.getAll("priority");if(o.length>0){const _=document.getElementById("priority-filter-dropdown");_&&(_.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=o.includes(T.value)}),Yp())}const r=t.get("assignee");r&&My(r);const l=t.get("project"),c=se();l&&(!c.length||c.some(_=>_.id===l))&&(e(!0),bt(l),e(!1));const d=t.get("sprint");if(d){const _=document.getElementById("sprint-filter");_&&(_.value=d)}const u=t.get("issue_type");if(u){const _=document.getElementById("issue-type-filter");_&&(_.value=u)}const f=t.getAll("label");if(f.length>0){const _=document.getElementById("label-filter-dropdown");_&&(_.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=f.includes(T.value)}),Ja())}const g=t.getAll("exclude_label");if(g.length>0){const _=document.getElementById("exclude-label-filter-dropdown");_&&(_.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=g.includes(T.value)}),eo())}const b=t.get("groupBy");if(b){const _=document.getElementById("group-by-select");_&&(_.value=b)}const y=t.get("sort");if(y){const _=document.getElementById("sort-by-select");_&&(_.value=y)}}function Kp(){const e=rn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=oi(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=Le(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function Yp(){const e=Pn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Te(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Ja(){var i,s;const e=qn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function eo(){var i,s;const e=Nn(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function Qp(){if(!C())return;let e;try{e=await h.getLabels(C().id)}catch(t){console.error("Failed to load labels for filter:",t);return}Zp("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),Zp("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function Zp(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${re(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${p(r.name)}</span>
                </span>
            `,a.appendChild(l)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}function Xp(e){const t=$t(e),n=document.createElement("template");return n.innerHTML=t,rw(n.content,lw),n.innerHTML}function rw(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function lw(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const u=d[1],f=document.createElement("a");f.href=`#/issue/${u}`,f.className="issue-link",f.textContent=u,o.appendChild(f),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+d[3],o.appendChild(u),r=d.index+d[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function ri(e){return e?Xp(e):""}function On(e){return e?Xp(e):""}const cw={remove:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'},Jp=(e,t,n)=>`<a href="/issue/${encodeURIComponent(t)}" class="related-link" data-action="navigate-issue" data-issue-id="${m(e)}" data-identifier="${m(t)}"><span class="related-id">${p(t)}</span><span class="related-title">${p(n)}</span></a>`;function dw(e){return e.relation_type==="blocked_by"||e.relation_type==="blocks"&&e.direction==="incoming"?"Blocked by":e.relation_type==="blocks"?"Blocks":e.relation_type==="duplicates"?e.direction==="incoming"?"Duplicated by":"Duplicates":"Related"}const em={"Blocked by":0,"Sub-issue":1,Blocks:2,Duplicates:3,"Duplicated by":3,Related:4};function uw(e,t=[],n=[],{formatEstimate:i=null}={}){const s=o=>o.estimate==null?"":` · ${p(i?i(o.estimate,o.project_id||e.project_id):`${o.estimate} pts`)}`,a=[...(t||[]).map(o=>({kind:"Sub-issue",html:`
                <li class="related-row">
                    <span class="related-status">${Xe(o.status)}</span>
                    ${Jp(o.id,o.identifier,o.title)}
                    <span class="related-kind">Sub-issue${s(o)}</span>
                </li>`})),...(n||[]).map(o=>{const r=dw(o);return{kind:r,html:`
                <li class="related-row">
                    <span class="related-status">${Xe(o.related_issue_status)}</span>
                    ${Jp(o.related_issue_id,o.related_issue_identifier,o.related_issue_title)}
                    <span class="related-kind${r==="Blocked by"?" blocked":""}">${r}</span>
                    <button type="button" class="related-remove" data-action="remove-relation" data-issue-id="${m(e.id)}" data-relation-id="${m(o.id)}" title="Remove link" aria-label="Remove link to ${m(o.related_issue_identifier)}">${cw.remove}</button>
                </li>`}})].sort((o,r)=>em[o.kind]-em[r.kind]);return`
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
        </section>`}const pw=e=>e&&e.is_agent?` title="${m(e.owner_name?`AI agent of ${e.owner_name}`:"AI agent")}"`:"";function mw(e){return`
        <li class="comment timeline-comment">
            <div class="comment-avatar">${p((e.author_name||"U").charAt(0).toUpperCase())}</div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-author"${pw(e.author)}>${p(e.author_name||"User")}</span>
                    <span class="comment-date">${p(et(e.created_at))}</span>
                </div>
                <div class="comment-content markdown-body">${ri(e.content).trim()}</div>
            </div>
        </li>`}const tm=(e,t,n=!1)=>`<details class="timeline-note"${n?" open":""}><summary>${e}</summary><div class="markdown-body comment-content">${ri(t).trim()}</div></details>`;function fw(e,{formatText:t,formatActor:n,gateShowsIt:i,awaitingReview:s}){let a,o="",r="";return e.activity_type==="ritual_attested"?(a=`Attested <b>${p(e.field_name||"a ritual")}</b>`,i?o=' · <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">waiting for review ↑</button>':(s&&(o=" · waiting for review"),e.new_value&&(r=tm("Note",e.new_value)))):e.activity_type==="ritual_rejected"?(a=`Sent back <b>${p(e.field_name||"a ritual")}</b>`,e.new_value&&(r=tm("Reason",e.new_value,!0))):a=t(e),`
        <li class="timeline-event${e.activity_type==="ritual_rejected"?" sent-back":""}">
            <span class="timeline-dot" aria-hidden="true"></span>
            <div class="timeline-event-body">
                <span class="timeline-text">${a}</span>${o}
                <span class="timeline-meta">· ${p(n(e))} · ${p(et(e.created_at))}</span>
                ${r}
            </div>
        </li>`}function gw(e,t){const n=new Set((e||[]).filter(s=>s.activity_type==="ritual_attested").map(s=>s.field_name));return[...t&&t.pending_rituals||[],...t&&t.completed_rituals||[]].filter(s=>s.attestation&&!n.has(s.name)).map(s=>({activity_type:"ritual_attested",field_name:s.name,new_value:s.attestation.note||null,user_name:s.attestation.attested_by_name||null,user:s.attestation.attester||null,created_at:s.attestation.attested_at}))}function hw({comments:e=[],activities:t=[],ritualStatus:n=null,gateRitualName:i=null,activitiesTruncated:s=!1,commentsLoadFailed:a=!1,issueId:o},r){const l=new Set((n&&n.pending_rituals||[]).filter(g=>g.attestation&&!g.attestation.approved_at).map(g=>g.name)),c=[...t||[],...gw(t,n)],d=new Map;for(const g of c){if(g.activity_type!=="ritual_attested"||!l.has(g.field_name))continue;const b=d.get(g.field_name);(!b||new Date(g.created_at)>new Date(b.created_at))&&d.set(g.field_name,g)}const u=[...(e||[]).map(g=>({at:g.created_at,html:mw(g)})),...c.filter(g=>g.activity_type!=="commented").map(g=>{const b=d.get(g.field_name)===g;return{at:g.created_at,html:fw(g,{...r,awaitingReview:b,gateShowsIt:b&&g.field_name===i})}})].sort((g,b)=>new Date(g.at)-new Date(b.at)),f=(e||[]).length;return`
        <section class="issue-detail-section ticket-timeline" id="comments-section" aria-label="Comments and activity">
            <h3>Activity${f?` <span class="section-count">· ${f} ${f===1?"comment":"comments"}</span>`:""}</h3>
            ${a?`
                <div class="comments-error">
                    Comments failed to load.
                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${m(o)}">Retry</button>
                </div>`:""}
            ${s?'<div class="timeline-truncated">Older activity is not shown.</div>':""}
            ${u.length?`<ol class="timeline comments-list">${u.map(g=>g.html).join("")}</ol>`:a?"":'<div class="comments-empty">No comments yet</div>'}
        </section>`}function nm(e,t,{formatEstimate:n=null}={}){const i=[`${Xe(e.status)}<span>${p(Le(e.status))}</span>`,p(t||"Unassigned"),p(Te(e.priority)),p(ct(e.issue_type))];return e.estimate!=null&&i.push(p(n?n(e.estimate,e.project_id):`${e.estimate} pts`)),`<div class="issue-meta-line">${i.map(s=>`<span class="issue-meta-part">${s}</span>`).join('<span class="issue-meta-sep" aria-hidden="true">·</span>')}</div>`}const im=wl,vw=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let Bt=[],sm=Promise.resolve();const bw={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};function to(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const yw={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function am(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function li(){return!!document.querySelector(".inline-dropdown")}function om(){return Bt}function rm(e){Bt=e}async function Dl(e,t,n,i){var u,f,g,b;e.preventDefault(),zt();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${im.map((y,x)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="status" data-value="${y}">
                    ${Xe(y)}
                    <span>${Le(y)}</span>
                    <span class="dropdown-shortcut">${x+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${$l.map((y,x)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="priority" data-value="${y}">
                    ${mt(y)}
                    <span>${Te(y)}</span>
                    <span class="dropdown-shortcut">${x}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${vw.map(y=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="issue_type" data-value="${y}">
                    <span class="issue-type-badge type-${y}">${ct(y)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const y=_e(),x=ie().find(L=>L.id===n)||We().find(L=>L.id===n)||((y==null?void 0:y.id)===n?y:null),_=vs({keepId:(x==null?void 0:x.assignee_id)||null});o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${_.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:_.map(({assignee:L,indent:T},j)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="${m(L.id)}">
                    ${Vt(L,"avatar-small")}
                    <span>${Ka(L,T)}</span>
                    ${j<9?`<span class="dropdown-shortcut">${j+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const y=document.querySelector(`.issue-row[data-issue-id="${n}"]`),x=(y==null?void 0:y.dataset.projectId)||((u=_e())==null?void 0:u.project_id),_=Ii(x);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${_.map((L,T)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="estimate" data-value="${L.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${L.label}</span>
                    ${T<9?`<span class="dropdown-shortcut">${T}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const y=ie(),x=We(),_=_e(),L=y.find(S=>S.id===n)||x.find(S=>S.id===n)||_,T=new Set(((L==null?void 0:L.labels)||[]).map(S=>S.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const j=o.getBoundingClientRect();let E=a.bottom+4,w=a.left;w+j.width>window.innerWidth-8&&(w=a.right-j.width),E+j.height>window.innerHeight-8&&(E=a.top-j.height-4),o.style.top=`${E}px`,o.style.left=`${Math.max(8,w)}px`,us(o,{multiSelect:!0});let D=[];const H=C();if(H)try{D=await h.getLabels(H.id)}catch(S){console.error("Failed to load labels:",S)}if(!o.parentNode)return;cm(o,n,D,T);const te=o.getBoundingClientRect();let ae=a.bottom+4,ne=a.left;ne+te.width>window.innerWidth-8&&(ne=a.right-te.width),ae+te.height>window.innerHeight-8&&(ae=a.top-te.height-4),o.style.top=`${ae}px`,o.style.left=`${Math.max(8,ne)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const y=ie(),x=We(),_=_e(),L=y.find(M=>M.id===n)||x.find(M=>M.id===n)||_,T=(L==null?void 0:L.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const j=o.getBoundingClientRect();let E=a.bottom+4,w=a.left;w+j.width>window.innerWidth-8&&(w=a.right-j.width),E+j.height>window.innerHeight-8&&(E=a.top-j.height-4),o.style.top=`${E}px`,o.style.left=`${Math.max(8,w)}px`,us(o);let D=[];if(T)try{D=await h.getSprints(T),sE(T,D)}catch(M){console.error("Failed to load sprints:",M)}if(!o.parentNode)return;const H=D.filter(M=>M.status!=="completed"||M.id===(L==null?void 0:L.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${H.map((M,P)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="${m(M.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${p(M.name)}${M.status==="active"?" (Active)":""}</span>
                    ${P<9?`<span class="dropdown-shortcut">${P+1}</span>`:""}
                </button>
            `).join("")}
        `;const te=o.getBoundingClientRect();let ae=a.bottom+4,ne=a.left;ne+te.width>window.innerWidth-8&&(ne=a.right-te.width),ae+te.height>window.innerHeight-8&&(ae=a.top-te.height-4),o.style.top=`${ae}px`,o.style.left=`${Math.max(8,ne)}px`,o.classList.remove("dropdown-positioning");const S=M=>{const P=M.key;if(P==="Escape"||P==="Tab"){zt(),document.removeEventListener("keydown",S),ds(null);return}if(am(M,o))return;const Z=parseInt(P);if(isNaN(Z))return;const ve=o.querySelectorAll(".dropdown-option");let Me=!1;Z===0?(ci(n,"sprint_id",null),Me=!0):Z>=1&&Z<ve.length&&(ve[Z].click(),Me=!0),Me&&(document.removeEventListener("keydown",S),ds(null))};ds(S),document.addEventListener("keydown",S),(g=o.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let l=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),l+r.height>window.innerHeight-8&&(l=a.top-r.height-4),o.style.top=`${l}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const d=y=>{const x=y.key;if(x==="Escape"||x==="Tab"){zt(),document.removeEventListener("keydown",d);return}if(am(y,o))return;const _=parseInt(x);if(isNaN(_))return;let L=!1;if(t==="status"&&_>=1&&_<=6)ci(n,"status",im[_-1]),L=!0;else if(t==="priority"&&_>=0&&_<=4)ci(n,"priority",$l[_]),L=!0;else if(t==="estimate"){const T=_e(),j=Ii(T==null?void 0:T.project_id);_>=0&&_<j.length&&(ci(n,"estimate",j[_].value),L=!0)}L&&(document.removeEventListener("keydown",d),ds(null))};ds(d),document.addEventListener("keydown",d),(b=o.querySelector(".dropdown-option[data-action]"))==null||b.focus(),us(o)}function ww(e,t,n,i){Dl(e,t,n,i)}function $w(e,t,n){sm=sm.then(()=>lm(e,t,n))}async function lm(e,t,n){const i=ie(),s=We(),a=_e(),o=i.find(d=>d.id===e)||s.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const d=await h.updateIssue(e,{label_ids:c}),u=d.labels||[],f=L=>({...L,labels:u,updated_at:d.updated_at??L.updated_at}),g=ie();g.some(L=>L.id===e)&&tt(g.map(L=>L.id===e?f(L):L));const b=We();b.some(L=>L.id===e)&&jn(b.map(L=>L.id===e?f(L):L));const y=_e();(y==null?void 0:y.id)===e&&ni(f(y));const x=to(e);if(x&&x.parentNode){const L=ie().find(T=>T.id===e)||We().find(T=>T.id===e);L&&(x.outerHTML=gi(L))}const _=document.querySelector(".property-labels-btn");_&&(_.innerHTML=u.length>0?u.map(L=>`
                    <span class="issue-label" style="background: ${re(L.color)}20; color: ${re(L.color)}">${p(L.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(k("update labels",d),n){const u=l>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function cm(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${m(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${m(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${m(t)}" data-label-id="${m(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${re(s.color)}20; color: ${re(s.color)}">${p(s.name)}</span>
                </button>
            `}).join("")}
    `}async function dm(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=C();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await h.createLabel(i.id,{name:s}),o=await h.getLabels(i.id);ms(o),a!=null&&a.id&&await lm(e,a.id,null);const r=ie(),l=We(),c=_e(),d=r.find(f=>f.id===e)||l.find(f=>f.id===e)||c,u=new Set(((d==null?void 0:d.labels)||[]).map(f=>f.id));t&&cm(t,e,o,u),n.value=""}catch(a){k("create label",a)}finally{n.disabled=!1,n.focus()}}}function no(){const e=document.getElementById("create-issue-labels-label");e&&(Bt.length===0?e.textContent="Labels":e.textContent=`Labels (${Bt.length})`)}function Ml(e,{failed:t=!1}={}){const n=vl();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=Bt.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${m(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${re(i.color)}20; color: ${re(i.color)}">${p(i.name)}</span>
                </button>
            `}).join("")}
    `}function kw(e){const t=Bt.indexOf(e);t>=0?Bt.splice(t,1):Bt.push(e),fl(),no();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Ml(n)}async function um(){const e=C();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await h.createLabel(e.id,{name:i}),a=await h.getLabels(e.id);ms(a),s!=null&&s.id&&!Bt.includes(s.id)&&(Bt.push(s.id),fl()),no(),t&&Ml(t),n.value=""}catch(s){k("create label",s)}finally{n.disabled=!1,n.focus()}}}async function ci(e,t,n){var r;zt();const i=Sw(e,t,n),s=Tw(e,t),a=(r=_l(e))==null?void 0:r[t],o=mm(e,t,()=>n);o&&jl(e,t,{focus:!0});try{const l={};l[t]=n;const c=await h.updateIssue(e,l);if(!c||!c.id)throw new Error("Invalid response from server");if($s(c),pm(e,t,i)){const d={...c,...Lw(e,t)};Aw(e,{issue:d,myIssue:d,detail:d}),Va(d),jl(e,t,{focus:!o})}}catch(l){if(k("update issue",l),pm(e,t,i)){mm(e,t,(d,u)=>d[t]===n?s[u]:d[t]);const c=_l(e);c&&c[t]===n&&Va({...c,[t]:a}),jl(e,t,{focus:!1})}return}finally{Iw(e,t,i)}if($("Issue updated","success"),t==="status")try{const l=X();if(l){const d=(await h.getSprints(l)).find(u=>u.status==="active");Rl(d||null)}}catch{}}const _w=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),ln=new Map;function Ew(e){const t=e&&ln.get(e.id);if(!(t!=null&&t.size))return e;const n={...e};return t.forEach((i,s)=>{n[s]=i.value}),n}let xw=0;function Sw(e,t,n){const i=++xw;return ln.has(e)||ln.set(e,new Map),ln.get(e).set(t,{seq:i,value:n}),i}function pm(e,t,n){var i,s;return((s=(i=ln.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function Iw(e,t,n){var s;const i=ln.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&ln.delete(e))}function Lw(e,t){var i;const n={};return(i=ln.get(e))==null||i.forEach((s,a)=>{a!==t&&(n[a]=s.value)}),n}function Tw(e,t){var i,s;const n=_e();return{issue:(i=ie().find(a=>a.id===e))==null?void 0:i[t],myIssue:(s=We().find(a=>a.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0}}function mm(e,t,n){const i=(l,c)=>({...l,[t]:n(l,c)});let s=!1;const a=ie();a.some(l=>l.id===e)&&(s=!0,tt(a.map(l=>l.id===e?i(l,"issue"):l)));const o=We();o.some(l=>l.id===e)&&(s=!0,jn(o.map(l=>l.id===e?i(l,"myIssue"):l)));const r=_e();return(r==null?void 0:r.id)===e&&(s=!0,ni(i(r,"detail"))),s}function Aw(e,t){var s;const n=ie();t.issue&&n.some(a=>a.id===e)&&tt(n.map(a=>a.id===e?t.issue:a));const i=We();t.myIssue&&i.some(a=>a.id===e)&&jn(i.map(a=>a.id===e?t.myIssue:a)),t.detail&&((s=_e())==null?void 0:s.id)===e&&ni(t.detail)}function Cw(e){return e==="estimate"||bw[Xa()]===e}function Bw(e,t,n,{focus:i}){var d;const s=to(e);if(!s||!s.parentNode||!n)return;const a=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&Cw(t)&&ie().some(u=>u.id===e))pt();else if(t==="status"&&s.closest("#my-issues-list"))Rn();else{const u=s.classList.contains("keyboard-selected");s.outerHTML=gi(n),u&&((d=to(e))==null||d.classList.add("keyboard-selected"))}if(!i&&!a)return;const r=to(e),l=yw[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus({preventScroll:!0})}function jl(e,t,{focus:n}){const i=ie().find(a=>a.id===e)||We().find(a=>a.id===e);i&&Va(i),Bw(e,t,i,{focus:n});const s=_e();(s==null?void 0:s.id)===e&&_w.has(t)&&Dw(t,s)}function Dw(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".issue-meta-line");if(i){const c=t.assignee_id?wt(t.assignee_id):null;i.outerHTML=nm(t,c?ut(c):null,{formatEstimate:vn})}const s=n.querySelector(".detail-sidebar");if(!s)return;let a=e;e==="assignee_id"&&(a="assignee"),e==="sprint_id"&&(a="sprint"),e==="issue_type"&&(a="type");const o=s.querySelectorAll(".property-row");let r=null;for(const c of o){const d=c.querySelector(".property-label");if(d&&d.textContent.toLowerCase()===a.toLowerCase()){r=c;break}}if(!r)return;const l=r.querySelector(".property-value");if(l){if(e==="status")l.innerHTML=`
            ${Xe(t.status)}
            <span>${Le(t.status)}</span>
        `;else if(e==="priority")l.innerHTML=`
            ${mt(t.priority)}
            <span>${Te(t.priority)}</span>
        `;else if(e==="issue_type")l.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${ct(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?wt(t.assignee_id):null,d=c?ut(c):null;l.innerHTML=d?`${Vt(c,"avatar-small")}<span>${p(d)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=my(),d=t.sprint_id&&c?c.find(u=>u.id===t.sprint_id):null;l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${d?p(d.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${vn(t.estimate,t.project_id)}</span>
        `);l.classList.add("updated"),setTimeout(()=>l.classList.remove("updated"),500),l==null||l.focus()}}oe({"update-issue-field":(e,t)=>{e.type==="keydown"&&e.preventDefault();const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?ci(t.issueId,i,n==="null"?null:Number(n)):ci(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{e.type==="keydown"&&e.preventDefault(),$w(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{dm(t.issueId)},"toggle-create-issue-label":(e,t)=>{kw(t.labelId)},"create-label-for-create-issue":()=>{um()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),dm(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),um())}});function io(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",fm)},0))}function fm(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",fm))}function Mw(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",di)):(e.classList.remove("hidden"),e.classList.remove("show-options"),Ke(),it(lp()),setTimeout(()=>{document.addEventListener("click",di)},0))}function jw(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",di)):(e.classList.remove("hidden"),Gw(),setTimeout(()=>{document.addEventListener("click",di)},0))}function di(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",di))}function ui(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",di)}function Ke(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=X();e.innerHTML=Gp.map(n=>{const i=Vp(n.key),s=lp()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${m(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function it(e){iy(e),Ke();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"status":Pw(t);break;case"priority":qw(t);break;case"type":Nw(t);break;case"assignee":Ow(t);break;case"sprint":Hw(t);break;case"labels":Fw(t);break;case"exclude_labels":Uw(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function Rw(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),Ke()}function Pw(e){const t=rn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=oi(t);let s=`
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
        `}),e.innerHTML=s}function qw(e){const t=Pn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function Nw(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${m(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function Ow(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"";let i=`
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
    `;vs({keepId:n||null}).forEach(({assignee:s,indent:a})=>{i+=`
            <label class="filter-option" data-action="set-assignee-filter" data-value="${m(s.id)}">
                <input type="radio" name="assignee-filter-radio" value="${m(s.id)}" ${n===s.id?"checked":""}>
                <span class="filter-option-label">${Ka(s,a)}</span>
            </label>
        `}),e.innerHTML=i}function Hw(e){if(!X()){e.innerHTML=`
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
                <span class="filter-option-label">${p(o.text)}</span>
            </label>
        `}),e.innerHTML=a}function Fw(e){const t=qn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${m(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${m(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${re(d)};"></span>
                    <span class="filter-option-label">${p(c)}</span>
                </label>
            `}),e.innerHTML=s}function Uw(e){const t=Nn(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${m(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${m(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${re(d)};"></span>
                    <span class="filter-option-label">${p(c)}</span>
                </label>
            `}),e.innerHTML=s}function Gw(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function Ye(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=rn();if(n.length>0){const d=oi(n),u=d==="open"?"Open":d==="closed"?"Closed":n.map(f=>Le(f)).join(", ");t.push({category:"status",label:"Status",value:u,clearAction:"clear-status-filter-new"})}const i=Pn();if(i.length>0){const d=i.map(u=>Te(u)).join(", ");t.push({category:"priority",label:"Priority",value:d,clearAction:"clear-priority-filter-new"})}const s=document.getElementById("issue-type-filter");if(s!=null&&s.value){const d=s.options[s.selectedIndex];t.push({category:"type",label:"Type",value:d?d.text:s.value,clearAction:"clear-type-filter"})}const a=document.getElementById("assignee-filter");if(a!=null&&a.value){let d;a.value==="me"?d="Me":a.value==="unassigned"?d="Unassigned":d=ut(wt(a.value))||"Unknown",t.push({category:"assignee",label:"Assignee",value:d,clearAction:"clear-assignee-filter"})}const o=document.getElementById("sprint-filter");if(o!=null&&o.value){const d=o.options[o.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(d==null?void 0:d.text)||o.value,clearAction:"clear-sprint-filter"})}const r=qn();if(r.length>0){const d=document.getElementById("label-filter-dropdown"),u=r.map(f=>{var y;const g=d==null?void 0:d.querySelector(`input[value="${f}"]`),b=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:u,clearAction:"clear-label-filter-new"})}const l=Nn();if(l.length>0){const d=document.getElementById("exclude-label-filter-dropdown"),u=l.map(f=>{var y;const g=d==null?void 0:d.querySelector(`input[value="${f}"]`),b=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:u,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let c=t.map(d=>`
        <span class="filter-chip" title="${m(d.label)}: ${m(d.value)}">
            <span class="filter-chip-label">${d.label}:</span>
            <span class="filter-chip-value">${p(d.value)}</span>
            <button class="filter-chip-remove" data-action="${d.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(c+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=c}function Qe(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Bl();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function gm(){const e=document.getElementById("sprint-filter");if(!e)return;const t=X(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",Rl(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await h.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${p(a.name)})</option>`),Cf(t,a==null?void 0:a.id),Rl(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${p(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function Rl(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${p(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${p(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function zw(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let hm=!1;dt(e=>{if(e!=="currentProject"||A()!=="issues"||hm)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([gm(),Qp()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),Ja(),eo(),rt(),Ye(),Qe()}).catch(n=>{console.error("Failed to update filters on project switch:",n),rt(),Ye(),Qe()})});function Vw(){ow(e=>{hm=e})}function so(){Kp(),rt(),Ye(),Qe()}function ao(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),so()}function Pl(){Yp(),rt(),Ye(),Qe()}function ql(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Pl()}function Nl(){Ja(),rt(),Ye(),Qe()}function oo(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Nl()}function Ol(){eo(),rt(),Ye(),Qe()}function ro(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Ol()}function Ww(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function vm(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${Ww(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let ks=0;function _s(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function bm(){var t,n,i,s,a,o;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=C())==null?void 0:t.id)||"",project:X()||"",status:[...rn()].sort(),priority:[...Pn()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim())||""})}let cn=null;function Kw(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function pi(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function ym(e,t){pi(!1),Wa(e),tt(t),A()==="issues"&&At(t),pt(),cn=e,_s(by(e).hiddenClosed||0)}function Yw(e,t,{loading:n}){Wa(null),tt(t),A()==="issues"&&At(t),pt(),pi(n),cn=e,_s(0)}function wm(){Wa(null),cn=null,pi(!1),zw(),_s(0)}function Qw(){const e=document.getElementById("issues-list");_s(0),e!=null&&e.querySelector(".issue-row")?pi(!0):wm()}function Zw(){const e=Ey(bm()),t=e?wp(e):null;return t?(Bn(-1),ym(e,t),!0):(wm(),!1)}function Xw(e,t,n,i=()=>!0){if(!Array.isArray(t))return t;const s=new Map(e.map(c=>[c.id,c])),a=new Set(t.map(c=>c.id)),o=new Set(t.filter(c=>!n.has(c.id)).map(c=>c.title)),r=e.filter(c=>!n.has(c.id)&&!a.has(c.id)&&!(c._isOptimistic&&o.has(c.title))&&(c._isOptimistic||i(c))),l=[];for(const c of t){const d=s.get(c.id);if(!d&&n.has(c.id))continue;const u=d&&$p(d.updated_at,c.updated_at)?d:c;l.push(Ew(u))}return r.length?[...r,...l]:l}async function Dt(){var x,_,L,T,j,E,w;Bn(-1),Kw();const e=++ks;if(!C())return;const t=X()||"",n=rn(),i=Pn(),s=(x=document.getElementById("assignee-filter"))==null?void 0:x.value,a=(L=(_=document.getElementById("issue-search"))==null?void 0:_.value)==null?void 0:L.trim();if(!t&&se().length===0){cn=null,document.getElementById("issues-list").innerHTML=K({icon:z.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const o=bm(),r={limit:1e3},l=((T=document.getElementById("sort-by-select"))==null?void 0:T.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(j=ue())==null?void 0:j.id:r.assignee_id=s);const u=(E=document.getElementById("sprint-filter"))==null?void 0:E.value;if(u)if(u==="current"){if(t){const D=aE(t);if(D!==void 0)D&&(r.sprint_id=D);else try{const te=(await h.getSprints(t)).find(ae=>ae.status==="active");Cf(t,te==null?void 0:te.id),te&&(r.sprint_id=te.id)}catch(H){console.error("Failed to resolve current sprint:",H)}}}else r.sprint_id=u;const f=(w=document.getElementById("issue-type-filter"))==null?void 0:w.value;f&&(r.issue_type=f),a&&a.length>=1?r.search=a:r.fields="list";let g=!1,b=!1,y=null;try{const D=vm(qn(),"label-filter-dropdown");D.length>0&&(r.label=D,r.label_match="any");const H=vm(Nn(),"exclude-label-filter-dropdown");H.length>0&&(r.exclude_label=H),t&&(r.project_id=t);const te=t||`team:${C().id}`;y=bp({...r,scope:te});const ae=wp(y);if(ae)g=!0,cn===y&&_y()===y&&xp(ie(),ae)||ym(y,ae);else{const Y=Ay({...r,scope:te});Y&&(Y.complete||Y.rows.length>0)?(b=!0,Yw(y,Y.rows,{loading:!Y.complete})):Qw()}const ne=Y=>t?h.getIssues(Y):se().length>0?h.getTeamIssues(C().id,Y):Promise.resolve(void 0),S=r.search&&oi(n)==="open"?ne({...r,status:Cl}).then(Y=>Array.isArray(Y)?Y.length:0).catch(Y=>(console.error("Failed to count closed search matches:",Y),0)):Promise.resolve(0),M=new Set(ie().map(Y=>Y.id)),P=await ne(r);if(kp(y,P),e!==ks)return;_p(o,y);const Z=(g||b)&&cn===y,ve=Z?Xw(ie(),P,M,Lp(r)):P,Me=Z&&xp(ie(),ve);Wa(y),tt(ve),A()==="issues"&&At(Array.isArray(ve)?ve.filter(Y=>!Y._isOptimistic):ve);const qe=[...new Set(ve.map(Y=>Y.project_id).filter(Boolean))],Sn=Object.keys(Ro()).length;if(await Af(qe),e!==ks)return;const B=Object.keys(Ro()).length!==Sn;(!Me||B)&&pt(),cn=y,pi(!1);const U=await S;if(wy(y,{hiddenClosed:U}),e!==ks)return;_s(U)}catch(D){if(e!==ks)return;pi(!1);const H=(D==null?void 0:D.status)===403||(D==null?void 0:D.status)===404;if(g&&!H){k("refresh issues",D);return}H&&y&&$y(y),cn=null;const te=document.getElementById("issues-list");te&&(te.innerHTML=K({icon:z.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),k("load issues",D)}}function Jw(){clearTimeout(dy()),uy(setTimeout(()=>{Dt()},300))}function rt(){Wp(),Dt()}async function $m(){if(Wp(),Xa()==="sprint"){const e=ie(),t=[...new Set(e.map(n=>n.project_id))];await Af(t)}pt()}function e$(){Ye(),Qe()}function t$(e){const t=e==="open"?gs:e==="closed"?Cl:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),so(),Ke(),it("status")}function n$(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,so()),Ke(),it("status")}function i$(){ao(),Ke(),it("status"),Ye(),Qe()}function s$(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Pl()),Ke(),it("priority")}function a$(){ql(),Ke(),it("priority"),Ye(),Qe()}function km(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,rt()),Ke(),it("type"),Ye(),Qe(),ui()}function o$(){km("")}function _m(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,rt()),Ke(),it("assignee"),Ye(),Qe(),ui()}function r$(){_m("")}function Em(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,rt()),Ke(),it("sprint"),Ye(),Qe(),ui()}function l$(){Em("")}function c$(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Nl()),Ke(),it("labels")}function d$(){oo(),Ke(),it("labels"),Ye(),Qe()}function u$(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Ol()),Ke(),it("exclude_labels")}function p$(){ro(),Ke(),it("exclude_labels"),Ye(),Qe()}function m$(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Dt()),ui()}function f$(e){const t=document.getElementById("group-by-select");t&&(t.value=e,$m()),ui()}function g$(){ao(),ql();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),oo(),ro(),rt(),Ye(),Qe()}oe({"update-label-filter":()=>Nl(),"clear-label-filter":()=>oo(),"update-exclude-label-filter":()=>Ol(),"clear-exclude-label-filter":()=>ro(),"show-filter-category":(e,t)=>{var n,i;it(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{Rw();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"clear-status-filter-new":()=>i$(),"set-status-preset":(e,t)=>t$(t.value),"show-all-statuses":()=>ao(),"toggle-status-option":(e,t)=>n$(t.filterValue,e),"clear-priority-filter-new":()=>a$(),"toggle-priority-option":(e,t)=>s$(t.filterValue,e),"set-type-filter":(e,t)=>km(t.value),"clear-type-filter":()=>o$(),"set-assignee-filter":(e,t)=>_m(t.value),"clear-assignee-filter":()=>r$(),"set-sprint-filter":(e,t)=>Em(t.value),"clear-sprint-filter":()=>l$(),"clear-label-filter-new":()=>d$(),"toggle-label-option":(e,t)=>c$(t.filterValue,e),"clear-exclude-label-filter-new":()=>p$(),"toggle-exclude-label-option":(e,t)=>u$(t.filterValue,e),"set-sort":(e,t)=>m$(t.value),"set-group-by":(e,t)=>f$(t.value),"clear-all-filters":()=>g$(),"retry-load-issues":()=>Dt()});const xm=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function dn(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function mi(e){const t=dn(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const h$=60,v$=150;let Ze=[],Es=1/0,un=null,lo=null,xs=null;const co=new Map;let fi=null,uo=[],Ss=null;const Sm=e=>{var t;return`${((t=ue())==null?void 0:t.id)??""}|${e}`},b$=24;function y$(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(h$,Math.ceil((e+2*t)/b$))}function pn(e,t){if(e!==null&&(fi!=null&&fi.has(String(e))))return uo.push({groupKey:e,ids:t.map(i=>i.id)}),"";const n=t.slice(0,Math.max(0,Es));return Es-=n.length,n.length<t.length&&Ze.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>gi(i)).join("")}function Im(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function Lm(){clearTimeout(un),un=null,Fl++,Ze=[],lo=null,Ss=null,xs=null}function Hl(e=1/0){if(Ze.length===0)return;const t=document.getElementById("issues-list");if(!t||!(xs!=null&&xs.isConnected)){Lm();return}const n=new Map(ie().map(s=>[s.id,s]));let i=e;for(;Ze.length>0&&i>0;){const s=Ze[0],a=s.ids.slice(0,i),o=Im(t,s.groupKey),r=a.map(l=>n.get(l)).filter(Boolean).map(l=>gi(l)).join("");o==null||o.insertAdjacentHTML("beforeend",r),i-=a.length,a.length===s.ids.length?Ze.shift():s.ids=s.ids.slice(a.length)}if(Ss){const s=Ss;po(t,s.issueId)&&(Ss=null,Dm(t,s))}if(Ze.length===0){clearTimeout(un),un=null;const s=lo;lo=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&Tm(s)}}const w$=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{un=setTimeout(e,0)}):un=setTimeout(e,16);let Fl=0;function $$(){if(clearTimeout(un),Ze.length===0)return;const e=++Fl;w$(function t(){e===Fl&&(Hl(v$),Ze.length>0&&(un=setTimeout(t,0)))})}function pt(){var d,u;const e=document.getElementById("issues-list");if(!e)return;const t=e.querySelector(".issue-row.keyboard-selected"),n=t==null?void 0:t.dataset.issueId,i=C$(e),s=f=>{var g;return((g=f==null?void 0:f.closest(".issue-group"))==null?void 0:g.dataset.group)??null},a=[[n,s(t)],[i==null?void 0:i.issueId,s(i==null?void 0:i.row)]];e.classList.add("issue-list-linear"),Lm(),Es=y$();const o=ie();if(o.length===0){const f=(u=(d=document.getElementById("issue-search"))==null?void 0:d.value)==null?void 0:u.trim(),g=Bl()>0,b=f&&f.length>=2;if(g||b){const y=Bl(),x=[];b&&x.push(`search "${f}"`),g&&x.push(`${y} active filter${y>1?"s":""}`),e.innerHTML=K({icon:z.issues,heading:"No matching issues",description:`No issues match your ${x.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=K({icon:z.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Bn(-1),Es=1/0;return}const r=Xa();fi=co.get(Sm(r))||null,uo=[],r==="status"?k$(e,o):r==="priority"?_$(e,o):r==="type"?E$(e,o):r==="assignee"?x$(e,o):r==="sprint"?S$(e,o):e.innerHTML=mi(o)+pn(null,o),Es=1/0,xs=e.firstElementChild,Ze.push(...uo),uo=[];const l=fi;fi=null,l!=null&&l.size&&(e.querySelectorAll(".issue-group").forEach(f=>{l.has(f.dataset.group)&&Cm(f,!0)}),a.forEach(([f,g])=>{f&&A$(f,e,g)})),i&&(po(e,i.issueId)?Dm(e,i):Ze.length>0&&(Ss=i));const c=!!n&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),f=>f.dataset.issueId===n);n&&Ze.length>0&&!c?lo=n:Tm(n),$$()}function Tm(e){const t=cp();if(t<0)return;const n=document.querySelectorAll(Ga);if(n.length===0){Bn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),Bn(i),n[i].classList.add("keyboard-selected")}function k$(e,t){const n={};wl.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=mi(t);wl.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Xe(s)}</span>
                    <span class="group-title">${Le(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${dn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function _$(e,t){const n={};fp.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=mi(t);fp.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${mt(s)}</span>
                    <span class="group-title">${Te(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${dn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function E$(e,t){const n={};xm.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=mi(t);xm.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${ct(s)}</span></span>
                    <span class="group-title">${ct(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${dn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function x$(e,t){const n={},i="__unassigned__";n[i]=[];const s=vs({includeIdle:!0});s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=mi(t);n[i].length>0&&(a+=`
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
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=ut(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${m(o.id)}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${m(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Vt(o,"avatar-small")}</span>
                    <span class="group-title">${p(l)}${p(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${dn(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(o.id,r)}
                </div>
            </div>
        `}),e.innerHTML=a}function S$(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const a={active:0,planned:1,completed:2},o=Ro();s.sort((l,c)=>{const d=o[l],u=o[c],f=d?a[d.status]??3:3,g=u?a[u.status]??3:3;return f-g});let r=mi(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=o[l],u=d?d.name:l,f=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${g}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${p(u)}${f}</span>
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
        `),e.innerHTML=r}function Am(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-group"),n=>n.dataset.group===String(t))||null}function po(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-row"),n=>n.dataset.issueId===t)||null}function I$(e,t){const n=Im(e,t);if(!n)return;const i=new Map(ie().map(s=>[s.id,s]));Ze=Ze.filter(s=>{if(String(s.groupKey)!==String(t))return!0;const a=s.ids.map(o=>i.get(o)).filter(Boolean).map(o=>gi(o)).join("");return n.insertAdjacentHTML("beforeend",a),!1})}function Cm(e,t){var n;e.classList.toggle("collapsed",t),(n=e.querySelector(".issue-group-header"))==null||n.setAttribute("aria-expanded",String(!t))}function L$(e,t){const n=Array.from(document.querySelectorAll(Ga)),i=e.querySelector(".issue-row.keyboard-selected");if(!i)return;let s=n.indexOf(i);s<0&&(i.classList.remove("keyboard-selected"),s=n.findIndex(a=>t.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING&&!t.contains(a)),s<0&&(s=n.length-1),s>=0&&n[s].classList.add("keyboard-selected")),Bn(s)}function Bm(e,t,n){Cm(t,n);const i=Sm(Xa());co.has(i)||co.set(i,new Set);const s=co.get(i);n?s.add(t.dataset.group):(s.delete(t.dataset.group),I$(e,t.dataset.group)),L$(e,t)}function T$(e){const t=document.getElementById("issues-list"),n=t&&Am(t,e);n&&Bm(t,n,!n.classList.contains("collapsed"))}function A$(e,t=document.getElementById("issues-list"),n=void 0){var a;if(!e||!t)return;const i=Ze.find(o=>o.ids.includes(e)),s=i?i.groupKey===null?null:Am(t,i.groupKey):(a=po(t,e))==null?void 0:a.closest(".issue-group");s!=null&&s.classList.contains("collapsed")&&(n!==void 0&&s.dataset.group===n||Bm(t,s,!1))}function C$(e){var i;const t=document.activeElement;if(!t||t===e||!e.contains(t))return null;const n=t.closest(".issue-row");return n!=null&&n.dataset.issueId?{issueId:n.dataset.issueId,row:n,dropdownType:((i=t.dataset)==null?void 0:i.dropdownType)||null,isTitle:t.classList.contains("issue-title")}:null}function Dm(e,{issueId:t,dropdownType:n,isTitle:i}){if(e.contains(document.activeElement))return;const s=po(e,t);if(!s)return;const a=n?s.querySelector(`[data-dropdown-type="${n}"]`):i?s.querySelector(".issue-title"):s.querySelector("a[href], button");a==null||a.focus({preventScroll:!0})}function Mm(e,t){if(!e)return"";if(!t)return p(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return p(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${p(i)}<mark class="search-match">${p(s)}</mark>${p(a)}`}function B$(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=Mm(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}const D$=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function gi(e){var f,g,b;const t=e.assignee_id?wt(e.assignee_id):null,n=t?ut(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":D$.format(i),a=e.estimate!=null?vn(e.estimate,e.project_id):"",o=zo(e.estimate,e.project_id),r=e.sprint_id?Ro()[e.sprint_id]:null,l=r?r.name:null,c=(g=(f=document.getElementById("issue-search"))==null?void 0:f.value)==null?void 0:g.trim(),d=!!c&&((b=e.title)==null?void 0:b.toLowerCase().includes(c.toLowerCase())),u=c&&!d?B$(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${m(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${m(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${m(e.id)}" title="Priority: ${Te(e.priority)}">
                    ${mt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${m(e.id)}" title="Status: ${Le(e.status)}">
                    ${Xe(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${ct(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${m(e.id)}">${Mm(e.title,c)}${u?` <span class="issue-search-snippet" title="Matched in description">— ${u}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(y=>`
                            <span class="issue-label" style="background: ${re(y.color)}20; color: ${re(y.color)}">${p(y.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${m(e.id)}" title="Sprint: ${l?p(l):"None"}">
                    ${l?`<span class="sprint-badge">${p(l)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${m(e.id)}" title="${o?"Estimate outside current scale":`Estimate: ${a||"None"}`}">
                    ${a?`<span class="estimate-badge${o?" out-of-scale":""}">${a}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${m(e.id)}" title="${m(n||"Unassigned")}">
                    ${n?Vt(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function mt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Xe(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}oe({"toggle-group":(e,t)=>{if((e==null?void 0:e.type)==="keydown"){if(e.repeat)return;e.preventDefault()}T$(t.group)},"show-inline-dropdown":(e,t,n)=>{Dl(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),ce(t.issueId))}});let hi=[];function ft(){return hi}function M$(e){hi=Array.isArray(e)?e:[]}function j$(e){const t=e==null?void 0:e.avatar_url,n=m((e==null?void 0:e.name)||"Agent");return t?ap(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${m(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${p(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function R$(e){var t,n;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{const i=await h.getTeamAgents(e);if(((n=C())==null?void 0:n.id)!==e)return;hi=i,hs(kt,ft),ii()}catch(i){console.error("Failed to load team agents:",i),k("load team agents",i)}}async function Is(e){var t;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{hi=await h.getTeamAgents(e),hs(kt,ft),ii(),P$()}catch(n){k("load agents",n)}}function P$(){var a;const e=document.getElementById("agents-list");if(!e)return;const t=(a=ue())==null?void 0:a.id,n=hi.filter(o=>o.parent_user_id===t&&o.kind!=="session");if(n.length===0){e.innerHTML=K({icon:z.dashboard,heading:"No agents yet",description:"Create an agent to give CLI automation its own identity"});return}const i=se(),s=o=>{if(!o)return"Team-wide";const r=i.find(l=>l.id===o);return r?`Project ${r.key}`:"One project"};e.innerHTML=n.map(o=>{const r=m(o.id),l=hi.filter(d=>d.registered_by_id===o.id).length,c=[s(o.agent_project_id),o.can_register?`Registrar · ${l} session${l===1?"":"s"}`:null,`Created ${Se(o.created_at)}`].filter(Boolean).join(" · ");return`
      <a class="list-row-2line agent-link-row" href="/people/${r}" data-action="view-person" data-user-id="${r}">
        <div class="agent-link-avatar" aria-hidden="true">${j$(o)}</div>
        <div class="list-row-main">
          <div class="list-row-title">${p(o.name)}${o.is_active===!1?' <span class="badge badge-neutral">Deactivated</span>':""}</div>
          <div class="list-row-sub">${p(c)}</div>
        </div>
        <span class="list-row-right list-row-sub">Open profile</span>
      </a>`}).join("")}function q$(){const e=se();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${p(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),G()}function jm(e,t,n=!1){const i=p(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,G()}async function N$(e){var r,l,c,d;e.preventDefault();const t=(r=C())==null?void 0:r.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value,o=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let u;s&&a?u=await h.createProjectAgent(a,n,i,o):u=await h.createTeamAgent(t,n,i,o),F(),jm("Agent Created",u.api_key,!!u.can_register),await Is(),mo(u.id,{created:!0})}catch(u){k("create agent",u)}return!1}async function O$(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await h.createAgentKey(e);jm("New Agent Key",n.key),mo(e,{credentials:!0})}catch(n){k("generate agent key",n)}}async function H$(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await h.updateAgent(e,{can_register:n}),$(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),await Is(),mo(e)}catch(s){k("change registrar",s)}}function mo(e,{deleted:t=!1,created:n=!1,credentials:i=!1}={}){window.dispatchEvent(new CustomEvent("chaotic:agent-changed",{detail:{agentId:e,deleted:t,created:n,credentials:i}}))}function F$(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{$("Agent API key copied to clipboard","success")}).catch(()=>{$("Failed to copy","error")})}async function U$(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),$("Agent deleted","success"),await Is(),mo(e,{deleted:!0})}catch(n){k("delete agent",n)}}oe({"create-agent":e=>{N$(e)},"copy-agent-key":()=>{F$()},"dismiss-agent-modal":()=>{F(),Is()},"delete-agent":(e,t)=>{e!=null&&e.type&&e.type!=="click"||U$(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{e!=null&&e.type&&e.type!=="click"||O$(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{e!=null&&e.type&&e.type!=="click"||H$(t.agentId,t.agentName,t.canRegister!=="true")}});function G$(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function z$(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const a of e){const o=a.user_id||a.id;i.has(o)||(i.add(o),s.push({id:o,name:a.user_name||a.name||a.user_email||a.email||"User",email:a.user_email||a.email||"",handle:G$(a),isAgent:!1}))}for(const a of t)!a.mention_handle||a.is_active===!1||a.idle||i.has(a.id)||n!==void 0&&a.agent_project_id&&a.agent_project_id!==n||(i.add(a.id),s.push({id:a.id,name:a.name||"Agent",email:"",handle:a.mention_handle,isAgent:!0}));return s}function Rm(e,t={},n=6){const i=(e||"").toLowerCase();return z$(kt(),ft(),t).filter(s=>!i||s.handle.includes(i)||s.name.toLowerCase().includes(i)||s.email.toLowerCase().includes(i)).slice(0,n)}function V$(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function Ul(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let a=-1;const o=()=>{s.classList.add("hidden"),s.innerHTML="",a=-1},r=d=>{var f,g;const u=s.querySelectorAll(".mention-suggestion");u.length!==0&&(a=(d%u.length+u.length)%u.length,u.forEach((b,y)=>b.classList.toggle("highlighted",y===a)),(g=(f=u[a]).scrollIntoView)==null||g.call(f,{block:"nearest"}))},l=d=>{const u=i.selectionStart||0,f=i.value.slice(0,u).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),g=i.value.slice(u);i.value=f+g,i.focus(),o()},c=()=>{if(i.hidden){o();return}const d=i.selectionStart||0;if(V$(i.value,d)){o();return}const f=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!f){o();return}const g=f[2].toLowerCase(),b=Rm(g,i.mentionContext||{});if(!b.length){o();return}s.innerHTML=b.map(y=>`
            <button type="button" class="mention-suggestion" data-handle="${m(y.handle)}">
                <span class="mention-name">${p(y.name)}${y.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${p(y.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((y,x)=>{y.addEventListener("click",()=>l(y.dataset.handle)),y.addEventListener("mouseenter",()=>r(x))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const u=!s.classList.contains("hidden");if(d.key==="Escape"&&u){d.preventDefault(),d.stopPropagation(),o();return}if(u){if(d.key==="ArrowDown")d.preventDefault(),r(a+1);else if(d.key==="ArrowUp")d.preventDefault(),r(a-1);else if(d.key==="Enter"||d.key==="Tab"){const g=s.querySelectorAll(".mention-suggestion")[a];g&&(d.preventDefault(),l(g.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(o,150)})}const Ls=new Set(["image/png","image/jpeg","image/gif","image/webp"]),Gl={file:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',clip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>',remove:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>'},Ts=new Map,mn=new Map;function zl(e){for(const t of e||[])t&&ls.test(t.id)&&Ts.set(t.id,t)}function As(e){return String(e||"").split(";")[0].trim().toLowerCase()}function Pm(e){let t=mn.get(e);return t||(t={promise:null,url:null,type:null},mn.set(e,t),t.promise=h.fetchAttachmentContent(e).then(n=>(t.type=As(n.type),mn.get(e)===t&&Ls.has(t.type)&&(t.url=URL.createObjectURL(n)),t)),t.promise.catch(()=>{mn.get(e)===t&&mn.delete(e)})),t.promise}function W$(e){const t=mn.get(e);t!=null&&t.url&&URL.revokeObjectURL(t.url),mn.delete(e)}function qm(){for(const e of[...mn.keys()])document.querySelector(`img[data-attachment-id="${e}"]`)||W$(e)}function K$(e){return`/api/attachments/${e}/content`}function Nm(e,t){const n=document.createElement("a");return n.className="attachment-link",n.href=K$(e),n.setAttribute("data-action","open-attachment"),n.setAttribute("data-attachment-ref",e),t&&n.setAttribute("data-filename",t),n.innerHTML=Gl.clip,n.append(` ${t||"Download attachment"}`),n}function Y$(e,t){const n=document.createElement("span");n.className="attachment-unavailable";const i=(e==null?void 0:e.status)===410?"file no longer stored":(e==null?void 0:e.status)===404?"not found":"could not be loaded";return n.textContent=`${t||"Attachment"}: ${i}`,n}function fo(e=document){var n;const t=e.querySelectorAll("img[data-attachment-id]:not([data-attachment-state])");for(const i of t){const s=i.getAttribute("data-attachment-id");if(!ls.test(s)){i.setAttribute("data-attachment-state","invalid");continue}const a=i.getAttribute("alt")||((n=Ts.get(s))==null?void 0:n.filename)||"",o=Ts.get(s);if(o&&!Ls.has(As(o.content_type))){i.replaceWith(Nm(s,o.filename||a));continue}i.setAttribute("data-attachment-state","loading"),Pm(s).then(r=>{r.url?(i.src=r.url,i.setAttribute("data-attachment-state","loaded")):i.isConnected&&i.replaceWith(Nm(s,a))},r=>{i.setAttribute("data-attachment-state","failed"),i.isConnected&&!i.closest(".attachment-thumb")&&i.replaceWith(Y$(r,a))}).finally(Wl)}}let Vl=!1;function Wl(){Vl||(Vl=!0,queueMicrotask(()=>{Vl=!1,!(typeof document>"u")&&(fo(document),qm())}))}let Kl=null;function Q$(){Kl||typeof MutationObserver>"u"||!document.body||(Kl=new MutationObserver(Wl),Kl.observe(document.body,{childList:!0,subtree:!0}),document.addEventListener("auxclick",fk),Wl())}async function Om(e,t){try{const n=await h.fetchAttachmentContent(e),i=URL.createObjectURL(n),s=document.createElement("a");s.href=i,s.download=t||"attachment",s.rel="noopener",s.style.display="none",document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(i),1e4)}catch(n){k("download attachment",n)}}let fn=null;function Z$(){fn==null||fn.disconnect(),fn=null;const e=document.getElementById("modal-overlay");!e||typeof MutationObserver>"u"||(fn=new MutationObserver(()=>{var t;e.classList.contains("hidden")&&(fn.disconnect(),fn=null,(t=document.querySelector("#modal-content .attachment-viewer"))==null||t.remove(),qm())}),fn.observe(e,{attributes:!0,attributeFilter:["class"]}))}function X$(e,t){var n,i;document.getElementById("modal-title").textContent=t||"Attachment",document.getElementById("modal-content").innerHTML=`
        <figure class="attachment-viewer">
            <img data-attachment-id="${m(e)}" alt="${m(t||"")}">
            <figcaption class="attachment-viewer-actions">
                <button type="button" class="btn btn-secondary btn-sm" data-action="download-attachment" data-attachment-id="${m(e)}" data-filename="${m(t||"")}">Download</button>
            </figcaption>
        </figure>`,(n=document.querySelector(".modal"))==null||n.classList.add("modal-wide"),G(),Z$(),(i=document.querySelector("#modal-content .attachment-viewer-actions button"))==null||i.focus(),fo(document.getElementById("modal-content"))}async function J$(e,{filename:t="",contentType:n=""}={}){if(!ls.test(e||""))return;const i=Ts.get(e),s=t||(i==null?void 0:i.filename)||"";let a=As(n||(i==null?void 0:i.content_type));if(!a)try{a=(await Pm(e)).type}catch(o){k("open attachment",o);return}Ls.has(a)?X$(e,s):Om(e,s)}let ee=null;function Yl(e){const t=Number(e)||0;return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(t<10*1024?1:0)} KB`:`${(t/(1024*1024)).toFixed(1)} MB`}function ek(e,{userId:t,isAdmin:n}){return n!==!1||!!t&&e.uploader_id===t}function tk(e,t){const n=Ls.has(As(e.content_type)),i=e.filename||"attachment",s=[Yl(e.size),e.uploader_name||"Unknown",et(e.created_at)].filter(Boolean).map(p).join(" · ");return`
        <li class="attachment-item">
            <button type="button" class="attachment-open" data-action="open-attachment" data-attachment-id="${m(e.id)}" data-filename="${m(i)}" data-content-type="${m(e.content_type||"")}" title="${n?"View":"Download"} ${m(i)}">
                <span class="attachment-thumb">${n?`<img data-attachment-id="${m(e.id)}" alt="">`:Gl.file}</span>
                <span class="attachment-name">${p(i)}</span>
                <span class="attachment-meta">${s}</span>
            </button>
            ${ek(e,t)?`<button type="button" class="attachment-delete" data-action="delete-attachment" data-attachment-id="${m(e.id)}" data-filename="${m(i)}" title="Delete" aria-label="Delete ${m(i)}">${Gl.remove}</button>`:""}
        </li>`}const Hm=10*1024*1024,nk=/^(image\/|video\/|audio\/|font\/)|^application\/(zip|gzip|x-gzip|x-tar|x-7z-compressed|x-rar-compressed|vnd\.rar|x-bzip2|x-xz|java-archive|vnd\.android\.package-archive|x-msdownload|wasm)$/,ik=2*1024*1024;function sk(e){const t=(e==null?void 0:e.name)||"file",n=As(e==null?void 0:e.type);return!e||e.size===0&&!n?`${t} is empty or a folder`:e.size>Hm?`${t} is ${Yl(e.size)}; the limit is ${Yl(Hm)}`:n&&!Ls.has(n)&&nk.test(n)?`${t} can't be attached: only PNG, JPEG, GIF, WebP, PDF or plain text`:null}const ak="Drop files here, or use Add. PNG, JPEG, GIF, WebP, PDF or text, up to 10 MB.";function Fm(e,t){return e===null?'<p class="attachments-hint">Attachments could not be loaded.</p>':e.length?`<ul class="attachment-grid">${e.map(n=>tk(n,t)).join("")}</ul>`:`<p class="attachments-hint">${ak}</p>`}function ok(e,t,{userId:n=null,isAdmin:i=!1}={}){ee={issueId:e,attachments:t?[...t]:null,userId:n,isAdmin:i},zl(t||[]);const s=(t==null?void 0:t.length)||0;return`
        <section class="attachments" id="issue-attachments" aria-label="Attachments" data-issue-id="${m(e)}">
            <div class="related-head">
                <h3 id="attachments-heading" tabindex="-1">Attachments <span class="section-count">${s||""}</span></h3>
                <label class="ticket-gate-text-btn attachments-add">
                    + Add
                    <input type="file" multiple class="sr-only" data-action="pick-attachments" data-issue-id="${m(e)}" aria-label="Attach files">
                </label>
            </div>
            <div class="attachments-status" role="status" aria-live="polite"></div>
            <div class="attachments-body">${Fm(ee.attachments,{userId:n,isAdmin:i})}</div>
        </section>`}function Ql(e){const t=document.getElementById("issue-attachments");return t&&ee&&ee.issueId===e&&t.dataset.issueId===e?t:null}function Zl(e,t){var i;const n=(i=Ql(e))==null?void 0:i.querySelector(".attachments-status");n&&(n.textContent=t)}function Um(e){const t=Ql(e);if(!t)return;const{attachments:n,userId:i,isAdmin:s}=ee;t.querySelector(".section-count").textContent=n!=null&&n.length?String(n.length):"";const a=t.querySelector(".attachments-body");a.innerHTML=Fm(n,{userId:i,isAdmin:s}),fo(a)}function rk(){if(typeof crypto<"u"&&typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(n=>n.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}const lk=e=>new Promise(t=>setTimeout(t,e)),Gm={inFlightRetryMs:1e3,inFlightTries:3},zm=e=>{var t;return((t=e==null?void 0:e.detail)==null?void 0:t.error_code)==="idempotency_in_flight"};async function ck(e,t){const n=rk(),i=()=>h.uploadAttachment(e,t,{idempotencyKey:n});try{return await i()}catch(s){if(!(s!=null&&s.isNetworkError)||t.size>ik)throw s}for(let s=1;;s++)try{return await i()}catch(a){if(!zm(a)||s>=Gm.inFlightTries)throw a;await lk(Gm.inFlightRetryMs)}}async function dk(e){try{const t=await h.getAttachments(e);return zl(t),(ee==null?void 0:ee.issueId)===e&&(ee.attachments=[...t]),t}catch{return null}}let Vm=Promise.resolve();function Wm(e,t){const n=[...t||[]],i=Vm.then(()=>uk(e,n));return Vm=i.catch(()=>0),i}async function uk(e,t){if(!t.length)return 0;let n=0,i=!1;for(const[s,a]of t.entries()){const o=sk(a);if(o){$(o,"error");continue}Zl(e,t.length>1?`Uploading ${a.name} (${s+1} of ${t.length})…`:`Uploading ${a.name}…`);try{const r=await ck(e,a);n+=1,zl([r]),(ee==null?void 0:ee.issueId)===e&&ee.attachments&&(ee.attachments=[...ee.attachments.filter(l=>l.id!==r.id),r])}catch(r){r!=null&&r.isNetworkError||zm(r)?(i=!0,$(`${a.name} may not have been attached; the list shows what was`,"error")):k(`attach ${a.name}`,r)}}return(ee==null?void 0:ee.issueId)===e&&(i||n&&ee.attachments===null)&&await dk(e),Um(e),Zl(e,n?n===1?"1 file attached":`${n} files attached`:""),n&&$(n===1?"File attached":`${n} files attached`,"success"),n}async function pk(e,t){if(!ls.test(e||"")||!confirm(`Delete ${t||"this attachment"}? Comments that show it will show it as missing.`))return!1;try{await h.deleteAttachment(e)}catch(o){return k("delete attachment",o),!1}Ts.delete(e);const n=ee==null?void 0:ee.issueId,i=(ee==null?void 0:ee.attachments)||[],s=i.findIndex(o=>o.id===e);ee!=null&&ee.attachments&&(ee.attachments=i.filter(o=>o.id!==e)),Um(n);const a=Ql(n);if(a){const o=ee.attachments||[],r=o[Math.min(Math.max(s,0),o.length-1)],l=r?a.querySelector(`.attachment-open[data-attachment-id="${r.id}"]`):a.querySelector("#attachments-heading");l==null||l.focus(),Zl(n,`${t||"Attachment"} deleted`)}return $("Attachment deleted","success"),!0}function mk(e,t,n){if(!e)return;const i=r=>{var l;return Array.from(((l=r.dataTransfer)==null?void 0:l.types)||[]).includes("Files")},s=r=>{var l;return(l=document.getElementById("issue-attachments"))==null?void 0:l.classList.toggle("is-dragover",r)};e.addEventListener("dragover",r=>{i(r)&&(r.preventDefault(),r.dataTransfer&&(r.dataTransfer.dropEffect="copy"),s(!0))},{signal:n}),e.addEventListener("dragleave",r=>{r.relatedTarget&&e.contains(r.relatedTarget)||s(!1)},{signal:n}),e.addEventListener("drop",r=>{i(r)&&(r.preventDefault(),s(!1),Wm(t,r.dataTransfer.files))},{signal:n});const a=new AbortController;n==null||n.addEventListener("abort",()=>a.abort(),{once:!0});const o=()=>e.isConnected&&!e.closest(".hidden");for(const r of["dragover","drop"])document.addEventListener(r,l=>{var c,d;if(!o()){a.abort();return}!i(l)||l.defaultPrevented||e.contains(l.target)||(d=(c=l.target)==null?void 0:c.closest)!=null&&d.call(c,'input[type="file"]')||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="none"),r==="drop"&&s(!1))},{signal:a.signal})}const Xl=(e,t)=>e.type==="click"||e.type==="keydown"&&t.tagName!=="A"&&t.tagName!=="BUTTON";function Km(e){J$(e.dataset.attachmentId||e.dataset.attachmentRef,{filename:e.dataset.filename||e.getAttribute("alt")||"",contentType:e.dataset.contentType||""})}function fk(e){var n,i;if(e.button!==1)return;const t=(i=(n=e.target)==null?void 0:n.closest)==null?void 0:i.call(n,'[data-action="open-attachment"]');t&&(e.preventDefault(),Km(t))}oe({"open-attachment":(e,t,n)=>{Xl(e,n)&&(e.preventDefault(),Km(n))},"download-attachment":(e,t,n)=>{Xl(e,n)&&Om(t.attachmentId,t.filename)},"delete-attachment":(e,t,n)=>{Xl(e,n)&&pk(t.attachmentId,t.filename)},"pick-attachments":(e,t,n)=>{if(e.type!=="change")return;const i=[...n.files||[]];n.value="",Wm(t.issueId,i)}});const vi={check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',ring:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>',link:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'};function bi(e){return!!(e&&e.attestation&&!e.attestation.approved_at)}function Cs(e){return!!(e&&e.approval_mode==="gate"&&!e.attestation)}function Jl(e){const t=e&&e.last_rejection;return t&&!t.superseded_at?t:null}function go(e){return Cs(e)&&!!Jl(e)}function ho(e,{canAct:t=!1}={}){const n=e&&e.pending_rituals||[],i=e&&e.completed_rituals||[],s=[],a=[];for(const o of n)((bi(o)||Cs(o)&&!go(o))&&t?s:a).push(o);return{needsYou:s,waiting:a,done:i,total:n.length+i.length}}function ec(e,t,n){return e===1?t:n}function Bs(e){return bi(e)?"Review":go(e)?"Ask again for":Cs(e)?"Sign off on":Jl(e)?"Re-attest":"Attest"}function tc(e,t){return bi(e)?"an admin":Cs(e)&&!go(e)?"a person":t||"the assignee"}function gk(e){return e&&e.trigger==="ticket_claim"?"needed to start":"needed to close"}function Ym(e,t){return`<div class="ticket-gate-kicker">Waiting on ${p(e)}<span class="ticket-gate-when"> · ${gk(t)}</span></div>`}function hk(e){const t=e&&e.artifact_ref;if(!t||typeof t!="string")return"";if(/^https?:\/\//i.test(t))return`<a class="ticket-gate-artifact" href="${m(t)}" target="_blank" rel="noopener noreferrer">${vi.link}${p(t.replace(/^https?:\/\//i,""))}</a>`;const n=`/document/${encodeURIComponent(t)}`;return`<a class="ticket-gate-artifact" href="${m(n)}" data-action="open-gate-document" data-document-id="${m(t)}">${vi.link}Linked document</a>`}function Qm(e){const t=e.attestation;return t?`
        <div class="ticket-gate-attestation">
            <div class="ticket-gate-by">${p(t.attested_by_name||"Someone")} attested ${p(et(t.attested_at))}</div>
            ${t.note?`<div class="ticket-gate-note markdown-body">${$t(t.note)}</div>`:""}
            ${hk(t)}
        </div>`:""}function Zm(e){const t=p(e.rejected_by_name||"Someone"),n=e.rejected_at?` ${p(et(e.rejected_at))}`:"";return`${t} sent it back${n}: “${p(e.note||"")}”`}function Xm(e){const t=e&&e.last_rejection;return!t||!t.superseded_at||!bi(e)?"":`<div class="ticket-gate-earlier">Sent back before: ${Zm(t)}</div>`}const yi=(e,t)=>`data-ritual-id="${m(e.id)}" data-issue-id="${m(t)}" data-ritual-name="${m(e.name)}"`;function vk(e,t){const n=`<button type="button" class="ticket-gate-text-btn" data-action="reject-ticket-ritual" ${yi(e,t)}>Send back…</button>`;return bi(e)?`
            <button type="button" class="btn btn-primary" data-action="approve-ticket-ritual" ${yi(e,t)}>Approve</button>
            ${n}`:`
        <button type="button" class="btn btn-primary" data-action="complete-ticket-ritual" ${yi(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off</button>
        ${n}`}function bk(e,t,n){return go(e)?n?`<button type="button" class="ticket-gate-text-btn" data-action="complete-ticket-ritual" ${yi(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off anyway</button>`:"":bi(e)||Cs(e)?"":e.note_required||e.artifact?`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual-modal" ${yi(e,t)} data-ritual-prompt="${m(e.prompt||"")}" data-ritual-artifact="${m(e.artifact||"")}" data-ritual-note-required="${e.note_required?"1":""}">Attest it yourself…</button>`:`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual" ${yi(e,t)}>Attest it yourself</button>`}function Jm(e,t){if(e.length===0)return"";const[n,...i]=e,s=i.length?`, and ${i.length} more`:"";return`<div class="ticket-gate-then">${t}: ${p(Bs(n).toLowerCase())} <b>${p(n.name)}</b>${s}.</div>`}function nc(e,t){const{needsYou:n,waiting:i,done:s,total:a}=e,o=(l,c,d,u)=>`<li class="${c}"><span class="ticket-gate-li-ic">${l}</span><span class="ticket-gate-li-name">${p(d)}</span><span class="ticket-gate-li-who">${p(u)}</span></li>`,r=[...s.map(l=>{var c;return o(vi.check,"done",l.name,(c=l.attestation)!=null&&c.attested_by_name?`by ${l.attestation.attested_by_name}`:"done")}),...n.map(l=>o(vi.ring,"you",l.name,"waiting on you")),...i.map(l=>o(vi.ring,"",l.name,`waiting on ${tc(l,t)}`))];return`
        <details class="ticket-gate-list">
            <summary>${s.length} of ${a} ${ec(a,"ritual","rituals")} done</summary>
            <ul>${r.join("")}</ul>
        </details>`}function yk(e,{canAct:t=!1}={}){const{needsYou:n,waiting:i}=ho(e,{canAct:t});return n[0]||i[0]||null}function wk(e,{canAct:t=!1,assigneeName:n=null}={}){const{needsYou:i,waiting:s,total:a}=ho(e,{canAct:t});if(a===0)return"";const o=i[0]||s[0];return o?`Waiting on ${i.length?"you":tc(o,n)}: ${Bs(o).toLowerCase()} ${o.name}.`:`All ${a} ${ec(a,"ritual","rituals")} done.`}function $k(e,t,{canAct:n=!1,assigneeName:i=null}={}){const s=ho(e,{canAct:n}),{needsYou:a,waiting:o,total:r}=s;if(r===0)return"";if(a.length===0&&o.length===0)return`
            <section class="ticket-gate clear" aria-label="Rituals" tabindex="-1">
                <span class="ticket-gate-clear-ic">${vi.check}</span>
                ${nc(s,i).replace(/<summary>[^<]*<\/summary>/,`<summary>All ${r} ${ec(r,"ritual","rituals")} done</summary>`)}
            </section>`;if(a.length>0){const u=a[0];return`
            <section class="ticket-gate you" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(u.id)}">
                ${Ym("you",u)}
                <h2 class="ticket-gate-step">${p(Bs(u))} <b>${p(u.name)}</b></h2>
                ${u.prompt?`<div class="ticket-gate-asks markdown-body">${$t(u.prompt)}</div>`:""}
                ${Qm(u)}
                ${Xm(u)}
                <div class="ticket-gate-actions">${vk(u,t)}</div>
                ${Jm([...a.slice(1),...o],"Then")}
                ${nc(s,i)}
            </section>`}const l=o[0],c=l.attestation?null:Jl(l),d=bk(l,t,n);return`
        <section class="ticket-gate waiting" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(l.id)}">
            ${Ym(tc(l,i),l)}
            <h2 class="ticket-gate-step">${p(Bs(l))} <b>${p(l.name)}</b></h2>
            ${c?`<div class="ticket-gate-asks">${Zm(c)}</div>`:l.prompt?`<div class="ticket-gate-asks markdown-body">${$t(l.prompt)}</div>`:""}
            ${Qm(l)}
            ${Xm(l)}
            ${d?`<div class="ticket-gate-actions">${d}</div>`:""}
            ${Jm(o.slice(1),"After that")}
            ${nc(s,i)}
        </section>`}function kk(e,{canAct:t=!1}={}){const{needsYou:n}=ho(e,{canAct:t});if(n.length===0)return"";const i=n[0],s=n.length>1?`<span class="ticket-gate-sticky-more"> and ${n.length-1} more</span>`:"";return`
        <span class="ticket-gate-sticky-text">Waiting on you: ${p(Bs(i).toLowerCase())} <b>${p(i.name)}</b>${s}</span>
        <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">Go to it ↑</button>`}const vo=new Map;function ic(){var e;return`${((e=C())==null?void 0:e.id)??""}|${X()??""}`}function wi(e,t,n){vo.set(e,{key:t,value:n})}function bo(e,t){const n=vo.get(e);return n&&n.key===t?n.value:void 0}function Ds(e,...t){for(const n of t)n!==e&&vo.delete(n)}function sc(){vo.clear()}function yo(e,t){if(e===t)return!0;try{return JSON.stringify(e)===JSON.stringify(t)}catch{return!1}}dt((e,t,n)=>{e==="currentTeam"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&sc(),e==="currentUser"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&sc()});let Ae=null,ef=!1,Hn=!1,tf="new-comment";function _k(){return Ae||(Ae=document.createElement("div"),Ae.className="quote-tooltip",Ae.setAttribute("role","button"),Ae.setAttribute("tabindex","0"),Ae.setAttribute("aria-label","Quote selection in comment"),Ae.textContent="Quote",Ae.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),wo())}),Ae.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),Ae.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),wo()}),document.body.appendChild(Ae),Ae)}function nf(e,t){const n=_k();n.style.display="flex",Hn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!Hn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Ms(){Ae&&(Ae.style.display="none"),Hn=!1}function Ek(){return Hn}function sf(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function ac(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=sf(t.startContainer),i=sf(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function xk(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function wo(e=tf){const t=ac();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=xk(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Ms(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function Sk(){var i;if(!ac())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return nf(n.left+n.width/2,n.top),!0}function Ik(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!ac()){Ms();return}nf(t,n)},10)}function af({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(tf=t,i.addEventListener("mouseup",Ik,n?{signal:n}:void 0),ef||(ef=!0,document.addEventListener("mousedown",s=>{Hn&&Ae&&!Ae.contains(s.target)&&Ms()}),document.addEventListener("selectionchange",()=>{Hn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&Ms()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&Hn&&(s.stopImmediatePropagation(),Ms())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&Sk()})))}function of(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let gn=[],js=[],$o=null,pe=new Set,$i="list",Fn=!1,oc=null,ko=null,rc=null,lc=null,rf=null;function lf(e){if(rf!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const cc=Pb();(cc==="list"||cc==="grid")&&($i=cc);function cf(e){if(e!=="list"&&e!=="grid")return;$i=e,e==="grid"&&Fn&&dc(),qb(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Yt()}function df(){if($i!=="list")return;Fn=!0,pe.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Yt(),_i()}function dc(){Fn=!1,pe.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Yt(),_i()}function Lk(){oc&&clearTimeout(oc),oc=setTimeout(()=>{Yt()},300)}function uf(){const e=document.getElementById("doc-search");e&&(e.value=""),Yt()}async function Tk(){uf()}function Ak(){var i;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=[];if(t&&n.push(`<span class="filter-chip">Search: "${p(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n.length>0){let s=n.join(" ");n.length>1&&(s+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=s,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Ck(){return gn}function Yt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";Ak(),js=gn.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),js.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),Pk("",$i)}let ki=0;async function Bk(){var i;const e=$o||((i=C())==null?void 0:i.id);if(!e)return;const t=++ki,n=X()||null;try{const s=await h.getDocuments(e,n);if(t!==ki)return;wi("documents",`${e}|${n??""}`,s),gn=s,Yt()}catch(s){if(t!==ki)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=K({icon:z.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),k("load documents",s)}}dt(e=>{e==="currentProject"&&A()==="documents"&&Bk()});async function Un(e,t=null,{fromMemory:n=!1}={}){var r;if(e||(e=(r=C())==null?void 0:r.id),!e)return;$o=e,dp(-1);const i=++ki;t===null&&(t=X()||null);const s=`${e}|${t??""}`,a=n?bo("documents",s):void 0,o=document.getElementById("documents-list");a?(gn=a,Yt()):o&&(o.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join(""));try{const l=await h.getDocuments(e,t);if(i!==ki)return;wi("documents",s,l);const c=a&&yo(gn,l);gn=l;const d=document.getElementById("doc-view-list"),u=document.getElementById("doc-view-grid");d&&u&&(d.classList.toggle("active",$i==="list"),u.classList.toggle("active",$i==="grid")),c||Yt()}catch(l){if(i!==ki)return;const c=document.getElementById("documents-list");c&&(c.innerHTML=K({icon:z.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),k("load documents",l)}}function pf(){var t,n;if(A()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=$o||((n=C())==null?void 0:n.id);e&&Un(e).catch(i=>console.error("Failed to refresh documents list:",i))}function mf(e){lf(e)&&Ce(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function Dk(e,t){lf(e)&&($(`Document "${t||"Untitled"}" was deleted`,"warning"),O("documents"))}function Mk(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${re(t.color)}20; color: ${re(t.color)}">${p(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function jk(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Mk(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${m(e.id)}" data-action="view-document" data-document-id="${m(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${p(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${p(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?p(of(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${p(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Rk(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${re(r.color)}20; color: ${re(r.color)}">${p(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?of(e.content).substring(0,80):"No content",s=Fn?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${m(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${pe.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${Fn&&pe.has(e.id)?" selected":""}" data-action="${Fn?"toggle-doc-selection":"view-document"}" data-document-id="${m(e.id)}" data-doc-id="${m(e.id)}">
      ${s}
      <div class="document-list-icon">${p(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${p(e.title)}</div>
        <div class="document-list-snippet text-muted">${p(i)}${e.content&&e.content.length>80?"...":""}</div>
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
  `}function Pk(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;pe.clear(),_i();const i=js;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,u=X(),f=d||u;n.innerHTML=K({icon:f?z.search:z.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?jk:Rk,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=se();i.forEach(d=>{let u,f;if(e==="project")if(u=d.project_id||"__global__",u==="__global__")f="Global (Team-wide)";else{const g=r.find(b=>b.id===d.project_id);f=g?g.name:"Unknown Project"}else e==="sprint"&&(u=d.sprint_id||"__no_sprint__",f=d.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:f,docs:[]}),o[u].docs.push(d)});let l="";for(const[d,u]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${p(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${f}">
          ${u.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function qk(e){pe.has(e)?pe.delete(e):pe.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=pe.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",pe.has(e)),_i()}function Nk(){js.forEach(e=>pe.add(e.id)),js.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),_i()}function ff(){pe.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),pe.clear(),_i()}function _i(){const e=document.getElementById("doc-bulk-actions");e&&(Fn?(e.classList.remove("hidden"),pe.size>0?e.innerHTML=`
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
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function Ok(){if(pe.size===0){$("No documents selected","error");return}const t=se().map(n=>`<option value="${n.id}">${p(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${pe.size} Document${pe.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
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
  `,G()}async function Hk(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(pe);let i=0;const s=[];for(const l of n)try{await h.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((o=gn.find(d=>d.id===l))==null?void 0:o.title)||l)}F(),ff(),s.length===0?$(`Moved ${i} document${i>1?"s":""}!`,"success"):$(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=C())==null?void 0:r.id;return await Un(a),!1}async function Fk(){var a,o;if(pe.size===0){$("No documents selected","error");return}const e=pe.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(pe);let n=0;const i=[];for(const r of t)try{await h.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((a=gn.find(c=>c.id===r))==null?void 0:a.title)||r)}dc(),i.length===0?$(`Deleted ${n} document${n>1?"s":""}!`,"success"):$(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=C())==null?void 0:o.id;await Un(s)}async function Uk(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await h.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${m(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${p(s.author_name||"Unknown")}</span>
                ${Oa(s.author)}
                <span class="comment-date">${et(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${ri(s.content)}</div>
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
    `}}function Gk(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=Wu(e);s&&(i.value=s),i.addEventListener("input",()=>{Pa(e,i.value)},{signal:t}),i.addEventListener("keydown",a=>{var o;a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),(o=i.closest("form"))==null||o.requestSubmit())},{signal:t}),Ul("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function Ce(e,t=!0){try{t&&bn();const n=await h.getDocument(e);rf=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await Uk(n);let a=null,o=null,r=!1;if(n.project_id){const D=se().find(H=>H.id===n.project_id);if(a=D?D.name:null,n.sprint_id)try{const H=await h.getSprint(n.sprint_id);o=H?H.name:null}catch(H){console.error("Failed to load sprint name:",H),r=!0}}let l=n.content||"";const c=Q.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=Ck(),u=d.findIndex(w=>w.id===n.id),f=u>0?d[u-1]:null,g=u>=0&&u<d.length-1?d[u+1]:null,b=u>=0,y=A()||"documents",x=n.labels&&n.labels.length>0?n.labels.map(w=>`
          <span class="issue-label" style="background: ${re(w.color)}20; color: ${re(w.color)}">
            ${p(w.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${m(n.id)}" data-label-id="${m(w.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let _='<span class="text-muted">None</span>';try{const w=await h.getDocumentIssues(n.id);w.length>0&&(_=w.map(D=>`
          <div class="linked-item">
            <span class="linked-item-id">${p(D.identifier)}</span>
            <span class="linked-item-title">${p(D.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${m(n.id)}" data-issue-id="${m(D.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(w){console.error("Failed to load linked issues:",w),_=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
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
              <span class="issue-nav-counter">${u+1} / ${d.length}</span>
              <button class="issue-nav-btn" ${g?`data-action="view-document" data-document-id="${m(g.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?p(a)+" ›":""} ${p(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?p(n.icon)+" ":""}${p(n.title)}</h1>

          <div class="document-content markdown-body">${l?On(l):'<p class="text-muted">No content</p>'}</div>

          ${s}
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-section">
            <h4>Properties</h4>

            <div class="property-row">
              <span class="property-label">Project</span>
              <span class="property-value-static">${a?p(a):'<span class="text-muted">Global</span>'}</span>
            </div>

            ${o||r?`
            <div class="property-row">
              <span class="property-label">Sprint</span>
              <span class="property-value-static">${r?`<span class="sidebar-load-error">Couldn't load</span>`:p(o)}</span>
            </div>
            `:""}

            <div class="property-row">
              <span class="property-label">Labels</span>
              <div class="property-value-static property-labels-btn">
                ${x}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${m(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${p(n.author_name||"Unknown")} ${Oa(n.author)}</span>
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
              ${_}
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
    `,ko&&ko.abort(),ko=new AbortController;const{signal:L}=ko,T=i.querySelector(".sidebar-overflow-trigger"),j=i.querySelector(".overflow-menu-dropdown");if(T&&j){const w=()=>{j.classList.add("hidden"),T.setAttribute("aria-expanded","false")},D=()=>{const H=j.classList.toggle("hidden");T.setAttribute("aria-expanded",String(!H))};T.addEventListener("click",D,{signal:L}),document.addEventListener("click",H=>{!T.contains(H.target)&&!j.contains(H.target)&&w()},{signal:L}),j.addEventListener("keydown",H=>{H.key==="Escape"&&(w(),T.focus())},{signal:L})}Gk(n.id,L,n.project_id||null),af({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:L}),rc=f?f.id:null,lc=g?g.id:null;const E=w=>{if((w.metaKey||w.ctrlKey)&&w.shiftKey&&(w.key===">"||w.key==="."||w.code==="Period")&&wo("new-doc-comment")){w.preventDefault();return}w.metaKey||w.ctrlKey||w.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||w.target.tagName==="INPUT"||w.target.tagName==="TEXTAREA"||w.target.tagName==="SELECT"||w.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(w.key==="ArrowLeft"&&rc?(w.preventDefault(),Ce(rc)):w.key==="ArrowRight"&&lc&&(w.preventDefault(),Ce(lc)))};document.addEventListener("keydown",E,{signal:L})}catch(n){k("load document",n)}}async function _o(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await h.getSprints(t);let o=n;if(i&&!n){const l=a.find(c=>c.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${p(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function uc(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${p(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function zk(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?On(r):'<span class="text-muted">Nothing to preview.</span>'}}function pc(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=Zu(e);if(o){const l=Mb(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){qa(e,null);return}qa(e,l,n)};[i,s,a].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function gf(){Rs=null;const e=se(),t=zf()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${p(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${uc("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,G(),pc("new"),t&&await _o("doc-sprint",t,null,!0)}let Rs=null;async function Vk(e,t,n){Rs=n||null;const s=se().map(a=>`<option value="${m(a.id)}" ${a.id===t?"selected":""}>${p(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${uc("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,G(),pc("new"),t&&await _o("doc-sprint",t,e)}async function Wk(e){var a;e.preventDefault();const t=(a=C())==null?void 0:a.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await h.createDocument(t,s),qa("new",null),await Un(t),F(),$("Document created!","success"),Rs){const o=Rs;Rs=null,o()}}catch(o){k("create document",o)}return!1}let mc=null,Ps=null,fc=!1;async function hf(e){try{const t=await h.getDocument(e);mc=e,Ps={title:t.title||"",content:t.content||""},fc=!1;const i=se().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${p(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${uc("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${m(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,G(),pc(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await _o("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){k("load document",t)}}async function Kk(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&mc===t&&Ps&&!fc){let o=null;try{o=await h.getDocument(t)}catch{}if(o&&((o.title||"")!==Ps.title||(o.content||"")!==Ps.content))return fc=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await h.updateDocument(t,s),mc=null,Ps=null;const o=Zu(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&qa(t,null),F(),await Ce(t),$("Document updated!","success")}catch(o){k("update document",o)}return!1}async function Yk(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=C())==null?void 0:t.id;await Un(n),O("documents"),$("Document deleted!","success")}catch(n){k("delete document",n)}}function Qk(e,t){_o(e,t)}async function Zk(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${m(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,G()}async function Xk(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=C())==null?void 0:i.id,a=await h.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${m(t)}" data-issue-id="${m(o.id)}">
        <span class="link-result-id">${p(o.identifier)}</span>
        <span class="link-result-title">${p(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function Jk(e,t){try{await h.linkDocumentToIssue(e,t),F(),$("Issue linked!","success"),await Ce(e,!1)}catch(n){k("link issue",n)}}async function e_(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),$("Issue unlinked!","success"),await Ce(e,!1)}catch(n){k("unlink issue",n)}}let gc=!1;async function t_(e,t){if(e.preventDefault(),gc)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return $("Please enter a comment","error"),!1;gc=!0;try{const s=await h.createDocumentComment(t,i);n.value="",$("Comment added!","success"),Na(s),await Ce(t,!1)}catch(s){k("add comment",s)}finally{gc=!1}return!1}async function n_(e){var n;const t=(n=C())==null?void 0:n.id;if(!t){$("No team selected","error");return}try{const i=await h.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,G();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${m(e)}" data-label-id="${m(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${re(a.color)}; color: white;">${p(a.name)}</span>
        ${a.description?`<span class="text-muted">${p(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,G()}catch(i){k("load labels",i)}}async function i_(e,t){try{await h.addLabelToDocument(e,t),F(),$("Label added!","success"),await Ce(e,!1)}catch(n){k("add label",n)}}async function s_(e,t){try{await h.removeLabelFromDocument(e,t),$("Label removed!","success"),await Ce(e,!1)}catch(n){k("remove label",n)}}oe({"view-document":(e,t)=>{e.preventDefault(),Ce(t.documentId)},"set-doc-editor-mode":(e,t)=>{zk(t.target,t.mode)},"retry-load-documents":()=>{Un($o)},"retry-document-comments":(e,t)=>{Ce(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{qk(t.docId)},"clear-doc-search":()=>{uf()},"clear-all-doc-filters":()=>{Tk()},"show-bulk-move-modal":()=>{Ok()},"bulk-delete-documents":()=>{Fk()},"select-all-docs":()=>{Nk()},"clear-doc-selection":()=>{ff()},"exit-selection-mode":()=>{dc()},"enter-selection-mode":()=>{df()},"handle-bulk-move":e=>{Hk(e)},"unlink-document-issue":(e,t)=>{e_(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{Zk(t.documentId)},"add-document-comment":(e,t)=>{t_(e,t.documentId)},"remove-label-from-doc":(e,t)=>{s_(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{n_(t.documentId)},"show-edit-document-modal":(e,t)=>{hf(t.documentId)},"delete-document":(e,t)=>{Yk(t.documentId)},"create-document":e=>{Wk(e)},"update-doc-sprint-dropdown":(e,t,n)=>{Qk(t.sprintSelect,n.value)},"update-document":(e,t)=>{Kk(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{Xk(n.value,t.documentId)},"link-to-issue":(e,t)=>{Jk(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{i_(t.documentId,t.labelId)}});async function vf(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),s=Ii(t.project_id).map(o=>`
            <option value="${o.value===null?"":o.value}" ${t.estimate===o.value?"selected":""}>${p(o.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form data-action="update-issue" data-issue-id="${m(e)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${m(t.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <div id="edit-issue-description-draft-warning" class="description-draft-warning hidden"></div>
                    <textarea id="edit-issue-description">${p(t.description||"")}</textarea>
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
                            <option value="${o.id}" ${t.sprint_id===o.id?"selected":""}>${p(o.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,G();const a=document.getElementById("edit-issue-description");if(a){const o=rs(e);if(o){const r=Yu(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?Tn(e,r,t.description||""):Tn(e,null)})}}catch(t){k("load issue",t)}}async function a_(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(c.status=s.value);const d=await h.updateIssue(t,c);rs(t)===c.description&&Tn(t,null),F(),await ce(t),$("Issue updated!","success"),$s(d)}catch(n){k("update issue",n)}}async function o_(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await Dt(),await gt(),O("issues"),$("Issue deleted!","success")}catch(t){k("delete issue",t)}}oe({"update-issue":(e,t)=>{a_(e,t.issueId)}});const r_=1,l_={bold:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z"/></svg>',italic:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="5" x2="10" y2="5"/><line x1="14" y1="19" x2="5" y2="19"/><line x1="15" y1="5" x2="9" y2="19"/></svg>',code:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',link:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',bulletList:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/></svg>',blockquote:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="5" x2="5" y2="19"/><line x1="10" y1="8" x2="19" y2="8"/><line x1="10" y1="12" x2="19" y2="12"/><line x1="10" y1="16" x2="16" y2="16"/></svg>'},c_=[["bold","Bold"],["italic","Italic"],["code","Code"],["link","Link"],["bulletList","Bulleted list"],["blockquote","Quote"]],d_="This comment uses markdown the editor would change, so it stays as markdown.";let Ei=null;function u_(){const e=document.querySelector('meta[name="chaotic-version"]'),t=e?e.getAttribute("data-editor"):"";return`/static/js/editor.bundle.js${!!t&&/^[0-9a-f]{8}$/.test(t)?`?v=${t}`:""}`}function Eo(e){return e&&e.API_VERSION===r_?e:null}function p_(){const e=Eo(window.ChaoticEditor);return e?Promise.resolve(e):Ei||(Ei=new Promise((t,n)=>{const i=document.createElement("script");i.src=u_(),i.async=!0,i.onload=()=>{const s=Eo(window.ChaoticEditor);s?t(s):n(new Error("editor bundle is a different version"))},i.onerror=()=>{i.remove(),n(new Error("editor bundle failed to load"))},document.head.appendChild(i)}).then(t=>(Ei=null,t),t=>{throw Ei=null,t}),Ei)}const xi=new Map;function m_(e,{signal:t,mentionContext:n={},placeholder:i="",restore:s=null}={}){const a=document.getElementById(e);if(!a||a.dataset.richComposer==="true")return null;a.dataset.richComposer="true";const o=a.closest("form"),r={textarea:a,form:o,editor:null,api:null,wrapper:null,toolbar:null,note:null,mode:"markdown",syncing:!1,composing:!1,pendingApi:null,destroyed:!1,mentionContext:n,placeholder:i||a.getAttribute("placeholder")||"",start:null};return xi.set(e,r),f_(r,t),a.addEventListener("compositionstart",()=>{r.composing=!0},{signal:t}),a.addEventListener("compositionend",()=>{if(r.composing=!1,r.pendingApi){const l=r.pendingApi;r.pendingApi=null,hc(r,l,{focus:document.activeElement===a})}},{signal:t}),r.start=({focus:l=!1,restoreTo:c=null}={})=>{if(r.editor||r.destroyed||Hb()==="markdown")return;const d=Eo(window.ChaoticEditor);if(d){hc(r,d,{focus:l,restore:c});return}p_().then(u=>{if(!(r.destroyed||r.editor||!u)){if(r.composing){r.pendingApi=u;return}hc(r,u,{focus:l||document.activeElement===a})}}).catch(()=>{})},a.addEventListener("focus",()=>r.start(),{signal:t}),bc(r,"markdown",{}),Eo(window.ChaoticEditor)&&r.start({restoreTo:s}),o==null||o.addEventListener("focusin",()=>o.classList.add("composer-active"),{signal:t}),o==null||o.addEventListener("focusout",l=>{!o.contains(l.relatedTarget)&&!a.value&&o.classList.remove("composer-active")},{signal:t}),s&&(o==null||o.classList.add("composer-active")),a.addEventListener("input",()=>{var l,c;if(!(r.syncing||r.mode!=="rich"||!r.editor)){if(!r.api.roundTripsCleanly(r.editor,a.value,ri)){vc(r,{focus:!0,refused:!0});return}r.editor.commands.setContent(a.value,{contentType:"markdown",emitUpdate:!1}),r.editor.commands.focus("end"),(c=(l=r.wrapper).scrollIntoView)==null||c.call(l,{behavior:"smooth",block:"nearest"})}},{signal:t}),t==null||t.addEventListener("abort",()=>v_(e,r)),r}function f_(e,t){const{textarea:n,form:i}=e,s=document.createElement("div");s.className="toolbar rich-composer-toolbar",s.setAttribute("role","toolbar"),s.setAttribute("aria-label","Formatting"),s.innerHTML=`${c_.map(([o,r])=>`<button type="button" class="icon-btn" data-tool="${o}" title="${r}" aria-label="${r}" aria-pressed="false" tabindex="-1">${l_[o]}</button>`).join("")}
        <span class="toolbar-spacer"></span>
        <button type="button" class="btn-link rich-mode-toggle" data-tool="mode" aria-pressed="false" tabindex="0">Markdown</button>`;const a=document.createElement("div");a.className="rich-composer-note",a.setAttribute("role","status"),a.hidden=!0,s.addEventListener("mousedown",o=>{o.target.closest("button")&&o.preventDefault()},{signal:t}),s.addEventListener("click",o=>{const r=o.target.closest("button[data-tool]");if(r){if(r.dataset.tool==="mode"){e.mode==="rich"?vc(e,{focus:!0,remember:!0}):bf(e,{focus:!0});return}if(!(!e.editor||e.mode!=="rich")){if(r.dataset.tool==="link"){const l=e.editor.getAttributes("link").href||"",c=window.prompt("Link URL (leave empty to remove the link)",l);if(c===null){e.editor.commands.focus();return}e.api.COMMANDS.link(e.editor,c)||$("That link can’t be added. Use an http, https or mailto address.","error")}else e.api.COMMANDS[r.dataset.tool](e.editor);xo(e)}}},{signal:t}),s.addEventListener("keydown",o=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(o.key))return;const r=[...s.querySelectorAll("button")].filter(d=>!d.disabled&&!d.hidden),l=r.indexOf(document.activeElement);if(l<0||!r.length)return;o.preventDefault();const c=o.key==="Home"?0:o.key==="End"?r.length-1:(l+(o.key==="ArrowRight"?1:-1)+r.length)%r.length;r.forEach(d=>{d.tabIndex=-1}),r[c].tabIndex=0,r[c].focus()},{signal:t}),i?(i.append(s,a),i.classList.add("has-rich-composer")):(n.insertAdjacentElement("afterend",s),s.insertAdjacentElement("afterend",a)),e.toolbar=s,e.note=a}function hc(e,t,{focus:n=!1,restore:i=null}={}){g_(e,t)&&(bf(e,{focus:n||!!i,remember:!1}),i&&e.mode==="rich"&&h_(e,i))}function g_(e,t){const{textarea:n,form:i}=e,s=document.createElement("div");s.className="rich-composer",s.hidden=!0,n.insertAdjacentElement("beforebegin",s);try{e.editor=t.createEditor({element:s,markdown:"",placeholder:e.placeholder,getMentionItems:a=>Rm(a,e.mentionContext),onUpdate:a=>{e.syncing=!0,n.value=a,n.dispatchEvent(new Event("input",{bubbles:!0})),e.syncing=!1,xo(e)},onSubmit:()=>i==null?void 0:i.requestSubmit(),onEscape:()=>e.editor.commands.blur()})}catch{return s.remove(),e.editor=null,!1}return e.wrapper=s,e.api=t,e.editor.on("selectionUpdate",()=>xo(e)),!0}function bf(e,{focus:t=!1,remember:n=!0}={}){if(n&&Ju("rich"),!e.editor){e.start({focus:t});return}if(!e.api.roundTripsCleanly(e.editor,e.textarea.value,ri)){vc(e,{focus:t,refused:!0});return}e.editor.commands.setContent(e.textarea.value||"",{contentType:"markdown",emitUpdate:!1}),bc(e,"rich",{focus:t})}function vc(e,{focus:t=!1,remember:n=!1,refused:i=!1}={}){n&&Ju("markdown"),bc(e,"markdown",{focus:t,refused:i})}function bc(e,t,{focus:n=!1,refused:i=!1}={}){const{textarea:s,editor:a,wrapper:o,toolbar:r,note:l}=e,c=t==="rich"&&!!a;e.mode=c?"rich":"markdown",s.hidden=c,o&&(o.hidden=!c),r.classList.toggle("markdown-mode",!c);const d=r.querySelector(".rich-mode-toggle");d.setAttribute("aria-pressed",String(!c)),d.title=c?"Write raw markdown":"Back to the formatted editor",l.hidden=!i,l.textContent=i?d_:"",n&&(c?a.commands.focus("end"):(s.focus(),s.setSelectionRange(s.value.length,s.value.length))),xo(e)}function xo(e){if(!e.toolbar)return;const t=!!e.editor&&e.mode==="rich",n=t?e.api.activeMarks(e.editor):{};e.toolbar.querySelectorAll(".icon-btn[data-tool]").forEach(a=>{const o=!!n[a.dataset.tool];a.setAttribute("aria-pressed",String(o)),a.classList.toggle("is-active",o),a.disabled=!t,a.hidden=!t});const i=[...e.toolbar.querySelectorAll("button")],s=i.filter(a=>!a.disabled&&!a.hidden);s.some(a=>a.tabIndex===0)||(i.forEach(a=>{a.tabIndex=-1}),(s[0]||i.at(-1)).tabIndex=0)}function h_(e,{from:t,to:n}){const i=e.editor.state.doc.content.size,s=a=>Math.max(1,Math.min(a,i));try{e.editor.chain().focus().setTextSelection({from:s(t),to:s(n)}).run()}catch{e.editor.commands.focus("end")}}function v_(e,t){t.destroyed=!0,t.editor&&t.editor.destroy(),t.editor=null,document.querySelectorAll(".rich-mention-suggestions").forEach(n=>n.remove()),xi.get(e)===t&&xi.delete(e)}function b_(e){var i,s,a;const t=xi.get(e);if(t&&t.editor&&t.mode==="rich")return t.editor.commands.focus("end"),(s=(i=t.wrapper).scrollIntoView)==null||s.call(i,{behavior:"smooth",block:"nearest"}),!0;const n=document.getElementById(e);return n?(n.focus(),(a=n.scrollIntoView)==null||a.call(n,{behavior:"smooth",block:"nearest"}),!0):!1}function y_(e){const t=xi.get(e);if(!t||!t.editor||t.mode!=="rich"||!t.editor.isFocused)return null;const{from:n,to:i}=t.editor.state.selection;return{from:n,to:i}}function w_(){for(const e of xi.values())if(e.editor&&(e.editor.view.composing||e.editor.isFocused&&document.querySelector(".rich-mention-suggestions:not([hidden])")))return!0;return!1}let yc=!1,wc=!1,So=null,qs=null,Ns=null,Io=null,$c=!1,Lo=null;function kc(e=null){$c=!0,e&&(Lo=e)}function yf(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔",ritual_approved:"✅"}[e]||"•"}function _c(e){return e.user_name||e.user_email||"Unknown"}const Ec=e=>String(e||"").toLowerCase()==="claim"?"start":"close";function xc(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${p(Le(t(e.old_value)))}</strong> to <strong>${p(Le(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${p(Te(t(e.old_value)))}</strong> to <strong>${p(Te(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${p(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${p(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=p(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=p(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"ritual_approved":return`Approved <strong>${p(e.new_value||"a ritual")}</strong>`;case"intent_opened":return`Tried to ${Ec(e.new_value)} it; waiting on rituals`;case"intent_cleared":return`No longer waiting on rituals to ${Ec(e.new_value)}`;case"intent_canceled":return`Canceled the pending ${Ec(e.new_value)}`;case"lease_expired":return"Claim expired; moved back to <strong>Todo</strong>";case"email_delivery_failed":return p(e.new_value||"An email could not be delivered");case"updated":return e.field_name?`Updated ${n[e.field_name]||p(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||p(e.field_name)}`:"Updated issue"}}async function Os(e){const t=()=>{var i;const n=(i=_e())==null?void 0:i.id;return!n||n===e};try{const n=await h.getTicketRitualsStatus(e);if(!t())return;So=n,Tc(e)}catch(n){if(console.error("Failed to load ticket rituals:",n),!t())return;So=null,Tc(e)}}function wf(){const e=ue();if(!e||e.is_agent)return!1;const t=kt();if(!t||t.length===0)return!0;const n=t.find(i=>i.user_id===e.id);return!!n&&(n.role==="admin"||n.role==="owner")}function $_(e){const t=ue(),n=se().find(o=>o.id===(e==null?void 0:e.project_id)),i=C(),s=kt()||[];if(!n||!i||n.team_id!==i.id||s.length===0)return{userId:(t==null?void 0:t.id)||null,isAdmin:null};const a=s.find(o=>o.user_id===(t==null?void 0:t.id));return{userId:(t==null?void 0:t.id)||null,isAdmin:!!a&&(a.role==="admin"||a.role==="owner")}}let Hs=null,Sc=!0;function Ic(){var a;const e=document.getElementById("ticket-gate-sticky");if(!e)return;const n=e.innerHTML.trim()!==""&&!Sc;e.classList.toggle("hidden",!n);const i=document.getElementById("issue-detail-view"),s=n&&((a=e.firstElementChild)==null?void 0:a.offsetHeight)||0;i&&i.style.setProperty("--gate-bar-h",`${s}px`)}function $f(){Hs&&(Hs.disconnect(),Hs=null),Sc=!0,Ic()}const k_=()=>typeof CSS>"u"||typeof CSS.supports!="function"||CSS.supports("selector(:has(*))");function __(){$f();const e=document.getElementById("ticket-gate");!e||typeof IntersectionObserver>"u"||!k_()||(Hs=new IntersectionObserver(t=>{Sc=t[t.length-1].isIntersecting,Ic()}),Hs.observe(e))}function E_(){var n,i;const e=document.getElementById("ticket-gate");if(!e||e.classList.contains("hidden"))return;(n=e.scrollIntoView)==null||n.call(e,{behavior:"smooth",block:"start"});const t=e.querySelector(".ticket-gate-actions .btn-primary");(i=t==null?void 0:t.focus)==null||i.call(t,{preventScroll:!0})}let Lc=null;function Tc(e){var g;const t=document.getElementById("ticket-gate"),n=document.getElementById("ticket-gate-sticky"),i=!!t&&t.dataset.issueId===e&&Lc===e,s=document.activeElement,a=!!t&&!!s&&(t.contains(s)||s===document.body),o=So,r=wf(),l=_e(),c=l&&l.id===e?l:null,d=c!=null&&c.assignee_id?wt(c.assignee_id):null,u=d?ut(d):(c==null?void 0:c.assignee_name)||null;if(((b,y)=>{b&&(b.innerHTML=y,b.classList.toggle("hidden",y.trim()===""))})(t,o?$k(o,e,{canAct:r,assigneeName:u}):""),t&&(t.dataset.issueId=e),Lc=e,n){const b=o?kk(o,{canAct:r}):"";n.innerHTML=b?`<div class="ticket-gate-sticky-bar">${b}</div>`:"",Ic()}if(i){const b=document.getElementById("ticket-gate-live");if(b&&(b.textContent=o?wk(o,{canAct:r,assigneeName:u}):""),a&&t&&!t.classList.contains("hidden")){const y=t.querySelector(".ticket-gate-actions .btn-primary")||t.querySelector(".ticket-gate");(g=y==null?void 0:y.focus)==null||g.call(y,{preventScroll:!0})}}}function To({focus:e=!1}={}){var n;const t=document.querySelector("#issue-detail-view details.related-add[open]");return t?(t.open=!1,e&&((n=t.querySelector("summary"))==null||n.focus()),!0):!1}function x_(e){document.addEventListener("keydown",t=>{t.key==="Escape"&&To({focus:!0})&&(t.stopPropagation(),t.preventDefault())},{capture:!0,signal:e}),document.addEventListener("click",t=>{var n,i;(i=(n=t.target).closest)!=null&&i.call(n,"details.related-add")||To()},{signal:e})}async function Ao(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await ce(t.id,!1),!0):(O("my-issues",!1),!1)}catch{return O("my-issues",!1),!1}}function Ac(e){const t=ps(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function Cc({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${m(n.id)}" data-identifier="${m(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${m(i.id)}" data-identifier="${m(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function S_(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=_e();if(!t)return;const n=Ac(t.id);qs=n.prevIssue?n.prevIssue.id:null,Ns=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=Cc(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}dt(e=>{e==="detailNavContext"&&S_()});let Fs=0;const kf=500;function I_(){Fs++}let _f=0,Co=!1;function Ef(){if(document.querySelector(".description-inline-editor"))return"editor";if(li())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)")||e!=null&&e.querySelector("details.related-add[open]"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||Co||w_()?"transient":null}function xf(e){return kc(),e==="editor"?"deferred":"retry"}function L_(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=_e())==null?void 0:n.id)===e}function T_(e){return ie().find(t=>t.id===e)||_l(e)||ps().find(t=>t.id===e)||null}function A_(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;$f(),Lc=null,ni(e);const i=Ac(e.id);qs=i.prevIssue?i.prevIssue.id:null,Ns=i.nextIssue?i.nextIssue.id:null;const s=se().find(r=>r.id===e.project_id),a=e.assignee_id?wt(e.assignee_id):null,o=A()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(o)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Cc(i)}
                        <span class="issue-detail-breadcrumb">${s?p(s.name):"Project"} › ${p(e.identifier)}</span>
                    </div>
                    <h1 class="issue-detail-title">${p(e.title)}</h1>
                    <div class="issue-detail-description">
                        <div class="skeleton skeleton-title"></div>
                        <div class="skeleton skeleton-title" style="width: 70%"></div>
                    </div>
                </div>
                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>
                        <div class="property-row"><span class="property-label">Status</span><span class="property-value">${Xe(e.status)}<span>${Le(e.status)}</span></span></div>
                        <div class="property-row"><span class="property-label">Priority</span><span class="property-value">${mt(e.priority)}<span>${Te(e.priority)}</span></span></div>
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${a?p(ut(a)):"Unassigned"}</span></div>
                    </div>
                </aside>
            </div>`}async function ce(e,t=!0,{refresh:n=!1}={}){var a;const i=n?Fs:++Fs,s=++_f;if(n){const o=Ef();if(o)return xf(o)}try{t&&bn();let o=!1;if(!n){const B=T_(e);B&&(A_(B),t&&(history.pushState({issueId:e,view:A()},"",`/issue/${B.identifier}`),o=!0))}let r=!1;const[l,c,d,u,f,g,b]=await Promise.all([h.getIssue(e),h.getComments(e).catch(B=>(console.error("Failed to load comments:",B),r=!0,[])),h.getActivities(e,0,kf),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]})),h.getAttachments(e).catch(B=>(console.error("Failed to load attachments:",B),null))]),y=[...c].sort((B,U)=>new Date(B.created_at)-new Date(U.created_at)),x=[l.parent_id?h.getIssue(l.parent_id):Promise.resolve(null),h.getSprints(l.project_id).catch(B=>(console.error("Failed to load sprints:",B),[]))],[_,L]=await Promise.all(x);if(i!==Fs)return"dropped";let T=null,j=null,E=null;if(n){if(s!==_f||!L_(e))return"dropped";const B=Ef();if(B)return xf(B);E=window.scrollY;const U=document.activeElement;j=y_("new-comment"),U!=null&&U.id&&document.getElementById("issue-detail-view").contains(U)&&(T={id:U.id,start:U.selectionStart,end:U.selectionEnd})}So=g,t&&!o&&history.pushState({issueId:e,view:A()},"",`/issue/${l.identifier}`),ni(l),mp(L),$c=!1,Lo=null,document.querySelectorAll(".view").forEach(B=>B.classList.add("hidden"));const w=document.getElementById("issue-detail-view");w.classList.remove("hidden");const D=A()||"my-issues",H=se().find(B=>B.id===l.project_id),te=l.assignee_id?wt(l.assignee_id):null,ae=te?ut(te):null,ne=l.sprint_id?L.find(B=>B.id===l.sprint_id):null,S=Ac(l.id),{prevIssue:M,nextIssue:P}=S;w.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div id="ticket-gate-sticky" class="ticket-gate-sticky hidden" role="region" aria-label="Rituals waiting on you"></div>
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(D)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Cc(S)}
                        <span class="issue-detail-breadcrumb">${H?p(H.name):"Project"} › ${p(l.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${p(l.title)}</h1>
                    ${nm(l,ae,{formatEstimate:vn})}

                    ${_?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(_.identifier)}" data-action="navigate-issue" data-issue-id="${m(_.id)}" data-identifier="${m(_.identifier)}">${_.identifier}: ${p(_.title)}</a>
                    </div>
                    `:""}

                    <div id="ticket-gate" class="ticket-gate-slot hidden"></div>
                    <div id="ticket-gate-live" class="sr-only" role="status" aria-live="polite"></div>

                    <div class="issue-detail-description">
                        <div class="section-header description-edit-row">
                            <button type="button" class="description-edit-btn${rs(l.id)?" has-draft":""}" data-action="edit-description" data-issue-id="${m(l.id)}">
                                ${rs(l.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span><span class="sr-only">: edit description (unsaved draft)</span>':'Edit<span class="sr-only"> description</span>'}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${l.description?"":"empty"}" data-action="edit-description" data-issue-id="${m(l.id)}">
                            ${l.description?On(l.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    ${ok(l.id,b,$_(l))}

                    ${uw(l,u,f,{formatEstimate:vn})}

                    ${hw({comments:y,activities:d,ritualStatus:g,commentsLoadFailed:r,issueId:l.id,gateRitualName:((a=yk(g,{canAct:wf()}))==null?void 0:a.name)||null,activitiesTruncated:d.length>=kf},{formatText:xc,formatActor:_c})}

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
                                ${mt(l.priority)}
                                <span>${Te(l.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${m(l.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${l.issue_type||"task"}">${ct(l.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${m(l.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${ae?`${Vt(te,"avatar-small")}<span>${p(ae)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${m(l.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${ne?p(ne.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${m(l.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${l.labels&&l.labels.length>0?l.labels.map(B=>`
                                        <span class="issue-label" style="background: ${re(B.color)}20; color: ${re(B.color)}">${p(B.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${H?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${p(H.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${m(l.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${zo(l.estimate,l.project_id)?" out-of-scale":""}" ${zo(l.estimate,l.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${vn(l.estimate,l.project_id)}</span>
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
                            <span class="property-value-static">${p(l.creator_name||"Unknown")} ${Oa(l.creator)}</span>
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
        `,Io&&Io.abort(),Io=new AbortController;const{signal:Z}=Io,ve=document.querySelector(".sidebar-overflow-trigger"),Me=document.querySelector(".overflow-menu-dropdown");if(ve&&Me){const B=()=>{Me.classList.add("hidden"),ve.setAttribute("aria-expanded","false")},U=()=>{const Y=Me.classList.toggle("hidden");ve.setAttribute("aria-expanded",String(!Y))};ve.addEventListener("click",U,{signal:Z}),document.addEventListener("click",Y=>{!ve.contains(Y.target)&&!Me.contains(Y.target)&&B()},{signal:Z}),Me.addEventListener("keydown",Y=>{Y.key==="Escape"&&(Y.stopPropagation(),B(),ve.focus())},{signal:Z})}__(),Tc(l.id),Ul("new-comment","mention-suggestions",{projectId:l.project_id}),af({signal:Z}),x_(Z),mk(w.querySelector(".detail-main"),l.id,Z),fo(w);const qe=document.getElementById("new-comment");if(Co=!1,qe){qe.addEventListener("compositionstart",()=>{Co=!0},{signal:Z}),qe.addEventListener("compositionend",()=>{Co=!1},{signal:Z});const B=Wu(l.id);B&&(qe.value=B),qe.addEventListener("input",()=>{Pa(l.id,qe.value)}),qe.addEventListener("keydown",U=>{var Y;U.key==="Enter"&&(U.metaKey||U.ctrlKey)&&(U.preventDefault(),(Y=qe.closest("form"))==null||Y.requestSubmit())}),m_("new-comment",{signal:Z,mentionContext:{projectId:l.project_id},placeholder:"Write a comment…",restore:j})}qs=M?M.id:null,Ns=P?P.id:null;const Sn=B=>{var $e;if((B.metaKey||B.ctrlKey)&&B.shiftKey&&(B.key===">"||B.key==="."||B.code==="Period")&&wo()){B.preventDefault();return}if(B.metaKey||B.ctrlKey||B.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||B.target.tagName==="INPUT"||B.target.tagName==="TEXTAREA"||B.target.tagName==="SELECT"||B.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||li())return;B.key==="ArrowLeft"&&qs?(B.preventDefault(),ce(qs)):B.key==="ArrowRight"&&Ns?(B.preventDefault(),ce(Ns)):B.key==="c"?(B.preventDefault(),B.stopImmediatePropagation(),b_("new-comment")):B.key==="j"?(B.preventDefault(),B.stopImmediatePropagation(),Bo(1)):B.key==="k"?(B.preventDefault(),B.stopImmediatePropagation(),Bo(-1)):B.key==="d"&&(B.preventDefault(),($e=document.querySelector('[data-action="edit-description"]'))==null||$e.click());const Y={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[B.key];if(Y){const _a=document.querySelector(`.property-row[data-field="${Y}"]`);_a&&(B.preventDefault(),_a.click())}};if(document.addEventListener("keydown",Sn,{signal:Z}),T){const B=document.getElementById(T.id);if(B&&(B.focus({preventScroll:!0}),typeof T.start=="number"&&typeof B.setSelectionRange=="function"))try{B.setSelectionRange(T.start,T.end)}catch{}}return E!==null&&window.scrollTo(0,E),"rendered"}catch(o){if(n)console.error("Failed to refresh issue detail:",o);else{if(i!==Fs)return"dropped";k("load issue",o);const r=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(r){const l=(o==null?void 0:o.status)===403||(o==null?void 0:o.status)===404;r.innerHTML=K(l?{icon:z.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:z.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function C_(e,t){if(e.preventDefault(),yc)return!1;const n=document.getElementById("new-comment").value;Pa(t,null),yc=!0;try{const i=await h.createComment(t,n);$("Comment added!","success"),Na(i),await ce(t)}catch(i){Pa(t,n),k("add comment",i)}finally{yc=!1}return!1}async function B_(e){const t=_e()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" data-action="set-description-editor-mode" data-mode="write">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" data-action="set-description-editor-mode" data-mode="preview">Preview</button>
            </div>
            <div id="description-draft-warning" class="description-draft-warning hidden"></div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${p(t.description||"")}</textarea>
            <div id="edit-description-mention-suggestions" class="mention-suggestions hidden"></div>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=rs(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=Yu(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}Ul("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?Tn(e,c,t.description||""):Tn(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&Sf()}),a.addEventListener("keydown",c=>{var d,u;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,f;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(Tn(e,null),$c){ce(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?On(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,b;if(wc)return;const c=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(c===void 0)return;const d=Lo?Lo.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const y=document.getElementById("description-draft-warning");y&&(y.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",y.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");wc=!0,u&&(u.disabled=!0);const f=window.scrollY;try{await h.updateIssue(e,{description:c}),Tn(e,null),$("Description updated","success"),await ce(e,!1),window.scrollTo(0,f),(b=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||b.focus()}catch(y){k("update description",y)}finally{wc=!1,u&&(u.disabled=!1)}})}function Sf(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?On(n):'<span class="text-muted">Nothing to preview.</span>'}function D_(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?Sf():i.focus()}function M_(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,G(),document.getElementById("relation-issue-search").focus()}async function j_(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=C())==null?void 0:i.id,o=(await h.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${m(r.id)}" data-identifier="${m(r.identifier)}" data-title="${m(r.title)}">
                <span class="link-result-id">${p(r.identifier)}</span>
                <span class="link-result-title">${p(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function R_(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function P_(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function q_(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return $("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(i,t,"blocks"):await h.createRelation(t,i,n),F(),$("Relation added","success"),ce(t)}catch(s){k("add relation",s)}return!1}async function N_(e,t){try{await h.deleteRelation(e,t),$("Relation removed","success"),ce(e)}catch(n){k("remove relation",n)}}function Bo(e){const t=_e();if(!t)return;const n=ps();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||ce(n[s].id)}oe({"retry-issue-comments":(e,t)=>{ce(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{ww(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||B_(t.issueId)},"open-gate-document":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),Ce(t.documentId))},"scroll-to-ticket-gate":()=>{E_()},"save-comment":(e,t)=>{C_(e,t.issueId)},"show-add-relation-modal":(e,t)=>{To(),M_(t.issueId)},"remove-relation":(e,t)=>{N_(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{To(),Fp(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{q_(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{j_(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{R_(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{P_()},"set-description-editor-mode":(e,t)=>{D_(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>Bo(-1),"navigate-next-issue":()=>Bo(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),vf(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),o_(t.issueId)}});let Mt=[],Do={},Mo=new Set,Qt=null,Bc=null,jo=[],Us=[],Dc=[];function Ro(){return Do}function O_(){return Bc}function H_(){return Qt}dt(e=>{e==="currentProject"&&A()==="sprints"&&hn()});let Mc=0;async function hn({fromMemory:e=!1}={}){pp(-1);const t=X();if(!t){const o=document.getElementById("sprints-list");o&&(o.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Sprints belong to one project. Pick one in the sidebar switcher, or press P.</p>
                </div>
            `);return}const n=++Mc;iE();const i=document.getElementById("sprints-list"),s=ic(),a=e?bo("sprints",s):void 0;a?(Mt=a,If()):i&&(i.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{const[,o]=await Promise.all([h.getCurrentSprint(t),h.getSprints(t)]),r=o.some(c=>c.status==="active")?o:await h.getSprints(t);if(n!==Mc)return;const l=a&&yo(Mt,r);Mt=r,wi("sprints",s,r),l||If(),await Po()}catch(o){return n!==Mc?void 0:(i&&(i.innerHTML=K({icon:z.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),k("load sprints",o),!1)}return!0}function If(){const e=document.getElementById("sprints-list");if(!e)return;const t=Mt.find(a=>a.status==="active"),n=Mt.find(a=>a.status==="planned"),i=Mt.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 data-action="view-sprint" data-sprint-id="${m(t.id)}" data-sprint-url="/sprint/${m(t.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${o?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${p(t.name)}</div>
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
        `,s+=F_(t)}if(n){const a=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",o=(n.budget?`${n.budget} point budget`:"No budget set")+(a?` <span class="text-muted">· ${a}</span>`:"");s+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${m(n.id)}" data-sprint-url="/sprint/${m(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${p(n.name)}</div>
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
                            <span class="sprint-history-name">${p(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=s||K({icon:z.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function Lf(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${Nc(e.activated_at)}, closed ${Nc(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${Nc(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function F_(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${p(Lf(e))||"not yet activated"}</span>
                    <span>${p(r)}</span>
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
    `}let jc=0;async function Si(e,t=!0){var n;try{t&&bn();const i=++jc,s=A(),a=await h.getSprint(e);if(i!==jc)return;if(!a){$("Sprint not found","error"),O("sprints");return}Bc=a;const o=(n=C())==null?void 0:n.id,[r,l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),o?h.getDocuments(o,a.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==jc)return;jo=r,Dc=l,Us=c,A()===s&&At(jo),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),G_()}catch(i){console.error("Failed to load sprint:",i),$("Failed to load sprint","error"),O("sprints")}}async function U_(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){$("Invalid sprint ID","error"),O("sprints",!1);return}try{await Si(e,!1)}catch{O("sprints",!1)}}function G_(){const e=Bc,t=jo;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=A()||"sprints",s=t.filter(g=>gs.includes(g.status)),a=t.filter(g=>g.status==="done"),o=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((b,y)=>b+(y.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),c=r(a),d=o.length>0?`<div class="stat-note">${o.length} canceled not counted</div>`:"";let u="";e.status==="active"?u='<span class="badge badge-status-active">Active</span>':e.status==="planned"?u='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(u='<span class="badge badge-status-completed">Completed</span>');const f=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${m(i)}">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${p(e.name)}</h2>
                ${u}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.activated_at?`
                <div class="sprint-detail-dates">
                    ${p(Lf(e))}
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
                ${s.length===0?K({icon:z.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(g=>Rc(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?K({icon:z.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(g=>Rc(g)).join("")}
                    </div>
                `}
            </details>

            ${o.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${o.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${o.map(g=>Rc(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${V_()}
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
                        ${Us.map(g=>z_(g)).join("")}
                    </div>
                `:K({icon:z.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function Rc(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...gp,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${m(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${p(e.identifier)}</span>
            <span class="sprint-issue-title">${p(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${oE(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function z_(e){const t=p(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${m(e.id)}" data-document-url="/document/${m(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${p(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${et(e.created_at)}</span>
            </span>
        </div>
    `}function V_(){const e=Dc;if(!e||e.length===0)return`
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
                            <span class="ledger-item-identifier">${p(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${p(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${W_(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function W_(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function K_(e,t,n,i){const s=i?LE(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${m(e)}" data-project-id="${m(i)}" data-current-budget="${m(n??"")}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${m(t)}" placeholder="Sprint name">
            </div>
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${s?`<small class="form-hint">${p(s)}</small>`:""}
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
    `,G()}async function Y_(e,t,n){var u,f,g,b;e.preventDefault();const i=(f=(u=document.getElementById("sprint-name"))==null?void 0:u.value)==null?void 0:f.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(b=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:b.dataset.currentBudget,l=r?parseInt(r):null,c=a!==l,d=Mt.find(y=>y.id===t);try{const y={};i&&(y.name=i);const x=o==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!x&&(y.budget=a),Object.keys(y).length&&await h.updateSprint(t,y),o==="planned"){const L=Mt.filter(T=>T.status==="planned"&&T.id!==t);for(const T of L)await h.updateSprint(T.id,{budget:a})}o==="default"&&n&&await h.updateProject(n,{default_sprint_budget:a}),await hn(),F(),$(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(y){k("update budget",y)}return!1}const Tf="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function Q_(e,t=null){const n=Mt.find(c=>c.id===e),i=n?se().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${Tf}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let a;try{a=await h.updateSprint(e,{budget_follows_default:!0})}catch(c){k("reset budget to project default",c),t&&(t.disabled=!1);try{await hn()}catch{}return}const o=(a==null?void 0:a.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await hn()!==!1}catch{l=!1}$(`'${o}' follows the project default budget again: ${s(a==null?void 0:a.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((a==null?void 0:a.budget)===null||(a==null?void 0:a.budget)===void 0)&&$(Tf,"warning")}async function Z_(e){const t=Mt.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,G();const n=gs;let i=0,s=!1,a=!1;try{const[l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${p(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':i>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${i}</strong> incomplete issue${i===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${s?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${m(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function X_(e){try{const t=await h.closeSprint(e);await hn(),Bf(),t.limbo?eE(t):$("Sprint completed!","success")}catch(t){k("complete sprint",t)}}async function Po(){const e=X();if(e)try{Qt=await h.getLimboStatus(e),J_()}catch(t){console.error("Failed to load limbo status:",t)}}function J_(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Qt||!Qt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Qt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function eE(e){const t=X();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
            <button type="button" class="btn btn-primary" data-action="dismiss-limbo-modal">Got it</button>
        </div>
    `,G(),tE(t)}async function tE(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${p(i.name)} <span class="ritual-mode">(${p(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${$t(i.prompt)}</div>
                    ${qc(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function Pc(){var t,n;if(!Qt)return;const e=X();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Qt.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${p(i.name)}</strong>
                            <span class="badge badge-ritual-${m(i.approval_mode)}">${p(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${$t(i.prompt)}</div>
                        ${qc(i.attestation)}
                        ${nE(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=Qt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Qt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${p(i.name)}</div>
                            ${qc(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,G()}function qc(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${p(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${p(et(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${$t(e.note)}</div>
        </div>
    `}function nE(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}" data-ritual-name="${m(e.name)}" data-ritual-artifact="${m(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Af(e){for(const t of e)if(!Mo.has(t))try{(await h.getSprints(t)).forEach(i=>{Do[i.id]=i}),Mo.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function iE(){Do={},Mo=new Set,jo=[],Dc=[],Us=[],qo={}}function sE(e,t){t.forEach(n=>{Do[n.id]=n}),Mo.add(e)}let qo={};function aE(e){return qo[e]}function Cf(e,t){qo[e]=t??null}function Bf(){qo={}}oe({"retry-load-sprints":()=>hn(),"view-sprint":(e,t,n)=>{if(!(e.type==="keydown"&&(n==null?void 0:n.tagName)==="BUTTON")){if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}Si(t.sprintId)}},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;K_(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{Q_(t.sprintId,n)},"show-limbo-details-modal":()=>{Pc()},"show-close-sprint-confirmation":(e,t)=>{Z_(t.sprintId)},"handle-update-budget":(e,t)=>{Y_(e,t.sprintId,t.projectId)},"close-modal":()=>{F()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,F(),X_(t.sprintId)},"dismiss-limbo-modal":()=>{F(),Po()},"approve-ritual":(e,t)=>{rE(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{Mf(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}ce(t.issueId)},"create-sprint-document":async(e,t)=>{await Vk(t.sprintId,t.projectId,()=>{Si(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Ce(t.documentId)}});function Nc(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function oE(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}dt(e=>{e==="currentProject"&&A()==="rituals"&&queueMicrotask(()=>Df())});async function Df(){const e=X();if(e){Cn("projects"),await Vo(e,{tab:"sprint-rituals",replace:!0,onlyIfView:"projects"});return}const t=document.getElementById("rituals-content");t&&(t.innerHTML=K({icon:z.projects,heading:"Select a project",description:"Rituals live in each project's settings. Pick a project in the sidebar switcher, or press P."}))}async function rE(e,t){try{await h.approveAttestation(e,t),$("Ritual approved!","success"),await Po(),Pc()}catch(n){k("approve ritual",n)}}function Oc(e){return e==="document"?`
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
        `:""}function Hc(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){$("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){$("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function Mf(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Oc(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{lE(s,e,t,i)}),G()}async function lE(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=Hc(i);if(a===void 0)return!1;try{await h.completeGateRitual(t,n,s||null,a),$("Ritual completed!","success"),await Po();const o=H_();o&&!o.in_limbo?(F(),$("Limbo cleared! Next sprint is now active.","success")):Pc()}catch(o){k("complete gate ritual",o)}return!1}function cE(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${p(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${Oc(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{dE(o,e,t,s,a)}),G()}async function dE(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return $("A note is required for this attestation.","error"),!1;const o=Hc(i);if(o===void 0)return!1;try{await h.attestTicketRitual(t,n,a||null,o),$("Ritual attested!","success"),F(),await Os(n)}catch(r){k("attest ticket ritual",r)}return!1}async function uE(e,t){try{await h.attestTicketRitual(e,t),$("Ritual attested!","success"),await Os(t)}catch(n){k("attest ticket ritual",n)}}async function pE(e,t){try{await h.approveTicketRitual(e,t),$("Ritual approved!","success"),await Os(t)}catch(n){k("approve ticket ritual",n)}}function jf(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{mE(s,e,t,n,i)}),G()}async function mE(e,t,n,i,s=null){e.preventDefault();const a=document.getElementById("reject-ritual-note").value.trim();if(!a)return $("A rejection needs a reason.","error"),!1;try{await h.rejectTicketRitual(t,n,a),$(`"${i}" rejected. The attester has been told why.`,"success"),F(),s&&await s()}catch(o){k("reject ritual",o)}return!1}function fE(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Oc(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{gE(s,e,t,i)}),G()}async function gE(e,t,n,i=""){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value,a=Hc(i);if(a===void 0)return!1;try{await h.completeTicketGateRitual(t,n,s||null,a),$("Ritual completed!","success"),F(),await Os(n)}catch(o){k("complete ticket ritual",o)}return!1}oe({"approve-ticket-ritual":(e,t)=>{pE(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{jf(t.ritualId,t.issueId,t.ritualName,()=>Os(t.issueId))},"complete-ticket-ritual":(e,t)=>{fE(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{cE(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{uE(t.ritualId,t.issueId)}});function hE(e){const t=document.createElement("template");return t.innerHTML=e,Yb(t.content),t.innerHTML}function $t(e){if(!e)return"";try{Q.setOptions({breaks:!0,gfm:!0});const n=Q.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;")),i=Gu.sanitize(n,{FORCE_BODY:!0,ALLOW_DATA_ATTR:!1});return i.includes("/api/attachments/")?hE(i):i}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function Gs(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function vE(e,t,n,i,s,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${p(s)}</span>
                    <span class="gate-approval-issue-title">${p(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${m(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${p(i)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${p(o)}</strong>${r?` ${Gs(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{bE(c,e,t,n)}),G(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function bE(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await h.completeTicketGateRitual(t,n,s||null),$(`GATE ritual "${i}" approved!`,"success"),F(),jt()}catch(a){k("complete gate ritual",a)}}function yE(e,t,n,i,s,a,o,r){vE(e,t,n,i,s,a,o,r)}function wE(e,t,n,i,s,a,o,r,l){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${p(s)}</span>
                    <span class="gate-approval-issue-title">${p(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${m(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${p(i)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${p(o)}</strong>${r?` ${Gs(r)}`:""}</div>`:""}
                ${l?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><div class="markdown-body">${$t(l)}</div></div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{$E(d,e,t,n)}),G(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function $E(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{await h.approveTicketRitual(t,n);let r=null;if(s)try{r=await h.createComment(n,s)}catch(l){console.error("Failed to post approval comment:",l)}$(`Review ritual "${i}" approved!`,"success"),Na(r),F(),jt()}catch(r){k("approve review ritual",r)}}function kE(e,t,n,i,s,a,o,r,l){wE(e,t,n,i,s,a,o,r,l)}dt(e=>{e==="currentProject"&&A()==="approvals"&&jt()});let Fc=[],Uc=0;async function jt(){if(!C())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++Uc;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=X(),i=n?se().filter(r=>r.id===n):se(),s=await Promise.all(i.map(async r=>{const[l,c]=await Promise.all([h.getPendingApprovals(r.id),h.getLimboStatus(r.id)]);return{project:r,approvals:l,limbo:c}}));if(t!==Uc)return;const a=[],o=[];for(const{project:r,approvals:l,limbo:c}of s)if(a.push(...l),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(u=>{var f;return(f=u.attestation)!=null&&f.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});d.length>0&&o.push({project:r,rituals:d})}cy(a),Fc=o,Rf()}catch(n){if(t!==Uc)return;e.innerHTML=K({icon:z.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),k("load approvals",n)}}function Rf(){const e=document.getElementById("approvals-list");if(!e)return;const t=ly(),n=Fc.length>0,i=!Nb();if(t.length===0&&!n){i?e.innerHTML=`
                <div class="empty-state approvals-explainer">
                    <div class="empty-state-icon">${z.issues}</div>
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
            `:e.innerHTML=K({icon:z.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let s="";n&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${Fc.map(({project:d,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${p(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(f=>{const g=f.attestation&&!f.attestation.approved_at,b=g?"⏳":"○",y=g?`<span class="gate-waiting-info">Attested by <strong>${p(f.attestation.attested_by_name||"Unknown")}</strong></span>`:f.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',x=g?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${m(f.id)}"
                                            data-project-id="${m(d.id)}">Approve</button>`:f.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${m(f.id)}"
                                                data-project-id="${m(d.id)}"
                                                data-ritual-name="${m(f.name)}"
                                                data-ritual-artifact="${m(f.artifact||"")}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${b} ${p(f.name)}
                                                    <span class="badge badge-ritual-${m(f.approval_mode)}">${p(f.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${p(f.prompt)}</span>
                                                ${y}
                                            </div>
                                            ${x}
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
                    ${r.map(Gc).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(Gc).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(Gc).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;yE(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var g;d.disabled=!0;const u=(g=d.closest(".gate-ritual-actions"))==null?void 0:g.querySelector(".review-approve-btn");u&&(u.disabled=!0);const f=d.dataset;try{await h.approveTicketRitual(f.ritualId,f.issueId),$(`Review ritual "${f.ritualName}" approved!`,"success"),await jt()}catch(b){d.disabled=!1,u&&(u.disabled=!1),k("approve review ritual",b)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;kE(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".gate-reject-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;jf(u.ritualId,u.issueId,u.ritualName,()=>jt())})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await h.approveAttestation(d.dataset.ritualId,d.dataset.projectId),$("Sprint ritual approved!","success"),await jt()}catch(u){d.disabled=!1,k("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{Mf(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName,d.dataset.ritualArtifact||"")})})}function _E(){Ob(),Rf()}function Gc(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${p(i.requested_by_name)}</strong>${i.requested_at?` (${Gs(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note markdown-body">${$t(i.attestation_note)}</div>`:"",l=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=!s&&i.rejection_note,d=c?`<div class="gate-rejection-note"><strong>Rejected by ${p(i.rejected_by_name||"Someone")}</strong>${i.rejected_at?` (${Gs(i.rejected_at)})`:""}: ${p(i.rejection_note)}<br><span class="text-muted">Waiting for the requester to ask again.</span></div>`:"",u=`<button class="btn btn-small btn-secondary gate-reject-btn"
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
                    ${u}
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
                    ${c?"":u}
                </div>`;return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${p(i.ritual_name)} ${l}</span>
                    <span class="gate-ritual-prompt">${p(i.ritual_prompt)}</span>
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
    `}oe({"view-issue-from-modal":(e,t)=>{e.preventDefault(),F(),ce(t.issueId)},"dismiss-approvals-explainer":()=>{_E()},"retry-load-approvals":()=>jt()});const No={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Oo={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Pf=0;function qf(e){Pf=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=Nf(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Nf(e="",t="",n=""){const i=Pf++,s=Object.keys(No).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?No[e]:No.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${Oo[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
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
    `}function EE(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Nf()),Ho()}function xE(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Ho()}function SE(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=No[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${Oo[o]}</option>`).join(""),Of(e),Ho()}function Of(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function zs(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Ho(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Hf(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,l=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,c=o.querySelector(".condition-value");let d=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw zs("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw zs("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${l}`;if(n.has(u))throw zs(`Duplicate condition: ${r} ${Oo[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),l==="isnull")t[u]=!0;else if(l==="in"||l==="contains")t[u]=d?d.split(",").map(f=>f.trim()).filter(f=>f):[];else if(l==="gte"||l==="lte"){if(!d)throw zs(`Please enter a numeric value for ${r} ${Oo[l]}.`),new Error(`Missing numeric value for ${u}`);const f=parseInt(d,10);if(isNaN(f))throw zs(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${d}`);t[u]=f}else t[u]=d}return Ho(),Object.keys(t).length>0?t:null}oe({"add-condition-row":()=>{EE()},"remove-condition-row":(e,t)=>{xE(Number(t.rowId))},"update-operator-options":(e,t)=>{SE(Number(t.rowId))},"toggle-value-input":(e,t)=>{Of(Number(t.rowId))}});let Be=[];const Fo="project-switcher",zc="all";function Uo(e=X()){const t=document.getElementById(Fo);t&&(t.value=e||"")}dt((e,t)=>{e==="currentProject"&&(t&&Vu(t),Uo(t),zE(t||""))});function Ff(){Vu(zc),bt(null)}const Go={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function se(){return Be}function IE(e){Be=e}function Ii(e){const t=Be.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return Go[n]||Go.fibonacci}function vn(e,t){if(e==null)return"No estimate";const i=Ii(t).find(s=>s.value===e);return i?i.label:`${e} points`}function zo(e,t){return e==null||e===0?!1:!Ii(t).some(i=>i.value===e)}function LE(e){const t=Be.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(Go[n]||Go.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function gt(){var t,n;const e=(t=C())==null?void 0:t.id;if(e)try{const i=await h.getProjects(e);if(((n=C())==null?void 0:n.id)!==e)return;Be=i,Gf(),Uf()}catch(i){k("load projects",i)}}function Uf(){const e=X();if(e&&Be.some(s=>s.id===e))return;const n=new URLSearchParams(window.location.search).get("project");if(n&&Be.some(s=>s.id===n)){bt(n);return}const i=zu();if(i===zc){e&&bt(null);return}if(i&&Be.some(s=>s.id===i)){bt(i);return}Be.length>0&&bt(Be[0].id)}function Gf(){const e=document.getElementById(Fo);e&&(e.innerHTML='<option value="">All projects</option>'+Be.map(t=>`<option value="${m(t.id)}" data-hint="${m(t.key||"")}">${p(t.name)}</option>`).join(""),Uo())}function zf(){const e=zu();return e===zc?null:e}function Gn(){const e=document.getElementById("projects-list");if(Be.length===0){e.innerHTML=K({icon:z.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=Be.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${m(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${re(t.color)}20; color: ${re(t.color)}">
                    ${p(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${p(t.name)}</div>
                <button class="grid-item-edit" data-action="view-project-settings" data-project-id="${m(t.id)}" title="Project settings">
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
    `).join("")}function TE(e){bt(e),O("issues")}function Vf(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,G()}async function AE(e){e.preventDefault();const t=C();if(!t){$("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(t.id,n),await gt(),Gn(),F(),$("Project created!","success")}catch(i){k("create project",i)}return!1}async function CE(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await gt(),Gn(),F(),$("Project updated!","success")}catch(i){k("update project",i)}return!1}async function BE(e){const t=Be.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await gt(),Gn(),F(),$("Project deleted","success")}catch(n){k("delete project",n)}}let De=null;function Wf(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function DE(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await h.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(De!==e.id)return;const i=n.filter(a=>a.id===e.default_epic_id||a.status!=="done"&&a.status!=="canceled"),s=e.default_epic_id&&!i.some(a=>a.id===e.default_epic_id)?`<option value="${m(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(a=>`<option value="${m(a.id)}">${p(a.identifier)} ${p(a.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function Vo(e,{tab:t="general",replace:n=!1,onlyIfView:i}={}){if(Be.length===0&&(await gt(),i&&A()!==i))return;e!==De&&(Zt=[]),De=e,Cn("projects");const s=Be.find(r=>r.id===e);if(!s){$("Project not found","error"),O("projects");return}document.getElementById("project-settings-title").textContent=`${s.name} Settings`,document.getElementById("ps-name").value=s.name||"",document.getElementById("ps-key").value=s.key||"",document.getElementById("ps-description").value=s.description||"",document.getElementById("ps-color").value=s.color||"#6366f1",document.getElementById("ps-estimate-scale").value=s.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=s.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=s.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=s.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=s.require_estimate_on_claim===!0,Wf("ps-require-assignee-on-claim",s.require_assignee_on_claim===!0),Wf("ps-require-epic-on-close",s.require_epic_on_close===!0),DE(s),document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden");const a=Yf(e,t),o=Qf(e,a.tab);n?window.history.replaceState(a,"",o):window.history.pushState(a,"",o),Zf(t)}const Kf=["general","rules","sprint-rituals","close-rituals","claim-rituals"];function Yf(e,t){return{view:"project-settings",settingsProjectId:e,tab:Kf.includes(t)?t:"general"}}function Qf(e,t){const n=`/projects/${encodeURIComponent(e)}/settings`;return t==="general"?n:`${n}?tab=${t}`}function Zf(e){Kf.includes(e)||(e="general");const t=De;t&&window.location.pathname===`/projects/${encodeURIComponent(t)}/settings`&&window.history.replaceState(Yf(t,e),"",Qf(t,e)),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Zt||Zt.length===0)&&Wo()}function ME(){De=null,Zt=[]}async function jE(){if(!De)return;const e=document.getElementById("ps-name").value.trim();if(!e){$("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(De,t),await gt(),$("Settings saved","success");const n=Be.find(i=>i.id===De);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){k("save project settings",n)}}async function RE(){if(!De)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const a=document.getElementById("ps-default-epic");a&&!a.disabled&&(n.default_epic_id=a.value||null);try{await h.updateProject(De,n),await gt(),$("Settings saved","success")}catch(o){k("save settings",o)}}let Zt=[];async function Wo(){const e=De;if(!e)return!1;try{const t=await h.getRituals(e);return e!==De?!1:(Zt=t,PE(),!0)}catch(t){return k("load rituals",t),!1}}function PE(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Zt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Zt.filter(i=>i.trigger==="ticket_close"),n=Zt.filter(i=>i.trigger==="ticket_claim");Vc("ps-sprint-rituals-list",e,"sprint"),Vc("ps-close-rituals-list",t,"close"),Vc("ps-claim-rituals-list",n,"claim")}function Vc(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>m(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${p(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${p(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${$t(a.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${s(a.approval_mode)}">${p(a.approval_mode||"auto")}</span>
          ${o}
          ${!a.group_name&&a.approval_mode==="auto"?"Agent clears immediately":""}
          ${!a.group_name&&a.approval_mode==="review"?"Requires human approval":""}
          ${!a.group_name&&a.approval_mode==="gate"?"Human only":""}
          ${a.note_required===!1?'<span class="badge badge-no-note">no note</span>':""}
          ${a.artifact?`<span class="badge badge-artifact">${p(a.artifact)}</span>`:""}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${m(a.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${m(a.id)}" data-ritual-name="${m(a.name)}">Delete</button>
      </div>
    </div>
  `}).join("")}async function qE(e){if(!De)return;let t=[];try{t=await h.getRitualGroups(De)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
          ${t.map(n=>`<option value="${m(n.id)}" data-mode="${m(n.selection_mode)}">${p(n.name)} (${p(n.selection_mode)})</option>`).join("")}
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
        ${qf(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,G()}function NE(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function OE(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function Xf(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw $("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(De,{name:t,selection_mode:n})).id}return e.value||null}async function HE(e){var s;e.preventDefault();let t;try{t=Hf()}catch{return!1}let n;try{n=await Xf()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await h.createRitual(De,i),await Wo(),F(),$("Ritual created!","success")}catch(a){k("create ritual",a)}return!1}async function FE(e){const t=Zt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(De)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form data-action="update-project-ritual" data-ritual-id="${m(e)}">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${m(t.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${p(t.prompt)}</textarea>
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
          ${n.map(o=>`<option value="${m(o.id)}" data-mode="${m(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${p(o.name)} (${p(o.selection_mode)})</option>`).join("")}
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
        ${qf(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,G()}async function UE(e,t){var a;e.preventDefault();let n;try{n=Hf()}catch{return!1}let i;try{i=await Xf()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await h.updateRitual(t,s),await Wo(),F(),$("Ritual updated!","success")}catch(o){k("update ritual",o)}return!1}async function GE(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await Wo(),$("Ritual deleted","success")}catch(n){k("delete ritual",n)}}oe({"view-project":(e,t)=>{TE(t.projectId)},"view-project-settings":(e,t)=>{Vo(t.projectId)},"create-project":e=>{AE(e)},"update-project":(e,t)=>{CE(e,t.projectId)},"confirm-delete-project":(e,t)=>{BE(t.projectId)},"edit-project-ritual":(e,t)=>{FE(t.ritualId)},"delete-project-ritual":(e,t)=>{GE(t.ritualId,t.ritualName)},"create-project-ritual":e=>{HE(e)},"update-project-ritual":(e,t)=>{UE(e,t.ritualId)},"toggle-ritual-conditions":()=>{NE()},"ritual-group-change":()=>{OE()}});function Jf(){const t=new URLSearchParams(window.location.search).get("project");return t||zf()}function zE(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const Wc={},eg=new Map;let Kc=null,Yc=null,Qc=null,Zc=null,Xc=null,Jc=null,ed=null,tg=!1;function VE(e){Object.assign(Wc,e)}function WE({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a,beforeScrollRestore:o}={}){e&&(Kc=e),t&&(Yc=t),n&&(Qc=n),i&&(Zc=i),s&&(Xc=s),a&&(Jc=a),o&&(ed=o)}function ng(){return Object.keys(Wc)}const KE=["issues","query","board","sprints","epics","documents","rituals","approvals","my-issues"],ig={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects",people:"people"},YE={board:"issues",rituals:"projects"};function Vs(e){const t=YE[e]||e;document.querySelectorAll(".nav-item").forEach(n=>{n.classList.toggle("active",n.dataset.view===t)})}function sg(){Kc&&Kc()}function O(e,t=!0,{transition:n=!1}={}){if(t&&bn(),Cn(e),t){let a;const o=Jf();e==="my-issues"?a=o?`/?project=${o}`:"/":e==="issues"&&window.location.search?a=`/issues${window.location.search}`:KE.includes(e)&&o?a=`/${e}?project=${o}`:a=`/${e}`,history.pushState({view:e},"",a)}Vs(e),sg();const i=()=>{document.querySelectorAll(".view").forEach(o=>o.classList.add("hidden"));const a=document.getElementById(`${e}-view`);a&&a.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=Wc[e];s&&s(),t&&window.scrollTo(0,0)}const Ws={"gate-approvals":"approvals",team:"people"},QE=new Set(["team"]);function ag(){var i;Cn(null);const e=window.location.pathname.split("/").filter(Boolean),t=e.length===0?"my-issues":Ws[e[0]]||e[0],n=e.length<=1&&ng().includes(t);document.querySelectorAll(".view").forEach(s=>s.classList.add("hidden")),n?((i=document.getElementById(`${t}-view`))==null||i.classList.remove("hidden"),Vs(t)):Vs(ig[e[0]]||null)}function td(){var i;const t=window.location.pathname.split("/").filter(Boolean);Zc&&Zc(),A()||Cn("my-issues");let n="my-issues";if(t.length===0||t[0]==="")O("my-issues",!1);else if(Yc&&Yc(t)){const s=ig[t[0]];s&&Vs(s);return}else n=t[0],Ws[n]&&(t.length===1&&QE.has(n)&&history.replaceState({view:Ws[n]},"",`/${Ws[n]}${window.location.search}`),n=Ws[n]),ng().includes(n)?O(n,!1):(n="my-issues",O("my-issues",!1));(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function bn(){eg.set(window.location.href,window.scrollY)}function Ko(e){bn(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Xc&&Xc(e)}function og(e){bn(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),Jc&&Jc(e)}function rg(){const e=eg.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{ed&&ed(),window.scrollTo(0,e)})}function lg(){tg||(tg=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&Qc&&Qc(e.state)){rg();return}(t=e.state)!=null&&t.view?O(e.state.view,!1):td(),rg()}))}let Xt=0,Li=!1,Ks=null,Yo=null,Ys=0;const zn=new Map;function Qo(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Xt===0&&!Li),e.textContent=Li?"Stopped":"Offline",e.title=Li?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function Je(e,t){return zn.has(e)||zn.set(e,new Set),zn.get(e).add(t),()=>{var n;return(n=zn.get(e))==null?void 0:n.delete(t)}}function ZE(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const XE=1e3;function Zo(){Yo&&(clearTimeout(Yo),Yo=null)}const JE="chaotic",nd=4001,ex=4003,tx="chaotic.bearer.";function nx(e){return[JE,tx+e]}function cg(e,{isReconnect:t=!1}={}){Ks&&(clearTimeout(Ks),Ks=null),Zo();const n=py();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),yl(null)),!t&&(Xt>0||Li)&&(Xt=0,Li=!1,Qo());const i=h.getToken();if(!i)return;const s=++Ys,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o,nx(i));yl(r);let l=!1;const c=()=>{if(l||s!==Ys)return;l=!0,Zo();const d=Xt>0;d&&$("Live updates reconnected","success"),Xt=0,Qo(),d&&id({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===Ys&&(console.log("WebSocket connected"),Zo(),Yo=setTimeout(c,XE))},r.onmessage=d=>{if(s!==Ys)return;c();let u;try{u=JSON.parse(d.data)}catch(f){console.error("WebSocket: malformed message",f);return}id(u)},r.onclose=d=>{if(s!==Ys)return;console.log("WebSocket disconnected"),Zo();const u=d==null?void 0:d.code;if(u===nd||u===ex){yl(null),Xt=0;const g=u===nd&&cl()===i;Li=!g,Qo();let b="forbidden";u===nd&&(b=g?"unauthorized":"superseded"),id({type:b,entity:"connection",data:{code:u,teamId:e}});return}Xt++,Xt===1&&$("Live updates disconnected. Reconnecting...","warning"),Qo();const f=ZE(Xt-1);Ks=setTimeout(()=>{Ks=null,C()&&C().id===e&&cg(e,{isReconnect:!0})},f)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function id(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=zn.get(`${n}:${t}`);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=zn.get(n);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=zn.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}const ix={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device",children_closed:"Nothing left open"};let Ti=0,Rt=!1,Ee=null,yn=null;const Ai=new Set,Qs=new Map,Pt=new Map,ht=new Map;function dg(e){Pt.get(e)===null&&Pt.set(e,Ti)}function sd(e){const t=ht.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=Ti)}function sx(e){return e.filter(t=>!Pt.has(t.id)).map(t=>{const n=ht.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(Rt&&ht.has(t.id)&&t.id!==Ee))}function ax(e){for(const[t,n]of Pt)n!==null&&e>n&&Pt.delete(t);for(const[t,n]of ht)n.confirmedAfter!==null&&e>n.confirmedAfter&&ht.delete(t)}function ox(e,t){t!=null&&t.id&&(e==="archived"?(Pt.has(t.id)||Pt.set(t.id,null),dg(t.id)):e==="read"&&sd(t.id))}async function Ci(){const e=C();if(e){try{const t=await h.getInboxUnreadCount(e.id);fs(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}Zs()}}function Zs(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=Ua();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0);const n=document.getElementById("inbox-header-count");n&&(n.textContent=t>0?`${t} unread`:"")}async function Xs({focusFirst:e=!1,background:t=!1}={}){const n=C();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++Ti;t||(yn={focusFirst:e||!!(yn!=null&&yn.focusFirst)},Ee=null,rx(i));try{const a=await h.getInbox(n.id,{unread:Rt,limit:100});if(s!==Ti)return;const o=new Set(Pt.keys());ax(s);const r=sx(a||[]),l=yn;yn=null,l?(Wt(r),ea(),l.focusFirst&&!Ve()&&dx()):lx(r,o)}catch(a){if(s!==Ti)return;yn?(yn=null,i.innerHTML=K({icon:z.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),k("load inbox",a)):console.error("Failed to refresh inbox:",a)}Ci()}function rx(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function Xo(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function ug(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function pg(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function mg(e,t){if(!e)return;const n=Xo(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=ug(n||t)),i==null||i.focus({preventScroll:!0})}function lx(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=he(),s=[...n.querySelectorAll(".inbox-row")],a=n.querySelector(".inbox-row.keyboard-selected"),o=(a==null?void 0:a.dataset.entryId)||null,r=a?s.indexOf(a):-1,l=pg(),c=window.scrollY,d=n.scrollTop;let u=e;if(Ee&&!e.some(b=>b.id===Ee)){const b=i.find(y=>y.id===Ee);if(b&&Rt&&!t.has(Ee)){u=[...e];const y=u.findIndex(x=>x.created_at<b.created_at);u.splice(y===-1?u.length:y,0,b)}else Ee=null}Wt(u),ea();let f=-1;o&&(f=u.findIndex(b=>b.id===o),f===-1&&u.length&&(f=Math.min(r,u.length-1))),f>=0?Js(f,{focus:!1}):Fa(-1);const g=f>=0?n.querySelectorAll(".inbox-row")[f]:null;mg(l,g),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function cx(e,t){if(!(t!=null&&t.id))return!1;const n=he().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function Bi(e){const t=he();for(const n of new Set(e)){const i=Xo(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const a=i.contains(document.activeElement)?pg():null,o=document.createElement("template");o.innerHTML=bg(s).trim();const r=o.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),mg(a,r)}}function Js(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){Fa(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),Fa(i),t&&ug(n[i]).focus({preventScroll:!0})}function dx(){Js(0)}async function ad(e){const t=he(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;Ee===e&&(Ee=null),Qs.delete(e),Pt.set(e,null),Wt(t.filter(a=>a.id!==e)),s&&fs(Math.max(0,Ua()-1)),ea(),Zs(),Js(n,{focus:!Ve()});try{await h.archiveInbox(e),dg(e)}catch(a){Pt.delete(e),console.error("Failed to archive inbox entry:",a)}}function fg(e){var s,a;const n=he().findIndex(o=>o.id===e);if(n===-1)return;const i=Ee;Ee=i===e?null:e,Ee===e&&gg(e),Bi([i,e]),Js(n),Ee===e&&((a=(s=Xo(e))==null?void 0:s.scrollIntoView)==null||a.call(s,{block:"nearest"}))}function gg(e){const t=he(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,ht.set(e,{readAt:i,confirmedAfter:null}),Wt([...t]),fs(Math.max(0,Ua()-1)),Zs(),h.markInboxRead(e).then(()=>sd(e),s=>{var o;((o=ht.get(e))==null?void 0:o.readAt)===i&&ht.delete(e);const a=he().find(r=>r.id===e);a&&a.read_at===i&&(a.read_at=null,Wt([...he()]),Bi([e])),Ci(),k("mark inbox entry read",s)})}function ux(e){var i;const n=he().findIndex(s=>s.id===e);if(n!==-1){if(gg(e),Rt)Ee===e&&(Ee=null),Wt(he().filter(s=>s.id!==e)),ea(),Js(n);else if(Bi([e]),!document.activeElement||document.activeElement===document.body){const s=Xo(e);(i=s==null?void 0:s.querySelector(".inbox-row-toggle"))==null||i.focus({preventScroll:!0})}}}function px(){if(Ee===null)return!1;const e=Ee;return Ee=null,Bi([e]),!0}function hg(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}function mx(e){if(Ai.has(e))return;const t=he().find(d=>d.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender",i=t.issue_identifier||"this ticket",s=Qs.get(e)||"",a=s?`Already posted on ${p(i)}. Submitting reassigns it to ${p(n)} without posting it again, unless you change it.`:`Posted on ${p(i)} before it is reassigned, so ${p(n)} knows why.`;document.getElementById("modal-title").textContent=`Reassign ${i} back to ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="inbox-reassign-form" class="inbox-reassign-form" novalidate>
            <div class="form-group">
                <label for="inbox-reassign-comment">Comment for ${p(n)}</label>
                <textarea id="inbox-reassign-comment" rows="4" required
                    aria-describedby="inbox-reassign-help"
                    placeholder="Why is this coming back, and what should happen next?">${p(s)}</textarea>
                <p class="form-help" id="inbox-reassign-help">${a}</p>
                <p class="form-error hidden" id="inbox-reassign-error" role="alert">Add a comment first.</p>
            </div>
            <div class="inbox-reassign-actions">
                <button type="button" class="btn btn-secondary" data-action="close-inbox-reassign">Cancel</button>
                <button type="submit" class="btn btn-primary" id="inbox-reassign-submit">Comment and reassign</button>
            </div>
        </form>
    `;const o=document.getElementById("inbox-reassign-form"),r=document.getElementById("inbox-reassign-comment"),l=document.getElementById("inbox-reassign-error");r.addEventListener("input",()=>{r.value.trim()&&l.classList.add("hidden")}),r.addEventListener("keydown",d=>{d.key==="Enter"&&(d.metaKey||d.ctrlKey)&&(d.preventDefault(),o.requestSubmit?o.requestSubmit():o.dispatchEvent(new Event("submit",{cancelable:!0})))});let c=!1;o.addEventListener("submit",async d=>{var y;if(d.preventDefault(),c)return;if(!he().some(x=>x.id===e)){$(`That inbox item is gone, so ${i} was not reassigned.`,"warning"),o.isConnected&&F();return}const u=r.value.trim();if(!u){l.classList.remove("hidden"),r.focus();return}const f=document.getElementById("inbox-reassign-submit");c=!0,f&&(f.disabled=!0);const g=await fx(e,u);c=!1;const b=o.isConnected&&Ve();if(g){if(b&&(F(),!document.activeElement||document.activeElement===document.body)){const x=document.querySelector("#inbox-list .inbox-row.keyboard-selected");(y=x==null?void 0:x.querySelector(".inbox-row-toggle"))==null||y.focus({preventScroll:!0})}}else f&&f.isConnected&&(f.disabled=!1)}),G()}async function fx(e,t){if(Ai.has(e))return!1;const n=he().find(r=>r.id===e);if(!n||!n.issue_id||!n.source_user_id)return!1;const i=typeof t=="string"?t.trim():"";if(!i)return!1;const s=n.source_user_name||"sender",a=n.issue_identifier||"issue";Ai.add(e),hg(e,!0);const o=(r,l)=>(Ai.delete(e),hg(e,!1),k(r,l),!1);if(Qs.get(e)!==i){let r;try{r=await h.createComment(n.issue_id,i)}catch(l){return o(`comment on ${a}`,l)}Qs.set(e,i),Na(r)}try{await h.updateIssue(n.issue_id,{assignee_id:n.source_user_id})}catch(r){return o(`reassign ${a} back to ${s}`,r)}return Ai.delete(e),Qs.delete(e),ad(e),!0}function gx(){vg(!Rt)}function vg(e){e!==Rt&&(Rt=e,document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(t=>{const n=t.dataset.filter==="unread"===Rt;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),Xs({focusFirst:!0}))}const hx='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',vx='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';function bx(e){const t=[...(e||"").trim()][0];return t?t.toUpperCase():"•"}function bg(e){const t=!e.read_at,n=e.id===Ee,i=ix[e.kind]||e.kind,s=e.issue_identifier||e.document_title||"",a=[`data-entry-id="${m(e.id)}"`,e.issue_id?`data-issue-id="${m(e.issue_id)}"`:"",e.document_id?`data-document-id="${m(e.document_id)}"`:""].filter(Boolean).join(" "),o=`inbox-panel-${e.id}`;return`
        <div class="inbox-row${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${a}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${m(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${m(o)}"`:""}>
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':'<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${p(bx(e.source_user_name))}</span>
                    <span class="inbox-row-header">
                        <span class="badge badge-inbox-${m(e.kind)}">${p(i)}</span>
                        ${s?`<span class="inbox-row-source">${p(s)}</span>`:""}
                    </span>
                    <span class="inbox-row-text">
                        <span class="inbox-row-title">${p(e.title)}</span>
                        ${!n&&e.body?`<span class="inbox-row-body">${p(e.body)}</span>`:""}
                    </span>
                </button>
                ${n?yx(e,s,o):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${t?`<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${m(e.id)}" title="Mark read" aria-label="Mark read">${hx}</button>`:""}
                    <button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${m(e.id)}" title="Archive (e)" aria-label="Archive">${vx}</button>
                </span>
                <span class="inbox-row-time">${p(Gs(e.created_at))}</span>
            </div>
        </div>
    `}function yx(e,t,n){const i=(e.kind==="assignment"||e.kind==="review_requested")&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,a=e.source_user_name,o=t?`Open ${p(t)}`:"Open",r=[i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${m(e.id)}"${Ai.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${a?` to ${p(a)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
                    data-entry-id="${m(e.id)}"
                    ${e.issue_id?`data-issue-id="${m(e.issue_id)}"`:""}
                    ${e.document_id?`data-document-id="${m(e.document_id)}"`:""}>${o}</button>`:"",`<button type="button" class="inbox-action-btn" data-action="archive-inbox-entry"
                data-entry-id="${m(e.id)}">Archive</button>`].filter(Boolean).join("");return`
        <div class="inbox-row-expanded-panel" id="${m(n)}" role="region"
             aria-label="${m(e.title)}">
            ${a?`<div class="inbox-expanded-source">from ${p(a)}</div>`:""}
            ${e.body?`<div class="inbox-expanded-body">${p(e.body)}</div>`:""}
            <div class="inbox-action-bar">${r}</div>
        </div>
    `}function ea(){const e=document.getElementById("inbox-list");if(!e)return;const t=he();if(t.length===0){e.innerHTML=K({icon:z.inbox,heading:Rt?"No unread items":"Inbox zero",description:Rt?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=$x(t)}function wx(e,t=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"Older";const i=a=>new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),s=Math.round((i(t)-i(n))/864e5);return s<=0?"Today":s===1?"Yesterday":s<7?"Last 7 days":"Older"}function $x(e){const t=[];for(const n of e){const i=wx(n.created_at),s=t[t.length-1];s&&s.label===i?s.entries.push(n):t.push({label:i,entries:[n]})}return t.map((n,i)=>`
        <section class="inbox-group" aria-labelledby="inbox-group-${i}">
            <h3 class="inbox-group-header" id="inbox-group-${i}">${p(n.label)}</h3>
            ${n.entries.map(s=>bg(s)).join("")}
        </section>
    `).join("")}async function kx(e){var s;const t=he().find(a=>a.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();ht.set(e,{readAt:n,confirmedAfter:null});try{await h.markInboxRead(e)}catch(a){((s=ht.get(e))==null?void 0:s.readAt)===n&&ht.delete(e);const o=he().find(r=>r.id===e);o&&o.read_at===n&&(o.read_at=null,Wt([...he()]),Bi([e])),console.error("Failed to mark inbox entry read:",a);return}sd(e);const i=he().find(a=>a.id===e);i&&!i.read_at?(i.read_at=n,Wt([...he()]),fs(Math.max(0,Ua()-1)),Zs(),Bi([e])):Ci()}async function _x(){const e=C();if(e)try{await h.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of he())n.read_at||ht.set(n.id,{readAt:t,confirmedAfter:Ti});Wt(he().map(n=>({...n,read_at:n.read_at||t}))),fs(0),Zs(),ea()}catch(t){k("mark all inbox entries read",t)}}function Ex(e){e.entryId&&kx(e.entryId),e.issueId?ce(e.issueId):e.documentId&&Ce(e.documentId)}function xx(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&ad(e.dataset.entryId)}function Sx(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&fg(e.dataset.entryId)}const Ix='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function Lx(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(Ix);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function Tx(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}oe({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&Tx((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||Lx(e.target,n)||(e.preventDefault(),t.entryId&&fg(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),Ex(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&mx(t.entryId)},"close-inbox-reassign":e=>{e.preventDefault(),F()},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&ad(t.entryId)},"toggle-inbox-unread-filter":()=>gx(),"set-inbox-filter":(e,t)=>vg(t.filter==="unread"),"mark-inbox-read":(e,t)=>{e.preventDefault(),t.entryId&&ux(t.entryId)},"mark-all-inbox-read":()=>_x(),"retry-load-inbox":()=>Xs({focusFirst:!0})});let ta=[],Di=[],Vn=[];function od(){return ta}function yg(e){ta=Array.isArray(e)?e:[],wg()}function kt(){return Di}async function Jo(e=null){try{ta=await(e||h.getMyTeams()),wg()}catch(t){k("load teams",t)}}function wg(){const e=document.getElementById("team-list");ta.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=ta.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${m(JSON.stringify(t))}">${p(t.name)}</button>
        `).join("")}async function er(e,t=!1,{seed:n=null}={}){Wn=null,ti(e),Eg(),document.getElementById("current-team-name").textContent=e.name;const i=document.getElementById("mobile-team-name");i&&(i.textContent=e.name);const s=document.getElementById("team-description-text");if(s&&(s.textContent=e.description||""),document.getElementById("team-dropdown").classList.add("hidden"),cg(e.id),n&&Cx(n)){let a=!1;try{Bx(n),Wn=e.id,t?td():O(A()||"my-issues"),a=!0}catch(o){console.error("Failed to paint from the boot cache:",o),Wn=null}if(a){$g(e).catch(o=>console.error("Failed to refresh team data:",o));return}}await $g(e),t?td():O(A()||"my-issues")}let Wn=null;function Ax(){var e;return Wn&&Wn===((e=C())==null?void 0:e.id)?Wn:null}async function $g(e){var t;await Promise.all([gt(),Qx(),Mx(),R$(),Ci()]),((t=C())==null?void 0:t.id)===e.id&&(Wn=e.id)}function Cx(e){const t=new URLSearchParams(window.location.search).get("project");return!t||Array.isArray(e.projects)&&e.projects.some(n=>n.id===t)}function Bx(e){IE(Array.isArray(e.projects)?e.projects:[]),Gf(),Uf(),ms(Array.isArray(e.labels)?e.labels:[]),Di=Array.isArray(e.members)?e.members:[],M$(e.agents),hs(kt,ft),ii(),Sy(e.issues)}function kg(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Dx(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Mx(){var t,n;const e=(t=C())==null?void 0:t.id;if(e)try{const i=await h.getTeamMembers(e);if(((n=C())==null?void 0:n.id)!==e)return;Di=i,hs(kt,ft),ii()}catch(i){console.error("Failed to load team members:",i),k("load team members",i)}}function jx(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let rd=0;async function _g(){var n,i;const e=(n=C())==null?void 0:n.id;if(!e)return;const t=++rd;try{const s=await h.getTeamMembers(e);if(t!==rd||((i=C())==null?void 0:i.id)!==e)return;Di=s,hs(kt,ft),ii()}catch(s){if(t!==rd)return;Di=[],k("load team members",s)}Rx()}function Mi(){var n;const e=(n=ue())==null?void 0:n.id,t=Di.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function Rx(){var t;const e=Mi();for(const n of["invite-member-btn","edit-team-btn"])(t=document.getElementById(n))==null||t.classList.toggle("hidden",!e)}let tr=0;async function nr(){var i;if(!C())return;const e=++tr,t=C().id,n=document.getElementById("team-invitations-list");n&&(n.innerHTML=jx());try{const s=await h.getTeamInvitations(t);if(e!==tr||((i=C())==null?void 0:i.id)!==t)return;Vn=s,ld()}catch(s){if(e!==tr)return;if((s==null?void 0:s.status)===403){Vn=[],ld();return}console.error("Failed to load team invitations:",s),xg(!0),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function Eg(){tr++,Vn=[],ld()}function xg(e){var t;(t=document.getElementById("people-invitations"))==null||t.classList.toggle("hidden",!e)}function ld(){const e=document.getElementById("team-invitations-list");if(!e)return;const t=document.getElementById("people-invitations-count");if(t&&(t.textContent=String(Vn.length)),xg(Vn.length>0),Vn.length===0){e.innerHTML="";return}const n=Mi();e.innerHTML=Vn.map(i=>`
        <div class="list-row-2line">
            <div class="list-row-main">
                <div class="list-row-title">${p(i.email)}</div>
                <div class="list-row-sub">Invited as ${p(i.role)} · expires ${new Date(i.expires_at).toLocaleDateString()}</div>
            </div>
            ${n?`<div class="list-row-right">
            <button class="btn btn-secondary btn-small" data-action="issue-invitation-code" data-invitation-id="${m(i.id)}" title="For an invitee whose verification email never arrives">Code for invitee</button>
            <button class="btn btn-danger-outline btn-small" data-action="delete-invitation" data-invitation-id="${m(i.id)}">Cancel</button>
            </div>`:""}
        </div>
    `).join("")}function Sg(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,G()}async function Px(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await h.createInvitation(C().id,t,n);if(await nr(),i&&i.accept_url)return Ox(t,Nx(i.accept_url),i.email_queued===!0),!1;F(),$("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){qx(i)?$(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):k("send invitation",i)}return!1}function qx(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function Ig(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function Nx(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!Ig(n.hostname)||Ig(i.hostname)?e:i.origin+n.pathname}function Ox(e,t,n=!1){var a;const i=p(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${p(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,Ve()||G(),(a=document.querySelector('[data-action="copy-invite-link"]'))==null||a.focus(),Lg()}function Lg(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function Hx(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),$("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),$("Could not copy: the link is selected, copy it by hand","error")}}async function Fx(e){let t;try{t=await h.issueInvitationVerificationCode(C().id,e)}catch(n){k("get a verification code",n);return}Gx(t)}function Ux(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let a;return s<3600?a=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?a=`${Math.round(s/3600)} h`:a=`${Math.round(s/86400)} days`,`${a} ${n>=i?"after":"before"} the invitation was created`}function Gx(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=Ux(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">Send this code only through a channel you already trust for the invitee, never to whoever asked you for it. Anyone who saw the link can sign up with their address and ask, and chooses the name shown below.</p>
            <p>The account it is for:</p>
            <ul class="invitation-code-account">
                <li>Name: <strong>${p(t.name||"")}</strong></li>
                <li>Email: ${p(t.email||"")}</li>
                <li>Signed up: ${p(n)} (${p(i)})</li>
                <li>Already in a team: ${t.member_of_any_team?"yes":"no"}</li>
            </ul>
            <p class="warning-text">A signup shortly after you sent the link fits both the invitee and someone who saw the link: confirm with the invitee directly. One that predates the invitation was not made from the link, but check that the invitee recognises it. If they don't, don't give out the code: cancel the invitation.</p>
            <div class="api-key-display">
                <code id="invitation-code">${p((e==null?void 0:e.code)||"")}</code>
            </div>
            <p>Expires at ${p(s)}. It lets that account accept this invitation only: they enter it on the invitation page, or run <code>chaotic team accept-invite &lt;link&gt; --code &lt;code&gt;</code>. You won't be able to see it again.</p>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,Ve()||G(),Lg("invitation-code")}async function zx(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(C().id,e),await _g(),$("Member removed!","success"),window.dispatchEvent(new CustomEvent("chaotic:member-removed",{detail:{userId:e}}))}catch(t){k("remove member",t)}}async function Vx(e){try{await h.deleteInvitation(C().id,e),await nr(),$("Invitation canceled!","success")}catch(t){k("cancel invitation",t)}}function Tg(){kg(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,G()}function Wx(){C()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
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
                <textarea id="team-description">${p(C().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,G())}async function Kx(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await Jo(),await er(n),F(),$("Team created!","success")}catch(n){k("create team",n)}return!1}async function Yx(e){if(e.preventDefault(),!C())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(C().id,t);ti(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||""),await Jo(),F(),$("Team updated!","success")}catch(n){k("update team",n)}return!1}async function Qx(){var t,n;const e=(t=C())==null?void 0:t.id;if(e)try{const i=await h.getLabels(e);if(((n=C())==null?void 0:n.id)!==e)return;ms(i)}catch(i){console.error("Failed to load labels:",i),k("load labels",i)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),oe({"select-team":(e,t)=>{er(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{e!=null&&e.type&&e.type!=="click"||zx(t.userId)},"delete-invitation":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Vx(t.invitationId)},"issue-invitation-code":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Fx(t.invitationId)},"retry-load-team-invitations":()=>{nr()},"invite-member":e=>{Px(e)},"copy-invite-link":()=>{Hx()},"dismiss-invite-link":()=>{F()},"create-team":e=>{Kx(e)},"update-team":e=>{Yx(e)}});let qt=null,Jt=0,ji=null,Ri=null,na=null,cd=!1;function Zx(){return Tb()}function Ag(){Ab()}function Cg(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Xx(){qt||(qt=document.createElement("div"),qt.id="onboarding-overlay",qt.className="onboarding-overlay",document.getElementById("app").appendChild(qt))}function ia(){if(!qt)return;const e=cd?Dg():Bg(),t=e[Jt],n=e.map((i,s)=>`<span class="onboarding-dot${s===Jt?" active":""}${s<Jt?" completed":""}"></span>`).join("");qt.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Bg(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Cg(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Cg(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&ji&&(e.textContent=`${ji.name} (${ji.key})`),t&&Ri&&(t.textContent=`${Ri.name} (${Ri.key})`),n&&na&&(n.textContent=`${na.identifier} - ${na.title}`)}}]}function Dg(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function dd(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function ud(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Pi(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function Jx(){const e=cd?Dg():Bg();Jt<e.length-1&&(Jt++,ia())}function e0(){Ag(),jg(),Kn()}function t0(){Ag(),jg(),Kn()}async function n0(e){e.preventDefault(),ud("onboarding-team-error"),Pi("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{ji=await h.createTeam({name:t,key:n}),Jt++,ia()}catch(i){dd("onboarding-team-error",i.message||"Failed to create team"),Pi("onboarding-team-submit",!1)}}async function i0(e){e.preventDefault(),ud("onboarding-project-error"),Pi("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Ri=await h.createProject(ji.id,{name:t,key:n}),Jt++,ia()}catch(i){dd("onboarding-project-error",i.message||"Failed to create project"),Pi("onboarding-project-submit",!1)}}async function s0(e){e.preventDefault(),ud("onboarding-issue-error"),Pi("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{na=await h.createIssue(Ri.id,{title:t}),Jt++,ia()}catch(n){dd("onboarding-issue-error",n.message||"Failed to create issue"),Pi("onboarding-issue-submit",!1)}}function Mg(e=!1){cd=e,Jt=0,ji=null,Ri=null,na=null,Xx(),ia()}function jg(){qt&&(qt.remove(),qt=null)}function Rg(){Cb(),Mg(!0)}oe({"onboarding-next":e=>{e.preventDefault(),Jx()},"onboarding-skip":e=>{e.preventDefault(),e0()},"onboarding-finish":e=>{e.preventDefault(),t0()},"onboarding-create-team":e=>{n0(e)},"onboarding-create-project":e=>{i0(e)},"onboarding-create-issue":e=>{s0(e)}});const Pg="/oauth/consent/";function a0(e){if(!e||!e.startsWith(Pg))return null;const t=e.slice(Pg.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function o0(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function r0(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function l0(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const qg={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function ir(e){const t=qg[e.trust]||qg.unverified,n=e.host?` · ${p(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${m(e.trust)}">${p(t)}${n}</span>`}function c0(e,t){return e.teams.map(n=>`<option value="${m(n.id)}"${n.id===t?" selected":""}>${p(n.name)}</option>`).join("")}function d0(e,t){const n=e&&t?e.agents.find(a=>a.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${p(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function Ng(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",a=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${m(i.id)}"${s}>${p(i.name+a)}</option>`)}return n.join("")}function Og(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${m(t.id)}">
            ${p(t.name)} <span class="oauth-muted">${p(t.key)}</span>
        </label>`).join("")}function u0(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${m(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${p(t.name)}${p(i)}
        </label>`}).join("")}function p0(e,t){const n=p(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${ir(t.client)}</p>
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
        </div>`}function m0(e,t){if(t.acts_as==="person"){p0(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=p(t.client.name),a=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",o=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${p(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${ir(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${p(t.redirect_host)}</strong></p>
            ${o}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${c0(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${Ng(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${m(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${Og(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${u0(t)}
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,pd(e,t)}function pd(e,t){var a;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const o=(a=e.querySelector("#oauth-team"))==null?void 0:a.value,r=d0(t.teams.find(l=>l.id===o),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function f0(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(o=>o.value),s=e.querySelector('input[name="oauth-policy"]:checked'),a={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const o=e.querySelector("#oauth-agent-name").value.trim();o&&(a.agent_name=o)}return a}function g0(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function sa(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${p(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function h0(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{h.logout(),t()})}function v0(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(u=>u.id===s.value);e.querySelector("#oauth-agent").innerHTML=Ng(d,null),e.querySelector("#oauth-projects").innerHTML=Og(d),pd(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>pd(e,n));let a=!1;const o=async d=>{if(!a){a=!0;try{const u=d?await h.approveOAuthRequest(t,f0(e)):await h.denyOAuthRequest(t);if(!o0(u.redirect)){sa(e,"The app's return address isn't one a browser should be sent to.");return}i(u.redirect)}catch(u){if(a=!1,u&&u.status===404){sa(e,"It has expired, was already answered, or belongs to someone else.");return}g0(e,u&&u.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),o(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>o(!1))}async function b0(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=r0();l0(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await h.getOAuthRequest(e)}catch(a){a&&a.status===404?sa(i,"It has expired, was already answered, or belongs to someone else."):a&&a.status===403&&a.detail&&a.detail.error_code==="web_login_required"?h0(i,n):a&&a.status===403?sa(i,"Only a person signed in to Chaotic can approve an app."):sa(i,a&&a.message||"Something went wrong");return}m0(i,s),v0(i,e,s,t)}const md="/invite/",aa="/invite",fd="chaotic.inviteToken",Hg="invite-auth-notice";let gd=null;const y0="This invitation is no longer valid.",w0={owner:"an owner",admin:"an admin",member:"a member"};function $0(e){if(!e||!e.startsWith(md))return null;const t=e.slice(md.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function Fg(){const{pathname:e}=window.location,t=$0(e);if(t){gd=t;try{sessionStorage.setItem(fd,t)}catch{}return history.replaceState(null,"",aa),t}if(!Ug(e))return null;let n=null;try{n=sessionStorage.getItem(fd)}catch{}const i=n||gd;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function Ug(e){return e===aa||e===`${aa}/`}function Gg(e){return Ug(e)||!!(e&&e.startsWith(md))}function hd(){gd=null;try{sessionStorage.removeItem(fd)}catch{}}function k0(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function _0(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function vd(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function zg(){const e=_0();return sr(),vd(e),e}function E0(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),sr()}function sr(){var e;(e=document.getElementById(Hg))==null||e.remove()}function bd(e){const t=e.invited_by_name?`<strong>${p(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=w0[e.role]||`a ${p(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${p(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${p(e.email_hint)}</strong>${x0(e)}</p>`}function x0(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${p(n)}`}const S0="Ask whoever invited you to send a new invitation.",I0="Reload the page to try again.";function yd(e,t=y0,n=S0){e.innerHTML=`
        <div class="invite-page">
            <h1>${p(t)}</h1>
            <p class="invite-muted">${p(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function L0(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function Vg(){window.location.pathname!==aa&&history.replaceState(null,"",aa),L0(zg())}function T0(e,t){e.innerHTML=`
        <div class="invite-page">
            ${bd(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function A0(e,t,n){const i=k0(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${p(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${bd(t)}
                ${s}
                <p class="invite-warning" role="alert">This invitation is for a different email address.
                    Only <strong>${p(t.email_hint)}</strong> can accept it. Sign out, then sign in
                    or create an account with that address.</p>
                <div class="invite-actions">
                    <a class="btn btn-secondary" href="/">Not now</a>
                    <button type="button" id="invite-sign-out" class="btn btn-primary">Sign out</button>
                </div>
            </div>`;return}e.innerHTML=`
        <div class="invite-page">
            ${bd(t)}
            ${s}
            <p id="invite-error" class="invite-warning hidden" role="alert"></p>
            <div id="invite-verify" class="invite-verify hidden">
                <p>Verify your email address to continue: we will email a six-digit code to
                    <strong>${p(n.email)}</strong>.</p>
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
        </div>`}function C0(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function B0(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),a=e.querySelector("#invite-code-form"),o=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=u=>{l.textContent=u,l.classList.remove("hidden")},d=()=>{var u;a.classList.remove("hidden"),(u=o.focus)==null||u.call(o)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const u=await h.requestEmailVerification(),f=C0(u.expires_at);c(`We sent a code to ${u.email}${f?`; it works until ${f}`:""}.`),s.textContent="Send a new code",d()}catch(u){const f=u&&u.detail&&u.detail.error_code;if(u&&u.status===401){n();return}if(f==="email_already_verified"){t();return}c(u&&u.message||"Something went wrong"),u&&u.status===429&&d()}finally{s.disabled=!1}}}),a.addEventListener("submit",async u=>{var g;if(u.preventDefault(),r.disabled)return;const f=o.value.trim();if(f){r.disabled=!0;try{await h.confirmEmailVerification(f)}catch(b){r.disabled=!1;const y=b&&b.detail&&b.detail.error_code;b&&b.status===401?n():y==="email_already_verified"?t():(c(b&&b.message||"Something went wrong"),(g=o.select)==null||g.call(o));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function D0(e,t){sr();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=Hg,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${p(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${p(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),sr(),t()})}function ar(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function M0(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,u;const a=zg();a.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let o;try{o=await h.getInvitation(e)}catch(f){f&&f.status===404?(hd(),yd(a)):yd(a,f&&f.message||"Something went wrong.",I0);return}if(!t){T0(a,o);const f=g=>{D0(o,()=>vd(a)),n(g)};a.querySelector("#invite-sign-in").addEventListener("click",()=>f("login")),a.querySelector("#invite-sign-up").addEventListener("click",()=>f("signup"));return}A0(a,o,t),(d=a.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=a.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async f=>{var b,y;if(l)return;l=!0,r.disabled=!0;let g;try{g=f===void 0?await h.acceptInvitation(e):await h.acceptInvitation(e,f)}catch(x){l=!1,r.disabled=!1;const _=x&&x.detail&&x.detail.error_code;if(f!==void 0&&(_==="invalid_verification_code"||_==="invitation_code_expired"||x&&x.status===429)){ar(a,x&&x.message||"That code did not work."),(y=(b=a.querySelector("#invite-admin-code"))==null?void 0:b.select)==null||y.call(b);return}x&&x.status===401?s():x&&(x.status===404||x.status===400)?(hd(),yd(a)):x&&x.status===403&&x.detail&&x.detail.error_code==="email_unverified"?(ar(a,"Verify your email address to continue."),a.querySelector("#invite-accept-actions").classList.add("hidden"),a.querySelector("#invite-verify").classList.remove("hidden")):x&&x.status===403?ar(a,`This invitation is for a different email address. Only ${o.email_hint} can accept it.`):ar(a,x&&x.message||"Something went wrong");return}hd(),Wg(a,o);try{await i(g.team_id,o.team_name)}catch(x){console.error("Joined the team but could not open it:",x),vd(a),Wg(a,o)}};r.addEventListener("click",()=>c()),(u=a.querySelector("#invite-admin-code-form"))==null||u.addEventListener("submit",f=>{f.preventDefault();const g=a.querySelector("#invite-admin-code").value.trim();g&&c(g)}),B0(a,{onVerified:()=>{a.querySelector("#invite-verify").classList.add("hidden"),a.querySelector("#invite-error").classList.add("hidden"),a.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function Wg(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${p(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${p(t.team_name)}</a>
            </div>
        </div>`}function wd(e){return M0(e,{user:ue(),showAuth:t=>{la(),t==="signup"?Xg():Zg()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),E0(),await Kn({teamId:t}),$(`You joined ${n}`,"success")},signOut:()=>{h.logout(),Tt(null),ti(null),wd(e)}})}async function Kg(){const e=Fg();if(e){await wd(e);return}if(Gg(window.location.pathname)){Vg();return}la()}async function Kn({teamId:e,teamsRequest:t=null,snapshot:n=null}={}){var r,l;const i=a0(window.location.pathname);if(i){await b0(i);return}const s=Fg();if(s){await wd(s);return}if(Gg(window.location.pathname)){Vg();return}F0(),ag(),or(),N0();const a=!e&&((l=(r=n==null?void 0:n.teams)==null?void 0:r.find)==null?void 0:l.call(r,c=>c.id===n.teamId));if(a){await j0(n,a,t);return}await Jo(t);const o=od();if(o.length===0&&!Zx()){Mg();return}o.length===0&&Cn("my-issues");try{if(o.length>0){const c=e&&o.find(d=>d.id===e)||o[0];await er(c,!0)}}finally{lg()}}async function j0(e,t,n){yg(e.teams);try{await er(t,!0,{seed:e})}finally{lg()}Promise.resolve(n||Jo().then(od)).then(async i=>{var a;if(!Array.isArray(i))return;yg(i);const s=i.find(o=>o.id===t.id);if(!s){await P0(),window.location.reload();return}if(((a=C())==null?void 0:a.id)===s.id&&s.name!==C().name){ti(s);const o=document.getElementById("current-team-name");o&&(o.textContent=s.name)}},i=>console.error("Failed to refresh teams:",i))}const R0=2e3;let qi=null,Yg=!1,Qg=!1;function P0(){return Qg=!0,clearTimeout(qi),qi=null,ml()}function $d(){if(clearTimeout(qi),qi=null,Qg)return Promise.resolve();const e=ue(),t=C();return!(e!=null&&e.id)||!(t!=null&&t.id)||tp(cl())!==e.id||Ax()!==t.id?Promise.resolve():Wb(e.id,{user:e,teams:od(),teamId:t.id,projects:se(),labels:vl(),members:kt(),agents:ft(),issues:xy({maxQueries:3})})}function q0(){clearTimeout(qi),qi=setTimeout($d,R0)}function N0(){Yg||(Yg=!0,yy(q0),document.addEventListener("visibilitychange",O0),window.addEventListener("pagehide",H0))}function O0(){document.visibilityState==="hidden"&&$d()}function H0(){$d()}let Ni=null,oa=null,_t=null,Et=null;function ra(){Ni||(Ni=document.getElementById("auth-screen"),oa=document.getElementById("main-screen"),_t=document.getElementById("login-form"),Et=document.getElementById("signup-form"))}function la(){ra(),Ni&&Ni.classList.remove("hidden"),oa&&oa.classList.add("hidden")}function F0(){ra(),Ni&&Ni.classList.add("hidden"),oa&&oa.classList.remove("hidden")}function Zg(){ra(),_t&&_t.classList.remove("hidden"),Et&&Et.classList.add("hidden")}function Xg(){ra(),_t&&_t.classList.add("hidden"),Et&&Et.classList.remove("hidden")}async function U0(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),Tt(await h.getMe()),await Kn(),$("Welcome back!","success")}catch(i){k("log in",i)}return!1}async function G0(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await h.signup(t,n,i),await h.login(n,i),Tt(await h.getMe()),await Kn(),$("Account created successfully!","success")}catch(s){k("sign up",s)}return!1}function Jg(){h.logout(),Tt(null),ti(null),la(),$("Signed out","success")}function z0(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||/^\/api\/avatars\/[0-9a-f]{64}$/.test(e))}function or(){var i;const e=ue();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",op(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?z0(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${m(s)}" alt="${m(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function V0(){ra();const e=_t==null?void 0:_t.querySelector("form");e&&e.addEventListener("submit",s=>U0(s));const t=Et==null?void 0:Et.querySelector("form");t&&t.addEventListener("submit",s=>G0(s));const n=_t==null?void 0:_t.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),Xg()});const i=Et==null?void 0:Et.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),Zg()})}let kd=[];async function _d(){try{kd=await h.getApiKeys(),W0()}catch(e){k("load API keys",e)}}function W0(){const e=document.getElementById("api-keys-list");if(e){if(kd.length===0){e.innerHTML=K({icon:z.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=kd.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${p(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${p(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Se(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Se(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${m(t.id)}" data-key-name="${m(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function K0(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,G()}async function Y0(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);F(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,G()}catch(n){k("create API key",n)}return!1}async function Q0(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),$("API key copied to clipboard","success")}catch{$("Failed to copy","error")}}async function Z0(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),$("API key revoked","success"),await _d()}catch(n){k("revoke API key",n)}}oe({"create-api-key":e=>{Y0(e)},"copy-api-key":()=>{Q0()},"dismiss-api-key-modal":()=>{F(),_d()},"revoke-api-key":(e,t)=>{Z0(t.keyId,t.keyName)}});let Ed=[];async function eh(){try{Ed=await h.getConnections(),J0()}catch(e){k("load connected apps",e)}}function xd(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function X0(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function J0(){const e=document.getElementById("connected-apps-list");if(e){if(Ed.length===0){e.innerHTML=K({icon:z.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=Ed.map(t=>t.acts_as==="person"?eS(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${p(xd(t))} ${ir(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${p(t.agent?t.agent.name:"an agent")}</span>
                    <span>${p(X0(t))}</span>
                    <span>policy ${p(t.policy)}</span>
                    <span class="api-key-date">Connected ${Se(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Se(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${p(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(t.id)}" data-connection-name="${m(xd(t))}">Disconnect</button>
        </div>
    `).join("")}}function eS(e){const n=`${e.device_name||"A device"} · ${xd(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${p(n)} ${ir(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${Se(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${Se(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(e.id)}" data-connection-name="${m(n)}">Sign out</button>
        </div>
    `}async function th(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await h.revokeConnection(e),$("App disconnected","success"),await eh()}catch(n){k("disconnect app",n)}}oe({"revoke-connection":(e,t)=>{th(t.connectionId,t.connectionName)}});let Sd=[];async function nh(){try{Sd=await h.getPushDevices(),tS()}catch(e){k("load push devices",e)}}const ih={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function sh(e){return e.label||e.platform||"Unnamed device"}function tS(){const e=document.getElementById("push-devices-list");if(e){if(Sd.length===0){e.innerHTML=K({icon:z.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=Sd.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${p(sh(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${p(t.platform)}</span>`:""}
                    <span>via ${p(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${Se(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${Se(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${p(String(t.failure_count))} failed deliveries</span>`:""}
                    ${ih[t.status]?`<span class="push-device-status">${p(ih[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${m(t.installation_id)}" data-device-name="${m(sh(t))}">Remove</button>
        </div>
    `).join("")}}async function nS(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await h.deletePushDevice(e),$("Device removed","success"),await nh()}catch(n){k("remove push device",n)}}oe({"remove-push-device":(e,t)=>{nS(t.installationId,t.deviceName)}});let rr=!1,en=0,wn=[],lr=[];function iS(e){lr=e,wn=[...e]}function $n(){return rr}function sS(){if(rr)return;rr=!0,en=0,wn=[...lr];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&cr()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>aS(n.target.value)),t.addEventListener("keydown",rS),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&oS(Number(i.dataset.commandIndex))}),ca(),requestAnimationFrame(()=>t.focus())}function cr(){rr=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function aS(e){const t=e.toLowerCase().trim();t?wn=lr.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):wn=[...lr],en=0,ca()}function ca(){const e=document.getElementById("command-results");if(!e)return;if(wn.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};wn.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===en?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function oS(e){en=e,ca()}function ah(e){const t=wn[e];t&&(cr(),t.action())}function rS(e){switch(e.key){case"ArrowDown":e.preventDefault(),en=Math.min(en+1,wn.length-1),ca();break;case"ArrowUp":e.preventDefault(),en=Math.max(en-1,0),ca();break;case"Enter":e.preventDefault(),ah(en);break;case"Escape":e.preventDefault(),cr();break}}oe({"execute-command":(e,t)=>{ah(Number(t.commandIndex))}});const lS=[{title:"Navigation",shortcuts:[{key:"m",description:"Home"},{key:"i",description:"Issues"},{key:"b",description:"Issues as a board"},{key:"p",description:"Switch project"},{key:"g p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals (in Project settings)"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"People"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function cS(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${p(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${p(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function dS(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${p(e.title)}</h4>
        ${e.shortcuts.map(cS).join("")}
    </div>`}function oh(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${lS.map(dS).join("")}
        </div>
    `,G()}const dr=100,Id="status!=done,canceled",uS=["created","updated","priority","status","title","estimate"];function Ie(e){return e==null?"":p(String(e))}function rh(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${m(t)}">${Ie(n)}</a>`}function lh(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const Ld=[{id:"identifier",label:"ID",fixed:!0,render:e=>rh(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>rh(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>Ie(Le(e.status))},{id:"priority",label:"Priority",render:e=>Ie(Te(e.priority))},{id:"type",label:"Type",render:e=>Ie(ct(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>Ie(lh(e,"assignee"))},{id:"creator",label:"Creator",render:e=>Ie(lh(e,"creator"))},{id:"project",label:"Project",render:e=>Ie(e.project_key)},{id:"sprint",label:"Sprint",render:e=>Ie(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=re(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${Ie(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>Ie(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${m(e.parent_id)}">${Ie(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>Ie(Se(e.created_at))},{id:"updated",label:"Updated",render:e=>Ie(Se(e.updated_at))},{id:"completed",label:"Completed",render:e=>Ie(Se(e.completed_at))},{id:"due",label:"Due",render:e=>Ie(Se(e.due_date))}],ur=Object.fromEntries(Ld.map(e=>[e.id,e])),pS=Ld.filter(e=>e.fixed).map(e=>e.id),Td=["identifier","title","status","priority","assignee","updated"];function Ad(e){const t=new Set,n=[];for(const s of e||[]){const a=String(s).trim();!ur[a]||t.has(a)||(t.add(a),n.push(a))}return n.length===0?[...Td]:[...pS.filter(s=>!t.has(s)),...n]}function mS(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function fS(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?Ad(t.get("cols").split(",")):[...Td],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function gS(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!mS(e.cols,Td)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function hS(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function vS({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=dr,skip:a=0}){const o=["chaotic","issue","list"];let r=e||"",l=null;n||i?(o.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",o.push("--where",hS(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],u=d.startsWith("-"),f=d.replace(/^[-+]/,"");let g=null;uS.includes(f)?(o.push("--sort",f,"--order",u?"desc":"asc"),c.length>1&&(g=`The CLI sorts by one field; only "${d}" was copied.`)):g=`The CLI cannot sort by "${f}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return o.push("--limit",String(s)),a>0&&o.push("--skip",String(a)),{command:o.join(" "),warning:l}}function bS(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function yS(e,t){const n=Ad(t).map(a=>ur[a]),i=n.map(a=>`<th data-col="${m(a.id)}">${Ie(a.label)}</th>`).join(""),s=e.map(a=>`<tr class="query-row" data-issue-id="${m(a.id)}">${n.map(o=>`<td class="query-col-${m(o.id)}">${o.render(a)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function wS(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,a=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${a?"":" disabled"}>Next</button>`}let N=null,Cd=null,st=null,Bd=0,Oi=!1,ch=!1;function fe(e){return document.getElementById(e)}function dh(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function uh(e){const t=gS({...Cd,cols:N.cols,group:N.group,view:N.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function Dd(){N&&Uo(N.teamScope?null:N.projectId)}function $S(){N&&(!N.teamScope&&N.projectId!==X()?bt(N.projectId):Dd())}function kS(){const e=fe("query-columns-menu");e&&(e.innerHTML=Ld.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${m(t.id)}"${N.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${Ie(t.label)}
        </label>`).join(""))}function pr(e){const t=fe("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${Ie(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function ph(e){const t=fe("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function Md(e){var t;(t=fe("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function da(){const e=fe("query-results"),t=fe("query-pager");if(!e)return;if(!st){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=st;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=yS(n,N.cols),t&&(t.innerHTML=wS(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(a=>{a.dataset.enabled=String(!a.disabled)}),Oi&&Md(!0))}async function mr(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!N)return;const i=C(),s=N.teamScope?{teamId:i==null?void 0:i.id}:{projectId:N.projectId};if(!s.teamId&&!s.projectId){st=null,da(),pr(N.teamScope?"Select a team first.":"Select a project.");return}const a=++Bd,o=N.where===null?Id:N.where,r=fe("query-results");Oi=!0,r&&r.classList.add("loading"),Md(!0);const l=()=>a===Bd&&A()==="query";try{const c=await h.queryIssues({...s,where:o,order:N.order,skip:(N.page-1)*dr,limit:dr});if(!l())return;N.where=c.where,N.order=c.order||null,Cd=dh(N),st={issues:c.issues||[],total:c.total,skip:c.skip};const d=fe("query-where");d&&d.value.trim()===o.trim()&&(d.value=c.where),pr(null),Oi=!1,da(),uh(e),t&&t()}catch(c){if(!l())return;Oi=!1,n?n():st=null,da(),pr(bS(c))}finally{a===Bd&&(Oi=!1,r&&r.classList.remove("loading"),Md(!1))}}function mh(){if(!N)return;const e=fe("query-where");return N.where=e?e.value.trim():"",N.page=1,mr("push")}function _S(e){if(!N)return;const t={teamScope:N.teamScope,projectId:N.projectId,page:N.page};return N.teamScope=!e,e&&(N.projectId=e),N.page=1,ph(null),mr("push",{onSuccess:()=>{e?bt(e):Ff(),Dd()},onFailure:()=>{Object.assign(N,t),Dd()}})}function ES(e,t){if(!N||!ur[e]||ur[e].fixed)return;const n=N.cols.filter(i=>i!==e);N.cols=Ad(t?[...n,e]:n),da(),uh("replace")}function xS(e){if(!N||!st||Oi)return;const t=N.page+e;if(t<1||e>0&&st.skip+st.issues.length>=st.total)return;const n={page:N.page,result:st};return N.page=t,mr("push",{onFailure:()=>{N.page=n.page,st=n.result}})}async function SS(){if(!N)return null;const e=fe("query-where"),t=e?e.value.trim():N.where??Id,n=N.teamScope?null:se().find(o=>o.id===N.projectId),{command:i,warning:s}=vS({where:t,order:N.order,teamScope:N.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:dr,skip:st?st.skip:0}),a=fe("query-cli-preview");try{await navigator.clipboard.writeText(i),$(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),a&&a.classList.add("hidden")}catch{a&&(a.textContent=i,a.classList.remove("hidden")),$("Could not copy; the command is shown below the box","warning")}return i}function IS(){var e,t,n,i,s,a;ch||(ch=!0,(e=fe("query-where"))==null||e.addEventListener("keydown",o=>{o.key==="Enter"&&!o.shiftKey&&!o.isComposing&&(o.preventDefault(),mh())}),(t=fe("query-run-btn"))==null||t.addEventListener("click",()=>mh()),(n=fe("query-copy-cli-btn"))==null||n.addEventListener("click",()=>SS()),(i=fe("query-columns-btn"))==null||i.addEventListener("click",o=>{o.stopPropagation();const r=fe("query-columns-menu");if(!r)return;const l=r.classList.toggle("hidden")===!1;o.currentTarget.setAttribute("aria-expanded",String(l))}),(s=fe("query-columns-menu"))==null||s.addEventListener("change",o=>{o.target.matches('input[type="checkbox"]')&&ES(o.target.value,o.target.checked)}),(a=fe("query-pager"))==null||a.addEventListener("click",o=>{const r=o.target.closest("button[data-query-page]");!r||r.disabled||xS(Number(r.dataset.queryPage))}),document.addEventListener("click",o=>{var l;const r=fe("query-columns-menu");r&&!r.classList.contains("hidden")&&!o.target.closest("#query-columns-picker")&&(r.classList.add("hidden"),(l=fe("query-columns-btn"))==null||l.setAttribute("aria-expanded","false"))}))}function LS(){var s,a;IS();const e=fS(window.location.search),t=se();let n=null;if(!e.teamScope){const o=r=>r&&t.some(l=>l.id===r);if(!o(e.projectId)){const r=e.projectId;e.projectId=o(X())?X():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}N=e,Cd=dh(N),st=null;const i=fe("query-where");return i&&(i.value=N.where===null?Id:N.where),(s=fe("query-cli-preview"))==null||s.classList.add("hidden"),(a=fe("query-columns-menu"))==null||a.classList.add("hidden"),$S(),kS(),pr(null),ph(n),da(),mr("replace")}let fr=[];function TS(){return fr}dt(e=>{e==="currentProject"&&A()==="epics"&&kn()});let jd=0;const ua=new Set(["done","canceled"]);let gr=!1;async function kn({fromMemory:e=!1}={}){var a;bl(-1);const t=document.getElementById("epics-list");if(!t)return;const n=++jd,i=ic(),s=e?bo("epics",i):void 0;s?fh(s,t):t.innerHTML=Array(4).fill(0).map(()=>`
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
        `).join("");try{if(!((a=C())!=null&&a.id)){fr=[],t.innerHTML=K({icon:z.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const o=X(),r=o?await h.getProjectEpicProgress(o):await h.getTeamEpicProgress(C().id);if(n!==jd||(wi("epics",i,r),s&&yo(s,r)))return;fh(r,t)}catch(o){if(n!==jd)return;t.innerHTML=K({icon:z.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),k("load epics",o)}}function fh(e,t){var i;const n=((e==null?void 0:e.untracked)||[]).some(s=>(s.awaiting_human||[]).length);if(!((i=e==null?void 0:e.epics)!=null&&i.length)&&!n){fr=[],t.innerHTML=K({icon:z.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}vh(e,t)}function Rd(e,t){return`${e} ${t}${e===1?"":"s"}`}function AS(e,t){return t<=0?"-":e>=t?"100%":`${Math.floor(e/t*100)}%`}function pa(e){const t=e.children||{};return(t.total||0)-(t.canceled||0)}function Nt(e){const t=e?new Date(e).getTime():NaN;return Number.isNaN(t)?0:t}function hr(e){const t=et(e);return t?/ago$|^just now$|future/.test(t)?t:`on ${t}`:""}function gh(e){const t=e.children||{},n=pa(e);if(n<=0)return'<span class="meter-label">No tickets</span>';const i=t.done||0,s=`${AS(i,n)} done: ${i} done, ${(t.in_progress||0)+(t.in_review||0)} in progress, ${(t.todo||0)+(t.backlog||0)} not started`+(t.canceled?`, ${t.canceled} canceled`:"");return`
        <div class="meter" title="${m(s)}"><div class="meter-fill" style="width: ${Math.round(i/n*100)}%"></div></div>
        <span class="meter-label">${i} of ${n}</span>`}function CS(e){if(!e||e.length===0)return'<span class="epic-sprint-strip" aria-hidden="true"></span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint, oldest first">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,a=`${i.name}${i.status==="active"?" (current)":""}: ${Rd(i.closed||0,"ticket")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${m(a)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}function BS(e){const t=e.in_flight||[],n=t.slice(0,2).map(s=>`${s.assignee?`<b>${p(s.assignee.name)}</b>`:"Unassigned"} on ${p(s.title)}`),i=(e.in_flight_count||t.length)-n.length;return i>0&&n.push(`+${i} more`),n.join(", ")}function hh(e,t="shipped"){const n=e.last_shipped;return n?`${t} ${p(n.title)} ${p(hr(n.completed_at))}`:""}function vr(e,{sub:t,right:n,grouped:i}){const s=e.status_pinned&&!ua.has(e.status)?' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its tickets">✎<span class="sr-only"> (status set by hand)</span></span>':"",a=e.status==="canceled"?' <span class="epic-canceled-tag">Canceled</span>':"",o=i?`<span class="epic-project-key">${p(e.project_key)}</span> `:"",r=e.owner?` <span class="epic-owner">· ${p(e.owner.name)}</span>`:"",l=pa(e)<=0;return`
        <div class="list-row-2line epic-row${ua.has(e.status)?" epic-row-closed":""}${l?" epic-row-empty":""}" data-identifier="${m(e.identifier)}" title="${m(e.identifier)}">
            <span class="epic-spark">${CS(e.sprints)}</span>
            <span class="list-row-title">${o}${p(e.title)}${r}${s}${a}</span>
            <span class="list-row-sub">${t}</span>
            <span class="list-row-right">${n}</span>
        </div>`}function br(e,t,n,i,s=""){return i?`
        <section class="epic-section epic-section-${e}">
            <div class="section-header"><h3>${t} <span class="section-count">${n}</span></h3></div>
            <div class="epic-section-rows">${i}</div>
            ${s}
        </section>`:""}function Pd(e){return!ua.has(e.status)&&pa(e)>0&&(e.open_children||0)===0}const qd=5;function vh(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=new Set([...n.map(E=>E.project_key),...i.map(E=>E.project_key)]).size>1,a=(E,w)=>s?`${p(E)} · ${w}`:w,o=n.filter(E=>!ua.has(E.status)),r=o.filter(Pd),l=o.filter(E=>!Pd(E)&&(E.in_flight_count||0)>0).sort((E,w)=>Nt(w.last_activity_at)-Nt(E.last_activity_at)),c=o.filter(E=>!Pd(E)&&!E.in_flight_count).sort((E,w)=>{var D,H;return(pa(E)<=0)-(pa(w)<=0)||Nt((D=w.last_shipped)==null?void 0:D.completed_at)-Nt((H=E.last_shipped)==null?void 0:H.completed_at)||Nt(w.last_activity_at)-Nt(E.last_activity_at)}),d=n.filter(E=>ua.has(E.status)).sort((E,w)=>Nt(w.completed_at||w.last_activity_at)-Nt(E.completed_at||E.last_activity_at)),u=gr?d:d.slice(0,qd),f=[...n.flatMap(E=>(E.awaiting_human||[]).map(w=>({a:w,where:a(E.project_key,p(E.title))}))),...i.flatMap(E=>(E.awaiting_human||[]).map(w=>({a:w,where:a(E.project_key,"No epic")})))].sort((E,w)=>Nt(E.a.since)-Nt(w.a.since)),g=f.map(({a:E,where:w})=>{const D=E.approval_mode==="review",H=E.requested_by_name?` by ${p(E.requested_by_name)}`:"";return`
        <div class="list-row-2line epic-ask-row" data-issue-identifier="${m(E.identifier)}" title="${m(E.identifier)}">
            <span class="epic-spark" aria-hidden="true"></span>
            <span class="list-row-title">${D?"Approve":"Complete"} ${p(E.ritual_name)}: ${p(E.title)}</span>
            <span class="list-row-sub">${w} · ${D?"attested":"requested"}${H} ${p(hr(E.since))}</span>
            <span class="list-row-right"><span class="list-row-action">${D?"Approve":"Complete"}</span></span>
        </div>`}).join(""),b=r.map(E=>vr(E,{grouped:s,sub:`Every ticket is done${E.last_shipped?` · last shipped ${p(hr(E.last_shipped.completed_at))}`:""}`,right:'<span class="list-row-action">Open epic</span>'})).join(""),y=l.map(E=>vr(E,{grouped:s,sub:[BS(E),hh(E)].filter(Boolean).join(" · "),right:gh(E)})).join(""),x=c.map(E=>{const w=E.children||{},D=w.todo?`${w.todo} ready to start`:w.backlog?`${w.backlog} in backlog`:"",H=E.last_shipped?hh(E,"Last shipped"):"Nothing shipped yet";return vr(E,{grouped:s,sub:[H,D].filter(Boolean).join(" · "),right:gh(E)})}).join(""),_=u.map(E=>{var w;return vr(E,{grouped:s,sub:E.completed_at?`Closed ${p(hr(E.completed_at))}`:"Closed",right:`<span class="meter-label">${Rd(((w=E.children)==null?void 0:w.done)||0,"ticket")}</span>`})}).join(""),L=d.length>qd?`<button class="btn btn-secondary btn-small epic-closed-toggle" data-epics-toggle-closed>${gr?`Show the latest ${qd}`:`Show all ${d.length}`}</button>`:"",T=i.filter(E=>E.open),j=T.length?`<p class="epic-untracked-note">${T.map(E=>`${s?`${p(E.project_key)}: `:""}${Rd(E.open,"open ticket")}`).join(", ")} under no epic.</p>`:"";fr=[...r,...l,...c,...d],t.innerHTML=`
        <div class="epic-sections">
            ${br("waiting","Waiting on you",f.length+r.length,g+b)}
            ${br("moving","Moving now",l.length,y)}
            ${br("quiet","Nothing in flight",c.length,x)}
            ${br("shipped","Shipped",d.length,_,L?`<div class="epic-table-footer">${L}</div>`:"")}
            ${j}
        </div>
    `,t._epicProgress=e,t._epicClickHandler||(t._epicClickHandler=E=>{if(E.target.closest("[data-epics-toggle-closed]")){gr=!gr,bl(-1),vh(t._epicProgress,t);return}const w=E.target.closest(".epic-ask-row");if(w&&w.dataset.issueIdentifier){Ko(w.dataset.issueIdentifier);return}const D=E.target.closest(".epic-row");D&&D.dataset.identifier&&og(D.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function DS(){const e=X(),t=se().map(n=>`
        <option value="${m(n.id)}" ${n.id===e?"selected":""}>${p(n.name)}</option>
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
    `,G(),document.getElementById("create-epic-form").addEventListener("submit",MS),document.getElementById("create-epic-title").focus()}async function MS(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}try{const s=await h.createIssue(t,{title:n,description:i||null,issue_type:"epic"});F(),$(`Created epic ${s.identifier}`,"success"),kn()}catch(s){k("create epic",s)}}async function bh(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){ce(t.id,!1);return}await yr(t.id,!1)}else O("epics",!1)}catch{O("epics",!1)}}async function yr(e,t=!0){var n;try{t&&bn();const[i,s,a,o]=await Promise.all([h.getIssue(e),h.getSubIssues(e),h.getActivities(e),h.getComments(e)]);if(i.issue_type!=="epic"){ce(e,t);return}t&&history.pushState({epicId:e,view:A()},"",`/epic/${i.identifier}`),document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const r=document.getElementById("epic-detail-view");r.classList.remove("hidden");const l=A()||"epics",c=se().find(w=>w.id===i.project_id),d=i.assignee_id?wt(i.assignee_id):null,u=d?ut(d):null,f=TS(),g=(n=f.find(w=>w.id===i.id))==null?void 0:n.children,b=g?(g.total||0)-(g.canceled||0):s.filter(w=>w.status!=="canceled").length,y=g?g.done||0:s.filter(w=>w.status==="done").length,x=b>0?Math.round(y/b*100):0,_=f.findIndex(w=>w.id===i.id),L=_>0?f[_-1]:null,T=_>=0&&_<f.length-1?f[_+1]:null,j=_>=0;r.querySelector("#epic-detail-content").innerHTML=`
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
                            <span class="issue-nav-counter">${_+1} / ${f.length}</span>
                            <button class="issue-nav-btn" ${T?`data-action="navigate-epic" data-epic-id="${m(T.id)}"`:"disabled"} title="Next epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${c?p(c.name):"Project"} › ${p(i.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${p(i.title)}</h1>

                    ${i.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${On(i.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${x===100?" epic-progress-complete":""}" style="width: ${x}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${y} of ${b} done</span>
                                <span>${x}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?K({icon:z.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(w=>{const D=w.assignee_id?wt(w.assignee_id):null,H=D?ut(D):null;return`
                                <div class="sub-issue-item" data-issue-id="${m(w.id)}" data-identifier="${m(w.identifier)}">
                                    <span class="sub-issue-status">${Xe(w.status)}</span>
                                    <span class="sub-issue-id">${p(w.identifier)}</span>
                                    <span class="sub-issue-title">${p(w.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(w.status||"backlog").replace(/_/g,"-")}">${Le(w.status)}</span>
                                    ${H?`<span class="sub-issue-assignee">${p(H)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${a.length===0?K({icon:z.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):a.map(w=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${yf(w.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${xc(w)}</span>
                                        <span class="activity-actor">by ${p(_c(w))}</span>
                                        <span class="activity-time">${et(w.created_at)}</span>
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
                                            <span class="comment-author">${p(w.author_name||"User")}</span>
                                            <span class="comment-date">${et(w.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${ri(w.content||"")}</div>
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
                                ${mt(i.priority)}
                                ${Te(i.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${u?p(u):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${vn(i.estimate,i.project_id)}
                            </span>
                        </div>

                        ${i.labels&&i.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${i.labels.map(w=>`
                                    <span class="issue-label" style="background: ${re(w.color)}20; color: ${re(w.color)}">${p(w.name)}</span>
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
                            <span class="property-value-static">${new Date(i.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const E=r.querySelector(".sub-issues-list");E&&E.addEventListener("click",w=>{const D=w.target.closest(".sub-issue-item");D&&D.dataset.issueId&&ce(D.dataset.issueId)})}catch(i){k("load epic",i)}}oe({"navigate-epic":(e,t)=>{yr(t.epicId)},"epic-follow-children":async(e,t)=>{try{await h.updateIssue(t.epicId,{status_follows_children:!0}),$("Status now follows sub-issues"),await yr(t.epicId,!1)}catch(n){k("update epic",n)}}});function jS(e){let t=!1,n=null;return function(s){var o,r,l,c,d,u,f,g;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(Dn(s.target)){s.key==="Escape"&&!s.defaultPrevented&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("people");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((u=e.isDetailViewActive)!=null&&u.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((f=e.isDetailViewActive)!=null&&f.call(e))break;s.preventDefault(),(g=e.openProjectSwitcher)!=null&&g.call(e)||e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function RS(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function tn(e,t,n=Ga){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function yh(){const e=document.querySelector(".main-content");e&&(e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1"),e.focus({preventScroll:!0}))}function ma(e){var n,i;return(i=(n=e.target).closest)!=null&&i.call(n,".sidebar-nav")?!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.key==="j"||e.key==="k")?(yh(),!1):!0:!1}function PS(e){const t=Ga;function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const l=n(a);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,o,c,d)}return function(a){var l,c,d,u,f;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||Dn(a.target)||ma(a)||(a.key==="Enter"||a.key===" ")&&((d=(c=a.target).closest)!=null&&d.call(c,".issue-group-header"))||e.isModalOpen()||e.isCommandPaletteOpen()||(u=e.isInlineDropdownOpen)!=null&&u.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(a.key)&&((f=e.beforeNavigate)==null||f.call(e));const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),tn(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),tn(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function qS(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||Dn(i.target)||ma(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),tn(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),tn(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function _n(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function NS(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,u,f;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||Dn(i.target)||ma(i)||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex(),o=g=>{var y,x,_,L;const b=!!((x=(y=document.activeElement)==null?void 0:y.closest)!=null&&x.call(y,"#inbox-list"));if((_=e.collapseInboxExpand)==null||_.call(e),tn(a+g,e.setSelectedIndex,t),b){const T=document.querySelector(`${t}.keyboard-selected`);(L=(T==null?void 0:T.querySelector(".inbox-row-toggle"))||T)==null||L.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),o(1);break;case"k":case"ArrowUp":i.preventDefault(),o(-1);break;case"Enter":if((d=(c=i.target).closest)!=null&&d.call(c,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;a>=0&&s[a]&&(i.preventDefault(),e.toggleInboxExpand(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":if((u=e.isEscapeLayerAbove)!=null&&u.call(e))break;if((f=e.collapseInboxExpand)!=null&&f.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}a>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function OS(e){const t="#kanban-board .kanban-card";return function(i){var o;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||Dn(i.target)||ma(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),tn(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),tn(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.id;r&&e.viewIssue(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function HS(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function Nd(e){const{view:t,selector:n,open:i}=e;return function(a){var l,c,d,u;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||Dn(a.target)||ma(a)||e.isModalOpen()||e.isCommandPaletteOpen()||(c=e.isInlineDropdownOpen)!=null&&c.call(e))return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),tn(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),tn(r-1,e.setSelectedIndex,n);break;case"Enter":if((u=(d=a.target).closest)!=null&&u.call(d,'button, a[href], [role="button"]'))break;r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(f=>f.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const FS=7,Od=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value"),wh=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex"),US='<svg class="picker-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',GS='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';let $h=!1;function zS(){$h||($h=!0,Object.defineProperty(HTMLSelectElement.prototype,"value",{...Od,set(e){var t;Od.set.call(this,e),(t=this._picker)==null||t.sync()}}),Object.defineProperty(HTMLSelectElement.prototype,"selectedIndex",{...wh,set(e){var t;wh.set.call(this,e),(t=this._picker)==null||t.sync()}}))}let we=null,VS=0;function kh({restoreFocus:e=!0}={}){return we?(we.close(e),!0):!1}function WS(e,{returnFocus:t=!1}={}){var i;const n=(i=e==null?void 0:e._picker)==null?void 0:i.button;if(!n||n.disabled||!n.isConnected||typeof n.checkVisibility=="function"&&!n.checkVisibility({visibilityProperty:!0}))return!1;if((we==null?void 0:we.select)!==e){const s=document.activeElement;Hd(e,n,t?s&&s!==document.body?s:null:void 0)}return!0}function KS(e=document){e.querySelectorAll("select[data-picker]").forEach(YS)}function YS(e){var i;if(!e||e._picker)return((i=e==null?void 0:e._picker)==null?void 0:i.button)||null;const t=document.createElement("button");t.type="button",t.className="picker-btn",t.setAttribute("aria-haspopup","listbox"),t.setAttribute("aria-expanded","false"),e.id&&(t.dataset.pickerFor=e.id),t.innerHTML=`<span class="picker-label"></span>${US}`,e.classList.add("picker-native"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,e.insertAdjacentElement("afterend",t);const n=()=>{_h(e,t),(we==null?void 0:we.select)===e&&we.refresh()};return e._picker={button:t,sync:n},zS(),e.addEventListener("change",n),typeof MutationObserver<"u"&&new MutationObserver(n).observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["disabled","selected","hidden"]}),t.addEventListener("click",s=>{s.preventDefault(),(we==null?void 0:we.select)===e?kh():Hd(e,t)}),t.addEventListener("keydown",s=>{s.metaKey||s.ctrlKey||s.altKey||(["ArrowDown","ArrowUp","Enter"," "].includes(s.key)?(s.preventDefault(),s.stopPropagation(),(we==null?void 0:we.select)!==e&&Hd(e,t)):s.key.length===1&&e.dataset.pickerKeys!=="pass"&&s.stopPropagation())}),n(),t}function _h(e,t){const n=e.options[e.selectedIndex],i=n?n.textContent.trim():"",s=(n==null?void 0:n.dataset.hint)||"",a=t.querySelector(".picker-label");a.textContent=i,s&&a.insertAdjacentHTML("afterbegin",`<span class="picker-label-hint">${p(s)}</span>`),t.disabled=e.disabled,t.title=i;const o=e.getAttribute("aria-label");o&&t.setAttribute("aria-label",i?`${o}: ${i}`:o)}function Eh(e){return[...e.options].filter(t=>!t.hidden).map(t=>({value:t.value,text:t.textContent.trim(),hint:t.dataset.hint||"",disabled:t.disabled}))}function Hd(e,t,n){kh({restoreFocus:!1});const i=Eh(e),s=`picker-list-${++VS}`,a=i.length>=FS,o=e.getAttribute("aria-label")||"Options",r=document.createElement("div");r.className="picker-popover",r.tabIndex=-1,r.innerHTML=`
        ${a?`<input type="text" class="picker-search" placeholder="Filter…" aria-label="Filter ${m(o)}"
            role="combobox" aria-expanded="true" aria-controls="${s}" aria-autocomplete="list" autocomplete="off" spellcheck="false">`:""}
        <ul class="picker-list" role="listbox" id="${s}" tabindex="-1" aria-label="${m(o)}"></ul>
    `,document.body.appendChild(r);const l=r.querySelector(".picker-list"),c=r.querySelector(".picker-search"),d=S=>Math.max(0,S.findIndex(M=>!M.disabled));let u=i.findIndex(S=>S.value===e.value&&!S.disabled);u===-1&&(u=d(i));let f=i;const g=()=>{var M;l.innerHTML=f.length?f.map((P,Z)=>`
                <li role="option" id="${s}-${Z}" class="picker-option${Z===u?" active":""}${P.disabled?" disabled":""}"
                    data-index="${Z}" data-value="${m(P.value)}"
                    aria-selected="${P.value===e.value?"true":"false"}"${P.disabled?' aria-disabled="true"':""}>
                    <span class="picker-option-text">${p(P.text)}</span>
                    ${P.hint?`<span class="picker-option-hint">${p(P.hint)}</span>`:""}
                    ${P.value===e.value?`<span class="picker-check">${GS}</span>`:""}
                </li>`).join(""):'<li class="picker-empty" role="presentation">No matches</li>';const S=l.querySelector(".picker-option.active");S?(c||l).setAttribute("aria-activedescendant",S.id):(c||l).removeAttribute("aria-activedescendant"),(M=S==null?void 0:S.scrollIntoView)==null||M.call(S,{block:"nearest"})},b=()=>{var Sn,B;const S=t.getBoundingClientRect(),M=((Sn=window.visualViewport)==null?void 0:Sn.width)||window.innerWidth,P=((B=window.visualViewport)==null?void 0:B.height)||window.innerHeight;r.style.minWidth=`${Math.min(Math.max(S.width,220),M-16)}px`,r.style.maxHeight="",r.style.top="0px";const Z=r.offsetWidth||Math.max(S.width,220),ve=r.offsetHeight;r.style.left=`${Math.max(8,Math.min(S.left,M-Z-8))}px`;const Me=P-S.bottom-12,qe=S.top-12;if(ve>Me&&qe>Me){const U=Math.max(120,qe);r.style.maxHeight=`${U}px`,r.style.top=`${Math.max(8,S.top-4-Math.min(ve,U))}px`}else r.style.maxHeight=`${Math.max(120,Me)}px`,r.style.top=`${S.bottom+4}px`},y=S=>{if(!S||S.disabled||e.disabled)return;if(![...e.options].some(P=>P.value===S.value&&!P.disabled)){ae(!0);return}const M=S.value!==e.value;Od.set.call(e,S.value),_h(e,t),ae(!0),M&&e.dispatchEvent(new Event("change",{bubbles:!0}))},x=S=>{let M=u+S;for(;M>=0&&M<f.length&&f[M].disabled;)M+=S;M<0||M>=f.length||(u=M,g())},_=(S,M)=>{let P=S;for(;P>=0&&P<f.length&&f[P].disabled;)P+=M;P>=0&&P<f.length&&(u=P,g())},L=S=>{if(!(S.metaKey||S.ctrlKey))switch(S.stopPropagation(),S.key){case"ArrowDown":S.preventDefault(),x(1);break;case"ArrowUp":S.preventDefault(),x(-1);break;case"Home":c||(S.preventDefault(),_(0,1));break;case"End":c||(S.preventDefault(),_(f.length-1,-1));break;case"PageDown":S.preventDefault(),_(Math.min(f.length-1,u+8),-1);break;case"PageUp":S.preventDefault(),_(Math.max(0,u-8),1);break;case"Enter":S.preventDefault(),y(f[u]);break;case"Escape":S.preventDefault(),ae(!0);break;case"Tab":ae(!0);break;case" ":c||(S.preventDefault(),y(f[u]));break;default:if(!c&&S.key.length===1&&!S.metaKey&&!S.ctrlKey&&!S.altKey){T=(Date.now()-j<700?T:"")+S.key.toLowerCase(),j=Date.now();const M=f.findIndex(P=>!P.disabled&&P.text.toLowerCase().startsWith(T));M!==-1&&(u=M,g())}}};let T="",j=0;const E=()=>{const S=c.value.trim().toLowerCase();f=S?i.filter(P=>P.text.toLowerCase().includes(S)||P.hint.toLowerCase().includes(S)):i;const M=f.findIndex(P=>P.value===e.value&&!P.disabled);u=!S&&M!==-1?M:d(f),g()},w=S=>{r.contains(S.target)||t.contains(S.target)||ae(!1)},D=()=>b(),H=S=>{S.key!=="Escape"||r.contains(S.target)||(S.preventDefault(),S.stopPropagation(),ae(!0))},te=()=>ae(!1);function ae(S){var M,P;(we==null?void 0:we.popover)===r&&(we=null,r.remove(),t.setAttribute("aria-expanded","false"),t.classList.remove("open"),t.removeAttribute("aria-controls"),document.removeEventListener("pointerdown",w,!0),document.removeEventListener("keydown",H,!0),window.removeEventListener("popstate",te),window.removeEventListener("resize",D),window.removeEventListener("scroll",D,!0),S&&(n===void 0?t.focus({preventScroll:!0}):n!=null&&n.isConnected?n.focus({preventScroll:!0}):(P=(M=document.activeElement)==null?void 0:M.blur)==null||P.call(M)))}l.addEventListener("click",S=>{const M=S.target.closest(".picker-option");M&&y(f[Number(M.dataset.index)])}),l.addEventListener("mousemove",S=>{const M=S.target.closest(".picker-option");if(!M)return;const P=Number(M.dataset.index);P!==u&&(u=P,g())}),r.addEventListener("keydown",L),c&&c.addEventListener("input",E),document.addEventListener("pointerdown",w,!0),document.addEventListener("keydown",H,!0),window.addEventListener("popstate",te),window.addEventListener("resize",D),window.addEventListener("scroll",D,!0),we={select:e,button:t,popover:r,close:ae,refresh:()=>{const S=Eh(e);!(S.length===i.length&&S.every((P,Z)=>P.value===i[Z].value&&P.text===i[Z].text&&P.hint===i[Z].hint&&P.disabled===i[Z].disabled))||e.disabled?ae(!1):g()}},t.setAttribute("aria-expanded","true"),t.setAttribute("aria-controls",s),t.classList.add("open"),g(),b(),(c||l).focus({preventScroll:!0})}const QS={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>h.getDocumentRevisions(e),fetchOne:(e,t)=>h.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>h.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>h.getIssueDescriptionRevision(e,t)}};let W=null,En=0;async function xh(e,t){var a,o;const n=QS[e];if(!n){k("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++En;W=null;let s;try{s=await n.fetchList(t)}catch(r){k("load revision history",r);return}if(i===En){if(W={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},W.viewVersion!=null)try{const r=await n.fetchOne(t,W.viewVersion);if(i!==En)return;W.cache.set(W.viewVersion,r)}catch(r){i===En&&k("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),wr(),G()}}function wr(){const e=document.getElementById("modal-content");if(!e||!W)return;if(W.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=ZS(),n=W.mode==="compare"?JS():XS();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function ZS(){const e=W.revisions.map(n=>{const i=W.mode==="view"?n.version===W.viewVersion:n.version===W.compareFromVersion||n.version===W.compareToVersion,s=W.mode==="compare"?n.version===W.compareFromVersion?' <span class="rev-tag">from</span>':n.version===W.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${p(n.author_name||"Unknown")} ${Oa(n.author)}</span>
          <span class="revision-time">${et(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${W.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function XS(){const e=W.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=W.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${p(t.title)}</h3>`:"",i=t[W.adapter.bodyField]||"",s=i?`<div class="markdown-body">${$t(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${p(t.author_name||"Unknown")} &middot; ${et(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function JS(){const e=W.compareFromVersion,t=W.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=W.cache.get(e),i=W.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[W.adapter.bodyField]||"",a=i[W.adapter.bodyField]||"",o=eI(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
      <div class="revision-title-change">
        Title: <span class="diff-del">${p(n.title||"")}</span>
        &rarr; <span class="diff-add">${p(i.title||"")}</span>
      </div>
    `),`
    <div class="revision-panel-header">
      <div>
        Comparing <strong>v${e}</strong> &rarr; <strong>v${t}</strong>
      </div>
    </div>
    ${r}
    ${o}
  `}function eI(e,t){const n=e.split(`
`),i=t.split(`
`),s=tI(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${p(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${p(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${p(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function tI(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(fa(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(fa(a,"del",e[o]),o++):(fa(a,"add",t[r]),r++);for(;o<n;)fa(a,"del",e[o++]);for(;r<i;)fa(a,"add",t[r++]);return a}function fa(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function nI(e){if(!W)return;const t=W.token,n=W;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(W!==n||En!==t)return;n.cache.set(e,i)}catch(i){W===n&&En===t&&k("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),wr()}function iI(){if(!W)return;const e=W.token,t=W;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{W===t&&En===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{W!==t||En!==e||(s&&k("load revisions to compare",s),wr())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;wr()}oe({"show-document-revisions":(e,t)=>{xh("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{xh("issue",t.issueId)},"select-revision-version":(e,t)=>{nI(Number(t.version))},"toggle-revision-compare":()=>{iI()},"close-revision-viewer":()=>{W=null,F()}});function $r(e){return ft().find(t=>t.id===(e==null?void 0:e.user_id))||null}function Sh(e){if(!e)return"Team-wide";const t=se().find(n=>n.id===e);return t?`Project ${t.key}`:"One project"}function Ih(e,t=ue()){return!(e!=null&&e.is_agent)||!t||!$r(e)?!1:e.owner_id===t.id||Mi()}function Lh(e){const t=$r(e);return t?!!t.can_register:(e==null?void 0:e.kind)==="service"}function sI(e,t){var n,i;return((n=ft().find(s=>s.id===e))==null?void 0:n.name)||((i=t.find(s=>s.user_id===e))==null?void 0:i.name)}function nn(e,t){return`<dt>${p(e)}</dt><dd>${t}</dd>`}function kr(e,t){return e?`<a href="/people/${m(e)}" data-action="view-person" data-user-id="${m(e)}">${p(t||"Unknown")}</a>`:p(t||"Unknown")}function aI(e,t=[]){if(!(e!=null&&e.is_agent))return"";const n=$r(e);if(!n)return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Access</h3></div>
            <dl class="agent-access">
                ${nn("Scope","A guest from another team, with a membership here")}
                ${nn("Owner",kr(e.owner_id,e.owner_name))}
            </dl>
        </section>`;const i=(n.kind||e.kind)==="session",s=Lh(e),a=[nn("Scope",p(Sh(n.agent_project_id??e.project_id))),nn("Owner",kr(e.owner_id||n.parent_user_id,e.owner_name||n.parent_user_name))];if(n.is_active===!1&&a.push(nn("Status","Deactivated: its keys no longer sign in")),i){const f=n.registered_by_id;a.push(nn("Registered by",f?kr(f,sI(f,t)):"A registrar")),a.push(nn("Last used",n.last_used_at?p(Se(n.last_used_at)):"Never"))}else a.push(nn("Registrar",s?"Yes: registers one identity per session and cannot write as itself":"No"));if(s){const f=ft().filter(g=>g.registered_by_id===e.user_id&&g.is_active!==!1);a.push(nn("Sessions registered",f.length?f.map(g=>kr(g.id,g.name)).join(", "):"None active"))}const o=Ih(e),r=m(e.user_id),l=m(e.name||"Agent"),c=n.is_active!==!1,d=o?`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Owner actions</h3></div>
            <div class="agent-profile-actions">
                ${c&&!i?`<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${r}" data-agent-name="${l}" data-can-register="${s?"true":"false"}">${s?"Stop being a registrar":"Make registrar"}</button>`:""}
                <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${r}" data-agent-name="${l}">Delete agent</button>
            </div>
        </section>`:"",u=o?`
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
        ${u}
        ${d}
    `}let Th=0;async function _r(e){var r;if(((r=document.getElementById("agent-credentials"))==null?void 0:r.dataset.agentId)!==e)return;const t=++Th;let n,i;try{[n,i]=await Promise.all([h.getAgentKeys(e),h.getConnections().catch(()=>[])])}catch(l){n=null,console.error("Failed to load agent credentials:",l)}if(t!==Th)return;const s=document.getElementById("agent-credentials");if(!s||s.dataset.agentId!==e)return;if(s.removeAttribute("aria-busy"),n===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load its keys.</p>';return}const a=(i||[]).filter(l=>{var c;return l.acts_as!=="person"&&((c=l.agent)==null?void 0:c.id)===e}),o=n.filter(l=>l.is_active);if(!o.length&&!a.length){s.innerHTML='<p class="person-bio-empty">No active keys or connected apps.</p>';return}s.innerHTML=[...o.map(l=>`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">API key <code>${p(l.key_prefix||"")}…</code>${l.name?` · ${p(l.name)}`:""}</div>
                    <div class="list-row-sub">Created ${p(Se(l.created_at))}${l.owner_name?` by ${p(l.owner_name)}`:""} · ${l.last_used_at?`last used ${p(Se(l.last_used_at))}`:"never used"}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-key" data-key-id="${m(l.id)}" data-agent-id="${m(e)}">Revoke</button>
                </div>
            </div>`),...a.map(l=>{var d;const c=((d=l.client)==null?void 0:d.name)||"An app";return`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">Connected app: ${p(c)}</div>
                    <div class="list-row-sub">Acts as this agent · connected ${p(Se(l.created_at))}${l.last_used_at?` · last used ${p(Se(l.last_used_at))}`:""}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-connection" data-connection-id="${m(l.id)}" data-connection-name="${m(c)}" data-agent-id="${m(e)}">Disconnect</button>
                </div>
            </div>`})].join("")}async function oI(e,t){if(confirm("Revoke this key? Anything signing in with it stops working at once."))try{await h.revokeApiKey(e),_r(t)}catch(n){k("revoke the key",n)}}const Er={bio:4e3,pronouns:40,tagline:120,name:255};let Re=[],xr=null,Ah=new Map,Fd=!1,Sr=0,Ir=null,Hi=null,ga=null,Lr=!1,Ud=0;async function Ch(e,t){return h.getTeamRoster(e,{includeIdle:t})}function rI(e,t){!t||xr!==e||(Re=Re.map(n=>n.user_id===t.user_id?t:n))}function lI(){return Array(4).fill(0).map(()=>`
        <div class="list-row-2line person-row-skeleton">
            <div class="skeleton skeleton-title"></div>
        </div>
    `).join("")}async function cI(e){try{const t=await h.getTeamIssues(e,{status:["in_progress"],sort_by:"updated",order:"desc",limit:200}),n=new Map;for(const i of t||[])i.assignee_id&&(n.has(i.assignee_id)||n.set(i.assignee_id,[]),n.get(i.assignee_id).push(i));return n}catch(t){return console.error("Failed to load what the team is working on:",t),new Map}}async function Tr(){const e=C();if(!e)return;const t=++Sr,n=Fd,i=document.getElementById("people-list");i&&(i.innerHTML=lI(),i.setAttribute("aria-busy","true"));const s=document.getElementById("people-show-idle");s&&(s.checked=Fd),_g().then(()=>{t===Sr&&(Mi()?nr():Eg(),xr===e.id&&Fi())});try{const[a,o]=await Promise.all([Ch(e.id,n),cI(e.id)]);if(t!==Sr)return;Re=a,xr=e.id,Ah=o,Fi()}catch(a){if(t!==Sr)return;i==null||i.removeAttribute("aria-busy"),i&&(i.innerHTML=K({icon:z.team,heading:"Couldn't load the roster",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-people"},variant:"error"})),k("load the roster",a)}}function Ar(e){if(!e.is_agent){const i=e.role||"member";return i.charAt(0).toUpperCase()+i.slice(1)}const n=[e.kind==="session"?"Session":e.kind==="service"?"Registrar":"Agent"];return e.owner_name&&n.push(`of ${e.owner_name}`),e.idle&&n.push("· idle"),n.join(" ")}function dI(e){const t=Ah.get(e.user_id)||[];if(t.length){const[n]=t,i=t.length>1?` and ${t.length-1} more`:"";return`<span class="status-dot status-dot-in_progress" aria-hidden="true"></span>Working on ${p(n.identifier)} ${p(n.title)}${i}`}return e.is_agent?`${e.owner_name?`Agent of ${p(e.owner_name)}`:"Agent"}${e.idle?" · idle":""}`:e.tagline?p(e.tagline):p(Ar(e))}function uI(e){const t=m(e.user_id),n=e.mention_handle?` <span class="person-row-handle">@${p(e.mention_handle)}</span>`:"",i=[];return e.is_agent?(i.push(`<span class="badge badge-neutral">${p(Sh(e.project_id))}</span>`),Lh(e)?i.push('<span class="badge badge-accent">Registrar</span>'):e.kind==="session"&&i.push('<span class="badge badge-neutral">Session</span>')):e.role&&e.role!=="member"&&i.push(`<span class="badge badge-neutral">${p(Ar(e))}</span>`),`
        <a class="list-row-2line person-row${e.idle?" person-row-idle":""}"
           href="/people/${t}" data-action="view-person" data-user-id="${t}">
            <span class="person-row-avatar" aria-hidden="true">${Vt(e,`avatar person-avatar${e.is_agent?" person-avatar-agent":""}`)}</span>
            <span class="list-row-main">
                <span class="list-row-title">${p(e.name)}${n}</span>
                <span class="list-row-sub">${dI(e)}</span>
            </span>
            <span class="list-row-right">${i.join("")}</span>
        </a>
    `}function Bh(e,t,n,i=""){return`
        <div class="section-header people-section-header">
            <h3>${e} <span class="section-count">${t.length}</span></h3>${i}
        </div>
        <div class="people-rows">${t.map(uI).join("")||`<p class="people-empty">${n}</p>`}</div>
    `}function Fi(){const e=document.getElementById("people-list");if(!e)return;e.removeAttribute("aria-busy");const t=Re.filter(a=>!a.is_agent),n=Re.filter(a=>a.is_agent),i=ue(),s=i?`<button class="btn btn-secondary btn-small" data-action="edit-profile" data-user-id="${m(i.id)}">Edit your profile</button>`:"";e.innerHTML=Bh("Humans",t,"No one yet.",s)+Bh("Agents",n,"No agents yet.")+pI()}function pI(){var s;if(!Mi())return"";const e=new Set(Re.map(a=>a.user_id)),t=new Set(ft().map(a=>a.id)),n=(s=ue())==null?void 0:s.id,i=kt().filter(a=>!e.has(a.user_id)&&!t.has(a.user_id));return i.length?`
        <div class="section-header people-section-header">
            <h3>Not on the roster <span class="section-count">${i.length}</span></h3>
        </div>
        <div class="people-rows">${i.map(a=>`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">${p(a.user_name||"Unknown")}</div>
                    <div class="list-row-sub">${p(a.user_email||"")}${a.user_email?" · ":""}deactivated account, ${p(a.role||"member")}</div>
                </div>
                ${a.user_id!==n&&a.role!=="owner"?`<div class="list-row-right"><button class="btn btn-danger-outline btn-small" data-action="remove-member" data-user-id="${m(a.user_id)}">Remove from team</button></div>`:""}
            </div>`).join("")}
        </div>
    `:""}function mI(e){return{user_id:e.id,name:e.name,avatar_url:e.avatar_url,pronouns:e.pronouns,tagline:e.tagline,bio:e.bio,mention_handle:null,is_agent:!0,role:null,kind:e.kind,owner_id:e.parent_user_id,owner_name:e.parent_user_name,project_id:e.agent_project_id,idle:!!e.idle,joined_at:e.created_at}}function Dh(e,t=ue()){return!e||!t?!1:e.user_id===t.id||e.is_agent&&e.owner_id===t.id}async function Mh(e,t,{fresh:n=!1}={}){if(!n&&xr===e){const a=Re.find(o=>o.user_id===t);if(a)return a}const s=(await Ch(e,!0)).find(a=>a.user_id===t)||null;return rI(e,s),s}let jh=0,ha=null;async function Cr(e,t=!0){var r;t&&bn(),sg();const n=++jh,i=C();if(!i)return;const s=window.location.pathname,a=()=>{var l;return n!==jh||((l=C())==null?void 0:l.id)!==i.id||window.location.pathname!==s};let o;try{o=await Mh(i.id,e)}catch(l){if(a())return;k("load this profile",l),t||history.replaceState({view:"people"},"","/people"),O("people",t);return}if(!a()){if(!o){const l=ft().find(c=>c.id===e);l&&(o=mI(l))}if(!o){$("Not on this team’s roster","error"),t||history.replaceState({view:"people"},"","/people"),O("people",t);return}t&&history.pushState({personId:e,view:"people"},"",`/people/${encodeURIComponent(e)}`),Cn("people"),Vs("people"),Gd(o),window.scrollTo(0,0),(r=document.querySelector("#person-detail-view .person-profile-name"))==null||r.focus({preventScroll:!0})}}function fI(){let e=document.getElementById("person-detail-view");return e||(e=document.createElement("div"),e.id="person-detail-view",e.className="view",document.querySelector(".main-content").appendChild(e)),e}function Gd(e,{withIssues:t=!0}={}){var l;document.querySelectorAll(".view").forEach(c=>c.classList.add("hidden"));const n=fI();n.classList.remove("hidden"),n.dataset.userId=e.user_id,ha=e;const i=m(e.user_id),s=Dh(e),a=e.user_id===((l=ue())==null?void 0:l.id),o=e.bio?`<div class="person-bio markdown-body">${On(e.bio)}</div>`:`<p class="person-bio-empty">${a?"You haven’t written a bio yet.":"No bio yet."}</p>`,r=e.joined_at?`<span>Joined ${p(new Date(e.joined_at).toLocaleDateString())}</span>`:"";n.innerHTML=`
        <div class="view-header">
            <a href="/people" class="person-back" data-action="back-to-roster">← Roster</a>
            <div class="view-actions">
                ${s?`<button class="btn btn-primary" data-action="edit-profile" data-user-id="${i}">${a?"Edit your profile":"Edit profile"}</button>`:""}
            </div>
        </div>
        <div class="person-profile">
            ${Vt(e,"avatar person-avatar-large")}
            <div class="person-profile-body">
                <h2 class="person-profile-name" tabindex="-1">${p(e.name)}${e.pronouns?`<span class="person-pronouns">${p(e.pronouns)}</span>`:""}</h2>
                ${e.mention_handle?`<div class="person-handle">@${p(e.mention_handle)}</div>`:""}
                ${e.tagline?`<div class="person-tagline">${p(e.tagline)}</div>`:""}
                <div class="person-role">${p(Ar(e))}${r?" · ":""}${r}</div>
            </div>
        </div>
        ${o}
        <div class="person-sections">
            <section class="person-work">
                <div class="section-header"><h3>Working on</h3></div>
                <div id="person-issues" class="person-issues"><div class="skeleton skeleton-title"></div></div>
            </section>
            ${e.is_agent?aI(e,Re):""}
            ${!e.is_agent||!$r(e)?gI(e):""}
        </div>
    `,t&&bI(e.user_id),Ih(e)&&_r(e.user_id)}function gI(e){var i;if(!Mi())return"";const t=kt().find(s=>s.user_id===e.user_id);if(!t)return"";const n=e.user_id!==((i=ue())==null?void 0:i.id)&&t.role!=="owner";return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Membership</h3></div>
            <dl class="agent-access">
                <dt>Role</dt><dd>${p(Ar(e))}</dd>
                ${t.user_email?`<dt>Email</dt><dd>${p(t.user_email)}</dd>`:""}
            </dl>
            ${n?`<div class="agent-profile-actions"><button class="btn btn-danger-outline" data-action="remove-member" data-user-id="${m(e.user_id)}">Remove from team</button></div>`:""}
        </section>
    `}function Br(){const e=document.getElementById("people-view");return!!e&&!e.classList.contains("hidden")}function hI(e){const{agentId:t,deleted:n,created:i,credentials:s}=e.detail||{};if(s){_r(t);return}if(n){Re=Re.filter(a=>a.user_id!==t),va(t)?O("people"):Br()&&Fi();return}if(i){Br()&&Tr();return}va(t)&&ha?Gd(ha):Br()&&Fi()}function vI(e){const{userId:t}=e.detail||{};Re=Re.filter(n=>n.user_id!==t),va(t)?O("people"):Br()&&Fi()}typeof window<"u"&&(window.addEventListener("chaotic:agent-changed",hI),window.addEventListener("chaotic:member-removed",vI));const Rh=["in_progress","in_review","todo"];let Ph=0;async function bI(e){const t=C();if(!t)return;const n=++Ph;let i;try{i=await h.getTeamIssues(t.id,{assignee_id:e,status:Rh,sort_by:"status",order:"asc",limit:20})}catch(o){i=null,console.error("Failed to load their issues:",o)}if(n!==Ph)return;const s=document.getElementById("person-issues");if(!s)return;if(i===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load their issues.</p>';return}if(!i.length){s.innerHTML='<p class="person-bio-empty">Nothing open assigned.</p>';return}const a=o=>Rh.indexOf(o.status);s.innerHTML=[...i].sort((o,r)=>a(o)-a(r)).map(o=>`
        <a class="person-issue" href="/issue/${encodeURIComponent(o.identifier)}" data-action="person-open-issue" data-identifier="${m(o.identifier)}">
            <span class="person-issue-id">${p(o.identifier)}</span>
            <span class="person-issue-title">${p(o.title)}</span>
            <span class="person-issue-status">${p(String(o.status).replace("_"," "))}</span>
        </a>
    `).join("")}const zd=["name","avatar_url","pronouns","tagline","bio"];function yI(e){const t=(n,i)=>{const s=String(i??"").replace(/\r\n?/g,`
`);return n==="bio"&&s.startsWith(`
`)?s.slice(1):s};return Object.fromEntries(zd.map(n=>[n,t(n,e==null?void 0:e[n])]))}let Vd=0;async function wI(e){var l;const t=ue(),n=C();if(!t||!n)return;const i=++Vd,s=window.location.pathname;let a;try{a=await Mh(n.id,e,{fresh:!0})}catch(c){i===Vd&&k("load this profile",c);return}if(i!==Vd||window.location.pathname!==s||((l=C())==null?void 0:l.id)!==n.id||(!a&&e===t.id&&(a={...t,user_id:t.id}),!a||!Dh(a,t)))return;Ir=e,ga=a,Hi=yI(a),Ud++;const o=e===t.id,r=c=>m(c||"");document.getElementById("modal-title").textContent=o?"Edit your profile":`Edit ${a.name}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="save-profile">
            <div class="form-group">
                <label for="profile-name">Name</label>
                <input type="text" id="profile-name" value="${r(a.name)}" maxlength="${Er.name}" required>
            </div>
            <div class="form-group">
                <label for="profile-avatar">Avatar</label>
                <input type="text" id="profile-avatar" value="${r(a.avatar_url)}" placeholder="An emoji, or an image URL">
            </div>
            ${o?`<div class="form-group">
                <label for="profile-photo">Photo</label>
                <div class="profile-photo-row">
                    <input type="file" id="profile-photo" accept="image/png,image/jpeg,image/webp,image/gif" data-action="pick-profile-photo"${ba?" disabled":""}>
                    <button type="button" class="btn btn-secondary btn-small${gl.test(a.avatar_url||"")?"":" hidden"}" id="profile-photo-remove" data-action="remove-profile-photo"${ba?" disabled":""}>Remove photo</button>
                </div>
                <p class="form-help">Uploads at once, cropped square and resized to ${Oh}px.</p>
            </div>`:""}
            <div class="form-group">
                <label for="profile-pronouns">Pronouns</label>
                <input type="text" id="profile-pronouns" value="${r(a.pronouns)}" maxlength="${Er.pronouns}" placeholder="e.g. they/them">
            </div>
            <div class="form-group">
                <label for="profile-tagline">Tagline</label>
                <input type="text" id="profile-tagline" value="${r(a.tagline)}" maxlength="${Er.tagline}" placeholder="One line under your name">
            </div>
            <div class="form-group">
                <label for="profile-bio">Bio</label>
                <textarea id="profile-bio" rows="8" maxlength="${Er.bio}" placeholder="Markdown: who you are, what you work on, how to work with you">${p(a.bio||"")}</textarea>
                <p class="form-help">Leave a field blank to clear it.</p>
            </div>
            <button type="submit" class="btn btn-primary"${Lr?" disabled":""}>Save</button>
        </form>
    `,G()}function $I(e,t=null){const n=a=>{var o;return((o=e.querySelector(`#${a}`))==null?void 0:o.value)??""},i={name:n("profile-name"),avatar_url:n("profile-avatar").trim(),pronouns:n("profile-pronouns"),tagline:n("profile-tagline"),bio:n("profile-bio")},s={};for(const a of zd){const o=t?String(t[a]??""):null;(a==="avatar_url"?i[a]===(o==null?void 0:o.trim()):i[a]===o)||(s[a]=a==="avatar_url"?i[a]||null:i[a])}return s}function qh(e){var i;const t=window.scrollY,n=document.getElementById("person-issues");Gd(e,{withIssues:!1}),n&&((i=document.getElementById("person-issues"))==null||i.replaceWith(n)),window.scrollTo(0,t)}function va(e){const t=document.getElementById("person-detail-view");return!!t&&!t.classList.contains("hidden")&&t.dataset.userId===e}function Nh(){Ir=null,Hi=null,ga=null,F()}async function kI(e){e.preventDefault();const t=Ir;if(!t||Lr)return;const n=e.target.closest("form")||e.target,i=$I(n,Hi);if(!Object.keys(i).length){Nh();return}const s=ue(),a=t===(s==null?void 0:s.id),o=ga,r=Ud,l=n.querySelector('button[type="submit"]');Lr=!0,l&&(l.disabled=!0);try{const c=a?await h.updateMe(i):await h.updateAgent(t,i),d=Object.fromEntries(zd.map(u=>[u,(c==null?void 0:c[u])??null]));Re=Re.map(u=>u.user_id===t?{...u,...d}:u),a&&(Tt({...s,...d}),or()),r===Ud&&Nh(),$("Profile saved","success"),va(t)?qh({...o,...d}):Fi()}catch(c){k("save the profile",c)}finally{Lr=!1,l&&(l.disabled=!1);const c=document.querySelector('#modal-content form[data-action="save-profile"] button[type="submit"]');c&&(c.disabled=!1)}}const Oh=256;async function _I(e,t=Oh){var l;const n=await createImageBitmap(e),i=Math.min(n.width,n.height),s=document.createElement("canvas");s.width=t,s.height=t,s.getContext("2d").drawImage(n,(n.width-i)/2,(n.height-i)/2,i,i,0,0,t,t),(l=n.close)==null||l.call(n);const a=c=>new Promise(d=>s.toBlob(d,c,.9)),o=await a("image/webp");let r=o&&o.type==="image/webp"?o:null;if(!r){const c=s.getContext("2d");c.globalCompositeOperation="destination-over",c.fillStyle="#fff",c.fillRect(0,0,t,t),r=await a("image/jpeg")}if(!r)throw new Error("This browser could not convert the picture. Try a PNG or JPEG file.");return r}let ba=!1;function Hh(e){for(const t of["profile-photo","profile-photo-remove"]){const n=document.getElementById(t);n&&(n.disabled=e)}}function EI(e){var i;const t=ue();if(!t||!e||e.id&&e.id!==t.id)return;const n=e.avatar_url??null;if(Re=Re.map(s=>s.user_id===t.id?{...s,avatar_url:n}:s),Tt({...t,avatar_url:n}),or(),Ir===t.id&&Hi){const s=document.getElementById("profile-avatar");s&&(s.value=n||""),Hi={...Hi,avatar_url:n||""},ga={...ga,avatar_url:n},(i=document.getElementById("profile-photo-remove"))==null||i.classList.toggle("hidden",!gl.test(n||""))}ha&&va(t.id)&&qh({...ha,avatar_url:n})}async function Fh(e,t,n){if(!ba){ba=!0,Hh(!0);try{EI(await e()),$(t,"success")}catch(i){k(n,i)}finally{ba=!1,Hh(!1)}}}async function xI(e,t=_I){var i;const n=(i=e.files)==null?void 0:i[0];if(n)try{await Fh(async()=>h.uploadAvatar(await t(n)),"Photo uploaded","upload the photo")}finally{e.value=""}}function SI(){return Fh(()=>h.deleteAvatar(),"Photo removed","remove the photo")}function Wd(e){return e.metaKey||e.ctrlKey||e.shiftKey||e.button===1}oe({"view-person":(e,t)=>{e.type!=="click"||Wd(e)||(e.preventDefault(),Cr(t.userId))},"edit-profile":(e,t)=>{e.type==="click"&&(e.preventDefault(),wI(t.userId))},"view-my-profile":e=>{var n;if(e.type!=="click")return;e.preventDefault(),(n=document.getElementById("user-dropdown"))==null||n.classList.add("hidden");const t=ue();t&&Cr(t.id)},"pick-profile-photo":(e,t,n)=>{e.type==="change"&&xI(n)},"remove-profile-photo":e=>{e.type==="click"&&SI()},"save-profile":e=>{kI(e)},"retry-load-people":e=>{e.type==="click"&&Tr()},"person-open-issue":(e,t)=>{e.type!=="click"||Wd(e)||(e.preventDefault(),Ko(t.identifier))},"revoke-agent-key":(e,t)=>{e.type==="click"&&oI(t.keyId,t.agentId)},"revoke-agent-connection":async(e,t)=>{e.type==="click"&&(await th(t.connectionId,t.connectionName),_r(t.agentId))},"back-to-roster":e=>{e.type!=="click"||Wd(e)||(e.preventDefault(),O("people"))},"toggle-people-idle":(e,t,n)=>{e.type==="change"&&(Fd=!!n.checked,Tr())}});const II=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let xt=[],Dr=null,Mr=null,Kd=0;dt(e=>{e==="currentProject"&&A()==="board"&&ya()});async function ya({fromMemory:e=!1}={}){Ha(-1);const t=++Kd,n=X();if(!n){const o=document.getElementById("kanban-board");o&&(o.innerHTML=se().length===0?K({icon:z.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):K({icon:z.board,heading:"Select a project",description:"Board shows one project at a time. Pick one in the sidebar switcher, or press P."}));return}const i=document.getElementById("kanban-board"),s=ic(),a=e?bo("board",s):void 0;a?(xt=a,Dr=s,A()==="board"&&At(xt),Ui()):i&&(i.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const o=await h.getIssues({project_id:n});if(t!==Kd)return;const r=a&&yo(xt,o);xt=o,Dr=s,wi("board",s,o),A()==="board"&&At(xt),r||Ui()}catch(o){if(t!==Kd)return;i&&(i.innerHTML=K({icon:z.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),k("load board",o)}}const Yd=ny(()=>ya(),200);function Ui(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;Dr&&wi("board",Dr,xt),e.innerHTML=II.map(i=>{const s=xt.filter(a=>a.status===i.key);return`
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
                    `:s.map(LI).join("")}
                </div>
            </div>
        `}).join(""),TI(t)}function LI(e){const t=e.assignee_id?wt(e.assignee_id):null,n=t?ut(t):null,i=e.estimate!=null?vn(e.estimate,e.project_id):"",s=zo(e.estimate,e.project_id),a=(e.labels||[]).slice(0,2);return`
        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${m(e.id)}" data-identifier="${m(e.identifier)}">
            <div class="kanban-card-top">
                <span class="kanban-card-identifier">${p(e.identifier)}</span>
                ${n?`<span class="kanban-card-assignee" title="${m(n)}">${Vt(t,"avatar-small")}</span>`:""}
            </div>
            <div class="kanban-card-title">${p(e.title)}</div>
            <div class="kanban-card-meta">
                <span class="kanban-card-priority" title="Priority: ${m(Te(e.priority))}">${mt(e.priority)}</span>
                ${i?`<span class="estimate-badge${s?" out-of-scale":""}"${s?' title="Estimate outside current scale"':""}>${p(i)}</span>`:""}
                ${a.map(o=>`<span class="issue-label" title="${m(o.name)}" style="background: ${re(o.color)}20; color: ${re(o.color)}">${p(o.name)}</span>`).join("")}
            </div>
        </div>
    `}function TI(e){const t=up();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){Ha(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),Ha(i),n[i].classList.add("keyboard-selected")}function AI(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Mr=t.dataset.id,t.classList.add("dragging")}function CI(e,t){t.classList.remove("dragging"),Mr=null}function Uh(e){const t=xt.find(n=>n.id===Mr);return!!t&&t.status===e}function BI(e,t){e.preventDefault(),!Uh(t.dataset.status)&&t.classList.add("drag-over")}function DI(e,t){t.classList.remove("drag-over")}function MI(e,t){e.preventDefault();const n=xt.find(i=>i.id===t.dataset.id);n&&Uh(n.status)||t.classList.add("drag-over")}function jI(e,t){t.classList.remove("drag-over")}async function RI(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=xt.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,Ui();try{const o=await h.updateIssue(n,{status:i});$("Status updated","success"),$s(o)}catch(o){s.status=a,Ui(),k("update status",o)}}}async function PI(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Mr||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=xt.find(l=>l.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,Ui();try{const l=await h.updateIssue(n,{status:a});$("Status updated","success"),$s(l)}catch(l){o.status=r,Ui(),k("update status",l)}}}oe({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),ce(t.id)):e.type==="dragstart"?AI(e,n):e.type==="dragend"?CI(e,n):e.type==="dragover"?MI(e,n):e.type==="dragleave"?jI(e,n):e.type==="drop"&&PI(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?BI(e,n):e.type==="dragleave"?DI(e,n):e.type==="drop"&&RI(e,n)},"retry-load-board":()=>ya()});const xn=new Map,Gh=6e4,Qd=100;let Pe=null,jr=null,Rr=null,wa=null,zh=!1;const Vh={backlog:"var(--status-backlog)",todo:"var(--status-todo)",in_progress:"var(--status-in-progress)",in_review:"var(--status-in-review)",done:"var(--status-done)",canceled:"var(--status-canceled)"},Wh={urgent:"var(--priority-urgent)",high:"var(--priority-high)",medium:"var(--priority-medium)",low:"var(--priority-low)",no_priority:"var(--priority-none)"},Kh={api:null};let Zd={...Kh};function qI(e={}){Zd={...Kh,...e},Pe||(Pe=document.createElement("div"),Pe.className="issue-tooltip",Pe.style.display="none",document.body.appendChild(Pe),Pe.addEventListener("mouseenter",()=>{clearTimeout(jr)}),Pe.addEventListener("mouseleave",()=>{Xd()})),zh||(document.addEventListener("mouseover",NI),document.addEventListener("mouseout",OI),zh=!0)}function NI(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=HI(t);if(n){if(n===wa&&Pe.style.display!=="none"){clearTimeout(jr);return}clearTimeout(Rr),Rr=setTimeout(()=>{FI(t,n)},200)}}function OI(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Rr),jr=setTimeout(()=>{Xd()},150))}function HI(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function FI(e,t){wa=t;const n=e.getBoundingClientRect();Pe.style.left=`${n.left+window.scrollX}px`,Pe.style.top=`${n.bottom+window.scrollY+8}px`,Pe.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Pe.style.display="block";try{const i=await GI(t);if(wa!==t)return;zI(i)}catch{if(wa!==t)return;Pe.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Xd(){clearTimeout(Rr),clearTimeout(jr),Pe&&(Pe.style.display="none"),wa=null}function UI(){const e=Date.now();for(const[t,n]of xn.entries())e-n.timestamp>=Gh&&xn.delete(t)}async function GI(e){xn.size>Qd/2&&UI();const t=xn.get(e);if(t&&Date.now()-t.timestamp<Gh)return t.issue;if(!Zd.api)throw new Error("API not initialized");const n=await Zd.api.getIssueByIdentifier(e);if(xn.size>=Qd){const i=Array.from(xn.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,Qd/2);for(const[a]of s)xn.delete(a)}return xn.set(e,{issue:n,timestamp:Date.now()}),n}function zI(e){const t=Vh[e.status]||Vh.backlog,n=Wh[e.priority]||Wh.no_priority,i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Pe.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${p(e.identifier)}</span>
            <span class="issue-tooltip-type">${p(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${p(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${VI(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${WI(e.priority)}</span>
        </div>
    `}function VI(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function WI(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Yh(){return!!document.querySelector(".description-inline-editor")}function Jd(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function eu(){var e;return Jd("issue-detail-view")?((e=_e())==null?void 0:e.id)??null:null}function Yn(e){return!!e&&eu()===e}function KI(){Je("issue:created",e1),Je("issue:updated",t1),Je("issue:deleted",n1),Je("comment",a1),Je("relation",r1),Je("attestation",l1),Je("activity",d1),Je("project",u1),Je("sprint",p1),Je("document",o1),Je("inbox",c1),Je("connection:reconnected",m1),Je("connection:unauthorized",QI),Je("connection:forbidden",ZI),Je("connection:superseded",YI)}function YI(){$("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function QI(){h.logout(),Tt(null),ti(null),la(),$("Your session has ended. Please sign in again.","warning")}function ZI(){$("Live updates stopped: you no longer have access to this team.","error")}function Qh(e,t){var n;return e&&e===((n=ue())==null?void 0:n.id)?"You":t||"Someone"}function XI(e){var s;const t=Qh(e.creator_id,e.creator_name),n=e.title?`${t} created ${e.identifier}: ${e.title}`:`${t} created ${e.identifier}`,i=[];return e.issue_type&&i.push(ct(e.issue_type)),e.priority&&e.priority!=="no_priority"&&i.push(`${Te(e.priority)} priority`),e.estimate!=null&&i.push(`${e.estimate} pt${e.estimate===1?"":"s"}`),e.assignee_id&&i.push(e.assignee_id===((s=ue())==null?void 0:s.id)?"assigned to you":`assigned to ${e.assignee_name||"someone"}`),e.parent_identifier&&i.push(`under ${e.parent_identifier}`),i.length?[n,i.join(" · ")]:[n]}function JI(e,t){const n=t?`${e.identifier}: ${t}`:e.identifier;return e.deleted_by_id||e.deleted_by_name?[`${Qh(e.deleted_by_id,e.deleted_by_name)} deleted ${n}`]:[`Issue ${n} was deleted`]}function Zh(e,t,n){const i=$(t.join(`
`),n);if(i&&(t.length>1&&i.classList.add("toast-multiline"),e!=null&&e.id)){const s=i.querySelector(".toast-message");if(s){i.classList.add("toast-clickable"),s.title=`Open ${e.identifier}`,s.setAttribute("role","button"),s.tabIndex=0;const a=()=>{var o;(o=i.querySelector(".toast-close"))==null||o.click(),Promise.resolve(ce(e.id)).catch(r=>console.error("Failed to open issue:",r))};s.addEventListener("click",a),s.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),a())})}}}function e1(e){var s;Ds(A(),"board","sprints","epics");const t=ie(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,tt(a),A()==="issues"&&pt()}else tt([e,...t]),A()==="issues"&&pt(),Zh(e,XI(e),"info");if(e.assignee_id===((s=ue())==null?void 0:s.id)){const a=We(),o=a.findIndex(l=>l.id===e.id),r=a.findIndex(l=>l._isOptimistic&&l.title===e.title);if(o===-1&&r===-1)jn([e,...a]),A()==="my-issues"&&Rn();else if(r>=0){const l=[...a];l[r]=e,jn(l),A()==="my-issues"&&Rn()}}A()==="board"?Yd():A()==="sprints"?$a():A()==="epics"&&kn(),Yn(e.parent_id)&&Qn(e.parent_id)}function t1(e){Ds(A(),"board","sprints","epics"),Va(e);const t=ie();t.some(s=>s.id===e.id)&&tt(t.map(s=>s.id===e.id?e:s));const n=We();n.some(s=>s.id===e.id)&&jn(n.map(s=>s.id===e.id?e:s));const i=ps();i.some(s=>s.id===e.id)&&At(i.map(s=>s.id===e.id?e:s)),A()==="issues"?pt():A()==="my-issues"?Rn():A()==="board"?Yd():A()==="sprints"?$a():A()==="epics"&&kn(),Yn(e.id)&&(Yh()?kc(e):Qn(e.id))}function n1(e){var s,a;const t=e.title??((s=ie().find(o=>o.id===e.id))==null?void 0:s.title)??((a=We().find(o=>o.id===e.id))==null?void 0:a.title);Ds(A(),"board","sprints","epics"),ky(e.id),tt(ie().filter(o=>o.id!==e.id)),jn(We().filter(o=>o.id!==e.id));const n=ps();n.some(o=>o.id===e.id)&&At(n.filter(o=>o.id!==e.id)),A()==="issues"?pt():A()==="my-issues"?(Rn(),ai({showLoading:!1})):A()==="board"?Yd():A()==="sprints"?$a():A()==="epics"&&kn();const i=Yn(e.id);Zh(null,JI(e,t),i?"warning":"info"),i&&O("my-issues")}const Xh=250,i1=1e3,Gi=new Map;function Qn(e){Yh()?kc():tu(e,Xh)}function tu(e,t){let n=Gi.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},Gi.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>s1(e),t))}async function s1(e){const t=Gi.get(e);if(!t)return;if(t.timer=null,!Yn(e)){Gi.delete(e);return}t.inFlight=!0;let n;try{n=await ce(e,!1,{refresh:!0})}finally{t.inFlight=!1}Gi.get(e)===t&&(t.again?(t.again=!1,tu(e,Xh)):n==="retry"?tu(e,i1):Gi.delete(e))}function a1(e){A()==="my-issues"&&ai({showLoading:!1}),Yn(e.issue_id)&&Qn(e.issue_id),e.document_id&&mf(e.document_id)}function o1(e,{type:t}={}){Ds(A(),"documents"),pf(),t==="deleted"?Dk(e.id,e.title):mf(e.id)}function r1(e){const t=eu();t&&(e.source_issue_id===t||e.target_issue_id===t)&&Qn(t)}function l1(e){A()==="approvals"&&jt(),Yn(e.issue_id)&&Qn(e.issue_id)}function c1(e,t){var n;e.recipient_user_id===((n=ue())==null?void 0:n.id)&&(Ci(),ox(t==null?void 0:t.type,e),A()==="inbox"&&!cx(t==null?void 0:t.type,e)&&Xs({background:!0}))}function d1(e){A()==="my-issues"&&ai({showLoading:!1}),Yn(e.issue_id)&&Qn(e.issue_id)}function u1(e,{type:t}){gt().then(()=>{A()==="projects"&&Gn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?$(`New project: ${e.name}`,"info"):t==="deleted"&&$(`Project ${e.name} deleted`,"info")}function $a(){const e=O_();e&&Jd("sprint-detail-view")?Si(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):Jd("sprints-view")&&hn().catch(t=>console.error("Failed to reload sprints:",t))}function p1(e,{type:t}={}){if(Ds(A(),"sprints"),Bf(),A()==="sprints"?$a():A()==="my-issues"&&bs(),t==="created")$(`New sprint: ${e.name}`,"info");else if(t==="closed"){const n=/^sprint\b/i.test(e.name||"")?e.name:`Sprint ${e.name}`,i=e.budget!=null&&e.points_spent!=null?` at ${e.points_spent}/${e.budget} points`:"";$(e.limbo?`${n} is closing${i}: rituals pending`:`${n} closed${i}`,"info")}}function m1(){const e=A();sc(),Ci(),e==="issues"?Dt().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(si().catch(n=>console.error("Failed to resync my issues:",n)),bs().catch(n=>console.error("Failed to resync sprint status:",n)),ai({showLoading:!1})):e==="board"?ya():e==="sprints"?$a():e==="epics"?kn().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?gt().then(()=>{A()==="projects"&&Gn()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?pf():e==="approvals"?jt():e==="inbox"&&Xs({background:!0});const t=eu();t&&Qn(t)}const f1='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Jh(e){return Array.from(e.querySelectorAll(f1)).filter(t=>!t.closest(".hidden, [hidden]"))}function ev(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function g1(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),ev(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=Jh(t);n&&n.focus()}}}function ka(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),ev(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=Jh(n);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&ka()});async function h1(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=X();if(!i){$("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=se().find(c=>c.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};tt([r,...ie()]),pt();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const c=await h.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=ie();d.some(u=>u.id===c.id)?tt(d.filter(u=>u.id!==a)):d.some(u=>u.id===a)&&tt(d.map(u=>u.id===a?c:u)),pt(),gt(),$("Issue created!","success")}catch(c){tt(ie().filter(d=>d.id!==a)),pt(),k("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}WE({beforeScrollRestore:Hl,beforeNavigate:()=>{I_(),ME(),ni(null),mp(null),ka(),Xd(),Uo()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return bh(e[1]),!0;if(e[0]==="issue"&&e[1])return Ao(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(Ao(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}if(e[0]==="document"&&e[1])return I1(e[1]),!0;if(e[0]==="sprint"&&e[1])return U_(e[1]),!0;if(e[0]==="people"&&e[1])return Cr(decodeURIComponent(e[1]),!1),!0;if(e[0]==="projects"&&e[1]&&e[2]==="settings"){const t=new URLSearchParams(window.location.search).get("tab")||void 0;return Vo(decodeURIComponent(e[1]),{tab:t,replace:!0}),!0}return!1},detailPopstate:e=>e.epicId?(yr(e.epicId,!1),!0):e.issueId?(ce(e.issueId,!1),!0):e.identifier?(Ao(e.identifier),!0):e.documentId?(Ce(e.documentId,!1),!0):e.sprintId?(Si(e.sprintId,!1),!0):e.personId?(Cr(e.personId,!1),!0):e.settingsProjectId?(Vo(e.settingsProjectId,{tab:e.tab,replace:!0}),!0):!1,restoreProject:()=>{const e=Jf();e&&se().some(t=>t.id===e)&&bt(e)},issueNavigate:e=>Ao(e),epicNavigate:e=>bh(e)}),VE({"my-issues":()=>{bs(),si(),ai()},approvals:()=>{jt()},inbox:()=>{Xs({focusFirst:!0})},issues:()=>{var r;Vw(),Zw(),e$();const e=new URLSearchParams(window.location.search),t=e.getAll("label"),n=e.getAll("exclude_label"),i=e.get("sprint"),s=t.length>0||n.length>0||!!i||!!((r=document.getElementById("sprint-filter"))!=null&&r.value)||qn().length>0||Nn().length>0;s||Dt();const a=Qp().then(()=>{if(t.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=t.includes(d.value)}),Ja())}if(n.length>0){const l=document.getElementById("exclude-label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=n.includes(d.value)}),eo())}}),o=gm().then(()=>{if(i){const l=document.getElementById("sprint-filter");l&&(l.value=i)}});s?Promise.allSettled([a,o]).then(()=>Dt()):(a.catch(l=>console.error("Failed to populate label filter:",l)),o.catch(l=>console.error("Failed to update sprint filter:",l)))},query:()=>{LS()},epics:()=>{kn({fromMemory:!0})},board:()=>{ya({fromMemory:!0})},projects:()=>{Gn(),gt().then(Gn)},sprints:()=>{hn({fromMemory:!0})},rituals:()=>{Df()},documents:()=>{Un(null,null,{fromMemory:!0})},people:Tr,settings:()=>{_d(),eh(),nh(),Is()}});function v1(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||F()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>F())}function b1(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>Zf(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>jE());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>RE()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>qE(a))})}function y1(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>cf("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>cf("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>df());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>Lk());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Yt())}function w1(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>Dp())}function $1(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>Jw());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>Mw());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>jw()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const b=g.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>io("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>io("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>io("label-filter-dropdown")):b!=null&&b.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>io("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>so())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>ao())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Pl())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>ql())}const a=document.getElementById("label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>oo())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>ro())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>rt());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>rt());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>rt());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>Dt());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>$m());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",g=>h1(g))}function k1(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>kg());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>ws()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),O(o.dataset.view),r.detail>0&&yh())})}),document.querySelectorAll(".issues-layout-toggle a[data-view]").forEach(o=>{o.addEventListener("click",r=>{var c;if(r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0)return;r.preventDefault();const l=o.dataset.view;A()!==l&&O(l),(c=document.querySelector(`#${l}-view .issues-layout-toggle a[data-view="${l}"]`))==null||c.focus()})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Dx());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>ka());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>g1());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>ws())}function _1(e){ka(),_n()&&O(A()),A()==="query"?_S(e):e?bt(e):Ff()}function tv(){return WS(document.getElementById(Fo),{returnFocus:!0})}oe({"navigate-to":(e,t)=>{O(t.view)},"switch-project":(e,t,n)=>{e.type==="change"&&_1(n.value)},showCreateIssueModal:()=>ws(),showCreateEpicModal:()=>DS(),"retry-load-epics":()=>kn(),showCreateProjectModal:()=>Vf(),showCreateDocumentModal:()=>gf(),showCreateTeamModal:()=>Tg(),showEditTeamModal:()=>Wx(),showInviteModal:()=>Sg(),showCreateApiKeyModal:()=>K0(),showCreateAgentModal:()=>q$(),resetOnboarding:()=>Rg(),logout:()=>Jg(),navigateToProjects:()=>O("projects")});async function E1(){if(!h.getToken()){await Kg();return}ag();const e=h.getMyTeams();e.catch(()=>{});const t=h.getMe(),n=await Vb(tp(h.getToken()));if(n){t.then(i=>{Tt(i),or()},async i=>{if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await ml(),window.location.reload();return}console.error("Failed to confirm the session on boot:",i),$("Showing saved data — check your connection and reload","error")}),Tt(n.user),await Kn({teamsRequest:e,snapshot:n});return}try{const i=await t;Tt(i),await Kn({teamsRequest:e})}catch(i){if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await Kg();return}console.error("Failed to load current user on boot:",i),la(),$("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{var e;gy(),Q$(),V0(),k1(),v1(),w1(),$1(),b1(),y1(),x1(),KS(),(e=document.querySelector(`[data-picker-for="${Fo}"]`))==null||e.setAttribute("aria-keyshortcuts","P"),S1(),qI({api:h}),KI(),await E1()});function x1(){const e=document.getElementById("theme-toggle");if(!e)return;const t=Ib()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),Lb(n?"light":"dark")})}function S1(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");Ko(i)}}})}async function I1(e){try{await Ce(e,!1)}catch{O("documents",!1)}}document.addEventListener("keydown",PS({getCurrentView:A,getSelectedIndex:cp,setSelectedIndex:Bn,viewIssue:ce,showEditIssueModal:vf,showInlineDropdown:Dl,isInlineDropdownOpen:li,isModalOpen:Ve,isCommandPaletteOpen:$n,isDetailViewActive:_n,beforeNavigate:Hl})),document.addEventListener("keydown",qS({getCurrentView:A,getSelectedIndex:sy,setSelectedIndex:dp,viewDocument:Ce,showEditDocumentModal:hf,isModalOpen:Ve,isCommandPaletteOpen:$n,isDetailViewActive:_n})),document.addEventListener("keydown",OS({getCurrentView:A,getSelectedIndex:up,setSelectedIndex:Ha,viewIssue:ce,isModalOpen:Ve,isCommandPaletteOpen:$n,isDetailViewActive:_n})),document.addEventListener("keydown",NS({getCurrentView:A,getSelectedIndex:ay,setSelectedIndex:Fa,toggleInboxExpand:Sx,collapseInboxExpand:px,archiveInboxEntry:xx,isInlineDropdownOpen:li,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:Ve,isCommandPaletteOpen:$n,isDetailViewActive:_n})),document.addEventListener("keydown",HS()),document.addEventListener("keydown",Nd({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&Si(e.dataset.sprintId)},getCurrentView:A,getSelectedIndex:oy,setSelectedIndex:pp,isModalOpen:Ve,isCommandPaletteOpen:$n,isDetailViewActive:_n})),document.addEventListener("keydown",Nd({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&og(e.dataset.identifier)},getCurrentView:A,getSelectedIndex:ry,setSelectedIndex:bl,isModalOpen:Ve,isCommandPaletteOpen:$n,isDetailViewActive:_n})),document.addEventListener("keydown",Nd({view:"my-issues",selector:"#my-issues-list .issue-row",open:e=>{var t;return(t=e.querySelector(".issue-title"))==null?void 0:t.click()},getCurrentView:A,getSelectedIndex:Ry,setSelectedIndex:Py,isInlineDropdownOpen:li,isModalOpen:Ve,isCommandPaletteOpen:$n,isDetailViewActive:_n}));function nv(){var e;O("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus()}function L1(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)")||!!document.querySelector("#issue-detail-view details.related-add[open]")||Ek()}document.addEventListener("keydown",jS({closeModal:F,closeSidebar:ka,navigateTo:O,openProjectSwitcher:tv,showCreateIssueModal:ws,showKeyboardShortcutsHelp:oh,isModalOpen:Ve,focusSearch:nv,isInlineDropdownOpen:li,closeInlineDropdowns:ty,isModalDirty:Jb,focusModalField:sp,closeDropdowns:()=>{var t;document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),ui();const e=document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)");e&&(e.classList.add("hidden"),(t=document.querySelector("#issue-detail-view .sidebar-overflow-trigger"))==null||t.setAttribute("aria-expanded","false"))},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:L1,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),iS([{id:"nav-my-issues",title:"Home",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>O("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>O("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"Issues laid out by status",icon:"📊",shortcut:"B",action:()=>O("board"),category:"Navigation"},{id:"switch-project",title:"Switch project",subtitle:"Change the project every view shows",icon:"🔀",shortcut:"P",action:()=>tv(),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"G P",action:()=>O("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>O("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>O("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>O("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"The rituals tabs in Project settings",icon:"🔮",shortcut:"G R",action:()=>O("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>O("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>O("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to People",subtitle:"Everyone on the team, people and agents",icon:"👥",shortcut:"G T",action:()=>O("people"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>O("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{O("issues"),setTimeout(ws,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{O("projects"),setTimeout(Vf,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{O("documents"),setTimeout(gf,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Tg(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:nv,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{O("people"),setTimeout(Sg,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>oh(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Rg(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Jg(),category:"Account"}]),document.addEventListener("keydown",RS({isModalOpen:Ve,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:$n,openCommandPalette:sS,closeCommandPalette:cr})),window.marked=Q,window.DOMPurify=Gu,console.log("Chaotic frontend loaded via Vite")})();
