var nx=Object.defineProperty;var ix=(Rt,Pe,vn)=>Pe in Rt?nx(Rt,Pe,{enumerable:!0,configurable:!0,writable:!0,value:vn}):Rt[Pe]=vn;var ne=(Rt,Pe,vn)=>ix(Rt,typeof Pe!="symbol"?Pe+"":Pe,vn);(function(){"use strict";var hc;function Rt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Pe=Rt();function vn(e){Pe=e}var Ci={exec:()=>null};function Q(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(qe.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var qe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},xf=/^(?:[ \t]*(?:\n|$))+/,If=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Sf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ai=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Tf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ao=/(?:[*+-]|\d{1,9}[.)])/,Ac=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Bc=Q(Ac).replace(/bull/g,Ao).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Lf=Q(Ac).replace(/bull/g,Ao).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Bo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Cf=/^[^\n]+/,Do=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Af=Q(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Do).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Bf=Q(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ao).getRegex(),Fs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Mo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Df=Q("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Mo).replace("tag",Fs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Dc=Q(Bo).replace("hr",Ai).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fs).getRegex(),Mf=Q(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Dc).getRegex(),jo={blockquote:Mf,code:If,def:Af,fences:Sf,heading:Tf,hr:Ai,html:Df,lheading:Bc,list:Bf,newline:xf,paragraph:Dc,table:Ci,text:Cf},Mc=Q("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ai).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fs).getRegex(),jf={...jo,lheading:Lf,table:Mc,paragraph:Q(Bo).replace("hr",Ai).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Mc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fs).getRegex()},Rf={...jo,html:Q(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Mo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ci,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Q(Bo).replace("hr",Ai).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Bc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Pf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,qf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,jc=/^( {2,}|\\)\n(?!\s*$)/,Nf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Us=/[\p{P}\p{S}]/u,Ro=/[\s\p{P}\p{S}]/u,Rc=/[^\s\p{P}\p{S}]/u,Of=Q(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ro).getRegex(),Pc=/(?!~)[\p{P}\p{S}]/u,Hf=/(?!~)[\s\p{P}\p{S}]/u,Ff=/(?:[^\s\p{P}\p{S}]|~)/u,Uf=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,qc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Gf=Q(qc,"u").replace(/punct/g,Us).getRegex(),zf=Q(qc,"u").replace(/punct/g,Pc).getRegex(),Nc="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Vf=Q(Nc,"gu").replace(/notPunctSpace/g,Rc).replace(/punctSpace/g,Ro).replace(/punct/g,Us).getRegex(),Wf=Q(Nc,"gu").replace(/notPunctSpace/g,Ff).replace(/punctSpace/g,Hf).replace(/punct/g,Pc).getRegex(),Kf=Q("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Rc).replace(/punctSpace/g,Ro).replace(/punct/g,Us).getRegex(),Yf=Q(/\\(punct)/,"gu").replace(/punct/g,Us).getRegex(),Zf=Q(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Qf=Q(Mo).replace("(?:-->|$)","-->").getRegex(),Xf=Q("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Qf).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Gs=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Jf=Q(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Gs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Oc=Q(/^!?\[(label)\]\[(ref)\]/).replace("label",Gs).replace("ref",Do).getRegex(),Hc=Q(/^!?\[(ref)\](?:\[\])?/).replace("ref",Do).getRegex(),eg=Q("reflink|nolink(?!\\()","g").replace("reflink",Oc).replace("nolink",Hc).getRegex(),Po={_backpedal:Ci,anyPunctuation:Yf,autolink:Zf,blockSkip:Uf,br:jc,code:qf,del:Ci,emStrongLDelim:Gf,emStrongRDelimAst:Vf,emStrongRDelimUnd:Kf,escape:Pf,link:Jf,nolink:Hc,punctuation:Of,reflink:Oc,reflinkSearch:eg,tag:Xf,text:Nf,url:Ci},tg={...Po,link:Q(/^!?\[(label)\]\((.*?)\)/).replace("label",Gs).getRegex(),reflink:Q(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Gs).getRegex()},qo={...Po,emStrongRDelimAst:Wf,emStrongLDelim:zf,url:Q(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},ng={...qo,br:Q(jc).replace("{2,}","*").getRegex(),text:Q(qo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},zs={normal:jo,gfm:jf,pedantic:Rf},Bi={normal:Po,gfm:qo,breaks:ng,pedantic:tg},ig={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Fc=e=>ig[e];function wt(e,t){if(t){if(qe.escapeTest.test(e))return e.replace(qe.escapeReplace,Fc)}else if(qe.escapeTestNoEncode.test(e))return e.replace(qe.escapeReplaceNoEncode,Fc);return e}function Uc(e){try{e=encodeURI(e).replace(qe.percentDecode,"%")}catch{return null}return e}function Gc(e,t){var a;const n=e.replace(qe.findPipe,(o,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(qe.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(qe.slashPipe,"|");return i}function Di(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function sg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function zc(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function ag(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var Vs=class{constructor(e){ne(this,"options");ne(this,"rules");ne(this,"lexer");this.options=e||Pe}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Di(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=ag(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=Di(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Di(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Di(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),o=!0;else if(!o)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=u,n.length===0)break;const m=a.at(-1);if((m==null?void 0:m.type)==="code")break;if((m==null?void 0:m.type)==="blockquote"){const g=m,y=g.raw+`
`+n.join(`
`),b=this.blockquote(y);a[a.length-1]=b,i=i.substring(0,i.length-g.raw.length)+b.raw,s=s.substring(0,s.length-g.text.length)+b.text;break}else if((m==null?void 0:m.type)==="list"){const g=m,y=g.raw+`
`+n.join(`
`),b=this.list(y);a[a.length-1]=b,i=i.substring(0,i.length-m.raw.length)+b.raw,s=s.substring(0,s.length-g.raw.length)+b.raw,n=y.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let l=!1,c="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),m=e.split(`
`,1)[0],g=!u.trim(),y=0;if(this.options.pedantic?(y=2,d=u.trimStart()):g?y=t[1].length+1:(y=t[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,d=u.slice(y),y+=t[1].length),g&&this.rules.other.blankLine.test(m)&&(c+=m+`
`,e=e.substring(m.length+1),l=!0),!l){const T=this.rules.other.nextBulletRegex(y),I=this.rules.other.hrRegex(y),A=this.rules.other.fencesBeginRegex(y),D=this.rules.other.headingBeginRegex(y),X=this.rules.other.htmlBeginRegex(y);for(;e;){const E=e.split(`
`,1)[0];let P;if(m=E,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),P=m):P=m.replace(this.rules.other.tabCharGlobal,"    "),A.test(m)||D.test(m)||X.test(m)||T.test(m)||I.test(m))break;if(P.search(this.rules.other.nonSpaceChar)>=y||!m.trim())d+=`
`+P.slice(y);else{if(g||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||A.test(u)||D.test(u)||I.test(u))break;d+=`
`+m}!g&&!m.trim()&&(g=!0),c+=E+`
`,e=e.substring(E.length+1),u=P.slice(y)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let b=null,k;this.options.gfm&&(b=this.rules.other.listIsTask.exec(d),b&&(k=b[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!b,checked:k,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(u=>u.type==="space"),d=c.length>0&&c.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Gc(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(Gc(r,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Di(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=sg(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),zc(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return zc(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,l=a,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const u=[...i[0]][0].length,m=e.slice(0,a+i.index+u+r);if(Math.min(a,r)%2){const y=m.slice(1,-1);return{type:"em",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}const g=m.slice(2,-2);return{type:"strong",raw:m,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Pt=class Lc{constructor(t){ne(this,"tokens");ne(this,"options");ne(this,"state");ne(this,"tokenizer");ne(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Pe,this.options.tokenizer=this.options.tokenizer||new Vs,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:qe,block:zs.normal,inline:Bi.normal};this.options.pedantic?(n.block=zs.pedantic,n.inline=Bi.pedantic):this.options.gfm&&(n.block=zs.gfm,this.options.breaks?n.inline=Bi.breaks:n.inline=Bi.gfm),this.tokenizer.rules=n}static get rules(){return{block:zs,inline:Bi}}static lex(t,n){return new Lc(n).lex(t)}static lexInline(t,n){return new Lc(n).inlineTokens(t)}lex(t){t=t.replace(qe.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(qe.tabCharGlobal,"    ").replace(qe.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const d=t.slice(1);let u;this.options.extensions.startBlock.forEach(m=>{u=m.call({lexer:this},d),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(m=>(d=m.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const m=n.at(-1);d.type==="text"&&(m==null?void 0:m.type)==="text"?(m.raw+=d.raw,m.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let u=t;if((c=this.options.extensions)!=null&&c.startInline){let m=1/0;const g=t.slice(1);let y;this.options.extensions.startInline.forEach(b=>{y=b.call({lexer:this},g),typeof y=="number"&&y>=0&&(m=Math.min(m,y))}),m<1/0&&m>=0&&(u=t.substring(0,m+1))}if(d=this.tokenizer.inlineText(u)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const m=n.at(-1);(m==null?void 0:m.type)==="text"?(m.raw+=d.raw,m.text+=d.text):n.push(d);continue}if(t){const m="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(m);break}else throw new Error(m)}}return n}},Ws=class{constructor(e){ne(this,"options");ne(this,"parser");this.options=e||Pe}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(qe.notSpaceStart))==null?void 0:a[0],s=e.replace(qe.endingNewline,"")+`
`;return i?'<pre><code class="language-'+wt(i)+'">'+(n?s:wt(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:wt(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let o=0;o<e.items.length;o++){const r=e.items[o];i+=this.listitem(r)}const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+wt(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const a=e.rows[s];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${wt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=Uc(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+wt(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=Uc(e);if(s===null)return wt(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${wt(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:wt(e.text)}},No=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},qt=class Cc{constructor(t){ne(this,"options");ne(this,"renderer");ne(this,"textRenderer");this.options=t||Pe,this.options.renderer=this.options.renderer||new Ws,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new No}static parse(t,n){return new Cc(n).parse(t)}static parseInline(t,n){return new Cc(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},Ks=(hc=class{constructor(e){ne(this,"options");ne(this,"block");this.options=e||Pe}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Pt.lex:Pt.lexInline}provideParser(){return this.block?qt.parse:qt.parseInline}},ne(hc,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),hc),og=class{constructor(...e){ne(this,"defaults",Rt());ne(this,"options",this.setOptions);ne(this,"parse",this.parseMarkdown(!0));ne(this,"parseInline",this.parseMarkdown(!1));ne(this,"Parser",qt);ne(this,"Renderer",Ws);ne(this,"TextRenderer",No);ne(this,"Lexer",Pt);ne(this,"Tokenizer",Vs);ne(this,"Hooks",Ks);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new Ws(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new Vs(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new Ks;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=s[o];Ks.passThroughHooks.has(a)?s[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(u=>l.call(s,u));const d=r.call(s,c);return l.call(s,d)}:s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Pt.lex(e,t??this.defaults)}parser(e,t){return qt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Pt.lex:Pt.lexInline,l=a.hooks?a.hooks.provideParser():e?qt.parse:qt.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>l(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let d=l(c,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+wt(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},yn=new og;function Z(e,t){return yn.parse(e,t)}Z.options=Z.setOptions=function(e){return yn.setOptions(e),Z.defaults=yn.defaults,vn(Z.defaults),Z},Z.getDefaults=Rt,Z.defaults=Pe,Z.use=function(...e){return yn.use(...e),Z.defaults=yn.defaults,vn(Z.defaults),Z},Z.walkTokens=function(e,t){return yn.walkTokens(e,t)},Z.parseInline=yn.parseInline,Z.Parser=qt,Z.parser=qt.parse,Z.Renderer=Ws,Z.TextRenderer=No,Z.Lexer=Pt,Z.lexer=Pt.lex,Z.Tokenizer=Vs,Z.Hooks=Ks,Z.parse=Z,Z.options,Z.setOptions,Z.use,Z.walkTokens,Z.parseInline,qt.parse,Pt.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Vc,setPrototypeOf:Wc,isFrozen:rg,getPrototypeOf:lg,getOwnPropertyDescriptor:cg}=Object;let{freeze:Ne,seal:it,create:Oo}=Object,{apply:Ho,construct:Fo}=typeof Reflect<"u"&&Reflect;Ne||(Ne=function(t){return t}),it||(it=function(t){return t}),Ho||(Ho=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),Fo||(Fo=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Ys=He(Array.prototype.forEach),dg=He(Array.prototype.lastIndexOf),Kc=He(Array.prototype.pop),Mi=He(Array.prototype.push),ug=He(Array.prototype.splice),Zs=He(String.prototype.toLowerCase),Uo=He(String.prototype.toString),Go=He(String.prototype.match),ji=He(String.prototype.replace),pg=He(String.prototype.indexOf),mg=He(String.prototype.trim),ft=He(Object.prototype.hasOwnProperty),Oe=He(RegExp.prototype.test),Ri=fg(TypeError);function He(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return Ho(e,t,i)}}function fg(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return Fo(e,n)}}function U(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Zs;Wc&&Wc(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(rg(t)||(t[i]=a),s=a)}e[s]=!0}return e}function gg(e){for(let t=0;t<e.length;t++)ft(e,t)||(e[t]=null);return e}function kt(e){const t=Oo(null);for(const[n,i]of Vc(e))ft(e,n)&&(Array.isArray(i)?t[n]=gg(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=kt(i):t[n]=i);return t}function Pi(e,t){for(;e!==null;){const i=cg(e,t);if(i){if(i.get)return He(i.get);if(typeof i.value=="function")return He(i.value)}e=lg(e)}function n(){return null}return n}const Yc=Ne(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),zo=Ne(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Vo=Ne(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),hg=Ne(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Wo=Ne(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),vg=Ne(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Zc=Ne(["#text"]),Qc=Ne(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ko=Ne(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Xc=Ne(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Qs=Ne(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),yg=it(/\{\{[\w\W]*|[\w\W]*\}\}/gm),bg=it(/<%[\w\W]*|[\w\W]*%>/gm),wg=it(/\$\{[\w\W]*/gm),kg=it(/^data-[\-\w.\u00B7-\uFFFF]+$/),$g=it(/^aria-[\-\w]+$/),Jc=it(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Eg=it(/^(?:\w+script|data):/i),_g=it(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ed=it(/^html$/i),xg=it(/^[a-z][.\w]*(-[.\w]+)+$/i);var td=Object.freeze({__proto__:null,ARIA_ATTR:$g,ATTR_WHITESPACE:_g,CUSTOM_ELEMENT:xg,DATA_ATTR:kg,DOCTYPE_NAME:ed,ERB_EXPR:bg,IS_ALLOWED_URI:Jc,IS_SCRIPT_OR_DATA:Eg,MUSTACHE_EXPR:yg,TMPLIT_EXPR:wg});const qi={element:1,text:3,progressingInstruction:7,comment:8,document:9},Ig=function(){return typeof window>"u"?null:window},Sg=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},nd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function id(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ig();const t=j=>id(j);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==qi.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:m,trustedTypes:g}=e,y=l.prototype,b=Pi(y,"cloneNode"),k=Pi(y,"remove"),T=Pi(y,"nextSibling"),I=Pi(y,"childNodes"),A=Pi(y,"parentNode");if(typeof o=="function"){const j=n.createElement("template");j.content&&j.content.ownerDocument&&(n=j.content.ownerDocument)}let D,X="";const{implementation:E,createNodeIterator:P,createDocumentFragment:z,getElementsByTagName:K}=n,{importNode:me}=i;let _=nd();t.isSupported=typeof Vc=="function"&&typeof A=="function"&&E&&E.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:R,ERB_EXPR:M,TMPLIT_EXPR:te,DATA_ATTR:De,ARIA_ATTR:be,IS_SCRIPT_OR_DATA:we,ATTR_WHITESPACE:Xe,CUSTOM_ELEMENT:pt}=td;let{IS_ALLOWED_URI:Me}=td,ue=null;const w=U({},[...Yc,...zo,...Vo,...Wo,...Zc]);let V=null;const je=U({},[...Qc,...Ko,...Xc,...Qs]);let ce=Object.seal(Oo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),mt=null,vc=null;const Ei=Object.seal(Oo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let af=!0,yc=!0,of=!1,rf=!0,_i=!1,_o=!0,qn=!1,bc=!1,wc=!1,xi=!1,xo=!1,Io=!1,lf=!0,cf=!1;const K_="user-content-";let kc=!0,Os=!1,Ii={},Mt=null;const $c=U({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let df=null;const uf=U({},["audio","video","img","source","image","track"]);let Ec=null;const pf=U({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),So="http://www.w3.org/1998/Math/MathML",To="http://www.w3.org/2000/svg",Zt="http://www.w3.org/1999/xhtml";let Si=Zt,_c=!1,xc=null;const Y_=U({},[So,To,Zt],Uo);let Lo=U({},["mi","mo","mn","ms","mtext"]),Co=U({},["annotation-xml"]);const Z_=U({},["title","style","font","a","script"]);let Hs=null;const Q_=["application/xhtml+xml","text/html"],X_="text/html";let ye=null,Ti=null;const J_=n.createElement("form"),mf=function(h){return h instanceof RegExp||h instanceof Function},Ic=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ti&&Ti===h)){if((!h||typeof h!="object")&&(h={}),h=kt(h),Hs=Q_.indexOf(h.PARSER_MEDIA_TYPE)===-1?X_:h.PARSER_MEDIA_TYPE,ye=Hs==="application/xhtml+xml"?Uo:Zs,ue=ft(h,"ALLOWED_TAGS")?U({},h.ALLOWED_TAGS,ye):w,V=ft(h,"ALLOWED_ATTR")?U({},h.ALLOWED_ATTR,ye):je,xc=ft(h,"ALLOWED_NAMESPACES")?U({},h.ALLOWED_NAMESPACES,Uo):Y_,Ec=ft(h,"ADD_URI_SAFE_ATTR")?U(kt(pf),h.ADD_URI_SAFE_ATTR,ye):pf,df=ft(h,"ADD_DATA_URI_TAGS")?U(kt(uf),h.ADD_DATA_URI_TAGS,ye):uf,Mt=ft(h,"FORBID_CONTENTS")?U({},h.FORBID_CONTENTS,ye):$c,mt=ft(h,"FORBID_TAGS")?U({},h.FORBID_TAGS,ye):kt({}),vc=ft(h,"FORBID_ATTR")?U({},h.FORBID_ATTR,ye):kt({}),Ii=ft(h,"USE_PROFILES")?h.USE_PROFILES:!1,af=h.ALLOW_ARIA_ATTR!==!1,yc=h.ALLOW_DATA_ATTR!==!1,of=h.ALLOW_UNKNOWN_PROTOCOLS||!1,rf=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,_i=h.SAFE_FOR_TEMPLATES||!1,_o=h.SAFE_FOR_XML!==!1,qn=h.WHOLE_DOCUMENT||!1,xi=h.RETURN_DOM||!1,xo=h.RETURN_DOM_FRAGMENT||!1,Io=h.RETURN_TRUSTED_TYPE||!1,wc=h.FORCE_BODY||!1,lf=h.SANITIZE_DOM!==!1,cf=h.SANITIZE_NAMED_PROPS||!1,kc=h.KEEP_CONTENT!==!1,Os=h.IN_PLACE||!1,Me=h.ALLOWED_URI_REGEXP||Jc,Si=h.NAMESPACE||Zt,Lo=h.MATHML_TEXT_INTEGRATION_POINTS||Lo,Co=h.HTML_INTEGRATION_POINTS||Co,ce=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&mf(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ce.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&mf(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ce.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ce.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),_i&&(yc=!1),xo&&(xi=!0),Ii&&(ue=U({},Zc),V=[],Ii.html===!0&&(U(ue,Yc),U(V,Qc)),Ii.svg===!0&&(U(ue,zo),U(V,Ko),U(V,Qs)),Ii.svgFilters===!0&&(U(ue,Vo),U(V,Ko),U(V,Qs)),Ii.mathMl===!0&&(U(ue,Wo),U(V,Xc),U(V,Qs))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?Ei.tagCheck=h.ADD_TAGS:(ue===w&&(ue=kt(ue)),U(ue,h.ADD_TAGS,ye))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?Ei.attributeCheck=h.ADD_ATTR:(V===je&&(V=kt(V)),U(V,h.ADD_ATTR,ye))),h.ADD_URI_SAFE_ATTR&&U(Ec,h.ADD_URI_SAFE_ATTR,ye),h.FORBID_CONTENTS&&(Mt===$c&&(Mt=kt(Mt)),U(Mt,h.FORBID_CONTENTS,ye)),h.ADD_FORBID_CONTENTS&&(Mt===$c&&(Mt=kt(Mt)),U(Mt,h.ADD_FORBID_CONTENTS,ye)),kc&&(ue["#text"]=!0),qn&&U(ue,["html","head","body"]),ue.table&&(U(ue,["tbody"]),delete mt.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ri('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ri('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=h.TRUSTED_TYPES_POLICY,X=D.createHTML("")}else D===void 0&&(D=Sg(g,s)),D!==null&&typeof X=="string"&&(X=D.createHTML(""));Ne&&Ne(h),Ti=h}},ff=U({},[...zo,...Vo,...hg]),gf=U({},[...Wo,...vg]),ex=function(h){let S=A(h);(!S||!S.tagName)&&(S={namespaceURI:Si,tagName:"template"});const B=Zs(h.tagName),de=Zs(S.tagName);return xc[h.namespaceURI]?h.namespaceURI===To?S.namespaceURI===Zt?B==="svg":S.namespaceURI===So?B==="svg"&&(de==="annotation-xml"||Lo[de]):!!ff[B]:h.namespaceURI===So?S.namespaceURI===Zt?B==="math":S.namespaceURI===To?B==="math"&&Co[de]:!!gf[B]:h.namespaceURI===Zt?S.namespaceURI===To&&!Co[de]||S.namespaceURI===So&&!Lo[de]?!1:!gf[B]&&(Z_[B]||!ff[B]):!!(Hs==="application/xhtml+xml"&&xc[h.namespaceURI]):!1},jt=function(h){Mi(t.removed,{element:h});try{A(h).removeChild(h)}catch{k(h)}},Nn=function(h,S){try{Mi(t.removed,{attribute:S.getAttributeNode(h),from:S})}catch{Mi(t.removed,{attribute:null,from:S})}if(S.removeAttribute(h),h==="is")if(xi||xo)try{jt(S)}catch{}else try{S.setAttribute(h,"")}catch{}},hf=function(h){let S=null,B=null;if(wc)h="<remove></remove>"+h;else{const fe=Go(h,/^[\r\n\t ]+/);B=fe&&fe[0]}Hs==="application/xhtml+xml"&&Si===Zt&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");const de=D?D.createHTML(h):h;if(Si===Zt)try{S=new m().parseFromString(de,Hs)}catch{}if(!S||!S.documentElement){S=E.createDocument(Si,"template",null);try{S.documentElement.innerHTML=_c?X:de}catch{}}const Re=S.body||S.documentElement;return h&&B&&Re.insertBefore(n.createTextNode(B),Re.childNodes[0]||null),Si===Zt?K.call(S,qn?"html":"body")[0]:qn?S.documentElement:Re},vf=function(h){return P.call(h.ownerDocument||h,h,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Sc=function(h){return h instanceof u&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof d)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},yf=function(h){return typeof r=="function"&&h instanceof r};function Qt(j,h,S){Ys(j,B=>{B.call(t,h,S,Ti)})}const bf=function(h){let S=null;if(Qt(_.beforeSanitizeElements,h,null),Sc(h))return jt(h),!0;const B=ye(h.nodeName);if(Qt(_.uponSanitizeElement,h,{tagName:B,allowedTags:ue}),_o&&h.hasChildNodes()&&!yf(h.firstElementChild)&&Oe(/<[/\w!]/g,h.innerHTML)&&Oe(/<[/\w!]/g,h.textContent)||h.nodeType===qi.progressingInstruction||_o&&h.nodeType===qi.comment&&Oe(/<[/\w]/g,h.data))return jt(h),!0;if(!(Ei.tagCheck instanceof Function&&Ei.tagCheck(B))&&(!ue[B]||mt[B])){if(!mt[B]&&kf(B)&&(ce.tagNameCheck instanceof RegExp&&Oe(ce.tagNameCheck,B)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(B)))return!1;if(kc&&!Mt[B]){const de=A(h)||h.parentNode,Re=I(h)||h.childNodes;if(Re&&de){const fe=Re.length;for(let Je=fe-1;Je>=0;--Je){const Xt=b(Re[Je],!0);Xt.__removalCount=(h.__removalCount||0)+1,de.insertBefore(Xt,T(h))}}}return jt(h),!0}return h instanceof l&&!ex(h)||(B==="noscript"||B==="noembed"||B==="noframes")&&Oe(/<\/no(script|embed|frames)/i,h.innerHTML)?(jt(h),!0):(_i&&h.nodeType===qi.text&&(S=h.textContent,Ys([R,M,te],de=>{S=ji(S,de," ")}),h.textContent!==S&&(Mi(t.removed,{element:h.cloneNode()}),h.textContent=S)),Qt(_.afterSanitizeElements,h,null),!1)},wf=function(h,S,B){if(lf&&(S==="id"||S==="name")&&(B in n||B in J_))return!1;if(!(yc&&!vc[S]&&Oe(De,S))){if(!(af&&Oe(be,S))){if(!(Ei.attributeCheck instanceof Function&&Ei.attributeCheck(S,h))){if(!V[S]||vc[S]){if(!(kf(h)&&(ce.tagNameCheck instanceof RegExp&&Oe(ce.tagNameCheck,h)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(h))&&(ce.attributeNameCheck instanceof RegExp&&Oe(ce.attributeNameCheck,S)||ce.attributeNameCheck instanceof Function&&ce.attributeNameCheck(S,h))||S==="is"&&ce.allowCustomizedBuiltInElements&&(ce.tagNameCheck instanceof RegExp&&Oe(ce.tagNameCheck,B)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(B))))return!1}else if(!Ec[S]){if(!Oe(Me,ji(B,Xe,""))){if(!((S==="src"||S==="xlink:href"||S==="href")&&h!=="script"&&pg(B,"data:")===0&&df[h])){if(!(of&&!Oe(we,ji(B,Xe,"")))){if(B)return!1}}}}}}}return!0},kf=function(h){return h!=="annotation-xml"&&Go(h,pt)},$f=function(h){Qt(_.beforeSanitizeAttributes,h,null);const{attributes:S}=h;if(!S||Sc(h))return;const B={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:V,forceKeepAttr:void 0};let de=S.length;for(;de--;){const Re=S[de],{name:fe,namespaceURI:Je,value:Xt}=Re,Li=ye(fe),Tc=Xt;let Se=fe==="value"?Tc:mg(Tc);if(B.attrName=Li,B.attrValue=Se,B.keepAttr=!0,B.forceKeepAttr=void 0,Qt(_.uponSanitizeAttribute,h,B),Se=B.attrValue,cf&&(Li==="id"||Li==="name")&&(Nn(fe,h),Se=K_+Se),_o&&Oe(/((--!?|])>)|<\/(style|title|textarea)/i,Se)){Nn(fe,h);continue}if(Li==="attributename"&&Go(Se,"href")){Nn(fe,h);continue}if(B.forceKeepAttr)continue;if(!B.keepAttr){Nn(fe,h);continue}if(!rf&&Oe(/\/>/i,Se)){Nn(fe,h);continue}_i&&Ys([R,M,te],_f=>{Se=ji(Se,_f," ")});const Ef=ye(h.nodeName);if(!wf(Ef,Li,Se)){Nn(fe,h);continue}if(D&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!Je)switch(g.getAttributeType(Ef,Li)){case"TrustedHTML":{Se=D.createHTML(Se);break}case"TrustedScriptURL":{Se=D.createScriptURL(Se);break}}if(Se!==Tc)try{Je?h.setAttributeNS(Je,fe,Se):h.setAttribute(fe,Se),Sc(h)?jt(h):Kc(t.removed)}catch{Nn(fe,h)}}Qt(_.afterSanitizeAttributes,h,null)},tx=function j(h){let S=null;const B=vf(h);for(Qt(_.beforeSanitizeShadowDOM,h,null);S=B.nextNode();)Qt(_.uponSanitizeShadowNode,S,null),bf(S),$f(S),S.content instanceof a&&j(S.content);Qt(_.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(j){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},S=null,B=null,de=null,Re=null;if(_c=!j,_c&&(j="<!-->"),typeof j!="string"&&!yf(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw Ri("dirty is not a string, aborting")}else throw Ri("toString is not a function");if(!t.isSupported)return j;if(bc||Ic(h),t.removed=[],typeof j=="string"&&(Os=!1),Os){if(j.nodeName){const Xt=ye(j.nodeName);if(!ue[Xt]||mt[Xt])throw Ri("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof r)S=hf("<!---->"),B=S.ownerDocument.importNode(j,!0),B.nodeType===qi.element&&B.nodeName==="BODY"||B.nodeName==="HTML"?S=B:S.appendChild(B);else{if(!xi&&!_i&&!qn&&j.indexOf("<")===-1)return D&&Io?D.createHTML(j):j;if(S=hf(j),!S)return xi?null:Io?X:""}S&&wc&&jt(S.firstChild);const fe=vf(Os?j:S);for(;de=fe.nextNode();)bf(de),$f(de),de.content instanceof a&&tx(de.content);if(Os)return j;if(xi){if(xo)for(Re=z.call(S.ownerDocument);S.firstChild;)Re.appendChild(S.firstChild);else Re=S;return(V.shadowroot||V.shadowrootmode)&&(Re=me.call(i,Re,!0)),Re}let Je=qn?S.outerHTML:S.innerHTML;return qn&&ue["!doctype"]&&S.ownerDocument&&S.ownerDocument.doctype&&S.ownerDocument.doctype.name&&Oe(ed,S.ownerDocument.doctype.name)&&(Je="<!DOCTYPE "+S.ownerDocument.doctype.name+`>
`+Je),_i&&Ys([R,M,te],Xt=>{Je=ji(Je,Xt," ")}),D&&Io?D.createHTML(Je):Je},t.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ic(j),bc=!0},t.clearConfig=function(){Ti=null,bc=!1},t.isValidAttribute=function(j,h,S){Ti||Ic({});const B=ye(j),de=ye(h);return wf(B,de,S)},t.addHook=function(j,h){typeof h=="function"&&Mi(_[j],h)},t.removeHook=function(j,h){if(h!==void 0){const S=dg(_[j],h);return S===-1?void 0:ug(_[j],S,1)[0]}return Kc(_[j])},t.removeHooks=function(j){_[j]=[]},t.removeAllHooks=function(){_=nd()},t}var sd=id();const Yo="chaotic_";function Ke(e){try{return localStorage.getItem(Yo+e)}catch{return null}}function st(e,t){try{localStorage.setItem(Yo+e,t)}catch{}}function $t(e){try{localStorage.removeItem(Yo+e)}catch{}}function ad(){return Ke("token")}function Tg(e){e?st("token",e):$t("token")}function Lg(){return Ke("theme")}function Cg(e){st("theme",e)}function od(){return Ke("last_project")}function Ag(e){st("last_project",e)}function Bg(){return Ke("onboarding_complete")==="true"}function Dg(){st("onboarding_complete","true")}function Mg(){$t("onboarding_complete")}function jg(e){return e?Ke(`issues_filters_${e}`):null}function Rg(e,t){e&&(t?st(`issues_filters_${e}`,t):$t(`issues_filters_${e}`))}function rd(e){return Ke(`comment_draft_${e}`)}function Xs(e,t){t?st(`comment_draft_${e}`,t):$t(`comment_draft_${e}`)}function ld(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function Js(e){const t=Ke(`description_draft_${e}`);if(!t)return null;const n=ld(t);return n?n.draft:t}function cd(e){const t=Ke(`description_draft_${e}`);if(!t)return null;const n=ld(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function bn(e,t,n=""){t?st(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):$t(`description_draft_${e}`)}function dd(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function ud(e){var n;const t=Ke(`document_draft_${e}`);return t?((n=dd(t))==null?void 0:n.draft)??null:null}function Pg(e){const t=Ke(`document_draft_${e}`);if(!t)return null;const n=dd(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function ea(e,t,n=null){t&&(t.title||t.content||t.icon)?st(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):$t(`document_draft_${e}`)}function qg(){return{title:Ke("create_issue_title"),description:Ke("create_issue_description")}}function pd(e,t){e?st("create_issue_title",e):$t("create_issue_title"),t?st("create_issue_description",t):$t("create_issue_description")}function Ng(){$t("create_issue_title"),$t("create_issue_description")}function Og(){return Ke("doc_view_mode")}function Hg(e){st("doc_view_mode",e)}function Fg(){return Ke("approvals_explainer_dismissed")==="1"}function Ug(){st("approvals_explainer_dismissed","1")}const Gg="/api";class zg{constructor(){this.token=ad()}setToken(t){this.token=t,Tg(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s};i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(i));let o;try{o=await fetch(`${Gg}${n}`,a)}catch(l){const c=new Error("Network error - check your connection");throw c.isNetworkError=!0,c.cause=l,c}if(o.status===204)return null;let r;try{r=await o.json()}catch{const l=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${l})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let l;typeof r.detail=="string"?l=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?l=r.detail.message:l="An error occurred";const c=new Error(l);throw c.status=o.status,c.detail=r.detail,c}return r}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:a=null,skip:o=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),a&&c.set("order",a),c.set("skip",String(o)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/teams/${t}/agents`,a)}async createProjectAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/projects/${t}/agents`,a)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const v=new zg;let On=null;const Vg='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Hn=null,Ni=!1;function Zo(){Ni=!0}function Wg(){Ni=!1}function md(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function Kg(){if(Ni)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function W(){Hn=document.activeElement,Ni=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function O(){var e;Nt(),Ni=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Hn&&document.contains(Hn)&&typeof Hn.focus=="function"&&Hn.focus(),Hn=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(Vg);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function et(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function $(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),u=setTimeout(o,l);return a.addEventListener("click",()=>{clearTimeout(u),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(u),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),u=setTimeout(o,Math.max(c,500))}),i}function Qo(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=$(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function Yg(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function x(e,t){const n=Yg(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";$(`Failed to ${e}: ${n}${i}`,"error")}function Nt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),On&&(document.removeEventListener("keydown",On),On=null)}function Zg(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));Nt(),t&&et()&&md()}function Oi(e){On&&document.removeEventListener("keydown",On),On=e,e&&document.addEventListener("keydown",e)}function Hi(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(Nt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function ke(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Fe(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function tt(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ie(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function f(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function p(e){return f(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Qg(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function at(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function Et(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}function Xg(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Fn(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?Xg(i)?`<img class="${t} avatar-img" src="${p(i)}" alt="${p(n)}">`:`<div class="${t} avatar-emoji">${f(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function Xo(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${p(n)}">agent</span>`}function Un(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${p(i)}">${f(n)}</span>`}return Xo(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let ae={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const Jo=new Set;function pe(e,t){if(typeof e=="string"){const n=ae[e];ae[e]=t,fd(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=ae[i];ae[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{fd(i,s,a)})}}function ot(e){return Jo.add(e),()=>Jo.delete(e)}function fd(e,t,n){t!==n&&Jo.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const _t=()=>ae.currentUser,Gn=e=>pe("currentUser",e),L=()=>ae.currentView,ta=e=>pe("currentView",e),J=()=>ae.issues,Ye=e=>pe("issues",e),Fi=()=>ae.detailNavContext,xt=e=>pe("detailNavContext",e),gd=()=>ae.labels,na=e=>pe("labels",e),hd=()=>ae.activeFilterCategory,Jg=e=>pe("activeFilterCategory",e),vd=()=>ae.selectedIssueIndex,wn=e=>pe("selectedIssueIndex",e),eh=()=>ae.selectedDocIndex,yd=e=>pe("selectedDocIndex",e),bd=()=>ae.selectedBoardIndex,ia=e=>pe("selectedBoardIndex",e),th=()=>ae.selectedInboxIndex,sa=e=>pe("selectedInboxIndex",e),nh=()=>ae.selectedSprintIndex,wd=e=>pe("selectedSprintIndex",e),ih=()=>ae.selectedEpicIndex,er=e=>pe("selectedEpicIndex",e),sh=()=>ae.pendingGates,ah=e=>pe("pendingGates",e),ge=()=>ae.inboxEntries,Ot=e=>pe("inboxEntries",e),aa=()=>ae.inboxUnreadCount,Ui=e=>pe("inboxUnreadCount",e),oh=()=>ae.searchDebounceTimer,rh=e=>pe("searchDebounceTimer",e),lh=()=>ae.websocket,tr=e=>pe("websocket",e),C=()=>ae.currentTeam,Gi=e=>pe("currentTeam",e),Y=()=>ae.currentProject,rt=e=>pe("currentProject",e||null),$e=()=>ae.currentDetailIssue,zn=e=>pe("currentDetailIssue",e),ch=()=>ae.currentDetailSprints,kd=e=>pe("currentDetailSprints",e),nr={};function se(e){Object.assign(nr,e)}function dh(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=nr[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let $d=!1;function uh(){if(!$d){$d=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,dh);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=nr[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const ir=["backlog","todo","in_progress","in_review","done","canceled"],zi=["backlog","todo","in_progress","in_review"],Ed=["urgent","high","medium","low","no_priority"],sr=["no_priority","urgent","high","medium","low"],_d=["backlog","todo","in_progress","in_review","done"],oa="#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row";function H({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${p(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${p(r)}="${p(l)}"`).join(""):""}>${f(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${f(t)}</h3>
            <p>${f(n)}</p>
            ${a}
        </div>
    `}const q={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},xd=24,lt=new Map,Ee=new Map,Ht=new Map;let Ft=null;function ph(e){return Array.isArray(e)?[...e].map(String).sort():e}function Id(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,ph(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function ar(e,t){for(Ee.delete(e),Ee.set(e,t);Ee.size>xd;){const n=Ee.keys().next().value;Ee.delete(n)}Sd()}function Sd(){if(lt.size===0)return;const e=new Set;Ee.forEach(t=>t.ids.forEach(n=>e.add(n))),lt.forEach((t,n)=>{e.has(n)||lt.delete(n)})}function mh(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function Td(e){const t=Ee.get(e);return t?(ar(e,t),t.ids.map(n=>lt.get(n)).filter(Boolean)):null}function or(e){return lt.get(e)}function fh(e){var t;return((t=Ee.get(e))==null?void 0:t.meta)||{}}function Ld(e,t){if(!e||!t)return!1;const n=Date.parse(e),i=Date.parse(t);return Number.isNaN(n)||Number.isNaN(i)?e>t:n>i}function Cd(e){const t=lt.get(e.id);if(!Ld(t==null?void 0:t.updated_at,e.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){lt.set(e.id,{...e,description:t.description});return}lt.set(e.id,e)}}function Ad(e,t,n){if(!Array.isArray(t))return;const i=mh(t);i.forEach(Cd);const s=Ee.get(e);ar(e,{ids:i.map(a=>a.id),meta:n??(s==null?void 0:s.meta)??{}})}function gh(e,t){const n=Ee.get(e);n&&(n.meta=t)}function ra(e){e!=null&&e.id&&lt.has(e.id)&&Cd(e)}function hh(e){Ee.delete(e),Ht.forEach((t,n)=>{t===e&&Ht.delete(n)}),Ft===e&&(Ft=null),Sd()}function vh(e){lt.delete(e),Ee.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function la(e){Ft=e}function yh(){return Ft}function bh(e,t){for(Ht.delete(e),Ht.set(e,t);Ht.size>xd;)Ht.delete(Ht.keys().next().value)}function wh(e){const t=Ht.get(e);return t&&Ee.has(t)?t:null}function Bd(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function Dd(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(Bd(e[n])!==Bd(t[n]))return!1;return!0}const Md=["status","priority"],jd=["assignee_id","sprint_id","issue_type"],kh={assignee_id:"unassigned",sprint_id:"no_sprint"},$h=["scope","project_id","sort_by","order","limit"],kn=e=>(e||[]).map(t=>String(t).toLowerCase());function Eh(e,t){if(e.search||t.search||t.sort_by==="random"||$h.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of Md)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of jd)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=kn(e.label);if(!kn(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=kn(t.exclude_label);if(!kn(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function Rd(e){const t=e.label===void 0?null:kn(e.label),n=e.exclude_label===void 0?null:kn(e.exclude_label);return i=>{for(const s of Md)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of jd){if(e[s]===void 0)continue;const a=e[s]===kh[s]?null:e[s];if((i[s]??null)!==a)return!1}if(t||n){const s=kn((i.labels||[]).map(a=>a.name));if(t&&!t.some(a=>s.includes(a))||n&&n.some(a=>s.includes(a)))return!1}return!0}}function _h(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(Id(e)));let n=null,i=null;if(Ee.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let c;try{c=Object.fromEntries(JSON.parse(l))}catch{return}Eh(c,t)&&(n=r,i=l)}),!n)return null;ar(i,n);const s=Rd(t),a=n.ids.map(r=>lt.get(r)).filter(r=>r&&s(r)),o=t.limit;return{rows:a,complete:!(typeof o=="number"&&n.ids.length>=o)}}function xh(){lt.clear(),Ee.clear(),Ht.clear(),Ft=null}ot((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&xh();return}if(e!=="issues"||Ft===null||!Ee.has(Ft)||L()!=="issues")return;const i=Ee.get(Ft);Ad(Ft,J(),i.meta)});let rr=[];function Ih(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function Sh(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function ca(e,t){const n=e().map(Ih),i=t().map(Sh);rr=[...n,...i]}function Jt(e){return e&&rr.find(t=>t.id===e)||null}function en(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function lr(e,t=!1){const n=f(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${f(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function da({includeIdle:e=!1,keepId:t=null}={}){const n=rr.filter(y=>e||!y.idle||y.id===t),i=n.filter(y=>!y.is_agent),s=new Set(i.map(y=>y.id)),a=n.filter(y=>y.is_agent),o=new Set(a.map(y=>y.id)),r=(y,b)=>y.name.localeCompare(b.name),l=y=>y.registered_by_id&&o.has(y.registered_by_id),c=new Map,d=new Map;a.forEach(y=>{const[b,k]=l(y)?[c,y.registered_by_id]:[d,y.parent_user_id];b.has(k)||b.set(k,[]),b.get(k).push(y)});const u=[],m=(y,b)=>{u.push({assignee:y,indent:b}),(c.get(y.id)||[]).sort(r).forEach(T=>u.push({assignee:T,indent:2}))};return i.forEach(y=>{u.push({assignee:y,indent:!1}),(d.get(y.id)||[]).sort(r).forEach(b=>m(b,!0))}),a.filter(y=>!l(y)&&!s.has(y.parent_user_id)).sort(r).forEach(y=>m(y,!1)),u}function Vi({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;da({keepId:n}).forEach(({assignee:s,indent:a})=>{i+=`<option value="${s.id}">${lr(s,a)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function Th(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&Jt(e)&&Vi({keepId:e}),t.value=e}let It=[],cr=[],ua=-1,dr=null;const Pd=5,Lh=new Set(["done","canceled"]),qd=new Set;function Ch(){return ua}function Ah(e){ua=e;const t=e>=0?document.querySelectorAll("#my-issues-list .issue-row")[e]:null;dr=(t==null?void 0:t.dataset.issueId)??null}const Nd=[{status:"in_progress",label:"In progress"},{status:"in_review",label:"In review"},{status:"todo",label:"Todo"},{status:"backlog",label:"Backlog"},{status:"done",label:"Done"},{status:"canceled",label:"Canceled"}];function Od(e){const t=new Set(Nd.map(s=>s.status)),n=Nd.map(s=>({...s,issues:e.filter(a=>a.status===s.status)})),i=e.filter(s=>!t.has(s.status));return i.length&&n.push({status:"other",label:"Other",issues:i}),n.filter(s=>s.issues.length)}ot(e=>{e==="currentProject"&&L()==="my-issues"&&(Vn(),Wi(),Wn())});function Ze(){return It}function $n(e){It=e}let ur=0;async function Vn(){var a;const e=C(),t=_t();if(!e||!t)return;const n=++ur,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=Y();Dh();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await v.getIssues({...o,project_id:s}):r=await v.getTeamIssues(e.id,o),n!==ur)return;It=Od(r).flatMap(l=>l.issues),L()==="my-issues"&&xt(It),En()}catch(o){if(n!==ur)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=H({icon:q.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),x("load issues",o)}}async function Wn({showLoading:e=!0}={}){const t=C();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=Y();cr=await v.getTeamActivities(t.id,0,10,{projectId:i}),Bh()}catch{n&&(n.innerHTML=H({icon:q.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function Bh(){const e=document.getElementById("dashboard-activity-list");if(e){if(!cr.length){e.innerHTML=H({icon:q.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=cr.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${p(t.issue_identifier)}"><strong>${f(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${p(t.document_id)}"><strong>${s} ${f(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${f(t.document_title)}</strong>`);const i=Br(t);return`
        <div class="activity-item">
            <div class="activity-icon" aria-hidden="true">${Ar(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Dr(t)}${n}</span>
                <span class="activity-actor">by ${f(i)}</span>
                <time class="activity-time" datetime="${p(t.created_at||"")}">${at(t.created_at)}</time>
            </div>
        </div>
    `}).join("")}}function Dh(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function Hd(){Vn()}function En(){var o,r;const e=document.getElementById("my-issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=Od(It);It=t.flatMap(l=>l.issues),L()==="my-issues"&&xt(It),ua=-1;const n=document.getElementById("my-issues-count");if(n&&(n.textContent=It.length?String(It.length):""),It.length===0){e.innerHTML=H({icon:q.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}const i=document.activeElement,s=e.contains(i)?(o=i.closest(".issue-row"))==null?void 0:o.dataset.issueId:null,a=s?(r=i.dataset)==null?void 0:r.dropdownType:null;if(e.innerHTML=t.map(l=>{const c=Lh.has(l.status)&&!qd.has(l.status)&&l.issues.length>Pd,d=c?l.issues.slice(0,Pd):l.issues;return`
        <div class="dash-group" role="group" aria-labelledby="dash-group-${l.status}">
            <h4 class="dash-group-header" id="dash-group-${l.status}">
                <span class="dash-group-dot status-${l.status}" aria-hidden="true"></span>
                ${f(l.label)} <span class="dash-group-count">${l.issues.length}</span>
            </h4>
            ${d.map(u=>ti(u)).join("")}
            ${c?`<button type="button" class="dash-group-more" data-action="dash-show-all" data-status="${l.status}">Show all ${l.issues.length}</button>`:""}
        </div>`}).join(""),s){const l=[...e.querySelectorAll(".issue-row")].find(d=>d.dataset.issueId===s),c=l&&(a?l.querySelector(`[data-dropdown-type="${a}"]`):l.querySelector(".issue-title"));c==null||c.focus({preventScroll:!0})}if(dr){const l=[...e.querySelectorAll(".issue-row")],c=l.findIndex(d=>d.dataset.issueId===dr);c!==-1&&(l[c].classList.add("keyboard-selected"),ua=c)}}let pr=0;async function Wi(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++pr,n=Y(),i=ee(),s=n?i.filter(a=>a.id===n):i;if(!s.length){e.innerHTML="";return}try{const a=s.map(async r=>{try{const l=await v.getCurrentSprint(r.id);if(!l)return null;let c={};try{const d=await v.getIssues({sprint_id:l.id,project_id:r.id,limit:500});for(const u of d)c[u.status]=(c[u.status]||0)+1}catch(d){console.error(`Failed to load issue counts for sprint ${l.id}:`,d)}return{project:r,sprint:l,statusCounts:c}}catch(l){return console.error(`Failed to load current sprint for project ${r.id}:`,l),null}}),o=(await Promise.all(a)).filter(Boolean);if(t!==pr)return;Mh(o)}catch(a){if(t!==pr)return;console.error("Failed to load sprint status:",a),e.innerHTML=H({icon:q.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}function Mh(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:i,sprint:s,statusCounts:a})=>{const o=s.budget||0,r=s.points_spent||0,l=o>0?Math.min(100,Math.round(r/o*100)):0,c=o>0&&r>o,d=s.limbo?"limbo":c?"arrears":"",u=a||{},m=Object.values(u).reduce((g,y)=>g+y,0);return`
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
                                    ${n.filter(g=>u[g]).map(g=>{const y=Math.round(u[g]/m*100);return`<div class="sprint-stacked-segment status-${g}" style="width: ${y}%" title="${ke(g)}: ${u[g]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(g=>u[g]).map(g=>`<span class="sprint-count-label status-${g}">${u[g]} ${ke(g)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}se({"filter-my-issues":()=>Hd(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),Dp(t.identifier)},"retry-load-my-issues":()=>Vn(),"dash-show-all":(e,t)=>{qd.add(t.status),En()},"retry-load-sprint-status":()=>Wi()});const Fd=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Ki(e=null){const t=e||Y()||"";iu([]);const n=ee().map(o=>`
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
                        ${Le("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${gt("no_priority")}
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
                                ${Fd.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
    `,W(),ha();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=qg();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{pd(i.value,s.value)}),s.addEventListener("input",()=>{pd(i.value,s.value)}),i.focus()}function jh(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function Rh(e){const t=Fd.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function Ud(e,t){const n=ee().find(i=>i.id===t);iu([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
                        ${Le("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${gt("no_priority")}
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
    `,W(),ha(),document.getElementById("create-issue-title").focus()}async function Ph(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){$("Please enter a title","error");return}try{const d=await v.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:nu(),parent_id:e});O(),$(`Created sub-issue ${d.identifier}`,"success"),oe(e)}catch(d){x("create sub-issue",d)}}async function qh(e,t,n){var o,r;Nt();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${_d.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${p(ke(c))}">
                    ${Le(c)}
                    <span>${ke(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${sr.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${p(Fe(c))}">
                    ${gt(c)}
                    <span>${Fe(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${p(Et(c))}">
                    <span class="issue-type-badge type-${c}">${Et(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!C())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=gd(),c=!1;if(l.length===0)try{l=await v.getLabels(C().id),na(l)}catch(d){console.error("Failed to load labels:",d),c=!0}hr(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Hi(a,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=da({keepId:l});a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:u})=>{const m=en(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${p(d.id)}" data-label="${p(m)}">
                    ${Fn(d,"avatar-small")}
                    <span>${lr(d,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=li(c);a.innerHTML=`
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
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Hi(a)}function Nh(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Oh(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,Zo();const i=f(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${Le(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${gt(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${Et(t)}</span><span id="create-issue-type-label">${i}</span>`)}Nt(),s==null||s.focus()}async function Gd({keepOpen:e=!1}={}){var b,k;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((b=document.getElementById("create-issue-sprint"))==null?void 0:b.value)||null,u=(k=document.getElementById("create-issue-due-date"))==null?void 0:k.value,m=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),y=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),y&&(y.disabled=!0);try{const T=await v.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:d,label_ids:nu(),due_date:m});$(`Created ${T.identifier}`,"success"),Ng(),L()==="issues"?Tt():L()==="my-issues"&&Vn(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",Wg(),document.getElementById("create-issue-title").focus()):(O(),oe(T.id))}catch(T){x("create issue",T)}finally{g&&(g.disabled=!1),y&&(y.disabled=!1)}}async function Hh(){await Gd({keepOpen:!1})}async function Fh(){await Gd({keepOpen:!0})}se({"toggle-create-dropdown":(e,t,n)=>{qh(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Oh(t.field,t.value,t.label)},"create-issue-submit":()=>{Hh()},"create-issue-and-new":()=>{Fh()},"update-create-project":()=>{Nh()},"apply-template":e=>{Rh(e.target.value)},"toggle-create-options":()=>{jh()},"create-sub-issue-submit":(e,t)=>{Ph(t.parentId,t.projectId)}});function Yi(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&($(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(Uh(n,e.project_id),t=!0),t}function Uh(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
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
    `,W())}async function Gh(e,t){try{const n=await v.updateIssue(e,{status:"done"});O(),$(`${t} closed`,"success"),Yi(n)}catch(n){x(`close ${t}`,n)}}se({"parent-prompt-dismiss":()=>O(),"parent-prompt-close":(e,t)=>Gh(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{O(),Ud(t.parentId,t.projectId)}});function tn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function _n(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function xn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function In(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function pa(){const e=document.getElementById("group-by-select");return e?e.value:""}const zd=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],mr=["done","canceled"],zh=zi,Vh="all";function Vd(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function Kn(e=tn()){return e.length===0?"all":Vd(e,zi)?"open":Vd(e,mr)?"closed":null}function Wd(e){var t,n,i;switch(e){case"project":return Y()?1:0;case"status":{const s=Kn();return s==="all"?0:s?1:tn().length}case"priority":return _n().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return xn().length;case"exclude_labels":return In().length;default:return 0}}function fr(){let e=0;return zd.forEach(t=>{e+=Wd(t.key)}),e}function Kd(){var y,b,k,T,I,A;const e=new URLSearchParams,t=tn(),n=_n(),i=xn(),s=In(),a=(y=document.getElementById("assignee-filter"))==null?void 0:y.value,o=Y()||"",r=(b=document.getElementById("sprint-filter"))==null?void 0:b.value,l=(k=document.getElementById("issue-type-filter"))==null?void 0:k.value,c=(T=document.getElementById("group-by-select"))==null?void 0:T.value,d=(I=document.getElementById("sort-by-select"))==null?void 0:I.value,u=Kn(t);u==="all"?e.append("status",Vh):u!=="open"&&t.forEach(D=>e.append("status",D)),n.forEach(D=>e.append("priority",D)),i.forEach(D=>e.append("label",D)),s.forEach(D=>e.append("exclude_label",D)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const m=e.toString(),g=m?`/issues?${m}`:"/issues";history.replaceState({view:"issues"},"",g),Rg((A=C())==null?void 0:A.id,m)}function Wh(e){var b;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(k=>t.has(k))){const k=jg((b=C())==null?void 0:b.id);if(k){t=new URLSearchParams(k);const T=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",T)}}const s=t.getAll("status"),a=document.getElementById("status-filter-dropdown");if(a&&(s.length>0||!a.dataset.statusApplied)){const k=s.length>0?s:zh;a.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=k.includes(I.value)}),a.dataset.statusApplied="true",Yd()}const o=t.getAll("priority");if(o.length>0){const k=document.getElementById("priority-filter-dropdown");k&&(k.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=o.includes(I.value)}),Zd())}const r=t.get("assignee");r&&Th(r);const l=t.get("project");l&&(e(!0),rt(l),e(!1));const c=t.get("sprint");if(c){const k=document.getElementById("sprint-filter");k&&(k.value=c)}const d=t.get("issue_type");if(d){const k=document.getElementById("issue-type-filter");k&&(k.value=d)}const u=t.getAll("label");if(u.length>0){const k=document.getElementById("label-filter-dropdown");k&&(k.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=u.includes(I.value)}),ma())}const m=t.getAll("exclude_label");if(m.length>0){const k=document.getElementById("exclude-label-filter-dropdown");k&&(k.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=m.includes(I.value)}),fa())}const g=t.get("groupBy");if(g){const k=document.getElementById("group-by-select");k&&(k.value=g)}const y=t.get("sort");if(y){const k=document.getElementById("sort-by-select");k&&(k.value=y)}}function Yd(){const e=tn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=Kn(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=ke(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function Zd(){const e=_n(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Fe(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function ma(){var i,s;const e=xn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function fa(){var i,s;const e=In(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function Qd(){if(!C())return;let e;try{e=await v.getLabels(C().id)}catch(t){console.error("Failed to load labels for filter:",t);return}Xd("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),Xd("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function Xd(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${ie(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${f(r.name)}</span>
                </span>
            `,a.appendChild(l)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}const Jd=ir,Kh=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let St=[],eu=Promise.resolve();const Yh={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};function ga(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const Zh={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function tu(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function Yn(){return!!document.querySelector(".inline-dropdown")}function nu(){return St}function iu(e){St=e}async function gr(e,t,n,i){var u,m,g,y;e.preventDefault(),Nt();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Jd.map((b,k)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="status" data-value="${b}">
                    ${Le(b)}
                    <span>${ke(b)}</span>
                    <span class="dropdown-shortcut">${k+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${sr.map((b,k)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="priority" data-value="${b}">
                    ${gt(b)}
                    <span>${Fe(b)}</span>
                    <span class="dropdown-shortcut">${k}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Kh.map(b=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="issue_type" data-value="${b}">
                    <span class="issue-type-badge type-${b}">${Et(b)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const b=$e(),k=J().find(I=>I.id===n)||Ze().find(I=>I.id===n)||((b==null?void 0:b.id)===n?b:null),T=da({keepId:(k==null?void 0:k.assignee_id)||null});o.innerHTML=`
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
                    ${Fn(I,"avatar-small")}
                    <span>${lr(I,A)}</span>
                    ${D<9?`<span class="dropdown-shortcut">${D+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const b=document.querySelector(`.issue-row[data-issue-id="${n}"]`),k=(b==null?void 0:b.dataset.projectId)||((u=$e())==null?void 0:u.project_id),T=li(k);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${T.map((I,A)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="estimate" data-value="${I.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${I.label}</span>
                    ${A<9?`<span class="dropdown-shortcut">${A}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const b=J(),k=Ze(),T=$e(),I=b.find(R=>R.id===n)||k.find(R=>R.id===n)||T,A=new Set(((I==null?void 0:I.labels)||[]).map(R=>R.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const D=o.getBoundingClientRect();let X=a.bottom+4,E=a.left;E+D.width>window.innerWidth-8&&(E=a.right-D.width),X+D.height>window.innerHeight-8&&(X=a.top-D.height-4),o.style.top=`${X}px`,o.style.left=`${Math.max(8,E)}px`,Hi(o,{multiSelect:!0});let P=[];const z=C();if(z)try{P=await v.getLabels(z.id)}catch(R){console.error("Failed to load labels:",R)}if(!o.parentNode)return;au(o,n,P,A);const K=o.getBoundingClientRect();let me=a.bottom+4,_=a.left;_+K.width>window.innerWidth-8&&(_=a.right-K.width),me+K.height>window.innerHeight-8&&(me=a.top-K.height-4),o.style.top=`${me}px`,o.style.left=`${Math.max(8,_)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const b=J(),k=Ze(),T=$e(),I=b.find(M=>M.id===n)||k.find(M=>M.id===n)||T,A=(I==null?void 0:I.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const D=o.getBoundingClientRect();let X=a.bottom+4,E=a.left;E+D.width>window.innerWidth-8&&(E=a.right-D.width),X+D.height>window.innerHeight-8&&(X=a.top-D.height-4),o.style.top=`${X}px`,o.style.left=`${Math.max(8,E)}px`,Hi(o);let P=[];if(A)try{P=await v.getSprints(A),Vb(A,P)}catch(M){console.error("Failed to load sprints:",M)}if(!o.parentNode)return;const z=P.filter(M=>M.status!=="completed"||M.id===(I==null?void 0:I.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${z.map((M,te)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="${p(M.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${f(M.name)}${M.status==="active"?" (Active)":""}</span>
                    ${te<9?`<span class="dropdown-shortcut">${te+1}</span>`:""}
                </button>
            `).join("")}
        `;const K=o.getBoundingClientRect();let me=a.bottom+4,_=a.left;_+K.width>window.innerWidth-8&&(_=a.right-K.width),me+K.height>window.innerHeight-8&&(me=a.top-K.height-4),o.style.top=`${me}px`,o.style.left=`${Math.max(8,_)}px`,o.classList.remove("dropdown-positioning");const R=M=>{const te=M.key;if(te==="Escape"||te==="Tab"){Nt(),document.removeEventListener("keydown",R),Oi(null);return}if(tu(M,o))return;const De=parseInt(te);if(isNaN(De))return;const be=o.querySelectorAll(".dropdown-option");let we=!1;De===0?(Zn(n,"sprint_id",null),we=!0):De>=1&&De<be.length&&(be[De].click(),we=!0),we&&(document.removeEventListener("keydown",R),Oi(null))};Oi(R),document.addEventListener("keydown",R),(g=o.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let l=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),l+r.height>window.innerHeight-8&&(l=a.top-r.height-4),o.style.top=`${l}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const d=b=>{const k=b.key;if(k==="Escape"||k==="Tab"){Nt(),document.removeEventListener("keydown",d);return}if(tu(b,o))return;const T=parseInt(k);if(isNaN(T))return;let I=!1;if(t==="status"&&T>=1&&T<=6)Zn(n,"status",Jd[T-1]),I=!0;else if(t==="priority"&&T>=0&&T<=4)Zn(n,"priority",sr[T]),I=!0;else if(t==="estimate"){const A=$e(),D=li(A==null?void 0:A.project_id);T>=0&&T<D.length&&(Zn(n,"estimate",D[T].value),I=!0)}I&&(document.removeEventListener("keydown",d),Oi(null))};Oi(d),document.addEventListener("keydown",d),(y=o.querySelector(".dropdown-option[data-action]"))==null||y.focus(),Hi(o)}function Qh(e,t,n,i){gr(e,t,n,i)}function Xh(e,t,n){eu=eu.then(()=>su(e,t,n))}async function su(e,t,n){const i=J(),s=Ze(),a=$e(),o=i.find(d=>d.id===e)||s.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const d=await v.updateIssue(e,{label_ids:c}),u=d.labels||[],m=I=>({...I,labels:u,updated_at:d.updated_at??I.updated_at}),g=J();g.some(I=>I.id===e)&&Ye(g.map(I=>I.id===e?m(I):I));const y=Ze();y.some(I=>I.id===e)&&$n(y.map(I=>I.id===e?m(I):I));const b=$e();(b==null?void 0:b.id)===e&&zn(m(b));const k=ga(e);if(k&&k.parentNode){const I=J().find(A=>A.id===e)||Ze().find(A=>A.id===e);I&&(k.outerHTML=ti(I))}const T=document.querySelector(".property-labels-btn");T&&(T.innerHTML=u.length>0?u.map(I=>`
                    <span class="issue-label" style="background: ${ie(I.color)}20; color: ${ie(I.color)}">${f(I.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(x("update labels",d),n){const u=l>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function au(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${p(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${p(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${p(t)}" data-label-id="${p(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${ie(s.color)}20; color: ${ie(s.color)}">${f(s.name)}</span>
                </button>
            `}).join("")}
    `}async function ou(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=C();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await v.createLabel(i.id,{name:s}),o=await v.getLabels(i.id);na(o),a!=null&&a.id&&await su(e,a.id,null);const r=J(),l=Ze(),c=$e(),d=r.find(m=>m.id===e)||l.find(m=>m.id===e)||c,u=new Set(((d==null?void 0:d.labels)||[]).map(m=>m.id));t&&au(t,e,o,u),n.value=""}catch(a){x("create label",a)}finally{n.disabled=!1,n.focus()}}}function ha(){const e=document.getElementById("create-issue-labels-label");e&&(St.length===0?e.textContent="Labels":e.textContent=`Labels (${St.length})`)}function hr(e,{failed:t=!1}={}){const n=gd();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=St.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${p(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${ie(i.color)}20; color: ${ie(i.color)}">${f(i.name)}</span>
                </button>
            `}).join("")}
    `}function Jh(e){const t=St.indexOf(e);t>=0?St.splice(t,1):St.push(e),Zo(),ha();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&hr(n)}async function ru(){const e=C();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await v.createLabel(e.id,{name:i}),a=await v.getLabels(e.id);na(a),s!=null&&s.id&&!St.includes(s.id)&&(St.push(s.id),Zo()),ha(),t&&hr(t),n.value=""}catch(s){x("create label",s)}finally{n.disabled=!1,n.focus()}}}async function Zn(e,t,n){var r;Nt();const i=iv(e,t,n),s=ov(e,t),a=(r=or(e))==null?void 0:r[t],o=cu(e,t,()=>n);o&&vr(e,t,{focus:!0});try{const l={};l[t]=n;const c=await v.updateIssue(e,l);if(!c||!c.id)throw new Error("Invalid response from server");if(Yi(c),lu(e,t,i)){const d={...c,...av(e,t)};rv(e,{issue:d,myIssue:d,detail:d}),ra(d),vr(e,t,{focus:!o})}}catch(l){if(x("update issue",l),lu(e,t,i)){cu(e,t,(d,u)=>d[t]===n?s[u]:d[t]);const c=or(e);c&&c[t]===n&&ra({...c,[t]:a}),vr(e,t,{focus:!1})}return}finally{sv(e,t,i)}if($("Issue updated","success"),t==="status")try{const l=Y();if(l){const d=(await v.getSprints(l)).find(u=>u.status==="active");yr(d||null)}}catch{}}const ev=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),nn=new Map;function tv(e){const t=e&&nn.get(e.id);if(!(t!=null&&t.size))return e;const n={...e};return t.forEach((i,s)=>{n[s]=i.value}),n}let nv=0;function iv(e,t,n){const i=++nv;return nn.has(e)||nn.set(e,new Map),nn.get(e).set(t,{seq:i,value:n}),i}function lu(e,t,n){var i,s;return((s=(i=nn.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function sv(e,t,n){var s;const i=nn.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&nn.delete(e))}function av(e,t){var i;const n={};return(i=nn.get(e))==null||i.forEach((s,a)=>{a!==t&&(n[a]=s.value)}),n}function ov(e,t){var i,s;const n=$e();return{issue:(i=J().find(a=>a.id===e))==null?void 0:i[t],myIssue:(s=Ze().find(a=>a.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0}}function cu(e,t,n){const i=(l,c)=>({...l,[t]:n(l,c)});let s=!1;const a=J();a.some(l=>l.id===e)&&(s=!0,Ye(a.map(l=>l.id===e?i(l,"issue"):l)));const o=Ze();o.some(l=>l.id===e)&&(s=!0,$n(o.map(l=>l.id===e?i(l,"myIssue"):l)));const r=$e();return(r==null?void 0:r.id)===e&&(s=!0,zn(i(r,"detail"))),s}function rv(e,t){var s;const n=J();t.issue&&n.some(a=>a.id===e)&&Ye(n.map(a=>a.id===e?t.issue:a));const i=Ze();t.myIssue&&i.some(a=>a.id===e)&&$n(i.map(a=>a.id===e?t.myIssue:a)),t.detail&&((s=$e())==null?void 0:s.id)===e&&zn(t.detail)}function lv(e){return e==="estimate"||Yh[pa()]===e}function cv(e,t,n,{focus:i}){var d;const s=ga(e);if(!s||!s.parentNode||!n)return;const a=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&lv(t)&&J().some(u=>u.id===e))ct();else if(t==="status"&&s.closest("#my-issues-list"))En();else{const u=s.classList.contains("keyboard-selected");s.outerHTML=ti(n),u&&((d=ga(e))==null||d.classList.add("keyboard-selected"))}if(!i&&!a)return;const r=ga(e),l=Zh[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus({preventScroll:!0})}function vr(e,t,{focus:n}){const i=J().find(a=>a.id===e)||Ze().find(a=>a.id===e);i&&ra(i),cv(e,t,i,{focus:n});const s=$e();(s==null?void 0:s.id)===e&&ev.has(t)&&dv(t,s)}function dv(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".detail-sidebar");if(!i)return;let s=e;e==="assignee_id"&&(s="assignee"),e==="sprint_id"&&(s="sprint"),e==="issue_type"&&(s="type");const a=i.querySelectorAll(".property-row");let o=null;for(const l of a){const c=l.querySelector(".property-label");if(c&&c.textContent.toLowerCase()===s.toLowerCase()){o=l;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${Le(t.status)}
            <span>${ke(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${gt(t.priority)}
            <span>${Fe(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${Et(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const l=t.assignee_id?Jt(t.assignee_id):null,c=l?en(l):null;r.innerHTML=c?`${Fn(l,"avatar-small")}<span>${f(c)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const l=ch(),c=t.sprint_id&&l?l.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${c?f(c.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${Ya(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500),r==null||r.focus()}}se({"update-issue-field":(e,t)=>{e.type==="keydown"&&e.preventDefault();const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?Zn(t.issueId,i,n==="null"?null:Number(n)):Zn(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{e.type==="keydown"&&e.preventDefault(),Xh(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{ou(t.issueId)},"toggle-create-issue-label":(e,t)=>{Jh(t.labelId)},"create-label-for-create-issue":()=>{ru()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),ou(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),ru())}});function va(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",du)},0))}function du(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",du))}function uv(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Qn)):(e.classList.remove("hidden"),e.classList.remove("show-options"),Te(),Ue(hd()),setTimeout(()=>{document.addEventListener("click",Qn)},0))}function pv(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Qn)):(e.classList.remove("hidden"),$v(),setTimeout(()=>{document.addEventListener("click",Qn)},0))}function Qn(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Qn))}function Sn(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Qn)}function Te(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=Y();e.innerHTML=zd.map(n=>{const i=Wd(n.key),s=hd()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${p(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function Ue(e){Jg(e),Te();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":fv(t);break;case"status":gv(t);break;case"priority":hv(t);break;case"type":vv(t);break;case"assignee":yv(t);break;case"sprint":bv(t);break;case"labels":wv(t);break;case"exclude_labels":kv(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function mv(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),Te()}function fv(e){const t=Y()||"",n=ee()||[];let i=`
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
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ie(s.color)};"></span>
                <span class="filter-option-label">${f(s.name)}</span>
            </label>
        `}),e.innerHTML=i}function gv(e){const t=tn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=Kn(t);let s=`
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
        `}),e.innerHTML=s}function hv(e){const t=_n(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function vv(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${p(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function yv(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",i=Mn()||[];let s=`
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
                <span class="filter-option-label">${f(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=s}function bv(e){if(!Y()){e.innerHTML=`
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
        `}),e.innerHTML=a}function wv(e){const t=xn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ie(d)};"></span>
                    <span class="filter-option-label">${f(c)}</span>
                </label>
            `}),e.innerHTML=s}function kv(e){const t=In(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ie(d)};"></span>
                    <span class="filter-option-label">${f(c)}</span>
                </label>
            `}),e.innerHTML=s}function $v(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function Ge(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=Y();if(n){const m=(ee()||[]).find(g=>g.id===n);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearAction:"clear-project-filter"})}const i=tn();if(i.length>0){const u=Kn(i),m=u==="open"?"Open":u==="closed"?"Closed":i.map(g=>ke(g)).join(", ");t.push({category:"status",label:"Status",value:m,clearAction:"clear-status-filter-new"})}const s=_n();if(s.length>0){const u=s.map(m=>Fe(m)).join(", ");t.push({category:"priority",label:"Priority",value:u,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const u=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:u?u.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let u;if(o.value==="me")u="Me";else if(o.value==="unassigned")u="Unassigned";else{const g=(Mn()||[]).find(y=>y.user_id===o.value);u=(g==null?void 0:g.name)||(g==null?void 0:g.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:u,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const u=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(u==null?void 0:u.text)||r.value,clearAction:"clear-sprint-filter"})}const l=xn();if(l.length>0){const u=document.getElementById("label-filter-dropdown"),m=l.map(g=>{var k;const y=u==null?void 0:u.querySelector(`input[value="${g}"]`),b=(k=y==null?void 0:y.closest("label"))==null?void 0:k.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearAction:"clear-label-filter-new"})}const c=In();if(c.length>0){const u=document.getElementById("exclude-label-filter-dropdown"),m=c.map(g=>{var k;const y=u==null?void 0:u.querySelector(`input[value="${g}"]`),b=(k=y==null?void 0:y.closest("label"))==null?void 0:k.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:m,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(u=>`
        <span class="filter-chip" title="${p(u.label)}: ${p(u.value)}">
            <span class="filter-chip-label">${u.label}:</span>
            <span class="filter-chip-value">${f(u.value)}</span>
            <button class="filter-chip-remove" data-action="${u.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=d}function ze(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=fr();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function uu(){const e=document.getElementById("sprint-filter");if(!e)return;const t=Y(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",yr(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await v.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${f(a.name)})</option>`),rp(t,a==null?void 0:a.id),yr(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${f(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function yr(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${f(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${f(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function Ev(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let pu=!1;ot(e=>{if(e!=="currentProject"||L()!=="issues"||pu)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([uu(),Qd()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),ma(),fa(),nt(),Ge(),ze()}).catch(n=>{console.error("Failed to update filters on project switch:",n),nt(),Ge(),ze()})});function _v(){Wh(e=>{pu=e})}function ya(){Yd(),nt(),Ge(),ze()}function ba(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),ya()}function br(){Zd(),nt(),Ge(),ze()}function wr(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),br()}function kr(){ma(),nt(),Ge(),ze()}function wa(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),kr()}function $r(){fa(),nt(),Ge(),ze()}function ka(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),$r()}function xv(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function mu(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${xv(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let Zi=0;function Qi(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function fu(){var t,n,i,s,a,o;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=C())==null?void 0:t.id)||"",project:Y()||"",status:[...tn()].sort(),priority:[..._n()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim())||""})}let sn=null;function Iv(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function Xn(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function gu(e,t){Xn(!1),la(e),Ye(t),L()==="issues"&&xt(t),ct(),sn=e,Qi(fh(e).hiddenClosed||0)}function Sv(e,t,{loading:n}){la(null),Ye(t),L()==="issues"&&xt(t),ct(),Xn(n),sn=e,Qi(0)}function hu(){la(null),sn=null,Xn(!1),Ev(),Qi(0)}function Tv(){const e=document.getElementById("issues-list");Qi(0),e!=null&&e.querySelector(".issue-row")?Xn(!0):hu()}function Lv(){const e=wh(fu()),t=e?Td(e):null;return t?(wn(-1),gu(e,t),!0):(hu(),!1)}function Cv(e,t,n,i=()=>!0){if(!Array.isArray(t))return t;const s=new Map(e.map(c=>[c.id,c])),a=new Set(t.map(c=>c.id)),o=new Set(t.filter(c=>!n.has(c.id)).map(c=>c.title)),r=e.filter(c=>!n.has(c.id)&&!a.has(c.id)&&!(c._isOptimistic&&o.has(c.title))&&(c._isOptimistic||i(c))),l=[];for(const c of t){const d=s.get(c.id);if(!d&&n.has(c.id))continue;const u=d&&Ld(d.updated_at,c.updated_at)?d:c;l.push(tv(u))}return r.length?[...r,...l]:l}async function Tt(){var k,T,I,A,D,X,E;wn(-1),Iv();const e=++Zi;if(!C())return;const t=Y()||"",n=tn(),i=_n(),s=(k=document.getElementById("assignee-filter"))==null?void 0:k.value,a=(I=(T=document.getElementById("issue-search"))==null?void 0:T.value)==null?void 0:I.trim();if(!t&&ee().length===0){sn=null,document.getElementById("issues-list").innerHTML=H({icon:q.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const o=fu(),r={limit:1e3},l=((A=document.getElementById("sort-by-select"))==null?void 0:A.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(D=_t())==null?void 0:D.id:r.assignee_id=s);const u=(X=document.getElementById("sprint-filter"))==null?void 0:X.value;if(u)if(u==="current"){if(t){const P=Wb(t);if(P!==void 0)P&&(r.sprint_id=P);else try{const K=(await v.getSprints(t)).find(me=>me.status==="active");rp(t,K==null?void 0:K.id),K&&(r.sprint_id=K.id)}catch(z){console.error("Failed to resolve current sprint:",z)}}}else r.sprint_id=u;const m=(E=document.getElementById("issue-type-filter"))==null?void 0:E.value;m&&(r.issue_type=m),a&&a.length>=1?r.search=a:r.fields="list";let g=!1,y=!1,b=null;try{const P=mu(xn(),"label-filter-dropdown");P.length>0&&(r.label=P,r.label_match="any");const z=mu(In(),"exclude-label-filter-dropdown");z.length>0&&(r.exclude_label=z),t&&(r.project_id=t);const K=t||`team:${C().id}`;b=Id({...r,scope:K});const me=Td(b);if(me)g=!0,sn===b&&yh()===b&&Dd(J(),me)||gu(b,me);else{const w=_h({...r,scope:K});w&&(w.complete||w.rows.length>0)?(y=!0,Sv(b,w.rows,{loading:!w.complete})):Tv()}const _=w=>t?v.getIssues(w):ee().length>0?v.getTeamIssues(C().id,w):Promise.resolve(void 0),R=r.search&&Kn(n)==="open"?_({...r,status:mr}).then(w=>Array.isArray(w)?w.length:0).catch(w=>(console.error("Failed to count closed search matches:",w),0)):Promise.resolve(0),M=new Set(J().map(w=>w.id)),te=await _(r);if(Ad(b,te),e!==Zi)return;bh(o,b);const De=(g||y)&&sn===b,be=De?Cv(J(),te,M,Rd(r)):te,we=De&&Dd(J(),be);la(b),Ye(be),L()==="issues"&&xt(Array.isArray(be)?be.filter(w=>!w._isOptimistic):be);const Xe=[...new Set(be.map(w=>w.project_id).filter(Boolean))],pt=Object.keys(Fa()).length;if(await op(Xe),e!==Zi)return;const Me=Object.keys(Fa()).length!==pt;(!we||Me)&&ct(),sn=b,Xn(!1);const ue=await R;if(gh(b,{hiddenClosed:ue}),e!==Zi)return;Qi(ue)}catch(P){if(e!==Zi)return;Xn(!1);const z=(P==null?void 0:P.status)===403||(P==null?void 0:P.status)===404;if(g&&!z){x("refresh issues",P);return}z&&b&&hh(b),sn=null;const K=document.getElementById("issues-list");K&&(K.innerHTML=H({icon:q.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),x("load issues",P)}}function Av(){clearTimeout(oh()),rh(setTimeout(()=>{Tt()},300))}function nt(){Kd(),Tt()}async function vu(){if(Kd(),pa()==="sprint"){const e=J(),t=[...new Set(e.map(n=>n.project_id))];await op(t)}ct()}function Bv(){Ge(),ze()}function yu(e){rt(e),Te(),Ue("project"),Sn()}function Dv(){yu("")}function Mv(e){const t=e==="open"?zi:e==="closed"?mr:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),ya(),Te(),Ue("status")}function jv(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,ya()),Te(),Ue("status")}function Rv(){ba(),Te(),Ue("status"),Ge(),ze()}function Pv(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,br()),Te(),Ue("priority")}function qv(){wr(),Te(),Ue("priority"),Ge(),ze()}function bu(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,nt()),Te(),Ue("type"),Ge(),ze(),Sn()}function Nv(){bu("")}function wu(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,nt()),Te(),Ue("assignee"),Ge(),ze(),Sn()}function Ov(){wu("")}function ku(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,nt()),Te(),Ue("sprint"),Ge(),ze(),Sn()}function Hv(){ku("")}function Fv(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,kr()),Te(),Ue("labels")}function Uv(){wa(),Te(),Ue("labels"),Ge(),ze()}function Gv(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,$r()),Te(),Ue("exclude_labels")}function zv(){ka(),Te(),Ue("exclude_labels"),Ge(),ze()}function Vv(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Tt()),Sn()}function Wv(e){const t=document.getElementById("group-by-select");t&&(t.value=e,vu()),Sn()}function Kv(){rt(null),ba(),wr();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),wa(),ka(),nt(),Ge(),ze()}se({"update-label-filter":()=>kr(),"clear-label-filter":()=>wa(),"update-exclude-label-filter":()=>$r(),"clear-exclude-label-filter":()=>ka(),"show-filter-category":(e,t)=>{var n,i;Ue(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{mv();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>yu(t.value),"clear-project-filter":()=>Dv(),"clear-status-filter-new":()=>Rv(),"set-status-preset":(e,t)=>Mv(t.value),"show-all-statuses":()=>ba(),"toggle-status-option":(e,t)=>jv(t.filterValue,e),"clear-priority-filter-new":()=>qv(),"toggle-priority-option":(e,t)=>Pv(t.filterValue,e),"set-type-filter":(e,t)=>bu(t.value),"clear-type-filter":()=>Nv(),"set-assignee-filter":(e,t)=>wu(t.value),"clear-assignee-filter":()=>Ov(),"set-sprint-filter":(e,t)=>ku(t.value),"clear-sprint-filter":()=>Hv(),"clear-label-filter-new":()=>Uv(),"toggle-label-option":(e,t)=>Fv(t.filterValue,e),"clear-exclude-label-filter-new":()=>zv(),"toggle-exclude-label-option":(e,t)=>Gv(t.filterValue,e),"set-sort":(e,t)=>Vv(t.value),"set-group-by":(e,t)=>Wv(t.value),"clear-all-filters":()=>Kv(),"retry-load-issues":()=>Tt()});const $u=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function an(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Jn(e){const t=an(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const Yv=60,Zv=150;let Ve=[],Xi=1/0,on=null,$a=null,Ji=null;const Ea=new Map;let ei=null,_a=[],es=null;const Eu=e=>{var t;return`${((t=_t())==null?void 0:t.id)??""}|${e}`},Qv=24;function Xv(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(Yv,Math.ceil((e+2*t)/Qv))}function rn(e,t){if(e!==null&&(ei!=null&&ei.has(String(e))))return _a.push({groupKey:e,ids:t.map(i=>i.id)}),"";const n=t.slice(0,Math.max(0,Xi));return Xi-=n.length,n.length<t.length&&Ve.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>ti(i)).join("")}function _u(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function xu(){clearTimeout(on),on=null,_r++,Ve=[],$a=null,es=null,Ji=null}function Er(e=1/0){if(Ve.length===0)return;const t=document.getElementById("issues-list");if(!t||!(Ji!=null&&Ji.isConnected)){xu();return}const n=new Map(J().map(s=>[s.id,s]));let i=e;for(;Ve.length>0&&i>0;){const s=Ve[0],a=s.ids.slice(0,i),o=_u(t,s.groupKey),r=a.map(l=>n.get(l)).filter(Boolean).map(l=>ti(l)).join("");o==null||o.insertAdjacentHTML("beforeend",r),i-=a.length,a.length===s.ids.length?Ve.shift():s.ids=s.ids.slice(a.length)}if(es){const s=es;xa(t,s.issueId)&&(es=null,Cu(t,s))}if(Ve.length===0){clearTimeout(on),on=null;const s=$a;$a=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&Iu(s)}}const Jv=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{on=setTimeout(e,0)}):on=setTimeout(e,16);let _r=0;function ey(){if(clearTimeout(on),Ve.length===0)return;const e=++_r;Jv(function t(){e===_r&&(Er(Zv),Ve.length>0&&(on=setTimeout(t,0)))})}function ct(){var d,u;const e=document.getElementById("issues-list");if(!e)return;const t=e.querySelector(".issue-row.keyboard-selected"),n=t==null?void 0:t.dataset.issueId,i=dy(e),s=m=>{var g;return((g=m==null?void 0:m.closest(".issue-group"))==null?void 0:g.dataset.group)??null},a=[[n,s(t)],[i==null?void 0:i.issueId,s(i==null?void 0:i.row)]];e.classList.add("issue-list-linear"),xu(),Xi=Xv();const o=J();if(o.length===0){const m=(u=(d=document.getElementById("issue-search"))==null?void 0:d.value)==null?void 0:u.trim(),g=fr()>0,y=m&&m.length>=2;if(g||y){const b=fr(),k=[];y&&k.push(`search "${m}"`),g&&k.push(`${b} active filter${b>1?"s":""}`),e.innerHTML=H({icon:q.issues,heading:"No matching issues",description:`No issues match your ${k.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=H({icon:q.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});wn(-1),Xi=1/0;return}const r=pa();ei=Ea.get(Eu(r))||null,_a=[],r==="status"?ty(e,o):r==="priority"?ny(e,o):r==="type"?iy(e,o):r==="assignee"?sy(e,o):r==="sprint"?ay(e,o):e.innerHTML=Jn(o)+rn(null,o),Xi=1/0,Ji=e.firstElementChild,Ve.push(..._a),_a=[];const l=ei;ei=null,l!=null&&l.size&&(e.querySelectorAll(".issue-group").forEach(m=>{l.has(m.dataset.group)&&Tu(m,!0)}),a.forEach(([m,g])=>{m&&cy(m,e,g)})),i&&(xa(e,i.issueId)?Cu(e,i):Ve.length>0&&(es=i));const c=!!n&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),m=>m.dataset.issueId===n);n&&Ve.length>0&&!c?$a=n:Iu(n),ey()}function Iu(e){const t=vd();if(t<0)return;const n=document.querySelectorAll(oa);if(n.length===0){wn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),wn(i),n[i].classList.add("keyboard-selected")}function ty(e,t){const n={};ir.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=Jn(t);ir.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Le(s)}</span>
                    <span class="group-title">${ke(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${an(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${rn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function ny(e,t){const n={};Ed.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=Jn(t);Ed.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${gt(s)}</span>
                    <span class="group-title">${Fe(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${an(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${rn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function iy(e,t){const n={};$u.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=Jn(t);$u.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${Et(s)}</span></span>
                    <span class="group-title">${Et(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${an(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${rn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function sy(e,t){const n={},i="__unassigned__";n[i]=[];const s=da({includeIdle:!0});s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=Jn(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${an(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${rn(i,n[i])}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=en(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${p(o.id)}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${p(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Fn(o,"avatar-small")}</span>
                    <span class="group-title">${f(l)}${f(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${an(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${rn(o.id,r)}
                </div>
            </div>
        `}),e.innerHTML=a}function ay(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const a={active:0,planned:1,completed:2},o=Fa();s.sort((l,c)=>{const d=o[l],u=o[c],m=d?a[d.status]??3:3,g=u?a[u.status]??3:3;return m-g});let r=Jn(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=o[l],u=d?d.name:l,m=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${g}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${f(u)}${m}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${an(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${rn(g,c)}
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
                    <span class="group-points">${an(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${rn(n,i[n])}
                </div>
            </div>
        `),e.innerHTML=r}function Su(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-group"),n=>n.dataset.group===String(t))||null}function xa(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-row"),n=>n.dataset.issueId===t)||null}function oy(e,t){const n=_u(e,t);if(!n)return;const i=new Map(J().map(s=>[s.id,s]));Ve=Ve.filter(s=>{if(String(s.groupKey)!==String(t))return!0;const a=s.ids.map(o=>i.get(o)).filter(Boolean).map(o=>ti(o)).join("");return n.insertAdjacentHTML("beforeend",a),!1})}function Tu(e,t){var n;e.classList.toggle("collapsed",t),(n=e.querySelector(".issue-group-header"))==null||n.setAttribute("aria-expanded",String(!t))}function ry(e,t){const n=Array.from(document.querySelectorAll(oa)),i=e.querySelector(".issue-row.keyboard-selected");if(!i)return;let s=n.indexOf(i);s<0&&(i.classList.remove("keyboard-selected"),s=n.findIndex(a=>t.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING&&!t.contains(a)),s<0&&(s=n.length-1),s>=0&&n[s].classList.add("keyboard-selected")),wn(s)}function Lu(e,t,n){Tu(t,n);const i=Eu(pa());Ea.has(i)||Ea.set(i,new Set);const s=Ea.get(i);n?s.add(t.dataset.group):(s.delete(t.dataset.group),oy(e,t.dataset.group)),ry(e,t)}function ly(e){const t=document.getElementById("issues-list"),n=t&&Su(t,e);n&&Lu(t,n,!n.classList.contains("collapsed"))}function cy(e,t=document.getElementById("issues-list"),n=void 0){var a;if(!e||!t)return;const i=Ve.find(o=>o.ids.includes(e)),s=i?i.groupKey===null?null:Su(t,i.groupKey):(a=xa(t,e))==null?void 0:a.closest(".issue-group");s!=null&&s.classList.contains("collapsed")&&(n!==void 0&&s.dataset.group===n||Lu(t,s,!1))}function dy(e){var i;const t=document.activeElement;if(!t||t===e||!e.contains(t))return null;const n=t.closest(".issue-row");return n!=null&&n.dataset.issueId?{issueId:n.dataset.issueId,row:n,dropdownType:((i=t.dataset)==null?void 0:i.dropdownType)||null,isTitle:t.classList.contains("issue-title")}:null}function Cu(e,{issueId:t,dropdownType:n,isTitle:i}){if(e.contains(document.activeElement))return;const s=xa(e,t);if(!s)return;const a=n?s.querySelector(`[data-dropdown-type="${n}"]`):i?s.querySelector(".issue-title"):s.querySelector("a[href], button");a==null||a.focus({preventScroll:!0})}function Au(e,t){if(!e)return"";if(!t)return f(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return f(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${f(i)}<mark class="search-match">${f(s)}</mark>${f(a)}`}function uy(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=Au(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}const py=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function ti(e){var m,g,y;const t=e.assignee_id?Jt(e.assignee_id):null,n=t?en(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":py.format(i),a=e.estimate!=null?Ya(e.estimate,e.project_id):"",o=cl(e.estimate,e.project_id),r=e.sprint_id?Fa()[e.sprint_id]:null,l=r?r.name:null,c=(g=(m=document.getElementById("issue-search"))==null?void 0:m.value)==null?void 0:g.trim(),d=!!c&&((y=e.title)==null?void 0:y.toLowerCase().includes(c.toLowerCase())),u=c&&!d?uy(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${p(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${p(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${p(e.id)}" title="Priority: ${Fe(e.priority)}">
                    ${gt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${p(e.id)}" title="Status: ${ke(e.status)}">
                    ${Le(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${Et(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.id)}">${Au(e.title,c)}${u?` <span class="issue-search-snippet" title="Matched in description">— ${u}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(b=>`
                            <span class="issue-label" style="background: ${ie(b.color)}20; color: ${ie(b.color)}">${f(b.name)}</span>
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
                    ${n?Fn(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function gt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Le(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}se({"toggle-group":(e,t)=>{if((e==null?void 0:e.type)==="keydown"){if(e.repeat)return;e.preventDefault()}ly(t.group)},"show-inline-dropdown":(e,t,n)=>{gr(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),oe(t.issueId))}});let ts=[];function ns(){return ts}function my(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function fy(e){const t=e==null?void 0:e.avatar_url,n=p((e==null?void 0:e.name)||"Agent");return t?my(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${p(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${f(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function gy(e){var t;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{ts=await v.getTeamAgents(e),ca(Mn,ns),Vi()}catch(n){console.error("Failed to load team agents:",n),x("load team agents",n)}}async function Ia(e){var t;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{ts=await v.getTeamAgents(e),ca(Mn,ns),Vi(),hy()}catch(n){x("load agents",n)}}function hy(){const e=document.getElementById("agents-list");if(e){if(ts.length===0){e.innerHTML=H({icon:q.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=ts.map(t=>{var l;const n=f(t.name),i=f(t.parent_user_name||"Unknown"),s=t.kind==="session",a=t.can_register?'<span class="agent-scope" title="Registers one identity per session; cannot write as itself">Registrar</span>':s?`<span class="agent-scope" title="Registered by a registrar for one session">Session${t.idle?" · idle":""}</span>`:"",r=!s&&t.is_active!==!1&&(t.parent_user_id===((l=_t())==null?void 0:l.id)||no())?`<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}" data-can-register="${t.can_register?"true":"false"}">${t.can_register?"Stop being a registrar":"Make registrar"}</button>`:"";return`
      <div class="agent-item">
        ${fy(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            ${a}
            <span class="agent-date">Created by ${i} ${tt(t.created_at)}</span>
          </div>
        </div>
        ${r}
        <button class="btn btn-secondary" data-action="generate-agent-key" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Generate new key</button>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function vy(){const e=ee();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),W()}function Bu(e,t,n=!1){const i=f(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,W()}async function yy(e){var r,l,c,d;e.preventDefault();const t=(r=C())==null?void 0:r.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value,o=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let u;s&&a?u=await v.createProjectAgent(a,n,i,o):u=await v.createTeamAgent(t,n,i,o),O(),Bu("Agent Created",u.api_key,!!u.can_register)}catch(u){x("create agent",u)}return!1}async function by(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await v.createAgentKey(e);Bu("New Agent Key",n.key)}catch(n){x("generate agent key",n)}}async function wy(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await v.updateAgent(e,{can_register:n}),$(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),Ia()}catch(s){x("change registrar",s)}}function ky(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{$("Agent API key copied to clipboard","success")}).catch(()=>{$("Failed to copy","error")})}async function $y(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await v.deleteAgent(e),$("Agent deleted","success"),Ia()}catch(n){x("delete agent",n)}}se({"create-agent":e=>{yy(e)},"copy-agent-key":()=>{ky()},"dismiss-agent-modal":()=>{O(),Ia()},"delete-agent":(e,t)=>{$y(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{by(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{wy(t.agentId,t.agentName,t.canRegister!=="true")}});function Ey(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function _y(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const a of e){const o=a.user_id||a.id;i.has(o)||(i.add(o),s.push({id:o,name:a.user_name||a.name||a.user_email||a.email||"User",email:a.user_email||a.email||"",handle:Ey(a),isAgent:!1}))}for(const a of t)!a.mention_handle||a.is_active===!1||a.idle||i.has(a.id)||n!==void 0&&a.agent_project_id&&a.agent_project_id!==n||(i.add(a.id),s.push({id:a.id,name:a.name||"Agent",email:"",handle:a.mention_handle,isAgent:!0}));return s}function xy(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function xr(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let a=-1;const o=()=>{s.classList.add("hidden"),s.innerHTML="",a=-1},r=d=>{var m,g;const u=s.querySelectorAll(".mention-suggestion");u.length!==0&&(a=(d%u.length+u.length)%u.length,u.forEach((y,b)=>y.classList.toggle("highlighted",b===a)),(g=(m=u[a]).scrollIntoView)==null||g.call(m,{block:"nearest"}))},l=d=>{const u=i.selectionStart||0,m=i.value.slice(0,u).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),g=i.value.slice(u);i.value=m+g,i.focus(),o()},c=()=>{const d=i.selectionStart||0;if(xy(i.value,d)){o();return}const m=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!m){o();return}const g=m[2].toLowerCase(),y=_y(Mn(),ns(),i.mentionContext||{}).filter(b=>!g||b.handle.includes(g)||b.name.toLowerCase().includes(g)||b.email.toLowerCase().includes(g)).slice(0,6);if(!y.length){o();return}s.innerHTML=y.map(b=>`
            <button type="button" class="mention-suggestion" data-handle="${p(b.handle)}">
                <span class="mention-name">${f(b.name)}${b.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${f(b.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((b,k)=>{b.addEventListener("click",()=>l(b.dataset.handle)),b.addEventListener("mouseenter",()=>r(k))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const u=!s.classList.contains("hidden");if(d.key==="Escape"&&u){d.preventDefault(),d.stopPropagation(),o();return}if(u){if(d.key==="ArrowDown")d.preventDefault(),r(a+1);else if(d.key==="ArrowUp")d.preventDefault(),r(a-1);else if(d.key==="Enter"||d.key==="Tab"){const g=s.querySelectorAll(".mention-suggestion")[a];g&&(d.preventDefault(),l(g.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(o,150)})}async function Du(e){try{const t=await v.getIssue(e),n=await v.getSprints(t.project_id),s=li(t.project_id).map(o=>`
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
        `,W();const a=document.getElementById("edit-issue-description");if(a){const o=Js(e);if(o){const r=cd(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?bn(e,r,t.description||""):bn(e,null)})}}catch(t){x("load issue",t)}}async function Iy(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(c.status=s.value);const d=await v.updateIssue(t,c);Js(t)===c.description&&bn(t,null),O(),await oe(t),$("Issue updated!","success"),Yi(d)}catch(n){x("update issue",n)}}async function Sy(e){if(confirm("Are you sure you want to delete this issue?"))try{await v.deleteIssue(e),await Tt(),await dt(),F("issues"),$("Issue deleted!","success")}catch(t){x("delete issue",t)}}se({"update-issue":(e,t)=>{Iy(e,t.issueId)}});let _e=null,Mu=!1,Tn=!1,ju="new-comment";function Ty(){return _e||(_e=document.createElement("div"),_e.className="quote-tooltip",_e.setAttribute("role","button"),_e.setAttribute("tabindex","0"),_e.setAttribute("aria-label","Quote selection in comment"),_e.textContent="Quote",_e.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),Sa())}),_e.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),_e.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Sa()}),document.body.appendChild(_e),_e)}function Ru(e,t){const n=Ty();n.style.display="flex",Tn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!Tn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function is(){_e&&(_e.style.display="none"),Tn=!1}function Ly(){return Tn}function Pu(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function Ir(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=Pu(t.startContainer),i=Pu(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function Cy(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function Sa(e=ju){const t=Ir();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=Cy(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),is(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function Ay(){var i;if(!Ir())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return Ru(n.left+n.width/2,n.top),!0}function By(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!Ir()){is();return}Ru(t,n)},10)}function qu({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(ju=t,i.addEventListener("mouseup",By,n?{signal:n}:void 0),Mu||(Mu=!0,document.addEventListener("mousedown",s=>{Tn&&_e&&!_e.contains(s.target)&&is()}),document.addEventListener("selectionchange",()=>{Tn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&is()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&Tn&&(s.stopImmediatePropagation(),is())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&Ay()})))}function Nu(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function Ou(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const u=d[1],m=document.createElement("a");m.href=`#/issue/${u}`,m.className="issue-link",m.textContent=u,o.appendChild(m),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+d[3],o.appendChild(u),r=d.index+d[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function Hu(e){if(!e)return"";const t=ht(e),n=document.createElement("div");return n.innerHTML=t,Nu(n,Ou),n.innerHTML}function ni(e){if(!e)return"";const t=ht(e),n=document.createElement("div");return n.innerHTML=t,Nu(n,Ou),n.innerHTML}let Sr=!1,Tr=!1,ln=!0,ss=null,as=null,os=null,Ta=null,Lr=!1,La=null;function Cr(e=null){Lr=!0,e&&(La=e)}function Ar(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔"}[e]||"•"}function Br(e){return e.user_name||e.user_email||"Unknown"}function Dr(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?f(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${f(ke(t(e.old_value)))}</strong> to <strong>${f(ke(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${f(Fe(t(e.old_value)))}</strong> to <strong>${f(Fe(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${f(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${f(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=f(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=f(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||f(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||f(e.field_name)}`:"Updated issue"}}function Dy(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),i=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),i&&i.classList.toggle("rotated")}function My(){ln=!ln;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",ln),n&&n.classList.toggle("rotated",ln)}async function rs(e){try{ss=await v.getTicketRitualsStatus(e),Fu(e)}catch(t){console.error("Failed to load ticket rituals:",t),ss=null}}function Fu(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!ss){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:i}=ss;if(n.length===0&&i.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(ln=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",ln);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",ln);const r=n.some(d=>d.trigger==="ticket_close"),l=n.some(d=>d.trigger==="ticket_claim");let c="⚠️ Complete these rituals:";r&&l?c="⚠️ Pending rituals (claim before starting, close before completing):":l?c="⚠️ Complete these rituals before claiming this ticket (or closing it unclaimed):":r&&(c="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
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
                        <div class="ticket-ritual-prompt markdown-body">${d.prompt?ht(d.prompt):""}</div>
                        ${d.attestation?"":aw(d.last_rejection)}
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${f(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${at(d.attestation.attested_at)}</span>
                                ${d.attestation.note?`<div class="attestation-note markdown-body">${ht(d.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${ew(d,e)}
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
                                <span class="attestation-time">${at(d.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function Ca(e){try{let t;return e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t?(await oe(t.id,!1),!0):(F("my-issues",!1),!1)}catch{return F("my-issues",!1),!1}}function Mr(e){const t=Fi(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function jr({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${p(n.id)}" data-identifier="${p(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${p(i.id)}" data-identifier="${p(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function jy(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=$e();if(!t)return;const n=Mr(t.id);as=n.prevIssue?n.prevIssue.id:null,os=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=jr(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}ot(e=>{e==="detailNavContext"&&jy()});let ls=0;function Ry(){ls++}let Uu=0,Aa=!1;function Gu(){if(document.querySelector(".description-inline-editor"))return"editor";if(Yn())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||Aa?"transient":null}function zu(e){return Cr(),e==="editor"?"deferred":"retry"}function Py(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=$e())==null?void 0:n.id)===e}function qy(e){return J().find(t=>t.id===e)||or(e)||Fi().find(t=>t.id===e)||null}function Ny(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;zn(e);const i=Mr(e.id);as=i.prevIssue?i.prevIssue.id:null,os=i.nextIssue?i.nextIssue.id:null;const s=ee().find(r=>r.id===e.project_id),a=e.assignee_id?Jt(e.assignee_id):null,o=L()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(o)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${jr(i)}
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
                        <div class="property-row"><span class="property-label">Status</span><span class="property-value">${Le(e.status)}<span>${ke(e.status)}</span></span></div>
                        <div class="property-row"><span class="property-label">Priority</span><span class="property-value">${gt(e.priority)}<span>${Fe(e.priority)}</span></span></div>
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${a?f(en(a)):"Unassigned"}</span></div>
                    </div>
                </aside>
            </div>`}async function oe(e,t=!0,{refresh:n=!1}={}){const i=n?ls:++ls,s=++Uu;if(n){const a=Gu();if(a)return zu(a)}try{t&&Bn(),n||(ln=!0);let a=!1;if(!n){const w=qy(e);w&&(Ny(w),t&&(history.pushState({issueId:e,view:L()},"",`/issue/${w.identifier}`),a=!0))}let o=!1;const[r,l,c,d,u,m]=await Promise.all([v.getIssue(e),v.getComments(e).catch(w=>(console.error("Failed to load comments:",w),o=!0,[])),v.getActivities(e),v.getSubIssues(e),v.getRelations(e),v.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),y=[...m.pending_rituals||[],...m.completed_rituals||[]].filter(w=>w.attestation&&w.attestation.note).map(w=>({id:`attestation-${w.attestation.id}`,author_name:w.attestation.attested_by_name||"Unknown",author:w.attestation.attester||null,content:w.attestation.note,created_at:w.attestation.attested_at,is_attestation:!0,ritual_name:w.name,is_pending:!w.attestation.approved_at})),b=[...l,...y].sort((w,V)=>new Date(w.created_at)-new Date(V.created_at)),k=[r.parent_id?v.getIssue(r.parent_id):Promise.resolve(null),v.getSprints(r.project_id).catch(w=>(console.error("Failed to load sprints:",w),[]))],[T,I]=await Promise.all(k);if(i!==ls)return"dropped";let A=null,D=null;if(n){if(s!==Uu||!Py(e))return"dropped";const w=Gu();if(w)return zu(w);D=window.scrollY;const V=document.activeElement;V!=null&&V.id&&document.getElementById("issue-detail-view").contains(V)&&(A={id:V.id,start:V.selectionStart,end:V.selectionEnd})}ss=m;const X=u.filter(w=>w.relation_type==="blocks"&&w.direction==="outgoing"),E=u.filter(w=>w.relation_type==="blocked_by"||w.relation_type==="blocks"&&w.direction==="incoming"),P=u.filter(w=>w.relation_type==="relates_to");t&&!a&&history.pushState({issueId:e,view:L()},"",`/issue/${r.identifier}`),zn(r),kd(I),Lr=!1,La=null,document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const z=document.getElementById("issue-detail-view");z.classList.remove("hidden");const K=L()||"my-issues",me=ee().find(w=>w.id===r.project_id),_=r.assignee_id?Jt(r.assignee_id):null,R=_?en(_):null,M=r.sprint_id?I.find(w=>w.id===r.sprint_id):null,te=Mr(r.id),{prevIssue:De,nextIssue:be}=te;z.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(K)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${jr(te)}
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
                                ${Js(r.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span>':""}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${r.description?"":"empty"}" data-action="edit-description" data-issue-id="${p(r.id)}">
                            ${r.description?ni(r.description):'<span class="add-description-link">Add description...</span>'}
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
                            ${d.length===0?H({icon:q.issues,heading:"No sub-issues",description:"Break this issue down by creating sub-issues"}):d.map(w=>`
                                <a href="/issue/${encodeURIComponent(w.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${p(w.id)}" data-identifier="${p(w.identifier)}">
                                    <span class="sub-issue-status">${Le(w.status)}</span>
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
                            ${X.length===0&&E.length===0&&P.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${E.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${E.map(w=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Le(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(w.related_issue_id)}" data-identifier="${p(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${f(w.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(r.id)}" data-relation-id="${p(w.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${X.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${X.map(w=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Le(w.related_issue_status)}</span>
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
                                            <span class="relation-status">${Le(w.related_issue_status)}</span>
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
                            `:b.map(w=>{var V;return`
                                <div class="comment ${w.is_attestation?"comment-attestation":""} ${w.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${w.is_attestation?"avatar-attestation":""}">${w.is_attestation?w.is_pending?"⏳":"✓":(w.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${f(w.author_name||"User")}</span>
                                            ${w.author?Un(w.author):Xo((V=Jt(w.author_id))==null?void 0:V.is_agent)}
                                            ${w.is_attestation?`<span class="comment-ritual-badge">${w.is_pending?"Pending approval — ":""}Ritual: ${f(w.ritual_name)}</span>`:""}
                                            <span class="comment-date">${at(w.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${Hu(w.content)}</div>
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
                            ${c.length===0?H({icon:q.activity,heading:"No activity yet",description:"Activity will appear here as the issue is updated"}):c.map(w=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Ar(w.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Dr(w)}</span>
                                        <span class="activity-actor">by ${f(Br(w))} ${Un(w.user)}</span>
                                        <span class="activity-time">${at(w.created_at)}</span>
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
                                ${Le(r.status)}
                                <span>${ke(r.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${p(r.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${gt(r.priority)}
                                <span>${Fe(r.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${p(r.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${r.issue_type||"task"}">${Et(r.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${p(r.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${R?`${Fn(_,"avatar-small")}<span>${f(R)}</span>`:'<span class="text-muted">Unassigned</span>'}
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
                                        <span class="issue-label" style="background: ${ie(w.color)}20; color: ${ie(w.color)}">${f(w.name)}</span>
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
                            <button class="property-value${cl(r.estimate,r.project_id)?" out-of-scale":""}" ${cl(r.estimate,r.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${Ya(r.estimate,r.project_id)}</span>
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
                            <span class="property-value-static">${f(r.creator_name||"Unknown")} ${Un(r.creator)}</span>
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
        `,Ta&&Ta.abort(),Ta=new AbortController;const{signal:we}=Ta,Xe=document.querySelector(".sidebar-overflow-trigger"),pt=document.querySelector(".overflow-menu-dropdown");if(Xe&&pt){const w=()=>{pt.classList.add("hidden"),Xe.setAttribute("aria-expanded","false")},V=()=>{const je=pt.classList.toggle("hidden");Xe.setAttribute("aria-expanded",String(!je))};Xe.addEventListener("click",V,{signal:we}),document.addEventListener("click",je=>{!Xe.contains(je.target)&&!pt.contains(je.target)&&w()},{signal:we}),pt.addEventListener("keydown",je=>{je.key==="Escape"&&(je.stopPropagation(),w(),Xe.focus())},{signal:we})}Fu(r.id),xr("new-comment","mention-suggestions",{projectId:r.project_id}),qu({signal:we});const Me=document.getElementById("new-comment");if(Aa=!1,Me){Me.addEventListener("compositionstart",()=>{Aa=!0},{signal:we}),Me.addEventListener("compositionend",()=>{Aa=!1},{signal:we});const w=rd(r.id);w&&(Me.value=w),Me.addEventListener("input",()=>{Xs(r.id,Me.value)}),Me.addEventListener("keydown",V=>{var je;V.key==="Enter"&&(V.metaKey||V.ctrlKey)&&(V.preventDefault(),(je=Me.closest("form"))==null||je.requestSubmit())})}as=De?De.id:null,os=be?be.id:null;const ue=w=>{var ce;if((w.metaKey||w.ctrlKey)&&w.shiftKey&&(w.key===">"||w.key==="."||w.code==="Period")&&Sa()){w.preventDefault();return}if(w.metaKey||w.ctrlKey||w.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||w.target.tagName==="INPUT"||w.target.tagName==="TEXTAREA"||w.target.tagName==="SELECT"||w.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||Yn())return;if(w.key==="ArrowLeft"&&as)w.preventDefault(),oe(as);else if(w.key==="ArrowRight"&&os)w.preventDefault(),oe(os);else if(w.key==="c"){w.preventDefault(),w.stopImmediatePropagation();const mt=document.getElementById("new-comment");mt&&(mt.focus(),mt.scrollIntoView({behavior:"smooth",block:"nearest"}))}else w.key==="j"?(w.preventDefault(),w.stopImmediatePropagation(),Ba(1)):w.key==="k"?(w.preventDefault(),w.stopImmediatePropagation(),Ba(-1)):w.key==="d"&&(w.preventDefault(),(ce=document.querySelector('[data-action="edit-description"]'))==null||ce.click());const je={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[w.key];if(je){const mt=document.querySelector(`.property-row[data-field="${je}"]`);mt&&(w.preventDefault(),mt.click())}};if(document.addEventListener("keydown",ue,{signal:we}),A){const w=document.getElementById(A.id);if(w&&(w.focus({preventScroll:!0}),typeof A.start=="number"&&typeof w.setSelectionRange=="function"))try{w.setSelectionRange(A.start,A.end)}catch{}}return D!==null&&window.scrollTo(0,D),"rendered"}catch(a){if(n)console.error("Failed to refresh issue detail:",a);else{if(i!==ls)return"dropped";x("load issue",a);const o=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(o){const r=(a==null?void 0:a.status)===403||(a==null?void 0:a.status)===404;o.innerHTML=H(r?{icon:q.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:q.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function Oy(e,t){if(e.preventDefault(),Sr)return!1;const n=document.getElementById("new-comment").value;Xs(t,null),Sr=!0;try{const i=await v.createComment(t,n);$("Comment added!","success"),Qo(i),await oe(t)}catch(i){Xs(t,n),x("add comment",i)}finally{Sr=!1}return!1}async function Hy(e){const t=$e()||await v.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
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
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=Js(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=cd(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}xr("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?bn(e,c,t.description||""):bn(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&Vu()}),a.addEventListener("keydown",c=>{var d,u;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,m;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(bn(e,null),Lr){oe(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?ni(t.description):'<span class="add-description-link">Add description...</span>',(m=n.querySelector('[data-action="edit-description"]'))==null||m.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,y;if(Tr)return;const c=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(c===void 0)return;const d=La?La.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const b=document.getElementById("description-draft-warning");b&&(b.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",b.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");Tr=!0,u&&(u.disabled=!0);const m=window.scrollY;try{await v.updateIssue(e,{description:c}),bn(e,null),$("Description updated","success"),await oe(e,!1),window.scrollTo(0,m),(y=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||y.focus()}catch(b){x("update description",b)}finally{Tr=!1,u&&(u.disabled=!1)}})}function Vu(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?ni(n):'<span class="text-muted">Nothing to preview.</span>'}function Fy(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?Vu():i.focus()}function Uy(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,W(),document.getElementById("relation-issue-search").focus()}async function Gy(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=C())==null?void 0:i.id,o=(await v.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${p(r.id)}" data-identifier="${p(r.identifier)}" data-title="${p(r.title)}">
                <span class="link-result-id">${f(r.identifier)}</span>
                <span class="link-result-title">${f(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function zy(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Vy(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Wy(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return $("Please select an issue","error"),!1;try{n==="blocked_by"?await v.createRelation(i,t,"blocks"):await v.createRelation(t,i,n),O(),$("Relation added","success"),oe(t)}catch(s){x("add relation",s)}return!1}async function Ky(e,t){try{await v.deleteRelation(e,t),$("Relation removed","success"),oe(e)}catch(n){x("remove relation",n)}}function Ba(e){const t=$e();if(!t)return;const n=Fi();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||oe(n[s].id)}se({"retry-issue-comments":(e,t)=>{oe(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{Qh(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||Hy(t.issueId)},"toggle-section":(e,t)=>{Dy(t.section)},"toggle-ticket-rituals":()=>{My()},"save-comment":(e,t)=>{Oy(e,t.issueId)},"show-add-relation-modal":(e,t)=>{Uy(t.issueId)},"remove-relation":(e,t)=>{Ky(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{Ud(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{Wy(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{Gy(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{zy(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{Vy()},"set-description-editor-mode":(e,t)=>{Fy(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>Ba(-1),"navigate-next-issue":()=>Ba(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Du(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Sy(t.issueId)}});const Da=new Map;function Rr(){var e;return`${((e=C())==null?void 0:e.id)??""}|${Y()??""}`}function ii(e,t,n){Da.set(e,{key:t,value:n})}function Ma(e,t){const n=Da.get(e);return n&&n.key===t?n.value:void 0}function cs(e,...t){for(const n of t)n!==e&&Da.delete(n)}function Pr(){Da.clear()}function ja(e,t){if(e===t)return!0;try{return JSON.stringify(e)===JSON.stringify(t)}catch{return!1}}ot((e,t,n)=>{e==="currentTeam"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Pr(),e==="currentUser"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Pr()});function Wu(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let cn=[],ds=[],Ra=null,le=new Set,si="list",Ln=!1,qr=null,Pa=null,Nr=null,Or=null,Ku=null;function Yu(e){if(Ku!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const Hr=Og();(Hr==="list"||Hr==="grid")&&(si=Hr);function Zu(e){if(e!=="list"&&e!=="grid")return;si=e,e==="grid"&&Ln&&Fr(),Hg(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Ut()}function Qu(){if(si!=="list")return;Ln=!0,le.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Ut(),oi()}function Fr(){Ln=!1,le.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Ut(),oi()}function Yy(){qr&&clearTimeout(qr),qr=setTimeout(()=>{Ut()},300)}function Zy(){const e=document.getElementById("doc-search");e&&(e.value=""),Ut()}async function Qy(){rt(null)}async function Xy(){const e=document.getElementById("doc-search");e&&(e.value=""),rt(null)}function Jy(){var s;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((s=document.getElementById("doc-search"))==null?void 0:s.value)||"",n=Y()||"",i=[];if(t&&i.push(`<span class="filter-chip">Search: "${f(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=ee().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";i.push(`<span class="filter-chip">Project: ${f(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(i.length>0){let a=i.join(" ");i.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function eb(){return cn}function Ut(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";Jy(),ds=cn.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),ds.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),ob("",si)}let ai=0;async function tb(){var i;const e=Ra||((i=C())==null?void 0:i.id);if(!e)return;const t=++ai,n=Y()||null;try{const s=await v.getDocuments(e,n);if(t!==ai)return;ii("documents",`${e}|${n??""}`,s),cn=s,Ut()}catch(s){if(t!==ai)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=H({icon:q.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),x("load documents",s)}}ot(e=>{e==="currentProject"&&L()==="documents"&&tb()});async function Cn(e,t=null,{fromMemory:n=!1}={}){var r;if(e||(e=(r=C())==null?void 0:r.id),!e)return;Ra=e,yd(-1);const i=++ai;t===null&&(t=Y()||null);const s=`${e}|${t??""}`,a=n?Ma("documents",s):void 0,o=document.getElementById("documents-list");a?(cn=a,Ut()):o&&(o.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join(""));try{const l=await v.getDocuments(e,t);if(i!==ai)return;ii("documents",s,l);const c=a&&ja(cn,l);cn=l;const d=document.getElementById("doc-view-list"),u=document.getElementById("doc-view-grid");d&&u&&(d.classList.toggle("active",si==="list"),u.classList.toggle("active",si==="grid")),c||Ut()}catch(l){if(i!==ai)return;const c=document.getElementById("documents-list");c&&(c.innerHTML=H({icon:q.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),x("load documents",l)}}function Xu(){var t,n;if(L()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=Ra||((n=C())==null?void 0:n.id);e&&Cn(e).catch(i=>console.error("Failed to refresh documents list:",i))}function Ju(e){Yu(e)&&Ce(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function nb(e,t){Yu(e)&&($(`Document "${t||"Untitled"}" was deleted`,"warning"),F("documents"))}function ib(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${ie(t.color)}20; color: ${ie(t.color)}">${f(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function sb(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${ib(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${p(e.id)}" data-action="view-document" data-document-id="${p(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${f(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${f(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?f(Wu(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${f(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function ab(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${ie(r.color)}20; color: ${ie(r.color)}">${f(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?Wu(e.content).substring(0,80):"No content",s=Ln?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${p(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${le.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${Ln&&le.has(e.id)?" selected":""}" data-action="${Ln?"toggle-doc-selection":"view-document"}" data-document-id="${p(e.id)}" data-doc-id="${p(e.id)}">
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
  `}function ob(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;le.clear(),oi();const i=ds;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,u=Y(),m=d||u;n.innerHTML=H({icon:m?q.search:q.documents,heading:m?"No documents match your filters":"No documents yet",description:m?"Try different search terms or filters":"Create your first document to get started",...!m&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?sb:ab,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=ee();i.forEach(d=>{let u,m;if(e==="project")if(u=d.project_id||"__global__",u==="__global__")m="Global (Team-wide)";else{const g=r.find(y=>y.id===d.project_id);m=g?g.name:"Unknown Project"}else e==="sprint"&&(u=d.sprint_id||"__no_sprint__",m=d.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:m,docs:[]}),o[u].docs.push(d)});let l="";for(const[d,u]of Object.entries(o)){const m=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${f(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${m}">
          ${u.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function rb(e){le.has(e)?le.delete(e):le.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=le.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",le.has(e)),oi()}function lb(){ds.forEach(e=>le.add(e.id)),ds.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),oi()}function ep(){le.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),le.clear(),oi()}function oi(){const e=document.getElementById("doc-bulk-actions");e&&(Ln?(e.classList.remove("hidden"),le.size>0?e.innerHTML=`
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
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function cb(){if(le.size===0){$("No documents selected","error");return}const t=ee().map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${le.size} Document${le.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
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
  `,W()}async function db(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(le);let i=0;const s=[];for(const l of n)try{await v.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((o=cn.find(d=>d.id===l))==null?void 0:o.title)||l)}O(),ep(),s.length===0?$(`Moved ${i} document${i>1?"s":""}!`,"success"):$(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=C())==null?void 0:r.id;return await Cn(a),!1}async function ub(){var a,o;if(le.size===0){$("No documents selected","error");return}const e=le.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(le);let n=0;const i=[];for(const r of t)try{await v.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((a=cn.find(c=>c.id===r))==null?void 0:a.title)||r)}Fr(),i.length===0?$(`Deleted ${n} document${n>1?"s":""}!`,"success"):$(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=C())==null?void 0:o.id;await Cn(s)}async function pb(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await v.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${p(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${f(s.author_name||"Unknown")}</span>
                ${Un(s.author)}
                <span class="comment-date">${at(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${Hu(s.content)}</div>
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
    `}}function mb(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=rd(e);s&&(i.value=s),i.addEventListener("input",()=>{Xs(e,i.value)},{signal:t}),i.addEventListener("keydown",a=>{var o;a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),(o=i.closest("form"))==null||o.requestSubmit())},{signal:t}),xr("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function Ce(e,t=!0){try{t&&Bn();const n=await v.getDocument(e);Ku=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(E=>E.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await pb(n);let a=null,o=null,r=!1;if(n.project_id){const P=ee().find(z=>z.id===n.project_id);if(a=P?P.name:null,n.sprint_id)try{const z=await v.getSprint(n.sprint_id);o=z?z.name:null}catch(z){console.error("Failed to load sprint name:",z),r=!0}}let l=n.content||"";const c=Z.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=eb(),u=d.findIndex(E=>E.id===n.id),m=u>0?d[u-1]:null,g=u>=0&&u<d.length-1?d[u+1]:null,y=u>=0,b=L()||"documents",k=n.labels&&n.labels.length>0?n.labels.map(E=>`
          <span class="issue-label" style="background: ${ie(E.color)}20; color: ${ie(E.color)}">
            ${f(E.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${p(n.id)}" data-label-id="${p(E.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let T='<span class="text-muted">None</span>';try{const E=await v.getDocumentIssues(n.id);E.length>0&&(T=E.map(P=>`
          <div class="linked-item">
            <span class="linked-item-id">${f(P.identifier)}</span>
            <span class="linked-item-title">${f(P.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${p(n.id)}" data-issue-id="${p(P.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(E){console.error("Failed to load linked issues:",E),T=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${p(b)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${y?`
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

          <div class="document-content markdown-body">${l?ni(l):'<p class="text-muted">No content</p>'}</div>

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
                ${k}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${p(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${f(n.author_name||"Unknown")} ${Un(n.author)}</span>
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
    `,Pa&&Pa.abort(),Pa=new AbortController;const{signal:I}=Pa,A=i.querySelector(".sidebar-overflow-trigger"),D=i.querySelector(".overflow-menu-dropdown");if(A&&D){const E=()=>{D.classList.add("hidden"),A.setAttribute("aria-expanded","false")},P=()=>{const z=D.classList.toggle("hidden");A.setAttribute("aria-expanded",String(!z))};A.addEventListener("click",P,{signal:I}),document.addEventListener("click",z=>{!A.contains(z.target)&&!D.contains(z.target)&&E()},{signal:I}),D.addEventListener("keydown",z=>{z.key==="Escape"&&(E(),A.focus())},{signal:I})}mb(n.id,I,n.project_id||null),qu({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:I}),Nr=m?m.id:null,Or=g?g.id:null;const X=E=>{if((E.metaKey||E.ctrlKey)&&E.shiftKey&&(E.key===">"||E.key==="."||E.code==="Period")&&Sa("new-doc-comment")){E.preventDefault();return}E.metaKey||E.ctrlKey||E.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||E.target.tagName==="INPUT"||E.target.tagName==="TEXTAREA"||E.target.tagName==="SELECT"||E.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(E.key==="ArrowLeft"&&Nr?(E.preventDefault(),Ce(Nr)):E.key==="ArrowRight"&&Or&&(E.preventDefault(),Ce(Or)))};document.addEventListener("keydown",X,{signal:I})}catch(n){x("load document",n)}}async function qa(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await v.getSprints(t);let o=n;if(i&&!n){const l=a.find(c=>c.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${f(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function Ur(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${f(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function fb(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?ni(r):'<span class="text-muted">Nothing to preview.</span>'}}function Gr(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=ud(e);if(o){const l=Pg(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){ea(e,null);return}ea(e,l,n)};[i,s,a].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function tp(){us=null;const e=ee(),t=wp()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${f(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${Ur("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,W(),Gr("new"),t&&await qa("doc-sprint",t,null,!0)}let us=null;async function gb(e,t,n){us=n||null;const s=ee().map(a=>`<option value="${p(a.id)}" ${a.id===t?"selected":""}>${f(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${Ur("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,W(),Gr("new"),t&&await qa("doc-sprint",t,e)}async function hb(e){var a;e.preventDefault();const t=(a=C())==null?void 0:a.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await v.createDocument(t,s),ea("new",null),await Cn(t),O(),$("Document created!","success"),us){const o=us;us=null,o()}}catch(o){x("create document",o)}return!1}let zr=null,ps=null,Vr=!1;async function np(e){try{const t=await v.getDocument(e);zr=e,ps={title:t.title||"",content:t.content||""},Vr=!1;const i=ee().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${f(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${Ur("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${p(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,W(),Gr(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await qa("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){x("load document",t)}}async function vb(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&zr===t&&ps&&!Vr){let o=null;try{o=await v.getDocument(t)}catch{}if(o&&((o.title||"")!==ps.title||(o.content||"")!==ps.content))return Vr=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await v.updateDocument(t,s),zr=null,ps=null;const o=ud(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&ea(t,null),O(),await Ce(t),$("Document updated!","success")}catch(o){x("update document",o)}return!1}async function yb(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await v.deleteDocument(e);const n=(t=C())==null?void 0:t.id;await Cn(n),F("documents"),$("Document deleted!","success")}catch(n){x("delete document",n)}}function bb(e,t){qa(e,t)}async function wb(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${p(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,W()}async function kb(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=C())==null?void 0:i.id,a=await v.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${p(t)}" data-issue-id="${p(o.id)}">
        <span class="link-result-id">${f(o.identifier)}</span>
        <span class="link-result-title">${f(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function $b(e,t){try{await v.linkDocumentToIssue(e,t),O(),$("Issue linked!","success"),await Ce(e,!1)}catch(n){x("link issue",n)}}async function Eb(e,t){if(confirm("Unlink this issue from the document?"))try{await v.unlinkDocumentFromIssue(e,t),$("Issue unlinked!","success"),await Ce(e,!1)}catch(n){x("unlink issue",n)}}let Wr=!1;async function _b(e,t){if(e.preventDefault(),Wr)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return $("Please enter a comment","error"),!1;Wr=!0;try{const s=await v.createDocumentComment(t,i);n.value="",$("Comment added!","success"),Qo(s),await Ce(t,!1)}catch(s){x("add comment",s)}finally{Wr=!1}return!1}async function xb(e){var n;const t=(n=C())==null?void 0:n.id;if(!t){$("No team selected","error");return}try{const i=await v.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,W();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${p(e)}" data-label-id="${p(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ie(a.color)}; color: white;">${f(a.name)}</span>
        ${a.description?`<span class="text-muted">${f(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,W()}catch(i){x("load labels",i)}}async function Ib(e,t){try{await v.addLabelToDocument(e,t),O(),$("Label added!","success"),await Ce(e,!1)}catch(n){x("add label",n)}}async function Sb(e,t){try{await v.removeLabelFromDocument(e,t),$("Label removed!","success"),await Ce(e,!1)}catch(n){x("remove label",n)}}se({"view-document":(e,t)=>{e.preventDefault(),Ce(t.documentId)},"set-doc-editor-mode":(e,t)=>{fb(t.target,t.mode)},"retry-load-documents":()=>{Cn(Ra)},"retry-document-comments":(e,t)=>{Ce(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{rb(t.docId)},"clear-doc-search":()=>{Zy()},"clear-doc-project-filter":()=>{Qy()},"clear-all-doc-filters":()=>{Xy()},"show-bulk-move-modal":()=>{cb()},"bulk-delete-documents":()=>{ub()},"select-all-docs":()=>{lb()},"clear-doc-selection":()=>{ep()},"exit-selection-mode":()=>{Fr()},"enter-selection-mode":()=>{Qu()},"handle-bulk-move":e=>{db(e)},"unlink-document-issue":(e,t)=>{Eb(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{wb(t.documentId)},"add-document-comment":(e,t)=>{_b(e,t.documentId)},"remove-label-from-doc":(e,t)=>{Sb(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{xb(t.documentId)},"show-edit-document-modal":(e,t)=>{np(t.documentId)},"delete-document":(e,t)=>{yb(t.documentId)},"create-document":e=>{hb(e)},"update-doc-sprint-dropdown":(e,t,n)=>{bb(t.sprintSelect,n.value)},"update-document":(e,t)=>{vb(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{kb(n.value,t.documentId)},"link-to-issue":(e,t)=>{$b(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{Ib(t.documentId,t.labelId)}});let Lt=[],Na={},Oa=new Set,Gt=null,Kr=null,Ha=[],ms=[],Yr=[];function Fa(){return Na}function Tb(){return Kr}function Lb(){return Gt}ot(e=>{e==="currentProject"&&L()==="sprints"&&dn()});let Zr=0;async function dn({fromMemory:e=!1}={}){wd(-1);const t=Y();if(!t){const o=document.getElementById("sprints-list");o&&(o.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}const n=++Zr;zb();const i=document.getElementById("sprints-list"),s=Rr(),a=e?Ma("sprints",s):void 0;a?(Lt=a,ip()):i&&(i.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{const[,o]=await Promise.all([v.getCurrentSprint(t),v.getSprints(t)]),r=o.some(c=>c.status==="active")?o:await v.getSprints(t);if(n!==Zr)return;const l=a&&ja(Lt,r);Lt=r,ii("sprints",s,r),l||ip(),await Ua()}catch(o){return n!==Zr?void 0:(i&&(i.innerHTML=H({icon:q.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),x("load sprints",o),!1)}return!0}function ip(){const e=document.getElementById("sprints-list");if(!e)return;const t=Lt.find(a=>a.status==="active"),n=Lt.find(a=>a.status==="planned"),i=Lt.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
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
        `,s+=Cb(t)}if(n){const a=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",o=(n.budget?`${n.budget} point budget`:"No budget set")+(a?` <span class="text-muted">· ${a}</span>`:"");s+=`
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
        `),e.innerHTML=s||H({icon:q.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function sp(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${tl(e.activated_at)}, closed ${tl(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${tl(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function Cb(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${f(sp(e))||"not yet activated"}</span>
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
    `}let Qr=0;async function ri(e,t=!0){var n;try{t&&Bn();const i=++Qr,s=L(),a=await v.getSprint(e);if(i!==Qr)return;if(!a){$("Sprint not found","error"),F("sprints");return}Kr=a;const o=(n=C())==null?void 0:n.id,[r,l,c]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),o?v.getDocuments(o,a.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==Qr)return;Ha=r,Yr=l,ms=c,L()===s&&xt(Ha),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Bb()}catch(i){console.error("Failed to load sprint:",i),$("Failed to load sprint","error"),F("sprints")}}async function Ab(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){$("Invalid sprint ID","error"),F("sprints",!1);return}try{await ri(e,!1)}catch{F("sprints",!1)}}function Bb(){const e=Kr,t=Ha;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=L()||"sprints",s=t.filter(g=>zi.includes(g.status)),a=t.filter(g=>g.status==="done"),o=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((y,b)=>y+(b.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),c=r(a),d=o.length>0?`<div class="stat-note">${o.length} canceled not counted</div>`:"";let u="";e.status==="active"?u='<span class="badge badge-status-active">Active</span>':e.status==="planned"?u='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(u='<span class="badge badge-status-completed">Completed</span>');const m=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
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
                    ${f(sp(e))}
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
                ${s.length===0?H({icon:q.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(g=>Xr(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?H({icon:q.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(g=>Xr(g)).join("")}
                    </div>
                `}
            </details>

            ${o.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${o.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${o.map(g=>Xr(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${Mb()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${ms.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${p(e.id)}"
                        data-project-id="${p(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${ms.length>0?`
                    <div class="sprint-issues-list">
                        ${ms.map(g=>Db(g)).join("")}
                    </div>
                `:H({icon:q.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function Xr(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[..._d,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${p(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${f(e.identifier)}</span>
            <span class="sprint-issue-title">${f(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${Kb(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Db(e){const t=f(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${p(e.id)}" data-document-url="/document/${p(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${f(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${at(e.created_at)}</span>
            </span>
        </div>
    `}function Mb(){const e=Yr;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${jb(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function jb(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Rb(e,t,n,i){const s=i?bw(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
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
    `,W()}async function Pb(e,t,n){var u,m,g,y;e.preventDefault();const i=(m=(u=document.getElementById("sprint-name"))==null?void 0:u.value)==null?void 0:m.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(y=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:y.dataset.currentBudget,l=r?parseInt(r):null,c=a!==l,d=Lt.find(b=>b.id===t);try{const b={};i&&(b.name=i);const k=o==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!k&&(b.budget=a),Object.keys(b).length&&await v.updateSprint(t,b),o==="planned"){const I=Lt.filter(A=>A.status==="planned"&&A.id!==t);for(const A of I)await v.updateSprint(A.id,{budget:a})}o==="default"&&n&&await v.updateProject(n,{default_sprint_budget:a}),await dn(),O(),$(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(b){x("update budget",b)}return!1}const ap="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function qb(e,t=null){const n=Lt.find(c=>c.id===e),i=n?ee().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${ap}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let a;try{a=await v.updateSprint(e,{budget_follows_default:!0})}catch(c){x("reset budget to project default",c),t&&(t.disabled=!1);try{await dn()}catch{}return}const o=(a==null?void 0:a.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await dn()!==!1}catch{l=!1}$(`'${o}' follows the project default budget again: ${s(a==null?void 0:a.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((a==null?void 0:a.budget)===null||(a==null?void 0:a.budget)===void 0)&&$(ap,"warning")}async function Nb(e){const t=Lt.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,W();const n=zi;let i=0,s=!1,a=!1;try{const[l,c]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
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
    `}async function Ob(e){try{const t=await v.closeSprint(e);await dn(),lp(),t.limbo?Fb(t):$("Sprint completed!","success")}catch(t){x("complete sprint",t)}}async function Ua(){const e=Y();if(e)try{Gt=await v.getLimboStatus(e),Hb()}catch(t){console.error("Failed to load limbo status:",t)}}function Hb(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Gt||!Gt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Gt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function Fb(e){const t=Y();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,W(),Ub(t)}async function Ub(e){try{const t=await v.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${f(i.name)} <span class="ritual-mode">(${f(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${ht(i.prompt)}</div>
                    ${el(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function Jr(){var t,n;if(!Gt)return;const e=Y();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Gt.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${f(i.name)}</strong>
                            <span class="badge badge-ritual-${p(i.approval_mode)}">${f(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${ht(i.prompt)}</div>
                        ${el(i.attestation)}
                        ${Gb(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=Gt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Gt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${f(i.name)}</div>
                            ${el(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,W()}function el(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${f(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${f(at(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${ht(e.note)}</div>
        </div>
    `}function Gb(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${p(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function op(e){for(const t of e)if(!Oa.has(t))try{(await v.getSprints(t)).forEach(i=>{Na[i.id]=i}),Oa.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function zb(){Na={},Oa=new Set,Ha=[],Yr=[],ms=[],Ga={}}function Vb(e,t){t.forEach(n=>{Na[n.id]=n}),Oa.add(e)}let Ga={};function Wb(e){return Ga[e]}function rp(e,t){Ga[e]=t??null}function lp(){Ga={}}se({"retry-load-sprints":()=>dn(),"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}ri(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;Rb(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{qb(t.sprintId,n)},"show-limbo-details-modal":()=>{Jr()},"show-close-sprint-confirmation":(e,t)=>{Nb(t.sprintId)},"handle-update-budget":(e,t)=>{Pb(e,t.sprintId,t.projectId)},"close-modal":()=>{O()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,O(),Ob(t.sprintId)},"dismiss-limbo-modal":()=>{O(),Ua()},"approve-ritual":(e,t)=>{Xb(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{dp(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}oe(t.issueId)},"create-sprint-document":async(e,t)=>{await gb(t.sprintId,t.projectId,()=>{ri(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Ce(t.documentId)}});function tl(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function Kb(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}ot(e=>{e==="currentProject"&&L()==="rituals"&&nl()});let cp=0;async function nl(){const e=Y(),t=document.getElementById("rituals-content"),n=++cp;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=H({icon:q.projects,heading:"Select a project",description:"Choose a project to view and manage its rituals"}));return}Sw(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await hs();n===cp&&!i&&t&&(t.innerHTML=H({icon:q.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function Yb(){bp(Zb),nl()}function Zb(){const e=document.getElementById("rituals-content"),t=Tw(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,ci("rv-sprint-rituals-list",n,"sprint"),ci("rv-close-rituals-list",i,"close"),ci("rv-claim-rituals-list",s,"claim")}function Qb(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function Xb(e,t){try{await v.approveAttestation(e,t),$("Ritual approved!","success"),await Ua(),Jr()}catch(n){x("approve ritual",n)}}function il(e){return e==="document"?`
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
        `:""}function sl(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){$("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){$("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function dp(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${il(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{Jb(s,e,t,i)}),W()}async function Jb(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=sl(i);if(a===void 0)return!1;try{await v.completeGateRitual(t,n,s||null,a),$("Ritual completed!","success"),await Ua();const o=Lb();o&&!o.in_limbo?(O(),$("Limbo cleared! Next sprint is now active.","success")):Jr()}catch(o){x("complete gate ritual",o)}return!1}function ew(e,t){if(e.attestation&&e.attestation.approved_at)return'<span class="text-success">Completed</span>';if(e.attestation&&!e.attestation.approved_at)return`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Approve</button>
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}">Reject</button>
        `;const n=p(e.artifact||"");if(e.approval_mode==="gate"){const i=`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${n}">Complete</button>`;return e.last_rejection&&!e.last_rejection.superseded_at?i:`${i}
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" title="Send the gate request back with a reason">Reject</button>`}return e.note_required||e.artifact?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-prompt="${p(e.prompt||"")}" data-ritual-artifact="${n}" data-ritual-note-required="${e.note_required?"1":""}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Attest</button>`}function tw(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${f(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${il(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{nw(o,e,t,s,a)}),W()}async function nw(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return $("A note is required for this attestation.","error"),!1;const o=sl(i);if(o===void 0)return!1;try{await v.attestTicketRitual(t,n,a||null,o),$("Ritual attested!","success"),O(),await rs(n)}catch(r){x("attest ticket ritual",r)}return!1}async function iw(e,t){try{await v.attestTicketRitual(e,t),$("Ritual attested!","success"),await rs(t)}catch(n){x("attest ticket ritual",n)}}async function sw(e,t){try{await v.approveTicketRitual(e,t),$("Ritual approved!","success"),await rs(t)}catch(n){x("approve ticket ritual",n)}}function aw(e){return!e||e.superseded_at?"":`<div class="ticket-ritual-rejection"><strong>Rejected by ${f(e.rejected_by_name||"Someone")}:</strong> ${f(e.note||"")}</div>`}function up(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{ow(s,e,t,n,i)}),W()}async function ow(e,t,n,i,s=null){e.preventDefault();const a=document.getElementById("reject-ritual-note").value.trim();if(!a)return $("A rejection needs a reason.","error"),!1;try{await v.rejectTicketRitual(t,n,a),$(`"${i}" rejected. The attester has been told why.`,"success"),O(),s&&await s()}catch(o){x("reject ritual",o)}return!1}function rw(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${il(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{lw(s,e,t,i)}),W()}async function lw(e,t,n,i=""){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value,a=sl(i);if(a===void 0)return!1;try{await v.completeTicketGateRitual(t,n,s||null,a),$("Ritual completed!","success"),O(),await rs(n)}catch(o){x("complete ticket ritual",o)}return!1}se({"show-create-ritual-modal":(e,t)=>{xp(t.trigger)},"approve-ticket-ritual":(e,t)=>{sw(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{up(t.ritualId,t.issueId,t.ritualName,()=>rs(t.issueId))},"complete-ticket-ritual":(e,t)=>{rw(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{tw(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{iw(t.ritualId,t.issueId)},"retry-load-rituals":()=>nl()});function ht(e){if(!e)return"";try{Z.setOptions({breaks:!0,gfm:!0});const n=Z.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return sd.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function fs(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function cw(e,t,n,i,s,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Requested by <strong>${f(o)}</strong>${r?` ${fs(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{dw(c,e,t,n)}),W(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function dw(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await v.completeTicketGateRitual(t,n,s||null),$(`GATE ritual "${i}" approved!`,"success"),O(),Ct()}catch(a){x("complete gate ritual",a)}}function uw(e,t,n,i,s,a,o,r){cw(e,t,n,i,s,a,o,r)}function pw(e,t,n,i,s,a,o,r,l){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Attested by <strong>${f(o)}</strong>${r?` ${fs(r)}`:""}</div>`:""}
                ${l?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${ht(l)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{mw(d,e,t,n)}),W(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function mw(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{await v.approveTicketRitual(t,n);let r=null;if(s)try{r=await v.createComment(n,s)}catch(l){console.error("Failed to post approval comment:",l)}$(`Review ritual "${i}" approved!`,"success"),Qo(r),O(),Ct()}catch(r){x("approve review ritual",r)}}function fw(e,t,n,i,s,a,o,r,l){pw(e,t,n,i,s,a,o,r,l)}ot(e=>{e==="currentProject"&&L()==="approvals"&&Ct()});let al=[],ol=0;async function Ct(){if(!C())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++ol;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=Y(),i=n?ee().filter(r=>r.id===n):ee(),s=await Promise.all(i.map(async r=>{const[l,c]=await Promise.all([v.getPendingApprovals(r.id),v.getLimboStatus(r.id)]);return{project:r,approvals:l,limbo:c}}));if(t!==ol)return;const a=[],o=[];for(const{project:r,approvals:l,limbo:c}of s)if(a.push(...l),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(u=>{var m;return(m=u.attestation)!=null&&m.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});d.length>0&&o.push({project:r,rituals:d})}ah(a),al=o,pp()}catch(n){if(t!==ol)return;e.innerHTML=H({icon:q.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),x("load approvals",n)}}function pp(){const e=document.getElementById("approvals-list");if(!e)return;const t=sh(),n=al.length>0,i=!Fg();if(t.length===0&&!n){i?e.innerHTML=`
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
            `:e.innerHTML=H({icon:q.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let s="";n&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${al.map(({project:d,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${f(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(m=>{const g=m.attestation&&!m.attestation.approved_at,y=g?"⏳":"○",b=g?`<span class="gate-waiting-info">Attested by <strong>${f(m.attestation.attested_by_name||"Unknown")}</strong></span>`:m.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',k=g?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${p(m.id)}"
                                            data-project-id="${p(d.id)}">Approve</button>`:m.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${p(m.id)}"
                                                data-project-id="${p(d.id)}"
                                                data-ritual-name="${p(m.name)}"
                                                data-ritual-artifact="${p(m.artifact||"")}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${y} ${f(m.name)}
                                                    <span class="badge badge-ritual-${p(m.approval_mode)}">${f(m.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${f(m.prompt)}</span>
                                                ${b}
                                            </div>
                                            ${k}
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
                    ${r.map(rl).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(rl).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(rl).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;uw(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var g;d.disabled=!0;const u=(g=d.closest(".gate-ritual-actions"))==null?void 0:g.querySelector(".review-approve-btn");u&&(u.disabled=!0);const m=d.dataset;try{await v.approveTicketRitual(m.ritualId,m.issueId),$(`Review ritual "${m.ritualName}" approved!`,"success"),await Ct()}catch(y){d.disabled=!1,u&&(u.disabled=!1),x("approve review ritual",y)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;fw(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".gate-reject-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;up(u.ritualId,u.issueId,u.ritualName,()=>Ct())})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await v.approveAttestation(d.dataset.ritualId,d.dataset.projectId),$("Sprint ritual approved!","success"),await Ct()}catch(u){d.disabled=!1,x("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{dp(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName,d.dataset.ritualArtifact||"")})})}function gw(){Ug(),pp()}function rl(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${f(i.requested_by_name)}</strong>${i.requested_at?` (${fs(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note">${ht(i.attestation_note)}</div>`:"",l=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=!s&&i.rejection_note,d=c?`<div class="gate-rejection-note"><strong>Rejected by ${f(i.rejected_by_name||"Someone")}</strong>${i.rejected_at?` (${fs(i.rejected_at)})`:""}: ${f(i.rejection_note)}<br><span class="text-muted">Waiting for the requester to ask again.</span></div>`:"",u=`<button class="btn btn-small btn-secondary gate-reject-btn"
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
    `}se({"view-issue-from-modal":(e,t)=>{e.preventDefault(),O(),oe(t.issueId)},"dismiss-approvals-explainer":()=>{gw()},"retry-load-approvals":()=>Ct()});const za={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Va={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let mp=0;function fp(e){mp=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=gp(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function gp(e="",t="",n=""){const i=mp++,s=Object.keys(za).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?za[e]:za.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${Va[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
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
    `}function hw(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",gp()),Wa()}function vw(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Wa()}function yw(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=za[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${Va[o]}</option>`).join(""),hp(e),Wa()}function hp(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function gs(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Wa(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function vp(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,l=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,c=o.querySelector(".condition-value");let d=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw gs("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw gs("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${l}`;if(n.has(u))throw gs(`Duplicate condition: ${r} ${Va[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),l==="isnull")t[u]=!0;else if(l==="in"||l==="contains")t[u]=d?d.split(",").map(m=>m.trim()).filter(m=>m):[];else if(l==="gte"||l==="lte"){if(!d)throw gs(`Please enter a numeric value for ${r} ${Va[l]}.`),new Error(`Missing numeric value for ${u}`);const m=parseInt(d,10);if(isNaN(m))throw gs(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${d}`);t[u]=m}else t[u]=d}return Wa(),Object.keys(t).length>0?t:null}se({"add-condition-row":()=>{hw()},"remove-condition-row":(e,t)=>{vw(Number(t.rowId))},"update-operator-options":(e,t)=>{yw(Number(t.rowId))},"toggle-value-input":(e,t)=>{hp(Number(t.rowId))}});let xe=[],ll=null;const yp=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];ot((e,t)=>{e==="currentProject"&&(t&&Ag(t),yp.forEach(n=>{const i=document.getElementById(n);i&&(i.value=t||"")}),qw(t||""))});const Ka={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function bp(e){ll=e}function ee(){return xe}function li(e){const t=xe.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return Ka[n]||Ka.fibonacci}function Ya(e,t){if(e==null)return"No estimate";const i=li(t).find(s=>s.value===e);return i?i.label:`${e} points`}function cl(e,t){return e==null||e===0?!1:!li(t).some(i=>i.value===e)}function bw(e){const t=xe.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(Ka[n]||Ka.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function dt(){if(C())try{xe=await v.getProjects(C().id),ww();const e=Y();if(e&&xe.some(i=>i.id===e))return;const t=dl();if(t&&xe.some(i=>i.id===t)){rt(t);return}const n=od();if(n&&xe.some(i=>i.id===n)){rt(n);return}xe.length>0&&rt(xe[0].id)}catch(e){x("load projects",e)}}function ww(){const e='<option value="">All Projects</option>'+xe.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+xe.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],i=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),i.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const s=Y();yp.forEach(a=>{const o=document.getElementById(a);o&&(o.value=s||"")})}function wp(){return od()}function An(){const e=document.getElementById("projects-list");if(xe.length===0){e.innerHTML=H({icon:q.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=xe.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${p(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${ie(t.color)}20; color: ${ie(t.color)}">
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
    `).join("")}function kw(e){rt(e),F("issues")}function kp(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,W()}async function $w(e){e.preventDefault();const t=C();if(!t){$("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.createProject(t.id,n),await dt(),An(),O(),$("Project created!","success")}catch(i){x("create project",i)}return!1}async function Ew(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.updateProject(t,n),await dt(),An(),O(),$("Project updated!","success")}catch(i){x("update project",i)}return!1}async function _w(e){const t=xe.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await v.deleteProject(e),await dt(),An(),O(),$("Project deleted","success")}catch(n){x("delete project",n)}}let Ae=null;function $p(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function xw(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await v.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(Ae!==e.id)return;const i=n.filter(a=>a.id===e.default_epic_id||a.status!=="done"&&a.status!=="canceled"),s=e.default_epic_id&&!i.some(a=>a.id===e.default_epic_id)?`<option value="${p(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(a=>`<option value="${p(a.id)}">${f(a.identifier)} ${f(a.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function Ep(e){Ae=e,xe.length===0&&await dt();const t=xe.find(n=>n.id===e);if(!t){$("Project not found","error"),F("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,$p("ps-require-assignee-on-claim",t.require_assignee_on_claim===!0),$p("ps-require-epic-on-close",t.require_epic_on_close===!0),xw(t),document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),_p("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function _p(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!zt||zt.length===0)&&hs()}function Iw(){Ae=null,zt=[]}function Sw(e){Ae=e}function Tw(){return zt}async function Lw(){if(!Ae)return;const e=document.getElementById("ps-name").value.trim();if(!e){$("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await v.updateProject(Ae,t),await dt(),$("Settings saved","success");const n=xe.find(i=>i.id===Ae);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){x("save project settings",n)}}async function Cw(){if(!Ae)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const a=document.getElementById("ps-default-epic");a&&!a.disabled&&(n.default_epic_id=a.value||null);try{await v.updateProject(Ae,n),await dt(),$("Settings saved","success")}catch(o){x("save settings",o)}}let zt=[];async function hs(){if(!Ae)return!1;try{return zt=await v.getRituals(Ae),Aw(),typeof ll=="function"&&ll(),!0}catch(e){return x("load rituals",e),!1}}function Aw(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=zt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=zt.filter(i=>i.trigger==="ticket_close"),n=zt.filter(i=>i.trigger==="ticket_claim");ci("ps-sprint-rituals-list",e,"sprint"),ci("ps-close-rituals-list",t,"close"),ci("ps-claim-rituals-list",n,"claim")}function ci(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>p(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${f(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${f(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${ht(a.prompt)}</div>
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
  `}).join("")}async function xp(e){if(!Ae)return;let t=[];try{t=await v.getRitualGroups(Ae)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${fp(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,W()}function Bw(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Dw(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function Ip(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw $("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await v.createRitualGroup(Ae,{name:t,selection_mode:n})).id}return e.value||null}async function Mw(e){var s;e.preventDefault();let t;try{t=vp()}catch{return!1}let n;try{n=await Ip()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await v.createRitual(Ae,i),await hs(),O(),$("Ritual created!","success")}catch(a){x("create ritual",a)}return!1}async function jw(e){const t=zt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await v.getRitualGroups(Ae)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${fp(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,W()}async function Rw(e,t){var a;e.preventDefault();let n;try{n=vp()}catch{return!1}let i;try{i=await Ip()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await v.updateRitual(t,s),await hs(),O(),$("Ritual updated!","success")}catch(o){x("update ritual",o)}return!1}async function Pw(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await v.deleteRitual(e),await hs(),$("Ritual deleted","success")}catch(n){x("delete ritual",n)}}se({"view-project":(e,t)=>{kw(t.projectId)},"view-project-settings":(e,t)=>{Ep(t.projectId)},"create-project":e=>{$w(e)},"update-project":(e,t)=>{Ew(e,t.projectId)},"confirm-delete-project":(e,t)=>{_w(t.projectId)},"edit-project-ritual":(e,t)=>{jw(t.ritualId)},"delete-project-ritual":(e,t)=>{Pw(t.ritualId,t.ritualName)},"create-project-ritual":e=>{Mw(e)},"update-project-ritual":(e,t)=>{Rw(e,t.ritualId)},"toggle-ritual-conditions":()=>{Bw()},"ritual-group-change":()=>{Dw()}});function dl(){const t=new URLSearchParams(window.location.search).get("project");return t||wp()}function qw(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const ul={},Sp=new Map;let pl=null,ml=null,fl=null,gl=null,hl=null,vl=null,yl=null,Tp=!1;function Nw(e){Object.assign(ul,e)}function Ow({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a,beforeScrollRestore:o}={}){e&&(pl=e),t&&(ml=t),n&&(fl=n),i&&(gl=i),s&&(hl=s),a&&(vl=a),o&&(yl=o)}function Lp(){return Object.keys(ul)}const Hw=["issues","query","board","sprints","epics","documents","rituals","approvals","my-issues"],Cp={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects"};function Za(e){document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)})}function F(e,t=!0,{transition:n=!1}={}){if(t&&Bn(),ta(e),t){let a;const o=dl();e==="my-issues"?a=o?`/?project=${o}`:"/":e==="issues"&&window.location.search?a=`/issues${window.location.search}`:Hw.includes(e)&&o?a=`/${e}?project=${o}`:a=`/${e}`,history.pushState({view:e},"",a)}Za(e),pl&&pl();const i=()=>{document.querySelectorAll(".view").forEach(o=>o.classList.add("hidden"));const a=document.getElementById(`${e}-view`);a&&a.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=ul[e];s&&s(),t&&window.scrollTo(0,0)}function Ap(){var s;ta(null);const e=window.location.pathname.split("/").filter(Boolean),t={"gate-approvals":"approvals"},n=e.length===0?"my-issues":t[e[0]]||e[0],i=e.length<=1&&Lp().includes(n);document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden")),i?((s=document.getElementById(`${n}-view`))==null||s.classList.remove("hidden"),Za(n)):Za(Cp[e[0]]||null)}function Bp(){var i;const t=window.location.pathname.split("/").filter(Boolean);gl&&gl(),L()||ta("my-issues");let n="my-issues";if(t.length===0||t[0]==="")F("my-issues",!1);else if(ml&&ml(t)){const s=Cp[t[0]];s&&Za(s);return}else{n=t[0];const s={"gate-approvals":"approvals"};s[n]&&(n=s[n]),Lp().includes(n)?F(n,!1):(n="my-issues",F("my-issues",!1))}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function Bn(){Sp.set(window.location.href,window.scrollY)}function Dp(e){Bn(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),hl&&hl(e)}function Mp(e){Bn(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),vl&&vl(e)}function jp(){const e=Sp.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{yl&&yl(),window.scrollTo(0,e)})}function Fw(){Tp||(Tp=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&fl&&fl(e.state)){jp();return}(t=e.state)!=null&&t.view?F(e.state.view,!1):Bp(),jp()}))}let Vt=0,di=!1,vs=null,Qa=null,ys=0;const Dn=new Map;function Xa(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Vt===0&&!di),e.textContent=di?"Stopped":"Offline",e.title=di?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function We(e,t){return Dn.has(e)||Dn.set(e,new Set),Dn.get(e).add(t),()=>{var n;return(n=Dn.get(e))==null?void 0:n.delete(t)}}function Uw(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const Gw=1e3;function Ja(){Qa&&(clearTimeout(Qa),Qa=null)}const zw="chaotic",bl=4001,Vw=4003,Ww="chaotic.bearer.";function Kw(e){return[zw,Ww+e]}function Rp(e,{isReconnect:t=!1}={}){vs&&(clearTimeout(vs),vs=null),Ja();const n=lh();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),tr(null)),!t&&(Vt>0||di)&&(Vt=0,di=!1,Xa());const i=v.getToken();if(!i)return;const s=++ys,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o,Kw(i));tr(r);let l=!1;const c=()=>{if(l||s!==ys)return;l=!0,Ja();const d=Vt>0;d&&$("Live updates reconnected","success"),Vt=0,Xa(),d&&wl({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===ys&&(console.log("WebSocket connected"),Ja(),Qa=setTimeout(c,Gw))},r.onmessage=d=>{if(s!==ys)return;c();let u;try{u=JSON.parse(d.data)}catch(m){console.error("WebSocket: malformed message",m);return}wl(u)},r.onclose=d=>{if(s!==ys)return;console.log("WebSocket disconnected"),Ja();const u=d==null?void 0:d.code;if(u===bl||u===Vw){tr(null),Vt=0;const g=u===bl&&ad()===i;di=!g,Xa();let y="forbidden";u===bl&&(y=g?"unauthorized":"superseded"),wl({type:y,entity:"connection",data:{code:u,teamId:e}});return}Vt++,Vt===1&&$("Live updates disconnected. Reconnecting...","warning"),Xa();const m=Uw(Vt-1);vs=setTimeout(()=>{vs=null,C()&&C().id===e&&Rp(e,{isReconnect:!0})},m)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function wl(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=Dn.get(`${n}:${t}`);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=Dn.get(n);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=Dn.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}const Yw={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device",children_closed:"Nothing left open"};let ui=0,At=!1,he=null,un=null;const bs=new Set,Bt=new Map,ut=new Map;function Pp(e){Bt.get(e)===null&&Bt.set(e,ui)}function kl(e){const t=ut.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=ui)}function Zw(e){return e.filter(t=>!Bt.has(t.id)).map(t=>{const n=ut.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(At&&ut.has(t.id)&&t.id!==he))}function Qw(e){for(const[t,n]of Bt)n!==null&&e>n&&Bt.delete(t);for(const[t,n]of ut)n.confirmedAfter!==null&&e>n.confirmedAfter&&ut.delete(t)}function Xw(e,t){t!=null&&t.id&&(e==="archived"?(Bt.has(t.id)||Bt.set(t.id,null),Pp(t.id)):e==="read"&&kl(t.id))}async function pi(){const e=C();if(e){try{const t=await v.getInboxUnreadCount(e.id);Ui(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}ws()}}function ws(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=aa();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0);const n=document.getElementById("inbox-header-count");n&&(n.textContent=t>0?`${t} unread`:"")}async function ks({focusFirst:e=!1,background:t=!1}={}){const n=C();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++ui;t||(un={focusFirst:e||!!(un!=null&&un.focusFirst)},he=null,Jw(i));try{const a=await v.getInbox(n.id,{unread:At,limit:100});if(s!==ui)return;const o=new Set(Bt.keys());Qw(s);const r=Zw(a||[]),l=un;un=null,l?(Ot(r),Es(),l.focusFirst&&!et()&&nk()):ek(r,o)}catch(a){if(s!==ui)return;un?(un=null,i.innerHTML=H({icon:q.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),x("load inbox",a)):console.error("Failed to refresh inbox:",a)}pi()}function Jw(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function eo(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function qp(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function Np(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function Op(e,t){if(!e)return;const n=eo(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=qp(n||t)),i==null||i.focus({preventScroll:!0})}function ek(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=ge(),s=[...n.querySelectorAll(".inbox-row")],a=n.querySelector(".inbox-row.keyboard-selected"),o=(a==null?void 0:a.dataset.entryId)||null,r=a?s.indexOf(a):-1,l=Np(),c=window.scrollY,d=n.scrollTop;let u=e;if(he&&!e.some(y=>y.id===he)){const y=i.find(b=>b.id===he);if(y&&At&&!t.has(he)){u=[...e];const b=u.findIndex(k=>k.created_at<y.created_at);u.splice(b===-1?u.length:b,0,y)}else he=null}Ot(u),Es();let m=-1;o&&(m=u.findIndex(y=>y.id===o),m===-1&&u.length&&(m=Math.min(r,u.length-1))),m>=0?$s(m,{focus:!1}):sa(-1);const g=m>=0?n.querySelectorAll(".inbox-row")[m]:null;Op(l,g),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function tk(e,t){if(!(t!=null&&t.id))return!1;const n=ge().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function mi(e){const t=ge();for(const n of new Set(e)){const i=eo(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const a=i.contains(document.activeElement)?Np():null,o=document.createElement("template");o.innerHTML=zp(s).trim();const r=o.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),Op(a,r)}}function $s(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){sa(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),sa(i),t&&qp(n[i]).focus({preventScroll:!0})}function nk(){$s(0)}async function $l(e){const t=ge(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;he===e&&(he=null),Bt.set(e,null),Ot(t.filter(a=>a.id!==e)),s&&Ui(Math.max(0,aa()-1)),Es(),ws(),$s(n);try{await v.archiveInbox(e),Pp(e)}catch(a){Bt.delete(e),console.error("Failed to archive inbox entry:",a)}}function Hp(e){var s,a;const n=ge().findIndex(o=>o.id===e);if(n===-1)return;const i=he;he=i===e?null:e,he===e&&Fp(e),mi([i,e]),$s(n),he===e&&((a=(s=eo(e))==null?void 0:s.scrollIntoView)==null||a.call(s,{block:"nearest"}))}function Fp(e){const t=ge(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,ut.set(e,{readAt:i,confirmedAfter:null}),Ot([...t]),Ui(Math.max(0,aa()-1)),ws(),v.markInboxRead(e).then(()=>kl(e),s=>{var o;((o=ut.get(e))==null?void 0:o.readAt)===i&&ut.delete(e);const a=ge().find(r=>r.id===e);a&&a.read_at===i&&(a.read_at=null,Ot([...ge()]),mi([e])),pi(),x("mark inbox entry read",s)})}function ik(e){var i;const n=ge().findIndex(s=>s.id===e);if(n!==-1){if(Fp(e),At)he===e&&(he=null),Ot(ge().filter(s=>s.id!==e)),Es(),$s(n);else if(mi([e]),!document.activeElement||document.activeElement===document.body){const s=eo(e);(i=s==null?void 0:s.querySelector(".inbox-row-toggle"))==null||i.focus({preventScroll:!0})}}}function sk(){if(he===null)return!1;const e=he;return he=null,mi([e]),!0}function Up(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function ak(e){if(bs.has(e))return;const t=ge().find(i=>i.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender";bs.add(e),Up(e,!0);try{await v.updateIssue(t.issue_id,{assignee_id:t.source_user_id})}catch(i){bs.delete(e),Up(e,!1),x(`reassign ${t.issue_identifier||"issue"} back to ${n}`,i);return}bs.delete(e),$l(e)}function ok(){Gp(!At)}function Gp(e){e!==At&&(At=e,document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(t=>{const n=t.dataset.filter==="unread"===At;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),ks({focusFirst:!0}))}const rk='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',lk='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';function ck(e){const t=[...(e||"").trim()][0];return t?t.toUpperCase():"•"}function zp(e){const t=!e.read_at,n=e.id===he,i=Yw[e.kind]||e.kind,s=e.issue_identifier||e.document_title||"",a=[`data-entry-id="${p(e.id)}"`,e.issue_id?`data-issue-id="${p(e.issue_id)}"`:"",e.document_id?`data-document-id="${p(e.document_id)}"`:""].filter(Boolean).join(" "),o=`inbox-panel-${e.id}`;return`
        <div class="inbox-row${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${a}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${p(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${p(o)}"`:""}>
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':'<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${f(ck(e.source_user_name))}</span>
                    <span class="inbox-row-header">
                        <span class="badge badge-inbox-${p(e.kind)}">${f(i)}</span>
                        ${s?`<span class="inbox-row-source">${f(s)}</span>`:""}
                    </span>
                    <span class="inbox-row-text">
                        <span class="inbox-row-title">${f(e.title)}</span>
                        ${!n&&e.body?`<span class="inbox-row-body">${f(e.body)}</span>`:""}
                    </span>
                </button>
                ${n?dk(e,s,o):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${t?`<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${p(e.id)}" title="Mark read" aria-label="Mark read">${rk}</button>`:""}
                    <button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${p(e.id)}" title="Archive (e)" aria-label="Archive">${lk}</button>
                </span>
                <span class="inbox-row-time">${f(fs(e.created_at))}</span>
            </div>
        </div>
    `}function dk(e,t,n){const i=(e.kind==="assignment"||e.kind==="review_requested")&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,a=e.source_user_name,o=t?`Open ${f(t)}`:"Open",r=[i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${p(e.id)}"${bs.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${a?` to ${f(a)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
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
    `}function Es(){const e=document.getElementById("inbox-list");if(!e)return;const t=ge();if(t.length===0){e.innerHTML=H({icon:q.inbox,heading:At?"No unread items":"Inbox zero",description:At?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=pk(t)}function uk(e,t=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"Older";const i=a=>new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),s=Math.round((i(t)-i(n))/864e5);return s<=0?"Today":s===1?"Yesterday":s<7?"Last 7 days":"Older"}function pk(e){const t=[];for(const n of e){const i=uk(n.created_at),s=t[t.length-1];s&&s.label===i?s.entries.push(n):t.push({label:i,entries:[n]})}return t.map((n,i)=>`
        <section class="inbox-group" aria-labelledby="inbox-group-${i}">
            <h3 class="inbox-group-header" id="inbox-group-${i}">${f(n.label)}</h3>
            ${n.entries.map(s=>zp(s)).join("")}
        </section>
    `).join("")}async function mk(e){var s;const t=ge().find(a=>a.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();ut.set(e,{readAt:n,confirmedAfter:null});try{await v.markInboxRead(e)}catch(a){((s=ut.get(e))==null?void 0:s.readAt)===n&&ut.delete(e);const o=ge().find(r=>r.id===e);o&&o.read_at===n&&(o.read_at=null,Ot([...ge()]),mi([e])),console.error("Failed to mark inbox entry read:",a);return}kl(e);const i=ge().find(a=>a.id===e);i&&!i.read_at?(i.read_at=n,Ot([...ge()]),Ui(Math.max(0,aa()-1)),ws(),mi([e])):pi()}async function fk(){const e=C();if(e)try{await v.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of ge())n.read_at||ut.set(n.id,{readAt:t,confirmedAfter:ui});Ot(ge().map(n=>({...n,read_at:n.read_at||t}))),Ui(0),ws(),Es()}catch(t){x("mark all inbox entries read",t)}}function gk(e){e.entryId&&mk(e.entryId),e.issueId?oe(e.issueId):e.documentId&&Ce(e.documentId)}function hk(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&$l(e.dataset.entryId)}function vk(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Hp(e.dataset.entryId)}const yk='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function bk(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(yk);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function wk(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}se({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&wk((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||bk(e.target,n)||(e.preventDefault(),t.entryId&&Hp(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),gk(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&ak(t.entryId)},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&$l(t.entryId)},"toggle-inbox-unread-filter":()=>ok(),"set-inbox-filter":(e,t)=>Gp(t.filter==="unread"),"mark-inbox-read":(e,t)=>{e.preventDefault(),t.entryId&&ik(t.entryId)},"mark-all-inbox-read":()=>fk(),"retry-load-inbox":()=>ks({focusFirst:!0})});let to=[],fi=[],El=[],_l=[];function kk(){return to}function Mn(){return fi}async function xl(e=null){try{to=await(e||v.getMyTeams()),$k()}catch(t){x("load teams",t)}}function $k(){const e=document.getElementById("team-list");to.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=to.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${p(JSON.stringify(t))}">${f(t.name)}</button>
        `).join("")}async function Il(e,t=!1){Gi(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const i=document.getElementById("team-description-text");i&&(i.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),Rp(e.id),await Promise.all([dt(),Hk(),_k(),gy(),pi()]),t?Bp():F(L()||"my-issues")}function Vp(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Ek(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function _k(){if(C())try{fi=await v.getTeamMembers(C().id),ca(Mn,ns),Vi()}catch(e){console.error("Failed to load team members:",e),x("load team members",e)}}function Sl(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let Tl=0;async function Ll(){if(!C())return;const e=++Tl,t=document.getElementById("team-members-list");t&&(t.innerHTML=Sl());try{const n=await v.getTeamMembers(C().id);if(e!==Tl)return;fi=n,ca(Mn,ns),Vi(),xk()}catch(n){if(e!==Tl)return;t&&(t.innerHTML=H({icon:q.team,heading:"Couldn't load members",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-members"},variant:"error"})),fi=[],Wp(),x("load team members",n)}}function no(){var n;const e=(n=_t())==null?void 0:n.id,t=fi.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function Wp(){const e=document.getElementById("invite-member-btn");e&&e.classList.toggle("hidden",!no())}function xk(){const e=document.getElementById("team-members-list"),t=no();Wp(),e.innerHTML=fi.map(n=>`
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
                ${t&&n.user_id!==_t().id&&n.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${p(n.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}let Cl=0;async function io(){if(!C())return;const e=++Cl,t=document.getElementById("team-invitations-list");t&&(t.innerHTML=Sl());try{const n=await v.getTeamInvitations(C().id);if(e!==Cl)return;El=n,Ik()}catch(n){if(e!==Cl)return;if((n==null?void 0:n.status)===403){document.getElementById("team-invitations-list").innerHTML="";return}console.error("Failed to load team invitations:",n),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function Ik(){const e=document.getElementById("team-invitations-list");if(El.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}const t=no();e.innerHTML=El.map(n=>`
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
    `).join("")}let Al=0;async function Kp(){if(!C())return;const e=++Al,t=document.getElementById("team-agents-list");t&&(t.innerHTML=Sl());try{const n=await v.getTeamAgents(C().id);if(e!==Al)return;_l=n,Sk()}catch(n){if(e!==Al)return;t&&(t.innerHTML=H({icon:q.team,heading:"Couldn't load agents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-agents"},variant:"error"})),x("load team agents",n)}}function Sk(){const e=document.getElementById("team-agents-list");if(e){if(_l.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=_l.map(t=>{const n=f(t.name),i=f(t.parent_user_name||"Unknown"),s=t.avatar_url||"🤖";return`
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
      `}).join("")}}function Yp(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,W()}async function Tk(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await v.createInvitation(C().id,t,n);if(await io(),i&&i.accept_url)return Ak(t,Ck(i.accept_url),i.email_queued===!0),!1;O(),$("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){Lk(i)?$(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):x("send invitation",i)}return!1}function Lk(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function Zp(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function Ck(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!Zp(n.hostname)||Zp(i.hostname)?e:i.origin+n.pathname}function Ak(e,t,n=!1){var a;const i=f(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${f(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,et()||W(),(a=document.querySelector('[data-action="copy-invite-link"]'))==null||a.focus(),Qp()}function Qp(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function Bk(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),$("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),$("Could not copy: the link is selected, copy it by hand","error")}}async function Dk(e){let t;try{t=await v.issueInvitationVerificationCode(C().id,e)}catch(n){x("get a verification code",n);return}jk(t)}function Mk(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let a;return s<3600?a=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?a=`${Math.round(s/3600)} h`:a=`${Math.round(s/86400)} days`,`${a} ${n>=i?"after":"before"} the invitation was created`}function jk(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=Mk(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
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
    `,et()||W(),Qp("invitation-code")}async function Rk(e){if(confirm("Are you sure you want to remove this member?"))try{await v.removeMember(C().id,e),await Ll(),$("Member removed!","success")}catch(t){x("remove member",t)}}async function Pk(e){try{await v.deleteInvitation(C().id,e),await io(),$("Invitation canceled!","success")}catch(t){x("cancel invitation",t)}}function Xp(){Vp(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,W()}function qk(){C()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${p(C().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${p(C().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${f(C().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,W())}async function Nk(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await v.createTeam(t);await xl(),await Il(n),O(),$("Team created!","success")}catch(n){x("create team",n)}return!1}async function Ok(e){if(e.preventDefault(),!C())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await v.updateTeam(C().id,t);Gi(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||"No description"),await xl(),O(),$("Team updated!","success")}catch(n){x("update team",n)}return!1}async function Hk(){if(C())try{const e=await v.getLabels(C().id);na(e)}catch(e){console.error("Failed to load labels:",e),x("load labels",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),se({"select-team":(e,t)=>{Il(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{Rk(t.userId)},"delete-invitation":(e,t)=>{Pk(t.invitationId)},"issue-invitation-code":(e,t)=>{Dk(t.invitationId)},"retry-load-team-invitations":()=>{io()},"retry-load-team-members":()=>{Ll()},"retry-load-team-agents":()=>{Kp()},"invite-member":e=>{Tk(e)},"copy-invite-link":()=>{Bk()},"dismiss-invite-link":()=>{O()},"create-team":e=>{Nk(e)},"update-team":e=>{Ok(e)}});let Dt=null,Wt=0,gi=null,hi=null,_s=null,Bl=!1;function Fk(){return Bg()}function Jp(){Dg()}function em(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Uk(){Dt||(Dt=document.createElement("div"),Dt.id="onboarding-overlay",Dt.className="onboarding-overlay",document.getElementById("app").appendChild(Dt))}function xs(){if(!Dt)return;const e=Bl?nm():tm(),t=e[Wt],n=e.map((i,s)=>`<span class="onboarding-dot${s===Wt?" active":""}${s<Wt?" completed":""}"></span>`).join("");Dt.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function tm(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=em(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=em(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&gi&&(e.textContent=`${gi.name} (${gi.key})`),t&&hi&&(t.textContent=`${hi.name} (${hi.key})`),n&&_s&&(n.textContent=`${_s.identifier} - ${_s.title}`)}}]}function nm(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function Dl(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Ml(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function vi(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function Gk(){const e=Bl?nm():tm();Wt<e.length-1&&(Wt++,xs())}function zk(){Jp(),sm(),yi()}function Vk(){Jp(),sm(),yi()}async function Wk(e){e.preventDefault(),Ml("onboarding-team-error"),vi("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{gi=await v.createTeam({name:t,key:n}),Wt++,xs()}catch(i){Dl("onboarding-team-error",i.message||"Failed to create team"),vi("onboarding-team-submit",!1)}}async function Kk(e){e.preventDefault(),Ml("onboarding-project-error"),vi("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{hi=await v.createProject(gi.id,{name:t,key:n}),Wt++,xs()}catch(i){Dl("onboarding-project-error",i.message||"Failed to create project"),vi("onboarding-project-submit",!1)}}async function Yk(e){e.preventDefault(),Ml("onboarding-issue-error"),vi("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{_s=await v.createIssue(hi.id,{title:t}),Wt++,xs()}catch(n){Dl("onboarding-issue-error",n.message||"Failed to create issue"),vi("onboarding-issue-submit",!1)}}function im(e=!1){Bl=e,Wt=0,gi=null,hi=null,_s=null,Uk(),xs()}function sm(){Dt&&(Dt.remove(),Dt=null)}function am(){Mg(),im(!0)}se({"onboarding-next":e=>{e.preventDefault(),Gk()},"onboarding-skip":e=>{e.preventDefault(),zk()},"onboarding-finish":e=>{e.preventDefault(),Vk()},"onboarding-create-team":e=>{Wk(e)},"onboarding-create-project":e=>{Kk(e)},"onboarding-create-issue":e=>{Yk(e)}});const om="/oauth/consent/";function Zk(e){if(!e||!e.startsWith(om))return null;const t=e.slice(om.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function Qk(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function Xk(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function Jk(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const rm={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function so(e){const t=rm[e.trust]||rm.unverified,n=e.host?` · ${f(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${p(e.trust)}">${f(t)}${n}</span>`}function e$(e,t){return e.teams.map(n=>`<option value="${p(n.id)}"${n.id===t?" selected":""}>${f(n.name)}</option>`).join("")}function t$(e,t){const n=e&&t?e.agents.find(a=>a.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${f(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function lm(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",a=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${p(i.id)}"${s}>${f(i.name+a)}</option>`)}return n.join("")}function cm(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${p(t.id)}">
            ${f(t.name)} <span class="oauth-muted">${f(t.key)}</span>
        </label>`).join("")}function n$(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${p(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${f(t.name)}${f(i)}
        </label>`}).join("")}function i$(e,t){const n=f(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${so(t.client)}</p>
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
        </div>`}function s$(e,t){if(t.acts_as==="person"){i$(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=f(t.client.name),a=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",o=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${f(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${so(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${f(t.redirect_host)}</strong></p>
            ${o}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${e$(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${lm(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${p(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${cm(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${n$(t)}
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,jl(e,t)}function jl(e,t){var a;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const o=(a=e.querySelector("#oauth-team"))==null?void 0:a.value,r=t$(t.teams.find(l=>l.id===o),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function a$(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(o=>o.value),s=e.querySelector('input[name="oauth-policy"]:checked'),a={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const o=e.querySelector("#oauth-agent-name").value.trim();o&&(a.agent_name=o)}return a}function o$(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function Is(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${f(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function r$(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{v.logout(),t()})}function l$(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(u=>u.id===s.value);e.querySelector("#oauth-agent").innerHTML=lm(d,null),e.querySelector("#oauth-projects").innerHTML=cm(d),jl(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>jl(e,n));let a=!1;const o=async d=>{if(!a){a=!0;try{const u=d?await v.approveOAuthRequest(t,a$(e)):await v.denyOAuthRequest(t);if(!Qk(u.redirect)){Is(e,"The app's return address isn't one a browser should be sent to.");return}i(u.redirect)}catch(u){if(a=!1,u&&u.status===404){Is(e,"It has expired, was already answered, or belongs to someone else.");return}o$(e,u&&u.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),o(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>o(!1))}async function c$(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=Xk();Jk(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await v.getOAuthRequest(e)}catch(a){a&&a.status===404?Is(i,"It has expired, was already answered, or belongs to someone else."):a&&a.status===403&&a.detail&&a.detail.error_code==="web_login_required"?r$(i,n):a&&a.status===403?Is(i,"Only a person signed in to Chaotic can approve an app."):Is(i,a&&a.message||"Something went wrong");return}s$(i,s),l$(i,e,s,t)}const Rl="/invite/",Ss="/invite",Pl="chaotic.inviteToken",dm="invite-auth-notice";let ql=null;const d$="This invitation is no longer valid.",u$={owner:"an owner",admin:"an admin",member:"a member"};function p$(e){if(!e||!e.startsWith(Rl))return null;const t=e.slice(Rl.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function um(){const{pathname:e}=window.location,t=p$(e);if(t){ql=t;try{sessionStorage.setItem(Pl,t)}catch{}return history.replaceState(null,"",Ss),t}if(!pm(e))return null;let n=null;try{n=sessionStorage.getItem(Pl)}catch{}const i=n||ql;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function pm(e){return e===Ss||e===`${Ss}/`}function mm(e){return pm(e)||!!(e&&e.startsWith(Rl))}function Nl(){ql=null;try{sessionStorage.removeItem(Pl)}catch{}}function m$(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function f$(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function Ol(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function fm(){const e=f$();return ao(),Ol(e),e}function g$(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),ao()}function ao(){var e;(e=document.getElementById(dm))==null||e.remove()}function Hl(e){const t=e.invited_by_name?`<strong>${f(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=u$[e.role]||`a ${f(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${f(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${f(e.email_hint)}</strong>${h$(e)}</p>`}function h$(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${f(n)}`}const v$="Ask whoever invited you to send a new invitation.",y$="Reload the page to try again.";function Fl(e,t=d$,n=v$){e.innerHTML=`
        <div class="invite-page">
            <h1>${f(t)}</h1>
            <p class="invite-muted">${f(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function b$(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function gm(){window.location.pathname!==Ss&&history.replaceState(null,"",Ss),b$(fm())}function w$(e,t){e.innerHTML=`
        <div class="invite-page">
            ${Hl(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function k$(e,t,n){const i=m$(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${f(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${Hl(t)}
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
            ${Hl(t)}
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
        </div>`}function $$(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function E$(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),a=e.querySelector("#invite-code-form"),o=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=u=>{l.textContent=u,l.classList.remove("hidden")},d=()=>{var u;a.classList.remove("hidden"),(u=o.focus)==null||u.call(o)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const u=await v.requestEmailVerification(),m=$$(u.expires_at);c(`We sent a code to ${u.email}${m?`; it works until ${m}`:""}.`),s.textContent="Send a new code",d()}catch(u){const m=u&&u.detail&&u.detail.error_code;if(u&&u.status===401){n();return}if(m==="email_already_verified"){t();return}c(u&&u.message||"Something went wrong"),u&&u.status===429&&d()}finally{s.disabled=!1}}}),a.addEventListener("submit",async u=>{var g;if(u.preventDefault(),r.disabled)return;const m=o.value.trim();if(m){r.disabled=!0;try{await v.confirmEmailVerification(m)}catch(y){r.disabled=!1;const b=y&&y.detail&&y.detail.error_code;y&&y.status===401?n():b==="email_already_verified"?t():(c(y&&y.message||"Something went wrong"),(g=o.select)==null||g.call(o));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function _$(e,t){ao();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=dm,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${f(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${f(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),ao(),t()})}function oo(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function x$(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,u;const a=fm();a.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let o;try{o=await v.getInvitation(e)}catch(m){m&&m.status===404?(Nl(),Fl(a)):Fl(a,m&&m.message||"Something went wrong.",y$);return}if(!t){w$(a,o);const m=g=>{_$(o,()=>Ol(a)),n(g)};a.querySelector("#invite-sign-in").addEventListener("click",()=>m("login")),a.querySelector("#invite-sign-up").addEventListener("click",()=>m("signup"));return}k$(a,o,t),(d=a.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=a.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async m=>{var y,b;if(l)return;l=!0,r.disabled=!0;let g;try{g=m===void 0?await v.acceptInvitation(e):await v.acceptInvitation(e,m)}catch(k){l=!1,r.disabled=!1;const T=k&&k.detail&&k.detail.error_code;if(m!==void 0&&(T==="invalid_verification_code"||T==="invitation_code_expired"||k&&k.status===429)){oo(a,k&&k.message||"That code did not work."),(b=(y=a.querySelector("#invite-admin-code"))==null?void 0:y.select)==null||b.call(y);return}k&&k.status===401?s():k&&(k.status===404||k.status===400)?(Nl(),Fl(a)):k&&k.status===403&&k.detail&&k.detail.error_code==="email_unverified"?(oo(a,"Verify your email address to continue."),a.querySelector("#invite-accept-actions").classList.add("hidden"),a.querySelector("#invite-verify").classList.remove("hidden")):k&&k.status===403?oo(a,`This invitation is for a different email address. Only ${o.email_hint} can accept it.`):oo(a,k&&k.message||"Something went wrong");return}Nl(),hm(a,o);try{await i(g.team_id,o.team_name)}catch(k){console.error("Joined the team but could not open it:",k),Ol(a),hm(a,o)}};r.addEventListener("click",()=>c()),(u=a.querySelector("#invite-admin-code-form"))==null||u.addEventListener("submit",m=>{m.preventDefault();const g=a.querySelector("#invite-admin-code").value.trim();g&&c(g)}),E$(a,{onVerified:()=>{a.querySelector("#invite-verify").classList.add("hidden"),a.querySelector("#invite-error").classList.add("hidden"),a.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function hm(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${f(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${f(t.team_name)}</a>
            </div>
        </div>`}function Ul(e){return x$(e,{user:_t(),showAuth:t=>{Cs(),t==="signup"?bm():ym()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),g$(),await yi({teamId:t}),$(`You joined ${n}`,"success")},signOut:()=>{v.logout(),Gn(null),Gi(null),Ul(e)}})}async function vm(){const e=um();if(e){await Ul(e);return}if(mm(window.location.pathname)){gm();return}Cs()}async function yi({teamId:e,teamsRequest:t=null}={}){const n=Zk(window.location.pathname);if(n){await c$(n);return}const i=um();if(i){await Ul(i);return}if(mm(window.location.pathname)){gm();return}I$(),Ap(),C$(),await xl(t);const s=kk();if(s.length===0&&!Fk()){im();return}s.length===0&&ta("my-issues");try{if(s.length>0){const a=e&&s.find(o=>o.id===e)||s[0];await Il(a,!0)}}finally{Fw()}}let bi=null,Ts=null,vt=null,yt=null;function Ls(){bi||(bi=document.getElementById("auth-screen"),Ts=document.getElementById("main-screen"),vt=document.getElementById("login-form"),yt=document.getElementById("signup-form"))}function Cs(){Ls(),bi&&bi.classList.remove("hidden"),Ts&&Ts.classList.add("hidden")}function I$(){Ls(),bi&&bi.classList.add("hidden"),Ts&&Ts.classList.remove("hidden")}function ym(){Ls(),vt&&vt.classList.remove("hidden"),yt&&yt.classList.add("hidden")}function bm(){Ls(),vt&&vt.classList.add("hidden"),yt&&yt.classList.remove("hidden")}async function S$(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await v.login(t,n),Gn(await v.getMe()),await yi(),$("Welcome back!","success")}catch(i){x("log in",i)}return!1}async function T$(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await v.signup(t,n,i),await v.login(n,i),Gn(await v.getMe()),await yi(),$("Account created successfully!","success")}catch(s){x("sign up",s)}return!1}function wm(){v.logout(),Gn(null),Gi(null),Cs(),$("Signed out","success")}function L$(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function C$(){var i;const e=_t();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",Xo(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?L$(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${p(s)}" alt="${p(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function A$(){Ls();const e=vt==null?void 0:vt.querySelector("form");e&&e.addEventListener("submit",s=>S$(s));const t=yt==null?void 0:yt.querySelector("form");t&&t.addEventListener("submit",s=>T$(s));const n=vt==null?void 0:vt.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),bm()});const i=yt==null?void 0:yt.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),ym()})}let Gl=[];async function zl(){try{Gl=await v.getApiKeys(),B$()}catch(e){x("load API keys",e)}}function B$(){const e=document.getElementById("api-keys-list");if(e){if(Gl.length===0){e.innerHTML=H({icon:q.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=Gl.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${f(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${f(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${tt(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${tt(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${p(t.id)}" data-key-name="${p(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function D$(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,W()}async function M$(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await v.createApiKey(t);O(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,W()}catch(n){x("create API key",n)}return!1}async function j$(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),$("API key copied to clipboard","success")}catch{$("Failed to copy","error")}}async function R$(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await v.revokeApiKey(e),$("API key revoked","success"),await zl()}catch(n){x("revoke API key",n)}}se({"create-api-key":e=>{M$(e)},"copy-api-key":()=>{j$()},"dismiss-api-key-modal":()=>{O(),zl()},"revoke-api-key":(e,t)=>{R$(t.keyId,t.keyName)}});let Vl=[];async function km(){try{Vl=await v.getConnections(),q$()}catch(e){x("load connected apps",e)}}function Wl(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function P$(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function q$(){const e=document.getElementById("connected-apps-list");if(e){if(Vl.length===0){e.innerHTML=H({icon:q.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=Vl.map(t=>t.acts_as==="person"?N$(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${f(Wl(t))} ${so(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${f(t.agent?t.agent.name:"an agent")}</span>
                    <span>${f(P$(t))}</span>
                    <span>policy ${f(t.policy)}</span>
                    <span class="api-key-date">Connected ${tt(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${tt(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${f(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(t.id)}" data-connection-name="${p(Wl(t))}">Disconnect</button>
        </div>
    `).join("")}}function N$(e){const n=`${e.device_name||"A device"} · ${Wl(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${f(n)} ${so(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${tt(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${tt(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(e.id)}" data-connection-name="${p(n)}">Sign out</button>
        </div>
    `}async function O$(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await v.revokeConnection(e),$("App disconnected","success"),await km()}catch(n){x("disconnect app",n)}}se({"revoke-connection":(e,t)=>{O$(t.connectionId,t.connectionName)}});let Kl=[];async function $m(){try{Kl=await v.getPushDevices(),H$()}catch(e){x("load push devices",e)}}const Em={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function _m(e){return e.label||e.platform||"Unnamed device"}function H$(){const e=document.getElementById("push-devices-list");if(e){if(Kl.length===0){e.innerHTML=H({icon:q.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=Kl.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${f(_m(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${f(t.platform)}</span>`:""}
                    <span>via ${f(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${tt(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${tt(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${f(String(t.failure_count))} failed deliveries</span>`:""}
                    ${Em[t.status]?`<span class="push-device-status">${f(Em[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${p(t.installation_id)}" data-device-name="${p(_m(t))}">Remove</button>
        </div>
    `).join("")}}async function F$(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await v.deletePushDevice(e),$("Device removed","success"),await $m()}catch(n){x("remove push device",n)}}se({"remove-push-device":(e,t)=>{F$(t.installationId,t.deviceName)}});let ro=!1,Kt=0,pn=[],lo=[];function U$(e){lo=e,pn=[...e]}function mn(){return ro}function G$(){if(ro)return;ro=!0,Kt=0,pn=[...lo];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&co()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>z$(n.target.value)),t.addEventListener("keydown",W$),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&V$(Number(i.dataset.commandIndex))}),As(),requestAnimationFrame(()=>t.focus())}function co(){ro=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function z$(e){const t=e.toLowerCase().trim();t?pn=lo.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):pn=[...lo],Kt=0,As()}function As(){const e=document.getElementById("command-results");if(!e)return;if(pn.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};pn.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===Kt?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function V$(e){Kt=e,As()}function xm(e){const t=pn[e];t&&(co(),t.action())}function W$(e){switch(e.key){case"ArrowDown":e.preventDefault(),Kt=Math.min(Kt+1,pn.length-1),As();break;case"ArrowUp":e.preventDefault(),Kt=Math.max(Kt-1,0),As();break;case"Enter":e.preventDefault(),xm(Kt);break;case"Escape":e.preventDefault(),co();break}}se({"execute-command":(e,t)=>{xm(Number(t.commandIndex))}});const K$=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function Y$(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${f(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${f(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function Z$(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${f(e.title)}</h4>
        ${e.shortcuts.map(Y$).join("")}
    </div>`}function Im(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${K$.map(Z$).join("")}
        </div>
    `,W()}const uo=100,Yl="status!=done,canceled",Q$=["created","updated","priority","status","title","estimate"];function ve(e){return e==null?"":f(String(e))}function Sm(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${p(t)}">${ve(n)}</a>`}function Tm(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const Zl=[{id:"identifier",label:"ID",fixed:!0,render:e=>Sm(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>Sm(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>ve(ke(e.status))},{id:"priority",label:"Priority",render:e=>ve(Fe(e.priority))},{id:"type",label:"Type",render:e=>ve(Et(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>ve(Tm(e,"assignee"))},{id:"creator",label:"Creator",render:e=>ve(Tm(e,"creator"))},{id:"project",label:"Project",render:e=>ve(e.project_key)},{id:"sprint",label:"Sprint",render:e=>ve(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=ie(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${ve(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>ve(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${p(e.parent_id)}">${ve(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>ve(tt(e.created_at))},{id:"updated",label:"Updated",render:e=>ve(tt(e.updated_at))},{id:"completed",label:"Completed",render:e=>ve(tt(e.completed_at))},{id:"due",label:"Due",render:e=>ve(tt(e.due_date))}],po=Object.fromEntries(Zl.map(e=>[e.id,e])),X$=Zl.filter(e=>e.fixed).map(e=>e.id),Ql=["identifier","title","status","priority","assignee","updated"];function Xl(e){const t=new Set,n=[];for(const s of e||[]){const a=String(s).trim();!po[a]||t.has(a)||(t.add(a),n.push(a))}return n.length===0?[...Ql]:[...X$.filter(s=>!t.has(s)),...n]}function J$(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function eE(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?Xl(t.get("cols").split(",")):[...Ql],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function tE(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!J$(e.cols,Ql)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function nE(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function iE({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=uo,skip:a=0}){const o=["chaotic","issue","list"];let r=e||"",l=null;n||i?(o.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",o.push("--where",nE(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],u=d.startsWith("-"),m=d.replace(/^[-+]/,"");let g=null;Q$.includes(m)?(o.push("--sort",m,"--order",u?"desc":"asc"),c.length>1&&(g=`The CLI sorts by one field; only "${d}" was copied.`)):g=`The CLI cannot sort by "${m}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return o.push("--limit",String(s)),a>0&&o.push("--skip",String(a)),{command:o.join(" "),warning:l}}function sE(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function aE(e,t){const n=Xl(t).map(a=>po[a]),i=n.map(a=>`<th data-col="${p(a.id)}">${ve(a.label)}</th>`).join(""),s=e.map(a=>`<tr class="query-row" data-issue-id="${p(a.id)}">${n.map(o=>`<td class="query-col-${p(o.id)}">${o.render(a)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function oE(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,a=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${a?"":" disabled"}>Next</button>`}let N=null,Jl=null,Qe=null,ec=0,wi=!1,Lm=!1;function re(e){return document.getElementById(e)}function Cm(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function Am(e){const t=tE({...Jl,cols:N.cols,group:N.group,view:N.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function rE(){const e=re("query-project-filter");if(!e)return;const t=['<option value="">All projects</option>'].concat(ee().map(n=>`<option value="${p(n.id)}">${ve(n.name)}</option>`));e.innerHTML=t.join(""),e.value=N.teamScope?"":N.projectId||""}function lE(){const e=re("query-columns-menu");e&&(e.innerHTML=Zl.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${p(t.id)}"${N.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${ve(t.label)}
        </label>`).join(""))}function mo(e){const t=re("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${ve(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function Bm(e){const t=re("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function tc(e){var t;(t=re("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function Bs(){const e=re("query-results"),t=re("query-pager");if(!e)return;if(!Qe){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=Qe;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=aE(n,N.cols),t&&(t.innerHTML=oE(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(a=>{a.dataset.enabled=String(!a.disabled)}),wi&&tc(!0))}async function fo(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!N)return;const i=C(),s=N.teamScope?{teamId:i==null?void 0:i.id}:{projectId:N.projectId};if(!s.teamId&&!s.projectId){Qe=null,Bs(),mo(N.teamScope?"Select a team first.":"Select a project.");return}const a=++ec,o=N.where===null?Yl:N.where,r=re("query-results");wi=!0,r&&r.classList.add("loading"),tc(!0);const l=()=>a===ec&&L()==="query";try{const c=await v.queryIssues({...s,where:o,order:N.order,skip:(N.page-1)*uo,limit:uo});if(!l())return;N.where=c.where,N.order=c.order||null,Jl=Cm(N),Qe={issues:c.issues||[],total:c.total,skip:c.skip};const d=re("query-where");d&&d.value.trim()===o.trim()&&(d.value=c.where),mo(null),wi=!1,Bs(),Am(e),t&&t()}catch(c){if(!l())return;wi=!1,n?n():Qe=null,Bs(),mo(sE(c))}finally{a===ec&&(wi=!1,r&&r.classList.remove("loading"),tc(!1))}}function Dm(){if(!N)return;const e=re("query-where");return N.where=e?e.value.trim():"",N.page=1,fo("push")}function cE(e){if(N)return N.teamScope=!e,e&&(N.projectId=e),N.page=1,Bm(null),fo("push",{onSuccess:()=>{e&&rt(e)}})}function dE(e,t){if(!N||!po[e]||po[e].fixed)return;const n=N.cols.filter(i=>i!==e);N.cols=Xl(t?[...n,e]:n),Bs(),Am("replace")}function uE(e){if(!N||!Qe||wi)return;const t=N.page+e;if(t<1||e>0&&Qe.skip+Qe.issues.length>=Qe.total)return;const n={page:N.page,result:Qe};return N.page=t,fo("push",{onFailure:()=>{N.page=n.page,Qe=n.result}})}async function pE(){if(!N)return null;const e=re("query-where"),t=e?e.value.trim():N.where??Yl,n=N.teamScope?null:ee().find(o=>o.id===N.projectId),{command:i,warning:s}=iE({where:t,order:N.order,teamScope:N.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:uo,skip:Qe?Qe.skip:0}),a=re("query-cli-preview");try{await navigator.clipboard.writeText(i),$(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),a&&a.classList.add("hidden")}catch{a&&(a.textContent=i,a.classList.remove("hidden")),$("Could not copy; the command is shown below the box","warning")}return i}function mE(){var e,t,n,i,s,a,o;Lm||(Lm=!0,(e=re("query-where"))==null||e.addEventListener("keydown",r=>{r.key==="Enter"&&!r.shiftKey&&!r.isComposing&&(r.preventDefault(),Dm())}),(t=re("query-run-btn"))==null||t.addEventListener("click",()=>Dm()),(n=re("query-copy-cli-btn"))==null||n.addEventListener("click",()=>pE()),(i=re("query-project-filter"))==null||i.addEventListener("change",r=>cE(r.target.value)),(s=re("query-columns-btn"))==null||s.addEventListener("click",r=>{r.stopPropagation();const l=re("query-columns-menu");if(!l)return;const c=l.classList.toggle("hidden")===!1;r.currentTarget.setAttribute("aria-expanded",String(c))}),(a=re("query-columns-menu"))==null||a.addEventListener("change",r=>{r.target.matches('input[type="checkbox"]')&&dE(r.target.value,r.target.checked)}),(o=re("query-pager"))==null||o.addEventListener("click",r=>{const l=r.target.closest("button[data-query-page]");!l||l.disabled||uE(Number(l.dataset.queryPage))}),document.addEventListener("click",r=>{var c;const l=re("query-columns-menu");l&&!l.classList.contains("hidden")&&!r.target.closest("#query-columns-picker")&&(l.classList.add("hidden"),(c=re("query-columns-btn"))==null||c.setAttribute("aria-expanded","false"))}))}function fE(){var s,a;mE();const e=eE(window.location.search),t=ee();let n=null;if(!e.teamScope){const o=r=>r&&t.some(l=>l.id===r);if(!o(e.projectId)){const r=e.projectId;e.projectId=o(Y())?Y():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}N=e,Jl=Cm(N),Qe=null;const i=re("query-where");return i&&(i.value=N.where===null?Yl:N.where),(s=re("query-cli-preview"))==null||s.classList.add("hidden"),(a=re("query-columns-menu"))==null||a.classList.add("hidden"),rE(),lE(),mo(null),Bm(n),Bs(),fo("replace")}let go=[];function gE(){return go}ot(e=>{e==="currentProject"&&L()==="epics"&&fn()});let nc=0;const Ds=new Set(["done","canceled"]);let ho=!1;async function fn({fromMemory:e=!1}={}){var a;er(-1);const t=document.getElementById("epics-list");if(!t)return;const n=++nc,i=Rr(),s=e?Ma("epics",i):void 0;s?Mm(s,t):t.innerHTML=Array(4).fill(0).map(()=>`
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
        `).join("");try{if(!((a=C())!=null&&a.id)){go=[],t.innerHTML=H({icon:q.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const o=Y(),r=o?await v.getProjectEpicProgress(o):await v.getTeamEpicProgress(C().id);if(n!==nc||(ii("epics",i,r),s&&ja(s,r)))return;Mm(r,t)}catch(o){if(n!==nc)return;t.innerHTML=H({icon:q.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),x("load epics",o)}}function Mm(e,t){var n;if(!((n=e==null?void 0:e.epics)!=null&&n.length)){go=[],t.innerHTML=H({icon:q.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}Nm(e,t)}function ic(e,t){return`${e} ${t}${e===1?"":"s"}`}function jm(e,t){return t<=0?"-":e>=t?"100%":`${Math.floor(e/t*100)}%`}function hE(e){const t=e.children||{},n=(t.total||0)-(t.canceled||0);if(n<=0)return'<span class="epic-progress-text">No tickets</span>';const i=Math.round((t.done||0)/n*100),s=Math.round(((t.in_progress||0)+(t.in_review||0))/n*100),a=t.done===n,o=`${t.done||0} done, ${(t.in_progress||0)+(t.in_review||0)} in progress, ${(t.todo||0)+(t.backlog||0)} not started`+(t.canceled?`, ${t.canceled} canceled`:"");return`
        <div class="epic-progress-bar-container" title="${p(o)}">
            <div class="epic-progress-bar">
                <div class="epic-progress-fill${a?" epic-progress-complete":""}" style="width: ${i}%"></div>
                <div class="epic-progress-active" style="width: ${Math.min(s,100-i)}%"></div>
            </div>
            <span class="epic-progress-pct" title="Tickets done">${jm(t.done||0,n)}</span>
            <span class="epic-progress-text">${t.done||0}/${n}</span>
        </div>
    `}function Rm(e){if(!e||e.length===0)return'<span class="text-muted">-</span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,a=`${i.name}${i.status==="active"?" (current)":""}: ${ic(i.closed||0,"ticket")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${p(a)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}function Pm(e,t){return e?`<span class="epic-this-sprint">+${e} <span class="text-muted">(${t} pts)</span></span>`:'<span class="text-muted">-</span>'}function vE(e){const t=e.status_pinned&&!Ds.has(e.status)?' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its tickets">✎<span class="sr-only"> (status set by hand)</span></span>':"",n=e.status==="canceled"?' <span class="epic-canceled-tag">Canceled</span>':"",i=(e.points_total||0)>0?`${e.points_done||0}/${e.points_total} pts`:"-",s=Ms(e)<=0;return`
        <tr class="epic-row${Ds.has(e.status)?" epic-row-closed":""}${s?" epic-row-empty":""}" data-identifier="${p(e.identifier)}">
            <td class="epic-identifier">${f(e.identifier)}</td>
            <td class="epic-title">${f(e.title)}${t}${n}</td>
            <td class="epic-progress">${hE(e)}</td>
            <td class="epic-points">${i}</td>
            <td class="epic-sprint">${Pm(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${Rm(e.sprints)}</td>
        </tr>
    `}function yE(e){return!e||!e.open&&!e.closed_this_sprint&&!(e.sprints||[]).some(t=>t.closed)?"":`
        <tr class="epic-untracked-row">
            <td class="epic-identifier">${f(e.project_key)}</td>
            <td class="epic-title text-muted">No epic</td>
            <td class="epic-progress"><span class="epic-progress-text">${ic(e.open||0,"open ticket")}</span></td>
            <td class="epic-points"></td>
            <td class="epic-sprint">${Pm(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${Rm(e.sprints)}</td>
        </tr>
    `}function Ms(e){const t=e.children||{};return(t.total||0)-(t.canceled||0)}function qm(e){var n;const t=Ms(e);return t>0?(((n=e.children)==null?void 0:n.done)||0)/t:0}const sc=[{key:"active",label:"In progress",statuses:["in_progress","in_review"]},{key:"todo",label:"Todo",statuses:["todo"]},{key:"backlog",label:"Backlog",statuses:["backlog"]},{key:"closed",label:"Closed",statuses:["done","canceled"]}];function bE(e){const t=e.status||"backlog";return sc.find(n=>n.statuses.includes(t))||sc[2]}function wE(e,t){const n=Ms(e)<=0,i=Ms(t)<=0;if(n!==i)return n?1:-1;const s=(t.points_this_sprint||0)-(e.points_this_sprint||0);if(s)return s;const a=(t.closed_this_sprint||0)-(e.closed_this_sprint||0);return a||qm(t)-qm(e)}function kE(e){return sc.map(t=>({group:t,epics:e.filter(n=>bE(n)===t).sort(wE)})).filter(t=>t.epics.length)}function $E(e,t){const n=e.filter(u=>!Ds.has(u.status)),i=n.filter(u=>(u.closed_this_sprint||0)>0).length,s=n.reduce((u,m)=>{var g;return u+(((g=m.children)==null?void 0:g.done)||0)},0),a=n.reduce((u,m)=>u+Ms(m),0),o=[...e,...t],r=o.reduce((u,m)=>u+(m.closed_this_sprint||0),0),l=o.reduce((u,m)=>u+(m.points_this_sprint||0),0),c=t.reduce((u,m)=>u+(m.open||0),0);if(!n.length&&!r&&!c)return"";const d=(u,m,g="")=>`
        <div class="epic-stat${g}">
            <div class="epic-stat-value">${u}</div>
            <div class="epic-stat-label">${m}</div>
        </div>`;return`
        <div class="epic-summary" role="group" aria-label="Progress summary">
            ${n.length?d(`${i}<span class="epic-stat-of"> / ${n.length}</span>`,"open epics moved this sprint"):""}
            ${n.length?d(jm(s,a),a?`of their tickets done (${s}/${a})`:"no tickets yet"):""}
            ${d(r?`+${r}`:"0",`${r===1?"ticket":"tickets"} closed this sprint (${l} pts)`,r?" epic-stat-up":"")}
            ${c?d(String(c),`open ${c===1?"ticket":"tickets"} under no epic`," epic-stat-warn"):""}
        </div>`}const ac=6;function Nm(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=n.filter(m=>Ds.has(m.status)).length,a=ho?n:n.filter(m=>!Ds.has(m.status)),o=[...new Set([...n.map(m=>m.project_key),...i.map(m=>m.project_key)])],r=o.length>1,l=[],c=o.map(m=>{const y=kE(a.filter(T=>T.project_key===m)).map(({group:T,epics:I})=>(l.push(...I),`<tr class="epic-state-row epic-state-${T.key}"><th colspan="${ac}" scope="colgroup"><span class="epic-state-dot" aria-hidden="true"></span>${T.label}<span class="epic-state-count">${I.length}</span></th></tr>`+I.map(vE).join(""))).join(""),b=yE(i.find(T=>T.project_key===m));return!y&&!b?"":(r?`<tr class="epic-group-row"><th colspan="${ac}" scope="colgroup">${f(m)}</th></tr>`:"")+y+b}).join("");go=l;const d=!c.trim()&&s>0?`<tr class="epic-empty-row"><td colspan="${ac}" class="text-muted">Every epic here is closed.</td></tr>`:"",u=s>0?`<button class="btn btn-secondary btn-small epic-closed-toggle" data-epics-toggle-closed>${ho?"Hide":"Show"} ${ic(s,"closed epic")}</button>`:"";t.innerHTML=`
        ${$E(n,i)}
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
    `,t._epicProgress=e,t._epicClickHandler||(t._epicClickHandler=m=>{if(m.target.closest("[data-epics-toggle-closed]")){ho=!ho,er(-1),Nm(t._epicProgress,t);return}const g=m.target.closest(".epic-row");g&&g.dataset.identifier&&Mp(g.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function EE(){const e=Y(),t=ee().map(n=>`
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
    `,W(),document.getElementById("create-epic-form").addEventListener("submit",_E),document.getElementById("create-epic-title").focus()}async function _E(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}try{const s=await v.createIssue(t,{title:n,description:i||null,issue_type:"epic"});O(),$(`Created epic ${s.identifier}`,"success"),fn()}catch(s){x("create epic",s)}}async function Om(e){try{let t;if(e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t){if(t.issue_type!=="epic"){oe(t.id,!1);return}await vo(t.id,!1)}else F("epics",!1)}catch{F("epics",!1)}}async function vo(e,t=!0){var n;try{t&&Bn();const[i,s,a,o]=await Promise.all([v.getIssue(e),v.getSubIssues(e),v.getActivities(e),v.getComments(e)]);if(i.issue_type!=="epic"){oe(e,t);return}t&&history.pushState({epicId:e,view:L()},"",`/epic/${i.identifier}`),document.querySelectorAll(".view").forEach(E=>E.classList.add("hidden"));const r=document.getElementById("epic-detail-view");r.classList.remove("hidden");const l=L()||"epics",c=ee().find(E=>E.id===i.project_id),d=i.assignee_id?Jt(i.assignee_id):null,u=d?en(d):null,m=gE(),g=(n=m.find(E=>E.id===i.id))==null?void 0:n.children,y=g?(g.total||0)-(g.canceled||0):s.filter(E=>E.status!=="canceled").length,b=g?g.done||0:s.filter(E=>E.status==="done").length,k=y>0?Math.round(b/y*100):0,T=m.findIndex(E=>E.id===i.id),I=T>0?m[T-1]:null,A=T>=0&&T<m.length-1?m[T+1]:null,D=T>=0;r.querySelector("#epic-detail-content").innerHTML=`
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
                            ${ni(i.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${k===100?" epic-progress-complete":""}" style="width: ${k}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${b} of ${y} done</span>
                                <span>${k}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?H({icon:q.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(E=>{const P=E.assignee_id?Jt(E.assignee_id):null,z=P?en(P):null;return`
                                <div class="sub-issue-item" data-issue-id="${p(E.id)}" data-identifier="${p(E.identifier)}">
                                    <span class="sub-issue-status">${Le(E.status)}</span>
                                    <span class="sub-issue-id">${f(E.identifier)}</span>
                                    <span class="sub-issue-title">${f(E.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(E.status||"backlog").replace(/_/g,"-")}">${ke(E.status)}</span>
                                    ${z?`<span class="sub-issue-assignee">${f(z)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${a.length===0?H({icon:q.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):a.map(E=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Ar(E.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Dr(E)}</span>
                                        <span class="activity-actor">by ${f(Br(E))}</span>
                                        <span class="activity-time">${at(E.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${o.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${o.map(E=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(E.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${f(E.author_name||"User")}</span>
                                            <span class="comment-date">${at(E.created_at)}</span>
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
                                ${Le(i.status)}
                                ${ke(i.status)}
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
                                ${gt(i.priority)}
                                ${Fe(i.priority)}
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
                                ${Ya(i.estimate,i.project_id)}
                            </span>
                        </div>

                        ${i.labels&&i.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${i.labels.map(E=>`
                                    <span class="issue-label" style="background: ${ie(E.color)}20; color: ${ie(E.color)}">${f(E.name)}</span>
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
        `;const X=r.querySelector(".sub-issues-list");X&&X.addEventListener("click",E=>{const P=E.target.closest(".sub-issue-item");P&&P.dataset.issueId&&oe(P.dataset.issueId)})}catch(i){x("load epic",i)}}se({"navigate-epic":(e,t)=>{vo(t.epicId)},"epic-follow-children":async(e,t)=>{try{await v.updateIssue(t.epicId,{status_follows_children:!0}),$("Status now follows sub-issues"),await vo(t.epicId,!1)}catch(n){x("update epic",n)}}});function xE(e){let t=!1,n=null;return function(s){var o,r,l,c,d,u,m;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((u=e.isDetailViewActive)!=null&&u.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((m=e.isDetailViewActive)!=null&&m.call(e))break;s.preventDefault(),e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function IE(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function Yt(e,t,n=oa){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Hm(){const e=document.querySelector(".main-content");e&&(e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1"),e.focus({preventScroll:!0}))}function js(e){var n,i;return(i=(n=e.target).closest)!=null&&i.call(n,".sidebar-nav")?!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.key==="j"||e.key==="k")?(Hm(),!1):!0:!1}function SE(e){const t=oa;function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const l=n(a);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,o,c,d)}return function(a){var l,c,d,u,m;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||js(a)||(a.key==="Enter"||a.key===" ")&&((d=(c=a.target).closest)!=null&&d.call(c,".issue-group-header"))||e.isModalOpen()||e.isCommandPaletteOpen()||(u=e.isInlineDropdownOpen)!=null&&u.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(a.key)&&((m=e.beforeNavigate)==null||m.call(e));const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Yt(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),Yt(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function TE(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||js(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Yt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Yt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function jn(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function LE(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,u,m;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||js(i)||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex(),o=g=>{var b,k,T,I;const y=!!((k=(b=document.activeElement)==null?void 0:b.closest)!=null&&k.call(b,"#inbox-list"));if((T=e.collapseInboxExpand)==null||T.call(e),Yt(a+g,e.setSelectedIndex,t),y){const A=document.querySelector(`${t}.keyboard-selected`);(I=(A==null?void 0:A.querySelector(".inbox-row-toggle"))||A)==null||I.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),o(1);break;case"k":case"ArrowUp":i.preventDefault(),o(-1);break;case"Enter":if((d=(c=i.target).closest)!=null&&d.call(c,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;a>=0&&s[a]&&(i.preventDefault(),e.toggleInboxExpand(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":if((u=e.isEscapeLayerAbove)!=null&&u.call(e))break;if((m=e.collapseInboxExpand)!=null&&m.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}a>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function CE(e){const t="#kanban-board .kanban-card";return function(i){var o;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||js(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Yt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Yt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.id;r&&e.viewIssue(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function AE(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function oc(e){const{view:t,selector:n,open:i}=e;return function(a){var l,c,d,u;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||js(a)||e.isModalOpen()||e.isCommandPaletteOpen()||(c=e.isInlineDropdownOpen)!=null&&c.call(e))return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Yt(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),Yt(r-1,e.setSelectedIndex,n);break;case"Enter":if((u=(d=a.target).closest)!=null&&u.call(d,'button, a[href], [role="button"]'))break;r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(m=>m.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const BE=7,rc=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value"),Fm=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex"),DE='<svg class="picker-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',ME='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';let Um=!1;function jE(){Um||(Um=!0,Object.defineProperty(HTMLSelectElement.prototype,"value",{...rc,set(e){var t;rc.set.call(this,e),(t=this._picker)==null||t.sync()}}),Object.defineProperty(HTMLSelectElement.prototype,"selectedIndex",{...Fm,set(e){var t;Fm.set.call(this,e),(t=this._picker)==null||t.sync()}}))}let Ie=null,RE=0;function Gm({restoreFocus:e=!0}={}){return Ie?(Ie.close(e),!0):!1}function PE(e=document){e.querySelectorAll("select[data-picker]").forEach(qE)}function qE(e){var i;if(!e||e._picker)return((i=e==null?void 0:e._picker)==null?void 0:i.button)||null;const t=document.createElement("button");t.type="button",t.className="picker-btn",t.setAttribute("aria-haspopup","listbox"),t.setAttribute("aria-expanded","false"),e.id&&(t.dataset.pickerFor=e.id),t.innerHTML=`<span class="picker-label"></span>${DE}`,e.classList.add("picker-native"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,e.insertAdjacentElement("afterend",t);const n=()=>{zm(e,t),(Ie==null?void 0:Ie.select)===e&&Ie.refresh()};return e._picker={button:t,sync:n},jE(),e.addEventListener("change",n),typeof MutationObserver<"u"&&new MutationObserver(n).observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["disabled","selected","hidden"]}),t.addEventListener("click",s=>{s.preventDefault(),(Ie==null?void 0:Ie.select)===e?Gm():Wm(e,t)}),t.addEventListener("keydown",s=>{s.metaKey||s.ctrlKey||s.altKey||(["ArrowDown","ArrowUp","Enter"," "].includes(s.key)?(s.preventDefault(),s.stopPropagation(),(Ie==null?void 0:Ie.select)!==e&&Wm(e,t)):s.key.length===1&&s.stopPropagation())}),n(),t}function zm(e,t){const n=e.options[e.selectedIndex],i=n?n.textContent.trim():"";t.querySelector(".picker-label").textContent=i,t.disabled=e.disabled,t.title=i;const s=e.getAttribute("aria-label");s&&t.setAttribute("aria-label",i?`${s}: ${i}`:s)}function Vm(e){return[...e.options].filter(t=>!t.hidden).map(t=>({value:t.value,text:t.textContent.trim(),disabled:t.disabled}))}function Wm(e,t){Gm({restoreFocus:!1});const n=Vm(e),i=`picker-list-${++RE}`,s=n.length>=BE,a=e.getAttribute("aria-label")||"Options",o=document.createElement("div");o.className="picker-popover",o.tabIndex=-1,o.innerHTML=`
        ${s?`<input type="text" class="picker-search" placeholder="Filter…" aria-label="Filter ${p(a)}"
            role="combobox" aria-expanded="true" aria-controls="${i}" aria-autocomplete="list" autocomplete="off" spellcheck="false">`:""}
        <ul class="picker-list" role="listbox" id="${i}" tabindex="-1" aria-label="${p(a)}"></ul>
    `,document.body.appendChild(o);const r=o.querySelector(".picker-list"),l=o.querySelector(".picker-search"),c=_=>Math.max(0,_.findIndex(R=>!R.disabled));let d=n.findIndex(_=>_.value===e.value&&!_.disabled);d===-1&&(d=c(n));let u=n;const m=()=>{var R;r.innerHTML=u.length?u.map((M,te)=>`
                <li role="option" id="${i}-${te}" class="picker-option${te===d?" active":""}${M.disabled?" disabled":""}"
                    data-index="${te}" data-value="${p(M.value)}"
                    aria-selected="${M.value===e.value?"true":"false"}"${M.disabled?' aria-disabled="true"':""}>
                    <span class="picker-option-text">${f(M.text)}</span>
                    ${M.value===e.value?`<span class="picker-check">${ME}</span>`:""}
                </li>`).join(""):'<li class="picker-empty" role="presentation">No matches</li>';const _=r.querySelector(".picker-option.active");_?(l||r).setAttribute("aria-activedescendant",_.id):(l||r).removeAttribute("aria-activedescendant"),(R=_==null?void 0:_.scrollIntoView)==null||R.call(_,{block:"nearest"})},g=()=>{var Xe,pt;const _=t.getBoundingClientRect(),R=((Xe=window.visualViewport)==null?void 0:Xe.width)||window.innerWidth,M=((pt=window.visualViewport)==null?void 0:pt.height)||window.innerHeight;o.style.minWidth=`${Math.min(Math.max(_.width,220),R-16)}px`,o.style.maxHeight="",o.style.top="0px";const te=o.offsetWidth||Math.max(_.width,220),De=o.offsetHeight;o.style.left=`${Math.max(8,Math.min(_.left,R-te-8))}px`;const be=M-_.bottom-12,we=_.top-12;if(De>be&&we>be){const Me=Math.max(120,we);o.style.maxHeight=`${Me}px`,o.style.top=`${Math.max(8,_.top-4-Math.min(De,Me))}px`}else o.style.maxHeight=`${Math.max(120,be)}px`,o.style.top=`${_.bottom+4}px`},y=_=>{if(!_||_.disabled||e.disabled)return;if(![...e.options].some(M=>M.value===_.value&&!M.disabled)){K(!0);return}const R=_.value!==e.value;rc.set.call(e,_.value),zm(e,t),K(!0),R&&e.dispatchEvent(new Event("change",{bubbles:!0}))},b=_=>{let R=d+_;for(;R>=0&&R<u.length&&u[R].disabled;)R+=_;R<0||R>=u.length||(d=R,m())},k=(_,R)=>{let M=_;for(;M>=0&&M<u.length&&u[M].disabled;)M+=R;M>=0&&M<u.length&&(d=M,m())},T=_=>{if(!(_.metaKey||_.ctrlKey))switch(_.stopPropagation(),_.key){case"ArrowDown":_.preventDefault(),b(1);break;case"ArrowUp":_.preventDefault(),b(-1);break;case"Home":l||(_.preventDefault(),k(0,1));break;case"End":l||(_.preventDefault(),k(u.length-1,-1));break;case"PageDown":_.preventDefault(),k(Math.min(u.length-1,d+8),-1);break;case"PageUp":_.preventDefault(),k(Math.max(0,d-8),1);break;case"Enter":_.preventDefault(),y(u[d]);break;case"Escape":_.preventDefault(),K(!0);break;case"Tab":K(!0);break;case" ":l||(_.preventDefault(),y(u[d]));break;default:if(!l&&_.key.length===1&&!_.metaKey&&!_.ctrlKey&&!_.altKey){I=(Date.now()-A<700?I:"")+_.key.toLowerCase(),A=Date.now();const R=u.findIndex(M=>!M.disabled&&M.text.toLowerCase().startsWith(I));R!==-1&&(d=R,m())}}};let I="",A=0;const D=()=>{const _=l.value.trim().toLowerCase();u=_?n.filter(M=>M.text.toLowerCase().includes(_)):n;const R=u.findIndex(M=>M.value===e.value&&!M.disabled);d=!_&&R!==-1?R:c(u),m()},X=_=>{o.contains(_.target)||t.contains(_.target)||K(!1)},E=()=>g(),P=_=>{_.key!=="Escape"||o.contains(_.target)||(_.preventDefault(),_.stopPropagation(),K(!0))},z=()=>K(!1);function K(_){(Ie==null?void 0:Ie.popover)===o&&(Ie=null,o.remove(),t.setAttribute("aria-expanded","false"),t.classList.remove("open"),t.removeAttribute("aria-controls"),document.removeEventListener("pointerdown",X,!0),document.removeEventListener("keydown",P,!0),window.removeEventListener("popstate",z),window.removeEventListener("resize",E),window.removeEventListener("scroll",E,!0),_&&t.focus({preventScroll:!0}))}r.addEventListener("click",_=>{const R=_.target.closest(".picker-option");R&&y(u[Number(R.dataset.index)])}),r.addEventListener("mousemove",_=>{const R=_.target.closest(".picker-option");if(!R)return;const M=Number(R.dataset.index);M!==d&&(d=M,m())}),o.addEventListener("keydown",T),l&&l.addEventListener("input",D),document.addEventListener("pointerdown",X,!0),document.addEventListener("keydown",P,!0),window.addEventListener("popstate",z),window.addEventListener("resize",E),window.addEventListener("scroll",E,!0),Ie={select:e,button:t,popover:o,close:K,refresh:()=>{const _=Vm(e);!(_.length===n.length&&_.every((M,te)=>M.value===n[te].value&&M.text===n[te].text&&M.disabled===n[te].disabled))||e.disabled?K(!1):m()}},t.setAttribute("aria-expanded","true"),t.setAttribute("aria-controls",i),t.classList.add("open"),m(),g(),(l||r).focus({preventScroll:!0})}const NE={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>v.getDocumentRevisions(e),fetchOne:(e,t)=>v.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>v.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>v.getIssueDescriptionRevision(e,t)}};let G=null,gn=0;async function Km(e,t){var a,o;const n=NE[e];if(!n){x("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++gn;G=null;let s;try{s=await n.fetchList(t)}catch(r){x("load revision history",r);return}if(i===gn){if(G={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},G.viewVersion!=null)try{const r=await n.fetchOne(t,G.viewVersion);if(i!==gn)return;G.cache.set(G.viewVersion,r)}catch(r){i===gn&&x("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),yo(),W()}}function yo(){const e=document.getElementById("modal-content");if(!e||!G)return;if(G.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=OE(),n=G.mode==="compare"?FE():HE();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function OE(){const e=G.revisions.map(n=>{const i=G.mode==="view"?n.version===G.viewVersion:n.version===G.compareFromVersion||n.version===G.compareToVersion,s=G.mode==="compare"?n.version===G.compareFromVersion?' <span class="rev-tag">from</span>':n.version===G.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${f(n.author_name||"Unknown")} ${Un(n.author)}</span>
          <span class="revision-time">${at(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${G.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function HE(){const e=G.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=G.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${f(t.title)}</h3>`:"",i=t[G.adapter.bodyField]||"",s=i?`<div class="markdown-body">${ht(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${f(t.author_name||"Unknown")} &middot; ${at(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function FE(){const e=G.compareFromVersion,t=G.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=G.cache.get(e),i=G.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[G.adapter.bodyField]||"",a=i[G.adapter.bodyField]||"",o=UE(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
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
  `}function UE(e,t){const n=e.split(`
`),i=t.split(`
`),s=GE(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${f(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${f(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${f(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function GE(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(Rs(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(Rs(a,"del",e[o]),o++):(Rs(a,"add",t[r]),r++);for(;o<n;)Rs(a,"del",e[o++]);for(;r<i;)Rs(a,"add",t[r++]);return a}function Rs(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function zE(e){if(!G)return;const t=G.token,n=G;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(G!==n||gn!==t)return;n.cache.set(e,i)}catch(i){G===n&&gn===t&&x("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),yo()}function VE(){if(!G)return;const e=G.token,t=G;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{G===t&&gn===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{G!==t||gn!==e||(s&&x("load revisions to compare",s),yo())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;yo()}se({"show-document-revisions":(e,t)=>{Km("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{Km("issue",t.issueId)},"select-revision-version":(e,t)=>{zE(Number(t.version))},"toggle-revision-compare":()=>{VE()},"close-revision-viewer":()=>{G=null,O()}});const WE=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let bt=[],bo=null,wo=null,lc=0;ot(e=>{e==="currentProject"&&L()==="board"&&Ps()});async function Ps({fromMemory:e=!1}={}){ia(-1);const t=++lc,n=Y();if(!n){const o=document.getElementById("kanban-board");o&&(o.innerHTML=ee().length===0?H({icon:q.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):H({icon:q.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const i=document.getElementById("kanban-board"),s=Rr(),a=e?Ma("board",s):void 0;a?(bt=a,bo=s,L()==="board"&&xt(bt),ki()):i&&(i.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const o=await v.getIssues({project_id:n});if(t!==lc)return;const r=a&&ja(bt,o);bt=o,bo=s,ii("board",s,o),L()==="board"&&xt(bt),r||ki()}catch(o){if(t!==lc)return;i&&(i.innerHTML=H({icon:q.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),x("load board",o)}}const cc=Qg(()=>Ps(),200);function ki(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;bo&&ii("board",bo,bt),e.innerHTML=WE.map(i=>{const s=bt.filter(a=>a.status===i.key);return`
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
                                <span class="badge badge-priority-${a.priority}" style="font-size: 10px;">${Fe(a.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""),KE(t)}function KE(e){const t=bd();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){ia(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),ia(i),n[i].classList.add("keyboard-selected")}function YE(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),wo=t.dataset.id,t.classList.add("dragging")}function ZE(e,t){t.classList.remove("dragging"),wo=null}function Ym(e){const t=bt.find(n=>n.id===wo);return!!t&&t.status===e}function QE(e,t){e.preventDefault(),!Ym(t.dataset.status)&&t.classList.add("drag-over")}function XE(e,t){t.classList.remove("drag-over")}function JE(e,t){e.preventDefault();const n=bt.find(i=>i.id===t.dataset.id);n&&Ym(n.status)||t.classList.add("drag-over")}function e_(e,t){t.classList.remove("drag-over")}async function t_(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=bt.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,ki();try{const o=await v.updateIssue(n,{status:i});$("Status updated","success"),Yi(o)}catch(o){s.status=a,ki(),x("update status",o)}}}async function n_(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=wo||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=bt.find(l=>l.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,ki();try{const l=await v.updateIssue(n,{status:a});$("Status updated","success"),Yi(l)}catch(l){o.status=r,ki(),x("update status",l)}}}se({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),oe(t.id)):e.type==="dragstart"?YE(e,n):e.type==="dragend"?ZE(e,n):e.type==="dragover"?JE(e,n):e.type==="dragleave"?e_(e,n):e.type==="drop"&&n_(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?QE(e,n):e.type==="dragleave"?XE(e,n):e.type==="drop"&&t_(e,n)},"retry-load-board":()=>Ps()});const hn=new Map,Zm=6e4,dc=100;let Be=null,ko=null,$o=null,qs=null,Qm=!1;const i_={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},s_={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Xm={api:null};let uc={...Xm};function a_(e={}){uc={...Xm,...e},Be||(Be=document.createElement("div"),Be.className="issue-tooltip",Be.style.display="none",document.body.appendChild(Be),Be.addEventListener("mouseenter",()=>{clearTimeout(ko)}),Be.addEventListener("mouseleave",()=>{pc()})),Qm||(document.addEventListener("mouseover",o_),document.addEventListener("mouseout",r_),Qm=!0)}function o_(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=l_(t);if(n){if(n===qs&&Be.style.display!=="none"){clearTimeout(ko);return}clearTimeout($o),$o=setTimeout(()=>{c_(t,n)},200)}}function r_(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout($o),ko=setTimeout(()=>{pc()},150))}function l_(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function c_(e,t){qs=t;const n=e.getBoundingClientRect();Be.style.left=`${n.left+window.scrollX}px`,Be.style.top=`${n.bottom+window.scrollY+8}px`,Be.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Be.style.display="block";try{const i=await u_(t);if(qs!==t)return;p_(i)}catch{if(qs!==t)return;Be.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function pc(){clearTimeout($o),clearTimeout(ko),Be&&(Be.style.display="none"),qs=null}function d_(){const e=Date.now();for(const[t,n]of hn.entries())e-n.timestamp>=Zm&&hn.delete(t)}async function u_(e){hn.size>dc/2&&d_();const t=hn.get(e);if(t&&Date.now()-t.timestamp<Zm)return t.issue;if(!uc.api)throw new Error("API not initialized");const n=await uc.api.getIssueByIdentifier(e);if(hn.size>=dc){const i=Array.from(hn.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,dc/2);for(const[a]of s)hn.delete(a)}return hn.set(e,{issue:n,timestamp:Date.now()}),n}function p_(e){const t=i_[e.status]||"#6b7280",n=s_[e.priority]||"#6b7280",i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Be.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${f(e.identifier)}</span>
            <span class="issue-tooltip-type">${f(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${f(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${m_(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${f_(e.priority)}</span>
        </div>
    `}function m_(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function f_(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Jm(){return!!document.querySelector(".description-inline-editor")}function mc(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function fc(){var e;return mc("issue-detail-view")?((e=$e())==null?void 0:e.id)??null:null}function Rn(e){return!!e&&fc()===e}function g_(){We("issue:created",b_),We("issue:updated",w_),We("issue:deleted",k_),We("comment",__),We("relation",I_),We("attestation",S_),We("activity",L_),We("project",C_),We("sprint",A_),We("document",x_),We("inbox",T_),We("connection:reconnected",B_),We("connection:unauthorized",v_),We("connection:forbidden",y_),We("connection:superseded",h_)}function h_(){$("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function v_(){v.logout(),Gn(null),Gi(null),Cs(),$("Your session has ended. Please sign in again.","warning")}function y_(){$("Live updates stopped: you no longer have access to this team.","error")}function b_(e){var s;cs(L(),"board","sprints","epics");const t=J(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,Ye(a),L()==="issues"&&ct()}else Ye([e,...t]),L()==="issues"&&ct(),$(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((s=_t())==null?void 0:s.id)){const a=Ze(),o=a.findIndex(l=>l.id===e.id),r=a.findIndex(l=>l._isOptimistic&&l.title===e.title);if(o===-1&&r===-1)$n([e,...a]),L()==="my-issues"&&En();else if(r>=0){const l=[...a];l[r]=e,$n(l),L()==="my-issues"&&En()}}L()==="board"?cc():L()==="sprints"?Ns():L()==="epics"&&fn(),Rn(e.parent_id)&&Pn(e.parent_id)}function w_(e){cs(L(),"board","sprints","epics"),ra(e);const t=J();t.some(s=>s.id===e.id)&&Ye(t.map(s=>s.id===e.id?e:s));const n=Ze();n.some(s=>s.id===e.id)&&$n(n.map(s=>s.id===e.id?e:s));const i=Fi();i.some(s=>s.id===e.id)&&xt(i.map(s=>s.id===e.id?e:s)),L()==="issues"?ct():L()==="my-issues"?En():L()==="board"?cc():L()==="sprints"?Ns():L()==="epics"&&fn(),Rn(e.id)&&(Jm()?Cr(e):Pn(e.id))}function k_(e){cs(L(),"board","sprints","epics"),vh(e.id),Ye(J().filter(n=>n.id!==e.id)),$n(Ze().filter(n=>n.id!==e.id));const t=Fi();t.some(n=>n.id===e.id)&&xt(t.filter(n=>n.id!==e.id)),L()==="issues"?ct():L()==="my-issues"?(En(),Wn({showLoading:!1})):L()==="board"?cc():L()==="sprints"?Ns():L()==="epics"&&fn(),$(`Issue ${e.identifier} deleted`,"info"),Rn(e.id)&&($(`Issue ${e.identifier} was deleted`,"warning"),F("my-issues"))}const ef=250,$_=1e3,$i=new Map;function Pn(e){Jm()?Cr():gc(e,ef)}function gc(e,t){let n=$i.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},$i.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>E_(e),t))}async function E_(e){const t=$i.get(e);if(!t)return;if(t.timer=null,!Rn(e)){$i.delete(e);return}t.inFlight=!0;let n;try{n=await oe(e,!1,{refresh:!0})}finally{t.inFlight=!1}$i.get(e)===t&&(t.again?(t.again=!1,gc(e,ef)):n==="retry"?gc(e,$_):$i.delete(e))}function __(e){L()==="my-issues"&&Wn({showLoading:!1}),Rn(e.issue_id)&&Pn(e.issue_id),e.document_id&&Ju(e.document_id)}function x_(e,{type:t}={}){cs(L(),"documents"),Xu(),t==="deleted"?nb(e.id,e.title):Ju(e.id)}function I_(e){const t=fc();t&&(e.source_issue_id===t||e.target_issue_id===t)&&Pn(t)}function S_(e){L()==="approvals"&&Ct(),Rn(e.issue_id)&&Pn(e.issue_id)}function T_(e,t){var n;e.recipient_user_id===((n=_t())==null?void 0:n.id)&&(pi(),Xw(t==null?void 0:t.type,e),L()==="inbox"&&!tk(t==null?void 0:t.type,e)&&ks({background:!0}))}function L_(e){L()==="my-issues"&&Wn({showLoading:!1}),Rn(e.issue_id)&&Pn(e.issue_id)}function C_(e,{type:t}){dt().then(()=>{L()==="projects"&&An()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?$(`New project: ${e.name}`,"info"):t==="deleted"&&$(`Project ${e.name} deleted`,"info")}function Ns(){const e=Tb();e&&mc("sprint-detail-view")?ri(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):mc("sprints-view")&&dn().catch(t=>console.error("Failed to reload sprints:",t))}function A_(e,{type:t}={}){cs(L(),"sprints"),lp(),L()==="sprints"?Ns():L()==="my-issues"&&Wi(),t==="created"?$(`New sprint: ${e.name}`,"info"):t==="closed"&&$(`Sprint ${e.name} closed`,"info")}function B_(){const e=L();Pr(),pi(),e==="issues"?Tt().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(Vn().catch(n=>console.error("Failed to resync my issues:",n)),Wi().catch(n=>console.error("Failed to resync sprint status:",n)),Wn({showLoading:!1})):e==="board"?Ps():e==="sprints"?Ns():e==="epics"?fn().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?dt().then(()=>{L()==="projects"&&An()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?Xu():e==="approvals"?Ct():e==="inbox"&&ks({background:!0});const t=fc();t&&Pn(t)}const D_='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function tf(e){return Array.from(e.querySelectorAll(D_)).filter(t=>!t.closest(".hidden, [hidden]"))}function nf(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function M_(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),nf(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=tf(t);n&&n.focus()}}}function Eo(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),nf(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=tf(n);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Eo()});async function j_(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=Y();if(!i){$("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=ee().find(c=>c.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Ye([r,...J()]),ct();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const c=await v.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=J();d.some(u=>u.id===c.id)?Ye(d.filter(u=>u.id!==a)):d.some(u=>u.id===a)&&Ye(d.map(u=>u.id===a?c:u)),ct(),dt(),$("Issue created!","success")}catch(c){Ye(J().filter(d=>d.id!==a)),ct(),x("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}Ow({beforeScrollRestore:Er,beforeNavigate:()=>{Ry(),Iw(),bp(null),zn(null),kd(null),Eo(),pc()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return Om(e[1]),!0;if(e[0]==="issue"&&e[1])return Ca(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(Ca(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(V_(e[1]),!0):e[0]==="sprint"&&e[1]?(Ab(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Ep(e[1]),!0):!1},detailPopstate:e=>e.epicId?(vo(e.epicId,!1),!0):e.issueId?(oe(e.issueId,!1),!0):e.identifier?(Ca(e.identifier),!0):e.documentId?(Ce(e.documentId,!1),!0):e.sprintId?(ri(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=dl();e&&ee().some(t=>t.id===e)&&rt(e)},issueNavigate:e=>Ca(e),epicNavigate:e=>Om(e)}),Nw({"my-issues":()=>{Wi(),Vn(),Wn()},approvals:()=>{Ct()},inbox:()=>{ks({focusFirst:!0})},issues:()=>{var r;_v(),Lv(),Bv();const e=new URLSearchParams(window.location.search),t=e.getAll("label"),n=e.getAll("exclude_label"),i=e.get("sprint"),s=t.length>0||n.length>0||!!i||!!((r=document.getElementById("sprint-filter"))!=null&&r.value)||xn().length>0||In().length>0;s||Tt();const a=Qd().then(()=>{if(t.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=t.includes(d.value)}),ma())}if(n.length>0){const l=document.getElementById("exclude-label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=n.includes(d.value)}),fa())}}),o=uu().then(()=>{if(i){const l=document.getElementById("sprint-filter");l&&(l.value=i)}});s?Promise.allSettled([a,o]).then(()=>Tt()):(a.catch(l=>console.error("Failed to populate label filter:",l)),o.catch(l=>console.error("Failed to update sprint filter:",l)))},query:()=>{fE()},epics:()=>{fn({fromMemory:!0})},board:()=>{Ps({fromMemory:!0})},projects:()=>{An(),dt().then(An)},sprints:()=>{dn({fromMemory:!0})},rituals:()=>{Yb()},documents:()=>{Cn(null,null,{fromMemory:!0})},team:()=>{Ll(),Kp(),io()},settings:()=>{zl(),km(),$m(),Ia()}});function R_(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||O()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>O())}function P_(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>_p(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>Lw());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>Cw()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>xp(a))})}function q_(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Zu("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Zu("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Qu());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>Yy());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Ut())}function N_(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>Hd())}function O_(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>Av());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>uv());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>pv()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const y=g.parentElement;y!=null&&y.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>va("status-filter-dropdown")):y!=null&&y.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>va("priority-filter-dropdown")):y!=null&&y.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>va("label-filter-dropdown")):y!=null&&y.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>va("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",()=>ya())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>ba())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",()=>br())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>wr())}const a=document.getElementById("label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>wa())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>ka())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>nt());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>nt());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>nt());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>Tt());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>vu());const m=document.querySelector(".quick-create-input");m&&m.addEventListener("keydown",g=>j_(g))}function H_(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>Qb(t.dataset.tab))})}function F_(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>Vp());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Ki()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),F(o.dataset.view),r.detail>0&&Hm())})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Ek());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>Eo());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>M_());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>Ki())}se({"navigate-to":(e,t)=>{F(t.view)},"set-current-project":(e,t,n)=>{rt(n.value)},showCreateIssueModal:()=>Ki(),showCreateEpicModal:()=>EE(),"retry-load-epics":()=>fn(),showCreateProjectModal:()=>kp(),showCreateDocumentModal:()=>tp(),showCreateTeamModal:()=>Xp(),showEditTeamModal:()=>qk(),showInviteModal:()=>Yp(),showCreateApiKeyModal:()=>D$(),showCreateAgentModal:()=>vy(),resetOnboarding:()=>am(),logout:()=>wm(),navigateToProjects:()=>F("projects")});async function U_(){if(!v.getToken()){await vm();return}Ap();const e=v.getMyTeams();e.catch(()=>{});try{const t=await v.getMe();Gn(t),await yi({teamsRequest:e})}catch(t){if((t==null?void 0:t.status)===401||(t==null?void 0:t.status)===403){v.logout(),await vm();return}console.error("Failed to load current user on boot:",t),Cs(),$("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{uh(),A$(),F_(),R_(),N_(),O_(),H_(),P_(),q_(),G_(),PE(),z_(),a_({api:v}),g_(),await U_()});function G_(){const e=document.getElementById("theme-toggle");if(!e)return;const t=Lg()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),Cg(n?"light":"dark")})}function z_(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");Dp(i)}}})}async function V_(e){try{await Ce(e,!1)}catch{F("documents",!1)}}document.addEventListener("keydown",SE({getCurrentView:L,getSelectedIndex:vd,setSelectedIndex:wn,viewIssue:oe,showEditIssueModal:Du,showInlineDropdown:gr,isInlineDropdownOpen:Yn,isModalOpen:et,isCommandPaletteOpen:mn,isDetailViewActive:jn,beforeNavigate:Er})),document.addEventListener("keydown",TE({getCurrentView:L,getSelectedIndex:eh,setSelectedIndex:yd,viewDocument:Ce,showEditDocumentModal:np,isModalOpen:et,isCommandPaletteOpen:mn,isDetailViewActive:jn})),document.addEventListener("keydown",CE({getCurrentView:L,getSelectedIndex:bd,setSelectedIndex:ia,viewIssue:oe,isModalOpen:et,isCommandPaletteOpen:mn,isDetailViewActive:jn})),document.addEventListener("keydown",LE({getCurrentView:L,getSelectedIndex:th,setSelectedIndex:sa,toggleInboxExpand:vk,collapseInboxExpand:sk,archiveInboxEntry:hk,isInlineDropdownOpen:Yn,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:et,isCommandPaletteOpen:mn,isDetailViewActive:jn})),document.addEventListener("keydown",AE()),document.addEventListener("keydown",oc({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&ri(e.dataset.sprintId)},getCurrentView:L,getSelectedIndex:nh,setSelectedIndex:wd,isModalOpen:et,isCommandPaletteOpen:mn,isDetailViewActive:jn})),document.addEventListener("keydown",oc({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&Mp(e.dataset.identifier)},getCurrentView:L,getSelectedIndex:ih,setSelectedIndex:er,isModalOpen:et,isCommandPaletteOpen:mn,isDetailViewActive:jn})),document.addEventListener("keydown",oc({view:"my-issues",selector:"#my-issues-list .issue-row",open:e=>{var t;return(t=e.querySelector(".issue-title"))==null?void 0:t.click()},getCurrentView:L,getSelectedIndex:Ch,setSelectedIndex:Ah,isInlineDropdownOpen:Yn,isModalOpen:et,isCommandPaletteOpen:mn,isDetailViewActive:jn}));function sf(){var e;F("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus()}function W_(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)")||Ly()}document.addEventListener("keydown",xE({closeModal:O,closeSidebar:Eo,navigateTo:F,showCreateIssueModal:Ki,showKeyboardShortcutsHelp:Im,isModalOpen:et,focusSearch:sf,isInlineDropdownOpen:Yn,closeInlineDropdowns:Zg,isModalDirty:Kg,focusModalField:md,closeDropdowns:()=>{var t;document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),Sn();const e=document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)");e&&(e.classList.add("hidden"),(t=document.querySelector("#issue-detail-view .sidebar-overflow-trigger"))==null||t.setAttribute("aria-expanded","false"))},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:W_,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),U$([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>F("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>F("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>F("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>F("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>F("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>F("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>F("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>F("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>F("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>F("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>F("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>F("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{F("issues"),setTimeout(Ki,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{F("projects"),setTimeout(kp,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{F("documents"),setTimeout(tp,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Xp(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:sf,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{F("team"),setTimeout(Yp,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>Im(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>am(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>wm(),category:"Account"}]),document.addEventListener("keydown",IE({isModalOpen:et,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:mn,openCommandPalette:G$,closeCommandPalette:co})),window.marked=Z,window.DOMPurify=sd,console.log("Chaotic frontend loaded via Vite")})();
