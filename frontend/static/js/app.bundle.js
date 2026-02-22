var yf=Object.defineProperty;var wf=(Xe,de,kt)=>de in Xe?yf(Xe,de,{enumerable:!0,configurable:!0,writable:!0,value:kt}):Xe[de]=kt;var H=(Xe,de,kt)=>wf(Xe,typeof de!="symbol"?de+"":de,kt);(function(){"use strict";var Ea;function Xe(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var de=Xe();function kt(e){de=e}var on={exec:()=>null};function q(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(ue.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var ue={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Il=/^(?:[ \t]*(?:\n|$))+/,xl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Tl=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,rn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Sl=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,zs=/(?:[*+-]|\d{1,9}[.)])/,qa=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Oa=q(qa).replace(/bull/g,zs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ll=q(qa).replace(/bull/g,zs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Gs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Cl=/^[^\n]+/,Ws=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Bl=q(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ws).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Al=q(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,zs).getRegex(),Wn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Vs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,jl=q("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Vs).replace("tag",Wn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ha=q(Gs).replace("hr",rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wn).getRegex(),Ml=q(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ha).getRegex(),Ks={blockquote:Ml,code:xl,def:Bl,fences:Tl,heading:Sl,hr:rn,html:jl,lheading:Oa,list:Al,newline:Il,paragraph:Ha,table:on,text:Cl},Fa=q("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wn).getRegex(),Dl={...Ks,lheading:Ll,table:Fa,paragraph:q(Gs).replace("hr",rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Fa).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wn).getRegex()},Rl={...Ks,html:q(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Vs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:on,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:q(Gs).replace("hr",rn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Oa).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Pl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Nl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ua=/^( {2,}|\\)\n(?!\s*$)/,ql=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Vn=/[\p{P}\p{S}]/u,Ys=/[\s\p{P}\p{S}]/u,za=/[^\s\p{P}\p{S}]/u,Ol=q(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ys).getRegex(),Ga=/(?!~)[\p{P}\p{S}]/u,Hl=/(?!~)[\s\p{P}\p{S}]/u,Fl=/(?:[^\s\p{P}\p{S}]|~)/u,Ul=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Wa=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,zl=q(Wa,"u").replace(/punct/g,Vn).getRegex(),Gl=q(Wa,"u").replace(/punct/g,Ga).getRegex(),Va="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Wl=q(Va,"gu").replace(/notPunctSpace/g,za).replace(/punctSpace/g,Ys).replace(/punct/g,Vn).getRegex(),Vl=q(Va,"gu").replace(/notPunctSpace/g,Fl).replace(/punctSpace/g,Hl).replace(/punct/g,Ga).getRegex(),Kl=q("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,za).replace(/punctSpace/g,Ys).replace(/punct/g,Vn).getRegex(),Yl=q(/\\(punct)/,"gu").replace(/punct/g,Vn).getRegex(),Zl=q(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Xl=q(Vs).replace("(?:-->|$)","-->").getRegex(),Ql=q("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Xl).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Kn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Jl=q(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Kn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ka=q(/^!?\[(label)\]\[(ref)\]/).replace("label",Kn).replace("ref",Ws).getRegex(),Ya=q(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ws).getRegex(),ec=q("reflink|nolink(?!\\()","g").replace("reflink",Ka).replace("nolink",Ya).getRegex(),Zs={_backpedal:on,anyPunctuation:Yl,autolink:Zl,blockSkip:Ul,br:Ua,code:Nl,del:on,emStrongLDelim:zl,emStrongRDelimAst:Wl,emStrongRDelimUnd:Kl,escape:Pl,link:Jl,nolink:Ya,punctuation:Ol,reflink:Ka,reflinkSearch:ec,tag:Ql,text:ql,url:on},tc={...Zs,link:q(/^!?\[(label)\]\((.*?)\)/).replace("label",Kn).getRegex(),reflink:q(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Kn).getRegex()},Xs={...Zs,emStrongRDelimAst:Vl,emStrongLDelim:Gl,url:q(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},nc={...Xs,br:q(Ua).replace("{2,}","*").getRegex(),text:q(Xs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Yn={normal:Ks,gfm:Dl,pedantic:Rl},ln={normal:Zs,gfm:Xs,breaks:nc,pedantic:tc},sc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Za=e=>sc[e];function Fe(e,t){if(t){if(ue.escapeTest.test(e))return e.replace(ue.escapeReplace,Za)}else if(ue.escapeTestNoEncode.test(e))return e.replace(ue.escapeReplaceNoEncode,Za);return e}function Xa(e){try{e=encodeURI(e).replace(ue.percentDecode,"%")}catch{return null}return e}function Qa(e,t){var a;const n=e.replace(ue.findPipe,(o,r,d)=>{let l=!1,c=r;for(;--c>=0&&d[c]==="\\";)l=!l;return l?"|":" |"}),s=n.split(ue.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(ue.slashPipe,"|");return s}function cn(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function ic(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function Ja(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const d={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,d}function ac(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var Zn=class{constructor(e){H(this,"options");H(this,"rules");H(this,"lexer");this.options=e||de}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:cn(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=ac(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=cn(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:cn(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=cn(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let d;for(d=0;d<n.length;d++)if(this.rules.other.blockquoteStart.test(n[d]))r.push(n[d]),o=!0;else if(!o)r.push(n[d]);else break;n=n.slice(d);const l=r.join(`
`),c=l.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${l}`:l,i=i?`${i}
${c}`:c;const h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,a,!0),this.lexer.state.top=h,n.length===0)break;const u=a.at(-1);if((u==null?void 0:u.type)==="code")break;if((u==null?void 0:u.type)==="blockquote"){const f=u,y=f.raw+`
`+n.join(`
`),$=this.blockquote(y);a[a.length-1]=$,s=s.substring(0,s.length-f.raw.length)+$.raw,i=i.substring(0,i.length-f.text.length)+$.text;break}else if((u==null?void 0:u.type)==="list"){const f=u,y=f.raw+`
`+n.join(`
`),$=this.list(y);a[a.length-1]=$,s=s.substring(0,s.length-u.raw.length)+$.raw,i=i.substring(0,i.length-f.raw.length)+$.raw,n=y.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let d=!1,l="",c="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let h=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),u=e.split(`
`,1)[0],f=!h.trim(),y=0;if(this.options.pedantic?(y=2,c=h.trimStart()):f?y=t[1].length+1:(y=t[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,c=h.slice(y),y+=t[1].length),f&&this.rules.other.blankLine.test(u)&&(l+=u+`
`,e=e.substring(u.length+1),d=!0),!d){const T=this.rules.other.nextBulletRegex(y),B=this.rules.other.hrRegex(y),S=this.rules.other.fencesBeginRegex(y),L=this.rules.other.headingBeginRegex(y),C=this.rules.other.htmlBeginRegex(y);for(;e;){const V=e.split(`
`,1)[0];let O;if(u=V,this.options.pedantic?(u=u.replace(this.rules.other.listReplaceNesting,"  "),O=u):O=u.replace(this.rules.other.tabCharGlobal,"    "),S.test(u)||L.test(u)||C.test(u)||T.test(u)||B.test(u))break;if(O.search(this.rules.other.nonSpaceChar)>=y||!u.trim())c+=`
`+O.slice(y);else{if(f||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||S.test(h)||L.test(h)||B.test(h))break;c+=`
`+u}!f&&!u.trim()&&(f=!0),l+=V+`
`,e=e.substring(V.length+1),h=O.slice(y)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(l)&&(o=!0));let $=null,E;this.options.gfm&&($=this.rules.other.listIsTask.exec(c),$&&(E=$[0]!=="[ ] ",c=c.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:l,task:!!$,checked:E,loose:!1,text:c,tokens:[]}),i.raw+=l}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let d=0;d<i.items.length;d++)if(this.lexer.state.top=!1,i.items[d].tokens=this.lexer.blockTokens(i.items[d].text,[]),!i.loose){const l=i.items[d].tokens.filter(h=>h.type==="space"),c=l.length>0&&l.some(h=>this.rules.other.anyLine.test(h.raw));i.loose=c}if(i.loose)for(let d=0;d<i.items.length;d++)i.items[d].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Qa(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(Qa(r,a.header.length).map((d,l)=>({text:d,tokens:this.lexer.inline(d),header:!1,align:a.align[l]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=cn(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=ic(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),Ja(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Ja(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,d=a,l=0;const c=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+a);(s=c.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){d+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){l+=r;continue}if(d-=r,d>0)continue;r=Math.min(r,r+d+l);const h=[...s[0]][0].length,u=e.slice(0,a+s.index+h+r);if(Math.min(a,r)%2){const y=u.slice(1,-1);return{type:"em",raw:u,text:y,tokens:this.lexer.inlineTokens(y)}}const f=u.slice(2,-2);return{type:"strong",raw:u,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Qe=class Pa{constructor(t){H(this,"tokens");H(this,"options");H(this,"state");H(this,"tokenizer");H(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||de,this.options.tokenizer=this.options.tokenizer||new Zn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:ue,block:Yn.normal,inline:ln.normal};this.options.pedantic?(n.block=Yn.pedantic,n.inline=ln.pedantic):this.options.gfm&&(n.block=Yn.gfm,this.options.breaks?n.inline=ln.breaks:n.inline=ln.gfm),this.tokenizer.rules=n}static get rules(){return{block:Yn,inline:ln}}static lex(t,n){return new Pa(n).lex(t)}static lexInline(t,n){return new Pa(n).inlineTokens(t)}lex(t){t=t.replace(ue.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(ue.tabCharGlobal,"    ").replace(ue.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(l=>(r=l.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const l=n.at(-1);r.raw.length===1&&l!==void 0?l.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let d=t;if((o=this.options.extensions)!=null&&o.startBlock){let l=1/0;const c=t.slice(1);let h;this.options.extensions.startBlock.forEach(u=>{h=u.call({lexer:this},c),typeof h=="number"&&h>=0&&(l=Math.min(l,h))}),l<1/0&&l>=0&&(d=t.substring(0,l+1))}if(this.state.top&&(r=this.tokenizer.paragraph(d))){const l=n.at(-1);s&&(l==null?void 0:l.type)==="paragraph"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r),s=d.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(t){const l="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,d,l;let s=t,i=null;if(this.tokens.links){const c=Object.keys(this.tokens.links);if(c.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)c.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let c;if((d=(r=this.options.extensions)==null?void 0:r.inline)!=null&&d.some(u=>(c=u.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);const u=n.at(-1);c.type==="text"&&(u==null?void 0:u.type)==="text"?(u.raw+=c.raw,u.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,s,o)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let h=t;if((l=this.options.extensions)!=null&&l.startInline){let u=1/0;const f=t.slice(1);let y;this.options.extensions.startInline.forEach($=>{y=$.call({lexer:this},f),typeof y=="number"&&y>=0&&(u=Math.min(u,y))}),u<1/0&&u>=0&&(h=t.substring(0,u+1))}if(c=this.tokenizer.inlineText(h)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(o=c.raw.slice(-1)),a=!0;const u=n.at(-1);(u==null?void 0:u.type)==="text"?(u.raw+=c.raw,u.text+=c.text):n.push(c);continue}if(t){const u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return n}},Xn=class{constructor(e){H(this,"options");H(this,"parser");this.options=e||de}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(ue.notSpaceStart))==null?void 0:a[0],i=e.replace(ue.endingNewline,"")+`
`;return s?'<pre><code class="language-'+Fe(s)+'">'+(n?i:Fe(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:Fe(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let s="";for(let o=0;o<e.items.length;o++){const r=e.items[o];s+=this.listitem(r)}const i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){var n;let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+Fe(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){const a=e.rows[i];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Fe(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=Xa(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+Fe(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=Xa(e);if(i===null)return Fe(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Fe(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Fe(e.text)}},Qs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Je=class Na{constructor(t){H(this,"options");H(this,"renderer");H(this,"textRenderer");this.options=t||de,this.options.renderer=this.options.renderer||new Xn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Qs}static parse(t,n){return new Na(n).parse(t)}static parseInline(t,n){return new Na(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=r,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=c||"";continue}}const d=r;switch(d.type){case"space":{s+=this.renderer.space(d);continue}case"hr":{s+=this.renderer.hr(d);continue}case"heading":{s+=this.renderer.heading(d);continue}case"code":{s+=this.renderer.code(d);continue}case"table":{s+=this.renderer.table(d);continue}case"blockquote":{s+=this.renderer.blockquote(d);continue}case"list":{s+=this.renderer.list(d);continue}case"html":{s+=this.renderer.html(d);continue}case"paragraph":{s+=this.renderer.paragraph(d);continue}case"text":{let l=d,c=this.renderer.text(l);for(;o+1<t.length&&t[o+1].type==="text";)l=t[++o],c+=`
`+this.renderer.text(l);n?s+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):s+=c;continue}default:{const l='Token with "'+d.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=l||"";continue}}const d=r;switch(d.type){case"escape":{s+=n.text(d);break}case"html":{s+=n.html(d);break}case"link":{s+=n.link(d);break}case"image":{s+=n.image(d);break}case"strong":{s+=n.strong(d);break}case"em":{s+=n.em(d);break}case"codespan":{s+=n.codespan(d);break}case"br":{s+=n.br(d);break}case"del":{s+=n.del(d);break}case"text":{s+=n.text(d);break}default:{const l='Token with "'+d.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},Qn=(Ea=class{constructor(e){H(this,"options");H(this,"block");this.options=e||de}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Qe.lex:Qe.lexInline}provideParser(){return this.block?Je.parse:Je.parseInline}},H(Ea,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Ea),oc=class{constructor(...e){H(this,"defaults",Xe());H(this,"options",this.setOptions);H(this,"parse",this.parseMarkdown(!0));H(this,"parseInline",this.parseMarkdown(!1));H(this,"Parser",Je);H(this,"Renderer",Xn);H(this,"TextRenderer",Qs);H(this,"Lexer",Qe);H(this,"Tokenizer",Zn);H(this,"Hooks",Qn);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const d of r)n=n.concat(this.walkTokens(d.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const d=o[r].flat(1/0);n=n.concat(this.walkTokens(d,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new Xn(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],d=i[o];i[o]=(...l)=>{let c=r.apply(i,l);return c===!1&&(c=d.apply(i,l)),c||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new Zn(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],d=i[o];i[o]=(...l)=>{let c=r.apply(i,l);return c===!1&&(c=d.apply(i,l)),c}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new Qn;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],d=i[o];Qn.passThroughHooks.has(a)?i[o]=l=>{if(this.defaults.async)return Promise.resolve(r.call(i,l)).then(h=>d.call(i,h));const c=r.call(i,l);return d.call(i,c)}:i[o]=(...l)=>{let c=r.apply(i,l);return c===!1&&(c=d.apply(i,l)),c}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Qe.lex(e,t??this.defaults)}parser(e,t){return Je.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Qe.lex:Qe.lexInline,d=a.hooks?a.hooks.provideParser():e?Je.parse:Je.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(l=>r(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>d(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let l=r(n,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let c=d(l,a);return a.hooks&&(c=a.hooks.postprocess(c)),c}catch(l){return o(l)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+Fe(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},Et=new oc;function R(e,t){return Et.parse(e,t)}R.options=R.setOptions=function(e){return Et.setOptions(e),R.defaults=Et.defaults,kt(R.defaults),R},R.getDefaults=Xe,R.defaults=de,R.use=function(...e){return Et.use(...e),R.defaults=Et.defaults,kt(R.defaults),R},R.walkTokens=function(e,t){return Et.walkTokens(e,t)},R.parseInline=Et.parseInline,R.Parser=Je,R.parser=Je.parse,R.Renderer=Xn,R.TextRenderer=Qs,R.Lexer=Qe,R.lexer=Qe.lex,R.Tokenizer=Zn,R.Hooks=Qn,R.parse=R,R.options,R.setOptions,R.use,R.walkTokens,R.parseInline,Je.parse,Qe.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:eo,setPrototypeOf:to,isFrozen:rc,getPrototypeOf:lc,getOwnPropertyDescriptor:cc}=Object;let{freeze:pe,seal:Ce,create:Js}=Object,{apply:ei,construct:ti}=typeof Reflect<"u"&&Reflect;pe||(pe=function(t){return t}),Ce||(Ce=function(t){return t}),ei||(ei=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),ti||(ti=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const Jn=ge(Array.prototype.forEach),dc=ge(Array.prototype.lastIndexOf),no=ge(Array.prototype.pop),dn=ge(Array.prototype.push),uc=ge(Array.prototype.splice),es=ge(String.prototype.toLowerCase),ni=ge(String.prototype.toString),si=ge(String.prototype.match),un=ge(String.prototype.replace),pc=ge(String.prototype.indexOf),mc=ge(String.prototype.trim),Me=ge(Object.prototype.hasOwnProperty),me=ge(RegExp.prototype.test),pn=gc(TypeError);function ge(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return ei(e,t,s)}}function gc(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return ti(e,n)}}function A(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:es;to&&to(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(rc(t)||(t[s]=a),i=a)}e[i]=!0}return e}function fc(e){for(let t=0;t<e.length;t++)Me(e,t)||(e[t]=null);return e}function Ue(e){const t=Js(null);for(const[n,s]of eo(e))Me(e,n)&&(Array.isArray(s)?t[n]=fc(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=Ue(s):t[n]=s);return t}function mn(e,t){for(;e!==null;){const s=cc(e,t);if(s){if(s.get)return ge(s.get);if(typeof s.value=="function")return ge(s.value)}e=lc(e)}function n(){return null}return n}const so=pe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ii=pe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ai=pe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),hc=pe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),oi=pe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),vc=pe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),io=pe(["#text"]),ao=pe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ri=pe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),oo=pe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ts=pe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),bc=Ce(/\{\{[\w\W]*|[\w\W]*\}\}/gm),yc=Ce(/<%[\w\W]*|[\w\W]*%>/gm),wc=Ce(/\$\{[\w\W]*/gm),$c=Ce(/^data-[\-\w.\u00B7-\uFFFF]+$/),kc=Ce(/^aria-[\-\w]+$/),ro=Ce(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ec=Ce(/^(?:\w+script|data):/i),_c=Ce(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),lo=Ce(/^html$/i),Ic=Ce(/^[a-z][.\w]*(-[.\w]+)+$/i);var co=Object.freeze({__proto__:null,ARIA_ATTR:kc,ATTR_WHITESPACE:_c,CUSTOM_ELEMENT:Ic,DATA_ATTR:$c,DOCTYPE_NAME:lo,ERB_EXPR:yc,IS_ALLOWED_URI:ro,IS_SCRIPT_OR_DATA:Ec,MUSTACHE_EXPR:bc,TMPLIT_EXPR:wc});const gn={element:1,text:3,progressingInstruction:7,comment:8,document:9},xc=function(){return typeof window>"u"?null:window},Tc=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},uo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function po(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:xc();const t=I=>po(I);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==gn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:d,NodeFilter:l,NamedNodeMap:c=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:h,DOMParser:u,trustedTypes:f}=e,y=d.prototype,$=mn(y,"cloneNode"),E=mn(y,"remove"),T=mn(y,"nextSibling"),B=mn(y,"childNodes"),S=mn(y,"parentNode");if(typeof o=="function"){const I=n.createElement("template");I.content&&I.content.ownerDocument&&(n=I.content.ownerDocument)}let L,C="";const{implementation:V,createNodeIterator:O,createDocumentFragment:J,getElementsByTagName:ie}=n,{importNode:X}=s;let P=uo();t.isSupported=typeof eo=="function"&&typeof S=="function"&&V&&V.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:be,ERB_EXPR:le,TMPLIT_EXPR:Le,DATA_ATTR:Ae,ARIA_ATTR:_a,IS_SCRIPT_OR_DATA:w,ATTR_WHITESPACE:je,CUSTOM_ELEMENT:ee}=co;let{IS_ALLOWED_URI:$t}=co,ne=null;const sl=A({},[...so,...ii,...ai,...oi,...io]);let ae=null;const il=A({},[...ao,...ri,...oo,...ts]);let Y=Object.seal(Js(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Un=null,Ia=null;const Qt=Object.seal(Js(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let al=!0,xa=!0,ol=!1,rl=!0,Jt=!1,Ps=!0,At=!1,Ta=!1,Sa=!1,en=!1,Ns=!1,qs=!1,ll=!0,cl=!1;const uf="user-content-";let La=!0,zn=!1,tn={},Ye=null;const Ca=A({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let dl=null;const ul=A({},["audio","video","img","source","image","track"]);let Ba=null;const pl=A({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Os="http://www.w3.org/1998/Math/MathML",Hs="http://www.w3.org/2000/svg",lt="http://www.w3.org/1999/xhtml";let nn=lt,Aa=!1,ja=null;const pf=A({},[Os,Hs,lt],ni);let Fs=A({},["mi","mo","mn","ms","mtext"]),Us=A({},["annotation-xml"]);const mf=A({},["title","style","font","a","script"]);let Gn=null;const gf=["application/xhtml+xml","text/html"],ff="text/html";let te=null,sn=null;const hf=n.createElement("form"),ml=function(g){return g instanceof RegExp||g instanceof Function},Ma=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(sn&&sn===g)){if((!g||typeof g!="object")&&(g={}),g=Ue(g),Gn=gf.indexOf(g.PARSER_MEDIA_TYPE)===-1?ff:g.PARSER_MEDIA_TYPE,te=Gn==="application/xhtml+xml"?ni:es,ne=Me(g,"ALLOWED_TAGS")?A({},g.ALLOWED_TAGS,te):sl,ae=Me(g,"ALLOWED_ATTR")?A({},g.ALLOWED_ATTR,te):il,ja=Me(g,"ALLOWED_NAMESPACES")?A({},g.ALLOWED_NAMESPACES,ni):pf,Ba=Me(g,"ADD_URI_SAFE_ATTR")?A(Ue(pl),g.ADD_URI_SAFE_ATTR,te):pl,dl=Me(g,"ADD_DATA_URI_TAGS")?A(Ue(ul),g.ADD_DATA_URI_TAGS,te):ul,Ye=Me(g,"FORBID_CONTENTS")?A({},g.FORBID_CONTENTS,te):Ca,Un=Me(g,"FORBID_TAGS")?A({},g.FORBID_TAGS,te):Ue({}),Ia=Me(g,"FORBID_ATTR")?A({},g.FORBID_ATTR,te):Ue({}),tn=Me(g,"USE_PROFILES")?g.USE_PROFILES:!1,al=g.ALLOW_ARIA_ATTR!==!1,xa=g.ALLOW_DATA_ATTR!==!1,ol=g.ALLOW_UNKNOWN_PROTOCOLS||!1,rl=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Jt=g.SAFE_FOR_TEMPLATES||!1,Ps=g.SAFE_FOR_XML!==!1,At=g.WHOLE_DOCUMENT||!1,en=g.RETURN_DOM||!1,Ns=g.RETURN_DOM_FRAGMENT||!1,qs=g.RETURN_TRUSTED_TYPE||!1,Sa=g.FORCE_BODY||!1,ll=g.SANITIZE_DOM!==!1,cl=g.SANITIZE_NAMED_PROPS||!1,La=g.KEEP_CONTENT!==!1,zn=g.IN_PLACE||!1,$t=g.ALLOWED_URI_REGEXP||ro,nn=g.NAMESPACE||lt,Fs=g.MATHML_TEXT_INTEGRATION_POINTS||Fs,Us=g.HTML_INTEGRATION_POINTS||Us,Y=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&ml(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Y.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&ml(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Y.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(Y.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Jt&&(xa=!1),Ns&&(en=!0),tn&&(ne=A({},io),ae=[],tn.html===!0&&(A(ne,so),A(ae,ao)),tn.svg===!0&&(A(ne,ii),A(ae,ri),A(ae,ts)),tn.svgFilters===!0&&(A(ne,ai),A(ae,ri),A(ae,ts)),tn.mathMl===!0&&(A(ne,oi),A(ae,oo),A(ae,ts))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?Qt.tagCheck=g.ADD_TAGS:(ne===sl&&(ne=Ue(ne)),A(ne,g.ADD_TAGS,te))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?Qt.attributeCheck=g.ADD_ATTR:(ae===il&&(ae=Ue(ae)),A(ae,g.ADD_ATTR,te))),g.ADD_URI_SAFE_ATTR&&A(Ba,g.ADD_URI_SAFE_ATTR,te),g.FORBID_CONTENTS&&(Ye===Ca&&(Ye=Ue(Ye)),A(Ye,g.FORBID_CONTENTS,te)),g.ADD_FORBID_CONTENTS&&(Ye===Ca&&(Ye=Ue(Ye)),A(Ye,g.ADD_FORBID_CONTENTS,te)),La&&(ne["#text"]=!0),At&&A(ne,["html","head","body"]),ne.table&&(A(ne,["tbody"]),delete Un.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw pn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw pn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=g.TRUSTED_TYPES_POLICY,C=L.createHTML("")}else L===void 0&&(L=Tc(f,i)),L!==null&&typeof C=="string"&&(C=L.createHTML(""));pe&&pe(g),sn=g}},gl=A({},[...ii,...ai,...hc]),fl=A({},[...oi,...vc]),vf=function(g){let k=S(g);(!k||!k.tagName)&&(k={namespaceURI:nn,tagName:"template"});const _=es(g.tagName),W=es(k.tagName);return ja[g.namespaceURI]?g.namespaceURI===Hs?k.namespaceURI===lt?_==="svg":k.namespaceURI===Os?_==="svg"&&(W==="annotation-xml"||Fs[W]):!!gl[_]:g.namespaceURI===Os?k.namespaceURI===lt?_==="math":k.namespaceURI===Hs?_==="math"&&Us[W]:!!fl[_]:g.namespaceURI===lt?k.namespaceURI===Hs&&!Us[W]||k.namespaceURI===Os&&!Fs[W]?!1:!fl[_]&&(mf[_]||!gl[_]):!!(Gn==="application/xhtml+xml"&&ja[g.namespaceURI]):!1},Ze=function(g){dn(t.removed,{element:g});try{S(g).removeChild(g)}catch{E(g)}},jt=function(g,k){try{dn(t.removed,{attribute:k.getAttributeNode(g),from:k})}catch{dn(t.removed,{attribute:null,from:k})}if(k.removeAttribute(g),g==="is")if(en||Ns)try{Ze(k)}catch{}else try{k.setAttribute(g,"")}catch{}},hl=function(g){let k=null,_=null;if(Sa)g="<remove></remove>"+g;else{const Q=si(g,/^[\r\n\t ]+/);_=Q&&Q[0]}Gn==="application/xhtml+xml"&&nn===lt&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");const W=L?L.createHTML(g):g;if(nn===lt)try{k=new u().parseFromString(W,Gn)}catch{}if(!k||!k.documentElement){k=V.createDocument(nn,"template",null);try{k.documentElement.innerHTML=Aa?C:W}catch{}}const ce=k.body||k.documentElement;return g&&_&&ce.insertBefore(n.createTextNode(_),ce.childNodes[0]||null),nn===lt?ie.call(k,At?"html":"body")[0]:At?k.documentElement:ce},vl=function(g){return O.call(g.ownerDocument||g,g,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},Da=function(g){return g instanceof h&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof c)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},bl=function(g){return typeof r=="function"&&g instanceof r};function ct(I,g,k){Jn(I,_=>{_.call(t,g,k,sn)})}const yl=function(g){let k=null;if(ct(P.beforeSanitizeElements,g,null),Da(g))return Ze(g),!0;const _=te(g.nodeName);if(ct(P.uponSanitizeElement,g,{tagName:_,allowedTags:ne}),Ps&&g.hasChildNodes()&&!bl(g.firstElementChild)&&me(/<[/\w!]/g,g.innerHTML)&&me(/<[/\w!]/g,g.textContent)||g.nodeType===gn.progressingInstruction||Ps&&g.nodeType===gn.comment&&me(/<[/\w]/g,g.data))return Ze(g),!0;if(!(Qt.tagCheck instanceof Function&&Qt.tagCheck(_))&&(!ne[_]||Un[_])){if(!Un[_]&&$l(_)&&(Y.tagNameCheck instanceof RegExp&&me(Y.tagNameCheck,_)||Y.tagNameCheck instanceof Function&&Y.tagNameCheck(_)))return!1;if(La&&!Ye[_]){const W=S(g)||g.parentNode,ce=B(g)||g.childNodes;if(ce&&W){const Q=ce.length;for(let Ee=Q-1;Ee>=0;--Ee){const dt=$(ce[Ee],!0);dt.__removalCount=(g.__removalCount||0)+1,W.insertBefore(dt,T(g))}}}return Ze(g),!0}return g instanceof d&&!vf(g)||(_==="noscript"||_==="noembed"||_==="noframes")&&me(/<\/no(script|embed|frames)/i,g.innerHTML)?(Ze(g),!0):(Jt&&g.nodeType===gn.text&&(k=g.textContent,Jn([be,le,Le],W=>{k=un(k,W," ")}),g.textContent!==k&&(dn(t.removed,{element:g.cloneNode()}),g.textContent=k)),ct(P.afterSanitizeElements,g,null),!1)},wl=function(g,k,_){if(ll&&(k==="id"||k==="name")&&(_ in n||_ in hf))return!1;if(!(xa&&!Ia[k]&&me(Ae,k))){if(!(al&&me(_a,k))){if(!(Qt.attributeCheck instanceof Function&&Qt.attributeCheck(k,g))){if(!ae[k]||Ia[k]){if(!($l(g)&&(Y.tagNameCheck instanceof RegExp&&me(Y.tagNameCheck,g)||Y.tagNameCheck instanceof Function&&Y.tagNameCheck(g))&&(Y.attributeNameCheck instanceof RegExp&&me(Y.attributeNameCheck,k)||Y.attributeNameCheck instanceof Function&&Y.attributeNameCheck(k,g))||k==="is"&&Y.allowCustomizedBuiltInElements&&(Y.tagNameCheck instanceof RegExp&&me(Y.tagNameCheck,_)||Y.tagNameCheck instanceof Function&&Y.tagNameCheck(_))))return!1}else if(!Ba[k]){if(!me($t,un(_,je,""))){if(!((k==="src"||k==="xlink:href"||k==="href")&&g!=="script"&&pc(_,"data:")===0&&dl[g])){if(!(ol&&!me(w,un(_,je,"")))){if(_)return!1}}}}}}}return!0},$l=function(g){return g!=="annotation-xml"&&si(g,ee)},kl=function(g){ct(P.beforeSanitizeAttributes,g,null);const{attributes:k}=g;if(!k||Da(g))return;const _={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ae,forceKeepAttr:void 0};let W=k.length;for(;W--;){const ce=k[W],{name:Q,namespaceURI:Ee,value:dt}=ce,an=te(Q),Ra=dt;let oe=Q==="value"?Ra:mc(Ra);if(_.attrName=an,_.attrValue=oe,_.keepAttr=!0,_.forceKeepAttr=void 0,ct(P.uponSanitizeAttribute,g,_),oe=_.attrValue,cl&&(an==="id"||an==="name")&&(jt(Q,g),oe=uf+oe),Ps&&me(/((--!?|])>)|<\/(style|title|textarea)/i,oe)){jt(Q,g);continue}if(an==="attributename"&&si(oe,"href")){jt(Q,g);continue}if(_.forceKeepAttr)continue;if(!_.keepAttr){jt(Q,g);continue}if(!rl&&me(/\/>/i,oe)){jt(Q,g);continue}Jt&&Jn([be,le,Le],_l=>{oe=un(oe,_l," ")});const El=te(g.nodeName);if(!wl(El,an,oe)){jt(Q,g);continue}if(L&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!Ee)switch(f.getAttributeType(El,an)){case"TrustedHTML":{oe=L.createHTML(oe);break}case"TrustedScriptURL":{oe=L.createScriptURL(oe);break}}if(oe!==Ra)try{Ee?g.setAttributeNS(Ee,Q,oe):g.setAttribute(Q,oe),Da(g)?Ze(g):no(t.removed)}catch{jt(Q,g)}}ct(P.afterSanitizeAttributes,g,null)},bf=function I(g){let k=null;const _=vl(g);for(ct(P.beforeSanitizeShadowDOM,g,null);k=_.nextNode();)ct(P.uponSanitizeShadowNode,k,null),yl(k),kl(k),k.content instanceof a&&I(k.content);ct(P.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(I){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},k=null,_=null,W=null,ce=null;if(Aa=!I,Aa&&(I="<!-->"),typeof I!="string"&&!bl(I))if(typeof I.toString=="function"){if(I=I.toString(),typeof I!="string")throw pn("dirty is not a string, aborting")}else throw pn("toString is not a function");if(!t.isSupported)return I;if(Ta||Ma(g),t.removed=[],typeof I=="string"&&(zn=!1),zn){if(I.nodeName){const dt=te(I.nodeName);if(!ne[dt]||Un[dt])throw pn("root node is forbidden and cannot be sanitized in-place")}}else if(I instanceof r)k=hl("<!---->"),_=k.ownerDocument.importNode(I,!0),_.nodeType===gn.element&&_.nodeName==="BODY"||_.nodeName==="HTML"?k=_:k.appendChild(_);else{if(!en&&!Jt&&!At&&I.indexOf("<")===-1)return L&&qs?L.createHTML(I):I;if(k=hl(I),!k)return en?null:qs?C:""}k&&Sa&&Ze(k.firstChild);const Q=vl(zn?I:k);for(;W=Q.nextNode();)yl(W),kl(W),W.content instanceof a&&bf(W.content);if(zn)return I;if(en){if(Ns)for(ce=J.call(k.ownerDocument);k.firstChild;)ce.appendChild(k.firstChild);else ce=k;return(ae.shadowroot||ae.shadowrootmode)&&(ce=X.call(s,ce,!0)),ce}let Ee=At?k.outerHTML:k.innerHTML;return At&&ne["!doctype"]&&k.ownerDocument&&k.ownerDocument.doctype&&k.ownerDocument.doctype.name&&me(lo,k.ownerDocument.doctype.name)&&(Ee="<!DOCTYPE "+k.ownerDocument.doctype.name+`>
`+Ee),Jt&&Jn([be,le,Le],dt=>{Ee=un(Ee,dt," ")}),L&&qs?L.createHTML(Ee):Ee},t.setConfig=function(){let I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ma(I),Ta=!0},t.clearConfig=function(){sn=null,Ta=!1},t.isValidAttribute=function(I,g,k){sn||Ma({});const _=te(I),W=te(g);return wl(_,W,k)},t.addHook=function(I,g){typeof g=="function"&&dn(P[I],g)},t.removeHook=function(I,g){if(g!==void 0){const k=dc(P[I],g);return k===-1?void 0:uc(P[I],k,1)[0]}return no(P[I])},t.removeHooks=function(I){P[I]=[]},t.removeAllHooks=function(){P=uo()},t}var mo=po();const li="chaotic_";function De(e){try{return localStorage.getItem(li+e)}catch{return null}}function Re(e,t){try{localStorage.setItem(li+e,t)}catch{}}function et(e){try{localStorage.removeItem(li+e)}catch{}}function Sc(){return De("token")}function Lc(e){e?Re("token",e):et("token")}function Cc(){return De("theme")}function Bc(e){Re("theme",e)}function Ac(){return De("last_project")}function go(e){Re("last_project",e)}function jc(){return De("onboarding_complete")==="true"}function Mc(){Re("onboarding_complete","true")}function Dc(){et("onboarding_complete")}function Rc(e){return e?De(`issues_filters_${e}`):null}function Pc(e,t){e&&(t?Re(`issues_filters_${e}`,t):et(`issues_filters_${e}`))}function Nc(e){return De(`comment_draft_${e}`)}function ci(e,t){t?Re(`comment_draft_${e}`,t):et(`comment_draft_${e}`)}function qc(e){return De(`description_draft_${e}`)}function ns(e,t){t?Re(`description_draft_${e}`,t):et(`description_draft_${e}`)}function Oc(){return{title:De("create_issue_title"),description:De("create_issue_description")}}function fo(e,t){e?Re("create_issue_title",e):et("create_issue_title"),t?Re("create_issue_description",t):et("create_issue_description")}function Hc(){et("create_issue_title"),et("create_issue_description")}function Fc(){return De("doc_view_mode")}function Uc(e){Re("doc_view_mode",e)}function zc(){return De("approvals_explainer_dismissed")==="1"}function Gc(){Re("approvals_explainer_dismissed","1")}const Wc="/api";class Vc{constructor(){this.token=Sc()}setToken(t){this.token=t,Lc(t)}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const o=await fetch(`${Wc}${n}`,a);if(o.status===204)return null;let r;try{r=await o.json()}catch{const d=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${d})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let d;typeof r.detail=="string"?d=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?d=r.detail.message:d="An error occurred";const l=new Error(d);throw l.status=o.status,l.detail=r.detail,l}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20){return this.request("GET",`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const b=new Vc;let Mt=null;function N(){document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function D(){var e;ut(),document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide")}function ss(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function v(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.classList.add("toast-exit"),s.addEventListener("animationend",()=>s.remove(),{once:!0}),setTimeout(()=>{s.parentNode&&s.remove()},500)},3e3)}function ut(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Mt&&(document.removeEventListener("keydown",Mt),Mt=null)}function fn(e){Mt&&document.removeEventListener("keydown",Mt),Mt=e,e&&document.addEventListener("keydown",e)}function hn(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(ut(),document.removeEventListener("click",s,!0))};return setTimeout(()=>document.addEventListener("click",s,!0),0),()=>document.removeEventListener("click",s,!0)}function ye(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function we(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function di(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function z(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,s]=e;return`#${t}${t}${n}${n}${s}${s}`}return e}function m(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function p(e){return m(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function ze(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function tt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function Kc(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Dt(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",s=e==null?void 0:e.avatar_url;return s?Kc(s)?`<img class="${t} avatar-img" src="${p(s)}" alt="${p(n)}">`:`<div class="${t} avatar-emoji">${m(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}let se={...{currentUser:null,currentView:"my-issues",issues:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null,currentTeam:null,currentDetailIssue:null,currentDetailSprints:null}};const Yc=new Set;function _e(e,t){if(typeof e=="string"){const n=se[e];se[e]=t,ho(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=se[s];se[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{ho(s,i,a)})}}function ho(e,t,n){t!==n&&Yc.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const vn=()=>se.currentUser,is=e=>_e("currentUser",e),j=()=>se.currentView,Zc=e=>_e("currentView",e),$e=()=>se.issues,Ge=e=>_e("issues",e),vo=()=>se.labels,as=e=>_e("labels",e),bo=()=>se.activeFilterCategory,Xc=e=>_e("activeFilterCategory",e),Qc=()=>se.selectedIssueIndex,yo=e=>_e("selectedIssueIndex",e),Jc=()=>se.selectedDocIndex,wo=e=>_e("selectedDocIndex",e),ed=()=>se.pendingGates,td=e=>_e("pendingGates",e),nd=()=>se.searchDebounceTimer,sd=e=>_e("searchDebounceTimer",e),id=()=>se.websocket,$o=e=>_e("websocket",e),x=()=>se.currentTeam,ui=e=>_e("currentTeam",e),fe=()=>se.currentDetailIssue,os=e=>_e("currentDetailIssue",e),ad=()=>se.currentDetailSprints,ko=e=>_e("currentDetailSprints",e),pi={};function Z(e){Object.assign(pi,e)}function od(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}const s=t.dataset.action,i=pi[s];if(!i){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${s}"`);return}i(e,t.dataset,t)}let Eo=!1;function rd(){if(!Eo){Eo=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,od);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=pi[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const mi=["backlog","todo","in_progress","in_review","done","canceled"],Rt=["backlog","todo","in_progress","in_review"],_o=["urgent","high","medium","low","no_priority"],gi=["no_priority","urgent","high","medium","low"],Io=["backlog","todo","in_progress","in_review","done"];let bn=[];function ld(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function cd(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function rs(e,t){const n=e().map(ld),s=t().map(cd);bn=[...n,...s]}function yn(e){return e&&bn.find(t=>t.id===e)||null}function _t(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function fi(e,t=!1){const n=m(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${m(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function ls(){const e=bn.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));bn.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,d)=>r.name.localeCompare(d.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=bn.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function cs(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;ls().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${fi(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}const xo=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let pt=[],hi=null;function vi(){const e=document.getElementById("board-project-filter");if(!e)return;const t=U();if(e.innerHTML='<option value="">Select Project</option>'+t.map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join(""),!e.value){const n=Vt();n&&t.some(s=>s.id===n)&&(e.value=n)}if(e.value)To(e.value);else{const n=document.getElementById("kanban-board");n&&(n.innerHTML=`
                <div class="empty-state" style="width: 100%; padding: 3rem;">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its board</p>
                </div>
            `)}}function dd(){var t;const e=(t=document.getElementById("board-project-filter"))==null?void 0:t.value;e&&(Gt(e),Zi(e)),To(e)}async function To(e){var s;const t=e||((s=document.getElementById("board-project-filter"))==null?void 0:s.value);if(!t){vi();return}const n=document.getElementById("kanban-board");n&&(n.innerHTML='<div class="loading-spinner" style="margin: 2rem auto;"></div>');try{pt=await b.getIssues({project_id:t}),mt()}catch(i){v(`Failed to load board: ${i.message}`,"error")}}function mt(){const e=document.getElementById("kanban-board");e&&(e.innerHTML=xo.map(t=>{const n=pt.filter(s=>s.status===t.key);return`
            <div class="kanban-column" data-action="board-column" data-status="${t.key}">
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
                        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${p(s.id)}" data-identifier="${p(s.identifier)}">
                            <div class="kanban-card-title">${m(s.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${s.identifier}</span>
                                <span class="badge badge-priority-${s.priority}" style="font-size: 10px;">${we(s.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""))}function ud(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),hi=t.dataset.id,t.classList.add("dragging")}function pd(e,t){t.classList.remove("dragging"),hi=null}function md(e,t){e.preventDefault(),t.classList.add("drag-over")}function gd(e,t){t.classList.remove("drag-over")}function fd(e,t){e.preventDefault(),t.classList.add("drag-over")}function hd(e,t){t.classList.remove("drag-over")}async function vd(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),s=t.dataset.status,i=pt.find(o=>o.id===n);if(!i)return;const a=i.status;if(i.status=s,So(s,n),mt(),a!==s)try{await b.updateIssue(n,{status:s}),v("Status updated","success")}catch(o){i.status=a,mt(),v(`Failed to update status: ${o.message}`,"error")}}async function bd(e,t){e.preventDefault(),e.stopPropagation(),t.classList.remove("drag-over");const n=hi||e.dataTransfer.getData("text/plain"),s=t.dataset.id;if(!n||!s||n===s)return;const i=t.closest(".kanban-column"),a=i==null?void 0:i.dataset.status;if(!a)return;const o=pt.find(d=>d.id===n);if(!o)return;const r=o.status;if(o.status=a,So(a,n,s),mt(),r!==a)try{await b.updateIssue(n,{status:a}),v("Status updated","success")}catch(d){o.status=r,mt(),v(`Failed to update status: ${d.message}`,"error")}}function So(e,t,n=null){const s=pt.filter(o=>o.status===e&&o.id!==t),i=pt.find(o=>o.id===t);if(!i)return;if(n){const o=s.findIndex(r=>r.id===n);o>=0?s.splice(o,0,i):s.push(i)}else s.push(i);const a=[];xo.forEach(o=>{o.key===e?a.push(...s):a.push(...pt.filter(r=>r.status===o.key))}),pt=a}Z({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),F(t.id)):e.type==="dragstart"?ud(e,n):e.type==="dragend"?pd(e,n):e.type==="dragover"?fd(e,n):e.type==="dragleave"?hd(e,n):e.type==="drop"&&bd(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?md(e,n):e.type==="dragleave"?gd(e,n):e.type==="drop"&&vd(e,n)}});function bi(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Lo)},0))}function Lo(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Lo))}function It(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function xt(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Tt(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function ds(){const e=It(),n=document.getElementById("status-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=ye(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`,Pe(),Te(),Se()}function yi(){document.getElementById("status-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),ds()}function wi(){const e=xt(),n=document.getElementById("priority-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=we(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`,Pe(),Te(),Se()}function $i(){document.getElementById("priority-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),wi()}function ki(){var s,i;const e=Tt(),t=document.getElementById("label-filter-dropdown"),n=t.querySelector(".multi-select-label");if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`;Pe(),Te(),Se()}function us(){document.getElementById("label-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),ki()}function Co(){var s,i;const e=Tt(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}async function yd(){const e=document.getElementById("label-filter-dropdown");if(!e||!x())return;const t=e.querySelector(".multi-select-options");try{const n=await b.getLabels(x().id);t.innerHTML="",n.length===0?t.innerHTML='<div class="multi-select-empty">No labels available</div>':n.forEach(i=>{const a=document.createElement("label");a.className="multi-select-option",a.innerHTML=`
                    <input type="checkbox" value="${i.id}" data-action="update-label-filter">
                    <span class="label-badge" style="background: ${z(i.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                        <span class="label-name">${m(i.name)}</span>
                    </span>
                `,t.appendChild(a)});const s=document.createElement("div");s.className="multi-select-actions",s.innerHTML='<button type="button" class="btn btn-small" data-action="clear-label-filter">Clear</button>',t.appendChild(s)}catch(n){console.error("Failed to load labels for filter:",n)}}function Bo(){var h,u,f,y,$,E;const e=new URLSearchParams,t=It(),n=xt(),s=Tt(),i=(h=document.getElementById("assignee-filter"))==null?void 0:h.value,a=(u=document.getElementById("project-filter"))==null?void 0:u.value,o=(f=document.getElementById("sprint-filter"))==null?void 0:f.value,r=(y=document.getElementById("issue-type-filter"))==null?void 0:y.value,d=($=document.getElementById("group-by-select"))==null?void 0:$.value;t.forEach(T=>e.append("status",T)),n.forEach(T=>e.append("priority",T)),s.forEach(T=>e.append("label",T)),i&&e.set("assignee",i),a&&e.set("project",a),o&&e.set("sprint",o),r&&e.set("issue_type",r),d&&e.set("groupBy",d);const l=e.toString(),c=l?`/issues?${l}`:"/issues";history.replaceState({view:"issues"},"",c),Pc((E=x())==null?void 0:E.id,l)}function wd(){var h;let e=new URLSearchParams(window.location.search);if(!["status","priority","label","assignee","sprint","issue_type","groupBy"].some(u=>e.has(u))){const u=Rc((h=x())==null?void 0:h.id);if(u){const f=new URLSearchParams(u),y=e.get("project");e=f,y&&e.set("project",y);const $=`/issues?${e.toString()}`;history.replaceState({view:"issues"},"",$)}}const s=e.getAll("status");if(s.length>0){const u=document.getElementById("status-filter-dropdown");u&&(u.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.checked=s.includes(y.value)}),$d())}const i=e.getAll("priority");if(i.length>0){const u=document.getElementById("priority-filter-dropdown");u&&(u.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.checked=i.includes(y.value)}),kd())}const a=e.get("assignee");if(a){const u=document.getElementById("assignee-filter");u&&(u.value=a)}const o=e.get("project");if(o){const u=document.getElementById("project-filter");u&&(u.value=o)}const r=e.get("sprint");if(r){const u=document.getElementById("sprint-filter");u&&(u.value=r)}const d=e.get("issue_type");if(d){const u=document.getElementById("issue-type-filter");u&&(u.value=d)}const l=e.getAll("label");if(l.length>0){const u=document.getElementById("label-filter-dropdown");u&&(u.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.checked=l.includes(y.value)}),Co())}const c=e.get("groupBy");if(c){const u=document.getElementById("group-by-select");u&&(u.value=c)}}function $d(){const e=It(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=ye(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function kd(){const e=xt(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=we(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}const Ao=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"}];function Ed(e){e.stopPropagation();const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Pt)):(t.classList.remove("hidden"),Ie(),xe(bo()),setTimeout(()=>{document.addEventListener("click",Pt)},0))}function _d(e){e.stopPropagation();const t=document.getElementById("display-menu-dropdown"),n=document.getElementById("filter-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Pt)):(t.classList.remove("hidden"),zd(),setTimeout(()=>{document.addEventListener("click",Pt)},0))}function Pt(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");!e.target.closest(".filter-menu-container")&&!e.target.closest(".display-menu-container")&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Pt))}function jo(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Pt)}function Mo(e){var t,n,s,i;switch(e){case"project":return(t=document.getElementById("project-filter"))!=null&&t.value?1:0;case"status":return It().length;case"priority":return xt().length;case"type":return(n=document.getElementById("issue-type-filter"))!=null&&n.value?1:0;case"assignee":return(s=document.getElementById("assignee-filter"))!=null&&s.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Tt().length;default:return 0}}function Id(){let e=0;return Ao.forEach(t=>{e+=Mo(t.key)}),e}function Ie(){var n;const e=document.getElementById("filter-menu-categories");if(!e)return;const t=(n=document.getElementById("project-filter"))==null?void 0:n.value;e.innerHTML=Ao.map(s=>{const i=Mo(s.key),a=bo()===s.key,o=s.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${a?"active":""} ${o?"disabled":""}"
                 data-action="show-filter-category" data-category="${p(s.key)}">
                <span>${s.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:'<span class="filter-menu-category-arrow">→</span>'}
            </div>
        `}).join("")}function xe(e){Xc(e),Ie();const t=document.getElementById("filter-menu-options");if(t)switch(e){case"project":xd(t);break;case"status":Td(t);break;case"priority":Sd(t);break;case"type":Ld(t);break;case"assignee":Cd(t);break;case"sprint":Bd(t);break;case"labels":Ad(t);break}}function xd(e){const t=document.getElementById("project-filter"),n=(t==null?void 0:t.value)||"",s=U()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${n?'<button class="filter-options-clear" data-action="set-project-filter" data-value="">Clear</button>':""}
        </div>
        <label class="filter-option" data-action="set-project-filter" data-value="">
            <input type="radio" name="project-filter-radio" value="" ${n?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" data-action="set-project-filter" data-value="${p(a.id)}">
                <input type="radio" name="project-filter-radio" value="${p(a.id)}" ${n===a.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${z(a.color)};"></span>
                <span class="filter-option-label">${m(a.name)}</span>
            </label>
        `}),e.innerHTML=i}const ps=["done","canceled"];function Td(e){const t=It(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],s=Rt.every(o=>t.includes(o))&&!ps.some(o=>t.includes(o))&&t.length===Rt.length,i=ps.every(o=>t.includes(o))&&!Rt.some(o=>t.includes(o))&&t.length===ps.length;let a=`
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
        `}),e.innerHTML=a}function Sd(e){const t=xt(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
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
        `}),e.innerHTML=s}function Ld(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${p(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function Cd(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=Bt()||[];let i=`
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
                <span class="filter-option-label">${m(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function Bd(e){var o;if(!((o=document.getElementById("project-filter"))==null?void 0:o.value)){e.innerHTML=`
            <div class="filter-options-header">
                <span class="filter-options-title">Sprint</span>
            </div>
            <div class="filter-options-empty">Select a project first</div>
        `;return}const n=document.getElementById("sprint-filter"),s=(n==null?void 0:n.value)||"",i=n?Array.from(n.options):[];let a=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${s?'<button class="filter-options-clear" data-action="set-sprint-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(r=>{a+=`
            <label class="filter-option" data-action="set-sprint-filter" data-value="${p(r.value)}">
                <input type="radio" name="sprint-filter-radio" value="${p(r.value)}" ${s===r.value?"checked":""}>
                <span class="filter-option-label">${m(r.text)}</span>
            </label>
        `}),e.innerHTML=a}function Ad(e){const t=Tt(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),d=o==null?void 0:o.querySelector(".label-badge"),l=(r==null?void 0:r.textContent)||"Label",c=(d==null?void 0:d.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${z(c)};"></span>
                    <span class="filter-option-label">${m(l)}</span>
                </label>
            `}),e.innerHTML=i}function Do(e){const t=document.getElementById("project-filter");t&&(t.value=e,Oo()),Ie(),xe("project"),Te(),Se()}function jd(){Do("")}function Md(e){const t=e==="open"?Rt:ps,n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),ds(),Ie(),xe("status")}function Dd(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,ds()),Ie(),xe("status")}function Rd(){yi(),Ie(),xe("status"),Te(),Se()}function Pd(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,wi()),Ie(),xe("priority")}function Nd(){$i(),Ie(),xe("priority"),Te(),Se()}function Ro(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Pe()),Ie(),xe("type"),Te(),Se()}function qd(){Ro("")}function Po(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Pe()),Ie(),xe("assignee"),Te(),Se()}function Od(){Po("")}function No(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Pe()),Ie(),xe("sprint"),Te(),Se()}function Hd(){No("")}function Fd(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,ki()),Ie(),xe("labels")}function Ud(){us(),Ie(),xe("labels"),Te(),Se()}function zd(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function Gd(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,St()),jo()}function Wd(e){const t=document.getElementById("group-by-select");t&&(t.value=e,Ho()),jo()}function Te(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=document.getElementById("project-filter");if(n!=null&&n.value){const h=(U()||[]).find(u=>u.id===n.value);t.push({category:"project",label:"Project",value:(h==null?void 0:h.name)||"Unknown",clearAction:"clear-project-filter"})}const s=It();if(s.length>0){const c=s.map(h=>ye(h)).join(", ");t.push({category:"status",label:"Status",value:c,clearAction:"clear-status-filter-new"})}const i=xt();if(i.length>0){const c=i.map(h=>we(h)).join(", ");t.push({category:"priority",label:"Priority",value:c,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const c=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:c?c.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let c;if(o.value==="me")c="Me";else if(o.value==="unassigned")c="Unassigned";else{const u=(Bt()||[]).find(f=>f.user_id===o.value);c=(u==null?void 0:u.name)||(u==null?void 0:u.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:c,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const c=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(c==null?void 0:c.text)||r.value,clearAction:"clear-sprint-filter"})}const d=Tt();if(d.length>0){const c=document.getElementById("label-filter-dropdown"),h=d.map(u=>{var $;const f=c==null?void 0:c.querySelector(`input[value="${u}"]`),y=($=f==null?void 0:f.closest("label"))==null?void 0:$.querySelector(".label-name");return(y==null?void 0:y.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:h,clearAction:"clear-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let l=t.map(c=>`
        <span class="filter-chip">
            <span class="filter-chip-label">${c.label}:</span>
            <span class="filter-chip-value">${m(c.value)}</span>
            <button class="filter-chip-remove" data-action="${c.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(l+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=l}function Vd(){const e=document.getElementById("project-filter");e&&(e.value=""),yi(),$i();const t=document.getElementById("issue-type-filter");t&&(t.value="");const n=document.getElementById("assignee-filter");n&&(n.value="");const s=document.getElementById("sprint-filter");s&&(s.value=""),us(),Pe(),Te(),Se()}function Se(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Id();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}function Kd(){Te(),Se()}async function qo(){var i;const e=document.getElementById("sprint-filter");if(!e)return;const t=(i=document.getElementById("project-filter"))==null?void 0:i.value,n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",Ei(null);return}let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const a=await b.getSprints(t),o=a.find(r=>r.status==="active");o&&(s+=`<option value="current">Current Sprint (${m(o.name)})</option>`),Ei(o||null),a.forEach(r=>{const d=r.status==="active"?" (Active)":r.status==="completed"?" (Done)":"";s+=`<option value="${r.id}">${m(r.name)}${d}</option>`})}catch(a){console.error("Failed to load sprints:",a)}e.innerHTML=s,n&&Array.from(e.options).some(o=>o.value===n)&&(e.value=n)}function Ei(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${m(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${m(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}async function St(){var h,u,f,y,$,E,T;if(yo(-1),!x())return;const e=document.getElementById("project-filter").value,t=It(),n=xt(),s=(h=document.getElementById("assignee-filter"))==null?void 0:h.value,i=(f=(u=document.getElementById("issue-search"))==null?void 0:u.value)==null?void 0:f.trim();if(!e&&U().length===0){document.getElementById("issues-list").innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create a project first to add issues</p>
            </div>
        `;return}Zd();const a={limit:1e3},o=((y=document.getElementById("sort-by-select"))==null?void 0:y.value)||"created-desc",[r,d]=o.includes("-")?o.split("-"):[o,null];a.sort_by=r,d&&(a.order=d),t.length>0&&(a.status=t),n.length>0&&(a.priority=n),s&&(s==="me"?a.assignee_id=($=vn())==null?void 0:$.id:a.assignee_id=s);const l=(E=document.getElementById("sprint-filter"))==null?void 0:E.value;if(l)if(l==="current"){if(e)try{const S=(await b.getSprints(e)).find(L=>L.status==="active");S&&(a.sprint_id=S.id)}catch(B){console.error("Failed to resolve current sprint:",B)}}else a.sprint_id=l;const c=(T=document.getElementById("issue-type-filter"))==null?void 0:T.value;c&&(a.issue_type=c),i&&i.length>=2&&(a.search=i);try{let B;e?(a.project_id=e,B=await b.getIssues(a)):U().length>0&&(B=await b.getTeamIssues(x().id,a));const S=Tt();S.length>0&&(B=B.filter(C=>!C.labels||C.labels.length===0?!1:C.labels.some(V=>S.includes(V.id)))),Ge(B);const L=[...new Set(B.map(C=>C.project_id))];await hr(L),nt()}catch(B){v(B.message,"error")}}function Yd(){clearTimeout(nd()),sd(setTimeout(()=>{St()},300))}function Zd(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}function Pe(){Bo(),St()}async function Oo(){var n;const e=(n=document.getElementById("project-filter"))==null?void 0:n.value;e&&Gt(e);const t=document.getElementById("sprint-filter");t&&(t.value=""),await qo(),vi(),gr(),Pe(),Te(),Se()}async function Ho(){if(Bo(),Fo()==="sprint"){const e=$e(),t=[...new Set(e.map(n=>n.project_id))];await hr(t)}nt()}function Fo(){const e=document.getElementById("group-by-select");return e?e.value:""}Z({"update-label-filter":()=>ki(),"clear-label-filter":()=>us(),"show-filter-category":(e,t)=>xe(t.category),"set-project-filter":(e,t)=>Do(t.value),"clear-project-filter":()=>jd(),"clear-status-filter-new":()=>Rd(),"set-status-preset":(e,t)=>Md(t.value),"toggle-status-option":(e,t)=>Dd(t.filterValue,e),"clear-priority-filter-new":()=>Nd(),"toggle-priority-option":(e,t)=>Pd(t.filterValue,e),"set-type-filter":(e,t)=>Ro(t.value),"clear-type-filter":()=>qd(),"set-assignee-filter":(e,t)=>Po(t.value),"clear-assignee-filter":()=>Od(),"set-sprint-filter":(e,t)=>No(t.value),"clear-sprint-filter":()=>Hd(),"clear-label-filter-new":()=>Ud(),"toggle-label-option":(e,t)=>Fd(t.filterValue,e),"set-sort":(e,t)=>Gd(t.value),"set-group-by":(e,t)=>Wd(t.value),"clear-all-filters":()=>Vd()});let wn=[],_i=[];function gt(){return wn}function Nt(e){wn=e}async function Ii(){var i,a;const e=x(),t=vn();if(!e||!t)return;const n=(i=document.getElementById("my-issues-status-filter"))==null?void 0:i.value,s=(a=document.getElementById("dashboard-project-filter"))==null?void 0:a.value;Qd();try{const o={assignee_id:t.id,status:n||void 0,limit:1e3};let r;s?r=await b.getIssues({...o,project_id:s}):r=await b.getTeamIssues(e.id,o),wn=r,$n()}catch(o){v(o.message,"error")}}async function qt({showLoading:e=!0}={}){const t=x();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{_i=await b.getTeamActivities(t.id,0,10),Xd()}catch{n&&(n.innerHTML='<div class="activity-empty">Failed to load activity</div>')}}function Xd(){const e=document.getElementById("dashboard-activity-list");if(e){if(!_i.length){e.innerHTML='<div class="activity-empty">No recent activity. Create or update issues to see activity here.</div>';return}e.innerHTML=_i.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${p(t.issue_identifier)}"><strong>${m(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${p(t.document_id)}"><strong>${s} ${m(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${m(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${Bi(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${ji(t)}${n}</span>
                <span class="activity-actor">by ${m(Ai(t))}</span>
                <span class="activity-time">${ze(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function Qd(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function xi(){Ii()}function $n(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),wn.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues assigned to you</h3>
                <p>Issues assigned to you will appear here</p>
            </div>
        `;return}e.innerHTML=wn.map(t=>Ne(t)).join("")}}Z({"filter-my-issues":()=>xi(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),jr(t.identifier)}});const Uo=mi,Jd=["task","bug","feature","chore","docs","tech_debt","epic"];let We=[],zo=Promise.resolve();function Go(){return We}function Wo(e){We=e}async function Vo(e,t,n,s){var h,u;e.preventDefault(),ut();const a=(s||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Uo.map((f,y)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="status" data-value="${f}">
                    ${he(f)}
                    <span>${ye(f)}</span>
                    <span class="dropdown-shortcut">${y+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${gi.map((f,y)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="priority" data-value="${f}">
                    ${Ve(f)}
                    <span>${we(f)}</span>
                    <span class="dropdown-shortcut">${y}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Jd.map(f=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="issue_type" data-value="${f}">
                    <span class="issue-type-badge type-${f}">${tt(f)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const f=ls();o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${f.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:f.map(({assignee:y,indent:$},E)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="${p(y.id)}">
                    ${Dt(y,"avatar-small")}
                    <span>${fi(y,$)}</span>
                    ${E<9?`<span class="dropdown-shortcut">${E+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const f=document.querySelector(`.issue-row[data-issue-id="${n}"]`),y=(f==null?void 0:f.dataset.projectId)||((h=fe())==null?void 0:h.project_id),$=Ln(y);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${$.map((E,T)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="estimate" data-value="${E.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${E.label}</span>
                    ${T<9?`<span class="dropdown-shortcut">${T}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const f=$e(),y=gt(),$=fe(),E=f.find(X=>X.id===n)||y.find(X=>X.id===n)||$,T=new Set(((E==null?void 0:E.labels)||[]).map(X=>X.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const B=o.getBoundingClientRect();let S=a.bottom+4,L=a.left;L+B.width>window.innerWidth-8&&(L=a.right-B.width),S+B.height>window.innerHeight-8&&(S=a.top-B.height-4),o.style.top=`${S}px`,o.style.left=`${Math.max(8,L)}px`,hn(o,{multiSelect:!0});let C=[];const V=x();if(V)try{C=await b.getLabels(V.id)}catch(X){console.error("Failed to load labels:",X)}if(!o.parentNode)return;Yo(o,n,C,T);const O=o.getBoundingClientRect();let J=a.bottom+4,ie=a.left;ie+O.width>window.innerWidth-8&&(ie=a.right-O.width),J+O.height>window.innerHeight-8&&(J=a.top-O.height-4),o.style.top=`${J}px`,o.style.left=`${Math.max(8,ie)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const f=$e(),y=gt(),$=fe(),E=f.find(P=>P.id===n)||y.find(P=>P.id===n)||$,T=(E==null?void 0:E.project_id)||((u=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:u.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const B=o.getBoundingClientRect();let S=a.bottom+4,L=a.left;L+B.width>window.innerWidth-8&&(L=a.right-B.width),S+B.height>window.innerHeight-8&&(S=a.top-B.height-4),o.style.top=`${S}px`,o.style.left=`${Math.max(8,L)}px`,hn(o);let C=[];if(T)try{C=await b.getSprints(T),Sp(T,C)}catch(P){console.error("Failed to load sprints:",P)}if(!o.parentNode)return;const V=C.filter(P=>P.status!=="completed"||P.id===(E==null?void 0:E.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${V.map((P,be)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="${p(P.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${m(P.name)}${P.status==="active"?" (Active)":""}</span>
                    ${be<9?`<span class="dropdown-shortcut">${be+1}</span>`:""}
                </button>
            `).join("")}
        `;const O=o.getBoundingClientRect();let J=a.bottom+4,ie=a.left;ie+O.width>window.innerWidth-8&&(ie=a.right-O.width),J+O.height>window.innerHeight-8&&(J=a.top-O.height-4),o.style.top=`${J}px`,o.style.left=`${Math.max(8,ie)}px`,o.classList.remove("dropdown-positioning");const X=P=>{const be=P.key;if(be==="Escape"){ut(),document.removeEventListener("keydown",X),fn(null);return}const le=parseInt(be);if(isNaN(le))return;const Le=o.querySelectorAll(".dropdown-option");let Ae=!1;le===0?(Ot(n,"sprint_id",null),Ae=!0):le>=1&&le<Le.length&&(Le[le].click(),Ae=!0),Ae&&(document.removeEventListener("keydown",X),fn(null))};fn(X),document.addEventListener("keydown",X);return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let d=a.bottom+4,l=a.left;l+r.width>window.innerWidth-8&&(l=a.right-r.width),d+r.height>window.innerHeight-8&&(d=a.top-r.height-4),o.style.top=`${d}px`,o.style.left=`${Math.max(8,l)}px`,o.classList.remove("dropdown-positioning");const c=f=>{const y=f.key;if(y==="Escape"){ut(),document.removeEventListener("keydown",c);return}const $=parseInt(y);if(isNaN($))return;let E=!1;if(t==="status"&&$>=1&&$<=6)Ot(n,"status",Uo[$-1]),E=!0;else if(t==="priority"&&$>=0&&$<=4)Ot(n,"priority",gi[$]),E=!0;else if(t==="estimate"){const T=fe(),B=Ln(T==null?void 0:T.project_id);$>=0&&$<B.length&&(Ot(n,"estimate",B[$].value),E=!0)}E&&(document.removeEventListener("keydown",c),fn(null))};fn(c),document.addEventListener("keydown",c),hn(o)}function eu(e,t,n,s){e.stopPropagation(),Vo(e,t,n,s)}function tu(e,t,n){zo=zo.then(()=>Ko(e,t,n))}async function Ko(e,t,n){const s=$e(),i=gt(),a=fe(),o=s.find(c=>c.id===e)||i.find(c=>c.id===e)||a;if(!o)return;const r=(o.labels||[]).map(c=>c.id),d=r.indexOf(t);let l;if(d>=0?l=r.filter(c=>c!==t):l=[...r,t],n){const c=d<0;n.classList.toggle("selected",c),n.querySelector(".label-check").textContent=c?"✓":""}try{const h=(await b.updateIssue(e,{label_ids:l})).labels||[],u=s.findIndex(E=>E.id===e);u!==-1&&(s[u].labels=h,Ge([...s]));const f=i.findIndex(E=>E.id===e);f!==-1&&(i[f].labels=h,Nt([...i])),(a==null?void 0:a.id)===e&&os({...a,labels:h});const y=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(y&&y.parentNode){const E=s.find(T=>T.id===e)||i.find(T=>T.id===e);E&&(y.outerHTML=Ne(E))}const $=document.querySelector(".property-labels-btn");$&&($.innerHTML=h.length>0?h.map(E=>`
                    <span class="issue-label" style="background: ${z(E.color)}20; color: ${z(E.color)}">${m(E.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch{if(v("Failed to update labels","error"),n){const c=d>=0;n.classList.toggle("selected",c),n.querySelector(".label-check").textContent=c?"✓":""}}}function Yo(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${p(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${p(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const a=s.has(i.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${p(t)}" data-label-id="${p(i.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${z(i.color)}20; color: ${z(i.color)}">${m(i.name)}</span>
                </button>
            `}).join("")}
    `}async function Zo(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=x();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await b.createLabel(s.id,{name:i}),o=await b.getLabels(s.id);as(o),a!=null&&a.id&&await Ko(e,a.id,null);const r=$e(),d=gt(),l=fe(),c=r.find(u=>u.id===e)||d.find(u=>u.id===e)||l,h=new Set(((c==null?void 0:c.labels)||[]).map(u=>u.id));t&&Yo(t,e,o,h),n.value=""}catch(a){v(a.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}function ms(){const e=document.getElementById("create-issue-labels-label");e&&(We.length===0?e.textContent="Labels":e.textContent=`Labels (${We.length})`)}function Ti(e){const t=vo();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=We.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${p(n.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${z(n.color)}20; color: ${z(n.color)}">${m(n.name)}</span>
                </button>
            `}).join("")}
    `}function nu(e){const t=We.indexOf(e);t>=0?We.splice(t,1):We.push(e),ms();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Ti(n)}async function Xo(){const e=x();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await b.createLabel(e.id,{name:s}),a=await b.getLabels(e.id);as(a),i!=null&&i.id&&!We.includes(i.id)&&We.push(i.id),ms(),t&&Ti(t),n.value=""}catch(i){v(i.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}async function Ot(e,t,n){var i;ut();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const a={};a[t]=n;const o=await b.updateIssue(e,a);if(!o||!o.id)throw new Error("Invalid response from server");const r=$e(),d=r.findIndex(u=>u.id===e);d!==-1&&(r[d]=o,Ge([...r]));const l=gt(),c=l.findIndex(u=>u.id===e);c!==-1&&(l[c]=o,Nt([...l]));const h=fe();if((h==null?void 0:h.id)===e&&os(o),s&&s.parentNode){const u=r.find(f=>f.id===e)||l.find(f=>f.id===e)||o;if(u){s.outerHTML=Ne(u);const f=document.querySelector(`.issue-row[data-issue-id="${e}"]`);f&&(f.classList.add("updated"),setTimeout(()=>f.classList.remove("updated"),500))}}if(v("Issue updated","success"),t==="status"){const u=(i=document.getElementById("project-filter"))==null?void 0:i.value;if(u)try{const y=(await b.getSprints(u)).find($=>$.status==="active");Ei(y||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const u=document.getElementById("issue-detail-view");u&&!u.classList.contains("hidden")&&su(t,o)}}catch(a){v(a.message||"Failed to update issue","error"),s&&s.classList.remove("updating")}}function su(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const d of a){const l=d.querySelector(".property-label");if(l&&l.textContent.toLowerCase()===i.toLowerCase()){o=d;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${he(t.status)}
            <span>${ye(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${Ve(t.priority)}
            <span>${we(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${tt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const d=t.assignee_id?yn(t.assignee_id):null,l=d?_t(d):null;r.innerHTML=l?`${Dt(d,"avatar-small")}<span>${m(l)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const d=ad(),l=t.sprint_id&&d?d.find(c=>c.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${l?m(l.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${Ts(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}Z({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,s=t.field;s==="estimate"?Ot(t.issueId,s,n==="null"?null:Number(n)):Ot(t.issueId,s,n)},"toggle-issue-label":(e,t,n)=>{tu(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Zo(t.issueId)},"toggle-create-issue-label":(e,t)=>{nu(t.labelId)},"create-label-for-create-issue":()=>{Xo()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Zo(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Xo())}});const Qo=["task","bug","feature","chore","docs","tech_debt","epic"];function ft(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Ht(e){const t=ft(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function nt(){const e=document.getElementById("issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=$e();if(t.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues found</h3>
                <p>Create your first issue to get started</p>
            </div>
        `;return}const n=Fo();n==="status"?iu(e,t):n==="priority"?au(e,t):n==="type"?ou(e,t):n==="assignee"?ru(e,t):n==="sprint"?lu(e,t):e.innerHTML=Ht(t)+t.map(s=>Ne(s)).join("")}function iu(e,t){const n={};mi.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s=Ht(t);mi.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${he(i)}</span>
                    <span class="group-title">${ye(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${ft(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ne(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function au(e,t){const n={};_o.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s=Ht(t);_o.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ve(i)}</span>
                    <span class="group-title">${we(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${ft(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ne(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function ou(e,t){const n={};Qo.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s=Ht(t);Qo.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${i}">${tt(i)}</span></span>
                    <span class="group-title">${tt(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${ft(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ne(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function ru(e,t){const n={},s="__unassigned__";n[s]=[];const i=ls();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a=Ht(t);n[s].length>0&&(a+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[s].length}</span>
                    <span class="group-points">${ft(n[s])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[s].map(o=>Ne(o)).join("")}
                </div>
            </div>
        `),i.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const d=_t(o)||"Unknown",l=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${o.id}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${p(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Dt(o,"avatar-small")}</span>
                    <span class="group-title">${m(d)}${m(l)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${ft(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(c=>Ne(c)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function lu(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(d=>{d.sprint_id?(s[d.sprint_id]||(s[d.sprint_id]=[],i.push(d.sprint_id)),s[d.sprint_id].push(d)):s[n].push(d)});const a={active:0,planned:1,completed:2},o=mr();i.sort((d,l)=>{const c=o[d],h=o[l],u=c?a[c.status]??3:3,f=h?a[h.status]??3:3;return u-f});let r=Ht(t);i.forEach(d=>{const l=s[d];if(l.length===0)return;const c=o[d],h=c?c.name:d,u=c?c.status==="active"?" (Active)":c.status==="completed"?" (Done)":"":"",f=d.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${f}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${f}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${m(h)}${u}</span>
                    <span class="group-count">${l.length}</span>
                    <span class="group-points">${ft(l)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${l.map(y=>Ne(y)).join("")}
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
                    <span class="group-points">${ft(s[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${s[n].map(d=>Ne(d)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function cu(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Ne(e){const t=e.assignee_id?yn(e.assignee_id):null,n=t?_t(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?Ts(e.estimate,e.project_id):"",a=e.sprint_id?mr()[e.sprint_id]:null,o=a?a.name:null;return`
        <div class="issue-row" data-issue-id="${p(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${p(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${p(e.id)}" title="Priority: ${we(e.priority)}">
                    ${Ve(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${p(e.id)}" title="Status: ${ye(e.status)}">
                    ${he(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${tt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.id)}">${m(e.title)}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(r=>`
                            <span class="issue-label" style="background: ${z(r.color)}20; color: ${z(r.color)}">${m(r.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${p(e.id)}" title="Sprint: ${o?m(o):"None"}">
                    ${o?`<span class="sprint-badge">${m(o)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${p(e.id)}" title="Estimate: ${i||"None"}">
                    ${i?`<span class="estimate-badge">${i}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${p(e.id)}" title="${p(n||"Unassigned")}">
                    ${n?Dt(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function Ve(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function he(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}Z({"toggle-group":(e,t)=>{cu(t.group)},"show-inline-dropdown":(e,t,n)=>{Vo(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),F(t.issueId))}});function du(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function uu(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";const n=()=>{t.classList.add("hidden"),t.innerHTML=""},s=()=>{const i=e.selectionStart||0,o=e.value.slice(0,i).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!o){n();return}const r=o[2].toLowerCase(),d=Bt().map(l=>({id:l.id,name:l.name||l.email||"User",email:l.email||"",handle:du(l)})).filter(l=>!r||l.handle.includes(r)||l.name.toLowerCase().includes(r)||l.email.toLowerCase().includes(r)).slice(0,6);if(!d.length){n();return}t.innerHTML=d.map(l=>`
            <button type="button" class="mention-suggestion" data-handle="${p(l.handle)}">
                <span class="mention-name">${m(l.name)}</span>
                <span class="mention-handle">@${m(l.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.handle,h=e.value.slice(0,i).replace(/@([a-zA-Z0-9._-]*)$/,`@${c} `),u=e.value.slice(i);e.value=h+u,e.focus(),n()})})};e.addEventListener("input",s),e.addEventListener("click",s),e.addEventListener("keydown",i=>{i.key==="Escape"&&n()}),e.addEventListener("blur",()=>{setTimeout(n,150)})}const Jo=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function kn(e=null){var o;const t=e||((o=document.getElementById("project-filter"))==null?void 0:o.value);Wo([]);const n=U().map(r=>`
        <option value="${r.id}" ${r.id===t?"selected":""}>${m(r.name)}</option>
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
                            ${Jo.map(r=>`<option value="${r.id}">${r.label}</option>`).join("")}
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
                            ${he("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${Ve("no_priority")}
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
    `,N(),ms();const s=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description"),a=Oc();a.title&&(s.value=a.title),a.description&&(i.value=a.description),s.addEventListener("input",()=>{fo(s.value,i.value)}),i.addEventListener("input",()=>{fo(s.value,i.value)}),s.focus()}function pu(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function mu(e){const t=Jo.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function gu(e,t){const n=U().find(s=>s.id===t);Wo([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
                            ${he("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${Ve("no_priority")}
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
    `,N(),ms(),document.getElementById("create-issue-title").focus()}async function fu(e,t){const n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,d=document.getElementById("create-issue-estimate").value,l=d?parseInt(d):null;if(!n){v("Please enter a title","error");return}try{const c=await b.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,label_ids:Go(),parent_id:e});D(),v(`Created sub-issue ${c.identifier}`,"success"),F(e)}catch(c){v(`Failed to create sub-issue: ${c.message}`,"error")}}async function hu(e,t,n){var o,r;ut();const i=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${i.top-8}px`,a.style.left=`${i.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const d=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Io.map(l=>`
                <button class="dropdown-option ${l===d?"selected":""}" data-action="set-create-field" data-field="status" data-value="${l}" data-label="${p(ye(l))}">
                    ${he(l)}
                    <span>${ye(l)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const d=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${gi.map(l=>`
                <button class="dropdown-option ${l===d?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${l}" data-label="${p(we(l))}">
                    ${Ve(l)}
                    <span>${we(l)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const d=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(l=>`
                <button class="dropdown-option ${l===d?"selected":""}" data-action="set-create-field" data-field="type" data-value="${l}" data-label="${p(tt(l))}">
                    <span class="issue-type-badge type-${l}">${tt(l)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!x())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let d=vo();if(d.length===0)try{d=await b.getLabels(x().id),as(d)}catch(l){console.error("Failed to load labels:",l)}Ti(a),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),hn(a,{multiSelect:!0});return}else if(e==="assignee"){const d=document.getElementById("create-issue-assignee").value,l=ls();a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${d?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${l.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:l.map(({assignee:c,indent:h})=>{const u=_t(c)||"User";return`
                <button class="dropdown-option ${c.id===d?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${p(c.id)}" data-label="${p(u)}">
                    ${Dt(c,"avatar-small")}
                    <span>${fi(c,h)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const d=document.getElementById("create-issue-estimate").value,l=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,c=Ln(l);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${c.map(h=>{const u=h.value===null?"":String(h.value);return`
                <button class="dropdown-option ${u===d?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${p(u)}" data-label="${p(h.value?h.label:"Estimate")}">
                    <span>${m(h.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const d=document.getElementById("create-issue-sprint").value,l=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!l)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const h=(await b.getSprints(l)).filter(u=>u.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${d?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${h.map(u=>`
                        <button class="dropdown-option ${u.id===d?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${p(u.id)}" data-label="${p(u.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${m(u.name)}${u.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),hn(a)}function vu(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function bu(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n;const s=m(n);if(e==="status"){const i=document.querySelector(".toolbar-btn:first-child");i.innerHTML=`${he(t)}<span id="create-issue-status-label">${s}</span>`}else if(e==="priority"){const i=document.querySelectorAll(".toolbar-btn")[1];i.innerHTML=`${Ve(t)}<span id="create-issue-priority-label">${s}</span>`}else if(e==="type"){const i=document.getElementById("create-issue-type-btn");i&&(i.innerHTML=`<span class="issue-type-badge type-${t}">${tt(t)}</span><span id="create-issue-type-label">${s}</span>`)}ut()}async function er({keepOpen:e=!1}={}){var $,E;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,d=document.getElementById("create-issue-estimate").value,l=d?parseInt(d):null,c=(($=document.getElementById("create-issue-sprint"))==null?void 0:$.value)||null,h=(E=document.getElementById("create-issue-due-date"))==null?void 0:E.value,u=h?new Date(`${h}T00:00:00Z`).toISOString():null;if(!t){v("Please select a project","error");return}if(!n){v("Please enter a title","error");return}const f=document.getElementById("btn-create-issue"),y=document.getElementById("btn-create-and-new");f&&(f.disabled=!0),y&&(y.disabled=!0);try{const T=await b.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,sprint_id:c,label_ids:Go(),due_date:u});v(`Created ${T.identifier}`,"success"),Hc(),j()==="issues"?St():j()==="my-issues"&&Ii(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(D(),F(T.id))}catch(T){v(`Failed to create issue: ${T.message}`,"error")}finally{f&&(f.disabled=!1),y&&(y.disabled=!1)}}async function yu(){await er({keepOpen:!1})}async function wu(){await er({keepOpen:!0})}Z({"toggle-create-dropdown":(e,t,n)=>{hu(t.dropdownType,e,n)},"set-create-field":(e,t)=>{bu(t.field,t.value,t.label)},"create-issue-submit":()=>{yu()},"create-issue-and-new":()=>{wu()},"update-create-project":()=>{vu()},"apply-template":e=>{mu(e.target.value)},"toggle-create-options":()=>{pu()},"create-sub-issue-submit":(e,t)=>{fu(t.parentId,t.projectId)}});async function tr(e){try{const t=await b.getIssue(e),n=await b.getSprints(t.project_id),i=Ln(t.project_id).map(a=>`
            <option value="${a.value===null?"":a.value}" ${t.estimate===a.value?"selected":""}>${m(a.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form data-action="update-issue" data-issue-id="${p(e)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${p(t.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
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
                            <option value="${a.id}" ${t.sprint_id===a.id?"selected":""}>${m(a.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,N()}catch(t){v(`Failed to load issue: ${t.message}`,"error")}}async function $u(e,t){try{const n=document.getElementById("edit-issue-title"),s=document.getElementById("edit-issue-description"),i=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),d=document.getElementById("edit-issue-sprint");if(!n||!i||!a||!o)throw new Error("Required form fields not found");const l={title:n.value,description:s?s.value:"",status:i.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:d&&d.value?d.value:null};await b.updateIssue(t,l),D(),await F(t),v("Issue updated!","success")}catch(n){v(`Failed to update issue: ${n.message}`,"error")}}async function ku(e){if(confirm("Are you sure you want to delete this issue?"))try{await b.deleteIssue(e),await St(),await ke(),M("issues"),v("Issue deleted!","success")}catch(t){v(`Failed to delete issue: ${t.message}`,"error")}}Z({"update-issue":(e,t)=>{$u(e,t.issueId)}});let Si=!1,ht=!0,En=null,Li=null,Ci=null,gs=null;function Bi(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function Ai(e){return e.user_name||e.user_email||"Unknown"}function ji(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",i=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<a href="#comments-section" class="activity-comment-link" title="${i}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${m(ye(t(e.old_value)))}</strong> to <strong>${m(ye(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${m(we(t(e.old_value)))}</strong> to <strong>${m(we(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${m(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${m(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const s=m(e.field_name||"ritual"),i=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<span class="activity-attestation-link" title="${i}">Attested to <strong>${s}</strong></span>`:`Attested to <strong>${s}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue"}}function nr(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function Eu(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,d=!1;const l=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let c;for(;(c=l.exec(t))!==null;)if(d=!0,c.index>r&&o.appendChild(document.createTextNode(t.slice(r,c.index))),c[1]){const h=c[1],u=document.createElement("a");u.href=`#/issue/${h}`,u.className="issue-link",u.textContent=h,o.appendChild(u),r=c.index+c[0].length}else if(c[3]){c[2]&&o.appendChild(document.createTextNode(c[2]));const h=document.createElement("span");h.className="mention",h.textContent="@"+c[3],o.appendChild(h),r=c.index+c[0].length}d&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function _u(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let o;for(;(o=n.exec(t))!==null;){a=!0,o.index>i&&s.appendChild(document.createTextNode(t.slice(i,o.index)));const r=o[1],d=document.createElement("a");d.href=`#/issue/${r}`,d.className="issue-link",d.textContent=r,s.appendChild(d),i=o.index+o[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function Iu(e){if(!e)return"";const t=Be(e),n=document.createElement("div");return n.innerHTML=t,nr(n,Eu),n.innerHTML}function fs(e){if(!e)return"";const t=Be(e),n=document.createElement("div");return n.innerHTML=t,nr(n,_u),n.innerHTML}function xu(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),s=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),s&&s.classList.toggle("rotated")}function Tu(){ht=!ht;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",ht),n&&n.classList.toggle("rotated",ht)}async function hs(e){try{En=await b.getTicketRitualsStatus(e),sr(e)}catch(t){console.error("Failed to load ticket rituals:",t),En=null}}function sr(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!En){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=En;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(c=>c.approval_mode==="gate")&&(ht=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",ht);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",ht);const r=n.some(c=>c.trigger==="ticket_close"),d=n.some(c=>c.trigger==="ticket_claim");let l="⚠️ Complete these rituals:";r&&d?l="⚠️ Pending rituals (claim before starting, close before completing):":d?l="⚠️ Complete these rituals before claiming this ticket:":r&&(l="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${l}</p>
                ${n.map(c=>`
                    <div class="ticket-ritual-item pending${c.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${c.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${m(c.name)}</span>
                            <span class="badge badge-trigger-${c.trigger||"ticket_close"}">${c.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${c.approval_mode||"auto"}">${c.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${c.prompt?Be(c.prompt):""}</div>
                        ${c.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(c.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${ze(c.attestation.attested_at)}</span>
                                ${c.attestation.note?`<div class="attestation-note markdown-body">${Be(c.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${Rp(c,e)}
                        </div>
                    </div>
                `).join("")}
            </div>
        `:""}
        ${s.length>0?`
            <div class="ticket-rituals-completed">
                ${s.map(c=>`
                    <div class="ticket-ritual-item completed">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">✓</span>
                            <span class="ticket-ritual-name">${m(c.name)}</span>
                        </div>
                        ${c.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(c.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${ze(c.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function Mi(e){try{let t;e.includes("-")?t=await b.getIssueByIdentifier(e):t=await b.getIssue(e),t?await F(t.id,!1):M("my-issues",!1)}catch{M("my-issues",!1)}}async function F(e,t=!0){try{ht=!0;const[n,s,i,a,o,r]=await Promise.all([b.getIssue(e),b.getComments(e),b.getActivities(e),b.getSubIssues(e),b.getRelations(e),b.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),l=[...r.pending_rituals||[],...r.completed_rituals||[]].filter(w=>w.attestation&&w.attestation.note).map(w=>({id:`attestation-${w.attestation.id}`,author_name:w.attestation.attested_by_name||"Unknown",content:w.attestation.note,created_at:w.attestation.attested_at,is_attestation:!0,ritual_name:w.name,is_pending:!w.attestation.approved_at}));En=r;const c=[...s,...l].sort((w,je)=>new Date(w.created_at)-new Date(je.created_at)),h=[n.parent_id?b.getIssue(n.parent_id):Promise.resolve(null),b.getSprints(n.project_id).catch(w=>(console.error("Failed to load sprints:",w),[]))],[u,f]=await Promise.all(h),y=o.filter(w=>w.relation_type==="blocks"&&w.direction==="outgoing"),$=o.filter(w=>w.relation_type==="blocked_by"||w.relation_type==="blocks"&&w.direction==="incoming"),E=o.filter(w=>w.relation_type==="relates_to");t&&history.pushState({issueId:e,view:j()},"",`/issue/${n.identifier}`),os(n),ko(f),document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const T=document.getElementById("issue-detail-view");T.classList.remove("hidden");const B=j()||"my-issues",S=U().find(w=>w.id===n.project_id),L=n.assignee_id?yn(n.assignee_id):null,C=L?_t(L):null,V=n.sprint_id?f.find(w=>w.id===n.sprint_id):null,O=$e(),J=O.findIndex(w=>w.id===n.id),ie=J>0?O[J-1]:null,X=J>=0&&J<O.length-1?O[J+1]:null,P=J>=0;T.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(B)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${P?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${ie?`data-action="navigate-issue" data-issue-id="${p(ie.id)}" data-identifier="${p(ie.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${J+1} / ${O.length}</span>
                            <button class="issue-nav-btn" ${X?`data-action="navigate-issue" data-issue-id="${p(X.id)}" data-identifier="${p(X.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${S?m(S.name):"Project"} › ${m(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(n.title)}</h1>

                    ${u?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(u.identifier)}" data-action="navigate-issue" data-issue-id="${p(u.id)}" data-identifier="${p(u.identifier)}">${u.identifier}: ${m(u.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" data-action="edit-description" data-issue-id="${p(n.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                            </button>
                        </div>
                        <div class="description-content markdown-body ${n.description?"":"empty"}"${n.description?"":` data-action="edit-description" data-issue-id="${p(n.id)}"`}>
                            ${n.description?fs(n.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-create-sub-issue-modal" data-issue-id="${p(n.id)}" data-project-id="${p(n.project_id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${a.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:a.map(w=>`
                                <a href="/issue/${encodeURIComponent(w.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${p(w.id)}" data-identifier="${p(w.identifier)}">
                                    <span class="sub-issue-status">${he(w.status)}</span>
                                    <span class="sub-issue-id">${w.identifier}</span>
                                    <span class="sub-issue-title">${m(w.title)}</span>
                                    ${w.estimate?`<span class="sub-issue-estimate">${w.estimate}pts</span>`:""}
                                </a>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-add-relation-modal" data-issue-id="${p(n.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${y.length===0&&$.length===0&&E.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${$.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${$.map(w=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${he(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(w.related_issue_id)}" data-identifier="${p(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${m(w.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(n.id)}" data-relation-id="${p(w.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${y.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${y.map(w=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${he(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(w.related_issue_id)}" data-identifier="${p(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${m(w.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(n.id)}" data-relation-id="${p(w.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${E.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${E.map(w=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${he(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(w.related_issue_id)}" data-identifier="${p(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${m(w.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(n.id)}" data-relation-id="${p(w.id)}" title="Remove relation">
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

                    <div class="issue-detail-section" id="activity-section">
                        <div class="section-header section-header-collapsible" data-action="toggle-section" data-section="activity">
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
                            `:i.map(w=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Bi(w.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${ji(w)}</span>
                                        <span class="activity-actor">by ${m(Ai(w))}</span>
                                        <span class="activity-time">${ze(w.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="comments-section">
                        <div class="section-header section-header-collapsible" data-action="toggle-section" data-section="comments">
                            <h3>Comments</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle comments">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="comments-list section-collapsible-content">
                            ${c.length===0?`
                                <div class="comments-empty">No comments yet</div>
                            `:c.map(w=>`
                                <div class="comment ${w.is_attestation?"comment-attestation":""} ${w.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${w.is_attestation?"avatar-attestation":""}">${w.is_attestation?w.is_pending?"⏳":"✓":(w.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m(w.author_name||"User")}</span>
                                            ${w.is_attestation?`<span class="comment-ritual-badge">${w.is_pending?"Pending approval — ":""}Ritual: ${m(w.ritual_name)}</span>`:""}
                                            <span class="comment-date">${ze(w.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${Iu(w.content)}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <form class="comment-form comment-form-sticky" data-action="save-comment" data-issue-id="${p(n.id)}">
                        <textarea id="new-comment" placeholder="Write a comment... (${/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl"}+Enter to submit)" rows="1"></textarea>
                        <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                        <button type="submit" class="btn btn-primary btn-sm comment-submit-btn">Comment</button>
                    </form>
                </div>

                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${p(n.id)}">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${he(n.status)}
                                <span>${ye(n.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${p(n.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${Ve(n.priority)}
                                <span>${we(n.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${p(n.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${n.issue_type||"task"}">${tt(n.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${p(n.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${C?`${Dt(L,"avatar-small")}<span>${m(C)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${p(n.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${V?m(V.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${p(n.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${n.labels&&n.labels.length>0?n.labels.map(w=>`
                                        <span class="issue-label" style="background: ${z(w.color)}20; color: ${z(w.color)}">${m(w.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${S?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(S.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${p(n.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${Ts(n.estimate,n.project_id)}</span>
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
                            <span class="property-value-static">${m(n.creator_name||"Unknown")}</span>
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
                                <button class="overflow-menu-item" data-action="edit" data-issue-id="${p(n.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Edit all fields
                                </button>
                                <button class="overflow-menu-item overflow-menu-danger" data-action="delete" data-issue-id="${p(n.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    Delete issue
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        `,gs&&gs.abort(),gs=new AbortController;const{signal:be}=gs,le=document.querySelector(".sidebar-overflow-trigger"),Le=document.querySelector(".overflow-menu-dropdown");if(le&&Le){const w=()=>{Le.classList.add("hidden"),le.setAttribute("aria-expanded","false")},je=()=>{const ee=Le.classList.toggle("hidden");le.setAttribute("aria-expanded",String(!ee))};le.addEventListener("click",je,{signal:be}),document.addEventListener("click",ee=>{!le.contains(ee.target)&&!Le.contains(ee.target)&&w()},{signal:be}),Le.addEventListener("keydown",ee=>{ee.key==="Escape"&&(w(),le.focus())},{signal:be}),Le.querySelectorAll(".overflow-menu-item").forEach(ee=>{ee.addEventListener("click",()=>{const $t=ee.dataset.issueId;w(),ee.dataset.action==="edit"?tr($t):ee.dataset.action==="delete"&&ku($t)},{signal:be})})}sr(n.id),uu();const Ae=document.getElementById("new-comment");if(Ae){const w=Nc(n.id);w&&(Ae.value=w),Ae.addEventListener("input",()=>{ci(n.id,Ae.value)}),Ae.addEventListener("keydown",je=>{var ee;je.key==="Enter"&&(je.metaKey||je.ctrlKey)&&(je.preventDefault(),(ee=Ae.closest("form"))==null||ee.requestSubmit())})}Li=ie?ie.id:null,Ci=X?X.id:null;const _a=w=>{if(w.metaKey||w.ctrlKey||w.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||w.target.tagName==="INPUT"||w.target.tagName==="TEXTAREA"||w.target.tagName==="SELECT"||w.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor"))return;w.key==="ArrowLeft"&&Li?(w.preventDefault(),F(Li)):w.key==="ArrowRight"&&Ci&&(w.preventDefault(),F(Ci));const ee={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[w.key];if(ee){const $t=document.querySelector(`.property-row[data-field="${ee}"]`);$t&&(w.preventDefault(),$t.click())}};document.addEventListener("keydown",_a,{signal:be})}catch(n){v(`Failed to load issue: ${n.message}`,"error")}}async function Su(e,t){if(e.preventDefault(),Si)return!1;const n=document.getElementById("new-comment").value;ci(t,null),Si=!0;try{await b.createComment(t,n),await F(t),v("Comment added!","success")}catch(s){ci(t,n),v(`Failed to add comment: ${s.message}`,"error")}finally{Si=!1}return!1}async function Lu(e){const t=fe()||await b.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const s=n.querySelector(".section-header");s&&(s.style.display="none");const i=n.querySelector(".description-content");if(!i)return;i.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" data-action="set-description-editor-mode" data-mode="write">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" data-action="set-description-editor-mode" data-mode="preview">Preview</button>
            </div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${m(t.description||"")}</textarea>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,i.classList.remove("empty"),i.removeAttribute("onclick");const a=document.getElementById("edit-description"),o=qc(e);o&&(a.value=o),a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?ns(e,r):ns(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&ir()}),a.addEventListener("keydown",r=>{var d,l;r.key==="Enter"&&(r.metaKey||r.ctrlKey)&&(r.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),r.key==="Escape"&&(r.preventDefault(),(l=document.getElementById("cancel-description-edit"))==null||l.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{ns(e,null),s&&(s.style.display=""),i.className=`description-content markdown-body ${t.description?"":"empty"}`,t.description||(i.setAttribute("data-action","edit-description"),i.setAttribute("data-issue-id",t.id)),i.innerHTML=t.description?fs(t.description):'<span class="add-description-link">Add description...</span>'}),document.getElementById("save-description-edit").addEventListener("click",async()=>{var d;const r=(d=document.getElementById("edit-description"))==null?void 0:d.value;if(r!==void 0)try{await b.updateIssue(e,{description:r}),ns(e,null),v("Description updated","success"),F(e,!1)}catch(l){v(`Failed to update description: ${l.message}`,"error")}})}function ir(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?fs(n):'<span class="text-muted">Nothing to preview.</span>'}function Cu(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?ir():s.focus()}function Bu(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,N(),document.getElementById("relation-issue-search").focus()}async function Au(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=x())==null?void 0:s.id,o=(await b.searchIssues(i,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${p(r.id)}" data-identifier="${p(r.identifier)}" data-title="${p(r.title)}">
                <span class="link-result-id">${m(r.identifier)}</span>
                <span class="link-result-title">${m(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function ju(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Mu(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Du(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return v("Please select an issue","error"),!1;try{n==="blocked_by"?await b.createRelation(s,t,"blocks"):await b.createRelation(t,s,n),D(),v("Relation added","success"),F(t)}catch(i){v(`Failed to add relation: ${i.message}`,"error")}return!1}async function Ru(e,t){try{await b.deleteRelation(e,t),v("Relation removed","success"),F(e)}catch(n){v(`Failed to remove relation: ${n.message}`,"error")}}Z({"show-detail-dropdown":(e,t,n)=>{eu(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{Lu(t.issueId)},"toggle-section":(e,t)=>{xu(t.section)},"toggle-ticket-rituals":()=>{Tu()},"save-comment":(e,t)=>{Su(e,t.issueId)},"show-add-relation-modal":(e,t)=>{Bu(t.issueId)},"remove-relation":(e,t)=>{e.stopPropagation(),Ru(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{gu(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{Du(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{Au(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{ju(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{Mu()},"set-description-editor-mode":(e,t)=>{Cu(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})}});function ar(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let vs=[],_n=[],or=null,G=new Set,Ft="list",Lt=!1,Di=null,bs=null;const Ri=Fc();(Ri==="list"||Ri==="grid")&&(Ft=Ri);function rr(e){if(e!=="list"&&e!=="grid")return;Ft=e,e==="grid"&&Lt&&Pi(),Uc(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),vt()}function lr(){if(Ft!=="list")return;Lt=!0,G.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),vt(),Ut()}function Pi(){Lt=!1,G.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),vt(),Ut()}function Pu(){Di&&clearTimeout(Di),Di=setTimeout(()=>{vt()},300)}function Nu(){const e=document.getElementById("doc-search");e&&(e.value=""),vt()}async function qu(){const e=document.getElementById("doc-project-filter");e&&(e.value=""),await Ni()}async function Ou(){const e=document.getElementById("doc-search"),t=document.getElementById("doc-project-filter");e&&(e.value=""),t&&(t.value=""),await Ni()}function Hu(){var i,a,o;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${m(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const r=document.getElementById("doc-project-filter"),d=((o=r==null?void 0:r.options[r.selectedIndex])==null?void 0:o.text)||"Project";s.push(`<span class="filter-chip">Project: ${m(d)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(s.length>0){let r=s.join(" ");s.length>1&&(r+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=r,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Fu(){return vs}function vt(){var n,s,i;const e=((s=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:s.toLowerCase())||"",t=((i=document.getElementById("doc-sort"))==null?void 0:i.value)||"updated_desc";Hu(),_n=vs.filter(a=>{var o,r;if(e){const d=(o=a.title)==null?void 0:o.toLowerCase().includes(e),l=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!d&&!l)return!1}return!0}),_n.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),Wu("",Ft)}async function Ni(){var n,s;const e=or||((n=x())==null?void 0:n.id);if(!e)return;const t=((s=document.getElementById("doc-project-filter"))==null?void 0:s.value)||null;try{vs=await b.getDocuments(e,t),vt()}catch(i){v(i.message,"error")}}async function In(e,t=null){var s;if(e||(e=(s=x())==null?void 0:s.id),!e)return;or=e,wo(-1);const n=document.getElementById("documents-list");if(n&&(n.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null){const i=document.getElementById("doc-project-filter");i!=null&&i.value&&(t=i.value)}try{vs=await b.getDocuments(e,t);const i=document.getElementById("doc-view-list"),a=document.getElementById("doc-view-grid");i&&a&&(i.classList.toggle("active",Ft==="list"),a.classList.toggle("active",Ft==="grid")),vt()}catch(i){const a=document.getElementById("documents-list");a&&(a.innerHTML=""),v(i.message,"error")}}function Uu(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${z(t.color)}20; color: ${z(t.color)}">${m(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function zu(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Uu(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${p(e.id)}" data-action="view-document" data-document-id="${p(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${m(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${m(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?m(ar(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${m(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Gu(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${z(r.color)}20; color: ${z(r.color)}">${m(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?ar(e.content).substring(0,80):"No content",i=Lt?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${p(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${G.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${Lt&&G.has(e.id)?" selected":""}" data-action="${Lt?"toggle-doc-selection":"view-document"}" data-document-id="${p(e.id)}" data-doc-id="${p(e.id)}">
      ${i}
      <div class="document-list-icon">${m(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${m(e.title)}</div>
        <div class="document-list-snippet text-muted">${m(s)}${e.content&&e.content.length>80?"...":""}</div>
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
  `}function Wu(e="",t="list"){var l,c;const n=document.getElementById("documents-list");if(!n)return;G.clear(),Ut();const s=_n;if(s.length===0){const h=(l=document.getElementById("doc-search"))==null?void 0:l.value,u=(c=document.getElementById("doc-project-filter"))==null?void 0:c.value,f=h||u;n.innerHTML=`
      <div class="empty-state">
        <h3>${f?"No documents match your filters":"No documents yet"}</h3>
        <p>${f?"Try different search terms or filters":"Create your first document to get started"}</p>
      </div>
    `;return}const i=t==="grid"?zu:Gu,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=U();s.forEach(h=>{let u,f;if(e==="project")if(u=h.project_id||"__global__",u==="__global__")f="Global (Team-wide)";else{const y=r.find($=>$.id===h.project_id);f=y?y.name:"Unknown Project"}else e==="sprint"&&(u=h.sprint_id||"__no_sprint__",f=h.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:f,docs:[]}),o[u].docs.push(h)});let d="";for(const[h,u]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";d+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${m(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${f}">
          ${u.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=d}function Vu(e){G.has(e)?G.delete(e):G.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=G.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",G.has(e)),Ut()}function Ku(){_n.forEach(e=>G.add(e.id)),_n.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),Ut()}function cr(){G.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),G.clear(),Ut()}function Ut(){const e=document.getElementById("doc-bulk-actions");e&&(Lt?(e.classList.remove("hidden"),G.size>0?e.innerHTML=`
        <span class="bulk-count">${G.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function Yu(){if(G.size===0){v("No documents selected","error");return}const t=U().map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${G.size} Document${G.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${G.size} selected document${G.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,N()}async function Zu(e){var o;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(G);let s=0,i=0;for(const r of n)try{await b.updateDocument(r,{project_id:t}),s++}catch(d){console.error(`Failed to move document ${r}:`,d),i++}D(),cr(),i===0?v(`Moved ${s} document${s>1?"s":""}!`,"success"):v(`Moved ${s}, failed ${i}`,"warning");const a=(o=x())==null?void 0:o.id;return await In(a),!1}async function Xu(){var a;if(G.size===0){v("No documents selected","error");return}const e=G.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(G);let n=0,s=0;for(const o of t)try{await b.deleteDocument(o),n++}catch(r){console.error(`Failed to delete document ${o}:`,r),s++}Pi(),s===0?v(`Deleted ${n} document${n>1?"s":""}!`,"success"):v(`Deleted ${n}, failed ${s}`,"warning");const i=(a=x())==null?void 0:a.id;await In(i)}async function qe(e,t=!0){try{const n=await b.getDocument(e);t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(S=>S.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");let i="";try{const S=await b.getDocumentComments(n.id);i=`
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${S.length===0?'<div class="comments-empty">No comments yet</div>':S.map(C=>{var V,O;return`
            <div class="comment" data-comment-id="${p(C.id)}">
              <div class="comment-avatar">${((O=(V=C.author_name)==null?void 0:V.charAt(0))==null?void 0:O.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${m(C.author_name||"Unknown")}</span>
                  <span class="comment-date">${ze(C.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${Be(C.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form comment-form-sticky" data-action="add-document-comment" data-document-id="${p(n.id)}">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="1"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(S){console.error("Failed to load comments:",S)}let a=null,o=null;if(n.project_id){const L=U().find(C=>C.id===n.project_id);if(a=L?L.name:null,n.sprint_id)try{const C=await b.getSprint(n.sprint_id);o=C?C.name:null}catch{}}let r=n.content||"";const d=R.lexer(r);n.title&&d.length>0&&d[0].type==="heading"&&d[0].depth===1&&d[0].text.trim()===n.title.trim()&&(r=r.slice(d[0].raw.length).trimStart());const l=Fu(),c=l.findIndex(S=>S.id===n.id),h=c>0?l[c-1]:null,u=c>=0&&c<l.length-1?l[c+1]:null,f=c>=0,y=n.labels&&n.labels.length>0?n.labels.map(S=>`
          <span class="issue-label" style="background: ${z(S.color)}20; color: ${z(S.color)}">
            ${m(S.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${p(n.id)}" data-label-id="${p(S.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let $='<span class="text-muted">None</span>';try{const S=await b.getDocumentIssues(n.id);S.length>0&&($=S.map(L=>`
          <div class="linked-item">
            <span class="linked-item-id">${m(L.identifier)}</span>
            <span class="linked-item-title">${m(L.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${p(n.id)}" data-issue-id="${p(L.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch{}s.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="documents">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${f?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${h?`data-action="view-document" data-document-id="${p(h.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${c+1} / ${l.length}</span>
              <button class="issue-nav-btn" ${u?`data-action="view-document" data-document-id="${p(u.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?m(a)+" ›":""} ${m(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?m(n.icon)+" ":""}${m(n.title)}</h1>

          <div class="document-content markdown-body">${r?Be(r):'<p class="text-muted">No content</p>'}</div>

          ${i}
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-section">
            <h4>Properties</h4>

            <div class="property-row">
              <span class="property-label">Project</span>
              <span class="property-value-static">${a?m(a):'<span class="text-muted">Global</span>'}</span>
            </div>

            ${o?`
            <div class="property-row">
              <span class="property-label">Sprint</span>
              <span class="property-value-static">${m(o)}</span>
            </div>
            `:""}

            <div class="property-row">
              <span class="property-label">Labels</span>
              <div class="property-value-static property-labels-btn">
                ${y}
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
              ${$}
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
    `,bs&&bs.abort(),bs=new AbortController;const{signal:E}=bs,T=s.querySelector(".sidebar-overflow-trigger"),B=s.querySelector(".overflow-menu-dropdown");if(T&&B){const S=()=>{B.classList.add("hidden"),T.setAttribute("aria-expanded","false")},L=()=>{const C=B.classList.toggle("hidden");T.setAttribute("aria-expanded",String(!C))};T.addEventListener("click",L,{signal:E}),document.addEventListener("click",C=>{!T.contains(C.target)&&!B.contains(C.target)&&S()},{signal:E}),B.addEventListener("keydown",C=>{C.key==="Escape"&&(S(),T.focus())},{signal:E})}}catch(n){v(n.message,"error")}}async function qi(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await b.getSprints(t);let o=n;if(s&&!n){const d=a.find(l=>l.status==="active");d&&(o=d.id)}const r=a.map(d=>`<option value="${d.id}" ${d.id===o?"selected":""}>${m(d.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function dr(){const e=U(),t=Cn()||"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${m(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
  `,N(),t&&await qi("doc-sprint",t,null,!0)}async function Qu(e){var a;e.preventDefault();const t=(a=x())==null?void 0:a.id;if(!t)return v("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{await b.createDocument(t,i),await In(t),D(),v("Document created!","success")}catch(o){v(o.message,"error")}return!1}async function ur(e){try{const t=await b.getDocument(e),s=U().map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${m(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        <div class="form-group">
          <label for="edit-doc-content">Content</label>
          <textarea id="edit-doc-content" style="min-height: 200px">${m(t.content||"")}</textarea>
        </div>
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${p(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,N(),t.project_id&&await qi("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){v(t.message,"error")}}async function Ju(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await b.updateDocument(t,i),D(),await qe(t),v("Document updated!","success")}catch(a){v(a.message,"error")}return!1}async function ep(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await b.deleteDocument(e);const n=(t=x())==null?void 0:t.id;await In(n),M("documents"),v("Document deleted!","success")}catch(n){v(n.message,"error")}}function tp(e,t){qi(e,t)}async function np(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${p(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,N()}async function sp(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=x())==null?void 0:s.id,a=await b.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${p(t)}" data-issue-id="${p(o.id)}">
        <span class="link-result-id">${m(o.identifier)}</span>
        <span class="link-result-title">${m(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function ip(e,t){try{await b.linkDocumentToIssue(e,t),D(),v("Issue linked!","success"),await qe(e,!1)}catch(n){v(n.message,"error")}}async function ap(e,t){if(confirm("Unlink this issue from the document?"))try{await b.unlinkDocumentFromIssue(e,t),v("Issue unlinked!","success"),await qe(e,!1)}catch(n){v(n.message,"error")}}let Oi=!1;async function op(e,t){if(e.preventDefault(),Oi)return!1;const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return v("Please enter a comment","error"),!1;Oi=!0;try{await b.createDocumentComment(t,s),n.value="",v("Comment added!","success"),await qe(t,!1)}catch(i){v(i.message,"error")}finally{Oi=!1}return!1}async function rp(e){var n;const t=(n=x())==null?void 0:n.id;if(!t){v("No team selected","error");return}try{const s=await b.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,N();return}const i=s.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${p(e)}" data-label-id="${p(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${z(a.color)}; color: white;">${m(a.name)}</span>
        ${a.description?`<span class="text-muted">${m(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,N()}catch(s){v(s.message,"error")}}async function lp(e,t){try{await b.addLabelToDocument(e,t),D(),v("Label added!","success"),await qe(e,!1)}catch(n){v(n.message,"error")}}async function cp(e,t){try{await b.removeLabelFromDocument(e,t),v("Label removed!","success"),await qe(e,!1)}catch(n){v(n.message,"error")}}Z({"view-document":(e,t)=>{e.preventDefault(),qe(t.documentId)},"toggle-doc-selection":(e,t)=>{e.stopPropagation(),Vu(t.docId)},"clear-doc-search":()=>{Nu()},"clear-doc-project-filter":()=>{qu()},"clear-all-doc-filters":()=>{Ou()},"show-bulk-move-modal":()=>{Yu()},"bulk-delete-documents":()=>{Xu()},"select-all-docs":()=>{Ku()},"clear-doc-selection":()=>{cr()},"exit-selection-mode":()=>{Pi()},"enter-selection-mode":()=>{lr()},"handle-bulk-move":e=>{Zu(e)},"unlink-document-issue":(e,t)=>{ap(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{np(t.documentId)},"add-document-comment":(e,t)=>{op(e,t.documentId)},"remove-label-from-doc":(e,t)=>{cp(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{rp(t.documentId)},"show-edit-document-modal":(e,t)=>{ur(t.documentId)},"delete-document":(e,t)=>{ep(t.documentId)},"create-document":e=>{Qu(e)},"update-doc-sprint-dropdown":(e,t,n)=>{tp(t.sprintSelect,n.value)},"update-document":(e,t)=>{Ju(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{sp(n.value,t.documentId)},"link-to-issue":(e,t)=>{ip(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{lp(t.documentId,t.labelId)}});let zt=[],ys={},ws=new Set,st=null,pr=null,Hi=[],xn=[],Fi=[];function mr(){return ys}function dp(){return st}function gr(){const e=document.getElementById("sprint-project-filter");if(e){if(!e.value){const t=Vt();t&&U().some(n=>n.id===t)&&(e.value=t)}e.value?bt(e.value):document.getElementById("sprints-list").innerHTML=`
            <div class="empty-state">
                <h3>Select a project</h3>
                <p>Choose a project to view its sprints</p>
            </div>
        `}}function up(){const e=document.getElementById("sprint-project-filter").value;e&&(Gt(e),Zi(e)),bt(e)}async function bt(e){const t=e||document.getElementById("sprint-project-filter").value;if(t){Tp();try{await b.getCurrentSprint(t),zt=await b.getSprints(t),pp(),await $s()}catch(n){v(n.message,"error")}}}function pp(){const e=document.getElementById("sprints-list");if(!e)return;const t=zt.find(a=>a.status==="active"),n=zt.find(a=>a.status==="planned"),s=zt.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
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
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${p(t.id)}" data-sprint-name="${p(t.name)}" data-budget="${t.budget||""}" data-project-id="${p(t.project_id)}">Edit Budget</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" data-action="show-limbo-details-modal">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" data-action="show-close-sprint-confirmation" data-sprint-id="${p(t.id)}">Close Sprint</button>
                    `}
                </div>
            </div>
        `,i+=mp(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${p(n.id)}" data-sprint-url="/sprint/${p(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${m(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${p(n.id)}" data-sprint-name="${p(n.name)}" data-budget="${n.budget||""}" data-project-id="${p(n.project_id)}">Edit Budget</button>
                </div>
            </div>
        `}s.length>0&&(i+=`
            <details class="sprint-history">
                <summary>Completed Sprints (${s.length})</summary>
                <div class="sprint-history-list">
                    ${s.map(a=>`
                        <div class="sprint-history-item" data-action="view-sprint" data-sprint-id="${p(a.id)}" data-sprint-url="/sprint/${p(a.id)}" style="cursor: pointer;">
                            <span class="sprint-history-name">${m(a.name)}</span>
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
    `}function mp(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),c=((O,J,ie)=>Math.min(Math.max(O,J),ie))((new Date-o)/(r-o),0,1),h=360,u=120,f=16,y=f,$=h-f,E=f,T=u-f,B=O=>s===0?T:E+(1-O/s)*(T-E),S=B(s),L=B(0),C=y+($-y)*c,V=B(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${ks(e.start_date)} → ${ks(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${h} ${u}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${y}" y1="${S}" x2="${$}" y2="${L}" class="burndown-ideal" />
                <line x1="${y}" y1="${S}" x2="${C}" y2="${V}" class="burndown-actual" />
                <circle cx="${C}" cy="${V}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}async function Ui(e,t=!0){var n;try{const s=await b.getSprint(e);if(!s){v("Sprint not found","error"),M("sprints");return}pr=s;const i=(n=x())==null?void 0:n.id,[a,o,r]=await Promise.all([b.getIssues({sprint_id:e,limit:500}),b.getSprintTransactions(e).catch(()=>[]),i?b.getDocuments(i,s.project_id,null,e).catch(()=>[]):[]]);Hi=a,Fi=o,xn=r,t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),fp()}catch(s){console.error("Failed to load sprint:",s),v("Failed to load sprint","error"),M("sprints")}}async function gp(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){v("Invalid sprint ID","error"),M("sprints",!1);return}try{await Ui(e,!1)}catch{M("sprints",!1)}}function fp(){const e=pr,t=Hi;document.querySelectorAll(".view").forEach(l=>l.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=t.filter(l=>Rt.includes(l.status)),i=t.filter(l=>l.status==="done"),a=t.reduce((l,c)=>l+(c.estimate||0),0),o=i.reduce((l,c)=>l+(c.estimate||0),0);let r="";e.status==="active"?r='<span class="badge badge-status-active">Active</span>':e.status==="planned"?r='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(r='<span class="badge badge-status-completed">Completed</span>');const d=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="sprints">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${m(e.name)}</h2>
                ${r}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.start_date&&e.end_date?`
                <div class="sprint-detail-dates">
                    ${ks(e.start_date)} → ${ks(e.end_date)}
                </div>
            `:""}
        </div>

        <div class="sprint-detail-stats">
            <div class="stat-card">
                <div class="stat-value">${s.length}</div>
                <div class="stat-label">Open Issues</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${i.length}</div>
                <div class="stat-label">Completed</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${d}</div>
                <div class="stat-label">Budget</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${o} / ${a}</div>
                <div class="stat-label">Points Done</div>
            </div>
        </div>

        <div class="sprint-detail-sections">
            <div class="sprint-detail-section">
                <h3>Open Issues (${s.length})</h3>
                ${s.length===0?`
                    <div class="empty-state-small">No open issues in this sprint</div>
                `:`
                    <div class="sprint-issues-list">
                        ${s.map(l=>fr(l)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${i.length>0?"open":""}>
                <summary><h3>Completed Issues (${i.length})</h3></summary>
                ${i.length===0?`
                    <div class="empty-state-small">No completed issues yet</div>
                `:`
                    <div class="sprint-issues-list">
                        ${i.map(l=>fr(l)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${vp()}
            </div>

            ${xn.length>0?`
            <div class="sprint-detail-section">
                <h3>Documents (${xn.length})</h3>
                <div class="sprint-issues-list">
                    ${xn.map(l=>hp(l)).join("")}
                </div>
            </div>
            `:""}
        </div>
    `}function fr(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",s=Io.includes(e.status)?e.status:"backlog",i=n?`badge-priority-${n}`:"",a=`status-dot-${s}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${p(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${m(e.identifier)}</span>
            <span class="sprint-issue-title">${m(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${i}">${Lp(n)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function hp(e){const t=m(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${p(e.id)}" data-document-url="/document/${p(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${m(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${ze(e.created_at)}</span>
            </span>
        </div>
    `}function vp(){const e=Fi;if(!e||e.length===0)return`
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
                            <span class="ledger-item-identifier">${m(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${m(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${bp(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function bp(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function yp(e,t,n,s){const i=s?Jp(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${p(e)}" data-project-id="${p(s)}">
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${i?`<small class="form-hint">${m(i)}</small>`:""}
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
    `,N()}async function wp(e,t,n){var o;e.preventDefault();const s=document.getElementById("sprint-budget").value,i=s?parseInt(s):null,a=((o=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:o.value)||"this";try{if(await b.updateSprint(t,{budget:i}),a==="planned"||a==="default"){const d=zt.filter(l=>l.status==="planned"&&l.id!==t);for(const l of d)await b.updateSprint(l.id,{budget:i})}a==="default"&&n&&await b.updateProject(n,{default_sprint_budget:i}),await bt(),D(),v(`Budget updated${a==="planned"?" (and planned sprints)":a==="default"?" (and set as project default)":""}!`,"success")}catch(r){v(`Failed to update budget: ${r.message}`,"error")}return!1}async function $p(e){const t=zt.find(d=>d.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,N();const n=Rt;let s=0,i=!1,a=!1;try{const[d,l]=await Promise.all([b.getIssues({sprint_id:e,limit:500}),b.getRituals(t.project_id)]);s=d.filter(c=>n.includes(c.status)).length,i=l.some(c=>c.is_active&&c.trigger==="every_sprint")}catch(d){console.error("Failed to load sprint details:",d),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${m(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${p(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function kp(e){try{const t=await b.closeSprint(e);await bt(),t.limbo?_p(t):v("Sprint completed!","success")}catch(t){v(`Failed to complete sprint: ${t.message}`,"error")}}async function $s(){var t;const e=(t=document.getElementById("sprint-project-filter"))==null?void 0:t.value;if(e)try{st=await b.getLimboStatus(e),Ep()}catch(n){console.error("Failed to load limbo status:",n)}}function Ep(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!st||!st.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${st.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function _p(e){const t=document.getElementById("sprint-project-filter").value;document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,N(),Ip(t)}async function Ip(e){try{const t=await b.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${m(s.name)} <span class="ritual-mode">(${m(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${Be(s.prompt)}</div>
                    ${Gi(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function zi(){var t,n,s,i;if(!st)return;const e=((t=document.getElementById("sprint-project-filter"))==null?void 0:t.value)||((n=document.getElementById("ritual-project-filter"))==null?void 0:n.value);document.getElementById("modal-title").textContent="Limbo Status",(s=document.querySelector(".modal"))==null||s.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${st.pending_rituals.map(a=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${a.attestation?a.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${m(a.name)}</strong>
                            <span class="badge badge-ritual-${p(a.approval_mode)}">${m(a.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${Be(a.prompt)}</div>
                        ${Gi(a.attestation)}
                        ${xp(a,e)}
                    </div>
                `).join("")}
            </div>
            ${((i=st.completed_rituals)==null?void 0:i.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${st.completed_rituals.map(a=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${m(a.name)}</div>
                            ${Gi(a.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,N()}function Gi(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${m(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${m(ze(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${Be(e.note)}</div>
        </div>
    `}function xp(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}" data-ritual-name="${p(e.name)}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function hr(e){for(const t of e)if(!ws.has(t))try{(await b.getSprints(t)).forEach(s=>{ys[s.id]=s}),ws.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Tp(){ys={},ws=new Set,Hi=[],Fi=[],xn=[]}function Sp(e,t){t.forEach(n=>{ys[n.id]=n}),ws.add(e)}Z({"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}Ui(t.sprintId)},"stop-propagation":e=>{e.stopPropagation()},"show-edit-budget-modal":(e,t)=>{e.stopPropagation();const n=t.budget?parseFloat(t.budget):null;yp(t.sprintId,t.sprintName,n,t.projectId)},"show-limbo-details-modal":e=>{e.stopPropagation(),zi()},"show-close-sprint-confirmation":(e,t)=>{e.stopPropagation(),$p(t.sprintId)},"handle-update-budget":(e,t)=>{wp(e,t.sprintId,t.projectId)},"close-modal":()=>{D()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,D(),kp(t.sprintId)},"dismiss-limbo-modal":()=>{D(),$s()},"approve-ritual":(e,t)=>{Mp(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{br(t.ritualId,t.projectId,t.ritualName)},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}F(t.issueId)},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}qe(t.documentId)}});function ks(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function Lp(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}async function Cp(){const e=document.getElementById("ritual-project-filter");e&&(await ke(),e.innerHTML='<option value="">Select Project</option>'+U().map(t=>`<option value="${p(t.id)}">${m(t.name)}</option>`).join(""))}async function Bp(){const e=document.getElementById("rituals-project-filter");if(!e)return;Ir(Ap),await ke(),e.innerHTML='<option value="">Select a project</option>'+U().map(n=>`<option value="${p(n.id)}">${m(n.name)}</option>`).join("");const t=Vt()||Cn();t&&U().some(n=>n.id===t)?(e.value=t,vr()):document.getElementById("rituals-content").innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>'}async function vr(){const e=document.getElementById("rituals-project-filter").value,t=document.getElementById("rituals-content");if(!e){document.getElementById("rituals-tabs").classList.add("hidden"),t.innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>';return}om(e),t.innerHTML='<div class="loading">Loading rituals...</div>';try{await An()}catch(n){t.innerHTML=`<div class="empty-state">Error loading rituals: ${m(n.message)}</div>`}}function Ap(){const e=document.getElementById("rituals-content"),t=rm(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,Wt("rv-sprint-rituals-list",n,"sprint"),Wt("rv-close-rituals-list",s,"close"),Wt("rv-claim-rituals-list",i,"claim")}function jp(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function Mp(e,t){try{await b.approveAttestation(e,t),v("Ritual approved!","success"),await $s(),zi()}catch(n){v(n.message,"error")}}async function br(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{Dp(s,e,t)}),N()}async function Dp(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await b.completeGateRitual(t,n,s||null),v("Ritual completed!","success"),await $s();const i=dp();i&&!i.in_limbo?(D(),v("Limbo cleared! Next sprint is now active.","success")):zi()}catch(i){v(i.message,"error")}return!1}function Rp(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-prompt="${p(e.prompt||"")}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Attest</button>`}function Pp(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${m(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{Np(i,e,t)}),N()}async function Np(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return v("A note is required for this attestation.","error"),!1;try{await b.attestTicketRitual(t,n,s),v("Ritual attested!","success"),D(),await hs(n)}catch(i){v(i.message,"error")}return!1}async function qp(e,t){try{await b.attestTicketRitual(e,t),v("Ritual attested!","success"),await hs(t)}catch(n){v(n.message,"error")}}async function Op(e,t){try{await b.approveTicketRitual(e,t),v("Ritual approved!","success"),await hs(t)}catch(n){v(n.message,"error")}}function Hp(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{Fp(s,e,t)}),N()}async function Fp(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await b.completeTicketGateRitual(t,n,s||null),v("Ritual completed!","success"),D(),await hs(n)}catch(i){v(i.message,"error")}return!1}Z({"show-create-ritual-modal":(e,t)=>{Lr(t.trigger)},"approve-ticket-ritual":(e,t)=>{Op(t.ritualId,t.issueId)},"complete-ticket-ritual":(e,t)=>{Hp(t.ritualId,t.issueId,t.ritualName)},"attest-ticket-ritual-modal":(e,t)=>{Pp(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt)},"attest-ticket-ritual":(e,t)=>{qp(t.ritualId,t.issueId)}});function Be(e){if(!e)return"";try{R.setOptions({breaks:!0,gfm:!0});const n=R.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return mo.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function Wi(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function Up(e,t,n,s,i,a,o,r){var d;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${m(i)}</span>
                    <span class="gate-approval-issue-title">${m(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${p(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${m(s)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${m(o)}</strong>${r?` ${Wi(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",l=>{zp(l,e,t,n)}),N(),(d=document.querySelector(".modal"))==null||d.classList.add("modal-wide")}async function zp(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await b.completeTicketGateRitual(t,n,i||null),v(`GATE ritual "${s}" approved!`,"success"),D(),Tn()}catch(a){v(`Failed to complete gate ritual: ${a.message}`,"error")}}function Gp(e,t,n,s,i,a,o,r){Up(e,t,n,s,i,a,o,r)}function Wp(e,t,n,s,i,a,o,r,d){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${m(i)}</span>
                    <span class="gate-approval-issue-title">${m(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${p(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${m(s)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${m(o)}</strong>${r?` ${Wi(r)}`:""}</div>`:""}
                ${d?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${Be(d)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",c=>{Vp(c,e,t,n)}),N(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function Vp(e,t,n,s){e.preventDefault();try{await b.approveTicketRitual(t,n),v(`Review ritual "${s}" approved!`,"success"),D(),Tn()}catch(i){v(`Failed to approve review ritual: ${i.message}`,"error")}}function Kp(e,t,n,s,i,a,o,r,d){Wp(e,t,n,s,i,a,o,r,d)}let Vi=[];async function Tn(){if(!x())return;const e=document.getElementById("gate-approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=await Promise.all(U().map(async i=>{const[a,o]=await Promise.all([b.getPendingApprovals(i.id),b.getLimboStatus(i.id)]);return{project:i,approvals:a,limbo:o}})),n=[],s=[];for(const{project:i,approvals:a,limbo:o}of t)if(n.push(...a),o&&o.in_limbo){const r=(o.pending_rituals||[]).filter(d=>{var l;return(l=d.attestation)!=null&&l.approved_at?!1:d.approval_mode==="gate"||!!d.attestation});r.length>0&&s.push({project:i,rituals:r})}td(n),Vi=s,yr()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${m(t.message)}</p></div>`}}}function yr(){const e=document.getElementById("gate-approvals-list");if(!e)return;const t=ed(),n=Vi.length>0,s=!zc();if(t.length===0&&!n){s?e.innerHTML=`
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
                    <button class="btn btn-secondary" data-action="dismiss-approvals-explainer">Got it!</button>
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
                    ${Vi.map(({project:c,rituals:h})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${m(c.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${h.map(u=>{const f=u.attestation&&!u.attestation.approved_at,y=f?"⏳":"○",$=f?`<span class="gate-waiting-info">Attested by <strong>${m(u.attestation.attested_by_name||"Unknown")}</strong></span>`:u.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',E=f?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${p(u.id)}"
                                            data-project-id="${p(c.id)}">Approve</button>`:u.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${p(u.id)}"
                                                data-project-id="${p(c.id)}"
                                                data-ritual-name="${p(u.name)}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${y} ${m(u.name)}
                                                    <span class="badge badge-ritual-${p(u.approval_mode)}">${m(u.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${m(u.prompt)}</span>
                                                ${$}
                                            </div>
                                            ${E}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const a=c=>c.pending_approvals||[],o=c=>h=>{const u=a(h).filter(c);return u.length>0?{...h,_filteredApprovals:u}:null},r=t.map(o(c=>c.approval_mode==="gate"&&c.limbo_type==="claim")).filter(Boolean),d=t.map(o(c=>c.approval_mode==="gate"&&c.limbo_type==="close")).filter(Boolean),l=t.map(o(c=>c.approval_mode==="review")).filter(Boolean);r.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(Ki).join("")}
                </div>
            </div>
        `),d.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${d.map(Ki).join("")}
                </div>
            </div>
        `),l.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${l.map(Ki).join("")}
                </div>
            </div>
        `),e.innerHTML=i,e.querySelectorAll(".gate-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const h=c.dataset;Gp(h.ritualId,h.issueId,h.ritualName,h.ritualPrompt,h.issueIdentifier,h.issueTitle,h.requestedBy,h.requestedAt)})}),e.querySelectorAll(".review-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const h=c.dataset;Kp(h.ritualId,h.issueId,h.ritualName,h.ritualPrompt,h.issueIdentifier,h.issueTitle,h.requestedBy,h.requestedAt,h.attestationNote)})}),e.querySelectorAll(".sprint-approve-btn").forEach(c=>{c.addEventListener("click",async()=>{c.disabled=!0;try{await b.approveAttestation(c.dataset.ritualId,c.dataset.projectId),v("Sprint ritual approved!","success"),await Tn()}catch(h){c.disabled=!1,v(h.message,"error")}})}),e.querySelectorAll(".sprint-complete-btn").forEach(c=>{c.addEventListener("click",()=>{br(c.dataset.ritualId,c.dataset.projectId,c.dataset.ritualName)})})}function Yp(){Gc(),yr()}function Ki(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${m(s.requested_by_name)}</strong>${s.requested_at?` (${Wi(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note">${Be(s.attestation_note)}</div>`:"",d=i?"review-approve-btn":"gate-approve-btn",l=i?"Approve":"Complete",c=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>';return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${m(s.ritual_name)} ${c}</span>
                    <span class="gate-ritual-prompt">${m(s.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                <button class="btn btn-small btn-primary ${d}"
                    data-ritual-id="${p(s.ritual_id)}"
                    data-issue-id="${p(e.issue_id)}"
                    data-ritual-name="${p(s.ritual_name)}"
                    data-ritual-prompt="${p(s.ritual_prompt)}"
                    data-issue-identifier="${p(e.identifier)}"
                    data-issue-title="${p(e.title)}"
                    data-requested-by="${p(s.requested_by_name||"")}"
                    data-requested-at="${p(s.requested_at||"")}"
                    data-attestation-note="${p(s.attestation_note||"")}">${l}</button>
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
    `}Z({"view-issue-from-modal":(e,t)=>{e.preventDefault(),D(),F(t.issueId)},"dismiss-approvals-explainer":()=>{Yp()}});const Es={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},_s={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let wr=0;function $r(e){wr=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=kr(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function kr(e="",t="",n=""){const s=wr++,i=Object.keys(Es).map(l=>`<option value="${l}" ${l===e?"selected":""}>${l}</option>`).join(""),o=(e?Es[e]:Es.estimate).map(l=>`<option value="${l}" ${l===t?"selected":""}>${_s[l]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",d=t==="isnull";return`
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
    `}function Zp(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",kr()),Is()}function Xp(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Is()}function Qp(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=Es[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${_s[o]}</option>`).join(""),Er(e),Is()}function Er(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Sn(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Is(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function _r(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,d=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,l=o.querySelector(".condition-value");let c=(a=l==null?void 0:l.value)==null?void 0:a.trim();if(!r&&!d)continue;if(!r)throw Sn("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!d)throw Sn("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const h=`${r}__${d}`;if(n.has(h))throw Sn(`Duplicate condition: ${r} ${_s[d]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${h}`);if(n.add(h),d==="isnull")t[h]=!0;else if(d==="in"||d==="contains")t[h]=c?c.split(",").map(u=>u.trim()).filter(u=>u):[];else if(d==="gte"||d==="lte"){if(!c)throw Sn(`Please enter a numeric value for ${r} ${_s[d]}.`),new Error(`Missing numeric value for ${h}`);const u=parseInt(c,10);if(isNaN(u))throw Sn(`Invalid number "${c}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${h}: ${c}`);t[h]=u}else t[h]=c}return Is(),Object.keys(t).length>0?t:null}Z({"add-condition-row":()=>{Zp()},"remove-condition-row":(e,t)=>{Xp(Number(t.rowId))},"update-operator-options":(e,t)=>{Qp(Number(t.rowId))},"toggle-value-input":(e,t)=>{Er(Number(t.rowId))}});let K=[],Yi=null;const xs={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function Ir(e){Yi=e}function U(){return K}function Ln(e){const t=K.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return xs[n]||xs.fibonacci}function Ts(e,t){if(!e)return"No estimate";const s=Ln(t).find(i=>i.value===e);return s?s.label:`${e} points`}function Jp(e){const t=K.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(xs[n]||xs.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function ke(){if(x())try{K=await b.getProjects(x().id),em()}catch(e){v(e.message,"error")}}function em(){const e=document.getElementById("project-filter"),t=document.getElementById("sprint-project-filter"),n=document.getElementById("board-project-filter"),s=document.getElementById("doc-project-filter"),i=document.getElementById("dashboard-project-filter"),a=e==null?void 0:e.value,o=t==null?void 0:t.value,r=n==null?void 0:n.value,d=s==null?void 0:s.value,l=i==null?void 0:i.value,c='<option value="">All Projects</option>'+K.map(f=>`<option value="${f.id}">${m(f.name)}</option>`).join(""),h='<option value="">Select Project</option>'+K.map(f=>`<option value="${f.id}">${m(f.name)}</option>`).join(""),u=Cn();if(e){e.innerHTML=c;let f=a;if(!f||!K.some(y=>y.id===f))if(u&&K.some(y=>y.id===u))f=u;else{const $=new URLSearchParams(window.location.search).get("project");$&&K.some(E=>E.id===$)?f=$:K.length>0&&(f=K[0].id)}f&&(e.value=f,go(f))}if(t){t.innerHTML=h;const f=o||u;f&&K.some(y=>y.id===f)&&(t.value=f)}if(n){n.innerHTML=h;const f=r||u;f&&K.some(y=>y.id===f)&&(n.value=f)}if(s){s.innerHTML=c;const f=d||u;f&&K.some(y=>y.id===f)&&(s.value=f)}if(i){i.innerHTML=c;const f=l||u;f&&K.some(y=>y.id===f)&&(i.value=f)}}function Cn(){return Ac()}function Gt(e){if(!e)return;go(e),["project-filter","board-project-filter","sprint-project-filter"].forEach(n=>{const s=document.getElementById(n);s&&(s.value=e)})}function Bn(){const e=document.getElementById("projects-list");if(K.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create your first project to get started</p>
            </div>
        `;return}e.innerHTML=K.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${p(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${z(t.color)}20; color: ${z(t.color)}">
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
    `).join("")}function tm(e){Gt(e),M("issues")}function xr(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,N()}async function nm(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await b.createProject(x().id,t),await ke(),Bn(),D(),v("Project created!","success")}catch(n){v(`Failed to create project: ${n.message}`,"error")}return!1}async function sm(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await b.updateProject(t,n),await ke(),Bn(),D(),v("Project updated!","success")}catch(s){v(`Failed to update project: ${s.message}`,"error")}return!1}async function im(e){const t=K.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await b.deleteProject(e),await ke(),Bn(),D(),v("Project deleted","success")}catch(n){v(`Failed to delete project: ${n.message}`,"error")}}let ve=null;async function Tr(e){ve=e,K.length===0&&await ke();const t=K.find(n=>n.id===e);if(!t){v("Project not found","error"),M("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Sr("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Sr(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!it||it.length===0)&&An()}function am(){ve=null,it=[]}function om(e){ve=e}function rm(){return it}async function lm(){if(!ve)return;const e=document.getElementById("ps-name").value.trim();if(!e){v("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await b.updateProject(ve,t),await ke(),v("Settings saved","success");const n=K.find(s=>s.id===ve);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){v(n.message,"error")}}async function cm(){if(!ve)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await b.updateProject(ve,n),await ke(),v("Settings saved","success")}catch(s){v(`Failed to save settings: ${s.message}`,"error")}}let it=[];async function An(){if(ve)try{it=await b.getRituals(ve),dm(),typeof Yi=="function"&&Yi()}catch(e){v(e.message,"error")}}function dm(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=it.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=it.filter(s=>s.trigger==="ticket_close"),n=it.filter(s=>s.trigger==="ticket_claim");Wt("ps-sprint-rituals-list",e,"sprint"),Wt("ps-close-rituals-list",t,"close"),Wt("ps-claim-rituals-list",n,"claim")}function Wt(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>p(a||"auto");s.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${m(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${i(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${m(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${Be(a.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${i(a.approval_mode)}">${m(a.approval_mode||"auto")}</span>
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
  `}).join("")}async function Lr(e){if(!ve)return;let t=[];try{t=await b.getRitualGroups(ve)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${$r(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,N()}function um(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function pm(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),s=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),s.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),s.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),s.classList.add("hidden")}async function Cr(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw v("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await b.createRitualGroup(ve,{name:t,selection_mode:n})).id}return e.value||null}async function mm(e){e.preventDefault();let t;try{t=_r()}catch{return!1}let n;try{n=await Cr()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){s.group_id=n;const i=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&i.value&&(s.weight=parseFloat(i.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(s.percentage=parseFloat(a.value))}try{await b.createRitual(ve,s),await An(),D(),v("Ritual created!","success")}catch(i){v(`Failed to create ritual: ${i.message}`,"error")}return!1}async function gm(e){const t=it.find(o=>o.id===e);if(!t)return;let n=[];try{n=await b.getRitualGroups(ve)}catch{}const s=n.find(o=>o.id===t.group_id),i=s&&s.selection_mode==="random_one",a=s&&s.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${$r(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,N()}async function fm(e,t){e.preventDefault();let n;try{n=_r()}catch{return!1}let s;try{s=await Cr()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:s||""};if(s){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await b.updateRitual(t,i),await An(),D(),v("Ritual updated!","success")}catch(a){v(`Failed to update ritual: ${a.message}`,"error")}return!1}async function hm(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await b.deleteRitual(e),await An(),v("Ritual deleted","success")}catch(n){v(`Failed to delete ritual: ${n.message}`,"error")}}Z({"view-project":(e,t)=>{tm(t.projectId)},"view-project-settings":(e,t)=>{e.stopPropagation(),Tr(t.projectId)},"create-project":e=>{nm(e)},"update-project":(e,t)=>{sm(e,t.projectId)},"confirm-delete-project":(e,t)=>{im(t.projectId)},"edit-project-ritual":(e,t)=>{gm(t.ritualId)},"delete-project-ritual":(e,t)=>{hm(t.ritualId,t.ritualName)},"create-project-ritual":e=>{mm(e)},"update-project-ritual":(e,t)=>{fm(e,t.ritualId)},"toggle-ritual-conditions":()=>{um()},"ritual-group-change":()=>{pm()}});function Vt(){const t=new URLSearchParams(window.location.search).get("project");return t||Cn()}function Zi(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}const Xi={},Ss=new Map;let Qi=null,Ji=null,ea=null,ta=null,na=null,sa=null,Br=!1;function vm(e){Object.assign(Xi,e)}function bm({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i,epicNavigate:a}={}){e&&(Qi=e),t&&(Ji=t),n&&(ea=n),s&&(ta=s),i&&(na=i),a&&(sa=a)}function ym(){return Object.keys(Xi)}function M(e,t=!0){if(t&&Ss.set(window.location.href,window.scrollY),Zc(e),t){let i;const a=Vt(),o=["issues","board","sprints"];e==="my-issues"?i="/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:o.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),Qi&&Qi();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const i=document.getElementById(`${e}-view`);i&&i.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const s=Xi[e];s&&s(),t&&window.scrollTo(0,0)}function Ar(){var s;const t=window.location.pathname.split("/").filter(Boolean);ta&&ta();let n="my-issues";if(t.length===0||t[0]==="")M("my-issues",!1);else{if(Ji&&Ji(t))return;n=t[0],ym().includes(n)?M(n,!1):(n="my-issues",M("my-issues",!1))}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function jr(e){Ss.set(window.location.href,window.scrollY),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),na&&na(e)}function wm(e){Ss.set(window.location.href,window.scrollY),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),sa&&sa(e)}function Mr(){const e=Ss.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function $m(){Br||(Br=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&ea&&ea(e.state)){Mr();return}(t=e.state)!=null&&t.view?M(e.state.view,!1):Ar(),Mr()}))}let jn=[];function Ls(){return jn}function km(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Em(e){const t=e==null?void 0:e.avatar_url,n=p((e==null?void 0:e.name)||"Agent");return t?km(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${p(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${m(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function _m(e){var t;if(e||(e=(t=x())==null?void 0:t.id),!!e)try{jn=await b.getTeamAgents(e),rs(Bt,Ls),cs()}catch(n){console.error("Failed to load team agents:",n)}}async function ia(e){var t;if(e||(e=(t=x())==null?void 0:t.id),!!e)try{jn=await b.getTeamAgents(e),rs(Bt,Ls),cs(),Im()}catch(n){v(n.message,"error")}}function Im(){const e=document.getElementById("agents-list");if(e){if(jn.length===0){e.innerHTML='<p class="empty-state">No agents yet. Create an agent to enable CLI automation with its own identity.</p>';return}e.innerHTML=jn.map(t=>{const n=m(t.name),s=m(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${Em(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${di(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function xm(){const e=U();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),N()}async function Tm(e){var o,r,d;e.preventDefault();const t=(o=x())==null?void 0:o.id;if(!t)return v("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(d=document.getElementById("agent-project"))==null?void 0:d.value;try{let l;i&&a?l=await b.createProjectAgent(a,n,s):l=await b.createTeamAgent(t,n,s),D();const c=m(l.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
      <div class="api-key-created">
        <p class="warning-text">Copy the agent's API key now. You won't be able to see it again!</p>
        <div class="api-key-display">
          <code id="new-agent-key">${c}</code>
          <button type="button" class="btn btn-secondary" data-action="copy-agent-key">Copy</button>
        </div>
        <div class="api-key-instructions">
          <p>Configure the CLI to use this agent:</p>
          <code>chaotic auth set-key ${c}</code>
        </div>
        <button type="button" class="btn btn-primary" data-action="dismiss-agent-modal">Done</button>
      </div>
    `,N()}catch(l){v(`Failed to create agent: ${l.message}`,"error")}return!1}function Sm(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{v("Agent API key copied to clipboard","success")}).catch(()=>{v("Failed to copy","error")})}async function Lm(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await b.deleteAgent(e),v("Agent deleted","success"),ia()}catch(n){v(`Failed to delete agent: ${n.message}`,"error")}}Z({"create-agent":e=>{Tm(e)},"copy-agent-key":()=>{Sm()},"dismiss-agent-modal":()=>{D(),ia()},"delete-agent":(e,t)=>{Lm(t.agentId,t.agentName)}});let Mn=0,Dn=null;const Ct=new Map;function at(e,t){return Ct.has(e)||Ct.set(e,new Set),Ct.get(e).add(t),()=>{var n;return(n=Ct.get(e))==null?void 0:n.delete(t)}}function Cm(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}function Dr(e){Dn&&(clearTimeout(Dn),Dn=null);const t=id();t&&(t.close(),$o(null));const n=b.getToken();if(!n)return;const i=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(n)}&team_id=${encodeURIComponent(e)}`;try{const a=new WebSocket(i);$o(a),a.onopen=()=>{console.log("WebSocket connected"),Mn>0&&v("Live updates reconnected","success"),Mn=0},a.onmessage=o=>{let r;try{r=JSON.parse(o.data)}catch(d){console.error("WebSocket: malformed message",d);return}Bm(r)},a.onclose=()=>{console.log("WebSocket disconnected"),Mn++,Mn===1&&v("Live updates disconnected. Reconnecting...","warning");const o=Cm(Mn-1);Dn=setTimeout(()=>{Dn=null,x()&&x().id===e&&Dr(e)},o)},a.onerror=o=>{console.error("WebSocket error:",o)}}catch(a){console.error("Failed to connect WebSocket:",a)}}function Bm(e){const{type:t,entity:n,data:s}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const i={type:t,entity:n},a=Ct.get(`${n}:${t}`);if(a)for(const d of a)try{d(s,i)}catch(l){console.error(`WebSocket handler error (${n}:${t}):`,l)}const o=Ct.get(n);if(o)for(const d of o)try{d(s,i)}catch(l){console.error(`WebSocket handler error (${n}):`,l)}const r=Ct.get("*");if(r)for(const d of r)try{d(s,i)}catch(l){console.error("WebSocket handler error (*):",l)}}let Cs=[],Bs=[],aa=[],oa=[];function Am(){return Cs}function Bt(){return Bs}async function ra(){try{Cs=await b.getMyTeams(),jm()}catch(e){v(e.message,"error")}}function jm(){const e=document.getElementById("team-list");Cs.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Cs.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${p(JSON.stringify(t))}">${m(t.name)}</button>
        `).join("")}async function la(e,t=!1){ui(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const s=document.getElementById("team-description-text");s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),Dr(e.id),await Promise.all([ke(),Wm(),Dm(),_m()]),t?Ar():M(j())}function Rr(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Mm(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Dm(){if(x())try{Bs=await b.getTeamMembers(x().id),rs(Bt,Ls),cs()}catch(e){console.error("Failed to load team members:",e)}}async function Pr(){if(x())try{Bs=await b.getTeamMembers(x().id),rs(Bt,Ls),cs(),Rm()}catch(e){v(e.message,"error")}}function Rm(){const e=document.getElementById("team-members-list");e.innerHTML=Bs.map(t=>`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar">${(t.user_name||"U").charAt(0).toUpperCase()}</div>
                <div class="member-details">
                    <span class="member-name">${m(t.user_name||"Unknown")}</span>
                    <span class="member-email">${m(t.user_email||"")}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role">${t.role}</span>
                ${t.user_id!==vn().id&&t.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${p(t.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function ca(){if(x())try{aa=await b.getTeamInvitations(x().id),Pm()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function Pm(){const e=document.getElementById("team-invitations-list");if(aa.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=aa.map(t=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${m(t.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${m(t.role)}</span>
                    <span>Expires: ${new Date(t.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${p(t.id)}">Cancel</button>
        </div>
    `).join("")}async function Nm(){if(x())try{oa=await b.getTeamAgents(x().id),qm()}catch(e){v(e.message,"error")}}function qm(){const e=document.getElementById("team-agents-list");if(e){if(oa.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=oa.map(t=>{const n=m(t.name),s=m(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar agent-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${m(i)}</div>
                <div class="member-details">
                    <span class="member-name">${n}</span>
                    <span class="member-email">Created by ${s} • ${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">Agent</span>
            </div>
        </div>
      `}).join("")}}function Nr(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,N()}async function Om(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await b.createInvitation(x().id,t,n),await ca(),D(),v("Invitation sent!","success")}catch(s){v(`Failed to send invitation: ${s.message}`,"error")}return!1}async function Hm(e){if(confirm("Are you sure you want to remove this member?"))try{await b.removeMember(x().id,e),await Pr(),v("Member removed!","success")}catch(t){v(`Failed to remove member: ${t.message}`,"error")}}async function Fm(e){try{await b.deleteInvitation(x().id,e),await ca(),v("Invitation canceled!","success")}catch(t){v(`Failed to cancel invitation: ${t.message}`,"error")}}function qr(){Rr(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,N()}function Um(){x()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${p(x().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${p(x().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${m(x().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,N())}async function zm(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await b.createTeam(t);await ra(),await la(n),D(),v("Team created!","success")}catch(n){v(`Failed to create team: ${n.message}`,"error")}return!1}async function Gm(e){if(e.preventDefault(),!x())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await b.updateTeam(x().id,t);ui(n),document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await ra(),D(),v("Team updated!","success")}catch(n){v(`Failed to update team: ${n.message}`,"error")}return!1}async function Wm(){if(x())try{const e=await b.getLabels(x().id);as(e)}catch(e){console.error("Failed to load labels:",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),Z({"select-team":(e,t)=>{la(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{Hm(t.userId)},"delete-invitation":(e,t)=>{Fm(t.invitationId)},"invite-member":e=>{Om(e)},"create-team":e=>{zm(e)},"update-team":e=>{Gm(e)}});let Ke=null,ot=0,Kt=null,Yt=null,Rn=null,da=!1;function Vm(){return jc()}function Or(){Mc()}function Hr(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Km(){Ke||(Ke=document.createElement("div"),Ke.id="onboarding-overlay",Ke.className="onboarding-overlay",document.getElementById("app").appendChild(Ke))}function Pn(){if(!Ke)return;const e=da?Ur():Fr(),t=e[ot],n=e.map((s,i)=>`<span class="onboarding-dot${i===ot?" active":""}${i<ot?" completed":""}"></span>`).join("");Ke.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Fr(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Hr(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Hr(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Kt&&(e.textContent=`${Kt.name} (${Kt.key})`),t&&Yt&&(t.textContent=`${Yt.name} (${Yt.key})`),n&&Rn&&(n.textContent=`${Rn.identifier} - ${Rn.title}`)}}]}function Ur(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function ua(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function pa(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Zt(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function Ym(){const e=da?Ur():Fr();ot<e.length-1&&(ot++,Pn())}function Zm(){Or(),Gr(),Nn()}function Xm(){Or(),Gr(),Nn()}async function Qm(e){e.preventDefault(),pa("onboarding-team-error"),Zt("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Kt=await b.createTeam({name:t,key:n}),ot++,Pn()}catch(s){ua("onboarding-team-error",s.message||"Failed to create team"),Zt("onboarding-team-submit",!1)}}async function Jm(e){e.preventDefault(),pa("onboarding-project-error"),Zt("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Yt=await b.createProject(Kt.id,{name:t,key:n}),ot++,Pn()}catch(s){ua("onboarding-project-error",s.message||"Failed to create project"),Zt("onboarding-project-submit",!1)}}async function eg(e){e.preventDefault(),pa("onboarding-issue-error"),Zt("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Rn=await b.createIssue(Yt.id,{title:t}),ot++,Pn()}catch(n){ua("onboarding-issue-error",n.message||"Failed to create issue"),Zt("onboarding-issue-submit",!1)}}function zr(e=!1){da=e,ot=0,Kt=null,Yt=null,Rn=null,Km(),Pn()}function Gr(){Ke&&(Ke.remove(),Ke=null)}function Wr(){Dc(),zr(!0)}Z({"onboarding-next":e=>{e.preventDefault(),Ym()},"onboarding-skip":e=>{e.preventDefault(),Zm()},"onboarding-finish":e=>{e.preventDefault(),Xm()},"onboarding-create-team":e=>{Qm(e)},"onboarding-create-project":e=>{Jm(e)},"onboarding-create-issue":e=>{eg(e)}});async function Nn(){tg(),rg(),await ra();const e=Am();if(e.length===0&&!Vm()){zr();return}e.length>0&&await la(e[0],!0)}let Xt=null,qn=null,Oe=null,He=null;function On(){Xt||(Xt=document.getElementById("auth-screen"),qn=document.getElementById("main-screen"),Oe=document.getElementById("login-form"),He=document.getElementById("signup-form"))}function ma(){On(),Xt&&Xt.classList.remove("hidden"),qn&&qn.classList.add("hidden")}function tg(){On(),Xt&&Xt.classList.add("hidden"),qn&&qn.classList.remove("hidden")}function ng(){On(),Oe&&Oe.classList.remove("hidden"),He&&He.classList.add("hidden")}function sg(){On(),Oe&&Oe.classList.add("hidden"),He&&He.classList.remove("hidden")}async function ig(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await b.login(t,n),is(await b.getMe()),await Nn(),v("Welcome back!","success")}catch(s){v(`Login failed: ${s.message}`,"error")}return!1}async function ag(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await b.signup(t,n,s),await b.login(n,s),is(await b.getMe()),await Nn(),v("Account created successfully!","success")}catch(i){v(`Signup failed: ${i.message}`,"error")}return!1}function Vr(){b.logout(),is(null),ui(null),ma(),v("Signed out","success")}function og(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function rg(){const e=vn();if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?og(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${p(s)}" alt="${p(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function lg(){On();const e=Oe==null?void 0:Oe.querySelector("form");e&&e.addEventListener("submit",i=>ig(i));const t=He==null?void 0:He.querySelector("form");t&&t.addEventListener("submit",i=>ag(i));const n=Oe==null?void 0:Oe.querySelector(".auth-switch a");n&&n.addEventListener("click",i=>{i.preventDefault(),sg()});const s=He==null?void 0:He.querySelector(".auth-switch a");s&&s.addEventListener("click",i=>{i.preventDefault(),ng()})}let ga=[];async function fa(){try{ga=await b.getApiKeys(),cg()}catch(e){v(e.message,"error")}}function cg(){const e=document.getElementById("api-keys-list");if(e){if(ga.length===0){e.innerHTML='<p class="empty-state">No API keys yet. Create one to get started.</p>';return}e.innerHTML=ga.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${m(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${m(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${di(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${di(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${p(t.id)}" data-key-name="${p(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function dg(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,N()}async function ug(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await b.createApiKey(t);D(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,N()}catch(n){v(n.message,"error")}return!1}async function pg(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),v("API key copied to clipboard","success")}catch{v("Failed to copy","error")}}async function mg(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await b.revokeApiKey(e),v("API key revoked","success"),await fa()}catch(n){v(n.message,"error")}}Z({"create-api-key":e=>{ug(e)},"copy-api-key":()=>{pg()},"dismiss-api-key-modal":()=>{D(),fa()},"revoke-api-key":(e,t)=>{mg(t.keyId,t.keyName)}});let As=!1,rt=0,yt=[],js=[];function gg(e){js=e,yt=[...e]}function ha(){return As}function fg(){if(As)return;As=!0,rt=0,yt=[...js];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Ms()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>hg(n.target.value)),t.addEventListener("keydown",bg),e.addEventListener("mouseover",n=>{const s=n.target.closest('[data-action="execute-command"]');s&&vg(Number(s.dataset.commandIndex))}),Hn(),requestAnimationFrame(()=>t.focus())}function Ms(){As=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function hg(e){const t=e.toLowerCase().trim();t?yt=js.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):yt=[...js],rt=0,Hn()}function Hn(){const e=document.getElementById("command-results");if(!e)return;if(yt.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};yt.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${s===rt?"selected":""}"
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
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function vg(e){rt=e,Hn()}function Kr(e){const t=yt[e];t&&(Ms(),t.action())}function bg(e){switch(e.key){case"ArrowDown":e.preventDefault(),rt=Math.min(rt+1,yt.length-1),Hn();break;case"ArrowUp":e.preventDefault(),rt=Math.max(rt-1,0),Hn();break;case"Enter":e.preventDefault(),Kr(rt);break;case"Escape":e.preventDefault(),Ms();break}}Z({"execute-command":(e,t)=>{Kr(Number(t.commandIndex))}});async function yg(){const e=document.getElementById("epics-project-filter");if(!e)return;await ke(),e.innerHTML='<option value="">All Projects</option>'+U().map(n=>`<option value="${p(n.id)}">${m(n.name)}</option>`).join("");const t=Vt()||Cn();t&&U().some(n=>n.id===t)&&(e.value=t),va()}function wg(){var t;const e=(t=document.getElementById("epics-project-filter"))==null?void 0:t.value;e&&(Gt(e),Zi(e)),va()}async function va(){var t,n;const e=document.getElementById("epics-list");if(e){e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((t=x())!=null&&t.id)){e.innerHTML='<div class="empty-state">Select a team to view epics.</div>';return}const s=(n=document.getElementById("epics-project-filter"))==null?void 0:n.value;let i;if(s?i=await b.getIssues({project_id:s,issue_type:"epic"}):i=await b.getTeamIssues(x().id,{issue_type:"epic"}),!i||i.length===0){e.innerHTML=`
                <div class="empty-state">
                    <p>No epics found.</p>
                    <p class="empty-state-hint">Click "+ New Epic" above or use the CLI: <code>chaotic epic create "Epic title"</code></p>
                </div>
            `;return}const a=await Promise.all(i.map(async o=>{let r=[];try{r=await b.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));$g(a,e)}catch(s){e.innerHTML=`<div class="empty-state">Failed to load epics: ${m(s.message||String(s))}</div>`}}}function $g(e,t){const n=e.map(s=>{const i=s.subIssues?s.subIssues.length:0,a=s.subIssues?s.subIssues.filter(h=>h.status==="done"||h.status==="canceled").length:0,o=i>0?Math.round(a/i*100):0,r=i>0?`${a}/${i}`:"-",d=`status-${(s.status||"backlog").replace(/_/g,"-")}`,l=(s.status||"backlog").replace(/_/g," ").replace(/\b\w/g,h=>h.toUpperCase()),c=s.estimate!=null?`${s.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${p(s.identifier)}" style="cursor: pointer;">
                <td class="epic-identifier">${m(s.identifier)}</td>
                <td class="epic-title">${m(s.title)}</td>
                <td class="epic-progress">
                    <div class="epic-progress-bar-container">
                        <div class="epic-progress-bar">
                            <div class="epic-progress-fill${o===100?" epic-progress-complete":""}" style="width: ${o}%"></div>
                        </div>
                        <span class="epic-progress-text">${r}</span>
                    </div>
                </td>
                <td class="epic-estimate">${c}</td>
                <td class="epic-status"><span class="status-badge ${d}">${l}</span></td>
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
    `,t._epicClickHandler||(t._epicClickHandler=s=>{const i=s.target.closest(".epic-row");i&&i.dataset.identifier&&wm(i.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function kg(){var n;const e=(n=document.getElementById("epics-project-filter"))==null?void 0:n.value,t=U().map(s=>`
        <option value="${p(s.id)}" ${s.id===e?"selected":""}>${m(s.name)}</option>
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
    `,N(),document.getElementById("create-epic-form").addEventListener("submit",Eg),document.getElementById("create-epic-title").focus()}async function Eg(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),s=document.getElementById("create-epic-description").value.trim();if(!t){v("Please select a project","error");return}if(!n){v("Please enter a title","error");return}try{const i=await b.createIssue(t,{title:n,description:s||null,issue_type:"epic"});D(),v(`Created epic ${i.identifier}`,"success"),va()}catch(i){v(`Failed to create epic: ${i.message}`,"error")}}async function Yr(e){try{let t;if(e.includes("-")?t=await b.getIssueByIdentifier(e):t=await b.getIssue(e),t){if(t.issue_type!=="epic"){F(t.id,!1);return}await Zr(t.id,!1)}else M("epics",!1)}catch{M("epics",!1)}}async function Zr(e,t=!0){try{const[n,s,i,a]=await Promise.all([b.getIssue(e),b.getSubIssues(e),b.getActivities(e),b.getComments(e)]);if(n.issue_type!=="epic"){F(e,t);return}t&&history.pushState({epicId:e,view:j()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach($=>$.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=j()||"epics",d=U().find($=>$.id===n.project_id),l=n.assignee_id?yn(n.assignee_id):null,c=l?_t(l):null,h=s.length,u=s.filter($=>$.status==="done"||$.status==="canceled").length,f=h>0?Math.round(u/h*100):0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(r)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${d?m(d.name):"Project"} › ${m(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${fs(n.description)}
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
                                <span>${u} of ${h} done</span>
                                <span>${f}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:s.map($=>{const E=$.assignee_id?yn($.assignee_id):null,T=E?_t(E):null;return`
                                <div class="sub-issue-item" data-issue-id="${p($.id)}" data-identifier="${p($.identifier)}">
                                    <span class="sub-issue-status">${he($.status)}</span>
                                    <span class="sub-issue-id">${m($.identifier)}</span>
                                    <span class="sub-issue-title">${m($.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${($.status||"backlog").replace(/_/g,"-")}">${ye($.status)}</span>
                                    ${T?`<span class="sub-issue-assignee">${m(T)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${i.length===0?`
                                <div class="activity-empty">No activity yet</div>
                            `:i.map($=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Bi($.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${ji($)}</span>
                                        <span class="activity-actor">by ${m(Ai($))}</span>
                                        <span class="activity-time">${ze($.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${a.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${a.map($=>`
                                <div class="comment">
                                    <div class="comment-avatar">${($.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m($.author_name||"User")}</span>
                                            <span class="comment-date">${ze($.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${m($.content||"")}</div>
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
                                ${he(n.status)}
                                ${ye(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${Ve(n.priority)}
                                ${we(n.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${c?m(c):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${Ts(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map($=>`
                                    <span class="issue-label" style="background: ${z($.color)}20; color: ${z($.color)}">${m($.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${d?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(d.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const y=o.querySelector(".sub-issues-list");y&&y.addEventListener("click",$=>{const E=$.target.closest(".sub-issue-item");E&&E.dataset.issueId&&F(E.dataset.issueId)})}catch(n){v(`Failed to load epic: ${n.message}`,"error")}}function _g(e){let t=!1,n=null;return function(i){if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){switch(t=!1,clearTimeout(n),i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break}return}switch(i.key){case"c":i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}function Ig(e){return function(n){var s;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const i=e.getModalForm();if(i)n.preventDefault(),i.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const i=(s=document.activeElement)==null?void 0:s.closest("form");i&&(n.preventDefault(),i.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.openCommandPalette())}}}function Ds(e,t,n="#issues-list .list-item"){const s=document.querySelectorAll(n);s.length!==0&&(e=Math.max(0,Math.min(s.length-1,e)),s.forEach(i=>i.classList.remove("keyboard-selected")),t(e),s[e].classList.add("keyboard-selected"),s[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function xg(e){return function(n){if(e.getCurrentView()!=="issues"||n.target.tagName==="INPUT"||n.target.tagName==="TEXTAREA"||n.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll("#issues-list .list-item");if(s.length===0)return;const i=e.getSelectedIndex();switch(n.key){case"j":n.preventDefault(),Ds(i+1,e.setSelectedIndex);break;case"k":n.preventDefault(),Ds(i-1,e.setSelectedIndex);break;case"Enter":if(i>=0&&s[i]){n.preventDefault();const a=s[i].dataset.id;a&&!a.startsWith("temp-")&&e.viewIssue(a)}break;case"e":if(i>=0&&s[i]){n.preventDefault();const a=s[i].dataset.id;a&&!a.startsWith("temp-")&&e.showEditIssueModal(a)}break;case"Escape":i>=0&&(n.preventDefault(),s.forEach(a=>a.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Tg(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(s){if(e.getCurrentView()!=="documents"||s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const i=document.querySelectorAll(t);if(i.length===0)return;const a=e.getSelectedIndex();switch(s.key){case"j":s.preventDefault(),Ds(a+1,e.setSelectedIndex,t);break;case"k":s.preventDefault(),Ds(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&i[a]){s.preventDefault();const o=i[a].dataset.documentId;o&&e.viewDocument(o)}break;case"e":if(a>=0&&i[a]){s.preventDefault();const o=i[a].dataset.documentId;o&&e.showEditDocumentModal&&e.showEditDocumentModal(o)}break;case"Escape":a>=0&&(s.preventDefault(),i.forEach(o=>o.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const wt=new Map,Xr=6e4,ba=100;let re=null,ya=null,wa=null,Fn=null,Qr=!1;const Sg={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},Lg={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Jr={api:null};let $a={...Jr};function Cg(e={}){$a={...Jr,...e},re||(re=document.createElement("div"),re.className="issue-tooltip",re.style.display="none",document.body.appendChild(re),re.addEventListener("mouseenter",()=>{clearTimeout(ya)}),re.addEventListener("mouseleave",()=>{ka()})),Qr||(document.addEventListener("mouseover",Bg),document.addEventListener("mouseout",Ag),Qr=!0)}function Bg(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=jg(t);if(n){if(n===Fn&&re.style.display!=="none"){clearTimeout(ya);return}clearTimeout(wa),wa=setTimeout(()=>{Mg(t,n)},200)}}function Ag(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(wa),ya=setTimeout(()=>{ka()},150))}function jg(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function Mg(e,t){Fn=t;const n=e.getBoundingClientRect();re.style.left=`${n.left+window.scrollX}px`,re.style.top=`${n.bottom+window.scrollY+8}px`,re.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',re.style.display="block";try{const s=await Rg(t);if(Fn!==t)return;Pg(s)}catch{if(Fn!==t)return;re.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function ka(){re&&(re.style.display="none"),Fn=null}function Dg(){const e=Date.now();for(const[t,n]of wt.entries())e-n.timestamp>=Xr&&wt.delete(t)}async function Rg(e){wt.size>ba/2&&Dg();const t=wt.get(e);if(t&&Date.now()-t.timestamp<Xr)return t.issue;if(!$a.api)throw new Error("API not initialized");const n=await $a.api.getIssueByIdentifier(e);if(wt.size>=ba){const s=Array.from(wt.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,ba/2);for(const[a]of i)wt.delete(a)}return wt.set(e,{issue:n,timestamp:Date.now()}),n}function Pg(e){const t=Sg[e.status]||"#6b7280",n=Lg[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";re.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${m(e.identifier)}</span>
            <span class="issue-tooltip-type">${m(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${m(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${Ng(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${qg(e.priority)}</span>
        </div>
    `}function Ng(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function qg(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Og(){at("issue:created",Hg),at("issue:updated",Fg),at("issue:deleted",Ug),at("comment",zg),at("relation",Gg),at("attestation",Wg),at("activity",Vg),at("project",Kg),at("sprint",Yg)}function Hg(e){var i,a,o;const t=$e(),n=t.findIndex(r=>r.id===e.id),s=t.findIndex(r=>r._isOptimistic&&r.title===e.title);if(!(n>=0))if(s>=0){const r=[...t];r[s]=e,Ge(r),j()==="issues"&&nt()}else Ge([e,...t]),j()==="issues"&&nt(),v(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((i=vn())==null?void 0:i.id)){const r=gt(),d=r.findIndex(c=>c.id===e.id),l=r.findIndex(c=>c._isOptimistic&&c.title===e.title);if(d===-1&&l===-1)Nt([e,...r]),j()==="my-issues"&&$n();else if(l>=0){const c=[...r];c[l]=e,Nt(c),j()==="my-issues"&&$n()}}j()==="my-issues"&&qt({showLoading:!1}),j()==="board"?mt():j()==="sprints"&&bt(),j()==="issue-detail"&&e.parent_id===((a=fe())==null?void 0:a.id)&&F((o=fe())==null?void 0:o.id,!1)}function Fg(e){const t=$e();t.some(s=>s.id===e.id)&&Ge(t.map(s=>s.id===e.id?e:s));const n=gt();if(n.some(s=>s.id===e.id)&&Nt(n.map(s=>s.id===e.id?e:s)),j()==="issues")nt();else if(j()==="my-issues")$n(),qt({showLoading:!1});else if(j()==="board")mt();else if(j()==="sprints")bt();else if(j()==="issue-detail"){const s=document.getElementById("issue-detail-content");s&&s.dataset.issueId===e.id&&F(e.id)}}function Ug(e){var t;Ge($e().filter(n=>n.id!==e.id)),Nt(gt().filter(n=>n.id!==e.id)),j()==="issues"?nt():j()==="my-issues"?($n(),qt({showLoading:!1})):j()==="board"?mt():j()==="sprints"&&bt(),v(`Issue ${e.identifier} deleted`,"info"),j()==="issue-detail"&&((t=fe())==null?void 0:t.id)===e.id&&(v(`Issue ${e.identifier} was deleted`,"warning"),M("my-issues"))}function zg(e){var t;j()==="my-issues"&&qt({showLoading:!1}),j()==="issue-detail"&&((t=fe())==null?void 0:t.id)===e.issue_id&&F(e.issue_id,!1)}function Gg(e){var t;if(j()==="issue-detail"){const n=(t=fe())==null?void 0:t.id;n&&(e.source_issue_id===n||e.target_issue_id===n)&&F(n,!1)}}function Wg(e){var t;j()==="gate-approvals"&&Tn(),j()==="issue-detail"&&((t=fe())==null?void 0:t.id)===e.issue_id&&F(e.issue_id,!1)}function Vg(e){var t;j()==="my-issues"&&qt({showLoading:!1}),j()==="issue-detail"&&((t=fe())==null?void 0:t.id)===e.issue_id&&F(e.issue_id,!1)}function Kg(e,{type:t}){ke().then(()=>{j()==="projects"&&Bn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?v(`New project: ${e.name}`,"info"):t==="deleted"&&v(`Project ${e.name} deleted`,"info")}function Yg(){j()==="sprints"&&bt()}const el='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function tl(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const s=document.querySelector(".main-content");s&&(e?s.setAttribute("inert",""):s.removeAttribute("inert"))}function Zg(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),tl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(el);n&&n.focus()}}}function Rs(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),tl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.querySelector(".sidebar");if(!t)return;const n=t.querySelectorAll(el);if(n.length===0)return;const s=n[0],i=n[n.length-1];if(!t.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Rs()});async function Xg(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=document.getElementById("project-filter").value;if(!s){v("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=U().find(l=>l.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Ge([r,...$e()]),nt();const d=document.querySelector(`[data-id="${a}"]`);d&&d.classList.add("new");try{const l=await b.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const c=$e(),h=c.findIndex(u=>u.id===a);h!==-1&&(c[h]=l,Ge(c)),nt(),ke(),v("Issue created!","success")}catch(l){Ge($e().filter(c=>c.id!==a)),nt(),v(`Failed to create issue: ${l.message}`,"error")}finally{t.disabled=!1,t.placeholder=i,t.focus()}}bm({beforeNavigate:()=>{am(),Ir(null),os(null),ko(null),Rs(),ka()},detailRoute:e=>e[0]==="epic"&&e[1]?(Yr(e[1]),!0):e[0]==="issue"&&e[1]?(Mi(e[1]),!0):e[0]==="document"&&e[1]?(df(e[1]),!0):e[0]==="sprint"&&e[1]?(gp(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Tr(e[1]),!0):!1,detailPopstate:e=>e.epicId?(Zr(e.epicId,!1),!0):e.issueId?(F(e.issueId,!1),!0):e.identifier?(Mi(e.identifier),!0):e.documentId?(qe(e.documentId,!1),!0):e.sprintId?(Ui(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=Vt();e&&U().some(t=>t.id===e)&&Gt(e)},issueNavigate:e=>Mi(e),epicNavigate:e=>Yr(e)}),vm({"my-issues":()=>{Ii(),qt()},"gate-approvals":()=>{Tn()},issues:()=>{wd(),Kd(),yd().then(()=>{const t=new URLSearchParams(window.location.search).getAll("label");if(t.length>0){const n=document.getElementById("label-filter-dropdown");n&&(n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),Co())}}),qo().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}St()})},epics:()=>{yg()},board:()=>{vi()},projects:()=>{ke().then(Bn)},sprints:()=>{gr()},rituals:()=>{Bp()},documents:()=>{In()},team:()=>{Pr(),Nm(),ca()},settings:()=>{fa(),ia(),Cp()}});function Qg(){const e=document.getElementById("modal-overlay");if(e){e.addEventListener("click",()=>D());const n=e.querySelector(".modal");n&&n.addEventListener("click",s=>s.stopPropagation())}const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>D())}function Jg(){const e={showCreateIssueModal:kn,showCreateEpicModal:kg,showCreateProjectModal:xr,showCreateDocumentModal:dr,showCreateTeamModal:qr,showEditTeamModal:Um,showInviteModal:Nr,showCreateApiKeyModal:dg,showCreateAgentModal:xm,resetOnboarding:Wr,logout:Vr,navigateToProjects:()=>M("projects")};document.querySelectorAll("[data-action]").forEach(t=>{const n=e[t.dataset.action];n&&t.addEventListener("click",()=>n())})}function ef(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(i=>{i.addEventListener("click",()=>Sr(i.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>lm());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>cm()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([i,a])=>{const o=e.querySelector(`#${i} .btn-primary`);o&&o.addEventListener("click",()=>Lr(a))})}function tf(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>rr("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>rr("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>lr());const s=document.getElementById("doc-search");s&&s.addEventListener("input",()=>Pu());const i=document.getElementById("doc-project-filter");i&&i.addEventListener("change",()=>Ni());const a=document.getElementById("doc-sort");a&&a.addEventListener("change",()=>vt())}function nf(){const e=document.getElementById("dashboard-project-filter");e&&e.addEventListener("change",()=>xi());const t=document.getElementById("my-issues-status-filter");t&&t.addEventListener("change",()=>xi())}function sf(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>Yd());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",f=>Ed(f));const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",f=>_d(f));const s=document.getElementById("project-filter");s&&s.addEventListener("change",()=>Oo()),document.querySelectorAll(".multi-select-btn").forEach(f=>{const y=f.parentElement;y!=null&&y.querySelector("#status-filter-dropdown")?f.addEventListener("click",()=>bi("status-filter-dropdown")):y!=null&&y.querySelector("#priority-filter-dropdown")?f.addEventListener("click",()=>bi("priority-filter-dropdown")):y!=null&&y.querySelector("#label-filter-dropdown")&&f.addEventListener("click",()=>bi("label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",()=>ds())});const f=i.querySelector(".btn-small");f&&f.addEventListener("click",()=>yi())}const a=document.getElementById("priority-filter-dropdown");if(a){a.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",()=>wi())});const f=a.querySelector(".btn-small");f&&f.addEventListener("click",()=>$i())}const o=document.getElementById("label-filter-dropdown");if(o){const f=o.querySelector(".btn-small");f&&f.addEventListener("click",()=>us())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>Pe());const d=document.getElementById("assignee-filter");d&&d.addEventListener("change",()=>Pe());const l=document.getElementById("sprint-filter");l&&l.addEventListener("change",()=>Pe());const c=document.getElementById("sort-by-select");c&&c.addEventListener("change",()=>St());const h=document.getElementById("group-by-select");h&&h.addEventListener("change",()=>Ho());const u=document.querySelector(".quick-create-input");u&&u.addEventListener("keydown",f=>Xg(f))}function af(){const e=document.getElementById("board-project-filter");e&&e.addEventListener("change",()=>dd());const t=document.getElementById("epics-project-filter");t&&t.addEventListener("change",()=>wg());const n=document.getElementById("sprint-project-filter");n&&n.addEventListener("change",()=>up())}function of(){const e=document.getElementById("rituals-project-filter");e&&e.addEventListener("change",()=>vr());const t=document.getElementById("rituals-view");t&&t.querySelectorAll(".settings-tab[data-tab]").forEach(n=>{n.addEventListener("click",()=>jp(n.dataset.tab))})}function rf(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>Rr());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>kn()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),M(o.dataset.view)})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Mm());const s=document.querySelector(".sidebar-backdrop");s&&s.addEventListener("click",()=>Rs());const i=document.getElementById("hamburger-btn");i&&i.addEventListener("click",()=>Zg());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>kn())}Z({"navigate-to":(e,t)=>{M(t.view)}}),document.addEventListener("DOMContentLoaded",async()=>{if(rd(),lg(),rf(),Qg(),Jg(),nf(),sf(),af(),of(),ef(),tf(),lf(),cf(),Cg({api:b}),$m(),Og(),b.getToken())try{const e=await b.getMe();is(e),await Nn()}catch{b.logout(),ma()}else ma()});function lf(){const e=document.getElementById("theme-toggle");if(!e)return;const t=Cc()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),Bc(n?"light":"dark")})}function cf(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");jr(s)}}})}async function df(e){try{await qe(e,!1)}catch{M("documents",!1)}}document.addEventListener("keydown",_g({closeModal:D,closeSidebar:Rs,navigateTo:M,showCreateIssueModal:kn,showKeyboardShortcutsHelp:nl,isModalOpen:ss,focusSearch:()=>{M("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden")}}));function nl(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
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
    `,N()}gg([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>M("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>M("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>M("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>M("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>M("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>M("documents"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>M("team"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{M("issues"),setTimeout(kn,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{M("projects"),setTimeout(xr,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{M("documents"),setTimeout(dr,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>qr(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{M("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{M("team"),setTimeout(Nr,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>nl(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Wr(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Vr(),category:"Account"}]),document.addEventListener("keydown",Ig({isModalOpen:ss,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:ha,openCommandPalette:fg,closeCommandPalette:Ms})),document.addEventListener("keydown",xg({getCurrentView:j,getSelectedIndex:Qc,setSelectedIndex:yo,viewIssue:F,showEditIssueModal:tr,isModalOpen:ss,isCommandPaletteOpen:ha})),document.addEventListener("keydown",Tg({getCurrentView:j,getSelectedIndex:Jc,setSelectedIndex:wo,viewDocument:qe,showEditDocumentModal:ur,isModalOpen:ss,isCommandPaletteOpen:ha})),window.marked=R,window.DOMPurify=mo,console.log("Chaotic frontend loaded via Vite")})();
