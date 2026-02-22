var xg=Object.defineProperty;var Sg=(He,me,mt)=>me in He?xg(He,me,{enumerable:!0,configurable:!0,writable:!0,value:mt}):He[me]=mt;var V=(He,me,mt)=>Sg(He,typeof me!="symbol"?me+"":me,mt);(function(){"use strict";var ga;function He(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var me=He();function mt(e){me=e}var Xt={exec:()=>null};function z(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(ge.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var ge={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Cl=/^(?:[ \t]*(?:\n|$))+/,Ll=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Al=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Bl=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ds=/(?:[*+-]|\d{1,9}[.)])/,Ca=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,La=z(Ca).replace(/bull/g,Ds).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Dl=z(Ca).replace(/bull/g,Ds).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ms=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ml=/^[^\n]+/,js=/(?!\s*\])(?:\\.|[^\[\]\\])+/,jl=z(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",js).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Pl=z(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ds).getRegex(),Hn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ps=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Rl=z("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ps).replace("tag",Hn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Aa=z(Ms).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Hn).getRegex(),Nl=z(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Aa).getRegex(),Rs={blockquote:Nl,code:Ll,def:jl,fences:Al,heading:Bl,hr:Qt,html:Rl,lheading:La,list:Pl,newline:Cl,paragraph:Aa,table:Xt,text:Ml},Ba=z("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Hn).getRegex(),Hl={...Rs,lheading:Dl,table:Ba,paragraph:z(Ms).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ba).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Hn).getRegex()},Ol={...Rs,html:z(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ps).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Xt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:z(Ms).replace("hr",Qt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",La).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ql=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Fl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Da=/^( {2,}|\\)\n(?!\s*$)/,Ul=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,On=/[\p{P}\p{S}]/u,Ns=/[\s\p{P}\p{S}]/u,Ma=/[^\s\p{P}\p{S}]/u,Gl=z(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ns).getRegex(),ja=/(?!~)[\p{P}\p{S}]/u,zl=/(?!~)[\s\p{P}\p{S}]/u,Kl=/(?:[^\s\p{P}\p{S}]|~)/u,Wl=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Pa=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Vl=z(Pa,"u").replace(/punct/g,On).getRegex(),Jl=z(Pa,"u").replace(/punct/g,ja).getRegex(),Ra="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Yl=z(Ra,"gu").replace(/notPunctSpace/g,Ma).replace(/punctSpace/g,Ns).replace(/punct/g,On).getRegex(),Zl=z(Ra,"gu").replace(/notPunctSpace/g,Kl).replace(/punctSpace/g,zl).replace(/punct/g,ja).getRegex(),Xl=z("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ma).replace(/punctSpace/g,Ns).replace(/punct/g,On).getRegex(),Ql=z(/\\(punct)/,"gu").replace(/punct/g,On).getRegex(),ec=z(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),tc=z(Ps).replace("(?:-->|$)","-->").getRegex(),nc=z("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",tc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),qn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,sc=z(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",qn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Na=z(/^!?\[(label)\]\[(ref)\]/).replace("label",qn).replace("ref",js).getRegex(),Ha=z(/^!?\[(ref)\](?:\[\])?/).replace("ref",js).getRegex(),ic=z("reflink|nolink(?!\\()","g").replace("reflink",Na).replace("nolink",Ha).getRegex(),Hs={_backpedal:Xt,anyPunctuation:Ql,autolink:ec,blockSkip:Wl,br:Da,code:Fl,del:Xt,emStrongLDelim:Vl,emStrongRDelimAst:Yl,emStrongRDelimUnd:Xl,escape:ql,link:sc,nolink:Ha,punctuation:Gl,reflink:Na,reflinkSearch:ic,tag:nc,text:Ul,url:Xt},ac={...Hs,link:z(/^!?\[(label)\]\((.*?)\)/).replace("label",qn).getRegex(),reflink:z(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",qn).getRegex()},Os={...Hs,emStrongRDelimAst:Zl,emStrongLDelim:Jl,url:z(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},oc={...Os,br:z(Da).replace("{2,}","*").getRegex(),text:z(Os.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Fn={normal:Rs,gfm:Hl,pedantic:Ol},en={normal:Hs,gfm:Os,breaks:oc,pedantic:ac},rc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Oa=e=>rc[e];function Ae(e,t){if(t){if(ge.escapeTest.test(e))return e.replace(ge.escapeReplace,Oa)}else if(ge.escapeTestNoEncode.test(e))return e.replace(ge.escapeReplaceNoEncode,Oa);return e}function qa(e){try{e=encodeURI(e).replace(ge.percentDecode,"%")}catch{return null}return e}function Fa(e,t){var a;const n=e.replace(ge.findPipe,(o,r,c)=>{let l=!1,d=r;for(;--d>=0&&c[d]==="\\";)l=!l;return l?"|":" |"}),s=n.split(ge.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(ge.slashPipe,"|");return s}function tn(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function lc(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function Ua(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,c}function cc(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var Un=class{constructor(e){V(this,"options");V(this,"rules");V(this,"lexer");this.options=e||me}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:tn(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=cc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=tn(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:tn(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=tn(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))r.push(n[c]),o=!0;else if(!o)r.push(n[c]);else break;n=n.slice(c);const l=r.join(`
`),d=l.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${l}`:l,i=i?`${i}
${d}`:d;const m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=m,n.length===0)break;const u=a.at(-1);if((u==null?void 0:u.type)==="code")break;if((u==null?void 0:u.type)==="blockquote"){const g=u,b=g.raw+`
`+n.join(`
`),y=this.blockquote(b);a[a.length-1]=y,s=s.substring(0,s.length-g.raw.length)+y.raw,i=i.substring(0,i.length-g.text.length)+y.text;break}else if((u==null?void 0:u.type)==="list"){const g=u,b=g.raw+`
`+n.join(`
`),y=this.list(b);a[a.length-1]=y,s=s.substring(0,s.length-u.raw.length)+y.raw,i=i.substring(0,i.length-g.raw.length)+y.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let c=!1,l="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,A=>" ".repeat(3*A.length)),u=e.split(`
`,1)[0],g=!m.trim(),b=0;if(this.options.pedantic?(b=2,d=m.trimStart()):g?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,d=m.slice(b),b+=t[1].length),g&&this.rules.other.blankLine.test(u)&&(l+=u+`
`,e=e.substring(u.length+1),c=!0),!c){const A=this.rules.other.nextBulletRegex(b),R=this.rules.other.hrRegex(b),H=this.rules.other.fencesBeginRegex(b),D=this.rules.other.headingBeginRegex(b),O=this.rules.other.htmlBeginRegex(b);for(;e;){const C=e.split(`
`,1)[0];let G;if(u=C,this.options.pedantic?(u=u.replace(this.rules.other.listReplaceNesting,"  "),G=u):G=u.replace(this.rules.other.tabCharGlobal,"    "),H.test(u)||D.test(u)||O.test(u)||A.test(u)||R.test(u))break;if(G.search(this.rules.other.nonSpaceChar)>=b||!u.trim())d+=`
`+G.slice(b);else{if(g||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||H.test(m)||D.test(m)||R.test(m))break;d+=`
`+u}!g&&!u.trim()&&(g=!0),l+=C+`
`,e=e.substring(C.length+1),m=G.slice(b)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(l)&&(o=!0));let y=null,_;this.options.gfm&&(y=this.rules.other.listIsTask.exec(d),y&&(_=y[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:l,task:!!y,checked:_,loose:!1,text:d,tokens:[]}),i.raw+=l}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c=0;c<i.items.length;c++)if(this.lexer.state.top=!1,i.items[c].tokens=this.lexer.blockTokens(i.items[c].text,[]),!i.loose){const l=i.items[c].tokens.filter(m=>m.type==="space"),d=l.length>0&&l.some(m=>this.rules.other.anyLine.test(m.raw));i.loose=d}if(i.loose)for(let c=0;c<i.items.length;c++)i.items[c].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Fa(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(Fa(r,a.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[l]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=tn(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=lc(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),Ua(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Ua(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,c=a,l=0;const d=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(s=d.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){c+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){l+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c+l);const m=[...s[0]][0].length,u=e.slice(0,a+s.index+m+r);if(Math.min(a,r)%2){const b=u.slice(1,-1);return{type:"em",raw:u,text:b,tokens:this.lexer.inlineTokens(b)}}const g=u.slice(2,-2);return{type:"strong",raw:u,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Oe=class xa{constructor(t){V(this,"tokens");V(this,"options");V(this,"state");V(this,"tokenizer");V(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||me,this.options.tokenizer=this.options.tokenizer||new Un,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:ge,block:Fn.normal,inline:en.normal};this.options.pedantic?(n.block=Fn.pedantic,n.inline=en.pedantic):this.options.gfm&&(n.block=Fn.gfm,this.options.breaks?n.inline=en.breaks:n.inline=en.gfm),this.tokenizer.rules=n}static get rules(){return{block:Fn,inline:en}}static lex(t,n){return new xa(n).lex(t)}static lexInline(t,n){return new xa(n).inlineTokens(t)}lex(t){t=t.replace(ge.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(ge.tabCharGlobal,"    ").replace(ge.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(l=>(r=l.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const l=n.at(-1);r.raw.length===1&&l!==void 0?l.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let c=t;if((o=this.options.extensions)!=null&&o.startBlock){let l=1/0;const d=t.slice(1);let m;this.options.extensions.startBlock.forEach(u=>{m=u.call({lexer:this},d),typeof m=="number"&&m>=0&&(l=Math.min(l,m))}),l<1/0&&l>=0&&(c=t.substring(0,l+1))}if(this.state.top&&(r=this.tokenizer.paragraph(c))){const l=n.at(-1);s&&(l==null?void 0:l.type)==="paragraph"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r),s=c.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(t){const l="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,c,l;let s=t,i=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)d.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((c=(r=this.options.extensions)==null?void 0:r.inline)!=null&&c.some(u=>(d=u.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const u=n.at(-1);d.type==="text"&&(u==null?void 0:u.type)==="text"?(u.raw+=d.raw,u.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,s,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let m=t;if((l=this.options.extensions)!=null&&l.startInline){let u=1/0;const g=t.slice(1);let b;this.options.extensions.startInline.forEach(y=>{b=y.call({lexer:this},g),typeof b=="number"&&b>=0&&(u=Math.min(u,b))}),u<1/0&&u>=0&&(m=t.substring(0,u+1))}if(d=this.tokenizer.inlineText(m)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const u=n.at(-1);(u==null?void 0:u.type)==="text"?(u.raw+=d.raw,u.text+=d.text):n.push(d);continue}if(t){const u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return n}},Gn=class{constructor(e){V(this,"options");V(this,"parser");this.options=e||me}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(ge.notSpaceStart))==null?void 0:a[0],i=e.replace(ge.endingNewline,"")+`
`;return s?'<pre><code class="language-'+Ae(s)+'">'+(n?i:Ae(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:Ae(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let s="";for(let o=0;o<e.items.length;o++){const r=e.items[o];s+=this.listitem(r)}const i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){var n;let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+Ae(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){const a=e.rows[i];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ae(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=qa(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+Ae(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=qa(e);if(i===null)return Ae(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Ae(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ae(e.text)}},qs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},qe=class Sa{constructor(t){V(this,"options");V(this,"renderer");V(this,"textRenderer");this.options=t||me,this.options.renderer=this.options.renderer||new Gn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new qs}static parse(t,n){return new Sa(n).parse(t)}static parseInline(t,n){return new Sa(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=r,d=this.options.extensions.renderers[l.type].call({parser:this},l);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=d||"";continue}}const c=r;switch(c.type){case"space":{s+=this.renderer.space(c);continue}case"hr":{s+=this.renderer.hr(c);continue}case"heading":{s+=this.renderer.heading(c);continue}case"code":{s+=this.renderer.code(c);continue}case"table":{s+=this.renderer.table(c);continue}case"blockquote":{s+=this.renderer.blockquote(c);continue}case"list":{s+=this.renderer.list(c);continue}case"html":{s+=this.renderer.html(c);continue}case"paragraph":{s+=this.renderer.paragraph(c);continue}case"text":{let l=c,d=this.renderer.text(l);for(;o+1<t.length&&t[o+1].type==="text";)l=t[++o],d+=`
`+this.renderer.text(l);n?s+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):s+=d;continue}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=l||"";continue}}const c=r;switch(c.type){case"escape":{s+=n.text(c);break}case"html":{s+=n.html(c);break}case"link":{s+=n.link(c);break}case"image":{s+=n.image(c);break}case"strong":{s+=n.strong(c);break}case"em":{s+=n.em(c);break}case"codespan":{s+=n.codespan(c);break}case"br":{s+=n.br(c);break}case"del":{s+=n.del(c);break}case"text":{s+=n.text(c);break}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},zn=(ga=class{constructor(e){V(this,"options");V(this,"block");this.options=e||me}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Oe.lex:Oe.lexInline}provideParser(){return this.block?qe.parse:qe.parseInline}},V(ga,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),ga),dc=class{constructor(...e){V(this,"defaults",He());V(this,"options",this.setOptions);V(this,"parse",this.parseMarkdown(!0));V(this,"parseInline",this.parseMarkdown(!1));V(this,"Parser",qe);V(this,"Renderer",Gn);V(this,"TextRenderer",qs);V(this,"Lexer",Oe);V(this,"Tokenizer",Un);V(this,"Hooks",zn);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const c of r)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const c=o[r].flat(1/0);n=n.concat(this.walkTokens(c,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new Gn(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],c=i[o];i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new Un(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],c=i[o];i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new zn;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],c=i[o];zn.passThroughHooks.has(a)?i[o]=l=>{if(this.defaults.async)return Promise.resolve(r.call(i,l)).then(m=>c.call(i,m));const d=r.call(i,l);return c.call(i,d)}:i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Oe.lex(e,t??this.defaults)}parser(e,t){return qe.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Oe.lex:Oe.lexInline,c=a.hooks?a.hooks.provideParser():e?qe.parse:qe.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(l=>r(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>c(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let l=r(n,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let d=c(l,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(l){return o(l)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+Ae(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},gt=new dc;function F(e,t){return gt.parse(e,t)}F.options=F.setOptions=function(e){return gt.setOptions(e),F.defaults=gt.defaults,mt(F.defaults),F},F.getDefaults=He,F.defaults=me,F.use=function(...e){return gt.use(...e),F.defaults=gt.defaults,mt(F.defaults),F},F.walkTokens=function(e,t){return gt.walkTokens(e,t)},F.parseInline=gt.parseInline,F.Parser=qe,F.parser=qe.parse,F.Renderer=Gn,F.TextRenderer=qs,F.Lexer=Oe,F.lexer=Oe.lex,F.Tokenizer=Un,F.Hooks=zn,F.parse=F,F.options,F.setOptions,F.use,F.walkTokens,F.parseInline,qe.parse,Oe.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Ga,setPrototypeOf:za,isFrozen:uc,getPrototypeOf:pc,getOwnPropertyDescriptor:mc}=Object;let{freeze:fe,seal:Ie,create:Fs}=Object,{apply:Us,construct:Gs}=typeof Reflect<"u"&&Reflect;fe||(fe=function(t){return t}),Ie||(Ie=function(t){return t}),Us||(Us=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),Gs||(Gs=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const Kn=ve(Array.prototype.forEach),gc=ve(Array.prototype.lastIndexOf),Ka=ve(Array.prototype.pop),nn=ve(Array.prototype.push),fc=ve(Array.prototype.splice),Wn=ve(String.prototype.toLowerCase),zs=ve(String.prototype.toString),Ks=ve(String.prototype.match),sn=ve(String.prototype.replace),hc=ve(String.prototype.indexOf),vc=ve(String.prototype.trim),Se=ve(Object.prototype.hasOwnProperty),he=ve(RegExp.prototype.test),an=bc(TypeError);function ve(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return Us(e,t,s)}}function bc(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return Gs(e,n)}}function P(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Wn;za&&za(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(uc(t)||(t[s]=a),i=a)}e[i]=!0}return e}function yc(e){for(let t=0;t<e.length;t++)Se(e,t)||(e[t]=null);return e}function Be(e){const t=Fs(null);for(const[n,s]of Ga(e))Se(e,n)&&(Array.isArray(s)?t[n]=yc(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=Be(s):t[n]=s);return t}function on(e,t){for(;e!==null;){const s=mc(e,t);if(s){if(s.get)return ve(s.get);if(typeof s.value=="function")return ve(s.value)}e=pc(e)}function n(){return null}return n}const Wa=fe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ws=fe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Vs=fe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),wc=fe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Js=fe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),kc=fe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Va=fe(["#text"]),Ja=fe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ys=fe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ya=fe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Vn=fe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),$c=Ie(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ec=Ie(/<%[\w\W]*|[\w\W]*%>/gm),Ic=Ie(/\$\{[\w\W]*/gm),Tc=Ie(/^data-[\-\w.\u00B7-\uFFFF]+$/),_c=Ie(/^aria-[\-\w]+$/),Za=Ie(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),xc=Ie(/^(?:\w+script|data):/i),Sc=Ie(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Xa=Ie(/^html$/i),Cc=Ie(/^[a-z][.\w]*(-[.\w]+)+$/i);var Qa=Object.freeze({__proto__:null,ARIA_ATTR:_c,ATTR_WHITESPACE:Sc,CUSTOM_ELEMENT:Cc,DATA_ATTR:Tc,DOCTYPE_NAME:Xa,ERB_EXPR:Ec,IS_ALLOWED_URI:Za,IS_SCRIPT_OR_DATA:xc,MUSTACHE_EXPR:$c,TMPLIT_EXPR:Ic});const rn={element:1,text:3,progressingInstruction:7,comment:8,document:9},Lc=function(){return typeof window>"u"?null:window},Ac=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},eo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function to(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Lc();const t=S=>to(S);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==rn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:c,NodeFilter:l,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:u,trustedTypes:g}=e,b=c.prototype,y=on(b,"cloneNode"),_=on(b,"remove"),A=on(b,"nextSibling"),R=on(b,"childNodes"),H=on(b,"parentNode");if(typeof o=="function"){const S=n.createElement("template");S.content&&S.content.ownerDocument&&(n=S.content.ownerDocument)}let D,O="";const{implementation:C,createNodeIterator:G,createDocumentFragment:W,getElementsByTagName:j}=n,{importNode:L}=s;let q=eo();t.isSupported=typeof Ga=="function"&&typeof H=="function"&&C&&C.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:J,ERB_EXPR:Y,TMPLIT_EXPR:Le,DATA_ATTR:k,ARIA_ATTR:Qe,IS_SCRIPT_OR_DATA:ue,ATTR_WHITESPACE:pt,CUSTOM_ELEMENT:bg}=Qa;let{IS_ALLOWED_URI:ol}=Qa,re=null;const rl=P({},[...Wa,...Ws,...Vs,...Js,...Va]);let le=null;const ll=P({},[...Ja,...Ys,...Ya,...Vn]);let te=Object.seal(Fs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Pn=null,fa=null;const zt=Object.seal(Fs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let cl=!0,ha=!0,dl=!1,ul=!0,Kt=!1,_s=!0,It=!1,va=!1,ba=!1,Wt=!1,xs=!1,Ss=!1,pl=!0,ml=!1;const yg="user-content-";let ya=!0,Rn=!1,Vt={},Re=null;const wa=P({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let gl=null;const fl=P({},["audio","video","img","source","image","track"]);let ka=null;const hl=P({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Cs="http://www.w3.org/1998/Math/MathML",Ls="http://www.w3.org/2000/svg",et="http://www.w3.org/1999/xhtml";let Jt=et,$a=!1,Ea=null;const wg=P({},[Cs,Ls,et],zs);let As=P({},["mi","mo","mn","ms","mtext"]),Bs=P({},["annotation-xml"]);const kg=P({},["title","style","font","a","script"]);let Nn=null;const $g=["application/xhtml+xml","text/html"],Eg="text/html";let oe=null,Yt=null;const Ig=n.createElement("form"),vl=function(p){return p instanceof RegExp||p instanceof Function},Ia=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Yt&&Yt===p)){if((!p||typeof p!="object")&&(p={}),p=Be(p),Nn=$g.indexOf(p.PARSER_MEDIA_TYPE)===-1?Eg:p.PARSER_MEDIA_TYPE,oe=Nn==="application/xhtml+xml"?zs:Wn,re=Se(p,"ALLOWED_TAGS")?P({},p.ALLOWED_TAGS,oe):rl,le=Se(p,"ALLOWED_ATTR")?P({},p.ALLOWED_ATTR,oe):ll,Ea=Se(p,"ALLOWED_NAMESPACES")?P({},p.ALLOWED_NAMESPACES,zs):wg,ka=Se(p,"ADD_URI_SAFE_ATTR")?P(Be(hl),p.ADD_URI_SAFE_ATTR,oe):hl,gl=Se(p,"ADD_DATA_URI_TAGS")?P(Be(fl),p.ADD_DATA_URI_TAGS,oe):fl,Re=Se(p,"FORBID_CONTENTS")?P({},p.FORBID_CONTENTS,oe):wa,Pn=Se(p,"FORBID_TAGS")?P({},p.FORBID_TAGS,oe):Be({}),fa=Se(p,"FORBID_ATTR")?P({},p.FORBID_ATTR,oe):Be({}),Vt=Se(p,"USE_PROFILES")?p.USE_PROFILES:!1,cl=p.ALLOW_ARIA_ATTR!==!1,ha=p.ALLOW_DATA_ATTR!==!1,dl=p.ALLOW_UNKNOWN_PROTOCOLS||!1,ul=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Kt=p.SAFE_FOR_TEMPLATES||!1,_s=p.SAFE_FOR_XML!==!1,It=p.WHOLE_DOCUMENT||!1,Wt=p.RETURN_DOM||!1,xs=p.RETURN_DOM_FRAGMENT||!1,Ss=p.RETURN_TRUSTED_TYPE||!1,ba=p.FORCE_BODY||!1,pl=p.SANITIZE_DOM!==!1,ml=p.SANITIZE_NAMED_PROPS||!1,ya=p.KEEP_CONTENT!==!1,Rn=p.IN_PLACE||!1,ol=p.ALLOWED_URI_REGEXP||Za,Jt=p.NAMESPACE||et,As=p.MATHML_TEXT_INTEGRATION_POINTS||As,Bs=p.HTML_INTEGRATION_POINTS||Bs,te=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&vl(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(te.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&vl(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(te.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(te.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Kt&&(ha=!1),xs&&(Wt=!0),Vt&&(re=P({},Va),le=[],Vt.html===!0&&(P(re,Wa),P(le,Ja)),Vt.svg===!0&&(P(re,Ws),P(le,Ys),P(le,Vn)),Vt.svgFilters===!0&&(P(re,Vs),P(le,Ys),P(le,Vn)),Vt.mathMl===!0&&(P(re,Js),P(le,Ya),P(le,Vn))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?zt.tagCheck=p.ADD_TAGS:(re===rl&&(re=Be(re)),P(re,p.ADD_TAGS,oe))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?zt.attributeCheck=p.ADD_ATTR:(le===ll&&(le=Be(le)),P(le,p.ADD_ATTR,oe))),p.ADD_URI_SAFE_ATTR&&P(ka,p.ADD_URI_SAFE_ATTR,oe),p.FORBID_CONTENTS&&(Re===wa&&(Re=Be(Re)),P(Re,p.FORBID_CONTENTS,oe)),p.ADD_FORBID_CONTENTS&&(Re===wa&&(Re=Be(Re)),P(Re,p.ADD_FORBID_CONTENTS,oe)),ya&&(re["#text"]=!0),It&&P(re,["html","head","body"]),re.table&&(P(re,["tbody"]),delete Pn.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw an('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw an('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=p.TRUSTED_TYPES_POLICY,O=D.createHTML("")}else D===void 0&&(D=Ac(g,i)),D!==null&&typeof O=="string"&&(O=D.createHTML(""));fe&&fe(p),Yt=p}},bl=P({},[...Ws,...Vs,...wc]),yl=P({},[...Js,...kc]),Tg=function(p){let E=H(p);(!E||!E.tagName)&&(E={namespaceURI:Jt,tagName:"template"});const x=Wn(p.tagName),Q=Wn(E.tagName);return Ea[p.namespaceURI]?p.namespaceURI===Ls?E.namespaceURI===et?x==="svg":E.namespaceURI===Cs?x==="svg"&&(Q==="annotation-xml"||As[Q]):!!bl[x]:p.namespaceURI===Cs?E.namespaceURI===et?x==="math":E.namespaceURI===Ls?x==="math"&&Bs[Q]:!!yl[x]:p.namespaceURI===et?E.namespaceURI===Ls&&!Bs[Q]||E.namespaceURI===Cs&&!As[Q]?!1:!yl[x]&&(kg[x]||!bl[x]):!!(Nn==="application/xhtml+xml"&&Ea[p.namespaceURI]):!1},Ne=function(p){nn(t.removed,{element:p});try{H(p).removeChild(p)}catch{_(p)}},Tt=function(p,E){try{nn(t.removed,{attribute:E.getAttributeNode(p),from:E})}catch{nn(t.removed,{attribute:null,from:E})}if(E.removeAttribute(p),p==="is")if(Wt||xs)try{Ne(E)}catch{}else try{E.setAttribute(p,"")}catch{}},wl=function(p){let E=null,x=null;if(ba)p="<remove></remove>"+p;else{const ne=Ks(p,/^[\r\n\t ]+/);x=ne&&ne[0]}Nn==="application/xhtml+xml"&&Jt===et&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");const Q=D?D.createHTML(p):p;if(Jt===et)try{E=new u().parseFromString(Q,Nn)}catch{}if(!E||!E.documentElement){E=C.createDocument(Jt,"template",null);try{E.documentElement.innerHTML=$a?O:Q}catch{}}const pe=E.body||E.documentElement;return p&&x&&pe.insertBefore(n.createTextNode(x),pe.childNodes[0]||null),Jt===et?j.call(E,It?"html":"body")[0]:It?E.documentElement:pe},kl=function(p){return G.call(p.ownerDocument||p,p,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},Ta=function(p){return p instanceof m&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof d)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},$l=function(p){return typeof r=="function"&&p instanceof r};function tt(S,p,E){Kn(S,x=>{x.call(t,p,E,Yt)})}const El=function(p){let E=null;if(tt(q.beforeSanitizeElements,p,null),Ta(p))return Ne(p),!0;const x=oe(p.nodeName);if(tt(q.uponSanitizeElement,p,{tagName:x,allowedTags:re}),_s&&p.hasChildNodes()&&!$l(p.firstElementChild)&&he(/<[/\w!]/g,p.innerHTML)&&he(/<[/\w!]/g,p.textContent)||p.nodeType===rn.progressingInstruction||_s&&p.nodeType===rn.comment&&he(/<[/\w]/g,p.data))return Ne(p),!0;if(!(zt.tagCheck instanceof Function&&zt.tagCheck(x))&&(!re[x]||Pn[x])){if(!Pn[x]&&Tl(x)&&(te.tagNameCheck instanceof RegExp&&he(te.tagNameCheck,x)||te.tagNameCheck instanceof Function&&te.tagNameCheck(x)))return!1;if(ya&&!Re[x]){const Q=H(p)||p.parentNode,pe=R(p)||p.childNodes;if(pe&&Q){const ne=pe.length;for(let ke=ne-1;ke>=0;--ke){const nt=y(pe[ke],!0);nt.__removalCount=(p.__removalCount||0)+1,Q.insertBefore(nt,A(p))}}}return Ne(p),!0}return p instanceof c&&!Tg(p)||(x==="noscript"||x==="noembed"||x==="noframes")&&he(/<\/no(script|embed|frames)/i,p.innerHTML)?(Ne(p),!0):(Kt&&p.nodeType===rn.text&&(E=p.textContent,Kn([J,Y,Le],Q=>{E=sn(E,Q," ")}),p.textContent!==E&&(nn(t.removed,{element:p.cloneNode()}),p.textContent=E)),tt(q.afterSanitizeElements,p,null),!1)},Il=function(p,E,x){if(pl&&(E==="id"||E==="name")&&(x in n||x in Ig))return!1;if(!(ha&&!fa[E]&&he(k,E))){if(!(cl&&he(Qe,E))){if(!(zt.attributeCheck instanceof Function&&zt.attributeCheck(E,p))){if(!le[E]||fa[E]){if(!(Tl(p)&&(te.tagNameCheck instanceof RegExp&&he(te.tagNameCheck,p)||te.tagNameCheck instanceof Function&&te.tagNameCheck(p))&&(te.attributeNameCheck instanceof RegExp&&he(te.attributeNameCheck,E)||te.attributeNameCheck instanceof Function&&te.attributeNameCheck(E,p))||E==="is"&&te.allowCustomizedBuiltInElements&&(te.tagNameCheck instanceof RegExp&&he(te.tagNameCheck,x)||te.tagNameCheck instanceof Function&&te.tagNameCheck(x))))return!1}else if(!ka[E]){if(!he(ol,sn(x,pt,""))){if(!((E==="src"||E==="xlink:href"||E==="href")&&p!=="script"&&hc(x,"data:")===0&&gl[p])){if(!(dl&&!he(ue,sn(x,pt,"")))){if(x)return!1}}}}}}}return!0},Tl=function(p){return p!=="annotation-xml"&&Ks(p,bg)},_l=function(p){tt(q.beforeSanitizeAttributes,p,null);const{attributes:E}=p;if(!E||Ta(p))return;const x={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:le,forceKeepAttr:void 0};let Q=E.length;for(;Q--;){const pe=E[Q],{name:ne,namespaceURI:ke,value:nt}=pe,Zt=oe(ne),_a=nt;let ce=ne==="value"?_a:vc(_a);if(x.attrName=Zt,x.attrValue=ce,x.keepAttr=!0,x.forceKeepAttr=void 0,tt(q.uponSanitizeAttribute,p,x),ce=x.attrValue,ml&&(Zt==="id"||Zt==="name")&&(Tt(ne,p),ce=yg+ce),_s&&he(/((--!?|])>)|<\/(style|title|textarea)/i,ce)){Tt(ne,p);continue}if(Zt==="attributename"&&Ks(ce,"href")){Tt(ne,p);continue}if(x.forceKeepAttr)continue;if(!x.keepAttr){Tt(ne,p);continue}if(!ul&&he(/\/>/i,ce)){Tt(ne,p);continue}Kt&&Kn([J,Y,Le],Sl=>{ce=sn(ce,Sl," ")});const xl=oe(p.nodeName);if(!Il(xl,Zt,ce)){Tt(ne,p);continue}if(D&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!ke)switch(g.getAttributeType(xl,Zt)){case"TrustedHTML":{ce=D.createHTML(ce);break}case"TrustedScriptURL":{ce=D.createScriptURL(ce);break}}if(ce!==_a)try{ke?p.setAttributeNS(ke,ne,ce):p.setAttribute(ne,ce),Ta(p)?Ne(p):Ka(t.removed)}catch{Tt(ne,p)}}tt(q.afterSanitizeAttributes,p,null)},_g=function S(p){let E=null;const x=kl(p);for(tt(q.beforeSanitizeShadowDOM,p,null);E=x.nextNode();)tt(q.uponSanitizeShadowNode,E,null),El(E),_l(E),E.content instanceof a&&S(E.content);tt(q.afterSanitizeShadowDOM,p,null)};return t.sanitize=function(S){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},E=null,x=null,Q=null,pe=null;if($a=!S,$a&&(S="<!-->"),typeof S!="string"&&!$l(S))if(typeof S.toString=="function"){if(S=S.toString(),typeof S!="string")throw an("dirty is not a string, aborting")}else throw an("toString is not a function");if(!t.isSupported)return S;if(va||Ia(p),t.removed=[],typeof S=="string"&&(Rn=!1),Rn){if(S.nodeName){const nt=oe(S.nodeName);if(!re[nt]||Pn[nt])throw an("root node is forbidden and cannot be sanitized in-place")}}else if(S instanceof r)E=wl("<!---->"),x=E.ownerDocument.importNode(S,!0),x.nodeType===rn.element&&x.nodeName==="BODY"||x.nodeName==="HTML"?E=x:E.appendChild(x);else{if(!Wt&&!Kt&&!It&&S.indexOf("<")===-1)return D&&Ss?D.createHTML(S):S;if(E=wl(S),!E)return Wt?null:Ss?O:""}E&&ba&&Ne(E.firstChild);const ne=kl(Rn?S:E);for(;Q=ne.nextNode();)El(Q),_l(Q),Q.content instanceof a&&_g(Q.content);if(Rn)return S;if(Wt){if(xs)for(pe=W.call(E.ownerDocument);E.firstChild;)pe.appendChild(E.firstChild);else pe=E;return(le.shadowroot||le.shadowrootmode)&&(pe=L.call(s,pe,!0)),pe}let ke=It?E.outerHTML:E.innerHTML;return It&&re["!doctype"]&&E.ownerDocument&&E.ownerDocument.doctype&&E.ownerDocument.doctype.name&&he(Xa,E.ownerDocument.doctype.name)&&(ke="<!DOCTYPE "+E.ownerDocument.doctype.name+`>
`+ke),Kt&&Kn([J,Y,Le],nt=>{ke=sn(ke,nt," ")}),D&&Ss?D.createHTML(ke):ke},t.setConfig=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ia(S),va=!0},t.clearConfig=function(){Yt=null,va=!1},t.isValidAttribute=function(S,p,E){Yt||Ia({});const x=oe(S),Q=oe(p);return Il(x,Q,E)},t.addHook=function(S,p){typeof p=="function"&&nn(q[S],p)},t.removeHook=function(S,p){if(p!==void 0){const E=gc(q[S],p);return E===-1?void 0:fc(q[S],E,1)[0]}return Ka(q[S])},t.removeHooks=function(S){q[S]=[]},t.removeAllHooks=function(){q=eo()},t}var no=to();const Bc="/api";class Dc{constructor(){try{this.token=localStorage.getItem("chaotic_token")}catch(t){console.warn("Failed to access localStorage:",t),this.token=null}}setToken(t){this.token=t;try{t?localStorage.setItem("chaotic_token",t):localStorage.removeItem("chaotic_token")}catch(n){console.warn("Failed to persist token to localStorage:",n)}}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const o=await fetch(`${Bc}${n}`,a);if(o.status===204)return null;let r;try{r=await o.json()}catch{const c=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let c;typeof r.detail=="string"?c=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?c=r.detail.message:c="An error occurred";const l=new Error(c);throw l.status=o.status,l.detail=r.detail,l}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20){return this.request("GET",`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const $=new Dc;window.api=$;let _t=null;function N(){document.getElementById("modal-overlay").classList.remove("hidden")}function K(){var e;ln(),document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide")}function Zs(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function v(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.remove()},3e3)}function ln(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),_t&&(document.removeEventListener("keydown",_t),_t=null)}function Mc(e){_t&&document.removeEventListener("keydown",_t),_t=e,e&&document.addEventListener("keydown",e)}function Xs(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(ln(),document.removeEventListener("click",s,!0))};return setTimeout(()=>document.addEventListener("click",s,!0),0),()=>document.removeEventListener("click",s,!0)}Object.assign(window,{showModal:N,closeModal:K,showToast:v,closeAllDropdowns:ln,registerDropdownClickOutside:Xs});function st(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Fe(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Qs(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ye(e){return typeof e=="string"&&/^#[0-9a-fA-F]{3,8}$/.test(e)?e:"#888888"}function f(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function T(e){return f(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function xt(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function I(e){return e==null?"":String(e).replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$").replace(/'/g,"\\x27").replace(/"/g,"\\x22").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/</g,"\\x3c").replace(/>/g,"\\x3e")}function Jn(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function jc(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Yn(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",s=e==null?void 0:e.avatar_url;return s?jc(s)?`<img class="${t} avatar-img" src="${T(s)}" alt="${T(n)}">`:`<div class="${t} avatar-emoji">${f(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}let St=null,cn=null,dn=null,un=null;function Zn(){St||(St=document.getElementById("auth-screen"),cn=document.getElementById("main-screen"),dn=document.getElementById("login-form"),un=document.getElementById("signup-form"))}function Xn(){Zn(),St&&St.classList.remove("hidden"),cn&&cn.classList.add("hidden")}function so(){Zn(),St&&St.classList.add("hidden"),cn&&cn.classList.remove("hidden")}function io(){Zn(),dn&&dn.classList.remove("hidden"),un&&un.classList.add("hidden")}function ao(){Zn(),dn&&dn.classList.add("hidden"),un&&un.classList.remove("hidden")}async function oo(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await $.login(t,n),window.currentUser=await $.getMe(),window.initApp&&await window.initApp(),v("Welcome back!","success")}catch(s){v(`Login failed: ${s.message}`,"error")}return!1}async function ro(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await $.signup(t,n,s),await $.login(n,s),window.currentUser=await $.getMe(),window.initApp&&await window.initApp(),v("Account created successfully!","success")}catch(i){v(`Signup failed: ${i.message}`,"error")}return!1}function ei(){$.logout(),window.currentUser=null,window.currentTeam=null,Xn(),v("Signed out","success")}function lo(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function co(){const e=window.currentUser;if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?lo(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${T(s)}" alt="${T(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}Object.assign(window,{showAuthScreen:Xn,showMainScreen:so,showLogin:io,showSignup:ao,handleLogin:oo,handleSignup:ro,logout:ei,updateUserInfo:co,isImageAvatar:lo});function uo(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let ti=[],pn=[],po=null,Z=new Set,Ct="list",ft=!1,ni=null;try{const e=localStorage.getItem("chaotic_doc_view_mode");(e==="list"||e==="grid")&&(Ct=e)}catch{}function Pc(e){if(e!=="list"&&e!=="grid")return;Ct=e,e==="grid"&&ft&&Qn();try{localStorage.setItem("chaotic_doc_view_mode",e)}catch{}const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),it()}function mo(){if(Ct!=="list")return;ft=!0,Z.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.onclick=Qn),it(),At()}function Qn(){ft=!1,Z.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.onclick=mo),it(),At()}function Rc(){ni&&clearTimeout(ni),ni=setTimeout(()=>{it()},300)}function Nc(){const e=document.getElementById("doc-search");e&&(e.value=""),it()}async function Hc(){const e=document.getElementById("doc-project-filter");e&&(e.value=""),await si()}async function Oc(){const e=document.getElementById("doc-search"),t=document.getElementById("doc-project-filter");e&&(e.value=""),t&&(t.value=""),await si()}function qc(){var i,a,o;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${f(t)}" <button class="chip-clear" onclick="clearDocSearch()">×</button></span>`),n){const r=document.getElementById("doc-project-filter"),c=((o=r==null?void 0:r.options[r.selectedIndex])==null?void 0:o.text)||"Project";s.push(`<span class="filter-chip">Project: ${f(c)} <button class="chip-clear" onclick="clearDocProjectFilter()">×</button></span>`)}if(s.length>0){let r=s.join(" ");s.length>1&&(r+=' <button class="btn btn-secondary btn-tiny" onclick="clearAllDocFilters()">Clear all</button>'),e.innerHTML=r,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function it(){var n,s,i;const e=((s=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:s.toLowerCase())||"",t=((i=document.getElementById("doc-sort"))==null?void 0:i.value)||"updated_desc";qc(),pn=ti.filter(a=>{var o,r;if(e){const c=(o=a.title)==null?void 0:o.toLowerCase().includes(e),l=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!c&&!l)return!1}return!0}),pn.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),go("",Ct)}async function si(){var n,s;const e=po||((n=window.currentTeam)==null?void 0:n.id);if(!e)return;const t=((s=document.getElementById("doc-project-filter"))==null?void 0:s.value)||null;try{ti=await $.getDocuments(e,t),it()}catch(i){v(i.message,"error")}}async function Lt(e,t=null){var n;if(e||(e=(n=window.currentTeam)==null?void 0:n.id),!!e){if(po=e,t===null){const s=document.getElementById("doc-project-filter");s!=null&&s.value&&(t=s.value)}try{ti=await $.getDocuments(e,t);const s=document.getElementById("doc-view-list"),i=document.getElementById("doc-view-grid");s&&i&&(s.classList.toggle("active",Ct==="list"),i.classList.toggle("active",Ct==="grid")),it()}catch(s){v(s.message,"error")}}}function Fc(e){return!e||e.length===0?"":e.map(t=>`<span class="badge" style="background-color: ${ye(t.color)}; color: white;">${f(t.name)}</span>`).join(" ")}function Uc(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Fc(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${T(e.id)}" onclick="viewDocument('${I(e.id)}')">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${f(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${f(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?f(uo(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${f(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Gc(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,3).map(r=>`<span class="badge badge-small" style="background-color: ${ye(r.color)}; color: white;">${f(r.name)}</span>`).join(" ")+(e.labels.length>3?` <span class="text-muted">+${e.labels.length-3}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?uo(e.content).substring(0,80):"No content",i=ft?`<div class="document-list-checkbox" onclick="event.stopPropagation(); toggleDocSelection('${I(e.id)}')">
         <input type="checkbox" id="doc-check-${e.id}" ${Z.has(e.id)?"checked":""}>
       </div>`:"",a=ft&&Z.has(e.id)?" selected":"",o=ft?`toggleDocSelection('${I(e.id)}')`:`viewDocument('${I(e.id)}')`;return`
    <div class="list-item document-list-item${a}" onclick="${o}">
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
  `}function go(e="",t="list"){var l,d;const n=document.getElementById("documents-list");if(!n)return;Z.clear(),At();const s=pn;if(s.length===0){const m=(l=document.getElementById("doc-search"))==null?void 0:l.value,u=(d=document.getElementById("doc-project-filter"))==null?void 0:d.value,g=m||u;n.innerHTML=`
      <div class="empty-state">
        <h3>${g?"No documents match your filters":"No documents yet"}</h3>
        <p>${g?"Try different search terms or filters":"Create your first document to get started"}</p>
      </div>
    `;return}const i=t==="grid"?Uc:Gc,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=window.getProjects?window.getProjects():[];s.forEach(m=>{let u,g;if(e==="project")if(u=m.project_id||"__global__",u==="__global__")g="Global (Team-wide)";else{const b=r.find(y=>y.id===m.project_id);g=b?b.name:"Unknown Project"}else e==="sprint"&&(u=m.sprint_id||"__no_sprint__",g=m.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:g,docs:[]}),o[u].docs.push(m)});let c="";for(const[m,u]of Object.entries(o)){const g=t==="grid"?"doc-group-content grid":"doc-group-content";c+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${f(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${g}">
          ${u.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=c}function zc(e){Z.has(e)?Z.delete(e):Z.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=Z.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",Z.has(e)),At()}function Kc(){pn.forEach(e=>Z.add(e.id)),pn.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),At()}function fo(){Z.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),Z.clear(),At()}function At(){const e=document.getElementById("doc-bulk-actions");e&&(ft?(e.classList.remove("hidden"),Z.size>0?e.innerHTML=`
        <span class="bulk-count">${Z.size} selected</span>
        <button class="btn btn-secondary btn-small" onclick="showBulkMoveModal()">Move to Project</button>
        <button class="btn btn-danger btn-small" onclick="bulkDeleteDocuments()">Delete</button>
        <button class="btn btn-secondary btn-small" onclick="selectAllDocs()">Select All</button>
        <button class="btn btn-secondary btn-small" onclick="clearDocSelection()">Clear</button>
        <button class="btn btn-secondary btn-small" onclick="exitSelectionMode()">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" onclick="selectAllDocs()">Select All</button>
        <button class="btn btn-secondary btn-small" onclick="exitSelectionMode()">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function Wc(){if(Z.size===0){v("No documents selected","error");return}const t=(window.getProjects?window.getProjects():[]).map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${Z.size} Document${Z.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleBulkMove(event)">
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
  `,N()}async function Vc(e){var o;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(Z);let s=0,i=0;for(const r of n)try{await $.updateDocument(r,{project_id:t}),s++}catch(c){console.error(`Failed to move document ${r}:`,c),i++}K(),fo(),i===0?v(`Moved ${s} document${s>1?"s":""}!`,"success"):v(`Moved ${s}, failed ${i}`,"warning");const a=(o=window.currentTeam)==null?void 0:o.id;return await Lt(a),!1}async function Jc(){var a;if(Z.size===0){v("No documents selected","error");return}const e=Z.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(Z);let n=0,s=0;for(const o of t)try{await $.deleteDocument(o),n++}catch(r){console.error(`Failed to delete document ${o}:`,r),s++}Qn(),s===0?v(`Deleted ${n} document${n>1?"s":""}!`,"success"):v(`Deleted ${n}, failed ${s}`,"warning");const i=(a=window.currentTeam)==null?void 0:a.id;await Lt(i)}async function Ce(e,t=!0){try{const n=await $.getDocument(e);t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");const i=window.renderMarkdown||(g=>f(g));let a="";try{const g=await $.getDocumentIssues(n.id);g.length>0?a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <div class="linked-items-list">${g.map(y=>`
          <div class="linked-item">
            <span class="linked-item-id">${f(y.identifier)}</span>
            <span class="linked-item-title">${f(y.title)}</span>
            <button class="btn btn-danger btn-tiny" onclick="unlinkDocumentFromIssue('${I(n.id)}', '${I(y.id)}')" title="Unlink">×</button>
          </div>
        `).join("")}</div>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${I(n.id)}')">+ Link Issue</button>
          </div>
        `:a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${I(n.id)}')">+ Link Issue</button>
          </div>
        `}catch{}let o="";try{const g=await $.getDocumentComments(n.id);o=`
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${g.length===0?'<div class="comments-empty">No comments yet</div>':g.map(y=>{var _,A;return`
            <div class="comment" data-comment-id="${T(y.id)}">
              <div class="comment-avatar">${((A=(_=y.author_name)==null?void 0:_.charAt(0))==null?void 0:A.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${f(y.author_name||"Unknown")}</span>
                  <span class="comment-date">${xt(y.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${i(y.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form" onsubmit="return handleAddDocumentComment(event, '${I(n.id)}')">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="3"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(g){console.error("Failed to load comments:",g)}let r=null,c=null;if(n.project_id){const b=(window.getProjects?window.getProjects():[]).find(y=>y.id===n.project_id);if(r=b?b.name:null,n.sprint_id)try{const y=await $.getSprint(n.sprint_id);c=y?y.name:null}catch{}}let l="";r?(l=`<span class="badge badge-primary">${f(r)}</span>`,c&&(l+=` <span class="badge badge-info">${f(c)}</span>`)):l='<span class="badge badge-secondary">Global</span>';let d="";n.labels&&n.labels.length>0?d=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <div class="document-labels">${n.labels.map(b=>`
        <span class="label-badge" style="background-color: ${ye(b.color)}; color: white;">
          ${f(b.name)}
          <button class="btn-remove-label" onclick="removeLabelFromDoc('${I(n.id)}', '${I(b.id)}')" title="Remove label">×</button>
        </span>
      `).join(" ")}</div>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${I(n.id)}')">+ Add Label</button>
        </div>
      `:d=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${I(n.id)}')">+ Add Label</button>
        </div>
      `;let m=n.content||"";const u=m.match(/^\s*#\s+(.+?)(\n|$)/);u&&u[1].trim()===n.title.trim()&&(m=m.replace(/^\s*#\s+.+?\n?/,"").trimStart()),s.querySelector("#document-detail-content").innerHTML=`
      <div class="back-button" onclick="navigateTo('documents')">
        ← Back to Documents
      </div>
      <div class="document-detail-header">
        <div class="document-detail-header-top">
          <div>
            <h2 class="document-title">${f(n.title)}</h2>
            <div class="document-meta">
              ${l}${n.author_name?` · By ${f(n.author_name)}`:""} · Last updated ${new Date(n.updated_at).toLocaleString()}
            </div>
          </div>
          <div class="document-actions">
            <button class="btn btn-secondary btn-small" onclick="showEditDocumentModal('${I(n.id)}')">Edit</button>
            <button class="btn btn-danger btn-small" onclick="deleteDocument('${I(n.id)}')">Delete</button>
          </div>
        </div>
      </div>
      <div class="document-content markdown-body">${m?i(m):"No content"}</div>
      ${d}
      ${a}
      ${o}
    `}catch(n){v(n.message,"error")}}async function ii(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await $.getSprints(t);let o=n;if(s&&!n){const c=a.find(l=>l.status==="active");c&&(o=c.id)}const r=a.map(c=>`<option value="${c.id}" ${c.id===o?"selected":""}>${f(c.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function ai(){const e=window.getProjects?window.getProjects():[],t=window.getSavedProjectId?window.getSavedProjectId():"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${f(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
  `,N(),t&&await ii("doc-sprint",t,null,!0)}async function Yc(e){var a;e.preventDefault();const t=(a=window.currentTeam)==null?void 0:a.id;if(!t)return v("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{await $.createDocument(t,i),await Lt(t),K(),v("Document created!","success")}catch(o){v(o.message,"error")}return!1}async function Zc(e){try{const t=await $.getDocument(e),s=(window.getProjects?window.getProjects():[]).map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${f(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
      <form onsubmit="return handleUpdateDocument(event, '${I(e)}')">
        <div class="form-group">
          <label for="edit-doc-title">Title</label>
          <input type="text" id="edit-doc-title" value="${T(t.title)}" required>
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
          <textarea id="edit-doc-content" style="min-height: 200px">${f(t.content||"")}</textarea>
        </div>
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${T(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,N(),t.project_id&&await ii("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){v(t.message,"error")}}async function Xc(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await $.updateDocument(t,i),K(),await Ce(t),v("Document updated!","success")}catch(a){v(a.message,"error")}return!1}async function Qc(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await $.deleteDocument(e);const n=(t=window.currentTeam)==null?void 0:t.id;await Lt(n),window.navigateTo&&window.navigateTo("documents"),v("Document deleted!","success")}catch(n){v(n.message,"error")}}function ed(e,t){ii(e,t)}async function td(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleLinkIssue(event, '${I(e)}')">
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToLink(this.value, '${I(e)}')">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,N()}async function nd(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=window.currentTeam)==null?void 0:s.id,a=await $.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" onclick="linkToIssue('${I(t)}', '${I(o.id)}')">
        <span class="link-result-id">${f(o.identifier)}</span>
        <span class="link-result-title">${f(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function sd(e,t){try{await $.linkDocumentToIssue(e,t),K(),v("Issue linked!","success"),await Ce(e,!1)}catch(n){v(n.message,"error")}}async function id(e,t){if(confirm("Unlink this issue from the document?"))try{await $.unlinkDocumentFromIssue(e,t),v("Issue unlinked!","success"),await Ce(e,!1)}catch(n){v(n.message,"error")}}async function ad(e,t){e.preventDefault();const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return v("Please enter a comment","error"),!1;try{await $.createDocumentComment(t,s),n.value="",v("Comment added!","success"),await Ce(t,!1)}catch(i){v(i.message,"error")}return!1}async function od(e){var n;const t=(n=window.currentTeam)==null?void 0:n.id;if(!t){v("No team selected","error");return}try{const s=await $.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,N();return}const i=s.map(a=>`
      <div class="label-select-item" onclick="addLabelToDoc('${I(e)}', '${I(a.id)}')" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ye(a.color)}; color: white;">${f(a.name)}</span>
        ${a.description?`<span class="text-muted">${f(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,N()}catch(s){v(s.message,"error")}}async function rd(e,t){try{await $.addLabelToDocument(e,t),K(),v("Label added!","success"),await Ce(e,!1)}catch(n){v(n.message,"error")}}async function ld(e,t){try{await $.removeLabelFromDocument(e,t),v("Label removed!","success"),await Ce(e,!1)}catch(n){v(n.message,"error")}}Object.assign(window,{loadDocuments:Lt,filterDocuments:it,renderDocuments:go,viewDocument:Ce,showCreateDocumentModal:ai,handleCreateDocument:Yc,showEditDocumentModal:Zc,handleUpdateDocument:Xc,deleteDocument:Qc,updateDocSprintDropdown:ed,showLinkIssueModal:td,searchIssuesToLink:nd,linkToIssue:sd,unlinkDocumentFromIssue:id,toggleDocSelection:zc,selectAllDocs:Kc,clearDocSelection:fo,showBulkMoveModal:Wc,handleBulkMove:Vc,bulkDeleteDocuments:Jc,handleAddDocumentComment:ad,showAddLabelToDocModal:od,addLabelToDoc:rd,removeLabelFromDoc:ld,setDocViewMode:Pc,enterSelectionMode:mo,exitSelectionMode:Qn,debounceDocSearch:Rc,clearDocSearch:Nc,clearDocProjectFilter:Hc,clearAllDocFilters:Oc,onDocProjectFilterChange:si});let mn=[];function cd(){return mn}function dd(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function ho(e){const t=e==null?void 0:e.avatar_url,n=T((e==null?void 0:e.name)||"Agent");return t?dd(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${T(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${f(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function ud(e){var t;if(e||(e=(t=window.currentTeam)==null?void 0:t.id),!!e)try{mn=await $.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(n){console.error("Failed to load team agents:",n)}}async function oi(e){var t;if(e||(e=(t=window.currentTeam)==null?void 0:t.id),!!e)try{mn=await $.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),vo()}catch(n){v(n.message,"error")}}function vo(){const e=document.getElementById("agents-list");if(e){if(mn.length===0){e.innerHTML='<p class="empty-state">No agents yet. Create an agent to enable CLI automation with its own identity.</p>';return}e.innerHTML=mn.map(t=>{const n=f(t.name),s=f(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${ho(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${Qs(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" onclick="deleteAgent('${I(t.id)}', '${I(t.name||"Agent")}')">Delete</button>
      </div>
    `}).join("")}}function bo(){const e=window.projects||[];document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),N()}async function pd(e){var o,r,c;e.preventDefault();const t=(o=window.currentTeam)==null?void 0:o.id;if(!t)return v("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value;try{let l;i&&a?l=await $.createProjectAgent(a,n,s):l=await $.createTeamAgent(t,n,s),K();const d=f(l.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
      <div class="api-key-created">
        <p class="warning-text">Copy the agent's API key now. You won't be able to see it again!</p>
        <div class="api-key-display">
          <code id="new-agent-key">${d}</code>
          <button type="button" class="btn btn-secondary" onclick="copyAgentKey()">Copy</button>
        </div>
        <div class="api-key-instructions">
          <p>Configure the CLI to use this agent:</p>
          <code>chaotic auth set-key ${d}</code>
        </div>
        <button type="button" class="btn btn-primary" onclick="closeModal(); loadAgents();">Done</button>
      </div>
    `,N()}catch(l){v(`Failed to create agent: ${l.message}`,"error")}return!1}function md(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{v("Agent API key copied to clipboard","success")}).catch(()=>{v("Failed to copy","error")})}async function gd(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await $.deleteAgent(e),v("Agent deleted","success"),oi()}catch(n){v(`Failed to delete agent: ${n.message}`,"error")}}Object.assign(window,{loadTeamAgentsQuiet:ud,loadAgents:oi,renderAgents:vo,showCreateAgentModal:bo,handleCreateAgent:pd,copyAgentKey:md,deleteAgent:gd,renderAgentAvatar:ho});let es=[],gn=[],ri=[],li=[];function yo(){return es}function Bt(){return gn}function fd(e){gn=e}async function ts(){try{es=await $.getMyTeams(),wo()}catch(e){v(e.message,"error")}}function wo(){const e=document.getElementById("team-list");es.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=es.map(t=>`
            <button class="dropdown-item" data-team-json="${T(JSON.stringify(t))}" onclick="selectTeam(JSON.parse(this.dataset.teamJson))">${f(t.name)}</button>
        `).join("")}async function ci(e,t=!1){window.currentTeam=e,document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const s=document.getElementById("team-description-text");s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),window.connectWebSocket&&window.connectWebSocket(e.id),await Promise.all([window.loadProjects?window.loadProjects():Promise.resolve(),window.loadLabels?window.loadLabels():Promise.resolve(),$o(),window.loadTeamAgentsQuiet?window.loadTeamAgentsQuiet():Promise.resolve()]),t?window.handleRoute&&window.handleRoute():window.navigateTo&&window.navigateTo(window.currentView)}function di(){document.getElementById("team-dropdown").classList.toggle("hidden")}function ko(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function $o(){if(window.currentTeam)try{gn=await $.getTeamMembers(window.currentTeam.id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(e){console.error("Failed to load team members:",e)}}async function ui(){if(window.currentTeam)try{gn=await $.getTeamMembers(window.currentTeam.id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),Eo()}catch(e){v(e.message,"error")}}function Eo(){const e=document.getElementById("team-members-list");e.innerHTML=gn.map(t=>`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar">${(t.user_name||"U").charAt(0).toUpperCase()}</div>
                <div class="member-details">
                    <span class="member-name">${f(t.user_name||"Unknown")}</span>
                    <span class="member-email">${f(t.user_email||"")}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role">${t.role}</span>
                ${t.user_id!==window.currentUser.id&&t.role!=="owner"?`
                    <button class="btn btn-danger btn-small" onclick="removeMember('${I(t.user_id)}')">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function ns(){if(window.currentTeam)try{ri=await $.getTeamInvitations(window.currentTeam.id),Io()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function Io(){const e=document.getElementById("team-invitations-list");if(ri.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=ri.map(t=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${f(t.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${f(t.role)}</span>
                    <span>Expires: ${new Date(t.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" onclick="deleteInvitation('${I(t.id)}')">Cancel</button>
        </div>
    `).join("")}async function To(){if(window.currentTeam)try{li=await $.getTeamAgents(window.currentTeam.id),_o()}catch(e){v(e.message,"error")}}function _o(){const e=document.getElementById("team-agents-list");if(e){if(li.length===0){e.innerHTML=`<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" onclick="navigateTo('settings'); return false;">Create an agent</a> to enable CLI automation with its own identity.</p></div>`;return}e.innerHTML=li.map(t=>{const n=f(t.name),s=f(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
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
      `}).join("")}}function pi(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,N()}async function hd(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await $.createInvitation(window.currentTeam.id,t,n),await ns(),K(),v("Invitation sent!","success")}catch(s){v(`Failed to send invitation: ${s.message}`,"error")}return!1}async function vd(e){if(confirm("Are you sure you want to remove this member?"))try{await $.removeMember(window.currentTeam.id,e),await ui(),v("Member removed!","success")}catch(t){v(`Failed to remove member: ${t.message}`,"error")}}async function bd(e){try{await $.deleteInvitation(window.currentTeam.id,e),await ns(),v("Invitation canceled!","success")}catch(t){v(`Failed to cancel invitation: ${t.message}`,"error")}}function mi(){di(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,N()}function xo(){window.currentTeam&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateTeam(event)">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${T(window.currentTeam.name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${T(window.currentTeam.key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${f(window.currentTeam.description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,N())}async function yd(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await $.createTeam(t);await ts(),await ci(n),K(),v("Team created!","success")}catch(n){v(`Failed to create team: ${n.message}`,"error")}return!1}async function wd(e){if(e.preventDefault(),!window.currentTeam)return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await $.updateTeam(window.currentTeam.id,t);window.currentTeam=n,document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await ts(),K(),v("Team updated!","success")}catch(n){v(`Failed to update team: ${n.message}`,"error")}return!1}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),Object.assign(window,{loadTeams:ts,renderTeamList:wo,selectTeam:ci,toggleTeamDropdown:di,toggleUserDropdown:ko,loadTeamMembersQuiet:$o,loadTeamMembers:ui,renderTeamMembers:Eo,loadTeamInvitations:ns,renderTeamInvitations:Io,loadTeamAgents:To,renderTeamAgents:_o,showInviteModal:pi,handleInvite:hd,removeMember:vd,deleteInvitation:bd,showCreateTeamModal:mi,showEditTeamModal:xo,handleCreateTeam:yd,handleUpdateTeam:wd,getTeams:yo,getMembers:Bt,setMembers:fd});let ee=[];const fn={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function se(){return ee}function kd(e){ee=e}function hn(e){const t=ee.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return fn[n]||fn.fibonacci}function vn(e,t){if(!e)return"No estimate";const s=hn(t).find(i=>i.value===e);return s?s.label:`${e} points`}function So(e){const t=ee.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(fn[n]||fn.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function we(){if(window.currentTeam)try{ee=await $.getProjects(window.currentTeam.id),Co()}catch(e){v(e.message,"error")}}function Co(){const e=document.getElementById("project-filter"),t=document.getElementById("sprint-project-filter"),n=document.getElementById("board-project-filter"),s=document.getElementById("doc-project-filter"),i=document.getElementById("dashboard-project-filter"),a=e==null?void 0:e.value,o=t==null?void 0:t.value,r=n==null?void 0:n.value,c=s==null?void 0:s.value,l=i==null?void 0:i.value,d='<option value="">All Projects</option>'+ee.map(g=>`<option value="${g.id}">${f(g.name)}</option>`).join(""),m='<option value="">Select Project</option>'+ee.map(g=>`<option value="${g.id}">${f(g.name)}</option>`).join(""),u=bn();if(e){e.innerHTML=d;let g=a;if(!g||!ee.some(b=>b.id===g))if(u&&ee.some(b=>b.id===u))g=u;else{const y=new URLSearchParams(window.location.search).get("project");y&&ee.some(_=>_.id===y)?g=y:ee.length>0&&(g=ee[0].id)}g&&(e.value=g,localStorage.setItem("chaotic_last_project",g))}if(t){t.innerHTML=m;const g=o||u;g&&ee.some(b=>b.id===g)&&(t.value=g)}if(n){n.innerHTML=m;const g=r||u;g&&ee.some(b=>b.id===g)&&(n.value=g)}if(s){s.innerHTML=d;const g=c||u;g&&ee.some(b=>b.id===g)&&(s.value=g)}if(i){i.innerHTML=d;const g=l||u;g&&ee.some(b=>b.id===g)&&(i.value=g)}}function bn(){return localStorage.getItem("chaotic_last_project")}function ht(e){if(!e)return;localStorage.setItem("chaotic_last_project",e),["project-filter","board-project-filter","sprint-project-filter"].forEach(n=>{const s=document.getElementById(n);s&&(s.value=e)})}function Dt(){const e=document.getElementById("projects-list");if(ee.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create your first project to get started</p>
            </div>
        `;return}e.innerHTML=ee.map(t=>`
        <div class="grid-item" onclick="viewProject('${I(t.id)}')">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${ye(t.color)}20; color: ${ye(t.color)}">
                    ${f(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${f(t.name)}</div>
                <button class="grid-item-edit" onclick="event.stopPropagation(); viewProjectSettings('${I(t.id)}')" title="Project settings">
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
    `).join("")}function $d(e){ht(e),window.navigateTo&&window.navigateTo("issues")}function gi(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,N()}async function Ed(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await $.createProject(window.currentTeam.id,t),await we(),Dt(),K(),v("Project created!","success")}catch(n){v(`Failed to create project: ${n.message}`,"error")}return!1}function Id(e){const t=ee.find(s=>s.id===e);if(!t)return;const n=[{value:"fibonacci",label:"Fibonacci (1, 2, 3, 5, 8, 13, 21)"},{value:"linear",label:"Linear (1-10)"},{value:"powers_of_2",label:"Powers of 2 (1, 2, 4, 8, 16, 32, 64)"},{value:"tshirt",label:"T-Shirt (XS, S, M, L, XL)"}];document.getElementById("modal-title").textContent="Edit Project",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateProject(event, '${I(t.id)}')">
            <div class="form-group">
                <label for="project-name">Name</label>
                <input type="text" id="project-name" value="${T(t.name)}" required>
            </div>
            <div class="form-group">
                <label for="project-key">Key</label>
                <input type="text" id="project-key" value="${t.key}" disabled class="input-disabled">
                <small class="form-hint">Project key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="project-description">Description</label>
                <textarea id="project-description">${f(t.description||"")}</textarea>
            </div>
            <div class="form-group">
                <label for="project-color">Color</label>
                <input type="color" id="project-color" value="${ye(t.color)}">
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
                <button type="button" class="btn btn-danger-outline" onclick="confirmDeleteProject('${I(t.id)}')">Delete Project</button>
            </div>
        </form>
    `,N()}async function Td(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await $.updateProject(t,n),await we(),Dt(),K(),v("Project updated!","success")}catch(s){v(`Failed to update project: ${s.message}`,"error")}return!1}async function _d(e){const t=ee.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await $.deleteProject(e),await we(),Dt(),K(),v("Project deleted","success")}catch(n){v(`Failed to delete project: ${n.message}`,"error")}}let be=null;async function Lo(e){be=e,ee.length===0&&await we();const t=ee.find(n=>n.id===e);if(!t){v("Project not found","error"),window.navigateTo("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Ao("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Ao(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Ue||Ue.length===0)&&Mt()}function Bo(){be=null,Ue=[]}function Do(e){be=e}function Mo(){return Ue}async function xd(){if(!be)return;const e=document.getElementById("ps-name").value.trim();if(!e){v("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await $.updateProject(be,t),await we(),v("Settings saved","success");const n=ee.find(s=>s.id===be);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){v(n.message,"error")}}async function Sd(){if(!be)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await $.updateProject(be,n),await we(),v("Settings saved","success")}catch(s){v(`Failed to save settings: ${s.message}`,"error")}}let Ue=[];async function Mt(){if(be)try{Ue=await $.getRituals(be),Cd(),typeof window._onRitualsChanged=="function"&&window._onRitualsChanged()}catch(e){v(e.message,"error")}}function Cd(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Ue.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=Ue.filter(s=>s.trigger==="ticket_close"),n=Ue.filter(s=>s.trigger==="ticket_claim");jt("ps-sprint-rituals-list",e,"sprint"),jt("ps-close-rituals-list",t,"close"),jt("ps-claim-rituals-list",n,"claim")}function jt(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>T(a||"auto");s.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${f(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${i(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${f(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(a.prompt):f(a.prompt)}</div>
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
        <button class="btn btn-secondary btn-small" onclick="showEditProjectRitualModal('${I(a.id)}')">Edit</button>
        <button class="btn btn-danger btn-small" data-ritual-id="${T(a.id)}" data-ritual-name="${T(a.name)}" onclick="deleteProjectRitual(this.dataset.ritualId, this.dataset.ritualName)">Delete</button>
      </div>
    </div>
  `}).join("")}async function Ld(e){if(!be)return;let t=[];try{t=await $.getRitualGroups(be)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
          ${t.map(n=>`<option value="${T(n.id)}" data-mode="${T(n.selection_mode)}">${f(n.name)} (${f(n.selection_mode)})</option>`).join("")}
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
  `,N()}function Ad(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Bd(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),s=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),s.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),s.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),s.classList.add("hidden")}async function jo(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw v("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await $.createRitualGroup(be,{name:t,selection_mode:n})).id}return e.value||null}async function Dd(e){e.preventDefault();let t;try{t=window.collectConditions?window.collectConditions():null}catch{return!1}let n;try{n=await jo()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){s.group_id=n;const i=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&i.value&&(s.weight=parseFloat(i.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(s.percentage=parseFloat(a.value))}try{await $.createRitual(be,s),await Mt(),K(),v("Ritual created!","success")}catch(i){v(`Failed to create ritual: ${i.message}`,"error")}return!1}async function Md(e){const t=Ue.find(o=>o.id===e);if(!t)return;let n=[];try{n=await $.getRitualGroups(be)}catch{}const s=n.find(o=>o.id===t.group_id),i=s&&s.selection_mode==="random_one",a=s&&s.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleUpdateProjectRitual(event, '${I(e)}')">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${T(t.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${f(t.prompt)}</textarea>
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
          ${n.map(o=>`<option value="${T(o.id)}" data-mode="${T(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${f(o.name)} (${f(o.selection_mode)})</option>`).join("")}
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
  `,N()}async function jd(e,t){e.preventDefault();let n;try{n=window.collectConditions?window.collectConditions():null}catch{return!1}let s;try{s=await jo()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:s||""};if(s){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await $.updateRitual(t,i),await Mt(),K(),v("Ritual updated!","success")}catch(a){v(`Failed to update ritual: ${a.message}`,"error")}return!1}async function Pd(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await $.deleteRitual(e),await Mt(),v("Ritual deleted","success")}catch(n){v(`Failed to delete ritual: ${n.message}`,"error")}}Object.assign(window,{loadProjects:we,updateProjectFilters:Co,getSavedProjectId:bn,setGlobalProjectSelection:ht,renderProjects:Dt,viewProject:$d,showCreateProjectModal:gi,handleCreateProject:Ed,viewProjectSettings:Lo,switchProjectSettingsTab:Ao,saveProjectSettingsGeneral:xd,saveProjectSettingsRules:Sd,clearProjectSettingsState:Bo,showEditProjectModal:Id,handleUpdateProject:Td,confirmDeleteProject:_d,getEstimateOptions:hn,formatEstimate:vn,getEstimateScaleHint:So,getProjects:se,setProjects:kd,ESTIMATE_SCALES:fn,showCreateProjectRitualModal:Ld,handleCreateProjectRitual:Dd,showEditProjectRitualModal:Md,handleUpdateProjectRitual:jd,deleteProjectRitual:Pd,setCurrentSettingsProjectId:Do,getProjectRituals:Mo,loadProjectSettingsRituals:Mt,onRitualGroupChange:Bd});const ss={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},is={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Po=0;function Rd(e){Po=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=Ro(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" onclick="addConditionRow()">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Ro(e="",t="",n=""){const s=Po++,i=Object.keys(ss).map(l=>`<option value="${l}" ${l===e?"selected":""}>${l}</option>`).join(""),o=(e?ss[e]:ss.estimate).map(l=>`<option value="${l}" ${l===t?"selected":""}>${is[l]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",c=t==="isnull";return`
        <div class="condition-row" id="condition-row-${s}">
            <select class="condition-field" onchange="updateOperatorOptions(${s})">
                <option value="">Select field...</option>
                ${i}
            </select>
            <select class="condition-operator" id="condition-operator-${s}" onchange="toggleValueInput(${s})">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${s}" value="${T(String(r))}" placeholder="Value"${c?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" onclick="removeConditionRow(${s})">&times;</button>
        </div>
    `}function Nd(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Ro()),as()}function Hd(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),as()}function Od(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=ss[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${is[o]}</option>`).join(""),No(e),as()}function No(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function yn(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function as(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function qd(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,c=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,l=o.querySelector(".condition-value");let d=(a=l==null?void 0:l.value)==null?void 0:a.trim();if(!r&&!c)continue;if(!r)throw yn("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!c)throw yn("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const m=`${r}__${c}`;if(n.has(m))throw yn(`Duplicate condition: ${r} ${is[c]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${m}`);if(n.add(m),c==="isnull")t[m]=!0;else if(c==="in"||c==="contains")t[m]=d?d.split(",").map(u=>u.trim()).filter(u=>u):[];else if(c==="gte"||c==="lte"){if(!d)throw yn(`Please enter a numeric value for ${r} ${is[c]}.`),new Error(`Missing numeric value for ${m}`);const u=parseInt(d,10);if(isNaN(u))throw yn(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${m}: ${d}`);t[m]=u}else t[m]=d}return as(),Object.keys(t).length>0?t:null}Object.assign(window,{renderConditionBuilder:Rd,addConditionRow:Nd,removeConditionRow:Hd,updateOperatorOptions:Od,toggleValueInput:No,collectConditions:qd});let Te={...{currentUser:null,currentView:"my-issues",issues:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null}};const Fd=new Set;function at(e,t){if(typeof e=="string"){const n=Te[e];Te[e]=t,Ho(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=Te[s];Te[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{Ho(s,i,a)})}}function Ho(e,t,n){t!==n&&Fd.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const fi=()=>Te.currentUser,Ud=e=>at("currentUser",e),U=()=>Te.currentView,Gd=e=>at("currentView",e),De=()=>Te.issues,Ge=e=>at("issues",e),Oo=()=>Te.activeFilterCategory,zd=e=>at("activeFilterCategory",e),Kd=()=>Te.selectedIssueIndex,qo=e=>at("selectedIssueIndex",e),Wd=()=>Te.pendingGates,Vd=e=>at("pendingGates",e),Jd=()=>Te.searchDebounceTimer,Yd=e=>at("searchDebounceTimer",e),Zd=()=>Te.websocket,Fo=e=>at("websocket",e);function vt(){const t=new URLSearchParams(window.location.search).get("project");return t||bn()}function os(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}let Pt=[],rs={},ls=new Set,ze=null,Uo=null,hi=[],wn=[],vi=[];function Xd(){return rs}function Qd(){return ze}function Go(){const e=document.getElementById("sprint-project-filter");if(e){if(!e.value){const t=vt();t&&se().some(n=>n.id===t)&&(e.value=t)}e.value?Ke(e.value):document.getElementById("sprints-list").innerHTML=`
            <div class="empty-state">
                <h3>Select a project</h3>
                <p>Choose a project to view its sprints</p>
            </div>
        `}}function eu(){const e=document.getElementById("sprint-project-filter").value;e&&(ht(e),os(e)),Ke(e)}async function Ke(e){const t=e||document.getElementById("sprint-project-filter").value;if(t){hu();try{await $.getCurrentSprint(t),Pt=await $.getSprints(t),tu(),await cs()}catch(n){v(n.message,"error")}}}function tu(){const e=document.getElementById("sprints-list");if(!e)return;const t=Pt.find(a=>a.status==="active"),n=Pt.find(a=>a.status==="planned"),s=Pt.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${I(t.id)}'); } else { window.open('/sprint/${t.id}', '_blank'); }" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${o?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${f(t.name)}</div>
                <div class="sprint-card-budget ${o?"budget-arrears":""}">
                    ${a}
                </div>
                <div class="sprint-card-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${I(t.id)}', '${I(t.name)}', ${t.budget||"null"}, '${I(t.project_id)}')">Edit Budget</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" onclick="showLimboDetailsModal()">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" onclick="showCloseSprintConfirmation('${I(t.id)}')">Close Sprint</button>
                    `}
                </div>
            </div>
        `,i+=nu(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${I(n.id)}'); } else { window.open('/sprint/${n.id}', '_blank'); }" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${f(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
                <div class="sprint-card-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${I(n.id)}', '${I(n.name)}', ${n.budget||"null"}, '${I(n.project_id)}')">Edit Budget</button>
                </div>
            </div>
        `}s.length>0&&(i+=`
            <details class="sprint-history">
                <summary>Completed Sprints (${s.length})</summary>
                <div class="sprint-history-list">
                    ${s.map(a=>`
                        <div class="sprint-history-item" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${I(a.id)}'); } else { window.open('/sprint/${a.id}', '_blank'); }" style="cursor: pointer;">
                            <span class="sprint-history-name">${f(a.name)}</span>
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
    `}function nu(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),d=((G,W,j)=>Math.min(Math.max(G,W),j))((new Date-o)/(r-o),0,1),m=360,u=120,g=16,b=g,y=m-g,_=g,A=u-g,R=G=>s===0?A:_+(1-G/s)*(A-_),H=R(s),D=R(0),O=b+(y-b)*d,C=R(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${ds(e.start_date)} → ${ds(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${m} ${u}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${b}" y1="${H}" x2="${y}" y2="${D}" class="burndown-ideal" />
                <line x1="${b}" y1="${H}" x2="${O}" y2="${C}" class="burndown-actual" />
                <circle cx="${O}" cy="${C}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}async function bi(e,t=!0){var n;try{const s=await $.getSprint(e);if(!s){v("Sprint not found","error"),window.navigateTo("sprints");return}Uo=s;const i=(n=window.currentTeam)==null?void 0:n.id,[a,o,r]=await Promise.all([$.getIssues({sprint_id:e,limit:500}),$.getSprintTransactions(e).catch(()=>[]),i?$.getDocuments(i,s.project_id,null,e).catch(()=>[]):[]]);hi=a,vi=o,wn=r,t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),iu()}catch(s){console.error("Failed to load sprint:",s),v("Failed to load sprint","error"),window.navigateTo("sprints")}}async function su(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){v("Invalid sprint ID","error"),window.navigateTo("sprints",!1);return}try{await bi(e,!1)}catch{window.navigateTo("sprints",!1)}}function iu(){const e=Uo,t=hi;document.querySelectorAll(".view").forEach(d=>d.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=["backlog","todo","in_progress","in_review"],i=t.filter(d=>s.includes(d.status)),a=t.filter(d=>d.status==="done"),o=t.reduce((d,m)=>d+(m.estimate||0),0),r=a.reduce((d,m)=>d+(m.estimate||0),0);let c="";e.status==="active"?c='<span class="badge badge-status-active">Active</span>':e.status==="planned"?c='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(c='<span class="badge badge-status-completed">Completed</span>');const l=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" onclick="navigateTo('sprints')">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${f(e.name)}</h2>
                ${c}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.start_date&&e.end_date?`
                <div class="sprint-detail-dates">
                    ${ds(e.start_date)} → ${ds(e.end_date)}
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
                <div class="stat-value">${l}</div>
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
                        ${i.map(d=>zo(d)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?`
                    <div class="empty-state-small">No completed issues yet</div>
                `:`
                    <div class="sprint-issues-list">
                        ${a.map(d=>zo(d)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${ou()}
            </div>

            ${wn.length>0?`
            <div class="sprint-detail-section">
                <h3>Documents (${wn.length})</h3>
                <div class="sprint-issues-list">
                    ${wn.map(d=>au(d)).join("")}
                </div>
            </div>
            `:""}
        </div>
    `}function zo(e){const t=["urgent","high","medium","low"],n=["backlog","todo","in_progress","in_review","done"],s=t.includes(e.priority)?e.priority:"",i=n.includes(e.status)?e.status:"backlog",a=s?`badge-priority-${s}`:"",o=`status-dot-${i}`;return`
        <div class="sprint-issue-row" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${I(e.id)}'); } else { window.open('/issue/${encodeURIComponent(e.identifier)}', '_blank'); }">
            <span class="status-dot ${o}"></span>
            <span class="sprint-issue-identifier">${f(e.identifier)}</span>
            <span class="sprint-issue-title">${f(e.title)}</span>
            <span class="sprint-issue-meta">
                ${s?`<span class="badge ${a}">${bu(s)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function au(e){const t=f(e.icon)||"📄";return`
        <div class="sprint-issue-row" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewDocument('${I(e.id)}'); } else { window.open('/document/${I(encodeURIComponent(e.id))}', '_blank'); }">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${f(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${xt(e.created_at)}</span>
            </span>
        </div>
    `}function ou(){const e=vi;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${ru(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function ru(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function lu(e,t,n,s){const i=s?So(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateBudget(event, '${I(e)}', '${I(s)}')">
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
            <button type="submit" class="btn btn-primary">Save Budget</button>
        </form>
    `,N()}async function cu(e,t,n){var o;e.preventDefault();const s=document.getElementById("sprint-budget").value,i=s?parseInt(s):null,a=((o=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:o.value)||"this";try{if(await $.updateSprint(t,{budget:i}),a==="planned"||a==="default"){const c=Pt.filter(l=>l.status==="planned"&&l.id!==t);for(const l of c)await $.updateSprint(l.id,{budget:i})}a==="default"&&n&&await $.updateProject(n,{default_sprint_budget:i}),await Ke(),K(),v(`Budget updated${a==="planned"?" (and planned sprints)":a==="default"?" (and set as project default)":""}!`,"success")}catch(r){v(`Failed to update budget: ${r.message}`,"error")}return!1}async function du(e){const t=Pt.find(c=>c.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,N();const n=["backlog","todo","in_progress","in_review"];let s=0,i=!1,a=!1;try{const[c,l]=await Promise.all([$.getIssues({sprint_id:e,limit:500}),$.getRituals(t.project_id)]);s=c.filter(d=>n.includes(d.status)).length,i=l.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(c){console.error("Failed to load sprint details:",c),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${f(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="this.disabled = true; closeModal(); completeSprint('${I(e)}')">Close Sprint</button>
            </div>
        </div>
    `}async function uu(e){try{const t=await $.closeSprint(e);await Ke(),t.limbo?mu(t):v("Sprint completed!","success")}catch(t){v(`Failed to complete sprint: ${t.message}`,"error")}}async function cs(){var t;const e=(t=document.getElementById("sprint-project-filter"))==null?void 0:t.value;if(e)try{ze=await $.getLimboStatus(e),pu()}catch(n){console.error("Failed to load limbo status:",n)}}function pu(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!ze||!ze.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${ze.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" onclick="showLimboDetailsModal()">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function mu(e){const t=document.getElementById("sprint-project-filter").value;document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
            <button type="button" class="btn btn-primary" onclick="closeModal(); loadLimboStatus();">Got it</button>
        </div>
    `,N(),gu(t)}async function gu(e){try{const t=await $.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${f(s.name)} <span class="ritual-mode">(${f(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(s.prompt):f(s.prompt)}</div>
                    ${wi(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function yi(){var t,n,s,i;if(!ze)return;const e=((t=document.getElementById("sprint-project-filter"))==null?void 0:t.value)||((n=document.getElementById("ritual-project-filter"))==null?void 0:n.value);document.getElementById("modal-title").textContent="Limbo Status",(s=document.querySelector(".modal"))==null||s.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${ze.pending_rituals.map(a=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${a.attestation?a.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${f(a.name)}</strong>
                            <span class="badge badge-ritual-${T(a.approval_mode)}">${f(a.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(a.prompt):f(a.prompt)}</div>
                        ${wi(a.attestation)}
                        ${fu(a,e)}
                    </div>
                `).join("")}
            </div>
            ${((i=ze.completed_rituals)==null?void 0:i.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${ze.completed_rituals.map(a=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${f(a.name)}</div>
                            ${wi(a.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,N()}function wi(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${f(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${f(xt(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${window.renderMarkdown?window.renderMarkdown(e.note):f(e.note)}</div>
        </div>
    `}function fu(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" onclick="approveRitual('${I(e.id)}', '${I(t)}')">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" onclick="completeGateRitual('${I(e.id)}', '${I(t)}', '${I(e.name)}')">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Ko(e){for(const t of e)if(!ls.has(t))try{(await $.getSprints(t)).forEach(s=>{rs[s.id]=s}),ls.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function hu(){rs={},ls=new Set,hi=[],vi=[],wn=[]}function vu(e,t){t.forEach(n=>{rs[n.id]=n}),ls.add(e)}function ds(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function bu(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}let ot=!0,kn=null,ki=null,$i=null,us=null,h={api:null,getCurrentView:()=>"my-issues",showToast:()=>{},showModal:()=>{},closeModal:()=>{},navigateTo:()=>{},getProjects:()=>[],getMembers:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatTimeAgo:()=>"",getStatusIcon:()=>"",getPriorityIcon:()=>"",renderMarkdown:e=>e,renderAvatar:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",showDetailDropdown:()=>{},setupMentionAutocomplete:()=>{},renderTicketRitualActions:()=>"",getIssues:()=>[]};function yu(e){h={...h,...e}}function Ei(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function Ii(e){return e.user_name||e.user_email||"Unknown"}function Ti(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const s=e.new_value?h.escapeHtml(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",i=e.new_value?h.escapeAttr(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<a href="#comments-section" class="activity-comment-link" title="${i}" onclick="event.preventDefault(); document.getElementById('comments-section')?.scrollIntoView({behavior: 'smooth'})">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${h.escapeHtml(h.formatStatus(t(e.old_value)))}</strong> to <strong>${h.escapeHtml(h.formatStatus(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${h.escapeHtml(h.formatPriority(t(e.old_value)))}</strong> to <strong>${h.escapeHtml(h.formatPriority(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${h.escapeHtml(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${h.escapeHtml(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const s=h.escapeHtml(e.field_name||"ritual"),i=e.new_value?h.escapeAttr(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<span class="activity-attestation-link" title="${i}">Attested to <strong>${s}</strong></span>`:`Attested to <strong>${s}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||h.escapeHtml(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||h.escapeHtml(e.field_name)}`:"Updated issue"}}function Wo(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function wu(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,c=!1;const l=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=l.exec(t))!==null;)if(c=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const m=d[1],u=document.createElement("a");u.href=`#/issue/${m}`,u.className="issue-link",u.textContent=m,o.appendChild(u),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const m=document.createElement("span");m.className="mention",m.textContent="@"+d[3],o.appendChild(m),r=d.index+d[0].length}c&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function ku(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let o;for(;(o=n.exec(t))!==null;){a=!0,o.index>i&&s.appendChild(document.createTextNode(t.slice(i,o.index)));const r=o[1],c=document.createElement("a");c.href=`#/issue/${r}`,c.className="issue-link",c.textContent=r,s.appendChild(c),i=o.index+o[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function $u(e){if(!e)return"";const t=h.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,Wo(n,wu),n.innerHTML}function ps(e){if(!e)return"";const t=h.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,Wo(n,ku),n.innerHTML}function Vo(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),s=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),s&&s.classList.toggle("rotated")}function Jo(){ot=!ot;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",ot),n&&n.classList.toggle("rotated",ot)}async function ms(e){try{kn=await h.api.getTicketRitualsStatus(e),Yo(e)}catch(t){console.error("Failed to load ticket rituals:",t),kn=null}}function Yo(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!kn){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=kn;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(ot=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",ot);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",ot);const r=n.some(d=>d.trigger==="ticket_close"),c=n.some(d=>d.trigger==="ticket_claim");let l="⚠️ Complete these rituals:";r&&c?l="⚠️ Pending rituals (claim before starting, close before completing):":c?l="⚠️ Complete these rituals before claiming this ticket:":r&&(l="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${l}</p>
                ${n.map(d=>`
                    <div class="ticket-ritual-item pending${d.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${d.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${h.escapeHtml(d.name)}</span>
                            <span class="badge badge-trigger-${d.trigger||"ticket_close"}">${d.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${d.approval_mode||"auto"}">${d.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${d.prompt?h.renderMarkdown(d.prompt):""}</div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${h.escapeHtml(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${h.formatTimeAgo(d.attestation.attested_at)}</span>
                                ${d.attestation.note?`<div class="attestation-note markdown-body">${h.renderMarkdown(d.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${h.renderTicketRitualActions(d,e)}
                        </div>
                    </div>
                `).join("")}
            </div>
        `:""}
        ${s.length>0?`
            <div class="ticket-rituals-completed">
                ${s.map(d=>`
                    <div class="ticket-ritual-item completed">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">✓</span>
                            <span class="ticket-ritual-name">${h.escapeHtml(d.name)}</span>
                        </div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${h.escapeHtml(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${h.formatTimeAgo(d.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function gs(e){try{let t;e.includes("-")?t=await h.api.getIssueByIdentifier(e):t=await h.api.getIssue(e),t?await ie(t.id,!1):h.navigateTo("my-issues",!1)}catch{h.navigateTo("my-issues",!1)}}async function ie(e,t=!0){try{ot=!0;const[n,s,i,a,o,r]=await Promise.all([h.api.getIssue(e),h.api.getComments(e),h.api.getActivities(e),h.api.getSubIssues(e),h.api.getRelations(e),h.api.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),l=[...r.pending_rituals||[],...r.completed_rituals||[]].filter(k=>k.attestation&&k.attestation.note).map(k=>({id:`attestation-${k.attestation.id}`,author_name:k.attestation.attested_by_name||"Unknown",content:k.attestation.note,created_at:k.attestation.attested_at,is_attestation:!0,ritual_name:k.name,is_pending:!k.attestation.approved_at}));kn=r;const d=[...s,...l].sort((k,Qe)=>new Date(k.created_at)-new Date(Qe.created_at)),m=[n.parent_id?h.api.getIssue(n.parent_id):Promise.resolve(null),h.api.getSprints(n.project_id).catch(k=>(console.error("Failed to load sprints:",k),[]))],[u,g]=await Promise.all(m),b=o.filter(k=>k.relation_type==="blocks"&&k.direction==="outgoing"),y=o.filter(k=>k.relation_type==="blocked_by"||k.relation_type==="blocks"&&k.direction==="incoming"),_=o.filter(k=>k.relation_type==="relates_to");t&&history.pushState({issueId:e,view:h.getCurrentView()},"",`/issue/${n.identifier}`),window.currentDetailIssue=n,window.currentDetailSprints=g,document.querySelectorAll(".view").forEach(k=>k.classList.add("hidden"));const A=document.getElementById("issue-detail-view");A.classList.remove("hidden");const R=h.getCurrentView()||"my-issues",H=h.getProjects().find(k=>k.id===n.project_id),D=n.assignee_id?h.getAssigneeById(n.assignee_id):null,O=D?h.formatAssigneeName(D):null,C=n.sprint_id?g.find(k=>k.id===n.sprint_id):null,G=h.getIssues(),W=G.findIndex(k=>k.id===n.id),j=W>0?G[W-1]:null,L=W>=0&&W<G.length-1?G[W+1]:null,q=W>=0;A.querySelector("#issue-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${R}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${q?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${j?`onclick="viewIssue('${h.escapeJsString(j.id)}')"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${W+1} / ${G.length}</span>
                            <button class="issue-nav-btn" ${L?`onclick="viewIssue('${h.escapeJsString(L.id)}')"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${H?h.escapeHtml(H.name):"Project"} › ${h.escapeHtml(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${h.escapeHtml(n.title)}</h1>

                    ${u?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(u.identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${h.escapeJsString(u.id)}'); }">${u.identifier}: ${h.escapeHtml(u.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" onclick="editDescription('${h.escapeJsString(n.id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                            </button>
                        </div>
                        <div class="description-content markdown-body ${n.description?"":"empty"}"${n.description?"":` onclick="editDescription('${h.escapeJsString(n.id)}')"`}>
                            ${n.description?ps(n.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" onclick="showCreateSubIssueModal('${h.escapeJsString(n.id)}', '${h.escapeJsString(n.project_id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${a.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:a.map(k=>`
                                <div class="sub-issue-item" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${h.escapeJsString(k.id)}'); } else { window.open('/issue/${encodeURIComponent(k.identifier)}', '_blank'); }">
                                    <span class="sub-issue-status">${h.getStatusIcon(k.status)}</span>
                                    <span class="sub-issue-id">${k.identifier}</span>
                                    <span class="sub-issue-title">${h.escapeHtml(k.title)}</span>
                                    ${k.estimate?`<span class="sub-issue-estimate">${k.estimate}pts</span>`:""}
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" onclick="showAddRelationModal('${h.escapeJsString(n.id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${b.length===0&&y.length===0&&_.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${y.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${y.map(k=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${h.getStatusIcon(k.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(k.related_issue_identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${h.escapeJsString(k.related_issue_id)}'); }" class="relation-link">${k.related_issue_identifier}</a>
                                            <span class="relation-title">${h.escapeHtml(k.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${h.escapeJsString(n.id)}', '${h.escapeJsString(k.id)}'); event.stopPropagation();" title="Remove relation">
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
                                            <span class="relation-status">${h.getStatusIcon(k.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(k.related_issue_identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${h.escapeJsString(k.related_issue_id)}'); }" class="relation-link">${k.related_issue_identifier}</a>
                                            <span class="relation-title">${h.escapeHtml(k.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${h.escapeJsString(n.id)}', '${h.escapeJsString(k.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${_.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${_.map(k=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${h.getStatusIcon(k.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(k.related_issue_identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${h.escapeJsString(k.related_issue_id)}'); }" class="relation-link">${k.related_issue_identifier}</a>
                                            <span class="relation-title">${h.escapeHtml(k.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${h.escapeJsString(n.id)}', '${h.escapeJsString(k.id)}'); event.stopPropagation();" title="Remove relation">
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
                                    <div class="activity-icon">${Ei(k.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Ti(k)}</span>
                                        <span class="activity-actor">by ${h.escapeHtml(Ii(k))}</span>
                                        <span class="activity-time">${h.formatTimeAgo(k.created_at)}</span>
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
                            ${d.length===0?`
                                <div class="comments-empty">No comments yet</div>
                            `:d.map(k=>`
                                <div class="comment ${k.is_attestation?"comment-attestation":""} ${k.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${k.is_attestation?"avatar-attestation":""}">${k.is_attestation?k.is_pending?"⏳":"✓":(k.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${h.escapeHtml(k.author_name||"User")}</span>
                                            ${k.is_attestation?`<span class="comment-ritual-badge">${k.is_pending?"Pending approval — ":""}Ritual: ${h.escapeHtml(k.ritual_name)}</span>`:""}
                                            <span class="comment-date">${h.formatTimeAgo(k.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${$u(k.content)}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <form class="comment-form comment-form-sticky" onsubmit="return handleAddComment(event, '${h.escapeJsString(n.id)}')">
                        <textarea id="new-comment" placeholder="Write a comment... (${/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl"}+Enter to submit)" rows="1"></textarea>
                        <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                        <button type="submit" class="btn btn-primary btn-sm comment-submit-btn">Comment</button>
                    </form>
                </div>

                <aside class="issue-detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" onclick="showDetailDropdown(event, 'status', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${h.getStatusIcon(n.status)}
                                <span>${h.formatStatus(n.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" onclick="showDetailDropdown(event, 'priority', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${h.getPriorityIcon(n.priority)}
                                <span>${h.formatPriority(n.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" onclick="showDetailDropdown(event, 'type', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${n.issue_type||"task"}">${h.formatIssueType(n.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" onclick="showDetailDropdown(event, 'assignee', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${O?`${h.renderAvatar(D,"avatar-small")}<span>${h.escapeHtml(O)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" onclick="showDetailDropdown(event, 'sprint', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${C?h.escapeHtml(C.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" onclick="showDetailDropdown(event, 'labels', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${n.labels&&n.labels.length>0?n.labels.map(k=>`
                                        <span class="issue-label" style="background: ${h.sanitizeColor(k.color)}20; color: ${h.sanitizeColor(k.color)}">${h.escapeHtml(k.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${H?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${h.escapeHtml(H.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" onclick="showDetailDropdown(event, 'estimate', '${h.escapeJsString(n.id)}')">
                            <span class="property-label">Estimate</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${h.formatEstimate(n.estimate,n.project_id)}</span>
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
                            <span class="property-value-static">${h.escapeHtml(n.creator_name||"Unknown")}</span>
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
                                <button class="overflow-menu-item" data-action="edit" data-issue-id="${h.escapeAttr(n.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Edit all fields
                                </button>
                                <button class="overflow-menu-item overflow-menu-danger" data-action="delete" data-issue-id="${h.escapeAttr(n.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    Delete issue
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        `;const J=document.querySelector(".sidebar-overflow-trigger"),Y=document.querySelector(".overflow-menu-dropdown");if(J&&Y){const k=()=>{Y.classList.add("hidden"),J.setAttribute("aria-expanded","false")},Qe=()=>{const ue=Y.classList.toggle("hidden");J.setAttribute("aria-expanded",String(!ue))};J.addEventListener("click",Qe),document.addEventListener("click",ue=>{!J.contains(ue.target)&&!Y.contains(ue.target)&&k()}),Y.addEventListener("keydown",ue=>{ue.key==="Escape"&&(k(),J.focus())}),Y.querySelectorAll(".overflow-menu-item").forEach(ue=>{ue.addEventListener("click",()=>{const pt=ue.dataset.issueId;k(),ue.dataset.action==="edit"?window.showEditIssueModal(pt):ue.dataset.action==="delete"&&window.deleteIssue(pt)})})}Yo(n.id),h.setupMentionAutocomplete();const Le=document.getElementById("new-comment");Le&&Le.addEventListener("keydown",k=>{var Qe;k.key==="Enter"&&(k.metaKey||k.ctrlKey)&&(k.preventDefault(),(Qe=Le.closest("form"))==null||Qe.requestSubmit())}),ki=j?j.id:null,$i=L?L.id:null,us&&document.removeEventListener("keydown",us),us=k=>{if(document.getElementById("issue-detail-view").classList.contains("hidden")||k.target.tagName==="INPUT"||k.target.tagName==="TEXTAREA"||k.target.tagName==="SELECT"||k.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor"))return;k.key==="ArrowLeft"&&ki?(k.preventDefault(),ie(ki)):k.key==="ArrowRight"&&$i&&(k.preventDefault(),ie($i));const ue={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[k.key];if(ue){const pt=document.querySelector(`.property-row[data-field="${ue}"]`);pt&&(k.preventDefault(),pt.click())}},document.addEventListener("keydown",us)}catch(n){h.showToast(`Failed to load issue: ${n.message}`,"error")}}async function Eu(e,t){e.preventDefault();const n=document.getElementById("new-comment").value;try{await h.api.createComment(t,n),await ie(t),h.showToast("Comment added!","success")}catch(s){h.showToast(`Failed to add comment: ${s.message}`,"error")}return!1}async function Iu(e){const t=window.currentDetailIssue||await h.api.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const s=n.querySelector(".section-header");s&&(s.style.display="none");const i=n.querySelector(".description-content");if(!i)return;i.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" onclick="setDescriptionEditorMode('write')">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" onclick="setDescriptionEditorMode('preview')">Preview</button>
            </div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${h.escapeHtml(t.description||"")}</textarea>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,i.classList.remove("empty"),i.removeAttribute("onclick");const a=document.getElementById("edit-description");a.addEventListener("input",()=>{const o=document.getElementById("edit-description-preview");o&&o.style.display!=="none"&&Zo()}),a.addEventListener("keydown",o=>{var r,c;o.key==="Enter"&&(o.metaKey||o.ctrlKey)&&(o.preventDefault(),(r=document.getElementById("save-description-edit"))==null||r.click()),o.key==="Escape"&&(o.preventDefault(),(c=document.getElementById("cancel-description-edit"))==null||c.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{s&&(s.style.display=""),i.className=`description-content markdown-body ${t.description?"":"empty"}`,t.description||i.setAttribute("onclick",`editDescription('${h.escapeJsString(t.id)}')`),i.innerHTML=t.description?ps(t.description):'<span class="add-description-link">Add description...</span>'}),document.getElementById("save-description-edit").addEventListener("click",async()=>{var r;const o=(r=document.getElementById("edit-description"))==null?void 0:r.value;if(o!==void 0)try{await h.api.updateIssue(e,{description:o}),h.showToast("Description updated","success"),ie(e,!1)}catch(c){h.showToast(`Failed to update description: ${c.message}`,"error")}})}function Zo(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?ps(n):'<span class="text-muted">Nothing to preview.</span>'}function Tu(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?Zo():s.focus()}function _u(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleAddRelation(event, '${h.escapeJsString(e)}')">
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
                <input type="text" id="relation-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToRelate(this.value, '${h.escapeJsString(e)}')">
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
    `,h.showModal(),document.getElementById("relation-issue-search").focus()}async function xu(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=window.currentTeam)==null?void 0:s.id,o=(await h.api.searchIssues(i,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" onclick="selectIssueForRelation('${h.escapeJsString(r.id)}', '${h.escapeJsString(r.identifier)}', '${h.escapeJsString(r.title)}')">
                <span class="link-result-id">${h.escapeHtml(r.identifier)}</span>
                <span class="link-result-title">${h.escapeHtml(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function Su(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Cu(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Lu(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return h.showToast("Please select an issue","error"),!1;try{n==="blocked_by"?await h.api.createRelation(s,t,"blocks"):await h.api.createRelation(t,s,n),h.closeModal(),h.showToast("Relation added","success"),ie(t)}catch(i){h.showToast(`Failed to add relation: ${i.message}`,"error")}return!1}async function Au(e,t){try{await h.api.deleteRelation(e,t),h.showToast("Relation removed","success"),ie(e)}catch(n){h.showToast(`Failed to remove relation: ${n.message}`,"error")}}async function Bu(){const e=document.getElementById("ritual-project-filter");e&&(await we(),e.innerHTML='<option value="">Select Project</option>'+se().map(t=>`<option value="${T(t.id)}">${f(t.name)}</option>`).join(""))}async function Xo(){const e=document.getElementById("rituals-project-filter");if(!e)return;window._onRitualsChanged=Du,await we(),e.innerHTML='<option value="">Select a project</option>'+se().map(n=>`<option value="${T(n.id)}">${f(n.name)}</option>`).join("");const t=vt()||bn();t&&se().some(n=>n.id===t)?(e.value=t,Qo()):document.getElementById("rituals-content").innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>'}async function Qo(){const e=document.getElementById("rituals-project-filter").value,t=document.getElementById("rituals-content");if(!e){document.getElementById("rituals-tabs").classList.add("hidden"),t.innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>';return}Do(e),t.innerHTML='<div class="loading">Loading rituals...</div>';try{await Mt()}catch(n){t.innerHTML=`<div class="empty-state">Error loading rituals: ${f(n.message)}</div>`}}function Du(){const e=document.getElementById("rituals-content"),t=Mo(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,jt("rv-sprint-rituals-list",n,"sprint"),jt("rv-close-rituals-list",s,"close"),jt("rv-claim-rituals-list",i,"claim")}function Mu(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function ju(e,t){try{await $.approveAttestation(e,t),v("Ritual approved!","success"),await cs(),yi()}catch(n){v(n.message,"error")}}async function er(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{Pu(s,e,t)}),N()}async function Pu(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await $.completeGateRitual(t,n,s||null),v("Ritual completed!","success"),await cs();const i=Qd();i&&!i.in_limbo?(K(),v("Limbo cleared! Next sprint is now active.","success")):yi()}catch(i){v(i.message,"error")}return!1}function Ru(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-ritual-id="${T(e.id)}" data-issue-id="${T(t)}" onclick="approveTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-ritual-id="${T(e.id)}" data-issue-id="${T(t)}" data-ritual-name="${T(e.name)}" onclick="showCompleteTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName)">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-ritual-id="${T(e.id)}" data-issue-id="${T(t)}" data-ritual-name="${T(e.name)}" data-ritual-prompt="${T(e.prompt||"")}" onclick="showAttestTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName, this.dataset.ritualPrompt)">Attest</button>`:`<button class="btn btn-small btn-secondary" data-ritual-id="${T(e.id)}" data-issue-id="${T(t)}" onclick="attestTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Attest</button>`}function Nu(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${f(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{Hu(i,e,t)}),N()}async function Hu(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return v("A note is required for this attestation.","error"),!1;try{await $.attestTicketRitual(t,n,s),v("Ritual attested!","success"),K(),await ms(n)}catch(i){v(i.message,"error")}return!1}async function Ou(e,t){try{await $.attestTicketRitual(e,t),v("Ritual attested!","success"),await ms(t)}catch(n){v(n.message,"error")}}async function qu(e,t){try{await $.approveTicketRitual(e,t),v("Ritual approved!","success"),await ms(t)}catch(n){v(n.message,"error")}}function Fu(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{Uu(s,e,t)}),N()}async function Uu(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await $.completeTicketGateRitual(t,n,s||null),v("Ritual completed!","success"),K(),await ms(n)}catch(i){v(i.message,"error")}return!1}function fs(e){if(!e)return"";try{F.setOptions({breaks:!0,gfm:!0});const n=F.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return no.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function _i(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function Gu(e,t,n,s,i,a,o,r){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${f(i)}</span>
                    <span class="gate-approval-issue-title">${f(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${I(t)}')">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${f(s)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${f(o)}</strong>${r?` ${_i(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",l=>{zu(l,e,t,n)}),N(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function zu(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await $.completeTicketGateRitual(t,n,i||null),v(`GATE ritual "${s}" approved!`,"success"),K(),$n()}catch(a){v(`Failed to complete gate ritual: ${a.message}`,"error")}}function tr(e,t,n,s,i,a,o,r){Gu(e,t,n,s,i,a,o,r)}function Ku(e,t,n,s,i,a,o,r,c){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${f(i)}</span>
                    <span class="gate-approval-issue-title">${f(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${I(t)}')">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${f(s)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${f(o)}</strong>${r?` ${_i(r)}`:""}</div>`:""}
                ${c?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${fs(c)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{Wu(d,e,t,n)}),N(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function Wu(e,t,n,s){e.preventDefault();try{await $.approveTicketRitual(t,n),v(`Review ritual "${s}" approved!`,"success"),K(),$n()}catch(i){v(`Failed to approve review ritual: ${i.message}`,"error")}}function nr(e,t,n,s,i,a,o,r,c){Ku(e,t,n,s,i,a,o,r,c)}let xi=[];async function $n(){if(!window.currentTeam)return;const e=document.getElementById("gate-approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=await Promise.all(se().map(async i=>{const[a,o]=await Promise.all([$.getPendingApprovals(i.id),$.getLimboStatus(i.id)]);return{project:i,approvals:a,limbo:o}})),n=[],s=[];for(const{project:i,approvals:a,limbo:o}of t)if(n.push(...a),o&&o.in_limbo){const r=(o.pending_rituals||[]).filter(c=>{var l;return(l=c.attestation)!=null&&l.approved_at?!1:c.approval_mode==="gate"||!!c.attestation});r.length>0&&s.push({project:i,rituals:r})}Vd(n),xi=s,sr()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${f(t.message)}</p></div>`}}}function sr(){const e=document.getElementById("gate-approvals-list");if(!e)return;const t=Wd(),n=xi.length>0,i=!localStorage.getItem("chaotic_approvals_explainer_dismissed");if(t.length===0&&!n){i?e.innerHTML=`
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
            `;return}let a="";n&&(a+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${xi.map(({project:m,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${f(m.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(g=>{const b=g.attestation&&!g.attestation.approved_at,y=b?"⏳":"○",_=b?`<span class="gate-waiting-info">Attested by <strong>${f(g.attestation.attested_by_name||"Unknown")}</strong></span>`:g.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',A=b?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${T(g.id)}"
                                            data-project-id="${T(m.id)}">Approve</button>`:g.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${T(g.id)}"
                                                data-project-id="${T(m.id)}"
                                                data-ritual-name="${T(g.name)}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${y} ${f(g.name)}
                                                    <span class="badge badge-ritual-${T(g.approval_mode)}">${f(g.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${f(g.prompt)}</span>
                                                ${_}
                                            </div>
                                            ${A}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const o=m=>m.pending_approvals||[],r=m=>u=>{const g=o(u).filter(m);return g.length>0?{...u,_filteredApprovals:g}:null},c=t.map(r(m=>m.approval_mode==="gate"&&m.limbo_type==="claim")).filter(Boolean),l=t.map(r(m=>m.approval_mode==="gate"&&m.limbo_type==="close")).filter(Boolean),d=t.map(r(m=>m.approval_mode==="review")).filter(Boolean);c.length>0&&(a+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${c.map(Si).join("")}
                </div>
            </div>
        `),l.length>0&&(a+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(Si).join("")}
                </div>
            </div>
        `),d.length>0&&(a+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${d.map(Si).join("")}
                </div>
            </div>
        `),e.innerHTML=a,e.querySelectorAll(".gate-approve-btn").forEach(m=>{m.addEventListener("click",()=>{const u=m.dataset;tr(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-approve-btn").forEach(m=>{m.addEventListener("click",()=>{const u=m.dataset;nr(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".sprint-approve-btn").forEach(m=>{m.addEventListener("click",async()=>{m.disabled=!0;try{await $.approveAttestation(m.dataset.ritualId,m.dataset.projectId),v("Sprint ritual approved!","success"),await $n()}catch(u){m.disabled=!1,v(u.message,"error")}})}),e.querySelectorAll(".sprint-complete-btn").forEach(m=>{m.addEventListener("click",()=>{er(m.dataset.ritualId,m.dataset.projectId,m.dataset.ritualName)})})}function Vu(){localStorage.setItem("chaotic_approvals_explainer_dismissed","1"),sr()}function Si(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${f(s.requested_by_name)}</strong>${s.requested_at?` (${_i(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note">${fs(s.attestation_note)}</div>`:"",c=i?"review-approve-btn":"gate-approve-btn",l=i?"Approve":"Complete",d=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>';return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${f(s.ritual_name)} ${d}</span>
                    <span class="gate-ritual-prompt">${f(s.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                <button class="btn btn-small btn-primary ${c}"
                    data-ritual-id="${T(s.ritual_id)}"
                    data-issue-id="${T(e.issue_id)}"
                    data-ritual-name="${T(s.ritual_name)}"
                    data-ritual-prompt="${T(s.ritual_prompt)}"
                    data-issue-identifier="${T(e.identifier)}"
                    data-issue-title="${T(e.title)}"
                    data-requested-by="${T(s.requested_by_name||"")}"
                    data-requested-at="${T(s.requested_at||"")}"
                    data-attestation-note="${T(s.attestation_note||"")}">${l}</button>
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" onclick="event.preventDefault(); viewIssue('${I(e.issue_id)}')" class="gate-issue-link">
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
    `}window.completeGateFromList=tr,window.approveReviewFromList=nr;let Ci=[];async function Li(){try{Ci=await $.getApiKeys(),Ju()}catch(e){v(e.message,"error")}}function Ju(){const e=document.getElementById("api-keys-list");if(e){if(Ci.length===0){e.innerHTML='<p class="empty-state">No API keys yet. Create one to get started.</p>';return}e.innerHTML=Ci.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${f(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${f(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Qs(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Qs(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" onclick="revokeApiKey('${I(t.id)}', '${I(t.name)}')">Revoke</button>
            `:""}
        </div>
    `).join("")}}function ir(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleCreateApiKey(event)">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,N()}async function Yu(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await $.createApiKey(t);K(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,N()}catch(n){v(n.message,"error")}return!1}async function ar(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),v("API key copied to clipboard","success")}catch{v("Failed to copy","error")}}async function or(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await $.revokeApiKey(e),v("API key revoked","success"),await Li()}catch(n){v(n.message,"error")}}window.loadApiKeys=Li,window.showCreateApiKeyModal=ir,window.handleCreateApiKey=Yu,window.copyApiKey=ar,window.revokeApiKey=or;let hs=!1,We=0,rt=[],vs=[];function Zu(e){vs=e,rt=[...e]}function rr(){return hs}function Xu(){if(hs)return;hs=!0,We=0,rt=[...vs];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&bs()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>Qu(n.target.value)),t.addEventListener("keydown",tp),En(),requestAnimationFrame(()=>t.focus())}function bs(){hs=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function Qu(e){const t=e.toLowerCase().trim();t?rt=vs.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):rt=[...vs],We=0,En()}function En(){const e=document.getElementById("command-results");if(!e)return;if(rt.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};rt.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${s===We?"selected":""}"
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
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function ep(e){We=e,En()}function lr(e){const t=rt[e];t&&(bs(),t.action())}function tp(e){switch(e.key){case"ArrowDown":e.preventDefault(),We=Math.min(We+1,rt.length-1),En();break;case"ArrowUp":e.preventDefault(),We=Math.max(We-1,0),En();break;case"Enter":e.preventDefault(),lr(We);break;case"Escape":e.preventDefault(),bs();break}}window.selectCommand=ep,window.executeCommand=lr;let In=[],Ai=[],Ve={getCurrentUser:()=>null,getCurrentTeam:()=>null,renderIssueRow:()=>"",formatActivityText:()=>"",formatActivityActor:()=>"",getActivityIcon:()=>"📝",navigateToIssueByIdentifier:()=>{},viewDocument:()=>{}};function np(e){Ve={...Ve,...e}}function ys(){return In}function Tn(e){In=e}async function Bi(){var i,a;const e=Ve.getCurrentTeam(),t=Ve.getCurrentUser();if(!e||!t)return;const n=(i=document.getElementById("my-issues-status-filter"))==null?void 0:i.value,s=(a=document.getElementById("dashboard-project-filter"))==null?void 0:a.value;ip();try{const o={assignee_id:t.id,status:n||void 0,limit:1e3};let r;s?r=await $.getIssues({...o,project_id:s}):r=await $.getTeamIssues(e.id,o),In=r,_n()}catch(o){v(o.message,"error")}}async function Rt({showLoading:e=!0}={}){const t=Ve.getCurrentTeam();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{Ai=await $.getTeamActivities(t.id,0,10),sp()}catch{n&&(n.innerHTML='<div class="activity-empty">Failed to load activity</div>')}}function sp(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Ai.length){e.innerHTML='<div class="activity-empty">No recent activity. Create or update issues to see activity here.</div>';return}e.innerHTML=Ai.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" onclick="navigateToIssueByIdentifier('${I(t.issue_identifier)}'); return false;"><strong>${f(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" onclick="viewDocument('${I(t.document_id)}'); return false;"><strong>${s} ${f(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${f(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${Ve.getActivityIcon(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Ve.formatActivityText(t)}${n}</span>
                <span class="activity-actor">by ${f(Ve.formatActivityActor(t))}</span>
                <span class="activity-time">${xt(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function ip(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function cr(){Bi()}function _n(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),In.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues assigned to you</h3>
                <p>Issues assigned to you will appear here</p>
            </div>
        `;return}e.innerHTML=In.map(t=>Ve.renderIssueRow(t)).join("")}}window.filterMyIssues=cr;let Me=null,Je=0,Nt=null,Ht=null,xn=null,Di=!1;function dr(){try{return localStorage.getItem("chaotic_onboarding_complete")==="true"}catch{return!1}}function ur(){try{localStorage.setItem("chaotic_onboarding_complete","true")}catch{}}function pr(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function ap(){Me||(Me=document.createElement("div"),Me.id="onboarding-overlay",Me.className="onboarding-overlay",document.getElementById("app").appendChild(Me))}function Sn(){if(!Me)return;const e=Di?gr():mr(),t=e[Je],n=e.map((s,i)=>`<span class="onboarding-dot${i===Je?" active":""}${i<Je?" completed":""}"></span>`).join("");Me.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function mr(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=pr(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=pr(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Nt&&(e.textContent=`${Nt.name} (${Nt.key})`),t&&Ht&&(t.textContent=`${Ht.name} (${Ht.key})`),n&&xn&&(n.textContent=`${xn.identifier} - ${xn.title}`)}}]}function gr(){const e='<div class="onboarding-skip"><a href="#" onclick="window._onboardingFinish(); return false;">Close tour</a></div>';return[{html:`
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
            `}]}function Mi(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function ji(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Ot(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}window._onboardingNext=function(){const e=Di?gr():mr();Je<e.length-1&&(Je++,Sn())},window._onboardingSkip=function(){ur(),Ri(),window.initApp&&window.initApp()},window._onboardingFinish=function(){ur(),Ri(),window.initApp&&window.initApp()},window._onboardingCreateTeam=async function(e){e.preventDefault(),ji("onboarding-team-error"),Ot("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Nt=await api.createTeam({name:t,key:n}),Je++,Sn()}catch(s){Mi("onboarding-team-error",s.message||"Failed to create team"),Ot("onboarding-team-submit",!1)}},window._onboardingCreateProject=async function(e){e.preventDefault(),ji("onboarding-project-error"),Ot("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Ht=await api.createProject(Nt.id,{name:t,key:n}),Je++,Sn()}catch(s){Mi("onboarding-project-error",s.message||"Failed to create project"),Ot("onboarding-project-submit",!1)}},window._onboardingCreateIssue=async function(e){e.preventDefault(),ji("onboarding-issue-error"),Ot("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{xn=await api.createIssue(Ht.id,{title:t}),Je++,Sn()}catch(n){Mi("onboarding-issue-error",n.message||"Failed to create issue"),Ot("onboarding-issue-submit",!1)}};function Pi(e=!1){Di=e,Je=0,Nt=null,Ht=null,xn=null,ap(),Sn()}function Ri(){Me&&(Me.remove(),Me=null)}function Ni(){try{localStorage.removeItem("chaotic_onboarding_complete")}catch{}Pi(!0)}window.showOnboarding=Pi,window.hideOnboarding=Ri,window.resetOnboarding=Ni,window.hasCompletedOnboarding=dr;let Cn=[];function op(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function rp(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function lp(e,t){const n=e().map(op),s=t().map(rp);Cn=[...n,...s]}function ws(e){return e&&Cn.find(t=>t.id===e)||null}function Ln(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Hi(e,t=!1){const n=f(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${f(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function ks(){const e=Cn.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));Cn.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,c)=>r.name.localeCompare(c.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=Cn.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function cp(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;ks().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${Hi(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}const fr=["backlog","todo","in_progress","in_review","done","canceled"],hr=["no_priority","urgent","high","medium","low"],dp=["task","bug","feature","chore","docs","tech_debt","epic"];let je=[],vr=Promise.resolve(),w={api:null,getIssues:()=>[],setIssues:()=>{},getMyIssues:()=>[],setMyIssues:()=>{},getCurrentDetailIssue:()=>null,setCurrentDetailIssue:()=>{},getLabels:()=>[],setLabels:()=>{},getCurrentTeam:()=>null,getCurrentDetailSprints:()=>[],closeAllDropdowns:()=>{},registerDropdownClickOutside:()=>{},setDropdownKeyHandler:()=>{},showToast:()=>{},getStatusIcon:()=>"",getPriorityIcon:()=>"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatAssigneeOptionLabel:e=>(e==null?void 0:e.name)||"",getAssigneeOptionList:()=>[],getAssigneeById:()=>null,getEstimateOptions:()=>[],renderAvatar:()=>"",renderIssueRow:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",updateSprintCacheForProject:()=>{},updateSprintBudgetBar:()=>{}};function up(e){w={...w,...e}}function br(){return je}function yr(e){je=e}async function wr(e,t,n){var d,m;e.preventDefault(),w.closeAllDropdowns();const i=e.currentTarget.getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown",t==="status")a.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${fr.map((u,g)=>`
                <button class="dropdown-option" data-value="${u}" onclick="updateIssueField('${w.escapeJsString(n)}', 'status', '${u}')">
                    ${w.getStatusIcon(u)}
                    <span>${w.formatStatus(u)}</span>
                    <span class="dropdown-shortcut">${g+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")a.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${hr.map((u,g)=>`
                <button class="dropdown-option" data-value="${u}" onclick="updateIssueField('${w.escapeJsString(n)}', 'priority', '${u}')">
                    ${w.getPriorityIcon(u)}
                    <span>${w.formatPriority(u)}</span>
                    <span class="dropdown-shortcut">${g}</span>
                </button>
            `).join("")}
        `;else if(t==="type")a.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${dp.map(u=>`
                <button class="dropdown-option" data-value="${u}" onclick="updateIssueField('${w.escapeJsString(n)}', 'issue_type', '${u}')">
                    <span class="issue-type-badge type-${u}">${w.formatIssueType(u)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const u=w.getAssigneeOptionList();a.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'assignee_id', null)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${u.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:u.map(({assignee:g,indent:b},y)=>`
                <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'assignee_id', '${w.escapeJsString(g.id)}')">
                    ${w.renderAvatar(g,"avatar-small")}
                    <span>${w.formatAssigneeOptionLabel(g,b)}</span>
                    ${y<9?`<span class="dropdown-shortcut">${y+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const u=document.querySelector(`.issue-row[data-issue-id="${n}"]`),g=(u==null?void 0:u.dataset.projectId)||((d=w.getCurrentDetailIssue())==null?void 0:d.project_id),b=w.getEstimateOptions(g);a.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${b.map((y,_)=>`
                <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'estimate', ${y.value})">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${y.label}</span>
                    ${_<9?`<span class="dropdown-shortcut">${_}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const u=w.getIssues(),g=w.getMyIssues(),b=w.getCurrentDetailIssue(),y=u.find(j=>j.id===n)||g.find(j=>j.id===n)||b,_=new Set(((y==null?void 0:y.labels)||[]).map(j=>j.id));a.innerHTML='<div class="dropdown-header">Loading labels...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const A=a.getBoundingClientRect();let R=i.bottom+4,H=i.left;H+A.width>window.innerWidth-8&&(H=i.right-A.width),R+A.height>window.innerHeight-8&&(R=i.top-A.height-4),a.style.top=`${R}px`,a.style.left=`${Math.max(8,H)}px`,w.registerDropdownClickOutside(a,{multiSelect:!0});let D=[];const O=w.getCurrentTeam();if(O)try{D=await w.api.getLabels(O.id)}catch(j){console.error("Failed to load labels:",j)}if(!a.parentNode)return;Er(a,n,D,_);const C=a.getBoundingClientRect();let G=i.bottom+4,W=i.left;W+C.width>window.innerWidth-8&&(W=i.right-C.width),G+C.height>window.innerHeight-8&&(G=i.top-C.height-4),a.style.top=`${G}px`,a.style.left=`${Math.max(8,W)}px`,a.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const u=w.getIssues(),g=w.getMyIssues(),b=w.getCurrentDetailIssue(),y=u.find(L=>L.id===n)||g.find(L=>L.id===n)||b,_=(y==null?void 0:y.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);a.innerHTML='<div class="dropdown-header">Loading sprints...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const A=a.getBoundingClientRect();let R=i.bottom+4,H=i.left;H+A.width>window.innerWidth-8&&(H=i.right-A.width),R+A.height>window.innerHeight-8&&(R=i.top-A.height-4),a.style.top=`${R}px`,a.style.left=`${Math.max(8,H)}px`,w.registerDropdownClickOutside(a);let D=[];if(_)try{D=await w.api.getSprints(_),w.updateSprintCacheForProject(_,D)}catch(L){console.error("Failed to load sprints:",L)}if(!a.parentNode)return;const O=D.filter(L=>L.status!=="completed"||L.id===(y==null?void 0:y.sprint_id));a.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'sprint_id', null)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${O.map((L,q)=>`
                <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'sprint_id', '${w.escapeJsString(L.id)}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${w.escapeHtml(L.name)}${L.status==="active"?" (Active)":""}</span>
                    ${q<9?`<span class="dropdown-shortcut">${q+1}</span>`:""}
                </button>
            `).join("")}
        `;const C=a.getBoundingClientRect();let G=i.bottom+4,W=i.left;W+C.width>window.innerWidth-8&&(W=i.right-C.width),G+C.height>window.innerHeight-8&&(G=i.top-C.height-4),a.style.top=`${G}px`,a.style.left=`${Math.max(8,W)}px`,a.classList.remove("dropdown-positioning");const j=L=>{const q=L.key;if(q==="Escape"){w.closeAllDropdowns(),document.removeEventListener("keydown",j),w.setDropdownKeyHandler(null);return}const J=parseInt(q);if(isNaN(J))return;const Y=a.querySelectorAll(".dropdown-option");let Le=!1;J===0?(An(n,"sprint_id",null),Le=!0):J>=1&&J<Y.length&&(Y[J].click(),Le=!0),Le&&(document.removeEventListener("keydown",j),w.setDropdownKeyHandler(null))};w.setDropdownKeyHandler(j),document.addEventListener("keydown",j);return}a.classList.add("dropdown-positioning"),document.body.appendChild(a);const o=a.getBoundingClientRect();let r=i.bottom+4,c=i.left;c+o.width>window.innerWidth-8&&(c=i.right-o.width),r+o.height>window.innerHeight-8&&(r=i.top-o.height-4),a.style.top=`${r}px`,a.style.left=`${Math.max(8,c)}px`,a.classList.remove("dropdown-positioning");const l=u=>{const g=u.key;if(g==="Escape"){w.closeAllDropdowns(),document.removeEventListener("keydown",l);return}const b=parseInt(g);if(isNaN(b))return;let y=!1;if(t==="status"&&b>=1&&b<=6)An(n,"status",fr[b-1]),y=!0;else if(t==="priority"&&b>=0&&b<=4)An(n,"priority",hr[b]),y=!0;else if(t==="estimate"){const _=w.getCurrentDetailIssue(),A=w.getEstimateOptions(_==null?void 0:_.project_id);b>=0&&b<A.length&&(An(n,"estimate",A[b].value),y=!0)}y&&(document.removeEventListener("keydown",l),w.setDropdownKeyHandler(null))};w.setDropdownKeyHandler(l),document.addEventListener("keydown",l),w.registerDropdownClickOutside(a)}function kr(e,t,n){e.stopPropagation(),wr(e,t,n)}function pp(e,t,n){vr=vr.then(()=>$r(e,t,n))}async function $r(e,t,n){const s=w.getIssues(),i=w.getMyIssues(),a=w.getCurrentDetailIssue(),o=s.find(d=>d.id===e)||i.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),c=r.indexOf(t);let l;if(c>=0?l=r.filter(d=>d!==t):l=[...r,t],n){const d=c<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const m=(await w.api.updateIssue(e,{label_ids:l})).labels||[],u=s.findIndex(_=>_.id===e);u!==-1&&(s[u].labels=m,w.setIssues([...s]));const g=i.findIndex(_=>_.id===e);g!==-1&&(i[g].labels=m,w.setMyIssues([...i])),(a==null?void 0:a.id)===e&&w.setCurrentDetailIssue({...a,labels:m});const b=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(b&&b.parentNode){const _=s.find(A=>A.id===e)||i.find(A=>A.id===e);_&&(b.outerHTML=w.renderIssueRow(_))}const y=document.querySelector(".property-labels-btn");y&&(y.innerHTML=m.length>0?m.map(_=>`
                    <span class="issue-label" style="background: ${w.sanitizeColor(_.color)}20; color: ${w.sanitizeColor(_.color)}">${w.escapeHtml(_.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch{if(w.showToast("Failed to update labels","error"),n){const d=c>=0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}}}function Er(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleLabelCreateKey(event, '${w.escapeJsString(t)}')">
            <button class="btn btn-small" onclick="createLabelFromDropdown('${w.escapeJsString(t)}')">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const a=s.has(i.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-label-id="${i.id}" onclick="event.stopPropagation(); toggleIssueLabel('${w.escapeJsString(t)}', '${w.escapeJsString(i.id)}', this)">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${w.sanitizeColor(i.color)}20; color: ${w.sanitizeColor(i.color)}">${w.escapeHtml(i.name)}</span>
                </button>
            `}).join("")}
    `}function mp(e,t){e.key==="Enter"&&(e.preventDefault(),Ir(t))}async function Ir(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=w.getCurrentTeam();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await w.api.createLabel(s.id,{name:i}),o=await w.api.getLabels(s.id);w.setLabels(o),a!=null&&a.id&&await $r(e,a.id,null);const r=w.getIssues(),c=w.getMyIssues(),l=w.getCurrentDetailIssue(),d=r.find(u=>u.id===e)||c.find(u=>u.id===e)||l,m=new Set(((d==null?void 0:d.labels)||[]).map(u=>u.id));t&&Er(t,e,o,m),n.value=""}catch(a){w.showToast(a.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}function $s(){const e=document.getElementById("create-issue-labels-label");e&&(je.length===0?e.textContent="Labels":e.textContent=`Labels (${je.length})`)}function Oi(e){const t=w.getLabels();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleCreateIssueLabelKey(event)">
            <button class="btn btn-small" onclick="createLabelForCreateIssue()">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=je.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" onclick="event.stopPropagation(); toggleCreateIssueLabelSelection('${w.escapeJsString(n.id)}')">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${w.sanitizeColor(n.color)}20; color: ${w.sanitizeColor(n.color)}">${w.escapeHtml(n.name)}</span>
                </button>
            `}).join("")}
    `}function gp(e){const t=je.indexOf(e);t>=0?je.splice(t,1):je.push(e),$s();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Oi(n)}function fp(e){e.key==="Enter"&&(e.preventDefault(),Tr())}async function Tr(){const e=w.getCurrentTeam();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await w.api.createLabel(e.id,{name:s}),a=await w.api.getLabels(e.id);w.setLabels(a),i!=null&&i.id&&!je.includes(i.id)&&je.push(i.id),$s(),t&&Oi(t),n.value=""}catch(i){w.showToast(i.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}async function An(e,t,n){var i;w.closeAllDropdowns();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const a={};a[t]=n;const o=await w.api.updateIssue(e,a);if(!o||!o.id)throw new Error("Invalid response from server");const r=w.getIssues(),c=r.findIndex(u=>u.id===e);c!==-1&&(r[c]=o,w.setIssues([...r]));const l=w.getMyIssues(),d=l.findIndex(u=>u.id===e);d!==-1&&(l[d]=o,w.setMyIssues([...l]));const m=w.getCurrentDetailIssue();if((m==null?void 0:m.id)===e&&w.setCurrentDetailIssue(o),s&&s.parentNode){const u=r.find(g=>g.id===e)||l.find(g=>g.id===e)||o;if(u){s.outerHTML=w.renderIssueRow(u);const g=document.querySelector(`.issue-row[data-issue-id="${e}"]`);g&&(g.classList.add("updated"),setTimeout(()=>g.classList.remove("updated"),500))}}if(w.showToast("Issue updated","success"),t==="status"){const u=(i=document.getElementById("project-filter"))==null?void 0:i.value;if(u)try{const b=(await w.api.getSprints(u)).find(y=>y.status==="active");w.updateSprintBudgetBar(b||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const u=document.getElementById("issue-detail-view");u&&!u.classList.contains("hidden")&&hp(t,o)}}catch(a){w.showToast(a.message||"Failed to update issue","error"),s&&s.classList.remove("updating")}}function hp(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".issue-detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const c of a){const l=c.querySelector(".property-label");if(l&&l.textContent.toLowerCase()===i.toLowerCase()){o=c;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${w.getStatusIcon(t.status)}
            <span>${w.formatStatus(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${w.getPriorityIcon(t.priority)}
            <span>${w.formatPriority(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${w.formatIssueType(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?w.getAssigneeById(t.assignee_id):null,l=c?w.formatAssigneeName(c):null;r.innerHTML=l?`${w.renderAvatar(c,"avatar-small")}<span>${w.escapeHtml(l)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=w.getCurrentDetailSprints(),l=t.sprint_id&&c?c.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${l?w.escapeHtml(l.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${w.formatEstimate(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}let bt={};function vp(e){bt=e}const _r=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function qi(e=null){var c;const{getProjects:t,escapeHtml:n,getStatusIcon:s,getPriorityIcon:i,showModal:a}=bt,o=e||((c=document.getElementById("project-filter"))==null?void 0:c.value);yr([]);const r=t().map(l=>`
        <option value="${l.id}" ${l.id===o?"selected":""}>${n(l.name)}</option>
    `).join("");document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <select id="create-issue-project" class="project-select" onchange="updateCreateIssueProject()">
                    <option value="">Select project</option>
                    ${r}
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
                            ${_r.map(l=>`<option value="${l.id}">${l.label}</option>`).join("")}
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
                            ${s("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${i("no_priority")}
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
    `,a(),$s(),document.getElementById("create-issue-title").focus()}function bp(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function yp(e){const t=_r.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function wp(e,t){const{getProjects:n,escapeHtml:s,escapeJsString:i,getStatusIcon:a,getPriorityIcon:o,showModal:r}=bt,c=n().find(l=>l.id===t);yr([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${c?s(c.name):"Project"}</span>
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
                            ${a("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${o("no_priority")}
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
                <button type="button" class="btn btn-primary" onclick="handleCreateSubIssue('${i(e)}', '${i(t)}')">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,r(),$s(),document.getElementById("create-issue-title").focus()}async function kp(e,t){const{api:n,showToast:s,closeModal:i,viewIssue:a}=bt,o=document.getElementById("create-issue-title").value.trim(),r=document.getElementById("create-issue-description").value.trim(),c=document.getElementById("create-issue-status").value,l=document.getElementById("create-issue-priority").value,d=document.getElementById("create-issue-type").value||"task",m=document.getElementById("create-issue-assignee").value||null,u=document.getElementById("create-issue-estimate").value,g=u?parseInt(u):null;if(!o){s("Please enter a title","error");return}try{const b=await n.createIssue(t,{title:o,description:r||null,status:c,priority:l,issue_type:d,assignee_id:m,estimate:g,label_ids:br(),parent_id:e});i(),s(`Created sub-issue ${b.identifier}`,"success"),a(e)}catch(b){s(`Failed to create sub-issue: ${b.message}`,"error")}}async function $p(e,t){var G,W;const{api:n,closeAllDropdowns:s,registerDropdownClickOutside:i,getLabels:a,formatStatus:o,formatPriority:r,formatIssueType:c,getStatusIcon:l,getPriorityIcon:d,formatAssigneeName:m,formatAssigneeOptionLabel:u,getAssigneeOptionList:g,getEstimateOptions:b,renderAvatar:y,escapeHtml:_,escapeJsString:A,getCurrentTeam:R,setLabels:H}=bt;s();const O=t.currentTarget.getBoundingClientRect(),C=document.createElement("div");if(C.className="inline-dropdown dropdown-positioning",C.style.top=`${O.top-8}px`,C.style.left=`${O.left}px`,C.style.transform="translateY(-100%)",C.style.animation="none",e==="status"){const j=document.getElementById("create-issue-status").value;C.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${["backlog","todo","in_progress","in_review","done"].map(L=>`
                <button class="dropdown-option ${L===j?"selected":""}" onclick="setCreateIssueField('status', '${L}', '${o(L)}')">
                    ${l(L)}
                    <span>${o(L)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const j=document.getElementById("create-issue-priority").value;C.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${["no_priority","urgent","high","medium","low"].map(L=>`
                <button class="dropdown-option ${L===j?"selected":""}" onclick="setCreateIssueField('priority', '${L}', '${r(L)}')">
                    ${d(L)}
                    <span>${r(L)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const j=document.getElementById("create-issue-type").value;C.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(L=>`
                <button class="dropdown-option ${L===j?"selected":""}" onclick="setCreateIssueField('type', '${L}', '${c(L)}')">
                    <span class="issue-type-badge type-${L}">${c(L)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!R())C.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let j=a();if(j.length===0)try{j=await n.getLabels(R().id),H(j)}catch(L){console.error("Failed to load labels:",L)}Oi(C),document.body.appendChild(C),requestAnimationFrame(()=>{requestAnimationFrame(()=>{C.classList.remove("dropdown-positioning")})}),i(C,{multiSelect:!0});return}else if(e==="assignee"){const j=document.getElementById("create-issue-assignee").value,L=g();C.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${j?"":"selected"}" onclick="setCreateIssueField('assignee', '', 'Assignee')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${L.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:L.map(({assignee:q,indent:J})=>{const Y=m(q)||"User";return`
                <button class="dropdown-option ${q.id===j?"selected":""}" onclick="setCreateIssueField('assignee', '${A(q.id)}', '${A(Y)}')">
                    ${y(q,"avatar-small")}
                    <span>${u(q,J)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const j=document.getElementById("create-issue-estimate").value,L=(G=document.getElementById("create-issue-project"))==null?void 0:G.value,q=b(L);C.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${q.map(J=>{const Y=J.value===null?"":String(J.value);return`
                <button class="dropdown-option ${Y===j?"selected":""}" onclick="setCreateIssueField('estimate', '${Y}', '${A(J.value?J.label:"Estimate")}')">
                    <span>${_(J.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const j=document.getElementById("create-issue-sprint").value,L=(W=document.getElementById("create-issue-project"))==null?void 0:W.value;if(!L)C.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const J=(await n.getSprints(L)).filter(Y=>Y.status!=="completed");C.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${j?"":"selected"}" onclick="setCreateIssueField('sprint', '', 'Sprint')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${J.map(Y=>`
                        <button class="dropdown-option ${Y.id===j?"selected":""}" onclick="setCreateIssueField('sprint', '${A(Y.id)}', '${A(Y.name)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${_(Y.name)}${Y.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{C.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(C),requestAnimationFrame(()=>{requestAnimationFrame(()=>{C.classList.remove("dropdown-positioning")})}),i(C)}function Ep(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Ip(e,t,n){const{getStatusIcon:s,getPriorityIcon:i,formatIssueType:a,closeAllDropdowns:o,escapeHtml:r}=bt;document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n;const c=r(n);if(e==="status"){const l=document.querySelector(".toolbar-btn:first-child");l.innerHTML=`${s(t)}<span id="create-issue-status-label">${c}</span>`}else if(e==="priority"){const l=document.querySelectorAll(".toolbar-btn")[1];l.innerHTML=`${i(t)}<span id="create-issue-priority-label">${c}</span>`}else if(e==="type"){const l=document.getElementById("create-issue-type-btn");l&&(l.innerHTML=`<span class="issue-type-badge type-${t}">${a(t)}</span><span id="create-issue-type-label">${c}</span>`)}o()}async function xr({keepOpen:e=!1}={}){var C,G;const{api:t,showToast:n,closeModal:s,viewIssue:i,getCurrentView:a,loadIssues:o,loadMyIssues:r}=bt,c=document.getElementById("create-issue-project").value,l=document.getElementById("create-issue-title").value.trim(),d=document.getElementById("create-issue-description").value.trim(),m=document.getElementById("create-issue-status").value,u=document.getElementById("create-issue-priority").value,g=document.getElementById("create-issue-type").value||"task",b=document.getElementById("create-issue-assignee").value||null,y=document.getElementById("create-issue-estimate").value,_=y?parseInt(y):null,A=((C=document.getElementById("create-issue-sprint"))==null?void 0:C.value)||null,R=(G=document.getElementById("create-issue-due-date"))==null?void 0:G.value,H=R?new Date(`${R}T00:00:00Z`).toISOString():null;if(!c){n("Please select a project","error");return}if(!l){n("Please enter a title","error");return}const D=document.getElementById("btn-create-issue"),O=document.getElementById("btn-create-and-new");D&&(D.disabled=!0),O&&(O.disabled=!0);try{const W=await t.createIssue(c,{title:l,description:d||null,status:m,priority:u,issue_type:g,assignee_id:b,estimate:_,sprint_id:A,label_ids:br(),due_date:H});n(`Created ${W.identifier}`,"success"),a()==="issues"?o():a()==="my-issues"&&r(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(s(),i(W.id))}catch(W){n(`Failed to create issue: ${W.message}`,"error")}finally{D&&(D.disabled=!1),O&&(O.disabled=!1)}}async function Tp(){await xr({keepOpen:!1})}async function _p(){await xr({keepOpen:!0})}let Es={};function xp(e){Es=e}async function Sr(e){const{api:t,showModal:n,showToast:s,escapeHtml:i,escapeAttr:a,escapeJsString:o,getEstimateOptions:r}=Es;try{const c=await t.getIssue(e),l=await t.getSprints(c.project_id),m=r(c.project_id).map(u=>`
            <option value="${u.value===null?"":u.value}" ${c.estimate===u.value?"selected":""}>${i(u.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form onsubmit="return handleUpdateIssue(event, '${o(e)}')">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${a(c.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <textarea id="edit-issue-description">${i(c.description||"")}</textarea>
                </div>
                <div class="form-group">
                    <label for="edit-issue-status">Status</label>
                    <select id="edit-issue-status">
                        <option value="backlog" ${c.status==="backlog"?"selected":""}>Backlog</option>
                        <option value="todo" ${c.status==="todo"?"selected":""}>Todo</option>
                        <option value="in_progress" ${c.status==="in_progress"?"selected":""}>In Progress</option>
                        <option value="in_review" ${c.status==="in_review"?"selected":""}>In Review</option>
                        <option value="done" ${c.status==="done"?"selected":""}>Done</option>
                        <option value="canceled" ${c.status==="canceled"?"selected":""}>Canceled</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-priority">Priority</label>
                    <select id="edit-issue-priority">
                        <option value="no_priority" ${c.priority==="no_priority"?"selected":""}>No Priority</option>
                        <option value="low" ${c.priority==="low"?"selected":""}>Low</option>
                        <option value="medium" ${c.priority==="medium"?"selected":""}>Medium</option>
                        <option value="high" ${c.priority==="high"?"selected":""}>High</option>
                        <option value="urgent" ${c.priority==="urgent"?"selected":""}>Urgent</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-type">Type</label>
                    <select id="edit-issue-type">
                        <option value="task" ${c.issue_type==="task"?"selected":""}>Task</option>
                        <option value="bug" ${c.issue_type==="bug"?"selected":""}>Bug</option>
                        <option value="feature" ${c.issue_type==="feature"?"selected":""}>Feature</option>
                        <option value="chore" ${c.issue_type==="chore"?"selected":""}>Chore</option>
                        <option value="docs" ${c.issue_type==="docs"?"selected":""}>Docs</option>
                        <option value="tech_debt" ${c.issue_type==="tech_debt"?"selected":""}>Tech Debt</option>
                        <option value="epic" ${c.issue_type==="epic"?"selected":""}>Epic</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-estimate">Estimate</label>
                    <select id="edit-issue-estimate">
                        ${m}
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-sprint">Sprint</label>
                    <select id="edit-issue-sprint">
                        <option value="">No Sprint</option>
                        ${l.filter(u=>u.status!=="completed").map(u=>`
                            <option value="${u.id}" ${c.sprint_id===u.id?"selected":""}>${i(u.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,n()}catch(c){s(`Failed to load issue: ${c.message}`,"error")}}async function Sp(e,t){const{api:n,showToast:s,closeModal:i,viewIssue:a}=Es;e.preventDefault();try{const o=document.getElementById("edit-issue-title"),r=document.getElementById("edit-issue-description"),c=document.getElementById("edit-issue-status"),l=document.getElementById("edit-issue-priority"),d=document.getElementById("edit-issue-type"),m=document.getElementById("edit-issue-estimate"),u=document.getElementById("edit-issue-sprint");if(!o||!c||!l||!d)throw new Error("Required form fields not found");const g={title:o.value,description:r?r.value:"",status:c.value,priority:l.value,issue_type:d.value,estimate:m&&m.value?parseInt(m.value):null,sprint_id:u&&u.value?u.value:null};await n.updateIssue(t,g),i(),await a(t),s("Issue updated!","success")}catch(o){s(`Failed to update issue: ${o.message}`,"error")}}async function Cp(e){const{api:t,showToast:n,loadIssues:s,loadProjects:i,navigateTo:a}=Es;if(confirm("Are you sure you want to delete this issue?"))try{await t.deleteIssue(e),await s(),await i(),a("issues"),n("Issue deleted!","success")}catch(o){n(`Failed to delete issue: ${o.message}`,"error")}}const Cr=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let lt=[],Fi=null,ae={api:null,showToast:()=>{},getProjects:()=>[],getProjectFromUrl:()=>null,setGlobalProjectSelection:()=>{},updateUrlWithProject:()=>{},escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,formatPriority:e=>e};function Lp(e){ae={...ae,...e}}function Ui(){const e=document.getElementById("board-project-filter");if(!e)return;const t=ae.getProjects();if(e.innerHTML='<option value="">Select Project</option>'+t.map(n=>`<option value="${n.id}">${ae.escapeHtml(n.name)}</option>`).join(""),!e.value){const n=ae.getProjectFromUrl();n&&t.some(s=>s.id===n)&&(e.value=n)}if(e.value)Gi(e.value);else{const n=document.getElementById("kanban-board");n&&(n.innerHTML=`
                <div class="empty-state" style="width: 100%; padding: 3rem;">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its board</p>
                </div>
            `)}}function Ap(){var t;const e=(t=document.getElementById("board-project-filter"))==null?void 0:t.value;e&&(ae.setGlobalProjectSelection(e),ae.updateUrlWithProject(e)),Gi(e)}async function Gi(e){var s;const t=e||((s=document.getElementById("board-project-filter"))==null?void 0:s.value);if(!t){Ui();return}const n=document.getElementById("kanban-board");n&&(n.innerHTML='<div class="loading-spinner" style="margin: 2rem auto;"></div>');try{lt=await ae.api.getIssues({project_id:t}),ct()}catch(i){ae.showToast(`Failed to load board: ${i.message}`,"error")}}function ct(){const e=document.getElementById("kanban-board");e&&(e.innerHTML=Cr.map(t=>{const n=lt.filter(s=>s.status===t.key);return`
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
                        <div class="kanban-card" draggable="true" data-id="${ae.escapeAttr(s.id)}"
                             ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)"
                             ondragover="handleCardDragOver(event)" ondragleave="handleCardDragLeave(event)" ondrop="handleCardDrop(event)"
                             onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${ae.escapeJsString(s.id)}'); } else { window.open('/issue/${encodeURIComponent(s.identifier)}', '_blank'); }">
                            <div class="kanban-card-title">${ae.escapeHtml(s.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${s.identifier}</span>
                                <span class="badge badge-priority-${s.priority}" style="font-size: 10px;">${ae.formatPriority(s.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""))}function Bp(e){e.dataTransfer.setData("text/plain",e.target.dataset.id),Fi=e.target.dataset.id,e.target.classList.add("dragging")}function Dp(e){e.target.classList.remove("dragging"),Fi=null}function Mp(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function jp(e){e.currentTarget.classList.remove("drag-over")}function Pp(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function Rp(e){e.currentTarget.classList.remove("drag-over")}async function Np(e){e.preventDefault(),e.currentTarget.classList.remove("drag-over");const t=e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.status,s=lt.find(a=>a.id===t);if(!s)return;const i=s.status;if(s.status=n,Lr(n,t),ct(),i!==n)try{await ae.api.updateIssue(t,{status:n}),ae.showToast("Status updated","success")}catch(a){s.status=i,ct(),ae.showToast(`Failed to update status: ${a.message}`,"error")}}async function Hp(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.classList.remove("drag-over");const t=Fi||e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.id;if(!t||!n||t===n)return;const s=e.currentTarget.closest(".kanban-column"),i=s==null?void 0:s.dataset.status;if(!i)return;const a=lt.find(r=>r.id===t);if(!a)return;const o=a.status;if(a.status=i,Lr(i,t,n),ct(),o!==i)try{await ae.api.updateIssue(t,{status:i}),ae.showToast("Status updated","success")}catch(r){a.status=o,ct(),ae.showToast(`Failed to update status: ${r.message}`,"error")}}function Lr(e,t,n=null){const s=lt.filter(o=>o.status===e&&o.id!==t),i=lt.find(o=>o.id===t);if(!i)return;if(n){const o=s.findIndex(r=>r.id===n);o>=0?s.splice(o,0,i):s.push(i)}else s.push(i);const a=[];Cr.forEach(o=>{o.key===e?a.push(...s):a.push(...lt.filter(r=>r.status===o.key))}),lt=a}const Ar=["backlog","todo","in_progress","in_review","done","canceled"],Br=["urgent","high","medium","low","no_priority"],Dr=["task","bug","feature","chore","docs","tech_debt","epic"];let M={getIssues:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatEstimate:()=>"",getSprintCache:()=>({}),formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",escapeHtml:e=>e||"",escapeAttr:e=>e||"",escapeJsString:e=>e||"",sanitizeColor:e=>e||"#888",renderAvatar:()=>"",getAssigneeOptionList:()=>[],getGroupByValue:()=>""};function Op(e){M={...M,...e}}function dt(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function qt(e){const t=dt(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function Ye(){const e=document.getElementById("issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=M.getIssues();if(t.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues found</h3>
                <p>Create your first issue to get started</p>
            </div>
        `;return}const n=M.getGroupByValue();n==="status"?qp(e,t):n==="priority"?Fp(e,t):n==="type"?Up(e,t):n==="assignee"?Gp(e,t):n==="sprint"?zp(e,t):e.innerHTML=qt(t)+t.map(s=>Pe(s)).join("")}function qp(e,t){const n={};Ar.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s=qt(t);Ar.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ut(i)}</span>
                    <span class="group-title">${M.formatStatus(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${dt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Pe(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Fp(e,t){const n={};Br.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s=qt(t);Br.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ft(i)}</span>
                    <span class="group-title">${M.formatPriority(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${dt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Pe(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Up(e,t){const n={};Dr.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s=qt(t);Dr.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${i}">${M.formatIssueType(i)}</span></span>
                    <span class="group-title">${M.formatIssueType(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${dt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Pe(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Gp(e,t){const n={},s="__unassigned__";n[s]=[];const i=M.getAssigneeOptionList();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a=qt(t);n[s].length>0&&(a+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" onclick="toggleGroup('${s}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[s].length}</span>
                    <span class="group-points">${dt(n[s])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[s].map(o=>Pe(o)).join("")}
                </div>
            </div>
        `),i.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const c=M.formatAssigneeName(o)||"Unknown",l=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${o.id}">
                <div class="issue-group-header" onclick="toggleGroup('${M.escapeJsString(o.id)}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${M.renderAvatar(o,"avatar-small")}</span>
                    <span class="group-title">${M.escapeHtml(c)}${M.escapeHtml(l)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${dt(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(d=>Pe(d)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function zp(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(c=>{c.sprint_id?(s[c.sprint_id]||(s[c.sprint_id]=[],i.push(c.sprint_id)),s[c.sprint_id].push(c)):s[n].push(c)});const a={active:0,planned:1,completed:2},o=M.getSprintCache();i.sort((c,l)=>{const d=o[c],m=o[l],u=d?a[d.status]??3:3,g=m?a[m.status]??3:3;return u-g});let r=qt(t);i.forEach(c=>{const l=s[c];if(l.length===0)return;const d=o[c],m=d?d.name:c,u=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=c.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" onclick="toggleGroup('${g}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${M.escapeHtml(m)}${u}</span>
                    <span class="group-count">${l.length}</span>
                    <span class="group-points">${dt(l)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${l.map(b=>Pe(b)).join("")}
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
                    <span class="group-points">${dt(s[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${s[n].map(c=>Pe(c)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function Kp(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Pe(e){const t=e.assignee_id?M.getAssigneeById(e.assignee_id):null,n=t?M.formatAssigneeName(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?M.formatEstimate(e.estimate,e.project_id):"",a=e.sprint_id?M.getSprintCache()[e.sprint_id]:null,o=a?a.name:null;return`
        <div class="issue-row" data-issue-id="${M.escapeAttr(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${M.escapeAttr(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'priority', '${M.escapeJsString(e.id)}')" title="Priority: ${M.formatPriority(e.priority)}">
                    ${Ft(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'status', '${M.escapeJsString(e.id)}')" title="Status: ${M.formatStatus(e.status)}">
                    ${Ut(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${M.formatIssueType(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${M.escapeJsString(e.id)}'); }">${M.escapeHtml(e.title)}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(r=>`
                            <span class="issue-label" style="background: ${M.sanitizeColor(r.color)}20; color: ${M.sanitizeColor(r.color)}">${M.escapeHtml(r.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'sprint', '${M.escapeJsString(e.id)}')" title="Sprint: ${o?M.escapeHtml(o):"None"}">
                    ${o?`<span class="sprint-badge">${M.escapeHtml(o)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'estimate', '${M.escapeJsString(e.id)}')" title="Estimate: ${i||"None"}">
                    ${i?`<span class="estimate-badge">${i}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'assignee', '${M.escapeJsString(e.id)}')" title="${M.escapeAttr(n||"Unassigned")}">
                    ${n?M.renderAvatar(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function Ft(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Ut(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}function Wp(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Mr)},0))}function Mr(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Mr))}function yt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function wt(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function kt(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function zi(){const e=yt(),n=document.getElementById("status-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=st(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`,Ze(),$e(),Ee()}function Ki(){document.getElementById("status-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),zi()}function Wi(){const e=wt(),n=document.getElementById("priority-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Fe(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`,Ze(),$e(),Ee()}function Vi(){document.getElementById("priority-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),Wi()}function Ji(){var s,i;const e=kt(),t=document.getElementById("label-filter-dropdown"),n=t.querySelector(".multi-select-label");if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`;Ze(),$e(),Ee()}function Yi(){document.getElementById("label-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),Ji()}function jr(){var s,i;const e=kt(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}async function Vp(){const e=document.getElementById("label-filter-dropdown");if(!e||!window.currentTeam)return;const t=e.querySelector(".multi-select-options");try{const n=await api.getLabels(window.currentTeam.id);t.innerHTML="",n.length===0?t.innerHTML='<div class="multi-select-empty">No labels available</div>':n.forEach(i=>{const a=document.createElement("label");a.className="multi-select-option",a.innerHTML=`
                    <input type="checkbox" value="${i.id}" onchange="updateLabelFilter()">
                    <span class="label-badge" style="background: ${ye(i.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                        <span class="label-name">${f(i.name)}</span>
                    </span>
                `,t.appendChild(a)});const s=document.createElement("div");s.className="multi-select-actions",s.innerHTML='<button type="button" class="btn btn-small" onclick="clearLabelFilter()">Clear</button>',t.appendChild(s)}catch(n){console.error("Failed to load labels for filter:",n)}}function Pr(){var m,u,g,b,y;const e=new URLSearchParams,t=yt(),n=wt(),s=kt(),i=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,a=(u=document.getElementById("project-filter"))==null?void 0:u.value,o=(g=document.getElementById("sprint-filter"))==null?void 0:g.value,r=(b=document.getElementById("issue-type-filter"))==null?void 0:b.value,c=(y=document.getElementById("group-by-select"))==null?void 0:y.value;t.forEach(_=>e.append("status",_)),n.forEach(_=>e.append("priority",_)),s.forEach(_=>e.append("label",_)),i&&e.set("assignee",i),a&&e.set("project",a),o&&e.set("sprint",o),r&&e.set("issue_type",r),c&&e.set("groupBy",c);const l=e.toString(),d=l?`/issues?${l}`:"/issues";history.replaceState({view:"issues"},"",d)}function Jp(){const e=new URLSearchParams(window.location.search),t=e.getAll("status");if(t.length>0){const l=document.getElementById("status-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=t.includes(m.value)}),Yp())}const n=e.getAll("priority");if(n.length>0){const l=document.getElementById("priority-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=n.includes(m.value)}),Zp())}const s=e.get("assignee");if(s){const l=document.getElementById("assignee-filter");l&&(l.value=s)}const i=e.get("project");if(i){const l=document.getElementById("project-filter");l&&(l.value=i)}const a=e.get("sprint");if(a){const l=document.getElementById("sprint-filter");l&&(l.value=a)}const o=e.get("issue_type");if(o){const l=document.getElementById("issue-type-filter");l&&(l.value=o)}const r=e.getAll("label");if(r.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=r.includes(m.value)}),jr())}const c=e.get("groupBy");if(c){const l=document.getElementById("group-by-select");l&&(l.value=c)}}function Yp(){const e=yt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=st(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function Zp(){const e=wt(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Fe(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}const Rr=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"}];function Xp(e){e.stopPropagation();const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Gt)):(t.classList.remove("hidden"),_e(),xe(Oo()),setTimeout(()=>{document.addEventListener("click",Gt)},0))}function Qp(e){e.stopPropagation();const t=document.getElementById("display-menu-dropdown"),n=document.getElementById("filter-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Gt)):(t.classList.remove("hidden"),bm(),setTimeout(()=>{document.addEventListener("click",Gt)},0))}function Gt(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");!e.target.closest(".filter-menu-container")&&!e.target.closest(".display-menu-container")&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Gt))}function Nr(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Gt)}function Hr(e){var t,n,s,i;switch(e){case"project":return(t=document.getElementById("project-filter"))!=null&&t.value?1:0;case"status":return yt().length;case"priority":return wt().length;case"type":return(n=document.getElementById("issue-type-filter"))!=null&&n.value?1:0;case"assignee":return(s=document.getElementById("assignee-filter"))!=null&&s.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return kt().length;default:return 0}}function em(){let e=0;return Rr.forEach(t=>{e+=Hr(t.key)}),e}function _e(){const e=document.getElementById("filter-menu-categories");e&&(e.innerHTML=Rr.map(t=>{const n=Hr(t.key);return`
            <div class="filter-menu-category ${Oo()===t.key?"active":""}"
                 onclick="showFilterCategoryOptions('${t.key}')">
                <span>${t.label}</span>
                ${n>0?`<span class="filter-menu-category-count">${n}</span>`:'<span class="filter-menu-category-arrow">→</span>'}
            </div>
        `}).join(""))}function xe(e){zd(e),_e();const t=document.getElementById("filter-menu-options");if(t)switch(e){case"project":tm(t);break;case"status":nm(t);break;case"priority":sm(t);break;case"type":im(t);break;case"assignee":am(t);break;case"sprint":om(t);break;case"labels":rm(t);break}}function tm(e){const t=document.getElementById("project-filter"),n=(t==null?void 0:t.value)||"",s=se()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${n?'<button class="filter-options-clear" onclick="clearProjectFilter()">Clear</button>':""}
        </div>
        <label class="filter-option" onclick="setProjectFilter('')">
            <input type="radio" name="project-filter-radio" value="" ${n?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setProjectFilter('${I(a.id)}')">
                <input type="radio" name="project-filter-radio" value="${T(a.id)}" ${n===a.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ye(a.color)};"></span>
                <span class="filter-option-label">${f(a.name)}</span>
            </label>
        `}),e.innerHTML=i}function nm(e){const t=yt(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Status</span>
            ${t.length>0?'<button class="filter-options-clear" onclick="clearStatusFilterNew()">Clear</button>':""}
        </div>
    `;n.forEach(i=>{s+=`
            <label class="filter-option">
                <input type="checkbox" value="${i.value}" ${t.includes(i.value)?"checked":""} onchange="toggleStatusOption('${i.value}', event)">
                <span class="filter-option-icon">${i.icon}</span>
                <span class="filter-option-label">${i.label}</span>
            </label>
        `}),e.innerHTML=s}function sm(e){const t=wt(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
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
        `}),e.innerHTML=s}function im(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" onclick="clearTypeFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setTypeFilter('${a.value}')">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function am(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=Bt()||[];let i=`
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
            <label class="filter-option" onclick="setAssigneeFilter('${I(a.user_id)}')">
                <input type="radio" name="assignee-filter-radio" value="${T(a.user_id)}" ${n===a.user_id?"checked":""}>
                <span class="filter-option-label">${f(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function om(e){const t=document.getElementById("sprint-filter"),n=(t==null?void 0:t.value)||"",s=t?Array.from(t.options):[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${n?'<button class="filter-options-clear" onclick="clearSprintFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setSprintFilter('${I(a.value)}')">
                <input type="radio" name="sprint-filter-radio" value="${T(a.value)}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${f(a.text)}</span>
            </label>
        `}),e.innerHTML=i}function rm(e){const t=kt(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" onclick="clearLabelFilterNew()">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),l=(r==null?void 0:r.textContent)||"Label",d=(c==null?void 0:c.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${T(a.value)}" ${t.includes(a.value)?"checked":""} onchange="toggleLabelOption('${I(a.value)}', event)">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ye(d)};"></span>
                    <span class="filter-option-label">${f(l)}</span>
                </label>
            `}),e.innerHTML=i}function Or(e){const t=document.getElementById("project-filter");t&&(t.value=e,zr()),_e(),xe("project"),$e(),Ee()}function lm(){Or("")}function cm(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,zi()),_e(),xe("status")}function dm(){Ki(),_e(),xe("status"),$e(),Ee()}function um(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Wi()),_e(),xe("priority")}function pm(){Vi(),_e(),xe("priority"),$e(),Ee()}function qr(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Ze()),_e(),xe("type"),$e(),Ee()}function mm(){qr("")}function Fr(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Ze()),_e(),xe("assignee"),$e(),Ee()}function gm(){Fr("")}function Ur(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Ze()),_e(),xe("sprint"),$e(),Ee()}function fm(){Ur("")}function hm(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Ji()),_e(),xe("labels")}function vm(){Yi(),_e(),xe("labels"),$e(),Ee()}function bm(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function ym(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,$t()),Nr()}function wm(e){const t=document.getElementById("group-by-select");t&&(t.value=e,Kr()),Nr()}function $e(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=document.getElementById("project-filter");if(n!=null&&n.value){const m=(se()||[]).find(u=>u.id===n.value);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearFn:"clearProjectFilter()"})}const s=yt();if(s.length>0){const d=s.map(m=>st(m)).join(", ");t.push({category:"status",label:"Status",value:d,clearFn:"clearStatusFilterNew()"})}const i=wt();if(i.length>0){const d=i.map(m=>Fe(m)).join(", ");t.push({category:"priority",label:"Priority",value:d,clearFn:"clearPriorityFilterNew()"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const d=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:d?d.text:a.value,clearFn:"clearTypeFilter()"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let d;if(o.value==="me")d="Me";else if(o.value==="unassigned")d="Unassigned";else{const u=(Bt()||[]).find(g=>g.user_id===o.value);d=(u==null?void 0:u.name)||(u==null?void 0:u.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:d,clearFn:"clearAssigneeFilter()"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const d=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(d==null?void 0:d.text)||r.value,clearFn:"clearSprintFilter()"})}const c=kt();if(c.length>0){const d=document.getElementById("label-filter-dropdown"),m=c.map(u=>{var y;const g=d==null?void 0:d.querySelector(`input[value="${u}"]`),b=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearFn:"clearLabelFilterNew()"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let l=t.map(d=>`
        <span class="filter-chip">
            <span class="filter-chip-label">${d.label}:</span>
            <span class="filter-chip-value">${f(d.value)}</span>
            <button class="filter-chip-remove" onclick="${d.clearFn}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(l+='<button class="filter-chips-clear-all" onclick="clearAllFilters()">Clear all</button>'),e.innerHTML=l}function km(){const e=document.getElementById("project-filter");e&&(e.value=""),Ki(),Vi();const t=document.getElementById("issue-type-filter");t&&(t.value="");const n=document.getElementById("assignee-filter");n&&(n.value="");const s=document.getElementById("sprint-filter");s&&(s.value=""),Yi(),Ze(),$e(),Ee()}function Ee(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=em();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}function $m(){$e(),Ee();const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&!e._clickHandlerAdded&&(e.addEventListener("click",n=>{n.stopPropagation()}),e._clickHandlerAdded=!0),t&&!t._clickHandlerAdded&&(t.addEventListener("click",n=>{n.stopPropagation()}),t._clickHandlerAdded=!0)}async function Gr(){var i;const e=document.getElementById("sprint-filter");if(!e)return;const t=(i=document.getElementById("project-filter"))==null?void 0:i.value,n=e.value;let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;if(t||Zi(null),t)try{const a=await api.getSprints(t),o=a.find(r=>r.status==="active");o&&(s+=`<option value="current">Current Sprint (${f(o.name)})</option>`),Zi(o||null),a.forEach(r=>{const c=r.status==="active"?" (Active)":r.status==="completed"?" (Done)":"";s+=`<option value="${r.id}">${f(r.name)}${c}</option>`})}catch(a){console.error("Failed to load sprints:",a)}e.innerHTML=s,n&&Array.from(e.options).some(o=>o.value===n)&&(e.value=n)}function Zi(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${f(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${f(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}async function $t(){var m,u,g,b,y,_,A;if(qo(-1),!window.currentTeam)return;const e=document.getElementById("project-filter").value,t=yt(),n=wt(),s=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,i=(g=(u=document.getElementById("issue-search"))==null?void 0:u.value)==null?void 0:g.trim();if(!e&&se().length===0){document.getElementById("issues-list").innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create a project first to add issues</p>
            </div>
        `;return}Im();const a={limit:1e3},o=((b=document.getElementById("sort-by-select"))==null?void 0:b.value)||"created-desc",[r,c]=o.includes("-")?o.split("-"):[o,null];a.sort_by=r,c&&(a.order=c),t.length>0&&(a.status=t),n.length>0&&(a.priority=n),s&&(s==="me"?a.assignee_id=(y=fi())==null?void 0:y.id:a.assignee_id=s);const l=(_=document.getElementById("sprint-filter"))==null?void 0:_.value;if(l)if(l==="current"){if(e)try{const H=(await api.getSprints(e)).find(D=>D.status==="active");H&&(a.sprint_id=H.id)}catch(R){console.error("Failed to resolve current sprint:",R)}}else a.sprint_id=l;const d=(A=document.getElementById("issue-type-filter"))==null?void 0:A.value;d&&(a.issue_type=d),i&&i.length>=2&&(a.search=i);try{let R;e?(a.project_id=e,R=await api.getIssues(a)):se().length>0&&(R=await api.getTeamIssues(window.currentTeam.id,a));const H=kt();H.length>0&&(R=R.filter(O=>!O.labels||O.labels.length===0?!1:O.labels.some(C=>H.includes(C.id)))),Ge(R);const D=[...new Set(R.map(O=>O.project_id))];await Ko(D),Ye()}catch(R){v(R.message,"error")}}function Em(){clearTimeout(Jd()),Yd(setTimeout(()=>{$t()},300))}function Im(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}function Ze(){Pr(),$t()}async function zr(){var t;const e=(t=document.getElementById("project-filter"))==null?void 0:t.value;e&&ht(e),await Gr(),Ui(),Go(),Ze()}async function Kr(){if(Pr(),Wr()==="sprint"){const e=De(),t=[...new Set(e.map(n=>n.project_id))];await Ko(t)}Ye()}function Wr(){const e=document.getElementById("group-by-select");return e?e.value:""}const Xi={},Is=new Map;let Qi=null,ea=null,ta=null,na=null,sa=null,ia=null,Vr=!1;function Tm(e){Object.assign(Xi,e)}function _m({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i,epicNavigate:a}={}){e&&(Qi=e),t&&(ea=t),n&&(ta=n),s&&(na=s),i&&(sa=i),a&&(ia=a)}function xm(){return Object.keys(Xi)}function X(e,t=!0){if(t&&Is.set(window.location.href,window.scrollY),Gd(e),t){let i;const a=vt(),o=["issues","board","sprints"];e==="my-issues"?i="/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:o.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),Qi&&Qi();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const i=document.getElementById(`${e}-view`);i&&i.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const s=Xi[e];s&&s(),t&&window.scrollTo(0,0)}function Jr(){var s;const t=window.location.pathname.split("/").filter(Boolean);na&&na();let n="my-issues";if(t.length===0||t[0]==="")X("my-issues",!1);else{if(ea&&ea(t))return;n=t[0],xm().includes(n)?X(n,!1):(n="my-issues",X("my-issues",!1))}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function aa(e){Is.set(window.location.href,window.scrollY),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),sa&&sa(e)}function Sm(e){Is.set(window.location.href,window.scrollY),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),ia&&ia(e)}function Yr(){const e=Is.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function Cm(){Vr||(Vr=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&ta&&ta(e.state)){Yr();return}(t=e.state)!=null&&t.view?X(e.state.view,!1):Jr(),Yr()}))}async function Lm(){const e=document.getElementById("epics-project-filter");if(!e)return;await we(),e.innerHTML='<option value="">All Projects</option>'+se().map(n=>`<option value="${T(n.id)}">${f(n.name)}</option>`).join("");const t=vt()||bn();t&&se().some(n=>n.id===t)&&(e.value=t),oa()}function Am(){var t;const e=(t=document.getElementById("epics-project-filter"))==null?void 0:t.value;e&&(ht(e),os(e)),oa()}async function oa(){var t,n;const e=document.getElementById("epics-list");if(e){e.innerHTML='<div class="loading">Loading epics...</div>';try{if(!((t=window.currentTeam)!=null&&t.id)){e.innerHTML='<div class="empty-state">Select a team to view epics.</div>';return}const s=(n=document.getElementById("epics-project-filter"))==null?void 0:n.value;let i;if(s?i=await $.getIssues({project_id:s,issue_type:"epic"}):i=await $.getTeamIssues(window.currentTeam.id,{issue_type:"epic"}),!i||i.length===0){e.innerHTML=`
                <div class="empty-state">
                    <p>No epics found.</p>
                    <p class="empty-state-hint">Click "+ New Epic" above or use the CLI: <code>chaotic epic create "Epic title"</code></p>
                </div>
            `;return}const a=await Promise.all(i.map(async o=>{let r=[];try{r=await $.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));Bm(a,e)}catch(s){e.innerHTML=`<div class="empty-state">Failed to load epics: ${f(s.message||String(s))}</div>`}}}function Bm(e,t){const n=e.map(s=>{const i=s.subIssues?s.subIssues.length:0,a=s.subIssues?s.subIssues.filter(m=>m.status==="done"||m.status==="canceled").length:0,o=i>0?Math.round(a/i*100):0,r=i>0?`${a}/${i}`:"-",c=`status-${(s.status||"backlog").replace(/_/g,"-")}`,l=(s.status||"backlog").replace(/_/g," ").replace(/\b\w/g,m=>m.toUpperCase()),d=s.estimate!=null?`${s.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${T(s.identifier)}" style="cursor: pointer;">
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
                <td class="epic-estimate">${d}</td>
                <td class="epic-status"><span class="status-badge ${c}">${l}</span></td>
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
    `,t._epicClickHandler||(t._epicClickHandler=s=>{const i=s.target.closest(".epic-row");i&&i.dataset.identifier&&Sm(i.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function Dm(){var n;const e=(n=document.getElementById("epics-project-filter"))==null?void 0:n.value,t=se().map(s=>`
        <option value="${T(s.id)}" ${s.id===e?"selected":""}>${f(s.name)}</option>
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
    `,N(),document.getElementById("create-epic-form").addEventListener("submit",Mm),document.getElementById("create-epic-title").focus()}async function Mm(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),s=document.getElementById("create-epic-description").value.trim();if(!t){v("Please select a project","error");return}if(!n){v("Please enter a title","error");return}try{const i=await $.createIssue(t,{title:n,description:s||null,issue_type:"epic"});K(),v(`Created epic ${i.identifier}`,"success"),oa()}catch(i){v(`Failed to create epic: ${i.message}`,"error")}}let B={api:null,getCurrentView:()=>"epics",showToast:()=>{},navigateTo:()=>{},getProjects:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatStatus:e=>e,formatPriority:e=>e,formatEstimate:e=>e||"None",formatTimeAgo:()=>"",getStatusIcon:()=>"",getPriorityIcon:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888"};function jm(e){B={...B,...e}}async function ra(e){try{let t;if(e.includes("-")?t=await B.api.getIssueByIdentifier(e):t=await B.api.getIssue(e),t){if(t.issue_type!=="epic"){window.viewIssue?window.viewIssue(t.id,!1):B.navigateTo("epics",!1);return}await la(t.id,!1)}else B.navigateTo("epics",!1)}catch{B.navigateTo("epics",!1)}}async function la(e,t=!0){try{const[n,s,i,a]=await Promise.all([B.api.getIssue(e),B.api.getSubIssues(e),B.api.getActivities(e),B.api.getComments(e)]);if(n.issue_type!=="epic"){window.viewIssue?window.viewIssue(e,t):B.navigateTo("epics",!1);return}t&&history.pushState({epicId:e,view:B.getCurrentView()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(y=>y.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=B.getCurrentView()||"epics",c=B.getProjects().find(y=>y.id===n.project_id),l=n.assignee_id?B.getAssigneeById(n.assignee_id):null,d=l?B.formatAssigneeName(l):null,m=s.length,u=s.filter(y=>y.status==="done"||y.status==="canceled").length,g=m>0?Math.round(u/m*100):0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${r}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${c?B.escapeHtml(c.name):"Project"} › ${B.escapeHtml(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${B.escapeHtml(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${ps(n.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${g===100?" epic-progress-complete":""}" style="width: ${g}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${u} of ${m} done</span>
                                <span>${g}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:s.map(y=>{const _=y.assignee_id?B.getAssigneeById(y.assignee_id):null,A=_?B.formatAssigneeName(_):null;return`
                                <div class="sub-issue-item" data-issue-id="${B.escapeAttr(y.id)}" data-identifier="${B.escapeAttr(y.identifier)}">
                                    <span class="sub-issue-status">${B.getStatusIcon(y.status)}</span>
                                    <span class="sub-issue-id">${B.escapeHtml(y.identifier)}</span>
                                    <span class="sub-issue-title">${B.escapeHtml(y.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(y.status||"backlog").replace(/_/g,"-")}">${B.formatStatus(y.status)}</span>
                                    ${A?`<span class="sub-issue-assignee">${B.escapeHtml(A)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${i.length===0?`
                                <div class="activity-empty">No activity yet</div>
                            `:i.map(y=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Ei(y.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Ti(y)}</span>
                                        <span class="activity-actor">by ${B.escapeHtml(Ii(y))}</span>
                                        <span class="activity-time">${B.formatTimeAgo(y.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${a.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${a.map(y=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(y.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${B.escapeHtml(y.author_name||"User")}</span>
                                            <span class="comment-date">${B.formatTimeAgo(y.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${B.escapeHtml(y.content||"")}</div>
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
                                ${B.getStatusIcon(n.status)}
                                ${B.formatStatus(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${B.getPriorityIcon(n.priority)}
                                ${B.formatPriority(n.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${d?B.escapeHtml(d):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${B.formatEstimate(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(y=>`
                                    <span class="issue-label" style="background: ${B.sanitizeColor(y.color)}20; color: ${B.sanitizeColor(y.color)}">${B.escapeHtml(y.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${c?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${B.escapeHtml(c.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const b=o.querySelector(".sub-issues-list");b&&b.addEventListener("click",y=>{const _=y.target.closest(".sub-issue-item");_&&_.dataset.issueId&&window.viewIssue&&window.viewIssue(_.dataset.issueId)})}catch(n){B.showToast(`Failed to load epic: ${n.message}`,"error")}}function Pm(e){let t=!1,n=null;return function(i){if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){switch(t=!1,clearTimeout(n),i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break}return}switch(i.key){case"c":i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}function Rm(e){return function(n){var s;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const i=e.getModalForm();if(i)n.preventDefault(),i.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const i=(s=document.activeElement)==null?void 0:s.closest("form");i&&(n.preventDefault(),i.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.openCommandPalette())}}}function Zr(e,t,n="#issues-list .list-item"){const s=document.querySelectorAll(n);s.length!==0&&(e=Math.max(0,Math.min(s.length-1,e)),s.forEach(i=>i.classList.remove("keyboard-selected")),t(e),s[e].classList.add("keyboard-selected"),s[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Nm(e){return function(n){if(e.getCurrentView()!=="issues"||n.target.tagName==="INPUT"||n.target.tagName==="TEXTAREA"||n.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll("#issues-list .list-item");if(s.length===0)return;const i=e.getSelectedIndex();switch(n.key){case"j":n.preventDefault(),Zr(i+1,e.setSelectedIndex);break;case"k":n.preventDefault(),Zr(i-1,e.setSelectedIndex);break;case"Enter":if(i>=0&&s[i]){n.preventDefault();const a=s[i].dataset.id;a&&!a.startsWith("temp-")&&e.viewIssue(a)}break;case"e":if(i>=0&&s[i]){n.preventDefault();const a=s[i].dataset.id;a&&!a.startsWith("temp-")&&e.showEditIssueModal(a)}break}}}const ut=new Map,Xr=6e4,ca=100;let de=null,da=null,ua=null,Bn=null,Qr=!1;const Hm={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},Om={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},el={api:null};let pa={...el};function qm(e={}){pa={...el,...e},de||(de=document.createElement("div"),de.className="issue-tooltip",de.style.display="none",document.body.appendChild(de),de.addEventListener("mouseenter",()=>{clearTimeout(da)}),de.addEventListener("mouseleave",()=>{ma()})),Qr||(document.addEventListener("mouseover",Fm),document.addEventListener("mouseout",Um),Qr=!0)}function Fm(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=Gm(t);if(n){if(n===Bn&&de.style.display!=="none"){clearTimeout(da);return}clearTimeout(ua),ua=setTimeout(()=>{zm(t,n)},200)}}function Um(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(ua),da=setTimeout(()=>{ma()},150))}function Gm(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function zm(e,t){Bn=t;const n=e.getBoundingClientRect();de.style.left=`${n.left+window.scrollX}px`,de.style.top=`${n.bottom+window.scrollY+8}px`,de.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',de.style.display="block";try{const s=await Wm(t);if(Bn!==t)return;Vm(s)}catch{if(Bn!==t)return;de.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function ma(){de&&(de.style.display="none"),Bn=null}function Km(){const e=Date.now();for(const[t,n]of ut.entries())e-n.timestamp>=Xr&&ut.delete(t)}async function Wm(e){ut.size>ca/2&&Km();const t=ut.get(e);if(t&&Date.now()-t.timestamp<Xr)return t.issue;if(!pa.api)throw new Error("API not initialized");const n=await pa.api.getIssueByIdentifier(e);if(ut.size>=ca){const s=Array.from(ut.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,ca/2);for(const[a]of i)ut.delete(a)}return ut.set(e,{issue:n,timestamp:Date.now()}),n}function Vm(e){const t=Hm[e.status]||"#6b7280",n=Om[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";de.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${f(e.identifier)}</span>
            <span class="issue-tooltip-type">${f(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${f(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${Jm(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${Ym(e.priority)}</span>
        </div>
    `}function Jm(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Ym(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}let Dn=0,Mn=null;const Et=new Map;function Xe(e,t){return Et.has(e)||Et.set(e,new Set),Et.get(e).add(t),()=>{var n;return(n=Et.get(e))==null?void 0:n.delete(t)}}function Zm(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}function tl(e){Mn&&(clearTimeout(Mn),Mn=null);const t=Zd();t&&(t.close(),Fo(null));const n=api.getToken();if(!n)return;const i=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(n)}&team_id=${encodeURIComponent(e)}`;try{const a=new WebSocket(i);Fo(a),a.onopen=()=>{console.log("WebSocket connected"),Dn>0&&v("Live updates reconnected","success"),Dn=0},a.onmessage=o=>{let r;try{r=JSON.parse(o.data)}catch(c){console.error("WebSocket: malformed message",c);return}Xm(r)},a.onclose=()=>{console.log("WebSocket disconnected"),Dn++,Dn===1&&v("Live updates disconnected. Reconnecting...","warning");const o=Zm(Dn-1);Mn=setTimeout(()=>{Mn=null,window.currentTeam&&window.currentTeam.id===e&&tl(e)},o)},a.onerror=o=>{console.error("WebSocket error:",o)}}catch(a){console.error("Failed to connect WebSocket:",a)}}function Xm(e){const{type:t,entity:n,data:s}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const i={type:t,entity:n},a=Et.get(`${n}:${t}`);if(a)for(const c of a)try{c(s,i)}catch(l){console.error(`WebSocket handler error (${n}:${t}):`,l)}const o=Et.get(n);if(o)for(const c of o)try{c(s,i)}catch(l){console.error(`WebSocket handler error (${n}):`,l)}const r=Et.get("*");if(r)for(const c of r)try{c(s,i)}catch(l){console.error("WebSocket handler error (*):",l)}}function Qm(){Xe("issue:created",eg),Xe("issue:updated",tg),Xe("issue:deleted",ng),Xe("comment",sg),Xe("relation",ig),Xe("attestation",ag),Xe("activity",og),Xe("project",rg),Xe("sprint",lg)}function eg(e){var i,a;const t=De(),n=t.findIndex(o=>o.id===e.id),s=t.findIndex(o=>o._isOptimistic&&o.title===e.title);if(!(n>=0))if(s>=0){const o=[...t];o[s]=e,Ge(o),U()==="issues"&&Ye()}else Ge([e,...t]),U()==="issues"&&Ye(),v(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((i=fi())==null?void 0:i.id)){const o=ys(),r=o.findIndex(l=>l.id===e.id),c=o.findIndex(l=>l._isOptimistic&&l.title===e.title);if(r===-1&&c===-1)Tn([e,...o]),U()==="my-issues"&&_n();else if(c>=0){const l=[...o];l[c]=e,Tn(l),U()==="my-issues"&&_n()}}U()==="my-issues"&&Rt({showLoading:!1}),U()==="board"?ct():U()==="sprints"&&Ke(),U()==="issue-detail"&&e.parent_id===((a=window.currentDetailIssue)==null?void 0:a.id)&&ie(window.currentDetailIssue.id,!1)}function tg(e){const t=De();t.some(s=>s.id===e.id)&&Ge(t.map(s=>s.id===e.id?e:s));const n=ys();if(n.some(s=>s.id===e.id)&&Tn(n.map(s=>s.id===e.id?e:s)),U()==="issues")Ye();else if(U()==="my-issues")_n(),Rt({showLoading:!1});else if(U()==="board")ct();else if(U()==="sprints")Ke();else if(U()==="issue-detail"){const s=document.getElementById("issue-detail-content");s&&s.dataset.issueId===e.id&&ie(e.id)}}function ng(e){var t;Ge(De().filter(n=>n.id!==e.id)),Tn(ys().filter(n=>n.id!==e.id)),U()==="issues"?Ye():U()==="my-issues"?(_n(),Rt({showLoading:!1})):U()==="board"?ct():U()==="sprints"&&Ke(),v(`Issue ${e.identifier} deleted`,"info"),U()==="issue-detail"&&((t=window.currentDetailIssue)==null?void 0:t.id)===e.id&&(v(`Issue ${e.identifier} was deleted`,"warning"),X("my-issues"))}function sg(e){var t;U()==="my-issues"&&Rt({showLoading:!1}),U()==="issue-detail"&&((t=window.currentDetailIssue)==null?void 0:t.id)===e.issue_id&&ie(e.issue_id,!1)}function ig(e){var t;if(U()==="issue-detail"){const n=(t=window.currentDetailIssue)==null?void 0:t.id;n&&(e.source_issue_id===n||e.target_issue_id===n)&&ie(n,!1)}}function ag(e){var t;U()==="gate-approvals"&&typeof window.loadGateApprovals=="function"&&window.loadGateApprovals(),U()==="issue-detail"&&((t=window.currentDetailIssue)==null?void 0:t.id)===e.issue_id&&ie(e.issue_id,!1)}function og(e){var t;U()==="my-issues"&&Rt({showLoading:!1}),U()==="issue-detail"&&((t=window.currentDetailIssue)==null?void 0:t.id)===e.issue_id&&ie(e.issue_id,!1)}function rg(e,{type:t}){we().then(()=>{U()==="projects"&&Dt()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?v(`New project: ${e.name}`,"info"):t==="deleted"&&v(`Project ${e.name} deleted`,"info")}function lg(){U()==="sprints"&&Ke()}window.currentTeam=null;let jn=[];function nl(){const e=document.getElementById("hamburger-btn");e&&e.setAttribute("aria-expanded",String(document.body.classList.contains("sidebar-open")))}function cg(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),nl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(sl);n&&n.focus()}}}function Ts(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),nl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}const sl='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.querySelector(".sidebar");if(!t)return;const n=t.querySelectorAll(sl);if(n.length===0)return;const s=n[0],i=n[n.length-1];if(!t.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Ts()}),_m({beforeNavigate:()=>{Bo(),window._onRitualsChanged=null,window.currentDetailIssue=null,window.currentDetailSprints=null,Ts(),ma()},detailRoute:e=>e[0]==="epic"&&e[1]?(ra(e[1]),!0):e[0]==="issue"&&e[1]?(gs(e[1]),!0):e[0]==="document"&&e[1]?(pg(e[1]),!0):e[0]==="sprint"&&e[1]?(su(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Lo(e[1]),!0):!1,detailPopstate:e=>e.epicId?(la(e.epicId,!1),!0):e.issueId?(ie(e.issueId,!1),!0):e.identifier?(gs(e.identifier),!0):e.documentId?(Ce(e.documentId,!1),!0):e.sprintId?(bi(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=vt();e&&se().some(t=>t.id===e)&&ht(e)},issueNavigate:e=>gs(e),epicNavigate:e=>ra(e)}),Tm({"my-issues":()=>{Bi(),Rt()},"gate-approvals":()=>{$n()},issues:()=>{Jp(),$m(),Vp().then(()=>{const t=new URLSearchParams(window.location.search).getAll("label");if(t.length>0){const n=document.getElementById("label-filter-dropdown");n&&(n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),jr())}}),Gr().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}$t()})},epics:()=>{Lm()},board:()=>{Ui()},projects:()=>{we().then(Dt)},sprints:()=>{Go()},rituals:()=>{Xo()},documents:()=>{Lt()},team:()=>{ui(),To(),ns()},settings:()=>{Li(),oi(),Bu()}}),document.addEventListener("DOMContentLoaded",async()=>{if(dg(),ug(),qm({api}),Cm(),Qm(),api.getToken())try{const e=await api.getMe();Ud(e),window.currentUser=e,await il()}catch{api.logout(),Xn()}else Xn()});function dg(){const e=document.getElementById("theme-toggle");if(!e)return;const n=localStorage.getItem("chaotic_theme")==="light";document.body.classList.toggle("theme-light",n),e.checked=n,e.addEventListener("change",()=>{const s=e.checked;document.body.classList.toggle("theme-light",s),localStorage.setItem("chaotic_theme",s?"light":"dark")})}function ug(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");aa(s)}}})}async function il(){so(),co(),await ts();const e=yo();if(e.length===0&&!dr()){Pi();return}e.length>0&&await ci(e[0],!0)}window.initApp=il,window.viewIssue=ie,window.viewIssueByPath=gs,window.viewEpic=la,window.viewEpicByPath=ra,window.toggleTicketRituals=Jo,window.toggleSection=Vo,window.connectWebSocket=tl,window.buildAssignees=()=>lp(Bt,cd),window.updateAssigneeFilter=cp,window.loadLabels=fg,window.resetOnboarding=Ni,window.viewDocument=Ce;async function pg(e){try{await Ce(e,!1)}catch{X("documents",!1)}}function mg(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function gg(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";const n=()=>{t.classList.add("hidden"),t.innerHTML=""},s=()=>{const i=e.selectionStart||0,o=e.value.slice(0,i).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!o){n();return}const r=o[2].toLowerCase(),c=Bt().map(l=>({id:l.id,name:l.name||l.email||"User",email:l.email||"",handle:mg(l)})).filter(l=>!r||l.handle.includes(r)||l.name.toLowerCase().includes(r)||l.email.toLowerCase().includes(r)).slice(0,6);if(!c.length){n();return}t.innerHTML=c.map(l=>`
            <button type="button" class="mention-suggestion" data-handle="${T(l.handle)}">
                <span class="mention-name">${f(l.name)}</span>
                <span class="mention-handle">@${f(l.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach(l=>{l.addEventListener("click",()=>{const d=l.dataset.handle,m=e.value.slice(0,i).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),u=e.value.slice(i);e.value=m+u,e.focus(),n()})})};e.addEventListener("input",s),e.addEventListener("click",s),e.addEventListener("keydown",i=>{i.key==="Escape"&&n()}),e.addEventListener("blur",()=>{setTimeout(n,150)})}async function fg(){if(window.currentTeam)try{jn=await api.getLabels(window.currentTeam.id)}catch(e){console.error("Failed to load labels:",e)}}document.addEventListener("keydown",Pm({closeModal:K,closeSidebar:Ts,navigateTo:X,showCreateIssueModal:qi,showKeyboardShortcutsHelp:al,isModalOpen:Zs,focusSearch:()=>{X("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden")}}));function al(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
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
    `,N()}Zu([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>X("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>X("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>X("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>X("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>X("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>X("documents"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>X("team"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{X("issues"),setTimeout(qi,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{X("projects"),setTimeout(gi,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{X("documents"),setTimeout(ai,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>mi(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{X("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{X("team"),setTimeout(pi,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>al(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Ni(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>ei(),category:"Account"}]),np({getCurrentUser:fi,getCurrentTeam:()=>window.currentTeam,renderIssueRow:Pe,formatActivityText:Ti,formatActivityActor:Ii,getActivityIcon:Ei,navigateToIssueByIdentifier:aa,viewDocument:Ce}),Lp({api,showToast:v,getProjects:se,getProjectFromUrl:vt,setGlobalProjectSelection:ht,updateUrlWithProject:os,escapeHtml:f,escapeAttr:T,escapeJsString:I,formatPriority:Fe}),Op({getIssues:De,getAssigneeById:ws,formatAssigneeName:Ln,formatEstimate:vn,getSprintCache:Xd,formatStatus:st,formatPriority:Fe,formatIssueType:Jn,escapeHtml:f,escapeAttr:T,escapeJsString:I,sanitizeColor:ye,renderAvatar:Yn,getAssigneeOptionList:ks,getGroupByValue:Wr}),up({api,getIssues:De,setIssues:Ge,getMyIssues:ys,setMyIssues:Tn,getCurrentDetailIssue:()=>window.currentDetailIssue,setCurrentDetailIssue:e=>{window.currentDetailIssue=e},getLabels:()=>jn,setLabels:e=>{jn=e},getCurrentTeam:()=>window.currentTeam,getCurrentDetailSprints:()=>window.currentDetailSprints,closeAllDropdowns:ln,registerDropdownClickOutside:Xs,setDropdownKeyHandler:Mc,showToast:v,getStatusIcon:Ut,getPriorityIcon:Ft,formatStatus:st,formatPriority:Fe,formatIssueType:Jn,formatEstimate:vn,formatAssigneeName:Ln,formatAssigneeOptionLabel:Hi,getAssigneeOptionList:ks,getAssigneeById:ws,getEstimateOptions:hn,renderAvatar:Yn,renderIssueRow:Pe,escapeHtml:f,escapeAttr:T,escapeJsString:I,sanitizeColor:ye,updateSprintCacheForProject:vu,updateSprintBudgetBar:Zi}),vp({api,getProjects:se,getEstimateOptions:hn,getCurrentView:U,showModal:N,closeModal:K,showToast:v,viewIssue:ie,loadIssues:$t,loadMyIssues:Bi,closeAllDropdowns:ln,registerDropdownClickOutside:Xs,getLabels:()=>jn,setLabels:e=>{jn=e},getCurrentTeam:()=>window.currentTeam,getStatusIcon:Ut,getPriorityIcon:Ft,formatStatus:st,formatPriority:Fe,formatIssueType:Jn,formatAssigneeName:Ln,formatAssigneeOptionLabel:Hi,getAssigneeOptionList:ks,renderAvatar:Yn,escapeHtml:f,escapeAttr:T,escapeJsString:I}),xp({api,showModal:N,closeModal:K,showToast:v,viewIssue:ie,navigateTo:X,loadIssues:$t,loadProjects:we,getEstimateOptions:hn,escapeHtml:f,escapeAttr:T,escapeJsString:I}),yu({api,getCurrentView:U,showToast:v,showModal:N,closeModal:K,navigateTo:X,getProjects:se,getMembers:Bt,getAssigneeById:ws,formatAssigneeName:Ln,formatStatus:st,formatPriority:Fe,formatIssueType:Jn,formatEstimate:vn,formatTimeAgo:xt,getStatusIcon:Ut,getPriorityIcon:Ft,renderMarkdown:fs,renderAvatar:Yn,escapeHtml:f,escapeAttr:T,escapeJsString:I,sanitizeColor:ye,showDetailDropdown:kr,setupMentionAutocomplete:gg,renderTicketRitualActions:Ru,getIssues:De}),jm({api,getCurrentView:U,showToast:v,navigateTo:X,getProjects:se,getAssigneeById:ws,formatAssigneeName:Ln,formatStatus:st,formatPriority:Fe,formatEstimate:vn,formatTimeAgo:xt,getStatusIcon:Ut,getPriorityIcon:Ft,escapeHtml:f,escapeAttr:T,escapeJsString:I,sanitizeColor:ye});const hg=N;window.showModal=function(){hg(),setTimeout(()=>{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()},50)},document.addEventListener("keydown",Rm({isModalOpen:Zs,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:rr,openCommandPalette:Xu,closeCommandPalette:bs}));async function vg(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=document.getElementById("project-filter").value;if(!s){v("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=se().find(l=>l.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Ge([r,...De()]),Ye();const c=document.querySelector(`[data-id="${a}"]`);c&&c.classList.add("new");try{const l=await api.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=De(),m=d.findIndex(u=>u.id===a);m!==-1&&(d[m]=l,Ge(d)),Ye(),we(),v("Issue created!","success")}catch(l){Ge(De().filter(d=>d.id!==a)),Ye(),v(`Failed to create issue: ${l.message}`,"error")}finally{t.disabled=!1,t.placeholder=i,t.focus()}}document.addEventListener("keydown",Nm({getCurrentView:U,getSelectedIndex:Kd,setSelectedIndex:qo,viewIssue:ie,showEditIssueModal:Sr,isModalOpen:Zs,isCommandPaletteOpen:rr})),Object.assign(window,{escapeHtml:f,renderMarkdown:fs,handleLogin:oo,handleSignup:ro,showLogin:io,showSignup:ao,logout:ei,navigateTo:X,handleRoute:Jr,closeModal:K,toggleSidebar:cg,closeSidebar:Ts,getProjectFromUrl:vt,updateUrlWithProject:os,toggleTeamDropdown:di,toggleUserDropdown:ko,showCreateTeamModal:mi,showEditTeamModal:xo,showInviteModal:pi,showCreateIssueModal:qi,loadIssues:$t,filterIssues:Ze,filterMyIssues:cr,debounceSearch:Em,handleQuickCreate:vg,onProjectFilterChange:zr,updateGroupBy:Kr,toggleGroup:Kp,viewIssue:ie,showEditIssueModal:Sr,editDescription:Iu,setDescriptionEditorMode:Tu,updateIssueField:An,handleUpdateIssue:Sp,deleteIssue:Cp,navigateToIssueByIdentifier:aa,handleCreateIssueNew:Tp,handleCreateIssueAndNew:_p,setCreateIssueField:Ip,toggleCreateIssueDropdown:$p,toggleCreateIssueLabelSelection:gp,createLabelForCreateIssue:Tr,createLabelFromDropdown:Ir,handleAddComment:Eu,showCreateSubIssueModal:wp,handleCreateSubIssue:kp,showAddRelationModal:_u,handleAddRelation:Lu,deleteRelation:Au,searchIssuesToRelate:xu,selectIssueForRelation:Su,clearSelectedRelation:Cu,showDetailDropdown:kr,showInlineDropdown:wr,toggleIssueLabel:pp,toggleMultiSelect:Wp,updateStatusFilter:zi,updatePriorityFilter:Wi,updateLabelFilter:Ji,clearStatusFilter:Ki,clearPriorityFilter:Vi,clearLabelFilter:Yi,toggleFilterMenu:Xp,toggleDisplayMenu:Qp,showFilterCategoryOptions:xe,setProjectFilter:Or,clearProjectFilter:lm,toggleStatusOption:cm,clearStatusFilterNew:dm,togglePriorityOption:um,clearPriorityFilterNew:pm,setTypeFilter:qr,clearTypeFilter:mm,setAssigneeFilter:Fr,clearAssigneeFilter:gm,setSprintFilter:Ur,clearSprintFilter:fm,toggleLabelOption:hm,clearLabelFilterNew:vm,setSort:ym,setGroupBy:wm,clearAllFilters:km,updateFilterChips:$e,updateFilterCountBadge:Ee,loadBoard:Gi,onBoardProjectChange:Ap,handleDragStart:Bp,handleDragEnd:Dp,handleDragOver:Mp,handleDragLeave:jp,handleCardDragOver:Pp,handleCardDragLeave:Rp,handleDrop:Np,handleCardDrop:Hp,loadSprints:Ke,onSprintProjectChange:eu,viewSprint:bi,showEditBudgetModal:lu,handleUpdateBudget:cu,showCloseSprintConfirmation:du,completeSprint:uu,loadLimboStatus:cs,showLimboDetailsModal:yi,showCreateDocumentModal:ai,showCreateProjectModal:gi,onEpicsProjectChange:Am,showCreateEpicModal:Dm,dismissApprovalsExplainer:Vu,loadGateApprovals:$n,loadRitualsView:Xo,onRitualsProjectChange:Qo,switchRitualsTab:Mu,toggleRitualConditions:Ad,approveRitual:ju,completeGateRitual:er,toggleSection:Vo,toggleTicketRituals:Jo,attestTicketRitual:Ou,approveTicketRitual:qu,showCompleteTicketRitualModal:Fu,showAttestTicketRitualModal:Nu,showCreateApiKeyModal:ir,copyApiKey:ar,revokeApiKey:or,showCreateAgentModal:bo,toggleCreateIssueOptions:bp,applyIssueTemplate:yp,updateCreateIssueProject:Ep,handleLabelCreateKey:mp,handleCreateIssueLabelKey:fp}),window.marked=F,window.DOMPurify=no,console.log("Chaotic frontend loaded via Vite")})();
