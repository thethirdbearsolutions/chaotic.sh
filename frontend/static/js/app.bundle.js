var E_=Object.defineProperty;var __=(Ct,Be,pn)=>Be in Ct?E_(Ct,Be,{enumerable:!0,configurable:!0,writable:!0,value:pn}):Ct[Be]=pn;var X=(Ct,Be,pn)=>__(Ct,typeof Be!="symbol"?Be+"":Be,pn);(function(){"use strict";var ic;function Ct(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Be=Ct();function pn(e){Be=e}var xi={exec:()=>null};function W(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(De.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var De={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},ef=/^(?:[ \t]*(?:\n|$))+/,tf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,nf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ii=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,sf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ko=/(?:[*+-]|\d{1,9}[.)])/,yc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,bc=W(yc).replace(/bull/g,ko).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),af=W(yc).replace(/bull/g,ko).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Eo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,of=/^[^\n]+/,_o=/(?!\s*\])(?:\\.|[^\[\]\\])+/,rf=W(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",_o).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),lf=W(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ko).getRegex(),Ns="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",xo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,cf=W("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",xo).replace("tag",Ns).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),wc=W(Eo).replace("hr",Ii).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ns).getRegex(),df=W(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",wc).getRegex(),Io={blockquote:df,code:tf,def:rf,fences:nf,heading:sf,hr:Ii,html:cf,lheading:bc,list:lf,newline:ef,paragraph:wc,table:xi,text:of},$c=W("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ii).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ns).getRegex(),uf={...Io,lheading:af,table:$c,paragraph:W(Eo).replace("hr",Ii).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",$c).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ns).getRegex()},pf={...Io,html:W(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",xo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:xi,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:W(Eo).replace("hr",Ii).replace("heading",` *#{1,6} *[^
]`).replace("lheading",bc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},mf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ff=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,kc=/^( {2,}|\\)\n(?!\s*$)/,gf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Os=/[\p{P}\p{S}]/u,So=/[\s\p{P}\p{S}]/u,Ec=/[^\s\p{P}\p{S}]/u,hf=W(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,So).getRegex(),_c=/(?!~)[\p{P}\p{S}]/u,vf=/(?!~)[\s\p{P}\p{S}]/u,yf=/(?:[^\s\p{P}\p{S}]|~)/u,bf=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,xc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,wf=W(xc,"u").replace(/punct/g,Os).getRegex(),$f=W(xc,"u").replace(/punct/g,_c).getRegex(),Ic="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",kf=W(Ic,"gu").replace(/notPunctSpace/g,Ec).replace(/punctSpace/g,So).replace(/punct/g,Os).getRegex(),Ef=W(Ic,"gu").replace(/notPunctSpace/g,yf).replace(/punctSpace/g,vf).replace(/punct/g,_c).getRegex(),_f=W("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ec).replace(/punctSpace/g,So).replace(/punct/g,Os).getRegex(),xf=W(/\\(punct)/,"gu").replace(/punct/g,Os).getRegex(),If=W(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Sf=W(xo).replace("(?:-->|$)","-->").getRegex(),Tf=W("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Sf).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Hs=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Lf=W(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Hs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Sc=W(/^!?\[(label)\]\[(ref)\]/).replace("label",Hs).replace("ref",_o).getRegex(),Tc=W(/^!?\[(ref)\](?:\[\])?/).replace("ref",_o).getRegex(),Cf=W("reflink|nolink(?!\\()","g").replace("reflink",Sc).replace("nolink",Tc).getRegex(),To={_backpedal:xi,anyPunctuation:xf,autolink:If,blockSkip:bf,br:kc,code:ff,del:xi,emStrongLDelim:wf,emStrongRDelimAst:kf,emStrongRDelimUnd:_f,escape:mf,link:Lf,nolink:Tc,punctuation:hf,reflink:Sc,reflinkSearch:Cf,tag:Tf,text:gf,url:xi},Af={...To,link:W(/^!?\[(label)\]\((.*?)\)/).replace("label",Hs).getRegex(),reflink:W(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Hs).getRegex()},Lo={...To,emStrongRDelimAst:Ef,emStrongLDelim:$f,url:W(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Bf={...Lo,br:W(kc).replace("{2,}","*").getRegex(),text:W(Lo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Fs={normal:Io,gfm:uf,pedantic:pf},Si={normal:To,gfm:Lo,breaks:Bf,pedantic:Af},Df={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Lc=e=>Df[e];function vt(e,t){if(t){if(De.escapeTest.test(e))return e.replace(De.escapeReplace,Lc)}else if(De.escapeTestNoEncode.test(e))return e.replace(De.escapeReplaceNoEncode,Lc);return e}function Cc(e){try{e=encodeURI(e).replace(De.percentDecode,"%")}catch{return null}return e}function Ac(e,t){var a;const n=e.replace(De.findPipe,(o,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(De.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(De.slashPipe,"|");return i}function Ti(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function jf(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Bc(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function Mf(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var Us=class{constructor(e){X(this,"options");X(this,"rules");X(this,"lexer");this.options=e||Be}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Ti(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=Mf(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=Ti(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ti(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Ti(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),o=!0;else if(!o)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=u,n.length===0)break;const m=a.at(-1);if((m==null?void 0:m.type)==="code")break;if((m==null?void 0:m.type)==="blockquote"){const g=m,y=g.raw+`
`+n.join(`
`),w=this.blockquote(y);a[a.length-1]=w,i=i.substring(0,i.length-g.raw.length)+w.raw,s=s.substring(0,s.length-g.text.length)+w.text;break}else if((m==null?void 0:m.type)==="list"){const g=m,y=g.raw+`
`+n.join(`
`),w=this.list(y);a[a.length-1]=w,i=i.substring(0,i.length-m.raw.length)+w.raw,s=s.substring(0,s.length-g.raw.length)+w.raw,n=y.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let l=!1,c="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),m=e.split(`
`,1)[0],g=!u.trim(),y=0;if(this.options.pedantic?(y=2,d=u.trimStart()):g?y=t[1].length+1:(y=t[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,d=u.slice(y),y+=t[1].length),g&&this.rules.other.blankLine.test(m)&&(c+=m+`
`,e=e.substring(m.length+1),l=!0),!l){const S=this.rules.other.nextBulletRegex(y),x=this.rules.other.hrRegex(y),A=this.rules.other.fencesBeginRegex(y),B=this.rules.other.headingBeginRegex(y),Q=this.rules.other.htmlBeginRegex(y);for(;e;){const _=e.split(`
`,1)[0];let j;if(m=_,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),j=m):j=m.replace(this.rules.other.tabCharGlobal,"    "),A.test(m)||B.test(m)||Q.test(m)||S.test(m)||x.test(m))break;if(j.search(this.rules.other.nonSpaceChar)>=y||!m.trim())d+=`
`+j.slice(y);else{if(g||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||A.test(u)||B.test(u)||x.test(u))break;d+=`
`+m}!g&&!m.trim()&&(g=!0),c+=_+`
`,e=e.substring(_.length+1),u=j.slice(y)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let w=null,$;this.options.gfm&&(w=this.rules.other.listIsTask.exec(d),w&&($=w[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!w,checked:$,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(u=>u.type==="space"),d=c.length>0&&c.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Ac(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(Ac(r,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Ti(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=jf(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Bc(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Bc(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,l=a,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const u=[...i[0]][0].length,m=e.slice(0,a+i.index+u+r);if(Math.min(a,r)%2){const y=m.slice(1,-1);return{type:"em",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}const g=m.slice(2,-2);return{type:"strong",raw:m,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},At=class hc{constructor(t){X(this,"tokens");X(this,"options");X(this,"state");X(this,"tokenizer");X(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Be,this.options.tokenizer=this.options.tokenizer||new Us,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:De,block:Fs.normal,inline:Si.normal};this.options.pedantic?(n.block=Fs.pedantic,n.inline=Si.pedantic):this.options.gfm&&(n.block=Fs.gfm,this.options.breaks?n.inline=Si.breaks:n.inline=Si.gfm),this.tokenizer.rules=n}static get rules(){return{block:Fs,inline:Si}}static lex(t,n){return new hc(n).lex(t)}static lexInline(t,n){return new hc(n).inlineTokens(t)}lex(t){t=t.replace(De.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(De.tabCharGlobal,"    ").replace(De.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const d=t.slice(1);let u;this.options.extensions.startBlock.forEach(m=>{u=m.call({lexer:this},d),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(m=>(d=m.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const m=n.at(-1);d.type==="text"&&(m==null?void 0:m.type)==="text"?(m.raw+=d.raw,m.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let u=t;if((c=this.options.extensions)!=null&&c.startInline){let m=1/0;const g=t.slice(1);let y;this.options.extensions.startInline.forEach(w=>{y=w.call({lexer:this},g),typeof y=="number"&&y>=0&&(m=Math.min(m,y))}),m<1/0&&m>=0&&(u=t.substring(0,m+1))}if(d=this.tokenizer.inlineText(u)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const m=n.at(-1);(m==null?void 0:m.type)==="text"?(m.raw+=d.raw,m.text+=d.text):n.push(d);continue}if(t){const m="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(m);break}else throw new Error(m)}}return n}},Gs=class{constructor(e){X(this,"options");X(this,"parser");this.options=e||Be}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(De.notSpaceStart))==null?void 0:a[0],s=e.replace(De.endingNewline,"")+`
`;return i?'<pre><code class="language-'+vt(i)+'">'+(n?s:vt(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:vt(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let o=0;o<e.items.length;o++){const r=e.items[o];i+=this.listitem(r)}const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+vt(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const a=e.rows[s];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${vt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=Cc(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+vt(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=Cc(e);if(s===null)return vt(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${vt(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:vt(e.text)}},Co=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Bt=class vc{constructor(t){X(this,"options");X(this,"renderer");X(this,"textRenderer");this.options=t||Be,this.options.renderer=this.options.renderer||new Gs,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Co}static parse(t,n){return new vc(n).parse(t)}static parseInline(t,n){return new vc(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},zs=(ic=class{constructor(e){X(this,"options");X(this,"block");this.options=e||Be}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?At.lex:At.lexInline}provideParser(){return this.block?Bt.parse:Bt.parseInline}},X(ic,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),ic),Rf=class{constructor(...e){X(this,"defaults",Ct());X(this,"options",this.setOptions);X(this,"parse",this.parseMarkdown(!0));X(this,"parseInline",this.parseMarkdown(!1));X(this,"Parser",Bt);X(this,"Renderer",Gs);X(this,"TextRenderer",Co);X(this,"Lexer",At);X(this,"Tokenizer",Us);X(this,"Hooks",zs);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new Gs(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new Us(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new zs;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=s[o];zs.passThroughHooks.has(a)?s[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(u=>l.call(s,u));const d=r.call(s,c);return l.call(s,d)}:s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return At.lex(e,t??this.defaults)}parser(e,t){return Bt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?At.lex:At.lexInline,l=a.hooks?a.hooks.provideParser():e?Bt.parse:Bt.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>l(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let d=l(c,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+vt(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},mn=new Rf;function z(e,t){return mn.parse(e,t)}z.options=z.setOptions=function(e){return mn.setOptions(e),z.defaults=mn.defaults,pn(z.defaults),z},z.getDefaults=Ct,z.defaults=Be,z.use=function(...e){return mn.use(...e),z.defaults=mn.defaults,pn(z.defaults),z},z.walkTokens=function(e,t){return mn.walkTokens(e,t)},z.parseInline=mn.parseInline,z.Parser=Bt,z.parser=Bt.parse,z.Renderer=Gs,z.TextRenderer=Co,z.Lexer=At,z.lexer=At.lex,z.Tokenizer=Us,z.Hooks=zs,z.parse=z,z.options,z.setOptions,z.use,z.walkTokens,z.parseInline,Bt.parse,At.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Dc,setPrototypeOf:jc,isFrozen:Pf,getPrototypeOf:qf,getOwnPropertyDescriptor:Nf}=Object;let{freeze:je,seal:et,create:Ao}=Object,{apply:Bo,construct:Do}=typeof Reflect<"u"&&Reflect;je||(je=function(t){return t}),et||(et=function(t){return t}),Bo||(Bo=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),Do||(Do=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Vs=Re(Array.prototype.forEach),Of=Re(Array.prototype.lastIndexOf),Mc=Re(Array.prototype.pop),Li=Re(Array.prototype.push),Hf=Re(Array.prototype.splice),Ws=Re(String.prototype.toLowerCase),jo=Re(String.prototype.toString),Mo=Re(String.prototype.match),Ci=Re(String.prototype.replace),Ff=Re(String.prototype.indexOf),Uf=Re(String.prototype.trim),dt=Re(Object.prototype.hasOwnProperty),Me=Re(RegExp.prototype.test),Ai=Gf(TypeError);function Re(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return Bo(e,t,i)}}function Gf(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return Do(e,n)}}function O(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ws;jc&&jc(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(Pf(t)||(t[i]=a),s=a)}e[s]=!0}return e}function zf(e){for(let t=0;t<e.length;t++)dt(e,t)||(e[t]=null);return e}function yt(e){const t=Ao(null);for(const[n,i]of Dc(e))dt(e,n)&&(Array.isArray(i)?t[n]=zf(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=yt(i):t[n]=i);return t}function Bi(e,t){for(;e!==null;){const i=Nf(e,t);if(i){if(i.get)return Re(i.get);if(typeof i.value=="function")return Re(i.value)}e=qf(e)}function n(){return null}return n}const Rc=je(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ro=je(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Po=je(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Vf=je(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),qo=je(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Wf=je(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Pc=je(["#text"]),qc=je(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),No=je(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Nc=je(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ks=je(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Kf=et(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Yf=et(/<%[\w\W]*|[\w\W]*%>/gm),Zf=et(/\$\{[\w\W]*/gm),Qf=et(/^data-[\-\w.\u00B7-\uFFFF]+$/),Xf=et(/^aria-[\-\w]+$/),Oc=et(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Jf=et(/^(?:\w+script|data):/i),eg=et(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Hc=et(/^html$/i),tg=et(/^[a-z][.\w]*(-[.\w]+)+$/i);var Fc=Object.freeze({__proto__:null,ARIA_ATTR:Xf,ATTR_WHITESPACE:eg,CUSTOM_ELEMENT:tg,DATA_ATTR:Qf,DOCTYPE_NAME:Hc,ERB_EXPR:Yf,IS_ALLOWED_URI:Oc,IS_SCRIPT_OR_DATA:Jf,MUSTACHE_EXPR:Kf,TMPLIT_EXPR:Zf});const Di={element:1,text:3,progressingInstruction:7,comment:8,document:9},ng=function(){return typeof window>"u"?null:window},ig=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Uc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Gc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ng();const t=D=>Gc(D);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Di.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:m,trustedTypes:g}=e,y=l.prototype,w=Bi(y,"cloneNode"),$=Bi(y,"remove"),S=Bi(y,"nextSibling"),x=Bi(y,"childNodes"),A=Bi(y,"parentNode");if(typeof o=="function"){const D=n.createElement("template");D.content&&D.content.ownerDocument&&(n=D.content.ownerDocument)}let B,Q="";const{implementation:_,createNodeIterator:j,createDocumentFragment:G,getElementsByTagName:se}=n,{importNode:pe}=i;let K=Uc();t.isSupported=typeof Dc=="function"&&typeof A=="function"&&_&&_.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:ue,ERB_EXPR:oe,TMPLIT_EXPR:Ee,DATA_ATTR:Xe,ARIA_ATTR:Ke,IS_SCRIPT_OR_DATA:Ue,ATTR_WHITESPACE:ht,CUSTOM_ELEMENT:Ut}=Fc;let{IS_ALLOWED_URI:Je}=Fc,ce=null;const b=O({},[...Rc,...Ro,...Po,...qo,...Pc]);let F=null;const Ce=O({},[...qc,...No,...Nc,...Ks]);let re=Object.seal(Ao(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ct=null,sc=null;const yi=Object.seal(Ao(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let jm=!0,ac=!0,Mm=!1,Rm=!0,bi=!1,go=!0,Cn=!1,oc=!1,rc=!1,wi=!1,ho=!1,vo=!1,Pm=!0,qm=!1;const g_="user-content-";let lc=!0,Ps=!1,$i={},Tt=null;const cc=O({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Nm=null;const Om=O({},["audio","video","img","source","image","track"]);let dc=null;const Hm=O({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),yo="http://www.w3.org/1998/Math/MathML",bo="http://www.w3.org/2000/svg",Gt="http://www.w3.org/1999/xhtml";let ki=Gt,uc=!1,pc=null;const h_=O({},[yo,bo,Gt],jo);let wo=O({},["mi","mo","mn","ms","mtext"]),$o=O({},["annotation-xml"]);const v_=O({},["title","style","font","a","script"]);let qs=null;const y_=["application/xhtml+xml","text/html"],b_="text/html";let ve=null,Ei=null;const w_=n.createElement("form"),Fm=function(h){return h instanceof RegExp||h instanceof Function},mc=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ei&&Ei===h)){if((!h||typeof h!="object")&&(h={}),h=yt(h),qs=y_.indexOf(h.PARSER_MEDIA_TYPE)===-1?b_:h.PARSER_MEDIA_TYPE,ve=qs==="application/xhtml+xml"?jo:Ws,ce=dt(h,"ALLOWED_TAGS")?O({},h.ALLOWED_TAGS,ve):b,F=dt(h,"ALLOWED_ATTR")?O({},h.ALLOWED_ATTR,ve):Ce,pc=dt(h,"ALLOWED_NAMESPACES")?O({},h.ALLOWED_NAMESPACES,jo):h_,dc=dt(h,"ADD_URI_SAFE_ATTR")?O(yt(Hm),h.ADD_URI_SAFE_ATTR,ve):Hm,Nm=dt(h,"ADD_DATA_URI_TAGS")?O(yt(Om),h.ADD_DATA_URI_TAGS,ve):Om,Tt=dt(h,"FORBID_CONTENTS")?O({},h.FORBID_CONTENTS,ve):cc,ct=dt(h,"FORBID_TAGS")?O({},h.FORBID_TAGS,ve):yt({}),sc=dt(h,"FORBID_ATTR")?O({},h.FORBID_ATTR,ve):yt({}),$i=dt(h,"USE_PROFILES")?h.USE_PROFILES:!1,jm=h.ALLOW_ARIA_ATTR!==!1,ac=h.ALLOW_DATA_ATTR!==!1,Mm=h.ALLOW_UNKNOWN_PROTOCOLS||!1,Rm=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,bi=h.SAFE_FOR_TEMPLATES||!1,go=h.SAFE_FOR_XML!==!1,Cn=h.WHOLE_DOCUMENT||!1,wi=h.RETURN_DOM||!1,ho=h.RETURN_DOM_FRAGMENT||!1,vo=h.RETURN_TRUSTED_TYPE||!1,rc=h.FORCE_BODY||!1,Pm=h.SANITIZE_DOM!==!1,qm=h.SANITIZE_NAMED_PROPS||!1,lc=h.KEEP_CONTENT!==!1,Ps=h.IN_PLACE||!1,Je=h.ALLOWED_URI_REGEXP||Oc,ki=h.NAMESPACE||Gt,wo=h.MATHML_TEXT_INTEGRATION_POINTS||wo,$o=h.HTML_INTEGRATION_POINTS||$o,re=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&Fm(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(re.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&Fm(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(re.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(re.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),bi&&(ac=!1),ho&&(wi=!0),$i&&(ce=O({},Pc),F=[],$i.html===!0&&(O(ce,Rc),O(F,qc)),$i.svg===!0&&(O(ce,Ro),O(F,No),O(F,Ks)),$i.svgFilters===!0&&(O(ce,Po),O(F,No),O(F,Ks)),$i.mathMl===!0&&(O(ce,qo),O(F,Nc),O(F,Ks))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?yi.tagCheck=h.ADD_TAGS:(ce===b&&(ce=yt(ce)),O(ce,h.ADD_TAGS,ve))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?yi.attributeCheck=h.ADD_ATTR:(F===Ce&&(F=yt(F)),O(F,h.ADD_ATTR,ve))),h.ADD_URI_SAFE_ATTR&&O(dc,h.ADD_URI_SAFE_ATTR,ve),h.FORBID_CONTENTS&&(Tt===cc&&(Tt=yt(Tt)),O(Tt,h.FORBID_CONTENTS,ve)),h.ADD_FORBID_CONTENTS&&(Tt===cc&&(Tt=yt(Tt)),O(Tt,h.ADD_FORBID_CONTENTS,ve)),lc&&(ce["#text"]=!0),Cn&&O(ce,["html","head","body"]),ce.table&&(O(ce,["tbody"]),delete ct.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ai('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ai('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');B=h.TRUSTED_TYPES_POLICY,Q=B.createHTML("")}else B===void 0&&(B=ig(g,s)),B!==null&&typeof Q=="string"&&(Q=B.createHTML(""));je&&je(h),Ei=h}},Um=O({},[...Ro,...Po,...Vf]),Gm=O({},[...qo,...Wf]),$_=function(h){let I=A(h);(!I||!I.tagName)&&(I={namespaceURI:ki,tagName:"template"});const C=Ws(h.tagName),le=Ws(I.tagName);return pc[h.namespaceURI]?h.namespaceURI===bo?I.namespaceURI===Gt?C==="svg":I.namespaceURI===yo?C==="svg"&&(le==="annotation-xml"||wo[le]):!!Um[C]:h.namespaceURI===yo?I.namespaceURI===Gt?C==="math":I.namespaceURI===bo?C==="math"&&$o[le]:!!Gm[C]:h.namespaceURI===Gt?I.namespaceURI===bo&&!$o[le]||I.namespaceURI===yo&&!wo[le]?!1:!Gm[C]&&(v_[C]||!Um[C]):!!(qs==="application/xhtml+xml"&&pc[h.namespaceURI]):!1},Lt=function(h){Li(t.removed,{element:h});try{A(h).removeChild(h)}catch{$(h)}},An=function(h,I){try{Li(t.removed,{attribute:I.getAttributeNode(h),from:I})}catch{Li(t.removed,{attribute:null,from:I})}if(I.removeAttribute(h),h==="is")if(wi||ho)try{Lt(I)}catch{}else try{I.setAttribute(h,"")}catch{}},zm=function(h){let I=null,C=null;if(rc)h="<remove></remove>"+h;else{const me=Mo(h,/^[\r\n\t ]+/);C=me&&me[0]}qs==="application/xhtml+xml"&&ki===Gt&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");const le=B?B.createHTML(h):h;if(ki===Gt)try{I=new m().parseFromString(le,qs)}catch{}if(!I||!I.documentElement){I=_.createDocument(ki,"template",null);try{I.documentElement.innerHTML=uc?Q:le}catch{}}const Ae=I.body||I.documentElement;return h&&C&&Ae.insertBefore(n.createTextNode(C),Ae.childNodes[0]||null),ki===Gt?se.call(I,Cn?"html":"body")[0]:Cn?I.documentElement:Ae},Vm=function(h){return j.call(h.ownerDocument||h,h,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},fc=function(h){return h instanceof u&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof d)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},Wm=function(h){return typeof r=="function"&&h instanceof r};function zt(D,h,I){Vs(D,C=>{C.call(t,h,I,Ei)})}const Km=function(h){let I=null;if(zt(K.beforeSanitizeElements,h,null),fc(h))return Lt(h),!0;const C=ve(h.nodeName);if(zt(K.uponSanitizeElement,h,{tagName:C,allowedTags:ce}),go&&h.hasChildNodes()&&!Wm(h.firstElementChild)&&Me(/<[/\w!]/g,h.innerHTML)&&Me(/<[/\w!]/g,h.textContent)||h.nodeType===Di.progressingInstruction||go&&h.nodeType===Di.comment&&Me(/<[/\w]/g,h.data))return Lt(h),!0;if(!(yi.tagCheck instanceof Function&&yi.tagCheck(C))&&(!ce[C]||ct[C])){if(!ct[C]&&Zm(C)&&(re.tagNameCheck instanceof RegExp&&Me(re.tagNameCheck,C)||re.tagNameCheck instanceof Function&&re.tagNameCheck(C)))return!1;if(lc&&!Tt[C]){const le=A(h)||h.parentNode,Ae=x(h)||h.childNodes;if(Ae&&le){const me=Ae.length;for(let Ye=me-1;Ye>=0;--Ye){const Vt=w(Ae[Ye],!0);Vt.__removalCount=(h.__removalCount||0)+1,le.insertBefore(Vt,S(h))}}}return Lt(h),!0}return h instanceof l&&!$_(h)||(C==="noscript"||C==="noembed"||C==="noframes")&&Me(/<\/no(script|embed|frames)/i,h.innerHTML)?(Lt(h),!0):(bi&&h.nodeType===Di.text&&(I=h.textContent,Vs([ue,oe,Ee],le=>{I=Ci(I,le," ")}),h.textContent!==I&&(Li(t.removed,{element:h.cloneNode()}),h.textContent=I)),zt(K.afterSanitizeElements,h,null),!1)},Ym=function(h,I,C){if(Pm&&(I==="id"||I==="name")&&(C in n||C in w_))return!1;if(!(ac&&!sc[I]&&Me(Xe,I))){if(!(jm&&Me(Ke,I))){if(!(yi.attributeCheck instanceof Function&&yi.attributeCheck(I,h))){if(!F[I]||sc[I]){if(!(Zm(h)&&(re.tagNameCheck instanceof RegExp&&Me(re.tagNameCheck,h)||re.tagNameCheck instanceof Function&&re.tagNameCheck(h))&&(re.attributeNameCheck instanceof RegExp&&Me(re.attributeNameCheck,I)||re.attributeNameCheck instanceof Function&&re.attributeNameCheck(I,h))||I==="is"&&re.allowCustomizedBuiltInElements&&(re.tagNameCheck instanceof RegExp&&Me(re.tagNameCheck,C)||re.tagNameCheck instanceof Function&&re.tagNameCheck(C))))return!1}else if(!dc[I]){if(!Me(Je,Ci(C,ht,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&h!=="script"&&Ff(C,"data:")===0&&Nm[h])){if(!(Mm&&!Me(Ue,Ci(C,ht,"")))){if(C)return!1}}}}}}}return!0},Zm=function(h){return h!=="annotation-xml"&&Mo(h,Ut)},Qm=function(h){zt(K.beforeSanitizeAttributes,h,null);const{attributes:I}=h;if(!I||fc(h))return;const C={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:F,forceKeepAttr:void 0};let le=I.length;for(;le--;){const Ae=I[le],{name:me,namespaceURI:Ye,value:Vt}=Ae,_i=ve(me),gc=Vt;let _e=me==="value"?gc:Uf(gc);if(C.attrName=_i,C.attrValue=_e,C.keepAttr=!0,C.forceKeepAttr=void 0,zt(K.uponSanitizeAttribute,h,C),_e=C.attrValue,qm&&(_i==="id"||_i==="name")&&(An(me,h),_e=g_+_e),go&&Me(/((--!?|])>)|<\/(style|title|textarea)/i,_e)){An(me,h);continue}if(_i==="attributename"&&Mo(_e,"href")){An(me,h);continue}if(C.forceKeepAttr)continue;if(!C.keepAttr){An(me,h);continue}if(!Rm&&Me(/\/>/i,_e)){An(me,h);continue}bi&&Vs([ue,oe,Ee],Jm=>{_e=Ci(_e,Jm," ")});const Xm=ve(h.nodeName);if(!Ym(Xm,_i,_e)){An(me,h);continue}if(B&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!Ye)switch(g.getAttributeType(Xm,_i)){case"TrustedHTML":{_e=B.createHTML(_e);break}case"TrustedScriptURL":{_e=B.createScriptURL(_e);break}}if(_e!==gc)try{Ye?h.setAttributeNS(Ye,me,_e):h.setAttribute(me,_e),fc(h)?Lt(h):Mc(t.removed)}catch{An(me,h)}}zt(K.afterSanitizeAttributes,h,null)},k_=function D(h){let I=null;const C=Vm(h);for(zt(K.beforeSanitizeShadowDOM,h,null);I=C.nextNode();)zt(K.uponSanitizeShadowNode,I,null),Km(I),Qm(I),I.content instanceof a&&D(I.content);zt(K.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(D){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,C=null,le=null,Ae=null;if(uc=!D,uc&&(D="<!-->"),typeof D!="string"&&!Wm(D))if(typeof D.toString=="function"){if(D=D.toString(),typeof D!="string")throw Ai("dirty is not a string, aborting")}else throw Ai("toString is not a function");if(!t.isSupported)return D;if(oc||mc(h),t.removed=[],typeof D=="string"&&(Ps=!1),Ps){if(D.nodeName){const Vt=ve(D.nodeName);if(!ce[Vt]||ct[Vt])throw Ai("root node is forbidden and cannot be sanitized in-place")}}else if(D instanceof r)I=zm("<!---->"),C=I.ownerDocument.importNode(D,!0),C.nodeType===Di.element&&C.nodeName==="BODY"||C.nodeName==="HTML"?I=C:I.appendChild(C);else{if(!wi&&!bi&&!Cn&&D.indexOf("<")===-1)return B&&vo?B.createHTML(D):D;if(I=zm(D),!I)return wi?null:vo?Q:""}I&&rc&&Lt(I.firstChild);const me=Vm(Ps?D:I);for(;le=me.nextNode();)Km(le),Qm(le),le.content instanceof a&&k_(le.content);if(Ps)return D;if(wi){if(ho)for(Ae=G.call(I.ownerDocument);I.firstChild;)Ae.appendChild(I.firstChild);else Ae=I;return(F.shadowroot||F.shadowrootmode)&&(Ae=pe.call(i,Ae,!0)),Ae}let Ye=Cn?I.outerHTML:I.innerHTML;return Cn&&ce["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&Me(Hc,I.ownerDocument.doctype.name)&&(Ye="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+Ye),bi&&Vs([ue,oe,Ee],Vt=>{Ye=Ci(Ye,Vt," ")}),B&&vo?B.createHTML(Ye):Ye},t.setConfig=function(){let D=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};mc(D),oc=!0},t.clearConfig=function(){Ei=null,oc=!1},t.isValidAttribute=function(D,h,I){Ei||mc({});const C=ve(D),le=ve(h);return Ym(C,le,I)},t.addHook=function(D,h){typeof h=="function"&&Li(K[D],h)},t.removeHook=function(D,h){if(h!==void 0){const I=Of(K[D],h);return I===-1?void 0:Hf(K[D],I,1)[0]}return Mc(K[D])},t.removeHooks=function(D){K[D]=[]},t.removeAllHooks=function(){K=Uc()},t}var zc=Gc();const Oo="chaotic_";function Ge(e){try{return localStorage.getItem(Oo+e)}catch{return null}}function tt(e,t){try{localStorage.setItem(Oo+e,t)}catch{}}function bt(e){try{localStorage.removeItem(Oo+e)}catch{}}function Vc(){return Ge("token")}function sg(e){e?tt("token",e):bt("token")}function ag(){return Ge("theme")}function og(e){tt("theme",e)}function Wc(){return Ge("last_project")}function rg(e){tt("last_project",e)}function lg(){return Ge("onboarding_complete")==="true"}function cg(){tt("onboarding_complete","true")}function dg(){bt("onboarding_complete")}function ug(e){return e?Ge(`issues_filters_${e}`):null}function pg(e,t){e&&(t?tt(`issues_filters_${e}`,t):bt(`issues_filters_${e}`))}function Kc(e){return Ge(`comment_draft_${e}`)}function Ys(e,t){t?tt(`comment_draft_${e}`,t):bt(`comment_draft_${e}`)}function Yc(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function Zs(e){const t=Ge(`description_draft_${e}`);if(!t)return null;const n=Yc(t);return n?n.draft:t}function Zc(e){const t=Ge(`description_draft_${e}`);if(!t)return null;const n=Yc(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function fn(e,t,n=""){t?tt(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):bt(`description_draft_${e}`)}function Qc(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function Xc(e){var n;const t=Ge(`document_draft_${e}`);return t?((n=Qc(t))==null?void 0:n.draft)??null:null}function mg(e){const t=Ge(`document_draft_${e}`);if(!t)return null;const n=Qc(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function Qs(e,t,n=null){t&&(t.title||t.content||t.icon)?tt(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):bt(`document_draft_${e}`)}function fg(){return{title:Ge("create_issue_title"),description:Ge("create_issue_description")}}function Jc(e,t){e?tt("create_issue_title",e):bt("create_issue_title"),t?tt("create_issue_description",t):bt("create_issue_description")}function gg(){bt("create_issue_title"),bt("create_issue_description")}function hg(){return Ge("doc_view_mode")}function vg(e){tt("doc_view_mode",e)}function yg(){return Ge("approvals_explainer_dismissed")==="1"}function bg(){tt("approvals_explainer_dismissed","1")}const wg="/api";class $g{constructor(){this.token=Vc()}setToken(t){this.token=t,sg(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s};i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(i));let o;try{o=await fetch(`${wg}${n}`,a)}catch(l){const c=new Error("Network error - check your connection");throw c.isNetworkError=!0,c.cause=l,c}if(o.status===204)return null;let r;try{r=await o.json()}catch{const l=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${l})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let l;typeof r.detail=="string"?l=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?l=r.detail.message:l="An error occurred";const c=new Error(l);throw c.status=o.status,c.detail=r.detail,c}return r}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:a=null,skip:o=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),a&&c.set("order",a),c.set("skip",String(o)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/teams/${t}/agents`,a)}async createProjectAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/projects/${t}/agents`,a)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const v=new $g;let Bn=null;const kg='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Dn=null,ji=!1;function Ho(){ji=!0}function Eg(){ji=!1}function ed(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function _g(){if(ji)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function U(){Dn=document.activeElement,ji=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function P(){var e;Dt(),ji=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Dn&&document.contains(Dn)&&typeof Dn.focus=="function"&&Dn.focus(),Dn=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(kg);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function nt(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function k(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),u=setTimeout(o,l);return a.addEventListener("click",()=>{clearTimeout(u),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(u),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),u=setTimeout(o,Math.max(c,500))}),i}function Fo(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=k(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function xg(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function E(e,t){const n=xg(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";k(`Failed to ${e}: ${n}${i}`,"error")}function Dt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Bn&&(document.removeEventListener("keydown",Bn),Bn=null)}function Ig(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));Dt(),t&&nt()&&ed()}function Mi(e){Bn&&document.removeEventListener("keydown",Bn),Bn=e,e&&document.addEventListener("keydown",e)}function Ri(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(Dt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function ye(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Pe(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ze(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function J(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function f(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function p(e){return f(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Sg(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function it(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function wt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}function Tg(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function jn(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?Tg(i)?`<img class="${t} avatar-img" src="${p(i)}" alt="${p(n)}">`:`<div class="${t} avatar-emoji">${f(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function Uo(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${p(n)}">agent</span>`}function Mn(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${p(i)}">${f(n)}</span>`}return Uo(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let te={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const Go=new Set;function de(e,t){if(typeof e=="string"){const n=te[e];te[e]=t,td(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=te[i];te[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{td(i,s,a)})}}function ut(e){return Go.add(e),()=>Go.delete(e)}function td(e,t,n){t!==n&&Go.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const $t=()=>te.currentUser,Rn=e=>de("currentUser",e),T=()=>te.currentView,zo=e=>de("currentView",e),Y=()=>te.issues,ze=e=>de("issues",e),Pi=()=>te.detailNavContext,Wt=e=>de("detailNavContext",e),nd=()=>te.labels,Xs=e=>de("labels",e),id=()=>te.activeFilterCategory,Lg=e=>de("activeFilterCategory",e),sd=()=>te.selectedIssueIndex,gn=e=>de("selectedIssueIndex",e),Cg=()=>te.selectedDocIndex,ad=e=>de("selectedDocIndex",e),od=()=>te.selectedBoardIndex,Js=e=>de("selectedBoardIndex",e),Ag=()=>te.selectedInboxIndex,ea=e=>de("selectedInboxIndex",e),Bg=()=>te.selectedSprintIndex,rd=e=>de("selectedSprintIndex",e),Dg=()=>te.selectedEpicIndex,Vo=e=>de("selectedEpicIndex",e),jg=()=>te.pendingGates,Mg=e=>de("pendingGates",e),fe=()=>te.inboxEntries,jt=e=>de("inboxEntries",e),ta=()=>te.inboxUnreadCount,qi=e=>de("inboxUnreadCount",e),Rg=()=>te.searchDebounceTimer,Pg=e=>de("searchDebounceTimer",e),qg=()=>te.websocket,Wo=e=>de("websocket",e),L=()=>te.currentTeam,Ni=e=>de("currentTeam",e),V=()=>te.currentProject,st=e=>de("currentProject",e||null),be=()=>te.currentDetailIssue,Pn=e=>de("currentDetailIssue",e),Ng=()=>te.currentDetailSprints,ld=e=>de("currentDetailSprints",e),Ko={};function ee(e){Object.assign(Ko,e)}function Og(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=Ko[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let cd=!1;function Hg(){if(!cd){cd=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,Og);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=Ko[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const Yo=["backlog","todo","in_progress","in_review","done","canceled"],Oi=["backlog","todo","in_progress","in_review"],dd=["urgent","high","medium","low","no_priority"],Zo=["no_priority","urgent","high","medium","low"],ud=["backlog","todo","in_progress","in_review","done"],na="#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row";function q({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${p(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${p(r)}="${p(l)}"`).join(""):""}>${f(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${f(t)}</h3>
            <p>${f(n)}</p>
            ${a}
        </div>
    `}const M={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},pd=24,at=new Map,we=new Map,Mt=new Map;let Rt=null;function Fg(e){return Array.isArray(e)?[...e].map(String).sort():e}function md(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,Fg(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function Qo(e,t){for(we.delete(e),we.set(e,t);we.size>pd;){const n=we.keys().next().value;we.delete(n)}fd()}function fd(){if(at.size===0)return;const e=new Set;we.forEach(t=>t.ids.forEach(n=>e.add(n))),at.forEach((t,n)=>{e.has(n)||at.delete(n)})}function Ug(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function gd(e){const t=we.get(e);return t?(Qo(e,t),t.ids.map(n=>at.get(n)).filter(Boolean)):null}function Xo(e){return at.get(e)}function Gg(e){var t;return((t=we.get(e))==null?void 0:t.meta)||{}}function hd(e,t){if(!e||!t)return!1;const n=Date.parse(e),i=Date.parse(t);return Number.isNaN(n)||Number.isNaN(i)?e>t:n>i}function vd(e){const t=at.get(e.id);if(!hd(t==null?void 0:t.updated_at,e.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){at.set(e.id,{...e,description:t.description});return}at.set(e.id,e)}}function yd(e,t,n){if(!Array.isArray(t))return;const i=Ug(t);i.forEach(vd);const s=we.get(e);Qo(e,{ids:i.map(a=>a.id),meta:n??(s==null?void 0:s.meta)??{}})}function zg(e,t){const n=we.get(e);n&&(n.meta=t)}function ia(e){e!=null&&e.id&&at.has(e.id)&&vd(e)}function Vg(e){we.delete(e),Mt.forEach((t,n)=>{t===e&&Mt.delete(n)}),Rt===e&&(Rt=null),fd()}function Wg(e){at.delete(e),we.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function sa(e){Rt=e}function Kg(){return Rt}function Yg(e,t){for(Mt.delete(e),Mt.set(e,t);Mt.size>pd;)Mt.delete(Mt.keys().next().value)}function Zg(e){const t=Mt.get(e);return t&&we.has(t)?t:null}function bd(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function wd(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(bd(e[n])!==bd(t[n]))return!1;return!0}const $d=["status","priority"],kd=["assignee_id","sprint_id","issue_type"],Qg={assignee_id:"unassigned",sprint_id:"no_sprint"},Xg=["scope","project_id","sort_by","order","limit"],hn=e=>(e||[]).map(t=>String(t).toLowerCase());function Jg(e,t){if(e.search||t.search||t.sort_by==="random"||Xg.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of $d)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of kd)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=hn(e.label);if(!hn(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=hn(t.exclude_label);if(!hn(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function Ed(e){const t=e.label===void 0?null:hn(e.label),n=e.exclude_label===void 0?null:hn(e.exclude_label);return i=>{for(const s of $d)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of kd){if(e[s]===void 0)continue;const a=e[s]===Qg[s]?null:e[s];if((i[s]??null)!==a)return!1}if(t||n){const s=hn((i.labels||[]).map(a=>a.name));if(t&&!t.some(a=>s.includes(a))||n&&n.some(a=>s.includes(a)))return!1}return!0}}function eh(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(md(e)));let n=null,i=null;if(we.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let c;try{c=Object.fromEntries(JSON.parse(l))}catch{return}Jg(c,t)&&(n=r,i=l)}),!n)return null;Qo(i,n);const s=Ed(t),a=n.ids.map(r=>at.get(r)).filter(r=>r&&s(r)),o=t.limit;return{rows:a,complete:!(typeof o=="number"&&n.ids.length>=o)}}function th(){at.clear(),we.clear(),Mt.clear(),Rt=null}ut((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&th();return}if(e!=="issues"||Rt===null||!we.has(Rt)||T()!=="issues")return;const i=we.get(Rt);yd(Rt,Y(),i.meta)});let Jo=[];function nh(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function ih(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function aa(e,t){const n=e().map(nh),i=t().map(ih);Jo=[...n,...i]}function Kt(e){return e&&Jo.find(t=>t.id===e)||null}function Yt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function er(e,t=!1){const n=f(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${f(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function oa({includeIdle:e=!1,keepId:t=null}={}){const n=Jo.filter(y=>e||!y.idle||y.id===t),i=n.filter(y=>!y.is_agent),s=new Set(i.map(y=>y.id)),a=n.filter(y=>y.is_agent),o=new Set(a.map(y=>y.id)),r=(y,w)=>y.name.localeCompare(w.name),l=y=>y.registered_by_id&&o.has(y.registered_by_id),c=new Map,d=new Map;a.forEach(y=>{const[w,$]=l(y)?[c,y.registered_by_id]:[d,y.parent_user_id];w.has($)||w.set($,[]),w.get($).push(y)});const u=[],m=(y,w)=>{u.push({assignee:y,indent:w}),(c.get(y.id)||[]).sort(r).forEach(S=>u.push({assignee:S,indent:2}))};return i.forEach(y=>{u.push({assignee:y,indent:!1}),(d.get(y.id)||[]).sort(r).forEach(w=>m(w,!0))}),a.filter(y=>!l(y)&&!s.has(y.parent_user_id)).sort(r).forEach(y=>m(y,!1)),u}function Hi({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;oa({keepId:n}).forEach(({assignee:s,indent:a})=>{i+=`<option value="${s.id}">${er(s,a)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function sh(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&Kt(e)&&Hi({keepId:e}),t.value=e}let qn=[],tr=[];ut(e=>{e==="currentProject"&&T()==="my-issues"&&(Nn(),Ui(),On())});function Ve(){return qn}function vn(e){qn=e}let nr=0;async function Nn(){var a;const e=L(),t=$t();if(!e||!t)return;const n=++nr,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=V();oh();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await v.getIssues({...o,project_id:s}):r=await v.getTeamIssues(e.id,o),n!==nr)return;qn=r,T()==="my-issues"&&Wt(qn),Fi()}catch(o){if(n!==nr)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=q({icon:M.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),E("load issues",o)}}async function On({showLoading:e=!0}={}){const t=L();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=V();tr=await v.getTeamActivities(t.id,0,10,{projectId:i}),ah()}catch{n&&(n.innerHTML=q({icon:M.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function ah(){const e=document.getElementById("dashboard-activity-list");if(e){if(!tr.length){e.innerHTML=q({icon:M.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=tr.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${p(t.issue_identifier)}"><strong>${f(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const i=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${p(t.document_id)}"><strong>${i} ${f(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${f(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${kr(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${_r(t)}${n}</span>
                <span class="activity-actor">by ${f(Er(t))}</span>
                <span class="activity-time">${it(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function oh(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function _d(){Nn()}function Fi(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),qn.length===0){e.innerHTML=q({icon:M.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}e.innerHTML=qn.map(t=>Yn(t)).join("")}}let ir=0;async function Ui(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++ir,n=V(),i=Z(),s=n?i.filter(a=>a.id===n):i;if(!s.length){e.innerHTML="";return}try{const a=s.map(async r=>{try{const l=await v.getCurrentSprint(r.id);if(!l)return null;let c={};try{const d=await v.getIssues({sprint_id:l.id,project_id:r.id,limit:500});for(const u of d)c[u.status]=(c[u.status]||0)+1}catch(d){console.error(`Failed to load issue counts for sprint ${l.id}:`,d)}return{project:r,sprint:l,statusCounts:c}}catch(l){return console.error(`Failed to load current sprint for project ${r.id}:`,l),null}}),o=(await Promise.all(a)).filter(Boolean);if(t!==ir)return;rh(o)}catch(a){if(t!==ir)return;console.error("Failed to load sprint status:",a),e.innerHTML=q({icon:M.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}function rh(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
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
                                    ${n.filter(g=>u[g]).map(g=>{const y=Math.round(u[g]/m*100);return`<div class="sprint-stacked-segment status-${g}" style="width: ${y}%" title="${ye(g)}: ${u[g]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(g=>u[g]).map(g=>`<span class="sprint-count-label status-${g}">${u[g]} ${ye(g)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}ee({"filter-my-issues":()=>_d(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),gp(t.identifier)},"retry-load-my-issues":()=>Nn(),"retry-load-sprint-status":()=>Ui()});const xd=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Gi(e=null){const t=e||V()||"";Od([]);const n=Z().map(o=>`
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
                        ${Ie("backlog")}
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
                                ${xd.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
    `,U(),ua();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=fg();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{Jc(i.value,s.value)}),s.addEventListener("input",()=>{Jc(i.value,s.value)}),i.focus()}function lh(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function ch(e){const t=xd.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function Id(e,t){const n=Z().find(i=>i.id===t);Od([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
                        ${Ie("backlog")}
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
                <button type="button" class="btn btn-primary" data-action="create-sub-issue-submit" data-parent-id="${p(e)}" data-project-id="${p(t)}">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,U(),ua(),document.getElementById("create-issue-title").focus()}async function dh(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){k("Please enter a title","error");return}try{const d=await v.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:Nd(),parent_id:e});P(),k(`Created sub-issue ${d.identifier}`,"success"),ne(e)}catch(d){E("create sub-issue",d)}}async function uh(e,t,n){var o,r;Dt();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${ud.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${p(ye(c))}">
                    ${Ie(c)}
                    <span>${ye(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${Zo.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${p(Pe(c))}">
                    ${pt(c)}
                    <span>${Pe(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${p(wt(c))}">
                    <span class="issue-type-badge type-${c}">${wt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!L())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=nd(),c=!1;if(l.length===0)try{l=await v.getLabels(L().id),Xs(l)}catch(d){console.error("Failed to load labels:",d),c=!0}rr(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Ri(a,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=oa({keepId:l});a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:u})=>{const m=Yt(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${p(d.id)}" data-label="${p(m)}">
                    ${jn(d,"avatar-small")}
                    <span>${er(d,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=ni(c);a.innerHTML=`
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
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Ri(a)}function ph(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function mh(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,Ho();const i=f(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${Ie(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${pt(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${wt(t)}</span><span id="create-issue-type-label">${i}</span>`)}Dt(),s==null||s.focus()}async function Sd({keepOpen:e=!1}={}){var w,$;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((w=document.getElementById("create-issue-sprint"))==null?void 0:w.value)||null,u=($=document.getElementById("create-issue-due-date"))==null?void 0:$.value,m=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),y=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),y&&(y.disabled=!0);try{const S=await v.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:d,label_ids:Nd(),due_date:m});k(`Created ${S.identifier}`,"success"),gg(),T()==="issues"?Et():T()==="my-issues"&&Nn(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",Eg(),document.getElementById("create-issue-title").focus()):(P(),ne(S.id))}catch(S){E("create issue",S)}finally{g&&(g.disabled=!1),y&&(y.disabled=!1)}}async function fh(){await Sd({keepOpen:!1})}async function gh(){await Sd({keepOpen:!0})}ee({"toggle-create-dropdown":(e,t,n)=>{uh(t.dropdownType,e,n)},"set-create-field":(e,t)=>{mh(t.field,t.value,t.label)},"create-issue-submit":()=>{fh()},"create-issue-and-new":()=>{gh()},"update-create-project":()=>{ph()},"apply-template":e=>{ch(e.target.value)},"toggle-create-options":()=>{lh()},"create-sub-issue-submit":(e,t)=>{dh(t.parentId,t.projectId)}});function zi(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&(k(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(hh(n,e.project_id),t=!0),t}function hh(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
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
    `,U())}async function vh(e,t){try{const n=await v.updateIssue(e,{status:"done"});P(),k(`${t} closed`,"success"),zi(n)}catch(n){E(`close ${t}`,n)}}ee({"parent-prompt-dismiss":()=>P(),"parent-prompt-close":(e,t)=>vh(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{P(),Id(t.parentId,t.projectId)}});function Zt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function yn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Hn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Fn(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function ra(){const e=document.getElementById("group-by-select");return e?e.value:""}const Td=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],sr=["done","canceled"],yh=Oi,bh="all";function Ld(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function Un(e=Zt()){return e.length===0?"all":Ld(e,Oi)?"open":Ld(e,sr)?"closed":null}function Cd(e){var t,n,i;switch(e){case"project":return V()?1:0;case"status":{const s=Un();return s==="all"?0:s?1:Zt().length}case"priority":return yn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Hn().length;case"exclude_labels":return Fn().length;default:return 0}}function ar(){let e=0;return Td.forEach(t=>{e+=Cd(t.key)}),e}function Ad(){var y,w,$,S,x,A;const e=new URLSearchParams,t=Zt(),n=yn(),i=Hn(),s=Fn(),a=(y=document.getElementById("assignee-filter"))==null?void 0:y.value,o=V()||"",r=(w=document.getElementById("sprint-filter"))==null?void 0:w.value,l=($=document.getElementById("issue-type-filter"))==null?void 0:$.value,c=(S=document.getElementById("group-by-select"))==null?void 0:S.value,d=(x=document.getElementById("sort-by-select"))==null?void 0:x.value,u=Un(t);u==="all"?e.append("status",bh):u!=="open"&&t.forEach(B=>e.append("status",B)),n.forEach(B=>e.append("priority",B)),i.forEach(B=>e.append("label",B)),s.forEach(B=>e.append("exclude_label",B)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const m=e.toString(),g=m?`/issues?${m}`:"/issues";history.replaceState({view:"issues"},"",g),pg((A=L())==null?void 0:A.id,m)}function wh(e){var w;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some($=>t.has($))){const $=ug((w=L())==null?void 0:w.id);if($){t=new URLSearchParams($);const S=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",S)}}const s=t.getAll("status"),a=document.getElementById("status-filter-dropdown");if(a&&(s.length>0||!a.dataset.statusApplied)){const $=s.length>0?s:yh;a.querySelectorAll('input[type="checkbox"]').forEach(x=>{x.checked=$.includes(x.value)}),a.dataset.statusApplied="true",Bd()}const o=t.getAll("priority");if(o.length>0){const $=document.getElementById("priority-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(x=>{x.checked=o.includes(x.value)}),Dd())}const r=t.get("assignee");r&&sh(r);const l=t.get("project");l&&(e(!0),st(l),e(!1));const c=t.get("sprint");if(c){const $=document.getElementById("sprint-filter");$&&($.value=c)}const d=t.get("issue_type");if(d){const $=document.getElementById("issue-type-filter");$&&($.value=d)}const u=t.getAll("label");if(u.length>0){const $=document.getElementById("label-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(x=>{x.checked=u.includes(x.value)}),la())}const m=t.getAll("exclude_label");if(m.length>0){const $=document.getElementById("exclude-label-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(x=>{x.checked=m.includes(x.value)}),ca())}const g=t.get("groupBy");if(g){const $=document.getElementById("group-by-select");$&&($.value=g)}const y=t.get("sort");if(y){const $=document.getElementById("sort-by-select");$&&($.value=y)}}function Bd(){const e=Zt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=Un(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=ye(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function Dd(){const e=yn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Pe(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function la(){var i,s;const e=Hn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function ca(){var i,s;const e=Fn(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function jd(){if(!L())return;let e;try{e=await v.getLabels(L().id)}catch(t){console.error("Failed to load labels for filter:",t);return}Md("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),Md("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function Md(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${J(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${f(r.name)}</span>
                </span>
            `,a.appendChild(l)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}const Rd=Yo,$h=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let kt=[],Pd=Promise.resolve();const kh={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};function da(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const Eh={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function qd(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function Vi(){return!!document.querySelector(".inline-dropdown")}function Nd(){return kt}function Od(e){kt=e}async function or(e,t,n,i){var u,m,g,y;e.preventDefault(),Dt();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Rd.map((w,$)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="status" data-value="${w}">
                    ${Ie(w)}
                    <span>${ye(w)}</span>
                    <span class="dropdown-shortcut">${$+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${Zo.map((w,$)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="priority" data-value="${w}">
                    ${pt(w)}
                    <span>${Pe(w)}</span>
                    <span class="dropdown-shortcut">${$}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${$h.map(w=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="issue_type" data-value="${w}">
                    <span class="issue-type-badge type-${w}">${wt(w)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const w=be(),$=Y().find(x=>x.id===n)||Ve().find(x=>x.id===n)||((w==null?void 0:w.id)===n?w:null),S=oa({keepId:($==null?void 0:$.assignee_id)||null});o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${S.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:S.map(({assignee:x,indent:A},B)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="${p(x.id)}">
                    ${jn(x,"avatar-small")}
                    <span>${er(x,A)}</span>
                    ${B<9?`<span class="dropdown-shortcut">${B+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const w=document.querySelector(`.issue-row[data-issue-id="${n}"]`),$=(w==null?void 0:w.dataset.projectId)||((u=be())==null?void 0:u.project_id),S=ni($);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${S.map((x,A)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="estimate" data-value="${x.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${x.label}</span>
                    ${A<9?`<span class="dropdown-shortcut">${A}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const w=Y(),$=Ve(),S=be(),x=w.find(ue=>ue.id===n)||$.find(ue=>ue.id===n)||S,A=new Set(((x==null?void 0:x.labels)||[]).map(ue=>ue.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const B=o.getBoundingClientRect();let Q=a.bottom+4,_=a.left;_+B.width>window.innerWidth-8&&(_=a.right-B.width),Q+B.height>window.innerHeight-8&&(Q=a.top-B.height-4),o.style.top=`${Q}px`,o.style.left=`${Math.max(8,_)}px`,Ri(o,{multiSelect:!0});let j=[];const G=L();if(G)try{j=await v.getLabels(G.id)}catch(ue){console.error("Failed to load labels:",ue)}if(!o.parentNode)return;Fd(o,n,j,A);const se=o.getBoundingClientRect();let pe=a.bottom+4,K=a.left;K+se.width>window.innerWidth-8&&(K=a.right-se.width),pe+se.height>window.innerHeight-8&&(pe=a.top-se.height-4),o.style.top=`${pe}px`,o.style.left=`${Math.max(8,K)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const w=Y(),$=Ve(),S=be(),x=w.find(oe=>oe.id===n)||$.find(oe=>oe.id===n)||S,A=(x==null?void 0:x.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const B=o.getBoundingClientRect();let Q=a.bottom+4,_=a.left;_+B.width>window.innerWidth-8&&(_=a.right-B.width),Q+B.height>window.innerHeight-8&&(Q=a.top-B.height-4),o.style.top=`${Q}px`,o.style.left=`${Math.max(8,_)}px`,Ri(o);let j=[];if(A)try{j=await v.getSprints(A),wb(A,j)}catch(oe){console.error("Failed to load sprints:",oe)}if(!o.parentNode)return;const G=j.filter(oe=>oe.status!=="completed"||oe.id===(x==null?void 0:x.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${G.map((oe,Ee)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="${p(oe.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${f(oe.name)}${oe.status==="active"?" (Active)":""}</span>
                    ${Ee<9?`<span class="dropdown-shortcut">${Ee+1}</span>`:""}
                </button>
            `).join("")}
        `;const se=o.getBoundingClientRect();let pe=a.bottom+4,K=a.left;K+se.width>window.innerWidth-8&&(K=a.right-se.width),pe+se.height>window.innerHeight-8&&(pe=a.top-se.height-4),o.style.top=`${pe}px`,o.style.left=`${Math.max(8,K)}px`,o.classList.remove("dropdown-positioning");const ue=oe=>{const Ee=oe.key;if(Ee==="Escape"||Ee==="Tab"){Dt(),document.removeEventListener("keydown",ue),Mi(null);return}if(qd(oe,o))return;const Xe=parseInt(Ee);if(isNaN(Xe))return;const Ke=o.querySelectorAll(".dropdown-option");let Ue=!1;Xe===0?(Gn(n,"sprint_id",null),Ue=!0):Xe>=1&&Xe<Ke.length&&(Ke[Xe].click(),Ue=!0),Ue&&(document.removeEventListener("keydown",ue),Mi(null))};Mi(ue),document.addEventListener("keydown",ue),(g=o.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let l=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),l+r.height>window.innerHeight-8&&(l=a.top-r.height-4),o.style.top=`${l}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const d=w=>{const $=w.key;if($==="Escape"||$==="Tab"){Dt(),document.removeEventListener("keydown",d);return}if(qd(w,o))return;const S=parseInt($);if(isNaN(S))return;let x=!1;if(t==="status"&&S>=1&&S<=6)Gn(n,"status",Rd[S-1]),x=!0;else if(t==="priority"&&S>=0&&S<=4)Gn(n,"priority",Zo[S]),x=!0;else if(t==="estimate"){const A=be(),B=ni(A==null?void 0:A.project_id);S>=0&&S<B.length&&(Gn(n,"estimate",B[S].value),x=!0)}x&&(document.removeEventListener("keydown",d),Mi(null))};Mi(d),document.addEventListener("keydown",d),(y=o.querySelector(".dropdown-option[data-action]"))==null||y.focus(),Ri(o)}function _h(e,t,n,i){or(e,t,n,i)}function xh(e,t,n){Pd=Pd.then(()=>Hd(e,t,n))}async function Hd(e,t,n){const i=Y(),s=Ve(),a=be(),o=i.find(d=>d.id===e)||s.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const d=await v.updateIssue(e,{label_ids:c}),u=d.labels||[],m=x=>({...x,labels:u,updated_at:d.updated_at??x.updated_at}),g=Y();g.some(x=>x.id===e)&&ze(g.map(x=>x.id===e?m(x):x));const y=Ve();y.some(x=>x.id===e)&&vn(y.map(x=>x.id===e?m(x):x));const w=be();(w==null?void 0:w.id)===e&&Pn(m(w));const $=da(e);if($&&$.parentNode){const x=Y().find(A=>A.id===e)||Ve().find(A=>A.id===e);x&&($.outerHTML=Yn(x))}const S=document.querySelector(".property-labels-btn");S&&(S.innerHTML=u.length>0?u.map(x=>`
                    <span class="issue-label" style="background: ${J(x.color)}20; color: ${J(x.color)}">${f(x.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(E("update labels",d),n){const u=l>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function Fd(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${p(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${p(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${p(t)}" data-label-id="${p(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${J(s.color)}20; color: ${J(s.color)}">${f(s.name)}</span>
                </button>
            `}).join("")}
    `}async function Ud(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=L();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await v.createLabel(i.id,{name:s}),o=await v.getLabels(i.id);Xs(o),a!=null&&a.id&&await Hd(e,a.id,null);const r=Y(),l=Ve(),c=be(),d=r.find(m=>m.id===e)||l.find(m=>m.id===e)||c,u=new Set(((d==null?void 0:d.labels)||[]).map(m=>m.id));t&&Fd(t,e,o,u),n.value=""}catch(a){E("create label",a)}finally{n.disabled=!1,n.focus()}}}function ua(){const e=document.getElementById("create-issue-labels-label");e&&(kt.length===0?e.textContent="Labels":e.textContent=`Labels (${kt.length})`)}function rr(e,{failed:t=!1}={}){const n=nd();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=kt.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${p(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${J(i.color)}20; color: ${J(i.color)}">${f(i.name)}</span>
                </button>
            `}).join("")}
    `}function Ih(e){const t=kt.indexOf(e);t>=0?kt.splice(t,1):kt.push(e),Ho(),ua();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&rr(n)}async function Gd(){const e=L();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await v.createLabel(e.id,{name:i}),a=await v.getLabels(e.id);Xs(a),s!=null&&s.id&&!kt.includes(s.id)&&(kt.push(s.id),Ho()),ua(),t&&rr(t),n.value=""}catch(s){E("create label",s)}finally{n.disabled=!1,n.focus()}}}async function Gn(e,t,n){var r;Dt();const i=Ch(e,t,n),s=Dh(e,t),a=(r=Xo(e))==null?void 0:r[t],o=Vd(e,t,()=>n);o&&lr(e,t,{focus:!0});try{const l={};l[t]=n;const c=await v.updateIssue(e,l);if(!c||!c.id)throw new Error("Invalid response from server");if(zi(c),zd(e,t,i)){const d={...c,...Bh(e,t)};jh(e,{issue:d,myIssue:d,detail:d}),ia(d),lr(e,t,{focus:!o})}}catch(l){if(E("update issue",l),zd(e,t,i)){Vd(e,t,(d,u)=>d[t]===n?s[u]:d[t]);const c=Xo(e);c&&c[t]===n&&ia({...c,[t]:a}),lr(e,t,{focus:!1})}return}finally{Ah(e,t,i)}if(k("Issue updated","success"),t==="status")try{const l=V();if(l){const d=(await v.getSprints(l)).find(u=>u.status==="active");cr(d||null)}}catch{}}const Sh=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),Qt=new Map;function Th(e){const t=e&&Qt.get(e.id);if(!(t!=null&&t.size))return e;const n={...e};return t.forEach((i,s)=>{n[s]=i.value}),n}let Lh=0;function Ch(e,t,n){const i=++Lh;return Qt.has(e)||Qt.set(e,new Map),Qt.get(e).set(t,{seq:i,value:n}),i}function zd(e,t,n){var i,s;return((s=(i=Qt.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function Ah(e,t,n){var s;const i=Qt.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&Qt.delete(e))}function Bh(e,t){var i;const n={};return(i=Qt.get(e))==null||i.forEach((s,a)=>{a!==t&&(n[a]=s.value)}),n}function Dh(e,t){var i,s;const n=be();return{issue:(i=Y().find(a=>a.id===e))==null?void 0:i[t],myIssue:(s=Ve().find(a=>a.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0}}function Vd(e,t,n){const i=(l,c)=>({...l,[t]:n(l,c)});let s=!1;const a=Y();a.some(l=>l.id===e)&&(s=!0,ze(a.map(l=>l.id===e?i(l,"issue"):l)));const o=Ve();o.some(l=>l.id===e)&&(s=!0,vn(o.map(l=>l.id===e?i(l,"myIssue"):l)));const r=be();return(r==null?void 0:r.id)===e&&(s=!0,Pn(i(r,"detail"))),s}function jh(e,t){var s;const n=Y();t.issue&&n.some(a=>a.id===e)&&ze(n.map(a=>a.id===e?t.issue:a));const i=Ve();t.myIssue&&i.some(a=>a.id===e)&&vn(i.map(a=>a.id===e?t.myIssue:a)),t.detail&&((s=be())==null?void 0:s.id)===e&&Pn(t.detail)}function Mh(e){return e==="estimate"||kh[ra()]===e}function Rh(e,t,n,{focus:i}){var d;const s=da(e);if(!s||!s.parentNode||!n)return;const a=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&Mh(t)&&Y().some(u=>u.id===e))ot();else{const u=s.classList.contains("keyboard-selected");s.outerHTML=Yn(n),u&&((d=da(e))==null||d.classList.add("keyboard-selected"))}if(!i&&!a)return;const r=da(e),l=Eh[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus({preventScroll:!0})}function lr(e,t,{focus:n}){const i=Y().find(a=>a.id===e)||Ve().find(a=>a.id===e);i&&ia(i),Rh(e,t,i,{focus:n});const s=be();(s==null?void 0:s.id)===e&&Sh.has(t)&&Ph(t,s)}function Ph(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".detail-sidebar");if(!i)return;let s=e;e==="assignee_id"&&(s="assignee"),e==="sprint_id"&&(s="sprint"),e==="issue_type"&&(s="type");const a=i.querySelectorAll(".property-row");let o=null;for(const l of a){const c=l.querySelector(".property-label");if(c&&c.textContent.toLowerCase()===s.toLowerCase()){o=l;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${Ie(t.status)}
            <span>${ye(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${pt(t.priority)}
            <span>${Pe(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${wt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const l=t.assignee_id?Kt(t.assignee_id):null,c=l?Yt(l):null;r.innerHTML=c?`${jn(l,"avatar-small")}<span>${f(c)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const l=Ng(),c=t.sprint_id&&l?l.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${c?f(c.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${Ha(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500),r==null||r.focus()}}ee({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?Gn(t.issueId,i,n==="null"?null:Number(n)):Gn(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{xh(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Ud(t.issueId)},"toggle-create-issue-label":(e,t)=>{Ih(t.labelId)},"create-label-for-create-issue":()=>{Gd()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Ud(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Gd())}});function pa(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Wd)},0))}function Wd(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Wd))}function qh(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",zn)):(e.classList.remove("hidden"),e.classList.remove("show-options"),xe(),qe(id()),setTimeout(()=>{document.addEventListener("click",zn)},0))}function Nh(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",zn)):(e.classList.remove("hidden"),Yh(),setTimeout(()=>{document.addEventListener("click",zn)},0))}function zn(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",zn))}function bn(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",zn)}function xe(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=V();e.innerHTML=Td.map(n=>{const i=Cd(n.key),s=id()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${p(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function qe(e){Lg(e),xe();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":Hh(t);break;case"status":Fh(t);break;case"priority":Uh(t);break;case"type":Gh(t);break;case"assignee":zh(t);break;case"sprint":Vh(t);break;case"labels":Wh(t);break;case"exclude_labels":Kh(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function Oh(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),xe()}function Hh(e){const t=V()||"",n=Z()||[];let i=`
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
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${J(s.color)};"></span>
                <span class="filter-option-label">${f(s.name)}</span>
            </label>
        `}),e.innerHTML=i}function Fh(e){const t=Zt(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=Un(t);let s=`
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
        `}),e.innerHTML=s}function Uh(e){const t=yn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function Gh(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${p(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function zh(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",i=xn()||[];let s=`
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
        `}),e.innerHTML=s}function Vh(e){if(!V()){e.innerHTML=`
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
        `}),e.innerHTML=a}function Wh(e){const t=Hn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${J(d)};"></span>
                    <span class="filter-option-label">${f(c)}</span>
                </label>
            `}),e.innerHTML=s}function Kh(e){const t=Fn(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${J(d)};"></span>
                    <span class="filter-option-label">${f(c)}</span>
                </label>
            `}),e.innerHTML=s}function Yh(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function Ne(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=V();if(n){const m=(Z()||[]).find(g=>g.id===n);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearAction:"clear-project-filter"})}const i=Zt();if(i.length>0){const u=Un(i),m=u==="open"?"Open":u==="closed"?"Closed":i.map(g=>ye(g)).join(", ");t.push({category:"status",label:"Status",value:m,clearAction:"clear-status-filter-new"})}const s=yn();if(s.length>0){const u=s.map(m=>Pe(m)).join(", ");t.push({category:"priority",label:"Priority",value:u,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const u=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:u?u.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let u;if(o.value==="me")u="Me";else if(o.value==="unassigned")u="Unassigned";else{const g=(xn()||[]).find(y=>y.user_id===o.value);u=(g==null?void 0:g.name)||(g==null?void 0:g.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:u,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const u=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(u==null?void 0:u.text)||r.value,clearAction:"clear-sprint-filter"})}const l=Hn();if(l.length>0){const u=document.getElementById("label-filter-dropdown"),m=l.map(g=>{var $;const y=u==null?void 0:u.querySelector(`input[value="${g}"]`),w=($=y==null?void 0:y.closest("label"))==null?void 0:$.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearAction:"clear-label-filter-new"})}const c=Fn();if(c.length>0){const u=document.getElementById("exclude-label-filter-dropdown"),m=c.map(g=>{var $;const y=u==null?void 0:u.querySelector(`input[value="${g}"]`),w=($=y==null?void 0:y.closest("label"))==null?void 0:$.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:m,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(u=>`
        <span class="filter-chip" title="${p(u.label)}: ${p(u.value)}">
            <span class="filter-chip-label">${u.label}:</span>
            <span class="filter-chip-value">${f(u.value)}</span>
            <button class="filter-chip-remove" data-action="${u.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=d}function Oe(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=ar();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function Kd(){const e=document.getElementById("sprint-filter");if(!e)return;const t=V(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",cr(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await v.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${f(a.name)})</option>`),Uu(t,a==null?void 0:a.id),cr(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${f(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function cr(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${f(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${f(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function Zh(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let Yd=!1;ut(e=>{if(e!=="currentProject"||T()!=="issues"||Yd)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([Kd(),jd()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),la(),ca(),Qe(),Ne(),Oe()}).catch(n=>{console.error("Failed to update filters on project switch:",n),Qe(),Ne(),Oe()})});function Qh(){wh(e=>{Yd=e})}function ma(){Bd(),Qe(),Ne(),Oe()}function fa(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),ma()}function dr(){Dd(),Qe(),Ne(),Oe()}function ur(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),dr()}function pr(){la(),Qe(),Ne(),Oe()}function ga(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),pr()}function mr(){ca(),Qe(),Ne(),Oe()}function ha(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),mr()}function Xh(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function Zd(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${Xh(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let Wi=0;function Ki(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function Qd(){var t,n,i,s,a,o;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=L())==null?void 0:t.id)||"",project:V()||"",status:[...Zt()].sort(),priority:[...yn()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim())||""})}let Xt=null;function Jh(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function Vn(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function Xd(e,t){Vn(!1),sa(e),ze(t),T()==="issues"&&Wt(t),ot(),Xt=e,Ki(Gg(e).hiddenClosed||0)}function ev(e,t,{loading:n}){sa(null),ze(t),T()==="issues"&&Wt(t),ot(),Vn(n),Xt=e,Ki(0)}function Jd(){sa(null),Xt=null,Vn(!1),Zh(),Ki(0)}function tv(){const e=document.getElementById("issues-list");Ki(0),e!=null&&e.querySelector(".issue-row")?Vn(!0):Jd()}function nv(){const e=Zg(Qd()),t=e?gd(e):null;return t?(gn(-1),Xd(e,t),!0):(Jd(),!1)}function iv(e,t,n,i=()=>!0){if(!Array.isArray(t))return t;const s=new Map(e.map(c=>[c.id,c])),a=new Set(t.map(c=>c.id)),o=new Set(t.filter(c=>!n.has(c.id)).map(c=>c.title)),r=e.filter(c=>!n.has(c.id)&&!a.has(c.id)&&!(c._isOptimistic&&o.has(c.title))&&(c._isOptimistic||i(c))),l=[];for(const c of t){const d=s.get(c.id);if(!d&&n.has(c.id))continue;const u=d&&hd(d.updated_at,c.updated_at)?d:c;l.push(Th(u))}return r.length?[...r,...l]:l}async function Et(){var $,S,x,A,B,Q,_;gn(-1),Jh();const e=++Wi;if(!L())return;const t=V()||"",n=Zt(),i=yn(),s=($=document.getElementById("assignee-filter"))==null?void 0:$.value,a=(x=(S=document.getElementById("issue-search"))==null?void 0:S.value)==null?void 0:x.trim();if(!t&&Z().length===0){Xt=null,document.getElementById("issues-list").innerHTML=q({icon:M.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const o=Qd(),r={limit:1e3},l=((A=document.getElementById("sort-by-select"))==null?void 0:A.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(B=$t())==null?void 0:B.id:r.assignee_id=s);const u=(Q=document.getElementById("sprint-filter"))==null?void 0:Q.value;if(u)if(u==="current"){if(t){const j=$b(t);if(j!==void 0)j&&(r.sprint_id=j);else try{const se=(await v.getSprints(t)).find(pe=>pe.status==="active");Uu(t,se==null?void 0:se.id),se&&(r.sprint_id=se.id)}catch(G){console.error("Failed to resolve current sprint:",G)}}}else r.sprint_id=u;const m=(_=document.getElementById("issue-type-filter"))==null?void 0:_.value;m&&(r.issue_type=m),a&&a.length>=1?r.search=a:r.fields="list";let g=!1,y=!1,w=null;try{const j=Zd(Hn(),"label-filter-dropdown");j.length>0&&(r.label=j,r.label_match="any");const G=Zd(Fn(),"exclude-label-filter-dropdown");G.length>0&&(r.exclude_label=G),t&&(r.project_id=t);const se=t||`team:${L().id}`;w=md({...r,scope:se});const pe=gd(w);if(pe)g=!0,Xt===w&&Kg()===w&&wd(Y(),pe)||Xd(w,pe);else{const b=eh({...r,scope:se});b&&(b.complete||b.rows.length>0)?(y=!0,ev(w,b.rows,{loading:!b.complete})):tv()}const K=b=>t?v.getIssues(b):Z().length>0?v.getTeamIssues(L().id,b):Promise.resolve(void 0),ue=r.search&&Un(n)==="open"?K({...r,status:sr}).then(b=>Array.isArray(b)?b.length:0).catch(b=>(console.error("Failed to count closed search matches:",b),0)):Promise.resolve(0),oe=new Set(Y().map(b=>b.id)),Ee=await K(r);if(yd(w,Ee),e!==Wi)return;Yg(o,w);const Xe=(g||y)&&Xt===w,Ke=Xe?iv(Y(),Ee,oe,Ed(r)):Ee,Ue=Xe&&wd(Y(),Ke);sa(w),ze(Ke),T()==="issues"&&Wt(Array.isArray(Ke)?Ke.filter(b=>!b._isOptimistic):Ke);const ht=[...new Set(Ke.map(b=>b.project_id).filter(Boolean))],Ut=Object.keys(ja()).length;if(await Fu(ht),e!==Wi)return;const Je=Object.keys(ja()).length!==Ut;(!Ue||Je)&&ot(),Xt=w,Vn(!1);const ce=await ue;if(zg(w,{hiddenClosed:ce}),e!==Wi)return;Ki(ce)}catch(j){if(e!==Wi)return;Vn(!1);const G=(j==null?void 0:j.status)===403||(j==null?void 0:j.status)===404;if(g&&!G){E("refresh issues",j);return}G&&w&&Vg(w),Xt=null;const se=document.getElementById("issues-list");se&&(se.innerHTML=q({icon:M.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),E("load issues",j)}}function sv(){clearTimeout(Rg()),Pg(setTimeout(()=>{Et()},300))}function Qe(){Ad(),Et()}async function eu(){if(Ad(),ra()==="sprint"){const e=Y(),t=[...new Set(e.map(n=>n.project_id))];await Fu(t)}ot()}function av(){Ne(),Oe()}function tu(e){st(e),xe(),qe("project"),bn()}function ov(){tu("")}function rv(e){const t=e==="open"?Oi:e==="closed"?sr:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),ma(),xe(),qe("status")}function lv(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,ma()),xe(),qe("status")}function cv(){fa(),xe(),qe("status"),Ne(),Oe()}function dv(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,dr()),xe(),qe("priority")}function uv(){ur(),xe(),qe("priority"),Ne(),Oe()}function nu(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Qe()),xe(),qe("type"),Ne(),Oe(),bn()}function pv(){nu("")}function iu(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Qe()),xe(),qe("assignee"),Ne(),Oe(),bn()}function mv(){iu("")}function su(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Qe()),xe(),qe("sprint"),Ne(),Oe(),bn()}function fv(){su("")}function gv(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,pr()),xe(),qe("labels")}function hv(){ga(),xe(),qe("labels"),Ne(),Oe()}function vv(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,mr()),xe(),qe("exclude_labels")}function yv(){ha(),xe(),qe("exclude_labels"),Ne(),Oe()}function bv(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Et()),bn()}function wv(e){const t=document.getElementById("group-by-select");t&&(t.value=e,eu()),bn()}function $v(){st(null),fa(),ur();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),ga(),ha(),Qe(),Ne(),Oe()}ee({"update-label-filter":()=>pr(),"clear-label-filter":()=>ga(),"update-exclude-label-filter":()=>mr(),"clear-exclude-label-filter":()=>ha(),"show-filter-category":(e,t)=>{var n,i;qe(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{Oh();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>tu(t.value),"clear-project-filter":()=>ov(),"clear-status-filter-new":()=>cv(),"set-status-preset":(e,t)=>rv(t.value),"show-all-statuses":()=>fa(),"toggle-status-option":(e,t)=>lv(t.filterValue,e),"clear-priority-filter-new":()=>uv(),"toggle-priority-option":(e,t)=>dv(t.filterValue,e),"set-type-filter":(e,t)=>nu(t.value),"clear-type-filter":()=>pv(),"set-assignee-filter":(e,t)=>iu(t.value),"clear-assignee-filter":()=>mv(),"set-sprint-filter":(e,t)=>su(t.value),"clear-sprint-filter":()=>fv(),"clear-label-filter-new":()=>hv(),"toggle-label-option":(e,t)=>gv(t.filterValue,e),"clear-exclude-label-filter-new":()=>yv(),"toggle-exclude-label-option":(e,t)=>vv(t.filterValue,e),"set-sort":(e,t)=>bv(t.value),"set-group-by":(e,t)=>wv(t.value),"clear-all-filters":()=>$v(),"retry-load-issues":()=>Et()});const au=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function Jt(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Wn(e){const t=Jt(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const kv=60,Ev=150;let He=[],Yi=1/0,en=null,va=null,Zi=null;const ya=new Map;let Kn=null,ba=[],Qi=null;const ou=e=>{var t;return`${((t=$t())==null?void 0:t.id)??""}|${e}`},_v=24;function xv(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(kv,Math.ceil((e+2*t)/_v))}function tn(e,t){if(e!==null&&(Kn!=null&&Kn.has(String(e))))return ba.push({groupKey:e,ids:t.map(i=>i.id)}),"";const n=t.slice(0,Math.max(0,Yi));return Yi-=n.length,n.length<t.length&&He.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>Yn(i)).join("")}function ru(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function lu(){clearTimeout(en),en=null,gr++,He=[],va=null,Qi=null,Zi=null}function fr(e=1/0){if(He.length===0)return;const t=document.getElementById("issues-list");if(!t||!(Zi!=null&&Zi.isConnected)){lu();return}const n=new Map(Y().map(s=>[s.id,s]));let i=e;for(;He.length>0&&i>0;){const s=He[0],a=s.ids.slice(0,i),o=ru(t,s.groupKey),r=a.map(l=>n.get(l)).filter(Boolean).map(l=>Yn(l)).join("");o==null||o.insertAdjacentHTML("beforeend",r),i-=a.length,a.length===s.ids.length?He.shift():s.ids=s.ids.slice(a.length)}if(Qi){const s=Qi;wa(t,s.issueId)&&(Qi=null,mu(t,s))}if(He.length===0){clearTimeout(en),en=null;const s=va;va=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&cu(s)}}const Iv=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{en=setTimeout(e,0)}):en=setTimeout(e,16);let gr=0;function Sv(){if(clearTimeout(en),He.length===0)return;const e=++gr;Iv(function t(){e===gr&&(fr(Ev),He.length>0&&(en=setTimeout(t,0)))})}function ot(){var d,u;const e=document.getElementById("issues-list");if(!e)return;const t=e.querySelector(".issue-row.keyboard-selected"),n=t==null?void 0:t.dataset.issueId,i=Pv(e),s=m=>{var g;return((g=m==null?void 0:m.closest(".issue-group"))==null?void 0:g.dataset.group)??null},a=[[n,s(t)],[i==null?void 0:i.issueId,s(i==null?void 0:i.row)]];e.classList.add("issue-list-linear"),lu(),Yi=xv();const o=Y();if(o.length===0){const m=(u=(d=document.getElementById("issue-search"))==null?void 0:d.value)==null?void 0:u.trim(),g=ar()>0,y=m&&m.length>=2;if(g||y){const w=ar(),$=[];y&&$.push(`search "${m}"`),g&&$.push(`${w} active filter${w>1?"s":""}`),e.innerHTML=q({icon:M.issues,heading:"No matching issues",description:`No issues match your ${$.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=q({icon:M.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});gn(-1),Yi=1/0;return}const r=ra();Kn=ya.get(ou(r))||null,ba=[],r==="status"?Tv(e,o):r==="priority"?Lv(e,o):r==="type"?Cv(e,o):r==="assignee"?Av(e,o):r==="sprint"?Bv(e,o):e.innerHTML=Wn(o)+tn(null,o),Yi=1/0,Zi=e.firstElementChild,He.push(...ba),ba=[];const l=Kn;Kn=null,l!=null&&l.size&&(e.querySelectorAll(".issue-group").forEach(m=>{l.has(m.dataset.group)&&uu(m,!0)}),a.forEach(([m,g])=>{m&&Rv(m,e,g)})),i&&(wa(e,i.issueId)?mu(e,i):He.length>0&&(Qi=i));const c=!!n&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),m=>m.dataset.issueId===n);n&&He.length>0&&!c?va=n:cu(n),Sv()}function cu(e){const t=sd();if(t<0)return;const n=document.querySelectorAll(na);if(n.length===0){gn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),gn(i),n[i].classList.add("keyboard-selected")}function Tv(e,t){const n={};Yo.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=Wn(t);Yo.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ie(s)}</span>
                    <span class="group-title">${ye(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${Jt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${tn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function Lv(e,t){const n={};dd.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=Wn(t);dd.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${pt(s)}</span>
                    <span class="group-title">${Pe(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${Jt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${tn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function Cv(e,t){const n={};au.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=Wn(t);au.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${wt(s)}</span></span>
                    <span class="group-title">${wt(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${Jt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${tn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function Av(e,t){const n={},i="__unassigned__";n[i]=[];const s=oa({includeIdle:!0});s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=Wn(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${Jt(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${tn(i,n[i])}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=Yt(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${p(o.id)}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${p(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${jn(o,"avatar-small")}</span>
                    <span class="group-title">${f(l)}${f(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${Jt(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${tn(o.id,r)}
                </div>
            </div>
        `}),e.innerHTML=a}function Bv(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const a={active:0,planned:1,completed:2},o=ja();s.sort((l,c)=>{const d=o[l],u=o[c],m=d?a[d.status]??3:3,g=u?a[u.status]??3:3;return m-g});let r=Wn(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=o[l],u=d?d.name:l,m=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${g}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${f(u)}${m}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${Jt(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${tn(g,c)}
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
                    <span class="group-points">${Jt(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${tn(n,i[n])}
                </div>
            </div>
        `),e.innerHTML=r}function du(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-group"),n=>n.dataset.group===String(t))||null}function wa(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-row"),n=>n.dataset.issueId===t)||null}function Dv(e,t){const n=ru(e,t);if(!n)return;const i=new Map(Y().map(s=>[s.id,s]));He=He.filter(s=>{if(String(s.groupKey)!==String(t))return!0;const a=s.ids.map(o=>i.get(o)).filter(Boolean).map(o=>Yn(o)).join("");return n.insertAdjacentHTML("beforeend",a),!1})}function uu(e,t){var n;e.classList.toggle("collapsed",t),(n=e.querySelector(".issue-group-header"))==null||n.setAttribute("aria-expanded",String(!t))}function jv(e,t){const n=Array.from(document.querySelectorAll(na)),i=e.querySelector(".issue-row.keyboard-selected");if(!i)return;let s=n.indexOf(i);s<0&&(i.classList.remove("keyboard-selected"),s=n.findIndex(a=>t.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING&&!t.contains(a)),s<0&&(s=n.length-1),s>=0&&n[s].classList.add("keyboard-selected")),gn(s)}function pu(e,t,n){uu(t,n);const i=ou(ra());ya.has(i)||ya.set(i,new Set);const s=ya.get(i);n?s.add(t.dataset.group):(s.delete(t.dataset.group),Dv(e,t.dataset.group)),jv(e,t)}function Mv(e){const t=document.getElementById("issues-list"),n=t&&du(t,e);n&&pu(t,n,!n.classList.contains("collapsed"))}function Rv(e,t=document.getElementById("issues-list"),n=void 0){var a;if(!e||!t)return;const i=He.find(o=>o.ids.includes(e)),s=i?i.groupKey===null?null:du(t,i.groupKey):(a=wa(t,e))==null?void 0:a.closest(".issue-group");s!=null&&s.classList.contains("collapsed")&&(n!==void 0&&s.dataset.group===n||pu(t,s,!1))}function Pv(e){var i;const t=document.activeElement;if(!t||t===e||!e.contains(t))return null;const n=t.closest(".issue-row");return n!=null&&n.dataset.issueId?{issueId:n.dataset.issueId,row:n,dropdownType:((i=t.dataset)==null?void 0:i.dropdownType)||null,isTitle:t.classList.contains("issue-title")}:null}function mu(e,{issueId:t,dropdownType:n,isTitle:i}){if(e.contains(document.activeElement))return;const s=wa(e,t);if(!s)return;const a=n?s.querySelector(`[data-dropdown-type="${n}"]`):i?s.querySelector(".issue-title"):s.querySelector("a[href], button");a==null||a.focus({preventScroll:!0})}function fu(e,t){if(!e)return"";if(!t)return f(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return f(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${f(i)}<mark class="search-match">${f(s)}</mark>${f(a)}`}function qv(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=fu(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}const Nv=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function Yn(e){var m,g,y;const t=e.assignee_id?Kt(e.assignee_id):null,n=t?Yt(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":Nv.format(i),a=e.estimate!=null?Ha(e.estimate,e.project_id):"",o=Xr(e.estimate,e.project_id),r=e.sprint_id?ja()[e.sprint_id]:null,l=r?r.name:null,c=(g=(m=document.getElementById("issue-search"))==null?void 0:m.value)==null?void 0:g.trim(),d=!!c&&((y=e.title)==null?void 0:y.toLowerCase().includes(c.toLowerCase())),u=c&&!d?qv(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${p(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${p(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${p(e.id)}" title="Priority: ${Pe(e.priority)}">
                    ${pt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${p(e.id)}" title="Status: ${ye(e.status)}">
                    ${Ie(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${wt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.id)}">${fu(e.title,c)}${u?` <span class="issue-search-snippet" title="Matched in description">— ${u}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(w=>`
                            <span class="issue-label" style="background: ${J(w.color)}20; color: ${J(w.color)}">${f(w.name)}</span>
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
                    ${n?jn(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function pt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Ie(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}ee({"toggle-group":(e,t)=>{if((e==null?void 0:e.type)==="keydown"){if(e.repeat)return;e.preventDefault()}Mv(t.group)},"show-inline-dropdown":(e,t,n)=>{or(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),ne(t.issueId))}});let Xi=[];function Ji(){return Xi}function Ov(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Hv(e){const t=e==null?void 0:e.avatar_url,n=p((e==null?void 0:e.name)||"Agent");return t?Ov(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${p(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${f(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function Fv(e){var t;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{Xi=await v.getTeamAgents(e),aa(xn,Ji),Hi()}catch(n){console.error("Failed to load team agents:",n),E("load team agents",n)}}async function $a(e){var t;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{Xi=await v.getTeamAgents(e),aa(xn,Ji),Hi(),Uv()}catch(n){E("load agents",n)}}function Uv(){const e=document.getElementById("agents-list");if(e){if(Xi.length===0){e.innerHTML=q({icon:M.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=Xi.map(t=>{var l;const n=f(t.name),i=f(t.parent_user_name||"Unknown"),s=t.kind==="session",a=t.can_register?'<span class="agent-scope" title="Registers one identity per session; cannot write as itself">Registrar</span>':s?`<span class="agent-scope" title="Registered by a registrar for one session">Session${t.idle?" · idle":""}</span>`:"",r=!s&&t.is_active!==!1&&(t.parent_user_id===((l=$t())==null?void 0:l.id)||Ka())?`<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}" data-can-register="${t.can_register?"true":"false"}">${t.can_register?"Stop being a registrar":"Make registrar"}</button>`:"";return`
      <div class="agent-item">
        ${Hv(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            ${a}
            <span class="agent-date">Created by ${i} ${Ze(t.created_at)}</span>
          </div>
        </div>
        ${r}
        <button class="btn btn-secondary" data-action="generate-agent-key" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Generate new key</button>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function Gv(){const e=Z();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),U()}function gu(e,t,n=!1){const i=f(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,U()}async function zv(e){var r,l,c,d;e.preventDefault();const t=(r=L())==null?void 0:r.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value,o=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let u;s&&a?u=await v.createProjectAgent(a,n,i,o):u=await v.createTeamAgent(t,n,i,o),P(),gu("Agent Created",u.api_key,!!u.can_register)}catch(u){E("create agent",u)}return!1}async function Vv(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await v.createAgentKey(e);gu("New Agent Key",n.key)}catch(n){E("generate agent key",n)}}async function Wv(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await v.updateAgent(e,{can_register:n}),k(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),$a()}catch(s){E("change registrar",s)}}function Kv(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{k("Agent API key copied to clipboard","success")}).catch(()=>{k("Failed to copy","error")})}async function Yv(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await v.deleteAgent(e),k("Agent deleted","success"),$a()}catch(n){E("delete agent",n)}}ee({"create-agent":e=>{zv(e)},"copy-agent-key":()=>{Kv()},"dismiss-agent-modal":()=>{P(),$a()},"delete-agent":(e,t)=>{Yv(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{Vv(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{Wv(t.agentId,t.agentName,t.canRegister!=="true")}});function Zv(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function Qv(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const a of e){const o=a.user_id||a.id;i.has(o)||(i.add(o),s.push({id:o,name:a.user_name||a.name||a.user_email||a.email||"User",email:a.user_email||a.email||"",handle:Zv(a),isAgent:!1}))}for(const a of t)!a.mention_handle||a.is_active===!1||a.idle||i.has(a.id)||n!==void 0&&a.agent_project_id&&a.agent_project_id!==n||(i.add(a.id),s.push({id:a.id,name:a.name||"Agent",email:"",handle:a.mention_handle,isAgent:!0}));return s}function Xv(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function hr(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let a=-1;const o=()=>{s.classList.add("hidden"),s.innerHTML="",a=-1},r=d=>{var m,g;const u=s.querySelectorAll(".mention-suggestion");u.length!==0&&(a=(d%u.length+u.length)%u.length,u.forEach((y,w)=>y.classList.toggle("highlighted",w===a)),(g=(m=u[a]).scrollIntoView)==null||g.call(m,{block:"nearest"}))},l=d=>{const u=i.selectionStart||0,m=i.value.slice(0,u).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),g=i.value.slice(u);i.value=m+g,i.focus(),o()},c=()=>{const d=i.selectionStart||0;if(Xv(i.value,d)){o();return}const m=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!m){o();return}const g=m[2].toLowerCase(),y=Qv(xn(),Ji(),i.mentionContext||{}).filter(w=>!g||w.handle.includes(g)||w.name.toLowerCase().includes(g)||w.email.toLowerCase().includes(g)).slice(0,6);if(!y.length){o();return}s.innerHTML=y.map(w=>`
            <button type="button" class="mention-suggestion" data-handle="${p(w.handle)}">
                <span class="mention-name">${f(w.name)}${w.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${f(w.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((w,$)=>{w.addEventListener("click",()=>l(w.dataset.handle)),w.addEventListener("mouseenter",()=>r($))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const u=!s.classList.contains("hidden");if(d.key==="Escape"&&u){d.preventDefault(),d.stopPropagation(),o();return}if(u){if(d.key==="ArrowDown")d.preventDefault(),r(a+1);else if(d.key==="ArrowUp")d.preventDefault(),r(a-1);else if(d.key==="Enter"||d.key==="Tab"){const g=s.querySelectorAll(".mention-suggestion")[a];g&&(d.preventDefault(),l(g.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(o,150)})}async function hu(e){try{const t=await v.getIssue(e),n=await v.getSprints(t.project_id),s=ni(t.project_id).map(o=>`
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
        `,U();const a=document.getElementById("edit-issue-description");if(a){const o=Zs(e);if(o){const r=Zc(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?fn(e,r,t.description||""):fn(e,null)})}}catch(t){E("load issue",t)}}async function Jv(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(c.status=s.value);const d=await v.updateIssue(t,c);Zs(t)===c.description&&fn(t,null),P(),await ne(t),k("Issue updated!","success"),zi(d)}catch(n){E("update issue",n)}}async function ey(e){if(confirm("Are you sure you want to delete this issue?"))try{await v.deleteIssue(e),await Et(),await rt(),N("issues"),k("Issue deleted!","success")}catch(t){E("delete issue",t)}}ee({"update-issue":(e,t)=>{Jv(e,t.issueId)}});let $e=null,vu=!1,wn=!1,yu="new-comment";function ty(){return $e||($e=document.createElement("div"),$e.className="quote-tooltip",$e.setAttribute("role","button"),$e.setAttribute("tabindex","0"),$e.setAttribute("aria-label","Quote selection in comment"),$e.textContent="Quote",$e.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),ka())}),$e.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),$e.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),ka()}),document.body.appendChild($e),$e)}function bu(e,t){const n=ty();n.style.display="flex",wn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!wn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function es(){$e&&($e.style.display="none"),wn=!1}function ny(){return wn}function wu(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function vr(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=wu(t.startContainer),i=wu(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function iy(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function ka(e=yu){const t=vr();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=iy(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),es(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function sy(){var i;if(!vr())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return bu(n.left+n.width/2,n.top),!0}function ay(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!vr()){es();return}bu(t,n)},10)}function $u({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(yu=t,i.addEventListener("mouseup",ay,n?{signal:n}:void 0),vu||(vu=!0,document.addEventListener("mousedown",s=>{wn&&$e&&!$e.contains(s.target)&&es()}),document.addEventListener("selectionchange",()=>{wn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&es()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&wn&&(s.stopImmediatePropagation(),es())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&sy()})))}function ku(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function Eu(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const u=d[1],m=document.createElement("a");m.href=`#/issue/${u}`,m.className="issue-link",m.textContent=u,o.appendChild(m),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+d[3],o.appendChild(u),r=d.index+d[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function _u(e){if(!e)return"";const t=mt(e),n=document.createElement("div");return n.innerHTML=t,ku(n,Eu),n.innerHTML}function Zn(e){if(!e)return"";const t=mt(e),n=document.createElement("div");return n.innerHTML=t,ku(n,Eu),n.innerHTML}let yr=!1,br=!1,nn=!0,ts=null,ns=null,is=null,Ea=null,wr=!1,_a=null;function $r(e=null){wr=!0,e&&(_a=e)}function kr(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔"}[e]||"•"}function Er(e){return e.user_name||e.user_email||"Unknown"}function _r(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?f(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${f(ye(t(e.old_value)))}</strong> to <strong>${f(ye(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${f(Pe(t(e.old_value)))}</strong> to <strong>${f(Pe(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${f(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${f(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=f(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=f(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||f(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||f(e.field_name)}`:"Updated issue"}}function oy(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),i=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),i&&i.classList.toggle("rotated")}function ry(){nn=!nn;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",nn),n&&n.classList.toggle("rotated",nn)}async function ss(e){try{ts=await v.getTicketRitualsStatus(e),xu(e)}catch(t){console.error("Failed to load ticket rituals:",t),ts=null}}function xu(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!ts){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:i}=ts;if(n.length===0&&i.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(nn=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",nn);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",nn);const r=n.some(d=>d.trigger==="ticket_close"),l=n.some(d=>d.trigger==="ticket_claim");let c="⚠️ Complete these rituals:";r&&l?c="⚠️ Pending rituals (claim before starting, close before completing):":l?c="⚠️ Complete these rituals before claiming this ticket (or closing it unclaimed):":r&&(c="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
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
                        <div class="ticket-ritual-prompt markdown-body">${d.prompt?mt(d.prompt):""}</div>
                        ${d.attestation?"":Db(d.last_rejection)}
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${f(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${it(d.attestation.attested_at)}</span>
                                ${d.attestation.note?`<div class="attestation-note markdown-body">${mt(d.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${Tb(d,e)}
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
                                <span class="attestation-time">${it(d.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function xa(e){try{let t;return e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t?(await ne(t.id,!1),!0):(N("my-issues",!1),!1)}catch{return N("my-issues",!1),!1}}function xr(e){const t=Pi(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function Ir({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${p(n.id)}" data-identifier="${p(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${p(i.id)}" data-identifier="${p(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function ly(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=be();if(!t)return;const n=xr(t.id);ns=n.prevIssue?n.prevIssue.id:null,is=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=Ir(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}ut(e=>{e==="detailNavContext"&&ly()});let as=0;function cy(){as++}let Iu=0,Ia=!1;function Su(){if(document.querySelector(".description-inline-editor"))return"editor";if(Vi())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||Ia?"transient":null}function Tu(e){return $r(),e==="editor"?"deferred":"retry"}function dy(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=be())==null?void 0:n.id)===e}function uy(e){return Y().find(t=>t.id===e)||Xo(e)||Pi().find(t=>t.id===e)||null}function py(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;Pn(e);const i=xr(e.id);ns=i.prevIssue?i.prevIssue.id:null,is=i.nextIssue?i.nextIssue.id:null;const s=Z().find(r=>r.id===e.project_id),a=e.assignee_id?Kt(e.assignee_id):null,o=T()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(o)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Ir(i)}
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
                        <div class="property-row"><span class="property-label">Status</span><span class="property-value">${Ie(e.status)}<span>${ye(e.status)}</span></span></div>
                        <div class="property-row"><span class="property-label">Priority</span><span class="property-value">${pt(e.priority)}<span>${Pe(e.priority)}</span></span></div>
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${a?f(Yt(a)):"Unassigned"}</span></div>
                    </div>
                </aside>
            </div>`}async function ne(e,t=!0,{refresh:n=!1}={}){const i=n?as:++as,s=++Iu;if(n){const a=Su();if(a)return Tu(a)}try{t&&En(),n||(nn=!0);let a=!1;if(!n){const b=uy(e);b&&(py(b),t&&(history.pushState({issueId:e,view:T()},"",`/issue/${b.identifier}`),a=!0))}let o=!1;const[r,l,c,d,u,m]=await Promise.all([v.getIssue(e),v.getComments(e).catch(b=>(console.error("Failed to load comments:",b),o=!0,[])),v.getActivities(e),v.getSubIssues(e),v.getRelations(e),v.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),y=[...m.pending_rituals||[],...m.completed_rituals||[]].filter(b=>b.attestation&&b.attestation.note).map(b=>({id:`attestation-${b.attestation.id}`,author_name:b.attestation.attested_by_name||"Unknown",author:b.attestation.attester||null,content:b.attestation.note,created_at:b.attestation.attested_at,is_attestation:!0,ritual_name:b.name,is_pending:!b.attestation.approved_at})),w=[...l,...y].sort((b,F)=>new Date(b.created_at)-new Date(F.created_at)),$=[r.parent_id?v.getIssue(r.parent_id):Promise.resolve(null),v.getSprints(r.project_id).catch(b=>(console.error("Failed to load sprints:",b),[]))],[S,x]=await Promise.all($);if(i!==as)return"dropped";let A=null,B=null;if(n){if(s!==Iu||!dy(e))return"dropped";const b=Su();if(b)return Tu(b);B=window.scrollY;const F=document.activeElement;F!=null&&F.id&&document.getElementById("issue-detail-view").contains(F)&&(A={id:F.id,start:F.selectionStart,end:F.selectionEnd})}ts=m;const Q=u.filter(b=>b.relation_type==="blocks"&&b.direction==="outgoing"),_=u.filter(b=>b.relation_type==="blocked_by"||b.relation_type==="blocks"&&b.direction==="incoming"),j=u.filter(b=>b.relation_type==="relates_to");t&&!a&&history.pushState({issueId:e,view:T()},"",`/issue/${r.identifier}`),Pn(r),ld(x),wr=!1,_a=null,document.querySelectorAll(".view").forEach(b=>b.classList.add("hidden"));const G=document.getElementById("issue-detail-view");G.classList.remove("hidden");const se=T()||"my-issues",pe=Z().find(b=>b.id===r.project_id),K=r.assignee_id?Kt(r.assignee_id):null,ue=K?Yt(K):null,oe=r.sprint_id?x.find(b=>b.id===r.sprint_id):null,Ee=xr(r.id),{prevIssue:Xe,nextIssue:Ke}=Ee;G.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(se)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Ir(Ee)}
                        <span class="issue-detail-breadcrumb">${pe?f(pe.name):"Project"} › ${f(r.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${f(r.title)}</h1>

                    ${S?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(S.identifier)}" data-action="navigate-issue" data-issue-id="${p(S.id)}" data-identifier="${p(S.identifier)}">${S.identifier}: ${f(S.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" data-action="edit-description" data-issue-id="${p(r.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                                ${Zs(r.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span>':""}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${r.description?"":"empty"}" data-action="edit-description" data-issue-id="${p(r.id)}">
                            ${r.description?Zn(r.description):'<span class="add-description-link">Add description...</span>'}
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
                            ${d.length===0?q({icon:M.issues,heading:"No sub-issues",description:"Break this issue down by creating sub-issues"}):d.map(b=>`
                                <a href="/issue/${encodeURIComponent(b.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${p(b.id)}" data-identifier="${p(b.identifier)}">
                                    <span class="sub-issue-status">${Ie(b.status)}</span>
                                    <span class="sub-issue-id">${b.identifier}</span>
                                    <span class="sub-issue-title">${f(b.title)}</span>
                                    ${b.estimate!=null?`<span class="sub-issue-estimate">${b.estimate}pts</span>`:""}
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
                            ${Q.length===0&&_.length===0&&j.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${_.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${_.map(b=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Ie(b.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(b.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(b.related_issue_id)}" data-identifier="${p(b.related_issue_identifier)}" class="relation-link">${b.related_issue_identifier}</a>
                                            <span class="relation-title">${f(b.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(r.id)}" data-relation-id="${p(b.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${Q.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${Q.map(b=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Ie(b.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(b.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(b.related_issue_id)}" data-identifier="${p(b.related_issue_identifier)}" class="relation-link">${b.related_issue_identifier}</a>
                                            <span class="relation-title">${f(b.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(r.id)}" data-relation-id="${p(b.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${j.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${j.map(b=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${Ie(b.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(b.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(b.related_issue_id)}" data-identifier="${p(b.related_issue_identifier)}" class="relation-link">${b.related_issue_identifier}</a>
                                            <span class="relation-title">${f(b.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(r.id)}" data-relation-id="${p(b.id)}" title="Remove relation">
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
                            <h3>Comments${w.length>0?` <span class="section-count">(${w.length})</span>`:""}</h3>
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
                            ${w.length===0?o?"":`
                                <div class="comments-empty">No comments yet</div>
                            `:w.map(b=>{var F;return`
                                <div class="comment ${b.is_attestation?"comment-attestation":""} ${b.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${b.is_attestation?"avatar-attestation":""}">${b.is_attestation?b.is_pending?"⏳":"✓":(b.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${f(b.author_name||"User")}</span>
                                            ${b.author?Mn(b.author):Uo((F=Kt(b.author_id))==null?void 0:F.is_agent)}
                                            ${b.is_attestation?`<span class="comment-ritual-badge">${b.is_pending?"Pending approval — ":""}Ritual: ${f(b.ritual_name)}</span>`:""}
                                            <span class="comment-date">${it(b.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${_u(b.content)}</div>
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
                            ${c.length===0?q({icon:M.activity,heading:"No activity yet",description:"Activity will appear here as the issue is updated"}):c.map(b=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${kr(b.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${_r(b)}</span>
                                        <span class="activity-actor">by ${f(Er(b))} ${Mn(b.user)}</span>
                                        <span class="activity-time">${it(b.created_at)}</span>
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
                                ${Ie(r.status)}
                                <span>${ye(r.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${p(r.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${pt(r.priority)}
                                <span>${Pe(r.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${p(r.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${r.issue_type||"task"}">${wt(r.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${p(r.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${ue?`${jn(K,"avatar-small")}<span>${f(ue)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${p(r.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${oe?f(oe.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${p(r.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${r.labels&&r.labels.length>0?r.labels.map(b=>`
                                        <span class="issue-label" style="background: ${J(b.color)}20; color: ${J(b.color)}">${f(b.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${pe?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${f(pe.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${p(r.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${Xr(r.estimate,r.project_id)?" out-of-scale":""}" ${Xr(r.estimate,r.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${Ha(r.estimate,r.project_id)}</span>
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
                            <span class="property-value-static">${f(r.creator_name||"Unknown")} ${Mn(r.creator)}</span>
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
        `,Ea&&Ea.abort(),Ea=new AbortController;const{signal:Ue}=Ea,ht=document.querySelector(".sidebar-overflow-trigger"),Ut=document.querySelector(".overflow-menu-dropdown");if(ht&&Ut){const b=()=>{Ut.classList.add("hidden"),ht.setAttribute("aria-expanded","false")},F=()=>{const Ce=Ut.classList.toggle("hidden");ht.setAttribute("aria-expanded",String(!Ce))};ht.addEventListener("click",F,{signal:Ue}),document.addEventListener("click",Ce=>{!ht.contains(Ce.target)&&!Ut.contains(Ce.target)&&b()},{signal:Ue}),Ut.addEventListener("keydown",Ce=>{Ce.key==="Escape"&&(Ce.stopPropagation(),b(),ht.focus())},{signal:Ue})}xu(r.id),hr("new-comment","mention-suggestions",{projectId:r.project_id}),$u({signal:Ue});const Je=document.getElementById("new-comment");if(Ia=!1,Je){Je.addEventListener("compositionstart",()=>{Ia=!0},{signal:Ue}),Je.addEventListener("compositionend",()=>{Ia=!1},{signal:Ue});const b=Kc(r.id);b&&(Je.value=b),Je.addEventListener("input",()=>{Ys(r.id,Je.value)}),Je.addEventListener("keydown",F=>{var Ce;F.key==="Enter"&&(F.metaKey||F.ctrlKey)&&(F.preventDefault(),(Ce=Je.closest("form"))==null||Ce.requestSubmit())})}ns=Xe?Xe.id:null,is=Ke?Ke.id:null;const ce=b=>{var re;if((b.metaKey||b.ctrlKey)&&b.shiftKey&&(b.key===">"||b.key==="."||b.code==="Period")&&ka()){b.preventDefault();return}if(b.metaKey||b.ctrlKey||b.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||b.target.tagName==="INPUT"||b.target.tagName==="TEXTAREA"||b.target.tagName==="SELECT"||b.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||Vi())return;if(b.key==="ArrowLeft"&&ns)b.preventDefault(),ne(ns);else if(b.key==="ArrowRight"&&is)b.preventDefault(),ne(is);else if(b.key==="c"){b.preventDefault(),b.stopImmediatePropagation();const ct=document.getElementById("new-comment");ct&&(ct.focus(),ct.scrollIntoView({behavior:"smooth",block:"nearest"}))}else b.key==="j"?(b.preventDefault(),b.stopImmediatePropagation(),Sa(1)):b.key==="k"?(b.preventDefault(),b.stopImmediatePropagation(),Sa(-1)):b.key==="d"&&(b.preventDefault(),(re=document.querySelector('[data-action="edit-description"]'))==null||re.click());const Ce={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[b.key];if(Ce){const ct=document.querySelector(`.property-row[data-field="${Ce}"]`);ct&&(b.preventDefault(),ct.click())}};if(document.addEventListener("keydown",ce,{signal:Ue}),A){const b=document.getElementById(A.id);if(b&&(b.focus({preventScroll:!0}),typeof A.start=="number"&&typeof b.setSelectionRange=="function"))try{b.setSelectionRange(A.start,A.end)}catch{}}return B!==null&&window.scrollTo(0,B),"rendered"}catch(a){if(n)console.error("Failed to refresh issue detail:",a);else{if(i!==as)return"dropped";E("load issue",a);const o=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(o){const r=(a==null?void 0:a.status)===403||(a==null?void 0:a.status)===404;o.innerHTML=q(r?{icon:M.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:M.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function my(e,t){if(e.preventDefault(),yr)return!1;const n=document.getElementById("new-comment").value;Ys(t,null),yr=!0;try{const i=await v.createComment(t,n);k("Comment added!","success"),Fo(i),await ne(t)}catch(i){Ys(t,n),E("add comment",i)}finally{yr=!1}return!1}async function fy(e){const t=be()||await v.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
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
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=Zs(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=Zc(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}hr("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?fn(e,c,t.description||""):fn(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&Lu()}),a.addEventListener("keydown",c=>{var d,u;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,m;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(fn(e,null),wr){ne(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?Zn(t.description):'<span class="add-description-link">Add description...</span>',(m=n.querySelector('[data-action="edit-description"]'))==null||m.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,y;if(br)return;const c=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(c===void 0)return;const d=_a?_a.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const w=document.getElementById("description-draft-warning");w&&(w.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",w.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");br=!0,u&&(u.disabled=!0);const m=window.scrollY;try{await v.updateIssue(e,{description:c}),fn(e,null),k("Description updated","success"),await ne(e,!1),window.scrollTo(0,m),(y=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||y.focus()}catch(w){E("update description",w)}finally{br=!1,u&&(u.disabled=!1)}})}function Lu(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Zn(n):'<span class="text-muted">Nothing to preview.</span>'}function gy(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?Lu():i.focus()}function hy(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,U(),document.getElementById("relation-issue-search").focus()}async function vy(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=L())==null?void 0:i.id,o=(await v.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${p(r.id)}" data-identifier="${p(r.identifier)}" data-title="${p(r.title)}">
                <span class="link-result-id">${f(r.identifier)}</span>
                <span class="link-result-title">${f(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function yy(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function by(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function wy(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return k("Please select an issue","error"),!1;try{n==="blocked_by"?await v.createRelation(i,t,"blocks"):await v.createRelation(t,i,n),P(),k("Relation added","success"),ne(t)}catch(s){E("add relation",s)}return!1}async function $y(e,t){try{await v.deleteRelation(e,t),k("Relation removed","success"),ne(e)}catch(n){E("remove relation",n)}}function Sa(e){const t=be();if(!t)return;const n=Pi();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||ne(n[s].id)}ee({"retry-issue-comments":(e,t)=>{ne(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{_h(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||fy(t.issueId)},"toggle-section":(e,t)=>{oy(t.section)},"toggle-ticket-rituals":()=>{ry()},"save-comment":(e,t)=>{my(e,t.issueId)},"show-add-relation-modal":(e,t)=>{hy(t.issueId)},"remove-relation":(e,t)=>{$y(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{Id(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{wy(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{vy(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{yy(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{by()},"set-description-editor-mode":(e,t)=>{gy(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>Sa(-1),"navigate-next-issue":()=>Sa(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),hu(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),ey(t.issueId)}});function Cu(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let Qn=[],os=[],Ta=null,ae=new Set,Xn="list",$n=!1,Sr=null,La=null,Tr=null,Lr=null,Au=null;function Bu(e){if(Au!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const Cr=hg();(Cr==="list"||Cr==="grid")&&(Xn=Cr);function Du(e){if(e!=="list"&&e!=="grid")return;Xn=e,e==="grid"&&$n&&Ar(),vg(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),sn()}function ju(){if(Xn!=="list")return;$n=!0,ae.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),sn(),ei()}function Ar(){$n=!1,ae.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),sn(),ei()}function ky(){Sr&&clearTimeout(Sr),Sr=setTimeout(()=>{sn()},300)}function Ey(){const e=document.getElementById("doc-search");e&&(e.value=""),sn()}async function _y(){st(null)}async function xy(){const e=document.getElementById("doc-search");e&&(e.value=""),st(null)}function Iy(){var s;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((s=document.getElementById("doc-search"))==null?void 0:s.value)||"",n=V()||"",i=[];if(t&&i.push(`<span class="filter-chip">Search: "${f(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=Z().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";i.push(`<span class="filter-chip">Project: ${f(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(i.length>0){let a=i.join(" ");i.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Sy(){return Qn}function sn(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";Iy(),os=Qn.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),os.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),Dy("",Xn)}let Jn=0;async function Ty(){var i;const e=Ta||((i=L())==null?void 0:i.id);if(!e)return;const t=++Jn,n=V()||null;try{const s=await v.getDocuments(e,n);if(t!==Jn)return;Qn=s,sn()}catch(s){if(t!==Jn)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=q({icon:M.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),E("load documents",s)}}ut(e=>{e==="currentProject"&&T()==="documents"&&Ty()});async function kn(e,t=null){var s;if(e||(e=(s=L())==null?void 0:s.id),!e)return;Ta=e,ad(-1);const n=++Jn,i=document.getElementById("documents-list");i&&(i.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null&&(t=V()||null);try{const a=await v.getDocuments(e,t);if(n!==Jn)return;Qn=a;const o=document.getElementById("doc-view-list"),r=document.getElementById("doc-view-grid");o&&r&&(o.classList.toggle("active",Xn==="list"),r.classList.toggle("active",Xn==="grid")),sn()}catch(a){if(n!==Jn)return;const o=document.getElementById("documents-list");o&&(o.innerHTML=q({icon:M.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),E("load documents",a)}}function Mu(){var t,n;if(T()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=Ta||((n=L())==null?void 0:n.id);e&&kn(e).catch(i=>console.error("Failed to refresh documents list:",i))}function Ru(e){Bu(e)&&Se(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function Ly(e,t){Bu(e)&&(k(`Document "${t||"Untitled"}" was deleted`,"warning"),N("documents"))}function Cy(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${J(t.color)}20; color: ${J(t.color)}">${f(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function Ay(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Cy(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${p(e.id)}" data-action="view-document" data-document-id="${p(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${f(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${f(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?f(Cu(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${f(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function By(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${J(r.color)}20; color: ${J(r.color)}">${f(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?Cu(e.content).substring(0,80):"No content",s=$n?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${p(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${ae.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${$n&&ae.has(e.id)?" selected":""}" data-action="${$n?"toggle-doc-selection":"view-document"}" data-document-id="${p(e.id)}" data-doc-id="${p(e.id)}">
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
  `}function Dy(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;ae.clear(),ei();const i=os;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,u=V(),m=d||u;n.innerHTML=q({icon:m?M.search:M.documents,heading:m?"No documents match your filters":"No documents yet",description:m?"Try different search terms or filters":"Create your first document to get started",...!m&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?Ay:By,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=Z();i.forEach(d=>{let u,m;if(e==="project")if(u=d.project_id||"__global__",u==="__global__")m="Global (Team-wide)";else{const g=r.find(y=>y.id===d.project_id);m=g?g.name:"Unknown Project"}else e==="sprint"&&(u=d.sprint_id||"__no_sprint__",m=d.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:m,docs:[]}),o[u].docs.push(d)});let l="";for(const[d,u]of Object.entries(o)){const m=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${f(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${m}">
          ${u.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function jy(e){ae.has(e)?ae.delete(e):ae.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=ae.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",ae.has(e)),ei()}function My(){os.forEach(e=>ae.add(e.id)),os.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),ei()}function Pu(){ae.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),ae.clear(),ei()}function ei(){const e=document.getElementById("doc-bulk-actions");e&&($n?(e.classList.remove("hidden"),ae.size>0?e.innerHTML=`
        <span class="bulk-count">${ae.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function Ry(){if(ae.size===0){k("No documents selected","error");return}const t=Z().map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${ae.size} Document${ae.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${ae.size} selected document${ae.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,U()}async function Py(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(ae);let i=0;const s=[];for(const l of n)try{await v.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((o=Qn.find(d=>d.id===l))==null?void 0:o.title)||l)}P(),Pu(),s.length===0?k(`Moved ${i} document${i>1?"s":""}!`,"success"):k(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=L())==null?void 0:r.id;return await kn(a),!1}async function qy(){var a,o;if(ae.size===0){k("No documents selected","error");return}const e=ae.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(ae);let n=0;const i=[];for(const r of t)try{await v.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((a=Qn.find(c=>c.id===r))==null?void 0:a.title)||r)}Ar(),i.length===0?k(`Deleted ${n} document${n>1?"s":""}!`,"success"):k(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=L())==null?void 0:o.id;await kn(s)}async function Ny(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await v.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${p(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${f(s.author_name||"Unknown")}</span>
                ${Mn(s.author)}
                <span class="comment-date">${it(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${_u(s.content)}</div>
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
    `}}function Oy(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=Kc(e);s&&(i.value=s),i.addEventListener("input",()=>{Ys(e,i.value)},{signal:t}),i.addEventListener("keydown",a=>{var o;a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),(o=i.closest("form"))==null||o.requestSubmit())},{signal:t}),hr("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function Se(e,t=!0){try{t&&En();const n=await v.getDocument(e);Au=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(_=>_.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await Ny(n);let a=null,o=null,r=!1;if(n.project_id){const j=Z().find(G=>G.id===n.project_id);if(a=j?j.name:null,n.sprint_id)try{const G=await v.getSprint(n.sprint_id);o=G?G.name:null}catch(G){console.error("Failed to load sprint name:",G),r=!0}}let l=n.content||"";const c=z.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=Sy(),u=d.findIndex(_=>_.id===n.id),m=u>0?d[u-1]:null,g=u>=0&&u<d.length-1?d[u+1]:null,y=u>=0,w=T()||"documents",$=n.labels&&n.labels.length>0?n.labels.map(_=>`
          <span class="issue-label" style="background: ${J(_.color)}20; color: ${J(_.color)}">
            ${f(_.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${p(n.id)}" data-label-id="${p(_.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let S='<span class="text-muted">None</span>';try{const _=await v.getDocumentIssues(n.id);_.length>0&&(S=_.map(j=>`
          <div class="linked-item">
            <span class="linked-item-id">${f(j.identifier)}</span>
            <span class="linked-item-title">${f(j.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${p(n.id)}" data-issue-id="${p(j.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(_){console.error("Failed to load linked issues:",_),S=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${p(w)}">
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

          <div class="document-content markdown-body">${l?Zn(l):'<p class="text-muted">No content</p>'}</div>

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
                ${$}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${p(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${f(n.author_name||"Unknown")} ${Mn(n.author)}</span>
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
    `,La&&La.abort(),La=new AbortController;const{signal:x}=La,A=i.querySelector(".sidebar-overflow-trigger"),B=i.querySelector(".overflow-menu-dropdown");if(A&&B){const _=()=>{B.classList.add("hidden"),A.setAttribute("aria-expanded","false")},j=()=>{const G=B.classList.toggle("hidden");A.setAttribute("aria-expanded",String(!G))};A.addEventListener("click",j,{signal:x}),document.addEventListener("click",G=>{!A.contains(G.target)&&!B.contains(G.target)&&_()},{signal:x}),B.addEventListener("keydown",G=>{G.key==="Escape"&&(_(),A.focus())},{signal:x})}Oy(n.id,x,n.project_id||null),$u({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:x}),Tr=m?m.id:null,Lr=g?g.id:null;const Q=_=>{if((_.metaKey||_.ctrlKey)&&_.shiftKey&&(_.key===">"||_.key==="."||_.code==="Period")&&ka("new-doc-comment")){_.preventDefault();return}_.metaKey||_.ctrlKey||_.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||_.target.tagName==="INPUT"||_.target.tagName==="TEXTAREA"||_.target.tagName==="SELECT"||_.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(_.key==="ArrowLeft"&&Tr?(_.preventDefault(),Se(Tr)):_.key==="ArrowRight"&&Lr&&(_.preventDefault(),Se(Lr)))};document.addEventListener("keydown",Q,{signal:x})}catch(n){E("load document",n)}}async function Ca(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await v.getSprints(t);let o=n;if(i&&!n){const l=a.find(c=>c.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${f(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function Br(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${f(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function Hy(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?Zn(r):'<span class="text-muted">Nothing to preview.</span>'}}function Dr(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=Xc(e);if(o){const l=mg(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){Qs(e,null);return}Qs(e,l,n)};[i,s,a].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function qu(){rs=null;const e=Z(),t=np()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${f(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${Br("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,U(),Dr("new"),t&&await Ca("doc-sprint",t,null,!0)}let rs=null;async function Fy(e,t,n){rs=n||null;const s=Z().map(a=>`<option value="${p(a.id)}" ${a.id===t?"selected":""}>${f(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${Br("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,U(),Dr("new"),t&&await Ca("doc-sprint",t,e)}async function Uy(e){var a;e.preventDefault();const t=(a=L())==null?void 0:a.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await v.createDocument(t,s),Qs("new",null),await kn(t),P(),k("Document created!","success"),rs){const o=rs;rs=null,o()}}catch(o){E("create document",o)}return!1}let jr=null,ls=null,Mr=!1;async function Nu(e){try{const t=await v.getDocument(e);jr=e,ls={title:t.title||"",content:t.content||""},Mr=!1;const i=Z().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${f(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${Br("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${p(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,U(),Dr(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await Ca("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){E("load document",t)}}async function Gy(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&jr===t&&ls&&!Mr){let o=null;try{o=await v.getDocument(t)}catch{}if(o&&((o.title||"")!==ls.title||(o.content||"")!==ls.content))return Mr=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await v.updateDocument(t,s),jr=null,ls=null;const o=Xc(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&Qs(t,null),P(),await Se(t),k("Document updated!","success")}catch(o){E("update document",o)}return!1}async function zy(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await v.deleteDocument(e);const n=(t=L())==null?void 0:t.id;await kn(n),N("documents"),k("Document deleted!","success")}catch(n){E("delete document",n)}}function Vy(e,t){Ca(e,t)}async function Wy(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${p(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,U()}async function Ky(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=L())==null?void 0:i.id,a=await v.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${p(t)}" data-issue-id="${p(o.id)}">
        <span class="link-result-id">${f(o.identifier)}</span>
        <span class="link-result-title">${f(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function Yy(e,t){try{await v.linkDocumentToIssue(e,t),P(),k("Issue linked!","success"),await Se(e,!1)}catch(n){E("link issue",n)}}async function Zy(e,t){if(confirm("Unlink this issue from the document?"))try{await v.unlinkDocumentFromIssue(e,t),k("Issue unlinked!","success"),await Se(e,!1)}catch(n){E("unlink issue",n)}}let Rr=!1;async function Qy(e,t){if(e.preventDefault(),Rr)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return k("Please enter a comment","error"),!1;Rr=!0;try{const s=await v.createDocumentComment(t,i);n.value="",k("Comment added!","success"),Fo(s),await Se(t,!1)}catch(s){E("add comment",s)}finally{Rr=!1}return!1}async function Xy(e){var n;const t=(n=L())==null?void 0:n.id;if(!t){k("No team selected","error");return}try{const i=await v.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,U();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${p(e)}" data-label-id="${p(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${J(a.color)}; color: white;">${f(a.name)}</span>
        ${a.description?`<span class="text-muted">${f(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,U()}catch(i){E("load labels",i)}}async function Jy(e,t){try{await v.addLabelToDocument(e,t),P(),k("Label added!","success"),await Se(e,!1)}catch(n){E("add label",n)}}async function eb(e,t){try{await v.removeLabelFromDocument(e,t),k("Label removed!","success"),await Se(e,!1)}catch(n){E("remove label",n)}}ee({"view-document":(e,t)=>{e.preventDefault(),Se(t.documentId)},"set-doc-editor-mode":(e,t)=>{Hy(t.target,t.mode)},"retry-load-documents":()=>{kn(Ta)},"retry-document-comments":(e,t)=>{Se(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{jy(t.docId)},"clear-doc-search":()=>{Ey()},"clear-doc-project-filter":()=>{_y()},"clear-all-doc-filters":()=>{xy()},"show-bulk-move-modal":()=>{Ry()},"bulk-delete-documents":()=>{qy()},"select-all-docs":()=>{My()},"clear-doc-selection":()=>{Pu()},"exit-selection-mode":()=>{Ar()},"enter-selection-mode":()=>{ju()},"handle-bulk-move":e=>{Py(e)},"unlink-document-issue":(e,t)=>{Zy(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{Wy(t.documentId)},"add-document-comment":(e,t)=>{Qy(e,t.documentId)},"remove-label-from-doc":(e,t)=>{eb(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{Xy(t.documentId)},"show-edit-document-modal":(e,t)=>{Nu(t.documentId)},"delete-document":(e,t)=>{zy(t.documentId)},"create-document":e=>{Uy(e)},"update-doc-sprint-dropdown":(e,t,n)=>{Vy(t.sprintSelect,n.value)},"update-document":(e,t)=>{Gy(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{Ky(n.value,t.documentId)},"link-to-issue":(e,t)=>{Yy(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{Jy(t.documentId,t.labelId)}});let an=[],Aa={},Ba=new Set,Pt=null,Pr=null,Da=[],cs=[],qr=[];function ja(){return Aa}function tb(){return Pr}function nb(){return Pt}ut(e=>{e==="currentProject"&&T()==="sprints"&&on()});let Nr=0;async function on(){rd(-1);const e=V();if(!e){const i=document.getElementById("sprints-list");i&&(i.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}const t=++Nr;bb();const n=document.getElementById("sprints-list");n&&(n.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{await v.getCurrentSprint(e);const i=await v.getSprints(e);if(t!==Nr)return;an=i,ib(),await Ma()}catch(i){return t!==Nr?void 0:(n&&(n.innerHTML=q({icon:M.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),E("load sprints",i),!1)}return!0}function ib(){const e=document.getElementById("sprints-list");if(!e)return;const t=an.find(a=>a.status==="active"),n=an.find(a=>a.status==="planned"),i=an.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
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
        `,s+=sb(t)}if(n){const a=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",o=(n.budget?`${n.budget} point budget`:"No budget set")+(a?` <span class="text-muted">· ${a}</span>`:"");s+=`
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
        `),e.innerHTML=s||q({icon:M.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function Ou(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${Gr(e.activated_at)}, closed ${Gr(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${Gr(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function sb(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${f(Ou(e))||"not yet activated"}</span>
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
    `}let Or=0;async function ti(e,t=!0){var n;try{t&&En();const i=++Or,s=T(),a=await v.getSprint(e);if(i!==Or)return;if(!a){k("Sprint not found","error"),N("sprints");return}Pr=a;const o=(n=L())==null?void 0:n.id,[r,l,c]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),o?v.getDocuments(o,a.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==Or)return;Da=r,qr=l,cs=c,T()===s&&Wt(Da),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),ob()}catch(i){console.error("Failed to load sprint:",i),k("Failed to load sprint","error"),N("sprints")}}async function ab(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){k("Invalid sprint ID","error"),N("sprints",!1);return}try{await ti(e,!1)}catch{N("sprints",!1)}}function ob(){const e=Pr,t=Da;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=T()||"sprints",s=t.filter(g=>Oi.includes(g.status)),a=t.filter(g=>g.status==="done"),o=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((y,w)=>y+(w.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),c=r(a),d=o.length>0?`<div class="stat-note">${o.length} canceled not counted</div>`:"";let u="";e.status==="active"?u='<span class="badge badge-status-active">Active</span>':e.status==="planned"?u='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(u='<span class="badge badge-status-completed">Completed</span>');const m=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
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
                    ${f(Ou(e))}
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
                ${s.length===0?q({icon:M.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(g=>Hr(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?q({icon:M.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(g=>Hr(g)).join("")}
                    </div>
                `}
            </details>

            ${o.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${o.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${o.map(g=>Hr(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${lb()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${cs.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${p(e.id)}"
                        data-project-id="${p(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${cs.length>0?`
                    <div class="sprint-issues-list">
                        ${cs.map(g=>rb(g)).join("")}
                    </div>
                `:q({icon:M.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function Hr(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...ud,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${p(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${f(e.identifier)}</span>
            <span class="sprint-issue-title">${f(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${kb(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function rb(e){const t=f(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${p(e.id)}" data-document-url="/document/${p(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${f(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${it(e.created_at)}</span>
            </span>
        </div>
    `}function lb(){const e=qr;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${cb(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function cb(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function db(e,t,n,i){const s=i?Wb(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function ub(e,t,n){var u,m,g,y;e.preventDefault();const i=(m=(u=document.getElementById("sprint-name"))==null?void 0:u.value)==null?void 0:m.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(y=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:y.dataset.currentBudget,l=r?parseInt(r):null,c=a!==l,d=an.find(w=>w.id===t);try{const w={};i&&(w.name=i);const $=o==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!$&&(w.budget=a),Object.keys(w).length&&await v.updateSprint(t,w),o==="planned"){const x=an.filter(A=>A.status==="planned"&&A.id!==t);for(const A of x)await v.updateSprint(A.id,{budget:a})}o==="default"&&n&&await v.updateProject(n,{default_sprint_budget:a}),await on(),P(),k(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(w){E("update budget",w)}return!1}const Hu="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function pb(e,t=null){const n=an.find(c=>c.id===e),i=n?Z().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${Hu}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let a;try{a=await v.updateSprint(e,{budget_follows_default:!0})}catch(c){E("reset budget to project default",c),t&&(t.disabled=!1);try{await on()}catch{}return}const o=(a==null?void 0:a.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await on()!==!1}catch{l=!1}k(`'${o}' follows the project default budget again: ${s(a==null?void 0:a.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((a==null?void 0:a.budget)===null||(a==null?void 0:a.budget)===void 0)&&k(Hu,"warning")}async function mb(e){const t=an.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,U();const n=Oi;let i=0,s=!1,a=!1;try{const[l,c]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
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
    `}async function fb(e){try{const t=await v.closeSprint(e);await on(),Gu(),t.limbo?hb(t):k("Sprint completed!","success")}catch(t){E("complete sprint",t)}}async function Ma(){const e=V();if(e)try{Pt=await v.getLimboStatus(e),gb()}catch(t){console.error("Failed to load limbo status:",t)}}function gb(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Pt||!Pt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Pt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function hb(e){const t=V();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,U(),vb(t)}async function vb(e){try{const t=await v.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${f(i.name)} <span class="ritual-mode">(${f(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${mt(i.prompt)}</div>
                    ${Ur(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function Fr(){var t,n;if(!Pt)return;const e=V();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Pt.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${f(i.name)}</strong>
                            <span class="badge badge-ritual-${p(i.approval_mode)}">${f(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${mt(i.prompt)}</div>
                        ${Ur(i.attestation)}
                        ${yb(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=Pt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Pt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${f(i.name)}</div>
                            ${Ur(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,U()}function Ur(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${f(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${f(it(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${mt(e.note)}</div>
        </div>
    `}function yb(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${p(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Fu(e){for(const t of e)if(!Ba.has(t))try{(await v.getSprints(t)).forEach(i=>{Aa[i.id]=i}),Ba.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function bb(){Aa={},Ba=new Set,Da=[],qr=[],cs=[],Ra={}}function wb(e,t){t.forEach(n=>{Aa[n.id]=n}),Ba.add(e)}let Ra={};function $b(e){return Ra[e]}function Uu(e,t){Ra[e]=t??null}function Gu(){Ra={}}ee({"retry-load-sprints":()=>on(),"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}ti(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;db(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{pb(t.sprintId,n)},"show-limbo-details-modal":()=>{Fr()},"show-close-sprint-confirmation":(e,t)=>{mb(t.sprintId)},"handle-update-budget":(e,t)=>{ub(e,t.sprintId,t.projectId)},"close-modal":()=>{P()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,P(),fb(t.sprintId)},"dismiss-limbo-modal":()=>{P(),Ma()},"approve-ritual":(e,t)=>{Ib(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{Vu(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}ne(t.issueId)},"create-sprint-document":async(e,t)=>{await Fy(t.sprintId,t.projectId,()=>{ti(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Se(t.documentId)}});function Gr(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function kb(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}ut(e=>{e==="currentProject"&&T()==="rituals"&&zr()});let zu=0;async function zr(){const e=V(),t=document.getElementById("rituals-content"),n=++zu;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=q({icon:M.projects,heading:"Select a project",description:"Choose a project to view and manage its rituals"}));return}tw(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await ps();n===zu&&!i&&t&&(t.innerHTML=q({icon:M.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function Eb(){tp(_b),zr()}function _b(){const e=document.getElementById("rituals-content"),t=nw(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,si("rv-sprint-rituals-list",n,"sprint"),si("rv-close-rituals-list",i,"close"),si("rv-claim-rituals-list",s,"claim")}function xb(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function Ib(e,t){try{await v.approveAttestation(e,t),k("Ritual approved!","success"),await Ma(),Fr()}catch(n){E("approve ritual",n)}}function Vr(e){return e==="document"?`
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
        `:""}function Wr(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){k("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){k("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function Vu(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Vr(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{Sb(s,e,t,i)}),U()}async function Sb(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=Wr(i);if(a===void 0)return!1;try{await v.completeGateRitual(t,n,s||null,a),k("Ritual completed!","success"),await Ma();const o=nb();o&&!o.in_limbo?(P(),k("Limbo cleared! Next sprint is now active.","success")):Fr()}catch(o){E("complete gate ritual",o)}return!1}function Tb(e,t){if(e.attestation&&e.attestation.approved_at)return'<span class="text-success">Completed</span>';if(e.attestation&&!e.attestation.approved_at)return`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Approve</button>
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}">Reject</button>
        `;const n=p(e.artifact||"");if(e.approval_mode==="gate"){const i=`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${n}">Complete</button>`;return e.last_rejection&&!e.last_rejection.superseded_at?i:`${i}
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" title="Send the gate request back with a reason">Reject</button>`}return e.note_required||e.artifact?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-prompt="${p(e.prompt||"")}" data-ritual-artifact="${n}" data-ritual-note-required="${e.note_required?"1":""}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Attest</button>`}function Lb(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${f(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${Vr(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{Cb(o,e,t,s,a)}),U()}async function Cb(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return k("A note is required for this attestation.","error"),!1;const o=Wr(i);if(o===void 0)return!1;try{await v.attestTicketRitual(t,n,a||null,o),k("Ritual attested!","success"),P(),await ss(n)}catch(r){E("attest ticket ritual",r)}return!1}async function Ab(e,t){try{await v.attestTicketRitual(e,t),k("Ritual attested!","success"),await ss(t)}catch(n){E("attest ticket ritual",n)}}async function Bb(e,t){try{await v.approveTicketRitual(e,t),k("Ritual approved!","success"),await ss(t)}catch(n){E("approve ticket ritual",n)}}function Db(e){return!e||e.superseded_at?"":`<div class="ticket-ritual-rejection"><strong>Rejected by ${f(e.rejected_by_name||"Someone")}:</strong> ${f(e.note||"")}</div>`}function Wu(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{jb(s,e,t,n,i)}),U()}async function jb(e,t,n,i,s=null){e.preventDefault();const a=document.getElementById("reject-ritual-note").value.trim();if(!a)return k("A rejection needs a reason.","error"),!1;try{await v.rejectTicketRitual(t,n,a),k(`"${i}" rejected. The attester has been told why.`,"success"),P(),s&&await s()}catch(o){E("reject ritual",o)}return!1}function Mb(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Vr(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{Rb(s,e,t,i)}),U()}async function Rb(e,t,n,i=""){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value,a=Wr(i);if(a===void 0)return!1;try{await v.completeTicketGateRitual(t,n,s||null,a),k("Ritual completed!","success"),P(),await ss(n)}catch(o){E("complete ticket ritual",o)}return!1}ee({"show-create-ritual-modal":(e,t)=>{rp(t.trigger)},"approve-ticket-ritual":(e,t)=>{Bb(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{Wu(t.ritualId,t.issueId,t.ritualName,()=>ss(t.issueId))},"complete-ticket-ritual":(e,t)=>{Mb(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{Lb(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{Ab(t.ritualId,t.issueId)},"retry-load-rituals":()=>zr()});function mt(e){if(!e)return"";try{z.setOptions({breaks:!0,gfm:!0});const n=z.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return zc.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function ds(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function Pb(e,t,n,i,s,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Requested by <strong>${f(o)}</strong>${r?` ${ds(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{qb(c,e,t,n)}),U(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function qb(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await v.completeTicketGateRitual(t,n,s||null),k(`GATE ritual "${i}" approved!`,"success"),P(),_t()}catch(a){E("complete gate ritual",a)}}function Nb(e,t,n,i,s,a,o,r){Pb(e,t,n,i,s,a,o,r)}function Ob(e,t,n,i,s,a,o,r,l){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Attested by <strong>${f(o)}</strong>${r?` ${ds(r)}`:""}</div>`:""}
                ${l?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${mt(l)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{Hb(d,e,t,n)}),U(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function Hb(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{await v.approveTicketRitual(t,n);let r=null;if(s)try{r=await v.createComment(n,s)}catch(l){console.error("Failed to post approval comment:",l)}k(`Review ritual "${i}" approved!`,"success"),Fo(r),P(),_t()}catch(r){E("approve review ritual",r)}}function Fb(e,t,n,i,s,a,o,r,l){Ob(e,t,n,i,s,a,o,r,l)}ut(e=>{e==="currentProject"&&T()==="approvals"&&_t()});let Kr=[],Yr=0;async function _t(){if(!L())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++Yr;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=V(),i=n?Z().filter(r=>r.id===n):Z(),s=await Promise.all(i.map(async r=>{const[l,c]=await Promise.all([v.getPendingApprovals(r.id),v.getLimboStatus(r.id)]);return{project:r,approvals:l,limbo:c}}));if(t!==Yr)return;const a=[],o=[];for(const{project:r,approvals:l,limbo:c}of s)if(a.push(...l),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(u=>{var m;return(m=u.attestation)!=null&&m.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});d.length>0&&o.push({project:r,rituals:d})}Mg(a),Kr=o,Ku()}catch(n){if(t!==Yr)return;e.innerHTML=q({icon:M.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),E("load approvals",n)}}function Ku(){const e=document.getElementById("approvals-list");if(!e)return;const t=jg(),n=Kr.length>0,i=!yg();if(t.length===0&&!n){i?e.innerHTML=`
                <div class="empty-state approvals-explainer">
                    <div class="empty-state-icon">${M.issues}</div>
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
            `:e.innerHTML=q({icon:M.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let s="";n&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${Kr.map(({project:d,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${f(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(m=>{const g=m.attestation&&!m.attestation.approved_at,y=g?"⏳":"○",w=g?`<span class="gate-waiting-info">Attested by <strong>${f(m.attestation.attested_by_name||"Unknown")}</strong></span>`:m.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',$=g?`<button class="btn btn-small btn-primary sprint-approve-btn"
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
                                                ${w}
                                            </div>
                                            ${$}
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
                    ${r.map(Zr).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(Zr).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(Zr).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Nb(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var g;d.disabled=!0;const u=(g=d.closest(".gate-ritual-actions"))==null?void 0:g.querySelector(".review-approve-btn");u&&(u.disabled=!0);const m=d.dataset;try{await v.approveTicketRitual(m.ritualId,m.issueId),k(`Review ritual "${m.ritualName}" approved!`,"success"),await _t()}catch(y){d.disabled=!1,u&&(u.disabled=!1),E("approve review ritual",y)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Fb(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".gate-reject-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Wu(u.ritualId,u.issueId,u.ritualName,()=>_t())})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await v.approveAttestation(d.dataset.ritualId,d.dataset.projectId),k("Sprint ritual approved!","success"),await _t()}catch(u){d.disabled=!1,E("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{Vu(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName,d.dataset.ritualArtifact||"")})})}function Ub(){bg(),Ku()}function Zr(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${f(i.requested_by_name)}</strong>${i.requested_at?` (${ds(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note">${mt(i.attestation_note)}</div>`:"",l=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=!s&&i.rejection_note,d=c?`<div class="gate-rejection-note"><strong>Rejected by ${f(i.rejected_by_name||"Someone")}</strong>${i.rejected_at?` (${ds(i.rejected_at)})`:""}: ${f(i.rejection_note)}<br><span class="text-muted">Waiting for the requester to ask again.</span></div>`:"",u=`<button class="btn btn-small btn-secondary gate-reject-btn"
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
    `}ee({"view-issue-from-modal":(e,t)=>{e.preventDefault(),P(),ne(t.issueId)},"dismiss-approvals-explainer":()=>{Ub()},"retry-load-approvals":()=>_t()});const Pa={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},qa={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Yu=0;function Zu(e){Yu=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=Qu(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Qu(e="",t="",n=""){const i=Yu++,s=Object.keys(Pa).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?Pa[e]:Pa.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${qa[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
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
    `}function Gb(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Qu()),Na()}function zb(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Na()}function Vb(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=Pa[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${qa[o]}</option>`).join(""),Xu(e),Na()}function Xu(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function us(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Na(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Ju(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,l=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,c=o.querySelector(".condition-value");let d=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw us("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw us("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${l}`;if(n.has(u))throw us(`Duplicate condition: ${r} ${qa[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),l==="isnull")t[u]=!0;else if(l==="in"||l==="contains")t[u]=d?d.split(",").map(m=>m.trim()).filter(m=>m):[];else if(l==="gte"||l==="lte"){if(!d)throw us(`Please enter a numeric value for ${r} ${qa[l]}.`),new Error(`Missing numeric value for ${u}`);const m=parseInt(d,10);if(isNaN(m))throw us(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${d}`);t[u]=m}else t[u]=d}return Na(),Object.keys(t).length>0?t:null}ee({"add-condition-row":()=>{Gb()},"remove-condition-row":(e,t)=>{zb(Number(t.rowId))},"update-operator-options":(e,t)=>{Vb(Number(t.rowId))},"toggle-value-input":(e,t)=>{Xu(Number(t.rowId))}});let ke=[],Qr=null;const ep=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];ut((e,t)=>{e==="currentProject"&&(t&&rg(t),ep.forEach(n=>{const i=document.getElementById(n);i&&(i.value=t||"")}),pw(t||""))});const Oa={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function tp(e){Qr=e}function Z(){return ke}function ni(e){const t=ke.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return Oa[n]||Oa.fibonacci}function Ha(e,t){if(e==null)return"No estimate";const i=ni(t).find(s=>s.value===e);return i?i.label:`${e} points`}function Xr(e,t){return e==null||e===0?!1:!ni(t).some(i=>i.value===e)}function Wb(e){const t=ke.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(Oa[n]||Oa.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function rt(){if(L())try{ke=await v.getProjects(L().id),Kb();const e=V();if(e&&ke.some(i=>i.id===e))return;const t=Jr();if(t&&ke.some(i=>i.id===t)){st(t);return}const n=Wc();if(n&&ke.some(i=>i.id===n)){st(n);return}ke.length>0&&st(ke[0].id)}catch(e){E("load projects",e)}}function Kb(){const e='<option value="">All Projects</option>'+ke.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+ke.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],i=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),i.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const s=V();ep.forEach(a=>{const o=document.getElementById(a);o&&(o.value=s||"")})}function np(){return Wc()}function ii(){const e=document.getElementById("projects-list");if(ke.length===0){e.innerHTML=q({icon:M.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=ke.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${p(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${J(t.color)}20; color: ${J(t.color)}">
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
    `).join("")}function Yb(e){st(e),N("issues")}function ip(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function Zb(e){e.preventDefault();const t=L();if(!t){k("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.createProject(t.id,n),await rt(),ii(),P(),k("Project created!","success")}catch(i){E("create project",i)}return!1}async function Qb(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.updateProject(t,n),await rt(),ii(),P(),k("Project updated!","success")}catch(i){E("update project",i)}return!1}async function Xb(e){const t=ke.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await v.deleteProject(e),await rt(),ii(),P(),k("Project deleted","success")}catch(n){E("delete project",n)}}let Te=null;function sp(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function Jb(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await v.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(Te!==e.id)return;const i=n.filter(a=>a.id===e.default_epic_id||a.status!=="done"&&a.status!=="canceled"),s=e.default_epic_id&&!i.some(a=>a.id===e.default_epic_id)?`<option value="${p(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(a=>`<option value="${p(a.id)}">${f(a.identifier)} ${f(a.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function ap(e){Te=e,ke.length===0&&await rt();const t=ke.find(n=>n.id===e);if(!t){k("Project not found","error"),N("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,sp("ps-require-assignee-on-claim",t.require_assignee_on_claim===!0),sp("ps-require-epic-on-close",t.require_epic_on_close===!0),Jb(t),document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),op("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function op(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!qt||qt.length===0)&&ps()}function ew(){Te=null,qt=[]}function tw(e){Te=e}function nw(){return qt}async function iw(){if(!Te)return;const e=document.getElementById("ps-name").value.trim();if(!e){k("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await v.updateProject(Te,t),await rt(),k("Settings saved","success");const n=ke.find(i=>i.id===Te);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){E("save project settings",n)}}async function sw(){if(!Te)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const a=document.getElementById("ps-default-epic");a&&!a.disabled&&(n.default_epic_id=a.value||null);try{await v.updateProject(Te,n),await rt(),k("Settings saved","success")}catch(o){E("save settings",o)}}let qt=[];async function ps(){if(!Te)return!1;try{return qt=await v.getRituals(Te),aw(),typeof Qr=="function"&&Qr(),!0}catch(e){return E("load rituals",e),!1}}function aw(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=qt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=qt.filter(i=>i.trigger==="ticket_close"),n=qt.filter(i=>i.trigger==="ticket_claim");si("ps-sprint-rituals-list",e,"sprint"),si("ps-close-rituals-list",t,"close"),si("ps-claim-rituals-list",n,"claim")}function si(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>p(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${f(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${f(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${mt(a.prompt)}</div>
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
  `}).join("")}async function rp(e){if(!Te)return;let t=[];try{t=await v.getRitualGroups(Te)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Zu(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,U()}function ow(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function rw(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function lp(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw k("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await v.createRitualGroup(Te,{name:t,selection_mode:n})).id}return e.value||null}async function lw(e){var s;e.preventDefault();let t;try{t=Ju()}catch{return!1}let n;try{n=await lp()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await v.createRitual(Te,i),await ps(),P(),k("Ritual created!","success")}catch(a){E("create ritual",a)}return!1}async function cw(e){const t=qt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await v.getRitualGroups(Te)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Zu(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,U()}async function dw(e,t){var a;e.preventDefault();let n;try{n=Ju()}catch{return!1}let i;try{i=await lp()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await v.updateRitual(t,s),await ps(),P(),k("Ritual updated!","success")}catch(o){E("update ritual",o)}return!1}async function uw(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await v.deleteRitual(e),await ps(),k("Ritual deleted","success")}catch(n){E("delete ritual",n)}}ee({"view-project":(e,t)=>{Yb(t.projectId)},"view-project-settings":(e,t)=>{ap(t.projectId)},"create-project":e=>{Zb(e)},"update-project":(e,t)=>{Qb(e,t.projectId)},"confirm-delete-project":(e,t)=>{Xb(t.projectId)},"edit-project-ritual":(e,t)=>{cw(t.ritualId)},"delete-project-ritual":(e,t)=>{uw(t.ritualId,t.ritualName)},"create-project-ritual":e=>{lw(e)},"update-project-ritual":(e,t)=>{dw(e,t.ritualId)},"toggle-ritual-conditions":()=>{ow()},"ritual-group-change":()=>{rw()}});function Jr(){const t=new URLSearchParams(window.location.search).get("project");return t||np()}function pw(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const el={},cp=new Map;let tl=null,nl=null,il=null,sl=null,al=null,ol=null,rl=null,dp=!1;function mw(e){Object.assign(el,e)}function fw({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a,beforeScrollRestore:o}={}){e&&(tl=e),t&&(nl=t),n&&(il=n),i&&(sl=i),s&&(al=s),a&&(ol=a),o&&(rl=o)}function up(){return Object.keys(el)}const gw=["issues","query","board","sprints","epics","documents","rituals","approvals","my-issues"],pp={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects"};function Fa(e){document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)})}function N(e,t=!0,{transition:n=!1}={}){if(t&&En(),zo(e),t){let a;const o=Jr();e==="my-issues"?a=o?`/?project=${o}`:"/":e==="issues"&&window.location.search?a=`/issues${window.location.search}`:gw.includes(e)&&o?a=`/${e}?project=${o}`:a=`/${e}`,history.pushState({view:e},"",a)}Fa(e),tl&&tl();const i=()=>{document.querySelectorAll(".view").forEach(o=>o.classList.add("hidden"));const a=document.getElementById(`${e}-view`);a&&a.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=el[e];s&&s(),t&&window.scrollTo(0,0)}function mp(){var s;zo(null);const e=window.location.pathname.split("/").filter(Boolean),t={"gate-approvals":"approvals"},n=e.length===0?"my-issues":t[e[0]]||e[0],i=e.length<=1&&up().includes(n);document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden")),i?((s=document.getElementById(`${n}-view`))==null||s.classList.remove("hidden"),Fa(n)):Fa(pp[e[0]]||null)}function fp(){var i;const t=window.location.pathname.split("/").filter(Boolean);sl&&sl(),T()||zo("my-issues");let n="my-issues";if(t.length===0||t[0]==="")N("my-issues",!1);else if(nl&&nl(t)){const s=pp[t[0]];s&&Fa(s);return}else{n=t[0];const s={"gate-approvals":"approvals"};s[n]&&(n=s[n]),up().includes(n)?N(n,!1):(n="my-issues",N("my-issues",!1))}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function En(){cp.set(window.location.href,window.scrollY)}function gp(e){En(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),al&&al(e)}function hp(e){En(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),ol&&ol(e)}function vp(){const e=cp.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{rl&&rl(),window.scrollTo(0,e)})}function hw(){dp||(dp=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&il&&il(e.state)){vp();return}(t=e.state)!=null&&t.view?N(e.state.view,!1):fp(),vp()}))}let Nt=0,ai=!1,ms=null,Ua=null,fs=0;const _n=new Map;function Ga(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Nt===0&&!ai),e.textContent=ai?"Stopped":"Offline",e.title=ai?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function Fe(e,t){return _n.has(e)||_n.set(e,new Set),_n.get(e).add(t),()=>{var n;return(n=_n.get(e))==null?void 0:n.delete(t)}}function vw(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const yw=1e3;function za(){Ua&&(clearTimeout(Ua),Ua=null)}const bw="chaotic",ll=4001,ww=4003,$w="chaotic.bearer.";function kw(e){return[bw,$w+e]}function yp(e,{isReconnect:t=!1}={}){ms&&(clearTimeout(ms),ms=null),za();const n=qg();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),Wo(null)),!t&&(Nt>0||ai)&&(Nt=0,ai=!1,Ga());const i=v.getToken();if(!i)return;const s=++fs,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o,kw(i));Wo(r);let l=!1;const c=()=>{if(l||s!==fs)return;l=!0,za();const d=Nt>0;d&&k("Live updates reconnected","success"),Nt=0,Ga(),d&&cl({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===fs&&(console.log("WebSocket connected"),za(),Ua=setTimeout(c,yw))},r.onmessage=d=>{if(s!==fs)return;c();let u;try{u=JSON.parse(d.data)}catch(m){console.error("WebSocket: malformed message",m);return}cl(u)},r.onclose=d=>{if(s!==fs)return;console.log("WebSocket disconnected"),za();const u=d==null?void 0:d.code;if(u===ll||u===ww){Wo(null),Nt=0;const g=u===ll&&Vc()===i;ai=!g,Ga();let y="forbidden";u===ll&&(y=g?"unauthorized":"superseded"),cl({type:y,entity:"connection",data:{code:u,teamId:e}});return}Nt++,Nt===1&&k("Live updates disconnected. Reconnecting...","warning"),Ga();const m=vw(Nt-1);ms=setTimeout(()=>{ms=null,L()&&L().id===e&&yp(e,{isReconnect:!0})},m)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function cl(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=_n.get(`${n}:${t}`);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=_n.get(n);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=_n.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}const Ew={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device",children_closed:"Nothing left open"};let oi=0,xt=!1,ge=null,rn=null;const gs=new Set,It=new Map,lt=new Map;function bp(e){It.get(e)===null&&It.set(e,oi)}function dl(e){const t=lt.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=oi)}function _w(e){return e.filter(t=>!It.has(t.id)).map(t=>{const n=lt.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(xt&&lt.has(t.id)&&t.id!==ge))}function xw(e){for(const[t,n]of It)n!==null&&e>n&&It.delete(t);for(const[t,n]of lt)n.confirmedAfter!==null&&e>n.confirmedAfter&&lt.delete(t)}function Iw(e,t){t!=null&&t.id&&(e==="archived"?(It.has(t.id)||It.set(t.id,null),bp(t.id)):e==="read"&&dl(t.id))}async function ri(){const e=L();if(e){try{const t=await v.getInboxUnreadCount(e.id);qi(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}hs()}}function hs(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=ta();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0);const n=document.getElementById("inbox-header-count");n&&(n.textContent=t>0?`${t} unread`:"")}async function vs({focusFirst:e=!1,background:t=!1}={}){const n=L();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++oi;t||(rn={focusFirst:e||!!(rn!=null&&rn.focusFirst)},ge=null,Sw(i));try{const a=await v.getInbox(n.id,{unread:xt,limit:100});if(s!==oi)return;const o=new Set(It.keys());xw(s);const r=_w(a||[]),l=rn;rn=null,l?(jt(r),bs(),l.focusFirst&&!nt()&&Cw()):Tw(r,o)}catch(a){if(s!==oi)return;rn?(rn=null,i.innerHTML=q({icon:M.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),E("load inbox",a)):console.error("Failed to refresh inbox:",a)}ri()}function Sw(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function Va(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function wp(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function $p(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function kp(e,t){if(!e)return;const n=Va(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=wp(n||t)),i==null||i.focus({preventScroll:!0})}function Tw(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=fe(),s=[...n.querySelectorAll(".inbox-row")],a=n.querySelector(".inbox-row.keyboard-selected"),o=(a==null?void 0:a.dataset.entryId)||null,r=a?s.indexOf(a):-1,l=$p(),c=window.scrollY,d=n.scrollTop;let u=e;if(ge&&!e.some(y=>y.id===ge)){const y=i.find(w=>w.id===ge);if(y&&xt&&!t.has(ge)){u=[...e];const w=u.findIndex($=>$.created_at<y.created_at);u.splice(w===-1?u.length:w,0,y)}else ge=null}jt(u),bs();let m=-1;o&&(m=u.findIndex(y=>y.id===o),m===-1&&u.length&&(m=Math.min(r,u.length-1))),m>=0?ys(m,{focus:!1}):ea(-1);const g=m>=0?n.querySelectorAll(".inbox-row")[m]:null;kp(l,g),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function Lw(e,t){if(!(t!=null&&t.id))return!1;const n=fe().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function li(e){const t=fe();for(const n of new Set(e)){const i=Va(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const a=i.contains(document.activeElement)?$p():null,o=document.createElement("template");o.innerHTML=Sp(s).trim();const r=o.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),kp(a,r)}}function ys(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){ea(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),ea(i),t&&wp(n[i]).focus({preventScroll:!0})}function Cw(){ys(0)}async function ul(e){const t=fe(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;ge===e&&(ge=null),It.set(e,null),jt(t.filter(a=>a.id!==e)),s&&qi(Math.max(0,ta()-1)),bs(),hs(),ys(n);try{await v.archiveInbox(e),bp(e)}catch(a){It.delete(e),console.error("Failed to archive inbox entry:",a)}}function Ep(e){var s,a;const n=fe().findIndex(o=>o.id===e);if(n===-1)return;const i=ge;ge=i===e?null:e,ge===e&&_p(e),li([i,e]),ys(n),ge===e&&((a=(s=Va(e))==null?void 0:s.scrollIntoView)==null||a.call(s,{block:"nearest"}))}function _p(e){const t=fe(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,lt.set(e,{readAt:i,confirmedAfter:null}),jt([...t]),qi(Math.max(0,ta()-1)),hs(),v.markInboxRead(e).then(()=>dl(e),s=>{var o;((o=lt.get(e))==null?void 0:o.readAt)===i&&lt.delete(e);const a=fe().find(r=>r.id===e);a&&a.read_at===i&&(a.read_at=null,jt([...fe()]),li([e])),ri(),E("mark inbox entry read",s)})}function Aw(e){var i;const n=fe().findIndex(s=>s.id===e);if(n!==-1){if(_p(e),xt)ge===e&&(ge=null),jt(fe().filter(s=>s.id!==e)),bs(),ys(n);else if(li([e]),!document.activeElement||document.activeElement===document.body){const s=Va(e);(i=s==null?void 0:s.querySelector(".inbox-row-toggle"))==null||i.focus({preventScroll:!0})}}}function Bw(){if(ge===null)return!1;const e=ge;return ge=null,li([e]),!0}function xp(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function Dw(e){if(gs.has(e))return;const t=fe().find(i=>i.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender";gs.add(e),xp(e,!0);try{await v.updateIssue(t.issue_id,{assignee_id:t.source_user_id})}catch(i){gs.delete(e),xp(e,!1),E(`reassign ${t.issue_identifier||"issue"} back to ${n}`,i);return}gs.delete(e),ul(e)}function jw(){Ip(!xt)}function Ip(e){e!==xt&&(xt=e,document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(t=>{const n=t.dataset.filter==="unread"===xt;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),vs({focusFirst:!0}))}const Mw='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',Rw='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';function Pw(e){const t=[...(e||"").trim()][0];return t?t.toUpperCase():"•"}function Sp(e){const t=!e.read_at,n=e.id===ge,i=Ew[e.kind]||e.kind,s=e.issue_identifier||e.document_title||"",a=[`data-entry-id="${p(e.id)}"`,e.issue_id?`data-issue-id="${p(e.issue_id)}"`:"",e.document_id?`data-document-id="${p(e.document_id)}"`:""].filter(Boolean).join(" "),o=`inbox-panel-${e.id}`;return`
        <div class="inbox-row${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${a}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${p(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${p(o)}"`:""}>
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':'<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${f(Pw(e.source_user_name))}</span>
                    <span class="inbox-row-header">
                        <span class="badge badge-inbox-${p(e.kind)}">${f(i)}</span>
                        ${s?`<span class="inbox-row-source">${f(s)}</span>`:""}
                    </span>
                    <span class="inbox-row-text">
                        <span class="inbox-row-title">${f(e.title)}</span>
                        ${!n&&e.body?`<span class="inbox-row-body">${f(e.body)}</span>`:""}
                    </span>
                </button>
                ${n?qw(e,s,o):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${t?`<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${p(e.id)}" title="Mark read" aria-label="Mark read">${Mw}</button>`:""}
                    <button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${p(e.id)}" title="Archive (e)" aria-label="Archive">${Rw}</button>
                </span>
                <span class="inbox-row-time">${f(ds(e.created_at))}</span>
            </div>
        </div>
    `}function qw(e,t,n){const i=(e.kind==="assignment"||e.kind==="review_requested")&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,a=e.source_user_name,o=t?`Open ${f(t)}`:"Open",r=[i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${p(e.id)}"${gs.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${a?` to ${f(a)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
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
    `}function bs(){const e=document.getElementById("inbox-list");if(!e)return;const t=fe();if(t.length===0){e.innerHTML=q({icon:M.inbox,heading:xt?"No unread items":"Inbox zero",description:xt?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=Ow(t)}function Nw(e,t=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"Older";const i=a=>new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),s=Math.round((i(t)-i(n))/864e5);return s<=0?"Today":s===1?"Yesterday":s<7?"Last 7 days":"Older"}function Ow(e){const t=[];for(const n of e){const i=Nw(n.created_at),s=t[t.length-1];s&&s.label===i?s.entries.push(n):t.push({label:i,entries:[n]})}return t.map((n,i)=>`
        <section class="inbox-group" aria-labelledby="inbox-group-${i}">
            <h3 class="inbox-group-header" id="inbox-group-${i}">${f(n.label)}</h3>
            ${n.entries.map(s=>Sp(s)).join("")}
        </section>
    `).join("")}async function Hw(e){var s;const t=fe().find(a=>a.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();lt.set(e,{readAt:n,confirmedAfter:null});try{await v.markInboxRead(e)}catch(a){((s=lt.get(e))==null?void 0:s.readAt)===n&&lt.delete(e);const o=fe().find(r=>r.id===e);o&&o.read_at===n&&(o.read_at=null,jt([...fe()]),li([e])),console.error("Failed to mark inbox entry read:",a);return}dl(e);const i=fe().find(a=>a.id===e);i&&!i.read_at?(i.read_at=n,jt([...fe()]),qi(Math.max(0,ta()-1)),hs(),li([e])):ri()}async function Fw(){const e=L();if(e)try{await v.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of fe())n.read_at||lt.set(n.id,{readAt:t,confirmedAfter:oi});jt(fe().map(n=>({...n,read_at:n.read_at||t}))),qi(0),hs(),bs()}catch(t){E("mark all inbox entries read",t)}}function Uw(e){e.entryId&&Hw(e.entryId),e.issueId?ne(e.issueId):e.documentId&&Se(e.documentId)}function Gw(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&ul(e.dataset.entryId)}function zw(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Ep(e.dataset.entryId)}const Vw='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function Ww(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(Vw);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function Kw(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}ee({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&Kw((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||Ww(e.target,n)||(e.preventDefault(),t.entryId&&Ep(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),Uw(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Dw(t.entryId)},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&ul(t.entryId)},"toggle-inbox-unread-filter":()=>jw(),"set-inbox-filter":(e,t)=>Ip(t.filter==="unread"),"mark-inbox-read":(e,t)=>{e.preventDefault(),t.entryId&&Aw(t.entryId)},"mark-all-inbox-read":()=>Fw(),"retry-load-inbox":()=>vs({focusFirst:!0})});let Wa=[],ci=[],pl=[],ml=[];function Yw(){return Wa}function xn(){return ci}async function fl(e=null){try{Wa=await(e||v.getMyTeams()),Zw()}catch(t){E("load teams",t)}}function Zw(){const e=document.getElementById("team-list");Wa.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Wa.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${p(JSON.stringify(t))}">${f(t.name)}</button>
        `).join("")}async function gl(e,t=!1){Ni(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const i=document.getElementById("team-description-text");i&&(i.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),yp(e.id),await Promise.all([rt(),g$(),Xw(),Fv(),ri()]),t?fp():N(T()||"my-issues")}function Tp(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Qw(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Xw(){if(L())try{ci=await v.getTeamMembers(L().id),aa(xn,Ji),Hi()}catch(e){console.error("Failed to load team members:",e),E("load team members",e)}}function hl(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let vl=0;async function yl(){if(!L())return;const e=++vl,t=document.getElementById("team-members-list");t&&(t.innerHTML=hl());try{const n=await v.getTeamMembers(L().id);if(e!==vl)return;ci=n,aa(xn,Ji),Hi(),Jw()}catch(n){if(e!==vl)return;t&&(t.innerHTML=q({icon:M.team,heading:"Couldn't load members",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-members"},variant:"error"})),ci=[],Lp(),E("load team members",n)}}function Ka(){var n;const e=(n=$t())==null?void 0:n.id,t=ci.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function Lp(){const e=document.getElementById("invite-member-btn");e&&e.classList.toggle("hidden",!Ka())}function Jw(){const e=document.getElementById("team-members-list"),t=Ka();Lp(),e.innerHTML=ci.map(n=>`
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
                ${t&&n.user_id!==$t().id&&n.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${p(n.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}let bl=0;async function Ya(){if(!L())return;const e=++bl,t=document.getElementById("team-invitations-list");t&&(t.innerHTML=hl());try{const n=await v.getTeamInvitations(L().id);if(e!==bl)return;pl=n,e$()}catch(n){if(e!==bl)return;if((n==null?void 0:n.status)===403){document.getElementById("team-invitations-list").innerHTML="";return}console.error("Failed to load team invitations:",n),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function e$(){const e=document.getElementById("team-invitations-list");if(pl.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}const t=Ka();e.innerHTML=pl.map(n=>`
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
    `).join("")}let wl=0;async function Cp(){if(!L())return;const e=++wl,t=document.getElementById("team-agents-list");t&&(t.innerHTML=hl());try{const n=await v.getTeamAgents(L().id);if(e!==wl)return;ml=n,t$()}catch(n){if(e!==wl)return;t&&(t.innerHTML=q({icon:M.team,heading:"Couldn't load agents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-agents"},variant:"error"})),E("load team agents",n)}}function t$(){const e=document.getElementById("team-agents-list");if(e){if(ml.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=ml.map(t=>{const n=f(t.name),i=f(t.parent_user_name||"Unknown"),s=t.avatar_url||"🤖";return`
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
      `}).join("")}}function Ap(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function n$(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await v.createInvitation(L().id,t,n);if(await Ya(),i&&i.accept_url)return a$(t,s$(i.accept_url),i.email_queued===!0),!1;P(),k("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){i$(i)?k(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):E("send invitation",i)}return!1}function i$(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function Bp(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function s$(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!Bp(n.hostname)||Bp(i.hostname)?e:i.origin+n.pathname}function a$(e,t,n=!1){var a;const i=f(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${f(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,nt()||U(),(a=document.querySelector('[data-action="copy-invite-link"]'))==null||a.focus(),Dp()}function Dp(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function o$(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),k("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),k("Could not copy: the link is selected, copy it by hand","error")}}async function r$(e){let t;try{t=await v.issueInvitationVerificationCode(L().id,e)}catch(n){E("get a verification code",n);return}c$(t)}function l$(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let a;return s<3600?a=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?a=`${Math.round(s/3600)} h`:a=`${Math.round(s/86400)} days`,`${a} ${n>=i?"after":"before"} the invitation was created`}function c$(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=l$(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
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
    `,nt()||U(),Dp("invitation-code")}async function d$(e){if(confirm("Are you sure you want to remove this member?"))try{await v.removeMember(L().id,e),await yl(),k("Member removed!","success")}catch(t){E("remove member",t)}}async function u$(e){try{await v.deleteInvitation(L().id,e),await Ya(),k("Invitation canceled!","success")}catch(t){E("cancel invitation",t)}}function jp(){Tp(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,U()}function p$(){L()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${p(L().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${p(L().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${f(L().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,U())}async function m$(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await v.createTeam(t);await fl(),await gl(n),P(),k("Team created!","success")}catch(n){E("create team",n)}return!1}async function f$(e){if(e.preventDefault(),!L())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await v.updateTeam(L().id,t);Ni(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||"No description"),await fl(),P(),k("Team updated!","success")}catch(n){E("update team",n)}return!1}async function g$(){if(L())try{const e=await v.getLabels(L().id);Xs(e)}catch(e){console.error("Failed to load labels:",e),E("load labels",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),ee({"select-team":(e,t)=>{gl(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{d$(t.userId)},"delete-invitation":(e,t)=>{u$(t.invitationId)},"issue-invitation-code":(e,t)=>{r$(t.invitationId)},"retry-load-team-invitations":()=>{Ya()},"retry-load-team-members":()=>{yl()},"retry-load-team-agents":()=>{Cp()},"invite-member":e=>{n$(e)},"copy-invite-link":()=>{o$()},"dismiss-invite-link":()=>{P()},"create-team":e=>{m$(e)},"update-team":e=>{f$(e)}});let St=null,Ot=0,di=null,ui=null,ws=null,$l=!1;function h$(){return lg()}function Mp(){cg()}function Rp(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function v$(){St||(St=document.createElement("div"),St.id="onboarding-overlay",St.className="onboarding-overlay",document.getElementById("app").appendChild(St))}function $s(){if(!St)return;const e=$l?qp():Pp(),t=e[Ot],n=e.map((i,s)=>`<span class="onboarding-dot${s===Ot?" active":""}${s<Ot?" completed":""}"></span>`).join("");St.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Pp(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Rp(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Rp(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&di&&(e.textContent=`${di.name} (${di.key})`),t&&ui&&(t.textContent=`${ui.name} (${ui.key})`),n&&ws&&(n.textContent=`${ws.identifier} - ${ws.title}`)}}]}function qp(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function kl(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function El(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function pi(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function y$(){const e=$l?qp():Pp();Ot<e.length-1&&(Ot++,$s())}function b$(){Mp(),Op(),mi()}function w$(){Mp(),Op(),mi()}async function $$(e){e.preventDefault(),El("onboarding-team-error"),pi("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{di=await v.createTeam({name:t,key:n}),Ot++,$s()}catch(i){kl("onboarding-team-error",i.message||"Failed to create team"),pi("onboarding-team-submit",!1)}}async function k$(e){e.preventDefault(),El("onboarding-project-error"),pi("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{ui=await v.createProject(di.id,{name:t,key:n}),Ot++,$s()}catch(i){kl("onboarding-project-error",i.message||"Failed to create project"),pi("onboarding-project-submit",!1)}}async function E$(e){e.preventDefault(),El("onboarding-issue-error"),pi("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{ws=await v.createIssue(ui.id,{title:t}),Ot++,$s()}catch(n){kl("onboarding-issue-error",n.message||"Failed to create issue"),pi("onboarding-issue-submit",!1)}}function Np(e=!1){$l=e,Ot=0,di=null,ui=null,ws=null,v$(),$s()}function Op(){St&&(St.remove(),St=null)}function Hp(){dg(),Np(!0)}ee({"onboarding-next":e=>{e.preventDefault(),y$()},"onboarding-skip":e=>{e.preventDefault(),b$()},"onboarding-finish":e=>{e.preventDefault(),w$()},"onboarding-create-team":e=>{$$(e)},"onboarding-create-project":e=>{k$(e)},"onboarding-create-issue":e=>{E$(e)}});const Fp="/oauth/consent/";function _$(e){if(!e||!e.startsWith(Fp))return null;const t=e.slice(Fp.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function x$(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function I$(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function S$(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const Up={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function Za(e){const t=Up[e.trust]||Up.unverified,n=e.host?` · ${f(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${p(e.trust)}">${f(t)}${n}</span>`}function T$(e,t){return e.teams.map(n=>`<option value="${p(n.id)}"${n.id===t?" selected":""}>${f(n.name)}</option>`).join("")}function L$(e,t){const n=e&&t?e.agents.find(a=>a.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${f(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function Gp(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",a=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${p(i.id)}"${s}>${f(i.name+a)}</option>`)}return n.join("")}function zp(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${p(t.id)}">
            ${f(t.name)} <span class="oauth-muted">${f(t.key)}</span>
        </label>`).join("")}function C$(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${p(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${f(t.name)}${f(i)}
        </label>`}).join("")}function A$(e,t){const n=f(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${Za(t.client)}</p>
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
        </div>`}function B$(e,t){if(t.acts_as==="person"){A$(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=f(t.client.name),a=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",o=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${f(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${Za(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${f(t.redirect_host)}</strong></p>
            ${o}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${T$(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${Gp(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${p(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${zp(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${C$(t)}
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,_l(e,t)}function _l(e,t){var a;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const o=(a=e.querySelector("#oauth-team"))==null?void 0:a.value,r=L$(t.teams.find(l=>l.id===o),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function D$(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(o=>o.value),s=e.querySelector('input[name="oauth-policy"]:checked'),a={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const o=e.querySelector("#oauth-agent-name").value.trim();o&&(a.agent_name=o)}return a}function j$(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function ks(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${f(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function M$(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{v.logout(),t()})}function R$(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(u=>u.id===s.value);e.querySelector("#oauth-agent").innerHTML=Gp(d,null),e.querySelector("#oauth-projects").innerHTML=zp(d),_l(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>_l(e,n));let a=!1;const o=async d=>{if(!a){a=!0;try{const u=d?await v.approveOAuthRequest(t,D$(e)):await v.denyOAuthRequest(t);if(!x$(u.redirect)){ks(e,"The app's return address isn't one a browser should be sent to.");return}i(u.redirect)}catch(u){if(a=!1,u&&u.status===404){ks(e,"It has expired, was already answered, or belongs to someone else.");return}j$(e,u&&u.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),o(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>o(!1))}async function P$(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=I$();S$(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await v.getOAuthRequest(e)}catch(a){a&&a.status===404?ks(i,"It has expired, was already answered, or belongs to someone else."):a&&a.status===403&&a.detail&&a.detail.error_code==="web_login_required"?M$(i,n):a&&a.status===403?ks(i,"Only a person signed in to Chaotic can approve an app."):ks(i,a&&a.message||"Something went wrong");return}B$(i,s),R$(i,e,s,t)}const xl="/invite/",Es="/invite",Il="chaotic.inviteToken",Vp="invite-auth-notice";let Sl=null;const q$="This invitation is no longer valid.",N$={owner:"an owner",admin:"an admin",member:"a member"};function O$(e){if(!e||!e.startsWith(xl))return null;const t=e.slice(xl.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function Wp(){const{pathname:e}=window.location,t=O$(e);if(t){Sl=t;try{sessionStorage.setItem(Il,t)}catch{}return history.replaceState(null,"",Es),t}if(!Kp(e))return null;let n=null;try{n=sessionStorage.getItem(Il)}catch{}const i=n||Sl;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function Kp(e){return e===Es||e===`${Es}/`}function Yp(e){return Kp(e)||!!(e&&e.startsWith(xl))}function Tl(){Sl=null;try{sessionStorage.removeItem(Il)}catch{}}function H$(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function F$(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function Ll(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function Zp(){const e=F$();return Qa(),Ll(e),e}function U$(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),Qa()}function Qa(){var e;(e=document.getElementById(Vp))==null||e.remove()}function Cl(e){const t=e.invited_by_name?`<strong>${f(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=N$[e.role]||`a ${f(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${f(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${f(e.email_hint)}</strong>${G$(e)}</p>`}function G$(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${f(n)}`}const z$="Ask whoever invited you to send a new invitation.",V$="Reload the page to try again.";function Al(e,t=q$,n=z$){e.innerHTML=`
        <div class="invite-page">
            <h1>${f(t)}</h1>
            <p class="invite-muted">${f(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function W$(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function Qp(){window.location.pathname!==Es&&history.replaceState(null,"",Es),W$(Zp())}function K$(e,t){e.innerHTML=`
        <div class="invite-page">
            ${Cl(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function Y$(e,t,n){const i=H$(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${f(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${Cl(t)}
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
            ${Cl(t)}
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
        </div>`}function Z$(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function Q$(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),a=e.querySelector("#invite-code-form"),o=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=u=>{l.textContent=u,l.classList.remove("hidden")},d=()=>{var u;a.classList.remove("hidden"),(u=o.focus)==null||u.call(o)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const u=await v.requestEmailVerification(),m=Z$(u.expires_at);c(`We sent a code to ${u.email}${m?`; it works until ${m}`:""}.`),s.textContent="Send a new code",d()}catch(u){const m=u&&u.detail&&u.detail.error_code;if(u&&u.status===401){n();return}if(m==="email_already_verified"){t();return}c(u&&u.message||"Something went wrong"),u&&u.status===429&&d()}finally{s.disabled=!1}}}),a.addEventListener("submit",async u=>{var g;if(u.preventDefault(),r.disabled)return;const m=o.value.trim();if(m){r.disabled=!0;try{await v.confirmEmailVerification(m)}catch(y){r.disabled=!1;const w=y&&y.detail&&y.detail.error_code;y&&y.status===401?n():w==="email_already_verified"?t():(c(y&&y.message||"Something went wrong"),(g=o.select)==null||g.call(o));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function X$(e,t){Qa();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=Vp,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${f(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${f(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),Qa(),t()})}function Xa(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function J$(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,u;const a=Zp();a.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let o;try{o=await v.getInvitation(e)}catch(m){m&&m.status===404?(Tl(),Al(a)):Al(a,m&&m.message||"Something went wrong.",V$);return}if(!t){K$(a,o);const m=g=>{X$(o,()=>Ll(a)),n(g)};a.querySelector("#invite-sign-in").addEventListener("click",()=>m("login")),a.querySelector("#invite-sign-up").addEventListener("click",()=>m("signup"));return}Y$(a,o,t),(d=a.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=a.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async m=>{var y,w;if(l)return;l=!0,r.disabled=!0;let g;try{g=m===void 0?await v.acceptInvitation(e):await v.acceptInvitation(e,m)}catch($){l=!1,r.disabled=!1;const S=$&&$.detail&&$.detail.error_code;if(m!==void 0&&(S==="invalid_verification_code"||S==="invitation_code_expired"||$&&$.status===429)){Xa(a,$&&$.message||"That code did not work."),(w=(y=a.querySelector("#invite-admin-code"))==null?void 0:y.select)==null||w.call(y);return}$&&$.status===401?s():$&&($.status===404||$.status===400)?(Tl(),Al(a)):$&&$.status===403&&$.detail&&$.detail.error_code==="email_unverified"?(Xa(a,"Verify your email address to continue."),a.querySelector("#invite-accept-actions").classList.add("hidden"),a.querySelector("#invite-verify").classList.remove("hidden")):$&&$.status===403?Xa(a,`This invitation is for a different email address. Only ${o.email_hint} can accept it.`):Xa(a,$&&$.message||"Something went wrong");return}Tl(),Xp(a,o);try{await i(g.team_id,o.team_name)}catch($){console.error("Joined the team but could not open it:",$),Ll(a),Xp(a,o)}};r.addEventListener("click",()=>c()),(u=a.querySelector("#invite-admin-code-form"))==null||u.addEventListener("submit",m=>{m.preventDefault();const g=a.querySelector("#invite-admin-code").value.trim();g&&c(g)}),Q$(a,{onVerified:()=>{a.querySelector("#invite-verify").classList.add("hidden"),a.querySelector("#invite-error").classList.add("hidden"),a.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function Xp(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${f(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${f(t.team_name)}</a>
            </div>
        </div>`}function Bl(e){return J$(e,{user:$t(),showAuth:t=>{Is(),t==="signup"?tm():em()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),U$(),await mi({teamId:t}),k(`You joined ${n}`,"success")},signOut:()=>{v.logout(),Rn(null),Ni(null),Bl(e)}})}async function Jp(){const e=Wp();if(e){await Bl(e);return}if(Yp(window.location.pathname)){Qp();return}Is()}async function mi({teamId:e,teamsRequest:t=null}={}){const n=_$(window.location.pathname);if(n){await P$(n);return}const i=Wp();if(i){await Bl(i);return}if(Yp(window.location.pathname)){Qp();return}ek(),mp(),sk(),await fl(t);const s=Yw();if(s.length===0&&!h$()){Np();return}try{if(s.length>0){const a=e&&s.find(o=>o.id===e)||s[0];await gl(a,!0)}}finally{hw()}}let fi=null,_s=null,ft=null,gt=null;function xs(){fi||(fi=document.getElementById("auth-screen"),_s=document.getElementById("main-screen"),ft=document.getElementById("login-form"),gt=document.getElementById("signup-form"))}function Is(){xs(),fi&&fi.classList.remove("hidden"),_s&&_s.classList.add("hidden")}function ek(){xs(),fi&&fi.classList.add("hidden"),_s&&_s.classList.remove("hidden")}function em(){xs(),ft&&ft.classList.remove("hidden"),gt&&gt.classList.add("hidden")}function tm(){xs(),ft&&ft.classList.add("hidden"),gt&&gt.classList.remove("hidden")}async function tk(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await v.login(t,n),Rn(await v.getMe()),await mi(),k("Welcome back!","success")}catch(i){E("log in",i)}return!1}async function nk(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await v.signup(t,n,i),await v.login(n,i),Rn(await v.getMe()),await mi(),k("Account created successfully!","success")}catch(s){E("sign up",s)}return!1}function nm(){v.logout(),Rn(null),Ni(null),Is(),k("Signed out","success")}function ik(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function sk(){var i;const e=$t();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",Uo(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?ik(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${p(s)}" alt="${p(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function ak(){xs();const e=ft==null?void 0:ft.querySelector("form");e&&e.addEventListener("submit",s=>tk(s));const t=gt==null?void 0:gt.querySelector("form");t&&t.addEventListener("submit",s=>nk(s));const n=ft==null?void 0:ft.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),tm()});const i=gt==null?void 0:gt.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),em()})}let Dl=[];async function jl(){try{Dl=await v.getApiKeys(),ok()}catch(e){E("load API keys",e)}}function ok(){const e=document.getElementById("api-keys-list");if(e){if(Dl.length===0){e.innerHTML=q({icon:M.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=Dl.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${f(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${f(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Ze(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Ze(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${p(t.id)}" data-key-name="${p(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function rk(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,U()}async function lk(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await v.createApiKey(t);P(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,U()}catch(n){E("create API key",n)}return!1}async function ck(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),k("API key copied to clipboard","success")}catch{k("Failed to copy","error")}}async function dk(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await v.revokeApiKey(e),k("API key revoked","success"),await jl()}catch(n){E("revoke API key",n)}}ee({"create-api-key":e=>{lk(e)},"copy-api-key":()=>{ck()},"dismiss-api-key-modal":()=>{P(),jl()},"revoke-api-key":(e,t)=>{dk(t.keyId,t.keyName)}});let Ml=[];async function im(){try{Ml=await v.getConnections(),pk()}catch(e){E("load connected apps",e)}}function Rl(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function uk(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function pk(){const e=document.getElementById("connected-apps-list");if(e){if(Ml.length===0){e.innerHTML=q({icon:M.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=Ml.map(t=>t.acts_as==="person"?mk(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${f(Rl(t))} ${Za(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${f(t.agent?t.agent.name:"an agent")}</span>
                    <span>${f(uk(t))}</span>
                    <span>policy ${f(t.policy)}</span>
                    <span class="api-key-date">Connected ${Ze(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Ze(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${f(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(t.id)}" data-connection-name="${p(Rl(t))}">Disconnect</button>
        </div>
    `).join("")}}function mk(e){const n=`${e.device_name||"A device"} · ${Rl(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${f(n)} ${Za(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${Ze(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${Ze(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(e.id)}" data-connection-name="${p(n)}">Sign out</button>
        </div>
    `}async function fk(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await v.revokeConnection(e),k("App disconnected","success"),await im()}catch(n){E("disconnect app",n)}}ee({"revoke-connection":(e,t)=>{fk(t.connectionId,t.connectionName)}});let Pl=[];async function sm(){try{Pl=await v.getPushDevices(),gk()}catch(e){E("load push devices",e)}}const am={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function om(e){return e.label||e.platform||"Unnamed device"}function gk(){const e=document.getElementById("push-devices-list");if(e){if(Pl.length===0){e.innerHTML=q({icon:M.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=Pl.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${f(om(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${f(t.platform)}</span>`:""}
                    <span>via ${f(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${Ze(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${Ze(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${f(String(t.failure_count))} failed deliveries</span>`:""}
                    ${am[t.status]?`<span class="push-device-status">${f(am[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${p(t.installation_id)}" data-device-name="${p(om(t))}">Remove</button>
        </div>
    `).join("")}}async function hk(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await v.deletePushDevice(e),k("Device removed","success"),await sm()}catch(n){E("remove push device",n)}}ee({"remove-push-device":(e,t)=>{hk(t.installationId,t.deviceName)}});let Ja=!1,Ht=0,ln=[],eo=[];function vk(e){eo=e,ln=[...e]}function In(){return Ja}function yk(){if(Ja)return;Ja=!0,Ht=0,ln=[...eo];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&to()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>bk(n.target.value)),t.addEventListener("keydown",$k),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&wk(Number(i.dataset.commandIndex))}),Ss(),requestAnimationFrame(()=>t.focus())}function to(){Ja=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function bk(e){const t=e.toLowerCase().trim();t?ln=eo.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):ln=[...eo],Ht=0,Ss()}function Ss(){const e=document.getElementById("command-results");if(!e)return;if(ln.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};ln.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===Ht?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function wk(e){Ht=e,Ss()}function rm(e){const t=ln[e];t&&(to(),t.action())}function $k(e){switch(e.key){case"ArrowDown":e.preventDefault(),Ht=Math.min(Ht+1,ln.length-1),Ss();break;case"ArrowUp":e.preventDefault(),Ht=Math.max(Ht-1,0),Ss();break;case"Enter":e.preventDefault(),rm(Ht);break;case"Escape":e.preventDefault(),to();break}}ee({"execute-command":(e,t)=>{rm(Number(t.commandIndex))}});const kk=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function Ek(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${f(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${f(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function _k(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${f(e.title)}</h4>
        ${e.shortcuts.map(Ek).join("")}
    </div>`}function lm(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${kk.map(_k).join("")}
        </div>
    `,U()}const no=100,ql="status!=done,canceled",xk=["created","updated","priority","status","title","estimate"];function he(e){return e==null?"":f(String(e))}function cm(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${p(t)}">${he(n)}</a>`}function dm(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const Nl=[{id:"identifier",label:"ID",fixed:!0,render:e=>cm(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>cm(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>he(ye(e.status))},{id:"priority",label:"Priority",render:e=>he(Pe(e.priority))},{id:"type",label:"Type",render:e=>he(wt(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>he(dm(e,"assignee"))},{id:"creator",label:"Creator",render:e=>he(dm(e,"creator"))},{id:"project",label:"Project",render:e=>he(e.project_key)},{id:"sprint",label:"Sprint",render:e=>he(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=J(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${he(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>he(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${p(e.parent_id)}">${he(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>he(Ze(e.created_at))},{id:"updated",label:"Updated",render:e=>he(Ze(e.updated_at))},{id:"completed",label:"Completed",render:e=>he(Ze(e.completed_at))},{id:"due",label:"Due",render:e=>he(Ze(e.due_date))}],io=Object.fromEntries(Nl.map(e=>[e.id,e])),Ik=Nl.filter(e=>e.fixed).map(e=>e.id),Ol=["identifier","title","status","priority","assignee","updated"];function Hl(e){const t=new Set,n=[];for(const s of e||[]){const a=String(s).trim();!io[a]||t.has(a)||(t.add(a),n.push(a))}return n.length===0?[...Ol]:[...Ik.filter(s=>!t.has(s)),...n]}function Sk(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function Tk(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?Hl(t.get("cols").split(",")):[...Ol],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function Lk(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!Sk(e.cols,Ol)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function Ck(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function Ak({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=no,skip:a=0}){const o=["chaotic","issue","list"];let r=e||"",l=null;n||i?(o.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",o.push("--where",Ck(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],u=d.startsWith("-"),m=d.replace(/^[-+]/,"");let g=null;xk.includes(m)?(o.push("--sort",m,"--order",u?"desc":"asc"),c.length>1&&(g=`The CLI sorts by one field; only "${d}" was copied.`)):g=`The CLI cannot sort by "${m}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return o.push("--limit",String(s)),a>0&&o.push("--skip",String(a)),{command:o.join(" "),warning:l}}function Bk(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function Dk(e,t){const n=Hl(t).map(a=>io[a]),i=n.map(a=>`<th data-col="${p(a.id)}">${he(a.label)}</th>`).join(""),s=e.map(a=>`<tr class="query-row" data-issue-id="${p(a.id)}">${n.map(o=>`<td class="query-col-${p(o.id)}">${o.render(a)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function jk(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,a=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${a?"":" disabled"}>Next</button>`}let R=null,Fl=null,We=null,Ul=0,gi=!1,um=!1;function ie(e){return document.getElementById(e)}function pm(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function mm(e){const t=Lk({...Fl,cols:R.cols,group:R.group,view:R.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function Mk(){const e=ie("query-project-filter");if(!e)return;const t=['<option value="">All projects</option>'].concat(Z().map(n=>`<option value="${p(n.id)}">${he(n.name)}</option>`));e.innerHTML=t.join(""),e.value=R.teamScope?"":R.projectId||""}function Rk(){const e=ie("query-columns-menu");e&&(e.innerHTML=Nl.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${p(t.id)}"${R.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${he(t.label)}
        </label>`).join(""))}function so(e){const t=ie("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${he(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function fm(e){const t=ie("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function Gl(e){var t;(t=ie("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function Ts(){const e=ie("query-results"),t=ie("query-pager");if(!e)return;if(!We){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=We;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=Dk(n,R.cols),t&&(t.innerHTML=jk(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(a=>{a.dataset.enabled=String(!a.disabled)}),gi&&Gl(!0))}async function ao(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!R)return;const i=L(),s=R.teamScope?{teamId:i==null?void 0:i.id}:{projectId:R.projectId};if(!s.teamId&&!s.projectId){We=null,Ts(),so(R.teamScope?"Select a team first.":"Select a project.");return}const a=++Ul,o=R.where===null?ql:R.where,r=ie("query-results");gi=!0,r&&r.classList.add("loading"),Gl(!0);const l=()=>a===Ul&&T()==="query";try{const c=await v.queryIssues({...s,where:o,order:R.order,skip:(R.page-1)*no,limit:no});if(!l())return;R.where=c.where,R.order=c.order||null,Fl=pm(R),We={issues:c.issues||[],total:c.total,skip:c.skip};const d=ie("query-where");d&&d.value.trim()===o.trim()&&(d.value=c.where),so(null),gi=!1,Ts(),mm(e),t&&t()}catch(c){if(!l())return;gi=!1,n?n():We=null,Ts(),so(Bk(c))}finally{a===Ul&&(gi=!1,r&&r.classList.remove("loading"),Gl(!1))}}function gm(){if(!R)return;const e=ie("query-where");return R.where=e?e.value.trim():"",R.page=1,ao("push")}function Pk(e){if(R)return R.teamScope=!e,e&&(R.projectId=e),R.page=1,fm(null),ao("push",{onSuccess:()=>{e&&st(e)}})}function qk(e,t){if(!R||!io[e]||io[e].fixed)return;const n=R.cols.filter(i=>i!==e);R.cols=Hl(t?[...n,e]:n),Ts(),mm("replace")}function Nk(e){if(!R||!We||gi)return;const t=R.page+e;if(t<1||e>0&&We.skip+We.issues.length>=We.total)return;const n={page:R.page,result:We};return R.page=t,ao("push",{onFailure:()=>{R.page=n.page,We=n.result}})}async function Ok(){if(!R)return null;const e=ie("query-where"),t=e?e.value.trim():R.where??ql,n=R.teamScope?null:Z().find(o=>o.id===R.projectId),{command:i,warning:s}=Ak({where:t,order:R.order,teamScope:R.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:no,skip:We?We.skip:0}),a=ie("query-cli-preview");try{await navigator.clipboard.writeText(i),k(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),a&&a.classList.add("hidden")}catch{a&&(a.textContent=i,a.classList.remove("hidden")),k("Could not copy; the command is shown below the box","warning")}return i}function Hk(){var e,t,n,i,s,a,o;um||(um=!0,(e=ie("query-where"))==null||e.addEventListener("keydown",r=>{r.key==="Enter"&&!r.shiftKey&&!r.isComposing&&(r.preventDefault(),gm())}),(t=ie("query-run-btn"))==null||t.addEventListener("click",()=>gm()),(n=ie("query-copy-cli-btn"))==null||n.addEventListener("click",()=>Ok()),(i=ie("query-project-filter"))==null||i.addEventListener("change",r=>Pk(r.target.value)),(s=ie("query-columns-btn"))==null||s.addEventListener("click",r=>{r.stopPropagation();const l=ie("query-columns-menu");if(!l)return;const c=l.classList.toggle("hidden")===!1;r.currentTarget.setAttribute("aria-expanded",String(c))}),(a=ie("query-columns-menu"))==null||a.addEventListener("change",r=>{r.target.matches('input[type="checkbox"]')&&qk(r.target.value,r.target.checked)}),(o=ie("query-pager"))==null||o.addEventListener("click",r=>{const l=r.target.closest("button[data-query-page]");!l||l.disabled||Nk(Number(l.dataset.queryPage))}),document.addEventListener("click",r=>{var c;const l=ie("query-columns-menu");l&&!l.classList.contains("hidden")&&!r.target.closest("#query-columns-picker")&&(l.classList.add("hidden"),(c=ie("query-columns-btn"))==null||c.setAttribute("aria-expanded","false"))}))}function Fk(){var s,a;Hk();const e=Tk(window.location.search),t=Z();let n=null;if(!e.teamScope){const o=r=>r&&t.some(l=>l.id===r);if(!o(e.projectId)){const r=e.projectId;e.projectId=o(V())?V():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}R=e,Fl=pm(R),We=null;const i=ie("query-where");return i&&(i.value=R.where===null?ql:R.where),(s=ie("query-cli-preview"))==null||s.classList.add("hidden"),(a=ie("query-columns-menu"))==null||a.classList.add("hidden"),Mk(),Rk(),so(null),fm(n),Ts(),ao("replace")}let oo=[];function Uk(){return oo}ut(e=>{e==="currentProject"&&T()==="epics"&&cn()});let zl=0;const Ls=new Set(["done","canceled"]);let ro=!1;async function cn(){var n,i;Vo(-1);const e=document.getElementById("epics-list");if(!e)return;const t=++zl;e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((n=L())!=null&&n.id)){oo=[],e.innerHTML=q({icon:M.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const s=V(),a=s?await v.getProjectEpicProgress(s):await v.getTeamEpicProgress(L().id);if(t!==zl)return;if(!((i=a==null?void 0:a.epics)!=null&&i.length)){oo=[],e.innerHTML=q({icon:M.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}wm(a,e)}catch(s){if(t!==zl)return;e.innerHTML=q({icon:M.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),E("load epics",s)}}function Vl(e,t){return`${e} ${t}${e===1?"":"s"}`}function hm(e,t){return t<=0?"-":e>=t?"100%":`${Math.floor(e/t*100)}%`}function Gk(e){const t=e.children||{},n=(t.total||0)-(t.canceled||0);if(n<=0)return'<span class="epic-progress-text">No tickets</span>';const i=Math.round((t.done||0)/n*100),s=Math.round(((t.in_progress||0)+(t.in_review||0))/n*100),a=t.done===n,o=`${t.done||0} done, ${(t.in_progress||0)+(t.in_review||0)} in progress, ${(t.todo||0)+(t.backlog||0)} not started`+(t.canceled?`, ${t.canceled} canceled`:"");return`
        <div class="epic-progress-bar-container" title="${p(o)}">
            <div class="epic-progress-bar">
                <div class="epic-progress-fill${a?" epic-progress-complete":""}" style="width: ${i}%"></div>
                <div class="epic-progress-active" style="width: ${Math.min(s,100-i)}%"></div>
            </div>
            <span class="epic-progress-pct" title="Tickets done">${hm(t.done||0,n)}</span>
            <span class="epic-progress-text">${t.done||0}/${n}</span>
        </div>
    `}function vm(e){if(!e||e.length===0)return'<span class="text-muted">-</span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,a=`${i.name}${i.status==="active"?" (current)":""}: ${Vl(i.closed||0,"ticket")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${p(a)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}function ym(e,t){return e?`<span class="epic-this-sprint">+${e} <span class="text-muted">(${t} pts)</span></span>`:'<span class="text-muted">-</span>'}function zk(e){const t=e.status_pinned&&!Ls.has(e.status)?' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its tickets">✎<span class="sr-only"> (status set by hand)</span></span>':"",n=e.status==="canceled"?' <span class="epic-canceled-tag">Canceled</span>':"",i=(e.points_total||0)>0?`${e.points_done||0}/${e.points_total} pts`:"-",s=Cs(e)<=0;return`
        <tr class="epic-row${Ls.has(e.status)?" epic-row-closed":""}${s?" epic-row-empty":""}" data-identifier="${p(e.identifier)}">
            <td class="epic-identifier">${f(e.identifier)}</td>
            <td class="epic-title">${f(e.title)}${t}${n}</td>
            <td class="epic-progress">${Gk(e)}</td>
            <td class="epic-points">${i}</td>
            <td class="epic-sprint">${ym(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${vm(e.sprints)}</td>
        </tr>
    `}function Vk(e){return!e||!e.open&&!e.closed_this_sprint&&!(e.sprints||[]).some(t=>t.closed)?"":`
        <tr class="epic-untracked-row">
            <td class="epic-identifier">${f(e.project_key)}</td>
            <td class="epic-title text-muted">No epic</td>
            <td class="epic-progress"><span class="epic-progress-text">${Vl(e.open||0,"open ticket")}</span></td>
            <td class="epic-points"></td>
            <td class="epic-sprint">${ym(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${vm(e.sprints)}</td>
        </tr>
    `}function Cs(e){const t=e.children||{};return(t.total||0)-(t.canceled||0)}function bm(e){var n;const t=Cs(e);return t>0?(((n=e.children)==null?void 0:n.done)||0)/t:0}const Wl=[{key:"active",label:"In progress",statuses:["in_progress","in_review"]},{key:"todo",label:"Todo",statuses:["todo"]},{key:"backlog",label:"Backlog",statuses:["backlog"]},{key:"closed",label:"Closed",statuses:["done","canceled"]}];function Wk(e){const t=e.status||"backlog";return Wl.find(n=>n.statuses.includes(t))||Wl[2]}function Kk(e,t){const n=Cs(e)<=0,i=Cs(t)<=0;if(n!==i)return n?1:-1;const s=(t.points_this_sprint||0)-(e.points_this_sprint||0);if(s)return s;const a=(t.closed_this_sprint||0)-(e.closed_this_sprint||0);return a||bm(t)-bm(e)}function Yk(e){return Wl.map(t=>({group:t,epics:e.filter(n=>Wk(n)===t).sort(Kk)})).filter(t=>t.epics.length)}function Zk(e,t){const n=e.filter(u=>!Ls.has(u.status)),i=n.filter(u=>(u.closed_this_sprint||0)>0).length,s=n.reduce((u,m)=>{var g;return u+(((g=m.children)==null?void 0:g.done)||0)},0),a=n.reduce((u,m)=>u+Cs(m),0),o=[...e,...t],r=o.reduce((u,m)=>u+(m.closed_this_sprint||0),0),l=o.reduce((u,m)=>u+(m.points_this_sprint||0),0),c=t.reduce((u,m)=>u+(m.open||0),0);if(!n.length&&!r&&!c)return"";const d=(u,m,g="")=>`
        <div class="epic-stat${g}">
            <div class="epic-stat-value">${u}</div>
            <div class="epic-stat-label">${m}</div>
        </div>`;return`
        <div class="epic-summary" role="group" aria-label="Progress summary">
            ${n.length?d(`${i}<span class="epic-stat-of"> / ${n.length}</span>`,"open epics moved this sprint"):""}
            ${n.length?d(hm(s,a),a?`of their tickets done (${s}/${a})`:"no tickets yet"):""}
            ${d(r?`+${r}`:"0",`${r===1?"ticket":"tickets"} closed this sprint (${l} pts)`,r?" epic-stat-up":"")}
            ${c?d(String(c),`open ${c===1?"ticket":"tickets"} under no epic`," epic-stat-warn"):""}
        </div>`}const Kl=6;function wm(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=n.filter(m=>Ls.has(m.status)).length,a=ro?n:n.filter(m=>!Ls.has(m.status)),o=[...new Set([...n.map(m=>m.project_key),...i.map(m=>m.project_key)])],r=o.length>1,l=[],c=o.map(m=>{const y=Yk(a.filter(S=>S.project_key===m)).map(({group:S,epics:x})=>(l.push(...x),`<tr class="epic-state-row epic-state-${S.key}"><th colspan="${Kl}" scope="colgroup"><span class="epic-state-dot" aria-hidden="true"></span>${S.label}<span class="epic-state-count">${x.length}</span></th></tr>`+x.map(zk).join(""))).join(""),w=Vk(i.find(S=>S.project_key===m));return!y&&!w?"":(r?`<tr class="epic-group-row"><th colspan="${Kl}" scope="colgroup">${f(m)}</th></tr>`:"")+y+w}).join("");oo=l;const d=!c.trim()&&s>0?`<tr class="epic-empty-row"><td colspan="${Kl}" class="text-muted">Every epic here is closed.</td></tr>`:"",u=s>0?`<button class="btn btn-secondary btn-small epic-closed-toggle" data-epics-toggle-closed>${ro?"Hide":"Show"} ${Vl(s,"closed epic")}</button>`:"";t.innerHTML=`
        ${Zk(n,i)}
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
    `,t._epicProgress=e,t._epicClickHandler||(t._epicClickHandler=m=>{if(m.target.closest("[data-epics-toggle-closed]")){ro=!ro,Vo(-1),wm(t._epicProgress,t);return}const g=m.target.closest(".epic-row");g&&g.dataset.identifier&&hp(g.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function Qk(){const e=V(),t=Z().map(n=>`
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
    `,U(),document.getElementById("create-epic-form").addEventListener("submit",Xk),document.getElementById("create-epic-title").focus()}async function Xk(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}try{const s=await v.createIssue(t,{title:n,description:i||null,issue_type:"epic"});P(),k(`Created epic ${s.identifier}`,"success"),cn()}catch(s){E("create epic",s)}}async function $m(e){try{let t;if(e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t){if(t.issue_type!=="epic"){ne(t.id,!1);return}await lo(t.id,!1)}else N("epics",!1)}catch{N("epics",!1)}}async function lo(e,t=!0){var n;try{t&&En();const[i,s,a,o]=await Promise.all([v.getIssue(e),v.getSubIssues(e),v.getActivities(e),v.getComments(e)]);if(i.issue_type!=="epic"){ne(e,t);return}t&&history.pushState({epicId:e,view:T()},"",`/epic/${i.identifier}`),document.querySelectorAll(".view").forEach(_=>_.classList.add("hidden"));const r=document.getElementById("epic-detail-view");r.classList.remove("hidden");const l=T()||"epics",c=Z().find(_=>_.id===i.project_id),d=i.assignee_id?Kt(i.assignee_id):null,u=d?Yt(d):null,m=Uk(),g=(n=m.find(_=>_.id===i.id))==null?void 0:n.children,y=g?(g.total||0)-(g.canceled||0):s.filter(_=>_.status!=="canceled").length,w=g?g.done||0:s.filter(_=>_.status==="done").length,$=y>0?Math.round(w/y*100):0,S=m.findIndex(_=>_.id===i.id),x=S>0?m[S-1]:null,A=S>=0&&S<m.length-1?m[S+1]:null,B=S>=0;r.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(l)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${B?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${x?`data-action="navigate-epic" data-epic-id="${p(x.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${S+1} / ${m.length}</span>
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
                            ${Zn(i.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${$===100?" epic-progress-complete":""}" style="width: ${$}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${w} of ${y} done</span>
                                <span>${$}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?q({icon:M.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(_=>{const j=_.assignee_id?Kt(_.assignee_id):null,G=j?Yt(j):null;return`
                                <div class="sub-issue-item" data-issue-id="${p(_.id)}" data-identifier="${p(_.identifier)}">
                                    <span class="sub-issue-status">${Ie(_.status)}</span>
                                    <span class="sub-issue-id">${f(_.identifier)}</span>
                                    <span class="sub-issue-title">${f(_.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(_.status||"backlog").replace(/_/g,"-")}">${ye(_.status)}</span>
                                    ${G?`<span class="sub-issue-assignee">${f(G)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${a.length===0?q({icon:M.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):a.map(_=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${kr(_.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${_r(_)}</span>
                                        <span class="activity-actor">by ${f(Er(_))}</span>
                                        <span class="activity-time">${it(_.created_at)}</span>
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
                                            <span class="comment-date">${it(_.created_at)}</span>
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
                                ${Ie(i.status)}
                                ${ye(i.status)}
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
                                ${pt(i.priority)}
                                ${Pe(i.priority)}
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
                                ${Ha(i.estimate,i.project_id)}
                            </span>
                        </div>

                        ${i.labels&&i.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${i.labels.map(_=>`
                                    <span class="issue-label" style="background: ${J(_.color)}20; color: ${J(_.color)}">${f(_.name)}</span>
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
        `;const Q=r.querySelector(".sub-issues-list");Q&&Q.addEventListener("click",_=>{const j=_.target.closest(".sub-issue-item");j&&j.dataset.issueId&&ne(j.dataset.issueId)})}catch(i){E("load epic",i)}}ee({"navigate-epic":(e,t)=>{lo(t.epicId)},"epic-follow-children":async(e,t)=>{try{await v.updateIssue(t.epicId,{status_follows_children:!0}),k("Status now follows sub-issues"),await lo(t.epicId,!1)}catch(n){E("update epic",n)}}});function Jk(e){let t=!1,n=null;return function(s){var o,r,l,c,d,u,m;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((u=e.isDetailViewActive)!=null&&u.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((m=e.isDetailViewActive)!=null&&m.call(e))break;s.preventDefault(),e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function eE(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function Ft(e,t,n=na){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function km(){const e=document.querySelector(".main-content");e&&(e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1"),e.focus({preventScroll:!0}))}function As(e){var n,i;return(i=(n=e.target).closest)!=null&&i.call(n,".sidebar-nav")?!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.key==="j"||e.key==="k")?(km(),!1):!0:!1}function tE(e){const t=na;function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const l=n(a);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,o,c,d)}return function(a){var l,c,d,u,m;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||As(a)||(a.key==="Enter"||a.key===" ")&&((d=(c=a.target).closest)!=null&&d.call(c,".issue-group-header"))||e.isModalOpen()||e.isCommandPaletteOpen()||(u=e.isInlineDropdownOpen)!=null&&u.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(a.key)&&((m=e.beforeNavigate)==null||m.call(e));const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Ft(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),Ft(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function nE(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||As(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Ft(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Ft(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function hi(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function iE(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,u,m;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||As(i)||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex(),o=g=>{var w,$,S,x;const y=!!(($=(w=document.activeElement)==null?void 0:w.closest)!=null&&$.call(w,"#inbox-list"));if((S=e.collapseInboxExpand)==null||S.call(e),Ft(a+g,e.setSelectedIndex,t),y){const A=document.querySelector(`${t}.keyboard-selected`);(x=(A==null?void 0:A.querySelector(".inbox-row-toggle"))||A)==null||x.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),o(1);break;case"k":case"ArrowUp":i.preventDefault(),o(-1);break;case"Enter":if((d=(c=i.target).closest)!=null&&d.call(c,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;a>=0&&s[a]&&(i.preventDefault(),e.toggleInboxExpand(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":if((u=e.isEscapeLayerAbove)!=null&&u.call(e))break;if((m=e.collapseInboxExpand)!=null&&m.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}a>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function sE(e){const t="#kanban-board .kanban-card";return function(i){var o;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||As(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Ft(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Ft(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.id;r&&e.viewIssue(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function aE(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function Em(e){const{view:t,selector:n,open:i}=e;return function(a){var l;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||As(a)||e.isModalOpen()||e.isCommandPaletteOpen())return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Ft(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),Ft(r-1,e.setSelectedIndex,n);break;case"Enter":r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(c=>c.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const oE={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>v.getDocumentRevisions(e),fetchOne:(e,t)=>v.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>v.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>v.getIssueDescriptionRevision(e,t)}};let H=null,dn=0;async function _m(e,t){var a,o;const n=oE[e];if(!n){E("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++dn;H=null;let s;try{s=await n.fetchList(t)}catch(r){E("load revision history",r);return}if(i===dn){if(H={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},H.viewVersion!=null)try{const r=await n.fetchOne(t,H.viewVersion);if(i!==dn)return;H.cache.set(H.viewVersion,r)}catch(r){i===dn&&E("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),co(),U()}}function co(){const e=document.getElementById("modal-content");if(!e||!H)return;if(H.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=rE(),n=H.mode==="compare"?cE():lE();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function rE(){const e=H.revisions.map(n=>{const i=H.mode==="view"?n.version===H.viewVersion:n.version===H.compareFromVersion||n.version===H.compareToVersion,s=H.mode==="compare"?n.version===H.compareFromVersion?' <span class="rev-tag">from</span>':n.version===H.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${f(n.author_name||"Unknown")} ${Mn(n.author)}</span>
          <span class="revision-time">${it(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${H.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function lE(){const e=H.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=H.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${f(t.title)}</h3>`:"",i=t[H.adapter.bodyField]||"",s=i?`<div class="markdown-body">${mt(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${f(t.author_name||"Unknown")} &middot; ${it(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function cE(){const e=H.compareFromVersion,t=H.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=H.cache.get(e),i=H.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[H.adapter.bodyField]||"",a=i[H.adapter.bodyField]||"",o=dE(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
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
  `}function dE(e,t){const n=e.split(`
`),i=t.split(`
`),s=uE(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${f(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${f(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${f(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function uE(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(Bs(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(Bs(a,"del",e[o]),o++):(Bs(a,"add",t[r]),r++);for(;o<n;)Bs(a,"del",e[o++]);for(;r<i;)Bs(a,"add",t[r++]);return a}function Bs(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function pE(e){if(!H)return;const t=H.token,n=H;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(H!==n||dn!==t)return;n.cache.set(e,i)}catch(i){H===n&&dn===t&&E("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),co()}function mE(){if(!H)return;const e=H.token,t=H;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{H===t&&dn===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{H!==t||dn!==e||(s&&E("load revisions to compare",s),co())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;co()}ee({"show-document-revisions":(e,t)=>{_m("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{_m("issue",t.issueId)},"select-revision-version":(e,t)=>{pE(Number(t.version))},"toggle-revision-compare":()=>{mE()},"close-revision-viewer":()=>{H=null,P()}});const fE=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let Sn=[],uo=null,Yl=0;ut(e=>{e==="currentProject"&&T()==="board"&&Ds()});async function Ds(){Js(-1);const e=++Yl,t=V();if(!t){const i=document.getElementById("kanban-board");i&&(i.innerHTML=Z().length===0?q({icon:M.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):q({icon:M.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const n=document.getElementById("kanban-board");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const i=await v.getIssues({project_id:t});if(e!==Yl)return;Sn=i,T()==="board"&&Wt(Sn),js()}catch(i){if(e!==Yl)return;n&&(n.innerHTML=q({icon:M.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),E("load board",i)}}const Zl=Sg(()=>Ds(),200);function js(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;e.innerHTML=fE.map(i=>{const s=Sn.filter(a=>a.status===i.key);return`
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
                                <span class="badge badge-priority-${a.priority}" style="font-size: 10px;">${Pe(a.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""),gE(t)}function gE(e){const t=od();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){Js(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),Js(i),n[i].classList.add("keyboard-selected")}function hE(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),uo=t.dataset.id,t.classList.add("dragging")}function vE(e,t){t.classList.remove("dragging"),uo=null}function xm(e){const t=Sn.find(n=>n.id===uo);return!!t&&t.status===e}function yE(e,t){e.preventDefault(),!xm(t.dataset.status)&&t.classList.add("drag-over")}function bE(e,t){t.classList.remove("drag-over")}function wE(e,t){e.preventDefault();const n=Sn.find(i=>i.id===t.dataset.id);n&&xm(n.status)||t.classList.add("drag-over")}function $E(e,t){t.classList.remove("drag-over")}async function kE(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=Sn.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,js();try{const o=await v.updateIssue(n,{status:i});k("Status updated","success"),zi(o)}catch(o){s.status=a,js(),E("update status",o)}}}async function EE(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=uo||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=Sn.find(l=>l.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,js();try{const l=await v.updateIssue(n,{status:a});k("Status updated","success"),zi(l)}catch(l){o.status=r,js(),E("update status",l)}}}ee({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),ne(t.id)):e.type==="dragstart"?hE(e,n):e.type==="dragend"?vE(e,n):e.type==="dragover"?wE(e,n):e.type==="dragleave"?$E(e,n):e.type==="drop"&&EE(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?yE(e,n):e.type==="dragleave"?bE(e,n):e.type==="drop"&&kE(e,n)},"retry-load-board":()=>Ds()});const un=new Map,Im=6e4,Ql=100;let Le=null,po=null,mo=null,Ms=null,Sm=!1;const _E={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},xE={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Tm={api:null};let Xl={...Tm};function IE(e={}){Xl={...Tm,...e},Le||(Le=document.createElement("div"),Le.className="issue-tooltip",Le.style.display="none",document.body.appendChild(Le),Le.addEventListener("mouseenter",()=>{clearTimeout(po)}),Le.addEventListener("mouseleave",()=>{Jl()})),Sm||(document.addEventListener("mouseover",SE),document.addEventListener("mouseout",TE),Sm=!0)}function SE(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=LE(t);if(n){if(n===Ms&&Le.style.display!=="none"){clearTimeout(po);return}clearTimeout(mo),mo=setTimeout(()=>{CE(t,n)},200)}}function TE(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(mo),po=setTimeout(()=>{Jl()},150))}function LE(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function CE(e,t){Ms=t;const n=e.getBoundingClientRect();Le.style.left=`${n.left+window.scrollX}px`,Le.style.top=`${n.bottom+window.scrollY+8}px`,Le.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Le.style.display="block";try{const i=await BE(t);if(Ms!==t)return;DE(i)}catch{if(Ms!==t)return;Le.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Jl(){clearTimeout(mo),clearTimeout(po),Le&&(Le.style.display="none"),Ms=null}function AE(){const e=Date.now();for(const[t,n]of un.entries())e-n.timestamp>=Im&&un.delete(t)}async function BE(e){un.size>Ql/2&&AE();const t=un.get(e);if(t&&Date.now()-t.timestamp<Im)return t.issue;if(!Xl.api)throw new Error("API not initialized");const n=await Xl.api.getIssueByIdentifier(e);if(un.size>=Ql){const i=Array.from(un.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,Ql/2);for(const[a]of s)un.delete(a)}return un.set(e,{issue:n,timestamp:Date.now()}),n}function DE(e){const t=_E[e.status]||"#6b7280",n=xE[e.priority]||"#6b7280",i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Le.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${f(e.identifier)}</span>
            <span class="issue-tooltip-type">${f(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${f(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${jE(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${ME(e.priority)}</span>
        </div>
    `}function jE(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function ME(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Lm(){return!!document.querySelector(".description-inline-editor")}function ec(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function tc(){var e;return ec("issue-detail-view")?((e=be())==null?void 0:e.id)??null:null}function Tn(e){return!!e&&tc()===e}function RE(){Fe("issue:created",OE),Fe("issue:updated",HE),Fe("issue:deleted",FE),Fe("comment",zE),Fe("relation",WE),Fe("attestation",KE),Fe("activity",ZE),Fe("project",QE),Fe("sprint",XE),Fe("document",VE),Fe("inbox",YE),Fe("connection:reconnected",JE),Fe("connection:unauthorized",qE),Fe("connection:forbidden",NE),Fe("connection:superseded",PE)}function PE(){k("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function qE(){v.logout(),Rn(null),Ni(null),Is(),k("Your session has ended. Please sign in again.","warning")}function NE(){k("Live updates stopped: you no longer have access to this team.","error")}function OE(e){var s;const t=Y(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,ze(a),T()==="issues"&&ot()}else ze([e,...t]),T()==="issues"&&ot(),k(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((s=$t())==null?void 0:s.id)){const a=Ve(),o=a.findIndex(l=>l.id===e.id),r=a.findIndex(l=>l._isOptimistic&&l.title===e.title);if(o===-1&&r===-1)vn([e,...a]),T()==="my-issues"&&Fi();else if(r>=0){const l=[...a];l[r]=e,vn(l),T()==="my-issues"&&Fi()}}T()==="board"?Zl():T()==="sprints"?Rs():T()==="epics"&&cn(),Tn(e.parent_id)&&Ln(e.parent_id)}function HE(e){ia(e);const t=Y();t.some(s=>s.id===e.id)&&ze(t.map(s=>s.id===e.id?e:s));const n=Ve();n.some(s=>s.id===e.id)&&vn(n.map(s=>s.id===e.id?e:s));const i=Pi();i.some(s=>s.id===e.id)&&Wt(i.map(s=>s.id===e.id?e:s)),T()==="issues"?ot():T()==="my-issues"?Fi():T()==="board"?Zl():T()==="sprints"?Rs():T()==="epics"&&cn(),Tn(e.id)&&(Lm()?$r(e):Ln(e.id))}function FE(e){Wg(e.id),ze(Y().filter(n=>n.id!==e.id)),vn(Ve().filter(n=>n.id!==e.id));const t=Pi();t.some(n=>n.id===e.id)&&Wt(t.filter(n=>n.id!==e.id)),T()==="issues"?ot():T()==="my-issues"?(Fi(),On({showLoading:!1})):T()==="board"?Zl():T()==="sprints"?Rs():T()==="epics"&&cn(),k(`Issue ${e.identifier} deleted`,"info"),Tn(e.id)&&(k(`Issue ${e.identifier} was deleted`,"warning"),N("my-issues"))}const Cm=250,UE=1e3,vi=new Map;function Ln(e){Lm()?$r():nc(e,Cm)}function nc(e,t){let n=vi.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},vi.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>GE(e),t))}async function GE(e){const t=vi.get(e);if(!t)return;if(t.timer=null,!Tn(e)){vi.delete(e);return}t.inFlight=!0;let n;try{n=await ne(e,!1,{refresh:!0})}finally{t.inFlight=!1}vi.get(e)===t&&(t.again?(t.again=!1,nc(e,Cm)):n==="retry"?nc(e,UE):vi.delete(e))}function zE(e){T()==="my-issues"&&On({showLoading:!1}),Tn(e.issue_id)&&Ln(e.issue_id),e.document_id&&Ru(e.document_id)}function VE(e,{type:t}={}){Mu(),t==="deleted"?Ly(e.id,e.title):Ru(e.id)}function WE(e){const t=tc();t&&(e.source_issue_id===t||e.target_issue_id===t)&&Ln(t)}function KE(e){T()==="approvals"&&_t(),Tn(e.issue_id)&&Ln(e.issue_id)}function YE(e,t){var n;e.recipient_user_id===((n=$t())==null?void 0:n.id)&&(ri(),Iw(t==null?void 0:t.type,e),T()==="inbox"&&!Lw(t==null?void 0:t.type,e)&&vs({background:!0}))}function ZE(e){T()==="my-issues"&&On({showLoading:!1}),Tn(e.issue_id)&&Ln(e.issue_id)}function QE(e,{type:t}){rt().then(()=>{T()==="projects"&&ii()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?k(`New project: ${e.name}`,"info"):t==="deleted"&&k(`Project ${e.name} deleted`,"info")}function Rs(){const e=tb();e&&ec("sprint-detail-view")?ti(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):ec("sprints-view")&&on().catch(t=>console.error("Failed to reload sprints:",t))}function XE(e,{type:t}={}){Gu(),T()==="sprints"?Rs():T()==="my-issues"&&Ui(),t==="created"?k(`New sprint: ${e.name}`,"info"):t==="closed"&&k(`Sprint ${e.name} closed`,"info")}function JE(){const e=T();ri(),e==="issues"?Et().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(Nn().catch(n=>console.error("Failed to resync my issues:",n)),Ui().catch(n=>console.error("Failed to resync sprint status:",n)),On({showLoading:!1})):e==="board"?Ds():e==="sprints"?Rs():e==="epics"?cn().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?rt().then(()=>{T()==="projects"&&ii()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?Mu():e==="approvals"?_t():e==="inbox"&&vs({background:!0});const t=tc();t&&Ln(t)}const e_='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Am(e){return Array.from(e.querySelectorAll(e_)).filter(t=>!t.closest(".hidden, [hidden]"))}function Bm(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function t_(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Bm(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=Am(t);n&&n.focus()}}}function fo(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Bm(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=Am(n);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&fo()});async function n_(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=V();if(!i){k("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=Z().find(c=>c.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};ze([r,...Y()]),ot();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const c=await v.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=Y();d.some(u=>u.id===c.id)?ze(d.filter(u=>u.id!==a)):d.some(u=>u.id===a)&&ze(d.map(u=>u.id===a?c:u)),ot(),rt(),k("Issue created!","success")}catch(c){ze(Y().filter(d=>d.id!==a)),ot(),E("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}fw({beforeScrollRestore:fr,beforeNavigate:()=>{cy(),ew(),tp(null),Pn(null),ld(null),fo(),Jl()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return $m(e[1]),!0;if(e[0]==="issue"&&e[1])return xa(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(xa(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(m_(e[1]),!0):e[0]==="sprint"&&e[1]?(ab(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(ap(e[1]),!0):!1},detailPopstate:e=>e.epicId?(lo(e.epicId,!1),!0):e.issueId?(ne(e.issueId,!1),!0):e.identifier?(xa(e.identifier),!0):e.documentId?(Se(e.documentId,!1),!0):e.sprintId?(ti(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=Jr();e&&Z().some(t=>t.id===e)&&st(e)},issueNavigate:e=>xa(e),epicNavigate:e=>$m(e)}),mw({"my-issues":()=>{Ui(),Nn(),On()},approvals:()=>{_t()},inbox:()=>{vs({focusFirst:!0})},issues:()=>{var r;Qh(),nv(),av();const e=new URLSearchParams(window.location.search),t=e.getAll("label"),n=e.getAll("exclude_label"),i=e.get("sprint"),s=t.length>0||n.length>0||!!i||!!((r=document.getElementById("sprint-filter"))!=null&&r.value);s||Et();const a=jd().then(()=>{if(t.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=t.includes(d.value)}),la())}if(n.length>0){const l=document.getElementById("exclude-label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=n.includes(d.value)}),ca())}}),o=Kd().then(()=>{if(i){const l=document.getElementById("sprint-filter");l&&(l.value=i)}});s&&Promise.all([a,o]).then(()=>Et())},query:()=>{Fk()},epics:()=>{cn()},board:()=>{Ds()},projects:()=>{rt().then(ii)},sprints:()=>{on()},rituals:()=>{Eb()},documents:()=>{kn()},team:()=>{yl(),Cp(),Ya()},settings:()=>{jl(),im(),sm(),$a()}});function i_(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||P()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>P())}function s_(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>op(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>iw());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>sw()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>rp(a))})}function a_(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Du("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Du("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>ju());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>ky());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>sn())}function o_(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>_d())}function r_(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>sv());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>qh());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>Nh()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const y=g.parentElement;y!=null&&y.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>pa("status-filter-dropdown")):y!=null&&y.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>pa("priority-filter-dropdown")):y!=null&&y.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>pa("label-filter-dropdown")):y!=null&&y.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>pa("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",()=>ma())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>fa())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",()=>dr())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>ur())}const a=document.getElementById("label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>ga())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>ha())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>Qe());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>Qe());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>Qe());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>Et());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>eu());const m=document.querySelector(".quick-create-input");m&&m.addEventListener("keydown",g=>n_(g))}function l_(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>xb(t.dataset.tab))})}function c_(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>Tp());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Gi()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),N(o.dataset.view),r.detail>0&&km())})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Qw());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>fo());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>t_());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>Gi())}ee({"navigate-to":(e,t)=>{N(t.view)},"set-current-project":(e,t,n)=>{st(n.value)},showCreateIssueModal:()=>Gi(),showCreateEpicModal:()=>Qk(),"retry-load-epics":()=>cn(),showCreateProjectModal:()=>ip(),showCreateDocumentModal:()=>qu(),showCreateTeamModal:()=>jp(),showEditTeamModal:()=>p$(),showInviteModal:()=>Ap(),showCreateApiKeyModal:()=>rk(),showCreateAgentModal:()=>Gv(),resetOnboarding:()=>Hp(),logout:()=>nm(),navigateToProjects:()=>N("projects")});async function d_(){if(!v.getToken()){await Jp();return}mp();const e=v.getMyTeams();e.catch(()=>{});try{const t=await v.getMe();Rn(t),await mi({teamsRequest:e})}catch(t){if((t==null?void 0:t.status)===401||(t==null?void 0:t.status)===403){v.logout(),await Jp();return}console.error("Failed to load current user on boot:",t),Is(),k("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{Hg(),ak(),c_(),i_(),o_(),r_(),l_(),s_(),a_(),u_(),p_(),IE({api:v}),RE(),await d_()});function u_(){const e=document.getElementById("theme-toggle");if(!e)return;const t=ag()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),og(n?"light":"dark")})}function p_(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");gp(i)}}})}async function m_(e){try{await Se(e,!1)}catch{N("documents",!1)}}document.addEventListener("keydown",tE({getCurrentView:T,getSelectedIndex:sd,setSelectedIndex:gn,viewIssue:ne,showEditIssueModal:hu,showInlineDropdown:or,isInlineDropdownOpen:Vi,isModalOpen:nt,isCommandPaletteOpen:In,isDetailViewActive:hi,beforeNavigate:fr})),document.addEventListener("keydown",nE({getCurrentView:T,getSelectedIndex:Cg,setSelectedIndex:ad,viewDocument:Se,showEditDocumentModal:Nu,isModalOpen:nt,isCommandPaletteOpen:In,isDetailViewActive:hi})),document.addEventListener("keydown",sE({getCurrentView:T,getSelectedIndex:od,setSelectedIndex:Js,viewIssue:ne,isModalOpen:nt,isCommandPaletteOpen:In,isDetailViewActive:hi})),document.addEventListener("keydown",iE({getCurrentView:T,getSelectedIndex:Ag,setSelectedIndex:ea,toggleInboxExpand:zw,collapseInboxExpand:Bw,archiveInboxEntry:Gw,isInlineDropdownOpen:Vi,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:nt,isCommandPaletteOpen:In,isDetailViewActive:hi})),document.addEventListener("keydown",aE()),document.addEventListener("keydown",Em({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&ti(e.dataset.sprintId)},getCurrentView:T,getSelectedIndex:Bg,setSelectedIndex:rd,isModalOpen:nt,isCommandPaletteOpen:In,isDetailViewActive:hi})),document.addEventListener("keydown",Em({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&hp(e.dataset.identifier)},getCurrentView:T,getSelectedIndex:Dg,setSelectedIndex:Vo,isModalOpen:nt,isCommandPaletteOpen:In,isDetailViewActive:hi}));function Dm(){var e;N("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus()}function f_(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)")||ny()}document.addEventListener("keydown",Jk({closeModal:P,closeSidebar:fo,navigateTo:N,showCreateIssueModal:Gi,showKeyboardShortcutsHelp:lm,isModalOpen:nt,focusSearch:Dm,isInlineDropdownOpen:Vi,closeInlineDropdowns:Ig,isModalDirty:_g,focusModalField:ed,closeDropdowns:()=>{var t;document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),bn();const e=document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)");e&&(e.classList.add("hidden"),(t=document.querySelector("#issue-detail-view .sidebar-overflow-trigger"))==null||t.setAttribute("aria-expanded","false"))},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:f_,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),vk([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>N("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>N("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>N("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>N("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>N("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>N("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>N("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>N("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>N("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>N("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>N("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>N("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{N("issues"),setTimeout(Gi,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{N("projects"),setTimeout(ip,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{N("documents"),setTimeout(qu,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>jp(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:Dm,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{N("team"),setTimeout(Ap,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>lm(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Hp(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>nm(),category:"Account"}]),document.addEventListener("keydown",eE({isModalOpen:nt,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:In,openCommandPalette:yk,closeCommandPalette:to})),window.marked=z,window.DOMPurify=zc,console.log("Chaotic frontend loaded via Vite")})();
