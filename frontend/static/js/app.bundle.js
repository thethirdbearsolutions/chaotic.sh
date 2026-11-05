var W0=Object.defineProperty;var K0=(Nt,qe,_n)=>qe in Nt?W0(Nt,qe,{enumerable:!0,configurable:!0,writable:!0,value:_n}):Nt[qe]=_n;var se=(Nt,qe,_n)=>K0(Nt,typeof qe!="symbol"?qe+"":qe,_n);(function(){"use strict";var $d;function Nt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var qe=Nt();function _n(e){qe=e}var Ui={exec:()=>null};function Z(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(Ne.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var Ne={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},hh=/^(?:[ \t]*(?:\n|$))+/,vh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,bh=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Gi=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,yh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,lr=/(?:[*+-]|\d{1,9}[.)])/,Pd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,qd=Z(Pd).replace(/bull/g,lr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),wh=Z(Pd).replace(/bull/g,lr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),cr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,kh=/^[^\n]+/,dr=/(?!\s*\])(?:\\.|[^\[\]\\])+/,$h=Z(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",dr).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Eh=Z(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,lr).getRegex(),ua="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ur=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,_h=Z("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ur).replace("tag",ua).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Nd=Z(cr).replace("hr",Gi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ua).getRegex(),xh=Z(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Nd).getRegex(),pr={blockquote:xh,code:vh,def:$h,fences:bh,heading:yh,hr:Gi,html:_h,lheading:qd,list:Eh,newline:hh,paragraph:Nd,table:Ui,text:kh},Od=Z("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Gi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ua).getRegex(),Ih={...pr,lheading:wh,table:Od,paragraph:Z(cr).replace("hr",Gi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Od).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ua).getRegex()},Sh={...pr,html:Z(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ur).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ui,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Z(cr).replace("hr",Gi).replace("heading",` *#{1,6} *[^
]`).replace("lheading",qd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Th=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Lh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Hd=/^( {2,}|\\)\n(?!\s*$)/,Ah=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,pa=/[\p{P}\p{S}]/u,mr=/[\s\p{P}\p{S}]/u,Fd=/[^\s\p{P}\p{S}]/u,Ch=Z(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,mr).getRegex(),Ud=/(?!~)[\p{P}\p{S}]/u,Bh=/(?!~)[\s\p{P}\p{S}]/u,Dh=/(?:[^\s\p{P}\p{S}]|~)/u,Mh=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Gd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,jh=Z(Gd,"u").replace(/punct/g,pa).getRegex(),Rh=Z(Gd,"u").replace(/punct/g,Ud).getRegex(),zd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ph=Z(zd,"gu").replace(/notPunctSpace/g,Fd).replace(/punctSpace/g,mr).replace(/punct/g,pa).getRegex(),qh=Z(zd,"gu").replace(/notPunctSpace/g,Dh).replace(/punctSpace/g,Bh).replace(/punct/g,Ud).getRegex(),Nh=Z("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Fd).replace(/punctSpace/g,mr).replace(/punct/g,pa).getRegex(),Oh=Z(/\\(punct)/,"gu").replace(/punct/g,pa).getRegex(),Hh=Z(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Fh=Z(ur).replace("(?:-->|$)","-->").getRegex(),Uh=Z("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Fh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ma=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Gh=Z(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ma).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Vd=Z(/^!?\[(label)\]\[(ref)\]/).replace("label",ma).replace("ref",dr).getRegex(),Wd=Z(/^!?\[(ref)\](?:\[\])?/).replace("ref",dr).getRegex(),zh=Z("reflink|nolink(?!\\()","g").replace("reflink",Vd).replace("nolink",Wd).getRegex(),fr={_backpedal:Ui,anyPunctuation:Oh,autolink:Hh,blockSkip:Mh,br:Hd,code:Lh,del:Ui,emStrongLDelim:jh,emStrongRDelimAst:Ph,emStrongRDelimUnd:Nh,escape:Th,link:Gh,nolink:Wd,punctuation:Ch,reflink:Vd,reflinkSearch:zh,tag:Uh,text:Ah,url:Ui},Vh={...fr,link:Z(/^!?\[(label)\]\((.*?)\)/).replace("label",ma).getRegex(),reflink:Z(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ma).getRegex()},gr={...fr,emStrongRDelimAst:qh,emStrongLDelim:Rh,url:Z(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Wh={...gr,br:Z(Hd).replace("{2,}","*").getRegex(),text:Z(gr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},fa={normal:pr,gfm:Ih,pedantic:Sh},zi={normal:fr,gfm:gr,breaks:Wh,pedantic:Vh},Kh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Kd=e=>Kh[e];function Et(e,t){if(t){if(Ne.escapeTest.test(e))return e.replace(Ne.escapeReplace,Kd)}else if(Ne.escapeTestNoEncode.test(e))return e.replace(Ne.escapeReplaceNoEncode,Kd);return e}function Yd(e){try{e=encodeURI(e).replace(Ne.percentDecode,"%")}catch{return null}return e}function Qd(e,t){var a;const n=e.replace(Ne.findPipe,(o,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(Ne.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(Ne.slashPipe,"|");return i}function Vi(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function Yh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Zd(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function Qh(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var ga=class{constructor(e){se(this,"options");se(this,"rules");se(this,"lexer");this.options=e||qe}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Vi(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=Qh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=Vi(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Vi(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Vi(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),o=!0;else if(!o)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=u,n.length===0)break;const f=a.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const g=f,v=g.raw+`
`+n.join(`
`),y=this.blockquote(v);a[a.length-1]=y,i=i.substring(0,i.length-g.raw.length)+y.raw,s=s.substring(0,s.length-g.text.length)+y.text;break}else if((f==null?void 0:f.type)==="list"){const g=f,v=g.raw+`
`+n.join(`
`),y=this.list(v);a[a.length-1]=y,i=i.substring(0,i.length-f.raw.length)+y.raw,s=s.substring(0,s.length-g.raw.length)+y.raw,n=v.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let l=!1,c="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),f=e.split(`
`,1)[0],g=!u.trim(),v=0;if(this.options.pedantic?(v=2,d=u.trimStart()):g?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,d=u.slice(v),v+=t[1].length),g&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),l=!0),!l){const S=this.rules.other.nextBulletRegex(v),_=this.rules.other.hrRegex(v),D=this.rules.other.fencesBeginRegex(v),M=this.rules.other.headingBeginRegex(v),ne=this.rules.other.htmlBeginRegex(v);for(;e;){const E=e.split(`
`,1)[0];let P;if(f=E,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),P=f):P=f.replace(this.rules.other.tabCharGlobal,"    "),D.test(f)||M.test(f)||ne.test(f)||S.test(f)||_.test(f))break;if(P.search(this.rules.other.nonSpaceChar)>=v||!f.trim())d+=`
`+P.slice(v);else{if(g||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||D.test(u)||M.test(u)||_.test(u))break;d+=`
`+f}!g&&!f.trim()&&(g=!0),c+=E+`
`,e=e.substring(E.length+1),u=P.slice(v)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let y=null,w;this.options.gfm&&(y=this.rules.other.listIsTask.exec(d),y&&(w=y[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!y,checked:w,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(u=>u.type==="space"),d=c.length>0&&c.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Qd(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(Qd(r,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Vi(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=Yh(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Zd(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Zd(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,l=a,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const u=[...i[0]][0].length,f=e.slice(0,a+i.index+u+r);if(Math.min(a,r)%2){const v=f.slice(1,-1);return{type:"em",raw:f,text:v,tokens:this.lexer.inlineTokens(v)}}const g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ot=class jd{constructor(t){se(this,"tokens");se(this,"options");se(this,"state");se(this,"tokenizer");se(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||qe,this.options.tokenizer=this.options.tokenizer||new ga,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:Ne,block:fa.normal,inline:zi.normal};this.options.pedantic?(n.block=fa.pedantic,n.inline=zi.pedantic):this.options.gfm&&(n.block=fa.gfm,this.options.breaks?n.inline=zi.breaks:n.inline=zi.gfm),this.tokenizer.rules=n}static get rules(){return{block:fa,inline:zi}}static lex(t,n){return new jd(n).lex(t)}static lexInline(t,n){return new jd(n).inlineTokens(t)}lex(t){t=t.replace(Ne.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(Ne.tabCharGlobal,"    ").replace(Ne.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const d=t.slice(1);let u;this.options.extensions.startBlock.forEach(f=>{u=f.call({lexer:this},d),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const f=n.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let u=t;if((c=this.options.extensions)!=null&&c.startInline){let f=1/0;const g=t.slice(1);let v;this.options.extensions.startInline.forEach(y=>{v=y.call({lexer:this},g),typeof v=="number"&&v>=0&&(f=Math.min(f,v))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(u)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},ha=class{constructor(e){se(this,"options");se(this,"parser");this.options=e||qe}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(Ne.notSpaceStart))==null?void 0:a[0],s=e.replace(Ne.endingNewline,"")+`
`;return i?'<pre><code class="language-'+Et(i)+'">'+(n?s:Et(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Et(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let o=0;o<e.items.length;o++){const r=e.items[o];i+=this.listitem(r)}const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+Et(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const a=e.rows[s];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Et(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=Yd(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+Et(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=Yd(e);if(s===null)return Et(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Et(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Et(e.text)}},hr=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Ht=class Rd{constructor(t){se(this,"options");se(this,"renderer");se(this,"textRenderer");this.options=t||qe,this.options.renderer=this.options.renderer||new ha,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new hr}static parse(t,n){return new Rd(n).parse(t)}static parseInline(t,n){return new Rd(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},va=($d=class{constructor(e){se(this,"options");se(this,"block");this.options=e||qe}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Ot.lex:Ot.lexInline}provideParser(){return this.block?Ht.parse:Ht.parseInline}},se($d,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),$d),Zh=class{constructor(...e){se(this,"defaults",Nt());se(this,"options",this.setOptions);se(this,"parse",this.parseMarkdown(!0));se(this,"parseInline",this.parseMarkdown(!1));se(this,"Parser",Ht);se(this,"Renderer",ha);se(this,"TextRenderer",hr);se(this,"Lexer",Ot);se(this,"Tokenizer",ga);se(this,"Hooks",va);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new ha(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new ga(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new va;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=s[o];va.passThroughHooks.has(a)?s[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(u=>l.call(s,u));const d=r.call(s,c);return l.call(s,d)}:s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ot.lex(e,t??this.defaults)}parser(e,t){return Ht.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Ot.lex:Ot.lexInline,l=a.hooks?a.hooks.provideParser():e?Ht.parse:Ht.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>l(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let d=l(c,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+Et(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},xn=new Zh;function Y(e,t){return xn.parse(e,t)}Y.options=Y.setOptions=function(e){return xn.setOptions(e),Y.defaults=xn.defaults,_n(Y.defaults),Y},Y.getDefaults=Nt,Y.defaults=qe,Y.use=function(...e){return xn.use(...e),Y.defaults=xn.defaults,_n(Y.defaults),Y},Y.walkTokens=function(e,t){return xn.walkTokens(e,t)},Y.parseInline=xn.parseInline,Y.Parser=Ht,Y.parser=Ht.parse,Y.Renderer=ha,Y.TextRenderer=hr,Y.Lexer=Ot,Y.lexer=Ot.lex,Y.Tokenizer=ga,Y.Hooks=va,Y.parse=Y,Y.options,Y.setOptions,Y.use,Y.walkTokens,Y.parseInline,Ht.parse,Ot.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Xd,setPrototypeOf:Jd,isFrozen:Xh,getPrototypeOf:Jh,getOwnPropertyDescriptor:ev}=Object;let{freeze:Oe,seal:at,create:vr}=Object,{apply:br,construct:yr}=typeof Reflect<"u"&&Reflect;Oe||(Oe=function(t){return t}),at||(at=function(t){return t}),br||(br=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),yr||(yr=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const ba=Fe(Array.prototype.forEach),tv=Fe(Array.prototype.lastIndexOf),eu=Fe(Array.prototype.pop),Wi=Fe(Array.prototype.push),nv=Fe(Array.prototype.splice),ya=Fe(String.prototype.toLowerCase),wr=Fe(String.prototype.toString),kr=Fe(String.prototype.match),Ki=Fe(String.prototype.replace),iv=Fe(String.prototype.indexOf),sv=Fe(String.prototype.trim),ht=Fe(Object.prototype.hasOwnProperty),He=Fe(RegExp.prototype.test),Yi=av(TypeError);function Fe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return br(e,t,i)}}function av(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return yr(e,n)}}function z(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ya;Jd&&Jd(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(Xh(t)||(t[i]=a),s=a)}e[s]=!0}return e}function ov(e){for(let t=0;t<e.length;t++)ht(e,t)||(e[t]=null);return e}function _t(e){const t=vr(null);for(const[n,i]of Xd(e))ht(e,n)&&(Array.isArray(i)?t[n]=ov(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=_t(i):t[n]=i);return t}function Qi(e,t){for(;e!==null;){const i=ev(e,t);if(i){if(i.get)return Fe(i.get);if(typeof i.value=="function")return Fe(i.value)}e=Jh(e)}function n(){return null}return n}const tu=Oe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),$r=Oe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Er=Oe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),rv=Oe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),_r=Oe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),lv=Oe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),nu=Oe(["#text"]),iu=Oe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),xr=Oe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),su=Oe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),wa=Oe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),cv=at(/\{\{[\w\W]*|[\w\W]*\}\}/gm),dv=at(/<%[\w\W]*|[\w\W]*%>/gm),uv=at(/\$\{[\w\W]*/gm),pv=at(/^data-[\-\w.\u00B7-\uFFFF]+$/),mv=at(/^aria-[\-\w]+$/),au=at(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),fv=at(/^(?:\w+script|data):/i),gv=at(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ou=at(/^html$/i),hv=at(/^[a-z][.\w]*(-[.\w]+)+$/i);var ru=Object.freeze({__proto__:null,ARIA_ATTR:mv,ATTR_WHITESPACE:gv,CUSTOM_ELEMENT:hv,DATA_ATTR:pv,DOCTYPE_NAME:ou,ERB_EXPR:dv,IS_ALLOWED_URI:au,IS_SCRIPT_OR_DATA:fv,MUSTACHE_EXPR:cv,TMPLIT_EXPR:uv});const Zi={element:1,text:3,progressingInstruction:7,comment:8,document:9},vv=function(){return typeof window>"u"?null:window},bv=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},lu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function cu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:vv();const t=j=>cu(j);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Zi.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:f,trustedTypes:g}=e,v=l.prototype,y=Qi(v,"cloneNode"),w=Qi(v,"remove"),S=Qi(v,"nextSibling"),_=Qi(v,"childNodes"),D=Qi(v,"parentNode");if(typeof o=="function"){const j=n.createElement("template");j.content&&j.content.ownerDocument&&(n=j.content.ownerDocument)}let M,ne="";const{implementation:E,createNodeIterator:P,createDocumentFragment:G,getElementsByTagName:W}=n,{importNode:Ee}=i;let x=lu();t.isSupported=typeof Xd=="function"&&typeof D=="function"&&E&&E.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:R,ERB_EXPR:C,TMPLIT_EXPR:Q,DATA_ATTR:_e,ARIA_ATTR:de,IS_SCRIPT_OR_DATA:gt,ATTR_WHITESPACE:L,CUSTOM_ELEMENT:ue}=ru;let{IS_ALLOWED_URI:ge}=ru,pe=null;const J=z({},[...tu,...$r,...Er,..._r,...nu]);let Ce=null;const Yg=z({},[...iu,...xr,...su,...wa]);let he=Object.seal(vr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),la=null,Ed=null;const Ri=Object.seal(vr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Qg=!0,_d=!0,Zg=!1,Xg=!0,Pi=!1,tr=!0,Yn=!1,xd=!1,Id=!1,qi=!1,nr=!1,ir=!1,Jg=!0,eh=!1;const N0="user-content-";let Sd=!0,ca=!1,Ni={},Pt=null;const Td=z({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let th=null;const nh=z({},["audio","video","img","source","image","track"]);let Ld=null;const ih=z({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),sr="http://www.w3.org/1998/Math/MathML",ar="http://www.w3.org/2000/svg",en="http://www.w3.org/1999/xhtml";let Oi=en,Ad=!1,Cd=null;const O0=z({},[sr,ar,en],wr);let or=z({},["mi","mo","mn","ms","mtext"]),rr=z({},["annotation-xml"]);const H0=z({},["title","style","font","a","script"]);let da=null;const F0=["application/xhtml+xml","text/html"],U0="text/html";let xe=null,Hi=null;const G0=n.createElement("form"),sh=function(b){return b instanceof RegExp||b instanceof Function},Bd=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Hi&&Hi===b)){if((!b||typeof b!="object")&&(b={}),b=_t(b),da=F0.indexOf(b.PARSER_MEDIA_TYPE)===-1?U0:b.PARSER_MEDIA_TYPE,xe=da==="application/xhtml+xml"?wr:ya,pe=ht(b,"ALLOWED_TAGS")?z({},b.ALLOWED_TAGS,xe):J,Ce=ht(b,"ALLOWED_ATTR")?z({},b.ALLOWED_ATTR,xe):Yg,Cd=ht(b,"ALLOWED_NAMESPACES")?z({},b.ALLOWED_NAMESPACES,wr):O0,Ld=ht(b,"ADD_URI_SAFE_ATTR")?z(_t(ih),b.ADD_URI_SAFE_ATTR,xe):ih,th=ht(b,"ADD_DATA_URI_TAGS")?z(_t(nh),b.ADD_DATA_URI_TAGS,xe):nh,Pt=ht(b,"FORBID_CONTENTS")?z({},b.FORBID_CONTENTS,xe):Td,la=ht(b,"FORBID_TAGS")?z({},b.FORBID_TAGS,xe):_t({}),Ed=ht(b,"FORBID_ATTR")?z({},b.FORBID_ATTR,xe):_t({}),Ni=ht(b,"USE_PROFILES")?b.USE_PROFILES:!1,Qg=b.ALLOW_ARIA_ATTR!==!1,_d=b.ALLOW_DATA_ATTR!==!1,Zg=b.ALLOW_UNKNOWN_PROTOCOLS||!1,Xg=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Pi=b.SAFE_FOR_TEMPLATES||!1,tr=b.SAFE_FOR_XML!==!1,Yn=b.WHOLE_DOCUMENT||!1,qi=b.RETURN_DOM||!1,nr=b.RETURN_DOM_FRAGMENT||!1,ir=b.RETURN_TRUSTED_TYPE||!1,Id=b.FORCE_BODY||!1,Jg=b.SANITIZE_DOM!==!1,eh=b.SANITIZE_NAMED_PROPS||!1,Sd=b.KEEP_CONTENT!==!1,ca=b.IN_PLACE||!1,ge=b.ALLOWED_URI_REGEXP||au,Oi=b.NAMESPACE||en,or=b.MATHML_TEXT_INTEGRATION_POINTS||or,rr=b.HTML_INTEGRATION_POINTS||rr,he=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&sh(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&sh(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Pi&&(_d=!1),nr&&(qi=!0),Ni&&(pe=z({},nu),Ce=[],Ni.html===!0&&(z(pe,tu),z(Ce,iu)),Ni.svg===!0&&(z(pe,$r),z(Ce,xr),z(Ce,wa)),Ni.svgFilters===!0&&(z(pe,Er),z(Ce,xr),z(Ce,wa)),Ni.mathMl===!0&&(z(pe,_r),z(Ce,su),z(Ce,wa))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?Ri.tagCheck=b.ADD_TAGS:(pe===J&&(pe=_t(pe)),z(pe,b.ADD_TAGS,xe))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?Ri.attributeCheck=b.ADD_ATTR:(Ce===Yg&&(Ce=_t(Ce)),z(Ce,b.ADD_ATTR,xe))),b.ADD_URI_SAFE_ATTR&&z(Ld,b.ADD_URI_SAFE_ATTR,xe),b.FORBID_CONTENTS&&(Pt===Td&&(Pt=_t(Pt)),z(Pt,b.FORBID_CONTENTS,xe)),b.ADD_FORBID_CONTENTS&&(Pt===Td&&(Pt=_t(Pt)),z(Pt,b.ADD_FORBID_CONTENTS,xe)),Sd&&(pe["#text"]=!0),Yn&&z(pe,["html","head","body"]),pe.table&&(z(pe,["tbody"]),delete la.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw Yi('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Yi('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=b.TRUSTED_TYPES_POLICY,ne=M.createHTML("")}else M===void 0&&(M=bv(g,s)),M!==null&&typeof ne=="string"&&(ne=M.createHTML(""));Oe&&Oe(b),Hi=b}},ah=z({},[...$r,...Er,...rv]),oh=z({},[..._r,...lv]),z0=function(b){let I=D(b);(!I||!I.tagName)&&(I={namespaceURI:Oi,tagName:"template"});const B=ya(b.tagName),me=ya(I.tagName);return Cd[b.namespaceURI]?b.namespaceURI===ar?I.namespaceURI===en?B==="svg":I.namespaceURI===sr?B==="svg"&&(me==="annotation-xml"||or[me]):!!ah[B]:b.namespaceURI===sr?I.namespaceURI===en?B==="math":I.namespaceURI===ar?B==="math"&&rr[me]:!!oh[B]:b.namespaceURI===en?I.namespaceURI===ar&&!rr[me]||I.namespaceURI===sr&&!or[me]?!1:!oh[B]&&(H0[B]||!ah[B]):!!(da==="application/xhtml+xml"&&Cd[b.namespaceURI]):!1},qt=function(b){Wi(t.removed,{element:b});try{D(b).removeChild(b)}catch{w(b)}},Qn=function(b,I){try{Wi(t.removed,{attribute:I.getAttributeNode(b),from:I})}catch{Wi(t.removed,{attribute:null,from:I})}if(I.removeAttribute(b),b==="is")if(qi||nr)try{qt(I)}catch{}else try{I.setAttribute(b,"")}catch{}},rh=function(b){let I=null,B=null;if(Id)b="<remove></remove>"+b;else{const be=kr(b,/^[\r\n\t ]+/);B=be&&be[0]}da==="application/xhtml+xml"&&Oi===en&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");const me=M?M.createHTML(b):b;if(Oi===en)try{I=new f().parseFromString(me,da)}catch{}if(!I||!I.documentElement){I=E.createDocument(Oi,"template",null);try{I.documentElement.innerHTML=Ad?ne:me}catch{}}const Pe=I.body||I.documentElement;return b&&B&&Pe.insertBefore(n.createTextNode(B),Pe.childNodes[0]||null),Oi===en?W.call(I,Yn?"html":"body")[0]:Yn?I.documentElement:Pe},lh=function(b){return P.call(b.ownerDocument||b,b,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Dd=function(b){return b instanceof u&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof d)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},ch=function(b){return typeof r=="function"&&b instanceof r};function tn(j,b,I){ba(j,B=>{B.call(t,b,I,Hi)})}const dh=function(b){let I=null;if(tn(x.beforeSanitizeElements,b,null),Dd(b))return qt(b),!0;const B=xe(b.nodeName);if(tn(x.uponSanitizeElement,b,{tagName:B,allowedTags:pe}),tr&&b.hasChildNodes()&&!ch(b.firstElementChild)&&He(/<[/\w!]/g,b.innerHTML)&&He(/<[/\w!]/g,b.textContent)||b.nodeType===Zi.progressingInstruction||tr&&b.nodeType===Zi.comment&&He(/<[/\w]/g,b.data))return qt(b),!0;if(!(Ri.tagCheck instanceof Function&&Ri.tagCheck(B))&&(!pe[B]||la[B])){if(!la[B]&&ph(B)&&(he.tagNameCheck instanceof RegExp&&He(he.tagNameCheck,B)||he.tagNameCheck instanceof Function&&he.tagNameCheck(B)))return!1;if(Sd&&!Pt[B]){const me=D(b)||b.parentNode,Pe=_(b)||b.childNodes;if(Pe&&me){const be=Pe.length;for(let tt=be-1;tt>=0;--tt){const nn=y(Pe[tt],!0);nn.__removalCount=(b.__removalCount||0)+1,me.insertBefore(nn,S(b))}}}return qt(b),!0}return b instanceof l&&!z0(b)||(B==="noscript"||B==="noembed"||B==="noframes")&&He(/<\/no(script|embed|frames)/i,b.innerHTML)?(qt(b),!0):(Pi&&b.nodeType===Zi.text&&(I=b.textContent,ba([R,C,Q],me=>{I=Ki(I,me," ")}),b.textContent!==I&&(Wi(t.removed,{element:b.cloneNode()}),b.textContent=I)),tn(x.afterSanitizeElements,b,null),!1)},uh=function(b,I,B){if(Jg&&(I==="id"||I==="name")&&(B in n||B in G0))return!1;if(!(_d&&!Ed[I]&&He(_e,I))){if(!(Qg&&He(de,I))){if(!(Ri.attributeCheck instanceof Function&&Ri.attributeCheck(I,b))){if(!Ce[I]||Ed[I]){if(!(ph(b)&&(he.tagNameCheck instanceof RegExp&&He(he.tagNameCheck,b)||he.tagNameCheck instanceof Function&&he.tagNameCheck(b))&&(he.attributeNameCheck instanceof RegExp&&He(he.attributeNameCheck,I)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(I,b))||I==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&He(he.tagNameCheck,B)||he.tagNameCheck instanceof Function&&he.tagNameCheck(B))))return!1}else if(!Ld[I]){if(!He(ge,Ki(B,L,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&b!=="script"&&iv(B,"data:")===0&&th[b])){if(!(Zg&&!He(gt,Ki(B,L,"")))){if(B)return!1}}}}}}}return!0},ph=function(b){return b!=="annotation-xml"&&kr(b,ue)},mh=function(b){tn(x.beforeSanitizeAttributes,b,null);const{attributes:I}=b;if(!I||Dd(b))return;const B={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ce,forceKeepAttr:void 0};let me=I.length;for(;me--;){const Pe=I[me],{name:be,namespaceURI:tt,value:nn}=Pe,Fi=xe(be),Md=nn;let Be=be==="value"?Md:sv(Md);if(B.attrName=Fi,B.attrValue=Be,B.keepAttr=!0,B.forceKeepAttr=void 0,tn(x.uponSanitizeAttribute,b,B),Be=B.attrValue,eh&&(Fi==="id"||Fi==="name")&&(Qn(be,b),Be=N0+Be),tr&&He(/((--!?|])>)|<\/(style|title|textarea)/i,Be)){Qn(be,b);continue}if(Fi==="attributename"&&kr(Be,"href")){Qn(be,b);continue}if(B.forceKeepAttr)continue;if(!B.keepAttr){Qn(be,b);continue}if(!Xg&&He(/\/>/i,Be)){Qn(be,b);continue}Pi&&ba([R,C,Q],gh=>{Be=Ki(Be,gh," ")});const fh=xe(b.nodeName);if(!uh(fh,Fi,Be)){Qn(be,b);continue}if(M&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!tt)switch(g.getAttributeType(fh,Fi)){case"TrustedHTML":{Be=M.createHTML(Be);break}case"TrustedScriptURL":{Be=M.createScriptURL(Be);break}}if(Be!==Md)try{tt?b.setAttributeNS(tt,be,Be):b.setAttribute(be,Be),Dd(b)?qt(b):eu(t.removed)}catch{Qn(be,b)}}tn(x.afterSanitizeAttributes,b,null)},V0=function j(b){let I=null;const B=lh(b);for(tn(x.beforeSanitizeShadowDOM,b,null);I=B.nextNode();)tn(x.uponSanitizeShadowNode,I,null),dh(I),mh(I),I.content instanceof a&&j(I.content);tn(x.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(j){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,B=null,me=null,Pe=null;if(Ad=!j,Ad&&(j="<!-->"),typeof j!="string"&&!ch(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw Yi("dirty is not a string, aborting")}else throw Yi("toString is not a function");if(!t.isSupported)return j;if(xd||Bd(b),t.removed=[],typeof j=="string"&&(ca=!1),ca){if(j.nodeName){const nn=xe(j.nodeName);if(!pe[nn]||la[nn])throw Yi("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof r)I=rh("<!---->"),B=I.ownerDocument.importNode(j,!0),B.nodeType===Zi.element&&B.nodeName==="BODY"||B.nodeName==="HTML"?I=B:I.appendChild(B);else{if(!qi&&!Pi&&!Yn&&j.indexOf("<")===-1)return M&&ir?M.createHTML(j):j;if(I=rh(j),!I)return qi?null:ir?ne:""}I&&Id&&qt(I.firstChild);const be=lh(ca?j:I);for(;me=be.nextNode();)dh(me),mh(me),me.content instanceof a&&V0(me.content);if(ca)return j;if(qi){if(nr)for(Pe=G.call(I.ownerDocument);I.firstChild;)Pe.appendChild(I.firstChild);else Pe=I;return(Ce.shadowroot||Ce.shadowrootmode)&&(Pe=Ee.call(i,Pe,!0)),Pe}let tt=Yn?I.outerHTML:I.innerHTML;return Yn&&pe["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&He(ou,I.ownerDocument.doctype.name)&&(tt="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+tt),Pi&&ba([R,C,Q],nn=>{tt=Ki(tt,nn," ")}),M&&ir?M.createHTML(tt):tt},t.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Bd(j),xd=!0},t.clearConfig=function(){Hi=null,xd=!1},t.isValidAttribute=function(j,b,I){Hi||Bd({});const B=xe(j),me=xe(b);return uh(B,me,I)},t.addHook=function(j,b){typeof b=="function"&&Wi(x[j],b)},t.removeHook=function(j,b){if(b!==void 0){const I=tv(x[j],b);return I===-1?void 0:nv(x[j],I,1)[0]}return eu(x[j])},t.removeHooks=function(j){x[j]=[]},t.removeAllHooks=function(){x=lu()},t}var du=cu();const Ir="chaotic_";function Ye(e){try{return localStorage.getItem(Ir+e)}catch{return null}}function ot(e,t){try{localStorage.setItem(Ir+e,t)}catch{}}function xt(e){try{localStorage.removeItem(Ir+e)}catch{}}function Sr(){return Ye("token")}function yv(e){e?ot("token",e):xt("token")}function wv(){return Ye("theme")}function kv(e){ot("theme",e)}function uu(){return Ye("last_project")}function $v(e){ot("last_project",e)}function Ev(){return Ye("onboarding_complete")==="true"}function _v(){ot("onboarding_complete","true")}function xv(){xt("onboarding_complete")}function Iv(e){return e?Ye(`issues_filters_${e}`):null}function Sv(e,t){e&&(t?ot(`issues_filters_${e}`,t):xt(`issues_filters_${e}`))}function pu(e){return Ye(`comment_draft_${e}`)}function ka(e,t){t?ot(`comment_draft_${e}`,t):xt(`comment_draft_${e}`)}function mu(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function Xi(e){const t=Ye(`description_draft_${e}`);if(!t)return null;const n=mu(t);return n?n.draft:t}function fu(e){const t=Ye(`description_draft_${e}`);if(!t)return null;const n=mu(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function In(e,t,n=""){t?ot(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):xt(`description_draft_${e}`)}function gu(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function hu(e){var n;const t=Ye(`document_draft_${e}`);return t?((n=gu(t))==null?void 0:n.draft)??null:null}function Tv(e){const t=Ye(`document_draft_${e}`);if(!t)return null;const n=gu(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function $a(e,t,n=null){t&&(t.title||t.content||t.icon)?ot(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):xt(`document_draft_${e}`)}function Lv(){return{title:Ye("create_issue_title"),description:Ye("create_issue_description")}}function vu(e,t){e?ot("create_issue_title",e):xt("create_issue_title"),t?ot("create_issue_description",t):xt("create_issue_description")}function Av(){xt("create_issue_title"),xt("create_issue_description")}function Cv(){return Ye("doc_view_mode")}function Bv(e){ot("doc_view_mode",e)}function Dv(){return Ye("approvals_explainer_dismissed")==="1"}function Mv(){ot("approvals_explainer_dismissed","1")}const jv="chaotic-boot-cache",Tr="snapshot",Lr="last",bu=1,Rv=336*60*60*1e3,Pv=250;let Sn=null;function qv(){return Sn||(Sn=new Promise((e,t)=>{var i;let n;try{n=(i=globalThis.indexedDB)==null?void 0:i.open(jv,1)}catch(s){t(s);return}if(!n){t(new Error("IndexedDB unavailable"));return}n.onupgradeneeded=()=>n.result.createObjectStore(Tr),n.onsuccess=()=>{const s=n.result;s.onversionchange=()=>{s.close(),Sn=null},e(s)},n.onerror=()=>t(n.error),n.onblocked=()=>t(new Error("IndexedDB blocked"))}),Sn.catch(()=>{Sn=null}),Sn)}function Ar(e,t){return qv().then(n=>new Promise((i,s)=>{const a=n.transaction(Tr,e),o=t(a.objectStore(Tr));a.oncomplete=()=>i(o==null?void 0:o.result),a.onerror=()=>s(a.error),a.onabort=()=>s(a.error)}))}function yu(e){var t;try{const n=String(e).split(".")[1];if(!n)return null;const i=atob(n.replace(/-/g,"+").replace(/_/g,"/")),s=(t=JSON.parse(i))==null?void 0:t.sub;return typeof s=="string"&&s?s:null}catch{return null}}function Nv(e){if(!e)return Promise.resolve(null);const t=Ar("readonly",i=>i.get(Lr)).then(i=>!i||i.version!==bu||i.userId!==e||!(Date.now()-i.savedAt<Rv)?null:i).catch(()=>null),n=new Promise(i=>setTimeout(()=>i(null),Pv));return Promise.race([t,n])}function Ov(e,t){if(!e)return Promise.resolve();const n={...t,version:bu,userId:e,savedAt:Date.now()};return Ar("readwrite",i=>i.put(n,Lr)).then(()=>{},()=>{})}function Cr(){return Ar("readwrite",e=>e.delete(Lr)).then(()=>{},()=>{})}const Hv="/api";class Fv{constructor(){this.token=Sr()}setToken(t){this.token=t,yv(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s},o=typeof Blob<"u"&&i instanceof Blob;o&&(s["Content-Type"]=i.type||"application/octet-stream"),i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=o?i:JSON.stringify(i));let r;try{r=await fetch(`${Hv}${n}`,a)}catch(c){const d=new Error("Network error - check your connection");throw d.isNetworkError=!0,d.cause=c,d}if(r.status===204)return null;let l;try{l=await r.json()}catch{const c=r.headers.get("content-type")||"unknown";throw r.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${r.status})`)}if(!r.ok){let c;typeof l.detail=="string"?c=l.detail:l.detail&&typeof l.detail=="object"&&l.detail.message?c=l.detail.message:c="An error occurred";const d=new Error(c);throw d.status=r.status,d.detail=l.detail,d}return l}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null),Cr()}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async uploadAvatar(t){return this.request("PUT","/users/me/avatar",t)}async deleteAvatar(){return this.request("DELETE","/users/me/avatar")}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:a=null,skip:o=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),a&&c.set("order",a),c.set("skip",String(o)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/teams/${t}/agents`,a)}async createProjectAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/projects/${t}/agents`,a)}async getTeamRoster(t,{includeIdle:n=!1}={}){const i=n?"?include_idle=true":"";return this.request("GET",`/teams/${t}/roster${i}`)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getInbox(t,{unread:n=!1,kinds:i=null,skip:s=0,limit:a=50}={}){const o=new URLSearchParams({team_id:t,skip:s,limit:a});n&&o.set("unread","true");for(const r of i||[])o.append("kind",r);return this.request("GET",`/inbox?${o.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const h=new Fv;let Zn=null;const Uv='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Xn=null,Ji=!1;function Br(){Ji=!0}function Gv(){Ji=!1}function wu(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function zv(){if(Ji)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function U(){Xn=document.activeElement,Ji=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function N(){var e;Ft(),Ji=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Xn&&document.contains(Xn)&&typeof Xn.focus=="function"&&Xn.focus(),Xn=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(Uv);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function nt(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function k(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),u=setTimeout(o,l);return a.addEventListener("click",()=>{clearTimeout(u),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(u),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),u=setTimeout(o,Math.max(c,500))}),i}function es(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=k(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function Vv(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function $(e,t){const n=Vv(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";k(`Failed to ${e}: ${n}${i}`,"error")}function Ft(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Zn&&(document.removeEventListener("keydown",Zn),Zn=null)}function Wv(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));Ft(),t&&nt()&&wu()}function ts(e){Zn&&document.removeEventListener("keydown",Zn),Zn=e,e&&document.addEventListener("keydown",e)}function ns(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(Ft(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function Ie(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function De(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function it(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ee(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function p(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function m(e){return p(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Kv(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function rt(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function vt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}const Dr=/^\/api\/avatars\/[0-9a-f]{64}$/;function ku(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||Dr.test(e))}function Ut(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?ku(i)?`<img class="${t} avatar-img" src="${m(i)}" alt="${m(n)}">`:`<div class="${t} avatar-emoji">${p(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function $u(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${m(n)}">agent</span>`}function Ea(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${m(i)}">${p(n)}</span>`}return $u(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let ae={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const Mr=new Set;function fe(e,t){if(typeof e=="string"){const n=ae[e];ae[e]=t,Eu(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=ae[i];ae[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{Eu(i,s,a)})}}function lt(e){return Mr.add(e),()=>Mr.delete(e)}function Eu(e,t,n){t!==n&&Mr.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const ye=()=>ae.currentUser,It=e=>fe("currentUser",e),A=()=>ae.currentView,is=e=>fe("currentView",e),te=()=>ae.issues,Qe=e=>fe("issues",e),ss=()=>ae.detailNavContext,St=e=>fe("detailNavContext",e),jr=()=>ae.labels,as=e=>fe("labels",e),_u=()=>ae.activeFilterCategory,Yv=e=>fe("activeFilterCategory",e),xu=()=>ae.selectedIssueIndex,Tn=e=>fe("selectedIssueIndex",e),Qv=()=>ae.selectedDocIndex,Iu=e=>fe("selectedDocIndex",e),Su=()=>ae.selectedBoardIndex,_a=e=>fe("selectedBoardIndex",e),Zv=()=>ae.selectedInboxIndex,xa=e=>fe("selectedInboxIndex",e),Xv=()=>ae.selectedSprintIndex,Tu=e=>fe("selectedSprintIndex",e),Jv=()=>ae.selectedEpicIndex,Rr=e=>fe("selectedEpicIndex",e),eb=()=>ae.pendingGates,tb=e=>fe("pendingGates",e),le=()=>ae.inboxEntries,Gt=e=>fe("inboxEntries",e),Ia=()=>ae.inboxUnreadCount,os=e=>fe("inboxUnreadCount",e),nb=()=>ae.searchDebounceTimer,ib=e=>fe("searchDebounceTimer",e),sb=()=>ae.websocket,Pr=e=>fe("websocket",e),T=()=>ae.currentTeam,Jn=e=>fe("currentTeam",e),K=()=>ae.currentProject,ct=e=>fe("currentProject",e||null),we=()=>ae.currentDetailIssue,ei=e=>fe("currentDetailIssue",e),ab=()=>ae.currentDetailSprints,Lu=e=>fe("currentDetailSprints",e),qr={};function ie(e){Object.assign(qr,e)}function ob(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=qr[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let Au=!1;function rb(){if(!Au){Au=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,ob);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=qr[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const Nr=["backlog","todo","in_progress","in_review","done","canceled"],rs=["backlog","todo","in_progress","in_review"],Cu=["urgent","high","medium","low","no_priority"],Or=["no_priority","urgent","high","medium","low"],Bu=["backlog","todo","in_progress","in_review","done"],Sa="#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row";function F({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${m(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${m(r)}="${m(l)}"`).join(""):""}>${p(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${p(t)}</h3>
            <p>${p(n)}</p>
            ${a}
        </div>
    `}const O={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},Du=24,Ze=new Map,ve=new Map,bt=new Map;let zt=null;function lb(e){return Array.isArray(e)?[...e].map(String).sort():e}function Mu(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,lb(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function Ta(e,t){for(ve.delete(e),ve.set(e,t);ve.size>Du;){const n=ve.keys().next().value;ve.delete(n)}ju()}function ju(){if(Ze.size===0)return;const e=new Set;ve.forEach(t=>t.ids.forEach(n=>e.add(n))),Ze.forEach((t,n)=>{e.has(n)||Ze.delete(n)})}function cb(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function Ru(e){const t=ve.get(e);return t?(Ta(e,t),t.ids.map(n=>Ze.get(n)).filter(Boolean)):null}function Hr(e){return Ze.get(e)}function db(e){var t;return((t=ve.get(e))==null?void 0:t.meta)||{}}function Pu(e,t){if(!e||!t)return!1;const n=Date.parse(e),i=Date.parse(t);return Number.isNaN(n)||Number.isNaN(i)?e>t:n>i}function Fr(e){const t=Ze.get(e.id);if(!Pu(t==null?void 0:t.updated_at,e.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){Ze.set(e.id,{...e,description:t.description});return}Ze.set(e.id,e)}}const Ur=new Set;function ub(e){return Ur.add(e),()=>Ur.delete(e)}function qu(e,t,n){if(!Array.isArray(t))return;const i=cb(t);i.forEach(Fr);const s=ve.get(e);Ta(e,{ids:i.map(a=>a.id),meta:n??(s==null?void 0:s.meta)??{}}),Ur.forEach(a=>{try{a(e)}catch(o){console.error(o)}})}function pb(e,t){const n=ve.get(e);n&&(n.meta=t)}function La(e){e!=null&&e.id&&Ze.has(e.id)&&Fr(e)}function mb(e){ve.delete(e),bt.forEach((t,n)=>{t===e&&bt.delete(n)}),zt===e&&(zt=null),ju()}function fb(e){Ze.delete(e),ve.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function Aa(e){zt=e}function gb(){return zt}function Nu(e,t){for(bt.delete(e),bt.set(e,t);bt.size>Du;)bt.delete(bt.keys().next().value)}function hb(e){const t=bt.get(e);return t&&ve.has(t)?t:null}function vb({maxQueries:e=3}={}){const t=[...ve.entries()].slice(-e),n=new Set(t.map(([s])=>s)),i=new Set;return t.forEach(([,s])=>s.ids.forEach(a=>i.add(a))),{queries:t.map(([s,a])=>[s,{ids:[...a.ids],meta:a.meta||{}}]),entities:[...i].map(s=>Ze.get(s)).filter(Boolean),views:[...bt.entries()].filter(([,s])=>n.has(s))}}function bb(e){if(!e||!Array.isArray(e.queries))return;const t=new Map((e.entities||[]).filter(n=>n==null?void 0:n.id).map(n=>[n.id,n]));e.queries.forEach(([n,i])=>{ve.has(n)||!Array.isArray(i==null?void 0:i.ids)||(i.ids.forEach(s=>{t.has(s)&&Fr(t.get(s))}),Ta(n,{ids:i.ids.filter(s=>Ze.has(s)),meta:i.meta||{}}))}),(e.views||[]).forEach(([n,i])=>{!bt.has(n)&&ve.has(i)&&Nu(n,i)})}function Ou(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function Hu(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(Ou(e[n])!==Ou(t[n]))return!1;return!0}const Fu=["status","priority"],Uu=["assignee_id","sprint_id","issue_type"],yb={assignee_id:"unassigned",sprint_id:"no_sprint"},wb=["scope","project_id","sort_by","order","limit"],Ln=e=>(e||[]).map(t=>String(t).toLowerCase());function kb(e,t){if(e.search||t.search||t.sort_by==="random"||wb.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of Fu)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of Uu)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=Ln(e.label);if(!Ln(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=Ln(t.exclude_label);if(!Ln(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function Gu(e){const t=e.label===void 0?null:Ln(e.label),n=e.exclude_label===void 0?null:Ln(e.exclude_label);return i=>{for(const s of Fu)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of Uu){if(e[s]===void 0)continue;const a=e[s]===yb[s]?null:e[s];if((i[s]??null)!==a)return!1}if(t||n){const s=Ln((i.labels||[]).map(a=>a.name));if(t&&!t.some(a=>s.includes(a))||n&&n.some(a=>s.includes(a)))return!1}return!0}}function $b(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(Mu(e)));let n=null,i=null;if(ve.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let c;try{c=Object.fromEntries(JSON.parse(l))}catch{return}kb(c,t)&&(n=r,i=l)}),!n)return null;Ta(i,n);const s=Gu(t),a=n.ids.map(r=>Ze.get(r)).filter(r=>r&&s(r)),o=t.limit;return{rows:a,complete:!(typeof o=="number"&&n.ids.length>=o)}}function Eb(){Ze.clear(),ve.clear(),bt.clear(),zt=null}lt((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Eb();return}if(e!=="issues"||zt===null||!ve.has(zt)||A()!=="issues")return;const i=ve.get(zt);qu(zt,te(),i.meta)});let Gr=[];function _b(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function xb(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function ls(e,t){const n=e().map(_b),i=t().map(xb);Gr=[...n,...i]}function yt(e){return e&&Gr.find(t=>t.id===e)||null}function dt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Ca(e,t=!1){const n=p(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${p(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function cs({includeIdle:e=!1,keepId:t=null}={}){const n=Gr.filter(v=>e||!v.idle||v.id===t),i=n.filter(v=>!v.is_agent),s=new Set(i.map(v=>v.id)),a=n.filter(v=>v.is_agent),o=new Set(a.map(v=>v.id)),r=(v,y)=>v.name.localeCompare(y.name),l=v=>v.registered_by_id&&o.has(v.registered_by_id),c=new Map,d=new Map;a.forEach(v=>{const[y,w]=l(v)?[c,v.registered_by_id]:[d,v.parent_user_id];y.has(w)||y.set(w,[]),y.get(w).push(v)});const u=[],f=(v,y)=>{u.push({assignee:v,indent:y}),(c.get(v.id)||[]).sort(r).forEach(S=>u.push({assignee:S,indent:2}))};return i.forEach(v=>{u.push({assignee:v,indent:!1}),(d.get(v.id)||[]).sort(r).forEach(y=>f(y,!0))}),a.filter(v=>!l(v)&&!s.has(v.parent_user_id)).sort(r).forEach(v=>f(v,!1)),u}function ti({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;cs({keepId:n}).forEach(({assignee:s,indent:a})=>{i+=`<option value="${m(s.id)}">${Ca(s,a)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function Ib(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&yt(e)&&ti({keepId:e}),t.value=e}let Tt=[],zr=[],Ba=-1,Vr=null;const zu=5,Sb=new Set(["done","canceled"]),Vu=new Set;function Tb(){return Ba}function Lb(e){Ba=e;const t=e>=0?document.querySelectorAll("#my-issues-list .issue-row")[e]:null;Vr=(t==null?void 0:t.dataset.issueId)??null}const Wu=[{status:"in_progress",label:"In progress"},{status:"in_review",label:"In review"},{status:"todo",label:"Todo"},{status:"backlog",label:"Backlog"},{status:"done",label:"Done"},{status:"canceled",label:"Canceled"}];function Ku(e){const t=new Set(Wu.map(s=>s.status)),n=Wu.map(s=>({...s,issues:e.filter(a=>a.status===s.status)})),i=e.filter(s=>!t.has(s.status));return i.length&&n.push({status:"other",label:"Other",issues:i}),n.filter(s=>s.issues.length)}lt(e=>{e==="currentProject"&&A()==="my-issues"&&(ni(),ds(),ii())});function Xe(){return Tt}function An(e){Tt=e}let Wr=0;async function ni(){var a;const e=T(),t=ye();if(!e||!t)return;const n=++Wr,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=K();Cb();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await h.getIssues({...o,project_id:s}):r=await h.getTeamIssues(e.id,o),n!==Wr)return;Tt=Ku(r).flatMap(l=>l.issues),A()==="my-issues"&&St(Tt),Cn()}catch(o){if(n!==Wr)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=F({icon:O.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),$("load issues",o)}}async function ii({showLoading:e=!0}={}){const t=T();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=K();zr=await h.getTeamActivities(t.id,0,10,{projectId:i}),Ab()}catch{n&&(n.innerHTML=F({icon:O.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function Ab(){const e=document.getElementById("dashboard-activity-list");if(e){if(!zr.length){e.innerHTML=F({icon:O.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=zr.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${m(t.issue_identifier)}"><strong>${p(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${m(t.document_id)}"><strong>${s} ${p(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${p(t.document_title)}</strong>`);const i=Cl(t);return`
        <div class="activity-item">
            <div class="activity-icon" aria-hidden="true">${mm(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Dl(t)}${n}</span>
                <span class="activity-actor">by ${p(i)}</span>
                <time class="activity-time" datetime="${m(t.created_at||"")}">${rt(t.created_at)}</time>
            </div>
        </div>
    `}).join("")}}function Cb(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function Yu(){ni()}function Cn(){var o,r;const e=document.getElementById("my-issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=Ku(Tt);Tt=t.flatMap(l=>l.issues),A()==="my-issues"&&St(Tt),Ba=-1;const n=document.getElementById("my-issues-count");if(n&&(n.textContent=Tt.length?String(Tt.length):""),Tt.length===0){e.innerHTML=F({icon:O.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}const i=document.activeElement,s=e.contains(i)?(o=i.closest(".issue-row"))==null?void 0:o.dataset.issueId:null,a=s?(r=i.dataset)==null?void 0:r.dropdownType:null;if(e.innerHTML=t.map(l=>{const c=Sb.has(l.status)&&!Vu.has(l.status)&&l.issues.length>zu,d=c?l.issues.slice(0,zu):l.issues;return`
        <div class="dash-group" role="group" aria-labelledby="dash-group-${l.status}">
            <h4 class="dash-group-header" id="dash-group-${l.status}">
                <span class="dash-group-dot status-${l.status}" aria-hidden="true"></span>
                ${p(l.label)} <span class="dash-group-count">${l.issues.length}</span>
            </h4>
            ${d.map(u=>ui(u)).join("")}
            ${c?`<button type="button" class="dash-group-more" data-action="dash-show-all" data-status="${l.status}">Show all ${l.issues.length}</button>`:""}
        </div>`}).join(""),s){const l=[...e.querySelectorAll(".issue-row")].find(d=>d.dataset.issueId===s),c=l&&(a?l.querySelector(`[data-dropdown-type="${a}"]`):l.querySelector(".issue-title"));c==null||c.focus({preventScroll:!0})}if(Vr){const l=[...e.querySelectorAll(".issue-row")],c=l.findIndex(d=>d.dataset.issueId===Vr);c!==-1&&(l[c].classList.add("keyboard-selected"),Ba=c)}}let Kr=0;async function ds(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++Kr,n=K(),i=X(),s=n?i.filter(a=>a.id===n):i;if(!s.length){e.innerHTML="";return}try{const a=s.map(async r=>{try{const l=await h.getCurrentSprint(r.id);if(!l)return null;let c={};try{const d=await h.getIssues({sprint_id:l.id,project_id:r.id,limit:500});for(const u of d)c[u.status]=(c[u.status]||0)+1}catch(d){console.error(`Failed to load issue counts for sprint ${l.id}:`,d)}return{project:r,sprint:l,statusCounts:c}}catch(l){return console.error(`Failed to load current sprint for project ${r.id}:`,l),null}}),o=(await Promise.all(a)).filter(Boolean);if(t!==Kr)return;Bb(o)}catch(a){if(t!==Kr)return;console.error("Failed to load sprint status:",a),e.innerHTML=F({icon:O.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}function Bb(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:i,sprint:s,statusCounts:a})=>{const o=s.budget||0,r=s.points_spent||0,l=o>0?Math.min(100,Math.round(r/o*100)):0,c=o>0&&r>o,d=s.limbo?"limbo":c?"arrears":"",u=a||{},f=Object.values(u).reduce((g,v)=>g+v,0);return`
                    <div class="sprint-status-card ${d}">
                        <div class="sprint-status-header">
                            <span class="sprint-status-project">${p(i.name)}</span>
                            ${s.limbo?'<span class="sprint-status-badge limbo">Limbo</span>':""}
                            ${c?'<span class="sprint-status-badge arrears">Arrears</span>':""}
                        </div>
                        <div class="sprint-status-name">${p(s.name)}</div>
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
                        ${f>0?`
                            <div class="sprint-issue-breakdown">
                                <div class="sprint-stacked-bar">
                                    ${n.filter(g=>u[g]).map(g=>{const v=Math.round(u[g]/f*100);return`<div class="sprint-stacked-segment status-${g}" style="width: ${v}%" title="${Ie(g)}: ${u[g]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(g=>u[g]).map(g=>`<span class="sprint-count-label status-${g}">${u[g]} ${Ie(g)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}ie({"filter-my-issues":()=>Yu(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),pc(t.identifier)},"retry-load-my-issues":()=>ni(),"dash-show-all":(e,t)=>{Vu.add(t.status),Cn()},"retry-load-sprint-status":()=>ds()});const Qu=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function us(e=null){const t=e||K()||"";vp([]);const n=X().map(o=>`
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
                        ${We("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${pt("no_priority")}
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
                                ${Qu.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
    `,U(),Pa();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=Lv();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{vu(i.value,s.value)}),s.addEventListener("input",()=>{vu(i.value,s.value)}),i.focus()}function Db(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function Mb(e){const t=Qu.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function Zu(e,t){const n=X().find(i=>i.id===t);vp([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
                        ${We("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${pt("no_priority")}
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
    `,U(),Pa(),document.getElementById("create-issue-title").focus()}async function jb(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){k("Please enter a title","error");return}try{const d=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:hp(),parent_id:e});N(),k(`Created sub-issue ${d.identifier}`,"success"),oe(e)}catch(d){$("create sub-issue",d)}}async function Rb(e,t,n){var o,r;Ft();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Bu.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${m(Ie(c))}">
                    ${We(c)}
                    <span>${Ie(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${Or.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${m(De(c))}">
                    ${pt(c)}
                    <span>${De(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${m(vt(c))}">
                    <span class="issue-type-badge type-${c}">${vt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!T())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=jr(),c=!1;if(l.length===0)try{l=await h.getLabels(T().id),as(l)}catch(d){console.error("Failed to load labels:",d),c=!0}Jr(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),ns(a,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=cs({keepId:l});a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:u})=>{const f=dt(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${m(d.id)}" data-label="${m(f)}">
                    ${Ut(d,"avatar-small")}
                    <span>${Ca(d,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=wi(c);a.innerHTML=`
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
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),ns(a)}function Pb(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function qb(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,Br();const i=p(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${We(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${pt(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${vt(t)}</span><span id="create-issue-type-label">${i}</span>`)}Ft(),s==null||s.focus()}async function Xu({keepOpen:e=!1}={}){var y,w;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((y=document.getElementById("create-issue-sprint"))==null?void 0:y.value)||null,u=(w=document.getElementById("create-issue-due-date"))==null?void 0:w.value,f=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),v=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),v&&(v.disabled=!0);try{const S=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:d,label_ids:hp(),due_date:f});k(`Created ${S.identifier}`,"success"),Av(),A()==="issues"?At():A()==="my-issues"&&ni(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",Gv(),document.getElementById("create-issue-title").focus()):(N(),oe(S.id))}catch(S){$("create issue",S)}finally{g&&(g.disabled=!1),v&&(v.disabled=!1)}}async function Nb(){await Xu({keepOpen:!1})}async function Ob(){await Xu({keepOpen:!0})}ie({"toggle-create-dropdown":(e,t,n)=>{Rb(t.dropdownType,e,n)},"set-create-field":(e,t)=>{qb(t.field,t.value,t.label)},"create-issue-submit":()=>{Nb()},"create-issue-and-new":()=>{Ob()},"update-create-project":()=>{Pb()},"apply-template":e=>{Mb(e.target.value)},"toggle-create-options":()=>{Db()},"create-sub-issue-submit":(e,t)=>{jb(t.parentId,t.projectId)}});function ps(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&(k(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(Hb(n,e.project_id),t=!0),t}function Hb(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
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
    `,U())}async function Fb(e,t){try{const n=await h.updateIssue(e,{status:"done"});N(),k(`${t} closed`,"success"),ps(n)}catch(n){$(`close ${t}`,n)}}ie({"parent-prompt-dismiss":()=>N(),"parent-prompt-close":(e,t)=>Fb(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{N(),Zu(t.parentId,t.projectId)}});function sn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Bn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Dn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Mn(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Da(){const e=document.getElementById("group-by-select");return e?e.value:""}const Ju=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],Yr=["done","canceled"],Ub=rs,Gb="all";function ep(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function si(e=sn()){return e.length===0?"all":ep(e,rs)?"open":ep(e,Yr)?"closed":null}function tp(e){var t,n,i;switch(e){case"project":return K()?1:0;case"status":{const s=si();return s==="all"?0:s?1:sn().length}case"priority":return Bn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Dn().length;case"exclude_labels":return Mn().length;default:return 0}}function Qr(){let e=0;return Ju.forEach(t=>{e+=tp(t.key)}),e}function np(){var v,y,w,S,_,D;const e=new URLSearchParams,t=sn(),n=Bn(),i=Dn(),s=Mn(),a=(v=document.getElementById("assignee-filter"))==null?void 0:v.value,o=K()||"",r=(y=document.getElementById("sprint-filter"))==null?void 0:y.value,l=(w=document.getElementById("issue-type-filter"))==null?void 0:w.value,c=(S=document.getElementById("group-by-select"))==null?void 0:S.value,d=(_=document.getElementById("sort-by-select"))==null?void 0:_.value,u=si(t);u==="all"?e.append("status",Gb):u!=="open"&&t.forEach(M=>e.append("status",M)),n.forEach(M=>e.append("priority",M)),i.forEach(M=>e.append("label",M)),s.forEach(M=>e.append("exclude_label",M)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const f=e.toString(),g=f?`/issues?${f}`:"/issues";history.replaceState({view:"issues"},"",g),Sv((D=T())==null?void 0:D.id,f)}function zb(e){var y;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(w=>t.has(w))){const w=Iv((y=T())==null?void 0:y.id);if(w){t=new URLSearchParams(w);const S=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",S)}}const s=t.getAll("status"),a=document.getElementById("status-filter-dropdown");if(a&&(s.length>0||!a.dataset.statusApplied)){const w=s.length>0?s:Ub;a.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=w.includes(_.value)}),a.dataset.statusApplied="true",ip()}const o=t.getAll("priority");if(o.length>0){const w=document.getElementById("priority-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=o.includes(_.value)}),sp())}const r=t.get("assignee");r&&Ib(r);const l=t.get("project");l&&(e(!0),ct(l),e(!1));const c=t.get("sprint");if(c){const w=document.getElementById("sprint-filter");w&&(w.value=c)}const d=t.get("issue_type");if(d){const w=document.getElementById("issue-type-filter");w&&(w.value=d)}const u=t.getAll("label");if(u.length>0){const w=document.getElementById("label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=u.includes(_.value)}),Ma())}const f=t.getAll("exclude_label");if(f.length>0){const w=document.getElementById("exclude-label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=f.includes(_.value)}),ja())}const g=t.get("groupBy");if(g){const w=document.getElementById("group-by-select");w&&(w.value=g)}const v=t.get("sort");if(v){const w=document.getElementById("sort-by-select");w&&(w.value=v)}}function ip(){const e=sn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=si(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=Ie(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function sp(){const e=Bn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=De(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Ma(){var i,s;const e=Dn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function ja(){var i,s;const e=Mn(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function ap(){if(!T())return;let e;try{e=await h.getLabels(T().id)}catch(t){console.error("Failed to load labels for filter:",t);return}op("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),op("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function op(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${ee(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${p(r.name)}</span>
                </span>
            `,a.appendChild(l)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}function rp(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function lp(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const u=d[1],f=document.createElement("a");f.href=`#/issue/${u}`,f.className="issue-link",f.textContent=u,o.appendChild(f),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+d[3],o.appendChild(u),r=d.index+d[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function Zr(e){if(!e)return"";const t=Je(e),n=document.createElement("div");return n.innerHTML=t,rp(n,lp),n.innerHTML}function jn(e){if(!e)return"";const t=Je(e),n=document.createElement("div");return n.innerHTML=t,rp(n,lp),n.innerHTML}const Vb={remove:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'},cp=(e,t,n)=>`<a href="/issue/${encodeURIComponent(t)}" class="related-link" data-action="navigate-issue" data-issue-id="${m(e)}" data-identifier="${m(t)}"><span class="related-id">${p(t)}</span><span class="related-title">${p(n)}</span></a>`;function Wb(e){return e.relation_type==="blocked_by"||e.relation_type==="blocks"&&e.direction==="incoming"?"Blocked by":e.relation_type==="blocks"?"Blocks":e.relation_type==="duplicates"?e.direction==="incoming"?"Duplicated by":"Duplicates":"Related"}const dp={"Blocked by":0,"Sub-issue":1,Blocks:2,Duplicates:3,"Duplicated by":3,Related:4};function Kb(e,t=[],n=[],{formatEstimate:i=null}={}){const s=o=>o.estimate==null?"":` · ${p(i?i(o.estimate,o.project_id||e.project_id):`${o.estimate} pts`)}`,a=[...(t||[]).map(o=>({kind:"Sub-issue",html:`
                <li class="related-row">
                    <span class="related-status">${We(o.status)}</span>
                    ${cp(o.id,o.identifier,o.title)}
                    <span class="related-kind">Sub-issue${s(o)}</span>
                </li>`})),...(n||[]).map(o=>{const r=Wb(o);return{kind:r,html:`
                <li class="related-row">
                    <span class="related-status">${We(o.related_issue_status)}</span>
                    ${cp(o.related_issue_id,o.related_issue_identifier,o.related_issue_title)}
                    <span class="related-kind${r==="Blocked by"?" blocked":""}">${r}</span>
                    <button type="button" class="related-remove" data-action="remove-relation" data-issue-id="${m(e.id)}" data-relation-id="${m(o.id)}" title="Remove link" aria-label="Remove link to ${m(o.related_issue_identifier)}">${Vb.remove}</button>
                </li>`}})].sort((o,r)=>dp[o.kind]-dp[r.kind]);return`
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
        </section>`}const Yb=e=>e&&e.is_agent?` title="${m(e.owner_name?`AI agent of ${e.owner_name}`:"AI agent")}"`:"";function Qb(e){return`
        <li class="comment timeline-comment">
            <div class="comment-avatar">${p((e.author_name||"U").charAt(0).toUpperCase())}</div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-author"${Yb(e.author)}>${p(e.author_name||"User")}</span>
                    <span class="comment-date">${p(rt(e.created_at))}</span>
                </div>
                <div class="comment-content markdown-body">${Zr(e.content).trim()}</div>
            </div>
        </li>`}const up=(e,t,n=!1)=>`<details class="timeline-note"${n?" open":""}><summary>${e}</summary><div class="markdown-body comment-content">${Zr(t).trim()}</div></details>`;function Zb(e,{formatText:t,formatActor:n,gateShowsIt:i,awaitingReview:s}){let a,o="",r="";return e.activity_type==="ritual_attested"?(a=`Attested <b>${p(e.field_name||"a ritual")}</b>`,i?o=' · <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">waiting for review ↑</button>':(s&&(o=" · waiting for review"),e.new_value&&(r=up("Note",e.new_value)))):e.activity_type==="ritual_rejected"?(a=`Sent back <b>${p(e.field_name||"a ritual")}</b>`,e.new_value&&(r=up("Reason",e.new_value,!0))):a=t(e),`
        <li class="timeline-event${e.activity_type==="ritual_rejected"?" sent-back":""}">
            <span class="timeline-dot" aria-hidden="true"></span>
            <div class="timeline-event-body">
                <span class="timeline-text">${a}</span>${o}
                <span class="timeline-meta">· ${p(n(e))} · ${p(rt(e.created_at))}</span>
                ${r}
            </div>
        </li>`}function Xb(e,t){const n=new Set((e||[]).filter(s=>s.activity_type==="ritual_attested").map(s=>s.field_name));return[...t&&t.pending_rituals||[],...t&&t.completed_rituals||[]].filter(s=>s.attestation&&!n.has(s.name)).map(s=>({activity_type:"ritual_attested",field_name:s.name,new_value:s.attestation.note||null,user_name:s.attestation.attested_by_name||null,user:s.attestation.attester||null,created_at:s.attestation.attested_at}))}function Jb({comments:e=[],activities:t=[],ritualStatus:n=null,gateRitualName:i=null,activitiesTruncated:s=!1,commentsLoadFailed:a=!1,issueId:o},r){const l=new Set((n&&n.pending_rituals||[]).filter(g=>g.attestation&&!g.attestation.approved_at).map(g=>g.name)),c=[...t||[],...Xb(t,n)],d=new Map;for(const g of c){if(g.activity_type!=="ritual_attested"||!l.has(g.field_name))continue;const v=d.get(g.field_name);(!v||new Date(g.created_at)>new Date(v.created_at))&&d.set(g.field_name,g)}const u=[...(e||[]).map(g=>({at:g.created_at,html:Qb(g)})),...c.filter(g=>g.activity_type!=="commented").map(g=>{const v=d.get(g.field_name)===g;return{at:g.created_at,html:Zb(g,{...r,awaitingReview:v,gateShowsIt:v&&g.field_name===i})}})].sort((g,v)=>new Date(g.at)-new Date(v.at)),f=(e||[]).length;return`
        <section class="issue-detail-section ticket-timeline" id="comments-section" aria-label="Comments and activity">
            <h3>Activity${f?` <span class="section-count">· ${f} ${f===1?"comment":"comments"}</span>`:""}</h3>
            ${a?`
                <div class="comments-error">
                    Comments failed to load.
                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${m(o)}">Retry</button>
                </div>`:""}
            ${s?'<div class="timeline-truncated">Older activity is not shown.</div>':""}
            ${u.length?`<ol class="timeline comments-list">${u.map(g=>g.html).join("")}</ol>`:a?"":'<div class="comments-empty">No comments yet</div>'}
        </section>`}function pp(e,t,{formatEstimate:n=null}={}){const i=[`${We(e.status)}<span>${p(Ie(e.status))}</span>`,p(t||"Unassigned"),p(De(e.priority)),p(vt(e.issue_type))];return e.estimate!=null&&i.push(p(n?n(e.estimate,e.project_id):`${e.estimate} pts`)),`<div class="issue-meta-line">${i.map(s=>`<span class="issue-meta-part">${s}</span>`).join('<span class="issue-meta-sep" aria-hidden="true">·</span>')}</div>`}const mp=Nr,ey=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let Lt=[],fp=Promise.resolve();const ty={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};function Ra(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const ny={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function gp(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function ai(){return!!document.querySelector(".inline-dropdown")}function hp(){return Lt}function vp(e){Lt=e}async function Xr(e,t,n,i){var u,f,g,v;e.preventDefault(),Ft();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${mp.map((y,w)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="status" data-value="${y}">
                    ${We(y)}
                    <span>${Ie(y)}</span>
                    <span class="dropdown-shortcut">${w+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${Or.map((y,w)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="priority" data-value="${y}">
                    ${pt(y)}
                    <span>${De(y)}</span>
                    <span class="dropdown-shortcut">${w}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${ey.map(y=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="issue_type" data-value="${y}">
                    <span class="issue-type-badge type-${y}">${vt(y)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const y=we(),w=te().find(_=>_.id===n)||Xe().find(_=>_.id===n)||((y==null?void 0:y.id)===n?y:null),S=cs({keepId:(w==null?void 0:w.assignee_id)||null});o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${S.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:S.map(({assignee:_,indent:D},M)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="${m(_.id)}">
                    ${Ut(_,"avatar-small")}
                    <span>${Ca(_,D)}</span>
                    ${M<9?`<span class="dropdown-shortcut">${M+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const y=document.querySelector(`.issue-row[data-issue-id="${n}"]`),w=(y==null?void 0:y.dataset.projectId)||((u=we())==null?void 0:u.project_id),S=wi(w);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${S.map((_,D)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="estimate" data-value="${_.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${_.label}</span>
                    ${D<9?`<span class="dropdown-shortcut">${D}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const y=te(),w=Xe(),S=we(),_=y.find(R=>R.id===n)||w.find(R=>R.id===n)||S,D=new Set(((_==null?void 0:_.labels)||[]).map(R=>R.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const M=o.getBoundingClientRect();let ne=a.bottom+4,E=a.left;E+M.width>window.innerWidth-8&&(E=a.right-M.width),ne+M.height>window.innerHeight-8&&(ne=a.top-M.height-4),o.style.top=`${ne}px`,o.style.left=`${Math.max(8,E)}px`,ns(o,{multiSelect:!0});let P=[];const G=T();if(G)try{P=await h.getLabels(G.id)}catch(R){console.error("Failed to load labels:",R)}if(!o.parentNode)return;yp(o,n,P,D);const W=o.getBoundingClientRect();let Ee=a.bottom+4,x=a.left;x+W.width>window.innerWidth-8&&(x=a.right-W.width),Ee+W.height>window.innerHeight-8&&(Ee=a.top-W.height-4),o.style.top=`${Ee}px`,o.style.left=`${Math.max(8,x)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const y=te(),w=Xe(),S=we(),_=y.find(C=>C.id===n)||w.find(C=>C.id===n)||S,D=(_==null?void 0:_.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const M=o.getBoundingClientRect();let ne=a.bottom+4,E=a.left;E+M.width>window.innerWidth-8&&(E=a.right-M.width),ne+M.height>window.innerHeight-8&&(ne=a.top-M.height-4),o.style.top=`${ne}px`,o.style.left=`${Math.max(8,E)}px`,ns(o);let P=[];if(D)try{P=await h.getSprints(D),l$(D,P)}catch(C){console.error("Failed to load sprints:",C)}if(!o.parentNode)return;const G=P.filter(C=>C.status!=="completed"||C.id===(_==null?void 0:_.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${G.map((C,Q)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="${m(C.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${p(C.name)}${C.status==="active"?" (Active)":""}</span>
                    ${Q<9?`<span class="dropdown-shortcut">${Q+1}</span>`:""}
                </button>
            `).join("")}
        `;const W=o.getBoundingClientRect();let Ee=a.bottom+4,x=a.left;x+W.width>window.innerWidth-8&&(x=a.right-W.width),Ee+W.height>window.innerHeight-8&&(Ee=a.top-W.height-4),o.style.top=`${Ee}px`,o.style.left=`${Math.max(8,x)}px`,o.classList.remove("dropdown-positioning");const R=C=>{const Q=C.key;if(Q==="Escape"||Q==="Tab"){Ft(),document.removeEventListener("keydown",R),ts(null);return}if(gp(C,o))return;const _e=parseInt(Q);if(isNaN(_e))return;const de=o.querySelectorAll(".dropdown-option");let gt=!1;_e===0?(oi(n,"sprint_id",null),gt=!0):_e>=1&&_e<de.length&&(de[_e].click(),gt=!0),gt&&(document.removeEventListener("keydown",R),ts(null))};ts(R),document.addEventListener("keydown",R),(g=o.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let l=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),l+r.height>window.innerHeight-8&&(l=a.top-r.height-4),o.style.top=`${l}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const d=y=>{const w=y.key;if(w==="Escape"||w==="Tab"){Ft(),document.removeEventListener("keydown",d);return}if(gp(y,o))return;const S=parseInt(w);if(isNaN(S))return;let _=!1;if(t==="status"&&S>=1&&S<=6)oi(n,"status",mp[S-1]),_=!0;else if(t==="priority"&&S>=0&&S<=4)oi(n,"priority",Or[S]),_=!0;else if(t==="estimate"){const D=we(),M=wi(D==null?void 0:D.project_id);S>=0&&S<M.length&&(oi(n,"estimate",M[S].value),_=!0)}_&&(document.removeEventListener("keydown",d),ts(null))};ts(d),document.addEventListener("keydown",d),(v=o.querySelector(".dropdown-option[data-action]"))==null||v.focus(),ns(o)}function iy(e,t,n,i){Xr(e,t,n,i)}function sy(e,t,n){fp=fp.then(()=>bp(e,t,n))}async function bp(e,t,n){const i=te(),s=Xe(),a=we(),o=i.find(d=>d.id===e)||s.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const d=await h.updateIssue(e,{label_ids:c}),u=d.labels||[],f=_=>({..._,labels:u,updated_at:d.updated_at??_.updated_at}),g=te();g.some(_=>_.id===e)&&Qe(g.map(_=>_.id===e?f(_):_));const v=Xe();v.some(_=>_.id===e)&&An(v.map(_=>_.id===e?f(_):_));const y=we();(y==null?void 0:y.id)===e&&ei(f(y));const w=Ra(e);if(w&&w.parentNode){const _=te().find(D=>D.id===e)||Xe().find(D=>D.id===e);_&&(w.outerHTML=ui(_))}const S=document.querySelector(".property-labels-btn");S&&(S.innerHTML=u.length>0?u.map(_=>`
                    <span class="issue-label" style="background: ${ee(_.color)}20; color: ${ee(_.color)}">${p(_.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if($("update labels",d),n){const u=l>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function yp(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${m(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${m(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${m(t)}" data-label-id="${m(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${ee(s.color)}20; color: ${ee(s.color)}">${p(s.name)}</span>
                </button>
            `}).join("")}
    `}async function wp(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=T();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await h.createLabel(i.id,{name:s}),o=await h.getLabels(i.id);as(o),a!=null&&a.id&&await bp(e,a.id,null);const r=te(),l=Xe(),c=we(),d=r.find(f=>f.id===e)||l.find(f=>f.id===e)||c,u=new Set(((d==null?void 0:d.labels)||[]).map(f=>f.id));t&&yp(t,e,o,u),n.value=""}catch(a){$("create label",a)}finally{n.disabled=!1,n.focus()}}}function Pa(){const e=document.getElementById("create-issue-labels-label");e&&(Lt.length===0?e.textContent="Labels":e.textContent=`Labels (${Lt.length})`)}function Jr(e,{failed:t=!1}={}){const n=jr();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=Lt.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${m(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${ee(i.color)}20; color: ${ee(i.color)}">${p(i.name)}</span>
                </button>
            `}).join("")}
    `}function ay(e){const t=Lt.indexOf(e);t>=0?Lt.splice(t,1):Lt.push(e),Br(),Pa();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Jr(n)}async function kp(){const e=T();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await h.createLabel(e.id,{name:i}),a=await h.getLabels(e.id);as(a),s!=null&&s.id&&!Lt.includes(s.id)&&(Lt.push(s.id),Br()),Pa(),t&&Jr(t),n.value=""}catch(s){$("create label",s)}finally{n.disabled=!1,n.focus()}}}async function oi(e,t,n){var r;Ft();const i=cy(e,t,n),s=py(e,t),a=(r=Hr(e))==null?void 0:r[t],o=Ep(e,t,()=>n);o&&el(e,t,{focus:!0});try{const l={};l[t]=n;const c=await h.updateIssue(e,l);if(!c||!c.id)throw new Error("Invalid response from server");if(ps(c),$p(e,t,i)){const d={...c,...uy(e,t)};my(e,{issue:d,myIssue:d,detail:d}),La(d),el(e,t,{focus:!o})}}catch(l){if($("update issue",l),$p(e,t,i)){Ep(e,t,(d,u)=>d[t]===n?s[u]:d[t]);const c=Hr(e);c&&c[t]===n&&La({...c,[t]:a}),el(e,t,{focus:!1})}return}finally{dy(e,t,i)}if(k("Issue updated","success"),t==="status")try{const l=K();if(l){const d=(await h.getSprints(l)).find(u=>u.status==="active");tl(d||null)}}catch{}}const oy=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),an=new Map;function ry(e){const t=e&&an.get(e.id);if(!(t!=null&&t.size))return e;const n={...e};return t.forEach((i,s)=>{n[s]=i.value}),n}let ly=0;function cy(e,t,n){const i=++ly;return an.has(e)||an.set(e,new Map),an.get(e).set(t,{seq:i,value:n}),i}function $p(e,t,n){var i,s;return((s=(i=an.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function dy(e,t,n){var s;const i=an.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&an.delete(e))}function uy(e,t){var i;const n={};return(i=an.get(e))==null||i.forEach((s,a)=>{a!==t&&(n[a]=s.value)}),n}function py(e,t){var i,s;const n=we();return{issue:(i=te().find(a=>a.id===e))==null?void 0:i[t],myIssue:(s=Xe().find(a=>a.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0}}function Ep(e,t,n){const i=(l,c)=>({...l,[t]:n(l,c)});let s=!1;const a=te();a.some(l=>l.id===e)&&(s=!0,Qe(a.map(l=>l.id===e?i(l,"issue"):l)));const o=Xe();o.some(l=>l.id===e)&&(s=!0,An(o.map(l=>l.id===e?i(l,"myIssue"):l)));const r=we();return(r==null?void 0:r.id)===e&&(s=!0,ei(i(r,"detail"))),s}function my(e,t){var s;const n=te();t.issue&&n.some(a=>a.id===e)&&Qe(n.map(a=>a.id===e?t.issue:a));const i=Xe();t.myIssue&&i.some(a=>a.id===e)&&An(i.map(a=>a.id===e?t.myIssue:a)),t.detail&&((s=we())==null?void 0:s.id)===e&&ei(t.detail)}function fy(e){return e==="estimate"||ty[Da()]===e}function gy(e,t,n,{focus:i}){var d;const s=Ra(e);if(!s||!s.parentNode||!n)return;const a=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&fy(t)&&te().some(u=>u.id===e))ut();else if(t==="status"&&s.closest("#my-issues-list"))Cn();else{const u=s.classList.contains("keyboard-selected");s.outerHTML=ui(n),u&&((d=Ra(e))==null||d.classList.add("keyboard-selected"))}if(!i&&!a)return;const r=Ra(e),l=ny[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus({preventScroll:!0})}function el(e,t,{focus:n}){const i=te().find(a=>a.id===e)||Xe().find(a=>a.id===e);i&&La(i),gy(e,t,i,{focus:n});const s=we();(s==null?void 0:s.id)===e&&oy.has(t)&&hy(t,s)}function hy(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".issue-meta-line");if(i){const c=t.assignee_id?yt(t.assignee_id):null;i.outerHTML=pp(t,c?dt(c):null,{formatEstimate:mn})}const s=n.querySelector(".detail-sidebar");if(!s)return;let a=e;e==="assignee_id"&&(a="assignee"),e==="sprint_id"&&(a="sprint"),e==="issue_type"&&(a="type");const o=s.querySelectorAll(".property-row");let r=null;for(const c of o){const d=c.querySelector(".property-label");if(d&&d.textContent.toLowerCase()===a.toLowerCase()){r=c;break}}if(!r)return;const l=r.querySelector(".property-value");if(l){if(e==="status")l.innerHTML=`
            ${We(t.status)}
            <span>${Ie(t.status)}</span>
        `;else if(e==="priority")l.innerHTML=`
            ${pt(t.priority)}
            <span>${De(t.priority)}</span>
        `;else if(e==="issue_type")l.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${vt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?yt(t.assignee_id):null,d=c?dt(c):null;l.innerHTML=d?`${Ut(c,"avatar-small")}<span>${p(d)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=ab(),d=t.sprint_id&&c?c.find(u=>u.id===t.sprint_id):null;l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${d?p(d.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${mn(t.estimate,t.project_id)}</span>
        `);l.classList.add("updated"),setTimeout(()=>l.classList.remove("updated"),500),l==null||l.focus()}}ie({"update-issue-field":(e,t)=>{e.type==="keydown"&&e.preventDefault();const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?oi(t.issueId,i,n==="null"?null:Number(n)):oi(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{e.type==="keydown"&&e.preventDefault(),sy(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{wp(t.issueId)},"toggle-create-issue-label":(e,t)=>{ay(t.labelId)},"create-label-for-create-issue":()=>{kp()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),wp(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),kp())}});function qa(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",_p)},0))}function _p(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",_p))}function vy(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",ri)):(e.classList.remove("hidden"),e.classList.remove("show-options"),Me(),Ue(_u()),setTimeout(()=>{document.addEventListener("click",ri)},0))}function by(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",ri)):(e.classList.remove("hidden"),Ty(),setTimeout(()=>{document.addEventListener("click",ri)},0))}function ri(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",ri))}function Rn(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",ri)}function Me(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=K();e.innerHTML=Ju.map(n=>{const i=tp(n.key),s=_u()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${m(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function Ue(e){Yv(e),Me();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":wy(t);break;case"status":ky(t);break;case"priority":$y(t);break;case"type":Ey(t);break;case"assignee":_y(t);break;case"sprint":xy(t);break;case"labels":Iy(t);break;case"exclude_labels":Sy(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function yy(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),Me()}function wy(e){const t=K()||"",n=X()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${t?'<button class="filter-options-clear" data-action="set-project-filter" data-value="">Clear</button>':""}
        </div>
        <label class="filter-option" data-action="set-project-filter" data-value="">
            <input type="radio" name="project-filter-radio" value="" ${t?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;n.forEach(s=>{i+=`
            <label class="filter-option" data-action="set-project-filter" data-value="${m(s.id)}">
                <input type="radio" name="project-filter-radio" value="${m(s.id)}" ${t===s.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ee(s.color)};"></span>
                <span class="filter-option-label">${p(s.name)}</span>
            </label>
        `}),e.innerHTML=i}function ky(e){const t=sn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=si(t);let s=`
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
        `}),e.innerHTML=s}function $y(e){const t=Bn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function Ey(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${m(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function _y(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"";let i=`
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
    `;cs({keepId:n||null}).forEach(({assignee:s,indent:a})=>{i+=`
            <label class="filter-option" data-action="set-assignee-filter" data-value="${m(s.id)}">
                <input type="radio" name="assignee-filter-radio" value="${m(s.id)}" ${n===s.id?"checked":""}>
                <span class="filter-option-label">${Ca(s,a)}</span>
            </label>
        `}),e.innerHTML=i}function xy(e){if(!K()){e.innerHTML=`
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
        `}),e.innerHTML=a}function Iy(e){const t=Dn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${m(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${m(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ee(d)};"></span>
                    <span class="filter-option-label">${p(c)}</span>
                </label>
            `}),e.innerHTML=s}function Sy(e){const t=Mn(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${m(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${m(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ee(d)};"></span>
                    <span class="filter-option-label">${p(c)}</span>
                </label>
            `}),e.innerHTML=s}function Ty(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function Ge(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=K();if(n){const f=(X()||[]).find(g=>g.id===n);t.push({category:"project",label:"Project",value:(f==null?void 0:f.name)||"Unknown",clearAction:"clear-project-filter"})}const i=sn();if(i.length>0){const u=si(i),f=u==="open"?"Open":u==="closed"?"Closed":i.map(g=>Ie(g)).join(", ");t.push({category:"status",label:"Status",value:f,clearAction:"clear-status-filter-new"})}const s=Bn();if(s.length>0){const u=s.map(f=>De(f)).join(", ");t.push({category:"priority",label:"Priority",value:u,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const u=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:u?u.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let u;o.value==="me"?u="Me":o.value==="unassigned"?u="Unassigned":u=dt(yt(o.value))||"Unknown",t.push({category:"assignee",label:"Assignee",value:u,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const u=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(u==null?void 0:u.text)||r.value,clearAction:"clear-sprint-filter"})}const l=Dn();if(l.length>0){const u=document.getElementById("label-filter-dropdown"),f=l.map(g=>{var w;const v=u==null?void 0:u.querySelector(`input[value="${g}"]`),y=(w=v==null?void 0:v.closest("label"))==null?void 0:w.querySelector(".label-name");return(y==null?void 0:y.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:f,clearAction:"clear-label-filter-new"})}const c=Mn();if(c.length>0){const u=document.getElementById("exclude-label-filter-dropdown"),f=c.map(g=>{var w;const v=u==null?void 0:u.querySelector(`input[value="${g}"]`),y=(w=v==null?void 0:v.closest("label"))==null?void 0:w.querySelector(".label-name");return(y==null?void 0:y.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:f,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(u=>`
        <span class="filter-chip" title="${m(u.label)}: ${m(u.value)}">
            <span class="filter-chip-label">${u.label}:</span>
            <span class="filter-chip-value">${p(u.value)}</span>
            <button class="filter-chip-remove" data-action="${u.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=d}function ze(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Qr();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function xp(){const e=document.getElementById("sprint-filter");if(!e)return;const t=K(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",tl(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await h.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${p(a.name)})</option>`),xm(t,a==null?void 0:a.id),tl(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${p(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function tl(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${p(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${p(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function Ly(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let Ip=!1;lt(e=>{if(e!=="currentProject"||A()!=="issues"||Ip)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([xp(),ap()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),Ma(),ja(),st(),Ge(),ze()}).catch(n=>{console.error("Failed to update filters on project switch:",n),st(),Ge(),ze()})});function Ay(){zb(e=>{Ip=e})}function Na(){ip(),st(),Ge(),ze()}function Oa(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Na()}function nl(){sp(),st(),Ge(),ze()}function il(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),nl()}function sl(){Ma(),st(),Ge(),ze()}function Ha(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),sl()}function al(){ja(),st(),Ge(),ze()}function Fa(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),al()}function Cy(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function Sp(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${Cy(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let ms=0;function fs(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function Tp(){var t,n,i,s,a,o;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=T())==null?void 0:t.id)||"",project:K()||"",status:[...sn()].sort(),priority:[...Bn()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim())||""})}let on=null;function By(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function li(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function Lp(e,t){li(!1),Aa(e),Qe(t),A()==="issues"&&St(t),ut(),on=e,fs(db(e).hiddenClosed||0)}function Dy(e,t,{loading:n}){Aa(null),Qe(t),A()==="issues"&&St(t),ut(),li(n),on=e,fs(0)}function Ap(){Aa(null),on=null,li(!1),Ly(),fs(0)}function My(){const e=document.getElementById("issues-list");fs(0),e!=null&&e.querySelector(".issue-row")?li(!0):Ap()}function jy(){const e=hb(Tp()),t=e?Ru(e):null;return t?(Tn(-1),Lp(e,t),!0):(Ap(),!1)}function Ry(e,t,n,i=()=>!0){if(!Array.isArray(t))return t;const s=new Map(e.map(c=>[c.id,c])),a=new Set(t.map(c=>c.id)),o=new Set(t.filter(c=>!n.has(c.id)).map(c=>c.title)),r=e.filter(c=>!n.has(c.id)&&!a.has(c.id)&&!(c._isOptimistic&&o.has(c.title))&&(c._isOptimistic||i(c))),l=[];for(const c of t){const d=s.get(c.id);if(!d&&n.has(c.id))continue;const u=d&&Pu(d.updated_at,c.updated_at)?d:c;l.push(ry(u))}return r.length?[...r,...l]:l}async function At(){var w,S,_,D,M,ne,E;Tn(-1),By();const e=++ms;if(!T())return;const t=K()||"",n=sn(),i=Bn(),s=(w=document.getElementById("assignee-filter"))==null?void 0:w.value,a=(_=(S=document.getElementById("issue-search"))==null?void 0:S.value)==null?void 0:_.trim();if(!t&&X().length===0){on=null,document.getElementById("issues-list").innerHTML=F({icon:O.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const o=Tp(),r={limit:1e3},l=((D=document.getElementById("sort-by-select"))==null?void 0:D.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(M=ye())==null?void 0:M.id:r.assignee_id=s);const u=(ne=document.getElementById("sprint-filter"))==null?void 0:ne.value;if(u)if(u==="current"){if(t){const P=c$(t);if(P!==void 0)P&&(r.sprint_id=P);else try{const W=(await h.getSprints(t)).find(Ee=>Ee.status==="active");xm(t,W==null?void 0:W.id),W&&(r.sprint_id=W.id)}catch(G){console.error("Failed to resolve current sprint:",G)}}}else r.sprint_id=u;const f=(E=document.getElementById("issue-type-filter"))==null?void 0:E.value;f&&(r.issue_type=f),a&&a.length>=1?r.search=a:r.fields="list";let g=!1,v=!1,y=null;try{const P=Sp(Dn(),"label-filter-dropdown");P.length>0&&(r.label=P,r.label_match="any");const G=Sp(Mn(),"exclude-label-filter-dropdown");G.length>0&&(r.exclude_label=G),t&&(r.project_id=t);const W=t||`team:${T().id}`;y=Mu({...r,scope:W});const Ee=Ru(y);if(Ee)g=!0,on===y&&gb()===y&&Hu(te(),Ee)||Lp(y,Ee);else{const J=$b({...r,scope:W});J&&(J.complete||J.rows.length>0)?(v=!0,Dy(y,J.rows,{loading:!J.complete})):My()}const x=J=>t?h.getIssues(J):X().length>0?h.getTeamIssues(T().id,J):Promise.resolve(void 0),R=r.search&&si(n)==="open"?x({...r,status:Yr}).then(J=>Array.isArray(J)?J.length:0).catch(J=>(console.error("Failed to count closed search matches:",J),0)):Promise.resolve(0),C=new Set(te().map(J=>J.id)),Q=await x(r);if(qu(y,Q),e!==ms)return;Nu(o,y);const _e=(g||v)&&on===y,de=_e?Ry(te(),Q,C,Gu(r)):Q,gt=_e&&Hu(te(),de);Aa(y),Qe(de),A()==="issues"&&St(Array.isArray(de)?de.filter(J=>!J._isOptimistic):de);const L=[...new Set(de.map(J=>J.project_id).filter(Boolean))],ue=Object.keys(fo()).length;if(await _m(L),e!==ms)return;const ge=Object.keys(fo()).length!==ue;(!gt||ge)&&ut(),on=y,li(!1);const pe=await R;if(pb(y,{hiddenClosed:pe}),e!==ms)return;fs(pe)}catch(P){if(e!==ms)return;li(!1);const G=(P==null?void 0:P.status)===403||(P==null?void 0:P.status)===404;if(g&&!G){$("refresh issues",P);return}G&&y&&mb(y),on=null;const W=document.getElementById("issues-list");W&&(W.innerHTML=F({icon:O.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),$("load issues",P)}}function Py(){clearTimeout(nb()),ib(setTimeout(()=>{At()},300))}function st(){np(),At()}async function Cp(){if(np(),Da()==="sprint"){const e=te(),t=[...new Set(e.map(n=>n.project_id))];await _m(t)}ut()}function qy(){Ge(),ze()}function Bp(e){ct(e),Me(),Ue("project"),Rn()}function Ny(){Bp("")}function Oy(e){const t=e==="open"?rs:e==="closed"?Yr:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),Na(),Me(),Ue("status")}function Hy(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Na()),Me(),Ue("status")}function Fy(){Oa(),Me(),Ue("status"),Ge(),ze()}function Uy(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,nl()),Me(),Ue("priority")}function Gy(){il(),Me(),Ue("priority"),Ge(),ze()}function Dp(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,st()),Me(),Ue("type"),Ge(),ze(),Rn()}function zy(){Dp("")}function Mp(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,st()),Me(),Ue("assignee"),Ge(),ze(),Rn()}function Vy(){Mp("")}function jp(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,st()),Me(),Ue("sprint"),Ge(),ze(),Rn()}function Wy(){jp("")}function Ky(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,sl()),Me(),Ue("labels")}function Yy(){Ha(),Me(),Ue("labels"),Ge(),ze()}function Qy(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,al()),Me(),Ue("exclude_labels")}function Zy(){Fa(),Me(),Ue("exclude_labels"),Ge(),ze()}function Xy(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,At()),Rn()}function Jy(e){const t=document.getElementById("group-by-select");t&&(t.value=e,Cp()),Rn()}function ew(){ct(null),Oa(),il();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),Ha(),Fa(),st(),Ge(),ze()}ie({"update-label-filter":()=>sl(),"clear-label-filter":()=>Ha(),"update-exclude-label-filter":()=>al(),"clear-exclude-label-filter":()=>Fa(),"show-filter-category":(e,t)=>{var n,i;Ue(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{yy();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>Bp(t.value),"clear-project-filter":()=>Ny(),"clear-status-filter-new":()=>Fy(),"set-status-preset":(e,t)=>Oy(t.value),"show-all-statuses":()=>Oa(),"toggle-status-option":(e,t)=>Hy(t.filterValue,e),"clear-priority-filter-new":()=>Gy(),"toggle-priority-option":(e,t)=>Uy(t.filterValue,e),"set-type-filter":(e,t)=>Dp(t.value),"clear-type-filter":()=>zy(),"set-assignee-filter":(e,t)=>Mp(t.value),"clear-assignee-filter":()=>Vy(),"set-sprint-filter":(e,t)=>jp(t.value),"clear-sprint-filter":()=>Wy(),"clear-label-filter-new":()=>Yy(),"toggle-label-option":(e,t)=>Ky(t.filterValue,e),"clear-exclude-label-filter-new":()=>Zy(),"toggle-exclude-label-option":(e,t)=>Qy(t.filterValue,e),"set-sort":(e,t)=>Xy(t.value),"set-group-by":(e,t)=>Jy(t.value),"clear-all-filters":()=>ew(),"retry-load-issues":()=>At()});const Rp=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function rn(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function ci(e){const t=rn(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const tw=60,nw=150;let Ve=[],gs=1/0,ln=null,Ua=null,hs=null;const Ga=new Map;let di=null,za=[],vs=null;const Pp=e=>{var t;return`${((t=ye())==null?void 0:t.id)??""}|${e}`},iw=24;function sw(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(tw,Math.ceil((e+2*t)/iw))}function cn(e,t){if(e!==null&&(di!=null&&di.has(String(e))))return za.push({groupKey:e,ids:t.map(i=>i.id)}),"";const n=t.slice(0,Math.max(0,gs));return gs-=n.length,n.length<t.length&&Ve.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>ui(i)).join("")}function qp(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function Np(){clearTimeout(ln),ln=null,rl++,Ve=[],Ua=null,vs=null,hs=null}function ol(e=1/0){if(Ve.length===0)return;const t=document.getElementById("issues-list");if(!t||!(hs!=null&&hs.isConnected)){Np();return}const n=new Map(te().map(s=>[s.id,s]));let i=e;for(;Ve.length>0&&i>0;){const s=Ve[0],a=s.ids.slice(0,i),o=qp(t,s.groupKey),r=a.map(l=>n.get(l)).filter(Boolean).map(l=>ui(l)).join("");o==null||o.insertAdjacentHTML("beforeend",r),i-=a.length,a.length===s.ids.length?Ve.shift():s.ids=s.ids.slice(a.length)}if(vs){const s=vs;Va(t,s.issueId)&&(vs=null,Gp(t,s))}if(Ve.length===0){clearTimeout(ln),ln=null;const s=Ua;Ua=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&Op(s)}}const aw=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{ln=setTimeout(e,0)}):ln=setTimeout(e,16);let rl=0;function ow(){if(clearTimeout(ln),Ve.length===0)return;const e=++rl;aw(function t(){e===rl&&(ol(nw),Ve.length>0&&(ln=setTimeout(t,0)))})}function ut(){var d,u;const e=document.getElementById("issues-list");if(!e)return;const t=e.querySelector(".issue-row.keyboard-selected"),n=t==null?void 0:t.dataset.issueId,i=hw(e),s=f=>{var g;return((g=f==null?void 0:f.closest(".issue-group"))==null?void 0:g.dataset.group)??null},a=[[n,s(t)],[i==null?void 0:i.issueId,s(i==null?void 0:i.row)]];e.classList.add("issue-list-linear"),Np(),gs=sw();const o=te();if(o.length===0){const f=(u=(d=document.getElementById("issue-search"))==null?void 0:d.value)==null?void 0:u.trim(),g=Qr()>0,v=f&&f.length>=2;if(g||v){const y=Qr(),w=[];v&&w.push(`search "${f}"`),g&&w.push(`${y} active filter${y>1?"s":""}`),e.innerHTML=F({icon:O.issues,heading:"No matching issues",description:`No issues match your ${w.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=F({icon:O.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Tn(-1),gs=1/0;return}const r=Da();di=Ga.get(Pp(r))||null,za=[],r==="status"?rw(e,o):r==="priority"?lw(e,o):r==="type"?cw(e,o):r==="assignee"?dw(e,o):r==="sprint"?uw(e,o):e.innerHTML=ci(o)+cn(null,o),gs=1/0,hs=e.firstElementChild,Ve.push(...za),za=[];const l=di;di=null,l!=null&&l.size&&(e.querySelectorAll(".issue-group").forEach(f=>{l.has(f.dataset.group)&&Fp(f,!0)}),a.forEach(([f,g])=>{f&&gw(f,e,g)})),i&&(Va(e,i.issueId)?Gp(e,i):Ve.length>0&&(vs=i));const c=!!n&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),f=>f.dataset.issueId===n);n&&Ve.length>0&&!c?Ua=n:Op(n),ow()}function Op(e){const t=xu();if(t<0)return;const n=document.querySelectorAll(Sa);if(n.length===0){Tn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),Tn(i),n[i].classList.add("keyboard-selected")}function rw(e,t){const n={};Nr.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=ci(t);Nr.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${We(s)}</span>
                    <span class="group-title">${Ie(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${rn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${cn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function lw(e,t){const n={};Cu.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=ci(t);Cu.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${pt(s)}</span>
                    <span class="group-title">${De(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${rn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${cn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function cw(e,t){const n={};Rp.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=ci(t);Rp.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${vt(s)}</span></span>
                    <span class="group-title">${vt(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${rn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${cn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function dw(e,t){const n={},i="__unassigned__";n[i]=[];const s=cs({includeIdle:!0});s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=ci(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${rn(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${cn(i,n[i])}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=dt(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${m(o.id)}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${m(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ut(o,"avatar-small")}</span>
                    <span class="group-title">${p(l)}${p(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${rn(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${cn(o.id,r)}
                </div>
            </div>
        `}),e.innerHTML=a}function uw(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const a={active:0,planned:1,completed:2},o=fo();s.sort((l,c)=>{const d=o[l],u=o[c],f=d?a[d.status]??3:3,g=u?a[u.status]??3:3;return f-g});let r=ci(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=o[l],u=d?d.name:l,f=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${g}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${p(u)}${f}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${rn(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${cn(g,c)}
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
                    <span class="group-points">${rn(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${cn(n,i[n])}
                </div>
            </div>
        `),e.innerHTML=r}function Hp(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-group"),n=>n.dataset.group===String(t))||null}function Va(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-row"),n=>n.dataset.issueId===t)||null}function pw(e,t){const n=qp(e,t);if(!n)return;const i=new Map(te().map(s=>[s.id,s]));Ve=Ve.filter(s=>{if(String(s.groupKey)!==String(t))return!0;const a=s.ids.map(o=>i.get(o)).filter(Boolean).map(o=>ui(o)).join("");return n.insertAdjacentHTML("beforeend",a),!1})}function Fp(e,t){var n;e.classList.toggle("collapsed",t),(n=e.querySelector(".issue-group-header"))==null||n.setAttribute("aria-expanded",String(!t))}function mw(e,t){const n=Array.from(document.querySelectorAll(Sa)),i=e.querySelector(".issue-row.keyboard-selected");if(!i)return;let s=n.indexOf(i);s<0&&(i.classList.remove("keyboard-selected"),s=n.findIndex(a=>t.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING&&!t.contains(a)),s<0&&(s=n.length-1),s>=0&&n[s].classList.add("keyboard-selected")),Tn(s)}function Up(e,t,n){Fp(t,n);const i=Pp(Da());Ga.has(i)||Ga.set(i,new Set);const s=Ga.get(i);n?s.add(t.dataset.group):(s.delete(t.dataset.group),pw(e,t.dataset.group)),mw(e,t)}function fw(e){const t=document.getElementById("issues-list"),n=t&&Hp(t,e);n&&Up(t,n,!n.classList.contains("collapsed"))}function gw(e,t=document.getElementById("issues-list"),n=void 0){var a;if(!e||!t)return;const i=Ve.find(o=>o.ids.includes(e)),s=i?i.groupKey===null?null:Hp(t,i.groupKey):(a=Va(t,e))==null?void 0:a.closest(".issue-group");s!=null&&s.classList.contains("collapsed")&&(n!==void 0&&s.dataset.group===n||Up(t,s,!1))}function hw(e){var i;const t=document.activeElement;if(!t||t===e||!e.contains(t))return null;const n=t.closest(".issue-row");return n!=null&&n.dataset.issueId?{issueId:n.dataset.issueId,row:n,dropdownType:((i=t.dataset)==null?void 0:i.dropdownType)||null,isTitle:t.classList.contains("issue-title")}:null}function Gp(e,{issueId:t,dropdownType:n,isTitle:i}){if(e.contains(document.activeElement))return;const s=Va(e,t);if(!s)return;const a=n?s.querySelector(`[data-dropdown-type="${n}"]`):i?s.querySelector(".issue-title"):s.querySelector("a[href], button");a==null||a.focus({preventScroll:!0})}function zp(e,t){if(!e)return"";if(!t)return p(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return p(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${p(i)}<mark class="search-match">${p(s)}</mark>${p(a)}`}function vw(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=zp(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}const bw=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function ui(e){var f,g,v;const t=e.assignee_id?yt(e.assignee_id):null,n=t?dt(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":bw.format(i),a=e.estimate!=null?mn(e.estimate,e.project_id):"",o=ko(e.estimate,e.project_id),r=e.sprint_id?fo()[e.sprint_id]:null,l=r?r.name:null,c=(g=(f=document.getElementById("issue-search"))==null?void 0:f.value)==null?void 0:g.trim(),d=!!c&&((v=e.title)==null?void 0:v.toLowerCase().includes(c.toLowerCase())),u=c&&!d?vw(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${m(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${m(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${m(e.id)}" title="Priority: ${De(e.priority)}">
                    ${pt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${m(e.id)}" title="Status: ${Ie(e.status)}">
                    ${We(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${vt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${m(e.id)}">${zp(e.title,c)}${u?` <span class="issue-search-snippet" title="Matched in description">— ${u}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(y=>`
                            <span class="issue-label" style="background: ${ee(y.color)}20; color: ${ee(y.color)}">${p(y.name)}</span>
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
                    ${n?Ut(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function pt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function We(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}ie({"toggle-group":(e,t)=>{if((e==null?void 0:e.type)==="keydown"){if(e.repeat)return;e.preventDefault()}fw(t.group)},"show-inline-dropdown":(e,t,n)=>{Xr(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),oe(t.issueId))}});let pi=[];function Pn(){return pi}function yw(e){pi=Array.isArray(e)?e:[]}function ww(e){const t=e==null?void 0:e.avatar_url,n=m((e==null?void 0:e.name)||"Agent");return t?ku(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${m(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${p(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function kw(e){var t,n;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{const i=await h.getTeamAgents(e);if(((n=T())==null?void 0:n.id)!==e)return;pi=i,ls(bn,Pn),ti()}catch(i){console.error("Failed to load team agents:",i),$("load team agents",i)}}async function Wa(e){var t;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{pi=await h.getTeamAgents(e),ls(bn,Pn),ti(),$w()}catch(n){$("load agents",n)}}function $w(){const e=document.getElementById("agents-list");if(e){if(pi.length===0){e.innerHTML=F({icon:O.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=pi.map(t=>{var l;const n=p(t.name),i=p(t.parent_user_name||"Unknown"),s=t.kind==="session",a=t.can_register?'<span class="agent-scope" title="Registers one identity per session; cannot write as itself">Registrar</span>':s?`<span class="agent-scope" title="Registered by a registrar for one session">Session${t.idle?" · idle":""}</span>`:"",r=!s&&t.is_active!==!1&&(t.parent_user_id===((l=ye())==null?void 0:l.id)||Lo())?`<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${m(t.id)}" data-agent-name="${m(t.name||"Agent")}" data-can-register="${t.can_register?"true":"false"}">${t.can_register?"Stop being a registrar":"Make registrar"}</button>`:"";return`
      <div class="agent-item">
        ${ww(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            ${a}
            <span class="agent-date">Created by ${i} ${it(t.created_at)}</span>
          </div>
        </div>
        ${r}
        <button class="btn btn-secondary" data-action="generate-agent-key" data-agent-id="${m(t.id)}" data-agent-name="${m(t.name||"Agent")}">Generate new key</button>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${m(t.id)}" data-agent-name="${m(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function Ew(){const e=X();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),U()}function Vp(e,t,n=!1){const i=p(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,U()}async function _w(e){var r,l,c,d;e.preventDefault();const t=(r=T())==null?void 0:r.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value,o=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let u;s&&a?u=await h.createProjectAgent(a,n,i,o):u=await h.createTeamAgent(t,n,i,o),N(),Vp("Agent Created",u.api_key,!!u.can_register)}catch(u){$("create agent",u)}return!1}async function xw(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await h.createAgentKey(e);Vp("New Agent Key",n.key)}catch(n){$("generate agent key",n)}}async function Iw(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await h.updateAgent(e,{can_register:n}),k(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),Wa()}catch(s){$("change registrar",s)}}function Sw(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{k("Agent API key copied to clipboard","success")}).catch(()=>{k("Failed to copy","error")})}async function Tw(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),k("Agent deleted","success"),Wa()}catch(n){$("delete agent",n)}}ie({"create-agent":e=>{_w(e)},"copy-agent-key":()=>{Sw()},"dismiss-agent-modal":()=>{N(),Wa()},"delete-agent":(e,t)=>{Tw(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{xw(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{Iw(t.agentId,t.agentName,t.canRegister!=="true")}});function Lw(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function Aw(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const a of e){const o=a.user_id||a.id;i.has(o)||(i.add(o),s.push({id:o,name:a.user_name||a.name||a.user_email||a.email||"User",email:a.user_email||a.email||"",handle:Lw(a),isAgent:!1}))}for(const a of t)!a.mention_handle||a.is_active===!1||a.idle||i.has(a.id)||n!==void 0&&a.agent_project_id&&a.agent_project_id!==n||(i.add(a.id),s.push({id:a.id,name:a.name||"Agent",email:"",handle:a.mention_handle,isAgent:!0}));return s}function Cw(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function ll(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let a=-1;const o=()=>{s.classList.add("hidden"),s.innerHTML="",a=-1},r=d=>{var f,g;const u=s.querySelectorAll(".mention-suggestion");u.length!==0&&(a=(d%u.length+u.length)%u.length,u.forEach((v,y)=>v.classList.toggle("highlighted",y===a)),(g=(f=u[a]).scrollIntoView)==null||g.call(f,{block:"nearest"}))},l=d=>{const u=i.selectionStart||0,f=i.value.slice(0,u).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),g=i.value.slice(u);i.value=f+g,i.focus(),o()},c=()=>{const d=i.selectionStart||0;if(Cw(i.value,d)){o();return}const f=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!f){o();return}const g=f[2].toLowerCase(),v=Aw(bn(),Pn(),i.mentionContext||{}).filter(y=>!g||y.handle.includes(g)||y.name.toLowerCase().includes(g)||y.email.toLowerCase().includes(g)).slice(0,6);if(!v.length){o();return}s.innerHTML=v.map(y=>`
            <button type="button" class="mention-suggestion" data-handle="${m(y.handle)}">
                <span class="mention-name">${p(y.name)}${y.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${p(y.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((y,w)=>{y.addEventListener("click",()=>l(y.dataset.handle)),y.addEventListener("mouseenter",()=>r(w))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const u=!s.classList.contains("hidden");if(d.key==="Escape"&&u){d.preventDefault(),d.stopPropagation(),o();return}if(u){if(d.key==="ArrowDown")d.preventDefault(),r(a+1);else if(d.key==="ArrowUp")d.preventDefault(),r(a-1);else if(d.key==="Enter"||d.key==="Tab"){const g=s.querySelectorAll(".mention-suggestion")[a];g&&(d.preventDefault(),l(g.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(o,150)})}const mi={check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',ring:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>',link:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'};function dn(e){return!!(e&&e.attestation&&!e.attestation.approved_at)}function bs(e){return!!(e&&e.approval_mode==="gate"&&!e.attestation)}function cl(e){const t=e&&e.last_rejection;return t&&!t.superseded_at?t:null}function Ka(e){return bs(e)&&!!cl(e)}function Ya(e,{canAct:t=!1}={}){const n=e&&e.pending_rituals||[],i=e&&e.completed_rituals||[],s=[],a=[];for(const o of n)((dn(o)||bs(o)&&!Ka(o))&&t?s:a).push(o);return{needsYou:s,waiting:a,done:i,total:n.length+i.length}}function dl(e,t,n){return e===1?t:n}function ys(e){return dn(e)?"Review":Ka(e)?"Ask again for":bs(e)?"Sign off on":cl(e)?"Re-attest":"Attest"}function ul(e,t){return dn(e)?"an admin":bs(e)&&!Ka(e)?"a person":t||"the assignee"}function Bw(e){return e&&e.trigger==="ticket_claim"?"needed to start":"needed to close"}function Wp(e,t){return`<div class="ticket-gate-kicker">Waiting on ${p(e)}<span class="ticket-gate-when"> · ${Bw(t)}</span></div>`}function Dw(e){const t=e&&e.artifact_ref;if(!t||typeof t!="string")return"";if(/^https?:\/\//i.test(t))return`<a class="ticket-gate-artifact" href="${m(t)}" target="_blank" rel="noopener noreferrer">${mi.link}${p(t.replace(/^https?:\/\//i,""))}</a>`;const n=`/document/${encodeURIComponent(t)}`;return`<a class="ticket-gate-artifact" href="${m(n)}" data-action="open-gate-document" data-document-id="${m(t)}">${mi.link}Linked document</a>`}function pl(e){const t=e.attestation;return t?`
        <div class="ticket-gate-attestation">
            <div class="ticket-gate-by">${p(t.attested_by_name||"Someone")} attested ${p(rt(t.attested_at))}</div>
            ${t.note?`<div class="ticket-gate-note markdown-body">${Je(t.note)}</div>`:""}
            ${Dw(t)}
        </div>`:""}function Kp(e){const t=p(e.rejected_by_name||"Someone"),n=e.rejected_at?` ${p(rt(e.rejected_at))}`:"";return`${t} sent it back${n}: “${p(e.note||"")}”`}function Yp(e){const t=e&&e.last_rejection;return!t||!t.superseded_at||!dn(e)?"":`<div class="ticket-gate-earlier">Sent back before: ${Kp(t)}</div>`}const fi=(e,t)=>`data-ritual-id="${m(e.id)}" data-issue-id="${m(t)}" data-ritual-name="${m(e.name)}"`;function Mw(e,t){const n=`<button type="button" class="ticket-gate-text-btn" data-action="reject-ticket-ritual" ${fi(e,t)}>Send back…</button>`;return dn(e)?`
            <button type="button" class="btn btn-primary" data-action="approve-ticket-ritual" ${fi(e,t)}>Approve</button>
            ${n}`:`
        <button type="button" class="btn btn-primary" data-action="complete-ticket-ritual" ${fi(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off</button>
        ${n}`}function jw(e,t,n){return Ka(e)?n?`<button type="button" class="ticket-gate-text-btn" data-action="complete-ticket-ritual" ${fi(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off anyway</button>`:"":dn(e)||bs(e)?"":e.note_required||e.artifact?`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual-modal" ${fi(e,t)} data-ritual-prompt="${m(e.prompt||"")}" data-ritual-artifact="${m(e.artifact||"")}" data-ritual-note-required="${e.note_required?"1":""}">Attest it yourself…</button>`:`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual" ${fi(e,t)}>Attest it yourself</button>`}function Qp(e,t){if(e.length===0)return"";const[n,...i]=e,s=i.length?`, and ${i.length} more`:"";return`<div class="ticket-gate-then">${t}: ${p(ys(n).toLowerCase())} <b>${p(n.name)}</b>${s}.</div>`}function ml(e,t){const{needsYou:n,waiting:i,done:s,total:a}=e,o=(l,c,d,u)=>`<li class="${c}"><span class="ticket-gate-li-ic">${l}</span><span class="ticket-gate-li-name">${p(d)}</span><span class="ticket-gate-li-who">${p(u)}</span></li>`,r=[...s.map(l=>{var c;return o(mi.check,"done",l.name,(c=l.attestation)!=null&&c.attested_by_name?`by ${l.attestation.attested_by_name}`:"done")}),...n.map(l=>o(mi.ring,"you",l.name,"waiting on you")),...i.map(l=>o(mi.ring,"",l.name,`waiting on ${ul(l,t)}`))];return`
        <details class="ticket-gate-list">
            <summary>${s.length} of ${a} ${dl(a,"ritual","rituals")} done</summary>
            <ul>${r.join("")}</ul>
        </details>`}function Rw(e,{canAct:t=!1}={}){const{needsYou:n,waiting:i}=Ya(e,{canAct:t});return n[0]||i[0]||null}function Pw(e,{canAct:t=!1,assigneeName:n=null}={}){const{needsYou:i,waiting:s,total:a}=Ya(e,{canAct:t});if(a===0)return"";const o=i[0]||s[0];return o?`Waiting on ${i.length?"you":ul(o,n)}: ${ys(o).toLowerCase()} ${o.name}.`:`All ${a} ${dl(a,"ritual","rituals")} done.`}function qw(e,t,{canAct:n=!1,assigneeName:i=null}={}){const s=Ya(e,{canAct:n}),{needsYou:a,waiting:o,total:r}=s;if(r===0)return"";if(a.length===0&&o.length===0)return`
            <section class="ticket-gate clear" aria-label="Rituals" tabindex="-1">
                <span class="ticket-gate-clear-ic">${mi.check}</span>
                ${ml(s,i).replace(/<summary>[^<]*<\/summary>/,`<summary>All ${r} ${dl(r,"ritual","rituals")} done</summary>`)}
            </section>`;if(a.length>0){const u=a[0];return`
            <section class="ticket-gate you" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(u.id)}">
                ${Wp("you",u)}
                <h2 class="ticket-gate-step">${p(ys(u))} <b>${p(u.name)}</b></h2>
                ${u.prompt?`<div class="ticket-gate-asks markdown-body">${Je(u.prompt)}</div>`:""}
                ${pl(u)}
                ${Yp(u)}
                <div class="ticket-gate-actions">${Mw(u,t)}</div>
                ${Qp([...a.slice(1),...o],"Then")}
                ${ml(s,i)}
            </section>`}const l=o[0],c=l.attestation?null:cl(l),d=jw(l,t,n);return`
        <section class="ticket-gate waiting" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(l.id)}">
            ${Wp(ul(l,i),l)}
            <h2 class="ticket-gate-step">${p(ys(l))} <b>${p(l.name)}</b></h2>
            ${c?`<div class="ticket-gate-asks">${Kp(c)}</div>`:l.prompt?`<div class="ticket-gate-asks markdown-body">${Je(l.prompt)}</div>`:""}
            ${pl(l)}
            ${Yp(l)}
            ${d?`<div class="ticket-gate-actions">${d}</div>`:""}
            ${Qp(o.slice(1),"After that")}
            ${ml(s,i)}
        </section>`}function Nw(e,{canAct:t=!1}={}){const{needsYou:n}=Ya(e,{canAct:t});if(n.length===0)return"";const i=n[0],s=n.length>1?`<span class="ticket-gate-sticky-more"> and ${n.length-1} more</span>`:"";return`
        <span class="ticket-gate-sticky-text">Waiting on you: ${p(ys(i).toLowerCase())} <b>${p(i.name)}</b>${s}</span>
        <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">Go to it ↑</button>`}const Qa=new Map;function fl(){var e;return`${((e=T())==null?void 0:e.id)??""}|${K()??""}`}function gi(e,t,n){Qa.set(e,{key:t,value:n})}function Za(e,t){const n=Qa.get(e);return n&&n.key===t?n.value:void 0}function ws(e,...t){for(const n of t)n!==e&&Qa.delete(n)}function gl(){Qa.clear()}function Xa(e,t){if(e===t)return!0;try{return JSON.stringify(e)===JSON.stringify(t)}catch{return!1}}lt((e,t,n)=>{e==="currentTeam"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&gl(),e==="currentUser"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&gl()});let Te=null,Zp=!1,qn=!1,Xp="new-comment";function Ow(){return Te||(Te=document.createElement("div"),Te.className="quote-tooltip",Te.setAttribute("role","button"),Te.setAttribute("tabindex","0"),Te.setAttribute("aria-label","Quote selection in comment"),Te.textContent="Quote",Te.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),Ja())}),Te.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),Te.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Ja()}),document.body.appendChild(Te),Te)}function Jp(e,t){const n=Ow();n.style.display="flex",qn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!qn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function ks(){Te&&(Te.style.display="none"),qn=!1}function Hw(){return qn}function em(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function hl(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=em(t.startContainer),i=em(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function Fw(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function Ja(e=Xp){const t=hl();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=Fw(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),ks(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function Uw(){var i;if(!hl())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return Jp(n.left+n.width/2,n.top),!0}function Gw(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!hl()){ks();return}Jp(t,n)},10)}function tm({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(Xp=t,i.addEventListener("mouseup",Gw,n?{signal:n}:void 0),Zp||(Zp=!0,document.addEventListener("mousedown",s=>{qn&&Te&&!Te.contains(s.target)&&ks()}),document.addEventListener("selectionchange",()=>{qn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&ks()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&qn&&(s.stopImmediatePropagation(),ks())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&Uw()})))}function nm(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let un=[],$s=[],eo=null,ce=new Set,hi="list",Nn=!1,vl=null,to=null,bl=null,yl=null,im=null;function sm(e){if(im!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const wl=Cv();(wl==="list"||wl==="grid")&&(hi=wl);function am(e){if(e!=="list"&&e!=="grid")return;hi=e,e==="grid"&&Nn&&kl(),Bv(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Vt()}function om(){if(hi!=="list")return;Nn=!0,ce.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Vt(),bi()}function kl(){Nn=!1,ce.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Vt(),bi()}function zw(){vl&&clearTimeout(vl),vl=setTimeout(()=>{Vt()},300)}function Vw(){const e=document.getElementById("doc-search");e&&(e.value=""),Vt()}async function Ww(){ct(null)}async function Kw(){const e=document.getElementById("doc-search");e&&(e.value=""),ct(null)}function Yw(){var s;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((s=document.getElementById("doc-search"))==null?void 0:s.value)||"",n=K()||"",i=[];if(t&&i.push(`<span class="filter-chip">Search: "${p(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=X().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";i.push(`<span class="filter-chip">Project: ${p(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(i.length>0){let a=i.join(" ");i.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Qw(){return un}function Vt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";Yw(),$s=un.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),$s.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),nk("",hi)}let vi=0;async function Zw(){var i;const e=eo||((i=T())==null?void 0:i.id);if(!e)return;const t=++vi,n=K()||null;try{const s=await h.getDocuments(e,n);if(t!==vi)return;gi("documents",`${e}|${n??""}`,s),un=s,Vt()}catch(s){if(t!==vi)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=F({icon:O.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),$("load documents",s)}}lt(e=>{e==="currentProject"&&A()==="documents"&&Zw()});async function On(e,t=null,{fromMemory:n=!1}={}){var r;if(e||(e=(r=T())==null?void 0:r.id),!e)return;eo=e,Iu(-1);const i=++vi;t===null&&(t=K()||null);const s=`${e}|${t??""}`,a=n?Za("documents",s):void 0,o=document.getElementById("documents-list");a?(un=a,Vt()):o&&(o.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join(""));try{const l=await h.getDocuments(e,t);if(i!==vi)return;gi("documents",s,l);const c=a&&Xa(un,l);un=l;const d=document.getElementById("doc-view-list"),u=document.getElementById("doc-view-grid");d&&u&&(d.classList.toggle("active",hi==="list"),u.classList.toggle("active",hi==="grid")),c||Vt()}catch(l){if(i!==vi)return;const c=document.getElementById("documents-list");c&&(c.innerHTML=F({icon:O.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),$("load documents",l)}}function rm(){var t,n;if(A()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=eo||((n=T())==null?void 0:n.id);e&&On(e).catch(i=>console.error("Failed to refresh documents list:",i))}function lm(e){sm(e)&&Le(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function Xw(e,t){sm(e)&&(k(`Document "${t||"Untitled"}" was deleted`,"warning"),q("documents"))}function Jw(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${ee(t.color)}20; color: ${ee(t.color)}">${p(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function ek(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Jw(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${m(e.id)}" data-action="view-document" data-document-id="${m(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${p(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${p(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?p(nm(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${p(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function tk(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${ee(r.color)}20; color: ${ee(r.color)}">${p(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?nm(e.content).substring(0,80):"No content",s=Nn?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${m(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${ce.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${Nn&&ce.has(e.id)?" selected":""}" data-action="${Nn?"toggle-doc-selection":"view-document"}" data-document-id="${m(e.id)}" data-doc-id="${m(e.id)}">
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
  `}function nk(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;ce.clear(),bi();const i=$s;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,u=K(),f=d||u;n.innerHTML=F({icon:f?O.search:O.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?ek:tk,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=X();i.forEach(d=>{let u,f;if(e==="project")if(u=d.project_id||"__global__",u==="__global__")f="Global (Team-wide)";else{const g=r.find(v=>v.id===d.project_id);f=g?g.name:"Unknown Project"}else e==="sprint"&&(u=d.sprint_id||"__no_sprint__",f=d.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:f,docs:[]}),o[u].docs.push(d)});let l="";for(const[d,u]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${p(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${f}">
          ${u.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function ik(e){ce.has(e)?ce.delete(e):ce.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=ce.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",ce.has(e)),bi()}function sk(){$s.forEach(e=>ce.add(e.id)),$s.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),bi()}function cm(){ce.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),ce.clear(),bi()}function bi(){const e=document.getElementById("doc-bulk-actions");e&&(Nn?(e.classList.remove("hidden"),ce.size>0?e.innerHTML=`
        <span class="bulk-count">${ce.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function ak(){if(ce.size===0){k("No documents selected","error");return}const t=X().map(n=>`<option value="${n.id}">${p(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${ce.size} Document${ce.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${ce.size} selected document${ce.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,U()}async function ok(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(ce);let i=0;const s=[];for(const l of n)try{await h.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((o=un.find(d=>d.id===l))==null?void 0:o.title)||l)}N(),cm(),s.length===0?k(`Moved ${i} document${i>1?"s":""}!`,"success"):k(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=T())==null?void 0:r.id;return await On(a),!1}async function rk(){var a,o;if(ce.size===0){k("No documents selected","error");return}const e=ce.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(ce);let n=0;const i=[];for(const r of t)try{await h.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((a=un.find(c=>c.id===r))==null?void 0:a.title)||r)}kl(),i.length===0?k(`Deleted ${n} document${n>1?"s":""}!`,"success"):k(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=T())==null?void 0:o.id;await On(s)}async function lk(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await h.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${m(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${p(s.author_name||"Unknown")}</span>
                ${Ea(s.author)}
                <span class="comment-date">${rt(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${Zr(s.content)}</div>
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
    `}}function ck(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=pu(e);s&&(i.value=s),i.addEventListener("input",()=>{ka(e,i.value)},{signal:t}),i.addEventListener("keydown",a=>{var o;a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),(o=i.closest("form"))==null||o.requestSubmit())},{signal:t}),ll("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function Le(e,t=!0){try{t&&fn();const n=await h.getDocument(e);im=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(E=>E.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await lk(n);let a=null,o=null,r=!1;if(n.project_id){const P=X().find(G=>G.id===n.project_id);if(a=P?P.name:null,n.sprint_id)try{const G=await h.getSprint(n.sprint_id);o=G?G.name:null}catch(G){console.error("Failed to load sprint name:",G),r=!0}}let l=n.content||"";const c=Y.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=Qw(),u=d.findIndex(E=>E.id===n.id),f=u>0?d[u-1]:null,g=u>=0&&u<d.length-1?d[u+1]:null,v=u>=0,y=A()||"documents",w=n.labels&&n.labels.length>0?n.labels.map(E=>`
          <span class="issue-label" style="background: ${ee(E.color)}20; color: ${ee(E.color)}">
            ${p(E.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${m(n.id)}" data-label-id="${m(E.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let S='<span class="text-muted">None</span>';try{const E=await h.getDocumentIssues(n.id);E.length>0&&(S=E.map(P=>`
          <div class="linked-item">
            <span class="linked-item-id">${p(P.identifier)}</span>
            <span class="linked-item-title">${p(P.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${m(n.id)}" data-issue-id="${m(P.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(E){console.error("Failed to load linked issues:",E),S=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${m(y)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${v?`
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

          <div class="document-content markdown-body">${l?jn(l):'<p class="text-muted">No content</p>'}</div>

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
                ${w}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${m(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${p(n.author_name||"Unknown")} ${Ea(n.author)}</span>
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
    `,to&&to.abort(),to=new AbortController;const{signal:_}=to,D=i.querySelector(".sidebar-overflow-trigger"),M=i.querySelector(".overflow-menu-dropdown");if(D&&M){const E=()=>{M.classList.add("hidden"),D.setAttribute("aria-expanded","false")},P=()=>{const G=M.classList.toggle("hidden");D.setAttribute("aria-expanded",String(!G))};D.addEventListener("click",P,{signal:_}),document.addEventListener("click",G=>{!D.contains(G.target)&&!M.contains(G.target)&&E()},{signal:_}),M.addEventListener("keydown",G=>{G.key==="Escape"&&(E(),D.focus())},{signal:_})}ck(n.id,_,n.project_id||null),tm({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:_}),bl=f?f.id:null,yl=g?g.id:null;const ne=E=>{if((E.metaKey||E.ctrlKey)&&E.shiftKey&&(E.key===">"||E.key==="."||E.code==="Period")&&Ja("new-doc-comment")){E.preventDefault();return}E.metaKey||E.ctrlKey||E.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||E.target.tagName==="INPUT"||E.target.tagName==="TEXTAREA"||E.target.tagName==="SELECT"||E.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(E.key==="ArrowLeft"&&bl?(E.preventDefault(),Le(bl)):E.key==="ArrowRight"&&yl&&(E.preventDefault(),Le(yl)))};document.addEventListener("keydown",ne,{signal:_})}catch(n){$("load document",n)}}async function no(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await h.getSprints(t);let o=n;if(i&&!n){const l=a.find(c=>c.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${p(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function $l(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${p(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function dk(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?jn(r):'<span class="text-muted">Nothing to preview.</span>'}}function El(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=hu(e);if(o){const l=Tv(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){$a(e,null);return}$a(e,l,n)};[i,s,a].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function dm(){Es=null;const e=X(),t=Om()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${p(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${$l("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,U(),El("new"),t&&await no("doc-sprint",t,null,!0)}let Es=null;async function uk(e,t,n){Es=n||null;const s=X().map(a=>`<option value="${m(a.id)}" ${a.id===t?"selected":""}>${p(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${$l("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,U(),El("new"),t&&await no("doc-sprint",t,e)}async function pk(e){var a;e.preventDefault();const t=(a=T())==null?void 0:a.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await h.createDocument(t,s),$a("new",null),await On(t),N(),k("Document created!","success"),Es){const o=Es;Es=null,o()}}catch(o){$("create document",o)}return!1}let _l=null,_s=null,xl=!1;async function um(e){try{const t=await h.getDocument(e);_l=e,_s={title:t.title||"",content:t.content||""},xl=!1;const i=X().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${p(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${$l("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${m(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,U(),El(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await no("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){$("load document",t)}}async function mk(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&_l===t&&_s&&!xl){let o=null;try{o=await h.getDocument(t)}catch{}if(o&&((o.title||"")!==_s.title||(o.content||"")!==_s.content))return xl=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await h.updateDocument(t,s),_l=null,_s=null;const o=hu(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&$a(t,null),N(),await Le(t),k("Document updated!","success")}catch(o){$("update document",o)}return!1}async function fk(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=T())==null?void 0:t.id;await On(n),q("documents"),k("Document deleted!","success")}catch(n){$("delete document",n)}}function gk(e,t){no(e,t)}async function hk(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${m(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,U()}async function vk(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=T())==null?void 0:i.id,a=await h.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${m(t)}" data-issue-id="${m(o.id)}">
        <span class="link-result-id">${p(o.identifier)}</span>
        <span class="link-result-title">${p(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function bk(e,t){try{await h.linkDocumentToIssue(e,t),N(),k("Issue linked!","success"),await Le(e,!1)}catch(n){$("link issue",n)}}async function yk(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),k("Issue unlinked!","success"),await Le(e,!1)}catch(n){$("unlink issue",n)}}let Il=!1;async function wk(e,t){if(e.preventDefault(),Il)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return k("Please enter a comment","error"),!1;Il=!0;try{const s=await h.createDocumentComment(t,i);n.value="",k("Comment added!","success"),es(s),await Le(t,!1)}catch(s){$("add comment",s)}finally{Il=!1}return!1}async function kk(e){var n;const t=(n=T())==null?void 0:n.id;if(!t){k("No team selected","error");return}try{const i=await h.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,U();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${m(e)}" data-label-id="${m(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ee(a.color)}; color: white;">${p(a.name)}</span>
        ${a.description?`<span class="text-muted">${p(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,U()}catch(i){$("load labels",i)}}async function $k(e,t){try{await h.addLabelToDocument(e,t),N(),k("Label added!","success"),await Le(e,!1)}catch(n){$("add label",n)}}async function Ek(e,t){try{await h.removeLabelFromDocument(e,t),k("Label removed!","success"),await Le(e,!1)}catch(n){$("remove label",n)}}ie({"view-document":(e,t)=>{e.preventDefault(),Le(t.documentId)},"set-doc-editor-mode":(e,t)=>{dk(t.target,t.mode)},"retry-load-documents":()=>{On(eo)},"retry-document-comments":(e,t)=>{Le(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{ik(t.docId)},"clear-doc-search":()=>{Vw()},"clear-doc-project-filter":()=>{Ww()},"clear-all-doc-filters":()=>{Kw()},"show-bulk-move-modal":()=>{ak()},"bulk-delete-documents":()=>{rk()},"select-all-docs":()=>{sk()},"clear-doc-selection":()=>{cm()},"exit-selection-mode":()=>{kl()},"enter-selection-mode":()=>{om()},"handle-bulk-move":e=>{ok(e)},"unlink-document-issue":(e,t)=>{yk(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{hk(t.documentId)},"add-document-comment":(e,t)=>{wk(e,t.documentId)},"remove-label-from-doc":(e,t)=>{Ek(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{kk(t.documentId)},"show-edit-document-modal":(e,t)=>{um(t.documentId)},"delete-document":(e,t)=>{fk(t.documentId)},"create-document":e=>{pk(e)},"update-doc-sprint-dropdown":(e,t,n)=>{gk(t.sprintSelect,n.value)},"update-document":(e,t)=>{mk(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{vk(n.value,t.documentId)},"link-to-issue":(e,t)=>{bk(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{$k(t.documentId,t.labelId)}});async function pm(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),s=wi(t.project_id).map(o=>`
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
        `,U();const a=document.getElementById("edit-issue-description");if(a){const o=Xi(e);if(o){const r=fu(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?In(e,r,t.description||""):In(e,null)})}}catch(t){$("load issue",t)}}async function _k(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(c.status=s.value);const d=await h.updateIssue(t,c);Xi(t)===c.description&&In(t,null),N(),await oe(t),k("Issue updated!","success"),ps(d)}catch(n){$("update issue",n)}}async function xk(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await At(),await mt(),q("issues"),k("Issue deleted!","success")}catch(t){$("delete issue",t)}}ie({"update-issue":(e,t)=>{_k(e,t.issueId)}});let Sl=!1,Tl=!1,io=null,xs=null,Is=null,so=null,Ll=!1,ao=null;function Al(e=null){Ll=!0,e&&(ao=e)}function mm(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔",ritual_approved:"✅"}[e]||"•"}function Cl(e){return e.user_name||e.user_email||"Unknown"}const Bl=e=>String(e||"").toLowerCase()==="claim"?"start":"close";function Dl(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${p(Ie(t(e.old_value)))}</strong> to <strong>${p(Ie(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${p(De(t(e.old_value)))}</strong> to <strong>${p(De(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${p(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${p(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=p(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=p(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"ritual_approved":return`Approved <strong>${p(e.new_value||"a ritual")}</strong>`;case"intent_opened":return`Tried to ${Bl(e.new_value)} it; waiting on rituals`;case"intent_cleared":return`No longer waiting on rituals to ${Bl(e.new_value)}`;case"intent_canceled":return`Canceled the pending ${Bl(e.new_value)}`;case"lease_expired":return"Claim expired; moved back to <strong>Todo</strong>";case"email_delivery_failed":return p(e.new_value||"An email could not be delivered");case"updated":return e.field_name?`Updated ${n[e.field_name]||p(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||p(e.field_name)}`:"Updated issue"}}async function Ss(e){const t=()=>{var i;const n=(i=we())==null?void 0:i.id;return!n||n===e};try{const n=await h.getTicketRitualsStatus(e);if(!t())return;io=n,Pl(e)}catch(n){if(console.error("Failed to load ticket rituals:",n),!t())return;io=null,Pl(e)}}function fm(){const e=ye();if(!e||e.is_agent)return!1;const t=bn();if(!t||t.length===0)return!0;const n=t.find(i=>i.user_id===e.id);return!!n&&(n.role==="admin"||n.role==="owner")}let Ts=null,Ml=!0;function jl(){var a;const e=document.getElementById("ticket-gate-sticky");if(!e)return;const n=e.innerHTML.trim()!==""&&!Ml;e.classList.toggle("hidden",!n);const i=document.getElementById("issue-detail-view"),s=n&&((a=e.firstElementChild)==null?void 0:a.offsetHeight)||0;i&&i.style.setProperty("--gate-bar-h",`${s}px`)}function gm(){Ts&&(Ts.disconnect(),Ts=null),Ml=!0,jl()}const Ik=()=>typeof CSS>"u"||typeof CSS.supports!="function"||CSS.supports("selector(:has(*))");function Sk(){gm();const e=document.getElementById("ticket-gate");!e||typeof IntersectionObserver>"u"||!Ik()||(Ts=new IntersectionObserver(t=>{Ml=t[t.length-1].isIntersecting,jl()}),Ts.observe(e))}function Tk(){var n,i;const e=document.getElementById("ticket-gate");if(!e||e.classList.contains("hidden"))return;(n=e.scrollIntoView)==null||n.call(e,{behavior:"smooth",block:"start"});const t=e.querySelector(".ticket-gate-actions .btn-primary");(i=t==null?void 0:t.focus)==null||i.call(t,{preventScroll:!0})}let Rl=null;function Pl(e){var g;const t=document.getElementById("ticket-gate"),n=document.getElementById("ticket-gate-sticky"),i=!!t&&t.dataset.issueId===e&&Rl===e,s=document.activeElement,a=!!t&&!!s&&(t.contains(s)||s===document.body),o=io,r=fm(),l=we(),c=l&&l.id===e?l:null,d=c!=null&&c.assignee_id?yt(c.assignee_id):null,u=d?dt(d):(c==null?void 0:c.assignee_name)||null;if(((v,y)=>{v&&(v.innerHTML=y,v.classList.toggle("hidden",y.trim()===""))})(t,o?qw(o,e,{canAct:r,assigneeName:u}):""),t&&(t.dataset.issueId=e),Rl=e,n){const v=o?Nw(o,{canAct:r}):"";n.innerHTML=v?`<div class="ticket-gate-sticky-bar">${v}</div>`:"",jl()}if(i){const v=document.getElementById("ticket-gate-live");if(v&&(v.textContent=o?Pw(o,{canAct:r,assigneeName:u}):""),a&&t&&!t.classList.contains("hidden")){const y=t.querySelector(".ticket-gate-actions .btn-primary")||t.querySelector(".ticket-gate");(g=y==null?void 0:y.focus)==null||g.call(y,{preventScroll:!0})}}}function oo({focus:e=!1}={}){var n;const t=document.querySelector("#issue-detail-view details.related-add[open]");return t?(t.open=!1,e&&((n=t.querySelector("summary"))==null||n.focus()),!0):!1}function Lk(e){document.addEventListener("keydown",t=>{t.key==="Escape"&&oo({focus:!0})&&(t.stopPropagation(),t.preventDefault())},{capture:!0,signal:e}),document.addEventListener("click",t=>{var n,i;(i=(n=t.target).closest)!=null&&i.call(n,"details.related-add")||oo()},{signal:e})}async function ro(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await oe(t.id,!1),!0):(q("my-issues",!1),!1)}catch{return q("my-issues",!1),!1}}function ql(e){const t=ss(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function Nl({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${m(n.id)}" data-identifier="${m(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${m(i.id)}" data-identifier="${m(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function Ak(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=we();if(!t)return;const n=ql(t.id);xs=n.prevIssue?n.prevIssue.id:null,Is=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=Nl(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}lt(e=>{e==="detailNavContext"&&Ak()});let Ls=0;const hm=500;function Ck(){Ls++}let vm=0,lo=!1;function bm(){if(document.querySelector(".description-inline-editor"))return"editor";if(ai())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)")||e!=null&&e.querySelector("details.related-add[open]"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||lo?"transient":null}function ym(e){return Al(),e==="editor"?"deferred":"retry"}function Bk(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=we())==null?void 0:n.id)===e}function Dk(e){return te().find(t=>t.id===e)||Hr(e)||ss().find(t=>t.id===e)||null}function Mk(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;gm(),Rl=null,ei(e);const i=ql(e.id);xs=i.prevIssue?i.prevIssue.id:null,Is=i.nextIssue?i.nextIssue.id:null;const s=X().find(r=>r.id===e.project_id),a=e.assignee_id?yt(e.assignee_id):null,o=A()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(o)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Nl(i)}
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
                        <div class="property-row"><span class="property-label">Status</span><span class="property-value">${We(e.status)}<span>${Ie(e.status)}</span></span></div>
                        <div class="property-row"><span class="property-label">Priority</span><span class="property-value">${pt(e.priority)}<span>${De(e.priority)}</span></span></div>
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${a?p(dt(a)):"Unassigned"}</span></div>
                    </div>
                </aside>
            </div>`}async function oe(e,t=!0,{refresh:n=!1}={}){var a;const i=n?Ls:++Ls,s=++vm;if(n){const o=bm();if(o)return ym(o)}try{t&&fn();let o=!1;if(!n){const L=Dk(e);L&&(Mk(L),t&&(history.pushState({issueId:e,view:A()},"",`/issue/${L.identifier}`),o=!0))}let r=!1;const[l,c,d,u,f,g]=await Promise.all([h.getIssue(e),h.getComments(e).catch(L=>(console.error("Failed to load comments:",L),r=!0,[])),h.getActivities(e,0,hm),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),v=[...c].sort((L,ue)=>new Date(L.created_at)-new Date(ue.created_at)),y=[l.parent_id?h.getIssue(l.parent_id):Promise.resolve(null),h.getSprints(l.project_id).catch(L=>(console.error("Failed to load sprints:",L),[]))],[w,S]=await Promise.all(y);if(i!==Ls)return"dropped";let _=null,D=null;if(n){if(s!==vm||!Bk(e))return"dropped";const L=bm();if(L)return ym(L);D=window.scrollY;const ue=document.activeElement;ue!=null&&ue.id&&document.getElementById("issue-detail-view").contains(ue)&&(_={id:ue.id,start:ue.selectionStart,end:ue.selectionEnd})}io=g,t&&!o&&history.pushState({issueId:e,view:A()},"",`/issue/${l.identifier}`),ei(l),Lu(S),Ll=!1,ao=null,document.querySelectorAll(".view").forEach(L=>L.classList.add("hidden"));const M=document.getElementById("issue-detail-view");M.classList.remove("hidden");const ne=A()||"my-issues",E=X().find(L=>L.id===l.project_id),P=l.assignee_id?yt(l.assignee_id):null,G=P?dt(P):null,W=l.sprint_id?S.find(L=>L.id===l.sprint_id):null,Ee=ql(l.id),{prevIssue:x,nextIssue:R}=Ee;M.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div id="ticket-gate-sticky" class="ticket-gate-sticky hidden" role="region" aria-label="Rituals waiting on you"></div>
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(ne)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Nl(Ee)}
                        <span class="issue-detail-breadcrumb">${E?p(E.name):"Project"} › ${p(l.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${p(l.title)}</h1>
                    ${pp(l,G,{formatEstimate:mn})}

                    ${w?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(w.identifier)}" data-action="navigate-issue" data-issue-id="${m(w.id)}" data-identifier="${m(w.identifier)}">${w.identifier}: ${p(w.title)}</a>
                    </div>
                    `:""}

                    <div id="ticket-gate" class="ticket-gate-slot hidden"></div>
                    <div id="ticket-gate-live" class="sr-only" role="status" aria-live="polite"></div>

                    <div class="issue-detail-description">
                        <div class="section-header description-edit-row">
                            <button type="button" class="description-edit-btn${Xi(l.id)?" has-draft":""}" data-action="edit-description" data-issue-id="${m(l.id)}">
                                ${Xi(l.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span><span class="sr-only">: edit description (unsaved draft)</span>':'Edit<span class="sr-only"> description</span>'}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${l.description?"":"empty"}" data-action="edit-description" data-issue-id="${m(l.id)}">
                            ${l.description?jn(l.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    ${Kb(l,u,f,{formatEstimate:mn})}

                    ${Jb({comments:v,activities:d,ritualStatus:g,commentsLoadFailed:r,issueId:l.id,gateRitualName:((a=Rw(g,{canAct:fm()}))==null?void 0:a.name)||null,activitiesTruncated:d.length>=hm},{formatText:Dl,formatActor:Cl})}

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
                                ${We(l.status)}
                                <span>${Ie(l.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${m(l.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${pt(l.priority)}
                                <span>${De(l.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${m(l.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${l.issue_type||"task"}">${vt(l.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${m(l.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${G?`${Ut(P,"avatar-small")}<span>${p(G)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${m(l.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${W?p(W.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${m(l.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${l.labels&&l.labels.length>0?l.labels.map(L=>`
                                        <span class="issue-label" style="background: ${ee(L.color)}20; color: ${ee(L.color)}">${p(L.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${E?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${p(E.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${m(l.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${ko(l.estimate,l.project_id)?" out-of-scale":""}" ${ko(l.estimate,l.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${mn(l.estimate,l.project_id)}</span>
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
                            <span class="property-value-static">${p(l.creator_name||"Unknown")} ${Ea(l.creator)}</span>
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
        `,so&&so.abort(),so=new AbortController;const{signal:C}=so,Q=document.querySelector(".sidebar-overflow-trigger"),_e=document.querySelector(".overflow-menu-dropdown");if(Q&&_e){const L=()=>{_e.classList.add("hidden"),Q.setAttribute("aria-expanded","false")},ue=()=>{const ge=_e.classList.toggle("hidden");Q.setAttribute("aria-expanded",String(!ge))};Q.addEventListener("click",ue,{signal:C}),document.addEventListener("click",ge=>{!Q.contains(ge.target)&&!_e.contains(ge.target)&&L()},{signal:C}),_e.addEventListener("keydown",ge=>{ge.key==="Escape"&&(ge.stopPropagation(),L(),Q.focus())},{signal:C})}Sk(),Pl(l.id),ll("new-comment","mention-suggestions",{projectId:l.project_id}),tm({signal:C}),Lk(C);const de=document.getElementById("new-comment");if(lo=!1,de){de.addEventListener("compositionstart",()=>{lo=!0},{signal:C}),de.addEventListener("compositionend",()=>{lo=!1},{signal:C});const L=pu(l.id);L&&(de.value=L),de.addEventListener("input",()=>{ka(l.id,de.value)}),de.addEventListener("keydown",ue=>{var ge;ue.key==="Enter"&&(ue.metaKey||ue.ctrlKey)&&(ue.preventDefault(),(ge=de.closest("form"))==null||ge.requestSubmit())})}xs=x?x.id:null,Is=R?R.id:null;const gt=L=>{var pe;if((L.metaKey||L.ctrlKey)&&L.shiftKey&&(L.key===">"||L.key==="."||L.code==="Period")&&Ja()){L.preventDefault();return}if(L.metaKey||L.ctrlKey||L.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||L.target.tagName==="INPUT"||L.target.tagName==="TEXTAREA"||L.target.tagName==="SELECT"||L.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||ai())return;if(L.key==="ArrowLeft"&&xs)L.preventDefault(),oe(xs);else if(L.key==="ArrowRight"&&Is)L.preventDefault(),oe(Is);else if(L.key==="c"){L.preventDefault(),L.stopImmediatePropagation();const J=document.getElementById("new-comment");J&&(J.focus(),J.scrollIntoView({behavior:"smooth",block:"nearest"}))}else L.key==="j"?(L.preventDefault(),L.stopImmediatePropagation(),co(1)):L.key==="k"?(L.preventDefault(),L.stopImmediatePropagation(),co(-1)):L.key==="d"&&(L.preventDefault(),(pe=document.querySelector('[data-action="edit-description"]'))==null||pe.click());const ge={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[L.key];if(ge){const J=document.querySelector(`.property-row[data-field="${ge}"]`);J&&(L.preventDefault(),J.click())}};if(document.addEventListener("keydown",gt,{signal:C}),_){const L=document.getElementById(_.id);if(L&&(L.focus({preventScroll:!0}),typeof _.start=="number"&&typeof L.setSelectionRange=="function"))try{L.setSelectionRange(_.start,_.end)}catch{}}return D!==null&&window.scrollTo(0,D),"rendered"}catch(o){if(n)console.error("Failed to refresh issue detail:",o);else{if(i!==Ls)return"dropped";$("load issue",o);const r=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(r){const l=(o==null?void 0:o.status)===403||(o==null?void 0:o.status)===404;r.innerHTML=F(l?{icon:O.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:O.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function jk(e,t){if(e.preventDefault(),Sl)return!1;const n=document.getElementById("new-comment").value;ka(t,null),Sl=!0;try{const i=await h.createComment(t,n);k("Comment added!","success"),es(i),await oe(t)}catch(i){ka(t,n),$("add comment",i)}finally{Sl=!1}return!1}async function Rk(e){const t=we()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
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
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=Xi(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=fu(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}ll("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?In(e,c,t.description||""):In(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&wm()}),a.addEventListener("keydown",c=>{var d,u;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,f;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(In(e,null),Ll){oe(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?jn(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,v;if(Tl)return;const c=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(c===void 0)return;const d=ao?ao.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const y=document.getElementById("description-draft-warning");y&&(y.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",y.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");Tl=!0,u&&(u.disabled=!0);const f=window.scrollY;try{await h.updateIssue(e,{description:c}),In(e,null),k("Description updated","success"),await oe(e,!1),window.scrollTo(0,f),(v=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||v.focus()}catch(y){$("update description",y)}finally{Tl=!1,u&&(u.disabled=!1)}})}function wm(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?jn(n):'<span class="text-muted">Nothing to preview.</span>'}function Pk(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?wm():i.focus()}function qk(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,U(),document.getElementById("relation-issue-search").focus()}async function Nk(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=T())==null?void 0:i.id,o=(await h.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${m(r.id)}" data-identifier="${m(r.identifier)}" data-title="${m(r.title)}">
                <span class="link-result-id">${p(r.identifier)}</span>
                <span class="link-result-title">${p(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function Ok(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Hk(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Fk(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return k("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(i,t,"blocks"):await h.createRelation(t,i,n),N(),k("Relation added","success"),oe(t)}catch(s){$("add relation",s)}return!1}async function Uk(e,t){try{await h.deleteRelation(e,t),k("Relation removed","success"),oe(e)}catch(n){$("remove relation",n)}}function co(e){const t=we();if(!t)return;const n=ss();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||oe(n[s].id)}ie({"retry-issue-comments":(e,t)=>{oe(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{iy(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||Rk(t.issueId)},"open-gate-document":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),Le(t.documentId))},"scroll-to-ticket-gate":()=>{Tk()},"save-comment":(e,t)=>{jk(e,t.issueId)},"show-add-relation-modal":(e,t)=>{oo(),qk(t.issueId)},"remove-relation":(e,t)=>{Uk(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{oo(),Zu(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{Fk(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{Nk(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{Ok(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{Hk()},"set-description-editor-mode":(e,t)=>{Pk(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>co(-1),"navigate-next-issue":()=>co(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),pm(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),xk(t.issueId)}});let Ct=[],uo={},po=new Set,Wt=null,Ol=null,mo=[],As=[],Hl=[];function fo(){return uo}function Gk(){return Ol}function zk(){return Wt}lt(e=>{e==="currentProject"&&A()==="sprints"&&pn()});let Fl=0;async function pn({fromMemory:e=!1}={}){Tu(-1);const t=K();if(!t){const o=document.getElementById("sprints-list");o&&(o.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}const n=++Fl;r$();const i=document.getElementById("sprints-list"),s=fl(),a=e?Za("sprints",s):void 0;a?(Ct=a,km()):i&&(i.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{const[,o]=await Promise.all([h.getCurrentSprint(t),h.getSprints(t)]),r=o.some(c=>c.status==="active")?o:await h.getSprints(t);if(n!==Fl)return;const l=a&&Xa(Ct,r);Ct=r,gi("sprints",s,r),l||km(),await go()}catch(o){return n!==Fl?void 0:(i&&(i.innerHTML=F({icon:O.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),$("load sprints",o),!1)}return!0}function km(){const e=document.getElementById("sprints-list");if(!e)return;const t=Ct.find(a=>a.status==="active"),n=Ct.find(a=>a.status==="planned"),i=Ct.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
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
        `,s+=Vk(t)}if(n){const a=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",o=(n.budget?`${n.budget} point budget`:"No budget set")+(a?` <span class="text-muted">· ${a}</span>`:"");s+=`
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
        `),e.innerHTML=s||F({icon:O.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function $m(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${Wl(e.activated_at)}, closed ${Wl(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${Wl(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function Vk(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${p($m(e))||"not yet activated"}</span>
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
    `}let Ul=0;async function yi(e,t=!0){var n;try{t&&fn();const i=++Ul,s=A(),a=await h.getSprint(e);if(i!==Ul)return;if(!a){k("Sprint not found","error"),q("sprints");return}Ol=a;const o=(n=T())==null?void 0:n.id,[r,l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),o?h.getDocuments(o,a.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==Ul)return;mo=r,Hl=l,As=c,A()===s&&St(mo),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Kk()}catch(i){console.error("Failed to load sprint:",i),k("Failed to load sprint","error"),q("sprints")}}async function Wk(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){k("Invalid sprint ID","error"),q("sprints",!1);return}try{await yi(e,!1)}catch{q("sprints",!1)}}function Kk(){const e=Ol,t=mo;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=A()||"sprints",s=t.filter(g=>rs.includes(g.status)),a=t.filter(g=>g.status==="done"),o=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((v,y)=>v+(y.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),c=r(a),d=o.length>0?`<div class="stat-note">${o.length} canceled not counted</div>`:"";let u="";e.status==="active"?u='<span class="badge badge-status-active">Active</span>':e.status==="planned"?u='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(u='<span class="badge badge-status-completed">Completed</span>');const f=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
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
                    ${p($m(e))}
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
                ${s.length===0?F({icon:O.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(g=>Gl(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?F({icon:O.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(g=>Gl(g)).join("")}
                    </div>
                `}
            </details>

            ${o.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${o.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${o.map(g=>Gl(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${Qk()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${As.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${m(e.id)}"
                        data-project-id="${m(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${As.length>0?`
                    <div class="sprint-issues-list">
                        ${As.map(g=>Yk(g)).join("")}
                    </div>
                `:F({icon:O.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function Gl(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...Bu,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${m(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${p(e.identifier)}</span>
            <span class="sprint-issue-title">${p(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${d$(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Yk(e){const t=p(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${m(e.id)}" data-document-url="/document/${m(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${p(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${rt(e.created_at)}</span>
            </span>
        </div>
    `}function Qk(){const e=Hl;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${Zk(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function Zk(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Xk(e,t,n,i){const s=i?D$(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function Jk(e,t,n){var u,f,g,v;e.preventDefault();const i=(f=(u=document.getElementById("sprint-name"))==null?void 0:u.value)==null?void 0:f.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(v=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:v.dataset.currentBudget,l=r?parseInt(r):null,c=a!==l,d=Ct.find(y=>y.id===t);try{const y={};i&&(y.name=i);const w=o==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!w&&(y.budget=a),Object.keys(y).length&&await h.updateSprint(t,y),o==="planned"){const _=Ct.filter(D=>D.status==="planned"&&D.id!==t);for(const D of _)await h.updateSprint(D.id,{budget:a})}o==="default"&&n&&await h.updateProject(n,{default_sprint_budget:a}),await pn(),N(),k(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(y){$("update budget",y)}return!1}const Em="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function e$(e,t=null){const n=Ct.find(c=>c.id===e),i=n?X().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${Em}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let a;try{a=await h.updateSprint(e,{budget_follows_default:!0})}catch(c){$("reset budget to project default",c),t&&(t.disabled=!1);try{await pn()}catch{}return}const o=(a==null?void 0:a.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await pn()!==!1}catch{l=!1}k(`'${o}' follows the project default budget again: ${s(a==null?void 0:a.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((a==null?void 0:a.budget)===null||(a==null?void 0:a.budget)===void 0)&&k(Em,"warning")}async function t$(e){const t=Ct.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,U();const n=rs;let i=0,s=!1,a=!1;try{const[l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
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
    `}async function n$(e){try{const t=await h.closeSprint(e);await pn(),Im(),t.limbo?s$(t):k("Sprint completed!","success")}catch(t){$("complete sprint",t)}}async function go(){const e=K();if(e)try{Wt=await h.getLimboStatus(e),i$()}catch(t){console.error("Failed to load limbo status:",t)}}function i$(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Wt||!Wt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Wt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function s$(e){const t=K();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,U(),a$(t)}async function a$(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${p(i.name)} <span class="ritual-mode">(${p(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${Je(i.prompt)}</div>
                    ${Vl(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function zl(){var t,n;if(!Wt)return;const e=K();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Wt.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${p(i.name)}</strong>
                            <span class="badge badge-ritual-${m(i.approval_mode)}">${p(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${Je(i.prompt)}</div>
                        ${Vl(i.attestation)}
                        ${o$(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=Wt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Wt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${p(i.name)}</div>
                            ${Vl(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,U()}function Vl(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${p(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${p(rt(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${Je(e.note)}</div>
        </div>
    `}function o$(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}" data-ritual-name="${m(e.name)}" data-ritual-artifact="${m(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function _m(e){for(const t of e)if(!po.has(t))try{(await h.getSprints(t)).forEach(i=>{uo[i.id]=i}),po.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function r$(){uo={},po=new Set,mo=[],Hl=[],As=[],ho={}}function l$(e,t){t.forEach(n=>{uo[n.id]=n}),po.add(e)}let ho={};function c$(e){return ho[e]}function xm(e,t){ho[e]=t??null}function Im(){ho={}}ie({"retry-load-sprints":()=>pn(),"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}yi(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;Xk(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{e$(t.sprintId,n)},"show-limbo-details-modal":()=>{zl()},"show-close-sprint-confirmation":(e,t)=>{t$(t.sprintId)},"handle-update-budget":(e,t)=>{Jk(e,t.sprintId,t.projectId)},"close-modal":()=>{N()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,N(),n$(t.sprintId)},"dismiss-limbo-modal":()=>{N(),go()},"approve-ritual":(e,t)=>{f$(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{Tm(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}oe(t.issueId)},"create-sprint-document":async(e,t)=>{await uk(t.sprintId,t.projectId,()=>{yi(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Le(t.documentId)}});function Wl(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function d$(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}lt(e=>{e==="currentProject"&&A()==="rituals"&&Kl()});let Sm=0;async function Kl(){const e=K(),t=document.getElementById("rituals-content"),n=++Sm;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=F({icon:O.projects,heading:"Select a project",description:"Choose a project to view and manage its rituals"}));return}O$(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await Ds();n===Sm&&!i&&t&&(t.innerHTML=F({icon:O.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function u$(){Pm(p$),Kl()}function p$(){const e=document.getElementById("rituals-content"),t=H$(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,ki("rv-sprint-rituals-list",n,"sprint"),ki("rv-close-rituals-list",i,"close"),ki("rv-claim-rituals-list",s,"claim")}function m$(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function f$(e,t){try{await h.approveAttestation(e,t),k("Ritual approved!","success"),await go(),zl()}catch(n){$("approve ritual",n)}}function Yl(e){return e==="document"?`
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
        `:""}function Ql(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){k("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){k("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function Tm(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Yl(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{g$(s,e,t,i)}),U()}async function g$(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=Ql(i);if(a===void 0)return!1;try{await h.completeGateRitual(t,n,s||null,a),k("Ritual completed!","success"),await go();const o=zk();o&&!o.in_limbo?(N(),k("Limbo cleared! Next sprint is now active.","success")):zl()}catch(o){$("complete gate ritual",o)}return!1}function h$(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${p(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${Yl(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{v$(o,e,t,s,a)}),U()}async function v$(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return k("A note is required for this attestation.","error"),!1;const o=Ql(i);if(o===void 0)return!1;try{await h.attestTicketRitual(t,n,a||null,o),k("Ritual attested!","success"),N(),await Ss(n)}catch(r){$("attest ticket ritual",r)}return!1}async function b$(e,t){try{await h.attestTicketRitual(e,t),k("Ritual attested!","success"),await Ss(t)}catch(n){$("attest ticket ritual",n)}}async function y$(e,t){try{await h.approveTicketRitual(e,t),k("Ritual approved!","success"),await Ss(t)}catch(n){$("approve ticket ritual",n)}}function Zl(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{w$(s,e,t,n,i)}),U()}async function w$(e,t,n,i,s=null){e.preventDefault();const a=document.getElementById("reject-ritual-note").value.trim();if(!a)return k("A rejection needs a reason.","error"),!1;try{await h.rejectTicketRitual(t,n,a),k(`"${i}" rejected. The attester has been told why.`,"success"),N(),s&&await s()}catch(o){$("reject ritual",o)}return!1}function Lm(e,t,n,i="",s=null){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Yl(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",a=>{k$(a,e,t,i,s)}),U()}async function k$(e,t,n,i="",s=null){e.preventDefault();const a=document.getElementById("ticket-ritual-note").value,o=Ql(i);if(o===void 0)return!1;try{await h.completeTicketGateRitual(t,n,a||null,o),k("Ritual completed!","success"),N(),s?await s():await Ss(n)}catch(r){$("complete ticket ritual",r)}return!1}ie({"show-create-ritual-modal":(e,t)=>{zm(t.trigger)},"approve-ticket-ritual":(e,t)=>{y$(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{Zl(t.ritualId,t.issueId,t.ritualName,()=>Ss(t.issueId))},"complete-ticket-ritual":(e,t)=>{Lm(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{h$(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{b$(t.ritualId,t.issueId)},"retry-load-rituals":()=>Kl()});function Je(e){if(!e)return"";try{Y.setOptions({breaks:!0,gfm:!0});const n=Y.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return du.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function Cs(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function $$(e,t,n,i,s,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Requested by <strong>${p(o)}</strong>${r?` ${Cs(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{E$(c,e,t,n)}),U(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function E$(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await h.completeTicketGateRitual(t,n,s||null),k(`GATE ritual "${i}" approved!`,"success"),N(),Bt()}catch(a){$("complete gate ritual",a)}}function _$(e,t,n,i,s,a,o,r){$$(e,t,n,i,s,a,o,r)}function x$(e,t,n,i,s,a,o,r,l){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Attested by <strong>${p(o)}</strong>${r?` ${Cs(r)}`:""}</div>`:""}
                ${l?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${Je(l)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{I$(d,e,t,n)}),U(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function I$(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{await h.approveTicketRitual(t,n);let r=null;if(s)try{r=await h.createComment(n,s)}catch(l){console.error("Failed to post approval comment:",l)}k(`Review ritual "${i}" approved!`,"success"),es(r),N(),Bt()}catch(r){$("approve review ritual",r)}}function S$(e,t,n,i,s,a,o,r,l){x$(e,t,n,i,s,a,o,r,l)}lt(e=>{e==="currentProject"&&A()==="approvals"&&Bt()});let Xl=[],Jl=0;async function Bt(){if(!T())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++Jl;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=K(),i=n?X().filter(r=>r.id===n):X(),s=await Promise.all(i.map(async r=>{const[l,c]=await Promise.all([h.getPendingApprovals(r.id),h.getLimboStatus(r.id)]);return{project:r,approvals:l,limbo:c}}));if(t!==Jl)return;const a=[],o=[];for(const{project:r,approvals:l,limbo:c}of s)if(a.push(...l),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(u=>{var f;return(f=u.attestation)!=null&&f.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});d.length>0&&o.push({project:r,rituals:d})}tb(a),Xl=o,Am()}catch(n){if(t!==Jl)return;e.innerHTML=F({icon:O.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),$("load approvals",n)}}function Am(){const e=document.getElementById("approvals-list");if(!e)return;const t=eb(),n=Xl.length>0,i=!Dv();if(t.length===0&&!n){i?e.innerHTML=`
                <div class="empty-state approvals-explainer">
                    <div class="empty-state-icon">${O.issues}</div>
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
            `:e.innerHTML=F({icon:O.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let s="";n&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${Xl.map(({project:d,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${p(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(f=>{const g=f.attestation&&!f.attestation.approved_at,v=g?"⏳":"○",y=g?`<span class="gate-waiting-info">Attested by <strong>${p(f.attestation.attested_by_name||"Unknown")}</strong></span>`:f.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',w=g?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${m(f.id)}"
                                            data-project-id="${m(d.id)}">Approve</button>`:f.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${m(f.id)}"
                                                data-project-id="${m(d.id)}"
                                                data-ritual-name="${m(f.name)}"
                                                data-ritual-artifact="${m(f.artifact||"")}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${v} ${p(f.name)}
                                                    <span class="badge badge-ritual-${m(f.approval_mode)}">${p(f.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${p(f.prompt)}</span>
                                                ${y}
                                            </div>
                                            ${w}
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
                    ${r.map(ec).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(ec).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(ec).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;_$(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var g;d.disabled=!0;const u=(g=d.closest(".gate-ritual-actions"))==null?void 0:g.querySelector(".review-approve-btn");u&&(u.disabled=!0);const f=d.dataset;try{await h.approveTicketRitual(f.ritualId,f.issueId),k(`Review ritual "${f.ritualName}" approved!`,"success"),await Bt()}catch(v){d.disabled=!1,u&&(u.disabled=!1),$("approve review ritual",v)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;S$(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".gate-reject-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Zl(u.ritualId,u.issueId,u.ritualName,()=>Bt())})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await h.approveAttestation(d.dataset.ritualId,d.dataset.projectId),k("Sprint ritual approved!","success"),await Bt()}catch(u){d.disabled=!1,$("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{Tm(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName,d.dataset.ritualArtifact||"")})})}function T$(){Mv(),Am()}function ec(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${p(i.requested_by_name)}</strong>${i.requested_at?` (${Cs(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note">${Je(i.attestation_note)}</div>`:"",l=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=!s&&i.rejection_note,d=c?`<div class="gate-rejection-note"><strong>Rejected by ${p(i.rejected_by_name||"Someone")}</strong>${i.rejected_at?` (${Cs(i.rejected_at)})`:""}: ${p(i.rejection_note)}<br><span class="text-muted">Waiting for the requester to ask again.</span></div>`:"",u=`<button class="btn btn-small btn-secondary gate-reject-btn"
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
    `}ie({"view-issue-from-modal":(e,t)=>{e.preventDefault(),N(),oe(t.issueId)},"dismiss-approvals-explainer":()=>{T$()},"retry-load-approvals":()=>Bt()});const vo={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},bo={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Cm=0;function Bm(e){Cm=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=Dm(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Dm(e="",t="",n=""){const i=Cm++,s=Object.keys(vo).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?vo[e]:vo.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${bo[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
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
    `}function L$(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Dm()),yo()}function A$(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),yo()}function C$(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=vo[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${bo[o]}</option>`).join(""),Mm(e),yo()}function Mm(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Bs(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function yo(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function jm(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,l=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,c=o.querySelector(".condition-value");let d=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw Bs("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw Bs("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${l}`;if(n.has(u))throw Bs(`Duplicate condition: ${r} ${bo[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),l==="isnull")t[u]=!0;else if(l==="in"||l==="contains")t[u]=d?d.split(",").map(f=>f.trim()).filter(f=>f):[];else if(l==="gte"||l==="lte"){if(!d)throw Bs(`Please enter a numeric value for ${r} ${bo[l]}.`),new Error(`Missing numeric value for ${u}`);const f=parseInt(d,10);if(isNaN(f))throw Bs(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${d}`);t[u]=f}else t[u]=d}return yo(),Object.keys(t).length>0?t:null}ie({"add-condition-row":()=>{L$()},"remove-condition-row":(e,t)=>{A$(Number(t.rowId))},"update-operator-options":(e,t)=>{C$(Number(t.rowId))},"toggle-value-input":(e,t)=>{Mm(Number(t.rowId))}});let Se=[],tc=null;const Rm=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];lt((e,t)=>{e==="currentProject"&&(t&&$v(t),Rm.forEach(n=>{const i=document.getElementById(n);i&&(i.value=t||"")}),Z$(t||""))});const wo={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function Pm(e){tc=e}function X(){return Se}function B$(e){Se=e}function wi(e){const t=Se.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return wo[n]||wo.fibonacci}function mn(e,t){if(e==null)return"No estimate";const i=wi(t).find(s=>s.value===e);return i?i.label:`${e} points`}function ko(e,t){return e==null||e===0?!1:!wi(t).some(i=>i.value===e)}function D$(e){const t=Se.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(wo[n]||wo.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function mt(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await h.getProjects(e);if(((n=T())==null?void 0:n.id)!==e)return;Se=i,Nm(),qm()}catch(i){$("load projects",i)}}function qm(){const e=K();if(e&&Se.some(i=>i.id===e))return;const t=nc();if(t&&Se.some(i=>i.id===t)){ct(t);return}const n=uu();if(n&&Se.some(i=>i.id===n)){ct(n);return}Se.length>0&&ct(Se[0].id)}function Nm(){const e='<option value="">All Projects</option>'+Se.map(a=>`<option value="${a.id}">${p(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+Se.map(a=>`<option value="${a.id}">${p(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],i=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),i.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const s=K();Rm.forEach(a=>{const o=document.getElementById(a);o&&(o.value=s||"")})}function Om(){return uu()}function Hn(){const e=document.getElementById("projects-list");if(Se.length===0){e.innerHTML=F({icon:O.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=Se.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${m(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${ee(t.color)}20; color: ${ee(t.color)}">
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
    `).join("")}function M$(e){ct(e),q("issues")}function Hm(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function j$(e){e.preventDefault();const t=T();if(!t){k("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(t.id,n),await mt(),Hn(),N(),k("Project created!","success")}catch(i){$("create project",i)}return!1}async function R$(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await mt(),Hn(),N(),k("Project updated!","success")}catch(i){$("update project",i)}return!1}async function P$(e){const t=Se.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await mt(),Hn(),N(),k("Project deleted","success")}catch(n){$("delete project",n)}}let je=null;function Fm(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function q$(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await h.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(je!==e.id)return;const i=n.filter(a=>a.id===e.default_epic_id||a.status!=="done"&&a.status!=="canceled"),s=e.default_epic_id&&!i.some(a=>a.id===e.default_epic_id)?`<option value="${m(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(a=>`<option value="${m(a.id)}">${p(a.identifier)} ${p(a.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function Um(e){je=e,Se.length===0&&await mt();const t=Se.find(n=>n.id===e);if(!t){k("Project not found","error"),q("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,Fm("ps-require-assignee-on-claim",t.require_assignee_on_claim===!0),Fm("ps-require-epic-on-close",t.require_epic_on_close===!0),q$(t),document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Gm("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Gm(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Kt||Kt.length===0)&&Ds()}function N$(){je=null,Kt=[]}function O$(e){je=e}function H$(){return Kt}async function F$(){if(!je)return;const e=document.getElementById("ps-name").value.trim();if(!e){k("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(je,t),await mt(),k("Settings saved","success");const n=Se.find(i=>i.id===je);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){$("save project settings",n)}}async function U$(){if(!je)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const a=document.getElementById("ps-default-epic");a&&!a.disabled&&(n.default_epic_id=a.value||null);try{await h.updateProject(je,n),await mt(),k("Settings saved","success")}catch(o){$("save settings",o)}}let Kt=[];async function Ds(){if(!je)return!1;try{return Kt=await h.getRituals(je),G$(),typeof tc=="function"&&tc(),!0}catch(e){return $("load rituals",e),!1}}function G$(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Kt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Kt.filter(i=>i.trigger==="ticket_close"),n=Kt.filter(i=>i.trigger==="ticket_claim");ki("ps-sprint-rituals-list",e,"sprint"),ki("ps-close-rituals-list",t,"close"),ki("ps-claim-rituals-list",n,"claim")}function ki(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>m(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${p(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${p(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${Je(a.prompt)}</div>
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
  `}).join("")}async function zm(e){if(!je)return;let t=[];try{t=await h.getRitualGroups(je)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Bm(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,U()}function z$(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function V$(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function Vm(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw k("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(je,{name:t,selection_mode:n})).id}return e.value||null}async function W$(e){var s;e.preventDefault();let t;try{t=jm()}catch{return!1}let n;try{n=await Vm()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await h.createRitual(je,i),await Ds(),N(),k("Ritual created!","success")}catch(a){$("create ritual",a)}return!1}async function K$(e){const t=Kt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(je)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Bm(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,U()}async function Y$(e,t){var a;e.preventDefault();let n;try{n=jm()}catch{return!1}let i;try{i=await Vm()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await h.updateRitual(t,s),await Ds(),N(),k("Ritual updated!","success")}catch(o){$("update ritual",o)}return!1}async function Q$(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await Ds(),k("Ritual deleted","success")}catch(n){$("delete ritual",n)}}ie({"view-project":(e,t)=>{M$(t.projectId)},"view-project-settings":(e,t)=>{Um(t.projectId)},"create-project":e=>{j$(e)},"update-project":(e,t)=>{R$(e,t.projectId)},"confirm-delete-project":(e,t)=>{P$(t.projectId)},"edit-project-ritual":(e,t)=>{K$(t.ritualId)},"delete-project-ritual":(e,t)=>{Q$(t.ritualId,t.ritualName)},"create-project-ritual":e=>{W$(e)},"update-project-ritual":(e,t)=>{Y$(e,t.ritualId)},"toggle-ritual-conditions":()=>{z$()},"ritual-group-change":()=>{V$()}});function nc(){const t=new URLSearchParams(window.location.search).get("project");return t||Om()}function Z$(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const ic={},Wm=new Map;let sc=null,ac=null,oc=null,rc=null,lc=null,cc=null,dc=null,Km=!1;function X$(e){Object.assign(ic,e)}function J$({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a,beforeScrollRestore:o}={}){e&&(sc=e),t&&(ac=t),n&&(oc=n),i&&(rc=i),s&&(lc=s),a&&(cc=a),o&&(dc=o)}function Ym(){return Object.keys(ic)}const eE=["issues","query","board","sprints","epics","documents","rituals","approvals","my-issues"],Qm={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects",people:"people"};function Ms(e){document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)})}function Zm(){sc&&sc()}function q(e,t=!0,{transition:n=!1}={}){if(t&&fn(),is(e),t){let a;const o=nc();e==="my-issues"?a=o?`/?project=${o}`:"/":e==="issues"&&window.location.search?a=`/issues${window.location.search}`:eE.includes(e)&&o?a=`/${e}?project=${o}`:a=`/${e}`,history.pushState({view:e},"",a)}Ms(e),Zm();const i=()=>{document.querySelectorAll(".view").forEach(o=>o.classList.add("hidden"));const a=document.getElementById(`${e}-view`);a&&a.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=ic[e];s&&s(),t&&window.scrollTo(0,0)}function Xm(){var s;is(null);const e=window.location.pathname.split("/").filter(Boolean),t={"gate-approvals":"approvals"},n=e.length===0?"my-issues":t[e[0]]||e[0],i=e.length<=1&&Ym().includes(n);document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden")),i?((s=document.getElementById(`${n}-view`))==null||s.classList.remove("hidden"),Ms(n)):Ms(Qm[e[0]]||null)}function uc(){var i;const t=window.location.pathname.split("/").filter(Boolean);rc&&rc(),A()||is("my-issues");let n="my-issues";if(t.length===0||t[0]==="")q("my-issues",!1);else if(ac&&ac(t)){const s=Qm[t[0]];s&&Ms(s);return}else{n=t[0];const s={"gate-approvals":"approvals"};s[n]&&(n=s[n]),Ym().includes(n)?q(n,!1):(n="my-issues",q("my-issues",!1))}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function fn(){Wm.set(window.location.href,window.scrollY)}function pc(e){fn(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),lc&&lc(e)}function Jm(e){fn(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),cc&&cc(e)}function ef(){const e=Wm.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{dc&&dc(),window.scrollTo(0,e)})}function tf(){Km||(Km=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&oc&&oc(e.state)){ef();return}(t=e.state)!=null&&t.view?q(e.state.view,!1):uc(),ef()}))}let Yt=0,$i=!1,js=null,$o=null,Rs=0;const Fn=new Map;function Eo(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Yt===0&&!$i),e.textContent=$i?"Stopped":"Offline",e.title=$i?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function Ke(e,t){return Fn.has(e)||Fn.set(e,new Set),Fn.get(e).add(t),()=>{var n;return(n=Fn.get(e))==null?void 0:n.delete(t)}}function tE(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const nE=1e3;function _o(){$o&&(clearTimeout($o),$o=null)}const iE="chaotic",mc=4001,sE=4003,aE="chaotic.bearer.";function oE(e){return[iE,aE+e]}function nf(e,{isReconnect:t=!1}={}){js&&(clearTimeout(js),js=null),_o();const n=sb();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),Pr(null)),!t&&(Yt>0||$i)&&(Yt=0,$i=!1,Eo());const i=h.getToken();if(!i)return;const s=++Rs,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o,oE(i));Pr(r);let l=!1;const c=()=>{if(l||s!==Rs)return;l=!0,_o();const d=Yt>0;d&&k("Live updates reconnected","success"),Yt=0,Eo(),d&&fc({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===Rs&&(console.log("WebSocket connected"),_o(),$o=setTimeout(c,nE))},r.onmessage=d=>{if(s!==Rs)return;c();let u;try{u=JSON.parse(d.data)}catch(f){console.error("WebSocket: malformed message",f);return}fc(u)},r.onclose=d=>{if(s!==Rs)return;console.log("WebSocket disconnected"),_o();const u=d==null?void 0:d.code;if(u===mc||u===sE){Pr(null),Yt=0;const g=u===mc&&Sr()===i;$i=!g,Eo();let v="forbidden";u===mc&&(v=g?"unauthorized":"superseded"),fc({type:v,entity:"connection",data:{code:u,teamId:e}});return}Yt++,Yt===1&&k("Live updates disconnected. Reconnecting...","warning"),Eo();const f=tE(Yt-1);js=setTimeout(()=>{js=null,T()&&T().id===e&&nf(e,{isReconnect:!0})},f)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function fc(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=Fn.get(`${n}:${t}`);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=Fn.get(n);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=Fn.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}function rE(e){return e==="gate"?"Sign off":"Approve"}function lE(e){return Object.entries(e||{}).filter(([,t])=>t!=null).map(([t,n])=>`data-${t.replace(/[A-Z]/g,i=>`-${i.toLowerCase()}`)}="${m(String(n))}"`).join(" ")}function cE(e,{approveAction:t,sendBackAction:n=null,data:i={},busy:s=!1,size:a=""}={}){const o=lE(i),r=s?' aria-disabled="true" aria-busy="true"':"",c=[`<button type="button" class="${a==="sm"?"btn btn-primary btn-sm":"btn btn-primary"}" data-action="${m(t)}" ${o}${r}>${rE(e)}</button>`];return n&&c.push(`<button type="button" class="ticket-gate-text-btn" data-action="${m(n)}" ${o}>Send back…</button>`),c}const dE={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device",children_closed:"Nothing left open"};let Ei=0,Dt=!1,ke=null,gn=null;const Ps=new Set,gc=new Set(["review_requested","gate_pending"]),sf={all:null,approvals:["review_requested","gate_pending"],mentions:["mention"],assigned:["assignment"]};let qs="all";const Qt=new Map,hn=new Set,Ns=new Map,hc=new Set,Mt=new Map,ft=new Map;function af(e){Mt.get(e)===null&&Mt.set(e,Ei)}function vc(e){const t=ft.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=Ei)}function uE(e){return e.filter(t=>!Mt.has(t.id)).map(t=>{const n=ft.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(Dt&&ft.has(t.id)&&t.id!==ke))}function pE(e){for(const[t,n]of Mt)n!==null&&e>n&&Mt.delete(t);for(const[t,n]of ft)n.confirmedAfter!==null&&e>n.confirmedAfter&&ft.delete(t)}function mE(e,t){t!=null&&t.id&&(e==="archived"?(Mt.has(t.id)||Mt.set(t.id,null),af(t.id)):e==="read"&&vc(t.id))}async function _i(){const e=T();if(e){try{const t=await h.getInboxUnreadCount(e.id);os(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}Os()}}function Os(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=Ia();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0);const n=document.getElementById("inbox-header-count");n&&(n.textContent=t>0?`${t} unread`:"")}async function xi({focusFirst:e=!1,background:t=!1}={}){const n=T();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++Ei;t||(gn={focusFirst:e||!!(gn!=null&&gn.focusFirst)},ke=null,fE(i));try{const a=await h.getInbox(n.id,{unread:Dt,kinds:sf[qs],limit:100});if(s!==Ei)return;const o=new Set(Mt.keys());pE(s);const r=uE(a||[]),l=gn;gn=null,l?(Gt(r),Fs(),l.focusFirst&&!nt()&&vE()):gE(r,o)}catch(a){if(s!==Ei)return;gn?(gn=null,i.innerHTML=F({icon:O.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),$("load inbox",a)):console.error("Failed to refresh inbox:",a)}_i()}function fE(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function xo(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function of(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function rf(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function lf(e,t){if(!e)return;const n=xo(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=of(n||t)),i==null||i.focus({preventScroll:!0})}function gE(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=le(),s=[...n.querySelectorAll(".inbox-row")],a=n.querySelector(".inbox-row.keyboard-selected"),o=(a==null?void 0:a.dataset.entryId)||null,r=a?s.indexOf(a):-1,l=rf(),c=window.scrollY,d=n.scrollTop;let u=e;if(ke&&!e.some(v=>v.id===ke)){const v=i.find(y=>y.id===ke);if(v&&Dt&&!t.has(ke)){u=[...e];const y=u.findIndex(w=>w.created_at<v.created_at);u.splice(y===-1?u.length:y,0,v)}else ke=null}Gt(u),Fs();let f=-1;o&&(f=u.findIndex(v=>v.id===o),f===-1&&u.length&&(f=Math.min(r,u.length-1))),f>=0?Hs(f,{focus:!1}):xa(-1);const g=f>=0?n.querySelectorAll(".inbox-row")[f]:null;lf(l,g),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function hE(e,t){if(!(t!=null&&t.id))return!1;const n=le().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function vn(e){const t=le();for(const n of new Set(e)){const i=xo(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const a=i.contains(document.activeElement)?rf():null,o=document.createElement("template");o.innerHTML=ff(s).trim();const r=o.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),lf(a,r)}}function Hs(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){xa(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),xa(i),t&&of(n[i]).focus({preventScroll:!0})}function vE(){Hs(0)}async function Ii(e){const t=le(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;ke===e&&(ke=null),Mt.set(e,null),Gt(t.filter(a=>a.id!==e)),s&&os(Math.max(0,Ia()-1)),Fs(),Os(),Hs(n);try{await h.archiveInbox(e),af(e)}catch(a){Mt.delete(e),console.error("Failed to archive inbox entry:",a)}}function cf(e){var s,a;const t=le(),n=t.findIndex(o=>o.id===e);if(n===-1)return;const i=ke;ke=i===e?null:e,ke===e&&(df(e),bc(t[n])),vn([i,e]),Hs(n),ke===e&&((a=(s=xo(e))==null?void 0:s.scrollIntoView)==null||a.call(s,{block:"nearest"}))}function df(e){const t=le(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,ft.set(e,{readAt:i,confirmedAfter:null}),Gt([...t]),os(Math.max(0,Ia()-1)),Os(),h.markInboxRead(e).then(()=>vc(e),s=>{var o;((o=ft.get(e))==null?void 0:o.readAt)===i&&ft.delete(e);const a=le().find(r=>r.id===e);a&&a.read_at===i&&(a.read_at=null,Gt([...le()]),vn([e])),_i(),$("mark inbox entry read",s)})}function bE(e){var i;const n=le().findIndex(s=>s.id===e);if(n!==-1){if(df(e),Dt)ke===e&&(ke=null),Gt(le().filter(s=>s.id!==e)),Fs(),Hs(n);else if(vn([e]),!document.activeElement||document.activeElement===document.body){const s=xo(e);(i=s==null?void 0:s.querySelector(".inbox-row-toggle"))==null||i.focus({preventScroll:!0})}}}function yE(){if(ke===null)return!1;const e=ke;return ke=null,vn([e]),!0}function uf(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function wE(e){if(Ps.has(e))return;const t=le().find(i=>i.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender";Ps.add(e),uf(e,!0);try{await h.updateIssue(t.issue_id,{assignee_id:t.source_user_id})}catch(i){Ps.delete(e),uf(e,!1),$(`reassign ${t.issue_identifier||"issue"} back to ${n}`,i);return}Ps.delete(e),Ii(e)}function kE(){pf(!Dt)}function pf(e){e!==Dt&&(Dt=e,document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(t=>{const n=t.dataset.filter==="unread"===Dt;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),xi({focusFirst:!0}))}function $E(e){!(e in sf)||e===qs||(qs=e,document.querySelectorAll('[data-action="set-inbox-kind"]').forEach(t=>{const n=t.dataset.kind===qs;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),xi({focusFirst:!0}))}async function bc(e,{force:t=!1}={}){var a;if(!e||!gc.has(e.kind)||!e.issue_id||!e.ritual_id||e.state==="resolved")return;const n=Qt.get(e.id),i={};Qt.set(e.id,(n==null?void 0:n.state)==="ready"&&!t?{...n,token:i}:{state:"loading",token:i}),t&&vn([e.id]);let s;try{const o=await h.getTicketRitualsStatus(e.issue_id),r=((o==null?void 0:o.pending_rituals)||[]).find(c=>c.id===e.ritual_id)||null,l=r?null:((o==null?void 0:o.completed_rituals)||[]).find(c=>c.id===e.ritual_id)||null;s={state:"ready",ritual:r,decided:l}}catch(o){console.error("Failed to load ritual for inbox entry:",o),s=(n==null?void 0:n.state)==="ready"&&!t?n:{state:"error"}}((a=Qt.get(e.id))==null?void 0:a.token)===i&&(Qt.set(e.id,s),vn([e.id]))}function EE(e){return(e.actions||[]).some(t=>t.kind==="approve")}function _E(e){return(e.actions||[]).length>0}function xE(e){var r;if(e.state==="resolved")return'<div class="inbox-decision-status">Already decided. Nothing is waiting on you here.</div>';const t=Qt.get(e.id);if(!t||t.state==="loading")return'<div class="inbox-decision-status" role="status">Loading the attestation…</div>';if(t.state==="error")return`<div class="inbox-decision-status">Couldn’t load the attestation.
            <button type="button" class="ticket-gate-text-btn accent" data-action="retry-inbox-decision"
                data-entry-id="${m(e.id)}">Try again</button></div>`;const n=t.ritual;if(!n){if(t.decided){const l=(r=t.decided.attestation)==null?void 0:r.approved_by_name;return`<div class="inbox-decision-status">Already decided${l?` by ${p(l)}`:""}. Nothing is waiting on you here.</div>`}return'<div class="inbox-decision-status">This ritual no longer applies to the ticket. Open it to see where it stands.</div>'}const i=e.kind==="review_requested",s=n.last_rejection&&!n.last_rejection.superseded_at?n.last_rejection:null,a=n.prompt?i?`<details class="inbox-decision-asks" data-entry-id="${m(e.id)}"${hc.has(e.id)?" open":""}><summary>What ${p(n.name)} asks</summary>
                   <div class="ticket-gate-asks markdown-body">${Je(n.prompt)}</div></details>`:`<div class="ticket-gate-asks markdown-body">${Je(n.prompt)}</div>`:"";let o="";return i&&!dn(n)?o=s?`<div class="inbox-decision-status">Sent back by ${p(s.rejected_by_name||"someone")}: “${p(s.note||"")}”. Waiting on a new attestation.</div>`:'<div class="inbox-decision-status">Not attested any more. Waiting on a new attestation.</div>':!i&&s&&(o=`<div class="inbox-decision-status">Sent back by ${p(s.rejected_by_name||"someone")}: “${p(s.note||"")}”.</div>`),`
        <div class="inbox-decision">
            ${i?a:""}
            ${pl(n)}
            ${i?"":a}
            ${o}
        </div>`}function Io(e){const t=Qt.get(e.id),n=(t==null?void 0:t.state)==="ready"?t.ritual:null;if(!n||!EE(e))return null;if(e.kind==="review_requested")return dn(n)?n:null;const i=n.last_rejection&&!n.last_rejection.superseded_at;return!n.attestation&&!i?n:null}function IE(e){if(!gc.has(e.kind)||!e.issue_id)return[];const t=Io(e),n=_E(e)?`<button type="button" class="inbox-action-btn" data-action="comment-inbox-entry"
        data-entry-id="${m(e.id)}">Comment…</button>`:"";if(!t)return n?[n]:[];const i=e.kind==="review_requested",[s,a]=cE(i?"review":"gate",{approveAction:i?"approve-inbox-entry":"sign-off-inbox-entry",sendBackAction:"send-back-inbox-entry",size:"sm",busy:hn.has(e.id),data:{entryId:e.id,ritualId:t.id,issueId:e.issue_id,ritualName:t.name,...i?{}:{ritualArtifact:t.artifact||""}}});return[s,a,n].filter(Boolean)}const SE=["approve-inbox-entry","sign-off-inbox-entry","send-back-inbox-entry","comment-inbox-entry"].map(e=>`#inbox-list [data-action="${e}"]`).join(", ");function mf(e,t){document.querySelectorAll(SE).forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function yc(e,{comment:t=null}={}){if(hn.has(e))return!1;const n=le().find(r=>r.id===e),i=n?Io(n):null;if(!i)return n&&k("This is no longer waiting on a decision from you.","error"),!1;const s=n.kind==="review_requested";hn.add(e),mf(e,!0);const a=`${s?"approve":"sign off on"} ${i.name}`;try{t&&s&&Ns.get(e)!==t&&(es(await h.createComment(n.issue_id,t)),Ns.set(e,t)),s?await h.approveTicketRitual(i.id,n.issue_id):await h.completeTicketGateRitual(i.id,n.issue_id,t||null)}catch(r){return hn.delete(e),mf(e,!1),$(a,r),bc(n,{force:!0}),!1}hn.delete(e),Qt.delete(e),Ns.delete(e);const o=n.issue_identifier?` on ${n.issue_identifier}`:"";return k(`${s?"Approved":"Signed off on"} ${i.name}${o}.`,"success"),Ii(e),!0}function TE(e){if(!hn.has(e.entryId)){if(e.ritualArtifact){const t=e.entryId;Lm(e.ritualId,e.issueId,e.ritualName,e.ritualArtifact,()=>{Qt.delete(t),Ii(t)});return}yc(e.entryId)}}function LE(e){const t=e.entryId;hn.has(t)||Zl(e.ritualId,e.issueId,e.ritualName,()=>{Qt.delete(t),Ii(t)})}function AE(e){const t=le().find(c=>c.id===e);if(!t||!t.issue_id||hn.has(e))return;const n=Io(t),i=!!n&&!(t.kind==="gate_pending"&&n.artifact),s=t.kind==="review_requested"?"Comment and approve":"Comment and sign off",a=t.issue_identifier||"the ticket";document.getElementById("modal-title").textContent=`Comment on ${a}`,document.getElementById("modal-content").innerHTML=`
        <form id="inbox-comment-form" class="inbox-comment-form" novalidate>
            <div class="form-group">
                <label for="inbox-comment-text">Comment</label>
                <textarea id="inbox-comment-text" rows="5" required aria-describedby="inbox-comment-help"
                    placeholder="${m(n?"Questions, or what has to change.":"Your comment")}"></textarea>
                <p class="form-help" id="inbox-comment-help">${i&&t.kind==="gate_pending"?`Comment posts it on ${p(a)}; Comment and sign off saves it as the sign-off note.`:`Posted on ${p(a)}.`}${n?" To stop it until something changes, use Send back instead.":""}</p>
                <p class="form-error hidden" id="inbox-comment-error" role="alert">Add a comment first.</p>
            </div>
            <div class="inbox-comment-actions">
                <button type="button" class="btn btn-secondary" data-action="close-inbox-comment">Cancel</button>
                ${i?`<button type="submit" class="btn btn-secondary" value="comment">Comment</button>
                       <button type="submit" class="btn btn-primary" value="decide">${p(s)}</button>`:'<button type="submit" class="btn btn-primary" value="comment">Comment</button>'}
            </div>
        </form>
    `;const o=document.getElementById("inbox-comment-form"),r=document.getElementById("inbox-comment-text"),l=document.getElementById("inbox-comment-error");r.addEventListener("input",()=>{r.value.trim()&&l.classList.add("hidden")}),r.addEventListener("keydown",c=>{if(c.key==="Enter"&&(c.metaKey||c.ctrlKey)){c.preventDefault();const d=o.querySelector('button.btn-primary[type="submit"]');o.requestSubmit?o.requestSubmit(d||void 0):d==null||d.click()}}),o.addEventListener("submit",async c=>{var v,y;if(c.preventDefault(),!r.value.trim()){l.classList.remove("hidden"),r.focus();return}const d=[...o.querySelectorAll('button[type="submit"]')];d.forEach(w=>{w.disabled=!0});const u=((v=c.submitter)==null?void 0:v.value)==="decide";if(await CE(e,r.value,{decide:u})){N();return}d.forEach(w=>{document.contains(w)&&(w.disabled=!1)});const g=le().find(w=>w.id===e);(!g||!Io(g))&&((y=o.querySelector('button[value="decide"]'))==null||y.remove())}),U(),r.focus()}async function CE(e,t,{decide:n=!1}={}){const i=(t||"").trim(),s=le().find(o=>o.id===e);if(!i||!s||!s.issue_id)return!1;if(n)return yc(e,{comment:i});if(Ns.get(e)===i)return Ns.delete(e),k(`Comment posted on ${s.issue_identifier||"the ticket"}.`,"success"),!0;let a;try{a=await h.createComment(s.issue_id,i)}catch(o){return $(`comment on ${s.issue_identifier||"the ticket"}`,o),!1}return es(a),k(`Comment posted on ${s.issue_identifier||"the ticket"}.`,"success"),!0}const BE='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',DE='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';function ME(e){const t=[...(e||"").trim()][0];return t?t.toUpperCase():"•"}function ff(e){const t=!e.read_at,n=e.id===ke,i=dE[e.kind]||e.kind,s=e.issue_identifier||e.document_title||"",a=[`data-entry-id="${m(e.id)}"`,e.issue_id?`data-issue-id="${m(e.issue_id)}"`:"",e.document_id?`data-document-id="${m(e.document_id)}"`:""].filter(Boolean).join(" "),o=`inbox-panel-${e.id}`;return`
        <div class="inbox-row${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${a}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${m(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${m(o)}"`:""}>
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':'<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${p(ME(e.source_user_name))}</span>
                    <span class="inbox-row-header">
                        <span class="badge badge-inbox-${m(e.kind)}">${p(i)}</span>
                        ${s?`<span class="inbox-row-source">${p(s)}</span>`:""}
                    </span>
                    <span class="inbox-row-text">
                        <span class="inbox-row-title">${p(e.title)}</span>
                        ${!n&&e.body?`<span class="inbox-row-body">${p(e.body)}</span>`:""}
                    </span>
                </button>
                ${n?jE(e,s,o):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${t?`<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${m(e.id)}" title="Mark read" aria-label="Mark read">${BE}</button>`:""}
                    <button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${m(e.id)}" title="Archive (e)" aria-label="Archive">${DE}</button>
                </span>
                <span class="inbox-row-time">${p(Cs(e.created_at))}</span>
            </div>
        </div>
    `}function jE(e,t,n){const i=e.kind==="assignment"&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,a=e.source_user_name,o=t?`Open ${p(t)}`:"Open",r=gc.has(e.kind)&&e.issue_id&&e.ritual_id,l=[...r?IE(e):[],i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${m(e.id)}"${Ps.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${a?` to ${p(a)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
                    data-entry-id="${m(e.id)}"
                    ${e.issue_id?`data-issue-id="${m(e.issue_id)}"`:""}
                    ${e.document_id?`data-document-id="${m(e.document_id)}"`:""}>${o}</button>`:"",`<button type="button" class="inbox-action-btn" data-action="archive-inbox-entry"
                data-entry-id="${m(e.id)}">Archive</button>`].filter(Boolean).join("");return`
        <div class="inbox-row-expanded-panel" id="${m(n)}" role="region"
             aria-label="${m(e.title)}">
            ${a&&!r?`<div class="inbox-expanded-source">from ${p(a)}</div>`:""}
            ${r?xE(e):e.body?`<div class="inbox-expanded-body">${p(e.body)}</div>`:""}
            <div class="inbox-action-bar">${l}</div>
        </div>
    `}const gf={all:{noun:"items",heading:"Inbox zero",description:"Approvals, mentions, assignments, and more will show up here."},approvals:{noun:"approvals",heading:"Nothing to approve",description:"Reviews and gates waiting on you will show up here."},mentions:{noun:"mentions",heading:"No mentions",description:"Comments that @mention you will show up here."},assigned:{noun:"assignments",heading:"Nothing newly assigned",description:"Tickets someone assigns to you will show up here."}};function Fs(){const e=document.getElementById("inbox-list");if(!e)return;const t=le();if(t.length===0){const n=gf[qs]||gf.all;e.innerHTML=F({icon:O.inbox,heading:Dt?`No unread ${n.noun}`:n.heading,description:Dt?"Nothing unread right now.":n.description});return}e.innerHTML=PE(t)}function RE(e,t=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"Older";const i=a=>new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),s=Math.round((i(t)-i(n))/864e5);return s<=0?"Today":s===1?"Yesterday":s<7?"Last 7 days":"Older"}function PE(e){const t=[];for(const n of e){const i=RE(n.created_at),s=t[t.length-1];s&&s.label===i?s.entries.push(n):t.push({label:i,entries:[n]})}return t.map((n,i)=>`
        <section class="inbox-group" aria-labelledby="inbox-group-${i}">
            <h3 class="inbox-group-header" id="inbox-group-${i}">${p(n.label)}</h3>
            ${n.entries.map(s=>ff(s)).join("")}
        </section>
    `).join("")}async function qE(e){var s;const t=le().find(a=>a.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();ft.set(e,{readAt:n,confirmedAfter:null});try{await h.markInboxRead(e)}catch(a){((s=ft.get(e))==null?void 0:s.readAt)===n&&ft.delete(e);const o=le().find(r=>r.id===e);o&&o.read_at===n&&(o.read_at=null,Gt([...le()]),vn([e])),console.error("Failed to mark inbox entry read:",a);return}vc(e);const i=le().find(a=>a.id===e);i&&!i.read_at?(i.read_at=n,Gt([...le()]),os(Math.max(0,Ia()-1)),Os(),vn([e])):_i()}async function NE(){const e=T();if(e)try{await h.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of le())n.read_at||ft.set(n.id,{readAt:t,confirmedAfter:Ei});Gt(le().map(n=>({...n,read_at:n.read_at||t}))),os(0),Os(),Fs()}catch(t){$("mark all inbox entries read",t)}}function OE(e){e.entryId&&qE(e.entryId),e.issueId?oe(e.issueId):e.documentId&&Le(e.documentId)}function HE(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Ii(e.dataset.entryId)}function FE(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&cf(e.dataset.entryId)}const UE='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function GE(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(UE);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function zE(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}typeof document<"u"&&document.addEventListener("toggle",e=>{var n;const t=e.target;!((n=t==null?void 0:t.classList)!=null&&n.contains("inbox-decision-asks"))||!t.dataset.entryId||(t.open?hc.add(t.dataset.entryId):hc.delete(t.dataset.entryId))},!0),ie({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&zE((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||GE(e.target,n)||(e.preventDefault(),t.entryId&&cf(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),OE(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&wE(t.entryId)},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Ii(t.entryId)},"toggle-inbox-unread-filter":()=>kE(),"set-inbox-filter":(e,t)=>pf(t.filter==="unread"),"mark-inbox-read":(e,t)=>{e.preventDefault(),t.entryId&&bE(t.entryId)},"mark-all-inbox-read":()=>NE(),"set-inbox-kind":(e,t)=>$E(t.kind),"approve-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&yc(t.entryId)},"sign-off-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&TE(t)},"send-back-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&LE(t)},"close-inbox-comment":e=>{e.preventDefault(),N()},"comment-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&AE(t.entryId)},"retry-inbox-decision":(e,t)=>{e.preventDefault();const n=le().find(i=>i.id===t.entryId);n&&bc(n,{force:!0})},"retry-load-inbox":()=>xi({focusFirst:!0})});let Us=[],Un=[],wc=[],kc=[];function $c(){return Us}function hf(e){Us=Array.isArray(e)?e:[],vf()}function bn(){return Un}async function So(e=null){try{Us=await(e||h.getMyTeams()),vf()}catch(t){$("load teams",t)}}function vf(){const e=document.getElementById("team-list");Us.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Us.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${m(JSON.stringify(t))}">${p(t.name)}</button>
        `).join("")}async function To(e,t=!1,{seed:n=null}={}){Gn=null,Jn(e),document.getElementById("current-team-name").textContent=e.name;const i=document.getElementById("mobile-team-name");i&&(i.textContent=e.name);const s=document.getElementById("team-description-text");if(s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),nf(e.id),n&&WE(n)){let a=!1;try{KE(n),Gn=e.id,t?uc():q(A()||"my-issues"),a=!0}catch(o){console.error("Failed to paint from the boot cache:",o),Gn=null}if(a){bf(e).catch(o=>console.error("Failed to refresh team data:",o));return}}await bf(e),t?uc():q(A()||"my-issues")}let Gn=null;function VE(){var e;return Gn&&Gn===((e=T())==null?void 0:e.id)?Gn:null}async function bf(e){var t;await Promise.all([mt(),m_(),QE(),kw(),_i()]),((t=T())==null?void 0:t.id)===e.id&&(Gn=e.id)}function WE(e){const t=new URLSearchParams(window.location.search).get("project");return!t||Array.isArray(e.projects)&&e.projects.some(n=>n.id===t)}function KE(e){B$(Array.isArray(e.projects)?e.projects:[]),Nm(),qm(),as(Array.isArray(e.labels)?e.labels:[]),Un=Array.isArray(e.members)?e.members:[],yw(e.agents),ls(bn,Pn),ti(),bb(e.issues)}function yf(){document.getElementById("team-dropdown").classList.toggle("hidden")}function YE(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function QE(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await h.getTeamMembers(e);if(((n=T())==null?void 0:n.id)!==e)return;Un=i,ls(bn,Pn),ti()}catch(i){console.error("Failed to load team members:",i),$("load team members",i)}}function Ec(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let _c=0;async function xc(){if(!T())return;const e=++_c,t=document.getElementById("team-members-list");t&&(t.innerHTML=Ec());try{const n=await h.getTeamMembers(T().id);if(e!==_c)return;Un=n,ls(bn,Pn),ti(),ZE()}catch(n){if(e!==_c)return;t&&(t.innerHTML=F({icon:O.team,heading:"Couldn't load members",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-members"},variant:"error"})),Un=[],wf(),$("load team members",n)}}function Lo(){var n;const e=(n=ye())==null?void 0:n.id,t=Un.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function wf(){const e=document.getElementById("invite-member-btn");e&&e.classList.toggle("hidden",!Lo())}function ZE(){const e=document.getElementById("team-members-list"),t=Lo();wf(),e.innerHTML=Un.map(n=>`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar">${(n.user_name||"U").charAt(0).toUpperCase()}</div>
                <div class="member-details">
                    <span class="member-name">${p(n.user_name||"Unknown")}</span>
                    <span class="member-email">${p(n.user_email||"")}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role">${n.role}</span>
                ${t&&n.user_id!==ye().id&&n.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${m(n.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}let Ic=0;async function Ao(){if(!T())return;const e=++Ic,t=document.getElementById("team-invitations-list");t&&(t.innerHTML=Ec());try{const n=await h.getTeamInvitations(T().id);if(e!==Ic)return;wc=n,XE()}catch(n){if(e!==Ic)return;if((n==null?void 0:n.status)===403){document.getElementById("team-invitations-list").innerHTML="";return}console.error("Failed to load team invitations:",n),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function XE(){const e=document.getElementById("team-invitations-list");if(wc.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}const t=Lo();e.innerHTML=wc.map(n=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${p(n.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${p(n.role)}</span>
                    <span>Expires: ${new Date(n.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            ${t?`<button class="btn btn-secondary btn-small" data-action="issue-invitation-code" data-invitation-id="${m(n.id)}" title="For an invitee whose verification email never arrives">Code for invitee</button>
            <button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${m(n.id)}">Cancel</button>`:""}
        </div>
    `).join("")}let Sc=0;async function kf(){if(!T())return;const e=++Sc,t=document.getElementById("team-agents-list");t&&(t.innerHTML=Ec());try{const n=await h.getTeamAgents(T().id);if(e!==Sc)return;kc=n,JE()}catch(n){if(e!==Sc)return;t&&(t.innerHTML=F({icon:O.team,heading:"Couldn't load agents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-agents"},variant:"error"})),$("load team agents",n)}}function JE(){const e=document.getElementById("team-agents-list");if(e){if(kc.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=kc.map(t=>{const n=p(t.name),i=p(t.parent_user_name||"Unknown"),s=t.avatar_url||"🤖";return`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar agent-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${p(s)}</div>
                <div class="member-details">
                    <span class="member-name">${n}</span>
                    <span class="member-email">Created by ${i} • ${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">Agent</span>
            </div>
        </div>
      `}).join("")}}function $f(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function e_(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await h.createInvitation(T().id,t,n);if(await Ao(),i&&i.accept_url)return i_(t,n_(i.accept_url),i.email_queued===!0),!1;N(),k("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){t_(i)?k(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):$("send invitation",i)}return!1}function t_(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function Ef(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function n_(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!Ef(n.hostname)||Ef(i.hostname)?e:i.origin+n.pathname}function i_(e,t,n=!1){var a;const i=p(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${p(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,nt()||U(),(a=document.querySelector('[data-action="copy-invite-link"]'))==null||a.focus(),_f()}function _f(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function s_(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),k("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),k("Could not copy: the link is selected, copy it by hand","error")}}async function a_(e){let t;try{t=await h.issueInvitationVerificationCode(T().id,e)}catch(n){$("get a verification code",n);return}r_(t)}function o_(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let a;return s<3600?a=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?a=`${Math.round(s/3600)} h`:a=`${Math.round(s/86400)} days`,`${a} ${n>=i?"after":"before"} the invitation was created`}function r_(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=o_(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
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
    `,nt()||U(),_f("invitation-code")}async function l_(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(T().id,e),await xc(),k("Member removed!","success")}catch(t){$("remove member",t)}}async function c_(e){try{await h.deleteInvitation(T().id,e),await Ao(),k("Invitation canceled!","success")}catch(t){$("cancel invitation",t)}}function xf(){yf(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,U()}function d_(){T()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${m(T().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${m(T().key)}" disabled class="input-disabled">
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
    `,U())}async function u_(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await So(),await To(n),N(),k("Team created!","success")}catch(n){$("create team",n)}return!1}async function p_(e){if(e.preventDefault(),!T())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(T().id,t);Jn(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||"No description"),await So(),N(),k("Team updated!","success")}catch(n){$("update team",n)}return!1}async function m_(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await h.getLabels(e);if(((n=T())==null?void 0:n.id)!==e)return;as(i)}catch(i){console.error("Failed to load labels:",i),$("load labels",i)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),ie({"select-team":(e,t)=>{To(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{l_(t.userId)},"delete-invitation":(e,t)=>{c_(t.invitationId)},"issue-invitation-code":(e,t)=>{a_(t.invitationId)},"retry-load-team-invitations":()=>{Ao()},"retry-load-team-members":()=>{xc()},"retry-load-team-agents":()=>{kf()},"invite-member":e=>{e_(e)},"copy-invite-link":()=>{s_()},"dismiss-invite-link":()=>{N()},"create-team":e=>{u_(e)},"update-team":e=>{p_(e)}});let jt=null,Zt=0,Si=null,Ti=null,Gs=null,Tc=!1;function f_(){return Ev()}function If(){_v()}function Sf(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function g_(){jt||(jt=document.createElement("div"),jt.id="onboarding-overlay",jt.className="onboarding-overlay",document.getElementById("app").appendChild(jt))}function zs(){if(!jt)return;const e=Tc?Lf():Tf(),t=e[Zt],n=e.map((i,s)=>`<span class="onboarding-dot${s===Zt?" active":""}${s<Zt?" completed":""}"></span>`).join("");jt.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Tf(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Sf(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Sf(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Si&&(e.textContent=`${Si.name} (${Si.key})`),t&&Ti&&(t.textContent=`${Ti.name} (${Ti.key})`),n&&Gs&&(n.textContent=`${Gs.identifier} - ${Gs.title}`)}}]}function Lf(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function Lc(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Ac(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Li(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function h_(){const e=Tc?Lf():Tf();Zt<e.length-1&&(Zt++,zs())}function v_(){If(),Cf(),zn()}function b_(){If(),Cf(),zn()}async function y_(e){e.preventDefault(),Ac("onboarding-team-error"),Li("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Si=await h.createTeam({name:t,key:n}),Zt++,zs()}catch(i){Lc("onboarding-team-error",i.message||"Failed to create team"),Li("onboarding-team-submit",!1)}}async function w_(e){e.preventDefault(),Ac("onboarding-project-error"),Li("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Ti=await h.createProject(Si.id,{name:t,key:n}),Zt++,zs()}catch(i){Lc("onboarding-project-error",i.message||"Failed to create project"),Li("onboarding-project-submit",!1)}}async function k_(e){e.preventDefault(),Ac("onboarding-issue-error"),Li("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Gs=await h.createIssue(Ti.id,{title:t}),Zt++,zs()}catch(n){Lc("onboarding-issue-error",n.message||"Failed to create issue"),Li("onboarding-issue-submit",!1)}}function Af(e=!1){Tc=e,Zt=0,Si=null,Ti=null,Gs=null,g_(),zs()}function Cf(){jt&&(jt.remove(),jt=null)}function Bf(){xv(),Af(!0)}ie({"onboarding-next":e=>{e.preventDefault(),h_()},"onboarding-skip":e=>{e.preventDefault(),v_()},"onboarding-finish":e=>{e.preventDefault(),b_()},"onboarding-create-team":e=>{y_(e)},"onboarding-create-project":e=>{w_(e)},"onboarding-create-issue":e=>{k_(e)}});const Df="/oauth/consent/";function $_(e){if(!e||!e.startsWith(Df))return null;const t=e.slice(Df.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function E_(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function __(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function x_(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const Mf={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function Co(e){const t=Mf[e.trust]||Mf.unverified,n=e.host?` · ${p(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${m(e.trust)}">${p(t)}${n}</span>`}function I_(e,t){return e.teams.map(n=>`<option value="${m(n.id)}"${n.id===t?" selected":""}>${p(n.name)}</option>`).join("")}function S_(e,t){const n=e&&t?e.agents.find(a=>a.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${p(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function jf(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",a=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${m(i.id)}"${s}>${p(i.name+a)}</option>`)}return n.join("")}function Rf(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${m(t.id)}">
            ${p(t.name)} <span class="oauth-muted">${p(t.key)}</span>
        </label>`).join("")}function T_(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${m(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${p(t.name)}${p(i)}
        </label>`}).join("")}function L_(e,t){const n=p(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${Co(t.client)}</p>
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
        </div>`}function A_(e,t){if(t.acts_as==="person"){L_(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=p(t.client.name),a=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",o=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${p(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${Co(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${p(t.redirect_host)}</strong></p>
            ${o}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${I_(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${jf(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${m(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${Rf(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${T_(t)}
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,Cc(e,t)}function Cc(e,t){var a;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const o=(a=e.querySelector("#oauth-team"))==null?void 0:a.value,r=S_(t.teams.find(l=>l.id===o),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function C_(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(o=>o.value),s=e.querySelector('input[name="oauth-policy"]:checked'),a={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const o=e.querySelector("#oauth-agent-name").value.trim();o&&(a.agent_name=o)}return a}function B_(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function Vs(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${p(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function D_(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{h.logout(),t()})}function M_(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(u=>u.id===s.value);e.querySelector("#oauth-agent").innerHTML=jf(d,null),e.querySelector("#oauth-projects").innerHTML=Rf(d),Cc(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>Cc(e,n));let a=!1;const o=async d=>{if(!a){a=!0;try{const u=d?await h.approveOAuthRequest(t,C_(e)):await h.denyOAuthRequest(t);if(!E_(u.redirect)){Vs(e,"The app's return address isn't one a browser should be sent to.");return}i(u.redirect)}catch(u){if(a=!1,u&&u.status===404){Vs(e,"It has expired, was already answered, or belongs to someone else.");return}B_(e,u&&u.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),o(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>o(!1))}async function j_(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=__();x_(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await h.getOAuthRequest(e)}catch(a){a&&a.status===404?Vs(i,"It has expired, was already answered, or belongs to someone else."):a&&a.status===403&&a.detail&&a.detail.error_code==="web_login_required"?D_(i,n):a&&a.status===403?Vs(i,"Only a person signed in to Chaotic can approve an app."):Vs(i,a&&a.message||"Something went wrong");return}A_(i,s),M_(i,e,s,t)}const Bc="/invite/",Ws="/invite",Dc="chaotic.inviteToken",Pf="invite-auth-notice";let Mc=null;const R_="This invitation is no longer valid.",P_={owner:"an owner",admin:"an admin",member:"a member"};function q_(e){if(!e||!e.startsWith(Bc))return null;const t=e.slice(Bc.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function qf(){const{pathname:e}=window.location,t=q_(e);if(t){Mc=t;try{sessionStorage.setItem(Dc,t)}catch{}return history.replaceState(null,"",Ws),t}if(!Nf(e))return null;let n=null;try{n=sessionStorage.getItem(Dc)}catch{}const i=n||Mc;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function Nf(e){return e===Ws||e===`${Ws}/`}function Of(e){return Nf(e)||!!(e&&e.startsWith(Bc))}function jc(){Mc=null;try{sessionStorage.removeItem(Dc)}catch{}}function N_(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function O_(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function Rc(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function Hf(){const e=O_();return Bo(),Rc(e),e}function H_(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),Bo()}function Bo(){var e;(e=document.getElementById(Pf))==null||e.remove()}function Pc(e){const t=e.invited_by_name?`<strong>${p(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=P_[e.role]||`a ${p(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${p(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${p(e.email_hint)}</strong>${F_(e)}</p>`}function F_(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${p(n)}`}const U_="Ask whoever invited you to send a new invitation.",G_="Reload the page to try again.";function qc(e,t=R_,n=U_){e.innerHTML=`
        <div class="invite-page">
            <h1>${p(t)}</h1>
            <p class="invite-muted">${p(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function z_(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function Ff(){window.location.pathname!==Ws&&history.replaceState(null,"",Ws),z_(Hf())}function V_(e,t){e.innerHTML=`
        <div class="invite-page">
            ${Pc(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function W_(e,t,n){const i=N_(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${p(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${Pc(t)}
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
            ${Pc(t)}
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
        </div>`}function K_(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function Y_(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),a=e.querySelector("#invite-code-form"),o=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=u=>{l.textContent=u,l.classList.remove("hidden")},d=()=>{var u;a.classList.remove("hidden"),(u=o.focus)==null||u.call(o)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const u=await h.requestEmailVerification(),f=K_(u.expires_at);c(`We sent a code to ${u.email}${f?`; it works until ${f}`:""}.`),s.textContent="Send a new code",d()}catch(u){const f=u&&u.detail&&u.detail.error_code;if(u&&u.status===401){n();return}if(f==="email_already_verified"){t();return}c(u&&u.message||"Something went wrong"),u&&u.status===429&&d()}finally{s.disabled=!1}}}),a.addEventListener("submit",async u=>{var g;if(u.preventDefault(),r.disabled)return;const f=o.value.trim();if(f){r.disabled=!0;try{await h.confirmEmailVerification(f)}catch(v){r.disabled=!1;const y=v&&v.detail&&v.detail.error_code;v&&v.status===401?n():y==="email_already_verified"?t():(c(v&&v.message||"Something went wrong"),(g=o.select)==null||g.call(o));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function Q_(e,t){Bo();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=Pf,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${p(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${p(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),Bo(),t()})}function Do(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function Z_(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,u;const a=Hf();a.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let o;try{o=await h.getInvitation(e)}catch(f){f&&f.status===404?(jc(),qc(a)):qc(a,f&&f.message||"Something went wrong.",G_);return}if(!t){V_(a,o);const f=g=>{Q_(o,()=>Rc(a)),n(g)};a.querySelector("#invite-sign-in").addEventListener("click",()=>f("login")),a.querySelector("#invite-sign-up").addEventListener("click",()=>f("signup"));return}W_(a,o,t),(d=a.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=a.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async f=>{var v,y;if(l)return;l=!0,r.disabled=!0;let g;try{g=f===void 0?await h.acceptInvitation(e):await h.acceptInvitation(e,f)}catch(w){l=!1,r.disabled=!1;const S=w&&w.detail&&w.detail.error_code;if(f!==void 0&&(S==="invalid_verification_code"||S==="invitation_code_expired"||w&&w.status===429)){Do(a,w&&w.message||"That code did not work."),(y=(v=a.querySelector("#invite-admin-code"))==null?void 0:v.select)==null||y.call(v);return}w&&w.status===401?s():w&&(w.status===404||w.status===400)?(jc(),qc(a)):w&&w.status===403&&w.detail&&w.detail.error_code==="email_unverified"?(Do(a,"Verify your email address to continue."),a.querySelector("#invite-accept-actions").classList.add("hidden"),a.querySelector("#invite-verify").classList.remove("hidden")):w&&w.status===403?Do(a,`This invitation is for a different email address. Only ${o.email_hint} can accept it.`):Do(a,w&&w.message||"Something went wrong");return}jc(),Uf(a,o);try{await i(g.team_id,o.team_name)}catch(w){console.error("Joined the team but could not open it:",w),Rc(a),Uf(a,o)}};r.addEventListener("click",()=>c()),(u=a.querySelector("#invite-admin-code-form"))==null||u.addEventListener("submit",f=>{f.preventDefault();const g=a.querySelector("#invite-admin-code").value.trim();g&&c(g)}),Y_(a,{onVerified:()=>{a.querySelector("#invite-verify").classList.add("hidden"),a.querySelector("#invite-error").classList.add("hidden"),a.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function Uf(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${p(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${p(t.team_name)}</a>
            </div>
        </div>`}function Nc(e){return Z_(e,{user:ye(),showAuth:t=>{Qs(),t==="signup"?Kf():Wf()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),H_(),await zn({teamId:t}),k(`You joined ${n}`,"success")},signOut:()=>{h.logout(),It(null),Jn(null),Nc(e)}})}async function Gf(){const e=qf();if(e){await Nc(e);return}if(Of(window.location.pathname)){Ff();return}Qs()}async function zn({teamId:e,teamsRequest:t=null,snapshot:n=null}={}){var r,l;const i=$_(window.location.pathname);if(i){await j_(i);return}const s=qf();if(s){await Nc(s);return}if(Of(window.location.pathname)){Ff();return}ax(),Xm(),Mo(),nx();const a=!e&&((l=(r=n==null?void 0:n.teams)==null?void 0:r.find)==null?void 0:l.call(r,c=>c.id===n.teamId));if(a){await X_(n,a,t);return}await So(t);const o=$c();if(o.length===0&&!f_()){Af();return}o.length===0&&is("my-issues");try{if(o.length>0){const c=e&&o.find(d=>d.id===e)||o[0];await To(c,!0)}}finally{tf()}}async function X_(e,t,n){hf(e.teams);try{await To(t,!0,{seed:e})}finally{tf()}Promise.resolve(n||So().then($c)).then(async i=>{var a;if(!Array.isArray(i))return;hf(i);const s=i.find(o=>o.id===t.id);if(!s){await ex(),window.location.reload();return}if(((a=T())==null?void 0:a.id)===s.id&&s.name!==T().name){Jn(s);const o=document.getElementById("current-team-name");o&&(o.textContent=s.name)}},i=>console.error("Failed to refresh teams:",i))}const J_=2e3;let Ai=null,zf=!1,Vf=!1;function ex(){return Vf=!0,clearTimeout(Ai),Ai=null,Cr()}function Oc(){if(clearTimeout(Ai),Ai=null,Vf)return Promise.resolve();const e=ye(),t=T();return!(e!=null&&e.id)||!(t!=null&&t.id)||yu(Sr())!==e.id||VE()!==t.id?Promise.resolve():Ov(e.id,{user:e,teams:$c(),teamId:t.id,projects:X(),labels:jr(),members:bn(),agents:Pn(),issues:vb({maxQueries:3})})}function tx(){clearTimeout(Ai),Ai=setTimeout(Oc,J_)}function nx(){zf||(zf=!0,ub(tx),document.addEventListener("visibilitychange",ix),window.addEventListener("pagehide",sx))}function ix(){document.visibilityState==="hidden"&&Oc()}function sx(){Oc()}let Ci=null,Ks=null,wt=null,kt=null;function Ys(){Ci||(Ci=document.getElementById("auth-screen"),Ks=document.getElementById("main-screen"),wt=document.getElementById("login-form"),kt=document.getElementById("signup-form"))}function Qs(){Ys(),Ci&&Ci.classList.remove("hidden"),Ks&&Ks.classList.add("hidden")}function ax(){Ys(),Ci&&Ci.classList.add("hidden"),Ks&&Ks.classList.remove("hidden")}function Wf(){Ys(),wt&&wt.classList.remove("hidden"),kt&&kt.classList.add("hidden")}function Kf(){Ys(),wt&&wt.classList.add("hidden"),kt&&kt.classList.remove("hidden")}async function ox(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),It(await h.getMe()),await zn(),k("Welcome back!","success")}catch(i){$("log in",i)}return!1}async function rx(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await h.signup(t,n,i),await h.login(n,i),It(await h.getMe()),await zn(),k("Account created successfully!","success")}catch(s){$("sign up",s)}return!1}function Yf(){h.logout(),It(null),Jn(null),Qs(),k("Signed out","success")}function lx(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||/^\/api\/avatars\/[0-9a-f]{64}$/.test(e))}function Mo(){var i;const e=ye();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",$u(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?lx(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${m(s)}" alt="${m(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function cx(){Ys();const e=wt==null?void 0:wt.querySelector("form");e&&e.addEventListener("submit",s=>ox(s));const t=kt==null?void 0:kt.querySelector("form");t&&t.addEventListener("submit",s=>rx(s));const n=wt==null?void 0:wt.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),Kf()});const i=kt==null?void 0:kt.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),Wf()})}let Hc=[];async function Fc(){try{Hc=await h.getApiKeys(),dx()}catch(e){$("load API keys",e)}}function dx(){const e=document.getElementById("api-keys-list");if(e){if(Hc.length===0){e.innerHTML=F({icon:O.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=Hc.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${p(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${p(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${it(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${it(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${m(t.id)}" data-key-name="${m(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function ux(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,U()}async function px(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);N(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,U()}catch(n){$("create API key",n)}return!1}async function mx(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),k("API key copied to clipboard","success")}catch{k("Failed to copy","error")}}async function fx(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),k("API key revoked","success"),await Fc()}catch(n){$("revoke API key",n)}}ie({"create-api-key":e=>{px(e)},"copy-api-key":()=>{mx()},"dismiss-api-key-modal":()=>{N(),Fc()},"revoke-api-key":(e,t)=>{fx(t.keyId,t.keyName)}});let Uc=[];async function Qf(){try{Uc=await h.getConnections(),hx()}catch(e){$("load connected apps",e)}}function Gc(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function gx(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function hx(){const e=document.getElementById("connected-apps-list");if(e){if(Uc.length===0){e.innerHTML=F({icon:O.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=Uc.map(t=>t.acts_as==="person"?vx(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${p(Gc(t))} ${Co(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${p(t.agent?t.agent.name:"an agent")}</span>
                    <span>${p(gx(t))}</span>
                    <span>policy ${p(t.policy)}</span>
                    <span class="api-key-date">Connected ${it(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${it(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${p(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(t.id)}" data-connection-name="${m(Gc(t))}">Disconnect</button>
        </div>
    `).join("")}}function vx(e){const n=`${e.device_name||"A device"} · ${Gc(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${p(n)} ${Co(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${it(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${it(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(e.id)}" data-connection-name="${m(n)}">Sign out</button>
        </div>
    `}async function bx(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await h.revokeConnection(e),k("App disconnected","success"),await Qf()}catch(n){$("disconnect app",n)}}ie({"revoke-connection":(e,t)=>{bx(t.connectionId,t.connectionName)}});let zc=[];async function Zf(){try{zc=await h.getPushDevices(),yx()}catch(e){$("load push devices",e)}}const Xf={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function Jf(e){return e.label||e.platform||"Unnamed device"}function yx(){const e=document.getElementById("push-devices-list");if(e){if(zc.length===0){e.innerHTML=F({icon:O.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=zc.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${p(Jf(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${p(t.platform)}</span>`:""}
                    <span>via ${p(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${it(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${it(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${p(String(t.failure_count))} failed deliveries</span>`:""}
                    ${Xf[t.status]?`<span class="push-device-status">${p(Xf[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${m(t.installation_id)}" data-device-name="${m(Jf(t))}">Remove</button>
        </div>
    `).join("")}}async function wx(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await h.deletePushDevice(e),k("Device removed","success"),await Zf()}catch(n){$("remove push device",n)}}ie({"remove-push-device":(e,t)=>{wx(t.installationId,t.deviceName)}});let jo=!1,Xt=0,yn=[],Ro=[];function kx(e){Ro=e,yn=[...e]}function wn(){return jo}function $x(){if(jo)return;jo=!0,Xt=0,yn=[...Ro];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Po()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>Ex(n.target.value)),t.addEventListener("keydown",xx),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&_x(Number(i.dataset.commandIndex))}),Zs(),requestAnimationFrame(()=>t.focus())}function Po(){jo=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function Ex(e){const t=e.toLowerCase().trim();t?yn=Ro.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):yn=[...Ro],Xt=0,Zs()}function Zs(){const e=document.getElementById("command-results");if(!e)return;if(yn.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};yn.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===Xt?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function _x(e){Xt=e,Zs()}function eg(e){const t=yn[e];t&&(Po(),t.action())}function xx(e){switch(e.key){case"ArrowDown":e.preventDefault(),Xt=Math.min(Xt+1,yn.length-1),Zs();break;case"ArrowUp":e.preventDefault(),Xt=Math.max(Xt-1,0),Zs();break;case"Enter":e.preventDefault(),eg(Xt);break;case"Escape":e.preventDefault(),Po();break}}ie({"execute-command":(e,t)=>{eg(Number(t.commandIndex))}});const Ix=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function Sx(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${p(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${p(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function Tx(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${p(e.title)}</h4>
        ${e.shortcuts.map(Sx).join("")}
    </div>`}function tg(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${Ix.map(Tx).join("")}
        </div>
    `,U()}const qo=100,Vc="status!=done,canceled",Lx=["created","updated","priority","status","title","estimate"];function $e(e){return e==null?"":p(String(e))}function ng(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${m(t)}">${$e(n)}</a>`}function ig(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const Wc=[{id:"identifier",label:"ID",fixed:!0,render:e=>ng(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>ng(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>$e(Ie(e.status))},{id:"priority",label:"Priority",render:e=>$e(De(e.priority))},{id:"type",label:"Type",render:e=>$e(vt(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>$e(ig(e,"assignee"))},{id:"creator",label:"Creator",render:e=>$e(ig(e,"creator"))},{id:"project",label:"Project",render:e=>$e(e.project_key)},{id:"sprint",label:"Sprint",render:e=>$e(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=ee(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${$e(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>$e(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${m(e.parent_id)}">${$e(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>$e(it(e.created_at))},{id:"updated",label:"Updated",render:e=>$e(it(e.updated_at))},{id:"completed",label:"Completed",render:e=>$e(it(e.completed_at))},{id:"due",label:"Due",render:e=>$e(it(e.due_date))}],No=Object.fromEntries(Wc.map(e=>[e.id,e])),Ax=Wc.filter(e=>e.fixed).map(e=>e.id),Kc=["identifier","title","status","priority","assignee","updated"];function Yc(e){const t=new Set,n=[];for(const s of e||[]){const a=String(s).trim();!No[a]||t.has(a)||(t.add(a),n.push(a))}return n.length===0?[...Kc]:[...Ax.filter(s=>!t.has(s)),...n]}function Cx(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function Bx(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?Yc(t.get("cols").split(",")):[...Kc],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function Dx(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!Cx(e.cols,Kc)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function Mx(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function jx({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=qo,skip:a=0}){const o=["chaotic","issue","list"];let r=e||"",l=null;n||i?(o.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",o.push("--where",Mx(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],u=d.startsWith("-"),f=d.replace(/^[-+]/,"");let g=null;Lx.includes(f)?(o.push("--sort",f,"--order",u?"desc":"asc"),c.length>1&&(g=`The CLI sorts by one field; only "${d}" was copied.`)):g=`The CLI cannot sort by "${f}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return o.push("--limit",String(s)),a>0&&o.push("--skip",String(a)),{command:o.join(" "),warning:l}}function Rx(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function Px(e,t){const n=Yc(t).map(a=>No[a]),i=n.map(a=>`<th data-col="${m(a.id)}">${$e(a.label)}</th>`).join(""),s=e.map(a=>`<tr class="query-row" data-issue-id="${m(a.id)}">${n.map(o=>`<td class="query-col-${m(o.id)}">${o.render(a)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function qx(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,a=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${a?"":" disabled"}>Next</button>`}let H=null,Qc=null,et=null,Zc=0,Bi=!1,sg=!1;function re(e){return document.getElementById(e)}function ag(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function og(e){const t=Dx({...Qc,cols:H.cols,group:H.group,view:H.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function Nx(){const e=re("query-project-filter");if(!e)return;const t=['<option value="">All projects</option>'].concat(X().map(n=>`<option value="${m(n.id)}">${$e(n.name)}</option>`));e.innerHTML=t.join(""),e.value=H.teamScope?"":H.projectId||""}function Ox(){const e=re("query-columns-menu");e&&(e.innerHTML=Wc.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${m(t.id)}"${H.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${$e(t.label)}
        </label>`).join(""))}function Oo(e){const t=re("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${$e(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function rg(e){const t=re("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function Xc(e){var t;(t=re("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function Xs(){const e=re("query-results"),t=re("query-pager");if(!e)return;if(!et){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=et;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=Px(n,H.cols),t&&(t.innerHTML=qx(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(a=>{a.dataset.enabled=String(!a.disabled)}),Bi&&Xc(!0))}async function Ho(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!H)return;const i=T(),s=H.teamScope?{teamId:i==null?void 0:i.id}:{projectId:H.projectId};if(!s.teamId&&!s.projectId){et=null,Xs(),Oo(H.teamScope?"Select a team first.":"Select a project.");return}const a=++Zc,o=H.where===null?Vc:H.where,r=re("query-results");Bi=!0,r&&r.classList.add("loading"),Xc(!0);const l=()=>a===Zc&&A()==="query";try{const c=await h.queryIssues({...s,where:o,order:H.order,skip:(H.page-1)*qo,limit:qo});if(!l())return;H.where=c.where,H.order=c.order||null,Qc=ag(H),et={issues:c.issues||[],total:c.total,skip:c.skip};const d=re("query-where");d&&d.value.trim()===o.trim()&&(d.value=c.where),Oo(null),Bi=!1,Xs(),og(e),t&&t()}catch(c){if(!l())return;Bi=!1,n?n():et=null,Xs(),Oo(Rx(c))}finally{a===Zc&&(Bi=!1,r&&r.classList.remove("loading"),Xc(!1))}}function lg(){if(!H)return;const e=re("query-where");return H.where=e?e.value.trim():"",H.page=1,Ho("push")}function Hx(e){if(H)return H.teamScope=!e,e&&(H.projectId=e),H.page=1,rg(null),Ho("push",{onSuccess:()=>{e&&ct(e)}})}function Fx(e,t){if(!H||!No[e]||No[e].fixed)return;const n=H.cols.filter(i=>i!==e);H.cols=Yc(t?[...n,e]:n),Xs(),og("replace")}function Ux(e){if(!H||!et||Bi)return;const t=H.page+e;if(t<1||e>0&&et.skip+et.issues.length>=et.total)return;const n={page:H.page,result:et};return H.page=t,Ho("push",{onFailure:()=>{H.page=n.page,et=n.result}})}async function Gx(){if(!H)return null;const e=re("query-where"),t=e?e.value.trim():H.where??Vc,n=H.teamScope?null:X().find(o=>o.id===H.projectId),{command:i,warning:s}=jx({where:t,order:H.order,teamScope:H.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:qo,skip:et?et.skip:0}),a=re("query-cli-preview");try{await navigator.clipboard.writeText(i),k(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),a&&a.classList.add("hidden")}catch{a&&(a.textContent=i,a.classList.remove("hidden")),k("Could not copy; the command is shown below the box","warning")}return i}function zx(){var e,t,n,i,s,a,o;sg||(sg=!0,(e=re("query-where"))==null||e.addEventListener("keydown",r=>{r.key==="Enter"&&!r.shiftKey&&!r.isComposing&&(r.preventDefault(),lg())}),(t=re("query-run-btn"))==null||t.addEventListener("click",()=>lg()),(n=re("query-copy-cli-btn"))==null||n.addEventListener("click",()=>Gx()),(i=re("query-project-filter"))==null||i.addEventListener("change",r=>Hx(r.target.value)),(s=re("query-columns-btn"))==null||s.addEventListener("click",r=>{r.stopPropagation();const l=re("query-columns-menu");if(!l)return;const c=l.classList.toggle("hidden")===!1;r.currentTarget.setAttribute("aria-expanded",String(c))}),(a=re("query-columns-menu"))==null||a.addEventListener("change",r=>{r.target.matches('input[type="checkbox"]')&&Fx(r.target.value,r.target.checked)}),(o=re("query-pager"))==null||o.addEventListener("click",r=>{const l=r.target.closest("button[data-query-page]");!l||l.disabled||Ux(Number(l.dataset.queryPage))}),document.addEventListener("click",r=>{var c;const l=re("query-columns-menu");l&&!l.classList.contains("hidden")&&!r.target.closest("#query-columns-picker")&&(l.classList.add("hidden"),(c=re("query-columns-btn"))==null||c.setAttribute("aria-expanded","false"))}))}function Vx(){var s,a;zx();const e=Bx(window.location.search),t=X();let n=null;if(!e.teamScope){const o=r=>r&&t.some(l=>l.id===r);if(!o(e.projectId)){const r=e.projectId;e.projectId=o(K())?K():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}H=e,Qc=ag(H),et=null;const i=re("query-where");return i&&(i.value=H.where===null?Vc:H.where),(s=re("query-cli-preview"))==null||s.classList.add("hidden"),(a=re("query-columns-menu"))==null||a.classList.add("hidden"),Nx(),Ox(),Oo(null),rg(n),Xs(),Ho("replace")}let Fo=[];function Wx(){return Fo}lt(e=>{e==="currentProject"&&A()==="epics"&&kn()});let Jc=0;const Js=new Set(["done","canceled"]);let Uo=!1;async function kn({fromMemory:e=!1}={}){var a;Rr(-1);const t=document.getElementById("epics-list");if(!t)return;const n=++Jc,i=fl(),s=e?Za("epics",i):void 0;s?cg(s,t):t.innerHTML=Array(4).fill(0).map(()=>`
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
        `).join("");try{if(!((a=T())!=null&&a.id)){Fo=[],t.innerHTML=F({icon:O.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const o=K(),r=o?await h.getProjectEpicProgress(o):await h.getTeamEpicProgress(T().id);if(n!==Jc||(gi("epics",i,r),s&&Xa(s,r)))return;cg(r,t)}catch(o){if(n!==Jc)return;t.innerHTML=F({icon:O.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),$("load epics",o)}}function cg(e,t){var n;if(!((n=e==null?void 0:e.epics)!=null&&n.length)){Fo=[],t.innerHTML=F({icon:O.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}fg(e,t)}function ed(e,t){return`${e} ${t}${e===1?"":"s"}`}function dg(e,t){return t<=0?"-":e>=t?"100%":`${Math.floor(e/t*100)}%`}function Kx(e){const t=e.children||{},n=(t.total||0)-(t.canceled||0);if(n<=0)return'<span class="epic-progress-text">No tickets</span>';const i=Math.round((t.done||0)/n*100),s=Math.round(((t.in_progress||0)+(t.in_review||0))/n*100),a=t.done===n,o=`${t.done||0} done, ${(t.in_progress||0)+(t.in_review||0)} in progress, ${(t.todo||0)+(t.backlog||0)} not started`+(t.canceled?`, ${t.canceled} canceled`:"");return`
        <div class="epic-progress-bar-container" title="${m(o)}">
            <div class="epic-progress-bar">
                <div class="epic-progress-fill${a?" epic-progress-complete":""}" style="width: ${i}%"></div>
                <div class="epic-progress-active" style="width: ${Math.min(s,100-i)}%"></div>
            </div>
            <span class="epic-progress-pct" title="Tickets done">${dg(t.done||0,n)}</span>
            <span class="epic-progress-text">${t.done||0}/${n}</span>
        </div>
    `}function ug(e){if(!e||e.length===0)return'<span class="text-muted">-</span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,a=`${i.name}${i.status==="active"?" (current)":""}: ${ed(i.closed||0,"ticket")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${m(a)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}function pg(e,t){return e?`<span class="epic-this-sprint">+${e} <span class="text-muted">(${t} pts)</span></span>`:'<span class="text-muted">-</span>'}function Yx(e){const t=e.status_pinned&&!Js.has(e.status)?' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its tickets">✎<span class="sr-only"> (status set by hand)</span></span>':"",n=e.status==="canceled"?' <span class="epic-canceled-tag">Canceled</span>':"",i=(e.points_total||0)>0?`${e.points_done||0}/${e.points_total} pts`:"-",s=ea(e)<=0;return`
        <tr class="epic-row${Js.has(e.status)?" epic-row-closed":""}${s?" epic-row-empty":""}" data-identifier="${m(e.identifier)}">
            <td class="epic-identifier">${p(e.identifier)}</td>
            <td class="epic-title">${p(e.title)}${t}${n}</td>
            <td class="epic-progress">${Kx(e)}</td>
            <td class="epic-points">${i}</td>
            <td class="epic-sprint">${pg(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${ug(e.sprints)}</td>
        </tr>
    `}function Qx(e){return!e||!e.open&&!e.closed_this_sprint&&!(e.sprints||[]).some(t=>t.closed)?"":`
        <tr class="epic-untracked-row">
            <td class="epic-identifier">${p(e.project_key)}</td>
            <td class="epic-title text-muted">No epic</td>
            <td class="epic-progress"><span class="epic-progress-text">${ed(e.open||0,"open ticket")}</span></td>
            <td class="epic-points"></td>
            <td class="epic-sprint">${pg(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${ug(e.sprints)}</td>
        </tr>
    `}function ea(e){const t=e.children||{};return(t.total||0)-(t.canceled||0)}function mg(e){var n;const t=ea(e);return t>0?(((n=e.children)==null?void 0:n.done)||0)/t:0}const td=[{key:"active",label:"In progress",statuses:["in_progress","in_review"]},{key:"todo",label:"Todo",statuses:["todo"]},{key:"backlog",label:"Backlog",statuses:["backlog"]},{key:"closed",label:"Closed",statuses:["done","canceled"]}];function Zx(e){const t=e.status||"backlog";return td.find(n=>n.statuses.includes(t))||td[2]}function Xx(e,t){const n=ea(e)<=0,i=ea(t)<=0;if(n!==i)return n?1:-1;const s=(t.points_this_sprint||0)-(e.points_this_sprint||0);if(s)return s;const a=(t.closed_this_sprint||0)-(e.closed_this_sprint||0);return a||mg(t)-mg(e)}function Jx(e){return td.map(t=>({group:t,epics:e.filter(n=>Zx(n)===t).sort(Xx)})).filter(t=>t.epics.length)}function eI(e,t){const n=e.filter(u=>!Js.has(u.status)),i=n.filter(u=>(u.closed_this_sprint||0)>0).length,s=n.reduce((u,f)=>{var g;return u+(((g=f.children)==null?void 0:g.done)||0)},0),a=n.reduce((u,f)=>u+ea(f),0),o=[...e,...t],r=o.reduce((u,f)=>u+(f.closed_this_sprint||0),0),l=o.reduce((u,f)=>u+(f.points_this_sprint||0),0),c=t.reduce((u,f)=>u+(f.open||0),0);if(!n.length&&!r&&!c)return"";const d=(u,f,g="")=>`
        <div class="epic-stat${g}">
            <div class="epic-stat-value">${u}</div>
            <div class="epic-stat-label">${f}</div>
        </div>`;return`
        <div class="epic-summary" role="group" aria-label="Progress summary">
            ${n.length?d(`${i}<span class="epic-stat-of"> / ${n.length}</span>`,"open epics moved this sprint"):""}
            ${n.length?d(dg(s,a),a?`of their tickets done (${s}/${a})`:"no tickets yet"):""}
            ${d(r?`+${r}`:"0",`${r===1?"ticket":"tickets"} closed this sprint (${l} pts)`,r?" epic-stat-up":"")}
            ${c?d(String(c),`open ${c===1?"ticket":"tickets"} under no epic`," epic-stat-warn"):""}
        </div>`}const nd=6;function fg(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=n.filter(f=>Js.has(f.status)).length,a=Uo?n:n.filter(f=>!Js.has(f.status)),o=[...new Set([...n.map(f=>f.project_key),...i.map(f=>f.project_key)])],r=o.length>1,l=[],c=o.map(f=>{const v=Jx(a.filter(S=>S.project_key===f)).map(({group:S,epics:_})=>(l.push(..._),`<tr class="epic-state-row epic-state-${S.key}"><th colspan="${nd}" scope="colgroup"><span class="epic-state-dot" aria-hidden="true"></span>${S.label}<span class="epic-state-count">${_.length}</span></th></tr>`+_.map(Yx).join(""))).join(""),y=Qx(i.find(S=>S.project_key===f));return!v&&!y?"":(r?`<tr class="epic-group-row"><th colspan="${nd}" scope="colgroup">${p(f)}</th></tr>`:"")+v+y}).join("");Fo=l;const d=!c.trim()&&s>0?`<tr class="epic-empty-row"><td colspan="${nd}" class="text-muted">Every epic here is closed.</td></tr>`:"",u=s>0?`<button class="btn btn-secondary btn-small epic-closed-toggle" data-epics-toggle-closed>${Uo?"Hide":"Show"} ${ed(s,"closed epic")}</button>`:"";t.innerHTML=`
        ${eI(n,i)}
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
    `,t._epicProgress=e,t._epicClickHandler||(t._epicClickHandler=f=>{if(f.target.closest("[data-epics-toggle-closed]")){Uo=!Uo,Rr(-1),fg(t._epicProgress,t);return}const g=f.target.closest(".epic-row");g&&g.dataset.identifier&&Jm(g.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function tI(){const e=K(),t=X().map(n=>`
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
    `,U(),document.getElementById("create-epic-form").addEventListener("submit",nI),document.getElementById("create-epic-title").focus()}async function nI(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}try{const s=await h.createIssue(t,{title:n,description:i||null,issue_type:"epic"});N(),k(`Created epic ${s.identifier}`,"success"),kn()}catch(s){$("create epic",s)}}async function gg(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){oe(t.id,!1);return}await Go(t.id,!1)}else q("epics",!1)}catch{q("epics",!1)}}async function Go(e,t=!0){var n;try{t&&fn();const[i,s,a,o]=await Promise.all([h.getIssue(e),h.getSubIssues(e),h.getActivities(e),h.getComments(e)]);if(i.issue_type!=="epic"){oe(e,t);return}t&&history.pushState({epicId:e,view:A()},"",`/epic/${i.identifier}`),document.querySelectorAll(".view").forEach(E=>E.classList.add("hidden"));const r=document.getElementById("epic-detail-view");r.classList.remove("hidden");const l=A()||"epics",c=X().find(E=>E.id===i.project_id),d=i.assignee_id?yt(i.assignee_id):null,u=d?dt(d):null,f=Wx(),g=(n=f.find(E=>E.id===i.id))==null?void 0:n.children,v=g?(g.total||0)-(g.canceled||0):s.filter(E=>E.status!=="canceled").length,y=g?g.done||0:s.filter(E=>E.status==="done").length,w=v>0?Math.round(y/v*100):0,S=f.findIndex(E=>E.id===i.id),_=S>0?f[S-1]:null,D=S>=0&&S<f.length-1?f[S+1]:null,M=S>=0;r.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(l)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${M?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${_?`data-action="navigate-epic" data-epic-id="${m(_.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${S+1} / ${f.length}</span>
                            <button class="issue-nav-btn" ${D?`data-action="navigate-epic" data-epic-id="${m(D.id)}"`:"disabled"} title="Next epic">
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
                            ${jn(i.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${w===100?" epic-progress-complete":""}" style="width: ${w}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${y} of ${v} done</span>
                                <span>${w}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?F({icon:O.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(E=>{const P=E.assignee_id?yt(E.assignee_id):null,G=P?dt(P):null;return`
                                <div class="sub-issue-item" data-issue-id="${m(E.id)}" data-identifier="${m(E.identifier)}">
                                    <span class="sub-issue-status">${We(E.status)}</span>
                                    <span class="sub-issue-id">${p(E.identifier)}</span>
                                    <span class="sub-issue-title">${p(E.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(E.status||"backlog").replace(/_/g,"-")}">${Ie(E.status)}</span>
                                    ${G?`<span class="sub-issue-assignee">${p(G)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${a.length===0?F({icon:O.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):a.map(E=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${mm(E.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Dl(E)}</span>
                                        <span class="activity-actor">by ${p(Cl(E))}</span>
                                        <span class="activity-time">${rt(E.created_at)}</span>
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
                                            <span class="comment-author">${p(E.author_name||"User")}</span>
                                            <span class="comment-date">${rt(E.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${p(E.content||"")}</div>
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
                                ${We(i.status)}
                                ${Ie(i.status)}
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
                                ${pt(i.priority)}
                                ${De(i.priority)}
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
                                ${mn(i.estimate,i.project_id)}
                            </span>
                        </div>

                        ${i.labels&&i.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${i.labels.map(E=>`
                                    <span class="issue-label" style="background: ${ee(E.color)}20; color: ${ee(E.color)}">${p(E.name)}</span>
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
        `;const ne=r.querySelector(".sub-issues-list");ne&&ne.addEventListener("click",E=>{const P=E.target.closest(".sub-issue-item");P&&P.dataset.issueId&&oe(P.dataset.issueId)})}catch(i){$("load epic",i)}}ie({"navigate-epic":(e,t)=>{Go(t.epicId)},"epic-follow-children":async(e,t)=>{try{await h.updateIssue(t.epicId,{status_follows_children:!0}),k("Status now follows sub-issues"),await Go(t.epicId,!1)}catch(n){$("update epic",n)}}});function iI(e){let t=!1,n=null;return function(s){var o,r,l,c,d,u,f;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((u=e.isDetailViewActive)!=null&&u.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((f=e.isDetailViewActive)!=null&&f.call(e))break;s.preventDefault(),e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function sI(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function Jt(e,t,n=Sa){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function hg(){const e=document.querySelector(".main-content");e&&(e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1"),e.focus({preventScroll:!0}))}function ta(e){var n,i;return(i=(n=e.target).closest)!=null&&i.call(n,".sidebar-nav")?!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.key==="j"||e.key==="k")?(hg(),!1):!0:!1}function aI(e){const t=Sa;function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const l=n(a);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,o,c,d)}return function(a){var l,c,d,u,f;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||ta(a)||(a.key==="Enter"||a.key===" ")&&((d=(c=a.target).closest)!=null&&d.call(c,".issue-group-header"))||e.isModalOpen()||e.isCommandPaletteOpen()||(u=e.isInlineDropdownOpen)!=null&&u.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(a.key)&&((f=e.beforeNavigate)==null||f.call(e));const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Jt(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),Jt(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function oI(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||ta(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Jt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Jt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Vn(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function rI(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,u,f;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||ta(i)||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex(),o=g=>{var y,w,S,_;const v=!!((w=(y=document.activeElement)==null?void 0:y.closest)!=null&&w.call(y,"#inbox-list"));if((S=e.collapseInboxExpand)==null||S.call(e),Jt(a+g,e.setSelectedIndex,t),v){const D=document.querySelector(`${t}.keyboard-selected`);(_=(D==null?void 0:D.querySelector(".inbox-row-toggle"))||D)==null||_.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),o(1);break;case"k":case"ArrowUp":i.preventDefault(),o(-1);break;case"Enter":if((d=(c=i.target).closest)!=null&&d.call(c,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;a>=0&&s[a]&&(i.preventDefault(),e.toggleInboxExpand(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":if((u=e.isEscapeLayerAbove)!=null&&u.call(e))break;if((f=e.collapseInboxExpand)!=null&&f.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}a>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function lI(e){const t="#kanban-board .kanban-card";return function(i){var o;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||ta(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Jt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Jt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.id;r&&e.viewIssue(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function cI(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function id(e){const{view:t,selector:n,open:i}=e;return function(a){var l,c,d,u;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||ta(a)||e.isModalOpen()||e.isCommandPaletteOpen()||(c=e.isInlineDropdownOpen)!=null&&c.call(e))return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Jt(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),Jt(r-1,e.setSelectedIndex,n);break;case"Enter":if((u=(d=a.target).closest)!=null&&u.call(d,'button, a[href], [role="button"]'))break;r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(f=>f.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const dI=7,sd=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value"),vg=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex"),uI='<svg class="picker-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',pI='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';let bg=!1;function mI(){bg||(bg=!0,Object.defineProperty(HTMLSelectElement.prototype,"value",{...sd,set(e){var t;sd.set.call(this,e),(t=this._picker)==null||t.sync()}}),Object.defineProperty(HTMLSelectElement.prototype,"selectedIndex",{...vg,set(e){var t;vg.set.call(this,e),(t=this._picker)==null||t.sync()}}))}let Ae=null,fI=0;function yg({restoreFocus:e=!0}={}){return Ae?(Ae.close(e),!0):!1}function gI(e=document){e.querySelectorAll("select[data-picker]").forEach(hI)}function hI(e){var i;if(!e||e._picker)return((i=e==null?void 0:e._picker)==null?void 0:i.button)||null;const t=document.createElement("button");t.type="button",t.className="picker-btn",t.setAttribute("aria-haspopup","listbox"),t.setAttribute("aria-expanded","false"),e.id&&(t.dataset.pickerFor=e.id),t.innerHTML=`<span class="picker-label"></span>${uI}`,e.classList.add("picker-native"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,e.insertAdjacentElement("afterend",t);const n=()=>{wg(e,t),(Ae==null?void 0:Ae.select)===e&&Ae.refresh()};return e._picker={button:t,sync:n},mI(),e.addEventListener("change",n),typeof MutationObserver<"u"&&new MutationObserver(n).observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["disabled","selected","hidden"]}),t.addEventListener("click",s=>{s.preventDefault(),(Ae==null?void 0:Ae.select)===e?yg():$g(e,t)}),t.addEventListener("keydown",s=>{s.metaKey||s.ctrlKey||s.altKey||(["ArrowDown","ArrowUp","Enter"," "].includes(s.key)?(s.preventDefault(),s.stopPropagation(),(Ae==null?void 0:Ae.select)!==e&&$g(e,t)):s.key.length===1&&s.stopPropagation())}),n(),t}function wg(e,t){const n=e.options[e.selectedIndex],i=n?n.textContent.trim():"";t.querySelector(".picker-label").textContent=i,t.disabled=e.disabled,t.title=i;const s=e.getAttribute("aria-label");s&&t.setAttribute("aria-label",i?`${s}: ${i}`:s)}function kg(e){return[...e.options].filter(t=>!t.hidden).map(t=>({value:t.value,text:t.textContent.trim(),disabled:t.disabled}))}function $g(e,t){yg({restoreFocus:!1});const n=kg(e),i=`picker-list-${++fI}`,s=n.length>=dI,a=e.getAttribute("aria-label")||"Options",o=document.createElement("div");o.className="picker-popover",o.tabIndex=-1,o.innerHTML=`
        ${s?`<input type="text" class="picker-search" placeholder="Filter…" aria-label="Filter ${m(a)}"
            role="combobox" aria-expanded="true" aria-controls="${i}" aria-autocomplete="list" autocomplete="off" spellcheck="false">`:""}
        <ul class="picker-list" role="listbox" id="${i}" tabindex="-1" aria-label="${m(a)}"></ul>
    `,document.body.appendChild(o);const r=o.querySelector(".picker-list"),l=o.querySelector(".picker-search"),c=x=>Math.max(0,x.findIndex(R=>!R.disabled));let d=n.findIndex(x=>x.value===e.value&&!x.disabled);d===-1&&(d=c(n));let u=n;const f=()=>{var R;r.innerHTML=u.length?u.map((C,Q)=>`
                <li role="option" id="${i}-${Q}" class="picker-option${Q===d?" active":""}${C.disabled?" disabled":""}"
                    data-index="${Q}" data-value="${m(C.value)}"
                    aria-selected="${C.value===e.value?"true":"false"}"${C.disabled?' aria-disabled="true"':""}>
                    <span class="picker-option-text">${p(C.text)}</span>
                    ${C.value===e.value?`<span class="picker-check">${pI}</span>`:""}
                </li>`).join(""):'<li class="picker-empty" role="presentation">No matches</li>';const x=r.querySelector(".picker-option.active");x?(l||r).setAttribute("aria-activedescendant",x.id):(l||r).removeAttribute("aria-activedescendant"),(R=x==null?void 0:x.scrollIntoView)==null||R.call(x,{block:"nearest"})},g=()=>{var L,ue;const x=t.getBoundingClientRect(),R=((L=window.visualViewport)==null?void 0:L.width)||window.innerWidth,C=((ue=window.visualViewport)==null?void 0:ue.height)||window.innerHeight;o.style.minWidth=`${Math.min(Math.max(x.width,220),R-16)}px`,o.style.maxHeight="",o.style.top="0px";const Q=o.offsetWidth||Math.max(x.width,220),_e=o.offsetHeight;o.style.left=`${Math.max(8,Math.min(x.left,R-Q-8))}px`;const de=C-x.bottom-12,gt=x.top-12;if(_e>de&&gt>de){const ge=Math.max(120,gt);o.style.maxHeight=`${ge}px`,o.style.top=`${Math.max(8,x.top-4-Math.min(_e,ge))}px`}else o.style.maxHeight=`${Math.max(120,de)}px`,o.style.top=`${x.bottom+4}px`},v=x=>{if(!x||x.disabled||e.disabled)return;if(![...e.options].some(C=>C.value===x.value&&!C.disabled)){W(!0);return}const R=x.value!==e.value;sd.set.call(e,x.value),wg(e,t),W(!0),R&&e.dispatchEvent(new Event("change",{bubbles:!0}))},y=x=>{let R=d+x;for(;R>=0&&R<u.length&&u[R].disabled;)R+=x;R<0||R>=u.length||(d=R,f())},w=(x,R)=>{let C=x;for(;C>=0&&C<u.length&&u[C].disabled;)C+=R;C>=0&&C<u.length&&(d=C,f())},S=x=>{if(!(x.metaKey||x.ctrlKey))switch(x.stopPropagation(),x.key){case"ArrowDown":x.preventDefault(),y(1);break;case"ArrowUp":x.preventDefault(),y(-1);break;case"Home":l||(x.preventDefault(),w(0,1));break;case"End":l||(x.preventDefault(),w(u.length-1,-1));break;case"PageDown":x.preventDefault(),w(Math.min(u.length-1,d+8),-1);break;case"PageUp":x.preventDefault(),w(Math.max(0,d-8),1);break;case"Enter":x.preventDefault(),v(u[d]);break;case"Escape":x.preventDefault(),W(!0);break;case"Tab":W(!0);break;case" ":l||(x.preventDefault(),v(u[d]));break;default:if(!l&&x.key.length===1&&!x.metaKey&&!x.ctrlKey&&!x.altKey){_=(Date.now()-D<700?_:"")+x.key.toLowerCase(),D=Date.now();const R=u.findIndex(C=>!C.disabled&&C.text.toLowerCase().startsWith(_));R!==-1&&(d=R,f())}}};let _="",D=0;const M=()=>{const x=l.value.trim().toLowerCase();u=x?n.filter(C=>C.text.toLowerCase().includes(x)):n;const R=u.findIndex(C=>C.value===e.value&&!C.disabled);d=!x&&R!==-1?R:c(u),f()},ne=x=>{o.contains(x.target)||t.contains(x.target)||W(!1)},E=()=>g(),P=x=>{x.key!=="Escape"||o.contains(x.target)||(x.preventDefault(),x.stopPropagation(),W(!0))},G=()=>W(!1);function W(x){(Ae==null?void 0:Ae.popover)===o&&(Ae=null,o.remove(),t.setAttribute("aria-expanded","false"),t.classList.remove("open"),t.removeAttribute("aria-controls"),document.removeEventListener("pointerdown",ne,!0),document.removeEventListener("keydown",P,!0),window.removeEventListener("popstate",G),window.removeEventListener("resize",E),window.removeEventListener("scroll",E,!0),x&&t.focus({preventScroll:!0}))}r.addEventListener("click",x=>{const R=x.target.closest(".picker-option");R&&v(u[Number(R.dataset.index)])}),r.addEventListener("mousemove",x=>{const R=x.target.closest(".picker-option");if(!R)return;const C=Number(R.dataset.index);C!==d&&(d=C,f())}),o.addEventListener("keydown",S),l&&l.addEventListener("input",M),document.addEventListener("pointerdown",ne,!0),document.addEventListener("keydown",P,!0),window.addEventListener("popstate",G),window.addEventListener("resize",E),window.addEventListener("scroll",E,!0),Ae={select:e,button:t,popover:o,close:W,refresh:()=>{const x=kg(e);!(x.length===n.length&&x.every((C,Q)=>C.value===n[Q].value&&C.text===n[Q].text&&C.disabled===n[Q].disabled))||e.disabled?W(!1):f()}},t.setAttribute("aria-expanded","true"),t.setAttribute("aria-controls",i),t.classList.add("open"),f(),g(),(l||r).focus({preventScroll:!0})}const vI={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>h.getDocumentRevisions(e),fetchOne:(e,t)=>h.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>h.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>h.getIssueDescriptionRevision(e,t)}};let V=null,$n=0;async function Eg(e,t){var a,o;const n=vI[e];if(!n){$("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++$n;V=null;let s;try{s=await n.fetchList(t)}catch(r){$("load revision history",r);return}if(i===$n){if(V={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},V.viewVersion!=null)try{const r=await n.fetchOne(t,V.viewVersion);if(i!==$n)return;V.cache.set(V.viewVersion,r)}catch(r){i===$n&&$("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),zo(),U()}}function zo(){const e=document.getElementById("modal-content");if(!e||!V)return;if(V.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=bI(),n=V.mode==="compare"?wI():yI();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function bI(){const e=V.revisions.map(n=>{const i=V.mode==="view"?n.version===V.viewVersion:n.version===V.compareFromVersion||n.version===V.compareToVersion,s=V.mode==="compare"?n.version===V.compareFromVersion?' <span class="rev-tag">from</span>':n.version===V.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${p(n.author_name||"Unknown")} ${Ea(n.author)}</span>
          <span class="revision-time">${rt(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${V.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function yI(){const e=V.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=V.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${p(t.title)}</h3>`:"",i=t[V.adapter.bodyField]||"",s=i?`<div class="markdown-body">${Je(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${p(t.author_name||"Unknown")} &middot; ${rt(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function wI(){const e=V.compareFromVersion,t=V.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=V.cache.get(e),i=V.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[V.adapter.bodyField]||"",a=i[V.adapter.bodyField]||"",o=kI(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
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
  `}function kI(e,t){const n=e.split(`
`),i=t.split(`
`),s=$I(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${p(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${p(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${p(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function $I(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(na(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(na(a,"del",e[o]),o++):(na(a,"add",t[r]),r++);for(;o<n;)na(a,"del",e[o++]);for(;r<i;)na(a,"add",t[r++]);return a}function na(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function EI(e){if(!V)return;const t=V.token,n=V;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(V!==n||$n!==t)return;n.cache.set(e,i)}catch(i){V===n&&$n===t&&$("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),zo()}function _I(){if(!V)return;const e=V.token,t=V;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{V===t&&$n===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{V!==t||$n!==e||(s&&$("load revisions to compare",s),zo())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;zo()}ie({"show-document-revisions":(e,t)=>{Eg("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{Eg("issue",t.issueId)},"select-revision-version":(e,t)=>{EI(Number(t.version))},"toggle-revision-compare":()=>{_I()},"close-revision-viewer":()=>{V=null,N()}});const Vo={bio:4e3,pronouns:40,tagline:120,name:255};let Rt=[],ad=null,od=!1,rd=0,Wo=null,Di=null,ia=null,Ko=!1,ld=0;async function _g(e,t){return h.getTeamRoster(e,{includeIdle:t})}function xI(e,t){!t||ad!==e||(Rt=Rt.map(n=>n.user_id===t.user_id?t:n))}function II(){return Array(4).fill(0).map(()=>`
        <div class="person-card person-card-skeleton">
            <div class="skeleton skeleton-title"></div>
        </div>
    `).join("")}async function cd(){const e=T();if(!e)return;const t=++rd,n=od,i=document.getElementById("people-list");i&&(i.innerHTML=II(),i.setAttribute("aria-busy","true"));const s=document.getElementById("people-show-idle");s&&(s.checked=od);try{const a=await _g(e.id,n);if(t!==rd)return;Rt=a,ad=e.id,Sg()}catch(a){if(t!==rd)return;i==null||i.removeAttribute("aria-busy"),i&&(i.innerHTML=F({icon:O.team,heading:"Couldn't load the roster",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-people"},variant:"error"})),$("load the roster",a)}}function xg(e){if(!e.is_agent){const i=e.role||"member";return i.charAt(0).toUpperCase()+i.slice(1)}const n=[e.kind==="session"?"Session":e.kind==="service"?"Registrar":"Agent"];return e.owner_name&&n.push(`of ${e.owner_name}`),e.idle&&n.push("· idle"),n.join(" ")}function Ig(e){const t=m(e.user_id),n=e.pronouns?`<span class="person-pronouns">${p(e.pronouns)}</span>`:"",i=e.mention_handle?`<div class="person-handle">@${p(e.mention_handle)}</div>`:"",s=e.tagline?`<div class="person-tagline">${p(e.tagline)}</div>`:"";return`
        <a class="person-card${e.is_agent?" person-card-agent":""}${e.idle?" person-card-idle":""}"
           href="/people/${t}" data-action="view-person" data-user-id="${t}">
            <span class="person-card-avatar" aria-hidden="true">${Ut(e,"avatar person-avatar")}</span>
            <div class="person-card-body">
                <div class="person-name">${p(e.name)}${n}</div>
                ${i}
                ${s}
                <div class="person-role">${p(xg(e))}</div>
            </div>
        </a>
    `}function Sg(){const e=document.getElementById("people-list");if(!e)return;e.removeAttribute("aria-busy");const t=Rt.filter(a=>!a.is_agent),n=Rt.filter(a=>a.is_agent),i=ye(),s=i?`<button class="btn btn-secondary btn-small" data-action="edit-profile" data-user-id="${m(i.id)}">Edit your profile</button>`:"";e.innerHTML=`
        <div class="people-section-header"><h3>People</h3>${s}</div>
        <div class="people-grid">${t.map(Ig).join("")||'<p class="people-empty">No one yet.</p>'}</div>
        <div class="people-section-header"><h3>Agents</h3></div>
        <div class="people-grid">${n.map(Ig).join("")||'<p class="people-empty">No agents yet.</p>'}</div>
    `}function Tg(e,t=ye()){return!e||!t?!1:e.user_id===t.id||e.is_agent&&e.owner_id===t.id}async function Lg(e,t,{fresh:n=!1}={}){if(!n&&ad===e){const a=Rt.find(o=>o.user_id===t);if(a)return a}const s=(await _g(e,!0)).find(a=>a.user_id===t)||null;return xI(e,s),s}let Ag=0,dd=null;async function Yo(e,t=!0){var r;t&&fn(),Zm();const n=++Ag,i=T();if(!i)return;const s=window.location.pathname,a=()=>{var l;return n!==Ag||((l=T())==null?void 0:l.id)!==i.id||window.location.pathname!==s};let o;try{o=await Lg(i.id,e)}catch(l){if(a())return;$("load this profile",l),t||history.replaceState({view:"people"},"","/people"),q("people",t);return}if(!a()){if(!o){k("Not on this team’s roster","error"),t||history.replaceState({view:"people"},"","/people"),q("people",t);return}t&&history.pushState({personId:e,view:"people"},"",`/people/${encodeURIComponent(e)}`),is("people"),Ms("people"),Cg(o),window.scrollTo(0,0),(r=document.querySelector("#person-detail-view .person-profile-name"))==null||r.focus({preventScroll:!0})}}function SI(){let e=document.getElementById("person-detail-view");return e||(e=document.createElement("div"),e.id="person-detail-view",e.className="view",document.querySelector(".main-content").appendChild(e)),e}function Cg(e,{withIssues:t=!0}={}){var l;document.querySelectorAll(".view").forEach(c=>c.classList.add("hidden"));const n=SI();n.classList.remove("hidden"),n.dataset.userId=e.user_id,dd=e;const i=m(e.user_id),s=Tg(e),a=e.user_id===((l=ye())==null?void 0:l.id),o=e.bio?`<div class="person-bio markdown-body">${jn(e.bio)}</div>`:`<p class="person-bio-empty">${a?"You haven’t written a bio yet.":"No bio yet."}</p>`,r=e.joined_at?`<span>Joined ${p(new Date(e.joined_at).toLocaleDateString())}</span>`:"";n.innerHTML=`
        <div class="view-header">
            <a href="/people" class="person-back" data-action="back-to-roster">← Roster</a>
            <div class="view-actions">
                ${s?`<button class="btn btn-primary" data-action="edit-profile" data-user-id="${i}">${a?"Edit your profile":"Edit profile"}</button>`:""}
            </div>
        </div>
        <div class="person-profile">
            ${Ut(e,"avatar person-avatar-large")}
            <div class="person-profile-body">
                <h2 class="person-profile-name" tabindex="-1">${p(e.name)}${e.pronouns?`<span class="person-pronouns">${p(e.pronouns)}</span>`:""}</h2>
                ${e.mention_handle?`<div class="person-handle">@${p(e.mention_handle)}</div>`:""}
                ${e.tagline?`<div class="person-tagline">${p(e.tagline)}</div>`:""}
                <div class="person-role">${p(xg(e))}${r?" · ":""}${r}</div>
            </div>
        </div>
        ${o}
        <section class="person-work">
            <h3>Working on</h3>
            <div id="person-issues" class="person-issues"><div class="skeleton skeleton-title"></div></div>
        </section>
    `,t&&TI(e.user_id)}const Bg=["in_progress","in_review","todo"];let Dg=0;async function TI(e){const t=T();if(!t)return;const n=++Dg;let i;try{i=await h.getTeamIssues(t.id,{assignee_id:e,status:Bg,sort_by:"status",order:"asc",limit:20})}catch(o){i=null,console.error("Failed to load their issues:",o)}if(n!==Dg)return;const s=document.getElementById("person-issues");if(!s)return;if(i===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load their issues.</p>';return}if(!i.length){s.innerHTML='<p class="person-bio-empty">Nothing open assigned.</p>';return}const a=o=>Bg.indexOf(o.status);s.innerHTML=[...i].sort((o,r)=>a(o)-a(r)).map(o=>`
        <a class="person-issue" href="/issue/${encodeURIComponent(o.identifier)}" data-action="person-open-issue" data-identifier="${m(o.identifier)}">
            <span class="person-issue-id">${p(o.identifier)}</span>
            <span class="person-issue-title">${p(o.title)}</span>
            <span class="person-issue-status">${p(String(o.status).replace("_"," "))}</span>
        </a>
    `).join("")}const ud=["name","avatar_url","pronouns","tagline","bio"];function LI(e){const t=(n,i)=>{const s=String(i??"").replace(/\r\n?/g,`
`);return n==="bio"&&s.startsWith(`
`)?s.slice(1):s};return Object.fromEntries(ud.map(n=>[n,t(n,e==null?void 0:e[n])]))}let pd=0;async function AI(e){var l;const t=ye(),n=T();if(!t||!n)return;const i=++pd,s=window.location.pathname;let a;try{a=await Lg(n.id,e,{fresh:!0})}catch(c){i===pd&&$("load this profile",c);return}if(i!==pd||window.location.pathname!==s||((l=T())==null?void 0:l.id)!==n.id||(!a&&e===t.id&&(a={...t,user_id:t.id}),!a||!Tg(a,t)))return;Wo=e,ia=a,Di=LI(a),ld++;const o=e===t.id,r=c=>m(c||"");document.getElementById("modal-title").textContent=o?"Edit your profile":`Edit ${a.name}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="save-profile">
            <div class="form-group">
                <label for="profile-name">Name</label>
                <input type="text" id="profile-name" value="${r(a.name)}" maxlength="${Vo.name}" required>
            </div>
            <div class="form-group">
                <label for="profile-avatar">Avatar</label>
                <input type="text" id="profile-avatar" value="${r(a.avatar_url)}" placeholder="An emoji, or an image URL">
            </div>
            ${o?`<div class="form-group">
                <label for="profile-photo">Photo</label>
                <div class="profile-photo-row">
                    <input type="file" id="profile-photo" accept="image/png,image/jpeg,image/webp,image/gif" data-action="pick-profile-photo"${sa?" disabled":""}>
                    <button type="button" class="btn btn-secondary btn-small${Dr.test(a.avatar_url||"")?"":" hidden"}" id="profile-photo-remove" data-action="remove-profile-photo"${sa?" disabled":""}>Remove photo</button>
                </div>
                <p class="form-help">Uploads at once, cropped square and resized to ${Pg}px.</p>
            </div>`:""}
            <div class="form-group">
                <label for="profile-pronouns">Pronouns</label>
                <input type="text" id="profile-pronouns" value="${r(a.pronouns)}" maxlength="${Vo.pronouns}" placeholder="e.g. they/them">
            </div>
            <div class="form-group">
                <label for="profile-tagline">Tagline</label>
                <input type="text" id="profile-tagline" value="${r(a.tagline)}" maxlength="${Vo.tagline}" placeholder="One line under your name">
            </div>
            <div class="form-group">
                <label for="profile-bio">Bio</label>
                <textarea id="profile-bio" rows="8" maxlength="${Vo.bio}" placeholder="Markdown: who you are, what you work on, how to work with you">${p(a.bio||"")}</textarea>
                <p class="form-help">Leave a field blank to clear it.</p>
            </div>
            <button type="submit" class="btn btn-primary"${Ko?" disabled":""}>Save</button>
        </form>
    `,U()}function CI(e,t=null){const n=a=>{var o;return((o=e.querySelector(`#${a}`))==null?void 0:o.value)??""},i={name:n("profile-name"),avatar_url:n("profile-avatar").trim(),pronouns:n("profile-pronouns"),tagline:n("profile-tagline"),bio:n("profile-bio")},s={};for(const a of ud){const o=t?String(t[a]??""):null;(a==="avatar_url"?i[a]===(o==null?void 0:o.trim()):i[a]===o)||(s[a]=a==="avatar_url"?i[a]||null:i[a])}return s}function Mg(e){var i;const t=window.scrollY,n=document.getElementById("person-issues");Cg(e,{withIssues:!1}),n&&((i=document.getElementById("person-issues"))==null||i.replaceWith(n)),window.scrollTo(0,t)}function jg(e){const t=document.getElementById("person-detail-view");return!!t&&!t.classList.contains("hidden")&&t.dataset.userId===e}function Rg(){Wo=null,Di=null,ia=null,N()}async function BI(e){e.preventDefault();const t=Wo;if(!t||Ko)return;const n=e.target.closest("form")||e.target,i=CI(n,Di);if(!Object.keys(i).length){Rg();return}const s=ye(),a=t===(s==null?void 0:s.id),o=ia,r=ld,l=n.querySelector('button[type="submit"]');Ko=!0,l&&(l.disabled=!0);try{const c=a?await h.updateMe(i):await h.updateAgent(t,i),d=Object.fromEntries(ud.map(u=>[u,(c==null?void 0:c[u])??null]));Rt=Rt.map(u=>u.user_id===t?{...u,...d}:u),a&&(It({...s,...d}),Mo()),r===ld&&Rg(),k("Profile saved","success"),jg(t)?Mg({...o,...d}):Sg()}catch(c){$("save the profile",c)}finally{Ko=!1,l&&(l.disabled=!1);const c=document.querySelector('#modal-content form[data-action="save-profile"] button[type="submit"]');c&&(c.disabled=!1)}}const Pg=256;async function DI(e,t=Pg){var l;const n=await createImageBitmap(e),i=Math.min(n.width,n.height),s=document.createElement("canvas");s.width=t,s.height=t,s.getContext("2d").drawImage(n,(n.width-i)/2,(n.height-i)/2,i,i,0,0,t,t),(l=n.close)==null||l.call(n);const a=c=>new Promise(d=>s.toBlob(d,c,.9)),o=await a("image/webp");let r=o&&o.type==="image/webp"?o:null;if(!r){const c=s.getContext("2d");c.globalCompositeOperation="destination-over",c.fillStyle="#fff",c.fillRect(0,0,t,t),r=await a("image/jpeg")}if(!r)throw new Error("This browser could not convert the picture. Try a PNG or JPEG file.");return r}let sa=!1;function qg(e){for(const t of["profile-photo","profile-photo-remove"]){const n=document.getElementById(t);n&&(n.disabled=e)}}function MI(e){var i;const t=ye();if(!t||!e||e.id&&e.id!==t.id)return;const n=e.avatar_url??null;if(Rt=Rt.map(s=>s.user_id===t.id?{...s,avatar_url:n}:s),It({...t,avatar_url:n}),Mo(),Wo===t.id&&Di){const s=document.getElementById("profile-avatar");s&&(s.value=n||""),Di={...Di,avatar_url:n||""},ia={...ia,avatar_url:n},(i=document.getElementById("profile-photo-remove"))==null||i.classList.toggle("hidden",!Dr.test(n||""))}dd&&jg(t.id)&&Mg({...dd,avatar_url:n})}async function Ng(e,t,n){if(!sa){sa=!0,qg(!0);try{MI(await e()),k(t,"success")}catch(i){$(n,i)}finally{sa=!1,qg(!1)}}}async function jI(e,t=DI){var i;const n=(i=e.files)==null?void 0:i[0];if(n)try{await Ng(async()=>h.uploadAvatar(await t(n)),"Photo uploaded","upload the photo")}finally{e.value=""}}function RI(){return Ng(()=>h.deleteAvatar(),"Photo removed","remove the photo")}function md(e){return e.metaKey||e.ctrlKey||e.shiftKey||e.button===1}ie({"view-person":(e,t)=>{e.type!=="click"||md(e)||(e.preventDefault(),Yo(t.userId))},"edit-profile":(e,t)=>{e.type==="click"&&(e.preventDefault(),AI(t.userId))},"view-my-profile":e=>{var n;if(e.type!=="click")return;e.preventDefault(),(n=document.getElementById("user-dropdown"))==null||n.classList.add("hidden");const t=ye();t&&Yo(t.id)},"pick-profile-photo":(e,t,n)=>{e.type==="change"&&jI(n)},"remove-profile-photo":e=>{e.type==="click"&&RI()},"save-profile":e=>{BI(e)},"retry-load-people":e=>{e.type==="click"&&cd()},"person-open-issue":(e,t)=>{e.type!=="click"||md(e)||(e.preventDefault(),pc(t.identifier))},"back-to-roster":e=>{e.type!=="click"||md(e)||(e.preventDefault(),q("people"))},"toggle-people-idle":(e,t,n)=>{e.type==="change"&&(od=!!n.checked,cd())}});const PI=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let $t=[],Qo=null,Zo=null,fd=0;lt(e=>{e==="currentProject"&&A()==="board"&&aa()});async function aa({fromMemory:e=!1}={}){_a(-1);const t=++fd,n=K();if(!n){const o=document.getElementById("kanban-board");o&&(o.innerHTML=X().length===0?F({icon:O.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):F({icon:O.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const i=document.getElementById("kanban-board"),s=fl(),a=e?Za("board",s):void 0;a?($t=a,Qo=s,A()==="board"&&St($t),Mi()):i&&(i.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const o=await h.getIssues({project_id:n});if(t!==fd)return;const r=a&&Xa($t,o);$t=o,Qo=s,gi("board",s,o),A()==="board"&&St($t),r||Mi()}catch(o){if(t!==fd)return;i&&(i.innerHTML=F({icon:O.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),$("load board",o)}}const gd=Kv(()=>aa(),200);function Mi(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;Qo&&gi("board",Qo,$t),e.innerHTML=PI.map(i=>{const s=$t.filter(a=>a.status===i.key);return`
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
                    `:s.map(qI).join("")}
                </div>
            </div>
        `}).join(""),NI(t)}function qI(e){const t=e.assignee_id?yt(e.assignee_id):null,n=t?dt(t):null,i=e.estimate!=null?mn(e.estimate,e.project_id):"",s=ko(e.estimate,e.project_id),a=(e.labels||[]).slice(0,2);return`
        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${m(e.id)}" data-identifier="${m(e.identifier)}">
            <div class="kanban-card-top">
                <span class="kanban-card-identifier">${p(e.identifier)}</span>
                ${n?`<span class="kanban-card-assignee" title="${m(n)}">${Ut(t,"avatar-small")}</span>`:""}
            </div>
            <div class="kanban-card-title">${p(e.title)}</div>
            <div class="kanban-card-meta">
                <span class="kanban-card-priority" title="Priority: ${m(De(e.priority))}">${pt(e.priority)}</span>
                ${i?`<span class="estimate-badge${s?" out-of-scale":""}"${s?' title="Estimate outside current scale"':""}>${p(i)}</span>`:""}
                ${a.map(o=>`<span class="issue-label" title="${m(o.name)}" style="background: ${ee(o.color)}20; color: ${ee(o.color)}">${p(o.name)}</span>`).join("")}
            </div>
        </div>
    `}function NI(e){const t=Su();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){_a(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),_a(i),n[i].classList.add("keyboard-selected")}function OI(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Zo=t.dataset.id,t.classList.add("dragging")}function HI(e,t){t.classList.remove("dragging"),Zo=null}function Og(e){const t=$t.find(n=>n.id===Zo);return!!t&&t.status===e}function FI(e,t){e.preventDefault(),!Og(t.dataset.status)&&t.classList.add("drag-over")}function UI(e,t){t.classList.remove("drag-over")}function GI(e,t){e.preventDefault();const n=$t.find(i=>i.id===t.dataset.id);n&&Og(n.status)||t.classList.add("drag-over")}function zI(e,t){t.classList.remove("drag-over")}async function VI(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=$t.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,Mi();try{const o=await h.updateIssue(n,{status:i});k("Status updated","success"),ps(o)}catch(o){s.status=a,Mi(),$("update status",o)}}}async function WI(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Zo||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=$t.find(l=>l.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,Mi();try{const l=await h.updateIssue(n,{status:a});k("Status updated","success"),ps(l)}catch(l){o.status=r,Mi(),$("update status",l)}}}ie({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),oe(t.id)):e.type==="dragstart"?OI(e,n):e.type==="dragend"?HI(e,n):e.type==="dragover"?GI(e,n):e.type==="dragleave"?zI(e,n):e.type==="drop"&&WI(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?FI(e,n):e.type==="dragleave"?UI(e,n):e.type==="drop"&&VI(e,n)},"retry-load-board":()=>aa()});const En=new Map,Hg=6e4,hd=100;let Re=null,Xo=null,Jo=null,oa=null,Fg=!1;const KI={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},YI={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Ug={api:null};let vd={...Ug};function QI(e={}){vd={...Ug,...e},Re||(Re=document.createElement("div"),Re.className="issue-tooltip",Re.style.display="none",document.body.appendChild(Re),Re.addEventListener("mouseenter",()=>{clearTimeout(Xo)}),Re.addEventListener("mouseleave",()=>{bd()})),Fg||(document.addEventListener("mouseover",ZI),document.addEventListener("mouseout",XI),Fg=!0)}function ZI(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=JI(t);if(n){if(n===oa&&Re.style.display!=="none"){clearTimeout(Xo);return}clearTimeout(Jo),Jo=setTimeout(()=>{e0(t,n)},200)}}function XI(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Jo),Xo=setTimeout(()=>{bd()},150))}function JI(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function e0(e,t){oa=t;const n=e.getBoundingClientRect();Re.style.left=`${n.left+window.scrollX}px`,Re.style.top=`${n.bottom+window.scrollY+8}px`,Re.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Re.style.display="block";try{const i=await n0(t);if(oa!==t)return;i0(i)}catch{if(oa!==t)return;Re.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function bd(){clearTimeout(Jo),clearTimeout(Xo),Re&&(Re.style.display="none"),oa=null}function t0(){const e=Date.now();for(const[t,n]of En.entries())e-n.timestamp>=Hg&&En.delete(t)}async function n0(e){En.size>hd/2&&t0();const t=En.get(e);if(t&&Date.now()-t.timestamp<Hg)return t.issue;if(!vd.api)throw new Error("API not initialized");const n=await vd.api.getIssueByIdentifier(e);if(En.size>=hd){const i=Array.from(En.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,hd/2);for(const[a]of s)En.delete(a)}return En.set(e,{issue:n,timestamp:Date.now()}),n}function i0(e){const t=KI[e.status]||"#6b7280",n=YI[e.priority]||"#6b7280",i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Re.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${p(e.identifier)}</span>
            <span class="issue-tooltip-type">${p(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${p(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${s0(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${a0(e.priority)}</span>
        </div>
    `}function s0(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function a0(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Gg(){return!!document.querySelector(".description-inline-editor")}function yd(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function wd(){var e;return yd("issue-detail-view")?((e=we())==null?void 0:e.id)??null:null}function Wn(e){return!!e&&wd()===e}function o0(){Ke("issue:created",d0),Ke("issue:updated",u0),Ke("issue:deleted",p0),Ke("comment",g0),Ke("relation",v0),Ke("attestation",b0),Ke("activity",w0),Ke("project",k0),Ke("sprint",$0),Ke("document",h0),Ke("inbox",y0),Ke("connection:reconnected",E0),Ke("connection:unauthorized",l0),Ke("connection:forbidden",c0),Ke("connection:superseded",r0)}function r0(){k("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function l0(){h.logout(),It(null),Jn(null),Qs(),k("Your session has ended. Please sign in again.","warning")}function c0(){k("Live updates stopped: you no longer have access to this team.","error")}function d0(e){var s;ws(A(),"board","sprints","epics");const t=te(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,Qe(a),A()==="issues"&&ut()}else Qe([e,...t]),A()==="issues"&&ut(),k(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((s=ye())==null?void 0:s.id)){const a=Xe(),o=a.findIndex(l=>l.id===e.id),r=a.findIndex(l=>l._isOptimistic&&l.title===e.title);if(o===-1&&r===-1)An([e,...a]),A()==="my-issues"&&Cn();else if(r>=0){const l=[...a];l[r]=e,An(l),A()==="my-issues"&&Cn()}}A()==="board"?gd():A()==="sprints"?ra():A()==="epics"&&kn(),Wn(e.parent_id)&&Kn(e.parent_id)}function u0(e){ws(A(),"board","sprints","epics"),La(e);const t=te();t.some(s=>s.id===e.id)&&Qe(t.map(s=>s.id===e.id?e:s));const n=Xe();n.some(s=>s.id===e.id)&&An(n.map(s=>s.id===e.id?e:s));const i=ss();i.some(s=>s.id===e.id)&&St(i.map(s=>s.id===e.id?e:s)),A()==="issues"?ut():A()==="my-issues"?Cn():A()==="board"?gd():A()==="sprints"?ra():A()==="epics"&&kn(),Wn(e.id)&&(Gg()?Al(e):Kn(e.id))}function p0(e){ws(A(),"board","sprints","epics"),fb(e.id),Qe(te().filter(n=>n.id!==e.id)),An(Xe().filter(n=>n.id!==e.id));const t=ss();t.some(n=>n.id===e.id)&&St(t.filter(n=>n.id!==e.id)),A()==="issues"?ut():A()==="my-issues"?(Cn(),ii({showLoading:!1})):A()==="board"?gd():A()==="sprints"?ra():A()==="epics"&&kn(),k(`Issue ${e.identifier} deleted`,"info"),Wn(e.id)&&(k(`Issue ${e.identifier} was deleted`,"warning"),q("my-issues"))}const zg=250,m0=1e3,ji=new Map;function Kn(e){Gg()?Al():kd(e,zg)}function kd(e,t){let n=ji.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},ji.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>f0(e),t))}async function f0(e){const t=ji.get(e);if(!t)return;if(t.timer=null,!Wn(e)){ji.delete(e);return}t.inFlight=!0;let n;try{n=await oe(e,!1,{refresh:!0})}finally{t.inFlight=!1}ji.get(e)===t&&(t.again?(t.again=!1,kd(e,zg)):n==="retry"?kd(e,m0):ji.delete(e))}function g0(e){A()==="my-issues"&&ii({showLoading:!1}),Wn(e.issue_id)&&Kn(e.issue_id),e.document_id&&lm(e.document_id)}function h0(e,{type:t}={}){ws(A(),"documents"),rm(),t==="deleted"?Xw(e.id,e.title):lm(e.id)}function v0(e){const t=wd();t&&(e.source_issue_id===t||e.target_issue_id===t)&&Kn(t)}function b0(e){A()==="approvals"&&Bt(),Wn(e.issue_id)&&Kn(e.issue_id)}function y0(e,t){var n;e.recipient_user_id===((n=ye())==null?void 0:n.id)&&(_i(),mE(t==null?void 0:t.type,e),A()==="inbox"&&!hE(t==null?void 0:t.type,e)&&xi({background:!0}))}function w0(e){A()==="my-issues"&&ii({showLoading:!1}),Wn(e.issue_id)&&Kn(e.issue_id)}function k0(e,{type:t}){mt().then(()=>{A()==="projects"&&Hn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?k(`New project: ${e.name}`,"info"):t==="deleted"&&k(`Project ${e.name} deleted`,"info")}function ra(){const e=Gk();e&&yd("sprint-detail-view")?yi(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):yd("sprints-view")&&pn().catch(t=>console.error("Failed to reload sprints:",t))}function $0(e,{type:t}={}){ws(A(),"sprints"),Im(),A()==="sprints"?ra():A()==="my-issues"&&ds(),t==="created"?k(`New sprint: ${e.name}`,"info"):t==="closed"&&k(`Sprint ${e.name} closed`,"info")}function E0(){const e=A();gl(),_i(),e==="issues"?At().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(ni().catch(n=>console.error("Failed to resync my issues:",n)),ds().catch(n=>console.error("Failed to resync sprint status:",n)),ii({showLoading:!1})):e==="board"?aa():e==="sprints"?ra():e==="epics"?kn().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?mt().then(()=>{A()==="projects"&&Hn()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?rm():e==="approvals"?Bt():e==="inbox"&&xi({background:!0});const t=wd();t&&Kn(t)}const _0='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Vg(e){return Array.from(e.querySelectorAll(_0)).filter(t=>!t.closest(".hidden, [hidden]"))}function Wg(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function x0(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Wg(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=Vg(t);n&&n.focus()}}}function er(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Wg(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=Vg(n);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&er()});async function I0(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=K();if(!i){k("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=X().find(c=>c.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Qe([r,...te()]),ut();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const c=await h.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=te();d.some(u=>u.id===c.id)?Qe(d.filter(u=>u.id!==a)):d.some(u=>u.id===a)&&Qe(d.map(u=>u.id===a?c:u)),ut(),mt(),k("Issue created!","success")}catch(c){Qe(te().filter(d=>d.id!==a)),ut(),$("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}J$({beforeScrollRestore:ol,beforeNavigate:()=>{Ck(),N$(),Pm(null),ei(null),Lu(null),er(),bd()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return gg(e[1]),!0;if(e[0]==="issue"&&e[1])return ro(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(ro(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(P0(e[1]),!0):e[0]==="sprint"&&e[1]?(Wk(e[1]),!0):e[0]==="people"&&e[1]?(Yo(decodeURIComponent(e[1]),!1),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Um(e[1]),!0):!1},detailPopstate:e=>e.epicId?(Go(e.epicId,!1),!0):e.issueId?(oe(e.issueId,!1),!0):e.identifier?(ro(e.identifier),!0):e.documentId?(Le(e.documentId,!1),!0):e.sprintId?(yi(e.sprintId,!1),!0):e.personId?(Yo(e.personId,!1),!0):!1,restoreProject:()=>{const e=nc();e&&X().some(t=>t.id===e)&&ct(e)},issueNavigate:e=>ro(e),epicNavigate:e=>gg(e)}),X$({"my-issues":()=>{ds(),ni(),ii()},approvals:()=>{Bt()},inbox:()=>{xi({focusFirst:!0})},issues:()=>{var r;Ay(),jy(),qy();const e=new URLSearchParams(window.location.search),t=e.getAll("label"),n=e.getAll("exclude_label"),i=e.get("sprint"),s=t.length>0||n.length>0||!!i||!!((r=document.getElementById("sprint-filter"))!=null&&r.value)||Dn().length>0||Mn().length>0;s||At();const a=ap().then(()=>{if(t.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=t.includes(d.value)}),Ma())}if(n.length>0){const l=document.getElementById("exclude-label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=n.includes(d.value)}),ja())}}),o=xp().then(()=>{if(i){const l=document.getElementById("sprint-filter");l&&(l.value=i)}});s?Promise.allSettled([a,o]).then(()=>At()):(a.catch(l=>console.error("Failed to populate label filter:",l)),o.catch(l=>console.error("Failed to update sprint filter:",l)))},query:()=>{Vx()},epics:()=>{kn({fromMemory:!0})},board:()=>{aa({fromMemory:!0})},projects:()=>{Hn(),mt().then(Hn)},sprints:()=>{pn({fromMemory:!0})},rituals:()=>{u$()},documents:()=>{On(null,null,{fromMemory:!0})},people:cd,team:()=>{xc(),kf(),Ao()},settings:()=>{Fc(),Qf(),Zf(),Wa()}});function S0(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||N()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>N())}function T0(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>Gm(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>F$());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>U$()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>zm(a))})}function L0(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>am("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>am("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>om());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>zw());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Vt())}function A0(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>Yu())}function C0(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>Py());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>vy());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>by()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const v=g.parentElement;v!=null&&v.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>qa("status-filter-dropdown")):v!=null&&v.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>qa("priority-filter-dropdown")):v!=null&&v.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>qa("label-filter-dropdown")):v!=null&&v.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>qa("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.addEventListener("change",()=>Na())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>Oa())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.addEventListener("change",()=>nl())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>il())}const a=document.getElementById("label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>Ha())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>Fa())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>st());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>st());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>st());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>At());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>Cp());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",g=>I0(g))}function B0(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>m$(t.dataset.tab))})}function D0(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>yf());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>us()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),q(o.dataset.view),r.detail>0&&hg())})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>YE());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>er());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>x0());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>us())}ie({"navigate-to":(e,t)=>{q(t.view)},"set-current-project":(e,t,n)=>{ct(n.value)},showCreateIssueModal:()=>us(),showCreateEpicModal:()=>tI(),"retry-load-epics":()=>kn(),showCreateProjectModal:()=>Hm(),showCreateDocumentModal:()=>dm(),showCreateTeamModal:()=>xf(),showEditTeamModal:()=>d_(),showInviteModal:()=>$f(),showCreateApiKeyModal:()=>ux(),showCreateAgentModal:()=>Ew(),resetOnboarding:()=>Bf(),logout:()=>Yf(),navigateToProjects:()=>q("projects")});async function M0(){if(!h.getToken()){await Gf();return}Xm();const e=h.getMyTeams();e.catch(()=>{});const t=h.getMe(),n=await Nv(yu(h.getToken()));if(n){t.then(i=>{It(i),Mo()},async i=>{if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await Cr(),window.location.reload();return}console.error("Failed to confirm the session on boot:",i),k("Showing saved data — check your connection and reload","error")}),It(n.user),await zn({teamsRequest:e,snapshot:n});return}try{const i=await t;It(i),await zn({teamsRequest:e})}catch(i){if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await Gf();return}console.error("Failed to load current user on boot:",i),Qs(),k("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{rb(),cx(),D0(),S0(),A0(),C0(),B0(),T0(),L0(),j0(),gI(),R0(),QI({api:h}),o0(),await M0()});function j0(){const e=document.getElementById("theme-toggle");if(!e)return;const t=wv()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),kv(n?"light":"dark")})}function R0(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");pc(i)}}})}async function P0(e){try{await Le(e,!1)}catch{q("documents",!1)}}document.addEventListener("keydown",aI({getCurrentView:A,getSelectedIndex:xu,setSelectedIndex:Tn,viewIssue:oe,showEditIssueModal:pm,showInlineDropdown:Xr,isInlineDropdownOpen:ai,isModalOpen:nt,isCommandPaletteOpen:wn,isDetailViewActive:Vn,beforeNavigate:ol})),document.addEventListener("keydown",oI({getCurrentView:A,getSelectedIndex:Qv,setSelectedIndex:Iu,viewDocument:Le,showEditDocumentModal:um,isModalOpen:nt,isCommandPaletteOpen:wn,isDetailViewActive:Vn})),document.addEventListener("keydown",lI({getCurrentView:A,getSelectedIndex:Su,setSelectedIndex:_a,viewIssue:oe,isModalOpen:nt,isCommandPaletteOpen:wn,isDetailViewActive:Vn})),document.addEventListener("keydown",rI({getCurrentView:A,getSelectedIndex:Zv,setSelectedIndex:xa,toggleInboxExpand:FE,collapseInboxExpand:yE,archiveInboxEntry:HE,isInlineDropdownOpen:ai,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:nt,isCommandPaletteOpen:wn,isDetailViewActive:Vn})),document.addEventListener("keydown",cI()),document.addEventListener("keydown",id({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&yi(e.dataset.sprintId)},getCurrentView:A,getSelectedIndex:Xv,setSelectedIndex:Tu,isModalOpen:nt,isCommandPaletteOpen:wn,isDetailViewActive:Vn})),document.addEventListener("keydown",id({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&Jm(e.dataset.identifier)},getCurrentView:A,getSelectedIndex:Jv,setSelectedIndex:Rr,isModalOpen:nt,isCommandPaletteOpen:wn,isDetailViewActive:Vn})),document.addEventListener("keydown",id({view:"my-issues",selector:"#my-issues-list .issue-row",open:e=>{var t;return(t=e.querySelector(".issue-title"))==null?void 0:t.click()},getCurrentView:A,getSelectedIndex:Tb,setSelectedIndex:Lb,isInlineDropdownOpen:ai,isModalOpen:nt,isCommandPaletteOpen:wn,isDetailViewActive:Vn}));function Kg(){var e;q("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus()}function q0(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)")||!!document.querySelector("#issue-detail-view details.related-add[open]")||Hw()}document.addEventListener("keydown",iI({closeModal:N,closeSidebar:er,navigateTo:q,showCreateIssueModal:us,showKeyboardShortcutsHelp:tg,isModalOpen:nt,focusSearch:Kg,isInlineDropdownOpen:ai,closeInlineDropdowns:Wv,isModalDirty:zv,focusModalField:wu,closeDropdowns:()=>{var t;document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),Rn();const e=document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)");e&&(e.classList.add("hidden"),(t=document.querySelector("#issue-detail-view .sidebar-overflow-trigger"))==null||t.setAttribute("aria-expanded","false"))},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:q0,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),kx([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>q("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>q("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>q("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>q("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>q("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>q("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>q("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>q("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>q("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>q("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>q("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>q("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{q("issues"),setTimeout(us,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{q("projects"),setTimeout(Hm,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{q("documents"),setTimeout(dm,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>xf(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:Kg,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{q("team"),setTimeout($f,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>tg(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Bf(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Yf(),category:"Account"}]),document.addEventListener("keydown",sI({isModalOpen:nt,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:wn,openCommandPalette:$x,closeCommandPalette:Po})),window.marked=Y,window.DOMPurify=du,console.log("Chaotic frontend loaded via Vite")})();
