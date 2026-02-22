var Sg=Object.defineProperty;var Lg=(Oe,me,mt)=>me in Oe?Sg(Oe,me,{enumerable:!0,configurable:!0,writable:!0,value:mt}):Oe[me]=mt;var V=(Oe,me,mt)=>Lg(Oe,typeof me!="symbol"?me+"":me,mt);(function(){"use strict";var ga;function Oe(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var me=Oe();function mt(e){me=e}var Xt={exec:()=>null};function z(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(ge.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var ge={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Ll=/^(?:[ \t]*(?:\n|$))+/,Cl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Al=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Bl=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Bs=/(?:[*+-]|\d{1,9}[.)])/,La=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ca=z(La).replace(/bull/g,Bs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Dl=z(La).replace(/bull/g,Bs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ds=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ml=/^[^\n]+/,Ms=/(?!\s*\])(?:\\.|[^\[\]\\])+/,jl=z(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ms).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Pl=z(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Bs).getRegex(),Nn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",js=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Rl=z("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",js).replace("tag",Nn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Aa=z(Ds).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Nn).getRegex(),Nl=z(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Aa).getRegex(),Ps={blockquote:Nl,code:Cl,def:jl,fences:Al,heading:Bl,hr:Qt,html:Rl,lheading:Ca,list:Pl,newline:Ll,paragraph:Aa,table:Xt,text:Ml},Ba=z("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Nn).getRegex(),Hl={...Ps,lheading:Dl,table:Ba,paragraph:z(Ds).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ba).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Nn).getRegex()},Ol={...Ps,html:z(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",js).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Xt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:z(Ds).replace("hr",Qt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ca).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ql=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Fl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Da=/^( {2,}|\\)\n(?!\s*$)/,Ul=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Hn=/[\p{P}\p{S}]/u,Rs=/[\s\p{P}\p{S}]/u,Ma=/[^\s\p{P}\p{S}]/u,Gl=z(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Rs).getRegex(),ja=/(?!~)[\p{P}\p{S}]/u,zl=/(?!~)[\s\p{P}\p{S}]/u,Kl=/(?:[^\s\p{P}\p{S}]|~)/u,Wl=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Pa=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Vl=z(Pa,"u").replace(/punct/g,Hn).getRegex(),Jl=z(Pa,"u").replace(/punct/g,ja).getRegex(),Ra="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Yl=z(Ra,"gu").replace(/notPunctSpace/g,Ma).replace(/punctSpace/g,Rs).replace(/punct/g,Hn).getRegex(),Zl=z(Ra,"gu").replace(/notPunctSpace/g,Kl).replace(/punctSpace/g,zl).replace(/punct/g,ja).getRegex(),Xl=z("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ma).replace(/punctSpace/g,Rs).replace(/punct/g,Hn).getRegex(),Ql=z(/\\(punct)/,"gu").replace(/punct/g,Hn).getRegex(),ec=z(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),tc=z(js).replace("(?:-->|$)","-->").getRegex(),nc=z("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",tc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),On=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,sc=z(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",On).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Na=z(/^!?\[(label)\]\[(ref)\]/).replace("label",On).replace("ref",Ms).getRegex(),Ha=z(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ms).getRegex(),ic=z("reflink|nolink(?!\\()","g").replace("reflink",Na).replace("nolink",Ha).getRegex(),Ns={_backpedal:Xt,anyPunctuation:Ql,autolink:ec,blockSkip:Wl,br:Da,code:Fl,del:Xt,emStrongLDelim:Vl,emStrongRDelimAst:Yl,emStrongRDelimUnd:Xl,escape:ql,link:sc,nolink:Ha,punctuation:Gl,reflink:Na,reflinkSearch:ic,tag:nc,text:Ul,url:Xt},ac={...Ns,link:z(/^!?\[(label)\]\((.*?)\)/).replace("label",On).getRegex(),reflink:z(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",On).getRegex()},Hs={...Ns,emStrongRDelimAst:Zl,emStrongLDelim:Jl,url:z(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},oc={...Hs,br:z(Da).replace("{2,}","*").getRegex(),text:z(Hs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},qn={normal:Ps,gfm:Hl,pedantic:Ol},en={normal:Ns,gfm:Hs,breaks:oc,pedantic:ac},rc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Oa=e=>rc[e];function Be(e,t){if(t){if(ge.escapeTest.test(e))return e.replace(ge.escapeReplace,Oa)}else if(ge.escapeTestNoEncode.test(e))return e.replace(ge.escapeReplaceNoEncode,Oa);return e}function qa(e){try{e=encodeURI(e).replace(ge.percentDecode,"%")}catch{return null}return e}function Fa(e,t){var a;const n=e.replace(ge.findPipe,(o,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),s=n.split(ge.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(ge.slashPipe,"|");return s}function tn(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function lc(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function Ua(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,l}function cc(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var Fn=class{constructor(e){V(this,"options");V(this,"rules");V(this,"lexer");this.options=e||me}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:tn(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=cc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=tn(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:tn(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=tn(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),o=!0;else if(!o)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${c}`:c,i=i?`${i}
${d}`:d;const m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=m,n.length===0)break;const u=a.at(-1);if((u==null?void 0:u.type)==="code")break;if((u==null?void 0:u.type)==="blockquote"){const g=u,b=g.raw+`
`+n.join(`
`),y=this.blockquote(b);a[a.length-1]=y,s=s.substring(0,s.length-g.raw.length)+y.raw,i=i.substring(0,i.length-g.text.length)+y.text;break}else if((u==null?void 0:u.type)==="list"){const g=u,b=g.raw+`
`+n.join(`
`),y=this.list(b);a[a.length-1]=y,s=s.substring(0,s.length-u.raw.length)+y.raw,i=i.substring(0,i.length-g.raw.length)+y.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let l=!1,c="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),u=e.split(`
`,1)[0],g=!m.trim(),b=0;if(this.options.pedantic?(b=2,d=m.trimStart()):g?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,d=m.slice(b),b+=t[1].length),g&&this.rules.other.blankLine.test(u)&&(c+=u+`
`,e=e.substring(u.length+1),l=!0),!l){const L=this.rules.other.nextBulletRegex(b),D=this.rules.other.hrRegex(b),H=this.rules.other.fencesBeginRegex(b),M=this.rules.other.headingBeginRegex(b),O=this.rules.other.htmlBeginRegex(b);for(;e;){const C=e.split(`
`,1)[0];let G;if(u=C,this.options.pedantic?(u=u.replace(this.rules.other.listReplaceNesting,"  "),G=u):G=u.replace(this.rules.other.tabCharGlobal,"    "),H.test(u)||M.test(u)||O.test(u)||L.test(u)||D.test(u))break;if(G.search(this.rules.other.nonSpaceChar)>=b||!u.trim())d+=`
`+G.slice(b);else{if(g||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||H.test(m)||M.test(m)||D.test(m))break;d+=`
`+u}!g&&!u.trim()&&(g=!0),c+=C+`
`,e=e.substring(C.length+1),m=G.slice(b)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let y=null,x;this.options.gfm&&(y=this.rules.other.listIsTask.exec(d),y&&(x=y[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:c,task:!!y,checked:x,loose:!1,text:d,tokens:[]}),i.raw+=c}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let l=0;l<i.items.length;l++)if(this.lexer.state.top=!1,i.items[l].tokens=this.lexer.blockTokens(i.items[l].text,[]),!i.loose){const c=i.items[l].tokens.filter(m=>m.type==="space"),d=c.length>0&&c.some(m=>this.rules.other.anyLine.test(m.raw));i.loose=d}if(i.loose)for(let l=0;l<i.items.length;l++)i.items[l].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Fa(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(Fa(r,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=tn(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=lc(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),Ua(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Ua(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,l=a,c=0;const d=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(s=d.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){l+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const m=[...s[0]][0].length,u=e.slice(0,a+s.index+m+r);if(Math.min(a,r)%2){const b=u.slice(1,-1);return{type:"em",raw:u,text:b,tokens:this.lexer.inlineTokens(b)}}const g=u.slice(2,-2);return{type:"strong",raw:u,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},qe=class xa{constructor(t){V(this,"tokens");V(this,"options");V(this,"state");V(this,"tokenizer");V(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||me,this.options.tokenizer=this.options.tokenizer||new Fn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:ge,block:qn.normal,inline:en.normal};this.options.pedantic?(n.block=qn.pedantic,n.inline=en.pedantic):this.options.gfm&&(n.block=qn.gfm,this.options.breaks?n.inline=en.breaks:n.inline=en.gfm),this.tokenizer.rules=n}static get rules(){return{block:qn,inline:en}}static lex(t,n){return new xa(n).lex(t)}static lexInline(t,n){return new xa(n).inlineTokens(t)}lex(t){t=t.replace(ge.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(ge.tabCharGlobal,"    ").replace(ge.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const d=t.slice(1);let m;this.options.extensions.startBlock.forEach(u=>{m=u.call({lexer:this},d),typeof m=="number"&&m>=0&&(c=Math.min(c,m))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);s&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),s=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let s=t,i=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)d.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(u=>(d=u.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const u=n.at(-1);d.type==="text"&&(u==null?void 0:u.type)==="text"?(u.raw+=d.raw,u.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,s,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let m=t;if((c=this.options.extensions)!=null&&c.startInline){let u=1/0;const g=t.slice(1);let b;this.options.extensions.startInline.forEach(y=>{b=y.call({lexer:this},g),typeof b=="number"&&b>=0&&(u=Math.min(u,b))}),u<1/0&&u>=0&&(m=t.substring(0,u+1))}if(d=this.tokenizer.inlineText(m)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const u=n.at(-1);(u==null?void 0:u.type)==="text"?(u.raw+=d.raw,u.text+=d.text):n.push(d);continue}if(t){const u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return n}},Un=class{constructor(e){V(this,"options");V(this,"parser");this.options=e||me}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(ge.notSpaceStart))==null?void 0:a[0],i=e.replace(ge.endingNewline,"")+`
`;return s?'<pre><code class="language-'+Be(s)+'">'+(n?i:Be(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:Be(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let s="";for(let o=0;o<e.items.length;o++){const r=e.items[o];s+=this.listitem(r)}const i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){var n;let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+Be(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){const a=e.rows[i];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Be(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=qa(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+Be(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=qa(e);if(i===null)return Be(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Be(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Be(e.text)}},Os=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Fe=class Sa{constructor(t){V(this,"options");V(this,"renderer");V(this,"textRenderer");this.options=t||me,this.options.renderer=this.options.renderer||new Un,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Os}static parse(t,n){return new Sa(n).parse(t)}static parseInline(t,n){return new Sa(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){s+=d||"";continue}}const l=r;switch(l.type){case"space":{s+=this.renderer.space(l);continue}case"hr":{s+=this.renderer.hr(l);continue}case"heading":{s+=this.renderer.heading(l);continue}case"code":{s+=this.renderer.code(l);continue}case"table":{s+=this.renderer.table(l);continue}case"blockquote":{s+=this.renderer.blockquote(l);continue}case"list":{s+=this.renderer.list(l);continue}case"html":{s+=this.renderer.html(l);continue}case"paragraph":{s+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?s+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):s+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=c||"";continue}}const l=r;switch(l.type){case"escape":{s+=n.text(l);break}case"html":{s+=n.html(l);break}case"link":{s+=n.link(l);break}case"image":{s+=n.image(l);break}case"strong":{s+=n.strong(l);break}case"em":{s+=n.em(l);break}case"codespan":{s+=n.codespan(l);break}case"br":{s+=n.br(l);break}case"del":{s+=n.del(l);break}case"text":{s+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return s}},Gn=(ga=class{constructor(e){V(this,"options");V(this,"block");this.options=e||me}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?qe.lex:qe.lexInline}provideParser(){return this.block?Fe.parse:Fe.parseInline}},V(ga,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),ga),dc=class{constructor(...e){V(this,"defaults",Oe());V(this,"options",this.setOptions);V(this,"parse",this.parseMarkdown(!0));V(this,"parseInline",this.parseMarkdown(!1));V(this,"Parser",Fe);V(this,"Renderer",Un);V(this,"TextRenderer",Os);V(this,"Lexer",qe);V(this,"Tokenizer",Fn);V(this,"Hooks",Gn);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new Un(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=i[o];i[o]=(...c)=>{let d=r.apply(i,c);return d===!1&&(d=l.apply(i,c)),d||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new Fn(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=i[o];i[o]=(...c)=>{let d=r.apply(i,c);return d===!1&&(d=l.apply(i,c)),d}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new Gn;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=i[o];Gn.passThroughHooks.has(a)?i[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(i,c)).then(m=>l.call(i,m));const d=r.call(i,c);return l.call(i,d)}:i[o]=(...c)=>{let d=r.apply(i,c);return d===!1&&(d=l.apply(i,c)),d}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return qe.lex(e,t??this.defaults)}parser(e,t){return Fe.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?qe.lex:qe.lexInline,l=a.hooks?a.hooks.provideParser():e?Fe.parse:Fe.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>l(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let d=l(c,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+Be(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},gt=new dc;function F(e,t){return gt.parse(e,t)}F.options=F.setOptions=function(e){return gt.setOptions(e),F.defaults=gt.defaults,mt(F.defaults),F},F.getDefaults=Oe,F.defaults=me,F.use=function(...e){return gt.use(...e),F.defaults=gt.defaults,mt(F.defaults),F},F.walkTokens=function(e,t){return gt.walkTokens(e,t)},F.parseInline=gt.parseInline,F.Parser=Fe,F.parser=Fe.parse,F.Renderer=Un,F.TextRenderer=Os,F.Lexer=qe,F.lexer=qe.lex,F.Tokenizer=Fn,F.Hooks=Gn,F.parse=F,F.options,F.setOptions,F.use,F.walkTokens,F.parseInline,Fe.parse,qe.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Ga,setPrototypeOf:za,isFrozen:uc,getPrototypeOf:pc,getOwnPropertyDescriptor:mc}=Object;let{freeze:fe,seal:_e,create:qs}=Object,{apply:Fs,construct:Us}=typeof Reflect<"u"&&Reflect;fe||(fe=function(t){return t}),_e||(_e=function(t){return t}),Fs||(Fs=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),Us||(Us=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const zn=ve(Array.prototype.forEach),gc=ve(Array.prototype.lastIndexOf),Ka=ve(Array.prototype.pop),nn=ve(Array.prototype.push),fc=ve(Array.prototype.splice),Kn=ve(String.prototype.toLowerCase),Gs=ve(String.prototype.toString),zs=ve(String.prototype.match),sn=ve(String.prototype.replace),hc=ve(String.prototype.indexOf),vc=ve(String.prototype.trim),Le=ve(Object.prototype.hasOwnProperty),he=ve(RegExp.prototype.test),an=bc(TypeError);function ve(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return Fs(e,t,s)}}function bc(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return Us(e,n)}}function R(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Kn;za&&za(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(uc(t)||(t[s]=a),i=a)}e[i]=!0}return e}function yc(e){for(let t=0;t<e.length;t++)Le(e,t)||(e[t]=null);return e}function De(e){const t=qs(null);for(const[n,s]of Ga(e))Le(e,n)&&(Array.isArray(s)?t[n]=yc(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=De(s):t[n]=s);return t}function on(e,t){for(;e!==null;){const s=mc(e,t);if(s){if(s.get)return ve(s.get);if(typeof s.value=="function")return ve(s.value)}e=pc(e)}function n(){return null}return n}const Wa=fe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ks=fe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ws=fe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),wc=fe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Vs=fe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),kc=fe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Va=fe(["#text"]),Ja=fe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Js=fe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ya=fe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Wn=fe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),$c=_e(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ic=_e(/<%[\w\W]*|[\w\W]*%>/gm),Ec=_e(/\$\{[\w\W]*/gm),_c=_e(/^data-[\-\w.\u00B7-\uFFFF]+$/),Tc=_e(/^aria-[\-\w]+$/),Za=_e(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),xc=_e(/^(?:\w+script|data):/i),Sc=_e(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Xa=_e(/^html$/i),Lc=_e(/^[a-z][.\w]*(-[.\w]+)+$/i);var Qa=Object.freeze({__proto__:null,ARIA_ATTR:Tc,ATTR_WHITESPACE:Sc,CUSTOM_ELEMENT:Lc,DATA_ATTR:_c,DOCTYPE_NAME:Xa,ERB_EXPR:Ic,IS_ALLOWED_URI:Za,IS_SCRIPT_OR_DATA:xc,MUSTACHE_EXPR:$c,TMPLIT_EXPR:Ec});const rn={element:1,text:3,progressingInstruction:7,comment:8,document:9},Cc=function(){return typeof window>"u"?null:window},Ac=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},eo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function to(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Cc();const t=S=>to(S);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==rn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:u,trustedTypes:g}=e,b=l.prototype,y=on(b,"cloneNode"),x=on(b,"remove"),L=on(b,"nextSibling"),D=on(b,"childNodes"),H=on(b,"parentNode");if(typeof o=="function"){const S=n.createElement("template");S.content&&S.content.ownerDocument&&(n=S.content.ownerDocument)}let M,O="";const{implementation:C,createNodeIterator:G,createDocumentFragment:W,getElementsByTagName:P}=n,{importNode:A}=s;let q=eo();t.isSupported=typeof Ga=="function"&&typeof H=="function"&&C&&C.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:J,ERB_EXPR:Y,TMPLIT_EXPR:ke,DATA_ATTR:k,ARIA_ATTR:et,IS_SCRIPT_OR_DATA:Q,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:yg}=Qa;let{IS_ALLOWED_URI:ol}=Qa,le=null;const rl=R({},[...Wa,...Ks,...Ws,...Vs,...Va]);let ce=null;const ll=R({},[...Ja,...Js,...Ya,...Wn]);let ne=Object.seal(qs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),jn=null,fa=null;const zt=Object.seal(qs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let cl=!0,ha=!0,dl=!1,ul=!0,Kt=!1,_s=!0,Et=!1,va=!1,ba=!1,Wt=!1,Ts=!1,xs=!1,pl=!0,ml=!1;const wg="user-content-";let ya=!0,Pn=!1,Vt={},Ne=null;const wa=R({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let gl=null;const fl=R({},["audio","video","img","source","image","track"]);let ka=null;const hl=R({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ss="http://www.w3.org/1998/Math/MathML",Ls="http://www.w3.org/2000/svg",tt="http://www.w3.org/1999/xhtml";let Jt=tt,$a=!1,Ia=null;const kg=R({},[Ss,Ls,tt],Gs);let Cs=R({},["mi","mo","mn","ms","mtext"]),As=R({},["annotation-xml"]);const $g=R({},["title","style","font","a","script"]);let Rn=null;const Ig=["application/xhtml+xml","text/html"],Eg="text/html";let re=null,Yt=null;const _g=n.createElement("form"),vl=function(p){return p instanceof RegExp||p instanceof Function},Ea=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Yt&&Yt===p)){if((!p||typeof p!="object")&&(p={}),p=De(p),Rn=Ig.indexOf(p.PARSER_MEDIA_TYPE)===-1?Eg:p.PARSER_MEDIA_TYPE,re=Rn==="application/xhtml+xml"?Gs:Kn,le=Le(p,"ALLOWED_TAGS")?R({},p.ALLOWED_TAGS,re):rl,ce=Le(p,"ALLOWED_ATTR")?R({},p.ALLOWED_ATTR,re):ll,Ia=Le(p,"ALLOWED_NAMESPACES")?R({},p.ALLOWED_NAMESPACES,Gs):kg,ka=Le(p,"ADD_URI_SAFE_ATTR")?R(De(hl),p.ADD_URI_SAFE_ATTR,re):hl,gl=Le(p,"ADD_DATA_URI_TAGS")?R(De(fl),p.ADD_DATA_URI_TAGS,re):fl,Ne=Le(p,"FORBID_CONTENTS")?R({},p.FORBID_CONTENTS,re):wa,jn=Le(p,"FORBID_TAGS")?R({},p.FORBID_TAGS,re):De({}),fa=Le(p,"FORBID_ATTR")?R({},p.FORBID_ATTR,re):De({}),Vt=Le(p,"USE_PROFILES")?p.USE_PROFILES:!1,cl=p.ALLOW_ARIA_ATTR!==!1,ha=p.ALLOW_DATA_ATTR!==!1,dl=p.ALLOW_UNKNOWN_PROTOCOLS||!1,ul=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Kt=p.SAFE_FOR_TEMPLATES||!1,_s=p.SAFE_FOR_XML!==!1,Et=p.WHOLE_DOCUMENT||!1,Wt=p.RETURN_DOM||!1,Ts=p.RETURN_DOM_FRAGMENT||!1,xs=p.RETURN_TRUSTED_TYPE||!1,ba=p.FORCE_BODY||!1,pl=p.SANITIZE_DOM!==!1,ml=p.SANITIZE_NAMED_PROPS||!1,ya=p.KEEP_CONTENT!==!1,Pn=p.IN_PLACE||!1,ol=p.ALLOWED_URI_REGEXP||Za,Jt=p.NAMESPACE||tt,Cs=p.MATHML_TEXT_INTEGRATION_POINTS||Cs,As=p.HTML_INTEGRATION_POINTS||As,ne=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&vl(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ne.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&vl(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ne.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ne.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Kt&&(ha=!1),Ts&&(Wt=!0),Vt&&(le=R({},Va),ce=[],Vt.html===!0&&(R(le,Wa),R(ce,Ja)),Vt.svg===!0&&(R(le,Ks),R(ce,Js),R(ce,Wn)),Vt.svgFilters===!0&&(R(le,Ws),R(ce,Js),R(ce,Wn)),Vt.mathMl===!0&&(R(le,Vs),R(ce,Ya),R(ce,Wn))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?zt.tagCheck=p.ADD_TAGS:(le===rl&&(le=De(le)),R(le,p.ADD_TAGS,re))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?zt.attributeCheck=p.ADD_ATTR:(ce===ll&&(ce=De(ce)),R(ce,p.ADD_ATTR,re))),p.ADD_URI_SAFE_ATTR&&R(ka,p.ADD_URI_SAFE_ATTR,re),p.FORBID_CONTENTS&&(Ne===wa&&(Ne=De(Ne)),R(Ne,p.FORBID_CONTENTS,re)),p.ADD_FORBID_CONTENTS&&(Ne===wa&&(Ne=De(Ne)),R(Ne,p.ADD_FORBID_CONTENTS,re)),ya&&(le["#text"]=!0),Et&&R(le,["html","head","body"]),le.table&&(R(le,["tbody"]),delete jn.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw an('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw an('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=p.TRUSTED_TYPES_POLICY,O=M.createHTML("")}else M===void 0&&(M=Ac(g,i)),M!==null&&typeof O=="string"&&(O=M.createHTML(""));fe&&fe(p),Yt=p}},bl=R({},[...Ks,...Ws,...wc]),yl=R({},[...Vs,...kc]),Tg=function(p){let I=H(p);(!I||!I.tagName)&&(I={namespaceURI:Jt,tagName:"template"});const T=Kn(p.tagName),ee=Kn(I.tagName);return Ia[p.namespaceURI]?p.namespaceURI===Ls?I.namespaceURI===tt?T==="svg":I.namespaceURI===Ss?T==="svg"&&(ee==="annotation-xml"||Cs[ee]):!!bl[T]:p.namespaceURI===Ss?I.namespaceURI===tt?T==="math":I.namespaceURI===Ls?T==="math"&&As[ee]:!!yl[T]:p.namespaceURI===tt?I.namespaceURI===Ls&&!As[ee]||I.namespaceURI===Ss&&!Cs[ee]?!1:!yl[T]&&($g[T]||!bl[T]):!!(Rn==="application/xhtml+xml"&&Ia[p.namespaceURI]):!1},He=function(p){nn(t.removed,{element:p});try{H(p).removeChild(p)}catch{x(p)}},_t=function(p,I){try{nn(t.removed,{attribute:I.getAttributeNode(p),from:I})}catch{nn(t.removed,{attribute:null,from:I})}if(I.removeAttribute(p),p==="is")if(Wt||Ts)try{He(I)}catch{}else try{I.setAttribute(p,"")}catch{}},wl=function(p){let I=null,T=null;if(ba)p="<remove></remove>"+p;else{const se=zs(p,/^[\r\n\t ]+/);T=se&&se[0]}Rn==="application/xhtml+xml"&&Jt===tt&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");const ee=M?M.createHTML(p):p;if(Jt===tt)try{I=new u().parseFromString(ee,Rn)}catch{}if(!I||!I.documentElement){I=C.createDocument(Jt,"template",null);try{I.documentElement.innerHTML=$a?O:ee}catch{}}const pe=I.body||I.documentElement;return p&&T&&pe.insertBefore(n.createTextNode(T),pe.childNodes[0]||null),Jt===tt?P.call(I,Et?"html":"body")[0]:Et?I.documentElement:pe},kl=function(p){return G.call(p.ownerDocument||p,p,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},_a=function(p){return p instanceof m&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof d)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},$l=function(p){return typeof r=="function"&&p instanceof r};function nt(S,p,I){zn(S,T=>{T.call(t,p,I,Yt)})}const Il=function(p){let I=null;if(nt(q.beforeSanitizeElements,p,null),_a(p))return He(p),!0;const T=re(p.nodeName);if(nt(q.uponSanitizeElement,p,{tagName:T,allowedTags:le}),_s&&p.hasChildNodes()&&!$l(p.firstElementChild)&&he(/<[/\w!]/g,p.innerHTML)&&he(/<[/\w!]/g,p.textContent)||p.nodeType===rn.progressingInstruction||_s&&p.nodeType===rn.comment&&he(/<[/\w]/g,p.data))return He(p),!0;if(!(zt.tagCheck instanceof Function&&zt.tagCheck(T))&&(!le[T]||jn[T])){if(!jn[T]&&_l(T)&&(ne.tagNameCheck instanceof RegExp&&he(ne.tagNameCheck,T)||ne.tagNameCheck instanceof Function&&ne.tagNameCheck(T)))return!1;if(ya&&!Ne[T]){const ee=H(p)||p.parentNode,pe=D(p)||p.childNodes;if(pe&&ee){const se=pe.length;for(let $e=se-1;$e>=0;--$e){const st=y(pe[$e],!0);st.__removalCount=(p.__removalCount||0)+1,ee.insertBefore(st,L(p))}}}return He(p),!0}return p instanceof l&&!Tg(p)||(T==="noscript"||T==="noembed"||T==="noframes")&&he(/<\/no(script|embed|frames)/i,p.innerHTML)?(He(p),!0):(Kt&&p.nodeType===rn.text&&(I=p.textContent,zn([J,Y,ke],ee=>{I=sn(I,ee," ")}),p.textContent!==I&&(nn(t.removed,{element:p.cloneNode()}),p.textContent=I)),nt(q.afterSanitizeElements,p,null),!1)},El=function(p,I,T){if(pl&&(I==="id"||I==="name")&&(T in n||T in _g))return!1;if(!(ha&&!fa[I]&&he(k,I))){if(!(cl&&he(et,I))){if(!(zt.attributeCheck instanceof Function&&zt.attributeCheck(I,p))){if(!ce[I]||fa[I]){if(!(_l(p)&&(ne.tagNameCheck instanceof RegExp&&he(ne.tagNameCheck,p)||ne.tagNameCheck instanceof Function&&ne.tagNameCheck(p))&&(ne.attributeNameCheck instanceof RegExp&&he(ne.attributeNameCheck,I)||ne.attributeNameCheck instanceof Function&&ne.attributeNameCheck(I,p))||I==="is"&&ne.allowCustomizedBuiltInElements&&(ne.tagNameCheck instanceof RegExp&&he(ne.tagNameCheck,T)||ne.tagNameCheck instanceof Function&&ne.tagNameCheck(T))))return!1}else if(!ka[I]){if(!he(ol,sn(T,Ae,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&p!=="script"&&hc(T,"data:")===0&&gl[p])){if(!(dl&&!he(Q,sn(T,Ae,"")))){if(T)return!1}}}}}}}return!0},_l=function(p){return p!=="annotation-xml"&&zs(p,yg)},Tl=function(p){nt(q.beforeSanitizeAttributes,p,null);const{attributes:I}=p;if(!I||_a(p))return;const T={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ce,forceKeepAttr:void 0};let ee=I.length;for(;ee--;){const pe=I[ee],{name:se,namespaceURI:$e,value:st}=pe,Zt=re(se),Ta=st;let de=se==="value"?Ta:vc(Ta);if(T.attrName=Zt,T.attrValue=de,T.keepAttr=!0,T.forceKeepAttr=void 0,nt(q.uponSanitizeAttribute,p,T),de=T.attrValue,ml&&(Zt==="id"||Zt==="name")&&(_t(se,p),de=wg+de),_s&&he(/((--!?|])>)|<\/(style|title|textarea)/i,de)){_t(se,p);continue}if(Zt==="attributename"&&zs(de,"href")){_t(se,p);continue}if(T.forceKeepAttr)continue;if(!T.keepAttr){_t(se,p);continue}if(!ul&&he(/\/>/i,de)){_t(se,p);continue}Kt&&zn([J,Y,ke],Sl=>{de=sn(de,Sl," ")});const xl=re(p.nodeName);if(!El(xl,Zt,de)){_t(se,p);continue}if(M&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!$e)switch(g.getAttributeType(xl,Zt)){case"TrustedHTML":{de=M.createHTML(de);break}case"TrustedScriptURL":{de=M.createScriptURL(de);break}}if(de!==Ta)try{$e?p.setAttributeNS($e,se,de):p.setAttribute(se,de),_a(p)?He(p):Ka(t.removed)}catch{_t(se,p)}}nt(q.afterSanitizeAttributes,p,null)},xg=function S(p){let I=null;const T=kl(p);for(nt(q.beforeSanitizeShadowDOM,p,null);I=T.nextNode();)nt(q.uponSanitizeShadowNode,I,null),Il(I),Tl(I),I.content instanceof a&&S(I.content);nt(q.afterSanitizeShadowDOM,p,null)};return t.sanitize=function(S){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,T=null,ee=null,pe=null;if($a=!S,$a&&(S="<!-->"),typeof S!="string"&&!$l(S))if(typeof S.toString=="function"){if(S=S.toString(),typeof S!="string")throw an("dirty is not a string, aborting")}else throw an("toString is not a function");if(!t.isSupported)return S;if(va||Ea(p),t.removed=[],typeof S=="string"&&(Pn=!1),Pn){if(S.nodeName){const st=re(S.nodeName);if(!le[st]||jn[st])throw an("root node is forbidden and cannot be sanitized in-place")}}else if(S instanceof r)I=wl("<!---->"),T=I.ownerDocument.importNode(S,!0),T.nodeType===rn.element&&T.nodeName==="BODY"||T.nodeName==="HTML"?I=T:I.appendChild(T);else{if(!Wt&&!Kt&&!Et&&S.indexOf("<")===-1)return M&&xs?M.createHTML(S):S;if(I=wl(S),!I)return Wt?null:xs?O:""}I&&ba&&He(I.firstChild);const se=kl(Pn?S:I);for(;ee=se.nextNode();)Il(ee),Tl(ee),ee.content instanceof a&&xg(ee.content);if(Pn)return S;if(Wt){if(Ts)for(pe=W.call(I.ownerDocument);I.firstChild;)pe.appendChild(I.firstChild);else pe=I;return(ce.shadowroot||ce.shadowrootmode)&&(pe=A.call(s,pe,!0)),pe}let $e=Et?I.outerHTML:I.innerHTML;return Et&&le["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&he(Xa,I.ownerDocument.doctype.name)&&($e="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+$e),Kt&&zn([J,Y,ke],st=>{$e=sn($e,st," ")}),M&&xs?M.createHTML($e):$e},t.setConfig=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ea(S),va=!0},t.clearConfig=function(){Yt=null,va=!1},t.isValidAttribute=function(S,p,I){Yt||Ea({});const T=re(S),ee=re(p);return El(T,ee,I)},t.addHook=function(S,p){typeof p=="function"&&nn(q[S],p)},t.removeHook=function(S,p){if(p!==void 0){const I=gc(q[S],p);return I===-1?void 0:fc(q[S],I,1)[0]}return Ka(q[S])},t.removeHooks=function(S){q[S]=[]},t.removeAllHooks=function(){q=eo()},t}var no=to();const Bc="/api";class Dc{constructor(){try{this.token=localStorage.getItem("chaotic_token")}catch(t){console.warn("Failed to access localStorage:",t),this.token=null}}setToken(t){this.token=t;try{t?localStorage.setItem("chaotic_token",t):localStorage.removeItem("chaotic_token")}catch(n){console.warn("Failed to persist token to localStorage:",n)}}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const o=await fetch(`${Bc}${n}`,a);if(o.status===204)return null;let r;try{r=await o.json()}catch{const l=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${l})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let l;typeof r.detail=="string"?l=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?l=r.detail.message:l="An error occurred";const c=new Error(l);throw c.status=o.status,c.detail=r.detail,c}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20){return this.request("GET",`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const $=new Dc;window.api=$;let Tt=null;function N(){document.getElementById("modal-overlay").classList.remove("hidden")}function K(){var e;ln(),document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide")}function Ys(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function v(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.remove()},3e3)}function ln(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Tt&&(document.removeEventListener("keydown",Tt),Tt=null)}function Mc(e){Tt&&document.removeEventListener("keydown",Tt),Tt=e,e&&document.addEventListener("keydown",e)}function Zs(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(ln(),document.removeEventListener("click",s,!0))};return setTimeout(()=>document.addEventListener("click",s,!0),0),()=>document.removeEventListener("click",s,!0)}Object.assign(window,{showModal:N,closeModal:K,showToast:v,closeAllDropdowns:ln,registerDropdownClickOutside:Zs});function it(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ue(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Xs(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ye(e){return typeof e=="string"&&/^#[0-9a-fA-F]{3,8}$/.test(e)?e:"#888888"}function f(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function _(e){return f(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function xt(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function E(e){return e==null?"":String(e).replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$").replace(/'/g,"\\x27").replace(/"/g,"\\x22").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/</g,"\\x3c").replace(/>/g,"\\x3e")}function Vn(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function jc(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Jn(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",s=e==null?void 0:e.avatar_url;return s?jc(s)?`<img class="${t} avatar-img" src="${_(s)}" alt="${_(n)}">`:`<div class="${t} avatar-emoji">${f(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}let St=null,cn=null,dn=null,un=null;function Yn(){St||(St=document.getElementById("auth-screen"),cn=document.getElementById("main-screen"),dn=document.getElementById("login-form"),un=document.getElementById("signup-form"))}function Zn(){Yn(),St&&St.classList.remove("hidden"),cn&&cn.classList.add("hidden")}function so(){Yn(),St&&St.classList.add("hidden"),cn&&cn.classList.remove("hidden")}function io(){Yn(),dn&&dn.classList.remove("hidden"),un&&un.classList.add("hidden")}function ao(){Yn(),dn&&dn.classList.add("hidden"),un&&un.classList.remove("hidden")}async function oo(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await $.login(t,n),window.currentUser=await $.getMe(),window.initApp&&await window.initApp(),v("Welcome back!","success")}catch(s){v(`Login failed: ${s.message}`,"error")}return!1}async function ro(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await $.signup(t,n,s),await $.login(n,s),window.currentUser=await $.getMe(),window.initApp&&await window.initApp(),v("Account created successfully!","success")}catch(i){v(`Signup failed: ${i.message}`,"error")}return!1}function Qs(){$.logout(),window.currentUser=null,window.currentTeam=null,Zn(),v("Signed out","success")}function lo(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function co(){const e=window.currentUser;if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?lo(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${_(s)}" alt="${_(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}Object.assign(window,{showAuthScreen:Zn,showMainScreen:so,showLogin:io,showSignup:ao,handleLogin:oo,handleSignup:ro,logout:Qs,updateUserInfo:co,isImageAvatar:lo});function uo(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let ei=[],pn=[],po=null,Z=new Set,Lt="list",ft=!1,ti=null;try{const e=localStorage.getItem("chaotic_doc_view_mode");(e==="list"||e==="grid")&&(Lt=e)}catch{}function Pc(e){if(e!=="list"&&e!=="grid")return;Lt=e,e==="grid"&&ft&&Xn();try{localStorage.setItem("chaotic_doc_view_mode",e)}catch{}const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),at()}function mo(){if(Lt!=="list")return;ft=!0,Z.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.onclick=Xn),at(),At()}function Xn(){ft=!1,Z.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.onclick=mo),at(),At()}function Rc(){ti&&clearTimeout(ti),ti=setTimeout(()=>{at()},300)}function Nc(){const e=document.getElementById("doc-search");e&&(e.value=""),at()}async function Hc(){const e=document.getElementById("doc-project-filter");e&&(e.value=""),await ni()}async function Oc(){const e=document.getElementById("doc-search"),t=document.getElementById("doc-project-filter");e&&(e.value=""),t&&(t.value=""),await ni()}function qc(){var i,a,o;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${f(t)}" <button class="chip-clear" onclick="clearDocSearch()">×</button></span>`),n){const r=document.getElementById("doc-project-filter"),l=((o=r==null?void 0:r.options[r.selectedIndex])==null?void 0:o.text)||"Project";s.push(`<span class="filter-chip">Project: ${f(l)} <button class="chip-clear" onclick="clearDocProjectFilter()">×</button></span>`)}if(s.length>0){let r=s.join(" ");s.length>1&&(r+=' <button class="btn btn-secondary btn-tiny" onclick="clearAllDocFilters()">Clear all</button>'),e.innerHTML=r,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function at(){var n,s,i;const e=((s=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:s.toLowerCase())||"",t=((i=document.getElementById("doc-sort"))==null?void 0:i.value)||"updated_desc";qc(),pn=ei.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),pn.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),go("",Lt)}async function ni(){var n,s;const e=po||((n=window.currentTeam)==null?void 0:n.id);if(!e)return;const t=((s=document.getElementById("doc-project-filter"))==null?void 0:s.value)||null;try{ei=await $.getDocuments(e,t),at()}catch(i){v(i.message,"error")}}async function Ct(e,t=null){var n;if(e||(e=(n=window.currentTeam)==null?void 0:n.id),!!e){if(po=e,t===null){const s=document.getElementById("doc-project-filter");s!=null&&s.value&&(t=s.value)}try{ei=await $.getDocuments(e,t);const s=document.getElementById("doc-view-list"),i=document.getElementById("doc-view-grid");s&&i&&(s.classList.toggle("active",Lt==="list"),i.classList.toggle("active",Lt==="grid")),at()}catch(s){v(s.message,"error")}}}function Fc(e){return!e||e.length===0?"":e.map(t=>`<span class="badge" style="background-color: ${ye(t.color)}; color: white;">${f(t.name)}</span>`).join(" ")}function Uc(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Fc(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${_(e.id)}" onclick="viewDocument('${E(e.id)}')">
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
  `}function Gc(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,3).map(r=>`<span class="badge badge-small" style="background-color: ${ye(r.color)}; color: white;">${f(r.name)}</span>`).join(" ")+(e.labels.length>3?` <span class="text-muted">+${e.labels.length-3}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?uo(e.content).substring(0,80):"No content",i=ft?`<div class="document-list-checkbox" onclick="event.stopPropagation(); toggleDocSelection('${E(e.id)}')">
         <input type="checkbox" id="doc-check-${e.id}" ${Z.has(e.id)?"checked":""}>
       </div>`:"",a=ft&&Z.has(e.id)?" selected":"",o=ft?`toggleDocSelection('${E(e.id)}')`:`viewDocument('${E(e.id)}')`;return`
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
  `}function go(e="",t="list"){var c,d;const n=document.getElementById("documents-list");if(!n)return;Z.clear(),At();const s=pn;if(s.length===0){const m=(c=document.getElementById("doc-search"))==null?void 0:c.value,u=(d=document.getElementById("doc-project-filter"))==null?void 0:d.value,g=m||u;n.innerHTML=`
      <div class="empty-state">
        <h3>${g?"No documents match your filters":"No documents yet"}</h3>
        <p>${g?"Try different search terms or filters":"Create your first document to get started"}</p>
      </div>
    `;return}const i=t==="grid"?Uc:Gc,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=window.getProjects?window.getProjects():[];s.forEach(m=>{let u,g;if(e==="project")if(u=m.project_id||"__global__",u==="__global__")g="Global (Team-wide)";else{const b=r.find(y=>y.id===m.project_id);g=b?b.name:"Unknown Project"}else e==="sprint"&&(u=m.sprint_id||"__no_sprint__",g=m.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:g,docs:[]}),o[u].docs.push(m)});let l="";for(const[m,u]of Object.entries(o)){const g=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${f(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${g}">
          ${u.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function zc(e){Z.has(e)?Z.delete(e):Z.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=Z.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",Z.has(e)),At()}function Kc(){pn.forEach(e=>Z.add(e.id)),pn.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),At()}function fo(){Z.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),Z.clear(),At()}function At(){const e=document.getElementById("doc-bulk-actions");e&&(ft?(e.classList.remove("hidden"),Z.size>0?e.innerHTML=`
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
  `,N()}async function Vc(e){var o;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(Z);let s=0,i=0;for(const r of n)try{await $.updateDocument(r,{project_id:t}),s++}catch(l){console.error(`Failed to move document ${r}:`,l),i++}K(),fo(),i===0?v(`Moved ${s} document${s>1?"s":""}!`,"success"):v(`Moved ${s}, failed ${i}`,"warning");const a=(o=window.currentTeam)==null?void 0:o.id;return await Ct(a),!1}async function Jc(){var a;if(Z.size===0){v("No documents selected","error");return}const e=Z.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(Z);let n=0,s=0;for(const o of t)try{await $.deleteDocument(o),n++}catch(r){console.error(`Failed to delete document ${o}:`,r),s++}Xn(),s===0?v(`Deleted ${n} document${n>1?"s":""}!`,"success"):v(`Deleted ${n}, failed ${s}`,"warning");const i=(a=window.currentTeam)==null?void 0:a.id;await Ct(i)}async function Ce(e,t=!0){try{const n=await $.getDocument(e);t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");const i=window.renderMarkdown||(g=>f(g));let a="";try{const g=await $.getDocumentIssues(n.id);g.length>0?a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <div class="linked-items-list">${g.map(y=>`
          <div class="linked-item">
            <span class="linked-item-id">${f(y.identifier)}</span>
            <span class="linked-item-title">${f(y.title)}</span>
            <button class="btn btn-danger btn-tiny" onclick="unlinkDocumentFromIssue('${E(n.id)}', '${E(y.id)}')" title="Unlink">×</button>
          </div>
        `).join("")}</div>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${E(n.id)}')">+ Link Issue</button>
          </div>
        `:a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${E(n.id)}')">+ Link Issue</button>
          </div>
        `}catch{}let o="";try{const g=await $.getDocumentComments(n.id);o=`
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${g.length===0?'<div class="comments-empty">No comments yet</div>':g.map(y=>{var x,L;return`
            <div class="comment" data-comment-id="${_(y.id)}">
              <div class="comment-avatar">${((L=(x=y.author_name)==null?void 0:x.charAt(0))==null?void 0:L.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${f(y.author_name||"Unknown")}</span>
                  <span class="comment-date">${xt(y.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${i(y.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form" onsubmit="return handleAddDocumentComment(event, '${E(n.id)}')">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="3"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(g){console.error("Failed to load comments:",g)}let r=null,l=null;if(n.project_id){const b=(window.getProjects?window.getProjects():[]).find(y=>y.id===n.project_id);if(r=b?b.name:null,n.sprint_id)try{const y=await $.getSprint(n.sprint_id);l=y?y.name:null}catch{}}let c="";r?(c=`<span class="badge badge-primary">${f(r)}</span>`,l&&(c+=` <span class="badge badge-info">${f(l)}</span>`)):c='<span class="badge badge-secondary">Global</span>';let d="";n.labels&&n.labels.length>0?d=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <div class="document-labels">${n.labels.map(b=>`
        <span class="label-badge" style="background-color: ${ye(b.color)}; color: white;">
          ${f(b.name)}
          <button class="btn-remove-label" onclick="removeLabelFromDoc('${E(n.id)}', '${E(b.id)}')" title="Remove label">×</button>
        </span>
      `).join(" ")}</div>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${E(n.id)}')">+ Add Label</button>
        </div>
      `:d=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${E(n.id)}')">+ Add Label</button>
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
              ${c}${n.author_name?` · By ${f(n.author_name)}`:""} · Last updated ${new Date(n.updated_at).toLocaleString()}
            </div>
          </div>
          <div class="document-actions">
            <button class="btn btn-secondary btn-small" onclick="showEditDocumentModal('${E(n.id)}')">Edit</button>
            <button class="btn btn-danger btn-small" onclick="deleteDocument('${E(n.id)}')">Delete</button>
          </div>
        </div>
      </div>
      <div class="document-content markdown-body">${m?i(m):"No content"}</div>
      ${d}
      ${a}
      ${o}
    `}catch(n){v(n.message,"error")}}async function si(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await $.getSprints(t);let o=n;if(s&&!n){const l=a.find(c=>c.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${f(l.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function ii(){const e=window.getProjects?window.getProjects():[],t=window.getSavedProjectId?window.getSavedProjectId():"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${f(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
  `,N(),t&&await si("doc-sprint",t,null,!0)}async function Yc(e){var a;e.preventDefault();const t=(a=window.currentTeam)==null?void 0:a.id;if(!t)return v("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{await $.createDocument(t,i),await Ct(t),K(),v("Document created!","success")}catch(o){v(o.message,"error")}return!1}async function Zc(e){try{const t=await $.getDocument(e),s=(window.getProjects?window.getProjects():[]).map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${f(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
      <form onsubmit="return handleUpdateDocument(event, '${E(e)}')">
        <div class="form-group">
          <label for="edit-doc-title">Title</label>
          <input type="text" id="edit-doc-title" value="${_(t.title)}" required>
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
          <input type="text" id="edit-doc-icon" value="${_(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,N(),t.project_id&&await si("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){v(t.message,"error")}}async function Xc(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await $.updateDocument(t,i),K(),await Ce(t),v("Document updated!","success")}catch(a){v(a.message,"error")}return!1}async function Qc(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await $.deleteDocument(e);const n=(t=window.currentTeam)==null?void 0:t.id;await Ct(n),window.navigateTo&&window.navigateTo("documents"),v("Document deleted!","success")}catch(n){v(n.message,"error")}}function ed(e,t){si(e,t)}async function td(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleLinkIssue(event, '${E(e)}')">
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToLink(this.value, '${E(e)}')">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,N()}async function nd(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=window.currentTeam)==null?void 0:s.id,a=await $.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" onclick="linkToIssue('${E(t)}', '${E(o.id)}')">
        <span class="link-result-id">${f(o.identifier)}</span>
        <span class="link-result-title">${f(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function sd(e,t){try{await $.linkDocumentToIssue(e,t),K(),v("Issue linked!","success"),await Ce(e,!1)}catch(n){v(n.message,"error")}}async function id(e,t){if(confirm("Unlink this issue from the document?"))try{await $.unlinkDocumentFromIssue(e,t),v("Issue unlinked!","success"),await Ce(e,!1)}catch(n){v(n.message,"error")}}async function ad(e,t){e.preventDefault();const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return v("Please enter a comment","error"),!1;try{await $.createDocumentComment(t,s),n.value="",v("Comment added!","success"),await Ce(t,!1)}catch(i){v(i.message,"error")}return!1}async function od(e){var n;const t=(n=window.currentTeam)==null?void 0:n.id;if(!t){v("No team selected","error");return}try{const s=await $.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,N();return}const i=s.map(a=>`
      <div class="label-select-item" onclick="addLabelToDoc('${E(e)}', '${E(a.id)}')" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ye(a.color)}; color: white;">${f(a.name)}</span>
        ${a.description?`<span class="text-muted">${f(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,N()}catch(s){v(s.message,"error")}}async function rd(e,t){try{await $.addLabelToDocument(e,t),K(),v("Label added!","success"),await Ce(e,!1)}catch(n){v(n.message,"error")}}async function ld(e,t){try{await $.removeLabelFromDocument(e,t),v("Label removed!","success"),await Ce(e,!1)}catch(n){v(n.message,"error")}}Object.assign(window,{loadDocuments:Ct,filterDocuments:at,renderDocuments:go,viewDocument:Ce,showCreateDocumentModal:ii,handleCreateDocument:Yc,showEditDocumentModal:Zc,handleUpdateDocument:Xc,deleteDocument:Qc,updateDocSprintDropdown:ed,showLinkIssueModal:td,searchIssuesToLink:nd,linkToIssue:sd,unlinkDocumentFromIssue:id,toggleDocSelection:zc,selectAllDocs:Kc,clearDocSelection:fo,showBulkMoveModal:Wc,handleBulkMove:Vc,bulkDeleteDocuments:Jc,handleAddDocumentComment:ad,showAddLabelToDocModal:od,addLabelToDoc:rd,removeLabelFromDoc:ld,setDocViewMode:Pc,enterSelectionMode:mo,exitSelectionMode:Xn,debounceDocSearch:Rc,clearDocSearch:Nc,clearDocProjectFilter:Hc,clearAllDocFilters:Oc,onDocProjectFilterChange:ni});let mn=[];function cd(){return mn}function dd(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function ho(e){const t=e==null?void 0:e.avatar_url,n=_((e==null?void 0:e.name)||"Agent");return t?dd(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${_(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${f(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function ud(e){var t;if(e||(e=(t=window.currentTeam)==null?void 0:t.id),!!e)try{mn=await $.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(n){console.error("Failed to load team agents:",n)}}async function ai(e){var t;if(e||(e=(t=window.currentTeam)==null?void 0:t.id),!!e)try{mn=await $.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),vo()}catch(n){v(n.message,"error")}}function vo(){const e=document.getElementById("agents-list");if(e){if(mn.length===0){e.innerHTML='<p class="empty-state">No agents yet. Create an agent to enable CLI automation with its own identity.</p>';return}e.innerHTML=mn.map(t=>{const n=f(t.name),s=f(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${ho(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${Xs(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" onclick="deleteAgent('${E(t.id)}', '${E(t.name||"Agent")}')">Delete</button>
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),N()}async function pd(e){var o,r,l;e.preventDefault();const t=(o=window.currentTeam)==null?void 0:o.id;if(!t)return v("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(l=document.getElementById("agent-project"))==null?void 0:l.value;try{let c;i&&a?c=await $.createProjectAgent(a,n,s):c=await $.createTeamAgent(t,n,s),K();const d=f(c.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
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
    `,N()}catch(c){v(`Failed to create agent: ${c.message}`,"error")}return!1}function md(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{v("Agent API key copied to clipboard","success")}).catch(()=>{v("Failed to copy","error")})}async function gd(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await $.deleteAgent(e),v("Agent deleted","success"),ai()}catch(n){v(`Failed to delete agent: ${n.message}`,"error")}}Object.assign(window,{loadTeamAgentsQuiet:ud,loadAgents:ai,renderAgents:vo,showCreateAgentModal:bo,handleCreateAgent:pd,copyAgentKey:md,deleteAgent:gd,renderAgentAvatar:ho});let Qn=[],gn=[],oi=[],ri=[];function yo(){return Qn}function Bt(){return gn}function fd(e){gn=e}async function es(){try{Qn=await $.getMyTeams(),wo()}catch(e){v(e.message,"error")}}function wo(){const e=document.getElementById("team-list");Qn.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Qn.map(t=>`
            <button class="dropdown-item" data-team-json="${_(JSON.stringify(t))}" onclick="selectTeam(JSON.parse(this.dataset.teamJson))">${f(t.name)}</button>
        `).join("")}async function li(e,t=!1){window.currentTeam=e,document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const s=document.getElementById("team-description-text");s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),window.connectWebSocket&&window.connectWebSocket(e.id),await Promise.all([window.loadProjects?window.loadProjects():Promise.resolve(),window.loadLabels?window.loadLabels():Promise.resolve(),$o(),window.loadTeamAgentsQuiet?window.loadTeamAgentsQuiet():Promise.resolve()]),t?window.handleRoute&&window.handleRoute():window.navigateTo&&window.navigateTo(window.currentView)}function ci(){document.getElementById("team-dropdown").classList.toggle("hidden")}function ko(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function $o(){if(window.currentTeam)try{gn=await $.getTeamMembers(window.currentTeam.id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(e){console.error("Failed to load team members:",e)}}async function di(){if(window.currentTeam)try{gn=await $.getTeamMembers(window.currentTeam.id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),Io()}catch(e){v(e.message,"error")}}function Io(){const e=document.getElementById("team-members-list");e.innerHTML=gn.map(t=>`
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
                    <button class="btn btn-danger btn-small" onclick="removeMember('${E(t.user_id)}')">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function ts(){if(window.currentTeam)try{oi=await $.getTeamInvitations(window.currentTeam.id),Eo()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function Eo(){const e=document.getElementById("team-invitations-list");if(oi.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=oi.map(t=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${f(t.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${f(t.role)}</span>
                    <span>Expires: ${new Date(t.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" onclick="deleteInvitation('${E(t.id)}')">Cancel</button>
        </div>
    `).join("")}async function _o(){if(window.currentTeam)try{ri=await $.getTeamAgents(window.currentTeam.id),To()}catch(e){v(e.message,"error")}}function To(){const e=document.getElementById("team-agents-list");if(e){if(ri.length===0){e.innerHTML=`<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" onclick="navigateTo('settings'); return false;">Create an agent</a> to enable CLI automation with its own identity.</p></div>`;return}e.innerHTML=ri.map(t=>{const n=f(t.name),s=f(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
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
      `}).join("")}}function ui(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,N()}async function hd(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await $.createInvitation(window.currentTeam.id,t,n),await ts(),K(),v("Invitation sent!","success")}catch(s){v(`Failed to send invitation: ${s.message}`,"error")}return!1}async function vd(e){if(confirm("Are you sure you want to remove this member?"))try{await $.removeMember(window.currentTeam.id,e),await di(),v("Member removed!","success")}catch(t){v(`Failed to remove member: ${t.message}`,"error")}}async function bd(e){try{await $.deleteInvitation(window.currentTeam.id,e),await ts(),v("Invitation canceled!","success")}catch(t){v(`Failed to cancel invitation: ${t.message}`,"error")}}function pi(){ci(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
                <input type="text" id="team-name" value="${_(window.currentTeam.name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${_(window.currentTeam.key)}" disabled class="input-disabled">
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
    `,N())}async function yd(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await $.createTeam(t);await es(),await li(n),K(),v("Team created!","success")}catch(n){v(`Failed to create team: ${n.message}`,"error")}return!1}async function wd(e){if(e.preventDefault(),!window.currentTeam)return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await $.updateTeam(window.currentTeam.id,t);window.currentTeam=n,document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await es(),K(),v("Team updated!","success")}catch(n){v(`Failed to update team: ${n.message}`,"error")}return!1}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),Object.assign(window,{loadTeams:es,renderTeamList:wo,selectTeam:li,toggleTeamDropdown:ci,toggleUserDropdown:ko,loadTeamMembersQuiet:$o,loadTeamMembers:di,renderTeamMembers:Io,loadTeamInvitations:ts,renderTeamInvitations:Eo,loadTeamAgents:_o,renderTeamAgents:To,showInviteModal:ui,handleInvite:hd,removeMember:vd,deleteInvitation:bd,showCreateTeamModal:pi,showEditTeamModal:xo,handleCreateTeam:yd,handleUpdateTeam:wd,getTeams:yo,getMembers:Bt,setMembers:fd});let te=[];const fn={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function ie(){return te}function kd(e){te=e}function hn(e){const t=te.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return fn[n]||fn.fibonacci}function vn(e,t){if(!e)return"No estimate";const s=hn(t).find(i=>i.value===e);return s?s.label:`${e} points`}function So(e){const t=te.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(fn[n]||fn.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function we(){if(window.currentTeam)try{te=await $.getProjects(window.currentTeam.id),Lo()}catch(e){v(e.message,"error")}}function Lo(){const e=document.getElementById("project-filter"),t=document.getElementById("sprint-project-filter"),n=document.getElementById("board-project-filter"),s=document.getElementById("doc-project-filter"),i=document.getElementById("dashboard-project-filter"),a=e==null?void 0:e.value,o=t==null?void 0:t.value,r=n==null?void 0:n.value,l=s==null?void 0:s.value,c=i==null?void 0:i.value,d='<option value="">All Projects</option>'+te.map(g=>`<option value="${g.id}">${f(g.name)}</option>`).join(""),m='<option value="">Select Project</option>'+te.map(g=>`<option value="${g.id}">${f(g.name)}</option>`).join(""),u=bn();if(e){e.innerHTML=d;let g=a;if(!g||!te.some(b=>b.id===g))if(u&&te.some(b=>b.id===u))g=u;else{const y=new URLSearchParams(window.location.search).get("project");y&&te.some(x=>x.id===y)?g=y:te.length>0&&(g=te[0].id)}g&&(e.value=g,localStorage.setItem("chaotic_last_project",g))}if(t){t.innerHTML=m;const g=o||u;g&&te.some(b=>b.id===g)&&(t.value=g)}if(n){n.innerHTML=m;const g=r||u;g&&te.some(b=>b.id===g)&&(n.value=g)}if(s){s.innerHTML=d;const g=l||u;g&&te.some(b=>b.id===g)&&(s.value=g)}if(i){i.innerHTML=d;const g=c||u;g&&te.some(b=>b.id===g)&&(i.value=g)}}function bn(){return localStorage.getItem("chaotic_last_project")}function ht(e){if(!e)return;localStorage.setItem("chaotic_last_project",e),["project-filter","board-project-filter","sprint-project-filter"].forEach(n=>{const s=document.getElementById(n);s&&(s.value=e)})}function Dt(){const e=document.getElementById("projects-list");if(te.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create your first project to get started</p>
            </div>
        `;return}e.innerHTML=te.map(t=>`
        <div class="grid-item" onclick="viewProject('${E(t.id)}')">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${ye(t.color)}20; color: ${ye(t.color)}">
                    ${f(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${f(t.name)}</div>
                <button class="grid-item-edit" onclick="event.stopPropagation(); viewProjectSettings('${E(t.id)}')" title="Project settings">
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
    `).join("")}function $d(e){ht(e),window.navigateTo&&window.navigateTo("issues")}function mi(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,N()}async function Id(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await $.createProject(window.currentTeam.id,t),await we(),Dt(),K(),v("Project created!","success")}catch(n){v(`Failed to create project: ${n.message}`,"error")}return!1}function Ed(e){const t=te.find(s=>s.id===e);if(!t)return;const n=[{value:"fibonacci",label:"Fibonacci (1, 2, 3, 5, 8, 13, 21)"},{value:"linear",label:"Linear (1-10)"},{value:"powers_of_2",label:"Powers of 2 (1, 2, 4, 8, 16, 32, 64)"},{value:"tshirt",label:"T-Shirt (XS, S, M, L, XL)"}];document.getElementById("modal-title").textContent="Edit Project",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateProject(event, '${E(t.id)}')">
            <div class="form-group">
                <label for="project-name">Name</label>
                <input type="text" id="project-name" value="${_(t.name)}" required>
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
                <button type="button" class="btn btn-danger-outline" onclick="confirmDeleteProject('${E(t.id)}')">Delete Project</button>
            </div>
        </form>
    `,N()}async function _d(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await $.updateProject(t,n),await we(),Dt(),K(),v("Project updated!","success")}catch(s){v(`Failed to update project: ${s.message}`,"error")}return!1}async function Td(e){const t=te.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await $.deleteProject(e),await we(),Dt(),K(),v("Project deleted","success")}catch(n){v(`Failed to delete project: ${n.message}`,"error")}}let be=null;async function Co(e){be=e,te.length===0&&await we();const t=te.find(n=>n.id===e);if(!t){v("Project not found","error"),window.navigateTo("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Ao("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Ao(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Ge||Ge.length===0)&&Mt()}function Bo(){be=null,Ge=[]}function Do(e){be=e}function Mo(){return Ge}async function xd(){if(!be)return;const e=document.getElementById("ps-name").value.trim();if(!e){v("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await $.updateProject(be,t),await we(),v("Settings saved","success");const n=te.find(s=>s.id===be);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){v(n.message,"error")}}async function Sd(){if(!be)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await $.updateProject(be,n),await we(),v("Settings saved","success")}catch(s){v(`Failed to save settings: ${s.message}`,"error")}}let Ge=[];async function Mt(){if(be)try{Ge=await $.getRituals(be),Ld(),typeof window._onRitualsChanged=="function"&&window._onRitualsChanged()}catch(e){v(e.message,"error")}}function Ld(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Ge.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=Ge.filter(s=>s.trigger==="ticket_close"),n=Ge.filter(s=>s.trigger==="ticket_claim");jt("ps-sprint-rituals-list",e,"sprint"),jt("ps-close-rituals-list",t,"close"),jt("ps-claim-rituals-list",n,"claim")}function jt(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>_(a||"auto");s.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${f(a.group_name)}${r}</span>`}return`
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
        <button class="btn btn-secondary btn-small" onclick="showEditProjectRitualModal('${E(a.id)}')">Edit</button>
        <button class="btn btn-danger btn-small" data-ritual-id="${_(a.id)}" data-ritual-name="${_(a.name)}" onclick="deleteProjectRitual(this.dataset.ritualId, this.dataset.ritualName)">Delete</button>
      </div>
    </div>
  `}).join("")}async function Cd(e){if(!be)return;let t=[];try{t=await $.getRitualGroups(be)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
          ${t.map(n=>`<option value="${_(n.id)}" data-mode="${_(n.selection_mode)}">${f(n.name)} (${f(n.selection_mode)})</option>`).join("")}
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
  `,N()}function Ad(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Bd(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),s=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),s.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),s.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),s.classList.add("hidden")}async function jo(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw v("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await $.createRitualGroup(be,{name:t,selection_mode:n})).id}return e.value||null}async function Dd(e){e.preventDefault();let t;try{t=window.collectConditions?window.collectConditions():null}catch{return!1}let n;try{n=await jo()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){s.group_id=n;const i=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&i.value&&(s.weight=parseFloat(i.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(s.percentage=parseFloat(a.value))}try{await $.createRitual(be,s),await Mt(),K(),v("Ritual created!","success")}catch(i){v(`Failed to create ritual: ${i.message}`,"error")}return!1}async function Md(e){const t=Ge.find(o=>o.id===e);if(!t)return;let n=[];try{n=await $.getRitualGroups(be)}catch{}const s=n.find(o=>o.id===t.group_id),i=s&&s.selection_mode==="random_one",a=s&&s.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleUpdateProjectRitual(event, '${E(e)}')">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${_(t.name)}" required>
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
          ${n.map(o=>`<option value="${_(o.id)}" data-mode="${_(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${f(o.name)} (${f(o.selection_mode)})</option>`).join("")}
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
  `,N()}async function jd(e,t){e.preventDefault();let n;try{n=window.collectConditions?window.collectConditions():null}catch{return!1}let s;try{s=await jo()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:s||""};if(s){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await $.updateRitual(t,i),await Mt(),K(),v("Ritual updated!","success")}catch(a){v(`Failed to update ritual: ${a.message}`,"error")}return!1}async function Pd(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await $.deleteRitual(e),await Mt(),v("Ritual deleted","success")}catch(n){v(`Failed to delete ritual: ${n.message}`,"error")}}Object.assign(window,{loadProjects:we,updateProjectFilters:Lo,getSavedProjectId:bn,setGlobalProjectSelection:ht,renderProjects:Dt,viewProject:$d,showCreateProjectModal:mi,handleCreateProject:Id,viewProjectSettings:Co,switchProjectSettingsTab:Ao,saveProjectSettingsGeneral:xd,saveProjectSettingsRules:Sd,clearProjectSettingsState:Bo,showEditProjectModal:Ed,handleUpdateProject:_d,confirmDeleteProject:Td,getEstimateOptions:hn,formatEstimate:vn,getEstimateScaleHint:So,getProjects:ie,setProjects:kd,ESTIMATE_SCALES:fn,showCreateProjectRitualModal:Cd,handleCreateProjectRitual:Dd,showEditProjectRitualModal:Md,handleUpdateProjectRitual:jd,deleteProjectRitual:Pd,setCurrentSettingsProjectId:Do,getProjectRituals:Mo,loadProjectSettingsRituals:Mt,onRitualGroupChange:Bd});const ns={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},ss={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Po=0;function Rd(e){Po=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=Ro(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" onclick="addConditionRow()">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Ro(e="",t="",n=""){const s=Po++,i=Object.keys(ns).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?ns[e]:ns.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${ss[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
        <div class="condition-row" id="condition-row-${s}">
            <select class="condition-field" onchange="updateOperatorOptions(${s})">
                <option value="">Select field...</option>
                ${i}
            </select>
            <select class="condition-operator" id="condition-operator-${s}" onchange="toggleValueInput(${s})">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${s}" value="${_(String(r))}" placeholder="Value"${l?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" onclick="removeConditionRow(${s})">&times;</button>
        </div>
    `}function Nd(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Ro()),is()}function Hd(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),is()}function Od(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=ns[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${ss[o]}</option>`).join(""),No(e),is()}function No(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function yn(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function is(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function qd(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,l=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,c=o.querySelector(".condition-value");let d=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw yn("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw yn("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const m=`${r}__${l}`;if(n.has(m))throw yn(`Duplicate condition: ${r} ${ss[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${m}`);if(n.add(m),l==="isnull")t[m]=!0;else if(l==="in"||l==="contains")t[m]=d?d.split(",").map(u=>u.trim()).filter(u=>u):[];else if(l==="gte"||l==="lte"){if(!d)throw yn(`Please enter a numeric value for ${r} ${ss[l]}.`),new Error(`Missing numeric value for ${m}`);const u=parseInt(d,10);if(isNaN(u))throw yn(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${m}: ${d}`);t[m]=u}else t[m]=d}return is(),Object.keys(t).length>0?t:null}Object.assign(window,{renderConditionBuilder:Rd,addConditionRow:Nd,removeConditionRow:Hd,updateOperatorOptions:Od,toggleValueInput:No,collectConditions:qd});let Te={...{currentUser:null,currentView:"my-issues",issues:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null}};const Fd=new Set;function ot(e,t){if(typeof e=="string"){const n=Te[e];Te[e]=t,Ho(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=Te[s];Te[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{Ho(s,i,a)})}}function Ho(e,t,n){t!==n&&Fd.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const gi=()=>Te.currentUser,Ud=e=>ot("currentUser",e),U=()=>Te.currentView,Gd=e=>ot("currentView",e),Me=()=>Te.issues,ze=e=>ot("issues",e),Oo=()=>Te.activeFilterCategory,zd=e=>ot("activeFilterCategory",e),Kd=()=>Te.selectedIssueIndex,qo=e=>ot("selectedIssueIndex",e),Wd=()=>Te.pendingGates,Vd=e=>ot("pendingGates",e),Jd=()=>Te.searchDebounceTimer,Yd=e=>ot("searchDebounceTimer",e),Zd=()=>Te.websocket,Fo=e=>ot("websocket",e);function vt(){const t=new URLSearchParams(window.location.search).get("project");return t||bn()}function as(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}let Pt=[],os={},rs=new Set,Ke=null,Uo=null,fi=[],wn=[],hi=[];function Xd(){return os}function Qd(){return Ke}function Go(){const e=document.getElementById("sprint-project-filter");if(e){if(!e.value){const t=vt();t&&ie().some(n=>n.id===t)&&(e.value=t)}e.value?We(e.value):document.getElementById("sprints-list").innerHTML=`
            <div class="empty-state">
                <h3>Select a project</h3>
                <p>Choose a project to view its sprints</p>
            </div>
        `}}function eu(){const e=document.getElementById("sprint-project-filter").value;e&&(ht(e),as(e)),We(e)}async function We(e){const t=e||document.getElementById("sprint-project-filter").value;if(t){hu();try{await $.getCurrentSprint(t),Pt=await $.getSprints(t),tu(),await ls()}catch(n){v(n.message,"error")}}}function tu(){const e=document.getElementById("sprints-list");if(!e)return;const t=Pt.find(a=>a.status==="active"),n=Pt.find(a=>a.status==="planned"),s=Pt.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${E(t.id)}'); } else { window.open('/sprint/${t.id}', '_blank'); }" style="cursor: pointer;">
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
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${E(t.id)}', '${E(t.name)}', ${t.budget||"null"}, '${E(t.project_id)}')">Edit Budget</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" onclick="showLimboDetailsModal()">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" onclick="showCloseSprintConfirmation('${E(t.id)}')">Close Sprint</button>
                    `}
                </div>
            </div>
        `,i+=nu(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${E(n.id)}'); } else { window.open('/sprint/${n.id}', '_blank'); }" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${f(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
                <div class="sprint-card-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${E(n.id)}', '${E(n.name)}', ${n.budget||"null"}, '${E(n.project_id)}')">Edit Budget</button>
                </div>
            </div>
        `}s.length>0&&(i+=`
            <details class="sprint-history">
                <summary>Completed Sprints (${s.length})</summary>
                <div class="sprint-history-list">
                    ${s.map(a=>`
                        <div class="sprint-history-item" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${E(a.id)}'); } else { window.open('/sprint/${a.id}', '_blank'); }" style="cursor: pointer;">
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
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),d=((G,W,P)=>Math.min(Math.max(G,W),P))((new Date-o)/(r-o),0,1),m=360,u=120,g=16,b=g,y=m-g,x=g,L=u-g,D=G=>s===0?L:x+(1-G/s)*(L-x),H=D(s),M=D(0),O=b+(y-b)*d,C=D(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${cs(e.start_date)} → ${cs(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${m} ${u}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${b}" y1="${H}" x2="${y}" y2="${M}" class="burndown-ideal" />
                <line x1="${b}" y1="${H}" x2="${O}" y2="${C}" class="burndown-actual" />
                <circle cx="${O}" cy="${C}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}async function vi(e,t=!0){var n;try{const s=await $.getSprint(e);if(!s){v("Sprint not found","error"),window.navigateTo("sprints");return}Uo=s;const i=(n=window.currentTeam)==null?void 0:n.id,[a,o,r]=await Promise.all([$.getIssues({sprint_id:e,limit:500}),$.getSprintTransactions(e).catch(()=>[]),i?$.getDocuments(i,s.project_id,null,e).catch(()=>[]):[]]);fi=a,hi=o,wn=r,t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),iu()}catch(s){console.error("Failed to load sprint:",s),v("Failed to load sprint","error"),window.navigateTo("sprints")}}async function su(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){v("Invalid sprint ID","error"),window.navigateTo("sprints",!1);return}try{await vi(e,!1)}catch{window.navigateTo("sprints",!1)}}function iu(){const e=Uo,t=fi;document.querySelectorAll(".view").forEach(d=>d.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=["backlog","todo","in_progress","in_review"],i=t.filter(d=>s.includes(d.status)),a=t.filter(d=>d.status==="done"),o=t.reduce((d,m)=>d+(m.estimate||0),0),r=a.reduce((d,m)=>d+(m.estimate||0),0);let l="";e.status==="active"?l='<span class="badge badge-status-active">Active</span>':e.status==="planned"?l='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(l='<span class="badge badge-status-completed">Completed</span>');const c=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" onclick="navigateTo('sprints')">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${f(e.name)}</h2>
                ${l}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.start_date&&e.end_date?`
                <div class="sprint-detail-dates">
                    ${cs(e.start_date)} → ${cs(e.end_date)}
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
        <div class="sprint-issue-row" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${E(e.id)}'); } else { window.open('/issue/${encodeURIComponent(e.identifier)}', '_blank'); }">
            <span class="status-dot ${o}"></span>
            <span class="sprint-issue-identifier">${f(e.identifier)}</span>
            <span class="sprint-issue-title">${f(e.title)}</span>
            <span class="sprint-issue-meta">
                ${s?`<span class="badge ${a}">${bu(s)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function au(e){const t=f(e.icon)||"📄";return`
        <div class="sprint-issue-row" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewDocument('${E(e.id)}'); } else { window.open('/document/${E(encodeURIComponent(e.id))}', '_blank'); }">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${f(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${xt(e.created_at)}</span>
            </span>
        </div>
    `}function ou(){const e=hi;if(!e||e.length===0)return`
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
        <form onsubmit="return handleUpdateBudget(event, '${E(e)}', '${E(s)}')">
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
    `,N()}async function cu(e,t,n){var o;e.preventDefault();const s=document.getElementById("sprint-budget").value,i=s?parseInt(s):null,a=((o=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:o.value)||"this";try{if(await $.updateSprint(t,{budget:i}),a==="planned"||a==="default"){const l=Pt.filter(c=>c.status==="planned"&&c.id!==t);for(const c of l)await $.updateSprint(c.id,{budget:i})}a==="default"&&n&&await $.updateProject(n,{default_sprint_budget:i}),await We(),K(),v(`Budget updated${a==="planned"?" (and planned sprints)":a==="default"?" (and set as project default)":""}!`,"success")}catch(r){v(`Failed to update budget: ${r.message}`,"error")}return!1}async function du(e){const t=Pt.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,N();const n=["backlog","todo","in_progress","in_review"];let s=0,i=!1,a=!1;try{const[l,c]=await Promise.all([$.getIssues({sprint_id:e,limit:500}),$.getRituals(t.project_id)]);s=l.filter(d=>n.includes(d.status)).length,i=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${f(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="this.disabled = true; closeModal(); completeSprint('${E(e)}')">Close Sprint</button>
            </div>
        </div>
    `}async function uu(e){try{const t=await $.closeSprint(e);await We(),t.limbo?mu(t):v("Sprint completed!","success")}catch(t){v(`Failed to complete sprint: ${t.message}`,"error")}}async function ls(){var t;const e=(t=document.getElementById("sprint-project-filter"))==null?void 0:t.value;if(e)try{Ke=await $.getLimboStatus(e),pu()}catch(n){console.error("Failed to load limbo status:",n)}}function pu(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Ke||!Ke.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Ke.pending_rituals.length} ritual(s) pending</span>
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
                    ${yi(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function bi(){var t,n,s,i;if(!Ke)return;const e=((t=document.getElementById("sprint-project-filter"))==null?void 0:t.value)||((n=document.getElementById("ritual-project-filter"))==null?void 0:n.value);document.getElementById("modal-title").textContent="Limbo Status",(s=document.querySelector(".modal"))==null||s.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Ke.pending_rituals.map(a=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${a.attestation?a.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${f(a.name)}</strong>
                            <span class="badge badge-ritual-${_(a.approval_mode)}">${f(a.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(a.prompt):f(a.prompt)}</div>
                        ${yi(a.attestation)}
                        ${fu(a,e)}
                    </div>
                `).join("")}
            </div>
            ${((i=Ke.completed_rituals)==null?void 0:i.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Ke.completed_rituals.map(a=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${f(a.name)}</div>
                            ${yi(a.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,N()}function yi(e){return!e||!e.note?"":`
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
                <button class="btn btn-small btn-primary" onclick="approveRitual('${E(e.id)}', '${E(t)}')">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" onclick="completeGateRitual('${E(e.id)}', '${E(t)}', '${E(e.name)}')">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Ko(e){for(const t of e)if(!rs.has(t))try{(await $.getSprints(t)).forEach(s=>{os[s.id]=s}),rs.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function hu(){os={},rs=new Set,fi=[],hi=[],wn=[]}function vu(e,t){t.forEach(n=>{os[n.id]=n}),rs.add(e)}function cs(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function bu(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}let rt=!0,kn=null,wi=null,ki=null,ds=null,h={api:null,getCurrentView:()=>"my-issues",showToast:()=>{},showModal:()=>{},closeModal:()=>{},navigateTo:()=>{},getProjects:()=>[],getMembers:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatTimeAgo:()=>"",getStatusIcon:()=>"",getPriorityIcon:()=>"",renderMarkdown:e=>e,renderAvatar:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",showDetailDropdown:()=>{},setupMentionAutocomplete:()=>{},renderTicketRitualActions:()=>"",getIssues:()=>[]};function yu(e){h={...h,...e}}function $i(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function Ii(e){return e.user_name||e.user_email||"Unknown"}function Ei(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const s=e.new_value?h.escapeHtml(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",i=e.new_value?h.escapeAttr(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<a href="#comments-section" class="activity-comment-link" title="${i}" onclick="event.preventDefault(); document.getElementById('comments-section')?.scrollIntoView({behavior: 'smooth'})">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${h.escapeHtml(h.formatStatus(t(e.old_value)))}</strong> to <strong>${h.escapeHtml(h.formatStatus(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${h.escapeHtml(h.formatPriority(t(e.old_value)))}</strong> to <strong>${h.escapeHtml(h.formatPriority(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${h.escapeHtml(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${h.escapeHtml(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const s=h.escapeHtml(e.field_name||"ritual"),i=e.new_value?h.escapeAttr(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<span class="activity-attestation-link" title="${i}">Attested to <strong>${s}</strong></span>`:`Attested to <strong>${s}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||h.escapeHtml(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||h.escapeHtml(e.field_name)}`:"Updated issue"}}function Wo(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function wu(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const m=d[1],u=document.createElement("a");u.href=`#/issue/${m}`,u.className="issue-link",u.textContent=m,o.appendChild(u),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const m=document.createElement("span");m.className="mention",m.textContent="@"+d[3],o.appendChild(m),r=d.index+d[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function ku(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let o;for(;(o=n.exec(t))!==null;){a=!0,o.index>i&&s.appendChild(document.createTextNode(t.slice(i,o.index)));const r=o[1],l=document.createElement("a");l.href=`#/issue/${r}`,l.className="issue-link",l.textContent=r,s.appendChild(l),i=o.index+o[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function $u(e){if(!e)return"";const t=h.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,Wo(n,wu),n.innerHTML}function us(e){if(!e)return"";const t=h.renderMarkdown(e),n=document.createElement("div");return n.innerHTML=t,Wo(n,ku),n.innerHTML}function Vo(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),s=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),s&&s.classList.toggle("rotated")}function Jo(){rt=!rt;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",rt),n&&n.classList.toggle("rotated",rt)}async function ps(e){try{kn=await h.api.getTicketRitualsStatus(e),Yo(e)}catch(t){console.error("Failed to load ticket rituals:",t),kn=null}}function Yo(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!kn){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=kn;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(rt=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",rt);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",rt);const r=n.some(d=>d.trigger==="ticket_close"),l=n.some(d=>d.trigger==="ticket_claim");let c="⚠️ Complete these rituals:";r&&l?c="⚠️ Pending rituals (claim before starting, close before completing):":l?c="⚠️ Complete these rituals before claiming this ticket:":r&&(c="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${c}</p>
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
    `}async function ms(e){try{let t;e.includes("-")?t=await h.api.getIssueByIdentifier(e):t=await h.api.getIssue(e),t?await ae(t.id,!1):h.navigateTo("my-issues",!1)}catch{h.navigateTo("my-issues",!1)}}async function ae(e,t=!0){try{rt=!0;const[n,s,i,a,o,r]=await Promise.all([h.api.getIssue(e),h.api.getComments(e),h.api.getActivities(e),h.api.getSubIssues(e),h.api.getRelations(e),h.api.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),c=[...r.pending_rituals||[],...r.completed_rituals||[]].filter(k=>k.attestation&&k.attestation.note).map(k=>({id:`attestation-${k.attestation.id}`,author_name:k.attestation.attested_by_name||"Unknown",content:k.attestation.note,created_at:k.attestation.attested_at,is_attestation:!0,ritual_name:k.name,is_pending:!k.attestation.approved_at}));kn=r;const d=[...s,...c].sort((k,et)=>new Date(k.created_at)-new Date(et.created_at)),m=[n.parent_id?h.api.getIssue(n.parent_id):Promise.resolve(null),h.api.getSprints(n.project_id).catch(k=>(console.error("Failed to load sprints:",k),[]))],[u,g]=await Promise.all(m),b=o.filter(k=>k.relation_type==="blocks"&&k.direction==="outgoing"),y=o.filter(k=>k.relation_type==="blocked_by"||k.relation_type==="blocks"&&k.direction==="incoming"),x=o.filter(k=>k.relation_type==="relates_to");t&&history.pushState({issueId:e,view:h.getCurrentView()},"",`/issue/${n.identifier}`),window.currentDetailIssue=n,window.currentDetailSprints=g,document.querySelectorAll(".view").forEach(k=>k.classList.add("hidden"));const L=document.getElementById("issue-detail-view");L.classList.remove("hidden");const D=h.getCurrentView()||"my-issues",H=h.getProjects().find(k=>k.id===n.project_id),M=n.assignee_id?h.getAssigneeById(n.assignee_id):null,O=M?h.formatAssigneeName(M):null,C=n.sprint_id?g.find(k=>k.id===n.sprint_id):null,G=h.getIssues(),W=G.findIndex(k=>k.id===n.id),P=W>0?G[W-1]:null,A=W>=0&&W<G.length-1?G[W+1]:null,q=W>=0;L.querySelector("#issue-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${D}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${q?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${P?`onclick="viewIssue('${h.escapeJsString(P.id)}')"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${W+1} / ${G.length}</span>
                            <button class="issue-nav-btn" ${A?`onclick="viewIssue('${h.escapeJsString(A.id)}')"`:"disabled"} title="Next issue">
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
                            ${n.description?us(n.description):'<span class="add-description-link">Add description...</span>'}
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
                            ${b.length===0&&y.length===0&&x.length===0?`
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
                            ${x.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${x.map(k=>`
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
                                    <div class="activity-icon">${$i(k.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Ei(k)}</span>
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
                                ${O?`${h.renderAvatar(M,"avatar-small")}<span>${h.escapeHtml(O)}</span>`:'<span class="text-muted">Unassigned</span>'}
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
        `;const J=document.querySelector(".sidebar-overflow-trigger"),Y=document.querySelector(".overflow-menu-dropdown");if(J&&Y){const k=()=>{Y.classList.add("hidden"),J.setAttribute("aria-expanded","false")},et=()=>{const Q=Y.classList.toggle("hidden");J.setAttribute("aria-expanded",String(!Q))};J.addEventListener("click",et),document.addEventListener("click",Q=>{!J.contains(Q.target)&&!Y.contains(Q.target)&&k()}),Y.addEventListener("keydown",Q=>{Q.key==="Escape"&&(k(),J.focus())}),Y.querySelectorAll(".overflow-menu-item").forEach(Q=>{Q.addEventListener("click",()=>{const Ae=Q.dataset.issueId;k(),Q.dataset.action==="edit"?window.showEditIssueModal(Ae):Q.dataset.action==="delete"&&window.deleteIssue(Ae)})})}Yo(n.id),h.setupMentionAutocomplete();const ke=document.getElementById("new-comment");if(ke){const k=`chaotic_comment_draft_${n.id}`,et=localStorage.getItem(k);et&&(ke.value=et),ke.addEventListener("input",()=>{const Q=ke.value;Q?localStorage.setItem(k,Q):localStorage.removeItem(k)}),ke.addEventListener("keydown",Q=>{var Ae;Q.key==="Enter"&&(Q.metaKey||Q.ctrlKey)&&(Q.preventDefault(),(Ae=ke.closest("form"))==null||Ae.requestSubmit())})}wi=P?P.id:null,ki=A?A.id:null,ds&&document.removeEventListener("keydown",ds),ds=k=>{if(document.getElementById("issue-detail-view").classList.contains("hidden")||k.target.tagName==="INPUT"||k.target.tagName==="TEXTAREA"||k.target.tagName==="SELECT"||k.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor"))return;k.key==="ArrowLeft"&&wi?(k.preventDefault(),ae(wi)):k.key==="ArrowRight"&&ki&&(k.preventDefault(),ae(ki));const Q={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[k.key];if(Q){const Ae=document.querySelector(`.property-row[data-field="${Q}"]`);Ae&&(k.preventDefault(),Ae.click())}},document.addEventListener("keydown",ds)}catch(n){h.showToast(`Failed to load issue: ${n.message}`,"error")}}async function Iu(e,t){e.preventDefault();const n=document.getElementById("new-comment").value,s=`chaotic_comment_draft_${t}`;localStorage.removeItem(s);try{await h.api.createComment(t,n),await ae(t),h.showToast("Comment added!","success")}catch(i){n&&localStorage.setItem(s,n),h.showToast(`Failed to add comment: ${i.message}`,"error")}return!1}async function Eu(e){const t=window.currentDetailIssue||await h.api.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const s=n.querySelector(".section-header");s&&(s.style.display="none");const i=n.querySelector(".description-content");if(!i)return;i.innerHTML=`
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
    `,i.classList.remove("empty"),i.removeAttribute("onclick");const a=document.getElementById("edit-description"),o=`chaotic_description_draft_${e}`,r=localStorage.getItem(o);r&&(a.value=r),a.addEventListener("input",()=>{const l=a.value;l!==(t.description||"")?localStorage.setItem(o,l):localStorage.removeItem(o);const c=document.getElementById("edit-description-preview");c&&c.style.display!=="none"&&Zo()}),a.addEventListener("keydown",l=>{var c,d;l.key==="Enter"&&(l.metaKey||l.ctrlKey)&&(l.preventDefault(),(c=document.getElementById("save-description-edit"))==null||c.click()),l.key==="Escape"&&(l.preventDefault(),(d=document.getElementById("cancel-description-edit"))==null||d.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{localStorage.removeItem(o),s&&(s.style.display=""),i.className=`description-content markdown-body ${t.description?"":"empty"}`,t.description||i.setAttribute("onclick",`editDescription('${h.escapeJsString(t.id)}')`),i.innerHTML=t.description?us(t.description):'<span class="add-description-link">Add description...</span>'}),document.getElementById("save-description-edit").addEventListener("click",async()=>{var c;const l=(c=document.getElementById("edit-description"))==null?void 0:c.value;if(l!==void 0)try{await h.api.updateIssue(e,{description:l}),localStorage.removeItem(o),h.showToast("Description updated","success"),ae(e,!1)}catch(d){h.showToast(`Failed to update description: ${d.message}`,"error")}})}function Zo(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?us(n):'<span class="text-muted">Nothing to preview.</span>'}function _u(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?Zo():s.focus()}function Tu(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function Su(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Lu(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Cu(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return h.showToast("Please select an issue","error"),!1;try{n==="blocked_by"?await h.api.createRelation(s,t,"blocks"):await h.api.createRelation(t,s,n),h.closeModal(),h.showToast("Relation added","success"),ae(t)}catch(i){h.showToast(`Failed to add relation: ${i.message}`,"error")}return!1}async function Au(e,t){try{await h.api.deleteRelation(e,t),h.showToast("Relation removed","success"),ae(e)}catch(n){h.showToast(`Failed to remove relation: ${n.message}`,"error")}}async function Bu(){const e=document.getElementById("ritual-project-filter");e&&(await we(),e.innerHTML='<option value="">Select Project</option>'+ie().map(t=>`<option value="${_(t.id)}">${f(t.name)}</option>`).join(""))}async function Xo(){const e=document.getElementById("rituals-project-filter");if(!e)return;window._onRitualsChanged=Du,await we(),e.innerHTML='<option value="">Select a project</option>'+ie().map(n=>`<option value="${_(n.id)}">${f(n.name)}</option>`).join("");const t=vt()||bn();t&&ie().some(n=>n.id===t)?(e.value=t,Qo()):document.getElementById("rituals-content").innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>'}async function Qo(){const e=document.getElementById("rituals-project-filter").value,t=document.getElementById("rituals-content");if(!e){document.getElementById("rituals-tabs").classList.add("hidden"),t.innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>';return}Do(e),t.innerHTML='<div class="loading">Loading rituals...</div>';try{await Mt()}catch(n){t.innerHTML=`<div class="empty-state">Error loading rituals: ${f(n.message)}</div>`}}function Du(){const e=document.getElementById("rituals-content"),t=Mo(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,jt("rv-sprint-rituals-list",n,"sprint"),jt("rv-close-rituals-list",s,"close"),jt("rv-claim-rituals-list",i,"claim")}function Mu(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function ju(e,t){try{await $.approveAttestation(e,t),v("Ritual approved!","success"),await ls(),bi()}catch(n){v(n.message,"error")}}async function er(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{Pu(s,e,t)}),N()}async function Pu(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await $.completeGateRitual(t,n,s||null),v("Ritual completed!","success"),await ls();const i=Qd();i&&!i.in_limbo?(K(),v("Limbo cleared! Next sprint is now active.","success")):bi()}catch(i){v(i.message,"error")}return!1}function Ru(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" onclick="approveTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" data-ritual-name="${_(e.name)}" onclick="showCompleteTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName)">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" data-ritual-name="${_(e.name)}" data-ritual-prompt="${_(e.prompt||"")}" onclick="showAttestTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName, this.dataset.ritualPrompt)">Attest</button>`:`<button class="btn btn-small btn-secondary" data-ritual-id="${_(e.id)}" data-issue-id="${_(t)}" onclick="attestTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Attest</button>`}function Nu(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${f(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{Hu(i,e,t)}),N()}async function Hu(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return v("A note is required for this attestation.","error"),!1;try{await $.attestTicketRitual(t,n,s),v("Ritual attested!","success"),K(),await ps(n)}catch(i){v(i.message,"error")}return!1}async function Ou(e,t){try{await $.attestTicketRitual(e,t),v("Ritual attested!","success"),await ps(t)}catch(n){v(n.message,"error")}}async function qu(e,t){try{await $.approveTicketRitual(e,t),v("Ritual approved!","success"),await ps(t)}catch(n){v(n.message,"error")}}function Fu(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{Uu(s,e,t)}),N()}async function Uu(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await $.completeTicketGateRitual(t,n,s||null),v("Ritual completed!","success"),K(),await ps(n)}catch(i){v(i.message,"error")}return!1}function gs(e){if(!e)return"";try{F.setOptions({breaks:!0,gfm:!0});const n=F.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return no.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function _i(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function Gu(e,t,n,s,i,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${f(i)}</span>
                    <span class="gate-approval-issue-title">${f(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${E(t)}')">View full ticket details &rarr;</a>
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
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{zu(c,e,t,n)}),N(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function zu(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await $.completeTicketGateRitual(t,n,i||null),v(`GATE ritual "${s}" approved!`,"success"),K(),$n()}catch(a){v(`Failed to complete gate ritual: ${a.message}`,"error")}}function tr(e,t,n,s,i,a,o,r){Gu(e,t,n,s,i,a,o,r)}function Ku(e,t,n,s,i,a,o,r,l){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${f(i)}</span>
                    <span class="gate-approval-issue-title">${f(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${E(t)}')">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${f(s)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${f(o)}</strong>${r?` ${_i(r)}`:""}</div>`:""}
                ${l?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${gs(l)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{Wu(d,e,t,n)}),N(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function Wu(e,t,n,s){e.preventDefault();try{await $.approveTicketRitual(t,n),v(`Review ritual "${s}" approved!`,"success"),K(),$n()}catch(i){v(`Failed to approve review ritual: ${i.message}`,"error")}}function nr(e,t,n,s,i,a,o,r,l){Ku(e,t,n,s,i,a,o,r,l)}let Ti=[];async function $n(){if(!window.currentTeam)return;const e=document.getElementById("gate-approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=await Promise.all(ie().map(async i=>{const[a,o]=await Promise.all([$.getPendingApprovals(i.id),$.getLimboStatus(i.id)]);return{project:i,approvals:a,limbo:o}})),n=[],s=[];for(const{project:i,approvals:a,limbo:o}of t)if(n.push(...a),o&&o.in_limbo){const r=(o.pending_rituals||[]).filter(l=>{var c;return(c=l.attestation)!=null&&c.approved_at?!1:l.approval_mode==="gate"||!!l.attestation});r.length>0&&s.push({project:i,rituals:r})}Vd(n),Ti=s,sr()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${f(t.message)}</p></div>`}}}function sr(){const e=document.getElementById("gate-approvals-list");if(!e)return;const t=Wd(),n=Ti.length>0,i=!localStorage.getItem("chaotic_approvals_explainer_dismissed");if(t.length===0&&!n){i?e.innerHTML=`
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
                    ${Ti.map(({project:m,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${f(m.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(g=>{const b=g.attestation&&!g.attestation.approved_at,y=b?"⏳":"○",x=b?`<span class="gate-waiting-info">Attested by <strong>${f(g.attestation.attested_by_name||"Unknown")}</strong></span>`:g.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',L=b?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${_(g.id)}"
                                            data-project-id="${_(m.id)}">Approve</button>`:g.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${_(g.id)}"
                                                data-project-id="${_(m.id)}"
                                                data-ritual-name="${_(g.name)}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${y} ${f(g.name)}
                                                    <span class="badge badge-ritual-${_(g.approval_mode)}">${f(g.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${f(g.prompt)}</span>
                                                ${x}
                                            </div>
                                            ${L}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const o=m=>m.pending_approvals||[],r=m=>u=>{const g=o(u).filter(m);return g.length>0?{...u,_filteredApprovals:g}:null},l=t.map(r(m=>m.approval_mode==="gate"&&m.limbo_type==="claim")).filter(Boolean),c=t.map(r(m=>m.approval_mode==="gate"&&m.limbo_type==="close")).filter(Boolean),d=t.map(r(m=>m.approval_mode==="review")).filter(Boolean);l.length>0&&(a+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(xi).join("")}
                </div>
            </div>
        `),c.length>0&&(a+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${c.map(xi).join("")}
                </div>
            </div>
        `),d.length>0&&(a+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${d.map(xi).join("")}
                </div>
            </div>
        `),e.innerHTML=a,e.querySelectorAll(".gate-approve-btn").forEach(m=>{m.addEventListener("click",()=>{const u=m.dataset;tr(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-approve-btn").forEach(m=>{m.addEventListener("click",()=>{const u=m.dataset;nr(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".sprint-approve-btn").forEach(m=>{m.addEventListener("click",async()=>{m.disabled=!0;try{await $.approveAttestation(m.dataset.ritualId,m.dataset.projectId),v("Sprint ritual approved!","success"),await $n()}catch(u){m.disabled=!1,v(u.message,"error")}})}),e.querySelectorAll(".sprint-complete-btn").forEach(m=>{m.addEventListener("click",()=>{er(m.dataset.ritualId,m.dataset.projectId,m.dataset.ritualName)})})}function Vu(){localStorage.setItem("chaotic_approvals_explainer_dismissed","1"),sr()}function xi(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${f(s.requested_by_name)}</strong>${s.requested_at?` (${_i(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note">${gs(s.attestation_note)}</div>`:"",l=i?"review-approve-btn":"gate-approve-btn",c=i?"Approve":"Complete",d=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>';return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${f(s.ritual_name)} ${d}</span>
                    <span class="gate-ritual-prompt">${f(s.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                <button class="btn btn-small btn-primary ${l}"
                    data-ritual-id="${_(s.ritual_id)}"
                    data-issue-id="${_(e.issue_id)}"
                    data-ritual-name="${_(s.ritual_name)}"
                    data-ritual-prompt="${_(s.ritual_prompt)}"
                    data-issue-identifier="${_(e.identifier)}"
                    data-issue-title="${_(e.title)}"
                    data-requested-by="${_(s.requested_by_name||"")}"
                    data-requested-at="${_(s.requested_at||"")}"
                    data-attestation-note="${_(s.attestation_note||"")}">${c}</button>
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" onclick="event.preventDefault(); viewIssue('${E(e.issue_id)}')" class="gate-issue-link">
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
    `}window.completeGateFromList=tr,window.approveReviewFromList=nr;let Si=[];async function Li(){try{Si=await $.getApiKeys(),Ju()}catch(e){v(e.message,"error")}}function Ju(){const e=document.getElementById("api-keys-list");if(e){if(Si.length===0){e.innerHTML='<p class="empty-state">No API keys yet. Create one to get started.</p>';return}e.innerHTML=Si.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${f(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${f(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Xs(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Xs(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" onclick="revokeApiKey('${E(t.id)}', '${E(t.name)}')">Revoke</button>
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
        `,N()}catch(n){v(n.message,"error")}return!1}async function ar(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),v("API key copied to clipboard","success")}catch{v("Failed to copy","error")}}async function or(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await $.revokeApiKey(e),v("API key revoked","success"),await Li()}catch(n){v(n.message,"error")}}window.loadApiKeys=Li,window.showCreateApiKeyModal=ir,window.handleCreateApiKey=Yu,window.copyApiKey=ar,window.revokeApiKey=or;let fs=!1,Ve=0,lt=[],hs=[];function Zu(e){hs=e,lt=[...e]}function rr(){return fs}function Xu(){if(fs)return;fs=!0,Ve=0,lt=[...hs];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&vs()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>Qu(n.target.value)),t.addEventListener("keydown",tp),In(),requestAnimationFrame(()=>t.focus())}function vs(){fs=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function Qu(e){const t=e.toLowerCase().trim();t?lt=hs.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):lt=[...hs],Ve=0,In()}function In(){const e=document.getElementById("command-results");if(!e)return;if(lt.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};lt.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${s===Ve?"selected":""}"
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
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function ep(e){Ve=e,In()}function lr(e){const t=lt[e];t&&(vs(),t.action())}function tp(e){switch(e.key){case"ArrowDown":e.preventDefault(),Ve=Math.min(Ve+1,lt.length-1),In();break;case"ArrowUp":e.preventDefault(),Ve=Math.max(Ve-1,0),In();break;case"Enter":e.preventDefault(),lr(Ve);break;case"Escape":e.preventDefault(),vs();break}}window.selectCommand=ep,window.executeCommand=lr;let En=[],Ci=[],Je={getCurrentUser:()=>null,getCurrentTeam:()=>null,renderIssueRow:()=>"",formatActivityText:()=>"",formatActivityActor:()=>"",getActivityIcon:()=>"📝",navigateToIssueByIdentifier:()=>{},viewDocument:()=>{}};function np(e){Je={...Je,...e}}function bs(){return En}function _n(e){En=e}async function Ai(){var i,a;const e=Je.getCurrentTeam(),t=Je.getCurrentUser();if(!e||!t)return;const n=(i=document.getElementById("my-issues-status-filter"))==null?void 0:i.value,s=(a=document.getElementById("dashboard-project-filter"))==null?void 0:a.value;ip();try{const o={assignee_id:t.id,status:n||void 0,limit:1e3};let r;s?r=await $.getIssues({...o,project_id:s}):r=await $.getTeamIssues(e.id,o),En=r,Tn()}catch(o){v(o.message,"error")}}async function Rt({showLoading:e=!0}={}){const t=Je.getCurrentTeam();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{Ci=await $.getTeamActivities(t.id,0,10),sp()}catch{n&&(n.innerHTML='<div class="activity-empty">Failed to load activity</div>')}}function sp(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Ci.length){e.innerHTML='<div class="activity-empty">No recent activity. Create or update issues to see activity here.</div>';return}e.innerHTML=Ci.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" onclick="navigateToIssueByIdentifier('${E(t.issue_identifier)}'); return false;"><strong>${f(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" onclick="viewDocument('${E(t.document_id)}'); return false;"><strong>${s} ${f(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${f(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${Je.getActivityIcon(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Je.formatActivityText(t)}${n}</span>
                <span class="activity-actor">by ${f(Je.formatActivityActor(t))}</span>
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
    `).join(""))}function cr(){Ai()}function Tn(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),En.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues assigned to you</h3>
                <p>Issues assigned to you will appear here</p>
            </div>
        `;return}e.innerHTML=En.map(t=>Je.renderIssueRow(t)).join("")}}window.filterMyIssues=cr;let je=null,Ye=0,Nt=null,Ht=null,xn=null,Bi=!1;function dr(){try{return localStorage.getItem("chaotic_onboarding_complete")==="true"}catch{return!1}}function ur(){try{localStorage.setItem("chaotic_onboarding_complete","true")}catch{}}function pr(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function ap(){je||(je=document.createElement("div"),je.id="onboarding-overlay",je.className="onboarding-overlay",document.getElementById("app").appendChild(je))}function Sn(){if(!je)return;const e=Bi?gr():mr(),t=e[Ye],n=e.map((s,i)=>`<span class="onboarding-dot${i===Ye?" active":""}${i<Ye?" completed":""}"></span>`).join("");je.innerHTML=`
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
            `}]}function Di(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Mi(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Ot(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}window._onboardingNext=function(){const e=Bi?gr():mr();Ye<e.length-1&&(Ye++,Sn())},window._onboardingSkip=function(){ur(),Pi(),window.initApp&&window.initApp()},window._onboardingFinish=function(){ur(),Pi(),window.initApp&&window.initApp()},window._onboardingCreateTeam=async function(e){e.preventDefault(),Mi("onboarding-team-error"),Ot("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Nt=await api.createTeam({name:t,key:n}),Ye++,Sn()}catch(s){Di("onboarding-team-error",s.message||"Failed to create team"),Ot("onboarding-team-submit",!1)}},window._onboardingCreateProject=async function(e){e.preventDefault(),Mi("onboarding-project-error"),Ot("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Ht=await api.createProject(Nt.id,{name:t,key:n}),Ye++,Sn()}catch(s){Di("onboarding-project-error",s.message||"Failed to create project"),Ot("onboarding-project-submit",!1)}},window._onboardingCreateIssue=async function(e){e.preventDefault(),Mi("onboarding-issue-error"),Ot("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{xn=await api.createIssue(Ht.id,{title:t}),Ye++,Sn()}catch(n){Di("onboarding-issue-error",n.message||"Failed to create issue"),Ot("onboarding-issue-submit",!1)}};function ji(e=!1){Bi=e,Ye=0,Nt=null,Ht=null,xn=null,ap(),Sn()}function Pi(){je&&(je.remove(),je=null)}function Ri(){try{localStorage.removeItem("chaotic_onboarding_complete")}catch{}ji(!0)}window.showOnboarding=ji,window.hideOnboarding=Pi,window.resetOnboarding=Ri,window.hasCompletedOnboarding=dr;let Ln=[];function op(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function rp(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function lp(e,t){const n=e().map(op),s=t().map(rp);Ln=[...n,...s]}function ys(e){return e&&Ln.find(t=>t.id===e)||null}function Cn(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Ni(e,t=!1){const n=f(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${f(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function ws(){const e=Ln.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));Ln.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,l)=>r.name.localeCompare(l.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=Ln.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function cp(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;ws().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${Ni(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}const fr=["backlog","todo","in_progress","in_review","done","canceled"],hr=["no_priority","urgent","high","medium","low"],dp=["task","bug","feature","chore","docs","tech_debt","epic"];let Pe=[],vr=Promise.resolve(),w={api:null,getIssues:()=>[],setIssues:()=>{},getMyIssues:()=>[],setMyIssues:()=>{},getCurrentDetailIssue:()=>null,setCurrentDetailIssue:()=>{},getLabels:()=>[],setLabels:()=>{},getCurrentTeam:()=>null,getCurrentDetailSprints:()=>[],closeAllDropdowns:()=>{},registerDropdownClickOutside:()=>{},setDropdownKeyHandler:()=>{},showToast:()=>{},getStatusIcon:()=>"",getPriorityIcon:()=>"",formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",formatEstimate:e=>e||"None",formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatAssigneeOptionLabel:e=>(e==null?void 0:e.name)||"",getAssigneeOptionList:()=>[],getAssigneeById:()=>null,getEstimateOptions:()=>[],renderAvatar:()=>"",renderIssueRow:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888",updateSprintCacheForProject:()=>{},updateSprintBudgetBar:()=>{}};function up(e){w={...w,...e}}function br(){return Pe}function yr(e){Pe=e}async function wr(e,t,n){var d,m;e.preventDefault(),w.closeAllDropdowns();const i=e.currentTarget.getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown",t==="status")a.innerHTML=`
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
            ${b.map((y,x)=>`
                <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'estimate', ${y.value})">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${y.label}</span>
                    ${x<9?`<span class="dropdown-shortcut">${x}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const u=w.getIssues(),g=w.getMyIssues(),b=w.getCurrentDetailIssue(),y=u.find(P=>P.id===n)||g.find(P=>P.id===n)||b,x=new Set(((y==null?void 0:y.labels)||[]).map(P=>P.id));a.innerHTML='<div class="dropdown-header">Loading labels...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const L=a.getBoundingClientRect();let D=i.bottom+4,H=i.left;H+L.width>window.innerWidth-8&&(H=i.right-L.width),D+L.height>window.innerHeight-8&&(D=i.top-L.height-4),a.style.top=`${D}px`,a.style.left=`${Math.max(8,H)}px`,w.registerDropdownClickOutside(a,{multiSelect:!0});let M=[];const O=w.getCurrentTeam();if(O)try{M=await w.api.getLabels(O.id)}catch(P){console.error("Failed to load labels:",P)}if(!a.parentNode)return;Ir(a,n,M,x);const C=a.getBoundingClientRect();let G=i.bottom+4,W=i.left;W+C.width>window.innerWidth-8&&(W=i.right-C.width),G+C.height>window.innerHeight-8&&(G=i.top-C.height-4),a.style.top=`${G}px`,a.style.left=`${Math.max(8,W)}px`,a.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const u=w.getIssues(),g=w.getMyIssues(),b=w.getCurrentDetailIssue(),y=u.find(A=>A.id===n)||g.find(A=>A.id===n)||b,x=(y==null?void 0:y.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);a.innerHTML='<div class="dropdown-header">Loading sprints...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const L=a.getBoundingClientRect();let D=i.bottom+4,H=i.left;H+L.width>window.innerWidth-8&&(H=i.right-L.width),D+L.height>window.innerHeight-8&&(D=i.top-L.height-4),a.style.top=`${D}px`,a.style.left=`${Math.max(8,H)}px`,w.registerDropdownClickOutside(a);let M=[];if(x)try{M=await w.api.getSprints(x),w.updateSprintCacheForProject(x,M)}catch(A){console.error("Failed to load sprints:",A)}if(!a.parentNode)return;const O=M.filter(A=>A.status!=="completed"||A.id===(y==null?void 0:y.sprint_id));a.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'sprint_id', null)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${O.map((A,q)=>`
                <button class="dropdown-option" onclick="updateIssueField('${w.escapeJsString(n)}', 'sprint_id', '${w.escapeJsString(A.id)}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${w.escapeHtml(A.name)}${A.status==="active"?" (Active)":""}</span>
                    ${q<9?`<span class="dropdown-shortcut">${q+1}</span>`:""}
                </button>
            `).join("")}
        `;const C=a.getBoundingClientRect();let G=i.bottom+4,W=i.left;W+C.width>window.innerWidth-8&&(W=i.right-C.width),G+C.height>window.innerHeight-8&&(G=i.top-C.height-4),a.style.top=`${G}px`,a.style.left=`${Math.max(8,W)}px`,a.classList.remove("dropdown-positioning");const P=A=>{const q=A.key;if(q==="Escape"){w.closeAllDropdowns(),document.removeEventListener("keydown",P),w.setDropdownKeyHandler(null);return}const J=parseInt(q);if(isNaN(J))return;const Y=a.querySelectorAll(".dropdown-option");let ke=!1;J===0?(An(n,"sprint_id",null),ke=!0):J>=1&&J<Y.length&&(Y[J].click(),ke=!0),ke&&(document.removeEventListener("keydown",P),w.setDropdownKeyHandler(null))};w.setDropdownKeyHandler(P),document.addEventListener("keydown",P);return}a.classList.add("dropdown-positioning"),document.body.appendChild(a);const o=a.getBoundingClientRect();let r=i.bottom+4,l=i.left;l+o.width>window.innerWidth-8&&(l=i.right-o.width),r+o.height>window.innerHeight-8&&(r=i.top-o.height-4),a.style.top=`${r}px`,a.style.left=`${Math.max(8,l)}px`,a.classList.remove("dropdown-positioning");const c=u=>{const g=u.key;if(g==="Escape"){w.closeAllDropdowns(),document.removeEventListener("keydown",c);return}const b=parseInt(g);if(isNaN(b))return;let y=!1;if(t==="status"&&b>=1&&b<=6)An(n,"status",fr[b-1]),y=!0;else if(t==="priority"&&b>=0&&b<=4)An(n,"priority",hr[b]),y=!0;else if(t==="estimate"){const x=w.getCurrentDetailIssue(),L=w.getEstimateOptions(x==null?void 0:x.project_id);b>=0&&b<L.length&&(An(n,"estimate",L[b].value),y=!0)}y&&(document.removeEventListener("keydown",c),w.setDropdownKeyHandler(null))};w.setDropdownKeyHandler(c),document.addEventListener("keydown",c),w.registerDropdownClickOutside(a)}function kr(e,t,n){e.stopPropagation(),wr(e,t,n)}function pp(e,t,n){vr=vr.then(()=>$r(e,t,n))}async function $r(e,t,n){const s=w.getIssues(),i=w.getMyIssues(),a=w.getCurrentDetailIssue(),o=s.find(d=>d.id===e)||i.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const m=(await w.api.updateIssue(e,{label_ids:c})).labels||[],u=s.findIndex(x=>x.id===e);u!==-1&&(s[u].labels=m,w.setIssues([...s]));const g=i.findIndex(x=>x.id===e);g!==-1&&(i[g].labels=m,w.setMyIssues([...i])),(a==null?void 0:a.id)===e&&w.setCurrentDetailIssue({...a,labels:m});const b=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(b&&b.parentNode){const x=s.find(L=>L.id===e)||i.find(L=>L.id===e);x&&(b.outerHTML=w.renderIssueRow(x))}const y=document.querySelector(".property-labels-btn");y&&(y.innerHTML=m.length>0?m.map(x=>`
                    <span class="issue-label" style="background: ${w.sanitizeColor(x.color)}20; color: ${w.sanitizeColor(x.color)}">${w.escapeHtml(x.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch{if(w.showToast("Failed to update labels","error"),n){const d=l>=0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}}}function Ir(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
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
    `}function mp(e,t){e.key==="Enter"&&(e.preventDefault(),Er(t))}async function Er(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=w.getCurrentTeam();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await w.api.createLabel(s.id,{name:i}),o=await w.api.getLabels(s.id);w.setLabels(o),a!=null&&a.id&&await $r(e,a.id,null);const r=w.getIssues(),l=w.getMyIssues(),c=w.getCurrentDetailIssue(),d=r.find(u=>u.id===e)||l.find(u=>u.id===e)||c,m=new Set(((d==null?void 0:d.labels)||[]).map(u=>u.id));t&&Ir(t,e,o,m),n.value=""}catch(a){w.showToast(a.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}function ks(){const e=document.getElementById("create-issue-labels-label");e&&(Pe.length===0?e.textContent="Labels":e.textContent=`Labels (${Pe.length})`)}function Hi(e){const t=w.getLabels();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleCreateIssueLabelKey(event)">
            <button class="btn btn-small" onclick="createLabelForCreateIssue()">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=Pe.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" onclick="event.stopPropagation(); toggleCreateIssueLabelSelection('${w.escapeJsString(n.id)}')">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${w.sanitizeColor(n.color)}20; color: ${w.sanitizeColor(n.color)}">${w.escapeHtml(n.name)}</span>
                </button>
            `}).join("")}
    `}function gp(e){const t=Pe.indexOf(e);t>=0?Pe.splice(t,1):Pe.push(e),ks();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Hi(n)}function fp(e){e.key==="Enter"&&(e.preventDefault(),_r())}async function _r(){const e=w.getCurrentTeam();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await w.api.createLabel(e.id,{name:s}),a=await w.api.getLabels(e.id);w.setLabels(a),i!=null&&i.id&&!Pe.includes(i.id)&&Pe.push(i.id),ks(),t&&Hi(t),n.value=""}catch(i){w.showToast(i.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}async function An(e,t,n){var i;w.closeAllDropdowns();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const a={};a[t]=n;const o=await w.api.updateIssue(e,a);if(!o||!o.id)throw new Error("Invalid response from server");const r=w.getIssues(),l=r.findIndex(u=>u.id===e);l!==-1&&(r[l]=o,w.setIssues([...r]));const c=w.getMyIssues(),d=c.findIndex(u=>u.id===e);d!==-1&&(c[d]=o,w.setMyIssues([...c]));const m=w.getCurrentDetailIssue();if((m==null?void 0:m.id)===e&&w.setCurrentDetailIssue(o),s&&s.parentNode){const u=r.find(g=>g.id===e)||c.find(g=>g.id===e)||o;if(u){s.outerHTML=w.renderIssueRow(u);const g=document.querySelector(`.issue-row[data-issue-id="${e}"]`);g&&(g.classList.add("updated"),setTimeout(()=>g.classList.remove("updated"),500))}}if(w.showToast("Issue updated","success"),t==="status"){const u=(i=document.getElementById("project-filter"))==null?void 0:i.value;if(u)try{const b=(await w.api.getSprints(u)).find(y=>y.status==="active");w.updateSprintBudgetBar(b||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const u=document.getElementById("issue-detail-view");u&&!u.classList.contains("hidden")&&hp(t,o)}}catch(a){w.showToast(a.message||"Failed to update issue","error"),s&&s.classList.remove("updating")}}function hp(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".issue-detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const l of a){const c=l.querySelector(".property-label");if(c&&c.textContent.toLowerCase()===i.toLowerCase()){o=l;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${w.getStatusIcon(t.status)}
            <span>${w.formatStatus(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${w.getPriorityIcon(t.priority)}
            <span>${w.formatPriority(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${w.formatIssueType(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const l=t.assignee_id?w.getAssigneeById(t.assignee_id):null,c=l?w.formatAssigneeName(l):null;r.innerHTML=c?`${w.renderAvatar(l,"avatar-small")}<span>${w.escapeHtml(c)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const l=w.getCurrentDetailSprints(),c=t.sprint_id&&l?l.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${c?w.escapeHtml(c.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${w.formatEstimate(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}let bt={};function vp(e){bt=e}const Tr=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Oi(e=null){var u;const{getProjects:t,escapeHtml:n,getStatusIcon:s,getPriorityIcon:i,showModal:a}=bt,o=e||((u=document.getElementById("project-filter"))==null?void 0:u.value);yr([]);const r=t().map(g=>`
        <option value="${g.id}" ${g.id===o?"selected":""}>${n(g.name)}</option>
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
                            ${Tr.map(g=>`<option value="${g.id}">${g.label}</option>`).join("")}
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
    `,a(),ks();const l=document.getElementById("create-issue-title"),c=document.getElementById("create-issue-description"),d=localStorage.getItem("chaotic_create_issue_title"),m=localStorage.getItem("chaotic_create_issue_description");d&&(l.value=d),m&&(c.value=m),l.addEventListener("input",()=>{const g=l.value;g?localStorage.setItem("chaotic_create_issue_title",g):localStorage.removeItem("chaotic_create_issue_title")}),c.addEventListener("input",()=>{const g=c.value;g?localStorage.setItem("chaotic_create_issue_description",g):localStorage.removeItem("chaotic_create_issue_description")}),l.focus()}function bp(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function yp(e){const t=Tr.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function wp(e,t){const{getProjects:n,escapeHtml:s,escapeJsString:i,getStatusIcon:a,getPriorityIcon:o,showModal:r}=bt,l=n().find(c=>c.id===t);yr([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${l?s(l.name):"Project"}</span>
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
    `,r(),ks(),document.getElementById("create-issue-title").focus()}async function kp(e,t){const{api:n,showToast:s,closeModal:i,viewIssue:a}=bt,o=document.getElementById("create-issue-title").value.trim(),r=document.getElementById("create-issue-description").value.trim(),l=document.getElementById("create-issue-status").value,c=document.getElementById("create-issue-priority").value,d=document.getElementById("create-issue-type").value||"task",m=document.getElementById("create-issue-assignee").value||null,u=document.getElementById("create-issue-estimate").value,g=u?parseInt(u):null;if(!o){s("Please enter a title","error");return}try{const b=await n.createIssue(t,{title:o,description:r||null,status:l,priority:c,issue_type:d,assignee_id:m,estimate:g,label_ids:br(),parent_id:e});i(),s(`Created sub-issue ${b.identifier}`,"success"),a(e)}catch(b){s(`Failed to create sub-issue: ${b.message}`,"error")}}async function $p(e,t){var G,W;const{api:n,closeAllDropdowns:s,registerDropdownClickOutside:i,getLabels:a,formatStatus:o,formatPriority:r,formatIssueType:l,getStatusIcon:c,getPriorityIcon:d,formatAssigneeName:m,formatAssigneeOptionLabel:u,getAssigneeOptionList:g,getEstimateOptions:b,renderAvatar:y,escapeHtml:x,escapeJsString:L,getCurrentTeam:D,setLabels:H}=bt;s();const O=t.currentTarget.getBoundingClientRect(),C=document.createElement("div");if(C.className="inline-dropdown dropdown-positioning",C.style.top=`${O.top-8}px`,C.style.left=`${O.left}px`,C.style.transform="translateY(-100%)",C.style.animation="none",e==="status"){const P=document.getElementById("create-issue-status").value;C.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${["backlog","todo","in_progress","in_review","done"].map(A=>`
                <button class="dropdown-option ${A===P?"selected":""}" onclick="setCreateIssueField('status', '${A}', '${o(A)}')">
                    ${c(A)}
                    <span>${o(A)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const P=document.getElementById("create-issue-priority").value;C.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${["no_priority","urgent","high","medium","low"].map(A=>`
                <button class="dropdown-option ${A===P?"selected":""}" onclick="setCreateIssueField('priority', '${A}', '${r(A)}')">
                    ${d(A)}
                    <span>${r(A)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const P=document.getElementById("create-issue-type").value;C.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(A=>`
                <button class="dropdown-option ${A===P?"selected":""}" onclick="setCreateIssueField('type', '${A}', '${l(A)}')">
                    <span class="issue-type-badge type-${A}">${l(A)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!D())C.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let P=a();if(P.length===0)try{P=await n.getLabels(D().id),H(P)}catch(A){console.error("Failed to load labels:",A)}Hi(C),document.body.appendChild(C),requestAnimationFrame(()=>{requestAnimationFrame(()=>{C.classList.remove("dropdown-positioning")})}),i(C,{multiSelect:!0});return}else if(e==="assignee"){const P=document.getElementById("create-issue-assignee").value,A=g();C.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${P?"":"selected"}" onclick="setCreateIssueField('assignee', '', 'Assignee')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${A.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:A.map(({assignee:q,indent:J})=>{const Y=m(q)||"User";return`
                <button class="dropdown-option ${q.id===P?"selected":""}" onclick="setCreateIssueField('assignee', '${L(q.id)}', '${L(Y)}')">
                    ${y(q,"avatar-small")}
                    <span>${u(q,J)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const P=document.getElementById("create-issue-estimate").value,A=(G=document.getElementById("create-issue-project"))==null?void 0:G.value,q=b(A);C.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${q.map(J=>{const Y=J.value===null?"":String(J.value);return`
                <button class="dropdown-option ${Y===P?"selected":""}" onclick="setCreateIssueField('estimate', '${Y}', '${L(J.value?J.label:"Estimate")}')">
                    <span>${x(J.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const P=document.getElementById("create-issue-sprint").value,A=(W=document.getElementById("create-issue-project"))==null?void 0:W.value;if(!A)C.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const J=(await n.getSprints(A)).filter(Y=>Y.status!=="completed");C.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${P?"":"selected"}" onclick="setCreateIssueField('sprint', '', 'Sprint')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${J.map(Y=>`
                        <button class="dropdown-option ${Y.id===P?"selected":""}" onclick="setCreateIssueField('sprint', '${L(Y.id)}', '${L(Y.name)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${x(Y.name)}${Y.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{C.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(C),requestAnimationFrame(()=>{requestAnimationFrame(()=>{C.classList.remove("dropdown-positioning")})}),i(C)}function Ip(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Ep(e,t,n){const{getStatusIcon:s,getPriorityIcon:i,formatIssueType:a,closeAllDropdowns:o,escapeHtml:r}=bt;document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n;const l=r(n);if(e==="status"){const c=document.querySelector(".toolbar-btn:first-child");c.innerHTML=`${s(t)}<span id="create-issue-status-label">${l}</span>`}else if(e==="priority"){const c=document.querySelectorAll(".toolbar-btn")[1];c.innerHTML=`${i(t)}<span id="create-issue-priority-label">${l}</span>`}else if(e==="type"){const c=document.getElementById("create-issue-type-btn");c&&(c.innerHTML=`<span class="issue-type-badge type-${t}">${a(t)}</span><span id="create-issue-type-label">${l}</span>`)}o()}async function xr({keepOpen:e=!1}={}){var C,G;const{api:t,showToast:n,closeModal:s,viewIssue:i,getCurrentView:a,loadIssues:o,loadMyIssues:r}=bt,l=document.getElementById("create-issue-project").value,c=document.getElementById("create-issue-title").value.trim(),d=document.getElementById("create-issue-description").value.trim(),m=document.getElementById("create-issue-status").value,u=document.getElementById("create-issue-priority").value,g=document.getElementById("create-issue-type").value||"task",b=document.getElementById("create-issue-assignee").value||null,y=document.getElementById("create-issue-estimate").value,x=y?parseInt(y):null,L=((C=document.getElementById("create-issue-sprint"))==null?void 0:C.value)||null,D=(G=document.getElementById("create-issue-due-date"))==null?void 0:G.value,H=D?new Date(`${D}T00:00:00Z`).toISOString():null;if(!l){n("Please select a project","error");return}if(!c){n("Please enter a title","error");return}const M=document.getElementById("btn-create-issue"),O=document.getElementById("btn-create-and-new");M&&(M.disabled=!0),O&&(O.disabled=!0);try{const W=await t.createIssue(l,{title:c,description:d||null,status:m,priority:u,issue_type:g,assignee_id:b,estimate:x,sprint_id:L,label_ids:br(),due_date:H});n(`Created ${W.identifier}`,"success"),localStorage.removeItem("chaotic_create_issue_title"),localStorage.removeItem("chaotic_create_issue_description"),a()==="issues"?o():a()==="my-issues"&&r(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(s(),i(W.id))}catch(W){n(`Failed to create issue: ${W.message}`,"error")}finally{M&&(M.disabled=!1),O&&(O.disabled=!1)}}async function _p(){await xr({keepOpen:!1})}async function Tp(){await xr({keepOpen:!0})}let $s={};function xp(e){$s=e}async function Sr(e){const{api:t,showModal:n,showToast:s,escapeHtml:i,escapeAttr:a,escapeJsString:o,getEstimateOptions:r}=$s;try{const l=await t.getIssue(e),c=await t.getSprints(l.project_id),m=r(l.project_id).map(u=>`
            <option value="${u.value===null?"":u.value}" ${l.estimate===u.value?"selected":""}>${i(u.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form onsubmit="return handleUpdateIssue(event, '${o(e)}')">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${a(l.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <textarea id="edit-issue-description">${i(l.description||"")}</textarea>
                </div>
                <div class="form-group">
                    <label for="edit-issue-status">Status</label>
                    <select id="edit-issue-status">
                        <option value="backlog" ${l.status==="backlog"?"selected":""}>Backlog</option>
                        <option value="todo" ${l.status==="todo"?"selected":""}>Todo</option>
                        <option value="in_progress" ${l.status==="in_progress"?"selected":""}>In Progress</option>
                        <option value="in_review" ${l.status==="in_review"?"selected":""}>In Review</option>
                        <option value="done" ${l.status==="done"?"selected":""}>Done</option>
                        <option value="canceled" ${l.status==="canceled"?"selected":""}>Canceled</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-priority">Priority</label>
                    <select id="edit-issue-priority">
                        <option value="no_priority" ${l.priority==="no_priority"?"selected":""}>No Priority</option>
                        <option value="low" ${l.priority==="low"?"selected":""}>Low</option>
                        <option value="medium" ${l.priority==="medium"?"selected":""}>Medium</option>
                        <option value="high" ${l.priority==="high"?"selected":""}>High</option>
                        <option value="urgent" ${l.priority==="urgent"?"selected":""}>Urgent</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-type">Type</label>
                    <select id="edit-issue-type">
                        <option value="task" ${l.issue_type==="task"?"selected":""}>Task</option>
                        <option value="bug" ${l.issue_type==="bug"?"selected":""}>Bug</option>
                        <option value="feature" ${l.issue_type==="feature"?"selected":""}>Feature</option>
                        <option value="chore" ${l.issue_type==="chore"?"selected":""}>Chore</option>
                        <option value="docs" ${l.issue_type==="docs"?"selected":""}>Docs</option>
                        <option value="tech_debt" ${l.issue_type==="tech_debt"?"selected":""}>Tech Debt</option>
                        <option value="epic" ${l.issue_type==="epic"?"selected":""}>Epic</option>
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
                        ${c.filter(u=>u.status!=="completed").map(u=>`
                            <option value="${u.id}" ${l.sprint_id===u.id?"selected":""}>${i(u.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,n()}catch(l){s(`Failed to load issue: ${l.message}`,"error")}}async function Sp(e,t){const{api:n,showToast:s,closeModal:i,viewIssue:a}=$s;e.preventDefault();try{const o=document.getElementById("edit-issue-title"),r=document.getElementById("edit-issue-description"),l=document.getElementById("edit-issue-status"),c=document.getElementById("edit-issue-priority"),d=document.getElementById("edit-issue-type"),m=document.getElementById("edit-issue-estimate"),u=document.getElementById("edit-issue-sprint");if(!o||!l||!c||!d)throw new Error("Required form fields not found");const g={title:o.value,description:r?r.value:"",status:l.value,priority:c.value,issue_type:d.value,estimate:m&&m.value?parseInt(m.value):null,sprint_id:u&&u.value?u.value:null};await n.updateIssue(t,g),i(),await a(t),s("Issue updated!","success")}catch(o){s(`Failed to update issue: ${o.message}`,"error")}}async function Lp(e){const{api:t,showToast:n,loadIssues:s,loadProjects:i,navigateTo:a}=$s;if(confirm("Are you sure you want to delete this issue?"))try{await t.deleteIssue(e),await s(),await i(),a("issues"),n("Issue deleted!","success")}catch(o){n(`Failed to delete issue: ${o.message}`,"error")}}const Lr=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let ct=[],qi=null,oe={api:null,showToast:()=>{},getProjects:()=>[],getProjectFromUrl:()=>null,setGlobalProjectSelection:()=>{},updateUrlWithProject:()=>{},escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,formatPriority:e=>e};function Cp(e){oe={...oe,...e}}function Fi(){const e=document.getElementById("board-project-filter");if(!e)return;const t=oe.getProjects();if(e.innerHTML='<option value="">Select Project</option>'+t.map(n=>`<option value="${n.id}">${oe.escapeHtml(n.name)}</option>`).join(""),!e.value){const n=oe.getProjectFromUrl();n&&t.some(s=>s.id===n)&&(e.value=n)}if(e.value)Ui(e.value);else{const n=document.getElementById("kanban-board");n&&(n.innerHTML=`
                <div class="empty-state" style="width: 100%; padding: 3rem;">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its board</p>
                </div>
            `)}}function Ap(){var t;const e=(t=document.getElementById("board-project-filter"))==null?void 0:t.value;e&&(oe.setGlobalProjectSelection(e),oe.updateUrlWithProject(e)),Ui(e)}async function Ui(e){var s;const t=e||((s=document.getElementById("board-project-filter"))==null?void 0:s.value);if(!t){Fi();return}const n=document.getElementById("kanban-board");n&&(n.innerHTML='<div class="loading-spinner" style="margin: 2rem auto;"></div>');try{ct=await oe.api.getIssues({project_id:t}),dt()}catch(i){oe.showToast(`Failed to load board: ${i.message}`,"error")}}function dt(){const e=document.getElementById("kanban-board");e&&(e.innerHTML=Lr.map(t=>{const n=ct.filter(s=>s.status===t.key);return`
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
                        <div class="kanban-card" draggable="true" data-id="${oe.escapeAttr(s.id)}"
                             ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)"
                             ondragover="handleCardDragOver(event)" ondragleave="handleCardDragLeave(event)" ondrop="handleCardDrop(event)"
                             onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${oe.escapeJsString(s.id)}'); } else { window.open('/issue/${encodeURIComponent(s.identifier)}', '_blank'); }">
                            <div class="kanban-card-title">${oe.escapeHtml(s.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${s.identifier}</span>
                                <span class="badge badge-priority-${s.priority}" style="font-size: 10px;">${oe.formatPriority(s.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""))}function Bp(e){e.dataTransfer.setData("text/plain",e.target.dataset.id),qi=e.target.dataset.id,e.target.classList.add("dragging")}function Dp(e){e.target.classList.remove("dragging"),qi=null}function Mp(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function jp(e){e.currentTarget.classList.remove("drag-over")}function Pp(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function Rp(e){e.currentTarget.classList.remove("drag-over")}async function Np(e){e.preventDefault(),e.currentTarget.classList.remove("drag-over");const t=e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.status,s=ct.find(a=>a.id===t);if(!s)return;const i=s.status;if(s.status=n,Cr(n,t),dt(),i!==n)try{await oe.api.updateIssue(t,{status:n}),oe.showToast("Status updated","success")}catch(a){s.status=i,dt(),oe.showToast(`Failed to update status: ${a.message}`,"error")}}async function Hp(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.classList.remove("drag-over");const t=qi||e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.id;if(!t||!n||t===n)return;const s=e.currentTarget.closest(".kanban-column"),i=s==null?void 0:s.dataset.status;if(!i)return;const a=ct.find(r=>r.id===t);if(!a)return;const o=a.status;if(a.status=i,Cr(i,t,n),dt(),o!==i)try{await oe.api.updateIssue(t,{status:i}),oe.showToast("Status updated","success")}catch(r){a.status=o,dt(),oe.showToast(`Failed to update status: ${r.message}`,"error")}}function Cr(e,t,n=null){const s=ct.filter(o=>o.status===e&&o.id!==t),i=ct.find(o=>o.id===t);if(!i)return;if(n){const o=s.findIndex(r=>r.id===n);o>=0?s.splice(o,0,i):s.push(i)}else s.push(i);const a=[];Lr.forEach(o=>{o.key===e?a.push(...s):a.push(...ct.filter(r=>r.status===o.key))}),ct=a}const Ar=["backlog","todo","in_progress","in_review","done","canceled"],Br=["urgent","high","medium","low","no_priority"],Dr=["task","bug","feature","chore","docs","tech_debt","epic"];let j={getIssues:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatEstimate:()=>"",getSprintCache:()=>({}),formatStatus:e=>e,formatPriority:e=>e,formatIssueType:e=>e||"task",escapeHtml:e=>e||"",escapeAttr:e=>e||"",escapeJsString:e=>e||"",sanitizeColor:e=>e||"#888",renderAvatar:()=>"",getAssigneeOptionList:()=>[],getGroupByValue:()=>""};function Op(e){j={...j,...e}}function ut(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function qt(e){const t=ut(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function Ze(){const e=document.getElementById("issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=j.getIssues();if(t.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues found</h3>
                <p>Create your first issue to get started</p>
            </div>
        `;return}const n=j.getGroupByValue();n==="status"?qp(e,t):n==="priority"?Fp(e,t):n==="type"?Up(e,t):n==="assignee"?Gp(e,t):n==="sprint"?zp(e,t):e.innerHTML=qt(t)+t.map(s=>Re(s)).join("")}function qp(e,t){const n={};Ar.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s=qt(t);Ar.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ut(i)}</span>
                    <span class="group-title">${j.formatStatus(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${ut(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Re(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Fp(e,t){const n={};Br.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s=qt(t);Br.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ft(i)}</span>
                    <span class="group-title">${j.formatPriority(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${ut(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Re(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Up(e,t){const n={};Dr.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s=qt(t);Dr.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${i}">${j.formatIssueType(i)}</span></span>
                    <span class="group-title">${j.formatIssueType(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${ut(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Re(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Gp(e,t){const n={},s="__unassigned__";n[s]=[];const i=j.getAssigneeOptionList();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a=qt(t);n[s].length>0&&(a+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" onclick="toggleGroup('${s}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[s].length}</span>
                    <span class="group-points">${ut(n[s])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[s].map(o=>Re(o)).join("")}
                </div>
            </div>
        `),i.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=j.formatAssigneeName(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${o.id}">
                <div class="issue-group-header" onclick="toggleGroup('${j.escapeJsString(o.id)}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${j.renderAvatar(o,"avatar-small")}</span>
                    <span class="group-title">${j.escapeHtml(l)}${j.escapeHtml(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${ut(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(d=>Re(d)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function zp(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(l=>{l.sprint_id?(s[l.sprint_id]||(s[l.sprint_id]=[],i.push(l.sprint_id)),s[l.sprint_id].push(l)):s[n].push(l)});const a={active:0,planned:1,completed:2},o=j.getSprintCache();i.sort((l,c)=>{const d=o[l],m=o[c],u=d?a[d.status]??3:3,g=m?a[m.status]??3:3;return u-g});let r=qt(t);i.forEach(l=>{const c=s[l];if(c.length===0)return;const d=o[l],m=d?d.name:l,u=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" onclick="toggleGroup('${g}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${j.escapeHtml(m)}${u}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${ut(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${c.map(b=>Re(b)).join("")}
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
                    <span class="group-points">${ut(s[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${s[n].map(l=>Re(l)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function Kp(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Re(e){const t=e.assignee_id?j.getAssigneeById(e.assignee_id):null,n=t?j.formatAssigneeName(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?j.formatEstimate(e.estimate,e.project_id):"",a=e.sprint_id?j.getSprintCache()[e.sprint_id]:null,o=a?a.name:null;return`
        <div class="issue-row" data-issue-id="${j.escapeAttr(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${j.escapeAttr(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'priority', '${j.escapeJsString(e.id)}')" title="Priority: ${j.formatPriority(e.priority)}">
                    ${Ft(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'status', '${j.escapeJsString(e.id)}')" title="Status: ${j.formatStatus(e.status)}">
                    ${Ut(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${j.formatIssueType(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${j.escapeJsString(e.id)}'); }">${j.escapeHtml(e.title)}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(r=>`
                            <span class="issue-label" style="background: ${j.sanitizeColor(r.color)}20; color: ${j.sanitizeColor(r.color)}">${j.escapeHtml(r.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'sprint', '${j.escapeJsString(e.id)}')" title="Sprint: ${o?j.escapeHtml(o):"None"}">
                    ${o?`<span class="sprint-badge">${j.escapeHtml(o)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'estimate', '${j.escapeJsString(e.id)}')" title="Estimate: ${i||"None"}">
                    ${i?`<span class="estimate-badge">${i}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'assignee', '${j.escapeJsString(e.id)}')" title="${j.escapeAttr(n||"Unassigned")}">
                    ${n?j.renderAvatar(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function Ft(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Ut(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}function Wp(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Mr)},0))}function Mr(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Mr))}function yt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function wt(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function kt(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Gi(){const e=yt(),n=document.getElementById("status-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=it(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`,Xe(),Ie(),Ee()}function zi(){document.getElementById("status-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),Gi()}function Ki(){const e=wt(),n=document.getElementById("priority-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Ue(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`,Xe(),Ie(),Ee()}function Wi(){document.getElementById("priority-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),Ki()}function Vi(){var s,i;const e=kt(),t=document.getElementById("label-filter-dropdown"),n=t.querySelector(".multi-select-label");if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`;Xe(),Ie(),Ee()}function Ji(){document.getElementById("label-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),Vi()}function jr(){var s,i;const e=kt(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}async function Vp(){const e=document.getElementById("label-filter-dropdown");if(!e||!window.currentTeam)return;const t=e.querySelector(".multi-select-options");try{const n=await api.getLabels(window.currentTeam.id);t.innerHTML="",n.length===0?t.innerHTML='<div class="multi-select-empty">No labels available</div>':n.forEach(i=>{const a=document.createElement("label");a.className="multi-select-option",a.innerHTML=`
                    <input type="checkbox" value="${i.id}" onchange="updateLabelFilter()">
                    <span class="label-badge" style="background: ${ye(i.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                        <span class="label-name">${f(i.name)}</span>
                    </span>
                `,t.appendChild(a)});const s=document.createElement("div");s.className="multi-select-actions",s.innerHTML='<button type="button" class="btn btn-small" onclick="clearLabelFilter()">Clear</button>',t.appendChild(s)}catch(n){console.error("Failed to load labels for filter:",n)}}function Pr(){var u,g,b,y,x,L;const e=new URLSearchParams,t=yt(),n=wt(),s=kt(),i=(u=document.getElementById("assignee-filter"))==null?void 0:u.value,a=(g=document.getElementById("project-filter"))==null?void 0:g.value,o=(b=document.getElementById("sprint-filter"))==null?void 0:b.value,r=(y=document.getElementById("issue-type-filter"))==null?void 0:y.value,l=(x=document.getElementById("group-by-select"))==null?void 0:x.value;t.forEach(D=>e.append("status",D)),n.forEach(D=>e.append("priority",D)),s.forEach(D=>e.append("label",D)),i&&e.set("assignee",i),a&&e.set("project",a),o&&e.set("sprint",o),r&&e.set("issue_type",r),l&&e.set("groupBy",l);const c=e.toString(),d=c?`/issues?${c}`:"/issues";history.replaceState({view:"issues"},"",d);const m=(L=window.currentTeam)==null?void 0:L.id;m&&(c?localStorage.setItem(`chaotic_issues_filters_${m}`,c):localStorage.removeItem(`chaotic_issues_filters_${m}`))}function Jp(){var c;let e=new URLSearchParams(window.location.search);if(e.toString()===""){const d=(c=window.currentTeam)==null?void 0:c.id,m=d?localStorage.getItem(`chaotic_issues_filters_${d}`):null;if(m){e=new URLSearchParams(m);const u=`/issues?${m}`;history.replaceState({view:"issues"},"",u)}}const t=e.getAll("status");if(t.length>0){const d=document.getElementById("status-filter-dropdown");d&&(d.querySelectorAll('input[type="checkbox"]').forEach(u=>{u.checked=t.includes(u.value)}),Yp())}const n=e.getAll("priority");if(n.length>0){const d=document.getElementById("priority-filter-dropdown");d&&(d.querySelectorAll('input[type="checkbox"]').forEach(u=>{u.checked=n.includes(u.value)}),Zp())}const s=e.get("assignee");if(s){const d=document.getElementById("assignee-filter");d&&(d.value=s)}const i=e.get("project");if(i){const d=document.getElementById("project-filter");d&&(d.value=i)}const a=e.get("sprint");if(a){const d=document.getElementById("sprint-filter");d&&(d.value=a)}const o=e.get("issue_type");if(o){const d=document.getElementById("issue-type-filter");d&&(d.value=o)}const r=e.getAll("label");if(r.length>0){const d=document.getElementById("label-filter-dropdown");d&&(d.querySelectorAll('input[type="checkbox"]').forEach(u=>{u.checked=r.includes(u.value)}),jr())}const l=e.get("groupBy");if(l){const d=document.getElementById("group-by-select");d&&(d.value=l)}}function Yp(){const e=yt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=it(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function Zp(){const e=wt(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Ue(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}const Rr=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"}];function Xp(e){e.stopPropagation();const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Gt)):(t.classList.remove("hidden"),xe(),Se(Oo()),setTimeout(()=>{document.addEventListener("click",Gt)},0))}function Qp(e){e.stopPropagation();const t=document.getElementById("display-menu-dropdown"),n=document.getElementById("filter-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Gt)):(t.classList.remove("hidden"),bm(),setTimeout(()=>{document.addEventListener("click",Gt)},0))}function Gt(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");!e.target.closest(".filter-menu-container")&&!e.target.closest(".display-menu-container")&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Gt))}function Nr(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Gt)}function Hr(e){var t,n,s,i;switch(e){case"project":return(t=document.getElementById("project-filter"))!=null&&t.value?1:0;case"status":return yt().length;case"priority":return wt().length;case"type":return(n=document.getElementById("issue-type-filter"))!=null&&n.value?1:0;case"assignee":return(s=document.getElementById("assignee-filter"))!=null&&s.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return kt().length;default:return 0}}function em(){let e=0;return Rr.forEach(t=>{e+=Hr(t.key)}),e}function xe(){const e=document.getElementById("filter-menu-categories");e&&(e.innerHTML=Rr.map(t=>{const n=Hr(t.key);return`
            <div class="filter-menu-category ${Oo()===t.key?"active":""}"
                 onclick="showFilterCategoryOptions('${t.key}')">
                <span>${t.label}</span>
                ${n>0?`<span class="filter-menu-category-count">${n}</span>`:'<span class="filter-menu-category-arrow">→</span>'}
            </div>
        `}).join(""))}function Se(e){zd(e),xe();const t=document.getElementById("filter-menu-options");if(t)switch(e){case"project":tm(t);break;case"status":nm(t);break;case"priority":sm(t);break;case"type":im(t);break;case"assignee":am(t);break;case"sprint":om(t);break;case"labels":rm(t);break}}function tm(e){const t=document.getElementById("project-filter"),n=(t==null?void 0:t.value)||"",s=ie()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${n?'<button class="filter-options-clear" onclick="clearProjectFilter()">Clear</button>':""}
        </div>
        <label class="filter-option" onclick="setProjectFilter('')">
            <input type="radio" name="project-filter-radio" value="" ${n?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setProjectFilter('${E(a.id)}')">
                <input type="radio" name="project-filter-radio" value="${_(a.id)}" ${n===a.id?"checked":""}>
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
            <label class="filter-option" onclick="setAssigneeFilter('${E(a.user_id)}')">
                <input type="radio" name="assignee-filter-radio" value="${_(a.user_id)}" ${n===a.user_id?"checked":""}>
                <span class="filter-option-label">${f(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function om(e){const t=document.getElementById("sprint-filter"),n=(t==null?void 0:t.value)||"",s=t?Array.from(t.options):[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${n?'<button class="filter-options-clear" onclick="clearSprintFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setSprintFilter('${E(a.value)}')">
                <input type="radio" name="sprint-filter-radio" value="${_(a.value)}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${f(a.text)}</span>
            </label>
        `}),e.innerHTML=i}function rm(e){const t=kt(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" onclick="clearLabelFilterNew()">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${_(a.value)}" ${t.includes(a.value)?"checked":""} onchange="toggleLabelOption('${E(a.value)}', event)">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ye(d)};"></span>
                    <span class="filter-option-label">${f(c)}</span>
                </label>
            `}),e.innerHTML=i}function Or(e){const t=document.getElementById("project-filter");t&&(t.value=e,zr()),xe(),Se("project"),Ie(),Ee()}function lm(){Or("")}function cm(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Gi()),xe(),Se("status")}function dm(){zi(),xe(),Se("status"),Ie(),Ee()}function um(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Ki()),xe(),Se("priority")}function pm(){Wi(),xe(),Se("priority"),Ie(),Ee()}function qr(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Xe()),xe(),Se("type"),Ie(),Ee()}function mm(){qr("")}function Fr(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Xe()),xe(),Se("assignee"),Ie(),Ee()}function gm(){Fr("")}function Ur(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Xe()),xe(),Se("sprint"),Ie(),Ee()}function fm(){Ur("")}function hm(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Vi()),xe(),Se("labels")}function vm(){Ji(),xe(),Se("labels"),Ie(),Ee()}function bm(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(l=>`
                <div class="display-option ${s===l.value?"active":""}" onclick="setSort('${l.value}')">
                    <span>${l.label}</span>
                    ${s===l.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(l=>`
                <div class="display-option ${i===l.value?"active":""}" onclick="setGroupBy('${l.value}')">
                    <span>${l.label}</span>
                    ${i===l.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function ym(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,$t()),Nr()}function wm(e){const t=document.getElementById("group-by-select");t&&(t.value=e,Kr()),Nr()}function Ie(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=document.getElementById("project-filter");if(n!=null&&n.value){const m=(ie()||[]).find(u=>u.id===n.value);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearFn:"clearProjectFilter()"})}const s=yt();if(s.length>0){const d=s.map(m=>it(m)).join(", ");t.push({category:"status",label:"Status",value:d,clearFn:"clearStatusFilterNew()"})}const i=wt();if(i.length>0){const d=i.map(m=>Ue(m)).join(", ");t.push({category:"priority",label:"Priority",value:d,clearFn:"clearPriorityFilterNew()"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const d=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:d?d.text:a.value,clearFn:"clearTypeFilter()"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let d;if(o.value==="me")d="Me";else if(o.value==="unassigned")d="Unassigned";else{const u=(Bt()||[]).find(g=>g.user_id===o.value);d=(u==null?void 0:u.name)||(u==null?void 0:u.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:d,clearFn:"clearAssigneeFilter()"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const d=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(d==null?void 0:d.text)||r.value,clearFn:"clearSprintFilter()"})}const l=kt();if(l.length>0){const d=document.getElementById("label-filter-dropdown"),m=l.map(u=>{var y;const g=d==null?void 0:d.querySelector(`input[value="${u}"]`),b=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearFn:"clearLabelFilterNew()"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let c=t.map(d=>`
        <span class="filter-chip">
            <span class="filter-chip-label">${d.label}:</span>
            <span class="filter-chip-value">${f(d.value)}</span>
            <button class="filter-chip-remove" onclick="${d.clearFn}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(c+='<button class="filter-chips-clear-all" onclick="clearAllFilters()">Clear all</button>'),e.innerHTML=c}function km(){const e=document.getElementById("project-filter");e&&(e.value=""),zi(),Wi();const t=document.getElementById("issue-type-filter");t&&(t.value="");const n=document.getElementById("assignee-filter");n&&(n.value="");const s=document.getElementById("sprint-filter");s&&(s.value=""),Ji(),Xe(),Ie(),Ee()}function Ee(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=em();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}function $m(){Ie(),Ee();const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&!e._clickHandlerAdded&&(e.addEventListener("click",n=>{n.stopPropagation()}),e._clickHandlerAdded=!0),t&&!t._clickHandlerAdded&&(t.addEventListener("click",n=>{n.stopPropagation()}),t._clickHandlerAdded=!0)}async function Gr(){var i;const e=document.getElementById("sprint-filter");if(!e)return;const t=(i=document.getElementById("project-filter"))==null?void 0:i.value,n=e.value;let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;if(t||Yi(null),t)try{const a=await api.getSprints(t),o=a.find(r=>r.status==="active");o&&(s+=`<option value="current">Current Sprint (${f(o.name)})</option>`),Yi(o||null),a.forEach(r=>{const l=r.status==="active"?" (Active)":r.status==="completed"?" (Done)":"";s+=`<option value="${r.id}">${f(r.name)}${l}</option>`})}catch(a){console.error("Failed to load sprints:",a)}e.innerHTML=s,n&&Array.from(e.options).some(o=>o.value===n)&&(e.value=n)}function Yi(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${f(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${f(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}async function $t(){var m,u,g,b,y,x,L;if(qo(-1),!window.currentTeam)return;const e=document.getElementById("project-filter").value,t=yt(),n=wt(),s=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,i=(g=(u=document.getElementById("issue-search"))==null?void 0:u.value)==null?void 0:g.trim();if(!e&&ie().length===0){document.getElementById("issues-list").innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create a project first to add issues</p>
            </div>
        `;return}Em();const a={limit:1e3},o=((b=document.getElementById("sort-by-select"))==null?void 0:b.value)||"created-desc",[r,l]=o.includes("-")?o.split("-"):[o,null];a.sort_by=r,l&&(a.order=l),t.length>0&&(a.status=t),n.length>0&&(a.priority=n),s&&(s==="me"?a.assignee_id=(y=gi())==null?void 0:y.id:a.assignee_id=s);const c=(x=document.getElementById("sprint-filter"))==null?void 0:x.value;if(c)if(c==="current"){if(e)try{const H=(await api.getSprints(e)).find(M=>M.status==="active");H&&(a.sprint_id=H.id)}catch(D){console.error("Failed to resolve current sprint:",D)}}else a.sprint_id=c;const d=(L=document.getElementById("issue-type-filter"))==null?void 0:L.value;d&&(a.issue_type=d),i&&i.length>=2&&(a.search=i);try{let D;e?(a.project_id=e,D=await api.getIssues(a)):ie().length>0&&(D=await api.getTeamIssues(window.currentTeam.id,a));const H=kt();H.length>0&&(D=D.filter(O=>!O.labels||O.labels.length===0?!1:O.labels.some(C=>H.includes(C.id)))),ze(D);const M=[...new Set(D.map(O=>O.project_id))];await Ko(M),Ze()}catch(D){v(D.message,"error")}}function Im(){clearTimeout(Jd()),Yd(setTimeout(()=>{$t()},300))}function Em(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}function Xe(){Pr(),$t()}async function zr(){var t;const e=(t=document.getElementById("project-filter"))==null?void 0:t.value;e&&ht(e),await Gr(),Fi(),Go(),Xe()}async function Kr(){if(Pr(),Wr()==="sprint"){const e=Me(),t=[...new Set(e.map(n=>n.project_id))];await Ko(t)}Ze()}function Wr(){const e=document.getElementById("group-by-select");return e?e.value:""}const Zi={},Is=new Map;let Xi=null,Qi=null,ea=null,ta=null,na=null,sa=null,Vr=!1;function _m(e){Object.assign(Zi,e)}function Tm({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i,epicNavigate:a}={}){e&&(Xi=e),t&&(Qi=t),n&&(ea=n),s&&(ta=s),i&&(na=i),a&&(sa=a)}function xm(){return Object.keys(Zi)}function X(e,t=!0){if(t&&Is.set(window.location.href,window.scrollY),Gd(e),t){let i;const a=vt(),o=["issues","board","sprints"];e==="my-issues"?i="/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:o.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),Xi&&Xi();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const i=document.getElementById(`${e}-view`);i&&i.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const s=Zi[e];s&&s(),t&&window.scrollTo(0,0)}function Jr(){var s;const t=window.location.pathname.split("/").filter(Boolean);ta&&ta();let n="my-issues";if(t.length===0||t[0]==="")X("my-issues",!1);else{if(Qi&&Qi(t))return;n=t[0],xm().includes(n)?X(n,!1):(n="my-issues",X("my-issues",!1))}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function ia(e){Is.set(window.location.href,window.scrollY),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),na&&na(e)}function Sm(e){Is.set(window.location.href,window.scrollY),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),sa&&sa(e)}function Yr(){const e=Is.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function Lm(){Vr||(Vr=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&ea&&ea(e.state)){Yr();return}(t=e.state)!=null&&t.view?X(e.state.view,!1):Jr(),Yr()}))}async function Cm(){const e=document.getElementById("epics-project-filter");if(!e)return;await we(),e.innerHTML='<option value="">All Projects</option>'+ie().map(n=>`<option value="${_(n.id)}">${f(n.name)}</option>`).join("");const t=vt()||bn();t&&ie().some(n=>n.id===t)&&(e.value=t),aa()}function Am(){var t;const e=(t=document.getElementById("epics-project-filter"))==null?void 0:t.value;e&&(ht(e),as(e)),aa()}async function aa(){var t,n;const e=document.getElementById("epics-list");if(e){e.innerHTML='<div class="loading">Loading epics...</div>';try{if(!((t=window.currentTeam)!=null&&t.id)){e.innerHTML='<div class="empty-state">Select a team to view epics.</div>';return}const s=(n=document.getElementById("epics-project-filter"))==null?void 0:n.value;let i;if(s?i=await $.getIssues({project_id:s,issue_type:"epic"}):i=await $.getTeamIssues(window.currentTeam.id,{issue_type:"epic"}),!i||i.length===0){e.innerHTML=`
                <div class="empty-state">
                    <p>No epics found.</p>
                    <p class="empty-state-hint">Click "+ New Epic" above or use the CLI: <code>chaotic epic create "Epic title"</code></p>
                </div>
            `;return}const a=await Promise.all(i.map(async o=>{let r=[];try{r=await $.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));Bm(a,e)}catch(s){e.innerHTML=`<div class="empty-state">Failed to load epics: ${f(s.message||String(s))}</div>`}}}function Bm(e,t){const n=e.map(s=>{const i=s.subIssues?s.subIssues.length:0,a=s.subIssues?s.subIssues.filter(m=>m.status==="done"||m.status==="canceled").length:0,o=i>0?Math.round(a/i*100):0,r=i>0?`${a}/${i}`:"-",l=`status-${(s.status||"backlog").replace(/_/g,"-")}`,c=(s.status||"backlog").replace(/_/g," ").replace(/\b\w/g,m=>m.toUpperCase()),d=s.estimate!=null?`${s.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${_(s.identifier)}" style="cursor: pointer;">
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
    `,t._epicClickHandler||(t._epicClickHandler=s=>{const i=s.target.closest(".epic-row");i&&i.dataset.identifier&&Sm(i.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function Dm(){var n;const e=(n=document.getElementById("epics-project-filter"))==null?void 0:n.value,t=ie().map(s=>`
        <option value="${_(s.id)}" ${s.id===e?"selected":""}>${f(s.name)}</option>
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
    `,N(),document.getElementById("create-epic-form").addEventListener("submit",Mm),document.getElementById("create-epic-title").focus()}async function Mm(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),s=document.getElementById("create-epic-description").value.trim();if(!t){v("Please select a project","error");return}if(!n){v("Please enter a title","error");return}try{const i=await $.createIssue(t,{title:n,description:s||null,issue_type:"epic"});K(),v(`Created epic ${i.identifier}`,"success"),aa()}catch(i){v(`Failed to create epic: ${i.message}`,"error")}}let B={api:null,getCurrentView:()=>"epics",showToast:()=>{},navigateTo:()=>{},getProjects:()=>[],getAssigneeById:()=>null,formatAssigneeName:e=>(e==null?void 0:e.name)||"",formatStatus:e=>e,formatPriority:e=>e,formatEstimate:e=>e||"None",formatTimeAgo:()=>"",getStatusIcon:()=>"",getPriorityIcon:()=>"",escapeHtml:e=>e,escapeAttr:e=>e,escapeJsString:e=>e,sanitizeColor:e=>e||"#888"};function jm(e){B={...B,...e}}async function oa(e){try{let t;if(e.includes("-")?t=await B.api.getIssueByIdentifier(e):t=await B.api.getIssue(e),t){if(t.issue_type!=="epic"){window.viewIssue?window.viewIssue(t.id,!1):B.navigateTo("epics",!1);return}await ra(t.id,!1)}else B.navigateTo("epics",!1)}catch{B.navigateTo("epics",!1)}}async function ra(e,t=!0){try{const[n,s,i,a]=await Promise.all([B.api.getIssue(e),B.api.getSubIssues(e),B.api.getActivities(e),B.api.getComments(e)]);if(n.issue_type!=="epic"){window.viewIssue?window.viewIssue(e,t):B.navigateTo("epics",!1);return}t&&history.pushState({epicId:e,view:B.getCurrentView()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(y=>y.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=B.getCurrentView()||"epics",l=B.getProjects().find(y=>y.id===n.project_id),c=n.assignee_id?B.getAssigneeById(n.assignee_id):null,d=c?B.formatAssigneeName(c):null,m=s.length,u=s.filter(y=>y.status==="done"||y.status==="canceled").length,g=m>0?Math.round(u/m*100):0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${r}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${l?B.escapeHtml(l.name):"Project"} › ${B.escapeHtml(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${B.escapeHtml(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${us(n.description)}
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
                            `:s.map(y=>{const x=y.assignee_id?B.getAssigneeById(y.assignee_id):null,L=x?B.formatAssigneeName(x):null;return`
                                <div class="sub-issue-item" data-issue-id="${B.escapeAttr(y.id)}" data-identifier="${B.escapeAttr(y.identifier)}">
                                    <span class="sub-issue-status">${B.getStatusIcon(y.status)}</span>
                                    <span class="sub-issue-id">${B.escapeHtml(y.identifier)}</span>
                                    <span class="sub-issue-title">${B.escapeHtml(y.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(y.status||"backlog").replace(/_/g,"-")}">${B.formatStatus(y.status)}</span>
                                    ${L?`<span class="sub-issue-assignee">${B.escapeHtml(L)}</span>`:""}
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
                                    <div class="activity-icon">${$i(y.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Ei(y)}</span>
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

                        ${l?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${B.escapeHtml(l.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const b=o.querySelector(".sub-issues-list");b&&b.addEventListener("click",y=>{const x=y.target.closest(".sub-issue-item");x&&x.dataset.issueId&&window.viewIssue&&window.viewIssue(x.dataset.issueId)})}catch(n){B.showToast(`Failed to load epic: ${n.message}`,"error")}}function Pm(e){let t=!1,n=null;return function(i){if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){switch(t=!1,clearTimeout(n),i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break}return}switch(i.key){case"c":i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}function Rm(e){return function(n){var s;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const i=e.getModalForm();if(i)n.preventDefault(),i.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const i=(s=document.activeElement)==null?void 0:s.closest("form");i&&(n.preventDefault(),i.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.openCommandPalette())}}}function Zr(e,t,n="#issues-list .list-item"){const s=document.querySelectorAll(n);s.length!==0&&(e=Math.max(0,Math.min(s.length-1,e)),s.forEach(i=>i.classList.remove("keyboard-selected")),t(e),s[e].classList.add("keyboard-selected"),s[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Nm(e){return function(n){if(e.getCurrentView()!=="issues"||n.target.tagName==="INPUT"||n.target.tagName==="TEXTAREA"||n.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll("#issues-list .list-item");if(s.length===0)return;const i=e.getSelectedIndex();switch(n.key){case"j":n.preventDefault(),Zr(i+1,e.setSelectedIndex);break;case"k":n.preventDefault(),Zr(i-1,e.setSelectedIndex);break;case"Enter":if(i>=0&&s[i]){n.preventDefault();const a=s[i].dataset.id;a&&!a.startsWith("temp-")&&e.viewIssue(a)}break;case"e":if(i>=0&&s[i]){n.preventDefault();const a=s[i].dataset.id;a&&!a.startsWith("temp-")&&e.showEditIssueModal(a)}break}}}const pt=new Map,Xr=6e4,la=100;let ue=null,ca=null,da=null,Bn=null,Qr=!1;const Hm={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},Om={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},el={api:null};let ua={...el};function qm(e={}){ua={...el,...e},ue||(ue=document.createElement("div"),ue.className="issue-tooltip",ue.style.display="none",document.body.appendChild(ue),ue.addEventListener("mouseenter",()=>{clearTimeout(ca)}),ue.addEventListener("mouseleave",()=>{pa()})),Qr||(document.addEventListener("mouseover",Fm),document.addEventListener("mouseout",Um),Qr=!0)}function Fm(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=Gm(t);if(n){if(n===Bn&&ue.style.display!=="none"){clearTimeout(ca);return}clearTimeout(da),da=setTimeout(()=>{zm(t,n)},200)}}function Um(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(da),ca=setTimeout(()=>{pa()},150))}function Gm(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function zm(e,t){Bn=t;const n=e.getBoundingClientRect();ue.style.left=`${n.left+window.scrollX}px`,ue.style.top=`${n.bottom+window.scrollY+8}px`,ue.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',ue.style.display="block";try{const s=await Wm(t);if(Bn!==t)return;Vm(s)}catch{if(Bn!==t)return;ue.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function pa(){ue&&(ue.style.display="none"),Bn=null}function Km(){const e=Date.now();for(const[t,n]of pt.entries())e-n.timestamp>=Xr&&pt.delete(t)}async function Wm(e){pt.size>la/2&&Km();const t=pt.get(e);if(t&&Date.now()-t.timestamp<Xr)return t.issue;if(!ua.api)throw new Error("API not initialized");const n=await ua.api.getIssueByIdentifier(e);if(pt.size>=la){const s=Array.from(pt.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,la/2);for(const[a]of i)pt.delete(a)}return pt.set(e,{issue:n,timestamp:Date.now()}),n}function Vm(e){const t=Hm[e.status]||"#6b7280",n=Om[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";ue.innerHTML=`
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
    `}function Jm(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Ym(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}let Dn=0,Mn=null;const It=new Map;function Qe(e,t){return It.has(e)||It.set(e,new Set),It.get(e).add(t),()=>{var n;return(n=It.get(e))==null?void 0:n.delete(t)}}function Zm(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}function tl(e){Mn&&(clearTimeout(Mn),Mn=null);const t=Zd();t&&(t.close(),Fo(null));const n=api.getToken();if(!n)return;const i=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(n)}&team_id=${encodeURIComponent(e)}`;try{const a=new WebSocket(i);Fo(a),a.onopen=()=>{console.log("WebSocket connected"),Dn>0&&v("Live updates reconnected","success"),Dn=0},a.onmessage=o=>{let r;try{r=JSON.parse(o.data)}catch(l){console.error("WebSocket: malformed message",l);return}Xm(r)},a.onclose=()=>{console.log("WebSocket disconnected"),Dn++,Dn===1&&v("Live updates disconnected. Reconnecting...","warning");const o=Zm(Dn-1);Mn=setTimeout(()=>{Mn=null,window.currentTeam&&window.currentTeam.id===e&&tl(e)},o)},a.onerror=o=>{console.error("WebSocket error:",o)}}catch(a){console.error("Failed to connect WebSocket:",a)}}function Xm(e){const{type:t,entity:n,data:s}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const i={type:t,entity:n},a=It.get(`${n}:${t}`);if(a)for(const l of a)try{l(s,i)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=It.get(n);if(o)for(const l of o)try{l(s,i)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=It.get("*");if(r)for(const l of r)try{l(s,i)}catch(c){console.error("WebSocket handler error (*):",c)}}function Qm(){Qe("issue:created",eg),Qe("issue:updated",tg),Qe("issue:deleted",ng),Qe("comment",sg),Qe("relation",ig),Qe("attestation",ag),Qe("activity",og),Qe("project",rg),Qe("sprint",lg)}function eg(e){var i,a;const t=Me(),n=t.findIndex(o=>o.id===e.id),s=t.findIndex(o=>o._isOptimistic&&o.title===e.title);if(!(n>=0))if(s>=0){const o=[...t];o[s]=e,ze(o),U()==="issues"&&Ze()}else ze([e,...t]),U()==="issues"&&Ze(),v(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((i=gi())==null?void 0:i.id)){const o=bs(),r=o.findIndex(c=>c.id===e.id),l=o.findIndex(c=>c._isOptimistic&&c.title===e.title);if(r===-1&&l===-1)_n([e,...o]),U()==="my-issues"&&Tn();else if(l>=0){const c=[...o];c[l]=e,_n(c),U()==="my-issues"&&Tn()}}U()==="my-issues"&&Rt({showLoading:!1}),U()==="board"?dt():U()==="sprints"&&We(),U()==="issue-detail"&&e.parent_id===((a=window.currentDetailIssue)==null?void 0:a.id)&&ae(window.currentDetailIssue.id,!1)}function tg(e){const t=Me();t.some(s=>s.id===e.id)&&ze(t.map(s=>s.id===e.id?e:s));const n=bs();if(n.some(s=>s.id===e.id)&&_n(n.map(s=>s.id===e.id?e:s)),U()==="issues")Ze();else if(U()==="my-issues")Tn(),Rt({showLoading:!1});else if(U()==="board")dt();else if(U()==="sprints")We();else if(U()==="issue-detail"){const s=document.getElementById("issue-detail-content");s&&s.dataset.issueId===e.id&&ae(e.id)}}function ng(e){var t;ze(Me().filter(n=>n.id!==e.id)),_n(bs().filter(n=>n.id!==e.id)),U()==="issues"?Ze():U()==="my-issues"?(Tn(),Rt({showLoading:!1})):U()==="board"?dt():U()==="sprints"&&We(),v(`Issue ${e.identifier} deleted`,"info"),U()==="issue-detail"&&((t=window.currentDetailIssue)==null?void 0:t.id)===e.id&&(v(`Issue ${e.identifier} was deleted`,"warning"),X("my-issues"))}function sg(e){var t;U()==="my-issues"&&Rt({showLoading:!1}),U()==="issue-detail"&&((t=window.currentDetailIssue)==null?void 0:t.id)===e.issue_id&&ae(e.issue_id,!1)}function ig(e){var t;if(U()==="issue-detail"){const n=(t=window.currentDetailIssue)==null?void 0:t.id;n&&(e.source_issue_id===n||e.target_issue_id===n)&&ae(n,!1)}}function ag(e){var t;U()==="gate-approvals"&&typeof window.loadGateApprovals=="function"&&window.loadGateApprovals(),U()==="issue-detail"&&((t=window.currentDetailIssue)==null?void 0:t.id)===e.issue_id&&ae(e.issue_id,!1)}function og(e){var t;U()==="my-issues"&&Rt({showLoading:!1}),U()==="issue-detail"&&((t=window.currentDetailIssue)==null?void 0:t.id)===e.issue_id&&ae(e.issue_id,!1)}function rg(e,{type:t}){we().then(()=>{U()==="projects"&&Dt()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?v(`New project: ${e.name}`,"info"):t==="deleted"&&v(`Project ${e.name} deleted`,"info")}function lg(){U()==="sprints"&&We()}function cg(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function dg(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";const n=()=>{t.classList.add("hidden"),t.innerHTML=""},s=()=>{const i=e.selectionStart||0,o=e.value.slice(0,i).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!o){n();return}const r=o[2].toLowerCase(),l=Bt().map(c=>({id:c.id,name:c.name||c.email||"User",email:c.email||"",handle:cg(c)})).filter(c=>!r||c.handle.includes(r)||c.name.toLowerCase().includes(r)||c.email.toLowerCase().includes(r)).slice(0,6);if(!l.length){n();return}t.innerHTML=l.map(c=>`
            <button type="button" class="mention-suggestion" data-handle="${_(c.handle)}">
                <span class="mention-name">${f(c.name)}</span>
                <span class="mention-handle">@${f(c.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach(c=>{c.addEventListener("click",()=>{const d=c.dataset.handle,m=e.value.slice(0,i).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),u=e.value.slice(i);e.value=m+u,e.focus(),n()})})};e.addEventListener("input",s),e.addEventListener("click",s),e.addEventListener("keydown",i=>{i.key==="Escape"&&n()}),e.addEventListener("blur",()=>{setTimeout(n,150)})}function ug(e){const{getLabels:t,setLabels:n,getCurrentTeam:s,getCurrentDetailIssue:i,setCurrentDetailIssue:a,getCurrentDetailSprints:o}=e;np({getCurrentUser:gi,getCurrentTeam:s,renderIssueRow:Re,formatActivityText:Ei,formatActivityActor:Ii,getActivityIcon:$i,navigateToIssueByIdentifier:ia,viewDocument:Ce}),Cp({api,showToast:v,getProjects:ie,getProjectFromUrl:vt,setGlobalProjectSelection:ht,updateUrlWithProject:as,escapeHtml:f,escapeAttr:_,escapeJsString:E,formatPriority:Ue}),Op({getIssues:Me,getAssigneeById:ys,formatAssigneeName:Cn,formatEstimate:vn,getSprintCache:Xd,formatStatus:it,formatPriority:Ue,formatIssueType:Vn,escapeHtml:f,escapeAttr:_,escapeJsString:E,sanitizeColor:ye,renderAvatar:Jn,getAssigneeOptionList:ws,getGroupByValue:Wr}),up({api,getIssues:Me,setIssues:ze,getMyIssues:bs,setMyIssues:_n,getCurrentDetailIssue:i,setCurrentDetailIssue:a,getLabels:t,setLabels:n,getCurrentTeam:s,getCurrentDetailSprints:o,closeAllDropdowns:ln,registerDropdownClickOutside:Zs,setDropdownKeyHandler:Mc,showToast:v,getStatusIcon:Ut,getPriorityIcon:Ft,formatStatus:it,formatPriority:Ue,formatIssueType:Vn,formatEstimate:vn,formatAssigneeName:Cn,formatAssigneeOptionLabel:Ni,getAssigneeOptionList:ws,getAssigneeById:ys,getEstimateOptions:hn,renderAvatar:Jn,renderIssueRow:Re,escapeHtml:f,escapeAttr:_,escapeJsString:E,sanitizeColor:ye,updateSprintCacheForProject:vu,updateSprintBudgetBar:Yi}),vp({api,getProjects:ie,getEstimateOptions:hn,getCurrentView:U,showModal:N,closeModal:K,showToast:v,viewIssue:ae,loadIssues:$t,loadMyIssues:Ai,closeAllDropdowns:ln,registerDropdownClickOutside:Zs,getLabels:t,setLabels:n,getCurrentTeam:s,getStatusIcon:Ut,getPriorityIcon:Ft,formatStatus:it,formatPriority:Ue,formatIssueType:Vn,formatAssigneeName:Cn,formatAssigneeOptionLabel:Ni,getAssigneeOptionList:ws,renderAvatar:Jn,escapeHtml:f,escapeAttr:_,escapeJsString:E}),xp({api,showModal:N,closeModal:K,showToast:v,viewIssue:ae,navigateTo:X,loadIssues:$t,loadProjects:we,getEstimateOptions:hn,escapeHtml:f,escapeAttr:_,escapeJsString:E}),yu({api,getCurrentView:U,showToast:v,showModal:N,closeModal:K,navigateTo:X,getProjects:ie,getMembers:Bt,getAssigneeById:ys,formatAssigneeName:Cn,formatStatus:it,formatPriority:Ue,formatIssueType:Vn,formatEstimate:vn,formatTimeAgo:xt,getStatusIcon:Ut,getPriorityIcon:Ft,renderMarkdown:gs,renderAvatar:Jn,escapeHtml:f,escapeAttr:_,escapeJsString:E,sanitizeColor:ye,showDetailDropdown:kr,setupMentionAutocomplete:dg,renderTicketRitualActions:Ru,getIssues:Me}),jm({api,getCurrentView:U,showToast:v,navigateTo:X,getProjects:ie,getAssigneeById:ys,formatAssigneeName:Cn,formatStatus:it,formatPriority:Ue,formatEstimate:vn,formatTimeAgo:xt,getStatusIcon:Ut,getPriorityIcon:Ft,escapeHtml:f,escapeAttr:_,escapeJsString:E,sanitizeColor:ye})}const nl='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function sl(){const e=document.getElementById("hamburger-btn");e&&e.setAttribute("aria-expanded",String(document.body.classList.contains("sidebar-open")))}function pg(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),sl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(nl);n&&n.focus()}}}function Es(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),sl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.querySelector(".sidebar");if(!t)return;const n=t.querySelectorAll(nl);if(n.length===0)return;const s=n[0],i=n[n.length-1];if(!t.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Es()});async function mg(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=document.getElementById("project-filter").value;if(!s){v("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=ie().find(c=>c.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};ze([r,...Me()]),Ze();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const c=await api.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=Me(),m=d.findIndex(u=>u.id===a);m!==-1&&(d[m]=c,ze(d)),Ze(),we(),v("Issue created!","success")}catch(c){ze(Me().filter(d=>d.id!==a)),Ze(),v(`Failed to create issue: ${c.message}`,"error")}finally{t.disabled=!1,t.placeholder=i,t.focus()}}window.currentTeam=null;let ma=[];Tm({beforeNavigate:()=>{Bo(),window._onRitualsChanged=null,window.currentDetailIssue=null,window.currentDetailSprints=null,Es(),pa()},detailRoute:e=>e[0]==="epic"&&e[1]?(oa(e[1]),!0):e[0]==="issue"&&e[1]?(ms(e[1]),!0):e[0]==="document"&&e[1]?(hg(e[1]),!0):e[0]==="sprint"&&e[1]?(su(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Co(e[1]),!0):!1,detailPopstate:e=>e.epicId?(ra(e.epicId,!1),!0):e.issueId?(ae(e.issueId,!1),!0):e.identifier?(ms(e.identifier),!0):e.documentId?(Ce(e.documentId,!1),!0):e.sprintId?(vi(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=vt();e&&ie().some(t=>t.id===e)&&ht(e)},issueNavigate:e=>ms(e),epicNavigate:e=>oa(e)}),_m({"my-issues":()=>{Ai(),Rt()},"gate-approvals":()=>{$n()},issues:()=>{Jp(),$m(),Vp().then(()=>{const t=new URLSearchParams(window.location.search).getAll("label");if(t.length>0){const n=document.getElementById("label-filter-dropdown");n&&(n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),jr())}}),Gr().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}$t()})},epics:()=>{Cm()},board:()=>{Fi()},projects:()=>{we().then(Dt)},sprints:()=>{Go()},rituals:()=>{Xo()},documents:()=>{Ct()},team:()=>{di(),_o(),ts()},settings:()=>{Li(),ai(),Bu()}}),document.addEventListener("DOMContentLoaded",async()=>{if(gg(),fg(),qm({api}),Lm(),Qm(),api.getToken())try{const e=await api.getMe();Ud(e),window.currentUser=e,await il()}catch{api.logout(),Zn()}else Zn()});function gg(){const e=document.getElementById("theme-toggle");if(!e)return;const n=localStorage.getItem("chaotic_theme")==="light";document.body.classList.toggle("theme-light",n),e.checked=n,e.addEventListener("change",()=>{const s=e.checked;document.body.classList.toggle("theme-light",s),localStorage.setItem("chaotic_theme",s?"light":"dark")})}function fg(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");ia(s)}}})}async function il(){so(),co(),await es();const e=yo();if(e.length===0&&!dr()){ji();return}e.length>0&&await li(e[0],!0)}window.initApp=il,window.viewIssue=ae,window.viewIssueByPath=ms,window.viewEpic=ra,window.viewEpicByPath=oa,window.toggleTicketRituals=Jo,window.toggleSection=Vo,window.connectWebSocket=tl,window.buildAssignees=()=>lp(Bt,cd),window.updateAssigneeFilter=cp,window.loadLabels=vg,window.resetOnboarding=Ri,window.viewDocument=Ce;async function hg(e){try{await Ce(e,!1)}catch{X("documents",!1)}}async function vg(){if(window.currentTeam)try{ma=await api.getLabels(window.currentTeam.id)}catch(e){console.error("Failed to load labels:",e)}}document.addEventListener("keydown",Pm({closeModal:K,closeSidebar:Es,navigateTo:X,showCreateIssueModal:Oi,showKeyboardShortcutsHelp:al,isModalOpen:Ys,focusSearch:()=>{X("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden")}}));function al(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
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
    `,N()}Zu([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>X("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>X("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>X("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>X("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>X("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>X("documents"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>X("team"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{X("issues"),setTimeout(Oi,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{X("projects"),setTimeout(mi,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{X("documents"),setTimeout(ii,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>pi(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{X("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{X("team"),setTimeout(ui,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>al(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Ri(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Qs(),category:"Account"}]),ug({getLabels:()=>ma,setLabels:e=>{ma=e},getCurrentTeam:()=>window.currentTeam,getCurrentDetailIssue:()=>window.currentDetailIssue,setCurrentDetailIssue:e=>{window.currentDetailIssue=e},getCurrentDetailSprints:()=>window.currentDetailSprints});const bg=N;window.showModal=function(){bg(),setTimeout(()=>{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()},50)},document.addEventListener("keydown",Rm({isModalOpen:Ys,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:rr,openCommandPalette:Xu,closeCommandPalette:vs})),document.addEventListener("keydown",Nm({getCurrentView:U,getSelectedIndex:Kd,setSelectedIndex:qo,viewIssue:ae,showEditIssueModal:Sr,isModalOpen:Ys,isCommandPaletteOpen:rr})),Object.assign(window,{escapeHtml:f,renderMarkdown:gs,handleLogin:oo,handleSignup:ro,showLogin:io,showSignup:ao,logout:Qs,navigateTo:X,handleRoute:Jr,closeModal:K,toggleSidebar:pg,closeSidebar:Es,getProjectFromUrl:vt,updateUrlWithProject:as,toggleTeamDropdown:ci,toggleUserDropdown:ko,showCreateTeamModal:pi,showEditTeamModal:xo,showInviteModal:ui,showCreateIssueModal:Oi,loadIssues:$t,filterIssues:Xe,filterMyIssues:cr,debounceSearch:Im,handleQuickCreate:mg,onProjectFilterChange:zr,updateGroupBy:Kr,toggleGroup:Kp,viewIssue:ae,showEditIssueModal:Sr,editDescription:Eu,setDescriptionEditorMode:_u,updateIssueField:An,handleUpdateIssue:Sp,deleteIssue:Lp,navigateToIssueByIdentifier:ia,handleCreateIssueNew:_p,handleCreateIssueAndNew:Tp,setCreateIssueField:Ep,toggleCreateIssueDropdown:$p,toggleCreateIssueLabelSelection:gp,createLabelForCreateIssue:_r,createLabelFromDropdown:Er,handleAddComment:Iu,showCreateSubIssueModal:wp,handleCreateSubIssue:kp,showAddRelationModal:Tu,handleAddRelation:Cu,deleteRelation:Au,searchIssuesToRelate:xu,selectIssueForRelation:Su,clearSelectedRelation:Lu,showDetailDropdown:kr,showInlineDropdown:wr,toggleIssueLabel:pp,toggleMultiSelect:Wp,updateStatusFilter:Gi,updatePriorityFilter:Ki,updateLabelFilter:Vi,clearStatusFilter:zi,clearPriorityFilter:Wi,clearLabelFilter:Ji,toggleFilterMenu:Xp,toggleDisplayMenu:Qp,showFilterCategoryOptions:Se,setProjectFilter:Or,clearProjectFilter:lm,toggleStatusOption:cm,clearStatusFilterNew:dm,togglePriorityOption:um,clearPriorityFilterNew:pm,setTypeFilter:qr,clearTypeFilter:mm,setAssigneeFilter:Fr,clearAssigneeFilter:gm,setSprintFilter:Ur,clearSprintFilter:fm,toggleLabelOption:hm,clearLabelFilterNew:vm,setSort:ym,setGroupBy:wm,clearAllFilters:km,updateFilterChips:Ie,updateFilterCountBadge:Ee,loadBoard:Ui,onBoardProjectChange:Ap,handleDragStart:Bp,handleDragEnd:Dp,handleDragOver:Mp,handleDragLeave:jp,handleCardDragOver:Pp,handleCardDragLeave:Rp,handleDrop:Np,handleCardDrop:Hp,loadSprints:We,onSprintProjectChange:eu,viewSprint:vi,showEditBudgetModal:lu,handleUpdateBudget:cu,showCloseSprintConfirmation:du,completeSprint:uu,loadLimboStatus:ls,showLimboDetailsModal:bi,showCreateDocumentModal:ii,showCreateProjectModal:mi,onEpicsProjectChange:Am,showCreateEpicModal:Dm,dismissApprovalsExplainer:Vu,loadGateApprovals:$n,loadRitualsView:Xo,onRitualsProjectChange:Qo,switchRitualsTab:Mu,toggleRitualConditions:Ad,approveRitual:ju,completeGateRitual:er,toggleSection:Vo,toggleTicketRituals:Jo,attestTicketRitual:Ou,approveTicketRitual:qu,showCompleteTicketRitualModal:Fu,showAttestTicketRitualModal:Nu,showCreateApiKeyModal:ir,copyApiKey:ar,revokeApiKey:or,showCreateAgentModal:bo,toggleCreateIssueOptions:bp,applyIssueTemplate:yp,updateCreateIssueProject:Ip,handleLabelCreateKey:mp,handleCreateIssueLabelKey:fp}),window.marked=F,window.DOMPurify=no,console.log("Chaotic frontend loaded via Vite")})();
