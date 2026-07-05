var ah=Object.defineProperty;var oh=(st,he,St)=>he in st?ah(st,he,{enumerable:!0,configurable:!0,writable:!0,value:St}):st[he]=St;var U=(st,he,St)=>oh(st,typeof he!="symbol"?he+"":he,St);(function(){"use strict";var Ga;function st(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var he=st();function St(e){he=e}var fn={exec:()=>null};function O(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(ve.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var ve={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},tc=/^(?:[ \t]*(?:\n|$))+/,nc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,sc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ic=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,mi=/(?:[*+-]|\d{1,9}[.)])/,oo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ro=O(oo).replace(/bull/g,mi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ac=O(oo).replace(/bull/g,mi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),gi=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,oc=/^[^\n]+/,fi=/(?!\s*\])(?:\\.|[^\[\]\\])+/,rc=O(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",fi).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),lc=O(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,mi).getRegex(),ns="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",hi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,cc=O("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",hi).replace("tag",ns).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),lo=O(gi).replace("hr",hn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ns).getRegex(),dc=O(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",lo).getRegex(),vi={blockquote:dc,code:nc,def:rc,fences:sc,heading:ic,hr:hn,html:cc,lheading:ro,list:lc,newline:tc,paragraph:lo,table:fn,text:oc},co=O("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",hn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ns).getRegex(),uc={...vi,lheading:ac,table:co,paragraph:O(gi).replace("hr",hn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",co).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ns).getRegex()},pc={...vi,html:O(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",hi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:fn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:O(gi).replace("hr",hn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ro).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},mc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,gc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,uo=/^( {2,}|\\)\n(?!\s*$)/,fc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ss=/[\p{P}\p{S}]/u,bi=/[\s\p{P}\p{S}]/u,po=/[^\s\p{P}\p{S}]/u,hc=O(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,bi).getRegex(),mo=/(?!~)[\p{P}\p{S}]/u,vc=/(?!~)[\s\p{P}\p{S}]/u,bc=/(?:[^\s\p{P}\p{S}]|~)/u,yc=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,go=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,wc=O(go,"u").replace(/punct/g,ss).getRegex(),kc=O(go,"u").replace(/punct/g,mo).getRegex(),fo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",$c=O(fo,"gu").replace(/notPunctSpace/g,po).replace(/punctSpace/g,bi).replace(/punct/g,ss).getRegex(),Ec=O(fo,"gu").replace(/notPunctSpace/g,bc).replace(/punctSpace/g,vc).replace(/punct/g,mo).getRegex(),_c=O("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,po).replace(/punctSpace/g,bi).replace(/punct/g,ss).getRegex(),xc=O(/\\(punct)/,"gu").replace(/punct/g,ss).getRegex(),Ic=O(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Tc=O(hi).replace("(?:-->|$)","-->").getRegex(),Sc=O("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Tc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),is=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Lc=O(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",is).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ho=O(/^!?\[(label)\]\[(ref)\]/).replace("label",is).replace("ref",fi).getRegex(),vo=O(/^!?\[(ref)\](?:\[\])?/).replace("ref",fi).getRegex(),Cc=O("reflink|nolink(?!\\()","g").replace("reflink",ho).replace("nolink",vo).getRegex(),yi={_backpedal:fn,anyPunctuation:xc,autolink:Ic,blockSkip:yc,br:uo,code:gc,del:fn,emStrongLDelim:wc,emStrongRDelimAst:$c,emStrongRDelimUnd:_c,escape:mc,link:Lc,nolink:vo,punctuation:hc,reflink:ho,reflinkSearch:Cc,tag:Sc,text:fc,url:fn},Ac={...yi,link:O(/^!?\[(label)\]\((.*?)\)/).replace("label",is).getRegex(),reflink:O(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",is).getRegex()},wi={...yi,emStrongRDelimAst:Ec,emStrongLDelim:kc,url:O(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Bc={...wi,br:O(uo).replace("{2,}","*").getRegex(),text:O(wi.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},as={normal:vi,gfm:uc,pedantic:pc},vn={normal:yi,gfm:wi,breaks:Bc,pedantic:Ac},jc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},bo=e=>jc[e];function Ke(e,t){if(t){if(ve.escapeTest.test(e))return e.replace(ve.escapeReplace,bo)}else if(ve.escapeTestNoEncode.test(e))return e.replace(ve.escapeReplaceNoEncode,bo);return e}function yo(e){try{e=encodeURI(e).replace(ve.percentDecode,"%")}catch{return null}return e}function wo(e,t){var a;const n=e.replace(ve.findPipe,(o,r,c)=>{let l=!1,d=r;for(;--d>=0&&c[d]==="\\";)l=!l;return l?"|":" |"}),s=n.split(ve.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(ve.slashPipe,"|");return s}function bn(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function Mc(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function ko(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,c}function Dc(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var os=class{constructor(e){U(this,"options");U(this,"rules");U(this,"lexer");this.options=e||he}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:bn(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=Dc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=bn(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:bn(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=bn(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))r.push(n[c]),o=!0;else if(!o)r.push(n[c]);else break;n=n.slice(c);const l=r.join(`
`),d=l.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${l}`:l,i=i?`${i}
${d}`:d;const p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=p,n.length===0)break;const f=a.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const v=f,y=v.raw+`
`+n.join(`
`),b=this.blockquote(y);a[a.length-1]=b,s=s.substring(0,s.length-v.raw.length)+b.raw,i=i.substring(0,i.length-v.text.length)+b.text;break}else if((f==null?void 0:f.type)==="list"){const v=f,y=v.raw+`
`+n.join(`
`),b=this.list(y);a[a.length-1]=b,s=s.substring(0,s.length-f.raw.length)+b.raw,i=i.substring(0,i.length-v.raw.length)+b.raw,n=y.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let c=!1,l="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,x=>" ".repeat(3*x.length)),f=e.split(`
`,1)[0],v=!p.trim(),y=0;if(this.options.pedantic?(y=2,d=p.trimStart()):v?y=t[1].length+1:(y=t[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,d=p.slice(y),y+=t[1].length),v&&this.rules.other.blankLine.test(f)&&(l+=f+`
`,e=e.substring(f.length+1),c=!0),!c){const x=this.rules.other.nextBulletRegex(y),j=this.rules.other.hrRegex(y),T=this.rules.other.fencesBeginRegex(y),C=this.rules.other.headingBeginRegex(y),B=this.rules.other.htmlBeginRegex(y);for(;e;){const Y=e.split(`
`,1)[0];let H;if(f=Y,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),H=f):H=f.replace(this.rules.other.tabCharGlobal,"    "),T.test(f)||C.test(f)||B.test(f)||x.test(f)||j.test(f))break;if(H.search(this.rules.other.nonSpaceChar)>=y||!f.trim())d+=`
`+H.slice(y);else{if(v||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||T.test(p)||C.test(p)||j.test(p))break;d+=`
`+f}!v&&!f.trim()&&(v=!0),l+=Y+`
`,e=e.substring(Y.length+1),p=H.slice(y)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(l)&&(o=!0));let b=null,E;this.options.gfm&&(b=this.rules.other.listIsTask.exec(d),b&&(E=b[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:l,task:!!b,checked:E,loose:!1,text:d,tokens:[]}),i.raw+=l}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c=0;c<i.items.length;c++)if(this.lexer.state.top=!1,i.items[c].tokens=this.lexer.blockTokens(i.items[c].text,[]),!i.loose){const l=i.items[c].tokens.filter(p=>p.type==="space"),d=l.length>0&&l.some(p=>this.rules.other.anyLine.test(p.raw));i.loose=d}if(i.loose)for(let c=0;c<i.items.length;c++)i.items[c].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=wo(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(wo(r,a.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[l]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=bn(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=Mc(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),ko(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return ko(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,c=a,l=0;const d=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(s=d.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){c+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){l+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c+l);const p=[...s[0]][0].length,f=e.slice(0,a+s.index+p+r);if(Math.min(a,r)%2){const y=f.slice(1,-1);return{type:"em",raw:f,text:y,tokens:this.lexer.inlineTokens(y)}}const v=f.slice(2,-2);return{type:"strong",raw:f,text:v,tokens:this.lexer.inlineTokens(v)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},it=class io{constructor(t){U(this,"tokens");U(this,"options");U(this,"state");U(this,"tokenizer");U(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||he,this.options.tokenizer=this.options.tokenizer||new os,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:ve,block:as.normal,inline:vn.normal};this.options.pedantic?(n.block=as.pedantic,n.inline=vn.pedantic):this.options.gfm&&(n.block=as.gfm,this.options.breaks?n.inline=vn.breaks:n.inline=vn.gfm),this.tokenizer.rules=n}static get rules(){return{block:as,inline:vn}}static lex(t,n){return new io(n).lex(t)}static lexInline(t,n){return new io(n).inlineTokens(t)}lex(t){t=t.replace(ve.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(ve.tabCharGlobal,"    ").replace(ve.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(l=>(r=l.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const l=n.at(-1);r.raw.length===1&&l!==void 0?l.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let c=t;if((o=this.options.extensions)!=null&&o.startBlock){let l=1/0;const d=t.slice(1);let p;this.options.extensions.startBlock.forEach(f=>{p=f.call({lexer:this},d),typeof p=="number"&&p>=0&&(l=Math.min(l,p))}),l<1/0&&l>=0&&(c=t.substring(0,l+1))}if(this.state.top&&(r=this.tokenizer.paragraph(c))){const l=n.at(-1);s&&(l==null?void 0:l.type)==="paragraph"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r),s=c.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const l=n.at(-1);(l==null?void 0:l.type)==="text"?(l.raw+=`
`+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(t){const l="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,c,l;let s=t,i=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)d.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((c=(r=this.options.extensions)==null?void 0:r.inline)!=null&&c.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const f=n.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,s,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let p=t;if((l=this.options.extensions)!=null&&l.startInline){let f=1/0;const v=t.slice(1);let y;this.options.extensions.startInline.forEach(b=>{y=b.call({lexer:this},v),typeof y=="number"&&y>=0&&(f=Math.min(f,y))}),f<1/0&&f>=0&&(p=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(p)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},rs=class{constructor(e){U(this,"options");U(this,"parser");this.options=e||he}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(ve.notSpaceStart))==null?void 0:a[0],i=e.replace(ve.endingNewline,"")+`
`;return s?'<pre><code class="language-'+Ke(s)+'">'+(n?i:Ke(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:Ke(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let s="";for(let o=0;o<e.items.length;o++){const r=e.items[o];s+=this.listitem(r)}const i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){var n;let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+Ke(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){const a=e.rows[i];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ke(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=yo(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+Ke(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=yo(e);if(i===null)return Ke(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Ke(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ke(e.text)}},ki=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},at=class ao{constructor(t){U(this,"options");U(this,"renderer");U(this,"textRenderer");this.options=t||he,this.options.renderer=this.options.renderer||new rs,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ki}static parse(t,n){return new ao(n).parse(t)}static parseInline(t,n){return new ao(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=r,d=this.options.extensions.renderers[l.type].call({parser:this},l);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=d||"";continue}}const c=r;switch(c.type){case"space":{s+=this.renderer.space(c);continue}case"hr":{s+=this.renderer.hr(c);continue}case"heading":{s+=this.renderer.heading(c);continue}case"code":{s+=this.renderer.code(c);continue}case"table":{s+=this.renderer.table(c);continue}case"blockquote":{s+=this.renderer.blockquote(c);continue}case"list":{s+=this.renderer.list(c);continue}case"html":{s+=this.renderer.html(c);continue}case"paragraph":{s+=this.renderer.paragraph(c);continue}case"text":{let l=c,d=this.renderer.text(l);for(;o+1<t.length&&t[o+1].type==="text";)l=t[++o],d+=`
`+this.renderer.text(l);n?s+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):s+=d;continue}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=l||"";continue}}const c=r;switch(c.type){case"escape":{s+=n.text(c);break}case"html":{s+=n.html(c);break}case"link":{s+=n.link(c);break}case"image":{s+=n.image(c);break}case"strong":{s+=n.strong(c);break}case"em":{s+=n.em(c);break}case"codespan":{s+=n.codespan(c);break}case"br":{s+=n.br(c);break}case"del":{s+=n.del(c);break}case"text":{s+=n.text(c);break}default:{const l='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},ls=(Ga=class{constructor(e){U(this,"options");U(this,"block");this.options=e||he}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?it.lex:it.lexInline}provideParser(){return this.block?at.parse:at.parseInline}},U(Ga,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Ga),Rc=class{constructor(...e){U(this,"defaults",st());U(this,"options",this.setOptions);U(this,"parse",this.parseMarkdown(!0));U(this,"parseInline",this.parseMarkdown(!1));U(this,"Parser",at);U(this,"Renderer",rs);U(this,"TextRenderer",ki);U(this,"Lexer",it);U(this,"Tokenizer",os);U(this,"Hooks",ls);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const c of r)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const c=o[r].flat(1/0);n=n.concat(this.walkTokens(c,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new rs(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],c=i[o];i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new os(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],c=i[o];i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new ls;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],c=i[o];ls.passThroughHooks.has(a)?i[o]=l=>{if(this.defaults.async)return Promise.resolve(r.call(i,l)).then(p=>c.call(i,p));const d=r.call(i,l);return c.call(i,d)}:i[o]=(...l)=>{let d=r.apply(i,l);return d===!1&&(d=c.apply(i,l)),d}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return it.lex(e,t??this.defaults)}parser(e,t){return at.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?it.lex:it.lexInline,c=a.hooks?a.hooks.provideParser():e?at.parse:at.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(l=>r(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>c(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let l=r(n,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let d=c(l,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(l){return o(l)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+Ke(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},Lt=new Rc;function P(e,t){return Lt.parse(e,t)}P.options=P.setOptions=function(e){return Lt.setOptions(e),P.defaults=Lt.defaults,St(P.defaults),P},P.getDefaults=st,P.defaults=he,P.use=function(...e){return Lt.use(...e),P.defaults=Lt.defaults,St(P.defaults),P},P.walkTokens=function(e,t){return Lt.walkTokens(e,t)},P.parseInline=Lt.parseInline,P.Parser=at,P.parser=at.parse,P.Renderer=rs,P.TextRenderer=ki,P.Lexer=it,P.lexer=it.lex,P.Tokenizer=os,P.Hooks=ls,P.parse=P,P.options,P.setOptions,P.use,P.walkTokens,P.parseInline,at.parse,it.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:$o,setPrototypeOf:Eo,isFrozen:Pc,getPrototypeOf:Nc,getOwnPropertyDescriptor:qc}=Object;let{freeze:be,seal:Me,create:$i}=Object,{apply:Ei,construct:_i}=typeof Reflect<"u"&&Reflect;be||(be=function(t){return t}),Me||(Me=function(t){return t}),Ei||(Ei=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),_i||(_i=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const cs=we(Array.prototype.forEach),Oc=we(Array.prototype.lastIndexOf),_o=we(Array.prototype.pop),yn=we(Array.prototype.push),Hc=we(Array.prototype.splice),ds=we(String.prototype.toLowerCase),xi=we(String.prototype.toString),Ii=we(String.prototype.match),wn=we(String.prototype.replace),Fc=we(String.prototype.indexOf),Uc=we(String.prototype.trim),qe=we(Object.prototype.hasOwnProperty),ye=we(RegExp.prototype.test),kn=Gc(TypeError);function we(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return Ei(e,t,s)}}function Gc(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return _i(e,n)}}function D(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ds;Eo&&Eo(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(Pc(t)||(t[s]=a),i=a)}e[i]=!0}return e}function zc(e){for(let t=0;t<e.length;t++)qe(e,t)||(e[t]=null);return e}function Ye(e){const t=$i(null);for(const[n,s]of $o(e))qe(e,n)&&(Array.isArray(s)?t[n]=zc(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=Ye(s):t[n]=s);return t}function $n(e,t){for(;e!==null;){const s=qc(e,t);if(s){if(s.get)return we(s.get);if(typeof s.value=="function")return we(s.value)}e=Nc(e)}function n(){return null}return n}const xo=be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ti=be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Si=be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Wc=be(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Li=be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Vc=be(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Io=be(["#text"]),To=be(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ci=be(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),So=be(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),us=be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Kc=Me(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Yc=Me(/<%[\w\W]*|[\w\W]*%>/gm),Zc=Me(/\$\{[\w\W]*/gm),Xc=Me(/^data-[\-\w.\u00B7-\uFFFF]+$/),Qc=Me(/^aria-[\-\w]+$/),Lo=Me(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Jc=Me(/^(?:\w+script|data):/i),ed=Me(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Co=Me(/^html$/i),td=Me(/^[a-z][.\w]*(-[.\w]+)+$/i);var Ao=Object.freeze({__proto__:null,ARIA_ATTR:Qc,ATTR_WHITESPACE:ed,CUSTOM_ELEMENT:td,DATA_ATTR:Xc,DOCTYPE_NAME:Co,ERB_EXPR:Yc,IS_ALLOWED_URI:Lo,IS_SCRIPT_OR_DATA:Jc,MUSTACHE_EXPR:Kc,TMPLIT_EXPR:Zc});const En={element:1,text:3,progressingInstruction:7,comment:8,document:9},nd=function(){return typeof window>"u"?null:window},sd=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Bo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function jo(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:nd();const t=S=>jo(S);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==En.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:c,NodeFilter:l,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:f,trustedTypes:v}=e,y=c.prototype,b=$n(y,"cloneNode"),E=$n(y,"remove"),x=$n(y,"nextSibling"),j=$n(y,"childNodes"),T=$n(y,"parentNode");if(typeof o=="function"){const S=n.createElement("template");S.content&&S.content.ownerDocument&&(n=S.content.ownerDocument)}let C,B="";const{implementation:Y,createNodeIterator:H,createDocumentFragment:ne,getElementsByTagName:ce}=n,{importNode:ee}=s;let q=Bo();t.isSupported=typeof $o=="function"&&typeof T=="function"&&Y&&Y.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:Se,ERB_EXPR:ge,TMPLIT_EXPR:Re,DATA_ATTR:Pe,ARIA_ATTR:za,IS_SCRIPT_OR_DATA:w,ATTR_WHITESPACE:Ne,CUSTOM_ELEMENT:Ce}=Ao;let{IS_ALLOWED_URI:ft}=Ao,ae=null;const jl=D({},[...xo,...Ti,...Si,...Li,...Io]);let de=null;const Ml=D({},[...To,...Ci,...So,...us]);let Q=Object.seal($i(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Jn=null,Wa=null;const ln=Object.seal($i(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Dl=!0,Va=!0,Rl=!1,Pl=!0,cn=!1,oi=!0,Nt=!1,Ka=!1,Ya=!1,dn=!1,ri=!1,li=!1,Nl=!0,ql=!1;const Xf="user-content-";let Za=!0,es=!1,un={},tt=null;const Xa=D({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ol=null;const Hl=D({},["audio","video","img","source","image","track"]);let Qa=null;const Fl=D({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ci="http://www.w3.org/1998/Math/MathML",di="http://www.w3.org/2000/svg",ht="http://www.w3.org/1999/xhtml";let pn=ht,Ja=!1,eo=null;const Qf=D({},[ci,di,ht],xi);let ui=D({},["mi","mo","mn","ms","mtext"]),pi=D({},["annotation-xml"]);const Jf=D({},["title","style","font","a","script"]);let ts=null;const eh=["application/xhtml+xml","text/html"],th="text/html";let se=null,mn=null;const nh=n.createElement("form"),Ul=function(g){return g instanceof RegExp||g instanceof Function},to=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(mn&&mn===g)){if((!g||typeof g!="object")&&(g={}),g=Ye(g),ts=eh.indexOf(g.PARSER_MEDIA_TYPE)===-1?th:g.PARSER_MEDIA_TYPE,se=ts==="application/xhtml+xml"?xi:ds,ae=qe(g,"ALLOWED_TAGS")?D({},g.ALLOWED_TAGS,se):jl,de=qe(g,"ALLOWED_ATTR")?D({},g.ALLOWED_ATTR,se):Ml,eo=qe(g,"ALLOWED_NAMESPACES")?D({},g.ALLOWED_NAMESPACES,xi):Qf,Qa=qe(g,"ADD_URI_SAFE_ATTR")?D(Ye(Fl),g.ADD_URI_SAFE_ATTR,se):Fl,Ol=qe(g,"ADD_DATA_URI_TAGS")?D(Ye(Hl),g.ADD_DATA_URI_TAGS,se):Hl,tt=qe(g,"FORBID_CONTENTS")?D({},g.FORBID_CONTENTS,se):Xa,Jn=qe(g,"FORBID_TAGS")?D({},g.FORBID_TAGS,se):Ye({}),Wa=qe(g,"FORBID_ATTR")?D({},g.FORBID_ATTR,se):Ye({}),un=qe(g,"USE_PROFILES")?g.USE_PROFILES:!1,Dl=g.ALLOW_ARIA_ATTR!==!1,Va=g.ALLOW_DATA_ATTR!==!1,Rl=g.ALLOW_UNKNOWN_PROTOCOLS||!1,Pl=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,cn=g.SAFE_FOR_TEMPLATES||!1,oi=g.SAFE_FOR_XML!==!1,Nt=g.WHOLE_DOCUMENT||!1,dn=g.RETURN_DOM||!1,ri=g.RETURN_DOM_FRAGMENT||!1,li=g.RETURN_TRUSTED_TYPE||!1,Ya=g.FORCE_BODY||!1,Nl=g.SANITIZE_DOM!==!1,ql=g.SANITIZE_NAMED_PROPS||!1,Za=g.KEEP_CONTENT!==!1,es=g.IN_PLACE||!1,ft=g.ALLOWED_URI_REGEXP||Lo,pn=g.NAMESPACE||ht,ui=g.MATHML_TEXT_INTEGRATION_POINTS||ui,pi=g.HTML_INTEGRATION_POINTS||pi,Q=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&Ul(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Q.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&Ul(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Q.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(Q.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),cn&&(Va=!1),ri&&(dn=!0),un&&(ae=D({},Io),de=[],un.html===!0&&(D(ae,xo),D(de,To)),un.svg===!0&&(D(ae,Ti),D(de,Ci),D(de,us)),un.svgFilters===!0&&(D(ae,Si),D(de,Ci),D(de,us)),un.mathMl===!0&&(D(ae,Li),D(de,So),D(de,us))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?ln.tagCheck=g.ADD_TAGS:(ae===jl&&(ae=Ye(ae)),D(ae,g.ADD_TAGS,se))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?ln.attributeCheck=g.ADD_ATTR:(de===Ml&&(de=Ye(de)),D(de,g.ADD_ATTR,se))),g.ADD_URI_SAFE_ATTR&&D(Qa,g.ADD_URI_SAFE_ATTR,se),g.FORBID_CONTENTS&&(tt===Xa&&(tt=Ye(tt)),D(tt,g.FORBID_CONTENTS,se)),g.ADD_FORBID_CONTENTS&&(tt===Xa&&(tt=Ye(tt)),D(tt,g.ADD_FORBID_CONTENTS,se)),Za&&(ae["#text"]=!0),Nt&&D(ae,["html","head","body"]),ae.table&&(D(ae,["tbody"]),delete Jn.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw kn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw kn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');C=g.TRUSTED_TYPES_POLICY,B=C.createHTML("")}else C===void 0&&(C=sd(v,i)),C!==null&&typeof B=="string"&&(B=C.createHTML(""));be&&be(g),mn=g}},Gl=D({},[...Ti,...Si,...Wc]),zl=D({},[...Li,...Vc]),sh=function(g){let k=T(g);(!k||!k.tagName)&&(k={namespaceURI:pn,tagName:"template"});const I=ds(g.tagName),V=ds(k.tagName);return eo[g.namespaceURI]?g.namespaceURI===di?k.namespaceURI===ht?I==="svg":k.namespaceURI===ci?I==="svg"&&(V==="annotation-xml"||ui[V]):!!Gl[I]:g.namespaceURI===ci?k.namespaceURI===ht?I==="math":k.namespaceURI===di?I==="math"&&pi[V]:!!zl[I]:g.namespaceURI===ht?k.namespaceURI===di&&!pi[V]||k.namespaceURI===ci&&!ui[V]?!1:!zl[I]&&(Jf[I]||!Gl[I]):!!(ts==="application/xhtml+xml"&&eo[g.namespaceURI]):!1},nt=function(g){yn(t.removed,{element:g});try{T(g).removeChild(g)}catch{E(g)}},qt=function(g,k){try{yn(t.removed,{attribute:k.getAttributeNode(g),from:k})}catch{yn(t.removed,{attribute:null,from:k})}if(k.removeAttribute(g),g==="is")if(dn||ri)try{nt(k)}catch{}else try{k.setAttribute(g,"")}catch{}},Wl=function(g){let k=null,I=null;if(Ya)g="<remove></remove>"+g;else{const te=Ii(g,/^[\r\n\t ]+/);I=te&&te[0]}ts==="application/xhtml+xml"&&pn===ht&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");const V=C?C.createHTML(g):g;if(pn===ht)try{k=new f().parseFromString(V,ts)}catch{}if(!k||!k.documentElement){k=Y.createDocument(pn,"template",null);try{k.documentElement.innerHTML=Ja?B:V}catch{}}const fe=k.body||k.documentElement;return g&&I&&fe.insertBefore(n.createTextNode(I),fe.childNodes[0]||null),pn===ht?ce.call(k,Nt?"html":"body")[0]:Nt?k.documentElement:fe},Vl=function(g){return H.call(g.ownerDocument||g,g,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},no=function(g){return g instanceof p&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof d)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},Kl=function(g){return typeof r=="function"&&g instanceof r};function vt(S,g,k){cs(S,I=>{I.call(t,g,k,mn)})}const Yl=function(g){let k=null;if(vt(q.beforeSanitizeElements,g,null),no(g))return nt(g),!0;const I=se(g.nodeName);if(vt(q.uponSanitizeElement,g,{tagName:I,allowedTags:ae}),oi&&g.hasChildNodes()&&!Kl(g.firstElementChild)&&ye(/<[/\w!]/g,g.innerHTML)&&ye(/<[/\w!]/g,g.textContent)||g.nodeType===En.progressingInstruction||oi&&g.nodeType===En.comment&&ye(/<[/\w]/g,g.data))return nt(g),!0;if(!(ln.tagCheck instanceof Function&&ln.tagCheck(I))&&(!ae[I]||Jn[I])){if(!Jn[I]&&Xl(I)&&(Q.tagNameCheck instanceof RegExp&&ye(Q.tagNameCheck,I)||Q.tagNameCheck instanceof Function&&Q.tagNameCheck(I)))return!1;if(Za&&!tt[I]){const V=T(g)||g.parentNode,fe=j(g)||g.childNodes;if(fe&&V){const te=fe.length;for(let Ae=te-1;Ae>=0;--Ae){const bt=b(fe[Ae],!0);bt.__removalCount=(g.__removalCount||0)+1,V.insertBefore(bt,x(g))}}}return nt(g),!0}return g instanceof c&&!sh(g)||(I==="noscript"||I==="noembed"||I==="noframes")&&ye(/<\/no(script|embed|frames)/i,g.innerHTML)?(nt(g),!0):(cn&&g.nodeType===En.text&&(k=g.textContent,cs([Se,ge,Re],V=>{k=wn(k,V," ")}),g.textContent!==k&&(yn(t.removed,{element:g.cloneNode()}),g.textContent=k)),vt(q.afterSanitizeElements,g,null),!1)},Zl=function(g,k,I){if(Nl&&(k==="id"||k==="name")&&(I in n||I in nh))return!1;if(!(Va&&!Wa[k]&&ye(Pe,k))){if(!(Dl&&ye(za,k))){if(!(ln.attributeCheck instanceof Function&&ln.attributeCheck(k,g))){if(!de[k]||Wa[k]){if(!(Xl(g)&&(Q.tagNameCheck instanceof RegExp&&ye(Q.tagNameCheck,g)||Q.tagNameCheck instanceof Function&&Q.tagNameCheck(g))&&(Q.attributeNameCheck instanceof RegExp&&ye(Q.attributeNameCheck,k)||Q.attributeNameCheck instanceof Function&&Q.attributeNameCheck(k,g))||k==="is"&&Q.allowCustomizedBuiltInElements&&(Q.tagNameCheck instanceof RegExp&&ye(Q.tagNameCheck,I)||Q.tagNameCheck instanceof Function&&Q.tagNameCheck(I))))return!1}else if(!Qa[k]){if(!ye(ft,wn(I,Ne,""))){if(!((k==="src"||k==="xlink:href"||k==="href")&&g!=="script"&&Fc(I,"data:")===0&&Ol[g])){if(!(Rl&&!ye(w,wn(I,Ne,"")))){if(I)return!1}}}}}}}return!0},Xl=function(g){return g!=="annotation-xml"&&Ii(g,Ce)},Ql=function(g){vt(q.beforeSanitizeAttributes,g,null);const{attributes:k}=g;if(!k||no(g))return;const I={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:de,forceKeepAttr:void 0};let V=k.length;for(;V--;){const fe=k[V],{name:te,namespaceURI:Ae,value:bt}=fe,gn=se(te),so=bt;let ue=te==="value"?so:Uc(so);if(I.attrName=gn,I.attrValue=ue,I.keepAttr=!0,I.forceKeepAttr=void 0,vt(q.uponSanitizeAttribute,g,I),ue=I.attrValue,ql&&(gn==="id"||gn==="name")&&(qt(te,g),ue=Xf+ue),oi&&ye(/((--!?|])>)|<\/(style|title|textarea)/i,ue)){qt(te,g);continue}if(gn==="attributename"&&Ii(ue,"href")){qt(te,g);continue}if(I.forceKeepAttr)continue;if(!I.keepAttr){qt(te,g);continue}if(!Pl&&ye(/\/>/i,ue)){qt(te,g);continue}cn&&cs([Se,ge,Re],ec=>{ue=wn(ue,ec," ")});const Jl=se(g.nodeName);if(!Zl(Jl,gn,ue)){qt(te,g);continue}if(C&&typeof v=="object"&&typeof v.getAttributeType=="function"&&!Ae)switch(v.getAttributeType(Jl,gn)){case"TrustedHTML":{ue=C.createHTML(ue);break}case"TrustedScriptURL":{ue=C.createScriptURL(ue);break}}if(ue!==so)try{Ae?g.setAttributeNS(Ae,te,ue):g.setAttribute(te,ue),no(g)?nt(g):_o(t.removed)}catch{qt(te,g)}}vt(q.afterSanitizeAttributes,g,null)},ih=function S(g){let k=null;const I=Vl(g);for(vt(q.beforeSanitizeShadowDOM,g,null);k=I.nextNode();)vt(q.uponSanitizeShadowNode,k,null),Yl(k),Ql(k),k.content instanceof a&&S(k.content);vt(q.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(S){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},k=null,I=null,V=null,fe=null;if(Ja=!S,Ja&&(S="<!-->"),typeof S!="string"&&!Kl(S))if(typeof S.toString=="function"){if(S=S.toString(),typeof S!="string")throw kn("dirty is not a string, aborting")}else throw kn("toString is not a function");if(!t.isSupported)return S;if(Ka||to(g),t.removed=[],typeof S=="string"&&(es=!1),es){if(S.nodeName){const bt=se(S.nodeName);if(!ae[bt]||Jn[bt])throw kn("root node is forbidden and cannot be sanitized in-place")}}else if(S instanceof r)k=Wl("<!---->"),I=k.ownerDocument.importNode(S,!0),I.nodeType===En.element&&I.nodeName==="BODY"||I.nodeName==="HTML"?k=I:k.appendChild(I);else{if(!dn&&!cn&&!Nt&&S.indexOf("<")===-1)return C&&li?C.createHTML(S):S;if(k=Wl(S),!k)return dn?null:li?B:""}k&&Ya&&nt(k.firstChild);const te=Vl(es?S:k);for(;V=te.nextNode();)Yl(V),Ql(V),V.content instanceof a&&ih(V.content);if(es)return S;if(dn){if(ri)for(fe=ne.call(k.ownerDocument);k.firstChild;)fe.appendChild(k.firstChild);else fe=k;return(de.shadowroot||de.shadowrootmode)&&(fe=ee.call(s,fe,!0)),fe}let Ae=Nt?k.outerHTML:k.innerHTML;return Nt&&ae["!doctype"]&&k.ownerDocument&&k.ownerDocument.doctype&&k.ownerDocument.doctype.name&&ye(Co,k.ownerDocument.doctype.name)&&(Ae="<!DOCTYPE "+k.ownerDocument.doctype.name+`>
`+Ae),cn&&cs([Se,ge,Re],bt=>{Ae=wn(Ae,bt," ")}),C&&li?C.createHTML(Ae):Ae},t.setConfig=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};to(S),Ka=!0},t.clearConfig=function(){mn=null,Ka=!1},t.isValidAttribute=function(S,g,k){mn||to({});const I=se(S),V=se(g);return Zl(I,V,k)},t.addHook=function(S,g){typeof g=="function"&&yn(q[S],g)},t.removeHook=function(S,g){if(g!==void 0){const k=Oc(q[S],g);return k===-1?void 0:Hc(q[S],k,1)[0]}return _o(q[S])},t.removeHooks=function(S){q[S]=[]},t.removeAllHooks=function(){q=Bo()},t}var Mo=jo();const Ai="chaotic_";function Oe(e){try{return localStorage.getItem(Ai+e)}catch{return null}}function He(e,t){try{localStorage.setItem(Ai+e,t)}catch{}}function ot(e){try{localStorage.removeItem(Ai+e)}catch{}}function id(){return Oe("token")}function ad(e){e?He("token",e):ot("token")}function od(){return Oe("theme")}function rd(e){He("theme",e)}function Do(){return Oe("last_project")}function ld(e){He("last_project",e)}function cd(){return Oe("onboarding_complete")==="true"}function dd(){He("onboarding_complete","true")}function ud(){ot("onboarding_complete")}function pd(e){return e?Oe(`issues_filters_${e}`):null}function md(e,t){e&&(t?He(`issues_filters_${e}`,t):ot(`issues_filters_${e}`))}function gd(e){return Oe(`comment_draft_${e}`)}function ps(e,t){t?He(`comment_draft_${e}`,t):ot(`comment_draft_${e}`)}function fd(e){return Oe(`description_draft_${e}`)}function ms(e,t){t?He(`description_draft_${e}`,t):ot(`description_draft_${e}`)}function hd(){return{title:Oe("create_issue_title"),description:Oe("create_issue_description")}}function Ro(e,t){e?He("create_issue_title",e):ot("create_issue_title"),t?He("create_issue_description",t):ot("create_issue_description")}function vd(){ot("create_issue_title"),ot("create_issue_description")}function bd(){return Oe("doc_view_mode")}function yd(e){He("doc_view_mode",e)}function wd(){return Oe("approvals_explainer_dismissed")==="1"}function kd(){He("approvals_explainer_dismissed","1")}const $d="/api";class Ed{constructor(){this.token=id()}setToken(t){this.token=t,ad(t)}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const o=await fetch(`${$d}${n}`,a);if(o.status===204)return null;let r;try{r=await o.json()}catch{const c=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let c;typeof r.detail=="string"?c=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?c=r.detail.message:c="An error occurred";const l=new Error(c);throw l.status=o.status,l.detail=r.detail,l}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20,{projectId:i}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`;return i&&(a+=`&project_id=${i}`),this.request("GET",a)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const h=new Ed;let Ot=null;function N(){document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function R(){var e;yt(),document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide")}function gs(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function $(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.classList.add("toast-exit"),s.addEventListener("animationend",()=>s.remove(),{once:!0}),setTimeout(()=>{s.parentNode&&s.remove()},500)},3e3)}function _d(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function _(e,t){const n=_d(t);$(`Failed to ${e}: ${n}`,"error")}function yt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Ot&&(document.removeEventListener("keydown",Ot),Ot=null)}function _n(e){Ot&&document.removeEventListener("keydown",Ot),Ot=e,e&&document.addEventListener("keydown",e)}function xn(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(yt(),document.removeEventListener("click",s,!0))};return setTimeout(()=>document.addEventListener("click",s,!0),0),()=>document.removeEventListener("click",s,!0)}function ke(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Be(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Bi(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function z(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,s]=e;return`#${t}${t}${n}${n}${s}${s}`}return e}function m(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function u(e){return m(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Ze(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function rt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function xd(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Ht(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",s=e==null?void 0:e.avatar_url;return s?xd(s)?`<img class="${t} avatar-img" src="${u(s)}" alt="${u(n)}">`:`<div class="${t} avatar-emoji">${m(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}let ie={...{currentUser:null,currentView:"my-issues",issues:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const ji=new Set;function Le(e,t){if(typeof e=="string"){const n=ie[e];ie[e]=t,Po(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=ie[s];ie[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{Po(s,i,a)})}}function lt(e){return ji.add(e),()=>ji.delete(e)}function Po(e,t,n){t!==n&&ji.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const In=()=>ie.currentUser,fs=e=>Le("currentUser",e),A=()=>ie.currentView,Id=e=>Le("currentView",e),$e=()=>ie.issues,Xe=e=>Le("issues",e),No=()=>ie.labels,hs=e=>Le("labels",e),qo=()=>ie.activeFilterCategory,Td=e=>Le("activeFilterCategory",e),Sd=()=>ie.selectedIssueIndex,Oo=e=>Le("selectedIssueIndex",e),Ld=()=>ie.selectedDocIndex,Ho=e=>Le("selectedDocIndex",e),Cd=()=>ie.pendingGates,Ad=e=>Le("pendingGates",e),Bd=()=>ie.searchDebounceTimer,jd=e=>Le("searchDebounceTimer",e),Md=()=>ie.websocket,Fo=e=>Le("websocket",e),L=()=>ie.currentTeam,Mi=e=>Le("currentTeam",e),F=()=>ie.currentProject,Fe=e=>Le("currentProject",e||null),oe=()=>ie.currentDetailIssue,vs=e=>Le("currentDetailIssue",e),Dd=()=>ie.currentDetailSprints,Uo=e=>Le("currentDetailSprints",e),Di={};function J(e){Object.assign(Di,e)}function Rd(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}const s=t.dataset.action,i=Di[s];if(!i){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${s}"`);return}i(e,t.dataset,t)}let Go=!1;function Pd(){if(!Go){Go=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,Rd);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=Di[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const Ri=["backlog","todo","in_progress","in_review","done","canceled"],Ft=["backlog","todo","in_progress","in_review"],zo=["urgent","high","medium","low","no_priority"],Pi=["no_priority","urgent","high","medium","low"],Wo=["backlog","todo","in_progress","in_review","done"];function Z({icon:e,heading:t,description:n,cta:s}){const i=s?`
        <button class="btn btn-primary empty-state-cta" data-action="${u(s.action)}"${s.data?Object.entries(s.data).map(([a,o])=>` data-${u(a)}="${u(o)}"`).join(""):""}>${m(s.label)}</button>
    `:"";return`
        <div class="empty-state">
            <div class="empty-state-icon">${e}</div>
            <h3>${m(t)}</h3>
            <p>${m(n)}</p>
            ${i}
        </div>
    `}const K={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'};let Tn=[];function Nd(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function qd(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function bs(e,t){const n=e().map(Nd),s=t().map(qd);Tn=[...n,...s]}function Sn(e){return e&&Tn.find(t=>t.id===e)||null}function Ct(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Ni(e,t=!1){const n=m(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${m(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function ys(){const e=Tn.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));Tn.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,c)=>r.name.localeCompare(c.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=Tn.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function ws(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;ys().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${Ni(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}function Ut(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Gt(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function zt(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Wt(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Vo(){const e=document.getElementById("group-by-select");return e?e.value:""}const Ko=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],ks=["done","canceled"];function Yo(e){var t,n,s;switch(e){case"project":return F()?1:0;case"status":return Ut().length;case"priority":return Gt().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(s=document.getElementById("sprint-filter"))!=null&&s.value?1:0;case"labels":return zt().length;case"exclude_labels":return Wt().length;default:return 0}}function qi(){let e=0;return Ko.forEach(t=>{e+=Yo(t.key)}),e}function Zo(){var v,y,b,E,x,j;const e=new URLSearchParams,t=Ut(),n=Gt(),s=zt(),i=Wt(),a=(v=document.getElementById("assignee-filter"))==null?void 0:v.value,o=F()||"",r=(y=document.getElementById("sprint-filter"))==null?void 0:y.value,c=(b=document.getElementById("issue-type-filter"))==null?void 0:b.value,l=(E=document.getElementById("group-by-select"))==null?void 0:E.value,d=(x=document.getElementById("sort-by-select"))==null?void 0:x.value;t.forEach(T=>e.append("status",T)),n.forEach(T=>e.append("priority",T)),s.forEach(T=>e.append("label",T)),i.forEach(T=>e.append("exclude_label",T)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),c&&e.set("issue_type",c),l&&e.set("groupBy",l),d&&d!=="created-desc"&&e.set("sort",d);const p=e.toString(),f=p?`/issues?${p}`:"/issues";history.replaceState({view:"issues"},"",f),md((j=L())==null?void 0:j.id,p)}function Od(e){var y;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(b=>t.has(b))){const b=pd((y=L())==null?void 0:y.id);if(b){t=new URLSearchParams(b);const E=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",E)}}const i=t.getAll("status");if(i.length>0){const b=document.getElementById("status-filter-dropdown");b&&(b.querySelectorAll('input[type="checkbox"]').forEach(x=>{x.checked=i.includes(x.value)}),Xo())}const a=t.getAll("priority");if(a.length>0){const b=document.getElementById("priority-filter-dropdown");b&&(b.querySelectorAll('input[type="checkbox"]').forEach(x=>{x.checked=a.includes(x.value)}),Qo())}const o=t.get("assignee");if(o){const b=document.getElementById("assignee-filter");b&&(b.value=o)}const r=t.get("project");r&&(e(!0),Fe(r),e(!1));const c=t.get("sprint");if(c){const b=document.getElementById("sprint-filter");b&&(b.value=c)}const l=t.get("issue_type");if(l){const b=document.getElementById("issue-type-filter");b&&(b.value=l)}const d=t.getAll("label");if(d.length>0){const b=document.getElementById("label-filter-dropdown");b&&(b.querySelectorAll('input[type="checkbox"]').forEach(x=>{x.checked=d.includes(x.value)}),$s())}const p=t.getAll("exclude_label");if(p.length>0){const b=document.getElementById("exclude-label-filter-dropdown");b&&(b.querySelectorAll('input[type="checkbox"]').forEach(x=>{x.checked=p.includes(x.value)}),Es())}const f=t.get("groupBy");if(f){const b=document.getElementById("group-by-select");b&&(b.value=f)}const v=t.get("sort");if(v){const b=document.getElementById("sort-by-select");b&&(b.value=v)}}function Xo(){const e=Ut(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=ke(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function Qo(){const e=Gt(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Be(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function $s(){var s,i;const e=zt(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function Es(){var s,i;const e=Wt(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function Jo(){if(!L())return;let e;try{e=await h.getLabels(L().id)}catch(t){console.error("Failed to load labels for filter:",t);return}er("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),er("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function er(e,t,n,s){const i=document.getElementById(e);if(!i)return;const a=i.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const c=document.createElement("label");c.className="multi-select-option",c.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${z(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${m(r.name)}</span>
                </span>
            `,a.appendChild(c)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${s}">Clear</button>`,a.appendChild(o)}function _s(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",tr)},0))}function tr(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",tr))}function Hd(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Vt)):(e.classList.remove("hidden"),e.classList.remove("show-options"),pe(),Ee(qo()),setTimeout(()=>{document.addEventListener("click",Vt)},0))}function Fd(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Vt)):(e.classList.remove("hidden"),Qd(),setTimeout(()=>{document.addEventListener("click",Vt)},0))}function Vt(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),s=e.composedPath(),i=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=i&&s.includes(i),r=a&&s.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Vt))}function At(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Vt)}function pe(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=F();e.innerHTML=Ko.map(n=>{const s=Yo(n.key),i=qo()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${i?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${u(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${s>0?`<span class="filter-menu-category-count">${s}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function Ee(e){Td(e),pe();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":Gd(t);break;case"status":zd(t);break;case"priority":Wd(t);break;case"type":Vd(t);break;case"assignee":Kd(t);break;case"sprint":Yd(t);break;case"labels":Zd(t);break;case"exclude_labels":Xd(t);break}const n=t.querySelector(".filter-options-header");if(n){const s=document.createElement("button");s.type="button",s.className="filter-options-back",s.dataset.action="filter-menu-back",s.setAttribute("aria-label","Back to filter categories"),s.textContent="←",n.prepend(s)}}function Ud(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),pe()}function Gd(e){const t=F()||"",n=X()||[];let s=`
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
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${z(i.color)};"></span>
                <span class="filter-option-label">${m(i.name)}</span>
            </label>
        `}),e.innerHTML=s}function zd(e){const t=Ut(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],s=Ft.every(o=>t.includes(o))&&!ks.some(o=>t.includes(o))&&t.length===Ft.length,i=ks.every(o=>t.includes(o))&&!Ft.some(o=>t.includes(o))&&t.length===ks.length;let a=`
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
        `}),e.innerHTML=a}function Wd(e){const t=Gt(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
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
        `}),e.innerHTML=s}function Vd(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${u(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function Kd(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=Pt()||[];let i=`
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
                <span class="filter-option-label">${m(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function Yd(e){if(!F()){e.innerHTML=`
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
                <span class="filter-option-label">${m(o.text)}</span>
            </label>
        `}),e.innerHTML=a}function Zd(e){const t=zt(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),l=(r==null?void 0:r.textContent)||"Label",d=(c==null?void 0:c.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${u(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${u(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${z(d)};"></span>
                    <span class="filter-option-label">${m(l)}</span>
                </label>
            `}),e.innerHTML=i}function Xd(e){const t=Wt(),n=document.getElementById("exclude-label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),l=(r==null?void 0:r.textContent)||"Label",d=(c==null?void 0:c.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${u(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${u(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${z(d)};"></span>
                    <span class="filter-option-label">${m(l)}</span>
                </label>
            `}),e.innerHTML=i}function Qd(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(c=>`
                <div class="display-option ${s===c.value?"active":""}" data-action="set-sort" data-value="${u(c.value)}">
                    <span>${c.label}</span>
                    ${s===c.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(c=>`
                <div class="display-option ${i===c.value?"active":""}" data-action="set-group-by" data-value="${u(c.value)}">
                    <span>${c.label}</span>
                    ${i===c.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function _e(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=F();if(n){const f=(X()||[]).find(v=>v.id===n);t.push({category:"project",label:"Project",value:(f==null?void 0:f.name)||"Unknown",clearAction:"clear-project-filter"})}const s=Ut();if(s.length>0){const p=s.map(f=>ke(f)).join(", ");t.push({category:"status",label:"Status",value:p,clearAction:"clear-status-filter-new"})}const i=Gt();if(i.length>0){const p=i.map(f=>Be(f)).join(", ");t.push({category:"priority",label:"Priority",value:p,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const p=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:p?p.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let p;if(o.value==="me")p="Me";else if(o.value==="unassigned")p="Unassigned";else{const v=(Pt()||[]).find(y=>y.user_id===o.value);p=(v==null?void 0:v.name)||(v==null?void 0:v.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:p,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const p=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(p==null?void 0:p.text)||r.value,clearAction:"clear-sprint-filter"})}const c=zt();if(c.length>0){const p=document.getElementById("label-filter-dropdown"),f=c.map(v=>{var E;const y=p==null?void 0:p.querySelector(`input[value="${v}"]`),b=(E=y==null?void 0:y.closest("label"))==null?void 0:E.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:f,clearAction:"clear-label-filter-new"})}const l=Wt();if(l.length>0){const p=document.getElementById("exclude-label-filter-dropdown"),f=l.map(v=>{var E;const y=p==null?void 0:p.querySelector(`input[value="${v}"]`),b=(E=y==null?void 0:y.closest("label"))==null?void 0:E.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:f,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(p=>`
        <span class="filter-chip" title="${u(p.label)}: ${u(p.value)}">
            <span class="filter-chip-label">${p.label}:</span>
            <span class="filter-chip-value">${m(p.value)}</span>
            <button class="filter-chip-remove" data-action="${p.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=d}function xe(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=qi();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function nr(){const e=document.getElementById("sprint-filter");if(!e)return;const t=F(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",Oi(null);return}let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const i=await h.getSprints(t),a=i.find(o=>o.status==="active");a&&(s+=`<option value="current">Current Sprint (${m(a.name)})</option>`),Or(t,a==null?void 0:a.id),Oi(a||null),i.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";s+=`<option value="${o.id}">${m(o.name)}${r}</option>`})}catch(i){console.error("Failed to load sprints:",i)}e.innerHTML=s,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function Oi(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${m(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${m(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function Jd(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let sr=!1;lt(e=>{if(e!=="currentProject"||A()!=="issues"||sr)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([nr(),Jo()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=!1});const s=document.getElementById("exclude-label-filter-dropdown");s==null||s.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=!1}),$s(),Es(),je(),_e(),xe()}).catch(n=>{console.error("Failed to update filters on project switch:",n),je(),_e(),xe()})});function eu(){Od(e=>{sr=e})}function xs(){Xo(),je(),_e(),xe()}function Hi(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),xs()}function Fi(){Qo(),je(),_e(),xe()}function Ui(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Fi()}function Gi(){$s(),je(),_e(),xe()}function Is(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Gi()}function zi(){Es(),je(),_e(),xe()}function Ts(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),zi()}function tu(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function ir(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(s=>{var i,a,o;return(o=(a=(i=n==null?void 0:n.querySelector(`input[value="${tu(s)}"]`))==null?void 0:i.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}async function Bt(){var p,f,v,y,b,E,x;if(Oo(-1),!L())return;const e=F()||"",t=Ut(),n=Gt(),s=(p=document.getElementById("assignee-filter"))==null?void 0:p.value,i=(v=(f=document.getElementById("issue-search"))==null?void 0:f.value)==null?void 0:v.trim();if(!e&&X().length===0){document.getElementById("issues-list").innerHTML=Z({icon:K.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}Jd();const a={limit:1e3},o=((y=document.getElementById("sort-by-select"))==null?void 0:y.value)||"created-desc",[r,c]=o.includes("-")?o.split("-"):[o,null];a.sort_by=r,c&&(a.order=c),t.length>0&&(a.status=t),n.length>0&&(a.priority=n),s&&(s==="me"?a.assignee_id=(b=In())==null?void 0:b.id:a.assignee_id=s);const l=(E=document.getElementById("sprint-filter"))==null?void 0:E.value;if(l)if(l==="current"){if(e){const j=rm(e);if(j!==void 0)j&&(a.sprint_id=j);else try{const C=(await h.getSprints(e)).find(B=>B.status==="active");Or(e,C==null?void 0:C.id),C&&(a.sprint_id=C.id)}catch(T){console.error("Failed to resolve current sprint:",T)}}}else a.sprint_id=l;const d=(x=document.getElementById("issue-type-filter"))==null?void 0:x.value;d&&(a.issue_type=d),i&&i.length>=1&&(a.search=i);try{const j=ir(zt(),"label-filter-dropdown");j.length>0&&(a.label=j,a.label_match="any");const T=ir(Wt(),"exclude-label-filter-dropdown");T.length>0&&(a.exclude_label=T);let C;e?(a.project_id=e,C=await h.getIssues(a)):X().length>0&&(C=await h.getTeamIssues(L().id,a)),Xe(C);const B=[...new Set(C.map(Y=>Y.project_id))];await qr(B),ct()}catch(j){_("load issues",j)}}function nu(){clearTimeout(Bd()),jd(setTimeout(()=>{Bt()},300))}function je(){Zo(),Bt()}async function ar(){if(Zo(),Vo()==="sprint"){const e=$e(),t=[...new Set(e.map(n=>n.project_id))];await qr(t)}ct()}function su(){_e(),xe()}function or(e){Fe(e),pe(),Ee("project"),At()}function iu(){or("")}function au(e){const t=e==="open"?Ft:ks,n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),xs(),pe(),Ee("status")}function ou(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,xs()),pe(),Ee("status")}function ru(){Hi(),pe(),Ee("status"),_e(),xe()}function lu(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Fi()),pe(),Ee("priority")}function cu(){Ui(),pe(),Ee("priority"),_e(),xe()}function rr(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,je()),pe(),Ee("type"),_e(),xe(),At()}function du(){rr("")}function lr(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,je()),pe(),Ee("assignee"),_e(),xe(),At()}function uu(){lr("")}function cr(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,je()),pe(),Ee("sprint"),_e(),xe(),At()}function pu(){cr("")}function mu(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Gi()),pe(),Ee("labels")}function gu(){Is(),pe(),Ee("labels"),_e(),xe()}function fu(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,zi()),pe(),Ee("exclude_labels")}function hu(){Ts(),pe(),Ee("exclude_labels"),_e(),xe()}function vu(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Bt()),At()}function bu(e){const t=document.getElementById("group-by-select");t&&(t.value=e,ar()),At()}function yu(){Fe(null),Hi(),Ui();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const s=document.getElementById("issue-search");s&&(s.value=""),Is(),Ts(),je(),_e(),xe()}J({"update-label-filter":()=>Gi(),"clear-label-filter":()=>Is(),"update-exclude-label-filter":()=>zi(),"clear-exclude-label-filter":()=>Ts(),"show-filter-category":(e,t)=>{var n,s;Ee(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(s=document.querySelector("#filter-menu-options .filter-options-back"))==null||s.focus()},"filter-menu-back":()=>{Ud();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>or(t.value),"clear-project-filter":()=>iu(),"clear-status-filter-new":()=>ru(),"set-status-preset":(e,t)=>au(t.value),"toggle-status-option":(e,t)=>ou(t.filterValue,e),"clear-priority-filter-new":()=>cu(),"toggle-priority-option":(e,t)=>lu(t.filterValue,e),"set-type-filter":(e,t)=>rr(t.value),"clear-type-filter":()=>du(),"set-assignee-filter":(e,t)=>lr(t.value),"clear-assignee-filter":()=>uu(),"set-sprint-filter":(e,t)=>cr(t.value),"clear-sprint-filter":()=>pu(),"clear-label-filter-new":()=>gu(),"toggle-label-option":(e,t)=>mu(t.filterValue,e),"clear-exclude-label-filter-new":()=>hu(),"toggle-exclude-label-option":(e,t)=>fu(t.filterValue,e),"set-sort":(e,t)=>vu(t.value),"set-group-by":(e,t)=>bu(t.value),"clear-all-filters":()=>yu()});let Ln=[],Wi=[];lt(e=>{e==="currentProject"&&A()==="my-issues"&&(Ss(),Vi(),jt())});function wt(){return Ln}function Kt(e){Ln=e}async function Ss(){var i;const e=L(),t=In();if(!e||!t)return;const n=(i=document.getElementById("my-issues-status-filter"))==null?void 0:i.value,s=F();ku();try{const a={assignee_id:t.id,status:n||void 0,limit:1e3};let o;s?o=await h.getIssues({...a,project_id:s}):o=await h.getTeamIssues(e.id,a),Ln=o,Cn()}catch(a){_("load issues",a)}}async function jt({showLoading:e=!0}={}){const t=L();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const s=F();Wi=await h.getTeamActivities(t.id,0,10,{projectId:s}),wu()}catch{n&&(n.innerHTML=Z({icon:K.activity,heading:"Failed to load activity",description:"Check your connection and try again"}))}}function wu(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Wi.length){e.innerHTML=Z({icon:K.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=Wi.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${u(t.issue_identifier)}"><strong>${m(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${u(t.document_id)}"><strong>${s} ${m(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${m(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${ta(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${sa(t)}${n}</span>
                <span class="activity-actor">by ${m(na(t))}</span>
                <span class="activity-time">${Ze(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function ku(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function dr(){Ss()}function Cn(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),Ln.length===0){e.innerHTML=Z({icon:K.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}e.innerHTML=Ln.map(t=>Ue(t)).join("")}}async function Vi(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=F(),n=X(),s=t?n.filter(i=>i.id===t):n;if(!s.length){e.innerHTML="";return}try{const i=s.map(async o=>{try{const r=await h.getCurrentSprint(o.id);if(!r)return null;let c={};try{const l=await h.getIssues({sprint_id:r.id,project_id:o.id,limit:500});for(const d of l)c[d.status]=(c[d.status]||0)+1}catch{}return{project:o,sprint:r,statusCounts:c}}catch{return null}}),a=(await Promise.all(i)).filter(Boolean);$u(a)}catch{e.innerHTML=""}}function $u(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active Sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:s,sprint:i,statusCounts:a})=>{const o=i.budget||0,r=i.points_spent||0,c=o>0?Math.min(100,Math.round(r/o*100)):0,l=o>0&&r>o,d=i.limbo?"limbo":l?"arrears":"",p=a||{},f=Object.values(p).reduce((v,y)=>v+y,0);return`
                    <div class="sprint-status-card ${d}">
                        <div class="sprint-status-header">
                            <span class="sprint-status-project">${m(s.name)}</span>
                            ${i.limbo?'<span class="sprint-status-badge limbo">Limbo</span>':""}
                            ${l?'<span class="sprint-status-badge arrears">Arrears</span>':""}
                        </div>
                        <div class="sprint-status-name">${m(i.name)}</div>
                        ${o>0?`
                            <div class="sprint-status-progress">
                                <div class="sprint-progress-bar">
                                    <div class="sprint-progress-fill ${d}" style="width: ${c}%"></div>
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
                                    ${n.filter(v=>p[v]).map(v=>{const y=Math.round(p[v]/f*100);return`<div class="sprint-stacked-segment status-${v}" style="width: ${y}%" title="${ke(v)}: ${p[v]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(v=>p[v]).map(v=>`<span class="sprint-count-label status-${v}">${p[v]} ${ke(v)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}J({"filter-my-issues":()=>dr(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),ol(t.identifier)}});const ur=Ri,Eu=["task","bug","feature","chore","docs","tech_debt","epic"];let Qe=[],pr=Promise.resolve();function mr(){return Qe}function gr(e){Qe=e}async function Ki(e,t,n,s){var p,f;e.preventDefault(),yt();const a=(s||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${ur.map((v,y)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="status" data-value="${v}">
                    ${Ie(v)}
                    <span>${ke(v)}</span>
                    <span class="dropdown-shortcut">${y+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${Pi.map((v,y)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="priority" data-value="${v}">
                    ${Je(v)}
                    <span>${Be(v)}</span>
                    <span class="dropdown-shortcut">${y}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Eu.map(v=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="issue_type" data-value="${v}">
                    <span class="issue-type-badge type-${v}">${rt(v)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const v=ys();o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${v.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:v.map(({assignee:y,indent:b},E)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="assignee_id" data-value="${u(y.id)}">
                    ${Ht(y,"avatar-small")}
                    <span>${Ni(y,b)}</span>
                    ${E<9?`<span class="dropdown-shortcut">${E+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const v=document.querySelector(`.issue-row[data-issue-id="${n}"]`),y=(v==null?void 0:v.dataset.projectId)||((p=oe())==null?void 0:p.project_id),b=tn(y);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${b.map((E,x)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="estimate" data-value="${E.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${E.label}</span>
                    ${x<9?`<span class="dropdown-shortcut">${x}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const v=$e(),y=wt(),b=oe(),E=v.find(ee=>ee.id===n)||y.find(ee=>ee.id===n)||b,x=new Set(((E==null?void 0:E.labels)||[]).map(ee=>ee.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const j=o.getBoundingClientRect();let T=a.bottom+4,C=a.left;C+j.width>window.innerWidth-8&&(C=a.right-j.width),T+j.height>window.innerHeight-8&&(T=a.top-j.height-4),o.style.top=`${T}px`,o.style.left=`${Math.max(8,C)}px`,xn(o,{multiSelect:!0});let B=[];const Y=L();if(Y)try{B=await h.getLabels(Y.id)}catch(ee){console.error("Failed to load labels:",ee)}if(!o.parentNode)return;hr(o,n,B,x);const H=o.getBoundingClientRect();let ne=a.bottom+4,ce=a.left;ce+H.width>window.innerWidth-8&&(ce=a.right-H.width),ne+H.height>window.innerHeight-8&&(ne=a.top-H.height-4),o.style.top=`${ne}px`,o.style.left=`${Math.max(8,ce)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const v=$e(),y=wt(),b=oe(),E=v.find(q=>q.id===n)||y.find(q=>q.id===n)||b,x=(E==null?void 0:E.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const j=o.getBoundingClientRect();let T=a.bottom+4,C=a.left;C+j.width>window.innerWidth-8&&(C=a.right-j.width),T+j.height>window.innerHeight-8&&(T=a.top-j.height-4),o.style.top=`${T}px`,o.style.left=`${Math.max(8,C)}px`,xn(o);let B=[];if(x)try{B=await h.getSprints(x),om(x,B)}catch(q){console.error("Failed to load sprints:",q)}if(!o.parentNode)return;const Y=B.filter(q=>q.status!=="completed"||q.id===(E==null?void 0:E.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${Y.map((q,Se)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${u(n)}" data-field="sprint_id" data-value="${u(q.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${m(q.name)}${q.status==="active"?" (Active)":""}</span>
                    ${Se<9?`<span class="dropdown-shortcut">${Se+1}</span>`:""}
                </button>
            `).join("")}
        `;const H=o.getBoundingClientRect();let ne=a.bottom+4,ce=a.left;ce+H.width>window.innerWidth-8&&(ce=a.right-H.width),ne+H.height>window.innerHeight-8&&(ne=a.top-H.height-4),o.style.top=`${ne}px`,o.style.left=`${Math.max(8,ce)}px`,o.classList.remove("dropdown-positioning");const ee=q=>{const Se=q.key;if(Se==="Escape"){yt(),document.removeEventListener("keydown",ee),_n(null);return}const ge=parseInt(Se);if(isNaN(ge))return;const Re=o.querySelectorAll(".dropdown-option");let Pe=!1;ge===0?(Yt(n,"sprint_id",null),Pe=!0):ge>=1&&ge<Re.length&&(Re[ge].click(),Pe=!0),Pe&&(document.removeEventListener("keydown",ee),_n(null))};_n(ee),document.addEventListener("keydown",ee);return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let c=a.bottom+4,l=a.left;l+r.width>window.innerWidth-8&&(l=a.right-r.width),c+r.height>window.innerHeight-8&&(c=a.top-r.height-4),o.style.top=`${c}px`,o.style.left=`${Math.max(8,l)}px`,o.classList.remove("dropdown-positioning");const d=v=>{const y=v.key;if(y==="Escape"){yt(),document.removeEventListener("keydown",d);return}const b=parseInt(y);if(isNaN(b))return;let E=!1;if(t==="status"&&b>=1&&b<=6)Yt(n,"status",ur[b-1]),E=!0;else if(t==="priority"&&b>=0&&b<=4)Yt(n,"priority",Pi[b]),E=!0;else if(t==="estimate"){const x=oe(),j=tn(x==null?void 0:x.project_id);b>=0&&b<j.length&&(Yt(n,"estimate",j[b].value),E=!0)}E&&(document.removeEventListener("keydown",d),_n(null))};_n(d),document.addEventListener("keydown",d),xn(o)}function _u(e,t,n,s){Ki(e,t,n,s)}function xu(e,t,n){pr=pr.then(()=>fr(e,t,n))}async function fr(e,t,n){const s=$e(),i=wt(),a=oe(),o=s.find(d=>d.id===e)||i.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),c=r.indexOf(t);let l;if(c>=0?l=r.filter(d=>d!==t):l=[...r,t],n){const d=c<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const p=(await h.updateIssue(e,{label_ids:l})).labels||[],f=s.findIndex(E=>E.id===e);f!==-1&&(s[f].labels=p,Xe([...s]));const v=i.findIndex(E=>E.id===e);v!==-1&&(i[v].labels=p,Kt([...i])),(a==null?void 0:a.id)===e&&vs({...a,labels:p});const y=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(y&&y.parentNode){const E=s.find(x=>x.id===e)||i.find(x=>x.id===e);E&&(y.outerHTML=Ue(E))}const b=document.querySelector(".property-labels-btn");b&&(b.innerHTML=p.length>0?p.map(E=>`
                    <span class="issue-label" style="background: ${z(E.color)}20; color: ${z(E.color)}">${m(E.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(_("update labels",d),n){const p=c>=0;n.classList.toggle("selected",p),n.querySelector(".label-check").textContent=p?"✓":""}}}function hr(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${u(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${u(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const a=s.has(i.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${u(t)}" data-label-id="${u(i.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${z(i.color)}20; color: ${z(i.color)}">${m(i.name)}</span>
                </button>
            `}).join("")}
    `}async function vr(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=L();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await h.createLabel(s.id,{name:i}),o=await h.getLabels(s.id);hs(o),a!=null&&a.id&&await fr(e,a.id,null);const r=$e(),c=wt(),l=oe(),d=r.find(f=>f.id===e)||c.find(f=>f.id===e)||l,p=new Set(((d==null?void 0:d.labels)||[]).map(f=>f.id));t&&hr(t,e,o,p),n.value=""}catch(a){_("create label",a)}finally{n.disabled=!1,n.focus()}}}function Ls(){const e=document.getElementById("create-issue-labels-label");e&&(Qe.length===0?e.textContent="Labels":e.textContent=`Labels (${Qe.length})`)}function Yi(e){const t=No();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=Qe.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${u(n.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${z(n.color)}20; color: ${z(n.color)}">${m(n.name)}</span>
                </button>
            `}).join("")}
    `}function Iu(e){const t=Qe.indexOf(e);t>=0?Qe.splice(t,1):Qe.push(e),Ls();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Yi(n)}async function br(){const e=L();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await h.createLabel(e.id,{name:s}),a=await h.getLabels(e.id);hs(a),i!=null&&i.id&&!Qe.includes(i.id)&&Qe.push(i.id),Ls(),t&&Yi(t),n.value=""}catch(i){_("create label",i)}finally{n.disabled=!1,n.focus()}}}async function Yt(e,t,n){yt();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const i={};i[t]=n;const a=await h.updateIssue(e,i);if(!a||!a.id)throw new Error("Invalid response from server");const o=$e(),r=o.findIndex(p=>p.id===e);r!==-1&&(o[r]=a,Xe([...o]));const c=wt(),l=c.findIndex(p=>p.id===e);l!==-1&&(c[l]=a,Kt([...c]));const d=oe();if((d==null?void 0:d.id)===e&&vs(a),s&&s.parentNode){const p=o.find(f=>f.id===e)||c.find(f=>f.id===e)||a;if(p){s.outerHTML=Ue(p);const f=document.querySelector(`.issue-row[data-issue-id="${e}"]`);f&&(f.classList.add("updated"),setTimeout(()=>f.classList.remove("updated"),500))}}if($("Issue updated","success"),t==="status"){const p=F();if(p)try{const v=(await h.getSprints(p)).find(y=>y.status==="active");Oi(v||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const p=document.getElementById("issue-detail-view");p&&!p.classList.contains("hidden")&&Tu(t,a)}}catch(i){_("update issue",i),s&&s.classList.remove("updating")}}function Tu(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const c of a){const l=c.querySelector(".property-label");if(l&&l.textContent.toLowerCase()===i.toLowerCase()){o=c;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${Ie(t.status)}
            <span>${ke(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${Je(t.priority)}
            <span>${Be(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${rt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?Sn(t.assignee_id):null,l=c?Ct(c):null;r.innerHTML=l?`${Ht(c,"avatar-small")}<span>${m(l)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=Dd(),l=t.sprint_id&&c?c.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${l?m(l.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${Vs(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}J({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,s=t.field;s==="estimate"?Yt(t.issueId,s,n==="null"?null:Number(n)):Yt(t.issueId,s,n)},"toggle-issue-label":(e,t,n)=>{xu(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{vr(t.issueId)},"toggle-create-issue-label":(e,t)=>{Iu(t.labelId)},"create-label-for-create-issue":()=>{br()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),vr(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),br())}});const yr=["task","bug","feature","chore","docs","tech_debt","epic"];function kt(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Zt(e){const t=kt(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function ct(){var s,i;const e=document.getElementById("issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=$e();if(t.length===0){const a=(i=(s=document.getElementById("issue-search"))==null?void 0:s.value)==null?void 0:i.trim(),o=qi()>0,r=a&&a.length>=2;if(o||r){const c=qi(),l=[];r&&l.push(`search "${a}"`),o&&l.push(`${c} active filter${c>1?"s":""}`),e.innerHTML=Z({icon:K.issues,heading:"No matching issues",description:`No issues match your ${l.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=Z({icon:K.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});return}const n=Vo();n==="status"?Su(e,t):n==="priority"?Lu(e,t):n==="type"?Cu(e,t):n==="assignee"?Au(e,t):n==="sprint"?Bu(e,t):e.innerHTML=Zt(t)+t.map(a=>Ue(a)).join("")}function Su(e,t){const n={};Ri.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s=Zt(t);Ri.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ie(i)}</span>
                    <span class="group-title">${ke(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${kt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ue(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Lu(e,t){const n={};zo.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s=Zt(t);zo.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Je(i)}</span>
                    <span class="group-title">${Be(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${kt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ue(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Cu(e,t){const n={};yr.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s=Zt(t);yr.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${i}">${rt(i)}</span></span>
                    <span class="group-title">${rt(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${kt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ue(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Au(e,t){const n={},s="__unassigned__";n[s]=[];const i=ys();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a=Zt(t);n[s].length>0&&(a+=`
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
                    ${n[s].map(o=>Ue(o)).join("")}
                </div>
            </div>
        `),i.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const c=Ct(o)||"Unknown",l=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${u(o.id)}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${u(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ht(o,"avatar-small")}</span>
                    <span class="group-title">${m(c)}${m(l)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${kt(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(d=>Ue(d)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function Bu(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(c=>{c.sprint_id?(s[c.sprint_id]||(s[c.sprint_id]=[],i.push(c.sprint_id)),s[c.sprint_id].push(c)):s[n].push(c)});const a={active:0,planned:1,completed:2},o=Pr();i.sort((c,l)=>{const d=o[c],p=o[l],f=d?a[d.status]??3:3,v=p?a[p.status]??3:3;return f-v});let r=Zt(t);i.forEach(c=>{const l=s[c];if(l.length===0)return;const d=o[c],p=d?d.name:c,f=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",v=c.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${v}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${v}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${m(p)}${f}</span>
                    <span class="group-count">${l.length}</span>
                    <span class="group-points">${kt(l)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${l.map(y=>Ue(y)).join("")}
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
                    ${s[n].map(c=>Ue(c)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function ju(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function wr(e,t){if(!e)return"";if(!t)return m(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return m(e);const s=e.slice(0,n),i=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${m(s)}<mark class="search-match">${m(i)}</mark>${m(a)}`}function Mu(e,t,n=40){if(!e||!t)return null;const s=e.toLowerCase().indexOf(t.toLowerCase());if(s===-1)return null;const i=Math.max(0,s-n),a=Math.min(e.length,s+t.length+n),o=e.slice(i,a),r=wr(o,t);return`${i>0?"…":""}${r}${a<e.length?"…":""}`}function Ue(e){var p,f,v;const t=e.assignee_id?Sn(e.assignee_id):null,n=t?Ct(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?Vs(e.estimate,e.project_id):"",a=va(e.estimate,e.project_id),o=e.sprint_id?Pr()[e.sprint_id]:null,r=o?o.name:null,c=(f=(p=document.getElementById("issue-search"))==null?void 0:p.value)==null?void 0:f.trim(),l=!!c&&((v=e.title)==null?void 0:v.toLowerCase().includes(c.toLowerCase())),d=c&&!l?Mu(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${u(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${u(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${u(e.id)}" title="Priority: ${Be(e.priority)}">
                    ${Je(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${u(e.id)}" title="Status: ${ke(e.status)}">
                    ${Ie(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${rt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${u(e.id)}">${wr(e.title,c)}${d?` <span class="issue-search-snippet" title="Matched in description">— ${d}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(y=>`
                            <span class="issue-label" style="background: ${z(y.color)}20; color: ${z(y.color)}">${m(y.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${u(e.id)}" title="Sprint: ${r?m(r):"None"}">
                    ${r?`<span class="sprint-badge">${m(r)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${u(e.id)}" title="${a?"Estimate outside current scale":`Estimate: ${i||"None"}`}">
                    ${i?`<span class="estimate-badge${a?" out-of-scale":""}">${i}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${u(e.id)}" title="${u(n||"Unassigned")}">
                    ${n?Ht(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function Je(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Ie(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}J({"toggle-group":(e,t)=>{ju(t.group)},"show-inline-dropdown":(e,t,n)=>{Ki(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),G(t.issueId))}});function Du(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function Ru(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";const n=()=>{t.classList.add("hidden"),t.innerHTML=""},s=()=>{const i=e.selectionStart||0,o=e.value.slice(0,i).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!o){n();return}const r=o[2].toLowerCase(),c=Pt().map(l=>({id:l.id,name:l.name||l.email||"User",email:l.email||"",handle:Du(l)})).filter(l=>!r||l.handle.includes(r)||l.name.toLowerCase().includes(r)||l.email.toLowerCase().includes(r)).slice(0,6);if(!c.length){n();return}t.innerHTML=c.map(l=>`
            <button type="button" class="mention-suggestion" data-handle="${u(l.handle)}">
                <span class="mention-name">${m(l.name)}</span>
                <span class="mention-handle">@${m(l.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach(l=>{l.addEventListener("click",()=>{const d=l.dataset.handle,p=e.value.slice(0,i).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),f=e.value.slice(i);e.value=p+f,e.focus(),n()})})};e.addEventListener("input",s),e.addEventListener("click",s),e.addEventListener("keydown",i=>{i.key==="Escape"&&n()}),e.addEventListener("blur",()=>{setTimeout(n,150)})}const kr=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function An(e=null){const t=e||F()||"";gr([]);const n=X().map(o=>`
        <option value="${o.id}" ${o.id===t?"selected":""}>${m(o.name)}</option>
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
                            ${kr.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
                            ${Ie("backlog")}
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
    `,N(),Ls();const s=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description"),a=hd();a.title&&(s.value=a.title),a.description&&(i.value=a.description),s.addEventListener("input",()=>{Ro(s.value,i.value)}),i.addEventListener("input",()=>{Ro(s.value,i.value)}),s.focus()}function Pu(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function Nu(e){const t=kr.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function qu(e,t){const n=X().find(s=>s.id===t);gr([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
                            ${Ie("backlog")}
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
                <button type="button" class="btn btn-primary" data-action="create-sub-issue-submit" data-parent-id="${u(e)}" data-project-id="${u(t)}">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,N(),Ls(),document.getElementById("create-issue-title").focus()}async function Ou(e,t){const n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null;if(!n){$("Please enter a title","error");return}try{const d=await h.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,label_ids:mr(),parent_id:e});R(),$(`Created sub-issue ${d.identifier}`,"success"),G(e)}catch(d){_("create sub-issue",d)}}async function Hu(e,t,n){var o,r;yt();const i=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${i.top-8}px`,a.style.left=`${i.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const c=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Wo.map(l=>`
                <button class="dropdown-option ${l===c?"selected":""}" data-action="set-create-field" data-field="status" data-value="${l}" data-label="${u(ke(l))}">
                    ${Ie(l)}
                    <span>${ke(l)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const c=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${Pi.map(l=>`
                <button class="dropdown-option ${l===c?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${l}" data-label="${u(Be(l))}">
                    ${Je(l)}
                    <span>${Be(l)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const c=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(l=>`
                <button class="dropdown-option ${l===c?"selected":""}" data-action="set-create-field" data-field="type" data-value="${l}" data-label="${u(rt(l))}">
                    <span class="issue-type-badge type-${l}">${rt(l)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!L())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let c=No();if(c.length===0)try{c=await h.getLabels(L().id),hs(c)}catch(l){console.error("Failed to load labels:",l)}Yi(a),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),xn(a,{multiSelect:!0});return}else if(e==="assignee"){const c=document.getElementById("create-issue-assignee").value,l=ys();a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${c?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${l.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:l.map(({assignee:d,indent:p})=>{const f=Ct(d)||"User";return`
                <button class="dropdown-option ${d.id===c?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${u(d.id)}" data-label="${u(f)}">
                    ${Ht(d,"avatar-small")}
                    <span>${Ni(d,p)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const c=document.getElementById("create-issue-estimate").value,l=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=tn(l);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${d.map(p=>{const f=p.value===null?"":String(p.value);return`
                <button class="dropdown-option ${f===c?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${u(f)}" data-label="${u(p.value?p.label:"Estimate")}">
                    <span>${m(p.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const c=document.getElementById("create-issue-sprint").value,l=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!l)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const p=(await h.getSprints(l)).filter(f=>f.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${c?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${p.map(f=>`
                        <button class="dropdown-option ${f.id===c?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${u(f.id)}" data-label="${u(f.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${m(f.name)}${f.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),xn(a)}function Fu(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Uu(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n;const s=m(n);if(e==="status"){const i=document.querySelector(".toolbar-btn:first-child");i.innerHTML=`${Ie(t)}<span id="create-issue-status-label">${s}</span>`}else if(e==="priority"){const i=document.querySelectorAll(".toolbar-btn")[1];i.innerHTML=`${Je(t)}<span id="create-issue-priority-label">${s}</span>`}else if(e==="type"){const i=document.getElementById("create-issue-type-btn");i&&(i.innerHTML=`<span class="issue-type-badge type-${t}">${rt(t)}</span><span id="create-issue-type-label">${s}</span>`)}yt()}async function $r({keepOpen:e=!1}={}){var b,E;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,l=c?parseInt(c):null,d=((b=document.getElementById("create-issue-sprint"))==null?void 0:b.value)||null,p=(E=document.getElementById("create-issue-due-date"))==null?void 0:E.value,f=p?new Date(`${p}T00:00:00Z`).toISOString():null;if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}const v=document.getElementById("btn-create-issue"),y=document.getElementById("btn-create-and-new");v&&(v.disabled=!0),y&&(y.disabled=!0);try{const x=await h.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:l,sprint_id:d,label_ids:mr(),due_date:f});$(`Created ${x.identifier}`,"success"),vd(),A()==="issues"?Bt():A()==="my-issues"&&Ss(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(R(),G(x.id))}catch(x){_("create issue",x)}finally{v&&(v.disabled=!1),y&&(y.disabled=!1)}}async function Gu(){await $r({keepOpen:!1})}async function zu(){await $r({keepOpen:!0})}J({"toggle-create-dropdown":(e,t,n)=>{Hu(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Uu(t.field,t.value,t.label)},"create-issue-submit":()=>{Gu()},"create-issue-and-new":()=>{zu()},"update-create-project":()=>{Fu()},"apply-template":e=>{Nu(e.target.value)},"toggle-create-options":()=>{Pu()},"create-sub-issue-submit":(e,t)=>{Ou(t.parentId,t.projectId)}});async function Er(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),i=tn(t.project_id).map(a=>`
            <option value="${a.value===null?"":a.value}" ${t.estimate===a.value?"selected":""}>${m(a.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form data-action="update-issue" data-issue-id="${u(e)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${u(t.title)}" required>
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
        `,N()}catch(t){_("load issue",t)}}async function Wu(e,t){try{const n=document.getElementById("edit-issue-title"),s=document.getElementById("edit-issue-description"),i=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),c=document.getElementById("edit-issue-sprint");if(!n||!i||!a||!o)throw new Error("Required form fields not found");const l={title:n.value,description:s?s.value:"",status:i.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:c&&c.value?c.value:null};await h.updateIssue(t,l),R(),await G(t),$("Issue updated!","success")}catch(n){_("update issue",n)}}async function Vu(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await Bt(),await ze(),M("issues"),$("Issue deleted!","success")}catch(t){_("delete issue",t)}}J({"update-issue":(e,t)=>{Wu(e,t.issueId)}});let re=null,_r=!1,Xt=!1;function Ku(){return re||(re=document.createElement("div"),re.className="quote-tooltip",re.setAttribute("role","button"),re.setAttribute("tabindex","0"),re.setAttribute("aria-label","Quote selection in comment"),re.textContent="Quote",re.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),Xi())}),re.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),re.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Xi()}),document.body.appendChild(re),re)}function xr(e,t){const n=Ku();n.style.display="flex",Xt=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!Xt)return;const s=n.getBoundingClientRect();s.left<4&&(n.style.left=`${4+s.width/2}px`),s.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-s.width/2}px`),s.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Bn(){re&&(re.style.display="none"),Xt=!1}function Ir(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content"))||null}function Zi(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=Ir(t.startContainer),s=Ir(t.endContainer);return!n||!s||n!==s?null:e.toString().trim()||null}function Yu(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function Xi(){const e=Zi();if(!e)return!1;const t=document.getElementById("new-comment");if(!t)return!1;const n=Yu(e),s=t.value,i=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";t.value=s+i+n+`

`;const a=oe();return a&&ps(a.id,t.value),t.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Bn(),t.focus(),t.setSelectionRange(t.value.length,t.value.length),t.scrollIntoView&&t.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function Zu(){var s;if(!Zi())return!1;const t=window.getSelection().getRangeAt(0),n=((s=t.getBoundingClientRect)==null?void 0:s.call(t))??{left:0,width:0,top:0};return xr(n.left+n.width/2,n.top),!0}function Xu(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!Zi()){Bn();return}xr(t,n)},10)}function Qu({signal:e}={}){const t=document.getElementById("issue-detail-content");t&&(t.addEventListener("mouseup",Xu,e?{signal:e}:void 0),_r||(_r=!0,document.addEventListener("mousedown",n=>{Xt&&re&&!re.contains(n.target)&&Bn()}),document.addEventListener("selectionchange",()=>{Xt&&setTimeout(()=>{const n=window.getSelection();(!n||n.isCollapsed)&&Bn()},50)}),document.addEventListener("keydown",n=>{n.key==="Escape"&&Xt&&Bn()}),document.addEventListener("keyup",n=>{n.key!=="Escape"&&Zu()})))}let Qi=!1,$t=!0,jn=null,Ji=null,ea=null,Cs=null;function ta(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function na(e){return e.user_name||e.user_email||"Unknown"}function sa(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<a href="#comments-section" class="activity-comment-link" title="${i}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${m(ke(t(e.old_value)))}</strong> to <strong>${m(ke(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${m(Be(t(e.old_value)))}</strong> to <strong>${m(Be(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${m(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${m(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const s=m(e.field_name||"ritual"),i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<span class="activity-attestation-link" title="${i}">Attested to <strong>${s}</strong></span>`:`Attested to <strong>${s}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue"}}function Tr(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function Ju(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,c=!1;const l=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=l.exec(t))!==null;)if(c=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const p=d[1],f=document.createElement("a");f.href=`#/issue/${p}`,f.className="issue-link",f.textContent=p,o.appendChild(f),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const p=document.createElement("span");p.className="mention",p.textContent="@"+d[3],o.appendChild(p),r=d.index+d[0].length}c&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function ep(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let o;for(;(o=n.exec(t))!==null;){a=!0,o.index>i&&s.appendChild(document.createTextNode(t.slice(i,o.index)));const r=o[1],c=document.createElement("a");c.href=`#/issue/${r}`,c.className="issue-link",c.textContent=r,s.appendChild(c),i=o.index+o[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function tp(e){if(!e)return"";const t=De(e),n=document.createElement("div");return n.innerHTML=t,Tr(n,Ju),n.innerHTML}function As(e){if(!e)return"";const t=De(e),n=document.createElement("div");return n.innerHTML=t,Tr(n,ep),n.innerHTML}function np(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),s=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),s&&s.classList.toggle("rotated")}function sp(){$t=!$t;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",$t),n&&n.classList.toggle("rotated",$t)}async function Bs(e){try{jn=await h.getTicketRitualsStatus(e),Sr(e)}catch(t){console.error("Failed to load ticket rituals:",t),jn=null}}function Sr(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!jn){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=jn;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&($t=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",$t);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",$t);const r=n.some(d=>d.trigger==="ticket_close"),c=n.some(d=>d.trigger==="ticket_claim");let l="⚠️ Complete these rituals:";r&&c?l="⚠️ Pending rituals (claim before starting, close before completing):":c?l="⚠️ Complete these rituals before claiming this ticket:":r&&(l="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${l}</p>
                ${n.map(d=>`
                    <div class="ticket-ritual-item pending${d.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${d.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${m(d.name)}</span>
                            <span class="badge badge-trigger-${d.trigger||"ticket_close"}">${d.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${d.approval_mode||"auto"}">${d.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${d.prompt?De(d.prompt):""}</div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ze(d.attestation.attested_at)}</span>
                                ${d.attestation.note?`<div class="attestation-note markdown-body">${De(d.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${gm(d,e)}
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
                            <span class="ticket-ritual-name">${m(d.name)}</span>
                        </div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ze(d.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function js(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await G(t.id,!1),!0):(M("my-issues",!1),!1)}catch{return M("my-issues",!1),!1}}async function G(e,t=!0){try{$t=!0;const[n,s,i,a,o,r]=await Promise.all([h.getIssue(e),h.getComments(e),h.getActivities(e),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),l=[...r.pending_rituals||[],...r.completed_rituals||[]].filter(w=>w.attestation&&w.attestation.note).map(w=>({id:`attestation-${w.attestation.id}`,author_name:w.attestation.attested_by_name||"Unknown",content:w.attestation.note,created_at:w.attestation.attested_at,is_attestation:!0,ritual_name:w.name,is_pending:!w.attestation.approved_at}));jn=r;const d=[...s,...l].sort((w,Ne)=>new Date(w.created_at)-new Date(Ne.created_at)),p=[n.parent_id?h.getIssue(n.parent_id):Promise.resolve(null),h.getSprints(n.project_id).catch(w=>(console.error("Failed to load sprints:",w),[]))],[f,v]=await Promise.all(p),y=o.filter(w=>w.relation_type==="blocks"&&w.direction==="outgoing"),b=o.filter(w=>w.relation_type==="blocked_by"||w.relation_type==="blocks"&&w.direction==="incoming"),E=o.filter(w=>w.relation_type==="relates_to");t&&history.pushState({issueId:e,view:A()},"",`/issue/${n.identifier}`),vs(n),Uo(v),document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const x=document.getElementById("issue-detail-view");x.classList.remove("hidden");const j=A()||"my-issues",T=X().find(w=>w.id===n.project_id),C=n.assignee_id?Sn(n.assignee_id):null,B=C?Ct(C):null,Y=n.sprint_id?v.find(w=>w.id===n.sprint_id):null,H=$e(),ne=H.findIndex(w=>w.id===n.id),ce=ne>0?H[ne-1]:null,ee=ne>=0&&ne<H.length-1?H[ne+1]:null,q=ne>=0;x.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${u(j)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${q?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${ce?`data-action="navigate-issue" data-issue-id="${u(ce.id)}" data-identifier="${u(ce.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${ne+1} / ${H.length}</span>
                            <button class="issue-nav-btn" ${ee?`data-action="navigate-issue" data-issue-id="${u(ee.id)}" data-identifier="${u(ee.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${T?m(T.name):"Project"} › ${m(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(n.title)}</h1>

                    ${f?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(f.identifier)}" data-action="navigate-issue" data-issue-id="${u(f.id)}" data-identifier="${u(f.identifier)}">${f.identifier}: ${m(f.title)}</a>
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
                            ${n.description?As(n.description):'<span class="add-description-link">Add description...</span>'}
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
                            ${a.length===0?Z({icon:K.issues,heading:"No sub-issues",description:"Break this issue down by creating sub-issues"}):a.map(w=>`
                                <a href="/issue/${encodeURIComponent(w.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${u(w.id)}" data-identifier="${u(w.identifier)}">
                                    <span class="sub-issue-status">${Ie(w.status)}</span>
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
                            <button class="btn btn-secondary btn-sm" data-action="show-add-relation-modal" data-issue-id="${u(n.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${y.length===0&&b.length===0&&E.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${b.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${b.map(w=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Ie(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(w.related_issue_id)}" data-identifier="${u(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${m(w.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(w.id)}" title="Remove relation">
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
                                            <span class="relation-status">${Ie(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(w.related_issue_id)}" data-identifier="${u(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${m(w.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(w.id)}" title="Remove relation">
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
                                            <span class="relation-status">${Ie(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${u(w.related_issue_id)}" data-identifier="${u(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${m(w.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${u(n.id)}" data-relation-id="${u(w.id)}" title="Remove relation">
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
                            <h3>Comments${d.length>0?` <span class="section-count">(${d.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle comments">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="comments-list section-collapsible-content">
                            ${d.length===0?`
                                <div class="comments-empty">No comments yet</div>
                            `:d.map(w=>`
                                <div class="comment ${w.is_attestation?"comment-attestation":""} ${w.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${w.is_attestation?"avatar-attestation":""}">${w.is_attestation?w.is_pending?"⏳":"✓":(w.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m(w.author_name||"User")}</span>
                                            ${w.is_attestation?`<span class="comment-ritual-badge">${w.is_pending?"Pending approval — ":""}Ritual: ${m(w.ritual_name)}</span>`:""}
                                            <span class="comment-date">${Ze(w.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${tp(w.content)}</div>
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
                            ${i.length===0?Z({icon:K.activity,heading:"No activity yet",description:"Activity will appear here as the issue is updated"}):i.map(w=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${ta(w.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${sa(w)}</span>
                                        <span class="activity-actor">by ${m(na(w))}</span>
                                        <span class="activity-time">${Ze(w.created_at)}</span>
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
                                ${Ie(n.status)}
                                <span>${ke(n.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${u(n.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${Je(n.priority)}
                                <span>${Be(n.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${u(n.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${n.issue_type||"task"}">${rt(n.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${u(n.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${B?`${Ht(C,"avatar-small")}<span>${m(B)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${u(n.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${Y?m(Y.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${u(n.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${n.labels&&n.labels.length>0?n.labels.map(w=>`
                                        <span class="issue-label" style="background: ${z(w.color)}20; color: ${z(w.color)}">${m(w.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${T?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(T.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${u(n.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${va(n.estimate,n.project_id)?" out-of-scale":""}" ${va(n.estimate,n.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${Vs(n.estimate,n.project_id)}</span>
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
        `,Cs&&Cs.abort(),Cs=new AbortController;const{signal:Se}=Cs,ge=document.querySelector(".sidebar-overflow-trigger"),Re=document.querySelector(".overflow-menu-dropdown");if(ge&&Re){const w=()=>{Re.classList.add("hidden"),ge.setAttribute("aria-expanded","false")},Ne=()=>{const Ce=Re.classList.toggle("hidden");ge.setAttribute("aria-expanded",String(!Ce))};ge.addEventListener("click",Ne,{signal:Se}),document.addEventListener("click",Ce=>{!ge.contains(Ce.target)&&!Re.contains(Ce.target)&&w()},{signal:Se}),Re.addEventListener("keydown",Ce=>{Ce.key==="Escape"&&(w(),ge.focus())},{signal:Se})}Sr(n.id),Ru(),Qu({signal:Se});const Pe=document.getElementById("new-comment");if(Pe){const w=gd(n.id);w&&(Pe.value=w),Pe.addEventListener("input",()=>{ps(n.id,Pe.value)}),Pe.addEventListener("keydown",Ne=>{var Ce;Ne.key==="Enter"&&(Ne.metaKey||Ne.ctrlKey)&&(Ne.preventDefault(),(Ce=Pe.closest("form"))==null||Ce.requestSubmit())})}Ji=ce?ce.id:null,ea=ee?ee.id:null;const za=w=>{if((w.metaKey||w.ctrlKey)&&w.shiftKey&&(w.key===">"||w.key==="."||w.code==="Period")&&Xi()){w.preventDefault();return}if(w.metaKey||w.ctrlKey||w.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||w.target.tagName==="INPUT"||w.target.tagName==="TEXTAREA"||w.target.tagName==="SELECT"||w.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor"))return;if(w.key==="ArrowLeft"&&Ji)w.preventDefault(),G(Ji);else if(w.key==="ArrowRight"&&ea)w.preventDefault(),G(ea);else if(w.key==="c"){w.preventDefault(),w.stopImmediatePropagation();const ft=document.getElementById("new-comment");ft&&(ft.focus(),ft.scrollIntoView({behavior:"smooth",block:"nearest"}))}else w.key==="j"?(w.preventDefault(),w.stopImmediatePropagation(),Ms(1)):w.key==="k"&&(w.preventDefault(),w.stopImmediatePropagation(),Ms(-1));const Ce={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[w.key];if(Ce){const ft=document.querySelector(`.property-row[data-field="${Ce}"]`);ft&&(w.preventDefault(),ft.click())}};document.addEventListener("keydown",za,{signal:Se})}catch(n){_("load issue",n)}}async function ip(e,t){if(e.preventDefault(),Qi)return!1;const n=document.getElementById("new-comment").value;ps(t,null),Qi=!0;try{await h.createComment(t,n),await G(t),$("Comment added!","success")}catch(s){ps(t,n),_("add comment",s)}finally{Qi=!1}return!1}async function ap(e){const t=oe()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const s=n.querySelector(".section-header");s&&(s.style.display="none");const i=n.querySelector(".description-content");if(!i)return;i.innerHTML=`
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
    `,i.classList.remove("empty"),i.removeAttribute("onclick");const a=document.getElementById("edit-description"),o=fd(e);o&&(a.value=o),a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?ms(e,r):ms(e,null);const c=document.getElementById("edit-description-preview");c&&c.style.display!=="none"&&Lr()}),a.addEventListener("keydown",r=>{var c,l;r.key==="Enter"&&(r.metaKey||r.ctrlKey)&&(r.preventDefault(),(c=document.getElementById("save-description-edit"))==null||c.click()),r.key==="Escape"&&(r.preventDefault(),(l=document.getElementById("cancel-description-edit"))==null||l.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{ms(e,null),s&&(s.style.display=""),i.className=`description-content markdown-body ${t.description?"":"empty"}`,t.description||(i.setAttribute("data-action","edit-description"),i.setAttribute("data-issue-id",t.id)),i.innerHTML=t.description?As(t.description):'<span class="add-description-link">Add description...</span>'}),document.getElementById("save-description-edit").addEventListener("click",async()=>{var c;const r=(c=document.getElementById("edit-description"))==null?void 0:c.value;if(r!==void 0)try{await h.updateIssue(e,{description:r}),ms(e,null),$("Description updated","success"),G(e,!1)}catch(l){_("update description",l)}})}function Lr(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?As(n):'<span class="text-muted">Nothing to preview.</span>'}function op(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?Lr():s.focus()}function rp(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,N(),document.getElementById("relation-issue-search").focus()}async function lp(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=L())==null?void 0:s.id,o=(await h.searchIssues(i,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${u(r.id)}" data-identifier="${u(r.identifier)}" data-title="${u(r.title)}">
                <span class="link-result-id">${m(r.identifier)}</span>
                <span class="link-result-title">${m(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function cp(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function dp(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function up(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return $("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(s,t,"blocks"):await h.createRelation(t,s,n),R(),$("Relation added","success"),G(t)}catch(i){_("add relation",i)}return!1}async function pp(e,t){try{await h.deleteRelation(e,t),$("Relation removed","success"),G(e)}catch(n){_("remove relation",n)}}function Ms(e){const t=oe();if(!t)return;const n=$e();if(!n||n.length===0)return;const s=n.findIndex(a=>a.id===t.id);if(s===-1)return;const i=s+e;i<0||i>=n.length||G(n[i].id)}J({"show-detail-dropdown":(e,t,n)=>{_u(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{ap(t.issueId)},"toggle-section":(e,t)=>{np(t.section)},"toggle-ticket-rituals":()=>{sp()},"save-comment":(e,t)=>{ip(e,t.issueId)},"show-add-relation-modal":(e,t)=>{rp(t.issueId)},"remove-relation":(e,t)=>{pp(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{qu(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{up(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{lp(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{cp(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{dp()},"set-description-editor-mode":(e,t)=>{op(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>Ms(-1),"navigate-next-issue":()=>Ms(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Er(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Vu(t.issueId)}});function Cr(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let Ds=[],Mn=[],Ar=null,W=new Set,Qt="list",Mt=!1,ia=null,Rs=null;const aa=bd();(aa==="list"||aa==="grid")&&(Qt=aa);function Br(e){if(e!=="list"&&e!=="grid")return;Qt=e,e==="grid"&&Mt&&oa(),yd(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),Et()}function jr(){if(Qt!=="list")return;Mt=!0,W.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Et(),Jt()}function oa(){Mt=!1,W.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Et(),Jt()}function mp(){ia&&clearTimeout(ia),ia=setTimeout(()=>{Et()},300)}function gp(){const e=document.getElementById("doc-search");e&&(e.value=""),Et()}async function fp(){Fe(null)}async function hp(){const e=document.getElementById("doc-search");e&&(e.value=""),Fe(null)}function vp(){var i;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=F()||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${m(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=X().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";s.push(`<span class="filter-chip">Project: ${m(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(s.length>0){let a=s.join(" ");s.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function bp(){return Ds}function Et(){var n,s,i;const e=((s=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:s.toLowerCase())||"",t=((i=document.getElementById("doc-sort"))==null?void 0:i.value)||"updated_desc";vp(),Mn=Ds.filter(a=>{var o,r;if(e){const c=(o=a.title)==null?void 0:o.toLowerCase().includes(e),l=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!c&&!l)return!1}return!0}),Mn.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),Ep("",Qt)}async function yp(){var n;const e=Ar||((n=L())==null?void 0:n.id);if(!e)return;const t=F()||null;try{Ds=await h.getDocuments(e,t),Et()}catch(s){_("load documents",s)}}lt(e=>{e==="currentProject"&&A()==="documents"&&yp()});async function Dn(e,t=null){var s;if(e||(e=(s=L())==null?void 0:s.id),!e)return;Ar=e,Ho(-1);const n=document.getElementById("documents-list");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null&&(t=F()||null);try{Ds=await h.getDocuments(e,t);const i=document.getElementById("doc-view-list"),a=document.getElementById("doc-view-grid");i&&a&&(i.classList.toggle("active",Qt==="list"),a.classList.toggle("active",Qt==="grid")),Et()}catch(i){const a=document.getElementById("documents-list");a&&(a.innerHTML=""),_("load documents",i)}}function wp(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${z(t.color)}20; color: ${z(t.color)}">${m(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function kp(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${wp(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${u(e.id)}" data-action="view-document" data-document-id="${u(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${m(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${m(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?m(Cr(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${m(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function $p(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${z(r.color)}20; color: ${z(r.color)}">${m(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?Cr(e.content).substring(0,80):"No content",i=Mt?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${u(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${W.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${Mt&&W.has(e.id)?" selected":""}" data-action="${Mt?"toggle-doc-selection":"view-document"}" data-document-id="${u(e.id)}" data-doc-id="${u(e.id)}">
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
  `}function Ep(e="",t="list"){var l;const n=document.getElementById("documents-list");if(!n)return;W.clear(),Jt();const s=Mn;if(s.length===0){const d=(l=document.getElementById("doc-search"))==null?void 0:l.value,p=F(),f=d||p;n.innerHTML=Z({icon:f?K.search:K.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const i=t==="grid"?kp:$p,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=X();s.forEach(d=>{let p,f;if(e==="project")if(p=d.project_id||"__global__",p==="__global__")f="Global (Team-wide)";else{const v=r.find(y=>y.id===d.project_id);f=v?v.name:"Unknown Project"}else e==="sprint"&&(p=d.sprint_id||"__no_sprint__",f=d.sprint_id?"Sprint":"No Sprint");o[p]||(o[p]={label:f,docs:[]}),o[p].docs.push(d)});let c="";for(const[d,p]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";c+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${m(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${f}">
          ${p.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=c}function _p(e){W.has(e)?W.delete(e):W.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=W.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",W.has(e)),Jt()}function xp(){Mn.forEach(e=>W.add(e.id)),Mn.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),Jt()}function Mr(){W.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),W.clear(),Jt()}function Jt(){const e=document.getElementById("doc-bulk-actions");e&&(Mt?(e.classList.remove("hidden"),W.size>0?e.innerHTML=`
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
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function Ip(){if(W.size===0){$("No documents selected","error");return}const t=X().map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${W.size} Document${W.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
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
  `,N()}async function Tp(e){var o;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(W);let s=0,i=0;for(const r of n)try{await h.updateDocument(r,{project_id:t}),s++}catch(c){console.error(`Failed to move document ${r}:`,c),i++}R(),Mr(),i===0?$(`Moved ${s} document${s>1?"s":""}!`,"success"):$(`Moved ${s}, failed ${i}`,"warning");const a=(o=L())==null?void 0:o.id;return await Dn(a),!1}async function Sp(){var a;if(W.size===0){$("No documents selected","error");return}const e=W.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(W);let n=0,s=0;for(const o of t)try{await h.deleteDocument(o),n++}catch(r){console.error(`Failed to delete document ${o}:`,r),s++}oa(),s===0?$(`Deleted ${n} document${n>1?"s":""}!`,"success"):$(`Deleted ${n}, failed ${s}`,"warning");const i=(a=L())==null?void 0:a.id;await Dn(i)}async function Ge(e,t=!0){try{const n=await h.getDocument(e);t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(T=>T.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");let i="";try{const T=await h.getDocumentComments(n.id);i=`
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${T.length===0?'<div class="comments-empty">No comments yet</div>':T.map(B=>{var Y,H;return`
            <div class="comment" data-comment-id="${u(B.id)}">
              <div class="comment-avatar">${((H=(Y=B.author_name)==null?void 0:Y.charAt(0))==null?void 0:H.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${m(B.author_name||"Unknown")}</span>
                  <span class="comment-date">${Ze(B.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${De(B.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form comment-form-sticky" data-action="add-document-comment" data-document-id="${u(n.id)}">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="1"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(T){console.error("Failed to load comments:",T)}let a=null,o=null;if(n.project_id){const C=X().find(B=>B.id===n.project_id);if(a=C?C.name:null,n.sprint_id)try{const B=await h.getSprint(n.sprint_id);o=B?B.name:null}catch{}}let r=n.content||"";const c=P.lexer(r);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(r=r.slice(c[0].raw.length).trimStart());const l=bp(),d=l.findIndex(T=>T.id===n.id),p=d>0?l[d-1]:null,f=d>=0&&d<l.length-1?l[d+1]:null,v=d>=0,y=n.labels&&n.labels.length>0?n.labels.map(T=>`
          <span class="issue-label" style="background: ${z(T.color)}20; color: ${z(T.color)}">
            ${m(T.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${u(n.id)}" data-label-id="${u(T.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let b='<span class="text-muted">None</span>';try{const T=await h.getDocumentIssues(n.id);T.length>0&&(b=T.map(C=>`
          <div class="linked-item">
            <span class="linked-item-id">${m(C.identifier)}</span>
            <span class="linked-item-title">${m(C.title)}</span>
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
            ${v?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${p?`data-action="view-document" data-document-id="${u(p.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${d+1} / ${l.length}</span>
              <button class="issue-nav-btn" ${f?`data-action="view-document" data-document-id="${u(f.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?m(a)+" ›":""} ${m(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?m(n.icon)+" ":""}${m(n.title)}</h1>

          <div class="document-content markdown-body">${r?De(r):'<p class="text-muted">No content</p>'}</div>

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
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${u(n.id)}" title="Add label">+</button>
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
              ${b}
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
    `,Rs&&Rs.abort(),Rs=new AbortController;const{signal:E}=Rs,x=s.querySelector(".sidebar-overflow-trigger"),j=s.querySelector(".overflow-menu-dropdown");if(x&&j){const T=()=>{j.classList.add("hidden"),x.setAttribute("aria-expanded","false")},C=()=>{const B=j.classList.toggle("hidden");x.setAttribute("aria-expanded",String(!B))};x.addEventListener("click",C,{signal:E}),document.addEventListener("click",B=>{!x.contains(B.target)&&!j.contains(B.target)&&T()},{signal:E}),j.addEventListener("keydown",B=>{B.key==="Escape"&&(T(),x.focus())},{signal:E})}}catch(n){_("load document",n)}}async function Ps(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await h.getSprints(t);let o=n;if(s&&!n){const c=a.find(l=>l.status==="active");c&&(o=c.id)}const r=a.map(c=>`<option value="${c.id}" ${c.id===o?"selected":""}>${m(c.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function Dr(){Rn=null;const e=X(),t=Qr()||"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${m(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
  `,N(),t&&await Ps("doc-sprint",t,null,!0)}let Rn=null;async function Lp(e,t,n){Rn=n||null;const i=X().map(a=>`<option value="${u(a.id)}" ${a.id===t?"selected":""}>${m(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
  `,N(),t&&await Ps("doc-sprint",t,e)}async function Cp(e){var a;e.preventDefault();const t=(a=L())==null?void 0:a.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{if(await h.createDocument(t,i),await Dn(t),R(),$("Document created!","success"),Rn){const o=Rn;Rn=null,o()}}catch(o){_("create document",o)}return!1}async function Rr(e){try{const t=await h.getDocument(e),s=X().map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${m(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
          <textarea id="edit-doc-content" style="min-height: 200px">${m(t.content||"")}</textarea>
        </div>
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${u(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,N(),t.project_id&&await Ps("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){_("load document",t)}}async function Ap(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await h.updateDocument(t,i),R(),await Ge(t),$("Document updated!","success")}catch(a){_("update document",a)}return!1}async function Bp(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=L())==null?void 0:t.id;await Dn(n),M("documents"),$("Document deleted!","success")}catch(n){_("delete document",n)}}function jp(e,t){Ps(e,t)}async function Mp(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${u(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,N()}async function Dp(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=L())==null?void 0:s.id,a=await h.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${u(t)}" data-issue-id="${u(o.id)}">
        <span class="link-result-id">${m(o.identifier)}</span>
        <span class="link-result-title">${m(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function Rp(e,t){try{await h.linkDocumentToIssue(e,t),R(),$("Issue linked!","success"),await Ge(e,!1)}catch(n){_("link issue",n)}}async function Pp(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),$("Issue unlinked!","success"),await Ge(e,!1)}catch(n){_("unlink issue",n)}}let ra=!1;async function Np(e,t){if(e.preventDefault(),ra)return!1;const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return $("Please enter a comment","error"),!1;ra=!0;try{await h.createDocumentComment(t,s),n.value="",$("Comment added!","success"),await Ge(t,!1)}catch(i){_("add comment",i)}finally{ra=!1}return!1}async function qp(e){var n;const t=(n=L())==null?void 0:n.id;if(!t){$("No team selected","error");return}try{const s=await h.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,N();return}const i=s.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${u(e)}" data-label-id="${u(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${z(a.color)}; color: white;">${m(a.name)}</span>
        ${a.description?`<span class="text-muted">${m(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,N()}catch(s){_("load labels",s)}}async function Op(e,t){try{await h.addLabelToDocument(e,t),R(),$("Label added!","success"),await Ge(e,!1)}catch(n){_("add label",n)}}async function Hp(e,t){try{await h.removeLabelFromDocument(e,t),$("Label removed!","success"),await Ge(e,!1)}catch(n){_("remove label",n)}}J({"view-document":(e,t)=>{e.preventDefault(),Ge(t.documentId)},"toggle-doc-selection":(e,t)=>{_p(t.docId)},"clear-doc-search":()=>{gp()},"clear-doc-project-filter":()=>{fp()},"clear-all-doc-filters":()=>{hp()},"show-bulk-move-modal":()=>{Ip()},"bulk-delete-documents":()=>{Sp()},"select-all-docs":()=>{xp()},"clear-doc-selection":()=>{Mr()},"exit-selection-mode":()=>{oa()},"enter-selection-mode":()=>{jr()},"handle-bulk-move":e=>{Tp(e)},"unlink-document-issue":(e,t)=>{Pp(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{Mp(t.documentId)},"add-document-comment":(e,t)=>{Np(e,t.documentId)},"remove-label-from-doc":(e,t)=>{Hp(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{qp(t.documentId)},"show-edit-document-modal":(e,t)=>{Rr(t.documentId)},"delete-document":(e,t)=>{Bp(t.documentId)},"create-document":e=>{Cp(e)},"update-doc-sprint-dropdown":(e,t,n)=>{jp(t.sprintSelect,n.value)},"update-document":(e,t)=>{Ap(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{Dp(n.value,t.documentId)},"link-to-issue":(e,t)=>{Rp(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{Op(t.documentId,t.labelId)}});let en=[],Ns={},qs=new Set,dt=null,la=null,ca=[],Pn=[],da=[];function Pr(){return Ns}function Fp(){return la}function Up(){return dt}lt(e=>{e==="currentProject"&&A()==="sprints"&&Nn()});async function Nn(){const e=F();if(!e){const n=document.getElementById("sprints-list");n&&(n.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}am();const t=document.getElementById("sprints-list");t&&(t.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{await h.getCurrentSprint(e),en=await h.getSprints(e),Gp(),await Os()}catch(n){t&&(t.innerHTML=Z({icon:K.sprints,heading:"Failed to load sprints",description:"Check your connection and try again"})),_("load sprints",n)}}function Gp(){const e=document.getElementById("sprints-list");if(!e)return;const t=en.find(a=>a.status==="active"),n=en.find(a=>a.status==="planned"),s=en.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 data-action="view-sprint" data-sprint-id="${u(t.id)}" data-sprint-url="/sprint/${u(t.id)}" style="cursor: pointer;">
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
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${u(t.id)}" data-sprint-name="${u(t.name)}" data-budget="${t.budget||""}" data-project-id="${u(t.project_id)}">Edit Sprint</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" data-action="show-limbo-details-modal">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" data-action="show-close-sprint-confirmation" data-sprint-id="${u(t.id)}">Close Sprint</button>
                    `}
                </div>
            </div>
        `,i+=zp(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${u(n.id)}" data-sprint-url="/sprint/${u(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${m(n.name)}</div>
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
                            <span class="sprint-history-name">${m(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=i||Z({icon:K.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function zp(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),d=((H,ne,ce)=>Math.min(Math.max(H,ne),ce))((new Date-o)/(r-o),0,1),p=360,f=120,v=16,y=v,b=p-v,E=v,x=f-v,j=H=>s===0?x:E+(1-H/s)*(x-E),T=j(s),C=j(0),B=y+(b-y)*d,Y=j(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${Fs(e.start_date)} → ${Fs(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${p} ${f}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${y}" y1="${T}" x2="${b}" y2="${C}" class="burndown-ideal" />
                <line x1="${y}" y1="${T}" x2="${B}" y2="${Y}" class="burndown-actual" />
                <circle cx="${B}" cy="${Y}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}async function qn(e,t=!0){var n;try{const s=await h.getSprint(e);if(!s){$("Sprint not found","error"),M("sprints");return}la=s;const i=(n=L())==null?void 0:n.id,[a,o,r]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(()=>[]),i?h.getDocuments(i,s.project_id,null,e).catch(()=>[]):[]]);ca=a,da=o,Pn=r,t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Vp()}catch(s){console.error("Failed to load sprint:",s),$("Failed to load sprint","error"),M("sprints")}}async function Wp(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){$("Invalid sprint ID","error"),M("sprints",!1);return}try{await qn(e,!1)}catch{M("sprints",!1)}}function Vp(){const e=la,t=ca;document.querySelectorAll(".view").forEach(l=>l.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=t.filter(l=>Ft.includes(l.status)),i=t.filter(l=>l.status==="done"),a=t.reduce((l,d)=>l+(d.estimate||0),0),o=i.reduce((l,d)=>l+(d.estimate||0),0);let r="";e.status==="active"?r='<span class="badge badge-status-active">Active</span>':e.status==="planned"?r='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(r='<span class="badge badge-status-completed">Completed</span>');const c=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
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
                    ${Fs(e.start_date)} → ${Fs(e.end_date)}
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
                <div class="stat-value">${c}</div>
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
                ${s.length===0?Z({icon:K.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(l=>Nr(l)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${i.length>0?"open":""}>
                <summary><h3>Completed Issues (${i.length})</h3></summary>
                ${i.length===0?Z({icon:K.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${i.map(l=>Nr(l)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${Yp()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${Pn.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${u(e.id)}"
                        data-project-id="${u(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${Pn.length>0?`
                    <div class="sprint-issues-list">
                        ${Pn.map(l=>Kp(l)).join("")}
                    </div>
                `:Z({icon:K.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function Nr(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",s=Wo.includes(e.status)?e.status:"backlog",i=n?`badge-priority-${n}`:"",a=`status-dot-${s}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${u(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${m(e.identifier)}</span>
            <span class="sprint-issue-title">${m(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${i}">${lm(n)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Kp(e){const t=m(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${u(e.id)}" data-document-url="/document/${u(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${m(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${Ze(e.created_at)}</span>
            </span>
        </div>
    `}function Yp(){const e=da;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${Zp(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function Zp(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Xp(e,t,n,s){const i=s?Am(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${u(e)}" data-project-id="${u(s)}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${u(t)}" placeholder="Sprint name">
            </div>
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
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    `,N()}async function Qp(e,t,n){var r,c,l;e.preventDefault();const s=(c=(r=document.getElementById("sprint-name"))==null?void 0:r.value)==null?void 0:c.trim(),i=document.getElementById("sprint-budget").value,a=i?parseInt(i):null,o=((l=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:l.value)||"this";try{const d={budget:a};if(s&&(d.name=s),await h.updateSprint(t,d),o==="planned"||o==="default"){const f=en.filter(v=>v.status==="planned"&&v.id!==t);for(const v of f)await h.updateSprint(v.id,{budget:a})}o==="default"&&n&&await h.updateProject(n,{default_sprint_budget:a}),await Nn(),R(),$(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(d){_("update budget",d)}return!1}async function Jp(e){const t=en.find(c=>c.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,N();const n=Ft;let s=0,i=!1,a=!1;try{const[c,l]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);s=c.filter(d=>n.includes(d.status)).length,i=l.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(c){console.error("Failed to load sprint details:",c),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${m(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${u(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function em(e){try{const t=await h.closeSprint(e);await Nn(),Hr(),t.limbo?nm(t):$("Sprint completed!","success")}catch(t){_("complete sprint",t)}}async function Os(){const e=F();if(e)try{dt=await h.getLimboStatus(e),tm()}catch(t){console.error("Failed to load limbo status:",t)}}function tm(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!dt||!dt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${dt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function nm(e){const t=F();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,N(),sm(t)}async function sm(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${m(s.name)} <span class="ritual-mode">(${m(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${De(s.prompt)}</div>
                    ${pa(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function ua(){var t,n;if(!dt)return;const e=F();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${dt.pending_rituals.map(s=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${s.attestation?s.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${m(s.name)}</strong>
                            <span class="badge badge-ritual-${u(s.approval_mode)}">${m(s.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${De(s.prompt)}</div>
                        ${pa(s.attestation)}
                        ${im(s,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=dt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${dt.completed_rituals.map(s=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${m(s.name)}</div>
                            ${pa(s.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,N()}function pa(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${m(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${m(Ze(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${De(e.note)}</div>
        </div>
    `}function im(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${u(e.id)}" data-project-id="${u(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${u(e.id)}" data-project-id="${u(t)}" data-ritual-name="${u(e.name)}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function qr(e){for(const t of e)if(!qs.has(t))try{(await h.getSprints(t)).forEach(s=>{Ns[s.id]=s}),qs.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function am(){Ns={},qs=new Set,ca=[],da=[],Pn=[],Hs={}}function om(e,t){t.forEach(n=>{Ns[n.id]=n}),qs.add(e)}let Hs={};function rm(e){return Hs[e]}function Or(e,t){Hs[e]=t??null}function Hr(){Hs={}}J({"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}qn(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;Xp(t.sprintId,t.sprintName,n,t.projectId)},"show-limbo-details-modal":()=>{ua()},"show-close-sprint-confirmation":(e,t)=>{Jp(t.sprintId)},"handle-update-budget":(e,t)=>{Qp(e,t.sprintId,t.projectId)},"close-modal":()=>{R()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,R(),em(t.sprintId)},"dismiss-limbo-modal":()=>{R(),Os()},"approve-ritual":(e,t)=>{pm(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{Ur(t.ritualId,t.projectId,t.ritualName)},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}G(t.issueId)},"create-sprint-document":async(e,t)=>{await Lp(t.sprintId,t.projectId,()=>{qn(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Ge(t.documentId)}});function Fs(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function lm(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}lt(e=>{e==="currentProject"&&A()==="rituals"&&Fr()});async function Fr(){const e=F(),t=document.getElementById("rituals-content");if(!e){const n=document.getElementById("rituals-tabs");n&&n.classList.add("hidden"),t&&(t.innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>');return}Nm(e),t&&(t.innerHTML='<div class="loading">Loading rituals...</div>');try{await Fn()}catch(n){t&&(t.innerHTML=`<div class="empty-state">Error loading rituals: ${m(n.message)}</div>`)}}async function cm(){Xr(dm),Fr()}function dm(){const e=document.getElementById("rituals-content"),t=qm(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,nn("rv-sprint-rituals-list",n,"sprint"),nn("rv-close-rituals-list",s,"close"),nn("rv-claim-rituals-list",i,"claim")}function um(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function pm(e,t){try{await h.approveAttestation(e,t),$("Ritual approved!","success"),await Os(),ua()}catch(n){_("approve ritual",n)}}async function Ur(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{mm(s,e,t)}),N()}async function mm(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await h.completeGateRitual(t,n,s||null),$("Ritual completed!","success"),await Os();const i=Up();i&&!i.in_limbo?(R(),$("Limbo cleared! Next sprint is now active.","success")):ua()}catch(i){_("complete gate ritual",i)}return!1}function gm(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}" data-ritual-name="${u(e.name)}">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}" data-ritual-name="${u(e.name)}" data-ritual-prompt="${u(e.prompt||"")}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${u(e.id)}" data-issue-id="${u(t)}">Attest</button>`}function fm(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${m(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{hm(i,e,t)}),N()}async function hm(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return $("A note is required for this attestation.","error"),!1;try{await h.attestTicketRitual(t,n,s),$("Ritual attested!","success"),R(),await Bs(n)}catch(i){_("attest ticket ritual",i)}return!1}async function vm(e,t){try{await h.attestTicketRitual(e,t),$("Ritual attested!","success"),await Bs(t)}catch(n){_("attest ticket ritual",n)}}async function bm(e,t){try{await h.approveTicketRitual(e,t),$("Ritual approved!","success"),await Bs(t)}catch(n){_("approve ticket ritual",n)}}function ym(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{wm(s,e,t)}),N()}async function wm(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await h.completeTicketGateRitual(t,n,s||null),$("Ritual completed!","success"),R(),await Bs(n)}catch(i){_("complete ticket ritual",i)}return!1}J({"show-create-ritual-modal":(e,t)=>{nl(t.trigger)},"approve-ticket-ritual":(e,t)=>{bm(t.ritualId,t.issueId)},"complete-ticket-ritual":(e,t)=>{ym(t.ritualId,t.issueId,t.ritualName)},"attest-ticket-ritual-modal":(e,t)=>{fm(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt)},"attest-ticket-ritual":(e,t)=>{vm(t.ritualId,t.issueId)}});function De(e){if(!e)return"";try{P.setOptions({breaks:!0,gfm:!0});const n=P.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return Mo.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function ma(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function km(e,t,n,s,i,a,o,r){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${m(i)}</span>
                    <span class="gate-approval-issue-title">${m(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${u(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${m(s)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${m(o)}</strong>${r?` ${ma(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",l=>{$m(l,e,t,n)}),N(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function $m(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await h.completeTicketGateRitual(t,n,i||null),$(`GATE ritual "${s}" approved!`,"success"),R(),Dt()}catch(a){_("complete gate ritual",a)}}function Em(e,t,n,s,i,a,o,r){km(e,t,n,s,i,a,o,r)}function _m(e,t,n,s,i,a,o,r,c){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${m(i)}</span>
                    <span class="gate-approval-issue-title">${m(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${u(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${m(s)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${m(o)}</strong>${r?` ${ma(r)}`:""}</div>`:""}
                ${c?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${De(c)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{xm(d,e,t,n)}),N(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function xm(e,t,n,s){var a,o;e.preventDefault();const i=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{if(await h.approveTicketRitual(t,n),i)try{await h.createComment(n,i)}catch(r){console.error("Failed to post approval comment:",r)}$(`Review ritual "${s}" approved!`,"success"),R(),Dt()}catch(r){_("approve review ritual",r)}}function Im(e,t,n,s,i,a,o,r,c){_m(e,t,n,s,i,a,o,r,c)}lt(e=>{e==="currentProject"&&A()==="approvals"&&Dt()});let ga=[];async function Dt(){if(!L())return;const e=document.getElementById("approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=F(),n=t?X().filter(o=>o.id===t):X(),s=await Promise.all(n.map(async o=>{const[r,c]=await Promise.all([h.getPendingApprovals(o.id),h.getLimboStatus(o.id)]);return{project:o,approvals:r,limbo:c}})),i=[],a=[];for(const{project:o,approvals:r,limbo:c}of s)if(i.push(...r),c&&c.in_limbo){const l=(c.pending_rituals||[]).filter(d=>{var p;return(p=d.attestation)!=null&&p.approved_at?!1:d.approval_mode==="gate"||!!d.attestation});l.length>0&&a.push({project:o,rituals:l})}Ad(i),ga=a,Gr()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${m(t.message)}</p></div>`}}}function Gr(){const e=document.getElementById("approvals-list");if(!e)return;const t=Cd(),n=ga.length>0,s=!wd();if(t.length===0&&!n){s?e.innerHTML=`
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
                    ${ga.map(({project:d,rituals:p})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${m(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${p.map(f=>{const v=f.attestation&&!f.attestation.approved_at,y=v?"⏳":"○",b=v?`<span class="gate-waiting-info">Attested by <strong>${m(f.attestation.attested_by_name||"Unknown")}</strong></span>`:f.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',E=v?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${u(f.id)}"
                                            data-project-id="${u(d.id)}">Approve</button>`:f.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${u(f.id)}"
                                                data-project-id="${u(d.id)}"
                                                data-ritual-name="${u(f.name)}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${y} ${m(f.name)}
                                                    <span class="badge badge-ritual-${u(f.approval_mode)}">${m(f.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${m(f.prompt)}</span>
                                                ${b}
                                            </div>
                                            ${E}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const a=d=>d.pending_approvals||[],o=d=>p=>{const f=a(p).filter(d);return f.length>0?{...p,_filteredApprovals:f}:null},r=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="claim")).filter(Boolean),c=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="close")).filter(Boolean),l=t.map(o(d=>d.approval_mode==="review")).filter(Boolean);r.length>0&&(i+=`
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
        `),l.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${l.map(fa).join("")}
                </div>
            </div>
        `),e.innerHTML=i,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset;Em(p.ritualId,p.issueId,p.ritualName,p.ritualPrompt,p.issueIdentifier,p.issueTitle,p.requestedBy,p.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var v;d.disabled=!0;const p=(v=d.closest(".gate-ritual-actions"))==null?void 0:v.querySelector(".review-approve-btn");p&&(p.disabled=!0);const f=d.dataset;try{await h.approveTicketRitual(f.ritualId,f.issueId),$(`Review ritual "${f.ritualName}" approved!`,"success"),await Dt()}catch(y){d.disabled=!1,p&&(p.disabled=!1),_("approve review ritual",y)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset;Im(p.ritualId,p.issueId,p.ritualName,p.ritualPrompt,p.issueIdentifier,p.issueTitle,p.requestedBy,p.requestedAt,p.attestationNote)})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await h.approveAttestation(d.dataset.ritualId,d.dataset.projectId),$("Sprint ritual approved!","success"),await Dt()}catch(p){d.disabled=!1,_("approve sprint ritual",p)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{Ur(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName)})})}function Tm(){kd(),Gr()}function fa(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${m(s.requested_by_name)}</strong>${s.requested_at?` (${ma(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note">${De(s.attestation_note)}</div>`:"",c=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',l=i?`<div class="gate-ritual-actions">
                    <button class="btn btn-small btn-primary review-quick-approve-btn"
                        data-ritual-id="${u(s.ritual_id)}"
                        data-issue-id="${u(e.issue_id)}"
                        data-ritual-name="${u(s.ritual_name)}">Approve</button>
                    <button class="btn btn-small btn-secondary review-approve-btn"
                        data-ritual-id="${u(s.ritual_id)}"
                        data-issue-id="${u(e.issue_id)}"
                        data-ritual-name="${u(s.ritual_name)}"
                        data-ritual-prompt="${u(s.ritual_prompt)}"
                        data-issue-identifier="${u(e.identifier)}"
                        data-issue-title="${u(e.title)}"
                        data-requested-by="${u(s.requested_by_name||"")}"
                        data-requested-at="${u(s.requested_at||"")}"
                        data-attestation-note="${u(s.attestation_note||"")}">Comment &amp; Approve</button>
                </div>`:`<button class="btn btn-small btn-primary gate-approve-btn"
                    data-ritual-id="${u(s.ritual_id)}"
                    data-issue-id="${u(e.issue_id)}"
                    data-ritual-name="${u(s.ritual_name)}"
                    data-ritual-prompt="${u(s.ritual_prompt)}"
                    data-issue-identifier="${u(e.identifier)}"
                    data-issue-title="${u(e.title)}"
                    data-requested-by="${u(s.requested_by_name||"")}"
                    data-requested-at="${u(s.requested_at||"")}">Complete</button>`;return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${m(s.ritual_name)} ${c}</span>
                    <span class="gate-ritual-prompt">${m(s.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                ${l}
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${u(e.issue_id)}" class="gate-issue-link">
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
    `}J({"view-issue-from-modal":(e,t)=>{e.preventDefault(),R(),G(t.issueId)},"dismiss-approvals-explainer":()=>{Tm()}});const Us={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Gs={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let zr=0;function Wr(e){zr=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=Vr(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Vr(e="",t="",n=""){const s=zr++,i=Object.keys(Us).map(l=>`<option value="${l}" ${l===e?"selected":""}>${l}</option>`).join(""),o=(e?Us[e]:Us.estimate).map(l=>`<option value="${l}" ${l===t?"selected":""}>${Gs[l]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",c=t==="isnull";return`
        <div class="condition-row" id="condition-row-${s}">
            <select class="condition-field" data-action="update-operator-options" data-row-id="${s}">
                <option value="">Select field...</option>
                ${i}
            </select>
            <select class="condition-operator" id="condition-operator-${s}" data-action="toggle-value-input" data-row-id="${s}">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${s}" value="${u(String(r))}" placeholder="Value"${c?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" data-action="remove-condition-row" data-row-id="${s}">&times;</button>
        </div>
    `}function Sm(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Vr()),zs()}function Lm(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),zs()}function Cm(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=Us[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${Gs[o]}</option>`).join(""),Kr(e),zs()}function Kr(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function On(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function zs(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Yr(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,c=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,l=o.querySelector(".condition-value");let d=(a=l==null?void 0:l.value)==null?void 0:a.trim();if(!r&&!c)continue;if(!r)throw On("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!c)throw On("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const p=`${r}__${c}`;if(n.has(p))throw On(`Duplicate condition: ${r} ${Gs[c]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${p}`);if(n.add(p),c==="isnull")t[p]=!0;else if(c==="in"||c==="contains")t[p]=d?d.split(",").map(f=>f.trim()).filter(f=>f):[];else if(c==="gte"||c==="lte"){if(!d)throw On(`Please enter a numeric value for ${r} ${Gs[c]}.`),new Error(`Missing numeric value for ${p}`);const f=parseInt(d,10);if(isNaN(f))throw On(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${p}: ${d}`);t[p]=f}else t[p]=d}return zs(),Object.keys(t).length>0?t:null}J({"add-condition-row":()=>{Sm()},"remove-condition-row":(e,t)=>{Lm(Number(t.rowId))},"update-operator-options":(e,t)=>{Cm(Number(t.rowId))},"toggle-value-input":(e,t)=>{Kr(Number(t.rowId))}});let le=[],ha=null;const Zr=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];lt((e,t)=>{e==="currentProject"&&(t&&ld(t),Zr.forEach(n=>{const s=document.getElementById(n);s&&(s.value=t||"")}),Ym(t||""))});const Ws={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function Xr(e){ha=e}function X(){return le}function tn(e){const t=le.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return Ws[n]||Ws.fibonacci}function Vs(e,t){if(!e)return"No estimate";const s=tn(t).find(i=>i.value===e);return s?s.label:`${e} points`}function va(e,t){return e?!tn(t).some(s=>s.value===e):!1}function Am(e){const t=le.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(Ws[n]||Ws.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function ze(){if(L())try{le=await h.getProjects(L().id),Bm();const e=F();if(e&&le.some(s=>s.id===e))return;const t=ba();if(t&&le.some(s=>s.id===t)){Fe(t);return}const n=Do();if(n&&le.some(s=>s.id===n)){Fe(n);return}le.length>0&&Fe(le[0].id)}catch(e){_("load projects",e)}}function Bm(){const e='<option value="">All Projects</option>'+le.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+le.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],s=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),s.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const i=F();Zr.forEach(a=>{const o=document.getElementById(a);o&&(o.value=i||"")})}function Qr(){return Do()}function Hn(){const e=document.getElementById("projects-list");if(le.length===0){e.innerHTML=Z({icon:K.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=le.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${u(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${z(t.color)}20; color: ${z(t.color)}">
                    ${m(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${m(t.name)}</div>
                <button class="grid-item-edit" data-action="view-project-settings" data-project-id="${u(t.id)}" title="Project settings">
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
    `).join("")}function jm(e){Fe(e),M("issues")}function Jr(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,N()}async function Mm(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(L().id,t),await ze(),Hn(),R(),$("Project created!","success")}catch(n){_("create project",n)}return!1}async function Dm(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await ze(),Hn(),R(),$("Project updated!","success")}catch(s){_("update project",s)}return!1}async function Rm(e){const t=le.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await ze(),Hn(),R(),$("Project deleted","success")}catch(n){_("delete project",n)}}let Te=null;async function el(e){Te=e,le.length===0&&await ze();const t=le.find(n=>n.id===e);if(!t){$("Project not found","error"),M("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),tl("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function tl(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!ut||ut.length===0)&&Fn()}function Pm(){Te=null,ut=[]}function Nm(e){Te=e}function qm(){return ut}async function Om(){if(!Te)return;const e=document.getElementById("ps-name").value.trim();if(!e){$("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(Te,t),await ze(),$("Settings saved","success");const n=le.find(s=>s.id===Te);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){_("save project settings",n)}}async function Hm(){if(!Te)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await h.updateProject(Te,n),await ze(),$("Settings saved","success")}catch(s){_("save settings",s)}}let ut=[];async function Fn(){if(Te)try{ut=await h.getRituals(Te),Fm(),typeof ha=="function"&&ha()}catch(e){_("load rituals",e)}}function Fm(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=ut.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=ut.filter(s=>s.trigger==="ticket_close"),n=ut.filter(s=>s.trigger==="ticket_claim");nn("ps-sprint-rituals-list",e,"sprint"),nn("ps-close-rituals-list",t,"close"),nn("ps-claim-rituals-list",n,"claim")}function nn(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>u(a||"auto");s.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${m(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${i(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${m(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${De(a.prompt)}</div>
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
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${u(a.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${u(a.id)}" data-ritual-name="${u(a.name)}">Delete</button>
      </div>
    </div>
  `}).join("")}async function nl(e){if(!Te)return;let t=[];try{t=await h.getRitualGroups(Te)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
          ${t.map(n=>`<option value="${u(n.id)}" data-mode="${u(n.selection_mode)}">${m(n.name)} (${m(n.selection_mode)})</option>`).join("")}
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
        ${Wr(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,N()}function Um(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Gm(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),s=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),s.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),s.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),s.classList.add("hidden")}async function sl(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw $("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(Te,{name:t,selection_mode:n})).id}return e.value||null}async function zm(e){e.preventDefault();let t;try{t=Yr()}catch{return!1}let n;try{n=await sl()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){s.group_id=n;const i=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&i.value&&(s.weight=parseFloat(i.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(s.percentage=parseFloat(a.value))}try{await h.createRitual(Te,s),await Fn(),R(),$("Ritual created!","success")}catch(i){_("create ritual",i)}return!1}async function Wm(e){const t=ut.find(o=>o.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(Te)}catch{}const s=n.find(o=>o.id===t.group_id),i=s&&s.selection_mode==="random_one",a=s&&s.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form data-action="update-project-ritual" data-ritual-id="${u(e)}">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${u(t.name)}" required>
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
          ${n.map(o=>`<option value="${u(o.id)}" data-mode="${u(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${m(o.name)} (${m(o.selection_mode)})</option>`).join("")}
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
        ${Wr(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,N()}async function Vm(e,t){e.preventDefault();let n;try{n=Yr()}catch{return!1}let s;try{s=await sl()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:s||""};if(s){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await h.updateRitual(t,i),await Fn(),R(),$("Ritual updated!","success")}catch(a){_("update ritual",a)}return!1}async function Km(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await Fn(),$("Ritual deleted","success")}catch(n){_("delete ritual",n)}}J({"view-project":(e,t)=>{jm(t.projectId)},"view-project-settings":(e,t)=>{el(t.projectId)},"create-project":e=>{Mm(e)},"update-project":(e,t)=>{Dm(e,t.projectId)},"confirm-delete-project":(e,t)=>{Rm(t.projectId)},"edit-project-ritual":(e,t)=>{Wm(t.ritualId)},"delete-project-ritual":(e,t)=>{Km(t.ritualId,t.ritualName)},"create-project-ritual":e=>{zm(e)},"update-project-ritual":(e,t)=>{Vm(e,t.ritualId)},"toggle-ritual-conditions":()=>{Um()},"ritual-group-change":()=>{Gm()}});function ba(){const t=new URLSearchParams(window.location.search).get("project");return t||Qr()}function Ym(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}const ya={},Ks=new Map;let wa=null,ka=null,$a=null,Ea=null,_a=null,xa=null,il=!1;function Zm(e){Object.assign(ya,e)}function Xm({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i,epicNavigate:a}={}){e&&(wa=e),t&&(ka=t),n&&($a=n),s&&(Ea=s),i&&(_a=i),a&&(xa=a)}function Qm(){return Object.keys(ya)}function M(e,t=!0){if(t&&Ks.set(window.location.href,window.scrollY),Id(e),t){let i;const a=ba(),o=["issues","board","sprints"];e==="my-issues"?i="/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:o.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),wa&&wa();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const i=document.getElementById(`${e}-view`);i&&i.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const s=ya[e];s&&s(),t&&window.scrollTo(0,0)}function al(){var s;const t=window.location.pathname.split("/").filter(Boolean);Ea&&Ea();let n="my-issues";if(t.length===0||t[0]==="")M("my-issues",!1);else{if(ka&&ka(t))return;{n=t[0];const i={"gate-approvals":"approvals"};i[n]&&(n=i[n]),Qm().includes(n)?M(n,!1):(n="my-issues",M("my-issues",!1))}}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function ol(e){Ks.set(window.location.href,window.scrollY),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),_a&&_a(e)}function Jm(e){Ks.set(window.location.href,window.scrollY),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),xa&&xa(e)}function rl(){const e=Ks.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function eg(){il||(il=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&$a&&$a(e.state)){rl();return}(t=e.state)!=null&&t.view?M(e.state.view,!1):al(),rl()}))}let Un=[];function Ys(){return Un}function tg(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function ng(e){const t=e==null?void 0:e.avatar_url,n=u((e==null?void 0:e.name)||"Agent");return t?tg(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${u(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${m(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function sg(e){var t;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{Un=await h.getTeamAgents(e),bs(Pt,Ys),ws()}catch(n){console.error("Failed to load team agents:",n)}}async function Ia(e){var t;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{Un=await h.getTeamAgents(e),bs(Pt,Ys),ws(),ig()}catch(n){_("load agents",n)}}function ig(){const e=document.getElementById("agents-list");if(e){if(Un.length===0){e.innerHTML=Z({icon:K.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=Un.map(t=>{const n=m(t.name),s=m(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${ng(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${Bi(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${u(t.id)}" data-agent-name="${u(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function ag(){const e=X();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),N()}async function og(e){var o,r,c;e.preventDefault();const t=(o=L())==null?void 0:o.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value;try{let l;i&&a?l=await h.createProjectAgent(a,n,s):l=await h.createTeamAgent(t,n,s),R();const d=m(l.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
      <div class="api-key-created">
        <p class="warning-text">Copy the agent's API key now. You won't be able to see it again!</p>
        <div class="api-key-display">
          <code id="new-agent-key">${d}</code>
          <button type="button" class="btn btn-secondary" data-action="copy-agent-key">Copy</button>
        </div>
        <div class="api-key-instructions">
          <p>Configure the CLI to use this agent:</p>
          <code>chaotic auth set-key ${d}</code>
        </div>
        <button type="button" class="btn btn-primary" data-action="dismiss-agent-modal">Done</button>
      </div>
    `,N()}catch(l){_("create agent",l)}return!1}function rg(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{$("Agent API key copied to clipboard","success")}).catch(()=>{$("Failed to copy","error")})}async function lg(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),$("Agent deleted","success"),Ia()}catch(n){_("delete agent",n)}}J({"create-agent":e=>{og(e)},"copy-agent-key":()=>{rg()},"dismiss-agent-modal":()=>{R(),Ia()},"delete-agent":(e,t)=>{lg(t.agentId,t.agentName)}});let Gn=0,zn=null;const Rt=new Map;function pt(e,t){return Rt.has(e)||Rt.set(e,new Set),Rt.get(e).add(t),()=>{var n;return(n=Rt.get(e))==null?void 0:n.delete(t)}}function cg(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}function ll(e){zn&&(clearTimeout(zn),zn=null);const t=Md();t&&(t.close(),Fo(null));const n=h.getToken();if(!n)return;const i=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(n)}&team_id=${encodeURIComponent(e)}`;try{const a=new WebSocket(i);Fo(a),a.onopen=()=>{console.log("WebSocket connected"),Gn>0&&$("Live updates reconnected","success"),Gn=0},a.onmessage=o=>{let r;try{r=JSON.parse(o.data)}catch(c){console.error("WebSocket: malformed message",c);return}dg(r)},a.onclose=()=>{console.log("WebSocket disconnected"),Gn++,Gn===1&&$("Live updates disconnected. Reconnecting...","warning");const o=cg(Gn-1);zn=setTimeout(()=>{zn=null,L()&&L().id===e&&ll(e)},o)},a.onerror=o=>{console.error("WebSocket error:",o)}}catch(a){console.error("Failed to connect WebSocket:",a)}}function dg(e){const{type:t,entity:n,data:s}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const i={type:t,entity:n},a=Rt.get(`${n}:${t}`);if(a)for(const c of a)try{c(s,i)}catch(l){console.error(`WebSocket handler error (${n}:${t}):`,l)}const o=Rt.get(n);if(o)for(const c of o)try{c(s,i)}catch(l){console.error(`WebSocket handler error (${n}):`,l)}const r=Rt.get("*");if(r)for(const c of r)try{c(s,i)}catch(l){console.error("WebSocket handler error (*):",l)}}let Zs=[],Xs=[],Ta=[],Sa=[];function ug(){return Zs}function Pt(){return Xs}async function La(){try{Zs=await h.getMyTeams(),pg()}catch(e){_("load teams",e)}}function pg(){const e=document.getElementById("team-list");Zs.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Zs.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${u(JSON.stringify(t))}">${m(t.name)}</button>
        `).join("")}async function Ca(e,t=!1){Mi(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const s=document.getElementById("team-description-text");s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),ll(e.id),await Promise.all([ze(),xg(),gg(),sg()]),t?al():M(A())}function cl(){document.getElementById("team-dropdown").classList.toggle("hidden")}function mg(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function gg(){if(L())try{Xs=await h.getTeamMembers(L().id),bs(Pt,Ys),ws()}catch(e){console.error("Failed to load team members:",e)}}async function dl(){if(L())try{Xs=await h.getTeamMembers(L().id),bs(Pt,Ys),ws(),fg()}catch(e){_("load team members",e)}}function fg(){const e=document.getElementById("team-members-list");e.innerHTML=Xs.map(t=>`
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
                ${t.user_id!==In().id&&t.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${u(t.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function Aa(){if(L())try{Ta=await h.getTeamInvitations(L().id),hg()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function hg(){const e=document.getElementById("team-invitations-list");if(Ta.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=Ta.map(t=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${m(t.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${m(t.role)}</span>
                    <span>Expires: ${new Date(t.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${u(t.id)}">Cancel</button>
        </div>
    `).join("")}async function vg(){if(L())try{Sa=await h.getTeamAgents(L().id),bg()}catch(e){_("load team agents",e)}}function bg(){const e=document.getElementById("team-agents-list");if(e){if(Sa.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=Sa.map(t=>{const n=m(t.name),s=m(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
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
      `}).join("")}}function ul(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,N()}async function yg(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await h.createInvitation(L().id,t,n),await Aa(),R(),$("Invitation sent!","success")}catch(s){_("send invitation",s)}return!1}async function wg(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(L().id,e),await dl(),$("Member removed!","success")}catch(t){_("remove member",t)}}async function kg(e){try{await h.deleteInvitation(L().id,e),await Aa(),$("Invitation canceled!","success")}catch(t){_("cancel invitation",t)}}function pl(){cl(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,N()}function $g(){L()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${u(L().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${u(L().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${m(L().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,N())}async function Eg(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await La(),await Ca(n),R(),$("Team created!","success")}catch(n){_("create team",n)}return!1}async function _g(e){if(e.preventDefault(),!L())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(L().id,t);Mi(n),document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await La(),R(),$("Team updated!","success")}catch(n){_("update team",n)}return!1}async function xg(){if(L())try{const e=await h.getLabels(L().id);hs(e)}catch(e){console.error("Failed to load labels:",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),J({"select-team":(e,t)=>{Ca(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{wg(t.userId)},"delete-invitation":(e,t)=>{kg(t.invitationId)},"invite-member":e=>{yg(e)},"create-team":e=>{Eg(e)},"update-team":e=>{_g(e)}});let et=null,mt=0,sn=null,an=null,Wn=null,Ba=!1;function Ig(){return cd()}function ml(){dd()}function gl(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Tg(){et||(et=document.createElement("div"),et.id="onboarding-overlay",et.className="onboarding-overlay",document.getElementById("app").appendChild(et))}function Vn(){if(!et)return;const e=Ba?hl():fl(),t=e[mt],n=e.map((s,i)=>`<span class="onboarding-dot${i===mt?" active":""}${i<mt?" completed":""}"></span>`).join("");et.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function fl(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=gl(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=gl(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&sn&&(e.textContent=`${sn.name} (${sn.key})`),t&&an&&(t.textContent=`${an.name} (${an.key})`),n&&Wn&&(n.textContent=`${Wn.identifier} - ${Wn.title}`)}}]}function hl(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function ja(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Ma(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function on(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function Sg(){const e=Ba?hl():fl();mt<e.length-1&&(mt++,Vn())}function Lg(){ml(),bl(),Kn()}function Cg(){ml(),bl(),Kn()}async function Ag(e){e.preventDefault(),Ma("onboarding-team-error"),on("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{sn=await h.createTeam({name:t,key:n}),mt++,Vn()}catch(s){ja("onboarding-team-error",s.message||"Failed to create team"),on("onboarding-team-submit",!1)}}async function Bg(e){e.preventDefault(),Ma("onboarding-project-error"),on("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{an=await h.createProject(sn.id,{name:t,key:n}),mt++,Vn()}catch(s){ja("onboarding-project-error",s.message||"Failed to create project"),on("onboarding-project-submit",!1)}}async function jg(e){e.preventDefault(),Ma("onboarding-issue-error"),on("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Wn=await h.createIssue(an.id,{title:t}),mt++,Vn()}catch(n){ja("onboarding-issue-error",n.message||"Failed to create issue"),on("onboarding-issue-submit",!1)}}function vl(e=!1){Ba=e,mt=0,sn=null,an=null,Wn=null,Tg(),Vn()}function bl(){et&&(et.remove(),et=null)}function yl(){ud(),vl(!0)}J({"onboarding-next":e=>{e.preventDefault(),Sg()},"onboarding-skip":e=>{e.preventDefault(),Lg()},"onboarding-finish":e=>{e.preventDefault(),Cg()},"onboarding-create-team":e=>{Ag(e)},"onboarding-create-project":e=>{Bg(e)},"onboarding-create-issue":e=>{jg(e)}});async function Kn(){Mg(),Og(),await La();const e=ug();if(e.length===0&&!Ig()){vl();return}e.length>0&&await Ca(e[0],!0)}let rn=null,Yn=null,We=null,Ve=null;function Zn(){rn||(rn=document.getElementById("auth-screen"),Yn=document.getElementById("main-screen"),We=document.getElementById("login-form"),Ve=document.getElementById("signup-form"))}function Da(){Zn(),rn&&rn.classList.remove("hidden"),Yn&&Yn.classList.add("hidden")}function Mg(){Zn(),rn&&rn.classList.add("hidden"),Yn&&Yn.classList.remove("hidden")}function Dg(){Zn(),We&&We.classList.remove("hidden"),Ve&&Ve.classList.add("hidden")}function Rg(){Zn(),We&&We.classList.add("hidden"),Ve&&Ve.classList.remove("hidden")}async function Pg(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),fs(await h.getMe()),await Kn(),$("Welcome back!","success")}catch(s){_("log in",s)}return!1}async function Ng(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await h.signup(t,n,s),await h.login(n,s),fs(await h.getMe()),await Kn(),$("Account created successfully!","success")}catch(i){_("sign up",i)}return!1}function wl(){h.logout(),fs(null),Mi(null),Da(),$("Signed out","success")}function qg(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Og(){const e=In();if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?qg(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${u(s)}" alt="${u(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function Hg(){Zn();const e=We==null?void 0:We.querySelector("form");e&&e.addEventListener("submit",i=>Pg(i));const t=Ve==null?void 0:Ve.querySelector("form");t&&t.addEventListener("submit",i=>Ng(i));const n=We==null?void 0:We.querySelector(".auth-switch a");n&&n.addEventListener("click",i=>{i.preventDefault(),Rg()});const s=Ve==null?void 0:Ve.querySelector(".auth-switch a");s&&s.addEventListener("click",i=>{i.preventDefault(),Dg()})}let Ra=[];async function Pa(){try{Ra=await h.getApiKeys(),Fg()}catch(e){_("load API keys",e)}}function Fg(){const e=document.getElementById("api-keys-list");if(e){if(Ra.length===0){e.innerHTML=Z({icon:K.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=Ra.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${m(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${m(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Bi(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Bi(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${u(t.id)}" data-key-name="${u(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function Ug(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,N()}async function Gg(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);R(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,N()}catch(n){_("create API key",n)}return!1}async function zg(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),$("API key copied to clipboard","success")}catch{$("Failed to copy","error")}}async function Wg(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),$("API key revoked","success"),await Pa()}catch(n){_("revoke API key",n)}}J({"create-api-key":e=>{Gg(e)},"copy-api-key":()=>{zg()},"dismiss-api-key-modal":()=>{R(),Pa()},"revoke-api-key":(e,t)=>{Wg(t.keyId,t.keyName)}});let Qs=!1,gt=0,_t=[],Js=[];function Vg(e){Js=e,_t=[...e]}function Na(){return Qs}function Kg(){if(Qs)return;Qs=!0,gt=0,_t=[...Js];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&ei()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>Yg(n.target.value)),t.addEventListener("keydown",Xg),e.addEventListener("mouseover",n=>{const s=n.target.closest('[data-action="execute-command"]');s&&Zg(Number(s.dataset.commandIndex))}),Xn(),requestAnimationFrame(()=>t.focus())}function ei(){Qs=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function Yg(e){const t=e.toLowerCase().trim();t?_t=Js.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):_t=[...Js],gt=0,Xn()}function Xn(){const e=document.getElementById("command-results");if(!e)return;if(_t.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};_t.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${s===gt?"selected":""}"
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
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function Zg(e){gt=e,Xn()}function kl(e){const t=_t[e];t&&(ei(),t.action())}function Xg(e){switch(e.key){case"ArrowDown":e.preventDefault(),gt=Math.min(gt+1,_t.length-1),Xn();break;case"ArrowUp":e.preventDefault(),gt=Math.max(gt-1,0),Xn();break;case"Enter":e.preventDefault(),kl(gt);break;case"Escape":e.preventDefault(),ei();break}}J({"execute-command":(e,t)=>{kl(Number(t.commandIndex))}});const Qg=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function Jg(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${m(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${m(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function ef(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${m(e.title)}</h4>
        ${e.shortcuts.map(Jg).join("")}
    </div>`}function $l(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${Qg.map(ef).join("")}
        </div>
    `,N()}lt(e=>{e==="currentProject"&&A()==="epics"&&qa()});async function qa(){var t;const e=document.getElementById("epics-list");if(e){e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((t=L())!=null&&t.id)){e.innerHTML='<div class="empty-state">Select a team to view epics.</div>';return}const n=F();let s;if(n?s=await h.getIssues({project_id:n,issue_type:"epic"}):s=await h.getTeamIssues(L().id,{issue_type:"epic"}),!s||s.length===0){e.innerHTML=Z({icon:K.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}const i=await Promise.all(s.map(async a=>{let o=[];try{o=await h.getSubIssues(a.id)}catch{}return{...a,subIssues:o}}));tf(i,e)}catch(n){e.innerHTML=`<div class="empty-state">Failed to load epics: ${m(n.message||String(n))}</div>`}}}function tf(e,t){const n=e.map(s=>{const i=s.subIssues?s.subIssues.length:0,a=s.subIssues?s.subIssues.filter(p=>p.status==="done"||p.status==="canceled").length:0,o=i>0?Math.round(a/i*100):0,r=i>0?`${a}/${i}`:"-",c=`status-${(s.status||"backlog").replace(/_/g,"-")}`,l=(s.status||"backlog").replace(/_/g," ").replace(/\b\w/g,p=>p.toUpperCase()),d=s.estimate!=null?`${s.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${u(s.identifier)}" style="cursor: pointer;">
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
    `,t._epicClickHandler||(t._epicClickHandler=s=>{const i=s.target.closest(".epic-row");i&&i.dataset.identifier&&Jm(i.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function nf(){const e=F(),t=X().map(n=>`
        <option value="${u(n.id)}" ${n.id===e?"selected":""}>${m(n.name)}</option>
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
    `,N(),document.getElementById("create-epic-form").addEventListener("submit",sf),document.getElementById("create-epic-title").focus()}async function sf(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),s=document.getElementById("create-epic-description").value.trim();if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}try{const i=await h.createIssue(t,{title:n,description:s||null,issue_type:"epic"});R(),$(`Created epic ${i.identifier}`,"success"),qa()}catch(i){_("create epic",i)}}async function El(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){G(t.id,!1);return}await _l(t.id,!1)}else M("epics",!1)}catch{M("epics",!1)}}async function _l(e,t=!0){try{const[n,s,i,a]=await Promise.all([h.getIssue(e),h.getSubIssues(e),h.getActivities(e),h.getComments(e)]);if(n.issue_type!=="epic"){G(e,t);return}t&&history.pushState({epicId:e,view:A()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(b=>b.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=A()||"epics",c=X().find(b=>b.id===n.project_id),l=n.assignee_id?Sn(n.assignee_id):null,d=l?Ct(l):null,p=s.length,f=s.filter(b=>b.status==="done"||b.status==="canceled").length,v=p>0?Math.round(f/p*100):0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${u(r)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${c?m(c.name):"Project"} › ${m(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${As(n.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${v===100?" epic-progress-complete":""}" style="width: ${v}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${f} of ${p} done</span>
                                <span>${v}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?Z({icon:K.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(b=>{const E=b.assignee_id?Sn(b.assignee_id):null,x=E?Ct(E):null;return`
                                <div class="sub-issue-item" data-issue-id="${u(b.id)}" data-identifier="${u(b.identifier)}">
                                    <span class="sub-issue-status">${Ie(b.status)}</span>
                                    <span class="sub-issue-id">${m(b.identifier)}</span>
                                    <span class="sub-issue-title">${m(b.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(b.status||"backlog").replace(/_/g,"-")}">${ke(b.status)}</span>
                                    ${x?`<span class="sub-issue-assignee">${m(x)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${i.length===0?Z({icon:K.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):i.map(b=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${ta(b.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${sa(b)}</span>
                                        <span class="activity-actor">by ${m(na(b))}</span>
                                        <span class="activity-time">${Ze(b.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${a.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${a.map(b=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(b.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m(b.author_name||"User")}</span>
                                            <span class="comment-date">${Ze(b.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${m(b.content||"")}</div>
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
                                ${Ie(n.status)}
                                ${ke(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${Je(n.priority)}
                                ${Be(n.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${d?m(d):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${Vs(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(b=>`
                                    <span class="issue-label" style="background: ${z(b.color)}20; color: ${z(b.color)}">${m(b.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${c?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(c.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const y=o.querySelector(".sub-issues-list");y&&y.addEventListener("click",b=>{const E=b.target.closest(".sub-issue-item");E&&E.dataset.issueId&&G(E.dataset.issueId)})}catch(n){_("load epic",n)}}function af(e){let t=!1,n=null;return function(i){if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){switch(t=!1,clearTimeout(n),i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break}return}switch(i.key){case"c":i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}function of(e){return function(n){var s;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const i=e.getModalForm();if(i)n.preventDefault(),i.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const i=(s=document.activeElement)==null?void 0:s.closest("form");i&&(n.preventDefault(),i.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.openCommandPalette())}}}function ti(e,t,n="#issues-list .issue-row"){const s=document.querySelectorAll(n);s.length!==0&&(e=Math.max(0,Math.min(s.length-1,e)),s.forEach(i=>i.classList.remove("keyboard-selected")),t(e),s[e].classList.add("keyboard-selected"),s[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function rf(e){const t="#issues-list .issue-row";function n(i){return i<0?null:document.querySelectorAll(t)[i]||null}function s(i,a,o,r){const c=n(a);if(!c)return;const l=c.dataset.issueId;if(!l||l.startsWith("temp-"))return;i.preventDefault(),i.stopImmediatePropagation();const d=c.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(i,o,l,d)}return function(a){if(e.getCurrentView()!=="issues"||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":a.preventDefault(),ti(r+1,e.setSelectedIndex,t);break;case"k":a.preventDefault(),ti(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const c=o[r].dataset.issueId;c&&!c.startsWith("temp-")&&e.viewIssue(c)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const c=o[r].dataset.issueId;c&&!c.startsWith("temp-")&&e.showEditIssueModal(c)}break;case"s":s(a,r,"status","status-btn");break;case"p":s(a,r,"priority","priority-btn");break;case"a":s(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(c=>c.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function lf(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(s){if(e.getCurrentView()!=="documents"||s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const i=document.querySelectorAll(t);if(i.length===0)return;const a=e.getSelectedIndex();switch(s.key){case"j":s.preventDefault(),ti(a+1,e.setSelectedIndex,t);break;case"k":s.preventDefault(),ti(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&i[a]){s.preventDefault();const o=i[a].dataset.documentId;o&&e.viewDocument(o)}break;case"e":if(a>=0&&i[a]){s.preventDefault();const o=i[a].dataset.documentId;o&&e.showEditDocumentModal&&e.showEditDocumentModal(o)}break;case"Escape":a>=0&&(s.preventDefault(),i.forEach(o=>o.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const xl=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let xt=[],Oa=null;lt(e=>{e==="currentProject"&&A()==="board"&&Il()});async function Il(){const e=F();if(!e){const n=document.getElementById("kanban-board");n&&(n.innerHTML=Z({icon:K.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const t=document.getElementById("kanban-board");t&&(t.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{xt=await h.getIssues({project_id:e}),It()}catch(n){t&&(t.innerHTML=Z({icon:K.issues,heading:"Failed to load board",description:"Check your connection and try again"})),_("load board",n)}}function It(){const e=document.getElementById("kanban-board");e&&(e.innerHTML=xl.map(t=>{const n=xt.filter(s=>s.status===t.key);return`
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
                            <div class="kanban-card-title">${m(s.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${s.identifier}</span>
                                <span class="badge badge-priority-${s.priority}" style="font-size: 10px;">${Be(s.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""))}function cf(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Oa=t.dataset.id,t.classList.add("dragging")}function df(e,t){t.classList.remove("dragging"),Oa=null}function uf(e,t){e.preventDefault(),t.classList.add("drag-over")}function pf(e,t){t.classList.remove("drag-over")}function mf(e,t){e.preventDefault(),t.classList.add("drag-over")}function gf(e,t){t.classList.remove("drag-over")}async function ff(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),s=t.dataset.status,i=xt.find(o=>o.id===n);if(!i)return;const a=i.status;if(i.status=s,Tl(s,n),It(),a!==s)try{await h.updateIssue(n,{status:s}),$("Status updated","success")}catch(o){i.status=a,It(),_("update status",o)}}async function hf(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Oa||e.dataTransfer.getData("text/plain"),s=t.dataset.id;if(!n||!s||n===s)return;const i=t.closest(".kanban-column"),a=i==null?void 0:i.dataset.status;if(!a)return;const o=xt.find(c=>c.id===n);if(!o)return;const r=o.status;if(o.status=a,Tl(a,n,s),It(),r!==a)try{await h.updateIssue(n,{status:a}),$("Status updated","success")}catch(c){o.status=r,It(),_("update status",c)}}function Tl(e,t,n=null){const s=xt.filter(o=>o.status===e&&o.id!==t),i=xt.find(o=>o.id===t);if(!i)return;if(n){const o=s.findIndex(r=>r.id===n);o>=0?s.splice(o,0,i):s.push(i)}else s.push(i);const a=[];xl.forEach(o=>{o.key===e?a.push(...s):a.push(...xt.filter(r=>r.status===o.key))}),xt=a}J({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),G(t.id)):e.type==="dragstart"?cf(e,n):e.type==="dragend"?df(e,n):e.type==="dragover"?mf(e,n):e.type==="dragleave"?gf(e,n):e.type==="drop"&&hf(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?uf(e,n):e.type==="dragleave"?pf(e,n):e.type==="drop"&&ff(e,n)}});const Tt=new Map,Sl=6e4,Ha=100;let me=null,ni=null,si=null,Qn=null,Ll=!1;const vf={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},bf={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Cl={api:null};let Fa={...Cl};function yf(e={}){Fa={...Cl,...e},me||(me=document.createElement("div"),me.className="issue-tooltip",me.style.display="none",document.body.appendChild(me),me.addEventListener("mouseenter",()=>{clearTimeout(ni)}),me.addEventListener("mouseleave",()=>{Ua()})),Ll||(document.addEventListener("mouseover",wf),document.addEventListener("mouseout",kf),Ll=!0)}function wf(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=$f(t);if(n){if(n===Qn&&me.style.display!=="none"){clearTimeout(ni);return}clearTimeout(si),si=setTimeout(()=>{Ef(t,n)},200)}}function kf(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(si),ni=setTimeout(()=>{Ua()},150))}function $f(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function Ef(e,t){Qn=t;const n=e.getBoundingClientRect();me.style.left=`${n.left+window.scrollX}px`,me.style.top=`${n.bottom+window.scrollY+8}px`,me.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',me.style.display="block";try{const s=await xf(t);if(Qn!==t)return;If(s)}catch{if(Qn!==t)return;me.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Ua(){clearTimeout(si),clearTimeout(ni),me&&(me.style.display="none"),Qn=null}function _f(){const e=Date.now();for(const[t,n]of Tt.entries())e-n.timestamp>=Sl&&Tt.delete(t)}async function xf(e){Tt.size>Ha/2&&_f();const t=Tt.get(e);if(t&&Date.now()-t.timestamp<Sl)return t.issue;if(!Fa.api)throw new Error("API not initialized");const n=await Fa.api.getIssueByIdentifier(e);if(Tt.size>=Ha){const s=Array.from(Tt.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,Ha/2);for(const[a]of i)Tt.delete(a)}return Tt.set(e,{issue:n,timestamp:Date.now()}),n}function If(e){const t=vf[e.status]||"#6b7280",n=bf[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";me.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${m(e.identifier)}</span>
            <span class="issue-tooltip-type">${m(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${m(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${Tf(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${Sf(e.priority)}</span>
        </div>
    `}function Tf(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Sf(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Lf(){pt("issue:created",Cf),pt("issue:updated",Af),pt("issue:deleted",Bf),pt("comment",jf),pt("relation",Mf),pt("attestation",Df),pt("activity",Rf),pt("project",Pf),pt("sprint",Nf)}function Cf(e){var i,a,o;const t=$e(),n=t.findIndex(r=>r.id===e.id),s=t.findIndex(r=>r._isOptimistic&&r.title===e.title);if(!(n>=0))if(s>=0){const r=[...t];r[s]=e,Xe(r),A()==="issues"&&ct()}else Xe([e,...t]),A()==="issues"&&ct(),$(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((i=In())==null?void 0:i.id)){const r=wt(),c=r.findIndex(d=>d.id===e.id),l=r.findIndex(d=>d._isOptimistic&&d.title===e.title);if(c===-1&&l===-1)Kt([e,...r]),A()==="my-issues"&&Cn();else if(l>=0){const d=[...r];d[l]=e,Kt(d),A()==="my-issues"&&Cn()}}A()==="my-issues"&&jt({showLoading:!1}),A()==="board"?It():A()==="sprints"&&ii(),A()==="issue-detail"&&e.parent_id===((a=oe())==null?void 0:a.id)&&G((o=oe())==null?void 0:o.id,!1)}function Af(e){const t=$e();t.some(s=>s.id===e.id)&&Xe(t.map(s=>s.id===e.id?e:s));const n=wt();if(n.some(s=>s.id===e.id)&&Kt(n.map(s=>s.id===e.id?e:s)),A()==="issues")ct();else if(A()==="my-issues")Cn(),jt({showLoading:!1});else if(A()==="board")It();else if(A()==="sprints")ii();else if(A()==="issue-detail"){const s=document.getElementById("issue-detail-content");s&&s.dataset.issueId===e.id&&G(e.id)}}function Bf(e){var t;Xe($e().filter(n=>n.id!==e.id)),Kt(wt().filter(n=>n.id!==e.id)),A()==="issues"?ct():A()==="my-issues"?(Cn(),jt({showLoading:!1})):A()==="board"?It():A()==="sprints"&&ii(),$(`Issue ${e.identifier} deleted`,"info"),A()==="issue-detail"&&((t=oe())==null?void 0:t.id)===e.id&&($(`Issue ${e.identifier} was deleted`,"warning"),M("my-issues"))}function jf(e){var t;A()==="my-issues"&&jt({showLoading:!1}),A()==="issue-detail"&&((t=oe())==null?void 0:t.id)===e.issue_id&&G(e.issue_id,!1)}function Mf(e){var t;if(A()==="issue-detail"){const n=(t=oe())==null?void 0:t.id;n&&(e.source_issue_id===n||e.target_issue_id===n)&&G(n,!1)}}function Df(e){var t;A()==="approvals"&&Dt(),A()==="issue-detail"&&((t=oe())==null?void 0:t.id)===e.issue_id&&G(e.issue_id,!1)}function Rf(e){var t;A()==="my-issues"&&jt({showLoading:!1}),A()==="issue-detail"&&((t=oe())==null?void 0:t.id)===e.issue_id&&G(e.issue_id,!1)}function Pf(e,{type:t}){ze().then(()=>{A()==="projects"&&Hn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?$(`New project: ${e.name}`,"info"):t==="deleted"&&$(`Project ${e.name} deleted`,"info")}function ii(){const e=Fp();e?qn(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):Nn().catch(t=>console.error("Failed to reload sprints:",t))}function Nf(){Hr(),A()==="sprints"?ii():A()==="my-issues"&&Vi()}const Al='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Bl(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const s=document.querySelector(".main-content");s&&(e?s.setAttribute("inert",""):s.removeAttribute("inert"))}function qf(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Bl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(Al);n&&n.focus()}}}function ai(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Bl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.querySelector(".sidebar");if(!t)return;const n=t.querySelectorAll(Al);if(n.length===0)return;const s=n[0],i=n[n.length-1];if(!t.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&ai()});async function Of(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=F();if(!s){$("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=X().find(l=>l.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Xe([r,...$e()]),ct();const c=document.querySelector(`[data-id="${a}"]`);c&&c.classList.add("new");try{const l=await h.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=$e(),p=d.findIndex(f=>f.id===a);p!==-1&&(d[p]=l,Xe(d)),ct(),ze(),$("Issue created!","success")}catch(l){Xe($e().filter(d=>d.id!==a)),ct(),_("create issue",l)}finally{t.disabled=!1,t.placeholder=i,t.focus()}}Xm({beforeNavigate:()=>{Pm(),Xr(null),vs(null),Uo(null),ai(),Ua()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return El(e[1]),!0;if(e[0]==="issue"&&e[1])return js(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(js(t)).then(s=>{s&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(Zf(e[1]),!0):e[0]==="sprint"&&e[1]?(Wp(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(el(e[1]),!0):!1},detailPopstate:e=>e.epicId?(_l(e.epicId,!1),!0):e.issueId?(G(e.issueId,!1),!0):e.identifier?(js(e.identifier),!0):e.documentId?(Ge(e.documentId,!1),!0):e.sprintId?(qn(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=ba();e&&X().some(t=>t.id===e)&&Fe(e)},issueNavigate:e=>js(e),epicNavigate:e=>El(e)}),Zm({"my-issues":()=>{Vi(),Ss(),jt()},approvals:()=>{Dt()},issues:()=>{eu(),su(),Jo().then(()=>{const e=new URLSearchParams(window.location.search),t=e.getAll("label");if(t.length>0){const s=document.getElementById("label-filter-dropdown");s&&(s.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=t.includes(a.value)}),$s())}const n=e.getAll("exclude_label");if(n.length>0){const s=document.getElementById("exclude-label-filter-dropdown");s&&(s.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=n.includes(a.value)}),Es())}}),nr().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}Bt()})},epics:()=>{qa()},board:()=>{Il()},projects:()=>{ze().then(Hn)},sprints:()=>{Nn()},rituals:()=>{cm()},documents:()=>{Dn()},team:()=>{dl(),vg(),Aa()},settings:()=>{Pa(),Ia()}});function Hf(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||R()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>R())}function Ff(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(i=>{i.addEventListener("click",()=>tl(i.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>Om());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>Hm()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([i,a])=>{const o=e.querySelector(`#${i} .btn-primary`);o&&o.addEventListener("click",()=>nl(a))})}function Uf(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Br("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Br("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>jr());const s=document.getElementById("doc-search");s&&s.addEventListener("input",()=>mp());const i=document.getElementById("doc-sort");i&&i.addEventListener("change",()=>Et())}function Gf(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>dr())}function zf(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>nu());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>Hd());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>Fd()),document.querySelectorAll(".multi-select-btn").forEach(v=>{const y=v.parentElement;y!=null&&y.querySelector("#status-filter-dropdown")?v.addEventListener("click",()=>_s("status-filter-dropdown")):y!=null&&y.querySelector("#priority-filter-dropdown")?v.addEventListener("click",()=>_s("priority-filter-dropdown")):y!=null&&y.querySelector("#label-filter-dropdown")?v.addEventListener("click",()=>_s("label-filter-dropdown")):y!=null&&y.querySelector("#exclude-label-filter-dropdown")&&v.addEventListener("click",()=>_s("exclude-label-filter-dropdown"))});const s=document.getElementById("status-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",()=>xs())});const v=s.querySelector(".btn-small");v&&v.addEventListener("click",()=>Hi())}const i=document.getElementById("priority-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",()=>Fi())});const v=i.querySelector(".btn-small");v&&v.addEventListener("click",()=>Ui())}const a=document.getElementById("label-filter-dropdown");if(a){const v=a.querySelector(".btn-small");v&&v.addEventListener("click",()=>Is())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const v=o.querySelector(".btn-small");v&&v.addEventListener("click",()=>Ts())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>je());const c=document.getElementById("assignee-filter");c&&c.addEventListener("change",()=>je());const l=document.getElementById("sprint-filter");l&&l.addEventListener("change",()=>je());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>Bt());const p=document.getElementById("group-by-select");p&&p.addEventListener("change",()=>ar());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",v=>Of(v))}function Wf(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>um(t.dataset.tab))})}function Vf(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>cl());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>An()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),M(o.dataset.view))})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>mg());const s=document.querySelector(".sidebar-backdrop");s&&s.addEventListener("click",()=>ai());const i=document.getElementById("hamburger-btn");i&&i.addEventListener("click",()=>qf());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>An())}J({"navigate-to":(e,t)=>{M(t.view)},"set-current-project":(e,t,n)=>{Fe(n.value)},showCreateIssueModal:()=>An(),showCreateEpicModal:()=>nf(),showCreateProjectModal:()=>Jr(),showCreateDocumentModal:()=>Dr(),showCreateTeamModal:()=>pl(),showEditTeamModal:()=>$g(),showInviteModal:()=>ul(),showCreateApiKeyModal:()=>Ug(),showCreateAgentModal:()=>ag(),resetOnboarding:()=>yl(),logout:()=>wl(),navigateToProjects:()=>M("projects")}),document.addEventListener("DOMContentLoaded",async()=>{if(Pd(),Hg(),Vf(),Hf(),Gf(),zf(),Wf(),Ff(),Uf(),Kf(),Yf(),yf({api:h}),eg(),Lf(),h.getToken())try{const e=await h.getMe();fs(e),await Kn()}catch{h.logout(),Da()}else Da()});function Kf(){const e=document.getElementById("theme-toggle");if(!e)return;const t=od()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),rd(n?"light":"dark")})}function Yf(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");ol(s)}}})}async function Zf(e){try{await Ge(e,!1)}catch{M("documents",!1)}}document.addEventListener("keydown",rf({getCurrentView:A,getSelectedIndex:Sd,setSelectedIndex:Oo,viewIssue:G,showEditIssueModal:Er,showInlineDropdown:Ki,isModalOpen:gs,isCommandPaletteOpen:Na})),document.addEventListener("keydown",lf({getCurrentView:A,getSelectedIndex:Ld,setSelectedIndex:Ho,viewDocument:Ge,showEditDocumentModal:Rr,isModalOpen:gs,isCommandPaletteOpen:Na})),document.addEventListener("keydown",af({closeModal:R,closeSidebar:ai,navigateTo:M,showCreateIssueModal:An,showKeyboardShortcutsHelp:$l,isModalOpen:gs,focusSearch:()=>{M("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),At()}})),Vg([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>M("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>M("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>M("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>M("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>M("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>M("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>M("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>M("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>M("approvals"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>M("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>M("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{M("issues"),setTimeout(An,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{M("projects"),setTimeout(Jr,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{M("documents"),setTimeout(Dr,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>pl(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{M("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{M("team"),setTimeout(ul,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>$l(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>yl(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>wl(),category:"Account"}]),document.addEventListener("keydown",of({isModalOpen:gs,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:Na,openCommandPalette:Kg,closeCommandPalette:ei})),window.marked=P,window.DOMPurify=Mo,console.log("Chaotic frontend loaded via Vite")})();
