var Lf=Object.defineProperty;var Cf=(tt,pe,Tt)=>pe in tt?Lf(tt,pe,{enumerable:!0,configurable:!0,writable:!0,value:Tt}):tt[pe]=Tt;var F=(tt,pe,Tt)=>Cf(tt,typeof pe!="symbol"?pe+"":pe,Tt);(function(){"use strict";var Ba;function tt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var pe=tt();function Tt(e){pe=e}var dn={exec:()=>null};function O(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(me.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var me={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Rl=/^(?:[ \t]*(?:\n|$))+/,Pl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Nl=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,un=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ql=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ti=/(?:[*+-]|\d{1,9}[.)])/,Ka=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ya=O(Ka).replace(/bull/g,ti).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ol=O(Ka).replace(/bull/g,ti).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ni=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Hl=/^[^\n]+/,si=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Fl=O(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",si).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ul=O(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ti).getRegex(),Xn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ii=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,zl=O("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ii).replace("tag",Xn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Za=O(ni).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Xn).getRegex(),Gl=O(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Za).getRegex(),ai={blockquote:Gl,code:Pl,def:Fl,fences:Nl,heading:ql,hr:un,html:zl,lheading:Ya,list:Ul,newline:Rl,paragraph:Za,table:dn,text:Hl},Xa=O("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Xn).getRegex(),Wl={...ai,lheading:Ol,table:Xa,paragraph:O(ni).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Xa).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Xn).getRegex()},Vl={...ai,html:O(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ii).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:dn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:O(ni).replace("hr",un).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ya).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Kl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Yl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Qa=/^( {2,}|\\)\n(?!\s*$)/,Zl=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Qn=/[\p{P}\p{S}]/u,oi=/[\s\p{P}\p{S}]/u,Ja=/[^\s\p{P}\p{S}]/u,Xl=O(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,oi).getRegex(),eo=/(?!~)[\p{P}\p{S}]/u,Ql=/(?!~)[\s\p{P}\p{S}]/u,Jl=/(?:[^\s\p{P}\p{S}]|~)/u,ec=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,to=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,tc=O(to,"u").replace(/punct/g,Qn).getRegex(),nc=O(to,"u").replace(/punct/g,eo).getRegex(),no="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",sc=O(no,"gu").replace(/notPunctSpace/g,Ja).replace(/punctSpace/g,oi).replace(/punct/g,Qn).getRegex(),ic=O(no,"gu").replace(/notPunctSpace/g,Jl).replace(/punctSpace/g,Ql).replace(/punct/g,eo).getRegex(),ac=O("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ja).replace(/punctSpace/g,oi).replace(/punct/g,Qn).getRegex(),oc=O(/\\(punct)/,"gu").replace(/punct/g,Qn).getRegex(),rc=O(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),lc=O(ii).replace("(?:-->|$)","-->").getRegex(),cc=O("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",lc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Jn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,dc=O(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Jn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),so=O(/^!?\[(label)\]\[(ref)\]/).replace("label",Jn).replace("ref",si).getRegex(),io=O(/^!?\[(ref)\](?:\[\])?/).replace("ref",si).getRegex(),uc=O("reflink|nolink(?!\\()","g").replace("reflink",so).replace("nolink",io).getRegex(),ri={_backpedal:dn,anyPunctuation:oc,autolink:rc,blockSkip:ec,br:Qa,code:Yl,del:dn,emStrongLDelim:tc,emStrongRDelimAst:sc,emStrongRDelimUnd:ac,escape:Kl,link:dc,nolink:io,punctuation:Xl,reflink:so,reflinkSearch:uc,tag:cc,text:Zl,url:dn},pc={...ri,link:O(/^!?\[(label)\]\((.*?)\)/).replace("label",Jn).getRegex(),reflink:O(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Jn).getRegex()},li={...ri,emStrongRDelimAst:ic,emStrongLDelim:nc,url:O(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},mc={...li,br:O(Qa).replace("{2,}","*").getRegex(),text:O(li.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},es={normal:ai,gfm:Wl,pedantic:Vl},pn={normal:ri,gfm:li,breaks:mc,pedantic:pc},gc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ao=e=>gc[e];function Ge(e,t){if(t){if(me.escapeTest.test(e))return e.replace(me.escapeReplace,ao)}else if(me.escapeTestNoEncode.test(e))return e.replace(me.escapeReplaceNoEncode,ao);return e}function oo(e){try{e=encodeURI(e).replace(me.percentDecode,"%")}catch{return null}return e}function ro(e,t){var a;const n=e.replace(me.findPipe,(o,r,d)=>{let l=!1,c=r;for(;--c>=0&&d[c]==="\\";)l=!l;return l?"|":" |"}),s=n.split(me.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(me.slashPipe,"|");return s}function mn(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function fc(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function lo(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const d={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,d}function hc(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var ts=class{constructor(e){F(this,"options");F(this,"rules");F(this,"lexer");this.options=e||pe}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:mn(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=hc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=mn(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:mn(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=mn(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let d;for(d=0;d<n.length;d++)if(this.rules.other.blockquoteStart.test(n[d]))r.push(n[d]),o=!0;else if(!o)r.push(n[d]);else break;n=n.slice(d);const l=r.join(`
`),c=l.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${l}`:l,i=i?`${i}
${c}`:c;const f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,a,!0),this.lexer.state.top=f,n.length===0)break;const m=a.at(-1);if((m==null?void 0:m.type)==="code")break;if((m==null?void 0:m.type)==="blockquote"){const h=m,w=h.raw+`
`+n.join(`
`),y=this.blockquote(w);a[a.length-1]=y,s=s.substring(0,s.length-h.raw.length)+y.raw,i=i.substring(0,i.length-h.text.length)+y.text;break}else if((m==null?void 0:m.type)==="list"){const h=m,w=h.raw+`
`+n.join(`
`),y=this.list(w);a[a.length-1]=y,s=s.substring(0,s.length-m.raw.length)+y.raw,i=i.substring(0,i.length-h.raw.length)+y.raw,n=w.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let d=!1,l="",c="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),m=e.split(`
`,1)[0],h=!f.trim(),w=0;if(this.options.pedantic?(w=2,c=f.trimStart()):h?w=t[1].length+1:(w=t[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,c=f.slice(w),w+=t[1].length),h&&this.rules.other.blankLine.test(m)&&(l+=m+`
`,e=e.substring(m.length+1),d=!0),!d){const L=this.rules.other.nextBulletRegex(w),j=this.rules.other.hrRegex(w),S=this.rules.other.fencesBeginRegex(w),C=this.rules.other.headingBeginRegex(w),B=this.rules.other.htmlBeginRegex(w);for(;e;){const K=e.split(`
`,1)[0];let H;if(m=K,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),H=m):H=m.replace(this.rules.other.tabCharGlobal,"    "),S.test(m)||C.test(m)||B.test(m)||L.test(m)||j.test(m))break;if(H.search(this.rules.other.nonSpaceChar)>=w||!m.trim())c+=`
`+H.slice(w);else{if(h||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||S.test(f)||C.test(f)||j.test(f))break;c+=`
`+m}!h&&!m.trim()&&(h=!0),l+=K+`
`,e=e.substring(K.length+1),f=H.slice(w)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(l)&&(o=!0));let y=null,_;this.options.gfm&&(y=this.rules.other.listIsTask.exec(c),y&&(_=y[0]!=="[ ] ",c=c.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:l,task:!!y,checked:_,loose:!1,text:c,tokens:[]}),i.raw+=l}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let d=0;d<i.items.length;d++)if(this.lexer.state.top=!1,i.items[d].tokens=this.lexer.blockTokens(i.items[d].text,[]),!i.loose){const l=i.items[d].tokens.filter(f=>f.type==="space"),c=l.length>0&&l.some(f=>this.rules.other.anyLine.test(f.raw));i.loose=c}if(i.loose)for(let d=0;d<i.items.length;d++)i.items[d].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=ro(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(ro(r,a.header.length).map((d,l)=>({text:d,tokens:this.lexer.inline(d),header:!1,align:a.align[l]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=mn(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=fc(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),lo(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return lo(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,d=a,l=0;const c=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+a);(s=c.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){d+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){l+=r;continue}if(d-=r,d>0)continue;r=Math.min(r,r+d+l);const f=[...s[0]][0].length,m=e.slice(0,a+s.index+f+r);if(Math.min(a,r)%2){const w=m.slice(1,-1);return{type:"em",raw:m,text:w,tokens:this.lexer.inlineTokens(w)}}const h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},nt=class Wa{constructor(t){F(this,"tokens");F(this,"options");F(this,"state");F(this,"tokenizer");F(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||pe,this.options.tokenizer=this.options.tokenizer||new ts,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:me,block:es.normal,inline:pn.normal};this.options.pedantic?(n.block=es.pedantic,n.inline=pn.pedantic):this.options.gfm&&(n.block=es.gfm,this.options.breaks?n.inline=pn.breaks:n.inline=pn.gfm),this.tokenizer.rules=n}static get rules(){return{block:es,inline:pn}}static lex(t,n){return new Wa(n).lex(t)}static lexInline(t,n){return new Wa(n).inlineTokens(t)}lex(t){t=t.replace(me.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(me.tabCharGlobal,"    ").replace(me.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(l=>(r=l.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const l=n.at(-1);r.raw.length===1&&l!==void 0?l.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let d=t;if((o=this.options.extensions)!=null&&o.startBlock){let l=1/0;const c=t.slice(1);let f;this.options.extensions.startBlock.forEach(m=>{f=m.call({lexer:this},c),typeof f=="number"&&f>=0&&(l=Math.min(l,f))}),l<1/0&&l>=0&&(d=t.substring(0,l+1))}if(this.state.top&&(r=this.tokenizer.paragraph(d))){const l=n.at(-1);s&&(l==null?void 0:l.type)==="paragraph"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r),s=d.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(t){const l="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,d,l;let s=t,i=null;if(this.tokens.links){const c=Object.keys(this.tokens.links);if(c.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)c.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let c;if((d=(r=this.options.extensions)==null?void 0:r.inline)!=null&&d.some(m=>(c=m.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);const m=n.at(-1);c.type==="text"&&(m==null?void 0:m.type)==="text"?(m.raw+=c.raw,m.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,s,o)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let f=t;if((l=this.options.extensions)!=null&&l.startInline){let m=1/0;const h=t.slice(1);let w;this.options.extensions.startInline.forEach(y=>{w=y.call({lexer:this},h),typeof w=="number"&&w>=0&&(m=Math.min(m,w))}),m<1/0&&m>=0&&(f=t.substring(0,m+1))}if(c=this.tokenizer.inlineText(f)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(o=c.raw.slice(-1)),a=!0;const m=n.at(-1);(m==null?void 0:m.type)==="text"?(m.raw+=c.raw,m.text+=c.text):n.push(c);continue}if(t){const m="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(m);break}else throw new Error(m)}}return n}},ns=class{constructor(e){F(this,"options");F(this,"parser");this.options=e||pe}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(me.notSpaceStart))==null?void 0:a[0],i=e.replace(me.endingNewline,"")+`
`;return s?'<pre><code class="language-'+Ge(s)+'">'+(n?i:Ge(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:Ge(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let s="";for(let o=0;o<e.items.length;o++){const r=e.items[o];s+=this.listitem(r)}const i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){var n;let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+Ge(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){const a=e.rows[i];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ge(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=oo(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+Ge(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=oo(e);if(i===null)return Ge(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Ge(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ge(e.text)}},ci=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},st=class Va{constructor(t){F(this,"options");F(this,"renderer");F(this,"textRenderer");this.options=t||pe,this.options.renderer=this.options.renderer||new ns,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ci}static parse(t,n){return new Va(n).parse(t)}static parseInline(t,n){return new Va(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=r,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=c||"";continue}}const d=r;switch(d.type){case"space":{s+=this.renderer.space(d);continue}case"hr":{s+=this.renderer.hr(d);continue}case"heading":{s+=this.renderer.heading(d);continue}case"code":{s+=this.renderer.code(d);continue}case"table":{s+=this.renderer.table(d);continue}case"blockquote":{s+=this.renderer.blockquote(d);continue}case"list":{s+=this.renderer.list(d);continue}case"html":{s+=this.renderer.html(d);continue}case"paragraph":{s+=this.renderer.paragraph(d);continue}case"text":{let l=d,c=this.renderer.text(l);for(;o+1<t.length&&t[o+1].type==="text";)l=t[++o],c+=`
`+this.renderer.text(l);n?s+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):s+=c;continue}default:{const l='Token with "'+d.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=l||"";continue}}const d=r;switch(d.type){case"escape":{s+=n.text(d);break}case"html":{s+=n.html(d);break}case"link":{s+=n.link(d);break}case"image":{s+=n.image(d);break}case"strong":{s+=n.strong(d);break}case"em":{s+=n.em(d);break}case"codespan":{s+=n.codespan(d);break}case"br":{s+=n.br(d);break}case"del":{s+=n.del(d);break}case"text":{s+=n.text(d);break}default:{const l='Token with "'+d.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},ss=(Ba=class{constructor(e){F(this,"options");F(this,"block");this.options=e||pe}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?nt.lex:nt.lexInline}provideParser(){return this.block?st.parse:st.parseInline}},F(Ba,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Ba),vc=class{constructor(...e){F(this,"defaults",tt());F(this,"options",this.setOptions);F(this,"parse",this.parseMarkdown(!0));F(this,"parseInline",this.parseMarkdown(!1));F(this,"Parser",st);F(this,"Renderer",ns);F(this,"TextRenderer",ci);F(this,"Lexer",nt);F(this,"Tokenizer",ts);F(this,"Hooks",ss);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const d of r)n=n.concat(this.walkTokens(d.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const d=o[r].flat(1/0);n=n.concat(this.walkTokens(d,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new ns(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],d=i[o];i[o]=(...l)=>{let c=r.apply(i,l);return c===!1&&(c=d.apply(i,l)),c||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new ts(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],d=i[o];i[o]=(...l)=>{let c=r.apply(i,l);return c===!1&&(c=d.apply(i,l)),c}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new ss;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],d=i[o];ss.passThroughHooks.has(a)?i[o]=l=>{if(this.defaults.async)return Promise.resolve(r.call(i,l)).then(f=>d.call(i,f));const c=r.call(i,l);return d.call(i,c)}:i[o]=(...l)=>{let c=r.apply(i,l);return c===!1&&(c=d.apply(i,l)),c}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return nt.lex(e,t??this.defaults)}parser(e,t){return st.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?nt.lex:nt.lexInline,d=a.hooks?a.hooks.provideParser():e?st.parse:st.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(l=>r(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>d(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let l=r(n,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let c=d(l,a);return a.hooks&&(c=a.hooks.postprocess(c)),c}catch(l){return o(l)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+Ge(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},St=new vc;function P(e,t){return St.parse(e,t)}P.options=P.setOptions=function(e){return St.setOptions(e),P.defaults=St.defaults,Tt(P.defaults),P},P.getDefaults=tt,P.defaults=pe,P.use=function(...e){return St.use(...e),P.defaults=St.defaults,Tt(P.defaults),P},P.walkTokens=function(e,t){return St.walkTokens(e,t)},P.parseInline=St.parseInline,P.Parser=st,P.parser=st.parse,P.Renderer=ns,P.TextRenderer=ci,P.Lexer=nt,P.lexer=nt.lex,P.Tokenizer=ts,P.Hooks=ss,P.parse=P,P.options,P.setOptions,P.use,P.walkTokens,P.parseInline,st.parse,nt.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:co,setPrototypeOf:uo,isFrozen:bc,getPrototypeOf:yc,getOwnPropertyDescriptor:wc}=Object;let{freeze:ge,seal:Se,create:di}=Object,{apply:ui,construct:pi}=typeof Reflect<"u"&&Reflect;ge||(ge=function(t){return t}),Se||(Se=function(t){return t}),ui||(ui=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),pi||(pi=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const is=he(Array.prototype.forEach),kc=he(Array.prototype.lastIndexOf),po=he(Array.prototype.pop),gn=he(Array.prototype.push),$c=he(Array.prototype.splice),as=he(String.prototype.toLowerCase),mi=he(String.prototype.toString),gi=he(String.prototype.match),fn=he(String.prototype.replace),Ec=he(String.prototype.indexOf),_c=he(String.prototype.trim),De=he(Object.prototype.hasOwnProperty),fe=he(RegExp.prototype.test),hn=xc(TypeError);function he(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return ui(e,t,s)}}function xc(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return pi(e,n)}}function M(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:as;uo&&uo(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(bc(t)||(t[s]=a),i=a)}e[i]=!0}return e}function Ic(e){for(let t=0;t<e.length;t++)De(e,t)||(e[t]=null);return e}function We(e){const t=di(null);for(const[n,s]of co(e))De(e,n)&&(Array.isArray(s)?t[n]=Ic(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=We(s):t[n]=s);return t}function vn(e,t){for(;e!==null;){const s=wc(e,t);if(s){if(s.get)return he(s.get);if(typeof s.value=="function")return he(s.value)}e=yc(e)}function n(){return null}return n}const mo=ge(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),fi=ge(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),hi=ge(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Tc=ge(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),vi=ge(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Sc=ge(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),go=ge(["#text"]),fo=ge(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),bi=ge(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ho=ge(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),os=ge(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Lc=Se(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Cc=Se(/<%[\w\W]*|[\w\W]*%>/gm),Ac=Se(/\$\{[\w\W]*/gm),Bc=Se(/^data-[\-\w.\u00B7-\uFFFF]+$/),jc=Se(/^aria-[\-\w]+$/),vo=Se(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Mc=Se(/^(?:\w+script|data):/i),Dc=Se(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),bo=Se(/^html$/i),Rc=Se(/^[a-z][.\w]*(-[.\w]+)+$/i);var yo=Object.freeze({__proto__:null,ARIA_ATTR:jc,ATTR_WHITESPACE:Dc,CUSTOM_ELEMENT:Rc,DATA_ATTR:Bc,DOCTYPE_NAME:bo,ERB_EXPR:Cc,IS_ALLOWED_URI:vo,IS_SCRIPT_OR_DATA:Mc,MUSTACHE_EXPR:Lc,TMPLIT_EXPR:Ac});const bn={element:1,text:3,progressingInstruction:7,comment:8,document:9},Pc=function(){return typeof window>"u"?null:window},Nc=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},wo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ko(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Pc();const t=I=>ko(I);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==bn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:d,NodeFilter:l,NamedNodeMap:c=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:m,trustedTypes:h}=e,w=d.prototype,y=vn(w,"cloneNode"),_=vn(w,"remove"),L=vn(w,"nextSibling"),j=vn(w,"childNodes"),S=vn(w,"parentNode");if(typeof o=="function"){const I=n.createElement("template");I.content&&I.content.ownerDocument&&(n=I.content.ownerDocument)}let C,B="";const{implementation:K,createNodeIterator:H,createDocumentFragment:ee,getElementsByTagName:ae}=n,{importNode:Q}=s;let q=wo();t.isSupported=typeof co=="function"&&typeof S=="function"&&K&&K.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:$e,ERB_EXPR:de,TMPLIT_EXPR:Be,DATA_ATTR:je,ARIA_ATTR:ja,IS_SCRIPT_OR_DATA:b,ATTR_WHITESPACE:Me,CUSTOM_ELEMENT:Ee}=yo;let{IS_ALLOWED_URI:mt}=yo,se=null;const gl=M({},[...mo,...fi,...hi,...vi,...go]);let oe=null;const fl=M({},[...fo,...bi,...ho,...os]);let Z=Object.seal(di(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Kn=null,Ma=null;const nn=Object.seal(di(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let hl=!0,Da=!0,vl=!1,bl=!0,sn=!1,Ks=!0,Mt=!1,Ra=!1,Pa=!1,an=!1,Ys=!1,Zs=!1,yl=!0,wl=!1;const kf="user-content-";let Na=!0,Yn=!1,on={},Je=null;const qa=M({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let kl=null;const $l=M({},["audio","video","img","source","image","track"]);let Oa=null;const El=M({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Xs="http://www.w3.org/1998/Math/MathML",Qs="http://www.w3.org/2000/svg",gt="http://www.w3.org/1999/xhtml";let rn=gt,Ha=!1,Fa=null;const $f=M({},[Xs,Qs,gt],mi);let Js=M({},["mi","mo","mn","ms","mtext"]),ei=M({},["annotation-xml"]);const Ef=M({},["title","style","font","a","script"]);let Zn=null;const _f=["application/xhtml+xml","text/html"],xf="text/html";let te=null,ln=null;const If=n.createElement("form"),_l=function(g){return g instanceof RegExp||g instanceof Function},Ua=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ln&&ln===g)){if((!g||typeof g!="object")&&(g={}),g=We(g),Zn=_f.indexOf(g.PARSER_MEDIA_TYPE)===-1?xf:g.PARSER_MEDIA_TYPE,te=Zn==="application/xhtml+xml"?mi:as,se=De(g,"ALLOWED_TAGS")?M({},g.ALLOWED_TAGS,te):gl,oe=De(g,"ALLOWED_ATTR")?M({},g.ALLOWED_ATTR,te):fl,Fa=De(g,"ALLOWED_NAMESPACES")?M({},g.ALLOWED_NAMESPACES,mi):$f,Oa=De(g,"ADD_URI_SAFE_ATTR")?M(We(El),g.ADD_URI_SAFE_ATTR,te):El,kl=De(g,"ADD_DATA_URI_TAGS")?M(We($l),g.ADD_DATA_URI_TAGS,te):$l,Je=De(g,"FORBID_CONTENTS")?M({},g.FORBID_CONTENTS,te):qa,Kn=De(g,"FORBID_TAGS")?M({},g.FORBID_TAGS,te):We({}),Ma=De(g,"FORBID_ATTR")?M({},g.FORBID_ATTR,te):We({}),on=De(g,"USE_PROFILES")?g.USE_PROFILES:!1,hl=g.ALLOW_ARIA_ATTR!==!1,Da=g.ALLOW_DATA_ATTR!==!1,vl=g.ALLOW_UNKNOWN_PROTOCOLS||!1,bl=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,sn=g.SAFE_FOR_TEMPLATES||!1,Ks=g.SAFE_FOR_XML!==!1,Mt=g.WHOLE_DOCUMENT||!1,an=g.RETURN_DOM||!1,Ys=g.RETURN_DOM_FRAGMENT||!1,Zs=g.RETURN_TRUSTED_TYPE||!1,Pa=g.FORCE_BODY||!1,yl=g.SANITIZE_DOM!==!1,wl=g.SANITIZE_NAMED_PROPS||!1,Na=g.KEEP_CONTENT!==!1,Yn=g.IN_PLACE||!1,mt=g.ALLOWED_URI_REGEXP||vo,rn=g.NAMESPACE||gt,Js=g.MATHML_TEXT_INTEGRATION_POINTS||Js,ei=g.HTML_INTEGRATION_POINTS||ei,Z=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&_l(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Z.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&_l(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Z.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(Z.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),sn&&(Da=!1),Ys&&(an=!0),on&&(se=M({},go),oe=[],on.html===!0&&(M(se,mo),M(oe,fo)),on.svg===!0&&(M(se,fi),M(oe,bi),M(oe,os)),on.svgFilters===!0&&(M(se,hi),M(oe,bi),M(oe,os)),on.mathMl===!0&&(M(se,vi),M(oe,ho),M(oe,os))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?nn.tagCheck=g.ADD_TAGS:(se===gl&&(se=We(se)),M(se,g.ADD_TAGS,te))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?nn.attributeCheck=g.ADD_ATTR:(oe===fl&&(oe=We(oe)),M(oe,g.ADD_ATTR,te))),g.ADD_URI_SAFE_ATTR&&M(Oa,g.ADD_URI_SAFE_ATTR,te),g.FORBID_CONTENTS&&(Je===qa&&(Je=We(Je)),M(Je,g.FORBID_CONTENTS,te)),g.ADD_FORBID_CONTENTS&&(Je===qa&&(Je=We(Je)),M(Je,g.ADD_FORBID_CONTENTS,te)),Na&&(se["#text"]=!0),Mt&&M(se,["html","head","body"]),se.table&&(M(se,["tbody"]),delete Kn.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw hn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw hn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');C=g.TRUSTED_TYPES_POLICY,B=C.createHTML("")}else C===void 0&&(C=Nc(h,i)),C!==null&&typeof B=="string"&&(B=C.createHTML(""));ge&&ge(g),ln=g}},xl=M({},[...fi,...hi,...Tc]),Il=M({},[...vi,...Sc]),Tf=function(g){let k=S(g);(!k||!k.tagName)&&(k={namespaceURI:rn,tagName:"template"});const x=as(g.tagName),V=as(k.tagName);return Fa[g.namespaceURI]?g.namespaceURI===Qs?k.namespaceURI===gt?x==="svg":k.namespaceURI===Xs?x==="svg"&&(V==="annotation-xml"||Js[V]):!!xl[x]:g.namespaceURI===Xs?k.namespaceURI===gt?x==="math":k.namespaceURI===Qs?x==="math"&&ei[V]:!!Il[x]:g.namespaceURI===gt?k.namespaceURI===Qs&&!ei[V]||k.namespaceURI===Xs&&!Js[V]?!1:!Il[x]&&(Ef[x]||!xl[x]):!!(Zn==="application/xhtml+xml"&&Fa[g.namespaceURI]):!1},et=function(g){gn(t.removed,{element:g});try{S(g).removeChild(g)}catch{_(g)}},Dt=function(g,k){try{gn(t.removed,{attribute:k.getAttributeNode(g),from:k})}catch{gn(t.removed,{attribute:null,from:k})}if(k.removeAttribute(g),g==="is")if(an||Ys)try{et(k)}catch{}else try{k.setAttribute(g,"")}catch{}},Tl=function(g){let k=null,x=null;if(Pa)g="<remove></remove>"+g;else{const J=gi(g,/^[\r\n\t ]+/);x=J&&J[0]}Zn==="application/xhtml+xml"&&rn===gt&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");const V=C?C.createHTML(g):g;if(rn===gt)try{k=new m().parseFromString(V,Zn)}catch{}if(!k||!k.documentElement){k=K.createDocument(rn,"template",null);try{k.documentElement.innerHTML=Ha?B:V}catch{}}const ue=k.body||k.documentElement;return g&&x&&ue.insertBefore(n.createTextNode(x),ue.childNodes[0]||null),rn===gt?ae.call(k,Mt?"html":"body")[0]:Mt?k.documentElement:ue},Sl=function(g){return H.call(g.ownerDocument||g,g,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},za=function(g){return g instanceof f&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof c)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},Ll=function(g){return typeof r=="function"&&g instanceof r};function ft(I,g,k){is(I,x=>{x.call(t,g,k,ln)})}const Cl=function(g){let k=null;if(ft(q.beforeSanitizeElements,g,null),za(g))return et(g),!0;const x=te(g.nodeName);if(ft(q.uponSanitizeElement,g,{tagName:x,allowedTags:se}),Ks&&g.hasChildNodes()&&!Ll(g.firstElementChild)&&fe(/<[/\w!]/g,g.innerHTML)&&fe(/<[/\w!]/g,g.textContent)||g.nodeType===bn.progressingInstruction||Ks&&g.nodeType===bn.comment&&fe(/<[/\w]/g,g.data))return et(g),!0;if(!(nn.tagCheck instanceof Function&&nn.tagCheck(x))&&(!se[x]||Kn[x])){if(!Kn[x]&&Bl(x)&&(Z.tagNameCheck instanceof RegExp&&fe(Z.tagNameCheck,x)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(x)))return!1;if(Na&&!Je[x]){const V=S(g)||g.parentNode,ue=j(g)||g.childNodes;if(ue&&V){const J=ue.length;for(let _e=J-1;_e>=0;--_e){const ht=y(ue[_e],!0);ht.__removalCount=(g.__removalCount||0)+1,V.insertBefore(ht,L(g))}}}return et(g),!0}return g instanceof d&&!Tf(g)||(x==="noscript"||x==="noembed"||x==="noframes")&&fe(/<\/no(script|embed|frames)/i,g.innerHTML)?(et(g),!0):(sn&&g.nodeType===bn.text&&(k=g.textContent,is([$e,de,Be],V=>{k=fn(k,V," ")}),g.textContent!==k&&(gn(t.removed,{element:g.cloneNode()}),g.textContent=k)),ft(q.afterSanitizeElements,g,null),!1)},Al=function(g,k,x){if(yl&&(k==="id"||k==="name")&&(x in n||x in If))return!1;if(!(Da&&!Ma[k]&&fe(je,k))){if(!(hl&&fe(ja,k))){if(!(nn.attributeCheck instanceof Function&&nn.attributeCheck(k,g))){if(!oe[k]||Ma[k]){if(!(Bl(g)&&(Z.tagNameCheck instanceof RegExp&&fe(Z.tagNameCheck,g)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(g))&&(Z.attributeNameCheck instanceof RegExp&&fe(Z.attributeNameCheck,k)||Z.attributeNameCheck instanceof Function&&Z.attributeNameCheck(k,g))||k==="is"&&Z.allowCustomizedBuiltInElements&&(Z.tagNameCheck instanceof RegExp&&fe(Z.tagNameCheck,x)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(x))))return!1}else if(!Oa[k]){if(!fe(mt,fn(x,Me,""))){if(!((k==="src"||k==="xlink:href"||k==="href")&&g!=="script"&&Ec(x,"data:")===0&&kl[g])){if(!(vl&&!fe(b,fn(x,Me,"")))){if(x)return!1}}}}}}}return!0},Bl=function(g){return g!=="annotation-xml"&&gi(g,Ee)},jl=function(g){ft(q.beforeSanitizeAttributes,g,null);const{attributes:k}=g;if(!k||za(g))return;const x={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:oe,forceKeepAttr:void 0};let V=k.length;for(;V--;){const ue=k[V],{name:J,namespaceURI:_e,value:ht}=ue,cn=te(J),Ga=ht;let re=J==="value"?Ga:_c(Ga);if(x.attrName=cn,x.attrValue=re,x.keepAttr=!0,x.forceKeepAttr=void 0,ft(q.uponSanitizeAttribute,g,x),re=x.attrValue,wl&&(cn==="id"||cn==="name")&&(Dt(J,g),re=kf+re),Ks&&fe(/((--!?|])>)|<\/(style|title|textarea)/i,re)){Dt(J,g);continue}if(cn==="attributename"&&gi(re,"href")){Dt(J,g);continue}if(x.forceKeepAttr)continue;if(!x.keepAttr){Dt(J,g);continue}if(!bl&&fe(/\/>/i,re)){Dt(J,g);continue}sn&&is([$e,de,Be],Dl=>{re=fn(re,Dl," ")});const Ml=te(g.nodeName);if(!Al(Ml,cn,re)){Dt(J,g);continue}if(C&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!_e)switch(h.getAttributeType(Ml,cn)){case"TrustedHTML":{re=C.createHTML(re);break}case"TrustedScriptURL":{re=C.createScriptURL(re);break}}if(re!==Ga)try{_e?g.setAttributeNS(_e,J,re):g.setAttribute(J,re),za(g)?et(g):po(t.removed)}catch{Dt(J,g)}}ft(q.afterSanitizeAttributes,g,null)},Sf=function I(g){let k=null;const x=Sl(g);for(ft(q.beforeSanitizeShadowDOM,g,null);k=x.nextNode();)ft(q.uponSanitizeShadowNode,k,null),Cl(k),jl(k),k.content instanceof a&&I(k.content);ft(q.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(I){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},k=null,x=null,V=null,ue=null;if(Ha=!I,Ha&&(I="<!-->"),typeof I!="string"&&!Ll(I))if(typeof I.toString=="function"){if(I=I.toString(),typeof I!="string")throw hn("dirty is not a string, aborting")}else throw hn("toString is not a function");if(!t.isSupported)return I;if(Ra||Ua(g),t.removed=[],typeof I=="string"&&(Yn=!1),Yn){if(I.nodeName){const ht=te(I.nodeName);if(!se[ht]||Kn[ht])throw hn("root node is forbidden and cannot be sanitized in-place")}}else if(I instanceof r)k=Tl("<!---->"),x=k.ownerDocument.importNode(I,!0),x.nodeType===bn.element&&x.nodeName==="BODY"||x.nodeName==="HTML"?k=x:k.appendChild(x);else{if(!an&&!sn&&!Mt&&I.indexOf("<")===-1)return C&&Zs?C.createHTML(I):I;if(k=Tl(I),!k)return an?null:Zs?B:""}k&&Pa&&et(k.firstChild);const J=Sl(Yn?I:k);for(;V=J.nextNode();)Cl(V),jl(V),V.content instanceof a&&Sf(V.content);if(Yn)return I;if(an){if(Ys)for(ue=ee.call(k.ownerDocument);k.firstChild;)ue.appendChild(k.firstChild);else ue=k;return(oe.shadowroot||oe.shadowrootmode)&&(ue=Q.call(s,ue,!0)),ue}let _e=Mt?k.outerHTML:k.innerHTML;return Mt&&se["!doctype"]&&k.ownerDocument&&k.ownerDocument.doctype&&k.ownerDocument.doctype.name&&fe(bo,k.ownerDocument.doctype.name)&&(_e="<!DOCTYPE "+k.ownerDocument.doctype.name+`>
`+_e),sn&&is([$e,de,Be],ht=>{_e=fn(_e,ht," ")}),C&&Zs?C.createHTML(_e):_e},t.setConfig=function(){let I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ua(I),Ra=!0},t.clearConfig=function(){ln=null,Ra=!1},t.isValidAttribute=function(I,g,k){ln||Ua({});const x=te(I),V=te(g);return Al(x,V,k)},t.addHook=function(I,g){typeof g=="function"&&gn(q[I],g)},t.removeHook=function(I,g){if(g!==void 0){const k=kc(q[I],g);return k===-1?void 0:$c(q[I],k,1)[0]}return po(q[I])},t.removeHooks=function(I){q[I]=[]},t.removeAllHooks=function(){q=wo()},t}var $o=ko();const yi="chaotic_";function Re(e){try{return localStorage.getItem(yi+e)}catch{return null}}function Pe(e,t){try{localStorage.setItem(yi+e,t)}catch{}}function it(e){try{localStorage.removeItem(yi+e)}catch{}}function qc(){return Re("token")}function Oc(e){e?Pe("token",e):it("token")}function Hc(){return Re("theme")}function Fc(e){Pe("theme",e)}function Eo(){return Re("last_project")}function Uc(e){Pe("last_project",e)}function zc(){return Re("onboarding_complete")==="true"}function Gc(){Pe("onboarding_complete","true")}function Wc(){it("onboarding_complete")}function Vc(e){return e?Re(`issues_filters_${e}`):null}function Kc(e,t){e&&(t?Pe(`issues_filters_${e}`,t):it(`issues_filters_${e}`))}function Yc(e){return Re(`comment_draft_${e}`)}function wi(e,t){t?Pe(`comment_draft_${e}`,t):it(`comment_draft_${e}`)}function Zc(e){return Re(`description_draft_${e}`)}function rs(e,t){t?Pe(`description_draft_${e}`,t):it(`description_draft_${e}`)}function Xc(){return{title:Re("create_issue_title"),description:Re("create_issue_description")}}function _o(e,t){e?Pe("create_issue_title",e):it("create_issue_title"),t?Pe("create_issue_description",t):it("create_issue_description")}function Qc(){it("create_issue_title"),it("create_issue_description")}function Jc(){return Re("doc_view_mode")}function ed(e){Pe("doc_view_mode",e)}function td(){return Re("approvals_explainer_dismissed")==="1"}function nd(){Pe("approvals_explainer_dismissed","1")}const sd="/api";class id{constructor(){this.token=qc()}setToken(t){this.token=t,Oc(t)}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const o=await fetch(`${sd}${n}`,a);if(o.status===204)return null;let r;try{r=await o.json()}catch{const d=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${d})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let d;typeof r.detail=="string"?d=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?d=r.detail.message:d="An error occurred";const l=new Error(d);throw l.status=o.status,l.detail=r.detail,l}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20){return this.request("GET",`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const v=new id;let Rt=null;function N(){document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function R(){var e;vt(),document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide")}function ls(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function $(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.classList.add("toast-exit"),s.addEventListener("animationend",()=>s.remove(),{once:!0}),setTimeout(()=>{s.parentNode&&s.remove()},500)},3e3)}function ad(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function E(e,t){const n=ad(t);$(`Failed to ${e}: ${n}`,"error")}function vt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Rt&&(document.removeEventListener("keydown",Rt),Rt=null)}function yn(e){Rt&&document.removeEventListener("keydown",Rt),Rt=e,e&&document.addEventListener("keydown",e)}function wn(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(vt(),document.removeEventListener("click",s,!0))};return setTimeout(()=>document.addEventListener("click",s,!0),0),()=>document.removeEventListener("click",s,!0)}function ve(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function xe(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function ki(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function G(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,s]=e;return`#${t}${t}${n}${n}${s}${s}`}return e}function p(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function u(e){return p(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Ve(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function at(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function od(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Pt(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",s=e==null?void 0:e.avatar_url;return s?od(s)?`<img class="${t} avatar-img" src="${u(s)}" alt="${u(n)}">`:`<div class="${t} avatar-emoji">${p(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}let ne={...{currentUser:null,currentView:"my-issues",issues:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const $i=new Set;function ke(e,t){if(typeof e=="string"){const n=ne[e];ne[e]=t,xo(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=ne[s];ne[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{xo(s,i,a)})}}function bt(e){return $i.add(e),()=>$i.delete(e)}function xo(e,t,n){t!==n&&$i.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const kn=()=>ne.currentUser,cs=e=>ke("currentUser",e),A=()=>ne.currentView,rd=e=>ke("currentView",e),be=()=>ne.issues,Ke=e=>ke("issues",e),Io=()=>ne.labels,ds=e=>ke("labels",e),To=()=>ne.activeFilterCategory,ld=e=>ke("activeFilterCategory",e),cd=()=>ne.selectedIssueIndex,So=e=>ke("selectedIssueIndex",e),dd=()=>ne.selectedDocIndex,Lo=e=>ke("selectedDocIndex",e),ud=()=>ne.pendingGates,pd=e=>ke("pendingGates",e),md=()=>ne.searchDebounceTimer,gd=e=>ke("searchDebounceTimer",e),fd=()=>ne.websocket,Co=e=>ke("websocket",e),T=()=>ne.currentTeam,Ei=e=>ke("currentTeam",e),U=()=>ne.currentProject,Ne=e=>ke("currentProject",e||null),le=()=>ne.currentDetailIssue,us=e=>ke("currentDetailIssue",e),hd=()=>ne.currentDetailSprints,Ao=e=>ke("currentDetailSprints",e),_i={};function X(e){Object.assign(_i,e)}function vd(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}const s=t.dataset.action,i=_i[s];if(!i){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${s}"`);return}i(e,t.dataset,t)}let Bo=!1;function bd(){if(!Bo){Bo=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,vd);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=_i[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const xi=["backlog","todo","in_progress","in_review","done","canceled"],Nt=["backlog","todo","in_progress","in_review"],jo=["urgent","high","medium","low","no_priority"],Ii=["no_priority","urgent","high","medium","low"],Mo=["backlog","todo","in_progress","in_review","done"];function ot({icon:e,heading:t,description:n,cta:s}){const i=s?`
        <button class="btn btn-primary empty-state-cta" data-action="${u(s.action)}"${s.data?Object.entries(s.data).map(([a,o])=>` data-${u(a)}="${u(o)}"`).join(""):""}>${p(s.label)}</button>
    `:"";return`
        <div class="empty-state">
            <div class="empty-state-icon">${e}</div>
            <h3>${p(t)}</h3>
            <p>${p(n)}</p>
            ${i}
        </div>
    `}const Ye={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'};let $n=[];function yd(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function wd(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function ps(e,t){const n=e().map(yd),s=t().map(wd);$n=[...n,...s]}function En(e){return e&&$n.find(t=>t.id===e)||null}function Lt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Ti(e,t=!1){const n=p(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${p(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function ms(){const e=$n.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));$n.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,d)=>r.name.localeCompare(d.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=$n.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function gs(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;ms().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${Ti(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}function qt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Ot(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Ht(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Do(){const e=document.getElementById("group-by-select");return e?e.value:""}const Ro=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"}],fs=["done","canceled"];function Po(e){var t,n,s;switch(e){case"project":return U()?1:0;case"status":return qt().length;case"priority":return Ot().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(s=document.getElementById("sprint-filter"))!=null&&s.value?1:0;case"labels":return Ht().length;default:return 0}}function Si(){let e=0;return Ro.forEach(t=>{e+=Po(t.key)}),e}function No(){var f,m,h,w,y;const e=new URLSearchParams,t=qt(),n=Ot(),s=Ht(),i=(f=document.getElementById("assignee-filter"))==null?void 0:f.value,a=U()||"",o=(m=document.getElementById("sprint-filter"))==null?void 0:m.value,r=(h=document.getElementById("issue-type-filter"))==null?void 0:h.value,d=(w=document.getElementById("group-by-select"))==null?void 0:w.value;t.forEach(_=>e.append("status",_)),n.forEach(_=>e.append("priority",_)),s.forEach(_=>e.append("label",_)),i&&e.set("assignee",i),a&&e.set("project",a),o&&e.set("sprint",o),r&&e.set("issue_type",r),d&&e.set("groupBy",d);const l=e.toString(),c=l?`/issues?${l}`:"/issues";history.replaceState({view:"issues"},"",c),Kc((y=T())==null?void 0:y.id,l)}function kd(e){var m;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","assignee","sprint","issue_type","groupBy","project"].some(h=>t.has(h))){const h=Vc((m=T())==null?void 0:m.id);if(h){t=new URLSearchParams(h);const w=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",w)}}const i=t.getAll("status");if(i.length>0){const h=document.getElementById("status-filter-dropdown");h&&(h.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.checked=i.includes(y.value)}),qo())}const a=t.getAll("priority");if(a.length>0){const h=document.getElementById("priority-filter-dropdown");h&&(h.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.checked=a.includes(y.value)}),Oo())}const o=t.get("assignee");if(o){const h=document.getElementById("assignee-filter");h&&(h.value=o)}const r=t.get("project");r&&(e(!0),Ne(r),e(!1));const d=t.get("sprint");if(d){const h=document.getElementById("sprint-filter");h&&(h.value=d)}const l=t.get("issue_type");if(l){const h=document.getElementById("issue-type-filter");h&&(h.value=l)}const c=t.getAll("label");if(c.length>0){const h=document.getElementById("label-filter-dropdown");h&&(h.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.checked=c.includes(y.value)}),Li())}const f=t.get("groupBy");if(f){const h=document.getElementById("group-by-select");h&&(h.value=f)}}function qo(){const e=qt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=ve(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function Oo(){const e=Ot(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=xe(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Li(){var s,i;const e=Ht(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}async function $d(){const e=document.getElementById("label-filter-dropdown");if(!e||!T())return;const t=e.querySelector(".multi-select-options");try{const n=await v.getLabels(T().id);t.innerHTML="",n.length===0?t.innerHTML='<div class="multi-select-empty">No labels available</div>':n.forEach(i=>{const a=document.createElement("label");a.className="multi-select-option",a.innerHTML=`
                    <input type="checkbox" value="${i.id}" data-action="update-label-filter">
                    <span class="label-badge" style="background: ${G(i.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                        <span class="label-name">${p(i.name)}</span>
                    </span>
                `,t.appendChild(a)});const s=document.createElement("div");s.className="multi-select-actions",s.innerHTML='<button type="button" class="btn btn-small" data-action="clear-label-filter">Clear</button>',t.appendChild(s)}catch(n){console.error("Failed to load labels for filter:",n)}}function Ci(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Ho)},0))}function Ho(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Ho))}function Ed(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Ft)):(e.classList.remove("hidden"),Ie(),Te(To()),setTimeout(()=>{document.addEventListener("click",Ft)},0))}function _d(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Ft)):(e.classList.remove("hidden"),Bd(),setTimeout(()=>{document.addEventListener("click",Ft)},0))}function Ft(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),s=e.composedPath(),i=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=i&&s.includes(i),r=a&&s.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Ft))}function Fo(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Ft)}function Ie(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=U();e.innerHTML=Ro.map(n=>{const s=Po(n.key),i=To()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${i?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${u(n.key)}">
                <span>${n.label}</span>
                ${s>0?`<span class="filter-menu-category-count">${s}</span>`:'<span class="filter-menu-category-arrow">→</span>'}
            </div>
        `}).join("")}function Te(e){ld(e),Ie();const t=document.getElementById("filter-menu-options");if(t)switch(e){case"project":xd(t);break;case"status":Id(t);break;case"priority":Td(t);break;case"type":Sd(t);break;case"assignee":Ld(t);break;case"sprint":Cd(t);break;case"labels":Ad(t);break}}function xd(e){const t=U()||"",n=Y()||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${t?'<button class="filter-options-clear" data-action="set-project-filter" data-value="">Clear</button>':""}
        </div>
        <label class="filter-option" data-action="set-project-filter" data-value="">
            <input type="radio" name="project-filter-radio" value="" ${t?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;n.forEach(i=>{s+=`
            <label class="filter-option" data-action="set-project-filter" data-value="${u(i.id)}">
                <input type="radio" name="project-filter-radio" value="${u(i.id)}" ${t===i.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${G(i.color)};"></span>
                <span class="filter-option-label">${p(i.name)}</span>
            </label>
        `}),e.innerHTML=s}function Id(e){const t=qt(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],s=Nt.every(o=>t.includes(o))&&!fs.some(o=>t.includes(o))&&t.length===Nt.length,i=fs.every(o=>t.includes(o))&&!Nt.some(o=>t.includes(o))&&t.length===fs.length;let a=`
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
                <input type="checkbox" value="${o.value}" ${t.includes(o.value)?"checked":""} data-action="toggle-status-option" data-filter-value="${u(o.value)}">
                <span class="filter-option-icon">${o.icon}</span>
                <span class="filter-option-label">${o.label}</span>
            </label>
        `}),e.innerHTML=a}function Td(e){const t=Ot(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Priority</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-priority-filter-new">Clear</button>':""}
        </div>
    `;n.forEach(i=>{s+=`
            <label class="filter-option">
                <input type="checkbox" value="${i.value}" ${t.includes(i.value)?"checked":""} data-action="toggle-priority-option" data-filter-value="${u(i.value)}">
                <span class="filter-option-icon">${i.icon}</span>
                <span class="filter-option-label">${i.label}</span>
            </label>
        `}),e.innerHTML=s}function Sd(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${u(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function Ld(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=jt()||[];let i=`
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
            <label class="filter-option" data-action="set-assignee-filter" data-value="${u(a.user_id)}">
                <input type="radio" name="assignee-filter-radio" value="${u(a.user_id)}" ${n===a.user_id?"checked":""}>
                <span class="filter-option-label">${p(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function Cd(e){if(!U()){e.innerHTML=`
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
            <label class="filter-option" data-action="set-sprint-filter" data-value="${u(o.value)}">
                <input type="radio" name="sprint-filter-radio" value="${u(o.value)}" ${s===o.value?"checked":""}>
                <span class="filter-option-label">${p(o.text)}</span>
            </label>
        `}),e.innerHTML=a}function Ad(e){const t=Ht(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),d=o==null?void 0:o.querySelector(".label-badge"),l=(r==null?void 0:r.textContent)||"Label",c=(d==null?void 0:d.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${u(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${u(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${G(c)};"></span>
                    <span class="filter-option-label">${p(l)}</span>
                </label>
            `}),e.innerHTML=i}function Bd(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(d=>`
                <div class="display-option ${s===d.value?"active":""}" data-action="set-sort" data-value="${u(d.value)}">
                    <span>${d.label}</span>
                    ${s===d.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(d=>`
                <div class="display-option ${i===d.value?"active":""}" data-action="set-group-by" data-value="${u(d.value)}">
                    <span>${d.label}</span>
                    ${i===d.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function Le(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=U();if(n){const f=(Y()||[]).find(m=>m.id===n);t.push({category:"project",label:"Project",value:(f==null?void 0:f.name)||"Unknown",clearAction:"clear-project-filter"})}const s=qt();if(s.length>0){const c=s.map(f=>ve(f)).join(", ");t.push({category:"status",label:"Status",value:c,clearAction:"clear-status-filter-new"})}const i=Ot();if(i.length>0){const c=i.map(f=>xe(f)).join(", ");t.push({category:"priority",label:"Priority",value:c,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const c=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:c?c.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let c;if(o.value==="me")c="Me";else if(o.value==="unassigned")c="Unassigned";else{const m=(jt()||[]).find(h=>h.user_id===o.value);c=(m==null?void 0:m.name)||(m==null?void 0:m.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:c,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const c=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(c==null?void 0:c.text)||r.value,clearAction:"clear-sprint-filter"})}const d=Ht();if(d.length>0){const c=document.getElementById("label-filter-dropdown"),f=d.map(m=>{var y;const h=c==null?void 0:c.querySelector(`input[value="${m}"]`),w=(y=h==null?void 0:h.closest("label"))==null?void 0:y.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:f,clearAction:"clear-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let l=t.map(c=>`
        <span class="filter-chip">
            <span class="filter-chip-label">${c.label}:</span>
            <span class="filter-chip-value">${p(c.value)}</span>
            <button class="filter-chip-remove" data-action="${c.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(l+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=l}function Ce(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Si();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function Uo(){const e=document.getElementById("sprint-filter");if(!e)return;const t=U(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",Ai(null);return}let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const i=await v.getSprints(t),a=i.find(o=>o.status==="active");a&&(s+=`<option value="current">Current Sprint (${p(a.name)})</option>`),Ai(a||null),i.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";s+=`<option value="${o.id}">${p(o.name)}${r}</option>`})}catch(i){console.error("Failed to load sprints:",i)}e.innerHTML=s,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function Ai(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${p(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${p(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function jd(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let zo=!1;bt(e=>{if(e!=="currentProject"||A()!=="issues"||zo)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Uo().then(()=>{qe(),Le(),Ce()})});function Md(){kd(e=>{zo=e})}function hs(){qo(),qe(),Le(),Ce()}function Bi(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),hs()}function ji(){Oo(),qe(),Le(),Ce()}function Mi(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),ji()}function Di(){Li(),qe(),Le(),Ce()}function vs(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Di()}async function Ct(){var f,m,h,w,y,_,L;if(So(-1),!T())return;const e=U()||"",t=qt(),n=Ot(),s=(f=document.getElementById("assignee-filter"))==null?void 0:f.value,i=(h=(m=document.getElementById("issue-search"))==null?void 0:m.value)==null?void 0:h.trim();if(!e&&Y().length===0){document.getElementById("issues-list").innerHTML=ot({icon:Ye.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}jd();const a={limit:1e3},o=((w=document.getElementById("sort-by-select"))==null?void 0:w.value)||"created-desc",[r,d]=o.includes("-")?o.split("-"):[o,null];a.sort_by=r,d&&(a.order=d),t.length>0&&(a.status=t),n.length>0&&(a.priority=n),s&&(s==="me"?a.assignee_id=(y=kn())==null?void 0:y.id:a.assignee_id=s);const l=(_=document.getElementById("sprint-filter"))==null?void 0:_.value;if(l)if(l==="current"){if(e)try{const S=(await v.getSprints(e)).find(C=>C.status==="active");S&&(a.sprint_id=S.id)}catch(j){console.error("Failed to resolve current sprint:",j)}}else a.sprint_id=l;const c=(L=document.getElementById("issue-type-filter"))==null?void 0:L.value;c&&(a.issue_type=c),i&&i.length>=2&&(a.search=i);try{let j;e?(a.project_id=e,j=await v.getIssues(a)):Y().length>0&&(j=await v.getTeamIssues(T().id,a));const S=Ht();S.length>0&&(j=j.filter(B=>!B.labels||B.labels.length===0?!1:B.labels.some(K=>S.includes(K.id)))),Ke(j);const C=[...new Set(j.map(B=>B.project_id))];await $r(C),rt()}catch(j){E("load issues",j)}}function Dd(){clearTimeout(md()),gd(setTimeout(()=>{Ct()},300))}function qe(){No(),Ct()}async function Go(){if(No(),Do()==="sprint"){const e=be(),t=[...new Set(e.map(n=>n.project_id))];await $r(t)}rt()}function Rd(){Le(),Ce()}function Wo(e){Ne(e),Ie(),Te("project")}function Pd(){Wo("")}function Nd(e){const t=e==="open"?Nt:fs,n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),hs(),Ie(),Te("status")}function qd(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,hs()),Ie(),Te("status")}function Od(){Bi(),Ie(),Te("status"),Le(),Ce()}function Hd(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,ji()),Ie(),Te("priority")}function Fd(){Mi(),Ie(),Te("priority"),Le(),Ce()}function Vo(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,qe()),Ie(),Te("type"),Le(),Ce()}function Ud(){Vo("")}function Ko(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,qe()),Ie(),Te("assignee"),Le(),Ce()}function zd(){Ko("")}function Yo(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,qe()),Ie(),Te("sprint"),Le(),Ce()}function Gd(){Yo("")}function Wd(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Di()),Ie(),Te("labels")}function Vd(){vs(),Ie(),Te("labels"),Le(),Ce()}function Kd(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Ct()),Fo()}function Yd(e){const t=document.getElementById("group-by-select");t&&(t.value=e,Go()),Fo()}function Zd(){Ne(null),Bi(),Mi();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const s=document.getElementById("issue-search");s&&(s.value=""),vs(),qe(),Le(),Ce()}X({"update-label-filter":()=>Di(),"clear-label-filter":()=>vs(),"show-filter-category":(e,t)=>Te(t.category),"set-project-filter":(e,t)=>Wo(t.value),"clear-project-filter":()=>Pd(),"clear-status-filter-new":()=>Od(),"set-status-preset":(e,t)=>Nd(t.value),"toggle-status-option":(e,t)=>qd(t.filterValue,e),"clear-priority-filter-new":()=>Fd(),"toggle-priority-option":(e,t)=>Hd(t.filterValue,e),"set-type-filter":(e,t)=>Vo(t.value),"clear-type-filter":()=>Ud(),"set-assignee-filter":(e,t)=>Ko(t.value),"clear-assignee-filter":()=>zd(),"set-sprint-filter":(e,t)=>Yo(t.value),"clear-sprint-filter":()=>Gd(),"clear-label-filter-new":()=>Vd(),"toggle-label-option":(e,t)=>Wd(t.filterValue,e),"set-sort":(e,t)=>Kd(t.value),"set-group-by":(e,t)=>Yd(t.value),"clear-all-filters":()=>Zd()});let _n=[],Ri=[];bt(e=>{e==="currentProject"&&A()==="my-issues"&&bs()});function yt(){return _n}function Ut(e){_n=e}async function bs(){var i;const e=T(),t=kn();if(!e||!t)return;const n=(i=document.getElementById("my-issues-status-filter"))==null?void 0:i.value,s=U();Qd();try{const a={assignee_id:t.id,status:n||void 0,limit:1e3};let o;s?o=await v.getIssues({...a,project_id:s}):o=await v.getTeamIssues(e.id,a),_n=o,xn()}catch(a){E("load issues",a)}}async function zt({showLoading:e=!0}={}){const t=T();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{Ri=await v.getTeamActivities(t.id,0,10),Xd()}catch{n&&(n.innerHTML='<div class="activity-empty">Failed to load activity</div>')}}function Xd(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Ri.length){e.innerHTML='<div class="activity-empty">No recent activity. Create or update issues to see activity here.</div>';return}e.innerHTML=Ri.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${u(t.issue_identifier)}"><strong>${p(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${u(t.document_id)}"><strong>${s} ${p(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${p(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${Fi(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${zi(t)}${n}</span>
                <span class="activity-actor">by ${p(Ui(t))}</span>
                <span class="activity-time">${Ve(t.created_at)}</span>
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
    `).join(""))}function Zo(){bs()}function xn(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),_n.length===0){e.innerHTML=ot({icon:Ye.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}e.innerHTML=_n.map(t=>Oe(t)).join("")}}async function Xo(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=Y();if(!t.length){e.innerHTML="";return}try{const n=t.map(async i=>{try{const a=await v.getCurrentSprint(i.id);if(!a)return null;let o={};try{const r=await v.getIssues({sprint_id:a.id,project_id:i.id,limit:500});for(const d of r)o[d.status]=(o[d.status]||0)+1}catch{}return{project:i,sprint:a,statusCounts:o}}catch{return null}}),s=(await Promise.all(n)).filter(Boolean);Jd(s)}catch{e.innerHTML=""}}function Jd(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active Sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:s,sprint:i,statusCounts:a})=>{const o=i.budget||0,r=i.points_spent||0,d=o>0?Math.min(100,Math.round(r/o*100)):0,l=o>0&&r>o,c=i.limbo?"limbo":l?"arrears":"",f=a||{},m=Object.values(f).reduce((h,w)=>h+w,0);return`
                    <div class="sprint-status-card ${c}">
                        <div class="sprint-status-header">
                            <span class="sprint-status-project">${p(s.name)}</span>
                            ${i.limbo?'<span class="sprint-status-badge limbo">Limbo</span>':""}
                            ${l?'<span class="sprint-status-badge arrears">Arrears</span>':""}
                        </div>
                        <div class="sprint-status-name">${p(i.name)}</div>
                        ${o>0?`
                            <div class="sprint-status-progress">
                                <div class="sprint-progress-bar">
                                    <div class="sprint-progress-fill ${c}" style="width: ${d}%"></div>
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
                                    ${n.filter(h=>f[h]).map(h=>{const w=Math.round(f[h]/m*100);return`<div class="sprint-stacked-segment status-${h}" style="width: ${w}%" title="${ve(h)}: ${f[h]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(h=>f[h]).map(h=>`<span class="sprint-count-label status-${h}">${f[h]} ${ve(h)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}X({"filter-my-issues":()=>Zo(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),Hr(t.identifier)}});const Qo=xi,eu=["task","bug","feature","chore","docs","tech_debt","epic"];let Ze=[],Jo=Promise.resolve();function er(){return Ze}function tr(e){Ze=e}async function Pi(e,t,n,s){var f,m;e.preventDefault(),vt();const a=(s||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Qo.map((h,w)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="status" data-value="${h}">
                    ${ye(h)}
                    <span>${ve(h)}</span>
                    <span class="dropdown-shortcut">${w+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${Ii.map((h,w)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="priority" data-value="${h}">
                    ${Xe(h)}
                    <span>${xe(h)}</span>
                    <span class="dropdown-shortcut">${w}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${eu.map(h=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="issue_type" data-value="${h}">
                    <span class="issue-type-badge type-${h}">${at(h)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const h=ms();o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${h.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:h.map(({assignee:w,indent:y},_)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="assignee_id" data-value="${u(w.id)}">
                    ${Pt(w,"avatar-small")}
                    <span>${Ti(w,y)}</span>
                    ${_<9?`<span class="dropdown-shortcut">${_+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const h=document.querySelector(`.issue-row[data-issue-id="${n}"]`),w=(h==null?void 0:h.dataset.projectId)||((f=le())==null?void 0:f.project_id),y=Zt(w);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${y.map((_,L)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="estimate" data-value="${_.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${_.label}</span>
                    ${L<9?`<span class="dropdown-shortcut">${L}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const h=be(),w=yt(),y=le(),_=h.find(Q=>Q.id===n)||w.find(Q=>Q.id===n)||y,L=new Set(((_==null?void 0:_.labels)||[]).map(Q=>Q.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const j=o.getBoundingClientRect();let S=a.bottom+4,C=a.left;C+j.width>window.innerWidth-8&&(C=a.right-j.width),S+j.height>window.innerHeight-8&&(S=a.top-j.height-4),o.style.top=`${S}px`,o.style.left=`${Math.max(8,C)}px`,wn(o,{multiSelect:!0});let B=[];const K=T();if(K)try{B=await v.getLabels(K.id)}catch(Q){console.error("Failed to load labels:",Q)}if(!o.parentNode)return;sr(o,n,B,L);const H=o.getBoundingClientRect();let ee=a.bottom+4,ae=a.left;ae+H.width>window.innerWidth-8&&(ae=a.right-H.width),ee+H.height>window.innerHeight-8&&(ee=a.top-H.height-4),o.style.top=`${ee}px`,o.style.left=`${Math.max(8,ae)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const h=be(),w=yt(),y=le(),_=h.find(q=>q.id===n)||w.find(q=>q.id===n)||y,L=(_==null?void 0:_.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const j=o.getBoundingClientRect();let S=a.bottom+4,C=a.left;C+j.width>window.innerWidth-8&&(C=a.right-j.width),S+j.height>window.innerHeight-8&&(S=a.top-j.height-4),o.style.top=`${S}px`,o.style.left=`${Math.max(8,C)}px`,wn(o);let B=[];if(L)try{B=await v.getSprints(L),Ap(L,B)}catch(q){console.error("Failed to load sprints:",q)}if(!o.parentNode)return;const K=B.filter(q=>q.status!=="completed"||q.id===(_==null?void 0:_.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${K.map((q,$e)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="sprint_id" data-value="${u(q.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${p(q.name)}${q.status==="active"?" (Active)":""}</span>
                    ${$e<9?`<span class="dropdown-shortcut">${$e+1}</span>`:""}
                </button>
            `).join("")}
        `;const H=o.getBoundingClientRect();let ee=a.bottom+4,ae=a.left;ae+H.width>window.innerWidth-8&&(ae=a.right-H.width),ee+H.height>window.innerHeight-8&&(ee=a.top-H.height-4),o.style.top=`${ee}px`,o.style.left=`${Math.max(8,ae)}px`,o.classList.remove("dropdown-positioning");const Q=q=>{const $e=q.key;if($e==="Escape"){vt(),document.removeEventListener("keydown",Q),yn(null);return}const de=parseInt($e);if(isNaN(de))return;const Be=o.querySelectorAll(".dropdown-option");let je=!1;de===0?(Gt(n,"sprint_id",null),je=!0):de>=1&&de<Be.length&&(Be[de].click(),je=!0),je&&(document.removeEventListener("keydown",Q),yn(null))};yn(Q),document.addEventListener("keydown",Q);return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let d=a.bottom+4,l=a.left;l+r.width>window.innerWidth-8&&(l=a.right-r.width),d+r.height>window.innerHeight-8&&(d=a.top-r.height-4),o.style.top=`${d}px`,o.style.left=`${Math.max(8,l)}px`,o.classList.remove("dropdown-positioning");const c=h=>{const w=h.key;if(w==="Escape"){vt(),document.removeEventListener("keydown",c);return}const y=parseInt(w);if(isNaN(y))return;let _=!1;if(t==="status"&&y>=1&&y<=6)Gt(n,"status",Qo[y-1]),_=!0;else if(t==="priority"&&y>=0&&y<=4)Gt(n,"priority",Ii[y]),_=!0;else if(t==="estimate"){const L=le(),j=Zt(L==null?void 0:L.project_id);y>=0&&y<j.length&&(Gt(n,"estimate",j[y].value),_=!0)}_&&(document.removeEventListener("keydown",c),yn(null))};yn(c),document.addEventListener("keydown",c),wn(o)}function tu(e,t,n,s){Pi(e,t,n,s)}function nu(e,t,n){Jo=Jo.then(()=>nr(e,t,n))}async function nr(e,t,n){const s=be(),i=yt(),a=le(),o=s.find(c=>c.id===e)||i.find(c=>c.id===e)||a;if(!o)return;const r=(o.labels||[]).map(c=>c.id),d=r.indexOf(t);let l;if(d>=0?l=r.filter(c=>c!==t):l=[...r,t],n){const c=d<0;n.classList.toggle("selected",c),n.querySelector(".label-check").textContent=c?"✓":""}try{const f=(await v.updateIssue(e,{label_ids:l})).labels||[],m=s.findIndex(_=>_.id===e);m!==-1&&(s[m].labels=f,Ke([...s]));const h=i.findIndex(_=>_.id===e);h!==-1&&(i[h].labels=f,Ut([...i])),(a==null?void 0:a.id)===e&&us({...a,labels:f});const w=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(w&&w.parentNode){const _=s.find(L=>L.id===e)||i.find(L=>L.id===e);_&&(w.outerHTML=Oe(_))}const y=document.querySelector(".property-labels-btn");y&&(y.innerHTML=f.length>0?f.map(_=>`
                    <span class="issue-label" style="background: ${G(_.color)}20; color: ${G(_.color)}">${p(_.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(c){if(E("update labels",c),n){const f=d>=0;n.classList.toggle("selected",f),n.querySelector(".label-check").textContent=f?"✓":""}}}function sr(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${u(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${u(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const a=s.has(i.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${u(t)}" data-label-id="${u(i.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${G(i.color)}20; color: ${G(i.color)}">${p(i.name)}</span>
                </button>
            `}).join("")}
    `}async function ir(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=T();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await v.createLabel(s.id,{name:i}),o=await v.getLabels(s.id);ds(o),a!=null&&a.id&&await nr(e,a.id,null);const r=be(),d=yt(),l=le(),c=r.find(m=>m.id===e)||d.find(m=>m.id===e)||l,f=new Set(((c==null?void 0:c.labels)||[]).map(m=>m.id));t&&sr(t,e,o,f),n.value=""}catch(a){E("create label",a)}finally{n.disabled=!1,n.focus()}}}function ys(){const e=document.getElementById("create-issue-labels-label");e&&(Ze.length===0?e.textContent="Labels":e.textContent=`Labels (${Ze.length})`)}function Ni(e){const t=Io();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=Ze.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${u(n.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${G(n.color)}20; color: ${G(n.color)}">${p(n.name)}</span>
                </button>
            `}).join("")}
    `}function su(e){const t=Ze.indexOf(e);t>=0?Ze.splice(t,1):Ze.push(e),ys();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Ni(n)}async function ar(){const e=T();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await v.createLabel(e.id,{name:s}),a=await v.getLabels(e.id);ds(a),i!=null&&i.id&&!Ze.includes(i.id)&&Ze.push(i.id),ys(),t&&Ni(t),n.value=""}catch(i){E("create label",i)}finally{n.disabled=!1,n.focus()}}}async function Gt(e,t,n){vt();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const i={};i[t]=n;const a=await v.updateIssue(e,i);if(!a||!a.id)throw new Error("Invalid response from server");const o=be(),r=o.findIndex(f=>f.id===e);r!==-1&&(o[r]=a,Ke([...o]));const d=yt(),l=d.findIndex(f=>f.id===e);l!==-1&&(d[l]=a,Ut([...d]));const c=le();if((c==null?void 0:c.id)===e&&us(a),s&&s.parentNode){const f=o.find(m=>m.id===e)||d.find(m=>m.id===e)||a;if(f){s.outerHTML=Oe(f);const m=document.querySelector(`.issue-row[data-issue-id="${e}"]`);m&&(m.classList.add("updated"),setTimeout(()=>m.classList.remove("updated"),500))}}if($("Issue updated","success"),t==="status"){const f=U();if(f)try{const h=(await v.getSprints(f)).find(w=>w.status==="active");Ai(h||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const f=document.getElementById("issue-detail-view");f&&!f.classList.contains("hidden")&&iu(t,a)}}catch(i){E("update issue",i),s&&s.classList.remove("updating")}}function iu(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const d of a){const l=d.querySelector(".property-label");if(l&&l.textContent.toLowerCase()===i.toLowerCase()){o=d;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${ye(t.status)}
            <span>${ve(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${Xe(t.priority)}
            <span>${xe(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${at(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const d=t.assignee_id?En(t.assignee_id):null,l=d?Lt(d):null;r.innerHTML=l?`${Pt(d,"avatar-small")}<span>${p(l)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const d=hd(),l=t.sprint_id&&d?d.find(c=>c.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${l?p(l.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${Ds(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}X({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,s=t.field;s==="estimate"?Gt(t.issueId,s,n==="null"?null:Number(n)):Gt(t.issueId,s,n)},"toggle-issue-label":(e,t,n)=>{nu(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{ir(t.issueId)},"toggle-create-issue-label":(e,t)=>{su(t.labelId)},"create-label-for-create-issue":()=>{ar()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),ir(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),ar())}});const or=["task","bug","feature","chore","docs","tech_debt","epic"];function wt(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Wt(e){const t=wt(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function rt(){var s,i;const e=document.getElementById("issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=be();if(t.length===0){const a=(i=(s=document.getElementById("issue-search"))==null?void 0:s.value)==null?void 0:i.trim(),o=Si()>0,r=a&&a.length>=2;if(o||r){const d=Si(),l=[];r&&l.push(`search "${a}"`),o&&l.push(`${d} active filter${d>1?"s":""}`),e.innerHTML=ot({icon:Ye.issues,heading:"No matching issues",description:`No issues match your ${l.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=ot({icon:Ye.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});return}const n=Do();n==="status"?au(e,t):n==="priority"?ou(e,t):n==="type"?ru(e,t):n==="assignee"?lu(e,t):n==="sprint"?cu(e,t):e.innerHTML=Wt(t)+t.map(a=>Oe(a)).join("")}function au(e,t){const n={};xi.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s=Wt(t);xi.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${ye(i)}</span>
                    <span class="group-title">${ve(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${wt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Oe(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function ou(e,t){const n={};jo.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s=Wt(t);jo.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Xe(i)}</span>
                    <span class="group-title">${xe(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${wt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Oe(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function ru(e,t){const n={};or.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s=Wt(t);or.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${i}">${at(i)}</span></span>
                    <span class="group-title">${at(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${wt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Oe(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function lu(e,t){const n={},s="__unassigned__";n[s]=[];const i=ms();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a=Wt(t);n[s].length>0&&(a+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[s].length}</span>
                    <span class="group-points">${wt(n[s])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[s].map(o=>Oe(o)).join("")}
                </div>
            </div>
        `),i.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const d=Lt(o)||"Unknown",l=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${u(o.id)}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${u(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Pt(o,"avatar-small")}</span>
                    <span class="group-title">${p(d)}${p(l)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${wt(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(c=>Oe(c)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function cu(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(d=>{d.sprint_id?(s[d.sprint_id]||(s[d.sprint_id]=[],i.push(d.sprint_id)),s[d.sprint_id].push(d)):s[n].push(d)});const a={active:0,planned:1,completed:2},o=wr();i.sort((d,l)=>{const c=o[d],f=o[l],m=c?a[c.status]??3:3,h=f?a[f.status]??3:3;return m-h});let r=Wt(t);i.forEach(d=>{const l=s[d];if(l.length===0)return;const c=o[d],f=c?c.name:d,m=c?c.status==="active"?" (Active)":c.status==="completed"?" (Done)":"":"",h=d.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${h}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${h}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${p(f)}${m}</span>
                    <span class="group-count">${l.length}</span>
                    <span class="group-points">${wt(l)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${l.map(w=>Oe(w)).join("")}
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
                    <span class="group-points">${wt(s[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${s[n].map(d=>Oe(d)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function du(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Oe(e){const t=e.assignee_id?En(e.assignee_id):null,n=t?Lt(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?Ds(e.estimate,e.project_id):"",a=aa(e.estimate,e.project_id),o=e.sprint_id?wr()[e.sprint_id]:null,r=o?o.name:null;return`
        <div class="issue-row" data-issue-id="${u(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${u(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${u(e.id)}" title="Priority: ${xe(e.priority)}">
                    ${Xe(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${u(e.id)}" title="Status: ${ve(e.status)}">
                    ${ye(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${at(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${u(e.id)}">${p(e.title)}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(d=>`
                            <span class="issue-label" style="background: ${G(d.color)}20; color: ${G(d.color)}">${p(d.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${u(e.id)}" title="Sprint: ${r?p(r):"None"}">
                    ${r?`<span class="sprint-badge">${p(r)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${u(e.id)}" title="${a?"Estimate outside current scale":`Estimate: ${i||"None"}`}">
                    ${i?`<span class="estimate-badge${a?" out-of-scale":""}">${i}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${u(e.id)}" title="${u(n||"Unassigned")}">
                    ${n?Pt(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function Xe(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function ye(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}X({"toggle-group":(e,t)=>{du(t.group)},"show-inline-dropdown":(e,t,n)=>{Pi(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),z(t.issueId))}});function uu(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function pu(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";const n=()=>{t.classList.add("hidden"),t.innerHTML=""},s=()=>{const i=e.selectionStart||0,o=e.value.slice(0,i).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!o){n();return}const r=o[2].toLowerCase(),d=jt().map(l=>({id:l.id,name:l.name||l.email||"User",email:l.email||"",handle:uu(l)})).filter(l=>!r||l.handle.includes(r)||l.name.toLowerCase().includes(r)||l.email.toLowerCase().includes(r)).slice(0,6);if(!d.length){n();return}t.innerHTML=d.map(l=>`
            <button type="button" class="mention-suggestion" data-handle="${u(l.handle)}">
                <span class="mention-name">${p(l.name)}</span>
                <span class="mention-handle">@${p(l.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.handle,f=e.value.slice(0,i).replace(/@([a-zA-Z0-9._-]*)$/,`@${c} `),m=e.value.slice(i);e.value=f+m,e.focus(),n()})})};e.addEventListener("input",s),e.addEventListener("click",s),e.addEventListener("keydown",i=>{i.key==="Escape"&&n()}),e.addEventListener("blur",()=>{setTimeout(n,150)})}const rr=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function In(e=null){const t=e||U()||"";tr([]);const n=Y().map(o=>`
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
                            ${rr.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
                            ${ye("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${Xe("no_priority")}
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
    `,N(),ys();const s=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description"),a=Xc();a.title&&(s.value=a.title),a.description&&(i.value=a.description),s.addEventListener("input",()=>{_o(s.value,i.value)}),i.addEventListener("input",()=>{_o(s.value,i.value)}),s.focus()}function mu(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function gu(e){const t=rr.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function fu(e,t){const n=Y().find(s=>s.id===t);tr([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?p(n.name):"Project"}</span>
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
                            ${ye("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${Xe("no_priority")}
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
                <button type="button" class="btn btn-primary" data-action="create-sub-issue-submit" data-parent-id="${u(e)}" data-project-id="${u(t)}">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,N(),ys(),document.getElementById("create-issue-title").focus()}async function hu(e,t){const n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,d=document.getElementById("create-issue-estimate").value,l=d?parseInt(d):null;if(!n){$("Please enter a title","error");return}try{const c=await v.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,label_ids:er(),parent_id:e});R(),$(`Created sub-issue ${c.identifier}`,"success"),z(e)}catch(c){E("create sub-issue",c)}}async function vu(e,t,n){var o,r;vt();const i=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${i.top-8}px`,a.style.left=`${i.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const d=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Mo.map(l=>`
                <button class="dropdown-option ${l===d?"selected":""}" data-action="set-create-field" data-field="status" data-value="${l}" data-label="${u(ve(l))}">
                    ${ye(l)}
                    <span>${ve(l)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const d=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${Ii.map(l=>`
                <button class="dropdown-option ${l===d?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${l}" data-label="${u(xe(l))}">
                    ${Xe(l)}
                    <span>${xe(l)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const d=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(l=>`
                <button class="dropdown-option ${l===d?"selected":""}" data-action="set-create-field" data-field="type" data-value="${l}" data-label="${u(at(l))}">
                    <span class="issue-type-badge type-${l}">${at(l)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!T())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let d=Io();if(d.length===0)try{d=await v.getLabels(T().id),ds(d)}catch(l){console.error("Failed to load labels:",l)}Ni(a),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),wn(a,{multiSelect:!0});return}else if(e==="assignee"){const d=document.getElementById("create-issue-assignee").value,l=ms();a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${d?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${l.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:l.map(({assignee:c,indent:f})=>{const m=Lt(c)||"User";return`
                <button class="dropdown-option ${c.id===d?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${u(c.id)}" data-label="${u(m)}">
                    ${Pt(c,"avatar-small")}
                    <span>${Ti(c,f)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const d=document.getElementById("create-issue-estimate").value,l=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,c=Zt(l);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${c.map(f=>{const m=f.value===null?"":String(f.value);return`
                <button class="dropdown-option ${m===d?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${u(m)}" data-label="${u(f.value?f.label:"Estimate")}">
                    <span>${p(f.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const d=document.getElementById("create-issue-sprint").value,l=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!l)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const f=(await v.getSprints(l)).filter(m=>m.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${d?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${f.map(m=>`
                        <button class="dropdown-option ${m.id===d?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${u(m.id)}" data-label="${u(m.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${p(m.name)}${m.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),wn(a)}function bu(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function yu(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n;const s=p(n);if(e==="status"){const i=document.querySelector(".toolbar-btn:first-child");i.innerHTML=`${ye(t)}<span id="create-issue-status-label">${s}</span>`}else if(e==="priority"){const i=document.querySelectorAll(".toolbar-btn")[1];i.innerHTML=`${Xe(t)}<span id="create-issue-priority-label">${s}</span>`}else if(e==="type"){const i=document.getElementById("create-issue-type-btn");i&&(i.innerHTML=`<span class="issue-type-badge type-${t}">${at(t)}</span><span id="create-issue-type-label">${s}</span>`)}vt()}async function lr({keepOpen:e=!1}={}){var y,_;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,d=document.getElementById("create-issue-estimate").value,l=d?parseInt(d):null,c=((y=document.getElementById("create-issue-sprint"))==null?void 0:y.value)||null,f=(_=document.getElementById("create-issue-due-date"))==null?void 0:_.value,m=f?new Date(`${f}T00:00:00Z`).toISOString():null;if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}const h=document.getElementById("btn-create-issue"),w=document.getElementById("btn-create-and-new");h&&(h.disabled=!0),w&&(w.disabled=!0);try{const L=await v.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,sprint_id:c,label_ids:er(),due_date:m});$(`Created ${L.identifier}`,"success"),Qc(),A()==="issues"?Ct():A()==="my-issues"&&bs(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(R(),z(L.id))}catch(L){E("create issue",L)}finally{h&&(h.disabled=!1),w&&(w.disabled=!1)}}async function wu(){await lr({keepOpen:!1})}async function ku(){await lr({keepOpen:!0})}X({"toggle-create-dropdown":(e,t,n)=>{vu(t.dropdownType,e,n)},"set-create-field":(e,t)=>{yu(t.field,t.value,t.label)},"create-issue-submit":()=>{wu()},"create-issue-and-new":()=>{ku()},"update-create-project":()=>{bu()},"apply-template":e=>{gu(e.target.value)},"toggle-create-options":()=>{mu()},"create-sub-issue-submit":(e,t)=>{hu(t.parentId,t.projectId)}});async function cr(e){try{const t=await v.getIssue(e),n=await v.getSprints(t.project_id),i=Zt(t.project_id).map(a=>`
            <option value="${a.value===null?"":a.value}" ${t.estimate===a.value?"selected":""}>${p(a.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form data-action="update-issue" data-issue-id="${u(e)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${u(t.title)}" required>
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
        `,N()}catch(t){E("load issue",t)}}async function $u(e,t){try{const n=document.getElementById("edit-issue-title"),s=document.getElementById("edit-issue-description"),i=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),d=document.getElementById("edit-issue-sprint");if(!n||!i||!a||!o)throw new Error("Required form fields not found");const l={title:n.value,description:s?s.value:"",status:i.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:d&&d.value?d.value:null};await v.updateIssue(t,l),R(),await z(t),$("Issue updated!","success")}catch(n){E("update issue",n)}}async function Eu(e){if(confirm("Are you sure you want to delete this issue?"))try{await v.deleteIssue(e),await Ct(),await Fe(),D("issues"),$("Issue deleted!","success")}catch(t){E("delete issue",t)}}X({"update-issue":(e,t)=>{$u(e,t.issueId)}});let qi=!1,kt=!0,Tn=null,Oi=null,Hi=null,ws=null;function Fi(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function Ui(e){return e.user_name||e.user_email||"Unknown"}function zi(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<a href="#comments-section" class="activity-comment-link" title="${i}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${p(ve(t(e.old_value)))}</strong> to <strong>${p(ve(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${p(xe(t(e.old_value)))}</strong> to <strong>${p(xe(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${p(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${p(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const s=p(e.field_name||"ritual"),i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<span class="activity-attestation-link" title="${i}">Attested to <strong>${s}</strong></span>`:`Attested to <strong>${s}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||p(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||p(e.field_name)}`:"Updated issue"}}function dr(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function _u(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,d=!1;const l=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let c;for(;(c=l.exec(t))!==null;)if(d=!0,c.index>r&&o.appendChild(document.createTextNode(t.slice(r,c.index))),c[1]){const f=c[1],m=document.createElement("a");m.href=`#/issue/${f}`,m.className="issue-link",m.textContent=f,o.appendChild(m),r=c.index+c[0].length}else if(c[3]){c[2]&&o.appendChild(document.createTextNode(c[2]));const f=document.createElement("span");f.className="mention",f.textContent="@"+c[3],o.appendChild(f),r=c.index+c[0].length}d&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function xu(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let o;for(;(o=n.exec(t))!==null;){a=!0,o.index>i&&s.appendChild(document.createTextNode(t.slice(i,o.index)));const r=o[1],d=document.createElement("a");d.href=`#/issue/${r}`,d.className="issue-link",d.textContent=r,s.appendChild(d),i=o.index+o[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function Iu(e){if(!e)return"";const t=Ae(e),n=document.createElement("div");return n.innerHTML=t,dr(n,_u),n.innerHTML}function ks(e){if(!e)return"";const t=Ae(e),n=document.createElement("div");return n.innerHTML=t,dr(n,xu),n.innerHTML}function Tu(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),s=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),s&&s.classList.toggle("rotated")}function Su(){kt=!kt;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",kt),n&&n.classList.toggle("rotated",kt)}async function $s(e){try{Tn=await v.getTicketRitualsStatus(e),ur(e)}catch(t){console.error("Failed to load ticket rituals:",t),Tn=null}}function ur(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!Tn){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=Tn;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(c=>c.approval_mode==="gate")&&(kt=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",kt);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",kt);const r=n.some(c=>c.trigger==="ticket_close"),d=n.some(c=>c.trigger==="ticket_claim");let l="⚠️ Complete these rituals:";r&&d?l="⚠️ Pending rituals (claim before starting, close before completing):":d?l="⚠️ Complete these rituals before claiming this ticket:":r&&(l="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${l}</p>
                ${n.map(c=>`
                    <div class="ticket-ritual-item pending${c.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${c.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${p(c.name)}</span>
                            <span class="badge badge-trigger-${c.trigger||"ticket_close"}">${c.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${c.approval_mode||"auto"}">${c.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${c.prompt?Ae(c.prompt):""}</div>
                        ${c.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${p(c.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ve(c.attestation.attested_at)}</span>
                                ${c.attestation.note?`<div class="attestation-note markdown-body">${Ae(c.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${Np(c,e)}
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
                            <span class="ticket-ritual-name">${p(c.name)}</span>
                        </div>
                        ${c.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${p(c.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ve(c.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function Gi(e){try{let t;e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t?await z(t.id,!1):D("my-issues",!1)}catch{D("my-issues",!1)}}async function z(e,t=!0){try{kt=!0;const[n,s,i,a,o,r]=await Promise.all([v.getIssue(e),v.getComments(e),v.getActivities(e),v.getSubIssues(e),v.getRelations(e),v.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),l=[...r.pending_rituals||[],...r.completed_rituals||[]].filter(b=>b.attestation&&b.attestation.note).map(b=>({id:`attestation-${b.attestation.id}`,author_name:b.attestation.attested_by_name||"Unknown",content:b.attestation.note,created_at:b.attestation.attested_at,is_attestation:!0,ritual_name:b.name,is_pending:!b.attestation.approved_at}));Tn=r;const c=[...s,...l].sort((b,Me)=>new Date(b.created_at)-new Date(Me.created_at)),f=[n.parent_id?v.getIssue(n.parent_id):Promise.resolve(null),v.getSprints(n.project_id).catch(b=>(console.error("Failed to load sprints:",b),[]))],[m,h]=await Promise.all(f),w=o.filter(b=>b.relation_type==="blocks"&&b.direction==="outgoing"),y=o.filter(b=>b.relation_type==="blocked_by"||b.relation_type==="blocks"&&b.direction==="incoming"),_=o.filter(b=>b.relation_type==="relates_to");t&&history.pushState({issueId:e,view:A()},"",`/issue/${n.identifier}`),us(n),Ao(h),document.querySelectorAll(".view").forEach(b=>b.classList.add("hidden"));const L=document.getElementById("issue-detail-view");L.classList.remove("hidden");const j=A()||"my-issues",S=Y().find(b=>b.id===n.project_id),C=n.assignee_id?En(n.assignee_id):null,B=C?Lt(C):null,K=n.sprint_id?h.find(b=>b.id===n.sprint_id):null,H=be(),ee=H.findIndex(b=>b.id===n.id),ae=ee>0?H[ee-1]:null,Q=ee>=0&&ee<H.length-1?H[ee+1]:null,q=ee>=0;L.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${u(j)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${q?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${ae?`data-action="navigate-issue" data-issue-id="${u(ae.id)}" data-identifier="${u(ae.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${ee+1} / ${H.length}</span>
                            <button class="issue-nav-btn" ${Q?`data-action="navigate-issue" data-issue-id="${u(Q.id)}" data-identifier="${u(Q.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${S?p(S.name):"Project"} › ${p(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${p(n.title)}</h1>

                    ${m?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(m.identifier)}" data-action="navigate-issue" data-issue-id="${u(m.id)}" data-identifier="${u(m.identifier)}">${m.identifier}: ${p(m.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" data-action="edit-description" data-issue-id="${u(n.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                            </button>
                        </div>
                        <div class="description-content markdown-body ${n.description?"":"empty"}"${n.description?"":` data-action="edit-description" data-issue-id="${u(n.id)}"`}>
                            ${n.description?ks(n.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-create-sub-issue-modal" data-issue-id="${u(n.id)}" data-project-id="${u(n.project_id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${a.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:a.map(b=>`
                                <a href="/issue/${encodeURIComponent(b.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${u(b.id)}" data-identifier="${u(b.identifier)}">
                                    <span class="sub-issue-status">${ye(b.status)}</span>
                                    <span class="sub-issue-id">${b.identifier}</span>
                                    <span class="sub-issue-title">${p(b.title)}</span>
                                    ${b.estimate?`<span class="sub-issue-estimate">${b.estimate}pts</span>`:""}
                                </a>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-add-relation-modal" data-issue-id="${u(n.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${w.length===0&&y.length===0&&_.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${y.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${y.map(b=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${ye(b.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(b.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(b.related_issue_id)}" data-identifier="${u(b.related_issue_identifier)}" class="relation-link">${b.related_issue_identifier}</a>
                                            <span class="relation-title">${p(b.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(b.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${w.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${w.map(b=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${ye(b.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(b.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(b.related_issue_id)}" data-identifier="${u(b.related_issue_identifier)}" class="relation-link">${b.related_issue_identifier}</a>
                                            <span class="relation-title">${p(b.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(b.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${_.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${_.map(b=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${ye(b.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(b.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(b.related_issue_id)}" data-identifier="${u(b.related_issue_identifier)}" class="relation-link">${b.related_issue_identifier}</a>
                                            <span class="relation-title">${p(b.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(b.id)}" title="Remove relation">
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
                            <h3>Comments${c.length>0?` <span class="section-count">(${c.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle comments">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="comments-list section-collapsible-content">
                            ${c.length===0?`
                                <div class="comments-empty">No comments yet</div>
                            `:c.map(b=>`
                                <div class="comment ${b.is_attestation?"comment-attestation":""} ${b.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${b.is_attestation?"avatar-attestation":""}">${b.is_attestation?b.is_pending?"⏳":"✓":(b.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${p(b.author_name||"User")}</span>
                                            ${b.is_attestation?`<span class="comment-ritual-badge">${b.is_pending?"Pending approval — ":""}Ritual: ${p(b.ritual_name)}</span>`:""}
                                            <span class="comment-date">${Ve(b.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${Iu(b.content)}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="activity-section">
                        <div class="section-header section-header-collapsible" data-action="toggle-section" data-section="activity">
                            <h3>Activity${i.length>0?` <span class="section-count">(${i.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle activity">
                                <svg class="section-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="activity-list section-collapsible-content collapsed">
                            ${i.length===0?`
                                <div class="activity-empty">No activity yet</div>
                            `:i.map(b=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Fi(b.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${zi(b)}</span>
                                        <span class="activity-actor">by ${p(Ui(b))}</span>
                                        <span class="activity-time">${Ve(b.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <form class="comment-form comment-form-sticky" data-action="save-comment" data-issue-id="${u(n.id)}">
                        <textarea id="new-comment" placeholder="Write a comment... (${/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl"}+Enter to submit)" rows="1"></textarea>
                        <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                        <button type="submit" class="btn btn-primary btn-sm comment-submit-btn">Comment</button>
                    </form>
                </div>

                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${u(n.id)}">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${ye(n.status)}
                                <span>${ve(n.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${u(n.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${Xe(n.priority)}
                                <span>${xe(n.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${u(n.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${n.issue_type||"task"}">${at(n.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${u(n.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${B?`${Pt(C,"avatar-small")}<span>${p(B)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${u(n.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${K?p(K.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${u(n.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${n.labels&&n.labels.length>0?n.labels.map(b=>`
                                        <span class="issue-label" style="background: ${G(b.color)}20; color: ${G(b.color)}">${p(b.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${S?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${p(S.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${u(n.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${aa(n.estimate,n.project_id)?" out-of-scale":""}" ${aa(n.estimate,n.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${Ds(n.estimate,n.project_id)}</span>
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
                                <button class="overflow-menu-item" data-action="edit" data-issue-id="${u(n.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Edit all fields
                                </button>
                                <button class="overflow-menu-item overflow-menu-danger" data-action="delete" data-issue-id="${u(n.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    Delete issue
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        `,ws&&ws.abort(),ws=new AbortController;const{signal:$e}=ws,de=document.querySelector(".sidebar-overflow-trigger"),Be=document.querySelector(".overflow-menu-dropdown");if(de&&Be){const b=()=>{Be.classList.add("hidden"),de.setAttribute("aria-expanded","false")},Me=()=>{const Ee=Be.classList.toggle("hidden");de.setAttribute("aria-expanded",String(!Ee))};de.addEventListener("click",Me,{signal:$e}),document.addEventListener("click",Ee=>{!de.contains(Ee.target)&&!Be.contains(Ee.target)&&b()},{signal:$e}),Be.addEventListener("keydown",Ee=>{Ee.key==="Escape"&&(b(),de.focus())},{signal:$e})}ur(n.id),pu();const je=document.getElementById("new-comment");if(je){const b=Yc(n.id);b&&(je.value=b),je.addEventListener("input",()=>{wi(n.id,je.value)}),je.addEventListener("keydown",Me=>{var Ee;Me.key==="Enter"&&(Me.metaKey||Me.ctrlKey)&&(Me.preventDefault(),(Ee=je.closest("form"))==null||Ee.requestSubmit())})}Oi=ae?ae.id:null,Hi=Q?Q.id:null;const ja=b=>{if(b.metaKey||b.ctrlKey||b.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||b.target.tagName==="INPUT"||b.target.tagName==="TEXTAREA"||b.target.tagName==="SELECT"||b.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor"))return;if(b.key==="ArrowLeft"&&Oi)b.preventDefault(),z(Oi);else if(b.key==="ArrowRight"&&Hi)b.preventDefault(),z(Hi);else if(b.key==="c"){b.preventDefault(),b.stopImmediatePropagation();const mt=document.getElementById("new-comment");mt&&(mt.focus(),mt.scrollIntoView({behavior:"smooth",block:"nearest"}))}else b.key==="j"?(b.preventDefault(),b.stopImmediatePropagation(),Es(1)):b.key==="k"&&(b.preventDefault(),b.stopImmediatePropagation(),Es(-1));const Ee={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[b.key];if(Ee){const mt=document.querySelector(`.property-row[data-field="${Ee}"]`);mt&&(b.preventDefault(),mt.click())}};document.addEventListener("keydown",ja,{signal:$e})}catch(n){E("load issue",n)}}async function Lu(e,t){if(e.preventDefault(),qi)return!1;const n=document.getElementById("new-comment").value;wi(t,null),qi=!0;try{await v.createComment(t,n),await z(t),$("Comment added!","success")}catch(s){wi(t,n),E("add comment",s)}finally{qi=!1}return!1}async function Cu(e){const t=le()||await v.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const s=n.querySelector(".section-header");s&&(s.style.display="none");const i=n.querySelector(".description-content");if(!i)return;i.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" data-action="set-description-editor-mode" data-mode="write">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" data-action="set-description-editor-mode" data-mode="preview">Preview</button>
            </div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${p(t.description||"")}</textarea>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,i.classList.remove("empty"),i.removeAttribute("onclick");const a=document.getElementById("edit-description"),o=Zc(e);o&&(a.value=o),a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?rs(e,r):rs(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&pr()}),a.addEventListener("keydown",r=>{var d,l;r.key==="Enter"&&(r.metaKey||r.ctrlKey)&&(r.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),r.key==="Escape"&&(r.preventDefault(),(l=document.getElementById("cancel-description-edit"))==null||l.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{rs(e,null),s&&(s.style.display=""),i.className=`description-content markdown-body ${t.description?"":"empty"}`,t.description||(i.setAttribute("data-action","edit-description"),i.setAttribute("data-issue-id",t.id)),i.innerHTML=t.description?ks(t.description):'<span class="add-description-link">Add description...</span>'}),document.getElementById("save-description-edit").addEventListener("click",async()=>{var d;const r=(d=document.getElementById("edit-description"))==null?void 0:d.value;if(r!==void 0)try{await v.updateIssue(e,{description:r}),rs(e,null),$("Description updated","success"),z(e,!1)}catch(l){E("update description",l)}})}function pr(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?ks(n):'<span class="text-muted">Nothing to preview.</span>'}function Au(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?pr():s.focus()}function Bu(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-add-relation" data-issue-id="${u(e)}">
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
                <input type="text" id="relation-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-relate" data-issue-id="${u(e)}">
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
    `,N(),document.getElementById("relation-issue-search").focus()}async function ju(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=T())==null?void 0:s.id,o=(await v.searchIssues(i,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${u(r.id)}" data-identifier="${u(r.identifier)}" data-title="${u(r.title)}">
                <span class="link-result-id">${p(r.identifier)}</span>
                <span class="link-result-title">${p(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function Mu(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Du(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Ru(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return $("Please select an issue","error"),!1;try{n==="blocked_by"?await v.createRelation(s,t,"blocks"):await v.createRelation(t,s,n),R(),$("Relation added","success"),z(t)}catch(i){E("add relation",i)}return!1}async function Pu(e,t){try{await v.deleteRelation(e,t),$("Relation removed","success"),z(e)}catch(n){E("remove relation",n)}}function Es(e){const t=le();if(!t)return;const n=be();if(!n||n.length===0)return;const s=n.findIndex(a=>a.id===t.id);if(s===-1)return;const i=s+e;i<0||i>=n.length||z(n[i].id)}X({"show-detail-dropdown":(e,t,n)=>{tu(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{Cu(t.issueId)},"toggle-section":(e,t)=>{Tu(t.section)},"toggle-ticket-rituals":()=>{Su()},"save-comment":(e,t)=>{Lu(e,t.issueId)},"show-add-relation-modal":(e,t)=>{Bu(t.issueId)},"remove-relation":(e,t)=>{Pu(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{fu(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{Ru(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{ju(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{Mu(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{Du()},"set-description-editor-mode":(e,t)=>{Au(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>Es(-1),"navigate-next-issue":()=>Es(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),cr(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Eu(t.issueId)}});function mr(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let _s=[],Sn=[],gr=null,W=new Set,Vt="list",At=!1,Wi=null,xs=null;const Vi=Jc();(Vi==="list"||Vi==="grid")&&(Vt=Vi);function fr(e){if(e!=="list"&&e!=="grid")return;Vt=e,e==="grid"&&At&&Ki(),ed(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),$t()}function hr(){if(Vt!=="list")return;At=!0,W.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),$t(),Kt()}function Ki(){At=!1,W.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),$t(),Kt()}function Nu(){Wi&&clearTimeout(Wi),Wi=setTimeout(()=>{$t()},300)}function qu(){const e=document.getElementById("doc-search");e&&(e.value=""),$t()}async function Ou(){Ne(null)}async function Hu(){const e=document.getElementById("doc-search");e&&(e.value=""),Ne(null)}function Fu(){var i;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=U()||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${p(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=Y().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";s.push(`<span class="filter-chip">Project: ${p(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(s.length>0){let a=s.join(" ");s.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Uu(){return _s}function $t(){var n,s,i;const e=((s=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:s.toLowerCase())||"",t=((i=document.getElementById("doc-sort"))==null?void 0:i.value)||"updated_desc";Fu(),Sn=_s.filter(a=>{var o,r;if(e){const d=(o=a.title)==null?void 0:o.toLowerCase().includes(e),l=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!d&&!l)return!1}return!0}),Sn.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),Ku("",Vt)}async function zu(){var n;const e=gr||((n=T())==null?void 0:n.id);if(!e)return;const t=U()||null;try{_s=await v.getDocuments(e,t),$t()}catch(s){E("load documents",s)}}bt(e=>{e==="currentProject"&&A()==="documents"&&zu()});async function Ln(e,t=null){var s;if(e||(e=(s=T())==null?void 0:s.id),!e)return;gr=e,Lo(-1);const n=document.getElementById("documents-list");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null&&(t=U()||null);try{_s=await v.getDocuments(e,t);const i=document.getElementById("doc-view-list"),a=document.getElementById("doc-view-grid");i&&a&&(i.classList.toggle("active",Vt==="list"),a.classList.toggle("active",Vt==="grid")),$t()}catch(i){const a=document.getElementById("documents-list");a&&(a.innerHTML=""),E("load documents",i)}}function Gu(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${G(t.color)}20; color: ${G(t.color)}">${p(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function Wu(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Gu(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${u(e.id)}" data-action="view-document" data-document-id="${u(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${p(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${p(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?p(mr(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${p(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Vu(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${G(r.color)}20; color: ${G(r.color)}">${p(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?mr(e.content).substring(0,80):"No content",i=At?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${u(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${W.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${At&&W.has(e.id)?" selected":""}" data-action="${At?"toggle-doc-selection":"view-document"}" data-document-id="${u(e.id)}" data-doc-id="${u(e.id)}">
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
  `}function Ku(e="",t="list"){var l;const n=document.getElementById("documents-list");if(!n)return;W.clear(),Kt();const s=Sn;if(s.length===0){const c=(l=document.getElementById("doc-search"))==null?void 0:l.value,f=U(),m=c||f;n.innerHTML=ot({icon:m?Ye.search:Ye.documents,heading:m?"No documents match your filters":"No documents yet",description:m?"Try different search terms or filters":"Create your first document to get started",...!m&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const i=t==="grid"?Wu:Vu,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=Y();s.forEach(c=>{let f,m;if(e==="project")if(f=c.project_id||"__global__",f==="__global__")m="Global (Team-wide)";else{const h=r.find(w=>w.id===c.project_id);m=h?h.name:"Unknown Project"}else e==="sprint"&&(f=c.sprint_id||"__no_sprint__",m=c.sprint_id?"Sprint":"No Sprint");o[f]||(o[f]={label:m,docs:[]}),o[f].docs.push(c)});let d="";for(const[c,f]of Object.entries(o)){const m=t==="grid"?"doc-group-content grid":"doc-group-content";d+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${p(f.label)}</span>
          <span class="doc-group-count">${f.docs.length}</span>
        </div>
        <div class="${m}">
          ${f.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=d}function Yu(e){W.has(e)?W.delete(e):W.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=W.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",W.has(e)),Kt()}function Zu(){Sn.forEach(e=>W.add(e.id)),Sn.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),Kt()}function vr(){W.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),W.clear(),Kt()}function Kt(){const e=document.getElementById("doc-bulk-actions");e&&(At?(e.classList.remove("hidden"),W.size>0?e.innerHTML=`
        <span class="bulk-count">${W.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function Xu(){if(W.size===0){$("No documents selected","error");return}const t=Y().map(n=>`<option value="${n.id}">${p(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${W.size} Document${W.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${W.size} selected document${W.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,N()}async function Qu(e){var o;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(W);let s=0,i=0;for(const r of n)try{await v.updateDocument(r,{project_id:t}),s++}catch(d){console.error(`Failed to move document ${r}:`,d),i++}R(),vr(),i===0?$(`Moved ${s} document${s>1?"s":""}!`,"success"):$(`Moved ${s}, failed ${i}`,"warning");const a=(o=T())==null?void 0:o.id;return await Ln(a),!1}async function Ju(){var a;if(W.size===0){$("No documents selected","error");return}const e=W.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(W);let n=0,s=0;for(const o of t)try{await v.deleteDocument(o),n++}catch(r){console.error(`Failed to delete document ${o}:`,r),s++}Ki(),s===0?$(`Deleted ${n} document${n>1?"s":""}!`,"success"):$(`Deleted ${n}, failed ${s}`,"warning");const i=(a=T())==null?void 0:a.id;await Ln(i)}async function He(e,t=!0){try{const n=await v.getDocument(e);t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(S=>S.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");let i="";try{const S=await v.getDocumentComments(n.id);i=`
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${S.length===0?'<div class="comments-empty">No comments yet</div>':S.map(B=>{var K,H;return`
            <div class="comment" data-comment-id="${u(B.id)}">
              <div class="comment-avatar">${((H=(K=B.author_name)==null?void 0:K.charAt(0))==null?void 0:H.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${p(B.author_name||"Unknown")}</span>
                  <span class="comment-date">${Ve(B.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${Ae(B.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form comment-form-sticky" data-action="add-document-comment" data-document-id="${u(n.id)}">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="1"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(S){console.error("Failed to load comments:",S)}let a=null,o=null;if(n.project_id){const C=Y().find(B=>B.id===n.project_id);if(a=C?C.name:null,n.sprint_id)try{const B=await v.getSprint(n.sprint_id);o=B?B.name:null}catch{}}let r=n.content||"";const d=P.lexer(r);n.title&&d.length>0&&d[0].type==="heading"&&d[0].depth===1&&d[0].text.trim()===n.title.trim()&&(r=r.slice(d[0].raw.length).trimStart());const l=Uu(),c=l.findIndex(S=>S.id===n.id),f=c>0?l[c-1]:null,m=c>=0&&c<l.length-1?l[c+1]:null,h=c>=0,w=n.labels&&n.labels.length>0?n.labels.map(S=>`
          <span class="issue-label" style="background: ${G(S.color)}20; color: ${G(S.color)}">
            ${p(S.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${u(n.id)}" data-label-id="${u(S.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let y='<span class="text-muted">None</span>';try{const S=await v.getDocumentIssues(n.id);S.length>0&&(y=S.map(C=>`
          <div class="linked-item">
            <span class="linked-item-id">${p(C.identifier)}</span>
            <span class="linked-item-title">${p(C.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${u(n.id)}" data-issue-id="${u(C.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch{}s.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="documents">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${h?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${f?`data-action="view-document" data-document-id="${u(f.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${c+1} / ${l.length}</span>
              <button class="issue-nav-btn" ${m?`data-action="view-document" data-document-id="${u(m.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?p(a)+" ›":""} ${p(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?p(n.icon)+" ":""}${p(n.title)}</h1>

          <div class="document-content markdown-body">${r?Ae(r):'<p class="text-muted">No content</p>'}</div>

          ${i}
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-section">
            <h4>Properties</h4>

            <div class="property-row">
              <span class="property-label">Project</span>
              <span class="property-value-static">${a?p(a):'<span class="text-muted">Global</span>'}</span>
            </div>

            ${o?`
            <div class="property-row">
              <span class="property-label">Sprint</span>
              <span class="property-value-static">${p(o)}</span>
            </div>
            `:""}

            <div class="property-row">
              <span class="property-label">Labels</span>
              <div class="property-value-static property-labels-btn">
                ${w}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${u(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${p(n.author_name||"Unknown")}</span>
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
              ${y}
            </div>
            <button class="btn btn-secondary btn-small sidebar-link-btn" data-action="show-link-issue-modal" data-document-id="${u(n.id)}">+ Link Issue</button>
          </div>

          <div class="sidebar-section sidebar-actions">
            <div class="sidebar-overflow-menu">
              <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
              </button>
              <div class="overflow-menu-dropdown hidden">
                <button class="overflow-menu-item" data-action="show-edit-document-modal" data-document-id="${u(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit document
                </button>
                <button class="overflow-menu-item overflow-menu-danger" data-action="delete-document" data-document-id="${u(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  Delete document
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    `,xs&&xs.abort(),xs=new AbortController;const{signal:_}=xs,L=s.querySelector(".sidebar-overflow-trigger"),j=s.querySelector(".overflow-menu-dropdown");if(L&&j){const S=()=>{j.classList.add("hidden"),L.setAttribute("aria-expanded","false")},C=()=>{const B=j.classList.toggle("hidden");L.setAttribute("aria-expanded",String(!B))};L.addEventListener("click",C,{signal:_}),document.addEventListener("click",B=>{!L.contains(B.target)&&!j.contains(B.target)&&S()},{signal:_}),j.addEventListener("keydown",B=>{B.key==="Escape"&&(S(),L.focus())},{signal:_})}}catch(n){E("load document",n)}}async function Is(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await v.getSprints(t);let o=n;if(s&&!n){const d=a.find(l=>l.status==="active");d&&(o=d.id)}const r=a.map(d=>`<option value="${d.id}" ${d.id===o?"selected":""}>${p(d.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function br(){Cn=null;const e=Y(),t=jr()||"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${p(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
  `,N(),t&&await Is("doc-sprint",t,null,!0)}let Cn=null;async function ep(e,t,n){Cn=n||null;const i=Y().map(a=>`<option value="${u(a.id)}" ${a.id===t?"selected":""}>${p(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
  `,N(),t&&await Is("doc-sprint",t,e)}async function tp(e){var a;e.preventDefault();const t=(a=T())==null?void 0:a.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{if(await v.createDocument(t,i),await Ln(t),R(),$("Document created!","success"),Cn){const o=Cn;Cn=null,o()}}catch(o){E("create document",o)}return!1}async function yr(e){try{const t=await v.getDocument(e),s=Y().map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${p(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
      <form data-action="update-document" data-document-id="${u(e)}">
        <div class="form-group">
          <label for="edit-doc-title">Title</label>
          <input type="text" id="edit-doc-title" value="${u(t.title)}" required>
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
          <textarea id="edit-doc-content" style="min-height: 200px">${p(t.content||"")}</textarea>
        </div>
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${u(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,N(),t.project_id&&await Is("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){E("load document",t)}}async function np(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await v.updateDocument(t,i),R(),await He(t),$("Document updated!","success")}catch(a){E("update document",a)}return!1}async function sp(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await v.deleteDocument(e);const n=(t=T())==null?void 0:t.id;await Ln(n),D("documents"),$("Document deleted!","success")}catch(n){E("delete document",n)}}function ip(e,t){Is(e,t)}async function ap(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${u(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,N()}async function op(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=T())==null?void 0:s.id,a=await v.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${u(t)}" data-issue-id="${u(o.id)}">
        <span class="link-result-id">${p(o.identifier)}</span>
        <span class="link-result-title">${p(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function rp(e,t){try{await v.linkDocumentToIssue(e,t),R(),$("Issue linked!","success"),await He(e,!1)}catch(n){E("link issue",n)}}async function lp(e,t){if(confirm("Unlink this issue from the document?"))try{await v.unlinkDocumentFromIssue(e,t),$("Issue unlinked!","success"),await He(e,!1)}catch(n){E("unlink issue",n)}}let Yi=!1;async function cp(e,t){if(e.preventDefault(),Yi)return!1;const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return $("Please enter a comment","error"),!1;Yi=!0;try{await v.createDocumentComment(t,s),n.value="",$("Comment added!","success"),await He(t,!1)}catch(i){E("add comment",i)}finally{Yi=!1}return!1}async function dp(e){var n;const t=(n=T())==null?void 0:n.id;if(!t){$("No team selected","error");return}try{const s=await v.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,N();return}const i=s.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${u(e)}" data-label-id="${u(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${G(a.color)}; color: white;">${p(a.name)}</span>
        ${a.description?`<span class="text-muted">${p(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,N()}catch(s){E("load labels",s)}}async function up(e,t){try{await v.addLabelToDocument(e,t),R(),$("Label added!","success"),await He(e,!1)}catch(n){E("add label",n)}}async function pp(e,t){try{await v.removeLabelFromDocument(e,t),$("Label removed!","success"),await He(e,!1)}catch(n){E("remove label",n)}}X({"view-document":(e,t)=>{e.preventDefault(),He(t.documentId)},"toggle-doc-selection":(e,t)=>{Yu(t.docId)},"clear-doc-search":()=>{qu()},"clear-doc-project-filter":()=>{Ou()},"clear-all-doc-filters":()=>{Hu()},"show-bulk-move-modal":()=>{Xu()},"bulk-delete-documents":()=>{Ju()},"select-all-docs":()=>{Zu()},"clear-doc-selection":()=>{vr()},"exit-selection-mode":()=>{Ki()},"enter-selection-mode":()=>{hr()},"handle-bulk-move":e=>{Qu(e)},"unlink-document-issue":(e,t)=>{lp(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{ap(t.documentId)},"add-document-comment":(e,t)=>{cp(e,t.documentId)},"remove-label-from-doc":(e,t)=>{pp(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{dp(t.documentId)},"show-edit-document-modal":(e,t)=>{yr(t.documentId)},"delete-document":(e,t)=>{sp(t.documentId)},"create-document":e=>{tp(e)},"update-doc-sprint-dropdown":(e,t,n)=>{ip(t.sprintSelect,n.value)},"update-document":(e,t)=>{np(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{op(n.value,t.documentId)},"link-to-issue":(e,t)=>{rp(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{up(t.documentId,t.labelId)}});let Yt=[],Ts={},Ss=new Set,lt=null,Zi=null,Xi=[],An=[],Qi=[];function wr(){return Ts}function mp(){return Zi}function gp(){return lt}bt(e=>{e==="currentProject"&&A()==="sprints"&&Bn()});async function Bn(){const e=U();if(!e){const t=document.getElementById("sprints-list");t&&(t.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}Cp();try{await v.getCurrentSprint(e),Yt=await v.getSprints(e),fp(),await Ls()}catch(t){E("load sprints",t)}}function fp(){const e=document.getElementById("sprints-list");if(!e)return;const t=Yt.find(a=>a.status==="active"),n=Yt.find(a=>a.status==="planned"),s=Yt.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 data-action="view-sprint" data-sprint-id="${u(t.id)}" data-sprint-url="/sprint/${u(t.id)}" style="cursor: pointer;">
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
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${u(t.id)}" data-sprint-name="${u(t.name)}" data-budget="${t.budget||""}" data-project-id="${u(t.project_id)}">Edit Sprint</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" data-action="show-limbo-details-modal">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" data-action="show-close-sprint-confirmation" data-sprint-id="${u(t.id)}">Close Sprint</button>
                    `}
                </div>
            </div>
        `,i+=hp(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${u(n.id)}" data-sprint-url="/sprint/${u(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${p(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${u(n.id)}" data-sprint-name="${u(n.name)}" data-budget="${n.budget||""}" data-project-id="${u(n.project_id)}">Edit Sprint</button>
                </div>
            </div>
        `}s.length>0&&(i+=`
            <details class="sprint-history">
                <summary>Completed Sprints (${s.length})</summary>
                <div class="sprint-history-list">
                    ${s.map(a=>`
                        <div class="sprint-history-item" data-action="view-sprint" data-sprint-id="${u(a.id)}" data-sprint-url="/sprint/${u(a.id)}" style="cursor: pointer;">
                            <span class="sprint-history-name">${p(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=i||ot({icon:Ye.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function hp(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),c=((H,ee,ae)=>Math.min(Math.max(H,ee),ae))((new Date-o)/(r-o),0,1),f=360,m=120,h=16,w=h,y=f-h,_=h,L=m-h,j=H=>s===0?L:_+(1-H/s)*(L-_),S=j(s),C=j(0),B=w+(y-w)*c,K=j(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${Cs(e.start_date)} → ${Cs(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${f} ${m}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${w}" y1="${S}" x2="${y}" y2="${C}" class="burndown-ideal" />
                <line x1="${w}" y1="${S}" x2="${B}" y2="${K}" class="burndown-actual" />
                <circle cx="${B}" cy="${K}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}async function jn(e,t=!0){var n;try{const s=await v.getSprint(e);if(!s){$("Sprint not found","error"),D("sprints");return}Zi=s;const i=(n=T())==null?void 0:n.id,[a,o,r]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getSprintTransactions(e).catch(()=>[]),i?v.getDocuments(i,s.project_id,null,e).catch(()=>[]):[]]);Xi=a,Qi=o,An=r,t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),bp()}catch(s){console.error("Failed to load sprint:",s),$("Failed to load sprint","error"),D("sprints")}}async function vp(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){$("Invalid sprint ID","error"),D("sprints",!1);return}try{await jn(e,!1)}catch{D("sprints",!1)}}function bp(){const e=Zi,t=Xi;document.querySelectorAll(".view").forEach(l=>l.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=t.filter(l=>Nt.includes(l.status)),i=t.filter(l=>l.status==="done"),a=t.reduce((l,c)=>l+(c.estimate||0),0),o=i.reduce((l,c)=>l+(c.estimate||0),0);let r="";e.status==="active"?r='<span class="badge badge-status-active">Active</span>':e.status==="planned"?r='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(r='<span class="badge badge-status-completed">Completed</span>');const d=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="sprints">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${p(e.name)}</h2>
                ${r}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.start_date&&e.end_date?`
                <div class="sprint-detail-dates">
                    ${Cs(e.start_date)} → ${Cs(e.end_date)}
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
                        ${s.map(l=>kr(l)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${i.length>0?"open":""}>
                <summary><h3>Completed Issues (${i.length})</h3></summary>
                ${i.length===0?`
                    <div class="empty-state-small">No completed issues yet</div>
                `:`
                    <div class="sprint-issues-list">
                        ${i.map(l=>kr(l)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${wp()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${An.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${u(e.id)}"
                        data-project-id="${u(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${An.length>0?`
                    <div class="sprint-issues-list">
                        ${An.map(l=>yp(l)).join("")}
                    </div>
                `:`
                    <div class="empty-state-small">No documents in this sprint yet</div>
                `}
            </div>
        </div>
    `}function kr(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",s=Mo.includes(e.status)?e.status:"backlog",i=n?`badge-priority-${n}`:"",a=`status-dot-${s}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${u(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${p(e.identifier)}</span>
            <span class="sprint-issue-title">${p(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${i}">${Bp(n)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function yp(e){const t=p(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${u(e.id)}" data-document-url="/document/${u(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${p(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${Ve(e.created_at)}</span>
            </span>
        </div>
    `}function wp(){const e=Qi;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${kp(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function kp(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function $p(e,t,n,s){const i=s?tm(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${u(e)}" data-project-id="${u(s)}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${u(t)}" placeholder="Sprint name">
            </div>
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
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    `,N()}async function Ep(e,t,n){var r,d,l;e.preventDefault();const s=(d=(r=document.getElementById("sprint-name"))==null?void 0:r.value)==null?void 0:d.trim(),i=document.getElementById("sprint-budget").value,a=i?parseInt(i):null,o=((l=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:l.value)||"this";try{const c={budget:a};if(s&&(c.name=s),await v.updateSprint(t,c),o==="planned"||o==="default"){const m=Yt.filter(h=>h.status==="planned"&&h.id!==t);for(const h of m)await v.updateSprint(h.id,{budget:a})}o==="default"&&n&&await v.updateProject(n,{default_sprint_budget:a}),await Bn(),R(),$(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(c){E("update budget",c)}return!1}async function _p(e){const t=Yt.find(d=>d.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,N();const n=Nt;let s=0,i=!1,a=!1;try{const[d,l]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getRituals(t.project_id)]);s=d.filter(c=>n.includes(c.status)).length,i=l.some(c=>c.is_active&&c.trigger==="every_sprint")}catch(d){console.error("Failed to load sprint details:",d),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${p(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${u(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function xp(e){try{const t=await v.closeSprint(e);await Bn(),t.limbo?Tp(t):$("Sprint completed!","success")}catch(t){E("complete sprint",t)}}async function Ls(){const e=U();if(e)try{lt=await v.getLimboStatus(e),Ip()}catch(t){console.error("Failed to load limbo status:",t)}}function Ip(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!lt||!lt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${lt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function Tp(e){const t=U();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,N(),Sp(t)}async function Sp(e){try{const t=await v.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${p(s.name)} <span class="ritual-mode">(${p(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${Ae(s.prompt)}</div>
                    ${ea(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function Ji(){var t,n;if(!lt)return;const e=U();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${lt.pending_rituals.map(s=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${s.attestation?s.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${p(s.name)}</strong>
                            <span class="badge badge-ritual-${u(s.approval_mode)}">${p(s.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${Ae(s.prompt)}</div>
                        ${ea(s.attestation)}
                        ${Lp(s,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=lt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${lt.completed_rituals.map(s=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${p(s.name)}</div>
                            ${ea(s.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,N()}function ea(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${p(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${p(Ve(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${Ae(e.note)}</div>
        </div>
    `}function Lp(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${u(e.id)}" data-project-id="${u(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${u(e.id)}" data-project-id="${u(t)}" data-ritual-name="${u(e.name)}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function $r(e){for(const t of e)if(!Ss.has(t))try{(await v.getSprints(t)).forEach(s=>{Ts[s.id]=s}),Ss.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Cp(){Ts={},Ss=new Set,Xi=[],Qi=[],An=[]}function Ap(e,t){t.forEach(n=>{Ts[n.id]=n}),Ss.add(e)}X({"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}jn(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;$p(t.sprintId,t.sprintName,n,t.projectId)},"show-limbo-details-modal":()=>{Ji()},"show-close-sprint-confirmation":(e,t)=>{_p(t.sprintId)},"handle-update-budget":(e,t)=>{Ep(e,t.sprintId,t.projectId)},"close-modal":()=>{R()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,R(),xp(t.sprintId)},"dismiss-limbo-modal":()=>{R(),Ls()},"approve-ritual":(e,t)=>{Rp(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{_r(t.ritualId,t.projectId,t.ritualName)},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}z(t.issueId)},"create-sprint-document":async(e,t)=>{await ep(t.sprintId,t.projectId,()=>{jn(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}He(t.documentId)}});function Cs(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function Bp(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}bt(e=>{e==="currentProject"&&A()==="rituals"&&Er()});async function Er(){const e=U(),t=document.getElementById("rituals-content");if(!e){const n=document.getElementById("rituals-tabs");n&&n.classList.add("hidden"),t&&(t.innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>');return}lm(e),t&&(t.innerHTML='<div class="loading">Loading rituals...</div>');try{await Pn()}catch(n){t&&(t.innerHTML=`<div class="empty-state">Error loading rituals: ${p(n.message)}</div>`)}}async function jp(){Br(Mp),Er()}function Mp(){const e=document.getElementById("rituals-content"),t=cm(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,Xt("rv-sprint-rituals-list",n,"sprint"),Xt("rv-close-rituals-list",s,"close"),Xt("rv-claim-rituals-list",i,"claim")}function Dp(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function Rp(e,t){try{await v.approveAttestation(e,t),$("Ritual approved!","success"),await Ls(),Ji()}catch(n){E("approve ritual",n)}}async function _r(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{Pp(s,e,t)}),N()}async function Pp(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await v.completeGateRitual(t,n,s||null),$("Ritual completed!","success"),await Ls();const i=gp();i&&!i.in_limbo?(R(),$("Limbo cleared! Next sprint is now active.","success")):Ji()}catch(i){E("complete gate ritual",i)}return!1}function Np(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}" data-ritual-name="${u(e.name)}">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}" data-ritual-name="${u(e.name)}" data-ritual-prompt="${u(e.prompt||"")}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}">Attest</button>`}function qp(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${p(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{Op(i,e,t)}),N()}async function Op(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return $("A note is required for this attestation.","error"),!1;try{await v.attestTicketRitual(t,n,s),$("Ritual attested!","success"),R(),await $s(n)}catch(i){E("attest ticket ritual",i)}return!1}async function Hp(e,t){try{await v.attestTicketRitual(e,t),$("Ritual attested!","success"),await $s(t)}catch(n){E("attest ticket ritual",n)}}async function Fp(e,t){try{await v.approveTicketRitual(e,t),$("Ritual approved!","success"),await $s(t)}catch(n){E("approve ticket ritual",n)}}function Up(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{zp(s,e,t)}),N()}async function zp(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await v.completeTicketGateRitual(t,n,s||null),$("Ritual completed!","success"),R(),await $s(n)}catch(i){E("complete ticket ritual",i)}return!1}X({"show-create-ritual-modal":(e,t)=>{Pr(t.trigger)},"approve-ticket-ritual":(e,t)=>{Fp(t.ritualId,t.issueId)},"complete-ticket-ritual":(e,t)=>{Up(t.ritualId,t.issueId,t.ritualName)},"attest-ticket-ritual-modal":(e,t)=>{qp(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt)},"attest-ticket-ritual":(e,t)=>{Hp(t.ritualId,t.issueId)}});function Ae(e){if(!e)return"";try{P.setOptions({breaks:!0,gfm:!0});const n=P.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return $o.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function ta(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function Gp(e,t,n,s,i,a,o,r){var d;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${p(i)}</span>
                    <span class="gate-approval-issue-title">${p(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${u(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${p(s)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${p(o)}</strong>${r?` ${ta(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",l=>{Wp(l,e,t,n)}),N(),(d=document.querySelector(".modal"))==null||d.classList.add("modal-wide")}async function Wp(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await v.completeTicketGateRitual(t,n,i||null),$(`GATE ritual "${s}" approved!`,"success"),R(),Mn()}catch(a){E("complete gate ritual",a)}}function Vp(e,t,n,s,i,a,o,r){Gp(e,t,n,s,i,a,o,r)}function Kp(e,t,n,s,i,a,o,r,d){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${p(i)}</span>
                    <span class="gate-approval-issue-title">${p(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${u(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${p(s)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${p(o)}</strong>${r?` ${ta(r)}`:""}</div>`:""}
                ${d?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${Ae(d)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",c=>{Yp(c,e,t,n)}),N(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function Yp(e,t,n,s){var a,o;e.preventDefault();const i=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{if(await v.approveTicketRitual(t,n),i)try{await v.createComment(n,i)}catch(r){console.error("Failed to post approval comment:",r)}$(`Review ritual "${s}" approved!`,"success"),R(),Mn()}catch(r){E("approve review ritual",r)}}function Zp(e,t,n,s,i,a,o,r,d){Kp(e,t,n,s,i,a,o,r,d)}let na=[];async function Mn(){if(!T())return;const e=document.getElementById("gate-approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=await Promise.all(Y().map(async i=>{const[a,o]=await Promise.all([v.getPendingApprovals(i.id),v.getLimboStatus(i.id)]);return{project:i,approvals:a,limbo:o}})),n=[],s=[];for(const{project:i,approvals:a,limbo:o}of t)if(n.push(...a),o&&o.in_limbo){const r=(o.pending_rituals||[]).filter(d=>{var l;return(l=d.attestation)!=null&&l.approved_at?!1:d.approval_mode==="gate"||!!d.attestation});r.length>0&&s.push({project:i,rituals:r})}pd(n),na=s,xr()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${p(t.message)}</p></div>`}}}function xr(){const e=document.getElementById("gate-approvals-list");if(!e)return;const t=ud(),n=na.length>0,s=!td();if(t.length===0&&!n){s?e.innerHTML=`
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
                    ${na.map(({project:c,rituals:f})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${p(c.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${f.map(m=>{const h=m.attestation&&!m.attestation.approved_at,w=h?"⏳":"○",y=h?`<span class="gate-waiting-info">Attested by <strong>${p(m.attestation.attested_by_name||"Unknown")}</strong></span>`:m.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',_=h?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${u(m.id)}"
                                            data-project-id="${u(c.id)}">Approve</button>`:m.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${u(m.id)}"
                                                data-project-id="${u(c.id)}"
                                                data-ritual-name="${u(m.name)}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${w} ${p(m.name)}
                                                    <span class="badge badge-ritual-${u(m.approval_mode)}">${p(m.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${p(m.prompt)}</span>
                                                ${y}
                                            </div>
                                            ${_}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const a=c=>c.pending_approvals||[],o=c=>f=>{const m=a(f).filter(c);return m.length>0?{...f,_filteredApprovals:m}:null},r=t.map(o(c=>c.approval_mode==="gate"&&c.limbo_type==="claim")).filter(Boolean),d=t.map(o(c=>c.approval_mode==="gate"&&c.limbo_type==="close")).filter(Boolean),l=t.map(o(c=>c.approval_mode==="review")).filter(Boolean);r.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(sa).join("")}
                </div>
            </div>
        `),d.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${d.map(sa).join("")}
                </div>
            </div>
        `),l.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${l.map(sa).join("")}
                </div>
            </div>
        `),e.innerHTML=i,e.querySelectorAll(".gate-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const f=c.dataset;Vp(f.ritualId,f.issueId,f.ritualName,f.ritualPrompt,f.issueIdentifier,f.issueTitle,f.requestedBy,f.requestedAt)})}),e.querySelectorAll(".review-approve-btn").forEach(c=>{c.addEventListener("click",()=>{const f=c.dataset;Zp(f.ritualId,f.issueId,f.ritualName,f.ritualPrompt,f.issueIdentifier,f.issueTitle,f.requestedBy,f.requestedAt,f.attestationNote)})}),e.querySelectorAll(".sprint-approve-btn").forEach(c=>{c.addEventListener("click",async()=>{c.disabled=!0;try{await v.approveAttestation(c.dataset.ritualId,c.dataset.projectId),$("Sprint ritual approved!","success"),await Mn()}catch(f){c.disabled=!1,E("approve sprint ritual",f)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(c=>{c.addEventListener("click",()=>{_r(c.dataset.ritualId,c.dataset.projectId,c.dataset.ritualName)})})}function Xp(){nd(),xr()}function sa(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${p(s.requested_by_name)}</strong>${s.requested_at?` (${ta(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note">${Ae(s.attestation_note)}</div>`:"",d=i?"review-approve-btn":"gate-approve-btn",l=i?"Approve":"Complete",c=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>';return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${p(s.ritual_name)} ${c}</span>
                    <span class="gate-ritual-prompt">${p(s.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                <button class="btn btn-small btn-primary ${d}"
                    data-ritual-id="${u(s.ritual_id)}"
                    data-issue-id="${u(e.issue_id)}"
                    data-ritual-name="${u(s.ritual_name)}"
                    data-ritual-prompt="${u(s.ritual_prompt)}"
                    data-issue-identifier="${u(e.identifier)}"
                    data-issue-title="${u(e.title)}"
                    data-requested-by="${u(s.requested_by_name||"")}"
                    data-requested-at="${u(s.requested_at||"")}"
                    data-attestation-note="${u(s.attestation_note||"")}">${l}</button>
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${u(e.issue_id)}" class="gate-issue-link">
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
    `}X({"view-issue-from-modal":(e,t)=>{e.preventDefault(),R(),z(t.issueId)},"dismiss-approvals-explainer":()=>{Xp()}});const As={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Bs={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Ir=0;function Tr(e){Ir=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=Sr(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Sr(e="",t="",n=""){const s=Ir++,i=Object.keys(As).map(l=>`<option value="${l}" ${l===e?"selected":""}>${l}</option>`).join(""),o=(e?As[e]:As.estimate).map(l=>`<option value="${l}" ${l===t?"selected":""}>${Bs[l]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",d=t==="isnull";return`
        <div class="condition-row" id="condition-row-${s}">
            <select class="condition-field" data-action="update-operator-options" data-row-id="${s}">
                <option value="">Select field...</option>
                ${i}
            </select>
            <select class="condition-operator" id="condition-operator-${s}" data-action="toggle-value-input" data-row-id="${s}">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${s}" value="${u(String(r))}" placeholder="Value"${d?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" data-action="remove-condition-row" data-row-id="${s}">&times;</button>
        </div>
    `}function Qp(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Sr()),js()}function Jp(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),js()}function em(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=As[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${Bs[o]}</option>`).join(""),Lr(e),js()}function Lr(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Dn(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function js(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Cr(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,d=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,l=o.querySelector(".condition-value");let c=(a=l==null?void 0:l.value)==null?void 0:a.trim();if(!r&&!d)continue;if(!r)throw Dn("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!d)throw Dn("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const f=`${r}__${d}`;if(n.has(f))throw Dn(`Duplicate condition: ${r} ${Bs[d]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${f}`);if(n.add(f),d==="isnull")t[f]=!0;else if(d==="in"||d==="contains")t[f]=c?c.split(",").map(m=>m.trim()).filter(m=>m):[];else if(d==="gte"||d==="lte"){if(!c)throw Dn(`Please enter a numeric value for ${r} ${Bs[d]}.`),new Error(`Missing numeric value for ${f}`);const m=parseInt(c,10);if(isNaN(m))throw Dn(`Invalid number "${c}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${f}: ${c}`);t[f]=m}else t[f]=c}return js(),Object.keys(t).length>0?t:null}X({"add-condition-row":()=>{Qp()},"remove-condition-row":(e,t)=>{Jp(Number(t.rowId))},"update-operator-options":(e,t)=>{em(Number(t.rowId))},"toggle-value-input":(e,t)=>{Lr(Number(t.rowId))}});let ie=[],ia=null;const Ar=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter"];bt((e,t)=>{e==="currentProject"&&(t&&Uc(t),Ar.forEach(n=>{const s=document.getElementById(n);s&&(s.value=t||"")}),ym(t||""))});const Ms={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function Br(e){ia=e}function Y(){return ie}function Zt(e){const t=ie.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return Ms[n]||Ms.fibonacci}function Ds(e,t){if(!e)return"No estimate";const s=Zt(t).find(i=>i.value===e);return s?s.label:`${e} points`}function aa(e,t){return e?!Zt(t).some(s=>s.value===e):!1}function tm(e){const t=ie.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(Ms[n]||Ms.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function Fe(){if(T())try{ie=await v.getProjects(T().id),nm();const e=U();if(e&&ie.some(s=>s.id===e))return;const t=oa();if(t&&ie.some(s=>s.id===t)){Ne(t);return}const n=Eo();if(n&&ie.some(s=>s.id===n)){Ne(n);return}ie.length>0&&Ne(ie[0].id)}catch(e){E("load projects",e)}}function nm(){const e='<option value="">All Projects</option>'+ie.map(a=>`<option value="${a.id}">${p(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+ie.map(a=>`<option value="${a.id}">${p(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter"],s=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),s.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const i=U();Ar.forEach(a=>{const o=document.getElementById(a);o&&(o.value=i||"")})}function jr(){return Eo()}function Rn(){const e=document.getElementById("projects-list");if(ie.length===0){e.innerHTML=ot({icon:Ye.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=ie.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${u(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${G(t.color)}20; color: ${G(t.color)}">
                    ${p(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${p(t.name)}</div>
                <button class="grid-item-edit" data-action="view-project-settings" data-project-id="${u(t.id)}" title="Project settings">
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
    `).join("")}function sm(e){Ne(e),D("issues")}function Mr(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,N()}async function im(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.createProject(T().id,t),await Fe(),Rn(),R(),$("Project created!","success")}catch(n){E("create project",n)}return!1}async function am(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.updateProject(t,n),await Fe(),Rn(),R(),$("Project updated!","success")}catch(s){E("update project",s)}return!1}async function om(e){const t=ie.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await v.deleteProject(e),await Fe(),Rn(),R(),$("Project deleted","success")}catch(n){E("delete project",n)}}let we=null;async function Dr(e){we=e,ie.length===0&&await Fe();const t=ie.find(n=>n.id===e);if(!t){$("Project not found","error"),D("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Rr("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Rr(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!ct||ct.length===0)&&Pn()}function rm(){we=null,ct=[]}function lm(e){we=e}function cm(){return ct}async function dm(){if(!we)return;const e=document.getElementById("ps-name").value.trim();if(!e){$("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await v.updateProject(we,t),await Fe(),$("Settings saved","success");const n=ie.find(s=>s.id===we);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){E("save project settings",n)}}async function um(){if(!we)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await v.updateProject(we,n),await Fe(),$("Settings saved","success")}catch(s){E("save settings",s)}}let ct=[];async function Pn(){if(we)try{ct=await v.getRituals(we),pm(),typeof ia=="function"&&ia()}catch(e){E("load rituals",e)}}function pm(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=ct.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=ct.filter(s=>s.trigger==="ticket_close"),n=ct.filter(s=>s.trigger==="ticket_claim");Xt("ps-sprint-rituals-list",e,"sprint"),Xt("ps-close-rituals-list",t,"close"),Xt("ps-claim-rituals-list",n,"claim")}function Xt(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>u(a||"auto");s.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${p(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${i(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${p(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${Ae(a.prompt)}</div>
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
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${u(a.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${u(a.id)}" data-ritual-name="${u(a.name)}">Delete</button>
      </div>
    </div>
  `}).join("")}async function Pr(e){if(!we)return;let t=[];try{t=await v.getRitualGroups(we)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
          ${t.map(n=>`<option value="${u(n.id)}" data-mode="${u(n.selection_mode)}">${p(n.name)} (${p(n.selection_mode)})</option>`).join("")}
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
        ${Tr(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,N()}function mm(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function gm(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),s=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),s.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),s.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),s.classList.add("hidden")}async function Nr(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw $("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await v.createRitualGroup(we,{name:t,selection_mode:n})).id}return e.value||null}async function fm(e){e.preventDefault();let t;try{t=Cr()}catch{return!1}let n;try{n=await Nr()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){s.group_id=n;const i=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&i.value&&(s.weight=parseFloat(i.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(s.percentage=parseFloat(a.value))}try{await v.createRitual(we,s),await Pn(),R(),$("Ritual created!","success")}catch(i){E("create ritual",i)}return!1}async function hm(e){const t=ct.find(o=>o.id===e);if(!t)return;let n=[];try{n=await v.getRitualGroups(we)}catch{}const s=n.find(o=>o.id===t.group_id),i=s&&s.selection_mode==="random_one",a=s&&s.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form data-action="update-project-ritual" data-ritual-id="${u(e)}">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${u(t.name)}" required>
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
          ${n.map(o=>`<option value="${u(o.id)}" data-mode="${u(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${p(o.name)} (${p(o.selection_mode)})</option>`).join("")}
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
        ${Tr(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,N()}async function vm(e,t){e.preventDefault();let n;try{n=Cr()}catch{return!1}let s;try{s=await Nr()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:s||""};if(s){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await v.updateRitual(t,i),await Pn(),R(),$("Ritual updated!","success")}catch(a){E("update ritual",a)}return!1}async function bm(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await v.deleteRitual(e),await Pn(),$("Ritual deleted","success")}catch(n){E("delete ritual",n)}}X({"view-project":(e,t)=>{sm(t.projectId)},"view-project-settings":(e,t)=>{Dr(t.projectId)},"create-project":e=>{im(e)},"update-project":(e,t)=>{am(e,t.projectId)},"confirm-delete-project":(e,t)=>{om(t.projectId)},"edit-project-ritual":(e,t)=>{hm(t.ritualId)},"delete-project-ritual":(e,t)=>{bm(t.ritualId,t.ritualName)},"create-project-ritual":e=>{fm(e)},"update-project-ritual":(e,t)=>{vm(e,t.ritualId)},"toggle-ritual-conditions":()=>{mm()},"ritual-group-change":()=>{gm()}});function oa(){const t=new URLSearchParams(window.location.search).get("project");return t||jr()}function ym(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}const ra={},Rs=new Map;let la=null,ca=null,da=null,ua=null,pa=null,ma=null,qr=!1;function wm(e){Object.assign(ra,e)}function km({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i,epicNavigate:a}={}){e&&(la=e),t&&(ca=t),n&&(da=n),s&&(ua=s),i&&(pa=i),a&&(ma=a)}function $m(){return Object.keys(ra)}function D(e,t=!0){if(t&&Rs.set(window.location.href,window.scrollY),rd(e),t){let i;const a=oa(),o=["issues","board","sprints"];e==="my-issues"?i="/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:o.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),la&&la();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const i=document.getElementById(`${e}-view`);i&&i.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const s=ra[e];s&&s(),t&&window.scrollTo(0,0)}function Or(){var s;const t=window.location.pathname.split("/").filter(Boolean);ua&&ua();let n="my-issues";if(t.length===0||t[0]==="")D("my-issues",!1);else{if(ca&&ca(t))return;n=t[0],$m().includes(n)?D(n,!1):(n="my-issues",D("my-issues",!1))}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function Hr(e){Rs.set(window.location.href,window.scrollY),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),pa&&pa(e)}function Em(e){Rs.set(window.location.href,window.scrollY),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),ma&&ma(e)}function Fr(){const e=Rs.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function _m(){qr||(qr=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&da&&da(e.state)){Fr();return}(t=e.state)!=null&&t.view?D(e.state.view,!1):Or(),Fr()}))}let Nn=[];function Ps(){return Nn}function xm(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Im(e){const t=e==null?void 0:e.avatar_url,n=u((e==null?void 0:e.name)||"Agent");return t?xm(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${u(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${p(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function Tm(e){var t;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{Nn=await v.getTeamAgents(e),ps(jt,Ps),gs()}catch(n){console.error("Failed to load team agents:",n)}}async function ga(e){var t;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{Nn=await v.getTeamAgents(e),ps(jt,Ps),gs(),Sm()}catch(n){E("load agents",n)}}function Sm(){const e=document.getElementById("agents-list");if(e){if(Nn.length===0){e.innerHTML='<p class="empty-state">No agents yet. Create an agent to enable CLI automation with its own identity.</p>';return}e.innerHTML=Nn.map(t=>{const n=p(t.name),s=p(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${Im(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${ki(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${u(t.id)}" data-agent-name="${u(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function Lm(){const e=Y();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${p(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),N()}async function Cm(e){var o,r,d;e.preventDefault();const t=(o=T())==null?void 0:o.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(d=document.getElementById("agent-project"))==null?void 0:d.value;try{let l;i&&a?l=await v.createProjectAgent(a,n,s):l=await v.createTeamAgent(t,n,s),R();const c=p(l.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
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
    `,N()}catch(l){E("create agent",l)}return!1}function Am(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{$("Agent API key copied to clipboard","success")}).catch(()=>{$("Failed to copy","error")})}async function Bm(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await v.deleteAgent(e),$("Agent deleted","success"),ga()}catch(n){E("delete agent",n)}}X({"create-agent":e=>{Cm(e)},"copy-agent-key":()=>{Am()},"dismiss-agent-modal":()=>{R(),ga()},"delete-agent":(e,t)=>{Bm(t.agentId,t.agentName)}});let qn=0,On=null;const Bt=new Map;function dt(e,t){return Bt.has(e)||Bt.set(e,new Set),Bt.get(e).add(t),()=>{var n;return(n=Bt.get(e))==null?void 0:n.delete(t)}}function jm(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}function Ur(e){On&&(clearTimeout(On),On=null);const t=fd();t&&(t.close(),Co(null));const n=v.getToken();if(!n)return;const i=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(n)}&team_id=${encodeURIComponent(e)}`;try{const a=new WebSocket(i);Co(a),a.onopen=()=>{console.log("WebSocket connected"),qn>0&&$("Live updates reconnected","success"),qn=0},a.onmessage=o=>{let r;try{r=JSON.parse(o.data)}catch(d){console.error("WebSocket: malformed message",d);return}Mm(r)},a.onclose=()=>{console.log("WebSocket disconnected"),qn++,qn===1&&$("Live updates disconnected. Reconnecting...","warning");const o=jm(qn-1);On=setTimeout(()=>{On=null,T()&&T().id===e&&Ur(e)},o)},a.onerror=o=>{console.error("WebSocket error:",o)}}catch(a){console.error("Failed to connect WebSocket:",a)}}function Mm(e){const{type:t,entity:n,data:s}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const i={type:t,entity:n},a=Bt.get(`${n}:${t}`);if(a)for(const d of a)try{d(s,i)}catch(l){console.error(`WebSocket handler error (${n}:${t}):`,l)}const o=Bt.get(n);if(o)for(const d of o)try{d(s,i)}catch(l){console.error(`WebSocket handler error (${n}):`,l)}const r=Bt.get("*");if(r)for(const d of r)try{d(s,i)}catch(l){console.error("WebSocket handler error (*):",l)}}let Ns=[],qs=[],fa=[],ha=[];function Dm(){return Ns}function jt(){return qs}async function va(){try{Ns=await v.getMyTeams(),Rm()}catch(e){E("load teams",e)}}function Rm(){const e=document.getElementById("team-list");Ns.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Ns.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${u(JSON.stringify(t))}">${p(t.name)}</button>
        `).join("")}async function ba(e,t=!1){Ei(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const s=document.getElementById("team-description-text");s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),Ur(e.id),await Promise.all([Fe(),Ym(),Nm(),Tm()]),t?Or():D(A())}function zr(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Pm(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Nm(){if(T())try{qs=await v.getTeamMembers(T().id),ps(jt,Ps),gs()}catch(e){console.error("Failed to load team members:",e)}}async function Gr(){if(T())try{qs=await v.getTeamMembers(T().id),ps(jt,Ps),gs(),qm()}catch(e){E("load team members",e)}}function qm(){const e=document.getElementById("team-members-list");e.innerHTML=qs.map(t=>`
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
                ${t.user_id!==kn().id&&t.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${u(t.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function ya(){if(T())try{fa=await v.getTeamInvitations(T().id),Om()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function Om(){const e=document.getElementById("team-invitations-list");if(fa.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=fa.map(t=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${p(t.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${p(t.role)}</span>
                    <span>Expires: ${new Date(t.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${u(t.id)}">Cancel</button>
        </div>
    `).join("")}async function Hm(){if(T())try{ha=await v.getTeamAgents(T().id),Fm()}catch(e){E("load team agents",e)}}function Fm(){const e=document.getElementById("team-agents-list");if(e){if(ha.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=ha.map(t=>{const n=p(t.name),s=p(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
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
      `}).join("")}}function Wr(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,N()}async function Um(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await v.createInvitation(T().id,t,n),await ya(),R(),$("Invitation sent!","success")}catch(s){E("send invitation",s)}return!1}async function zm(e){if(confirm("Are you sure you want to remove this member?"))try{await v.removeMember(T().id,e),await Gr(),$("Member removed!","success")}catch(t){E("remove member",t)}}async function Gm(e){try{await v.deleteInvitation(T().id,e),await ya(),$("Invitation canceled!","success")}catch(t){E("cancel invitation",t)}}function Vr(){zr(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,N()}function Wm(){T()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${u(T().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${u(T().key)}" disabled class="input-disabled">
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
    `,N())}async function Vm(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await v.createTeam(t);await va(),await ba(n),R(),$("Team created!","success")}catch(n){E("create team",n)}return!1}async function Km(e){if(e.preventDefault(),!T())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await v.updateTeam(T().id,t);Ei(n),document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await va(),R(),$("Team updated!","success")}catch(n){E("update team",n)}return!1}async function Ym(){if(T())try{const e=await v.getLabels(T().id);ds(e)}catch(e){console.error("Failed to load labels:",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),X({"select-team":(e,t)=>{ba(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{zm(t.userId)},"delete-invitation":(e,t)=>{Gm(t.invitationId)},"invite-member":e=>{Um(e)},"create-team":e=>{Vm(e)},"update-team":e=>{Km(e)}});let Qe=null,ut=0,Qt=null,Jt=null,Hn=null,wa=!1;function Zm(){return zc()}function Kr(){Gc()}function Yr(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Xm(){Qe||(Qe=document.createElement("div"),Qe.id="onboarding-overlay",Qe.className="onboarding-overlay",document.getElementById("app").appendChild(Qe))}function Fn(){if(!Qe)return;const e=wa?Xr():Zr(),t=e[ut],n=e.map((s,i)=>`<span class="onboarding-dot${i===ut?" active":""}${i<ut?" completed":""}"></span>`).join("");Qe.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Zr(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Yr(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Yr(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Qt&&(e.textContent=`${Qt.name} (${Qt.key})`),t&&Jt&&(t.textContent=`${Jt.name} (${Jt.key})`),n&&Hn&&(n.textContent=`${Hn.identifier} - ${Hn.title}`)}}]}function Xr(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function ka(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function $a(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function en(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function Qm(){const e=wa?Xr():Zr();ut<e.length-1&&(ut++,Fn())}function Jm(){Kr(),Jr(),Un()}function eg(){Kr(),Jr(),Un()}async function tg(e){e.preventDefault(),$a("onboarding-team-error"),en("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Qt=await v.createTeam({name:t,key:n}),ut++,Fn()}catch(s){ka("onboarding-team-error",s.message||"Failed to create team"),en("onboarding-team-submit",!1)}}async function ng(e){e.preventDefault(),$a("onboarding-project-error"),en("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Jt=await v.createProject(Qt.id,{name:t,key:n}),ut++,Fn()}catch(s){ka("onboarding-project-error",s.message||"Failed to create project"),en("onboarding-project-submit",!1)}}async function sg(e){e.preventDefault(),$a("onboarding-issue-error"),en("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Hn=await v.createIssue(Jt.id,{title:t}),ut++,Fn()}catch(n){ka("onboarding-issue-error",n.message||"Failed to create issue"),en("onboarding-issue-submit",!1)}}function Qr(e=!1){wa=e,ut=0,Qt=null,Jt=null,Hn=null,Xm(),Fn()}function Jr(){Qe&&(Qe.remove(),Qe=null)}function el(){Wc(),Qr(!0)}X({"onboarding-next":e=>{e.preventDefault(),Qm()},"onboarding-skip":e=>{e.preventDefault(),Jm()},"onboarding-finish":e=>{e.preventDefault(),eg()},"onboarding-create-team":e=>{tg(e)},"onboarding-create-project":e=>{ng(e)},"onboarding-create-issue":e=>{sg(e)}});async function Un(){ig(),dg(),await va();const e=Dm();if(e.length===0&&!Zm()){Qr();return}e.length>0&&await ba(e[0],!0)}let tn=null,zn=null,Ue=null,ze=null;function Gn(){tn||(tn=document.getElementById("auth-screen"),zn=document.getElementById("main-screen"),Ue=document.getElementById("login-form"),ze=document.getElementById("signup-form"))}function Ea(){Gn(),tn&&tn.classList.remove("hidden"),zn&&zn.classList.add("hidden")}function ig(){Gn(),tn&&tn.classList.add("hidden"),zn&&zn.classList.remove("hidden")}function ag(){Gn(),Ue&&Ue.classList.remove("hidden"),ze&&ze.classList.add("hidden")}function og(){Gn(),Ue&&Ue.classList.add("hidden"),ze&&ze.classList.remove("hidden")}async function rg(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await v.login(t,n),cs(await v.getMe()),await Un(),$("Welcome back!","success")}catch(s){E("log in",s)}return!1}async function lg(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await v.signup(t,n,s),await v.login(n,s),cs(await v.getMe()),await Un(),$("Account created successfully!","success")}catch(i){E("sign up",i)}return!1}function tl(){v.logout(),cs(null),Ei(null),Ea(),$("Signed out","success")}function cg(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function dg(){const e=kn();if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?cg(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${u(s)}" alt="${u(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function ug(){Gn();const e=Ue==null?void 0:Ue.querySelector("form");e&&e.addEventListener("submit",i=>rg(i));const t=ze==null?void 0:ze.querySelector("form");t&&t.addEventListener("submit",i=>lg(i));const n=Ue==null?void 0:Ue.querySelector(".auth-switch a");n&&n.addEventListener("click",i=>{i.preventDefault(),og()});const s=ze==null?void 0:ze.querySelector(".auth-switch a");s&&s.addEventListener("click",i=>{i.preventDefault(),ag()})}let _a=[];async function xa(){try{_a=await v.getApiKeys(),pg()}catch(e){E("load API keys",e)}}function pg(){const e=document.getElementById("api-keys-list");if(e){if(_a.length===0){e.innerHTML='<p class="empty-state">No API keys yet. Create one to get started.</p>';return}e.innerHTML=_a.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${p(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${p(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${ki(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${ki(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${u(t.id)}" data-key-name="${u(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function mg(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,N()}async function gg(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await v.createApiKey(t);R(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,N()}catch(n){E("create API key",n)}return!1}async function fg(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),$("API key copied to clipboard","success")}catch{$("Failed to copy","error")}}async function hg(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await v.revokeApiKey(e),$("API key revoked","success"),await xa()}catch(n){E("revoke API key",n)}}X({"create-api-key":e=>{gg(e)},"copy-api-key":()=>{fg()},"dismiss-api-key-modal":()=>{R(),xa()},"revoke-api-key":(e,t)=>{hg(t.keyId,t.keyName)}});let Os=!1,pt=0,Et=[],Hs=[];function vg(e){Hs=e,Et=[...e]}function Ia(){return Os}function bg(){if(Os)return;Os=!0,pt=0,Et=[...Hs];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Fs()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>yg(n.target.value)),t.addEventListener("keydown",kg),e.addEventListener("mouseover",n=>{const s=n.target.closest('[data-action="execute-command"]');s&&wg(Number(s.dataset.commandIndex))}),Wn(),requestAnimationFrame(()=>t.focus())}function Fs(){Os=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function yg(e){const t=e.toLowerCase().trim();t?Et=Hs.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):Et=[...Hs],pt=0,Wn()}function Wn(){const e=document.getElementById("command-results");if(!e)return;if(Et.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};Et.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${s===pt?"selected":""}"
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
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function wg(e){pt=e,Wn()}function nl(e){const t=Et[e];t&&(Fs(),t.action())}function kg(e){switch(e.key){case"ArrowDown":e.preventDefault(),pt=Math.min(pt+1,Et.length-1),Wn();break;case"ArrowUp":e.preventDefault(),pt=Math.max(pt-1,0),Wn();break;case"Enter":e.preventDefault(),nl(pt);break;case"Escape":e.preventDefault(),Fs();break}}X({"execute-command":(e,t)=>{nl(Number(t.commandIndex))}});const $g=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g t",description:"Team"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function Eg(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${p(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${p(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function _g(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${p(e.title)}</h4>
        ${e.shortcuts.map(Eg).join("")}
    </div>`}function sl(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${$g.map(_g).join("")}
        </div>
    `,N()}bt(e=>{e==="currentProject"&&A()==="epics"&&Ta()});async function Ta(){var t;const e=document.getElementById("epics-list");if(e){e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((t=T())!=null&&t.id)){e.innerHTML='<div class="empty-state">Select a team to view epics.</div>';return}const n=U();let s;if(n?s=await v.getIssues({project_id:n,issue_type:"epic"}):s=await v.getTeamIssues(T().id,{issue_type:"epic"}),!s||s.length===0){e.innerHTML=ot({icon:Ye.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}const i=await Promise.all(s.map(async a=>{let o=[];try{o=await v.getSubIssues(a.id)}catch{}return{...a,subIssues:o}}));xg(i,e)}catch(n){e.innerHTML=`<div class="empty-state">Failed to load epics: ${p(n.message||String(n))}</div>`}}}function xg(e,t){const n=e.map(s=>{const i=s.subIssues?s.subIssues.length:0,a=s.subIssues?s.subIssues.filter(f=>f.status==="done"||f.status==="canceled").length:0,o=i>0?Math.round(a/i*100):0,r=i>0?`${a}/${i}`:"-",d=`status-${(s.status||"backlog").replace(/_/g,"-")}`,l=(s.status||"backlog").replace(/_/g," ").replace(/\b\w/g,f=>f.toUpperCase()),c=s.estimate!=null?`${s.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${u(s.identifier)}" style="cursor: pointer;">
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
    `,t._epicClickHandler||(t._epicClickHandler=s=>{const i=s.target.closest(".epic-row");i&&i.dataset.identifier&&Em(i.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function Ig(){const e=U(),t=Y().map(n=>`
        <option value="${u(n.id)}" ${n.id===e?"selected":""}>${p(n.name)}</option>
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
    `,N(),document.getElementById("create-epic-form").addEventListener("submit",Tg),document.getElementById("create-epic-title").focus()}async function Tg(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),s=document.getElementById("create-epic-description").value.trim();if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}try{const i=await v.createIssue(t,{title:n,description:s||null,issue_type:"epic"});R(),$(`Created epic ${i.identifier}`,"success"),Ta()}catch(i){E("create epic",i)}}async function il(e){try{let t;if(e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t){if(t.issue_type!=="epic"){z(t.id,!1);return}await al(t.id,!1)}else D("epics",!1)}catch{D("epics",!1)}}async function al(e,t=!0){try{const[n,s,i,a]=await Promise.all([v.getIssue(e),v.getSubIssues(e),v.getActivities(e),v.getComments(e)]);if(n.issue_type!=="epic"){z(e,t);return}t&&history.pushState({epicId:e,view:A()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(y=>y.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=A()||"epics",d=Y().find(y=>y.id===n.project_id),l=n.assignee_id?En(n.assignee_id):null,c=l?Lt(l):null,f=s.length,m=s.filter(y=>y.status==="done"||y.status==="canceled").length,h=f>0?Math.round(m/f*100):0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${u(r)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${d?p(d.name):"Project"} › ${p(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${p(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${ks(n.description)}
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
                                <span>${m} of ${f} done</span>
                                <span>${h}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:s.map(y=>{const _=y.assignee_id?En(y.assignee_id):null,L=_?Lt(_):null;return`
                                <div class="sub-issue-item" data-issue-id="${u(y.id)}" data-identifier="${u(y.identifier)}">
                                    <span class="sub-issue-status">${ye(y.status)}</span>
                                    <span class="sub-issue-id">${p(y.identifier)}</span>
                                    <span class="sub-issue-title">${p(y.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(y.status||"backlog").replace(/_/g,"-")}">${ve(y.status)}</span>
                                    ${L?`<span class="sub-issue-assignee">${p(L)}</span>`:""}
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
                                    <div class="activity-icon">${Fi(y.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${zi(y)}</span>
                                        <span class="activity-actor">by ${p(Ui(y))}</span>
                                        <span class="activity-time">${Ve(y.created_at)}</span>
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
                                            <span class="comment-author">${p(y.author_name||"User")}</span>
                                            <span class="comment-date">${Ve(y.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${p(y.content||"")}</div>
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
                                ${ye(n.status)}
                                ${ve(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${Xe(n.priority)}
                                ${xe(n.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${c?p(c):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${Ds(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(y=>`
                                    <span class="issue-label" style="background: ${G(y.color)}20; color: ${G(y.color)}">${p(y.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${d?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${p(d.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const w=o.querySelector(".sub-issues-list");w&&w.addEventListener("click",y=>{const _=y.target.closest(".sub-issue-item");_&&_.dataset.issueId&&z(_.dataset.issueId)})}catch(n){E("load epic",n)}}function Sg(e){let t=!1,n=null;return function(i){if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){switch(t=!1,clearTimeout(n),i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break}return}switch(i.key){case"c":i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}function Lg(e){return function(n){var s;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const i=e.getModalForm();if(i)n.preventDefault(),i.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const i=(s=document.activeElement)==null?void 0:s.closest("form");i&&(n.preventDefault(),i.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.openCommandPalette())}}}function Us(e,t,n="#issues-list .issue-row"){const s=document.querySelectorAll(n);s.length!==0&&(e=Math.max(0,Math.min(s.length-1,e)),s.forEach(i=>i.classList.remove("keyboard-selected")),t(e),s[e].classList.add("keyboard-selected"),s[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Cg(e){const t="#issues-list .issue-row";function n(i){return i<0?null:document.querySelectorAll(t)[i]||null}function s(i,a,o,r){const d=n(a);if(!d)return;const l=d.dataset.issueId;if(!l||l.startsWith("temp-"))return;i.preventDefault(),i.stopImmediatePropagation();const c=d.querySelector(`.${r}`);c&&e.showInlineDropdown&&e.showInlineDropdown(i,o,l,c)}return function(a){if(e.getCurrentView()!=="issues"||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":a.preventDefault(),Us(r+1,e.setSelectedIndex,t);break;case"k":a.preventDefault(),Us(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const d=o[r].dataset.issueId;d&&!d.startsWith("temp-")&&e.viewIssue(d)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const d=o[r].dataset.issueId;d&&!d.startsWith("temp-")&&e.showEditIssueModal(d)}break;case"s":s(a,r,"status","status-btn");break;case"p":s(a,r,"priority","priority-btn");break;case"a":s(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(d=>d.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Ag(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(s){if(e.getCurrentView()!=="documents"||s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const i=document.querySelectorAll(t);if(i.length===0)return;const a=e.getSelectedIndex();switch(s.key){case"j":s.preventDefault(),Us(a+1,e.setSelectedIndex,t);break;case"k":s.preventDefault(),Us(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&i[a]){s.preventDefault();const o=i[a].dataset.documentId;o&&e.viewDocument(o)}break;case"e":if(a>=0&&i[a]){s.preventDefault();const o=i[a].dataset.documentId;o&&e.showEditDocumentModal&&e.showEditDocumentModal(o)}break;case"Escape":a>=0&&(s.preventDefault(),i.forEach(o=>o.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const ol=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let _t=[],Sa=null;bt(e=>{e==="currentProject"&&A()==="board"&&rl()});async function rl(){const e=U();if(!e){const n=document.getElementById("kanban-board");n&&(n.innerHTML=ot({icon:Ye.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const t=document.getElementById("kanban-board");t&&(t.innerHTML='<div class="loading-spinner" style="margin: 2rem auto;"></div>');try{_t=await v.getIssues({project_id:e}),xt()}catch(n){E("load board",n)}}function xt(){const e=document.getElementById("kanban-board");e&&(e.innerHTML=ol.map(t=>{const n=_t.filter(s=>s.status===t.key);return`
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
                        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${u(s.id)}" data-identifier="${u(s.identifier)}">
                            <div class="kanban-card-title">${p(s.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${s.identifier}</span>
                                <span class="badge badge-priority-${s.priority}" style="font-size: 10px;">${xe(s.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""))}function Bg(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Sa=t.dataset.id,t.classList.add("dragging")}function jg(e,t){t.classList.remove("dragging"),Sa=null}function Mg(e,t){e.preventDefault(),t.classList.add("drag-over")}function Dg(e,t){t.classList.remove("drag-over")}function Rg(e,t){e.preventDefault(),t.classList.add("drag-over")}function Pg(e,t){t.classList.remove("drag-over")}async function Ng(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),s=t.dataset.status,i=_t.find(o=>o.id===n);if(!i)return;const a=i.status;if(i.status=s,ll(s,n),xt(),a!==s)try{await v.updateIssue(n,{status:s}),$("Status updated","success")}catch(o){i.status=a,xt(),E("update status",o)}}async function qg(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Sa||e.dataTransfer.getData("text/plain"),s=t.dataset.id;if(!n||!s||n===s)return;const i=t.closest(".kanban-column"),a=i==null?void 0:i.dataset.status;if(!a)return;const o=_t.find(d=>d.id===n);if(!o)return;const r=o.status;if(o.status=a,ll(a,n,s),xt(),r!==a)try{await v.updateIssue(n,{status:a}),$("Status updated","success")}catch(d){o.status=r,xt(),E("update status",d)}}function ll(e,t,n=null){const s=_t.filter(o=>o.status===e&&o.id!==t),i=_t.find(o=>o.id===t);if(!i)return;if(n){const o=s.findIndex(r=>r.id===n);o>=0?s.splice(o,0,i):s.push(i)}else s.push(i);const a=[];ol.forEach(o=>{o.key===e?a.push(...s):a.push(..._t.filter(r=>r.status===o.key))}),_t=a}X({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),z(t.id)):e.type==="dragstart"?Bg(e,n):e.type==="dragend"?jg(e,n):e.type==="dragover"?Rg(e,n):e.type==="dragleave"?Pg(e,n):e.type==="drop"&&qg(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?Mg(e,n):e.type==="dragleave"?Dg(e,n):e.type==="drop"&&Ng(e,n)}});const It=new Map,cl=6e4,La=100;let ce=null,zs=null,Gs=null,Vn=null,dl=!1;const Og={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},Hg={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},ul={api:null};let Ca={...ul};function Fg(e={}){Ca={...ul,...e},ce||(ce=document.createElement("div"),ce.className="issue-tooltip",ce.style.display="none",document.body.appendChild(ce),ce.addEventListener("mouseenter",()=>{clearTimeout(zs)}),ce.addEventListener("mouseleave",()=>{Aa()})),dl||(document.addEventListener("mouseover",Ug),document.addEventListener("mouseout",zg),dl=!0)}function Ug(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=Gg(t);if(n){if(n===Vn&&ce.style.display!=="none"){clearTimeout(zs);return}clearTimeout(Gs),Gs=setTimeout(()=>{Wg(t,n)},200)}}function zg(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Gs),zs=setTimeout(()=>{Aa()},150))}function Gg(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function Wg(e,t){Vn=t;const n=e.getBoundingClientRect();ce.style.left=`${n.left+window.scrollX}px`,ce.style.top=`${n.bottom+window.scrollY+8}px`,ce.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',ce.style.display="block";try{const s=await Kg(t);if(Vn!==t)return;Yg(s)}catch{if(Vn!==t)return;ce.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Aa(){clearTimeout(Gs),clearTimeout(zs),ce&&(ce.style.display="none"),Vn=null}function Vg(){const e=Date.now();for(const[t,n]of It.entries())e-n.timestamp>=cl&&It.delete(t)}async function Kg(e){It.size>La/2&&Vg();const t=It.get(e);if(t&&Date.now()-t.timestamp<cl)return t.issue;if(!Ca.api)throw new Error("API not initialized");const n=await Ca.api.getIssueByIdentifier(e);if(It.size>=La){const s=Array.from(It.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,La/2);for(const[a]of i)It.delete(a)}return It.set(e,{issue:n,timestamp:Date.now()}),n}function Yg(e){const t=Og[e.status]||"#6b7280",n=Hg[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";ce.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${p(e.identifier)}</span>
            <span class="issue-tooltip-type">${p(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${p(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${Zg(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${Xg(e.priority)}</span>
        </div>
    `}function Zg(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Xg(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Qg(){dt("issue:created",Jg),dt("issue:updated",ef),dt("issue:deleted",tf),dt("comment",nf),dt("relation",sf),dt("attestation",af),dt("activity",of),dt("project",rf),dt("sprint",lf)}function Jg(e){var i,a,o;const t=be(),n=t.findIndex(r=>r.id===e.id),s=t.findIndex(r=>r._isOptimistic&&r.title===e.title);if(!(n>=0))if(s>=0){const r=[...t];r[s]=e,Ke(r),A()==="issues"&&rt()}else Ke([e,...t]),A()==="issues"&&rt(),$(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((i=kn())==null?void 0:i.id)){const r=yt(),d=r.findIndex(c=>c.id===e.id),l=r.findIndex(c=>c._isOptimistic&&c.title===e.title);if(d===-1&&l===-1)Ut([e,...r]),A()==="my-issues"&&xn();else if(l>=0){const c=[...r];c[l]=e,Ut(c),A()==="my-issues"&&xn()}}A()==="my-issues"&&zt({showLoading:!1}),A()==="board"?xt():A()==="sprints"&&Ws(),A()==="issue-detail"&&e.parent_id===((a=le())==null?void 0:a.id)&&z((o=le())==null?void 0:o.id,!1)}function ef(e){const t=be();t.some(s=>s.id===e.id)&&Ke(t.map(s=>s.id===e.id?e:s));const n=yt();if(n.some(s=>s.id===e.id)&&Ut(n.map(s=>s.id===e.id?e:s)),A()==="issues")rt();else if(A()==="my-issues")xn(),zt({showLoading:!1});else if(A()==="board")xt();else if(A()==="sprints")Ws();else if(A()==="issue-detail"){const s=document.getElementById("issue-detail-content");s&&s.dataset.issueId===e.id&&z(e.id)}}function tf(e){var t;Ke(be().filter(n=>n.id!==e.id)),Ut(yt().filter(n=>n.id!==e.id)),A()==="issues"?rt():A()==="my-issues"?(xn(),zt({showLoading:!1})):A()==="board"?xt():A()==="sprints"&&Ws(),$(`Issue ${e.identifier} deleted`,"info"),A()==="issue-detail"&&((t=le())==null?void 0:t.id)===e.id&&($(`Issue ${e.identifier} was deleted`,"warning"),D("my-issues"))}function nf(e){var t;A()==="my-issues"&&zt({showLoading:!1}),A()==="issue-detail"&&((t=le())==null?void 0:t.id)===e.issue_id&&z(e.issue_id,!1)}function sf(e){var t;if(A()==="issue-detail"){const n=(t=le())==null?void 0:t.id;n&&(e.source_issue_id===n||e.target_issue_id===n)&&z(n,!1)}}function af(e){var t;A()==="gate-approvals"&&Mn(),A()==="issue-detail"&&((t=le())==null?void 0:t.id)===e.issue_id&&z(e.issue_id,!1)}function of(e){var t;A()==="my-issues"&&zt({showLoading:!1}),A()==="issue-detail"&&((t=le())==null?void 0:t.id)===e.issue_id&&z(e.issue_id,!1)}function rf(e,{type:t}){Fe().then(()=>{A()==="projects"&&Rn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?$(`New project: ${e.name}`,"info"):t==="deleted"&&$(`Project ${e.name} deleted`,"info")}function Ws(){const e=mp();e?jn(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):Bn().catch(t=>console.error("Failed to reload sprints:",t))}function lf(){A()==="sprints"?Ws():A()==="my-issues"&&Xo()}const pl='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function ml(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const s=document.querySelector(".main-content");s&&(e?s.setAttribute("inert",""):s.removeAttribute("inert"))}function cf(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),ml(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(pl);n&&n.focus()}}}function Vs(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),ml(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.querySelector(".sidebar");if(!t)return;const n=t.querySelectorAll(pl);if(n.length===0)return;const s=n[0],i=n[n.length-1];if(!t.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Vs()});async function df(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=U();if(!s){$("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=Y().find(l=>l.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Ke([r,...be()]),rt();const d=document.querySelector(`[data-id="${a}"]`);d&&d.classList.add("new");try{const l=await v.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const c=be(),f=c.findIndex(m=>m.id===a);f!==-1&&(c[f]=l,Ke(c)),rt(),Fe(),$("Issue created!","success")}catch(l){Ke(be().filter(c=>c.id!==a)),rt(),E("create issue",l)}finally{t.disabled=!1,t.placeholder=i,t.focus()}}km({beforeNavigate:()=>{rm(),Br(null),us(null),Ao(null),Vs(),Aa()},detailRoute:e=>e[0]==="epic"&&e[1]?(il(e[1]),!0):e[0]==="issue"&&e[1]?(Gi(e[1]),!0):e[0]==="document"&&e[1]?(wf(e[1]),!0):e[0]==="sprint"&&e[1]?(vp(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Dr(e[1]),!0):!1,detailPopstate:e=>e.epicId?(al(e.epicId,!1),!0):e.issueId?(z(e.issueId,!1),!0):e.identifier?(Gi(e.identifier),!0):e.documentId?(He(e.documentId,!1),!0):e.sprintId?(jn(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=oa();e&&Y().some(t=>t.id===e)&&Ne(e)},issueNavigate:e=>Gi(e),epicNavigate:e=>il(e)}),wm({"my-issues":()=>{Xo(),bs(),zt()},"gate-approvals":()=>{Mn()},issues:()=>{Md(),Rd(),$d().then(()=>{const t=new URLSearchParams(window.location.search).getAll("label");if(t.length>0){const n=document.getElementById("label-filter-dropdown");n&&(n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),Li())}}),Uo().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}Ct()})},epics:()=>{Ta()},board:()=>{rl()},projects:()=>{Fe().then(Rn)},sprints:()=>{Bn()},rituals:()=>{jp()},documents:()=>{Ln()},team:()=>{Gr(),Hm(),ya()},settings:()=>{xa(),ga()}});function uf(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||R()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>R())}function pf(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(i=>{i.addEventListener("click",()=>Rr(i.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>dm());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>um()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([i,a])=>{const o=e.querySelector(`#${i} .btn-primary`);o&&o.addEventListener("click",()=>Pr(a))})}function mf(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>fr("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>fr("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>hr());const s=document.getElementById("doc-search");s&&s.addEventListener("input",()=>Nu());const i=document.getElementById("doc-sort");i&&i.addEventListener("change",()=>$t())}function gf(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>Zo())}function ff(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>Dd());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>Ed());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>_d()),document.querySelectorAll(".multi-select-btn").forEach(m=>{const h=m.parentElement;h!=null&&h.querySelector("#status-filter-dropdown")?m.addEventListener("click",()=>Ci("status-filter-dropdown")):h!=null&&h.querySelector("#priority-filter-dropdown")?m.addEventListener("click",()=>Ci("priority-filter-dropdown")):h!=null&&h.querySelector("#label-filter-dropdown")&&m.addEventListener("click",()=>Ci("label-filter-dropdown"))});const s=document.getElementById("status-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(h=>{h.addEventListener("change",()=>hs())});const m=s.querySelector(".btn-small");m&&m.addEventListener("click",()=>Bi())}const i=document.getElementById("priority-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(h=>{h.addEventListener("change",()=>ji())});const m=i.querySelector(".btn-small");m&&m.addEventListener("click",()=>Mi())}const a=document.getElementById("label-filter-dropdown");if(a){const m=a.querySelector(".btn-small");m&&m.addEventListener("click",()=>vs())}const o=document.getElementById("issue-type-filter");o&&o.addEventListener("change",()=>qe());const r=document.getElementById("assignee-filter");r&&r.addEventListener("change",()=>qe());const d=document.getElementById("sprint-filter");d&&d.addEventListener("change",()=>qe());const l=document.getElementById("sort-by-select");l&&l.addEventListener("change",()=>Ct());const c=document.getElementById("group-by-select");c&&c.addEventListener("change",()=>Go());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",m=>df(m))}function hf(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>Dp(t.dataset.tab))})}function vf(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>zr());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>In()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),D(o.dataset.view)})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Pm());const s=document.querySelector(".sidebar-backdrop");s&&s.addEventListener("click",()=>Vs());const i=document.getElementById("hamburger-btn");i&&i.addEventListener("click",()=>cf());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>In())}X({"navigate-to":(e,t)=>{D(t.view)},"set-current-project":(e,t,n)=>{Ne(n.value)},showCreateIssueModal:()=>In(),showCreateEpicModal:()=>Ig(),showCreateProjectModal:()=>Mr(),showCreateDocumentModal:()=>br(),showCreateTeamModal:()=>Vr(),showEditTeamModal:()=>Wm(),showInviteModal:()=>Wr(),showCreateApiKeyModal:()=>mg(),showCreateAgentModal:()=>Lm(),resetOnboarding:()=>el(),logout:()=>tl(),navigateToProjects:()=>D("projects")}),document.addEventListener("DOMContentLoaded",async()=>{if(bd(),ug(),vf(),uf(),gf(),ff(),hf(),pf(),mf(),bf(),yf(),Fg({api:v}),_m(),Qg(),v.getToken())try{const e=await v.getMe();cs(e),await Un()}catch{v.logout(),Ea()}else Ea()});function bf(){const e=document.getElementById("theme-toggle");if(!e)return;const t=Hc()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),Fc(n?"light":"dark")})}function yf(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");Hr(s)}}})}async function wf(e){try{await He(e,!1)}catch{D("documents",!1)}}document.addEventListener("keydown",Cg({getCurrentView:A,getSelectedIndex:cd,setSelectedIndex:So,viewIssue:z,showEditIssueModal:cr,showInlineDropdown:Pi,isModalOpen:ls,isCommandPaletteOpen:Ia})),document.addEventListener("keydown",Ag({getCurrentView:A,getSelectedIndex:dd,setSelectedIndex:Lo,viewDocument:He,showEditDocumentModal:yr,isModalOpen:ls,isCommandPaletteOpen:Ia})),document.addEventListener("keydown",Sg({closeModal:R,closeSidebar:Vs,navigateTo:D,showCreateIssueModal:In,showKeyboardShortcutsHelp:sl,isModalOpen:ls,focusSearch:()=>{D("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden")}})),vg([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>D("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>D("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>D("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>D("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>D("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>D("documents"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>D("team"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{D("issues"),setTimeout(In,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{D("projects"),setTimeout(Mr,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{D("documents"),setTimeout(br,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Vr(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{D("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{D("team"),setTimeout(Wr,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>sl(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>el(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>tl(),category:"Account"}]),document.addEventListener("keydown",Lg({isModalOpen:ls,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:Ia,openCommandPalette:bg,closeCommandPalette:Fs})),window.marked=P,window.DOMPurify=$o,console.log("Chaotic frontend loaded via Vite")})();
