var V_=Object.defineProperty;var W_=(Mt,Pe,gn)=>Pe in Mt?V_(Mt,Pe,{enumerable:!0,configurable:!0,writable:!0,value:gn}):Mt[Pe]=gn;var ne=(Mt,Pe,gn)=>W_(Mt,typeof Pe!="symbol"?Pe+"":Pe,gn);(function(){"use strict";var uc;function Mt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Pe=Mt();function gn(e){Pe=e}var Ti={exec:()=>null};function Q(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(qe.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var qe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},yf=/^(?:[ \t]*(?:\n|$))+/,bf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,wf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Li=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,kf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,To=/(?:[*+-]|\d{1,9}[.)])/,Ic=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Sc=Q(Ic).replace(/bull/g,To).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),$f=Q(Ic).replace(/bull/g,To).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Lo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ef=/^[^\n]+/,Co=/(?!\s*\])(?:\\.|[^\[\]\\])+/,_f=Q(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Co).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),xf=Q(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,To).getRegex(),Fs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ao=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,If=Q("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ao).replace("tag",Fs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Tc=Q(Lo).replace("hr",Li).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fs).getRegex(),Sf=Q(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Tc).getRegex(),Bo={blockquote:Sf,code:bf,def:_f,fences:wf,heading:kf,hr:Li,html:If,lheading:Sc,list:xf,newline:yf,paragraph:Tc,table:Ti,text:Ef},Lc=Q("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Li).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fs).getRegex(),Tf={...Bo,lheading:$f,table:Lc,paragraph:Q(Lo).replace("hr",Li).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Lc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fs).getRegex()},Lf={...Bo,html:Q(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ao).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ti,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Q(Lo).replace("hr",Li).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Sc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Cf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Af=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Cc=/^( {2,}|\\)\n(?!\s*$)/,Bf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Us=/[\p{P}\p{S}]/u,Do=/[\s\p{P}\p{S}]/u,Ac=/[^\s\p{P}\p{S}]/u,Df=Q(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Do).getRegex(),Bc=/(?!~)[\p{P}\p{S}]/u,Mf=/(?!~)[\s\p{P}\p{S}]/u,jf=/(?:[^\s\p{P}\p{S}]|~)/u,Rf=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Dc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Pf=Q(Dc,"u").replace(/punct/g,Us).getRegex(),qf=Q(Dc,"u").replace(/punct/g,Bc).getRegex(),Mc="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Nf=Q(Mc,"gu").replace(/notPunctSpace/g,Ac).replace(/punctSpace/g,Do).replace(/punct/g,Us).getRegex(),Of=Q(Mc,"gu").replace(/notPunctSpace/g,jf).replace(/punctSpace/g,Mf).replace(/punct/g,Bc).getRegex(),Hf=Q("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ac).replace(/punctSpace/g,Do).replace(/punct/g,Us).getRegex(),Ff=Q(/\\(punct)/,"gu").replace(/punct/g,Us).getRegex(),Uf=Q(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Gf=Q(Ao).replace("(?:-->|$)","-->").getRegex(),zf=Q("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Gf).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Gs=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Vf=Q(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Gs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),jc=Q(/^!?\[(label)\]\[(ref)\]/).replace("label",Gs).replace("ref",Co).getRegex(),Rc=Q(/^!?\[(ref)\](?:\[\])?/).replace("ref",Co).getRegex(),Wf=Q("reflink|nolink(?!\\()","g").replace("reflink",jc).replace("nolink",Rc).getRegex(),Mo={_backpedal:Ti,anyPunctuation:Ff,autolink:Uf,blockSkip:Rf,br:Cc,code:Af,del:Ti,emStrongLDelim:Pf,emStrongRDelimAst:Nf,emStrongRDelimUnd:Hf,escape:Cf,link:Vf,nolink:Rc,punctuation:Df,reflink:jc,reflinkSearch:Wf,tag:zf,text:Bf,url:Ti},Kf={...Mo,link:Q(/^!?\[(label)\]\((.*?)\)/).replace("label",Gs).getRegex(),reflink:Q(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Gs).getRegex()},jo={...Mo,emStrongRDelimAst:Of,emStrongLDelim:qf,url:Q(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Yf={...jo,br:Q(Cc).replace("{2,}","*").getRegex(),text:Q(jo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},zs={normal:Bo,gfm:Tf,pedantic:Lf},Ci={normal:Mo,gfm:jo,breaks:Yf,pedantic:Kf},Zf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Pc=e=>Zf[e];function wt(e,t){if(t){if(qe.escapeTest.test(e))return e.replace(qe.escapeReplace,Pc)}else if(qe.escapeTestNoEncode.test(e))return e.replace(qe.escapeReplaceNoEncode,Pc);return e}function qc(e){try{e=encodeURI(e).replace(qe.percentDecode,"%")}catch{return null}return e}function Nc(e,t){var a;const n=e.replace(qe.findPipe,(o,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(qe.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(qe.slashPipe,"|");return i}function Ai(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function Qf(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Oc(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function Xf(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var Vs=class{constructor(e){ne(this,"options");ne(this,"rules");ne(this,"lexer");this.options=e||Pe}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Ai(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=Xf(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=Ai(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ai(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Ai(t[0],`
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
`,e=e.substring(m.length+1),l=!0),!l){const T=this.rules.other.nextBulletRegex(y),I=this.rules.other.hrRegex(y),A=this.rules.other.fencesBeginRegex(y),D=this.rules.other.headingBeginRegex(y),X=this.rules.other.htmlBeginRegex(y);for(;e;){const _=e.split(`
`,1)[0];let P;if(m=_,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),P=m):P=m.replace(this.rules.other.tabCharGlobal,"    "),A.test(m)||D.test(m)||X.test(m)||T.test(m)||I.test(m))break;if(P.search(this.rules.other.nonSpaceChar)>=y||!m.trim())d+=`
`+P.slice(y);else{if(g||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||A.test(u)||D.test(u)||I.test(u))break;d+=`
`+m}!g&&!m.trim()&&(g=!0),c+=_+`
`,e=e.substring(_.length+1),u=P.slice(y)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let b=null,k;this.options.gfm&&(b=this.rules.other.listIsTask.exec(d),b&&(k=b[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!b,checked:k,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(u=>u.type==="space"),d=c.length>0&&c.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Nc(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(Nc(r,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Ai(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=Qf(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Oc(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Oc(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,l=a,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const u=[...i[0]][0].length,m=e.slice(0,a+i.index+u+r);if(Math.min(a,r)%2){const y=m.slice(1,-1);return{type:"em",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}const g=m.slice(2,-2);return{type:"strong",raw:m,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},jt=class _c{constructor(t){ne(this,"tokens");ne(this,"options");ne(this,"state");ne(this,"tokenizer");ne(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Pe,this.options.tokenizer=this.options.tokenizer||new Vs,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:qe,block:zs.normal,inline:Ci.normal};this.options.pedantic?(n.block=zs.pedantic,n.inline=Ci.pedantic):this.options.gfm&&(n.block=zs.gfm,this.options.breaks?n.inline=Ci.breaks:n.inline=Ci.gfm),this.tokenizer.rules=n}static get rules(){return{block:zs,inline:Ci}}static lex(t,n){return new _c(n).lex(t)}static lexInline(t,n){return new _c(n).inlineTokens(t)}lex(t){t=t.replace(qe.carriageReturn,`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${wt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=qc(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+wt(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=qc(e);if(s===null)return wt(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${wt(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:wt(e.text)}},Ro=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Rt=class xc{constructor(t){ne(this,"options");ne(this,"renderer");ne(this,"textRenderer");this.options=t||Pe,this.options.renderer=this.options.renderer||new Ws,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ro}static parse(t,n){return new xc(n).parse(t)}static parseInline(t,n){return new xc(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},Ks=(uc=class{constructor(e){ne(this,"options");ne(this,"block");this.options=e||Pe}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?jt.lex:jt.lexInline}provideParser(){return this.block?Rt.parse:Rt.parseInline}},ne(uc,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),uc),Jf=class{constructor(...e){ne(this,"defaults",Mt());ne(this,"options",this.setOptions);ne(this,"parse",this.parseMarkdown(!0));ne(this,"parseInline",this.parseMarkdown(!1));ne(this,"Parser",Rt);ne(this,"Renderer",Ws);ne(this,"TextRenderer",Ro);ne(this,"Lexer",jt);ne(this,"Tokenizer",Vs);ne(this,"Hooks",Ks);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new Ws(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new Vs(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new Ks;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=s[o];Ks.passThroughHooks.has(a)?s[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(u=>l.call(s,u));const d=r.call(s,c);return l.call(s,d)}:s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return jt.lex(e,t??this.defaults)}parser(e,t){return Rt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?jt.lex:jt.lexInline,l=a.hooks?a.hooks.provideParser():e?Rt.parse:Rt.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>l(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let d=l(c,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+wt(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},hn=new Jf;function Z(e,t){return hn.parse(e,t)}Z.options=Z.setOptions=function(e){return hn.setOptions(e),Z.defaults=hn.defaults,gn(Z.defaults),Z},Z.getDefaults=Mt,Z.defaults=Pe,Z.use=function(...e){return hn.use(...e),Z.defaults=hn.defaults,gn(Z.defaults),Z},Z.walkTokens=function(e,t){return hn.walkTokens(e,t)},Z.parseInline=hn.parseInline,Z.Parser=Rt,Z.parser=Rt.parse,Z.Renderer=Ws,Z.TextRenderer=Ro,Z.Lexer=jt,Z.lexer=jt.lex,Z.Tokenizer=Vs,Z.Hooks=Ks,Z.parse=Z,Z.options,Z.setOptions,Z.use,Z.walkTokens,Z.parseInline,Rt.parse,jt.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Hc,setPrototypeOf:Fc,isFrozen:eg,getPrototypeOf:tg,getOwnPropertyDescriptor:ng}=Object;let{freeze:Ne,seal:nt,create:Po}=Object,{apply:qo,construct:No}=typeof Reflect<"u"&&Reflect;Ne||(Ne=function(t){return t}),nt||(nt=function(t){return t}),qo||(qo=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),No||(No=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Ys=He(Array.prototype.forEach),ig=He(Array.prototype.lastIndexOf),Uc=He(Array.prototype.pop),Bi=He(Array.prototype.push),sg=He(Array.prototype.splice),Zs=He(String.prototype.toLowerCase),Oo=He(String.prototype.toString),Ho=He(String.prototype.match),Di=He(String.prototype.replace),ag=He(String.prototype.indexOf),og=He(String.prototype.trim),ft=He(Object.prototype.hasOwnProperty),Oe=He(RegExp.prototype.test),Mi=rg(TypeError);function He(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return qo(e,t,i)}}function rg(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return No(e,n)}}function U(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Zs;Fc&&Fc(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(eg(t)||(t[i]=a),s=a)}e[s]=!0}return e}function lg(e){for(let t=0;t<e.length;t++)ft(e,t)||(e[t]=null);return e}function kt(e){const t=Po(null);for(const[n,i]of Hc(e))ft(e,n)&&(Array.isArray(i)?t[n]=lg(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=kt(i):t[n]=i);return t}function ji(e,t){for(;e!==null;){const i=ng(e,t);if(i){if(i.get)return He(i.get);if(typeof i.value=="function")return He(i.value)}e=tg(e)}function n(){return null}return n}const Gc=Ne(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Fo=Ne(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Uo=Ne(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),cg=Ne(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Go=Ne(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),dg=Ne(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),zc=Ne(["#text"]),Vc=Ne(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),zo=Ne(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Wc=Ne(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Qs=Ne(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ug=nt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),pg=nt(/<%[\w\W]*|[\w\W]*%>/gm),mg=nt(/\$\{[\w\W]*/gm),fg=nt(/^data-[\-\w.\u00B7-\uFFFF]+$/),gg=nt(/^aria-[\-\w]+$/),Kc=nt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),hg=nt(/^(?:\w+script|data):/i),vg=nt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Yc=nt(/^html$/i),yg=nt(/^[a-z][.\w]*(-[.\w]+)+$/i);var Zc=Object.freeze({__proto__:null,ARIA_ATTR:gg,ATTR_WHITESPACE:vg,CUSTOM_ELEMENT:yg,DATA_ATTR:fg,DOCTYPE_NAME:Yc,ERB_EXPR:pg,IS_ALLOWED_URI:Kc,IS_SCRIPT_OR_DATA:hg,MUSTACHE_EXPR:ug,TMPLIT_EXPR:mg});const Ri={element:1,text:3,progressingInstruction:7,comment:8,document:9},bg=function(){return typeof window>"u"?null:window},wg=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Qc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Xc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:bg();const t=j=>Xc(j);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Ri.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:m,trustedTypes:g}=e,y=l.prototype,b=ji(y,"cloneNode"),k=ji(y,"remove"),T=ji(y,"nextSibling"),I=ji(y,"childNodes"),A=ji(y,"parentNode");if(typeof o=="function"){const j=n.createElement("template");j.content&&j.content.ownerDocument&&(n=j.content.ownerDocument)}let D,X="";const{implementation:_,createNodeIterator:P,createDocumentFragment:z,getElementsByTagName:K}=n,{importNode:me}=i;let x=Qc();t.isSupported=typeof Hc=="function"&&typeof A=="function"&&_&&_.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:R,ERB_EXPR:M,TMPLIT_EXPR:te,DATA_ATTR:De,ARIA_ATTR:be,IS_SCRIPT_OR_DATA:we,ATTR_WHITESPACE:Xe,CUSTOM_ELEMENT:pt}=Zc;let{IS_ALLOWED_URI:Me}=Zc,ue=null;const w=U({},[...Gc,...Fo,...Uo,...Go,...zc]);let V=null;const je=U({},[...Vc,...zo,...Wc,...Qs]);let ce=Object.seal(Po(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),mt=null,pc=null;const ki=Object.seal(Po(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Qm=!0,mc=!0,Xm=!1,Jm=!0,$i=!1,ko=!0,jn=!1,fc=!1,gc=!1,Ei=!1,$o=!1,Eo=!1,ef=!0,tf=!1;const q_="user-content-";let hc=!0,Os=!1,_i={},Bt=null;const vc=U({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let nf=null;const sf=U({},["audio","video","img","source","image","track"]);let yc=null;const af=U({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),_o="http://www.w3.org/1998/Math/MathML",xo="http://www.w3.org/2000/svg",Yt="http://www.w3.org/1999/xhtml";let xi=Yt,bc=!1,wc=null;const N_=U({},[_o,xo,Yt],Oo);let Io=U({},["mi","mo","mn","ms","mtext"]),So=U({},["annotation-xml"]);const O_=U({},["title","style","font","a","script"]);let Hs=null;const H_=["application/xhtml+xml","text/html"],F_="text/html";let ye=null,Ii=null;const U_=n.createElement("form"),of=function(h){return h instanceof RegExp||h instanceof Function},kc=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ii&&Ii===h)){if((!h||typeof h!="object")&&(h={}),h=kt(h),Hs=H_.indexOf(h.PARSER_MEDIA_TYPE)===-1?F_:h.PARSER_MEDIA_TYPE,ye=Hs==="application/xhtml+xml"?Oo:Zs,ue=ft(h,"ALLOWED_TAGS")?U({},h.ALLOWED_TAGS,ye):w,V=ft(h,"ALLOWED_ATTR")?U({},h.ALLOWED_ATTR,ye):je,wc=ft(h,"ALLOWED_NAMESPACES")?U({},h.ALLOWED_NAMESPACES,Oo):N_,yc=ft(h,"ADD_URI_SAFE_ATTR")?U(kt(af),h.ADD_URI_SAFE_ATTR,ye):af,nf=ft(h,"ADD_DATA_URI_TAGS")?U(kt(sf),h.ADD_DATA_URI_TAGS,ye):sf,Bt=ft(h,"FORBID_CONTENTS")?U({},h.FORBID_CONTENTS,ye):vc,mt=ft(h,"FORBID_TAGS")?U({},h.FORBID_TAGS,ye):kt({}),pc=ft(h,"FORBID_ATTR")?U({},h.FORBID_ATTR,ye):kt({}),_i=ft(h,"USE_PROFILES")?h.USE_PROFILES:!1,Qm=h.ALLOW_ARIA_ATTR!==!1,mc=h.ALLOW_DATA_ATTR!==!1,Xm=h.ALLOW_UNKNOWN_PROTOCOLS||!1,Jm=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,$i=h.SAFE_FOR_TEMPLATES||!1,ko=h.SAFE_FOR_XML!==!1,jn=h.WHOLE_DOCUMENT||!1,Ei=h.RETURN_DOM||!1,$o=h.RETURN_DOM_FRAGMENT||!1,Eo=h.RETURN_TRUSTED_TYPE||!1,gc=h.FORCE_BODY||!1,ef=h.SANITIZE_DOM!==!1,tf=h.SANITIZE_NAMED_PROPS||!1,hc=h.KEEP_CONTENT!==!1,Os=h.IN_PLACE||!1,Me=h.ALLOWED_URI_REGEXP||Kc,xi=h.NAMESPACE||Yt,Io=h.MATHML_TEXT_INTEGRATION_POINTS||Io,So=h.HTML_INTEGRATION_POINTS||So,ce=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&of(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ce.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&of(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ce.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ce.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),$i&&(mc=!1),$o&&(Ei=!0),_i&&(ue=U({},zc),V=[],_i.html===!0&&(U(ue,Gc),U(V,Vc)),_i.svg===!0&&(U(ue,Fo),U(V,zo),U(V,Qs)),_i.svgFilters===!0&&(U(ue,Uo),U(V,zo),U(V,Qs)),_i.mathMl===!0&&(U(ue,Go),U(V,Wc),U(V,Qs))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?ki.tagCheck=h.ADD_TAGS:(ue===w&&(ue=kt(ue)),U(ue,h.ADD_TAGS,ye))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?ki.attributeCheck=h.ADD_ATTR:(V===je&&(V=kt(V)),U(V,h.ADD_ATTR,ye))),h.ADD_URI_SAFE_ATTR&&U(yc,h.ADD_URI_SAFE_ATTR,ye),h.FORBID_CONTENTS&&(Bt===vc&&(Bt=kt(Bt)),U(Bt,h.FORBID_CONTENTS,ye)),h.ADD_FORBID_CONTENTS&&(Bt===vc&&(Bt=kt(Bt)),U(Bt,h.ADD_FORBID_CONTENTS,ye)),hc&&(ue["#text"]=!0),jn&&U(ue,["html","head","body"]),ue.table&&(U(ue,["tbody"]),delete mt.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw Mi('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Mi('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=h.TRUSTED_TYPES_POLICY,X=D.createHTML("")}else D===void 0&&(D=wg(g,s)),D!==null&&typeof X=="string"&&(X=D.createHTML(""));Ne&&Ne(h),Ii=h}},rf=U({},[...Fo,...Uo,...cg]),lf=U({},[...Go,...dg]),G_=function(h){let S=A(h);(!S||!S.tagName)&&(S={namespaceURI:xi,tagName:"template"});const B=Zs(h.tagName),de=Zs(S.tagName);return wc[h.namespaceURI]?h.namespaceURI===xo?S.namespaceURI===Yt?B==="svg":S.namespaceURI===_o?B==="svg"&&(de==="annotation-xml"||Io[de]):!!rf[B]:h.namespaceURI===_o?S.namespaceURI===Yt?B==="math":S.namespaceURI===xo?B==="math"&&So[de]:!!lf[B]:h.namespaceURI===Yt?S.namespaceURI===xo&&!So[de]||S.namespaceURI===_o&&!Io[de]?!1:!lf[B]&&(O_[B]||!rf[B]):!!(Hs==="application/xhtml+xml"&&wc[h.namespaceURI]):!1},Dt=function(h){Bi(t.removed,{element:h});try{A(h).removeChild(h)}catch{k(h)}},Rn=function(h,S){try{Bi(t.removed,{attribute:S.getAttributeNode(h),from:S})}catch{Bi(t.removed,{attribute:null,from:S})}if(S.removeAttribute(h),h==="is")if(Ei||$o)try{Dt(S)}catch{}else try{S.setAttribute(h,"")}catch{}},cf=function(h){let S=null,B=null;if(gc)h="<remove></remove>"+h;else{const fe=Ho(h,/^[\r\n\t ]+/);B=fe&&fe[0]}Hs==="application/xhtml+xml"&&xi===Yt&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");const de=D?D.createHTML(h):h;if(xi===Yt)try{S=new m().parseFromString(de,Hs)}catch{}if(!S||!S.documentElement){S=_.createDocument(xi,"template",null);try{S.documentElement.innerHTML=bc?X:de}catch{}}const Re=S.body||S.documentElement;return h&&B&&Re.insertBefore(n.createTextNode(B),Re.childNodes[0]||null),xi===Yt?K.call(S,jn?"html":"body")[0]:jn?S.documentElement:Re},df=function(h){return P.call(h.ownerDocument||h,h,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},$c=function(h){return h instanceof u&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof d)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},uf=function(h){return typeof r=="function"&&h instanceof r};function Zt(j,h,S){Ys(j,B=>{B.call(t,h,S,Ii)})}const pf=function(h){let S=null;if(Zt(x.beforeSanitizeElements,h,null),$c(h))return Dt(h),!0;const B=ye(h.nodeName);if(Zt(x.uponSanitizeElement,h,{tagName:B,allowedTags:ue}),ko&&h.hasChildNodes()&&!uf(h.firstElementChild)&&Oe(/<[/\w!]/g,h.innerHTML)&&Oe(/<[/\w!]/g,h.textContent)||h.nodeType===Ri.progressingInstruction||ko&&h.nodeType===Ri.comment&&Oe(/<[/\w]/g,h.data))return Dt(h),!0;if(!(ki.tagCheck instanceof Function&&ki.tagCheck(B))&&(!ue[B]||mt[B])){if(!mt[B]&&ff(B)&&(ce.tagNameCheck instanceof RegExp&&Oe(ce.tagNameCheck,B)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(B)))return!1;if(hc&&!Bt[B]){const de=A(h)||h.parentNode,Re=I(h)||h.childNodes;if(Re&&de){const fe=Re.length;for(let Je=fe-1;Je>=0;--Je){const Qt=b(Re[Je],!0);Qt.__removalCount=(h.__removalCount||0)+1,de.insertBefore(Qt,T(h))}}}return Dt(h),!0}return h instanceof l&&!G_(h)||(B==="noscript"||B==="noembed"||B==="noframes")&&Oe(/<\/no(script|embed|frames)/i,h.innerHTML)?(Dt(h),!0):($i&&h.nodeType===Ri.text&&(S=h.textContent,Ys([R,M,te],de=>{S=Di(S,de," ")}),h.textContent!==S&&(Bi(t.removed,{element:h.cloneNode()}),h.textContent=S)),Zt(x.afterSanitizeElements,h,null),!1)},mf=function(h,S,B){if(ef&&(S==="id"||S==="name")&&(B in n||B in U_))return!1;if(!(mc&&!pc[S]&&Oe(De,S))){if(!(Qm&&Oe(be,S))){if(!(ki.attributeCheck instanceof Function&&ki.attributeCheck(S,h))){if(!V[S]||pc[S]){if(!(ff(h)&&(ce.tagNameCheck instanceof RegExp&&Oe(ce.tagNameCheck,h)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(h))&&(ce.attributeNameCheck instanceof RegExp&&Oe(ce.attributeNameCheck,S)||ce.attributeNameCheck instanceof Function&&ce.attributeNameCheck(S,h))||S==="is"&&ce.allowCustomizedBuiltInElements&&(ce.tagNameCheck instanceof RegExp&&Oe(ce.tagNameCheck,B)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(B))))return!1}else if(!yc[S]){if(!Oe(Me,Di(B,Xe,""))){if(!((S==="src"||S==="xlink:href"||S==="href")&&h!=="script"&&ag(B,"data:")===0&&nf[h])){if(!(Xm&&!Oe(we,Di(B,Xe,"")))){if(B)return!1}}}}}}}return!0},ff=function(h){return h!=="annotation-xml"&&Ho(h,pt)},gf=function(h){Zt(x.beforeSanitizeAttributes,h,null);const{attributes:S}=h;if(!S||$c(h))return;const B={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:V,forceKeepAttr:void 0};let de=S.length;for(;de--;){const Re=S[de],{name:fe,namespaceURI:Je,value:Qt}=Re,Si=ye(fe),Ec=Qt;let Se=fe==="value"?Ec:og(Ec);if(B.attrName=Si,B.attrValue=Se,B.keepAttr=!0,B.forceKeepAttr=void 0,Zt(x.uponSanitizeAttribute,h,B),Se=B.attrValue,tf&&(Si==="id"||Si==="name")&&(Rn(fe,h),Se=q_+Se),ko&&Oe(/((--!?|])>)|<\/(style|title|textarea)/i,Se)){Rn(fe,h);continue}if(Si==="attributename"&&Ho(Se,"href")){Rn(fe,h);continue}if(B.forceKeepAttr)continue;if(!B.keepAttr){Rn(fe,h);continue}if(!Jm&&Oe(/\/>/i,Se)){Rn(fe,h);continue}$i&&Ys([R,M,te],vf=>{Se=Di(Se,vf," ")});const hf=ye(h.nodeName);if(!mf(hf,Si,Se)){Rn(fe,h);continue}if(D&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!Je)switch(g.getAttributeType(hf,Si)){case"TrustedHTML":{Se=D.createHTML(Se);break}case"TrustedScriptURL":{Se=D.createScriptURL(Se);break}}if(Se!==Ec)try{Je?h.setAttributeNS(Je,fe,Se):h.setAttribute(fe,Se),$c(h)?Dt(h):Uc(t.removed)}catch{Rn(fe,h)}}Zt(x.afterSanitizeAttributes,h,null)},z_=function j(h){let S=null;const B=df(h);for(Zt(x.beforeSanitizeShadowDOM,h,null);S=B.nextNode();)Zt(x.uponSanitizeShadowNode,S,null),pf(S),gf(S),S.content instanceof a&&j(S.content);Zt(x.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(j){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},S=null,B=null,de=null,Re=null;if(bc=!j,bc&&(j="<!-->"),typeof j!="string"&&!uf(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw Mi("dirty is not a string, aborting")}else throw Mi("toString is not a function");if(!t.isSupported)return j;if(fc||kc(h),t.removed=[],typeof j=="string"&&(Os=!1),Os){if(j.nodeName){const Qt=ye(j.nodeName);if(!ue[Qt]||mt[Qt])throw Mi("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof r)S=cf("<!---->"),B=S.ownerDocument.importNode(j,!0),B.nodeType===Ri.element&&B.nodeName==="BODY"||B.nodeName==="HTML"?S=B:S.appendChild(B);else{if(!Ei&&!$i&&!jn&&j.indexOf("<")===-1)return D&&Eo?D.createHTML(j):j;if(S=cf(j),!S)return Ei?null:Eo?X:""}S&&gc&&Dt(S.firstChild);const fe=df(Os?j:S);for(;de=fe.nextNode();)pf(de),gf(de),de.content instanceof a&&z_(de.content);if(Os)return j;if(Ei){if($o)for(Re=z.call(S.ownerDocument);S.firstChild;)Re.appendChild(S.firstChild);else Re=S;return(V.shadowroot||V.shadowrootmode)&&(Re=me.call(i,Re,!0)),Re}let Je=jn?S.outerHTML:S.innerHTML;return jn&&ue["!doctype"]&&S.ownerDocument&&S.ownerDocument.doctype&&S.ownerDocument.doctype.name&&Oe(Yc,S.ownerDocument.doctype.name)&&(Je="<!DOCTYPE "+S.ownerDocument.doctype.name+`>
`+Je),$i&&Ys([R,M,te],Qt=>{Je=Di(Je,Qt," ")}),D&&Eo?D.createHTML(Je):Je},t.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};kc(j),fc=!0},t.clearConfig=function(){Ii=null,fc=!1},t.isValidAttribute=function(j,h,S){Ii||kc({});const B=ye(j),de=ye(h);return mf(B,de,S)},t.addHook=function(j,h){typeof h=="function"&&Bi(x[j],h)},t.removeHook=function(j,h){if(h!==void 0){const S=ig(x[j],h);return S===-1?void 0:sg(x[j],S,1)[0]}return Uc(x[j])},t.removeHooks=function(j){x[j]=[]},t.removeAllHooks=function(){x=Qc()},t}var Jc=Xc();const Vo="chaotic_";function Ke(e){try{return localStorage.getItem(Vo+e)}catch{return null}}function it(e,t){try{localStorage.setItem(Vo+e,t)}catch{}}function $t(e){try{localStorage.removeItem(Vo+e)}catch{}}function ed(){return Ke("token")}function kg(e){e?it("token",e):$t("token")}function $g(){return Ke("theme")}function Eg(e){it("theme",e)}function td(){return Ke("last_project")}function _g(e){it("last_project",e)}function xg(){return Ke("onboarding_complete")==="true"}function Ig(){it("onboarding_complete","true")}function Sg(){$t("onboarding_complete")}function Tg(e){return e?Ke(`issues_filters_${e}`):null}function Lg(e,t){e&&(t?it(`issues_filters_${e}`,t):$t(`issues_filters_${e}`))}function nd(e){return Ke(`comment_draft_${e}`)}function Xs(e,t){t?it(`comment_draft_${e}`,t):$t(`comment_draft_${e}`)}function id(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function Js(e){const t=Ke(`description_draft_${e}`);if(!t)return null;const n=id(t);return n?n.draft:t}function sd(e){const t=Ke(`description_draft_${e}`);if(!t)return null;const n=id(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function vn(e,t,n=""){t?it(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):$t(`description_draft_${e}`)}function ad(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function od(e){var n;const t=Ke(`document_draft_${e}`);return t?((n=ad(t))==null?void 0:n.draft)??null:null}function Cg(e){const t=Ke(`document_draft_${e}`);if(!t)return null;const n=ad(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function ea(e,t,n=null){t&&(t.title||t.content||t.icon)?it(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):$t(`document_draft_${e}`)}function Ag(){return{title:Ke("create_issue_title"),description:Ke("create_issue_description")}}function rd(e,t){e?it("create_issue_title",e):$t("create_issue_title"),t?it("create_issue_description",t):$t("create_issue_description")}function Bg(){$t("create_issue_title"),$t("create_issue_description")}function Dg(){return Ke("doc_view_mode")}function Mg(e){it("doc_view_mode",e)}function jg(){return Ke("approvals_explainer_dismissed")==="1"}function Rg(){it("approvals_explainer_dismissed","1")}const Pg="/api";class qg{constructor(){this.token=ed()}setToken(t){this.token=t,kg(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s};i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(i));let o;try{o=await fetch(`${Pg}${n}`,a)}catch(l){const c=new Error("Network error - check your connection");throw c.isNetworkError=!0,c.cause=l,c}if(o.status===204)return null;let r;try{r=await o.json()}catch{const l=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${l})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let l;typeof r.detail=="string"?l=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?l=r.detail.message:l="An error occurred";const c=new Error(l);throw c.status=o.status,c.detail=r.detail,c}return r}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:a=null,skip:o=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),a&&c.set("order",a),c.set("skip",String(o)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/teams/${t}/agents`,a)}async createProjectAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/projects/${t}/agents`,a)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const v=new qg;let Pn=null;const Ng='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let qn=null,Pi=!1;function Wo(){Pi=!0}function Og(){Pi=!1}function ld(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function Hg(){if(Pi)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function W(){qn=document.activeElement,Pi=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function O(){var e;Pt(),Pi=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),qn&&document.contains(qn)&&typeof qn.focus=="function"&&qn.focus(),qn=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(Ng);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function st(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function $(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),u=setTimeout(o,l);return a.addEventListener("click",()=>{clearTimeout(u),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(u),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),u=setTimeout(o,Math.max(c,500))}),i}function Ko(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=$(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function Fg(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function E(e,t){const n=Fg(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";$(`Failed to ${e}: ${n}${i}`,"error")}function Pt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Pn&&(document.removeEventListener("keydown",Pn),Pn=null)}function Ug(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));Pt(),t&&st()&&ld()}function qi(e){Pn&&document.removeEventListener("keydown",Pn),Pn=e,e&&document.addEventListener("keydown",e)}function Ni(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(Pt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function ke(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Fe(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function et(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ie(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function f(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function p(e){return f(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Gg(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function at(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function Et(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}function zg(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Nn(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?zg(i)?`<img class="${t} avatar-img" src="${p(i)}" alt="${p(n)}">`:`<div class="${t} avatar-emoji">${f(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function Yo(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${p(n)}">agent</span>`}function On(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${p(i)}">${f(n)}</span>`}return Yo(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let ae={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const Zo=new Set;function pe(e,t){if(typeof e=="string"){const n=ae[e];ae[e]=t,cd(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=ae[i];ae[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{cd(i,s,a)})}}function ot(e){return Zo.add(e),()=>Zo.delete(e)}function cd(e,t,n){t!==n&&Zo.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const _t=()=>ae.currentUser,Hn=e=>pe("currentUser",e),L=()=>ae.currentView,ta=e=>pe("currentView",e),J=()=>ae.issues,Ye=e=>pe("issues",e),Oi=()=>ae.detailNavContext,qt=e=>pe("detailNavContext",e),dd=()=>ae.labels,na=e=>pe("labels",e),ud=()=>ae.activeFilterCategory,Vg=e=>pe("activeFilterCategory",e),pd=()=>ae.selectedIssueIndex,yn=e=>pe("selectedIssueIndex",e),Wg=()=>ae.selectedDocIndex,md=e=>pe("selectedDocIndex",e),fd=()=>ae.selectedBoardIndex,ia=e=>pe("selectedBoardIndex",e),Kg=()=>ae.selectedInboxIndex,sa=e=>pe("selectedInboxIndex",e),Yg=()=>ae.selectedSprintIndex,gd=e=>pe("selectedSprintIndex",e),Zg=()=>ae.selectedEpicIndex,Qo=e=>pe("selectedEpicIndex",e),Qg=()=>ae.pendingGates,Xg=e=>pe("pendingGates",e),ge=()=>ae.inboxEntries,Nt=e=>pe("inboxEntries",e),aa=()=>ae.inboxUnreadCount,Hi=e=>pe("inboxUnreadCount",e),Jg=()=>ae.searchDebounceTimer,eh=e=>pe("searchDebounceTimer",e),th=()=>ae.websocket,Xo=e=>pe("websocket",e),C=()=>ae.currentTeam,Fi=e=>pe("currentTeam",e),Y=()=>ae.currentProject,rt=e=>pe("currentProject",e||null),$e=()=>ae.currentDetailIssue,Fn=e=>pe("currentDetailIssue",e),nh=()=>ae.currentDetailSprints,hd=e=>pe("currentDetailSprints",e),Jo={};function se(e){Object.assign(Jo,e)}function ih(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=Jo[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let vd=!1;function sh(){if(!vd){vd=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,ih);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=Jo[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const er=["backlog","todo","in_progress","in_review","done","canceled"],Ui=["backlog","todo","in_progress","in_review"],yd=["urgent","high","medium","low","no_priority"],tr=["no_priority","urgent","high","medium","low"],bd=["backlog","todo","in_progress","in_review","done"],oa="#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row";function H({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${p(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${p(r)}="${p(l)}"`).join(""):""}>${f(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${f(t)}</h3>
            <p>${f(n)}</p>
            ${a}
        </div>
    `}const q={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},wd=24,lt=new Map,Ee=new Map,Ot=new Map;let Ht=null;function ah(e){return Array.isArray(e)?[...e].map(String).sort():e}function kd(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,ah(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function nr(e,t){for(Ee.delete(e),Ee.set(e,t);Ee.size>wd;){const n=Ee.keys().next().value;Ee.delete(n)}$d()}function $d(){if(lt.size===0)return;const e=new Set;Ee.forEach(t=>t.ids.forEach(n=>e.add(n))),lt.forEach((t,n)=>{e.has(n)||lt.delete(n)})}function oh(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function Ed(e){const t=Ee.get(e);return t?(nr(e,t),t.ids.map(n=>lt.get(n)).filter(Boolean)):null}function ir(e){return lt.get(e)}function rh(e){var t;return((t=Ee.get(e))==null?void 0:t.meta)||{}}function _d(e,t){if(!e||!t)return!1;const n=Date.parse(e),i=Date.parse(t);return Number.isNaN(n)||Number.isNaN(i)?e>t:n>i}function xd(e){const t=lt.get(e.id);if(!_d(t==null?void 0:t.updated_at,e.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){lt.set(e.id,{...e,description:t.description});return}lt.set(e.id,e)}}function Id(e,t,n){if(!Array.isArray(t))return;const i=oh(t);i.forEach(xd);const s=Ee.get(e);nr(e,{ids:i.map(a=>a.id),meta:n??(s==null?void 0:s.meta)??{}})}function lh(e,t){const n=Ee.get(e);n&&(n.meta=t)}function ra(e){e!=null&&e.id&&lt.has(e.id)&&xd(e)}function ch(e){Ee.delete(e),Ot.forEach((t,n)=>{t===e&&Ot.delete(n)}),Ht===e&&(Ht=null),$d()}function dh(e){lt.delete(e),Ee.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function la(e){Ht=e}function uh(){return Ht}function ph(e,t){for(Ot.delete(e),Ot.set(e,t);Ot.size>wd;)Ot.delete(Ot.keys().next().value)}function mh(e){const t=Ot.get(e);return t&&Ee.has(t)?t:null}function Sd(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function Td(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(Sd(e[n])!==Sd(t[n]))return!1;return!0}const Ld=["status","priority"],Cd=["assignee_id","sprint_id","issue_type"],fh={assignee_id:"unassigned",sprint_id:"no_sprint"},gh=["scope","project_id","sort_by","order","limit"],bn=e=>(e||[]).map(t=>String(t).toLowerCase());function hh(e,t){if(e.search||t.search||t.sort_by==="random"||gh.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of Ld)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of Cd)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=bn(e.label);if(!bn(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=bn(t.exclude_label);if(!bn(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function Ad(e){const t=e.label===void 0?null:bn(e.label),n=e.exclude_label===void 0?null:bn(e.exclude_label);return i=>{for(const s of Ld)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of Cd){if(e[s]===void 0)continue;const a=e[s]===fh[s]?null:e[s];if((i[s]??null)!==a)return!1}if(t||n){const s=bn((i.labels||[]).map(a=>a.name));if(t&&!t.some(a=>s.includes(a))||n&&n.some(a=>s.includes(a)))return!1}return!0}}function vh(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(kd(e)));let n=null,i=null;if(Ee.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let c;try{c=Object.fromEntries(JSON.parse(l))}catch{return}hh(c,t)&&(n=r,i=l)}),!n)return null;nr(i,n);const s=Ad(t),a=n.ids.map(r=>lt.get(r)).filter(r=>r&&s(r)),o=t.limit;return{rows:a,complete:!(typeof o=="number"&&n.ids.length>=o)}}function yh(){lt.clear(),Ee.clear(),Ot.clear(),Ht=null}ot((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&yh();return}if(e!=="issues"||Ht===null||!Ee.has(Ht)||L()!=="issues")return;const i=Ee.get(Ht);Id(Ht,J(),i.meta)});let sr=[];function bh(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function wh(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function ca(e,t){const n=e().map(bh),i=t().map(wh);sr=[...n,...i]}function Xt(e){return e&&sr.find(t=>t.id===e)||null}function Jt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function ar(e,t=!1){const n=f(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${f(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function da({includeIdle:e=!1,keepId:t=null}={}){const n=sr.filter(y=>e||!y.idle||y.id===t),i=n.filter(y=>!y.is_agent),s=new Set(i.map(y=>y.id)),a=n.filter(y=>y.is_agent),o=new Set(a.map(y=>y.id)),r=(y,b)=>y.name.localeCompare(b.name),l=y=>y.registered_by_id&&o.has(y.registered_by_id),c=new Map,d=new Map;a.forEach(y=>{const[b,k]=l(y)?[c,y.registered_by_id]:[d,y.parent_user_id];b.has(k)||b.set(k,[]),b.get(k).push(y)});const u=[],m=(y,b)=>{u.push({assignee:y,indent:b}),(c.get(y.id)||[]).sort(r).forEach(T=>u.push({assignee:T,indent:2}))};return i.forEach(y=>{u.push({assignee:y,indent:!1}),(d.get(y.id)||[]).sort(r).forEach(b=>m(b,!0))}),a.filter(y=>!l(y)&&!s.has(y.parent_user_id)).sort(r).forEach(y=>m(y,!1)),u}function Gi({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;da({keepId:n}).forEach(({assignee:s,indent:a})=>{i+=`<option value="${s.id}">${ar(s,a)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function kh(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&Xt(e)&&Gi({keepId:e}),t.value=e}let Un=[],or=[];ot(e=>{e==="currentProject"&&L()==="my-issues"&&(Gn(),Vi(),zn())});function Ze(){return Un}function wn(e){Un=e}let rr=0;async function Gn(){var a;const e=C(),t=_t();if(!e||!t)return;const n=++rr,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=Y();Eh();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await v.getIssues({...o,project_id:s}):r=await v.getTeamIssues(e.id,o),n!==rr)return;Un=r,L()==="my-issues"&&qt(Un),zi()}catch(o){if(n!==rr)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=H({icon:q.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),E("load issues",o)}}async function zn({showLoading:e=!0}={}){const t=C();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=Y();or=await v.getTeamActivities(t.id,0,10,{projectId:i}),$h()}catch{n&&(n.innerHTML=H({icon:q.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function $h(){const e=document.getElementById("dashboard-activity-list");if(e){if(!or.length){e.innerHTML=H({icon:q.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=or.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${p(t.issue_identifier)}"><strong>${f(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const i=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${p(t.document_id)}"><strong>${i} ${f(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${f(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${Sr(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Lr(t)}${n}</span>
                <span class="activity-actor">by ${f(Tr(t))}</span>
                <span class="activity-time">${at(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function Eh(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function Bd(){Gn()}function zi(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),Un.length===0){e.innerHTML=H({icon:q.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}e.innerHTML=Un.map(t=>Xn(t)).join("")}}let lr=0;async function Vi(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++lr,n=Y(),i=ee(),s=n?i.filter(a=>a.id===n):i;if(!s.length){e.innerHTML="";return}try{const a=s.map(async r=>{try{const l=await v.getCurrentSprint(r.id);if(!l)return null;let c={};try{const d=await v.getIssues({sprint_id:l.id,project_id:r.id,limit:500});for(const u of d)c[u.status]=(c[u.status]||0)+1}catch(d){console.error(`Failed to load issue counts for sprint ${l.id}:`,d)}return{project:r,sprint:l,statusCounts:c}}catch(l){return console.error(`Failed to load current sprint for project ${r.id}:`,l),null}}),o=(await Promise.all(a)).filter(Boolean);if(t!==lr)return;_h(o)}catch(a){if(t!==lr)return;console.error("Failed to load sprint status:",a),e.innerHTML=H({icon:q.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}function _h(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active Sprints</h3>
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
    `}se({"filter-my-issues":()=>Bd(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),xp(t.identifier)},"retry-load-my-issues":()=>Gn(),"retry-load-sprint-status":()=>Vi()});const Dd=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Wi(e=null){const t=e||Y()||"";Kd([]);const n=ee().map(o=>`
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
                                ${Dd.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
    `,W(),ga();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=Ag();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{rd(i.value,s.value)}),s.addEventListener("input",()=>{rd(i.value,s.value)}),i.focus()}function xh(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function Ih(e){const t=Dd.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function Md(e,t){const n=ee().find(i=>i.id===t);Kd([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
    `,W(),ga(),document.getElementById("create-issue-title").focus()}async function Sh(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){$("Please enter a title","error");return}try{const d=await v.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:Wd(),parent_id:e});O(),$(`Created sub-issue ${d.identifier}`,"success"),oe(e)}catch(d){E("create sub-issue",d)}}async function Th(e,t,n){var o,r;Pt();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${bd.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${p(ke(c))}">
                    ${Le(c)}
                    <span>${ke(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${tr.map(c=>`
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
        `}else if(e==="labels")if(!C())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=dd(),c=!1;if(l.length===0)try{l=await v.getLabels(C().id),na(l)}catch(d){console.error("Failed to load labels:",d),c=!0}pr(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Ni(a,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=da({keepId:l});a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:u})=>{const m=Jt(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${p(d.id)}" data-label="${p(m)}">
                    ${Nn(d,"avatar-small")}
                    <span>${ar(d,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=ai(c);a.innerHTML=`
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
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Ni(a)}function Lh(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Ch(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,Wo();const i=f(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${Le(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${gt(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${Et(t)}</span><span id="create-issue-type-label">${i}</span>`)}Pt(),s==null||s.focus()}async function jd({keepOpen:e=!1}={}){var b,k;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((b=document.getElementById("create-issue-sprint"))==null?void 0:b.value)||null,u=(k=document.getElementById("create-issue-due-date"))==null?void 0:k.value,m=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),y=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),y&&(y.disabled=!0);try{const T=await v.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:d,label_ids:Wd(),due_date:m});$(`Created ${T.identifier}`,"success"),Bg(),L()==="issues"?It():L()==="my-issues"&&Gn(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",Og(),document.getElementById("create-issue-title").focus()):(O(),oe(T.id))}catch(T){E("create issue",T)}finally{g&&(g.disabled=!1),y&&(y.disabled=!1)}}async function Ah(){await jd({keepOpen:!1})}async function Bh(){await jd({keepOpen:!0})}se({"toggle-create-dropdown":(e,t,n)=>{Th(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Ch(t.field,t.value,t.label)},"create-issue-submit":()=>{Ah()},"create-issue-and-new":()=>{Bh()},"update-create-project":()=>{Lh()},"apply-template":e=>{Ih(e.target.value)},"toggle-create-options":()=>{xh()},"create-sub-issue-submit":(e,t)=>{Sh(t.parentId,t.projectId)}});function Ki(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&($(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(Dh(n,e.project_id),t=!0),t}function Dh(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
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
    `,W())}async function Mh(e,t){try{const n=await v.updateIssue(e,{status:"done"});O(),$(`${t} closed`,"success"),Ki(n)}catch(n){E(`close ${t}`,n)}}se({"parent-prompt-dismiss":()=>O(),"parent-prompt-close":(e,t)=>Mh(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{O(),Md(t.parentId,t.projectId)}});function en(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function kn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function $n(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function En(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function ua(){const e=document.getElementById("group-by-select");return e?e.value:""}const Rd=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],cr=["done","canceled"],jh=Ui,Rh="all";function Pd(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function Vn(e=en()){return e.length===0?"all":Pd(e,Ui)?"open":Pd(e,cr)?"closed":null}function qd(e){var t,n,i;switch(e){case"project":return Y()?1:0;case"status":{const s=Vn();return s==="all"?0:s?1:en().length}case"priority":return kn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return $n().length;case"exclude_labels":return En().length;default:return 0}}function dr(){let e=0;return Rd.forEach(t=>{e+=qd(t.key)}),e}function Nd(){var y,b,k,T,I,A;const e=new URLSearchParams,t=en(),n=kn(),i=$n(),s=En(),a=(y=document.getElementById("assignee-filter"))==null?void 0:y.value,o=Y()||"",r=(b=document.getElementById("sprint-filter"))==null?void 0:b.value,l=(k=document.getElementById("issue-type-filter"))==null?void 0:k.value,c=(T=document.getElementById("group-by-select"))==null?void 0:T.value,d=(I=document.getElementById("sort-by-select"))==null?void 0:I.value,u=Vn(t);u==="all"?e.append("status",Rh):u!=="open"&&t.forEach(D=>e.append("status",D)),n.forEach(D=>e.append("priority",D)),i.forEach(D=>e.append("label",D)),s.forEach(D=>e.append("exclude_label",D)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const m=e.toString(),g=m?`/issues?${m}`:"/issues";history.replaceState({view:"issues"},"",g),Lg((A=C())==null?void 0:A.id,m)}function Ph(e){var b;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(k=>t.has(k))){const k=Tg((b=C())==null?void 0:b.id);if(k){t=new URLSearchParams(k);const T=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",T)}}const s=t.getAll("status"),a=document.getElementById("status-filter-dropdown");if(a&&(s.length>0||!a.dataset.statusApplied)){const k=s.length>0?s:jh;a.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=k.includes(I.value)}),a.dataset.statusApplied="true",Od()}const o=t.getAll("priority");if(o.length>0){const k=document.getElementById("priority-filter-dropdown");k&&(k.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=o.includes(I.value)}),Hd())}const r=t.get("assignee");r&&kh(r);const l=t.get("project");l&&(e(!0),rt(l),e(!1));const c=t.get("sprint");if(c){const k=document.getElementById("sprint-filter");k&&(k.value=c)}const d=t.get("issue_type");if(d){const k=document.getElementById("issue-type-filter");k&&(k.value=d)}const u=t.getAll("label");if(u.length>0){const k=document.getElementById("label-filter-dropdown");k&&(k.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=u.includes(I.value)}),pa())}const m=t.getAll("exclude_label");if(m.length>0){const k=document.getElementById("exclude-label-filter-dropdown");k&&(k.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=m.includes(I.value)}),ma())}const g=t.get("groupBy");if(g){const k=document.getElementById("group-by-select");k&&(k.value=g)}const y=t.get("sort");if(y){const k=document.getElementById("sort-by-select");k&&(k.value=y)}}function Od(){const e=en(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=Vn(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=ke(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function Hd(){const e=kn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Fe(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function pa(){var i,s;const e=$n(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function ma(){var i,s;const e=En(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function Fd(){if(!C())return;let e;try{e=await v.getLabels(C().id)}catch(t){console.error("Failed to load labels for filter:",t);return}Ud("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),Ud("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function Ud(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${ie(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${f(r.name)}</span>
                </span>
            `,a.appendChild(l)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}const Gd=er,qh=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let xt=[],zd=Promise.resolve();const Nh={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};function fa(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const Oh={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function Vd(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function Yi(){return!!document.querySelector(".inline-dropdown")}function Wd(){return xt}function Kd(e){xt=e}async function ur(e,t,n,i){var u,m,g,y;e.preventDefault(),Pt();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Gd.map((b,k)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="status" data-value="${b}">
                    ${Le(b)}
                    <span>${ke(b)}</span>
                    <span class="dropdown-shortcut">${k+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${tr.map((b,k)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="priority" data-value="${b}">
                    ${gt(b)}
                    <span>${Fe(b)}</span>
                    <span class="dropdown-shortcut">${k}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${qh.map(b=>`
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
                    ${Nn(I,"avatar-small")}
                    <span>${ar(I,A)}</span>
                    ${D<9?`<span class="dropdown-shortcut">${D+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const b=document.querySelector(`.issue-row[data-issue-id="${n}"]`),k=(b==null?void 0:b.dataset.projectId)||((u=$e())==null?void 0:u.project_id),T=ai(k);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${T.map((I,A)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="estimate" data-value="${I.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${I.label}</span>
                    ${A<9?`<span class="dropdown-shortcut">${A}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const b=J(),k=Ze(),T=$e(),I=b.find(R=>R.id===n)||k.find(R=>R.id===n)||T,A=new Set(((I==null?void 0:I.labels)||[]).map(R=>R.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const D=o.getBoundingClientRect();let X=a.bottom+4,_=a.left;_+D.width>window.innerWidth-8&&(_=a.right-D.width),X+D.height>window.innerHeight-8&&(X=a.top-D.height-4),o.style.top=`${X}px`,o.style.left=`${Math.max(8,_)}px`,Ni(o,{multiSelect:!0});let P=[];const z=C();if(z)try{P=await v.getLabels(z.id)}catch(R){console.error("Failed to load labels:",R)}if(!o.parentNode)return;Zd(o,n,P,A);const K=o.getBoundingClientRect();let me=a.bottom+4,x=a.left;x+K.width>window.innerWidth-8&&(x=a.right-K.width),me+K.height>window.innerHeight-8&&(me=a.top-K.height-4),o.style.top=`${me}px`,o.style.left=`${Math.max(8,x)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const b=J(),k=Ze(),T=$e(),I=b.find(M=>M.id===n)||k.find(M=>M.id===n)||T,A=(I==null?void 0:I.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const D=o.getBoundingClientRect();let X=a.bottom+4,_=a.left;_+D.width>window.innerWidth-8&&(_=a.right-D.width),X+D.height>window.innerHeight-8&&(X=a.top-D.height-4),o.style.top=`${X}px`,o.style.left=`${Math.max(8,_)}px`,Ni(o);let P=[];if(A)try{P=await v.getSprints(A),Rb(A,P)}catch(M){console.error("Failed to load sprints:",M)}if(!o.parentNode)return;const z=P.filter(M=>M.status!=="completed"||M.id===(I==null?void 0:I.sprint_id));o.innerHTML=`
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
        `;const K=o.getBoundingClientRect();let me=a.bottom+4,x=a.left;x+K.width>window.innerWidth-8&&(x=a.right-K.width),me+K.height>window.innerHeight-8&&(me=a.top-K.height-4),o.style.top=`${me}px`,o.style.left=`${Math.max(8,x)}px`,o.classList.remove("dropdown-positioning");const R=M=>{const te=M.key;if(te==="Escape"||te==="Tab"){Pt(),document.removeEventListener("keydown",R),qi(null);return}if(Vd(M,o))return;const De=parseInt(te);if(isNaN(De))return;const be=o.querySelectorAll(".dropdown-option");let we=!1;De===0?(Wn(n,"sprint_id",null),we=!0):De>=1&&De<be.length&&(be[De].click(),we=!0),we&&(document.removeEventListener("keydown",R),qi(null))};qi(R),document.addEventListener("keydown",R),(g=o.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let l=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),l+r.height>window.innerHeight-8&&(l=a.top-r.height-4),o.style.top=`${l}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const d=b=>{const k=b.key;if(k==="Escape"||k==="Tab"){Pt(),document.removeEventListener("keydown",d);return}if(Vd(b,o))return;const T=parseInt(k);if(isNaN(T))return;let I=!1;if(t==="status"&&T>=1&&T<=6)Wn(n,"status",Gd[T-1]),I=!0;else if(t==="priority"&&T>=0&&T<=4)Wn(n,"priority",tr[T]),I=!0;else if(t==="estimate"){const A=$e(),D=ai(A==null?void 0:A.project_id);T>=0&&T<D.length&&(Wn(n,"estimate",D[T].value),I=!0)}I&&(document.removeEventListener("keydown",d),qi(null))};qi(d),document.addEventListener("keydown",d),(y=o.querySelector(".dropdown-option[data-action]"))==null||y.focus(),Ni(o)}function Hh(e,t,n,i){ur(e,t,n,i)}function Fh(e,t,n){zd=zd.then(()=>Yd(e,t,n))}async function Yd(e,t,n){const i=J(),s=Ze(),a=$e(),o=i.find(d=>d.id===e)||s.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const d=await v.updateIssue(e,{label_ids:c}),u=d.labels||[],m=I=>({...I,labels:u,updated_at:d.updated_at??I.updated_at}),g=J();g.some(I=>I.id===e)&&Ye(g.map(I=>I.id===e?m(I):I));const y=Ze();y.some(I=>I.id===e)&&wn(y.map(I=>I.id===e?m(I):I));const b=$e();(b==null?void 0:b.id)===e&&Fn(m(b));const k=fa(e);if(k&&k.parentNode){const I=J().find(A=>A.id===e)||Ze().find(A=>A.id===e);I&&(k.outerHTML=Xn(I))}const T=document.querySelector(".property-labels-btn");T&&(T.innerHTML=u.length>0?u.map(I=>`
                    <span class="issue-label" style="background: ${ie(I.color)}20; color: ${ie(I.color)}">${f(I.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(E("update labels",d),n){const u=l>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function Zd(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
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
    `}async function Qd(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=C();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await v.createLabel(i.id,{name:s}),o=await v.getLabels(i.id);na(o),a!=null&&a.id&&await Yd(e,a.id,null);const r=J(),l=Ze(),c=$e(),d=r.find(m=>m.id===e)||l.find(m=>m.id===e)||c,u=new Set(((d==null?void 0:d.labels)||[]).map(m=>m.id));t&&Zd(t,e,o,u),n.value=""}catch(a){E("create label",a)}finally{n.disabled=!1,n.focus()}}}function ga(){const e=document.getElementById("create-issue-labels-label");e&&(xt.length===0?e.textContent="Labels":e.textContent=`Labels (${xt.length})`)}function pr(e,{failed:t=!1}={}){const n=dd();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=xt.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${p(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${ie(i.color)}20; color: ${ie(i.color)}">${f(i.name)}</span>
                </button>
            `}).join("")}
    `}function Uh(e){const t=xt.indexOf(e);t>=0?xt.splice(t,1):xt.push(e),Wo(),ga();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&pr(n)}async function Xd(){const e=C();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await v.createLabel(e.id,{name:i}),a=await v.getLabels(e.id);na(a),s!=null&&s.id&&!xt.includes(s.id)&&(xt.push(s.id),Wo()),ga(),t&&pr(t),n.value=""}catch(s){E("create label",s)}finally{n.disabled=!1,n.focus()}}}async function Wn(e,t,n){var r;Pt();const i=Wh(e,t,n),s=Zh(e,t),a=(r=ir(e))==null?void 0:r[t],o=eu(e,t,()=>n);o&&mr(e,t,{focus:!0});try{const l={};l[t]=n;const c=await v.updateIssue(e,l);if(!c||!c.id)throw new Error("Invalid response from server");if(Ki(c),Jd(e,t,i)){const d={...c,...Yh(e,t)};Qh(e,{issue:d,myIssue:d,detail:d}),ra(d),mr(e,t,{focus:!o})}}catch(l){if(E("update issue",l),Jd(e,t,i)){eu(e,t,(d,u)=>d[t]===n?s[u]:d[t]);const c=ir(e);c&&c[t]===n&&ra({...c,[t]:a}),mr(e,t,{focus:!1})}return}finally{Kh(e,t,i)}if($("Issue updated","success"),t==="status")try{const l=Y();if(l){const d=(await v.getSprints(l)).find(u=>u.status==="active");fr(d||null)}}catch{}}const Gh=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),tn=new Map;function zh(e){const t=e&&tn.get(e.id);if(!(t!=null&&t.size))return e;const n={...e};return t.forEach((i,s)=>{n[s]=i.value}),n}let Vh=0;function Wh(e,t,n){const i=++Vh;return tn.has(e)||tn.set(e,new Map),tn.get(e).set(t,{seq:i,value:n}),i}function Jd(e,t,n){var i,s;return((s=(i=tn.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function Kh(e,t,n){var s;const i=tn.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&tn.delete(e))}function Yh(e,t){var i;const n={};return(i=tn.get(e))==null||i.forEach((s,a)=>{a!==t&&(n[a]=s.value)}),n}function Zh(e,t){var i,s;const n=$e();return{issue:(i=J().find(a=>a.id===e))==null?void 0:i[t],myIssue:(s=Ze().find(a=>a.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0}}function eu(e,t,n){const i=(l,c)=>({...l,[t]:n(l,c)});let s=!1;const a=J();a.some(l=>l.id===e)&&(s=!0,Ye(a.map(l=>l.id===e?i(l,"issue"):l)));const o=Ze();o.some(l=>l.id===e)&&(s=!0,wn(o.map(l=>l.id===e?i(l,"myIssue"):l)));const r=$e();return(r==null?void 0:r.id)===e&&(s=!0,Fn(i(r,"detail"))),s}function Qh(e,t){var s;const n=J();t.issue&&n.some(a=>a.id===e)&&Ye(n.map(a=>a.id===e?t.issue:a));const i=Ze();t.myIssue&&i.some(a=>a.id===e)&&wn(i.map(a=>a.id===e?t.myIssue:a)),t.detail&&((s=$e())==null?void 0:s.id)===e&&Fn(t.detail)}function Xh(e){return e==="estimate"||Nh[ua()]===e}function Jh(e,t,n,{focus:i}){var d;const s=fa(e);if(!s||!s.parentNode||!n)return;const a=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&Xh(t)&&J().some(u=>u.id===e))ct();else{const u=s.classList.contains("keyboard-selected");s.outerHTML=Xn(n),u&&((d=fa(e))==null||d.classList.add("keyboard-selected"))}if(!i&&!a)return;const r=fa(e),l=Oh[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus({preventScroll:!0})}function mr(e,t,{focus:n}){const i=J().find(a=>a.id===e)||Ze().find(a=>a.id===e);i&&ra(i),Jh(e,t,i,{focus:n});const s=$e();(s==null?void 0:s.id)===e&&Gh.has(t)&&ev(t,s)}function ev(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".detail-sidebar");if(!i)return;let s=e;e==="assignee_id"&&(s="assignee"),e==="sprint_id"&&(s="sprint"),e==="issue_type"&&(s="type");const a=i.querySelectorAll(".property-row");let o=null;for(const l of a){const c=l.querySelector(".property-label");if(c&&c.textContent.toLowerCase()===s.toLowerCase()){o=l;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${Le(t.status)}
            <span>${ke(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${gt(t.priority)}
            <span>${Fe(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${Et(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const l=t.assignee_id?Xt(t.assignee_id):null,c=l?Jt(l):null;r.innerHTML=c?`${Nn(l,"avatar-small")}<span>${f(c)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const l=nh(),c=t.sprint_id&&l?l.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${c?f(c.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${Wa(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500),r==null||r.focus()}}se({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?Wn(t.issueId,i,n==="null"?null:Number(n)):Wn(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{Fh(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Qd(t.issueId)},"toggle-create-issue-label":(e,t)=>{Uh(t.labelId)},"create-label-for-create-issue":()=>{Xd()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Qd(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Xd())}});function ha(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",tu)},0))}function tu(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",tu))}function tv(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Kn)):(e.classList.remove("hidden"),e.classList.remove("show-options"),Te(),Ue(ud()),setTimeout(()=>{document.addEventListener("click",Kn)},0))}function nv(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Kn)):(e.classList.remove("hidden"),pv(),setTimeout(()=>{document.addEventListener("click",Kn)},0))}function Kn(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Kn))}function _n(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Kn)}function Te(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=Y();e.innerHTML=Rd.map(n=>{const i=qd(n.key),s=ud()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${p(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function Ue(e){Vg(e),Te();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":sv(t);break;case"status":av(t);break;case"priority":ov(t);break;case"type":rv(t);break;case"assignee":lv(t);break;case"sprint":cv(t);break;case"labels":dv(t);break;case"exclude_labels":uv(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function iv(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),Te()}function sv(e){const t=Y()||"",n=ee()||[];let i=`
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
        `}),e.innerHTML=i}function av(e){const t=en(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=Vn(t);let s=`
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
        `}),e.innerHTML=s}function ov(e){const t=kn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function rv(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${p(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function lv(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",i=An()||[];let s=`
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
        `}),e.innerHTML=s}function cv(e){if(!Y()){e.innerHTML=`
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
        `}),e.innerHTML=a}function dv(e){const t=$n(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
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
            `}),e.innerHTML=s}function uv(e){const t=En(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
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
            `}),e.innerHTML=s}function pv(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function Ge(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=Y();if(n){const m=(ee()||[]).find(g=>g.id===n);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearAction:"clear-project-filter"})}const i=en();if(i.length>0){const u=Vn(i),m=u==="open"?"Open":u==="closed"?"Closed":i.map(g=>ke(g)).join(", ");t.push({category:"status",label:"Status",value:m,clearAction:"clear-status-filter-new"})}const s=kn();if(s.length>0){const u=s.map(m=>Fe(m)).join(", ");t.push({category:"priority",label:"Priority",value:u,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const u=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:u?u.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let u;if(o.value==="me")u="Me";else if(o.value==="unassigned")u="Unassigned";else{const g=(An()||[]).find(y=>y.user_id===o.value);u=(g==null?void 0:g.name)||(g==null?void 0:g.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:u,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const u=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(u==null?void 0:u.text)||r.value,clearAction:"clear-sprint-filter"})}const l=$n();if(l.length>0){const u=document.getElementById("label-filter-dropdown"),m=l.map(g=>{var k;const y=u==null?void 0:u.querySelector(`input[value="${g}"]`),b=(k=y==null?void 0:y.closest("label"))==null?void 0:k.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearAction:"clear-label-filter-new"})}const c=En();if(c.length>0){const u=document.getElementById("exclude-label-filter-dropdown"),m=c.map(g=>{var k;const y=u==null?void 0:u.querySelector(`input[value="${g}"]`),b=(k=y==null?void 0:y.closest("label"))==null?void 0:k.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:m,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(u=>`
        <span class="filter-chip" title="${p(u.label)}: ${p(u.value)}">
            <span class="filter-chip-label">${u.label}:</span>
            <span class="filter-chip-value">${f(u.value)}</span>
            <button class="filter-chip-remove" data-action="${u.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=d}function ze(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=dr();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function nu(){const e=document.getElementById("sprint-filter");if(!e)return;const t=Y(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",fr(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await v.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${f(a.name)})</option>`),Ju(t,a==null?void 0:a.id),fr(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${f(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function fr(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${f(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${f(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function mv(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let iu=!1;ot(e=>{if(e!=="currentProject"||L()!=="issues"||iu)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([nu(),Fd()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),pa(),ma(),tt(),Ge(),ze()}).catch(n=>{console.error("Failed to update filters on project switch:",n),tt(),Ge(),ze()})});function fv(){Ph(e=>{iu=e})}function va(){Od(),tt(),Ge(),ze()}function ya(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),va()}function gr(){Hd(),tt(),Ge(),ze()}function hr(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),gr()}function vr(){pa(),tt(),Ge(),ze()}function ba(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),vr()}function yr(){ma(),tt(),Ge(),ze()}function wa(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),yr()}function gv(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function su(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${gv(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let Zi=0;function Qi(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function au(){var t,n,i,s,a,o;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=C())==null?void 0:t.id)||"",project:Y()||"",status:[...en()].sort(),priority:[...kn()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim())||""})}let nn=null;function hv(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function Yn(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function ou(e,t){Yn(!1),la(e),Ye(t),L()==="issues"&&qt(t),ct(),nn=e,Qi(rh(e).hiddenClosed||0)}function vv(e,t,{loading:n}){la(null),Ye(t),L()==="issues"&&qt(t),ct(),Yn(n),nn=e,Qi(0)}function ru(){la(null),nn=null,Yn(!1),mv(),Qi(0)}function yv(){const e=document.getElementById("issues-list");Qi(0),e!=null&&e.querySelector(".issue-row")?Yn(!0):ru()}function bv(){const e=mh(au()),t=e?Ed(e):null;return t?(yn(-1),ou(e,t),!0):(ru(),!1)}function wv(e,t,n,i=()=>!0){if(!Array.isArray(t))return t;const s=new Map(e.map(c=>[c.id,c])),a=new Set(t.map(c=>c.id)),o=new Set(t.filter(c=>!n.has(c.id)).map(c=>c.title)),r=e.filter(c=>!n.has(c.id)&&!a.has(c.id)&&!(c._isOptimistic&&o.has(c.title))&&(c._isOptimistic||i(c))),l=[];for(const c of t){const d=s.get(c.id);if(!d&&n.has(c.id))continue;const u=d&&_d(d.updated_at,c.updated_at)?d:c;l.push(zh(u))}return r.length?[...r,...l]:l}async function It(){var k,T,I,A,D,X,_;yn(-1),hv();const e=++Zi;if(!C())return;const t=Y()||"",n=en(),i=kn(),s=(k=document.getElementById("assignee-filter"))==null?void 0:k.value,a=(I=(T=document.getElementById("issue-search"))==null?void 0:T.value)==null?void 0:I.trim();if(!t&&ee().length===0){nn=null,document.getElementById("issues-list").innerHTML=H({icon:q.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const o=au(),r={limit:1e3},l=((A=document.getElementById("sort-by-select"))==null?void 0:A.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(D=_t())==null?void 0:D.id:r.assignee_id=s);const u=(X=document.getElementById("sprint-filter"))==null?void 0:X.value;if(u)if(u==="current"){if(t){const P=Pb(t);if(P!==void 0)P&&(r.sprint_id=P);else try{const K=(await v.getSprints(t)).find(me=>me.status==="active");Ju(t,K==null?void 0:K.id),K&&(r.sprint_id=K.id)}catch(z){console.error("Failed to resolve current sprint:",z)}}}else r.sprint_id=u;const m=(_=document.getElementById("issue-type-filter"))==null?void 0:_.value;m&&(r.issue_type=m),a&&a.length>=1?r.search=a:r.fields="list";let g=!1,y=!1,b=null;try{const P=su($n(),"label-filter-dropdown");P.length>0&&(r.label=P,r.label_match="any");const z=su(En(),"exclude-label-filter-dropdown");z.length>0&&(r.exclude_label=z),t&&(r.project_id=t);const K=t||`team:${C().id}`;b=kd({...r,scope:K});const me=Ed(b);if(me)g=!0,nn===b&&uh()===b&&Td(J(),me)||ou(b,me);else{const w=vh({...r,scope:K});w&&(w.complete||w.rows.length>0)?(y=!0,vv(b,w.rows,{loading:!w.complete})):yv()}const x=w=>t?v.getIssues(w):ee().length>0?v.getTeamIssues(C().id,w):Promise.resolve(void 0),R=r.search&&Vn(n)==="open"?x({...r,status:cr}).then(w=>Array.isArray(w)?w.length:0).catch(w=>(console.error("Failed to count closed search matches:",w),0)):Promise.resolve(0),M=new Set(J().map(w=>w.id)),te=await x(r);if(Id(b,te),e!==Zi)return;ph(o,b);const De=(g||y)&&nn===b,be=De?wv(J(),te,M,Ad(r)):te,we=De&&Td(J(),be);la(b),Ye(be),L()==="issues"&&qt(Array.isArray(be)?be.filter(w=>!w._isOptimistic):be);const Xe=[...new Set(be.map(w=>w.project_id).filter(Boolean))],pt=Object.keys(Oa()).length;if(await Xu(Xe),e!==Zi)return;const Me=Object.keys(Oa()).length!==pt;(!we||Me)&&ct(),nn=b,Yn(!1);const ue=await R;if(lh(b,{hiddenClosed:ue}),e!==Zi)return;Qi(ue)}catch(P){if(e!==Zi)return;Yn(!1);const z=(P==null?void 0:P.status)===403||(P==null?void 0:P.status)===404;if(g&&!z){E("refresh issues",P);return}z&&b&&ch(b),nn=null;const K=document.getElementById("issues-list");K&&(K.innerHTML=H({icon:q.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),E("load issues",P)}}function kv(){clearTimeout(Jg()),eh(setTimeout(()=>{It()},300))}function tt(){Nd(),It()}async function lu(){if(Nd(),ua()==="sprint"){const e=J(),t=[...new Set(e.map(n=>n.project_id))];await Xu(t)}ct()}function $v(){Ge(),ze()}function cu(e){rt(e),Te(),Ue("project"),_n()}function Ev(){cu("")}function _v(e){const t=e==="open"?Ui:e==="closed"?cr:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),va(),Te(),Ue("status")}function xv(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,va()),Te(),Ue("status")}function Iv(){ya(),Te(),Ue("status"),Ge(),ze()}function Sv(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,gr()),Te(),Ue("priority")}function Tv(){hr(),Te(),Ue("priority"),Ge(),ze()}function du(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,tt()),Te(),Ue("type"),Ge(),ze(),_n()}function Lv(){du("")}function uu(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,tt()),Te(),Ue("assignee"),Ge(),ze(),_n()}function Cv(){uu("")}function pu(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,tt()),Te(),Ue("sprint"),Ge(),ze(),_n()}function Av(){pu("")}function Bv(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,vr()),Te(),Ue("labels")}function Dv(){ba(),Te(),Ue("labels"),Ge(),ze()}function Mv(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,yr()),Te(),Ue("exclude_labels")}function jv(){wa(),Te(),Ue("exclude_labels"),Ge(),ze()}function Rv(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,It()),_n()}function Pv(e){const t=document.getElementById("group-by-select");t&&(t.value=e,lu()),_n()}function qv(){rt(null),ya(),hr();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),ba(),wa(),tt(),Ge(),ze()}se({"update-label-filter":()=>vr(),"clear-label-filter":()=>ba(),"update-exclude-label-filter":()=>yr(),"clear-exclude-label-filter":()=>wa(),"show-filter-category":(e,t)=>{var n,i;Ue(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{iv();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>cu(t.value),"clear-project-filter":()=>Ev(),"clear-status-filter-new":()=>Iv(),"set-status-preset":(e,t)=>_v(t.value),"show-all-statuses":()=>ya(),"toggle-status-option":(e,t)=>xv(t.filterValue,e),"clear-priority-filter-new":()=>Tv(),"toggle-priority-option":(e,t)=>Sv(t.filterValue,e),"set-type-filter":(e,t)=>du(t.value),"clear-type-filter":()=>Lv(),"set-assignee-filter":(e,t)=>uu(t.value),"clear-assignee-filter":()=>Cv(),"set-sprint-filter":(e,t)=>pu(t.value),"clear-sprint-filter":()=>Av(),"clear-label-filter-new":()=>Dv(),"toggle-label-option":(e,t)=>Bv(t.filterValue,e),"clear-exclude-label-filter-new":()=>jv(),"toggle-exclude-label-option":(e,t)=>Mv(t.filterValue,e),"set-sort":(e,t)=>Rv(t.value),"set-group-by":(e,t)=>Pv(t.value),"clear-all-filters":()=>qv(),"retry-load-issues":()=>It()});const mu=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function sn(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Zn(e){const t=sn(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const Nv=60,Ov=150;let Ve=[],Xi=1/0,an=null,ka=null,Ji=null;const $a=new Map;let Qn=null,Ea=[],es=null;const fu=e=>{var t;return`${((t=_t())==null?void 0:t.id)??""}|${e}`},Hv=24;function Fv(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(Nv,Math.ceil((e+2*t)/Hv))}function on(e,t){if(e!==null&&(Qn!=null&&Qn.has(String(e))))return Ea.push({groupKey:e,ids:t.map(i=>i.id)}),"";const n=t.slice(0,Math.max(0,Xi));return Xi-=n.length,n.length<t.length&&Ve.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>Xn(i)).join("")}function gu(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function hu(){clearTimeout(an),an=null,wr++,Ve=[],ka=null,es=null,Ji=null}function br(e=1/0){if(Ve.length===0)return;const t=document.getElementById("issues-list");if(!t||!(Ji!=null&&Ji.isConnected)){hu();return}const n=new Map(J().map(s=>[s.id,s]));let i=e;for(;Ve.length>0&&i>0;){const s=Ve[0],a=s.ids.slice(0,i),o=gu(t,s.groupKey),r=a.map(l=>n.get(l)).filter(Boolean).map(l=>Xn(l)).join("");o==null||o.insertAdjacentHTML("beforeend",r),i-=a.length,a.length===s.ids.length?Ve.shift():s.ids=s.ids.slice(a.length)}if(es){const s=es;_a(t,s.issueId)&&(es=null,ku(t,s))}if(Ve.length===0){clearTimeout(an),an=null;const s=ka;ka=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&vu(s)}}const Uv=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{an=setTimeout(e,0)}):an=setTimeout(e,16);let wr=0;function Gv(){if(clearTimeout(an),Ve.length===0)return;const e=++wr;Uv(function t(){e===wr&&(br(Ov),Ve.length>0&&(an=setTimeout(t,0)))})}function ct(){var d,u;const e=document.getElementById("issues-list");if(!e)return;const t=e.querySelector(".issue-row.keyboard-selected"),n=t==null?void 0:t.dataset.issueId,i=ey(e),s=m=>{var g;return((g=m==null?void 0:m.closest(".issue-group"))==null?void 0:g.dataset.group)??null},a=[[n,s(t)],[i==null?void 0:i.issueId,s(i==null?void 0:i.row)]];e.classList.add("issue-list-linear"),hu(),Xi=Fv();const o=J();if(o.length===0){const m=(u=(d=document.getElementById("issue-search"))==null?void 0:d.value)==null?void 0:u.trim(),g=dr()>0,y=m&&m.length>=2;if(g||y){const b=dr(),k=[];y&&k.push(`search "${m}"`),g&&k.push(`${b} active filter${b>1?"s":""}`),e.innerHTML=H({icon:q.issues,heading:"No matching issues",description:`No issues match your ${k.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=H({icon:q.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});yn(-1),Xi=1/0;return}const r=ua();Qn=$a.get(fu(r))||null,Ea=[],r==="status"?zv(e,o):r==="priority"?Vv(e,o):r==="type"?Wv(e,o):r==="assignee"?Kv(e,o):r==="sprint"?Yv(e,o):e.innerHTML=Zn(o)+on(null,o),Xi=1/0,Ji=e.firstElementChild,Ve.push(...Ea),Ea=[];const l=Qn;Qn=null,l!=null&&l.size&&(e.querySelectorAll(".issue-group").forEach(m=>{l.has(m.dataset.group)&&bu(m,!0)}),a.forEach(([m,g])=>{m&&Jv(m,e,g)})),i&&(_a(e,i.issueId)?ku(e,i):Ve.length>0&&(es=i));const c=!!n&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),m=>m.dataset.issueId===n);n&&Ve.length>0&&!c?ka=n:vu(n),Gv()}function vu(e){const t=pd();if(t<0)return;const n=document.querySelectorAll(oa);if(n.length===0){yn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),yn(i),n[i].classList.add("keyboard-selected")}function zv(e,t){const n={};er.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=Zn(t);er.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Le(s)}</span>
                    <span class="group-title">${ke(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${sn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${on(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function Vv(e,t){const n={};yd.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=Zn(t);yd.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${gt(s)}</span>
                    <span class="group-title">${Fe(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${sn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${on(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function Wv(e,t){const n={};mu.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=Zn(t);mu.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${Et(s)}</span></span>
                    <span class="group-title">${Et(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${sn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${on(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function Kv(e,t){const n={},i="__unassigned__";n[i]=[];const s=da({includeIdle:!0});s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=Zn(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${sn(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${on(i,n[i])}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=Jt(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${p(o.id)}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${p(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Nn(o,"avatar-small")}</span>
                    <span class="group-title">${f(l)}${f(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${sn(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${on(o.id,r)}
                </div>
            </div>
        `}),e.innerHTML=a}function Yv(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const a={active:0,planned:1,completed:2},o=Oa();s.sort((l,c)=>{const d=o[l],u=o[c],m=d?a[d.status]??3:3,g=u?a[u.status]??3:3;return m-g});let r=Zn(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=o[l],u=d?d.name:l,m=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${g}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${f(u)}${m}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${sn(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${on(g,c)}
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
                    <span class="group-points">${sn(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${on(n,i[n])}
                </div>
            </div>
        `),e.innerHTML=r}function yu(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-group"),n=>n.dataset.group===String(t))||null}function _a(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-row"),n=>n.dataset.issueId===t)||null}function Zv(e,t){const n=gu(e,t);if(!n)return;const i=new Map(J().map(s=>[s.id,s]));Ve=Ve.filter(s=>{if(String(s.groupKey)!==String(t))return!0;const a=s.ids.map(o=>i.get(o)).filter(Boolean).map(o=>Xn(o)).join("");return n.insertAdjacentHTML("beforeend",a),!1})}function bu(e,t){var n;e.classList.toggle("collapsed",t),(n=e.querySelector(".issue-group-header"))==null||n.setAttribute("aria-expanded",String(!t))}function Qv(e,t){const n=Array.from(document.querySelectorAll(oa)),i=e.querySelector(".issue-row.keyboard-selected");if(!i)return;let s=n.indexOf(i);s<0&&(i.classList.remove("keyboard-selected"),s=n.findIndex(a=>t.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING&&!t.contains(a)),s<0&&(s=n.length-1),s>=0&&n[s].classList.add("keyboard-selected")),yn(s)}function wu(e,t,n){bu(t,n);const i=fu(ua());$a.has(i)||$a.set(i,new Set);const s=$a.get(i);n?s.add(t.dataset.group):(s.delete(t.dataset.group),Zv(e,t.dataset.group)),Qv(e,t)}function Xv(e){const t=document.getElementById("issues-list"),n=t&&yu(t,e);n&&wu(t,n,!n.classList.contains("collapsed"))}function Jv(e,t=document.getElementById("issues-list"),n=void 0){var a;if(!e||!t)return;const i=Ve.find(o=>o.ids.includes(e)),s=i?i.groupKey===null?null:yu(t,i.groupKey):(a=_a(t,e))==null?void 0:a.closest(".issue-group");s!=null&&s.classList.contains("collapsed")&&(n!==void 0&&s.dataset.group===n||wu(t,s,!1))}function ey(e){var i;const t=document.activeElement;if(!t||t===e||!e.contains(t))return null;const n=t.closest(".issue-row");return n!=null&&n.dataset.issueId?{issueId:n.dataset.issueId,row:n,dropdownType:((i=t.dataset)==null?void 0:i.dropdownType)||null,isTitle:t.classList.contains("issue-title")}:null}function ku(e,{issueId:t,dropdownType:n,isTitle:i}){if(e.contains(document.activeElement))return;const s=_a(e,t);if(!s)return;const a=n?s.querySelector(`[data-dropdown-type="${n}"]`):i?s.querySelector(".issue-title"):s.querySelector("a[href], button");a==null||a.focus({preventScroll:!0})}function $u(e,t){if(!e)return"";if(!t)return f(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return f(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${f(i)}<mark class="search-match">${f(s)}</mark>${f(a)}`}function ty(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=$u(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}const ny=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function Xn(e){var m,g,y;const t=e.assignee_id?Xt(e.assignee_id):null,n=t?Jt(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":ny.format(i),a=e.estimate!=null?Wa(e.estimate,e.project_id):"",o=al(e.estimate,e.project_id),r=e.sprint_id?Oa()[e.sprint_id]:null,l=r?r.name:null,c=(g=(m=document.getElementById("issue-search"))==null?void 0:m.value)==null?void 0:g.trim(),d=!!c&&((y=e.title)==null?void 0:y.toLowerCase().includes(c.toLowerCase())),u=c&&!d?ty(e.description,c):null;return`
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
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.id)}">${$u(e.title,c)}${u?` <span class="issue-search-snippet" title="Matched in description">— ${u}</span>`:""}</a>
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
                    ${n?Nn(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function gt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Le(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}se({"toggle-group":(e,t)=>{if((e==null?void 0:e.type)==="keydown"){if(e.repeat)return;e.preventDefault()}Xv(t.group)},"show-inline-dropdown":(e,t,n)=>{ur(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),oe(t.issueId))}});let ts=[];function ns(){return ts}function iy(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function sy(e){const t=e==null?void 0:e.avatar_url,n=p((e==null?void 0:e.name)||"Agent");return t?iy(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${p(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${f(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function ay(e){var t;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{ts=await v.getTeamAgents(e),ca(An,ns),Gi()}catch(n){console.error("Failed to load team agents:",n),E("load team agents",n)}}async function xa(e){var t;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{ts=await v.getTeamAgents(e),ca(An,ns),Gi(),oy()}catch(n){E("load agents",n)}}function oy(){const e=document.getElementById("agents-list");if(e){if(ts.length===0){e.innerHTML=H({icon:q.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=ts.map(t=>{var l;const n=f(t.name),i=f(t.parent_user_name||"Unknown"),s=t.kind==="session",a=t.can_register?'<span class="agent-scope" title="Registers one identity per session; cannot write as itself">Registrar</span>':s?`<span class="agent-scope" title="Registered by a registrar for one session">Session${t.idle?" · idle":""}</span>`:"",r=!s&&t.is_active!==!1&&(t.parent_user_id===((l=_t())==null?void 0:l.id)||eo())?`<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}" data-can-register="${t.can_register?"true":"false"}">${t.can_register?"Stop being a registrar":"Make registrar"}</button>`:"";return`
      <div class="agent-item">
        ${sy(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            ${a}
            <span class="agent-date">Created by ${i} ${et(t.created_at)}</span>
          </div>
        </div>
        ${r}
        <button class="btn btn-secondary" data-action="generate-agent-key" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Generate new key</button>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function ry(){const e=ee();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),W()}function Eu(e,t,n=!1){const i=f(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,W()}async function ly(e){var r,l,c,d;e.preventDefault();const t=(r=C())==null?void 0:r.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value,o=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let u;s&&a?u=await v.createProjectAgent(a,n,i,o):u=await v.createTeamAgent(t,n,i,o),O(),Eu("Agent Created",u.api_key,!!u.can_register)}catch(u){E("create agent",u)}return!1}async function cy(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await v.createAgentKey(e);Eu("New Agent Key",n.key)}catch(n){E("generate agent key",n)}}async function dy(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await v.updateAgent(e,{can_register:n}),$(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),xa()}catch(s){E("change registrar",s)}}function uy(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{$("Agent API key copied to clipboard","success")}).catch(()=>{$("Failed to copy","error")})}async function py(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await v.deleteAgent(e),$("Agent deleted","success"),xa()}catch(n){E("delete agent",n)}}se({"create-agent":e=>{ly(e)},"copy-agent-key":()=>{uy()},"dismiss-agent-modal":()=>{O(),xa()},"delete-agent":(e,t)=>{py(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{cy(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{dy(t.agentId,t.agentName,t.canRegister!=="true")}});function my(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function fy(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const a of e){const o=a.user_id||a.id;i.has(o)||(i.add(o),s.push({id:o,name:a.user_name||a.name||a.user_email||a.email||"User",email:a.user_email||a.email||"",handle:my(a),isAgent:!1}))}for(const a of t)!a.mention_handle||a.is_active===!1||a.idle||i.has(a.id)||n!==void 0&&a.agent_project_id&&a.agent_project_id!==n||(i.add(a.id),s.push({id:a.id,name:a.name||"Agent",email:"",handle:a.mention_handle,isAgent:!0}));return s}function gy(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function kr(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let a=-1;const o=()=>{s.classList.add("hidden"),s.innerHTML="",a=-1},r=d=>{var m,g;const u=s.querySelectorAll(".mention-suggestion");u.length!==0&&(a=(d%u.length+u.length)%u.length,u.forEach((y,b)=>y.classList.toggle("highlighted",b===a)),(g=(m=u[a]).scrollIntoView)==null||g.call(m,{block:"nearest"}))},l=d=>{const u=i.selectionStart||0,m=i.value.slice(0,u).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),g=i.value.slice(u);i.value=m+g,i.focus(),o()},c=()=>{const d=i.selectionStart||0;if(gy(i.value,d)){o();return}const m=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!m){o();return}const g=m[2].toLowerCase(),y=fy(An(),ns(),i.mentionContext||{}).filter(b=>!g||b.handle.includes(g)||b.name.toLowerCase().includes(g)||b.email.toLowerCase().includes(g)).slice(0,6);if(!y.length){o();return}s.innerHTML=y.map(b=>`
            <button type="button" class="mention-suggestion" data-handle="${p(b.handle)}">
                <span class="mention-name">${f(b.name)}${b.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${f(b.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((b,k)=>{b.addEventListener("click",()=>l(b.dataset.handle)),b.addEventListener("mouseenter",()=>r(k))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const u=!s.classList.contains("hidden");if(d.key==="Escape"&&u){d.preventDefault(),d.stopPropagation(),o();return}if(u){if(d.key==="ArrowDown")d.preventDefault(),r(a+1);else if(d.key==="ArrowUp")d.preventDefault(),r(a-1);else if(d.key==="Enter"||d.key==="Tab"){const g=s.querySelectorAll(".mention-suggestion")[a];g&&(d.preventDefault(),l(g.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(o,150)})}async function _u(e){try{const t=await v.getIssue(e),n=await v.getSprints(t.project_id),s=ai(t.project_id).map(o=>`
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
        `,W();const a=document.getElementById("edit-issue-description");if(a){const o=Js(e);if(o){const r=sd(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?vn(e,r,t.description||""):vn(e,null)})}}catch(t){E("load issue",t)}}async function hy(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(c.status=s.value);const d=await v.updateIssue(t,c);Js(t)===c.description&&vn(t,null),O(),await oe(t),$("Issue updated!","success"),Ki(d)}catch(n){E("update issue",n)}}async function vy(e){if(confirm("Are you sure you want to delete this issue?"))try{await v.deleteIssue(e),await It(),await dt(),F("issues"),$("Issue deleted!","success")}catch(t){E("delete issue",t)}}se({"update-issue":(e,t)=>{hy(e,t.issueId)}});let _e=null,xu=!1,xn=!1,Iu="new-comment";function yy(){return _e||(_e=document.createElement("div"),_e.className="quote-tooltip",_e.setAttribute("role","button"),_e.setAttribute("tabindex","0"),_e.setAttribute("aria-label","Quote selection in comment"),_e.textContent="Quote",_e.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),Ia())}),_e.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),_e.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Ia()}),document.body.appendChild(_e),_e)}function Su(e,t){const n=yy();n.style.display="flex",xn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!xn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function is(){_e&&(_e.style.display="none"),xn=!1}function by(){return xn}function Tu(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function $r(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=Tu(t.startContainer),i=Tu(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function wy(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function Ia(e=Iu){const t=$r();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=wy(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),is(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function ky(){var i;if(!$r())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return Su(n.left+n.width/2,n.top),!0}function $y(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!$r()){is();return}Su(t,n)},10)}function Lu({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(Iu=t,i.addEventListener("mouseup",$y,n?{signal:n}:void 0),xu||(xu=!0,document.addEventListener("mousedown",s=>{xn&&_e&&!_e.contains(s.target)&&is()}),document.addEventListener("selectionchange",()=>{xn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&is()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&xn&&(s.stopImmediatePropagation(),is())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&ky()})))}function Cu(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function Au(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const u=d[1],m=document.createElement("a");m.href=`#/issue/${u}`,m.className="issue-link",m.textContent=u,o.appendChild(m),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+d[3],o.appendChild(u),r=d.index+d[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function Bu(e){if(!e)return"";const t=ht(e),n=document.createElement("div");return n.innerHTML=t,Cu(n,Au),n.innerHTML}function Jn(e){if(!e)return"";const t=ht(e),n=document.createElement("div");return n.innerHTML=t,Cu(n,Au),n.innerHTML}let Er=!1,_r=!1,rn=!0,ss=null,as=null,os=null,Sa=null,xr=!1,Ta=null;function Ir(e=null){xr=!0,e&&(Ta=e)}function Sr(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔"}[e]||"•"}function Tr(e){return e.user_name||e.user_email||"Unknown"}function Lr(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?f(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${f(ke(t(e.old_value)))}</strong> to <strong>${f(ke(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${f(Fe(t(e.old_value)))}</strong> to <strong>${f(Fe(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${f(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${f(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=f(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=f(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||f(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||f(e.field_name)}`:"Updated issue"}}function Ey(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),i=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),i&&i.classList.toggle("rotated")}function _y(){rn=!rn;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",rn),n&&n.classList.toggle("rotated",rn)}async function rs(e){try{ss=await v.getTicketRitualsStatus(e),Du(e)}catch(t){console.error("Failed to load ticket rituals:",t),ss=null}}function Du(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!ss){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:i}=ss;if(n.length===0&&i.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(rn=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",rn);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",rn);const r=n.some(d=>d.trigger==="ticket_close"),l=n.some(d=>d.trigger==="ticket_claim");let c="⚠️ Complete these rituals:";r&&l?c="⚠️ Pending rituals (claim before starting, close before completing):":l?c="⚠️ Complete these rituals before claiming this ticket (or closing it unclaimed):":r&&(c="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
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
                        ${d.attestation?"":Yb(d.last_rejection)}
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${f(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${at(d.attestation.attested_at)}</span>
                                ${d.attestation.note?`<div class="attestation-note markdown-body">${ht(d.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${Gb(d,e)}
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
    `}async function La(e){try{let t;return e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t?(await oe(t.id,!1),!0):(F("my-issues",!1),!1)}catch{return F("my-issues",!1),!1}}function Cr(e){const t=Oi(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function Ar({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${p(n.id)}" data-identifier="${p(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${p(i.id)}" data-identifier="${p(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function xy(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=$e();if(!t)return;const n=Cr(t.id);as=n.prevIssue?n.prevIssue.id:null,os=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=Ar(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}ot(e=>{e==="detailNavContext"&&xy()});let ls=0;function Iy(){ls++}let Mu=0,Ca=!1;function ju(){if(document.querySelector(".description-inline-editor"))return"editor";if(Yi())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||Ca?"transient":null}function Ru(e){return Ir(),e==="editor"?"deferred":"retry"}function Sy(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=$e())==null?void 0:n.id)===e}function Ty(e){return J().find(t=>t.id===e)||ir(e)||Oi().find(t=>t.id===e)||null}function Ly(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;Fn(e);const i=Cr(e.id);as=i.prevIssue?i.prevIssue.id:null,os=i.nextIssue?i.nextIssue.id:null;const s=ee().find(r=>r.id===e.project_id),a=e.assignee_id?Xt(e.assignee_id):null,o=L()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(o)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Ar(i)}
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
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${a?f(Jt(a)):"Unassigned"}</span></div>
                    </div>
                </aside>
            </div>`}async function oe(e,t=!0,{refresh:n=!1}={}){const i=n?ls:++ls,s=++Mu;if(n){const a=ju();if(a)return Ru(a)}try{t&&Ln(),n||(rn=!0);let a=!1;if(!n){const w=Ty(e);w&&(Ly(w),t&&(history.pushState({issueId:e,view:L()},"",`/issue/${w.identifier}`),a=!0))}let o=!1;const[r,l,c,d,u,m]=await Promise.all([v.getIssue(e),v.getComments(e).catch(w=>(console.error("Failed to load comments:",w),o=!0,[])),v.getActivities(e),v.getSubIssues(e),v.getRelations(e),v.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),y=[...m.pending_rituals||[],...m.completed_rituals||[]].filter(w=>w.attestation&&w.attestation.note).map(w=>({id:`attestation-${w.attestation.id}`,author_name:w.attestation.attested_by_name||"Unknown",author:w.attestation.attester||null,content:w.attestation.note,created_at:w.attestation.attested_at,is_attestation:!0,ritual_name:w.name,is_pending:!w.attestation.approved_at})),b=[...l,...y].sort((w,V)=>new Date(w.created_at)-new Date(V.created_at)),k=[r.parent_id?v.getIssue(r.parent_id):Promise.resolve(null),v.getSprints(r.project_id).catch(w=>(console.error("Failed to load sprints:",w),[]))],[T,I]=await Promise.all(k);if(i!==ls)return"dropped";let A=null,D=null;if(n){if(s!==Mu||!Sy(e))return"dropped";const w=ju();if(w)return Ru(w);D=window.scrollY;const V=document.activeElement;V!=null&&V.id&&document.getElementById("issue-detail-view").contains(V)&&(A={id:V.id,start:V.selectionStart,end:V.selectionEnd})}ss=m;const X=u.filter(w=>w.relation_type==="blocks"&&w.direction==="outgoing"),_=u.filter(w=>w.relation_type==="blocked_by"||w.relation_type==="blocks"&&w.direction==="incoming"),P=u.filter(w=>w.relation_type==="relates_to");t&&!a&&history.pushState({issueId:e,view:L()},"",`/issue/${r.identifier}`),Fn(r),hd(I),xr=!1,Ta=null,document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const z=document.getElementById("issue-detail-view");z.classList.remove("hidden");const K=L()||"my-issues",me=ee().find(w=>w.id===r.project_id),x=r.assignee_id?Xt(r.assignee_id):null,R=x?Jt(x):null,M=r.sprint_id?I.find(w=>w.id===r.sprint_id):null,te=Cr(r.id),{prevIssue:De,nextIssue:be}=te;z.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(K)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Ar(te)}
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
                            ${r.description?Jn(r.description):'<span class="add-description-link">Add description...</span>'}
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
                            ${X.length===0&&_.length===0&&P.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${_.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${_.map(w=>`
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
                                            ${w.author?On(w.author):Yo((V=Xt(w.author_id))==null?void 0:V.is_agent)}
                                            ${w.is_attestation?`<span class="comment-ritual-badge">${w.is_pending?"Pending approval — ":""}Ritual: ${f(w.ritual_name)}</span>`:""}
                                            <span class="comment-date">${at(w.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${Bu(w.content)}</div>
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
                                    <div class="activity-icon">${Sr(w.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Lr(w)}</span>
                                        <span class="activity-actor">by ${f(Tr(w))} ${On(w.user)}</span>
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
                                ${R?`${Nn(x,"avatar-small")}<span>${f(R)}</span>`:'<span class="text-muted">Unassigned</span>'}
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
                            <button class="property-value${al(r.estimate,r.project_id)?" out-of-scale":""}" ${al(r.estimate,r.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${Wa(r.estimate,r.project_id)}</span>
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
                            <span class="property-value-static">${f(r.creator_name||"Unknown")} ${On(r.creator)}</span>
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
        `,Sa&&Sa.abort(),Sa=new AbortController;const{signal:we}=Sa,Xe=document.querySelector(".sidebar-overflow-trigger"),pt=document.querySelector(".overflow-menu-dropdown");if(Xe&&pt){const w=()=>{pt.classList.add("hidden"),Xe.setAttribute("aria-expanded","false")},V=()=>{const je=pt.classList.toggle("hidden");Xe.setAttribute("aria-expanded",String(!je))};Xe.addEventListener("click",V,{signal:we}),document.addEventListener("click",je=>{!Xe.contains(je.target)&&!pt.contains(je.target)&&w()},{signal:we}),pt.addEventListener("keydown",je=>{je.key==="Escape"&&(je.stopPropagation(),w(),Xe.focus())},{signal:we})}Du(r.id),kr("new-comment","mention-suggestions",{projectId:r.project_id}),Lu({signal:we});const Me=document.getElementById("new-comment");if(Ca=!1,Me){Me.addEventListener("compositionstart",()=>{Ca=!0},{signal:we}),Me.addEventListener("compositionend",()=>{Ca=!1},{signal:we});const w=nd(r.id);w&&(Me.value=w),Me.addEventListener("input",()=>{Xs(r.id,Me.value)}),Me.addEventListener("keydown",V=>{var je;V.key==="Enter"&&(V.metaKey||V.ctrlKey)&&(V.preventDefault(),(je=Me.closest("form"))==null||je.requestSubmit())})}as=De?De.id:null,os=be?be.id:null;const ue=w=>{var ce;if((w.metaKey||w.ctrlKey)&&w.shiftKey&&(w.key===">"||w.key==="."||w.code==="Period")&&Ia()){w.preventDefault();return}if(w.metaKey||w.ctrlKey||w.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||w.target.tagName==="INPUT"||w.target.tagName==="TEXTAREA"||w.target.tagName==="SELECT"||w.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||Yi())return;if(w.key==="ArrowLeft"&&as)w.preventDefault(),oe(as);else if(w.key==="ArrowRight"&&os)w.preventDefault(),oe(os);else if(w.key==="c"){w.preventDefault(),w.stopImmediatePropagation();const mt=document.getElementById("new-comment");mt&&(mt.focus(),mt.scrollIntoView({behavior:"smooth",block:"nearest"}))}else w.key==="j"?(w.preventDefault(),w.stopImmediatePropagation(),Aa(1)):w.key==="k"?(w.preventDefault(),w.stopImmediatePropagation(),Aa(-1)):w.key==="d"&&(w.preventDefault(),(ce=document.querySelector('[data-action="edit-description"]'))==null||ce.click());const je={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[w.key];if(je){const mt=document.querySelector(`.property-row[data-field="${je}"]`);mt&&(w.preventDefault(),mt.click())}};if(document.addEventListener("keydown",ue,{signal:we}),A){const w=document.getElementById(A.id);if(w&&(w.focus({preventScroll:!0}),typeof A.start=="number"&&typeof w.setSelectionRange=="function"))try{w.setSelectionRange(A.start,A.end)}catch{}}return D!==null&&window.scrollTo(0,D),"rendered"}catch(a){if(n)console.error("Failed to refresh issue detail:",a);else{if(i!==ls)return"dropped";E("load issue",a);const o=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(o){const r=(a==null?void 0:a.status)===403||(a==null?void 0:a.status)===404;o.innerHTML=H(r?{icon:q.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:q.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function Cy(e,t){if(e.preventDefault(),Er)return!1;const n=document.getElementById("new-comment").value;Xs(t,null),Er=!0;try{const i=await v.createComment(t,n);$("Comment added!","success"),Ko(i),await oe(t)}catch(i){Xs(t,n),E("add comment",i)}finally{Er=!1}return!1}async function Ay(e){const t=$e()||await v.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
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
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=Js(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=sd(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}kr("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?vn(e,c,t.description||""):vn(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&Pu()}),a.addEventListener("keydown",c=>{var d,u;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,m;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(vn(e,null),xr){oe(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?Jn(t.description):'<span class="add-description-link">Add description...</span>',(m=n.querySelector('[data-action="edit-description"]'))==null||m.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,y;if(_r)return;const c=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(c===void 0)return;const d=Ta?Ta.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const b=document.getElementById("description-draft-warning");b&&(b.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",b.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");_r=!0,u&&(u.disabled=!0);const m=window.scrollY;try{await v.updateIssue(e,{description:c}),vn(e,null),$("Description updated","success"),await oe(e,!1),window.scrollTo(0,m),(y=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||y.focus()}catch(b){E("update description",b)}finally{_r=!1,u&&(u.disabled=!1)}})}function Pu(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Jn(n):'<span class="text-muted">Nothing to preview.</span>'}function By(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?Pu():i.focus()}function Dy(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,W(),document.getElementById("relation-issue-search").focus()}async function My(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=C())==null?void 0:i.id,o=(await v.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${p(r.id)}" data-identifier="${p(r.identifier)}" data-title="${p(r.title)}">
                <span class="link-result-id">${f(r.identifier)}</span>
                <span class="link-result-title">${f(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function jy(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Ry(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Py(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return $("Please select an issue","error"),!1;try{n==="blocked_by"?await v.createRelation(i,t,"blocks"):await v.createRelation(t,i,n),O(),$("Relation added","success"),oe(t)}catch(s){E("add relation",s)}return!1}async function qy(e,t){try{await v.deleteRelation(e,t),$("Relation removed","success"),oe(e)}catch(n){E("remove relation",n)}}function Aa(e){const t=$e();if(!t)return;const n=Oi();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||oe(n[s].id)}se({"retry-issue-comments":(e,t)=>{oe(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{Hh(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||Ay(t.issueId)},"toggle-section":(e,t)=>{Ey(t.section)},"toggle-ticket-rituals":()=>{_y()},"save-comment":(e,t)=>{Cy(e,t.issueId)},"show-add-relation-modal":(e,t)=>{Dy(t.issueId)},"remove-relation":(e,t)=>{qy(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{Md(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{Py(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{My(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{jy(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{Ry()},"set-description-editor-mode":(e,t)=>{By(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>Aa(-1),"navigate-next-issue":()=>Aa(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),_u(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),vy(t.issueId)}});const Br=new Map;function Dr(){var e;return`${((e=C())==null?void 0:e.id)??""}|${Y()??""}`}function ei(e,t,n){Br.set(e,{key:t,value:n})}function Ba(e,t){const n=Br.get(e);return n&&n.key===t?n.value:void 0}function qu(){Br.clear()}function Da(e,t){if(e===t)return!0;try{return JSON.stringify(e)===JSON.stringify(t)}catch{return!1}}ot((e,t,n)=>{e==="currentTeam"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&qu(),e==="currentUser"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&qu()});function Nu(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let ln=[],cs=[],Ma=null,le=new Set,ti="list",In=!1,Mr=null,ja=null,jr=null,Rr=null,Ou=null;function Hu(e){if(Ou!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const Pr=Dg();(Pr==="list"||Pr==="grid")&&(ti=Pr);function Fu(e){if(e!=="list"&&e!=="grid")return;ti=e,e==="grid"&&In&&qr(),Mg(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Ft()}function Uu(){if(ti!=="list")return;In=!0,le.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Ft(),ii()}function qr(){In=!1,le.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Ft(),ii()}function Ny(){Mr&&clearTimeout(Mr),Mr=setTimeout(()=>{Ft()},300)}function Oy(){const e=document.getElementById("doc-search");e&&(e.value=""),Ft()}async function Hy(){rt(null)}async function Fy(){const e=document.getElementById("doc-search");e&&(e.value=""),rt(null)}function Uy(){var s;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((s=document.getElementById("doc-search"))==null?void 0:s.value)||"",n=Y()||"",i=[];if(t&&i.push(`<span class="filter-chip">Search: "${f(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=ee().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";i.push(`<span class="filter-chip">Project: ${f(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(i.length>0){let a=i.join(" ");i.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Gy(){return ln}function Ft(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";Uy(),cs=ln.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),cs.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),Zy("",ti)}let ni=0;async function zy(){var i;const e=Ma||((i=C())==null?void 0:i.id);if(!e)return;const t=++ni,n=Y()||null;try{const s=await v.getDocuments(e,n);if(t!==ni)return;ei("documents",`${e}|${n??""}`,s),ln=s,Ft()}catch(s){if(t!==ni)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=H({icon:q.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),E("load documents",s)}}ot(e=>{e==="currentProject"&&L()==="documents"&&zy()});async function Sn(e,t=null){var o;if(e||(e=(o=C())==null?void 0:o.id),!e)return;Ma=e,md(-1);const n=++ni;t===null&&(t=Y()||null);const i=`${e}|${t??""}`,s=Ba("documents",i),a=document.getElementById("documents-list");s?(ln=s,Ft()):a&&(a.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join(""));try{const r=await v.getDocuments(e,t);if(n!==ni)return;ei("documents",i,r);const l=s&&Da(ln,r);ln=r;const c=document.getElementById("doc-view-list"),d=document.getElementById("doc-view-grid");c&&d&&(c.classList.toggle("active",ti==="list"),d.classList.toggle("active",ti==="grid")),l||Ft()}catch(r){if(n!==ni)return;if(s){E("load documents",r);return}const l=document.getElementById("documents-list");l&&(l.innerHTML=H({icon:q.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),E("load documents",r)}}function Gu(){var t,n;if(L()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=Ma||((n=C())==null?void 0:n.id);e&&Sn(e).catch(i=>console.error("Failed to refresh documents list:",i))}function zu(e){Hu(e)&&Ce(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function Vy(e,t){Hu(e)&&($(`Document "${t||"Untitled"}" was deleted`,"warning"),F("documents"))}function Wy(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${ie(t.color)}20; color: ${ie(t.color)}">${f(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function Ky(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Wy(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${p(e.id)}" data-action="view-document" data-document-id="${p(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${f(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${f(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?f(Nu(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${f(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Yy(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${ie(r.color)}20; color: ${ie(r.color)}">${f(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?Nu(e.content).substring(0,80):"No content",s=In?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${p(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${le.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${In&&le.has(e.id)?" selected":""}" data-action="${In?"toggle-doc-selection":"view-document"}" data-document-id="${p(e.id)}" data-doc-id="${p(e.id)}">
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
  `}function Zy(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;le.clear(),ii();const i=cs;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,u=Y(),m=d||u;n.innerHTML=H({icon:m?q.search:q.documents,heading:m?"No documents match your filters":"No documents yet",description:m?"Try different search terms or filters":"Create your first document to get started",...!m&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?Ky:Yy,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=ee();i.forEach(d=>{let u,m;if(e==="project")if(u=d.project_id||"__global__",u==="__global__")m="Global (Team-wide)";else{const g=r.find(y=>y.id===d.project_id);m=g?g.name:"Unknown Project"}else e==="sprint"&&(u=d.sprint_id||"__no_sprint__",m=d.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:m,docs:[]}),o[u].docs.push(d)});let l="";for(const[d,u]of Object.entries(o)){const m=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${f(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${m}">
          ${u.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function Qy(e){le.has(e)?le.delete(e):le.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=le.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",le.has(e)),ii()}function Xy(){cs.forEach(e=>le.add(e.id)),cs.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),ii()}function Vu(){le.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),le.clear(),ii()}function ii(){const e=document.getElementById("doc-bulk-actions");e&&(In?(e.classList.remove("hidden"),le.size>0?e.innerHTML=`
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
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function Jy(){if(le.size===0){$("No documents selected","error");return}const t=ee().map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${le.size} Document${le.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
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
  `,W()}async function eb(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(le);let i=0;const s=[];for(const l of n)try{await v.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((o=ln.find(d=>d.id===l))==null?void 0:o.title)||l)}O(),Vu(),s.length===0?$(`Moved ${i} document${i>1?"s":""}!`,"success"):$(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=C())==null?void 0:r.id;return await Sn(a),!1}async function tb(){var a,o;if(le.size===0){$("No documents selected","error");return}const e=le.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(le);let n=0;const i=[];for(const r of t)try{await v.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((a=ln.find(c=>c.id===r))==null?void 0:a.title)||r)}qr(),i.length===0?$(`Deleted ${n} document${n>1?"s":""}!`,"success"):$(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=C())==null?void 0:o.id;await Sn(s)}async function nb(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await v.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${p(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${f(s.author_name||"Unknown")}</span>
                ${On(s.author)}
                <span class="comment-date">${at(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${Bu(s.content)}</div>
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
    `}}function ib(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=nd(e);s&&(i.value=s),i.addEventListener("input",()=>{Xs(e,i.value)},{signal:t}),i.addEventListener("keydown",a=>{var o;a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),(o=i.closest("form"))==null||o.requestSubmit())},{signal:t}),kr("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function Ce(e,t=!0){try{t&&Ln();const n=await v.getDocument(e);Ou=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(_=>_.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await nb(n);let a=null,o=null,r=!1;if(n.project_id){const P=ee().find(z=>z.id===n.project_id);if(a=P?P.name:null,n.sprint_id)try{const z=await v.getSprint(n.sprint_id);o=z?z.name:null}catch(z){console.error("Failed to load sprint name:",z),r=!0}}let l=n.content||"";const c=Z.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=Gy(),u=d.findIndex(_=>_.id===n.id),m=u>0?d[u-1]:null,g=u>=0&&u<d.length-1?d[u+1]:null,y=u>=0,b=L()||"documents",k=n.labels&&n.labels.length>0?n.labels.map(_=>`
          <span class="issue-label" style="background: ${ie(_.color)}20; color: ${ie(_.color)}">
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

          <div class="document-content markdown-body">${l?Jn(l):'<p class="text-muted">No content</p>'}</div>

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
              <span class="property-value-static">${f(n.author_name||"Unknown")} ${On(n.author)}</span>
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
    `,ja&&ja.abort(),ja=new AbortController;const{signal:I}=ja,A=i.querySelector(".sidebar-overflow-trigger"),D=i.querySelector(".overflow-menu-dropdown");if(A&&D){const _=()=>{D.classList.add("hidden"),A.setAttribute("aria-expanded","false")},P=()=>{const z=D.classList.toggle("hidden");A.setAttribute("aria-expanded",String(!z))};A.addEventListener("click",P,{signal:I}),document.addEventListener("click",z=>{!A.contains(z.target)&&!D.contains(z.target)&&_()},{signal:I}),D.addEventListener("keydown",z=>{z.key==="Escape"&&(_(),A.focus())},{signal:I})}ib(n.id,I,n.project_id||null),Lu({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:I}),jr=m?m.id:null,Rr=g?g.id:null;const X=_=>{if((_.metaKey||_.ctrlKey)&&_.shiftKey&&(_.key===">"||_.key==="."||_.code==="Period")&&Ia("new-doc-comment")){_.preventDefault();return}_.metaKey||_.ctrlKey||_.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||_.target.tagName==="INPUT"||_.target.tagName==="TEXTAREA"||_.target.tagName==="SELECT"||_.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(_.key==="ArrowLeft"&&jr?(_.preventDefault(),Ce(jr)):_.key==="ArrowRight"&&Rr&&(_.preventDefault(),Ce(Rr)))};document.addEventListener("keydown",X,{signal:I})}catch(n){E("load document",n)}}async function Ra(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await v.getSprints(t);let o=n;if(i&&!n){const l=a.find(c=>c.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${f(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function Nr(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${f(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function sb(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?Jn(r):'<span class="text-muted">Nothing to preview.</span>'}}function Or(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=od(e);if(o){const l=Cg(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){ea(e,null);return}ea(e,l,n)};[i,s,a].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function Wu(){ds=null;const e=ee(),t=pp()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${f(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${Nr("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,W(),Or("new"),t&&await Ra("doc-sprint",t,null,!0)}let ds=null;async function ab(e,t,n){ds=n||null;const s=ee().map(a=>`<option value="${p(a.id)}" ${a.id===t?"selected":""}>${f(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${Nr("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,W(),Or("new"),t&&await Ra("doc-sprint",t,e)}async function ob(e){var a;e.preventDefault();const t=(a=C())==null?void 0:a.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await v.createDocument(t,s),ea("new",null),await Sn(t),O(),$("Document created!","success"),ds){const o=ds;ds=null,o()}}catch(o){E("create document",o)}return!1}let Hr=null,us=null,Fr=!1;async function Ku(e){try{const t=await v.getDocument(e);Hr=e,us={title:t.title||"",content:t.content||""},Fr=!1;const i=ee().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${f(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${Nr("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${p(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,W(),Or(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await Ra("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){E("load document",t)}}async function rb(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&Hr===t&&us&&!Fr){let o=null;try{o=await v.getDocument(t)}catch{}if(o&&((o.title||"")!==us.title||(o.content||"")!==us.content))return Fr=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await v.updateDocument(t,s),Hr=null,us=null;const o=od(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&ea(t,null),O(),await Ce(t),$("Document updated!","success")}catch(o){E("update document",o)}return!1}async function lb(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await v.deleteDocument(e);const n=(t=C())==null?void 0:t.id;await Sn(n),F("documents"),$("Document deleted!","success")}catch(n){E("delete document",n)}}function cb(e,t){Ra(e,t)}async function db(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${p(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,W()}async function ub(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=C())==null?void 0:i.id,a=await v.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${p(t)}" data-issue-id="${p(o.id)}">
        <span class="link-result-id">${f(o.identifier)}</span>
        <span class="link-result-title">${f(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function pb(e,t){try{await v.linkDocumentToIssue(e,t),O(),$("Issue linked!","success"),await Ce(e,!1)}catch(n){E("link issue",n)}}async function mb(e,t){if(confirm("Unlink this issue from the document?"))try{await v.unlinkDocumentFromIssue(e,t),$("Issue unlinked!","success"),await Ce(e,!1)}catch(n){E("unlink issue",n)}}let Ur=!1;async function fb(e,t){if(e.preventDefault(),Ur)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return $("Please enter a comment","error"),!1;Ur=!0;try{const s=await v.createDocumentComment(t,i);n.value="",$("Comment added!","success"),Ko(s),await Ce(t,!1)}catch(s){E("add comment",s)}finally{Ur=!1}return!1}async function gb(e){var n;const t=(n=C())==null?void 0:n.id;if(!t){$("No team selected","error");return}try{const i=await v.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,W();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${p(e)}" data-label-id="${p(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ie(a.color)}; color: white;">${f(a.name)}</span>
        ${a.description?`<span class="text-muted">${f(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,W()}catch(i){E("load labels",i)}}async function hb(e,t){try{await v.addLabelToDocument(e,t),O(),$("Label added!","success"),await Ce(e,!1)}catch(n){E("add label",n)}}async function vb(e,t){try{await v.removeLabelFromDocument(e,t),$("Label removed!","success"),await Ce(e,!1)}catch(n){E("remove label",n)}}se({"view-document":(e,t)=>{e.preventDefault(),Ce(t.documentId)},"set-doc-editor-mode":(e,t)=>{sb(t.target,t.mode)},"retry-load-documents":()=>{Sn(Ma)},"retry-document-comments":(e,t)=>{Ce(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{Qy(t.docId)},"clear-doc-search":()=>{Oy()},"clear-doc-project-filter":()=>{Hy()},"clear-all-doc-filters":()=>{Fy()},"show-bulk-move-modal":()=>{Jy()},"bulk-delete-documents":()=>{tb()},"select-all-docs":()=>{Xy()},"clear-doc-selection":()=>{Vu()},"exit-selection-mode":()=>{qr()},"enter-selection-mode":()=>{Uu()},"handle-bulk-move":e=>{eb(e)},"unlink-document-issue":(e,t)=>{mb(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{db(t.documentId)},"add-document-comment":(e,t)=>{fb(e,t.documentId)},"remove-label-from-doc":(e,t)=>{vb(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{gb(t.documentId)},"show-edit-document-modal":(e,t)=>{Ku(t.documentId)},"delete-document":(e,t)=>{lb(t.documentId)},"create-document":e=>{ob(e)},"update-doc-sprint-dropdown":(e,t,n)=>{cb(t.sprintSelect,n.value)},"update-document":(e,t)=>{rb(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{ub(n.value,t.documentId)},"link-to-issue":(e,t)=>{pb(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{hb(t.documentId,t.labelId)}});let St=[],Pa={},qa=new Set,Ut=null,Gr=null,Na=[],ps=[],zr=[];function Oa(){return Pa}function yb(){return Gr}function bb(){return Ut}ot(e=>{e==="currentProject"&&L()==="sprints"&&cn()});let Vr=0;async function cn(){gd(-1);const e=Y();if(!e){const a=document.getElementById("sprints-list");a&&(a.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}const t=++Vr;jb();const n=document.getElementById("sprints-list"),i=Dr(),s=Ba("sprints",i);s?(St=s,Yu()):n&&(n.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{const[,a]=await Promise.all([v.getCurrentSprint(e),v.getSprints(e)]),o=a.some(l=>l.status==="active")?a:await v.getSprints(e);if(t!==Vr)return;const r=s&&Da(St,o);St=o,ei("sprints",i,o),r||Yu(),await Ha()}catch(a){return t!==Vr?void 0:s?(E("load sprints",a),!1):(n&&(n.innerHTML=H({icon:q.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),E("load sprints",a),!1)}return!0}function Yu(){const e=document.getElementById("sprints-list");if(!e)return;const t=St.find(a=>a.status==="active"),n=St.find(a=>a.status==="planned"),i=St.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
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
        `,s+=wb(t)}if(n){const a=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",o=(n.budget?`${n.budget} point budget`:"No budget set")+(a?` <span class="text-muted">· ${a}</span>`:"");s+=`
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
        `),e.innerHTML=s||H({icon:q.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function Zu(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${Qr(e.activated_at)}, closed ${Qr(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${Qr(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function wb(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${f(Zu(e))||"not yet activated"}</span>
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
    `}let Wr=0;async function si(e,t=!0){var n;try{t&&Ln();const i=++Wr,s=L(),a=await v.getSprint(e);if(i!==Wr)return;if(!a){$("Sprint not found","error"),F("sprints");return}Gr=a;const o=(n=C())==null?void 0:n.id,[r,l,c]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),o?v.getDocuments(o,a.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==Wr)return;Na=r,zr=l,ps=c,L()===s&&qt(Na),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),$b()}catch(i){console.error("Failed to load sprint:",i),$("Failed to load sprint","error"),F("sprints")}}async function kb(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){$("Invalid sprint ID","error"),F("sprints",!1);return}try{await si(e,!1)}catch{F("sprints",!1)}}function $b(){const e=Gr,t=Na;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=L()||"sprints",s=t.filter(g=>Ui.includes(g.status)),a=t.filter(g=>g.status==="done"),o=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((y,b)=>y+(b.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),c=r(a),d=o.length>0?`<div class="stat-note">${o.length} canceled not counted</div>`:"";let u="";e.status==="active"?u='<span class="badge badge-status-active">Active</span>':e.status==="planned"?u='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(u='<span class="badge badge-status-completed">Completed</span>');const m=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
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
                    ${f(Zu(e))}
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
                        ${s.map(g=>Kr(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?H({icon:q.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(g=>Kr(g)).join("")}
                    </div>
                `}
            </details>

            ${o.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${o.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${o.map(g=>Kr(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${_b()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${ps.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${p(e.id)}"
                        data-project-id="${p(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${ps.length>0?`
                    <div class="sprint-issues-list">
                        ${ps.map(g=>Eb(g)).join("")}
                    </div>
                `:H({icon:q.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function Kr(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...bd,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${p(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${f(e.identifier)}</span>
            <span class="sprint-issue-title">${f(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${qb(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Eb(e){const t=f(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${p(e.id)}" data-document-url="/document/${p(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${f(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${at(e.created_at)}</span>
            </span>
        </div>
    `}function _b(){const e=zr;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${xb(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function xb(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Ib(e,t,n,i){const s=i?cw(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
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
    `,W()}async function Sb(e,t,n){var u,m,g,y;e.preventDefault();const i=(m=(u=document.getElementById("sprint-name"))==null?void 0:u.value)==null?void 0:m.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(y=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:y.dataset.currentBudget,l=r?parseInt(r):null,c=a!==l,d=St.find(b=>b.id===t);try{const b={};i&&(b.name=i);const k=o==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!k&&(b.budget=a),Object.keys(b).length&&await v.updateSprint(t,b),o==="planned"){const I=St.filter(A=>A.status==="planned"&&A.id!==t);for(const A of I)await v.updateSprint(A.id,{budget:a})}o==="default"&&n&&await v.updateProject(n,{default_sprint_budget:a}),await cn(),O(),$(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(b){E("update budget",b)}return!1}const Qu="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function Tb(e,t=null){const n=St.find(c=>c.id===e),i=n?ee().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${Qu}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let a;try{a=await v.updateSprint(e,{budget_follows_default:!0})}catch(c){E("reset budget to project default",c),t&&(t.disabled=!1);try{await cn()}catch{}return}const o=(a==null?void 0:a.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await cn()!==!1}catch{l=!1}$(`'${o}' follows the project default budget again: ${s(a==null?void 0:a.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((a==null?void 0:a.budget)===null||(a==null?void 0:a.budget)===void 0)&&$(Qu,"warning")}async function Lb(e){const t=St.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,W();const n=Ui;let i=0,s=!1,a=!1;try{const[l,c]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
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
    `}async function Cb(e){try{const t=await v.closeSprint(e);await cn(),ep(),t.limbo?Bb(t):$("Sprint completed!","success")}catch(t){E("complete sprint",t)}}async function Ha(){const e=Y();if(e)try{Ut=await v.getLimboStatus(e),Ab()}catch(t){console.error("Failed to load limbo status:",t)}}function Ab(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Ut||!Ut.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Ut.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function Bb(e){const t=Y();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,W(),Db(t)}async function Db(e){try{const t=await v.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${f(i.name)} <span class="ritual-mode">(${f(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${ht(i.prompt)}</div>
                    ${Zr(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function Yr(){var t,n;if(!Ut)return;const e=Y();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Ut.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${f(i.name)}</strong>
                            <span class="badge badge-ritual-${p(i.approval_mode)}">${f(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${ht(i.prompt)}</div>
                        ${Zr(i.attestation)}
                        ${Mb(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=Ut.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Ut.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${f(i.name)}</div>
                            ${Zr(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,W()}function Zr(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${f(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${f(at(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${ht(e.note)}</div>
        </div>
    `}function Mb(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${p(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Xu(e){for(const t of e)if(!qa.has(t))try{(await v.getSprints(t)).forEach(i=>{Pa[i.id]=i}),qa.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function jb(){Pa={},qa=new Set,Na=[],zr=[],ps=[],Fa={}}function Rb(e,t){t.forEach(n=>{Pa[n.id]=n}),qa.add(e)}let Fa={};function Pb(e){return Fa[e]}function Ju(e,t){Fa[e]=t??null}function ep(){Fa={}}se({"retry-load-sprints":()=>cn(),"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}si(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;Ib(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{Tb(t.sprintId,n)},"show-limbo-details-modal":()=>{Yr()},"show-close-sprint-confirmation":(e,t)=>{Lb(t.sprintId)},"handle-update-budget":(e,t)=>{Sb(e,t.sprintId,t.projectId)},"close-modal":()=>{O()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,O(),Cb(t.sprintId)},"dismiss-limbo-modal":()=>{O(),Ha()},"approve-ritual":(e,t)=>{Fb(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{np(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}oe(t.issueId)},"create-sprint-document":async(e,t)=>{await ab(t.sprintId,t.projectId,()=>{si(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Ce(t.documentId)}});function Qr(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function qb(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}ot(e=>{e==="currentProject"&&L()==="rituals"&&Xr()});let tp=0;async function Xr(){const e=Y(),t=document.getElementById("rituals-content"),n=++tp;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=H({icon:q.projects,heading:"Select a project",description:"Choose a project to view and manage its rituals"}));return}vw(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await gs();n===tp&&!i&&t&&(t.innerHTML=H({icon:q.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function Nb(){up(Ob),Xr()}function Ob(){const e=document.getElementById("rituals-content"),t=yw(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,oi("rv-sprint-rituals-list",n,"sprint"),oi("rv-close-rituals-list",i,"close"),oi("rv-claim-rituals-list",s,"claim")}function Hb(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function Fb(e,t){try{await v.approveAttestation(e,t),$("Ritual approved!","success"),await Ha(),Yr()}catch(n){E("approve ritual",n)}}function Jr(e){return e==="document"?`
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
        `:""}function el(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){$("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){$("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function np(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Jr(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{Ub(s,e,t,i)}),W()}async function Ub(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=el(i);if(a===void 0)return!1;try{await v.completeGateRitual(t,n,s||null,a),$("Ritual completed!","success"),await Ha();const o=bb();o&&!o.in_limbo?(O(),$("Limbo cleared! Next sprint is now active.","success")):Yr()}catch(o){E("complete gate ritual",o)}return!1}function Gb(e,t){if(e.attestation&&e.attestation.approved_at)return'<span class="text-success">Completed</span>';if(e.attestation&&!e.attestation.approved_at)return`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Approve</button>
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}">Reject</button>
        `;const n=p(e.artifact||"");if(e.approval_mode==="gate"){const i=`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${n}">Complete</button>`;return e.last_rejection&&!e.last_rejection.superseded_at?i:`${i}
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" title="Send the gate request back with a reason">Reject</button>`}return e.note_required||e.artifact?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-prompt="${p(e.prompt||"")}" data-ritual-artifact="${n}" data-ritual-note-required="${e.note_required?"1":""}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Attest</button>`}function zb(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${f(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${Jr(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{Vb(o,e,t,s,a)}),W()}async function Vb(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return $("A note is required for this attestation.","error"),!1;const o=el(i);if(o===void 0)return!1;try{await v.attestTicketRitual(t,n,a||null,o),$("Ritual attested!","success"),O(),await rs(n)}catch(r){E("attest ticket ritual",r)}return!1}async function Wb(e,t){try{await v.attestTicketRitual(e,t),$("Ritual attested!","success"),await rs(t)}catch(n){E("attest ticket ritual",n)}}async function Kb(e,t){try{await v.approveTicketRitual(e,t),$("Ritual approved!","success"),await rs(t)}catch(n){E("approve ticket ritual",n)}}function Yb(e){return!e||e.superseded_at?"":`<div class="ticket-ritual-rejection"><strong>Rejected by ${f(e.rejected_by_name||"Someone")}:</strong> ${f(e.note||"")}</div>`}function ip(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{Zb(s,e,t,n,i)}),W()}async function Zb(e,t,n,i,s=null){e.preventDefault();const a=document.getElementById("reject-ritual-note").value.trim();if(!a)return $("A rejection needs a reason.","error"),!1;try{await v.rejectTicketRitual(t,n,a),$(`"${i}" rejected. The attester has been told why.`,"success"),O(),s&&await s()}catch(o){E("reject ritual",o)}return!1}function Qb(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Jr(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{Xb(s,e,t,i)}),W()}async function Xb(e,t,n,i=""){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value,a=el(i);if(a===void 0)return!1;try{await v.completeTicketGateRitual(t,n,s||null,a),$("Ritual completed!","success"),O(),await rs(n)}catch(o){E("complete ticket ritual",o)}return!1}se({"show-create-ritual-modal":(e,t)=>{vp(t.trigger)},"approve-ticket-ritual":(e,t)=>{Kb(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{ip(t.ritualId,t.issueId,t.ritualName,()=>rs(t.issueId))},"complete-ticket-ritual":(e,t)=>{Qb(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{zb(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{Wb(t.ritualId,t.issueId)},"retry-load-rituals":()=>Xr()});function ht(e){if(!e)return"";try{Z.setOptions({breaks:!0,gfm:!0});const n=Z.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return Jc.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function ms(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function Jb(e,t,n,i,s,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Requested by <strong>${f(o)}</strong>${r?` ${ms(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{ew(c,e,t,n)}),W(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function ew(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await v.completeTicketGateRitual(t,n,s||null),$(`GATE ritual "${i}" approved!`,"success"),O(),Tt()}catch(a){E("complete gate ritual",a)}}function tw(e,t,n,i,s,a,o,r){Jb(e,t,n,i,s,a,o,r)}function nw(e,t,n,i,s,a,o,r,l){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Attested by <strong>${f(o)}</strong>${r?` ${ms(r)}`:""}</div>`:""}
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
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{iw(d,e,t,n)}),W(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function iw(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{await v.approveTicketRitual(t,n);let r=null;if(s)try{r=await v.createComment(n,s)}catch(l){console.error("Failed to post approval comment:",l)}$(`Review ritual "${i}" approved!`,"success"),Ko(r),O(),Tt()}catch(r){E("approve review ritual",r)}}function sw(e,t,n,i,s,a,o,r,l){nw(e,t,n,i,s,a,o,r,l)}ot(e=>{e==="currentProject"&&L()==="approvals"&&Tt()});let tl=[],nl=0;async function Tt(){if(!C())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++nl;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=Y(),i=n?ee().filter(r=>r.id===n):ee(),s=await Promise.all(i.map(async r=>{const[l,c]=await Promise.all([v.getPendingApprovals(r.id),v.getLimboStatus(r.id)]);return{project:r,approvals:l,limbo:c}}));if(t!==nl)return;const a=[],o=[];for(const{project:r,approvals:l,limbo:c}of s)if(a.push(...l),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(u=>{var m;return(m=u.attestation)!=null&&m.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});d.length>0&&o.push({project:r,rituals:d})}Xg(a),tl=o,sp()}catch(n){if(t!==nl)return;e.innerHTML=H({icon:q.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),E("load approvals",n)}}function sp(){const e=document.getElementById("approvals-list");if(!e)return;const t=Qg(),n=tl.length>0,i=!jg();if(t.length===0&&!n){i?e.innerHTML=`
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
                    ${tl.map(({project:d,rituals:u})=>`
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
                    ${r.map(il).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(il).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(il).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;tw(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var g;d.disabled=!0;const u=(g=d.closest(".gate-ritual-actions"))==null?void 0:g.querySelector(".review-approve-btn");u&&(u.disabled=!0);const m=d.dataset;try{await v.approveTicketRitual(m.ritualId,m.issueId),$(`Review ritual "${m.ritualName}" approved!`,"success"),await Tt()}catch(y){d.disabled=!1,u&&(u.disabled=!1),E("approve review ritual",y)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;sw(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".gate-reject-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;ip(u.ritualId,u.issueId,u.ritualName,()=>Tt())})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await v.approveAttestation(d.dataset.ritualId,d.dataset.projectId),$("Sprint ritual approved!","success"),await Tt()}catch(u){d.disabled=!1,E("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{np(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName,d.dataset.ritualArtifact||"")})})}function aw(){Rg(),sp()}function il(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${f(i.requested_by_name)}</strong>${i.requested_at?` (${ms(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note">${ht(i.attestation_note)}</div>`:"",l=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=!s&&i.rejection_note,d=c?`<div class="gate-rejection-note"><strong>Rejected by ${f(i.rejected_by_name||"Someone")}</strong>${i.rejected_at?` (${ms(i.rejected_at)})`:""}: ${f(i.rejection_note)}<br><span class="text-muted">Waiting for the requester to ask again.</span></div>`:"",u=`<button class="btn btn-small btn-secondary gate-reject-btn"
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
    `}se({"view-issue-from-modal":(e,t)=>{e.preventDefault(),O(),oe(t.issueId)},"dismiss-approvals-explainer":()=>{aw()},"retry-load-approvals":()=>Tt()});const Ua={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Ga={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let ap=0;function op(e){ap=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=rp(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function rp(e="",t="",n=""){const i=ap++,s=Object.keys(Ua).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?Ua[e]:Ua.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${Ga[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
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
    `}function ow(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",rp()),za()}function rw(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),za()}function lw(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=Ua[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${Ga[o]}</option>`).join(""),lp(e),za()}function lp(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function fs(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function za(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function cp(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,l=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,c=o.querySelector(".condition-value");let d=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw fs("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw fs("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${l}`;if(n.has(u))throw fs(`Duplicate condition: ${r} ${Ga[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),l==="isnull")t[u]=!0;else if(l==="in"||l==="contains")t[u]=d?d.split(",").map(m=>m.trim()).filter(m=>m):[];else if(l==="gte"||l==="lte"){if(!d)throw fs(`Please enter a numeric value for ${r} ${Ga[l]}.`),new Error(`Missing numeric value for ${u}`);const m=parseInt(d,10);if(isNaN(m))throw fs(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${d}`);t[u]=m}else t[u]=d}return za(),Object.keys(t).length>0?t:null}se({"add-condition-row":()=>{ow()},"remove-condition-row":(e,t)=>{rw(Number(t.rowId))},"update-operator-options":(e,t)=>{lw(Number(t.rowId))},"toggle-value-input":(e,t)=>{lp(Number(t.rowId))}});let xe=[],sl=null;const dp=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];ot((e,t)=>{e==="currentProject"&&(t&&_g(t),dp.forEach(n=>{const i=document.getElementById(n);i&&(i.value=t||"")}),Tw(t||""))});const Va={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function up(e){sl=e}function ee(){return xe}function ai(e){const t=xe.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return Va[n]||Va.fibonacci}function Wa(e,t){if(e==null)return"No estimate";const i=ai(t).find(s=>s.value===e);return i?i.label:`${e} points`}function al(e,t){return e==null||e===0?!1:!ai(t).some(i=>i.value===e)}function cw(e){const t=xe.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(Va[n]||Va.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function dt(){if(C())try{xe=await v.getProjects(C().id),dw();const e=Y();if(e&&xe.some(i=>i.id===e))return;const t=ol();if(t&&xe.some(i=>i.id===t)){rt(t);return}const n=td();if(n&&xe.some(i=>i.id===n)){rt(n);return}xe.length>0&&rt(xe[0].id)}catch(e){E("load projects",e)}}function dw(){const e='<option value="">All Projects</option>'+xe.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+xe.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],i=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),i.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const s=Y();dp.forEach(a=>{const o=document.getElementById(a);o&&(o.value=s||"")})}function pp(){return td()}function Tn(){const e=document.getElementById("projects-list");if(xe.length===0){e.innerHTML=H({icon:q.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=xe.map(t=>`
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
    `).join("")}function uw(e){rt(e),F("issues")}function mp(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,W()}async function pw(e){e.preventDefault();const t=C();if(!t){$("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.createProject(t.id,n),await dt(),Tn(),O(),$("Project created!","success")}catch(i){E("create project",i)}return!1}async function mw(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.updateProject(t,n),await dt(),Tn(),O(),$("Project updated!","success")}catch(i){E("update project",i)}return!1}async function fw(e){const t=xe.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await v.deleteProject(e),await dt(),Tn(),O(),$("Project deleted","success")}catch(n){E("delete project",n)}}let Ae=null;function fp(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function gw(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await v.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(Ae!==e.id)return;const i=n.filter(a=>a.id===e.default_epic_id||a.status!=="done"&&a.status!=="canceled"),s=e.default_epic_id&&!i.some(a=>a.id===e.default_epic_id)?`<option value="${p(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(a=>`<option value="${p(a.id)}">${f(a.identifier)} ${f(a.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function gp(e){Ae=e,xe.length===0&&await dt();const t=xe.find(n=>n.id===e);if(!t){$("Project not found","error"),F("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,fp("ps-require-assignee-on-claim",t.require_assignee_on_claim===!0),fp("ps-require-epic-on-close",t.require_epic_on_close===!0),gw(t),document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),hp("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function hp(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Gt||Gt.length===0)&&gs()}function hw(){Ae=null,Gt=[]}function vw(e){Ae=e}function yw(){return Gt}async function bw(){if(!Ae)return;const e=document.getElementById("ps-name").value.trim();if(!e){$("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await v.updateProject(Ae,t),await dt(),$("Settings saved","success");const n=xe.find(i=>i.id===Ae);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){E("save project settings",n)}}async function ww(){if(!Ae)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const a=document.getElementById("ps-default-epic");a&&!a.disabled&&(n.default_epic_id=a.value||null);try{await v.updateProject(Ae,n),await dt(),$("Settings saved","success")}catch(o){E("save settings",o)}}let Gt=[];async function gs(){if(!Ae)return!1;try{return Gt=await v.getRituals(Ae),kw(),typeof sl=="function"&&sl(),!0}catch(e){return E("load rituals",e),!1}}function kw(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Gt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Gt.filter(i=>i.trigger==="ticket_close"),n=Gt.filter(i=>i.trigger==="ticket_claim");oi("ps-sprint-rituals-list",e,"sprint"),oi("ps-close-rituals-list",t,"close"),oi("ps-claim-rituals-list",n,"claim")}function oi(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>p(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${f(a.group_name)}${r}</span>`}return`
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
  `}).join("")}async function vp(e){if(!Ae)return;let t=[];try{t=await v.getRitualGroups(Ae)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${op(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,W()}function $w(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Ew(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function yp(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw $("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await v.createRitualGroup(Ae,{name:t,selection_mode:n})).id}return e.value||null}async function _w(e){var s;e.preventDefault();let t;try{t=cp()}catch{return!1}let n;try{n=await yp()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await v.createRitual(Ae,i),await gs(),O(),$("Ritual created!","success")}catch(a){E("create ritual",a)}return!1}async function xw(e){const t=Gt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await v.getRitualGroups(Ae)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${op(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,W()}async function Iw(e,t){var a;e.preventDefault();let n;try{n=cp()}catch{return!1}let i;try{i=await yp()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await v.updateRitual(t,s),await gs(),O(),$("Ritual updated!","success")}catch(o){E("update ritual",o)}return!1}async function Sw(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await v.deleteRitual(e),await gs(),$("Ritual deleted","success")}catch(n){E("delete ritual",n)}}se({"view-project":(e,t)=>{uw(t.projectId)},"view-project-settings":(e,t)=>{gp(t.projectId)},"create-project":e=>{pw(e)},"update-project":(e,t)=>{mw(e,t.projectId)},"confirm-delete-project":(e,t)=>{fw(t.projectId)},"edit-project-ritual":(e,t)=>{xw(t.ritualId)},"delete-project-ritual":(e,t)=>{Sw(t.ritualId,t.ritualName)},"create-project-ritual":e=>{_w(e)},"update-project-ritual":(e,t)=>{Iw(e,t.ritualId)},"toggle-ritual-conditions":()=>{$w()},"ritual-group-change":()=>{Ew()}});function ol(){const t=new URLSearchParams(window.location.search).get("project");return t||pp()}function Tw(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const rl={},bp=new Map;let ll=null,cl=null,dl=null,ul=null,pl=null,ml=null,fl=null,wp=!1;function Lw(e){Object.assign(rl,e)}function Cw({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a,beforeScrollRestore:o}={}){e&&(ll=e),t&&(cl=t),n&&(dl=n),i&&(ul=i),s&&(pl=s),a&&(ml=a),o&&(fl=o)}function kp(){return Object.keys(rl)}const Aw=["issues","query","board","sprints","epics","documents","rituals","approvals","my-issues"],$p={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects"};function Ka(e){document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)})}function F(e,t=!0,{transition:n=!1}={}){if(t&&Ln(),ta(e),t){let a;const o=ol();e==="my-issues"?a=o?`/?project=${o}`:"/":e==="issues"&&window.location.search?a=`/issues${window.location.search}`:Aw.includes(e)&&o?a=`/${e}?project=${o}`:a=`/${e}`,history.pushState({view:e},"",a)}Ka(e),ll&&ll();const i=()=>{document.querySelectorAll(".view").forEach(o=>o.classList.add("hidden"));const a=document.getElementById(`${e}-view`);a&&a.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=rl[e];s&&s(),t&&window.scrollTo(0,0)}function Ep(){var s;ta(null);const e=window.location.pathname.split("/").filter(Boolean),t={"gate-approvals":"approvals"},n=e.length===0?"my-issues":t[e[0]]||e[0],i=e.length<=1&&kp().includes(n);document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden")),i?((s=document.getElementById(`${n}-view`))==null||s.classList.remove("hidden"),Ka(n)):Ka($p[e[0]]||null)}function _p(){var i;const t=window.location.pathname.split("/").filter(Boolean);ul&&ul(),L()||ta("my-issues");let n="my-issues";if(t.length===0||t[0]==="")F("my-issues",!1);else if(cl&&cl(t)){const s=$p[t[0]];s&&Ka(s);return}else{n=t[0];const s={"gate-approvals":"approvals"};s[n]&&(n=s[n]),kp().includes(n)?F(n,!1):(n="my-issues",F("my-issues",!1))}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function Ln(){bp.set(window.location.href,window.scrollY)}function xp(e){Ln(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),pl&&pl(e)}function Ip(e){Ln(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),ml&&ml(e)}function Sp(){const e=bp.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{fl&&fl(),window.scrollTo(0,e)})}function Bw(){wp||(wp=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&dl&&dl(e.state)){Sp();return}(t=e.state)!=null&&t.view?F(e.state.view,!1):_p(),Sp()}))}let zt=0,ri=!1,hs=null,Ya=null,vs=0;const Cn=new Map;function Za(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",zt===0&&!ri),e.textContent=ri?"Stopped":"Offline",e.title=ri?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function We(e,t){return Cn.has(e)||Cn.set(e,new Set),Cn.get(e).add(t),()=>{var n;return(n=Cn.get(e))==null?void 0:n.delete(t)}}function Dw(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const Mw=1e3;function Qa(){Ya&&(clearTimeout(Ya),Ya=null)}const jw="chaotic",gl=4001,Rw=4003,Pw="chaotic.bearer.";function qw(e){return[jw,Pw+e]}function Tp(e,{isReconnect:t=!1}={}){hs&&(clearTimeout(hs),hs=null),Qa();const n=th();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),Xo(null)),!t&&(zt>0||ri)&&(zt=0,ri=!1,Za());const i=v.getToken();if(!i)return;const s=++vs,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o,qw(i));Xo(r);let l=!1;const c=()=>{if(l||s!==vs)return;l=!0,Qa();const d=zt>0;d&&$("Live updates reconnected","success"),zt=0,Za(),d&&hl({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===vs&&(console.log("WebSocket connected"),Qa(),Ya=setTimeout(c,Mw))},r.onmessage=d=>{if(s!==vs)return;c();let u;try{u=JSON.parse(d.data)}catch(m){console.error("WebSocket: malformed message",m);return}hl(u)},r.onclose=d=>{if(s!==vs)return;console.log("WebSocket disconnected"),Qa();const u=d==null?void 0:d.code;if(u===gl||u===Rw){Xo(null),zt=0;const g=u===gl&&ed()===i;ri=!g,Za();let y="forbidden";u===gl&&(y=g?"unauthorized":"superseded"),hl({type:y,entity:"connection",data:{code:u,teamId:e}});return}zt++,zt===1&&$("Live updates disconnected. Reconnecting...","warning"),Za();const m=Dw(zt-1);hs=setTimeout(()=>{hs=null,C()&&C().id===e&&Tp(e,{isReconnect:!0})},m)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function hl(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=Cn.get(`${n}:${t}`);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=Cn.get(n);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=Cn.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}const Nw={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device",children_closed:"Nothing left open"};let li=0,Lt=!1,he=null,dn=null;const ys=new Set,Ct=new Map,ut=new Map;function Lp(e){Ct.get(e)===null&&Ct.set(e,li)}function vl(e){const t=ut.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=li)}function Ow(e){return e.filter(t=>!Ct.has(t.id)).map(t=>{const n=ut.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(Lt&&ut.has(t.id)&&t.id!==he))}function Hw(e){for(const[t,n]of Ct)n!==null&&e>n&&Ct.delete(t);for(const[t,n]of ut)n.confirmedAfter!==null&&e>n.confirmedAfter&&ut.delete(t)}function Fw(e,t){t!=null&&t.id&&(e==="archived"?(Ct.has(t.id)||Ct.set(t.id,null),Lp(t.id)):e==="read"&&vl(t.id))}async function ci(){const e=C();if(e){try{const t=await v.getInboxUnreadCount(e.id);Hi(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}bs()}}function bs(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=aa();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0);const n=document.getElementById("inbox-header-count");n&&(n.textContent=t>0?`${t} unread`:"")}async function ws({focusFirst:e=!1,background:t=!1}={}){const n=C();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++li;t||(dn={focusFirst:e||!!(dn!=null&&dn.focusFirst)},he=null,Uw(i));try{const a=await v.getInbox(n.id,{unread:Lt,limit:100});if(s!==li)return;const o=new Set(Ct.keys());Hw(s);const r=Ow(a||[]),l=dn;dn=null,l?(Nt(r),$s(),l.focusFirst&&!st()&&Vw()):Gw(r,o)}catch(a){if(s!==li)return;dn?(dn=null,i.innerHTML=H({icon:q.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),E("load inbox",a)):console.error("Failed to refresh inbox:",a)}ci()}function Uw(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function Xa(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function Cp(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function Ap(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function Bp(e,t){if(!e)return;const n=Xa(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=Cp(n||t)),i==null||i.focus({preventScroll:!0})}function Gw(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=ge(),s=[...n.querySelectorAll(".inbox-row")],a=n.querySelector(".inbox-row.keyboard-selected"),o=(a==null?void 0:a.dataset.entryId)||null,r=a?s.indexOf(a):-1,l=Ap(),c=window.scrollY,d=n.scrollTop;let u=e;if(he&&!e.some(y=>y.id===he)){const y=i.find(b=>b.id===he);if(y&&Lt&&!t.has(he)){u=[...e];const b=u.findIndex(k=>k.created_at<y.created_at);u.splice(b===-1?u.length:b,0,y)}else he=null}Nt(u),$s();let m=-1;o&&(m=u.findIndex(y=>y.id===o),m===-1&&u.length&&(m=Math.min(r,u.length-1))),m>=0?ks(m,{focus:!1}):sa(-1);const g=m>=0?n.querySelectorAll(".inbox-row")[m]:null;Bp(l,g),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function zw(e,t){if(!(t!=null&&t.id))return!1;const n=ge().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function di(e){const t=ge();for(const n of new Set(e)){const i=Xa(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const a=i.contains(document.activeElement)?Ap():null,o=document.createElement("template");o.innerHTML=Pp(s).trim();const r=o.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),Bp(a,r)}}function ks(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){sa(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),sa(i),t&&Cp(n[i]).focus({preventScroll:!0})}function Vw(){ks(0)}async function yl(e){const t=ge(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;he===e&&(he=null),Ct.set(e,null),Nt(t.filter(a=>a.id!==e)),s&&Hi(Math.max(0,aa()-1)),$s(),bs(),ks(n);try{await v.archiveInbox(e),Lp(e)}catch(a){Ct.delete(e),console.error("Failed to archive inbox entry:",a)}}function Dp(e){var s,a;const n=ge().findIndex(o=>o.id===e);if(n===-1)return;const i=he;he=i===e?null:e,he===e&&Mp(e),di([i,e]),ks(n),he===e&&((a=(s=Xa(e))==null?void 0:s.scrollIntoView)==null||a.call(s,{block:"nearest"}))}function Mp(e){const t=ge(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,ut.set(e,{readAt:i,confirmedAfter:null}),Nt([...t]),Hi(Math.max(0,aa()-1)),bs(),v.markInboxRead(e).then(()=>vl(e),s=>{var o;((o=ut.get(e))==null?void 0:o.readAt)===i&&ut.delete(e);const a=ge().find(r=>r.id===e);a&&a.read_at===i&&(a.read_at=null,Nt([...ge()]),di([e])),ci(),E("mark inbox entry read",s)})}function Ww(e){var i;const n=ge().findIndex(s=>s.id===e);if(n!==-1){if(Mp(e),Lt)he===e&&(he=null),Nt(ge().filter(s=>s.id!==e)),$s(),ks(n);else if(di([e]),!document.activeElement||document.activeElement===document.body){const s=Xa(e);(i=s==null?void 0:s.querySelector(".inbox-row-toggle"))==null||i.focus({preventScroll:!0})}}}function Kw(){if(he===null)return!1;const e=he;return he=null,di([e]),!0}function jp(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function Yw(e){if(ys.has(e))return;const t=ge().find(i=>i.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender";ys.add(e),jp(e,!0);try{await v.updateIssue(t.issue_id,{assignee_id:t.source_user_id})}catch(i){ys.delete(e),jp(e,!1),E(`reassign ${t.issue_identifier||"issue"} back to ${n}`,i);return}ys.delete(e),yl(e)}function Zw(){Rp(!Lt)}function Rp(e){e!==Lt&&(Lt=e,document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(t=>{const n=t.dataset.filter==="unread"===Lt;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),ws({focusFirst:!0}))}const Qw='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',Xw='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';function Jw(e){const t=[...(e||"").trim()][0];return t?t.toUpperCase():"•"}function Pp(e){const t=!e.read_at,n=e.id===he,i=Nw[e.kind]||e.kind,s=e.issue_identifier||e.document_title||"",a=[`data-entry-id="${p(e.id)}"`,e.issue_id?`data-issue-id="${p(e.issue_id)}"`:"",e.document_id?`data-document-id="${p(e.document_id)}"`:""].filter(Boolean).join(" "),o=`inbox-panel-${e.id}`;return`
        <div class="inbox-row${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${a}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${p(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${p(o)}"`:""}>
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':'<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${f(Jw(e.source_user_name))}</span>
                    <span class="inbox-row-header">
                        <span class="badge badge-inbox-${p(e.kind)}">${f(i)}</span>
                        ${s?`<span class="inbox-row-source">${f(s)}</span>`:""}
                    </span>
                    <span class="inbox-row-text">
                        <span class="inbox-row-title">${f(e.title)}</span>
                        ${!n&&e.body?`<span class="inbox-row-body">${f(e.body)}</span>`:""}
                    </span>
                </button>
                ${n?ek(e,s,o):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${t?`<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${p(e.id)}" title="Mark read" aria-label="Mark read">${Qw}</button>`:""}
                    <button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${p(e.id)}" title="Archive (e)" aria-label="Archive">${Xw}</button>
                </span>
                <span class="inbox-row-time">${f(ms(e.created_at))}</span>
            </div>
        </div>
    `}function ek(e,t,n){const i=(e.kind==="assignment"||e.kind==="review_requested")&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,a=e.source_user_name,o=t?`Open ${f(t)}`:"Open",r=[i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${p(e.id)}"${ys.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${a?` to ${f(a)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
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
    `}function $s(){const e=document.getElementById("inbox-list");if(!e)return;const t=ge();if(t.length===0){e.innerHTML=H({icon:q.inbox,heading:Lt?"No unread items":"Inbox zero",description:Lt?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=nk(t)}function tk(e,t=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"Older";const i=a=>new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),s=Math.round((i(t)-i(n))/864e5);return s<=0?"Today":s===1?"Yesterday":s<7?"Last 7 days":"Older"}function nk(e){const t=[];for(const n of e){const i=tk(n.created_at),s=t[t.length-1];s&&s.label===i?s.entries.push(n):t.push({label:i,entries:[n]})}return t.map((n,i)=>`
        <section class="inbox-group" aria-labelledby="inbox-group-${i}">
            <h3 class="inbox-group-header" id="inbox-group-${i}">${f(n.label)}</h3>
            ${n.entries.map(s=>Pp(s)).join("")}
        </section>
    `).join("")}async function ik(e){var s;const t=ge().find(a=>a.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();ut.set(e,{readAt:n,confirmedAfter:null});try{await v.markInboxRead(e)}catch(a){((s=ut.get(e))==null?void 0:s.readAt)===n&&ut.delete(e);const o=ge().find(r=>r.id===e);o&&o.read_at===n&&(o.read_at=null,Nt([...ge()]),di([e])),console.error("Failed to mark inbox entry read:",a);return}vl(e);const i=ge().find(a=>a.id===e);i&&!i.read_at?(i.read_at=n,Nt([...ge()]),Hi(Math.max(0,aa()-1)),bs(),di([e])):ci()}async function sk(){const e=C();if(e)try{await v.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of ge())n.read_at||ut.set(n.id,{readAt:t,confirmedAfter:li});Nt(ge().map(n=>({...n,read_at:n.read_at||t}))),Hi(0),bs(),$s()}catch(t){E("mark all inbox entries read",t)}}function ak(e){e.entryId&&ik(e.entryId),e.issueId?oe(e.issueId):e.documentId&&Ce(e.documentId)}function ok(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&yl(e.dataset.entryId)}function rk(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Dp(e.dataset.entryId)}const lk='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function ck(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(lk);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function dk(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}se({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&dk((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||ck(e.target,n)||(e.preventDefault(),t.entryId&&Dp(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),ak(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Yw(t.entryId)},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&yl(t.entryId)},"toggle-inbox-unread-filter":()=>Zw(),"set-inbox-filter":(e,t)=>Rp(t.filter==="unread"),"mark-inbox-read":(e,t)=>{e.preventDefault(),t.entryId&&Ww(t.entryId)},"mark-all-inbox-read":()=>sk(),"retry-load-inbox":()=>ws({focusFirst:!0})});let Ja=[],ui=[],bl=[],wl=[];function uk(){return Ja}function An(){return ui}async function kl(e=null){try{Ja=await(e||v.getMyTeams()),pk()}catch(t){E("load teams",t)}}function pk(){const e=document.getElementById("team-list");Ja.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Ja.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${p(JSON.stringify(t))}">${f(t.name)}</button>
        `).join("")}async function $l(e,t=!1){Fi(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const i=document.getElementById("team-description-text");i&&(i.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),Tp(e.id),await Promise.all([dt(),Ak(),fk(),ay(),ci()]),t?_p():F(L()||"my-issues")}function qp(){document.getElementById("team-dropdown").classList.toggle("hidden")}function mk(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function fk(){if(C())try{ui=await v.getTeamMembers(C().id),ca(An,ns),Gi()}catch(e){console.error("Failed to load team members:",e),E("load team members",e)}}function El(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let _l=0;async function xl(){if(!C())return;const e=++_l,t=document.getElementById("team-members-list");t&&(t.innerHTML=El());try{const n=await v.getTeamMembers(C().id);if(e!==_l)return;ui=n,ca(An,ns),Gi(),gk()}catch(n){if(e!==_l)return;t&&(t.innerHTML=H({icon:q.team,heading:"Couldn't load members",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-members"},variant:"error"})),ui=[],Np(),E("load team members",n)}}function eo(){var n;const e=(n=_t())==null?void 0:n.id,t=ui.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function Np(){const e=document.getElementById("invite-member-btn");e&&e.classList.toggle("hidden",!eo())}function gk(){const e=document.getElementById("team-members-list"),t=eo();Np(),e.innerHTML=ui.map(n=>`
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
    `).join("")}let Il=0;async function to(){if(!C())return;const e=++Il,t=document.getElementById("team-invitations-list");t&&(t.innerHTML=El());try{const n=await v.getTeamInvitations(C().id);if(e!==Il)return;bl=n,hk()}catch(n){if(e!==Il)return;if((n==null?void 0:n.status)===403){document.getElementById("team-invitations-list").innerHTML="";return}console.error("Failed to load team invitations:",n),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function hk(){const e=document.getElementById("team-invitations-list");if(bl.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}const t=eo();e.innerHTML=bl.map(n=>`
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
    `).join("")}let Sl=0;async function Op(){if(!C())return;const e=++Sl,t=document.getElementById("team-agents-list");t&&(t.innerHTML=El());try{const n=await v.getTeamAgents(C().id);if(e!==Sl)return;wl=n,vk()}catch(n){if(e!==Sl)return;t&&(t.innerHTML=H({icon:q.team,heading:"Couldn't load agents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-agents"},variant:"error"})),E("load team agents",n)}}function vk(){const e=document.getElementById("team-agents-list");if(e){if(wl.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=wl.map(t=>{const n=f(t.name),i=f(t.parent_user_name||"Unknown"),s=t.avatar_url||"🤖";return`
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
      `}).join("")}}function Hp(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,W()}async function yk(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await v.createInvitation(C().id,t,n);if(await to(),i&&i.accept_url)return kk(t,wk(i.accept_url),i.email_queued===!0),!1;O(),$("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){bk(i)?$(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):E("send invitation",i)}return!1}function bk(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function Fp(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function wk(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!Fp(n.hostname)||Fp(i.hostname)?e:i.origin+n.pathname}function kk(e,t,n=!1){var a;const i=f(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${f(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,st()||W(),(a=document.querySelector('[data-action="copy-invite-link"]'))==null||a.focus(),Up()}function Up(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function $k(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),$("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),$("Could not copy: the link is selected, copy it by hand","error")}}async function Ek(e){let t;try{t=await v.issueInvitationVerificationCode(C().id,e)}catch(n){E("get a verification code",n);return}xk(t)}function _k(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let a;return s<3600?a=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?a=`${Math.round(s/3600)} h`:a=`${Math.round(s/86400)} days`,`${a} ${n>=i?"after":"before"} the invitation was created`}function xk(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=_k(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
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
    `,st()||W(),Up("invitation-code")}async function Ik(e){if(confirm("Are you sure you want to remove this member?"))try{await v.removeMember(C().id,e),await xl(),$("Member removed!","success")}catch(t){E("remove member",t)}}async function Sk(e){try{await v.deleteInvitation(C().id,e),await to(),$("Invitation canceled!","success")}catch(t){E("cancel invitation",t)}}function Gp(){qp(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,W()}function Tk(){C()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
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
    `,W())}async function Lk(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await v.createTeam(t);await kl(),await $l(n),O(),$("Team created!","success")}catch(n){E("create team",n)}return!1}async function Ck(e){if(e.preventDefault(),!C())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await v.updateTeam(C().id,t);Fi(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||"No description"),await kl(),O(),$("Team updated!","success")}catch(n){E("update team",n)}return!1}async function Ak(){if(C())try{const e=await v.getLabels(C().id);na(e)}catch(e){console.error("Failed to load labels:",e),E("load labels",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),se({"select-team":(e,t)=>{$l(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{Ik(t.userId)},"delete-invitation":(e,t)=>{Sk(t.invitationId)},"issue-invitation-code":(e,t)=>{Ek(t.invitationId)},"retry-load-team-invitations":()=>{to()},"retry-load-team-members":()=>{xl()},"retry-load-team-agents":()=>{Op()},"invite-member":e=>{yk(e)},"copy-invite-link":()=>{$k()},"dismiss-invite-link":()=>{O()},"create-team":e=>{Lk(e)},"update-team":e=>{Ck(e)}});let At=null,Vt=0,pi=null,mi=null,Es=null,Tl=!1;function Bk(){return xg()}function zp(){Ig()}function Vp(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Dk(){At||(At=document.createElement("div"),At.id="onboarding-overlay",At.className="onboarding-overlay",document.getElementById("app").appendChild(At))}function _s(){if(!At)return;const e=Tl?Kp():Wp(),t=e[Vt],n=e.map((i,s)=>`<span class="onboarding-dot${s===Vt?" active":""}${s<Vt?" completed":""}"></span>`).join("");At.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Wp(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Vp(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Vp(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&pi&&(e.textContent=`${pi.name} (${pi.key})`),t&&mi&&(t.textContent=`${mi.name} (${mi.key})`),n&&Es&&(n.textContent=`${Es.identifier} - ${Es.title}`)}}]}function Kp(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function Ll(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Cl(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function fi(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function Mk(){const e=Tl?Kp():Wp();Vt<e.length-1&&(Vt++,_s())}function jk(){zp(),Zp(),gi()}function Rk(){zp(),Zp(),gi()}async function Pk(e){e.preventDefault(),Cl("onboarding-team-error"),fi("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{pi=await v.createTeam({name:t,key:n}),Vt++,_s()}catch(i){Ll("onboarding-team-error",i.message||"Failed to create team"),fi("onboarding-team-submit",!1)}}async function qk(e){e.preventDefault(),Cl("onboarding-project-error"),fi("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{mi=await v.createProject(pi.id,{name:t,key:n}),Vt++,_s()}catch(i){Ll("onboarding-project-error",i.message||"Failed to create project"),fi("onboarding-project-submit",!1)}}async function Nk(e){e.preventDefault(),Cl("onboarding-issue-error"),fi("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Es=await v.createIssue(mi.id,{title:t}),Vt++,_s()}catch(n){Ll("onboarding-issue-error",n.message||"Failed to create issue"),fi("onboarding-issue-submit",!1)}}function Yp(e=!1){Tl=e,Vt=0,pi=null,mi=null,Es=null,Dk(),_s()}function Zp(){At&&(At.remove(),At=null)}function Qp(){Sg(),Yp(!0)}se({"onboarding-next":e=>{e.preventDefault(),Mk()},"onboarding-skip":e=>{e.preventDefault(),jk()},"onboarding-finish":e=>{e.preventDefault(),Rk()},"onboarding-create-team":e=>{Pk(e)},"onboarding-create-project":e=>{qk(e)},"onboarding-create-issue":e=>{Nk(e)}});const Xp="/oauth/consent/";function Ok(e){if(!e||!e.startsWith(Xp))return null;const t=e.slice(Xp.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function Hk(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function Fk(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function Uk(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const Jp={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function no(e){const t=Jp[e.trust]||Jp.unverified,n=e.host?` · ${f(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${p(e.trust)}">${f(t)}${n}</span>`}function Gk(e,t){return e.teams.map(n=>`<option value="${p(n.id)}"${n.id===t?" selected":""}>${f(n.name)}</option>`).join("")}function zk(e,t){const n=e&&t?e.agents.find(a=>a.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${f(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function em(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",a=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${p(i.id)}"${s}>${f(i.name+a)}</option>`)}return n.join("")}function tm(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${p(t.id)}">
            ${f(t.name)} <span class="oauth-muted">${f(t.key)}</span>
        </label>`).join("")}function Vk(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${p(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${f(t.name)}${f(i)}
        </label>`}).join("")}function Wk(e,t){const n=f(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${no(t.client)}</p>
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
        </div>`}function Kk(e,t){if(t.acts_as==="person"){Wk(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=f(t.client.name),a=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",o=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${f(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${no(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${f(t.redirect_host)}</strong></p>
            ${o}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${Gk(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${em(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${p(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${tm(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${Vk(t)}
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,Al(e,t)}function Al(e,t){var a;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const o=(a=e.querySelector("#oauth-team"))==null?void 0:a.value,r=zk(t.teams.find(l=>l.id===o),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function Yk(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(o=>o.value),s=e.querySelector('input[name="oauth-policy"]:checked'),a={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const o=e.querySelector("#oauth-agent-name").value.trim();o&&(a.agent_name=o)}return a}function Zk(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function xs(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${f(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function Qk(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{v.logout(),t()})}function Xk(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(u=>u.id===s.value);e.querySelector("#oauth-agent").innerHTML=em(d,null),e.querySelector("#oauth-projects").innerHTML=tm(d),Al(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>Al(e,n));let a=!1;const o=async d=>{if(!a){a=!0;try{const u=d?await v.approveOAuthRequest(t,Yk(e)):await v.denyOAuthRequest(t);if(!Hk(u.redirect)){xs(e,"The app's return address isn't one a browser should be sent to.");return}i(u.redirect)}catch(u){if(a=!1,u&&u.status===404){xs(e,"It has expired, was already answered, or belongs to someone else.");return}Zk(e,u&&u.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),o(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>o(!1))}async function Jk(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=Fk();Uk(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await v.getOAuthRequest(e)}catch(a){a&&a.status===404?xs(i,"It has expired, was already answered, or belongs to someone else."):a&&a.status===403&&a.detail&&a.detail.error_code==="web_login_required"?Qk(i,n):a&&a.status===403?xs(i,"Only a person signed in to Chaotic can approve an app."):xs(i,a&&a.message||"Something went wrong");return}Kk(i,s),Xk(i,e,s,t)}const Bl="/invite/",Is="/invite",Dl="chaotic.inviteToken",nm="invite-auth-notice";let Ml=null;const e$="This invitation is no longer valid.",t$={owner:"an owner",admin:"an admin",member:"a member"};function n$(e){if(!e||!e.startsWith(Bl))return null;const t=e.slice(Bl.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function im(){const{pathname:e}=window.location,t=n$(e);if(t){Ml=t;try{sessionStorage.setItem(Dl,t)}catch{}return history.replaceState(null,"",Is),t}if(!sm(e))return null;let n=null;try{n=sessionStorage.getItem(Dl)}catch{}const i=n||Ml;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function sm(e){return e===Is||e===`${Is}/`}function am(e){return sm(e)||!!(e&&e.startsWith(Bl))}function jl(){Ml=null;try{sessionStorage.removeItem(Dl)}catch{}}function i$(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function s$(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function Rl(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function om(){const e=s$();return io(),Rl(e),e}function a$(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),io()}function io(){var e;(e=document.getElementById(nm))==null||e.remove()}function Pl(e){const t=e.invited_by_name?`<strong>${f(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=t$[e.role]||`a ${f(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${f(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${f(e.email_hint)}</strong>${o$(e)}</p>`}function o$(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${f(n)}`}const r$="Ask whoever invited you to send a new invitation.",l$="Reload the page to try again.";function ql(e,t=e$,n=r$){e.innerHTML=`
        <div class="invite-page">
            <h1>${f(t)}</h1>
            <p class="invite-muted">${f(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function c$(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function rm(){window.location.pathname!==Is&&history.replaceState(null,"",Is),c$(om())}function d$(e,t){e.innerHTML=`
        <div class="invite-page">
            ${Pl(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function u$(e,t,n){const i=i$(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${f(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${Pl(t)}
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
            ${Pl(t)}
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
        </div>`}function p$(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function m$(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),a=e.querySelector("#invite-code-form"),o=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=u=>{l.textContent=u,l.classList.remove("hidden")},d=()=>{var u;a.classList.remove("hidden"),(u=o.focus)==null||u.call(o)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const u=await v.requestEmailVerification(),m=p$(u.expires_at);c(`We sent a code to ${u.email}${m?`; it works until ${m}`:""}.`),s.textContent="Send a new code",d()}catch(u){const m=u&&u.detail&&u.detail.error_code;if(u&&u.status===401){n();return}if(m==="email_already_verified"){t();return}c(u&&u.message||"Something went wrong"),u&&u.status===429&&d()}finally{s.disabled=!1}}}),a.addEventListener("submit",async u=>{var g;if(u.preventDefault(),r.disabled)return;const m=o.value.trim();if(m){r.disabled=!0;try{await v.confirmEmailVerification(m)}catch(y){r.disabled=!1;const b=y&&y.detail&&y.detail.error_code;y&&y.status===401?n():b==="email_already_verified"?t():(c(y&&y.message||"Something went wrong"),(g=o.select)==null||g.call(o));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function f$(e,t){io();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=nm,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${f(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${f(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),io(),t()})}function so(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function g$(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,u;const a=om();a.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let o;try{o=await v.getInvitation(e)}catch(m){m&&m.status===404?(jl(),ql(a)):ql(a,m&&m.message||"Something went wrong.",l$);return}if(!t){d$(a,o);const m=g=>{f$(o,()=>Rl(a)),n(g)};a.querySelector("#invite-sign-in").addEventListener("click",()=>m("login")),a.querySelector("#invite-sign-up").addEventListener("click",()=>m("signup"));return}u$(a,o,t),(d=a.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=a.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async m=>{var y,b;if(l)return;l=!0,r.disabled=!0;let g;try{g=m===void 0?await v.acceptInvitation(e):await v.acceptInvitation(e,m)}catch(k){l=!1,r.disabled=!1;const T=k&&k.detail&&k.detail.error_code;if(m!==void 0&&(T==="invalid_verification_code"||T==="invitation_code_expired"||k&&k.status===429)){so(a,k&&k.message||"That code did not work."),(b=(y=a.querySelector("#invite-admin-code"))==null?void 0:y.select)==null||b.call(y);return}k&&k.status===401?s():k&&(k.status===404||k.status===400)?(jl(),ql(a)):k&&k.status===403&&k.detail&&k.detail.error_code==="email_unverified"?(so(a,"Verify your email address to continue."),a.querySelector("#invite-accept-actions").classList.add("hidden"),a.querySelector("#invite-verify").classList.remove("hidden")):k&&k.status===403?so(a,`This invitation is for a different email address. Only ${o.email_hint} can accept it.`):so(a,k&&k.message||"Something went wrong");return}jl(),lm(a,o);try{await i(g.team_id,o.team_name)}catch(k){console.error("Joined the team but could not open it:",k),Rl(a),lm(a,o)}};r.addEventListener("click",()=>c()),(u=a.querySelector("#invite-admin-code-form"))==null||u.addEventListener("submit",m=>{m.preventDefault();const g=a.querySelector("#invite-admin-code").value.trim();g&&c(g)}),m$(a,{onVerified:()=>{a.querySelector("#invite-verify").classList.add("hidden"),a.querySelector("#invite-error").classList.add("hidden"),a.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function lm(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${f(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${f(t.team_name)}</a>
            </div>
        </div>`}function Nl(e){return g$(e,{user:_t(),showAuth:t=>{Ls(),t==="signup"?um():dm()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),a$(),await gi({teamId:t}),$(`You joined ${n}`,"success")},signOut:()=>{v.logout(),Hn(null),Fi(null),Nl(e)}})}async function cm(){const e=im();if(e){await Nl(e);return}if(am(window.location.pathname)){rm();return}Ls()}async function gi({teamId:e,teamsRequest:t=null}={}){const n=Ok(window.location.pathname);if(n){await Jk(n);return}const i=im();if(i){await Nl(i);return}if(am(window.location.pathname)){rm();return}h$(),Ep(),w$(),await kl(t);const s=uk();if(s.length===0&&!Bk()){Yp();return}s.length===0&&ta("my-issues");try{if(s.length>0){const a=e&&s.find(o=>o.id===e)||s[0];await $l(a,!0)}}finally{Bw()}}let hi=null,Ss=null,vt=null,yt=null;function Ts(){hi||(hi=document.getElementById("auth-screen"),Ss=document.getElementById("main-screen"),vt=document.getElementById("login-form"),yt=document.getElementById("signup-form"))}function Ls(){Ts(),hi&&hi.classList.remove("hidden"),Ss&&Ss.classList.add("hidden")}function h$(){Ts(),hi&&hi.classList.add("hidden"),Ss&&Ss.classList.remove("hidden")}function dm(){Ts(),vt&&vt.classList.remove("hidden"),yt&&yt.classList.add("hidden")}function um(){Ts(),vt&&vt.classList.add("hidden"),yt&&yt.classList.remove("hidden")}async function v$(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await v.login(t,n),Hn(await v.getMe()),await gi(),$("Welcome back!","success")}catch(i){E("log in",i)}return!1}async function y$(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await v.signup(t,n,i),await v.login(n,i),Hn(await v.getMe()),await gi(),$("Account created successfully!","success")}catch(s){E("sign up",s)}return!1}function pm(){v.logout(),Hn(null),Fi(null),Ls(),$("Signed out","success")}function b$(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function w$(){var i;const e=_t();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",Yo(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?b$(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${p(s)}" alt="${p(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function k$(){Ts();const e=vt==null?void 0:vt.querySelector("form");e&&e.addEventListener("submit",s=>v$(s));const t=yt==null?void 0:yt.querySelector("form");t&&t.addEventListener("submit",s=>y$(s));const n=vt==null?void 0:vt.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),um()});const i=yt==null?void 0:yt.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),dm()})}let Ol=[];async function Hl(){try{Ol=await v.getApiKeys(),$$()}catch(e){E("load API keys",e)}}function $$(){const e=document.getElementById("api-keys-list");if(e){if(Ol.length===0){e.innerHTML=H({icon:q.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=Ol.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${f(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${f(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${et(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${et(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${p(t.id)}" data-key-name="${p(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function E$(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,W()}async function _$(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await v.createApiKey(t);O(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,W()}catch(n){E("create API key",n)}return!1}async function x$(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),$("API key copied to clipboard","success")}catch{$("Failed to copy","error")}}async function I$(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await v.revokeApiKey(e),$("API key revoked","success"),await Hl()}catch(n){E("revoke API key",n)}}se({"create-api-key":e=>{_$(e)},"copy-api-key":()=>{x$()},"dismiss-api-key-modal":()=>{O(),Hl()},"revoke-api-key":(e,t)=>{I$(t.keyId,t.keyName)}});let Fl=[];async function mm(){try{Fl=await v.getConnections(),T$()}catch(e){E("load connected apps",e)}}function Ul(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function S$(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function T$(){const e=document.getElementById("connected-apps-list");if(e){if(Fl.length===0){e.innerHTML=H({icon:q.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=Fl.map(t=>t.acts_as==="person"?L$(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${f(Ul(t))} ${no(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${f(t.agent?t.agent.name:"an agent")}</span>
                    <span>${f(S$(t))}</span>
                    <span>policy ${f(t.policy)}</span>
                    <span class="api-key-date">Connected ${et(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${et(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${f(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(t.id)}" data-connection-name="${p(Ul(t))}">Disconnect</button>
        </div>
    `).join("")}}function L$(e){const n=`${e.device_name||"A device"} · ${Ul(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${f(n)} ${no(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${et(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${et(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(e.id)}" data-connection-name="${p(n)}">Sign out</button>
        </div>
    `}async function C$(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await v.revokeConnection(e),$("App disconnected","success"),await mm()}catch(n){E("disconnect app",n)}}se({"revoke-connection":(e,t)=>{C$(t.connectionId,t.connectionName)}});let Gl=[];async function fm(){try{Gl=await v.getPushDevices(),A$()}catch(e){E("load push devices",e)}}const gm={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function hm(e){return e.label||e.platform||"Unnamed device"}function A$(){const e=document.getElementById("push-devices-list");if(e){if(Gl.length===0){e.innerHTML=H({icon:q.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=Gl.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${f(hm(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${f(t.platform)}</span>`:""}
                    <span>via ${f(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${et(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${et(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${f(String(t.failure_count))} failed deliveries</span>`:""}
                    ${gm[t.status]?`<span class="push-device-status">${f(gm[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${p(t.installation_id)}" data-device-name="${p(hm(t))}">Remove</button>
        </div>
    `).join("")}}async function B$(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await v.deletePushDevice(e),$("Device removed","success"),await fm()}catch(n){E("remove push device",n)}}se({"remove-push-device":(e,t)=>{B$(t.installationId,t.deviceName)}});let ao=!1,Wt=0,un=[],oo=[];function D$(e){oo=e,un=[...e]}function Bn(){return ao}function M$(){if(ao)return;ao=!0,Wt=0,un=[...oo];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&ro()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>j$(n.target.value)),t.addEventListener("keydown",P$),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&R$(Number(i.dataset.commandIndex))}),Cs(),requestAnimationFrame(()=>t.focus())}function ro(){ao=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function j$(e){const t=e.toLowerCase().trim();t?un=oo.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):un=[...oo],Wt=0,Cs()}function Cs(){const e=document.getElementById("command-results");if(!e)return;if(un.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};un.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===Wt?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function R$(e){Wt=e,Cs()}function vm(e){const t=un[e];t&&(ro(),t.action())}function P$(e){switch(e.key){case"ArrowDown":e.preventDefault(),Wt=Math.min(Wt+1,un.length-1),Cs();break;case"ArrowUp":e.preventDefault(),Wt=Math.max(Wt-1,0),Cs();break;case"Enter":e.preventDefault(),vm(Wt);break;case"Escape":e.preventDefault(),ro();break}}se({"execute-command":(e,t)=>{vm(Number(t.commandIndex))}});const q$=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function N$(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${f(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${f(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function O$(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${f(e.title)}</h4>
        ${e.shortcuts.map(N$).join("")}
    </div>`}function ym(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${q$.map(O$).join("")}
        </div>
    `,W()}const lo=100,zl="status!=done,canceled",H$=["created","updated","priority","status","title","estimate"];function ve(e){return e==null?"":f(String(e))}function bm(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${p(t)}">${ve(n)}</a>`}function wm(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const Vl=[{id:"identifier",label:"ID",fixed:!0,render:e=>bm(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>bm(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>ve(ke(e.status))},{id:"priority",label:"Priority",render:e=>ve(Fe(e.priority))},{id:"type",label:"Type",render:e=>ve(Et(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>ve(wm(e,"assignee"))},{id:"creator",label:"Creator",render:e=>ve(wm(e,"creator"))},{id:"project",label:"Project",render:e=>ve(e.project_key)},{id:"sprint",label:"Sprint",render:e=>ve(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=ie(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${ve(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>ve(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${p(e.parent_id)}">${ve(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>ve(et(e.created_at))},{id:"updated",label:"Updated",render:e=>ve(et(e.updated_at))},{id:"completed",label:"Completed",render:e=>ve(et(e.completed_at))},{id:"due",label:"Due",render:e=>ve(et(e.due_date))}],co=Object.fromEntries(Vl.map(e=>[e.id,e])),F$=Vl.filter(e=>e.fixed).map(e=>e.id),Wl=["identifier","title","status","priority","assignee","updated"];function Kl(e){const t=new Set,n=[];for(const s of e||[]){const a=String(s).trim();!co[a]||t.has(a)||(t.add(a),n.push(a))}return n.length===0?[...Wl]:[...F$.filter(s=>!t.has(s)),...n]}function U$(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function G$(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?Kl(t.get("cols").split(",")):[...Wl],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function z$(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!U$(e.cols,Wl)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function V$(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function W$({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=lo,skip:a=0}){const o=["chaotic","issue","list"];let r=e||"",l=null;n||i?(o.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",o.push("--where",V$(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],u=d.startsWith("-"),m=d.replace(/^[-+]/,"");let g=null;H$.includes(m)?(o.push("--sort",m,"--order",u?"desc":"asc"),c.length>1&&(g=`The CLI sorts by one field; only "${d}" was copied.`)):g=`The CLI cannot sort by "${m}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return o.push("--limit",String(s)),a>0&&o.push("--skip",String(a)),{command:o.join(" "),warning:l}}function K$(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function Y$(e,t){const n=Kl(t).map(a=>co[a]),i=n.map(a=>`<th data-col="${p(a.id)}">${ve(a.label)}</th>`).join(""),s=e.map(a=>`<tr class="query-row" data-issue-id="${p(a.id)}">${n.map(o=>`<td class="query-col-${p(o.id)}">${o.render(a)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function Z$(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,a=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${a?"":" disabled"}>Next</button>`}let N=null,Yl=null,Qe=null,Zl=0,vi=!1,km=!1;function re(e){return document.getElementById(e)}function $m(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function Em(e){const t=z$({...Yl,cols:N.cols,group:N.group,view:N.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function Q$(){const e=re("query-project-filter");if(!e)return;const t=['<option value="">All projects</option>'].concat(ee().map(n=>`<option value="${p(n.id)}">${ve(n.name)}</option>`));e.innerHTML=t.join(""),e.value=N.teamScope?"":N.projectId||""}function X$(){const e=re("query-columns-menu");e&&(e.innerHTML=Vl.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${p(t.id)}"${N.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${ve(t.label)}
        </label>`).join(""))}function uo(e){const t=re("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${ve(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function _m(e){const t=re("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function Ql(e){var t;(t=re("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function As(){const e=re("query-results"),t=re("query-pager");if(!e)return;if(!Qe){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=Qe;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=Y$(n,N.cols),t&&(t.innerHTML=Z$(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(a=>{a.dataset.enabled=String(!a.disabled)}),vi&&Ql(!0))}async function po(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!N)return;const i=C(),s=N.teamScope?{teamId:i==null?void 0:i.id}:{projectId:N.projectId};if(!s.teamId&&!s.projectId){Qe=null,As(),uo(N.teamScope?"Select a team first.":"Select a project.");return}const a=++Zl,o=N.where===null?zl:N.where,r=re("query-results");vi=!0,r&&r.classList.add("loading"),Ql(!0);const l=()=>a===Zl&&L()==="query";try{const c=await v.queryIssues({...s,where:o,order:N.order,skip:(N.page-1)*lo,limit:lo});if(!l())return;N.where=c.where,N.order=c.order||null,Yl=$m(N),Qe={issues:c.issues||[],total:c.total,skip:c.skip};const d=re("query-where");d&&d.value.trim()===o.trim()&&(d.value=c.where),uo(null),vi=!1,As(),Em(e),t&&t()}catch(c){if(!l())return;vi=!1,n?n():Qe=null,As(),uo(K$(c))}finally{a===Zl&&(vi=!1,r&&r.classList.remove("loading"),Ql(!1))}}function xm(){if(!N)return;const e=re("query-where");return N.where=e?e.value.trim():"",N.page=1,po("push")}function J$(e){if(N)return N.teamScope=!e,e&&(N.projectId=e),N.page=1,_m(null),po("push",{onSuccess:()=>{e&&rt(e)}})}function eE(e,t){if(!N||!co[e]||co[e].fixed)return;const n=N.cols.filter(i=>i!==e);N.cols=Kl(t?[...n,e]:n),As(),Em("replace")}function tE(e){if(!N||!Qe||vi)return;const t=N.page+e;if(t<1||e>0&&Qe.skip+Qe.issues.length>=Qe.total)return;const n={page:N.page,result:Qe};return N.page=t,po("push",{onFailure:()=>{N.page=n.page,Qe=n.result}})}async function nE(){if(!N)return null;const e=re("query-where"),t=e?e.value.trim():N.where??zl,n=N.teamScope?null:ee().find(o=>o.id===N.projectId),{command:i,warning:s}=W$({where:t,order:N.order,teamScope:N.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:lo,skip:Qe?Qe.skip:0}),a=re("query-cli-preview");try{await navigator.clipboard.writeText(i),$(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),a&&a.classList.add("hidden")}catch{a&&(a.textContent=i,a.classList.remove("hidden")),$("Could not copy; the command is shown below the box","warning")}return i}function iE(){var e,t,n,i,s,a,o;km||(km=!0,(e=re("query-where"))==null||e.addEventListener("keydown",r=>{r.key==="Enter"&&!r.shiftKey&&!r.isComposing&&(r.preventDefault(),xm())}),(t=re("query-run-btn"))==null||t.addEventListener("click",()=>xm()),(n=re("query-copy-cli-btn"))==null||n.addEventListener("click",()=>nE()),(i=re("query-project-filter"))==null||i.addEventListener("change",r=>J$(r.target.value)),(s=re("query-columns-btn"))==null||s.addEventListener("click",r=>{r.stopPropagation();const l=re("query-columns-menu");if(!l)return;const c=l.classList.toggle("hidden")===!1;r.currentTarget.setAttribute("aria-expanded",String(c))}),(a=re("query-columns-menu"))==null||a.addEventListener("change",r=>{r.target.matches('input[type="checkbox"]')&&eE(r.target.value,r.target.checked)}),(o=re("query-pager"))==null||o.addEventListener("click",r=>{const l=r.target.closest("button[data-query-page]");!l||l.disabled||tE(Number(l.dataset.queryPage))}),document.addEventListener("click",r=>{var c;const l=re("query-columns-menu");l&&!l.classList.contains("hidden")&&!r.target.closest("#query-columns-picker")&&(l.classList.add("hidden"),(c=re("query-columns-btn"))==null||c.setAttribute("aria-expanded","false"))}))}function sE(){var s,a;iE();const e=G$(window.location.search),t=ee();let n=null;if(!e.teamScope){const o=r=>r&&t.some(l=>l.id===r);if(!o(e.projectId)){const r=e.projectId;e.projectId=o(Y())?Y():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}N=e,Yl=$m(N),Qe=null;const i=re("query-where");return i&&(i.value=N.where===null?zl:N.where),(s=re("query-cli-preview"))==null||s.classList.add("hidden"),(a=re("query-columns-menu"))==null||a.classList.add("hidden"),Q$(),X$(),uo(null),_m(n),As(),po("replace")}let mo=[];function aE(){return mo}ot(e=>{e==="currentProject"&&L()==="epics"&&pn()});let Xl=0;const Bs=new Set(["done","canceled"]);let fo=!1;async function pn(){var s;Qo(-1);const e=document.getElementById("epics-list");if(!e)return;const t=++Xl,n=Dr(),i=Ba("epics",n);i?Im(i,e):e.innerHTML=Array(4).fill(0).map(()=>`
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
        `).join("");try{if(!((s=C())!=null&&s.id)){mo=[],e.innerHTML=H({icon:q.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const a=Y(),o=a?await v.getProjectEpicProgress(a):await v.getTeamEpicProgress(C().id);if(t!==Xl||(ei("epics",n,o),i&&Da(i,o)))return;Im(o,e)}catch(a){if(t!==Xl)return;if(i){E("load epics",a);return}e.innerHTML=H({icon:q.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),E("load epics",a)}}function Im(e,t){var n;if(!((n=e==null?void 0:e.epics)!=null&&n.length)){mo=[],t.innerHTML=H({icon:q.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}Am(e,t)}function Jl(e,t){return`${e} ${t}${e===1?"":"s"}`}function Sm(e,t){return t<=0?"-":e>=t?"100%":`${Math.floor(e/t*100)}%`}function oE(e){const t=e.children||{},n=(t.total||0)-(t.canceled||0);if(n<=0)return'<span class="epic-progress-text">No tickets</span>';const i=Math.round((t.done||0)/n*100),s=Math.round(((t.in_progress||0)+(t.in_review||0))/n*100),a=t.done===n,o=`${t.done||0} done, ${(t.in_progress||0)+(t.in_review||0)} in progress, ${(t.todo||0)+(t.backlog||0)} not started`+(t.canceled?`, ${t.canceled} canceled`:"");return`
        <div class="epic-progress-bar-container" title="${p(o)}">
            <div class="epic-progress-bar">
                <div class="epic-progress-fill${a?" epic-progress-complete":""}" style="width: ${i}%"></div>
                <div class="epic-progress-active" style="width: ${Math.min(s,100-i)}%"></div>
            </div>
            <span class="epic-progress-pct" title="Tickets done">${Sm(t.done||0,n)}</span>
            <span class="epic-progress-text">${t.done||0}/${n}</span>
        </div>
    `}function Tm(e){if(!e||e.length===0)return'<span class="text-muted">-</span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,a=`${i.name}${i.status==="active"?" (current)":""}: ${Jl(i.closed||0,"ticket")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${p(a)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}function Lm(e,t){return e?`<span class="epic-this-sprint">+${e} <span class="text-muted">(${t} pts)</span></span>`:'<span class="text-muted">-</span>'}function rE(e){const t=e.status_pinned&&!Bs.has(e.status)?' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its tickets">✎<span class="sr-only"> (status set by hand)</span></span>':"",n=e.status==="canceled"?' <span class="epic-canceled-tag">Canceled</span>':"",i=(e.points_total||0)>0?`${e.points_done||0}/${e.points_total} pts`:"-",s=Ds(e)<=0;return`
        <tr class="epic-row${Bs.has(e.status)?" epic-row-closed":""}${s?" epic-row-empty":""}" data-identifier="${p(e.identifier)}">
            <td class="epic-identifier">${f(e.identifier)}</td>
            <td class="epic-title">${f(e.title)}${t}${n}</td>
            <td class="epic-progress">${oE(e)}</td>
            <td class="epic-points">${i}</td>
            <td class="epic-sprint">${Lm(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${Tm(e.sprints)}</td>
        </tr>
    `}function lE(e){return!e||!e.open&&!e.closed_this_sprint&&!(e.sprints||[]).some(t=>t.closed)?"":`
        <tr class="epic-untracked-row">
            <td class="epic-identifier">${f(e.project_key)}</td>
            <td class="epic-title text-muted">No epic</td>
            <td class="epic-progress"><span class="epic-progress-text">${Jl(e.open||0,"open ticket")}</span></td>
            <td class="epic-points"></td>
            <td class="epic-sprint">${Lm(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${Tm(e.sprints)}</td>
        </tr>
    `}function Ds(e){const t=e.children||{};return(t.total||0)-(t.canceled||0)}function Cm(e){var n;const t=Ds(e);return t>0?(((n=e.children)==null?void 0:n.done)||0)/t:0}const ec=[{key:"active",label:"In progress",statuses:["in_progress","in_review"]},{key:"todo",label:"Todo",statuses:["todo"]},{key:"backlog",label:"Backlog",statuses:["backlog"]},{key:"closed",label:"Closed",statuses:["done","canceled"]}];function cE(e){const t=e.status||"backlog";return ec.find(n=>n.statuses.includes(t))||ec[2]}function dE(e,t){const n=Ds(e)<=0,i=Ds(t)<=0;if(n!==i)return n?1:-1;const s=(t.points_this_sprint||0)-(e.points_this_sprint||0);if(s)return s;const a=(t.closed_this_sprint||0)-(e.closed_this_sprint||0);return a||Cm(t)-Cm(e)}function uE(e){return ec.map(t=>({group:t,epics:e.filter(n=>cE(n)===t).sort(dE)})).filter(t=>t.epics.length)}function pE(e,t){const n=e.filter(u=>!Bs.has(u.status)),i=n.filter(u=>(u.closed_this_sprint||0)>0).length,s=n.reduce((u,m)=>{var g;return u+(((g=m.children)==null?void 0:g.done)||0)},0),a=n.reduce((u,m)=>u+Ds(m),0),o=[...e,...t],r=o.reduce((u,m)=>u+(m.closed_this_sprint||0),0),l=o.reduce((u,m)=>u+(m.points_this_sprint||0),0),c=t.reduce((u,m)=>u+(m.open||0),0);if(!n.length&&!r&&!c)return"";const d=(u,m,g="")=>`
        <div class="epic-stat${g}">
            <div class="epic-stat-value">${u}</div>
            <div class="epic-stat-label">${m}</div>
        </div>`;return`
        <div class="epic-summary" role="group" aria-label="Progress summary">
            ${n.length?d(`${i}<span class="epic-stat-of"> / ${n.length}</span>`,"open epics moved this sprint"):""}
            ${n.length?d(Sm(s,a),a?`of their tickets done (${s}/${a})`:"no tickets yet"):""}
            ${d(r?`+${r}`:"0",`${r===1?"ticket":"tickets"} closed this sprint (${l} pts)`,r?" epic-stat-up":"")}
            ${c?d(String(c),`open ${c===1?"ticket":"tickets"} under no epic`," epic-stat-warn"):""}
        </div>`}const tc=6;function Am(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=n.filter(m=>Bs.has(m.status)).length,a=fo?n:n.filter(m=>!Bs.has(m.status)),o=[...new Set([...n.map(m=>m.project_key),...i.map(m=>m.project_key)])],r=o.length>1,l=[],c=o.map(m=>{const y=uE(a.filter(T=>T.project_key===m)).map(({group:T,epics:I})=>(l.push(...I),`<tr class="epic-state-row epic-state-${T.key}"><th colspan="${tc}" scope="colgroup"><span class="epic-state-dot" aria-hidden="true"></span>${T.label}<span class="epic-state-count">${I.length}</span></th></tr>`+I.map(rE).join(""))).join(""),b=lE(i.find(T=>T.project_key===m));return!y&&!b?"":(r?`<tr class="epic-group-row"><th colspan="${tc}" scope="colgroup">${f(m)}</th></tr>`:"")+y+b}).join("");mo=l;const d=!c.trim()&&s>0?`<tr class="epic-empty-row"><td colspan="${tc}" class="text-muted">Every epic here is closed.</td></tr>`:"",u=s>0?`<button class="btn btn-secondary btn-small epic-closed-toggle" data-epics-toggle-closed>${fo?"Hide":"Show"} ${Jl(s,"closed epic")}</button>`:"";t.innerHTML=`
        ${pE(n,i)}
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
    `,t._epicProgress=e,t._epicClickHandler||(t._epicClickHandler=m=>{if(m.target.closest("[data-epics-toggle-closed]")){fo=!fo,Qo(-1),Am(t._epicProgress,t);return}const g=m.target.closest(".epic-row");g&&g.dataset.identifier&&Ip(g.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function mE(){const e=Y(),t=ee().map(n=>`
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
    `,W(),document.getElementById("create-epic-form").addEventListener("submit",fE),document.getElementById("create-epic-title").focus()}async function fE(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}try{const s=await v.createIssue(t,{title:n,description:i||null,issue_type:"epic"});O(),$(`Created epic ${s.identifier}`,"success"),pn()}catch(s){E("create epic",s)}}async function Bm(e){try{let t;if(e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t){if(t.issue_type!=="epic"){oe(t.id,!1);return}await go(t.id,!1)}else F("epics",!1)}catch{F("epics",!1)}}async function go(e,t=!0){var n;try{t&&Ln();const[i,s,a,o]=await Promise.all([v.getIssue(e),v.getSubIssues(e),v.getActivities(e),v.getComments(e)]);if(i.issue_type!=="epic"){oe(e,t);return}t&&history.pushState({epicId:e,view:L()},"",`/epic/${i.identifier}`),document.querySelectorAll(".view").forEach(_=>_.classList.add("hidden"));const r=document.getElementById("epic-detail-view");r.classList.remove("hidden");const l=L()||"epics",c=ee().find(_=>_.id===i.project_id),d=i.assignee_id?Xt(i.assignee_id):null,u=d?Jt(d):null,m=aE(),g=(n=m.find(_=>_.id===i.id))==null?void 0:n.children,y=g?(g.total||0)-(g.canceled||0):s.filter(_=>_.status!=="canceled").length,b=g?g.done||0:s.filter(_=>_.status==="done").length,k=y>0?Math.round(b/y*100):0,T=m.findIndex(_=>_.id===i.id),I=T>0?m[T-1]:null,A=T>=0&&T<m.length-1?m[T+1]:null,D=T>=0;r.querySelector("#epic-detail-content").innerHTML=`
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
                            ${Jn(i.description)}
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
                            ${s.length===0?H({icon:q.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(_=>{const P=_.assignee_id?Xt(_.assignee_id):null,z=P?Jt(P):null;return`
                                <div class="sub-issue-item" data-issue-id="${p(_.id)}" data-identifier="${p(_.identifier)}">
                                    <span class="sub-issue-status">${Le(_.status)}</span>
                                    <span class="sub-issue-id">${f(_.identifier)}</span>
                                    <span class="sub-issue-title">${f(_.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(_.status||"backlog").replace(/_/g,"-")}">${ke(_.status)}</span>
                                    ${z?`<span class="sub-issue-assignee">${f(z)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${a.length===0?H({icon:q.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):a.map(_=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Sr(_.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Lr(_)}</span>
                                        <span class="activity-actor">by ${f(Tr(_))}</span>
                                        <span class="activity-time">${at(_.created_at)}</span>
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
                                            <span class="comment-date">${at(_.created_at)}</span>
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
                                ${Wa(i.estimate,i.project_id)}
                            </span>
                        </div>

                        ${i.labels&&i.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${i.labels.map(_=>`
                                    <span class="issue-label" style="background: ${ie(_.color)}20; color: ${ie(_.color)}">${f(_.name)}</span>
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
        `;const X=r.querySelector(".sub-issues-list");X&&X.addEventListener("click",_=>{const P=_.target.closest(".sub-issue-item");P&&P.dataset.issueId&&oe(P.dataset.issueId)})}catch(i){E("load epic",i)}}se({"navigate-epic":(e,t)=>{go(t.epicId)},"epic-follow-children":async(e,t)=>{try{await v.updateIssue(t.epicId,{status_follows_children:!0}),$("Status now follows sub-issues"),await go(t.epicId,!1)}catch(n){E("update epic",n)}}});function gE(e){let t=!1,n=null;return function(s){var o,r,l,c,d,u,m;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((u=e.isDetailViewActive)!=null&&u.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((m=e.isDetailViewActive)!=null&&m.call(e))break;s.preventDefault(),e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function hE(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function Kt(e,t,n=oa){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Dm(){const e=document.querySelector(".main-content");e&&(e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1"),e.focus({preventScroll:!0}))}function Ms(e){var n,i;return(i=(n=e.target).closest)!=null&&i.call(n,".sidebar-nav")?!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.key==="j"||e.key==="k")?(Dm(),!1):!0:!1}function vE(e){const t=oa;function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const l=n(a);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,o,c,d)}return function(a){var l,c,d,u,m;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||Ms(a)||(a.key==="Enter"||a.key===" ")&&((d=(c=a.target).closest)!=null&&d.call(c,".issue-group-header"))||e.isModalOpen()||e.isCommandPaletteOpen()||(u=e.isInlineDropdownOpen)!=null&&u.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(a.key)&&((m=e.beforeNavigate)==null||m.call(e));const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Kt(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),Kt(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function yE(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||Ms(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Kt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Kt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function yi(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function bE(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,u,m;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||Ms(i)||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex(),o=g=>{var b,k,T,I;const y=!!((k=(b=document.activeElement)==null?void 0:b.closest)!=null&&k.call(b,"#inbox-list"));if((T=e.collapseInboxExpand)==null||T.call(e),Kt(a+g,e.setSelectedIndex,t),y){const A=document.querySelector(`${t}.keyboard-selected`);(I=(A==null?void 0:A.querySelector(".inbox-row-toggle"))||A)==null||I.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),o(1);break;case"k":case"ArrowUp":i.preventDefault(),o(-1);break;case"Enter":if((d=(c=i.target).closest)!=null&&d.call(c,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;a>=0&&s[a]&&(i.preventDefault(),e.toggleInboxExpand(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":if((u=e.isEscapeLayerAbove)!=null&&u.call(e))break;if((m=e.collapseInboxExpand)!=null&&m.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}a>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function wE(e){const t="#kanban-board .kanban-card";return function(i){var o;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||Ms(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Kt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Kt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.id;r&&e.viewIssue(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function kE(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function Mm(e){const{view:t,selector:n,open:i}=e;return function(a){var l;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||Ms(a)||e.isModalOpen()||e.isCommandPaletteOpen())return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Kt(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),Kt(r-1,e.setSelectedIndex,n);break;case"Enter":r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(c=>c.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const $E=7,nc=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value"),jm=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex"),EE='<svg class="picker-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',_E='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';let Rm=!1;function xE(){Rm||(Rm=!0,Object.defineProperty(HTMLSelectElement.prototype,"value",{...nc,set(e){var t;nc.set.call(this,e),(t=this._picker)==null||t.sync()}}),Object.defineProperty(HTMLSelectElement.prototype,"selectedIndex",{...jm,set(e){var t;jm.set.call(this,e),(t=this._picker)==null||t.sync()}}))}let Ie=null,IE=0;function Pm({restoreFocus:e=!0}={}){return Ie?(Ie.close(e),!0):!1}function SE(e=document){e.querySelectorAll("select[data-picker]").forEach(TE)}function TE(e){var i;if(!e||e._picker)return((i=e==null?void 0:e._picker)==null?void 0:i.button)||null;const t=document.createElement("button");t.type="button",t.className="picker-btn",t.setAttribute("aria-haspopup","listbox"),t.setAttribute("aria-expanded","false"),e.id&&(t.dataset.pickerFor=e.id),t.innerHTML=`<span class="picker-label"></span>${EE}`,e.classList.add("picker-native"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,e.insertAdjacentElement("afterend",t);const n=()=>{qm(e,t),(Ie==null?void 0:Ie.select)===e&&Ie.refresh()};return e._picker={button:t,sync:n},xE(),e.addEventListener("change",n),typeof MutationObserver<"u"&&new MutationObserver(n).observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["disabled","selected","hidden"]}),t.addEventListener("click",s=>{s.preventDefault(),(Ie==null?void 0:Ie.select)===e?Pm():Om(e,t)}),t.addEventListener("keydown",s=>{s.metaKey||s.ctrlKey||s.altKey||(["ArrowDown","ArrowUp","Enter"," "].includes(s.key)?(s.preventDefault(),s.stopPropagation(),(Ie==null?void 0:Ie.select)!==e&&Om(e,t)):s.key.length===1&&s.stopPropagation())}),n(),t}function qm(e,t){const n=e.options[e.selectedIndex],i=n?n.textContent.trim():"";t.querySelector(".picker-label").textContent=i,t.disabled=e.disabled,t.title=i;const s=e.getAttribute("aria-label");s&&t.setAttribute("aria-label",i?`${s}: ${i}`:s)}function Nm(e){return[...e.options].filter(t=>!t.hidden).map(t=>({value:t.value,text:t.textContent.trim(),disabled:t.disabled}))}function Om(e,t){Pm({restoreFocus:!1});const n=Nm(e),i=`picker-list-${++IE}`,s=n.length>=$E,a=e.getAttribute("aria-label")||"Options",o=document.createElement("div");o.className="picker-popover",o.tabIndex=-1,o.innerHTML=`
        ${s?`<input type="text" class="picker-search" placeholder="Filter…" aria-label="Filter ${p(a)}"
            role="combobox" aria-expanded="true" aria-controls="${i}" aria-autocomplete="list" autocomplete="off" spellcheck="false">`:""}
        <ul class="picker-list" role="listbox" id="${i}" tabindex="-1" aria-label="${p(a)}"></ul>
    `,document.body.appendChild(o);const r=o.querySelector(".picker-list"),l=o.querySelector(".picker-search"),c=x=>Math.max(0,x.findIndex(R=>!R.disabled));let d=n.findIndex(x=>x.value===e.value&&!x.disabled);d===-1&&(d=c(n));let u=n;const m=()=>{var R;r.innerHTML=u.length?u.map((M,te)=>`
                <li role="option" id="${i}-${te}" class="picker-option${te===d?" active":""}${M.disabled?" disabled":""}"
                    data-index="${te}" data-value="${p(M.value)}"
                    aria-selected="${M.value===e.value?"true":"false"}"${M.disabled?' aria-disabled="true"':""}>
                    <span class="picker-option-text">${f(M.text)}</span>
                    ${M.value===e.value?`<span class="picker-check">${_E}</span>`:""}
                </li>`).join(""):'<li class="picker-empty" role="presentation">No matches</li>';const x=r.querySelector(".picker-option.active");x?(l||r).setAttribute("aria-activedescendant",x.id):(l||r).removeAttribute("aria-activedescendant"),(R=x==null?void 0:x.scrollIntoView)==null||R.call(x,{block:"nearest"})},g=()=>{var Xe,pt;const x=t.getBoundingClientRect(),R=((Xe=window.visualViewport)==null?void 0:Xe.width)||window.innerWidth,M=((pt=window.visualViewport)==null?void 0:pt.height)||window.innerHeight;o.style.minWidth=`${Math.min(Math.max(x.width,220),R-16)}px`,o.style.maxHeight="",o.style.top="0px";const te=o.offsetWidth||Math.max(x.width,220),De=o.offsetHeight;o.style.left=`${Math.max(8,Math.min(x.left,R-te-8))}px`;const be=M-x.bottom-12,we=x.top-12;if(De>be&&we>be){const Me=Math.max(120,we);o.style.maxHeight=`${Me}px`,o.style.top=`${Math.max(8,x.top-4-Math.min(De,Me))}px`}else o.style.maxHeight=`${Math.max(120,be)}px`,o.style.top=`${x.bottom+4}px`},y=x=>{if(!x||x.disabled||e.disabled)return;if(![...e.options].some(M=>M.value===x.value&&!M.disabled)){K(!0);return}const R=x.value!==e.value;nc.set.call(e,x.value),qm(e,t),K(!0),R&&e.dispatchEvent(new Event("change",{bubbles:!0}))},b=x=>{let R=d+x;for(;R>=0&&R<u.length&&u[R].disabled;)R+=x;R<0||R>=u.length||(d=R,m())},k=(x,R)=>{let M=x;for(;M>=0&&M<u.length&&u[M].disabled;)M+=R;M>=0&&M<u.length&&(d=M,m())},T=x=>{if(!(x.metaKey||x.ctrlKey))switch(x.stopPropagation(),x.key){case"ArrowDown":x.preventDefault(),b(1);break;case"ArrowUp":x.preventDefault(),b(-1);break;case"Home":l||(x.preventDefault(),k(0,1));break;case"End":l||(x.preventDefault(),k(u.length-1,-1));break;case"PageDown":x.preventDefault(),k(Math.min(u.length-1,d+8),-1);break;case"PageUp":x.preventDefault(),k(Math.max(0,d-8),1);break;case"Enter":x.preventDefault(),y(u[d]);break;case"Escape":x.preventDefault(),K(!0);break;case"Tab":K(!0);break;case" ":l||(x.preventDefault(),y(u[d]));break;default:if(!l&&x.key.length===1&&!x.metaKey&&!x.ctrlKey&&!x.altKey){I=(Date.now()-A<700?I:"")+x.key.toLowerCase(),A=Date.now();const R=u.findIndex(M=>!M.disabled&&M.text.toLowerCase().startsWith(I));R!==-1&&(d=R,m())}}};let I="",A=0;const D=()=>{const x=l.value.trim().toLowerCase();u=x?n.filter(M=>M.text.toLowerCase().includes(x)):n;const R=u.findIndex(M=>M.value===e.value&&!M.disabled);d=!x&&R!==-1?R:c(u),m()},X=x=>{o.contains(x.target)||t.contains(x.target)||K(!1)},_=()=>g(),P=x=>{x.key!=="Escape"||o.contains(x.target)||(x.preventDefault(),x.stopPropagation(),K(!0))},z=()=>K(!1);function K(x){(Ie==null?void 0:Ie.popover)===o&&(Ie=null,o.remove(),t.setAttribute("aria-expanded","false"),t.classList.remove("open"),t.removeAttribute("aria-controls"),document.removeEventListener("pointerdown",X,!0),document.removeEventListener("keydown",P,!0),window.removeEventListener("popstate",z),window.removeEventListener("resize",_),window.removeEventListener("scroll",_,!0),x&&t.focus({preventScroll:!0}))}r.addEventListener("click",x=>{const R=x.target.closest(".picker-option");R&&y(u[Number(R.dataset.index)])}),r.addEventListener("mousemove",x=>{const R=x.target.closest(".picker-option");if(!R)return;const M=Number(R.dataset.index);M!==d&&(d=M,m())}),o.addEventListener("keydown",T),l&&l.addEventListener("input",D),document.addEventListener("pointerdown",X,!0),document.addEventListener("keydown",P,!0),window.addEventListener("popstate",z),window.addEventListener("resize",_),window.addEventListener("scroll",_,!0),Ie={select:e,button:t,popover:o,close:K,refresh:()=>{const x=Nm(e);!(x.length===n.length&&x.every((M,te)=>M.value===n[te].value&&M.text===n[te].text&&M.disabled===n[te].disabled))||e.disabled?K(!1):m()}},t.setAttribute("aria-expanded","true"),t.setAttribute("aria-controls",i),t.classList.add("open"),m(),g(),(l||r).focus({preventScroll:!0})}const LE={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>v.getDocumentRevisions(e),fetchOne:(e,t)=>v.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>v.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>v.getIssueDescriptionRevision(e,t)}};let G=null,mn=0;async function Hm(e,t){var a,o;const n=LE[e];if(!n){E("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++mn;G=null;let s;try{s=await n.fetchList(t)}catch(r){E("load revision history",r);return}if(i===mn){if(G={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},G.viewVersion!=null)try{const r=await n.fetchOne(t,G.viewVersion);if(i!==mn)return;G.cache.set(G.viewVersion,r)}catch(r){i===mn&&E("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),ho(),W()}}function ho(){const e=document.getElementById("modal-content");if(!e||!G)return;if(G.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=CE(),n=G.mode==="compare"?BE():AE();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function CE(){const e=G.revisions.map(n=>{const i=G.mode==="view"?n.version===G.viewVersion:n.version===G.compareFromVersion||n.version===G.compareToVersion,s=G.mode==="compare"?n.version===G.compareFromVersion?' <span class="rev-tag">from</span>':n.version===G.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${f(n.author_name||"Unknown")} ${On(n.author)}</span>
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
  `}function AE(){const e=G.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=G.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${f(t.title)}</h3>`:"",i=t[G.adapter.bodyField]||"",s=i?`<div class="markdown-body">${ht(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${f(t.author_name||"Unknown")} &middot; ${at(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function BE(){const e=G.compareFromVersion,t=G.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=G.cache.get(e),i=G.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[G.adapter.bodyField]||"",a=i[G.adapter.bodyField]||"",o=DE(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
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
  `}function DE(e,t){const n=e.split(`
`),i=t.split(`
`),s=ME(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${f(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${f(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${f(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function ME(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(js(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(js(a,"del",e[o]),o++):(js(a,"add",t[r]),r++);for(;o<n;)js(a,"del",e[o++]);for(;r<i;)js(a,"add",t[r++]);return a}function js(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function jE(e){if(!G)return;const t=G.token,n=G;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(G!==n||mn!==t)return;n.cache.set(e,i)}catch(i){G===n&&mn===t&&E("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),ho()}function RE(){if(!G)return;const e=G.token,t=G;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{G===t&&mn===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{G!==t||mn!==e||(s&&E("load revisions to compare",s),ho())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;ho()}se({"show-document-revisions":(e,t)=>{Hm("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{Hm("issue",t.issueId)},"select-revision-version":(e,t)=>{jE(Number(t.version))},"toggle-revision-compare":()=>{RE()},"close-revision-viewer":()=>{G=null,O()}});const PE=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let bt=[],Rs=null,vo=null,ic=0;ot(e=>{e==="currentProject"&&L()==="board"&&Ps()});async function Ps(){ia(-1);const e=++ic,t=Y();if(!t){const a=document.getElementById("kanban-board");a&&(a.innerHTML=ee().length===0?H({icon:q.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):H({icon:q.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const n=document.getElementById("kanban-board"),i=Dr(),s=Ba("board",i);s?(bt=s,Rs=i,L()==="board"&&qt(bt),bi()):n&&(n.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const a=await v.getIssues({project_id:t});if(e!==ic)return;const o=s&&Rs===i&&Da(bt,a);bt=a,Rs=i,ei("board",i,a),L()==="board"&&qt(bt),o||bi()}catch(a){if(e!==ic)return;n&&!s&&(n.innerHTML=H({icon:q.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),E("load board",a)}}const sc=Gg(()=>Ps(),200);function bi(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;Rs&&ei("board",Rs,bt),e.innerHTML=PE.map(i=>{const s=bt.filter(a=>a.status===i.key);return`
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
        `}).join(""),qE(t)}function qE(e){const t=fd();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){ia(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),ia(i),n[i].classList.add("keyboard-selected")}function NE(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),vo=t.dataset.id,t.classList.add("dragging")}function OE(e,t){t.classList.remove("dragging"),vo=null}function Fm(e){const t=bt.find(n=>n.id===vo);return!!t&&t.status===e}function HE(e,t){e.preventDefault(),!Fm(t.dataset.status)&&t.classList.add("drag-over")}function FE(e,t){t.classList.remove("drag-over")}function UE(e,t){e.preventDefault();const n=bt.find(i=>i.id===t.dataset.id);n&&Fm(n.status)||t.classList.add("drag-over")}function GE(e,t){t.classList.remove("drag-over")}async function zE(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=bt.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,bi();try{const o=await v.updateIssue(n,{status:i});$("Status updated","success"),Ki(o)}catch(o){s.status=a,bi(),E("update status",o)}}}async function VE(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=vo||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=bt.find(l=>l.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,bi();try{const l=await v.updateIssue(n,{status:a});$("Status updated","success"),Ki(l)}catch(l){o.status=r,bi(),E("update status",l)}}}se({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),oe(t.id)):e.type==="dragstart"?NE(e,n):e.type==="dragend"?OE(e,n):e.type==="dragover"?UE(e,n):e.type==="dragleave"?GE(e,n):e.type==="drop"&&VE(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?HE(e,n):e.type==="dragleave"?FE(e,n):e.type==="drop"&&zE(e,n)},"retry-load-board":()=>Ps()});const fn=new Map,Um=6e4,ac=100;let Be=null,yo=null,bo=null,qs=null,Gm=!1;const WE={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},KE={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},zm={api:null};let oc={...zm};function YE(e={}){oc={...zm,...e},Be||(Be=document.createElement("div"),Be.className="issue-tooltip",Be.style.display="none",document.body.appendChild(Be),Be.addEventListener("mouseenter",()=>{clearTimeout(yo)}),Be.addEventListener("mouseleave",()=>{rc()})),Gm||(document.addEventListener("mouseover",ZE),document.addEventListener("mouseout",QE),Gm=!0)}function ZE(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=XE(t);if(n){if(n===qs&&Be.style.display!=="none"){clearTimeout(yo);return}clearTimeout(bo),bo=setTimeout(()=>{JE(t,n)},200)}}function QE(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(bo),yo=setTimeout(()=>{rc()},150))}function XE(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function JE(e,t){qs=t;const n=e.getBoundingClientRect();Be.style.left=`${n.left+window.scrollX}px`,Be.style.top=`${n.bottom+window.scrollY+8}px`,Be.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Be.style.display="block";try{const i=await t_(t);if(qs!==t)return;n_(i)}catch{if(qs!==t)return;Be.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function rc(){clearTimeout(bo),clearTimeout(yo),Be&&(Be.style.display="none"),qs=null}function e_(){const e=Date.now();for(const[t,n]of fn.entries())e-n.timestamp>=Um&&fn.delete(t)}async function t_(e){fn.size>ac/2&&e_();const t=fn.get(e);if(t&&Date.now()-t.timestamp<Um)return t.issue;if(!oc.api)throw new Error("API not initialized");const n=await oc.api.getIssueByIdentifier(e);if(fn.size>=ac){const i=Array.from(fn.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,ac/2);for(const[a]of s)fn.delete(a)}return fn.set(e,{issue:n,timestamp:Date.now()}),n}function n_(e){const t=WE[e.status]||"#6b7280",n=KE[e.priority]||"#6b7280",i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Be.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${f(e.identifier)}</span>
            <span class="issue-tooltip-type">${f(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${f(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${i_(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${s_(e.priority)}</span>
        </div>
    `}function i_(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function s_(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Vm(){return!!document.querySelector(".description-inline-editor")}function lc(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function cc(){var e;return lc("issue-detail-view")?((e=$e())==null?void 0:e.id)??null:null}function Dn(e){return!!e&&cc()===e}function a_(){We("issue:created",c_),We("issue:updated",d_),We("issue:deleted",u_),We("comment",f_),We("relation",h_),We("attestation",v_),We("activity",b_),We("project",w_),We("sprint",k_),We("document",g_),We("inbox",y_),We("connection:reconnected",$_),We("connection:unauthorized",r_),We("connection:forbidden",l_),We("connection:superseded",o_)}function o_(){$("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function r_(){v.logout(),Hn(null),Fi(null),Ls(),$("Your session has ended. Please sign in again.","warning")}function l_(){$("Live updates stopped: you no longer have access to this team.","error")}function c_(e){var s;const t=J(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,Ye(a),L()==="issues"&&ct()}else Ye([e,...t]),L()==="issues"&&ct(),$(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((s=_t())==null?void 0:s.id)){const a=Ze(),o=a.findIndex(l=>l.id===e.id),r=a.findIndex(l=>l._isOptimistic&&l.title===e.title);if(o===-1&&r===-1)wn([e,...a]),L()==="my-issues"&&zi();else if(r>=0){const l=[...a];l[r]=e,wn(l),L()==="my-issues"&&zi()}}L()==="board"?sc():L()==="sprints"?Ns():L()==="epics"&&pn(),Dn(e.parent_id)&&Mn(e.parent_id)}function d_(e){ra(e);const t=J();t.some(s=>s.id===e.id)&&Ye(t.map(s=>s.id===e.id?e:s));const n=Ze();n.some(s=>s.id===e.id)&&wn(n.map(s=>s.id===e.id?e:s));const i=Oi();i.some(s=>s.id===e.id)&&qt(i.map(s=>s.id===e.id?e:s)),L()==="issues"?ct():L()==="my-issues"?zi():L()==="board"?sc():L()==="sprints"?Ns():L()==="epics"&&pn(),Dn(e.id)&&(Vm()?Ir(e):Mn(e.id))}function u_(e){dh(e.id),Ye(J().filter(n=>n.id!==e.id)),wn(Ze().filter(n=>n.id!==e.id));const t=Oi();t.some(n=>n.id===e.id)&&qt(t.filter(n=>n.id!==e.id)),L()==="issues"?ct():L()==="my-issues"?(zi(),zn({showLoading:!1})):L()==="board"?sc():L()==="sprints"?Ns():L()==="epics"&&pn(),$(`Issue ${e.identifier} deleted`,"info"),Dn(e.id)&&($(`Issue ${e.identifier} was deleted`,"warning"),F("my-issues"))}const Wm=250,p_=1e3,wi=new Map;function Mn(e){Vm()?Ir():dc(e,Wm)}function dc(e,t){let n=wi.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},wi.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>m_(e),t))}async function m_(e){const t=wi.get(e);if(!t)return;if(t.timer=null,!Dn(e)){wi.delete(e);return}t.inFlight=!0;let n;try{n=await oe(e,!1,{refresh:!0})}finally{t.inFlight=!1}wi.get(e)===t&&(t.again?(t.again=!1,dc(e,Wm)):n==="retry"?dc(e,p_):wi.delete(e))}function f_(e){L()==="my-issues"&&zn({showLoading:!1}),Dn(e.issue_id)&&Mn(e.issue_id),e.document_id&&zu(e.document_id)}function g_(e,{type:t}={}){Gu(),t==="deleted"?Vy(e.id,e.title):zu(e.id)}function h_(e){const t=cc();t&&(e.source_issue_id===t||e.target_issue_id===t)&&Mn(t)}function v_(e){L()==="approvals"&&Tt(),Dn(e.issue_id)&&Mn(e.issue_id)}function y_(e,t){var n;e.recipient_user_id===((n=_t())==null?void 0:n.id)&&(ci(),Fw(t==null?void 0:t.type,e),L()==="inbox"&&!zw(t==null?void 0:t.type,e)&&ws({background:!0}))}function b_(e){L()==="my-issues"&&zn({showLoading:!1}),Dn(e.issue_id)&&Mn(e.issue_id)}function w_(e,{type:t}){dt().then(()=>{L()==="projects"&&Tn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?$(`New project: ${e.name}`,"info"):t==="deleted"&&$(`Project ${e.name} deleted`,"info")}function Ns(){const e=yb();e&&lc("sprint-detail-view")?si(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):lc("sprints-view")&&cn().catch(t=>console.error("Failed to reload sprints:",t))}function k_(e,{type:t}={}){ep(),L()==="sprints"?Ns():L()==="my-issues"&&Vi(),t==="created"?$(`New sprint: ${e.name}`,"info"):t==="closed"&&$(`Sprint ${e.name} closed`,"info")}function $_(){const e=L();ci(),e==="issues"?It().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(Gn().catch(n=>console.error("Failed to resync my issues:",n)),Vi().catch(n=>console.error("Failed to resync sprint status:",n)),zn({showLoading:!1})):e==="board"?Ps():e==="sprints"?Ns():e==="epics"?pn().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?dt().then(()=>{L()==="projects"&&Tn()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?Gu():e==="approvals"?Tt():e==="inbox"&&ws({background:!0});const t=cc();t&&Mn(t)}const E_='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Km(e){return Array.from(e.querySelectorAll(E_)).filter(t=>!t.closest(".hidden, [hidden]"))}function Ym(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function __(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Ym(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=Km(t);n&&n.focus()}}}function wo(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Ym(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=Km(n);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&wo()});async function x_(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=Y();if(!i){$("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=ee().find(c=>c.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Ye([r,...J()]),ct();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const c=await v.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=J();d.some(u=>u.id===c.id)?Ye(d.filter(u=>u.id!==a)):d.some(u=>u.id===a)&&Ye(d.map(u=>u.id===a?c:u)),ct(),dt(),$("Issue created!","success")}catch(c){Ye(J().filter(d=>d.id!==a)),ct(),E("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}Cw({beforeScrollRestore:br,beforeNavigate:()=>{Iy(),hw(),up(null),Fn(null),hd(null),wo(),rc()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return Bm(e[1]),!0;if(e[0]==="issue"&&e[1])return La(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(La(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(R_(e[1]),!0):e[0]==="sprint"&&e[1]?(kb(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(gp(e[1]),!0):!1},detailPopstate:e=>e.epicId?(go(e.epicId,!1),!0):e.issueId?(oe(e.issueId,!1),!0):e.identifier?(La(e.identifier),!0):e.documentId?(Ce(e.documentId,!1),!0):e.sprintId?(si(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=ol();e&&ee().some(t=>t.id===e)&&rt(e)},issueNavigate:e=>La(e),epicNavigate:e=>Bm(e)}),Lw({"my-issues":()=>{Vi(),Gn(),zn()},approvals:()=>{Tt()},inbox:()=>{ws({focusFirst:!0})},issues:()=>{var r;fv(),bv(),$v();const e=new URLSearchParams(window.location.search),t=e.getAll("label"),n=e.getAll("exclude_label"),i=e.get("sprint"),s=t.length>0||n.length>0||!!i||!!((r=document.getElementById("sprint-filter"))!=null&&r.value)||$n().length>0||En().length>0;s||It();const a=Fd().then(()=>{if(t.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=t.includes(d.value)}),pa())}if(n.length>0){const l=document.getElementById("exclude-label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=n.includes(d.value)}),ma())}}),o=nu().then(()=>{if(i){const l=document.getElementById("sprint-filter");l&&(l.value=i)}});s?Promise.allSettled([a,o]).then(()=>It()):(a.catch(l=>console.error("Failed to populate label filter:",l)),o.catch(l=>console.error("Failed to update sprint filter:",l)))},query:()=>{sE()},epics:()=>{pn()},board:()=>{Ps()},projects:()=>{Tn(),dt().then(Tn)},sprints:()=>{cn()},rituals:()=>{Nb()},documents:()=>{Sn()},team:()=>{xl(),Op(),to()},settings:()=>{Hl(),mm(),fm(),xa()}});function I_(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||O()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>O())}function S_(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>hp(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>bw());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>ww()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>vp(a))})}function T_(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Fu("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Fu("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Uu());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>Ny());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Ft())}function L_(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>Bd())}function C_(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>kv());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>tv());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>nv()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const y=g.parentElement;y!=null&&y.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>ha("status-filter-dropdown")):y!=null&&y.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>ha("priority-filter-dropdown")):y!=null&&y.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>ha("label-filter-dropdown")):y!=null&&y.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>ha("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",()=>va())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>ya())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",()=>gr())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>hr())}const a=document.getElementById("label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>ba())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>wa())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>tt());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>tt());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>tt());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>It());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>lu());const m=document.querySelector(".quick-create-input");m&&m.addEventListener("keydown",g=>x_(g))}function A_(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>Hb(t.dataset.tab))})}function B_(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>qp());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Wi()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),F(o.dataset.view),r.detail>0&&Dm())})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>mk());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>wo());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>__());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>Wi())}se({"navigate-to":(e,t)=>{F(t.view)},"set-current-project":(e,t,n)=>{rt(n.value)},showCreateIssueModal:()=>Wi(),showCreateEpicModal:()=>mE(),"retry-load-epics":()=>pn(),showCreateProjectModal:()=>mp(),showCreateDocumentModal:()=>Wu(),showCreateTeamModal:()=>Gp(),showEditTeamModal:()=>Tk(),showInviteModal:()=>Hp(),showCreateApiKeyModal:()=>E$(),showCreateAgentModal:()=>ry(),resetOnboarding:()=>Qp(),logout:()=>pm(),navigateToProjects:()=>F("projects")});async function D_(){if(!v.getToken()){await cm();return}Ep();const e=v.getMyTeams();e.catch(()=>{});try{const t=await v.getMe();Hn(t),await gi({teamsRequest:e})}catch(t){if((t==null?void 0:t.status)===401||(t==null?void 0:t.status)===403){v.logout(),await cm();return}console.error("Failed to load current user on boot:",t),Ls(),$("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{sh(),k$(),B_(),I_(),L_(),C_(),A_(),S_(),T_(),M_(),SE(),j_(),YE({api:v}),a_(),await D_()});function M_(){const e=document.getElementById("theme-toggle");if(!e)return;const t=$g()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),Eg(n?"light":"dark")})}function j_(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");xp(i)}}})}async function R_(e){try{await Ce(e,!1)}catch{F("documents",!1)}}document.addEventListener("keydown",vE({getCurrentView:L,getSelectedIndex:pd,setSelectedIndex:yn,viewIssue:oe,showEditIssueModal:_u,showInlineDropdown:ur,isInlineDropdownOpen:Yi,isModalOpen:st,isCommandPaletteOpen:Bn,isDetailViewActive:yi,beforeNavigate:br})),document.addEventListener("keydown",yE({getCurrentView:L,getSelectedIndex:Wg,setSelectedIndex:md,viewDocument:Ce,showEditDocumentModal:Ku,isModalOpen:st,isCommandPaletteOpen:Bn,isDetailViewActive:yi})),document.addEventListener("keydown",wE({getCurrentView:L,getSelectedIndex:fd,setSelectedIndex:ia,viewIssue:oe,isModalOpen:st,isCommandPaletteOpen:Bn,isDetailViewActive:yi})),document.addEventListener("keydown",bE({getCurrentView:L,getSelectedIndex:Kg,setSelectedIndex:sa,toggleInboxExpand:rk,collapseInboxExpand:Kw,archiveInboxEntry:ok,isInlineDropdownOpen:Yi,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:st,isCommandPaletteOpen:Bn,isDetailViewActive:yi})),document.addEventListener("keydown",kE()),document.addEventListener("keydown",Mm({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&si(e.dataset.sprintId)},getCurrentView:L,getSelectedIndex:Yg,setSelectedIndex:gd,isModalOpen:st,isCommandPaletteOpen:Bn,isDetailViewActive:yi})),document.addEventListener("keydown",Mm({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&Ip(e.dataset.identifier)},getCurrentView:L,getSelectedIndex:Zg,setSelectedIndex:Qo,isModalOpen:st,isCommandPaletteOpen:Bn,isDetailViewActive:yi}));function Zm(){var e;F("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus()}function P_(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)")||by()}document.addEventListener("keydown",gE({closeModal:O,closeSidebar:wo,navigateTo:F,showCreateIssueModal:Wi,showKeyboardShortcutsHelp:ym,isModalOpen:st,focusSearch:Zm,isInlineDropdownOpen:Yi,closeInlineDropdowns:Ug,isModalDirty:Hg,focusModalField:ld,closeDropdowns:()=>{var t;document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),_n();const e=document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)");e&&(e.classList.add("hidden"),(t=document.querySelector("#issue-detail-view .sidebar-overflow-trigger"))==null||t.setAttribute("aria-expanded","false"))},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:P_,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),D$([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>F("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>F("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>F("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>F("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>F("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>F("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>F("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>F("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>F("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>F("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>F("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>F("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{F("issues"),setTimeout(Wi,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{F("projects"),setTimeout(mp,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{F("documents"),setTimeout(Wu,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Gp(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:Zm,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{F("team"),setTimeout(Hp,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>ym(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Qp(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>pm(),category:"Account"}]),document.addEventListener("keydown",hE({isModalOpen:st,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:Bn,openCommandPalette:M$,closeCommandPalette:ro})),window.marked=Z,window.DOMPurify=Jc,console.log("Chaotic frontend loaded via Vite")})();
