var I0=Object.defineProperty;var S0=(Nt,qe,wn)=>qe in Nt?I0(Nt,qe,{enumerable:!0,configurable:!0,writable:!0,value:wn}):Nt[qe]=wn;var se=(Nt,qe,wn)=>S0(Nt,typeof qe!="symbol"?qe+"":qe,wn);(function(){"use strict";var ud;function Nt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var qe=Nt();function wn(e){qe=e}var Ni={exec:()=>null};function Z(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(Ne.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var Ne={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},ah=/^(?:[ \t]*(?:\n|$))+/,oh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,rh=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Oi=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,lh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,tr=/(?:[*+-]|\d{1,9}[.)])/,Id=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Sd=Z(Id).replace(/bull/g,tr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ch=Z(Id).replace(/bull/g,tr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),nr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,dh=/^[^\n]+/,ir=/(?!\s*\])(?:\\.|[^\[\]\\])+/,uh=Z(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ir).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ph=Z(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,tr).getRegex(),aa="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",sr=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,mh=Z("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",sr).replace("tag",aa).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Td=Z(nr).replace("hr",Oi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",aa).getRegex(),fh=Z(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Td).getRegex(),ar={blockquote:fh,code:oh,def:uh,fences:rh,heading:lh,hr:Oi,html:mh,lheading:Sd,list:ph,newline:ah,paragraph:Td,table:Ni,text:dh},Ld=Z("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Oi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",aa).getRegex(),gh={...ar,lheading:ch,table:Ld,paragraph:Z(nr).replace("hr",Oi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ld).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",aa).getRegex()},hh={...ar,html:Z(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",sr).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ni,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Z(nr).replace("hr",Oi).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Sd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},vh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,bh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ad=/^( {2,}|\\)\n(?!\s*$)/,yh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,oa=/[\p{P}\p{S}]/u,or=/[\s\p{P}\p{S}]/u,Cd=/[^\s\p{P}\p{S}]/u,wh=Z(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,or).getRegex(),Bd=/(?!~)[\p{P}\p{S}]/u,$h=/(?!~)[\s\p{P}\p{S}]/u,kh=/(?:[^\s\p{P}\p{S}]|~)/u,Eh=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Dd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,_h=Z(Dd,"u").replace(/punct/g,oa).getRegex(),xh=Z(Dd,"u").replace(/punct/g,Bd).getRegex(),Md="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ih=Z(Md,"gu").replace(/notPunctSpace/g,Cd).replace(/punctSpace/g,or).replace(/punct/g,oa).getRegex(),Sh=Z(Md,"gu").replace(/notPunctSpace/g,kh).replace(/punctSpace/g,$h).replace(/punct/g,Bd).getRegex(),Th=Z("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Cd).replace(/punctSpace/g,or).replace(/punct/g,oa).getRegex(),Lh=Z(/\\(punct)/,"gu").replace(/punct/g,oa).getRegex(),Ah=Z(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ch=Z(sr).replace("(?:-->|$)","-->").getRegex(),Bh=Z("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ch).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ra=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Dh=Z(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ra).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),jd=Z(/^!?\[(label)\]\[(ref)\]/).replace("label",ra).replace("ref",ir).getRegex(),Rd=Z(/^!?\[(ref)\](?:\[\])?/).replace("ref",ir).getRegex(),Mh=Z("reflink|nolink(?!\\()","g").replace("reflink",jd).replace("nolink",Rd).getRegex(),rr={_backpedal:Ni,anyPunctuation:Lh,autolink:Ah,blockSkip:Eh,br:Ad,code:bh,del:Ni,emStrongLDelim:_h,emStrongRDelimAst:Ih,emStrongRDelimUnd:Th,escape:vh,link:Dh,nolink:Rd,punctuation:wh,reflink:jd,reflinkSearch:Mh,tag:Bh,text:yh,url:Ni},jh={...rr,link:Z(/^!?\[(label)\]\((.*?)\)/).replace("label",ra).getRegex(),reflink:Z(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ra).getRegex()},lr={...rr,emStrongRDelimAst:Sh,emStrongLDelim:xh,url:Z(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Rh={...lr,br:Z(Ad).replace("{2,}","*").getRegex(),text:Z(lr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},la={normal:ar,gfm:gh,pedantic:hh},Hi={normal:rr,gfm:lr,breaks:Rh,pedantic:jh},Ph={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Pd=e=>Ph[e];function Et(e,t){if(t){if(Ne.escapeTest.test(e))return e.replace(Ne.escapeReplace,Pd)}else if(Ne.escapeTestNoEncode.test(e))return e.replace(Ne.escapeReplaceNoEncode,Pd);return e}function qd(e){try{e=encodeURI(e).replace(Ne.percentDecode,"%")}catch{return null}return e}function Nd(e,t){var a;const n=e.replace(Ne.findPipe,(o,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(Ne.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(Ne.slashPipe,"|");return i}function Fi(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function qh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Od(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function Nh(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var ca=class{constructor(e){se(this,"options");se(this,"rules");se(this,"lexer");this.options=e||qe}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Fi(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=Nh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=Fi(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Fi(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Fi(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),o=!0;else if(!o)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=u,n.length===0)break;const m=a.at(-1);if((m==null?void 0:m.type)==="code")break;if((m==null?void 0:m.type)==="blockquote"){const g=m,v=g.raw+`
`+n.join(`
`),y=this.blockquote(v);a[a.length-1]=y,i=i.substring(0,i.length-g.raw.length)+y.raw,s=s.substring(0,s.length-g.text.length)+y.text;break}else if((m==null?void 0:m.type)==="list"){const g=m,v=g.raw+`
`+n.join(`
`),y=this.list(v);a[a.length-1]=y,i=i.substring(0,i.length-m.raw.length)+y.raw,s=s.substring(0,s.length-g.raw.length)+y.raw,n=v.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let l=!1,c="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),m=e.split(`
`,1)[0],g=!u.trim(),v=0;if(this.options.pedantic?(v=2,d=u.trimStart()):g?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,d=u.slice(v),v+=t[1].length),g&&this.rules.other.blankLine.test(m)&&(c+=m+`
`,e=e.substring(m.length+1),l=!0),!l){const S=this.rules.other.nextBulletRegex(v),_=this.rules.other.hrRegex(v),D=this.rules.other.fencesBeginRegex(v),M=this.rules.other.headingBeginRegex(v),ne=this.rules.other.htmlBeginRegex(v);for(;e;){const E=e.split(`
`,1)[0];let P;if(m=E,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),P=m):P=m.replace(this.rules.other.tabCharGlobal,"    "),D.test(m)||M.test(m)||ne.test(m)||S.test(m)||_.test(m))break;if(P.search(this.rules.other.nonSpaceChar)>=v||!m.trim())d+=`
`+P.slice(v);else{if(g||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||D.test(u)||M.test(u)||_.test(u))break;d+=`
`+m}!g&&!m.trim()&&(g=!0),c+=E+`
`,e=e.substring(E.length+1),u=P.slice(v)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let y=null,w;this.options.gfm&&(y=this.rules.other.listIsTask.exec(d),y&&(w=y[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!y,checked:w,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(u=>u.type==="space"),d=c.length>0&&c.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Nd(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(Nd(r,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Fi(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=qh(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Od(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Od(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,l=a,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const u=[...i[0]][0].length,m=e.slice(0,a+i.index+u+r);if(Math.min(a,r)%2){const v=m.slice(1,-1);return{type:"em",raw:m,text:v,tokens:this.lexer.inlineTokens(v)}}const g=m.slice(2,-2);return{type:"strong",raw:m,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ot=class _d{constructor(t){se(this,"tokens");se(this,"options");se(this,"state");se(this,"tokenizer");se(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||qe,this.options.tokenizer=this.options.tokenizer||new ca,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:Ne,block:la.normal,inline:Hi.normal};this.options.pedantic?(n.block=la.pedantic,n.inline=Hi.pedantic):this.options.gfm&&(n.block=la.gfm,this.options.breaks?n.inline=Hi.breaks:n.inline=Hi.gfm),this.tokenizer.rules=n}static get rules(){return{block:la,inline:Hi}}static lex(t,n){return new _d(n).lex(t)}static lexInline(t,n){return new _d(n).inlineTokens(t)}lex(t){t=t.replace(Ne.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(Ne.tabCharGlobal,"    ").replace(Ne.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const d=t.slice(1);let u;this.options.extensions.startBlock.forEach(m=>{u=m.call({lexer:this},d),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(m=>(d=m.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const m=n.at(-1);d.type==="text"&&(m==null?void 0:m.type)==="text"?(m.raw+=d.raw,m.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let u=t;if((c=this.options.extensions)!=null&&c.startInline){let m=1/0;const g=t.slice(1);let v;this.options.extensions.startInline.forEach(y=>{v=y.call({lexer:this},g),typeof v=="number"&&v>=0&&(m=Math.min(m,v))}),m<1/0&&m>=0&&(u=t.substring(0,m+1))}if(d=this.tokenizer.inlineText(u)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const m=n.at(-1);(m==null?void 0:m.type)==="text"?(m.raw+=d.raw,m.text+=d.text):n.push(d);continue}if(t){const m="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(m);break}else throw new Error(m)}}return n}},da=class{constructor(e){se(this,"options");se(this,"parser");this.options=e||qe}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(Ne.notSpaceStart))==null?void 0:a[0],s=e.replace(Ne.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Et(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=qd(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+Et(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=qd(e);if(s===null)return Et(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Et(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Et(e.text)}},cr=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Ht=class xd{constructor(t){se(this,"options");se(this,"renderer");se(this,"textRenderer");this.options=t||qe,this.options.renderer=this.options.renderer||new da,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new cr}static parse(t,n){return new xd(n).parse(t)}static parseInline(t,n){return new xd(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},ua=(ud=class{constructor(e){se(this,"options");se(this,"block");this.options=e||qe}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Ot.lex:Ot.lexInline}provideParser(){return this.block?Ht.parse:Ht.parseInline}},se(ud,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),ud),Oh=class{constructor(...e){se(this,"defaults",Nt());se(this,"options",this.setOptions);se(this,"parse",this.parseMarkdown(!0));se(this,"parseInline",this.parseMarkdown(!1));se(this,"Parser",Ht);se(this,"Renderer",da);se(this,"TextRenderer",cr);se(this,"Lexer",Ot);se(this,"Tokenizer",ca);se(this,"Hooks",ua);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new da(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new ca(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new ua;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=s[o];ua.passThroughHooks.has(a)?s[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(u=>l.call(s,u));const d=r.call(s,c);return l.call(s,d)}:s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ot.lex(e,t??this.defaults)}parser(e,t){return Ht.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Ot.lex:Ot.lexInline,l=a.hooks?a.hooks.provideParser():e?Ht.parse:Ht.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>l(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let d=l(c,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+Et(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},$n=new Oh;function Y(e,t){return $n.parse(e,t)}Y.options=Y.setOptions=function(e){return $n.setOptions(e),Y.defaults=$n.defaults,wn(Y.defaults),Y},Y.getDefaults=Nt,Y.defaults=qe,Y.use=function(...e){return $n.use(...e),Y.defaults=$n.defaults,wn(Y.defaults),Y},Y.walkTokens=function(e,t){return $n.walkTokens(e,t)},Y.parseInline=$n.parseInline,Y.Parser=Ht,Y.parser=Ht.parse,Y.Renderer=da,Y.TextRenderer=cr,Y.Lexer=Ot,Y.lexer=Ot.lex,Y.Tokenizer=ca,Y.Hooks=ua,Y.parse=Y,Y.options,Y.setOptions,Y.use,Y.walkTokens,Y.parseInline,Ht.parse,Ot.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Hd,setPrototypeOf:Fd,isFrozen:Hh,getPrototypeOf:Fh,getOwnPropertyDescriptor:Uh}=Object;let{freeze:Oe,seal:st,create:dr}=Object,{apply:ur,construct:pr}=typeof Reflect<"u"&&Reflect;Oe||(Oe=function(t){return t}),st||(st=function(t){return t}),ur||(ur=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),pr||(pr=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const pa=Fe(Array.prototype.forEach),Gh=Fe(Array.prototype.lastIndexOf),Ud=Fe(Array.prototype.pop),Ui=Fe(Array.prototype.push),zh=Fe(Array.prototype.splice),ma=Fe(String.prototype.toLowerCase),mr=Fe(String.prototype.toString),fr=Fe(String.prototype.match),Gi=Fe(String.prototype.replace),Vh=Fe(String.prototype.indexOf),Wh=Fe(String.prototype.trim),vt=Fe(Object.prototype.hasOwnProperty),He=Fe(RegExp.prototype.test),zi=Kh(TypeError);function Fe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return ur(e,t,i)}}function Kh(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return pr(e,n)}}function G(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ma;Fd&&Fd(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(Hh(t)||(t[i]=a),s=a)}e[s]=!0}return e}function Yh(e){for(let t=0;t<e.length;t++)vt(e,t)||(e[t]=null);return e}function _t(e){const t=dr(null);for(const[n,i]of Hd(e))vt(e,n)&&(Array.isArray(i)?t[n]=Yh(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=_t(i):t[n]=i);return t}function Vi(e,t){for(;e!==null;){const i=Uh(e,t);if(i){if(i.get)return Fe(i.get);if(typeof i.value=="function")return Fe(i.value)}e=Fh(e)}function n(){return null}return n}const Gd=Oe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),gr=Oe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),hr=Oe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Qh=Oe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),vr=Oe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Zh=Oe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),zd=Oe(["#text"]),Vd=Oe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),br=Oe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Wd=Oe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),fa=Oe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Xh=st(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Jh=st(/<%[\w\W]*|[\w\W]*%>/gm),ev=st(/\$\{[\w\W]*/gm),tv=st(/^data-[\-\w.\u00B7-\uFFFF]+$/),nv=st(/^aria-[\-\w]+$/),Kd=st(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),iv=st(/^(?:\w+script|data):/i),sv=st(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Yd=st(/^html$/i),av=st(/^[a-z][.\w]*(-[.\w]+)+$/i);var Qd=Object.freeze({__proto__:null,ARIA_ATTR:nv,ATTR_WHITESPACE:sv,CUSTOM_ELEMENT:av,DATA_ATTR:tv,DOCTYPE_NAME:Yd,ERB_EXPR:Jh,IS_ALLOWED_URI:Kd,IS_SCRIPT_OR_DATA:iv,MUSTACHE_EXPR:Xh,TMPLIT_EXPR:ev});const Wi={element:1,text:3,progressingInstruction:7,comment:8,document:9},ov=function(){return typeof window>"u"?null:window},rv=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Zd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Xd(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ov();const t=j=>Xd(j);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Wi.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:m,trustedTypes:g}=e,v=l.prototype,y=Vi(v,"cloneNode"),w=Vi(v,"remove"),S=Vi(v,"nextSibling"),_=Vi(v,"childNodes"),D=Vi(v,"parentNode");if(typeof o=="function"){const j=n.createElement("template");j.content&&j.content.ownerDocument&&(n=j.content.ownerDocument)}let M,ne="";const{implementation:E,createNodeIterator:P,createDocumentFragment:U,getElementsByTagName:W}=n,{importNode:Ee}=i;let x=Zd();t.isSupported=typeof Hd=="function"&&typeof D=="function"&&E&&E.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:R,ERB_EXPR:C,TMPLIT_EXPR:Q,DATA_ATTR:_e,ARIA_ATTR:ce,IS_SCRIPT_OR_DATA:ht,ATTR_WHITESPACE:L,CUSTOM_ELEMENT:de}=Qd;let{IS_ALLOWED_URI:ge}=Qd,ue=null;const ee=G({},[...Gd,...gr,...hr,...vr,...zd]);let Be=null;const qg=G({},[...Vd,...br,...Wd,...fa]);let he=Object.seal(dr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),na=null,pd=null;const Bi=Object.seal(dr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Ng=!0,md=!0,Og=!1,Hg=!0,Di=!1,Ko=!0,zn=!1,fd=!1,gd=!1,Mi=!1,Yo=!1,Qo=!1,Fg=!0,Ug=!1;const b0="user-content-";let hd=!0,ia=!1,ji={},Pt=null;const vd=G({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Gg=null;const zg=G({},["audio","video","img","source","image","track"]);let bd=null;const Vg=G({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Zo="http://www.w3.org/1998/Math/MathML",Xo="http://www.w3.org/2000/svg",Jt="http://www.w3.org/1999/xhtml";let Ri=Jt,yd=!1,wd=null;const y0=G({},[Zo,Xo,Jt],mr);let Jo=G({},["mi","mo","mn","ms","mtext"]),er=G({},["annotation-xml"]);const w0=G({},["title","style","font","a","script"]);let sa=null;const $0=["application/xhtml+xml","text/html"],k0="text/html";let xe=null,Pi=null;const E0=n.createElement("form"),Wg=function(h){return h instanceof RegExp||h instanceof Function},$d=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Pi&&Pi===h)){if((!h||typeof h!="object")&&(h={}),h=_t(h),sa=$0.indexOf(h.PARSER_MEDIA_TYPE)===-1?k0:h.PARSER_MEDIA_TYPE,xe=sa==="application/xhtml+xml"?mr:ma,ue=vt(h,"ALLOWED_TAGS")?G({},h.ALLOWED_TAGS,xe):ee,Be=vt(h,"ALLOWED_ATTR")?G({},h.ALLOWED_ATTR,xe):qg,wd=vt(h,"ALLOWED_NAMESPACES")?G({},h.ALLOWED_NAMESPACES,mr):y0,bd=vt(h,"ADD_URI_SAFE_ATTR")?G(_t(Vg),h.ADD_URI_SAFE_ATTR,xe):Vg,Gg=vt(h,"ADD_DATA_URI_TAGS")?G(_t(zg),h.ADD_DATA_URI_TAGS,xe):zg,Pt=vt(h,"FORBID_CONTENTS")?G({},h.FORBID_CONTENTS,xe):vd,na=vt(h,"FORBID_TAGS")?G({},h.FORBID_TAGS,xe):_t({}),pd=vt(h,"FORBID_ATTR")?G({},h.FORBID_ATTR,xe):_t({}),ji=vt(h,"USE_PROFILES")?h.USE_PROFILES:!1,Ng=h.ALLOW_ARIA_ATTR!==!1,md=h.ALLOW_DATA_ATTR!==!1,Og=h.ALLOW_UNKNOWN_PROTOCOLS||!1,Hg=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Di=h.SAFE_FOR_TEMPLATES||!1,Ko=h.SAFE_FOR_XML!==!1,zn=h.WHOLE_DOCUMENT||!1,Mi=h.RETURN_DOM||!1,Yo=h.RETURN_DOM_FRAGMENT||!1,Qo=h.RETURN_TRUSTED_TYPE||!1,gd=h.FORCE_BODY||!1,Fg=h.SANITIZE_DOM!==!1,Ug=h.SANITIZE_NAMED_PROPS||!1,hd=h.KEEP_CONTENT!==!1,ia=h.IN_PLACE||!1,ge=h.ALLOWED_URI_REGEXP||Kd,Ri=h.NAMESPACE||Jt,Jo=h.MATHML_TEXT_INTEGRATION_POINTS||Jo,er=h.HTML_INTEGRATION_POINTS||er,he=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&Wg(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&Wg(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Di&&(md=!1),Yo&&(Mi=!0),ji&&(ue=G({},zd),Be=[],ji.html===!0&&(G(ue,Gd),G(Be,Vd)),ji.svg===!0&&(G(ue,gr),G(Be,br),G(Be,fa)),ji.svgFilters===!0&&(G(ue,hr),G(Be,br),G(Be,fa)),ji.mathMl===!0&&(G(ue,vr),G(Be,Wd),G(Be,fa))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?Bi.tagCheck=h.ADD_TAGS:(ue===ee&&(ue=_t(ue)),G(ue,h.ADD_TAGS,xe))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?Bi.attributeCheck=h.ADD_ATTR:(Be===qg&&(Be=_t(Be)),G(Be,h.ADD_ATTR,xe))),h.ADD_URI_SAFE_ATTR&&G(bd,h.ADD_URI_SAFE_ATTR,xe),h.FORBID_CONTENTS&&(Pt===vd&&(Pt=_t(Pt)),G(Pt,h.FORBID_CONTENTS,xe)),h.ADD_FORBID_CONTENTS&&(Pt===vd&&(Pt=_t(Pt)),G(Pt,h.ADD_FORBID_CONTENTS,xe)),hd&&(ue["#text"]=!0),zn&&G(ue,["html","head","body"]),ue.table&&(G(ue,["tbody"]),delete na.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw zi('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw zi('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=h.TRUSTED_TYPES_POLICY,ne=M.createHTML("")}else M===void 0&&(M=rv(g,s)),M!==null&&typeof ne=="string"&&(ne=M.createHTML(""));Oe&&Oe(h),Pi=h}},Kg=G({},[...gr,...hr,...Qh]),Yg=G({},[...vr,...Zh]),_0=function(h){let I=D(h);(!I||!I.tagName)&&(I={namespaceURI:Ri,tagName:"template"});const B=ma(h.tagName),pe=ma(I.tagName);return wd[h.namespaceURI]?h.namespaceURI===Xo?I.namespaceURI===Jt?B==="svg":I.namespaceURI===Zo?B==="svg"&&(pe==="annotation-xml"||Jo[pe]):!!Kg[B]:h.namespaceURI===Zo?I.namespaceURI===Jt?B==="math":I.namespaceURI===Xo?B==="math"&&er[pe]:!!Yg[B]:h.namespaceURI===Jt?I.namespaceURI===Xo&&!er[pe]||I.namespaceURI===Zo&&!Jo[pe]?!1:!Yg[B]&&(w0[B]||!Kg[B]):!!(sa==="application/xhtml+xml"&&wd[h.namespaceURI]):!1},qt=function(h){Ui(t.removed,{element:h});try{D(h).removeChild(h)}catch{w(h)}},Vn=function(h,I){try{Ui(t.removed,{attribute:I.getAttributeNode(h),from:I})}catch{Ui(t.removed,{attribute:null,from:I})}if(I.removeAttribute(h),h==="is")if(Mi||Yo)try{qt(I)}catch{}else try{I.setAttribute(h,"")}catch{}},Qg=function(h){let I=null,B=null;if(gd)h="<remove></remove>"+h;else{const be=fr(h,/^[\r\n\t ]+/);B=be&&be[0]}sa==="application/xhtml+xml"&&Ri===Jt&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");const pe=M?M.createHTML(h):h;if(Ri===Jt)try{I=new m().parseFromString(pe,sa)}catch{}if(!I||!I.documentElement){I=E.createDocument(Ri,"template",null);try{I.documentElement.innerHTML=yd?ne:pe}catch{}}const Pe=I.body||I.documentElement;return h&&B&&Pe.insertBefore(n.createTextNode(B),Pe.childNodes[0]||null),Ri===Jt?W.call(I,zn?"html":"body")[0]:zn?I.documentElement:Pe},Zg=function(h){return P.call(h.ownerDocument||h,h,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},kd=function(h){return h instanceof u&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof d)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},Xg=function(h){return typeof r=="function"&&h instanceof r};function en(j,h,I){pa(j,B=>{B.call(t,h,I,Pi)})}const Jg=function(h){let I=null;if(en(x.beforeSanitizeElements,h,null),kd(h))return qt(h),!0;const B=xe(h.nodeName);if(en(x.uponSanitizeElement,h,{tagName:B,allowedTags:ue}),Ko&&h.hasChildNodes()&&!Xg(h.firstElementChild)&&He(/<[/\w!]/g,h.innerHTML)&&He(/<[/\w!]/g,h.textContent)||h.nodeType===Wi.progressingInstruction||Ko&&h.nodeType===Wi.comment&&He(/<[/\w]/g,h.data))return qt(h),!0;if(!(Bi.tagCheck instanceof Function&&Bi.tagCheck(B))&&(!ue[B]||na[B])){if(!na[B]&&th(B)&&(he.tagNameCheck instanceof RegExp&&He(he.tagNameCheck,B)||he.tagNameCheck instanceof Function&&he.tagNameCheck(B)))return!1;if(hd&&!Pt[B]){const pe=D(h)||h.parentNode,Pe=_(h)||h.childNodes;if(Pe&&pe){const be=Pe.length;for(let et=be-1;et>=0;--et){const tn=y(Pe[et],!0);tn.__removalCount=(h.__removalCount||0)+1,pe.insertBefore(tn,S(h))}}}return qt(h),!0}return h instanceof l&&!_0(h)||(B==="noscript"||B==="noembed"||B==="noframes")&&He(/<\/no(script|embed|frames)/i,h.innerHTML)?(qt(h),!0):(Di&&h.nodeType===Wi.text&&(I=h.textContent,pa([R,C,Q],pe=>{I=Gi(I,pe," ")}),h.textContent!==I&&(Ui(t.removed,{element:h.cloneNode()}),h.textContent=I)),en(x.afterSanitizeElements,h,null),!1)},eh=function(h,I,B){if(Fg&&(I==="id"||I==="name")&&(B in n||B in E0))return!1;if(!(md&&!pd[I]&&He(_e,I))){if(!(Ng&&He(ce,I))){if(!(Bi.attributeCheck instanceof Function&&Bi.attributeCheck(I,h))){if(!Be[I]||pd[I]){if(!(th(h)&&(he.tagNameCheck instanceof RegExp&&He(he.tagNameCheck,h)||he.tagNameCheck instanceof Function&&he.tagNameCheck(h))&&(he.attributeNameCheck instanceof RegExp&&He(he.attributeNameCheck,I)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(I,h))||I==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&He(he.tagNameCheck,B)||he.tagNameCheck instanceof Function&&he.tagNameCheck(B))))return!1}else if(!bd[I]){if(!He(ge,Gi(B,L,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&h!=="script"&&Vh(B,"data:")===0&&Gg[h])){if(!(Og&&!He(ht,Gi(B,L,"")))){if(B)return!1}}}}}}}return!0},th=function(h){return h!=="annotation-xml"&&fr(h,de)},nh=function(h){en(x.beforeSanitizeAttributes,h,null);const{attributes:I}=h;if(!I||kd(h))return;const B={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Be,forceKeepAttr:void 0};let pe=I.length;for(;pe--;){const Pe=I[pe],{name:be,namespaceURI:et,value:tn}=Pe,qi=xe(be),Ed=tn;let De=be==="value"?Ed:Wh(Ed);if(B.attrName=qi,B.attrValue=De,B.keepAttr=!0,B.forceKeepAttr=void 0,en(x.uponSanitizeAttribute,h,B),De=B.attrValue,Ug&&(qi==="id"||qi==="name")&&(Vn(be,h),De=b0+De),Ko&&He(/((--!?|])>)|<\/(style|title|textarea)/i,De)){Vn(be,h);continue}if(qi==="attributename"&&fr(De,"href")){Vn(be,h);continue}if(B.forceKeepAttr)continue;if(!B.keepAttr){Vn(be,h);continue}if(!Hg&&He(/\/>/i,De)){Vn(be,h);continue}Di&&pa([R,C,Q],sh=>{De=Gi(De,sh," ")});const ih=xe(h.nodeName);if(!eh(ih,qi,De)){Vn(be,h);continue}if(M&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!et)switch(g.getAttributeType(ih,qi)){case"TrustedHTML":{De=M.createHTML(De);break}case"TrustedScriptURL":{De=M.createScriptURL(De);break}}if(De!==Ed)try{et?h.setAttributeNS(et,be,De):h.setAttribute(be,De),kd(h)?qt(h):Ud(t.removed)}catch{Vn(be,h)}}en(x.afterSanitizeAttributes,h,null)},x0=function j(h){let I=null;const B=Zg(h);for(en(x.beforeSanitizeShadowDOM,h,null);I=B.nextNode();)en(x.uponSanitizeShadowNode,I,null),Jg(I),nh(I),I.content instanceof a&&j(I.content);en(x.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(j){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,B=null,pe=null,Pe=null;if(yd=!j,yd&&(j="<!-->"),typeof j!="string"&&!Xg(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw zi("dirty is not a string, aborting")}else throw zi("toString is not a function");if(!t.isSupported)return j;if(fd||$d(h),t.removed=[],typeof j=="string"&&(ia=!1),ia){if(j.nodeName){const tn=xe(j.nodeName);if(!ue[tn]||na[tn])throw zi("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof r)I=Qg("<!---->"),B=I.ownerDocument.importNode(j,!0),B.nodeType===Wi.element&&B.nodeName==="BODY"||B.nodeName==="HTML"?I=B:I.appendChild(B);else{if(!Mi&&!Di&&!zn&&j.indexOf("<")===-1)return M&&Qo?M.createHTML(j):j;if(I=Qg(j),!I)return Mi?null:Qo?ne:""}I&&gd&&qt(I.firstChild);const be=Zg(ia?j:I);for(;pe=be.nextNode();)Jg(pe),nh(pe),pe.content instanceof a&&x0(pe.content);if(ia)return j;if(Mi){if(Yo)for(Pe=U.call(I.ownerDocument);I.firstChild;)Pe.appendChild(I.firstChild);else Pe=I;return(Be.shadowroot||Be.shadowrootmode)&&(Pe=Ee.call(i,Pe,!0)),Pe}let et=zn?I.outerHTML:I.innerHTML;return zn&&ue["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&He(Yd,I.ownerDocument.doctype.name)&&(et="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+et),Di&&pa([R,C,Q],tn=>{et=Gi(et,tn," ")}),M&&Qo?M.createHTML(et):et},t.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};$d(j),fd=!0},t.clearConfig=function(){Pi=null,fd=!1},t.isValidAttribute=function(j,h,I){Pi||$d({});const B=xe(j),pe=xe(h);return eh(B,pe,I)},t.addHook=function(j,h){typeof h=="function"&&Ui(x[j],h)},t.removeHook=function(j,h){if(h!==void 0){const I=Gh(x[j],h);return I===-1?void 0:zh(x[j],I,1)[0]}return Ud(x[j])},t.removeHooks=function(j){x[j]=[]},t.removeAllHooks=function(){x=Zd()},t}var Jd=Xd();const yr="chaotic_";function Qe(e){try{return localStorage.getItem(yr+e)}catch{return null}}function at(e,t){try{localStorage.setItem(yr+e,t)}catch{}}function xt(e){try{localStorage.removeItem(yr+e)}catch{}}function wr(){return Qe("token")}function lv(e){e?at("token",e):xt("token")}function cv(){return Qe("theme")}function dv(e){at("theme",e)}function eu(){return Qe("last_project")}function uv(e){at("last_project",e)}function pv(){return Qe("onboarding_complete")==="true"}function mv(){at("onboarding_complete","true")}function fv(){xt("onboarding_complete")}function gv(e){return e?Qe(`issues_filters_${e}`):null}function hv(e,t){e&&(t?at(`issues_filters_${e}`,t):xt(`issues_filters_${e}`))}function tu(e){return Qe(`comment_draft_${e}`)}function ga(e,t){t?at(`comment_draft_${e}`,t):xt(`comment_draft_${e}`)}function nu(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function Ki(e){const t=Qe(`description_draft_${e}`);if(!t)return null;const n=nu(t);return n?n.draft:t}function iu(e){const t=Qe(`description_draft_${e}`);if(!t)return null;const n=nu(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function kn(e,t,n=""){t?at(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):xt(`description_draft_${e}`)}function su(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function au(e){var n;const t=Qe(`document_draft_${e}`);return t?((n=su(t))==null?void 0:n.draft)??null:null}function vv(e){const t=Qe(`document_draft_${e}`);if(!t)return null;const n=su(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function ha(e,t,n=null){t&&(t.title||t.content||t.icon)?at(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):xt(`document_draft_${e}`)}function bv(){return{title:Qe("create_issue_title"),description:Qe("create_issue_description")}}function ou(e,t){e?at("create_issue_title",e):xt("create_issue_title"),t?at("create_issue_description",t):xt("create_issue_description")}function yv(){xt("create_issue_title"),xt("create_issue_description")}function wv(){return Qe("doc_view_mode")}function $v(e){at("doc_view_mode",e)}function kv(){return Qe("approvals_explainer_dismissed")==="1"}function Ev(){at("approvals_explainer_dismissed","1")}const _v="chaotic-boot-cache",$r="snapshot",kr="last",ru=1,xv=336*60*60*1e3,Iv=250;let En=null;function Sv(){return En||(En=new Promise((e,t)=>{var i;let n;try{n=(i=globalThis.indexedDB)==null?void 0:i.open(_v,1)}catch(s){t(s);return}if(!n){t(new Error("IndexedDB unavailable"));return}n.onupgradeneeded=()=>n.result.createObjectStore($r),n.onsuccess=()=>{const s=n.result;s.onversionchange=()=>{s.close(),En=null},e(s)},n.onerror=()=>t(n.error),n.onblocked=()=>t(new Error("IndexedDB blocked"))}),En.catch(()=>{En=null}),En)}function Er(e,t){return Sv().then(n=>new Promise((i,s)=>{const a=n.transaction($r,e),o=t(a.objectStore($r));a.oncomplete=()=>i(o==null?void 0:o.result),a.onerror=()=>s(a.error),a.onabort=()=>s(a.error)}))}function lu(e){var t;try{const n=String(e).split(".")[1];if(!n)return null;const i=atob(n.replace(/-/g,"+").replace(/_/g,"/")),s=(t=JSON.parse(i))==null?void 0:t.sub;return typeof s=="string"&&s?s:null}catch{return null}}function Tv(e){if(!e)return Promise.resolve(null);const t=Er("readonly",i=>i.get(kr)).then(i=>!i||i.version!==ru||i.userId!==e||!(Date.now()-i.savedAt<xv)?null:i).catch(()=>null),n=new Promise(i=>setTimeout(()=>i(null),Iv));return Promise.race([t,n])}function Lv(e,t){if(!e)return Promise.resolve();const n={...t,version:ru,userId:e,savedAt:Date.now()};return Er("readwrite",i=>i.put(n,kr)).then(()=>{},()=>{})}function _r(){return Er("readwrite",e=>e.delete(kr)).then(()=>{},()=>{})}const Av="/api";class Cv{constructor(){this.token=wr()}setToken(t){this.token=t,lv(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s},o=typeof Blob<"u"&&i instanceof Blob;o&&(s["Content-Type"]=i.type||"application/octet-stream"),i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=o?i:JSON.stringify(i));let r;try{r=await fetch(`${Av}${n}`,a)}catch(c){const d=new Error("Network error - check your connection");throw d.isNetworkError=!0,d.cause=c,d}if(r.status===204)return null;let l;try{l=await r.json()}catch{const c=r.headers.get("content-type")||"unknown";throw r.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${r.status})`)}if(!r.ok){let c;typeof l.detail=="string"?c=l.detail:l.detail&&typeof l.detail=="object"&&l.detail.message?c=l.detail.message:c="An error occurred";const d=new Error(c);throw d.status=r.status,d.detail=l.detail,d}return l}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null),_r()}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async uploadAvatar(t){return this.request("PUT","/users/me/avatar",t)}async deleteAvatar(){return this.request("DELETE","/users/me/avatar")}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:a=null,skip:o=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),a&&c.set("order",a),c.set("skip",String(o)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/teams/${t}/agents`,a)}async createProjectAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/projects/${t}/agents`,a)}async getTeamRoster(t,{includeIdle:n=!1}={}){const i=n?"?include_idle=true":"";return this.request("GET",`/teams/${t}/roster${i}`)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const b=new Cv;let Wn=null;const Bv='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Kn=null,Yi=!1;function xr(){Yi=!0}function Dv(){Yi=!1}function cu(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function Mv(){if(Yi)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function z(){Kn=document.activeElement,Yi=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function H(){var e;Ft(),Yi=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Kn&&document.contains(Kn)&&typeof Kn.focus=="function"&&Kn.focus(),Kn=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(Bv);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function tt(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function $(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),u=setTimeout(o,l);return a.addEventListener("click",()=>{clearTimeout(u),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(u),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),u=setTimeout(o,Math.max(c,500))}),i}function Ir(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=$(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function jv(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function k(e,t){const n=jv(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";$(`Failed to ${e}: ${n}${i}`,"error")}function Ft(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Wn&&(document.removeEventListener("keydown",Wn),Wn=null)}function Rv(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));Ft(),t&&tt()&&cu()}function Qi(e){Wn&&document.removeEventListener("keydown",Wn),Wn=e,e&&document.addEventListener("keydown",e)}function Zi(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(Ft(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function Ie(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Te(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function nt(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function te(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function p(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function f(e){return p(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Pv(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function ot(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function rt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}const Sr=/^\/api\/avatars\/[0-9a-f]{64}$/;function du(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||Sr.test(e))}function Ut(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?du(i)?`<img class="${t} avatar-img" src="${f(i)}" alt="${f(n)}">`:`<div class="${t} avatar-emoji">${p(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function uu(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${f(n)}">agent</span>`}function va(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${f(i)}">${p(n)}</span>`}return uu(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let oe={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const Tr=new Set;function me(e,t){if(typeof e=="string"){const n=oe[e];oe[e]=t,pu(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=oe[i];oe[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{pu(i,s,a)})}}function lt(e){return Tr.add(e),()=>Tr.delete(e)}function pu(e,t,n){t!==n&&Tr.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const fe=()=>oe.currentUser,It=e=>me("currentUser",e),A=()=>oe.currentView,Xi=e=>me("currentView",e),X=()=>oe.issues,Ze=e=>me("issues",e),Ji=()=>oe.detailNavContext,St=e=>me("detailNavContext",e),Lr=()=>oe.labels,es=e=>me("labels",e),mu=()=>oe.activeFilterCategory,qv=e=>me("activeFilterCategory",e),fu=()=>oe.selectedIssueIndex,_n=e=>me("selectedIssueIndex",e),Nv=()=>oe.selectedDocIndex,gu=e=>me("selectedDocIndex",e),hu=()=>oe.selectedBoardIndex,ba=e=>me("selectedBoardIndex",e),Ov=()=>oe.selectedInboxIndex,ya=e=>me("selectedInboxIndex",e),Hv=()=>oe.selectedSprintIndex,vu=e=>me("selectedSprintIndex",e),Fv=()=>oe.selectedEpicIndex,Ar=e=>me("selectedEpicIndex",e),Uv=()=>oe.pendingGates,Gv=e=>me("pendingGates",e),ye=()=>oe.inboxEntries,Gt=e=>me("inboxEntries",e),wa=()=>oe.inboxUnreadCount,ts=e=>me("inboxUnreadCount",e),zv=()=>oe.searchDebounceTimer,Vv=e=>me("searchDebounceTimer",e),Wv=()=>oe.websocket,Cr=e=>me("websocket",e),T=()=>oe.currentTeam,Yn=e=>me("currentTeam",e),K=()=>oe.currentProject,ct=e=>me("currentProject",e||null),we=()=>oe.currentDetailIssue,Qn=e=>me("currentDetailIssue",e),Kv=()=>oe.currentDetailSprints,bu=e=>me("currentDetailSprints",e),Br={};function ie(e){Object.assign(Br,e)}function Yv(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=Br[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let yu=!1;function Qv(){if(!yu){yu=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,Yv);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=Br[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const Dr=["backlog","todo","in_progress","in_review","done","canceled"],ns=["backlog","todo","in_progress","in_review"],wu=["urgent","high","medium","low","no_priority"],Mr=["no_priority","urgent","high","medium","low"],$u=["backlog","todo","in_progress","in_review","done"],$a="#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row";function F({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${f(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${f(r)}="${f(l)}"`).join(""):""}>${p(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${p(t)}</h3>
            <p>${p(n)}</p>
            ${a}
        </div>
    `}const N={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},ku=24,Xe=new Map,ve=new Map,bt=new Map;let zt=null;function Zv(e){return Array.isArray(e)?[...e].map(String).sort():e}function Eu(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,Zv(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function ka(e,t){for(ve.delete(e),ve.set(e,t);ve.size>ku;){const n=ve.keys().next().value;ve.delete(n)}_u()}function _u(){if(Xe.size===0)return;const e=new Set;ve.forEach(t=>t.ids.forEach(n=>e.add(n))),Xe.forEach((t,n)=>{e.has(n)||Xe.delete(n)})}function Xv(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function xu(e){const t=ve.get(e);return t?(ka(e,t),t.ids.map(n=>Xe.get(n)).filter(Boolean)):null}function jr(e){return Xe.get(e)}function Jv(e){var t;return((t=ve.get(e))==null?void 0:t.meta)||{}}function Iu(e,t){if(!e||!t)return!1;const n=Date.parse(e),i=Date.parse(t);return Number.isNaN(n)||Number.isNaN(i)?e>t:n>i}function Rr(e){const t=Xe.get(e.id);if(!Iu(t==null?void 0:t.updated_at,e.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){Xe.set(e.id,{...e,description:t.description});return}Xe.set(e.id,e)}}const Pr=new Set;function eb(e){return Pr.add(e),()=>Pr.delete(e)}function Su(e,t,n){if(!Array.isArray(t))return;const i=Xv(t);i.forEach(Rr);const s=ve.get(e);ka(e,{ids:i.map(a=>a.id),meta:n??(s==null?void 0:s.meta)??{}}),Pr.forEach(a=>{try{a(e)}catch(o){console.error(o)}})}function tb(e,t){const n=ve.get(e);n&&(n.meta=t)}function Ea(e){e!=null&&e.id&&Xe.has(e.id)&&Rr(e)}function nb(e){ve.delete(e),bt.forEach((t,n)=>{t===e&&bt.delete(n)}),zt===e&&(zt=null),_u()}function ib(e){Xe.delete(e),ve.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function _a(e){zt=e}function sb(){return zt}function Tu(e,t){for(bt.delete(e),bt.set(e,t);bt.size>ku;)bt.delete(bt.keys().next().value)}function ab(e){const t=bt.get(e);return t&&ve.has(t)?t:null}function ob({maxQueries:e=3}={}){const t=[...ve.entries()].slice(-e),n=new Set(t.map(([s])=>s)),i=new Set;return t.forEach(([,s])=>s.ids.forEach(a=>i.add(a))),{queries:t.map(([s,a])=>[s,{ids:[...a.ids],meta:a.meta||{}}]),entities:[...i].map(s=>Xe.get(s)).filter(Boolean),views:[...bt.entries()].filter(([,s])=>n.has(s))}}function rb(e){if(!e||!Array.isArray(e.queries))return;const t=new Map((e.entities||[]).filter(n=>n==null?void 0:n.id).map(n=>[n.id,n]));e.queries.forEach(([n,i])=>{ve.has(n)||!Array.isArray(i==null?void 0:i.ids)||(i.ids.forEach(s=>{t.has(s)&&Rr(t.get(s))}),ka(n,{ids:i.ids.filter(s=>Xe.has(s)),meta:i.meta||{}}))}),(e.views||[]).forEach(([n,i])=>{!bt.has(n)&&ve.has(i)&&Tu(n,i)})}function Lu(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function Au(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(Lu(e[n])!==Lu(t[n]))return!1;return!0}const Cu=["status","priority"],Bu=["assignee_id","sprint_id","issue_type"],lb={assignee_id:"unassigned",sprint_id:"no_sprint"},cb=["scope","project_id","sort_by","order","limit"],xn=e=>(e||[]).map(t=>String(t).toLowerCase());function db(e,t){if(e.search||t.search||t.sort_by==="random"||cb.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of Cu)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of Bu)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=xn(e.label);if(!xn(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=xn(t.exclude_label);if(!xn(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function Du(e){const t=e.label===void 0?null:xn(e.label),n=e.exclude_label===void 0?null:xn(e.exclude_label);return i=>{for(const s of Cu)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of Bu){if(e[s]===void 0)continue;const a=e[s]===lb[s]?null:e[s];if((i[s]??null)!==a)return!1}if(t||n){const s=xn((i.labels||[]).map(a=>a.name));if(t&&!t.some(a=>s.includes(a))||n&&n.some(a=>s.includes(a)))return!1}return!0}}function ub(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(Eu(e)));let n=null,i=null;if(ve.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let c;try{c=Object.fromEntries(JSON.parse(l))}catch{return}db(c,t)&&(n=r,i=l)}),!n)return null;ka(i,n);const s=Du(t),a=n.ids.map(r=>Xe.get(r)).filter(r=>r&&s(r)),o=t.limit;return{rows:a,complete:!(typeof o=="number"&&n.ids.length>=o)}}function pb(){Xe.clear(),ve.clear(),bt.clear(),zt=null}lt((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&pb();return}if(e!=="issues"||zt===null||!ve.has(zt)||A()!=="issues")return;const i=ve.get(zt);Su(zt,X(),i.meta)});let qr=[];function mb(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function fb(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function is(e,t){const n=e().map(mb),i=t().map(fb);qr=[...n,...i]}function yt(e){return e&&qr.find(t=>t.id===e)||null}function dt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function xa(e,t=!1){const n=p(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${p(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function ss({includeIdle:e=!1,keepId:t=null}={}){const n=qr.filter(v=>e||!v.idle||v.id===t),i=n.filter(v=>!v.is_agent),s=new Set(i.map(v=>v.id)),a=n.filter(v=>v.is_agent),o=new Set(a.map(v=>v.id)),r=(v,y)=>v.name.localeCompare(y.name),l=v=>v.registered_by_id&&o.has(v.registered_by_id),c=new Map,d=new Map;a.forEach(v=>{const[y,w]=l(v)?[c,v.registered_by_id]:[d,v.parent_user_id];y.has(w)||y.set(w,[]),y.get(w).push(v)});const u=[],m=(v,y)=>{u.push({assignee:v,indent:y}),(c.get(v.id)||[]).sort(r).forEach(S=>u.push({assignee:S,indent:2}))};return i.forEach(v=>{u.push({assignee:v,indent:!1}),(d.get(v.id)||[]).sort(r).forEach(y=>m(y,!0))}),a.filter(v=>!l(v)&&!s.has(v.parent_user_id)).sort(r).forEach(v=>m(v,!1)),u}function Zn({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;ss({keepId:n}).forEach(({assignee:s,indent:a})=>{i+=`<option value="${f(s.id)}">${xa(s,a)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function gb(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&yt(e)&&Zn({keepId:e}),t.value=e}let Tt=[],Nr=[],Ia=-1,Or=null;const Mu=5,hb=new Set(["done","canceled"]),ju=new Set;function vb(){return Ia}function bb(e){Ia=e;const t=e>=0?document.querySelectorAll("#my-issues-list .issue-row")[e]:null;Or=(t==null?void 0:t.dataset.issueId)??null}const Ru=[{status:"in_progress",label:"In progress"},{status:"in_review",label:"In review"},{status:"todo",label:"Todo"},{status:"backlog",label:"Backlog"},{status:"done",label:"Done"},{status:"canceled",label:"Canceled"}];function Pu(e){const t=new Set(Ru.map(s=>s.status)),n=Ru.map(s=>({...s,issues:e.filter(a=>a.status===s.status)})),i=e.filter(s=>!t.has(s.status));return i.length&&n.push({status:"other",label:"Other",issues:i}),n.filter(s=>s.issues.length)}lt(e=>{e==="currentProject"&&A()==="my-issues"&&(Xn(),as(),Jn())});function Ue(){return Tt}function In(e){Tt=e}let Hr=0;async function Xn(){var a;const e=T(),t=fe();if(!e||!t)return;const n=++Hr,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=K();wb();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await b.getIssues({...o,project_id:s}):r=await b.getTeamIssues(e.id,o),n!==Hr)return;Tt=Pu(r).flatMap(l=>l.issues),A()==="my-issues"&&St(Tt),Sn()}catch(o){if(n!==Hr)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=F({icon:N.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),k("load issues",o)}}async function Jn({showLoading:e=!0}={}){const t=T();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=K();Nr=await b.getTeamActivities(t.id,0,10,{projectId:i}),yb()}catch{n&&(n.innerHTML=F({icon:N.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function yb(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Nr.length){e.innerHTML=F({icon:N.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=Nr.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${f(t.issue_identifier)}"><strong>${p(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${f(t.document_id)}"><strong>${s} ${p(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${p(t.document_title)}</strong>`);const i=_l(t);return`
        <div class="activity-item">
            <div class="activity-icon" aria-hidden="true">${im(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Il(t)}${n}</span>
                <span class="activity-actor">by ${p(i)}</span>
                <time class="activity-time" datetime="${f(t.created_at||"")}">${ot(t.created_at)}</time>
            </div>
        </div>
    `}).join("")}}function wb(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function qu(){Xn()}function Sn(){var o,r;const e=document.getElementById("my-issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=Pu(Tt);Tt=t.flatMap(l=>l.issues),A()==="my-issues"&&St(Tt),Ia=-1;const n=document.getElementById("my-issues-count");if(n&&(n.textContent=Tt.length?String(Tt.length):""),Tt.length===0){e.innerHTML=F({icon:N.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}const i=document.activeElement,s=e.contains(i)?(o=i.closest(".issue-row"))==null?void 0:o.dataset.issueId:null,a=s?(r=i.dataset)==null?void 0:r.dropdownType:null;if(e.innerHTML=t.map(l=>{const c=hb.has(l.status)&&!ju.has(l.status)&&l.issues.length>Mu,d=c?l.issues.slice(0,Mu):l.issues;return`
        <div class="dash-group" role="group" aria-labelledby="dash-group-${l.status}">
            <h4 class="dash-group-header" id="dash-group-${l.status}">
                <span class="dash-group-dot status-${l.status}" aria-hidden="true"></span>
                ${p(l.label)} <span class="dash-group-count">${l.issues.length}</span>
            </h4>
            ${d.map(u=>ri(u)).join("")}
            ${c?`<button type="button" class="dash-group-more" data-action="dash-show-all" data-status="${l.status}">Show all ${l.issues.length}</button>`:""}
        </div>`}).join(""),s){const l=[...e.querySelectorAll(".issue-row")].find(d=>d.dataset.issueId===s),c=l&&(a?l.querySelector(`[data-dropdown-type="${a}"]`):l.querySelector(".issue-title"));c==null||c.focus({preventScroll:!0})}if(Or){const l=[...e.querySelectorAll(".issue-row")],c=l.findIndex(d=>d.dataset.issueId===Or);c!==-1&&(l[c].classList.add("keyboard-selected"),Ia=c)}}let Fr=0;async function as(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++Fr,n=K(),i=J(),s=n?i.filter(a=>a.id===n):i;if(!s.length){e.innerHTML="";return}try{const a=s.map(async r=>{try{const l=await b.getCurrentSprint(r.id);if(!l)return null;let c={};try{const d=await b.getIssues({sprint_id:l.id,project_id:r.id,limit:500});for(const u of d)c[u.status]=(c[u.status]||0)+1}catch(d){console.error(`Failed to load issue counts for sprint ${l.id}:`,d)}return{project:r,sprint:l,statusCounts:c}}catch(l){return console.error(`Failed to load current sprint for project ${r.id}:`,l),null}}),o=(await Promise.all(a)).filter(Boolean);if(t!==Fr)return;$b(o)}catch(a){if(t!==Fr)return;console.error("Failed to load sprint status:",a),e.innerHTML=F({icon:N.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}function $b(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:i,sprint:s,statusCounts:a})=>{const o=s.budget||0,r=s.points_spent||0,l=o>0?Math.min(100,Math.round(r/o*100)):0,c=o>0&&r>o,d=s.limbo?"limbo":c?"arrears":"",u=a||{},m=Object.values(u).reduce((g,v)=>g+v,0);return`
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
                        ${m>0?`
                            <div class="sprint-issue-breakdown">
                                <div class="sprint-stacked-bar">
                                    ${n.filter(g=>u[g]).map(g=>{const v=Math.round(u[g]/m*100);return`<div class="sprint-stacked-segment status-${g}" style="width: ${v}%" title="${Ie(g)}: ${u[g]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(g=>u[g]).map(g=>`<span class="sprint-count-label status-${g}">${u[g]} ${Ie(g)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}ie({"filter-my-issues":()=>qu(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),sc(t.identifier)},"retry-load-my-issues":()=>Xn(),"dash-show-all":(e,t)=>{ju.add(t.status),Sn()},"retry-load-sprint-status":()=>as()});const Nu=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function os(e=null){const t=e||K()||"";op([]);const n=J().map(o=>`
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
                        ${Ke("backlog")}
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
                                ${Nu.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
    `,z(),Ca();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=bv();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{ou(i.value,s.value)}),s.addEventListener("input",()=>{ou(i.value,s.value)}),i.focus()}function kb(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function Eb(e){const t=Nu.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function Ou(e,t){const n=J().find(i=>i.id===t);op([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
                        ${Ke("backlog")}
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
                <button type="button" class="btn btn-primary" data-action="create-sub-issue-submit" data-parent-id="${f(e)}" data-project-id="${f(t)}">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,z(),Ca(),document.getElementById("create-issue-title").focus()}async function _b(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){$("Please enter a title","error");return}try{const d=await b.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:ap(),parent_id:e});H(),$(`Created sub-issue ${d.identifier}`,"success"),ae(e)}catch(d){k("create sub-issue",d)}}async function xb(e,t,n){var o,r;Ft();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${$u.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${f(Ie(c))}">
                    ${Ke(c)}
                    <span>${Ie(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${Mr.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${f(Te(c))}">
                    ${pt(c)}
                    <span>${Te(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${f(rt(c))}">
                    <span class="issue-type-badge type-${c}">${rt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!T())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=Lr(),c=!1;if(l.length===0)try{l=await b.getLabels(T().id),es(l)}catch(d){console.error("Failed to load labels:",d),c=!0}Wr(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Zi(a,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=ss({keepId:l});a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:u})=>{const m=dt(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${f(d.id)}" data-label="${f(m)}">
                    ${Ut(d,"avatar-small")}
                    <span>${xa(d,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=vi(c);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${d.map(u=>{const m=u.value===null?"":String(u.value);return`
                <button class="dropdown-option ${m===l?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${f(m)}" data-label="${f(u.value?u.label:"Estimate")}">
                    <span>${p(u.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const l=document.getElementById("create-issue-sprint").value,c=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!c)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const u=(await b.getSprints(c)).filter(m=>m.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${u.map(m=>`
                        <button class="dropdown-option ${m.id===l?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${f(m.id)}" data-label="${f(m.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${p(m.name)}${m.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Zi(a)}function Ib(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Sb(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,xr();const i=p(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${Ke(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${pt(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${rt(t)}</span><span id="create-issue-type-label">${i}</span>`)}Ft(),s==null||s.focus()}async function Hu({keepOpen:e=!1}={}){var y,w;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((y=document.getElementById("create-issue-sprint"))==null?void 0:y.value)||null,u=(w=document.getElementById("create-issue-due-date"))==null?void 0:w.value,m=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),v=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),v&&(v.disabled=!0);try{const S=await b.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:d,label_ids:ap(),due_date:m});$(`Created ${S.identifier}`,"success"),yv(),A()==="issues"?At():A()==="my-issues"&&Xn(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",Dv(),document.getElementById("create-issue-title").focus()):(H(),ae(S.id))}catch(S){k("create issue",S)}finally{g&&(g.disabled=!1),v&&(v.disabled=!1)}}async function Tb(){await Hu({keepOpen:!1})}async function Lb(){await Hu({keepOpen:!0})}ie({"toggle-create-dropdown":(e,t,n)=>{xb(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Sb(t.field,t.value,t.label)},"create-issue-submit":()=>{Tb()},"create-issue-and-new":()=>{Lb()},"update-create-project":()=>{Ib()},"apply-template":e=>{Eb(e.target.value)},"toggle-create-options":()=>{kb()},"create-sub-issue-submit":(e,t)=>{_b(t.parentId,t.projectId)}});function rs(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&($(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(Ab(n,e.project_id),t=!0),t}function Ab(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
        <div class="parent-prompt">
            <p>${p(e.message)}</p>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-dismiss">Not now</button>
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-add"
                    data-parent-id="${f(e.id)}" data-project-id="${f(t||"")}">Add more</button>
                <button type="button" class="btn btn-primary" data-action="parent-prompt-close"
                    data-parent-id="${f(e.id)}" data-identifier="${f(e.identifier)}">Close ${p(e.identifier)}</button>
            </div>
        </div>
    `,z())}async function Cb(e,t){try{const n=await b.updateIssue(e,{status:"done"});H(),$(`${t} closed`,"success"),rs(n)}catch(n){k(`close ${t}`,n)}}ie({"parent-prompt-dismiss":()=>H(),"parent-prompt-close":(e,t)=>Cb(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{H(),Ou(t.parentId,t.projectId)}});function nn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Tn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Ln(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function An(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Sa(){const e=document.getElementById("group-by-select");return e?e.value:""}const Fu=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],Ur=["done","canceled"],Bb=ns,Db="all";function Uu(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function ei(e=nn()){return e.length===0?"all":Uu(e,ns)?"open":Uu(e,Ur)?"closed":null}function Gu(e){var t,n,i;switch(e){case"project":return K()?1:0;case"status":{const s=ei();return s==="all"?0:s?1:nn().length}case"priority":return Tn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Ln().length;case"exclude_labels":return An().length;default:return 0}}function Gr(){let e=0;return Fu.forEach(t=>{e+=Gu(t.key)}),e}function zu(){var v,y,w,S,_,D;const e=new URLSearchParams,t=nn(),n=Tn(),i=Ln(),s=An(),a=(v=document.getElementById("assignee-filter"))==null?void 0:v.value,o=K()||"",r=(y=document.getElementById("sprint-filter"))==null?void 0:y.value,l=(w=document.getElementById("issue-type-filter"))==null?void 0:w.value,c=(S=document.getElementById("group-by-select"))==null?void 0:S.value,d=(_=document.getElementById("sort-by-select"))==null?void 0:_.value,u=ei(t);u==="all"?e.append("status",Db):u!=="open"&&t.forEach(M=>e.append("status",M)),n.forEach(M=>e.append("priority",M)),i.forEach(M=>e.append("label",M)),s.forEach(M=>e.append("exclude_label",M)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const m=e.toString(),g=m?`/issues?${m}`:"/issues";history.replaceState({view:"issues"},"",g),hv((D=T())==null?void 0:D.id,m)}function Mb(e){var y;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(w=>t.has(w))){const w=gv((y=T())==null?void 0:y.id);if(w){t=new URLSearchParams(w);const S=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",S)}}const s=t.getAll("status"),a=document.getElementById("status-filter-dropdown");if(a&&(s.length>0||!a.dataset.statusApplied)){const w=s.length>0?s:Bb;a.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=w.includes(_.value)}),a.dataset.statusApplied="true",Vu()}const o=t.getAll("priority");if(o.length>0){const w=document.getElementById("priority-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=o.includes(_.value)}),Wu())}const r=t.get("assignee");r&&gb(r);const l=t.get("project");l&&(e(!0),ct(l),e(!1));const c=t.get("sprint");if(c){const w=document.getElementById("sprint-filter");w&&(w.value=c)}const d=t.get("issue_type");if(d){const w=document.getElementById("issue-type-filter");w&&(w.value=d)}const u=t.getAll("label");if(u.length>0){const w=document.getElementById("label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=u.includes(_.value)}),Ta())}const m=t.getAll("exclude_label");if(m.length>0){const w=document.getElementById("exclude-label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=m.includes(_.value)}),La())}const g=t.get("groupBy");if(g){const w=document.getElementById("group-by-select");w&&(w.value=g)}const v=t.get("sort");if(v){const w=document.getElementById("sort-by-select");w&&(w.value=v)}}function Vu(){const e=nn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=ei(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=Ie(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function Wu(){const e=Tn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Te(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Ta(){var i,s;const e=Ln(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function La(){var i,s;const e=An(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function Ku(){if(!T())return;let e;try{e=await b.getLabels(T().id)}catch(t){console.error("Failed to load labels for filter:",t);return}Yu("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),Yu("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function Yu(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${te(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${p(r.name)}</span>
                </span>
            `,a.appendChild(l)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}function Qu(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function Zu(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const u=d[1],m=document.createElement("a");m.href=`#/issue/${u}`,m.className="issue-link",m.textContent=u,o.appendChild(m),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+d[3],o.appendChild(u),r=d.index+d[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function zr(e){if(!e)return"";const t=mt(e),n=document.createElement("div");return n.innerHTML=t,Qu(n,Zu),n.innerHTML}function Cn(e){if(!e)return"";const t=mt(e),n=document.createElement("div");return n.innerHTML=t,Qu(n,Zu),n.innerHTML}const jb={remove:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'},Xu=(e,t,n)=>`<a href="/issue/${encodeURIComponent(t)}" class="related-link" data-action="navigate-issue" data-issue-id="${f(e)}" data-identifier="${f(t)}"><span class="related-id">${p(t)}</span><span class="related-title">${p(n)}</span></a>`;function Rb(e){return e.relation_type==="blocked_by"||e.relation_type==="blocks"&&e.direction==="incoming"?"Blocked by":e.relation_type==="blocks"?"Blocks":e.relation_type==="duplicates"?e.direction==="incoming"?"Duplicated by":"Duplicates":"Related"}const Ju={"Blocked by":0,"Sub-issue":1,Blocks:2,Duplicates:3,"Duplicated by":3,Related:4};function Pb(e,t=[],n=[],{formatEstimate:i=null}={}){const s=o=>o.estimate==null?"":` · ${p(i?i(o.estimate,o.project_id||e.project_id):`${o.estimate} pts`)}`,a=[...(t||[]).map(o=>({kind:"Sub-issue",html:`
                <li class="related-row">
                    <span class="related-status">${Ke(o.status)}</span>
                    ${Xu(o.id,o.identifier,o.title)}
                    <span class="related-kind">Sub-issue${s(o)}</span>
                </li>`})),...(n||[]).map(o=>{const r=Rb(o);return{kind:r,html:`
                <li class="related-row">
                    <span class="related-status">${Ke(o.related_issue_status)}</span>
                    ${Xu(o.related_issue_id,o.related_issue_identifier,o.related_issue_title)}
                    <span class="related-kind${r==="Blocked by"?" blocked":""}">${r}</span>
                    <button type="button" class="related-remove" data-action="remove-relation" data-issue-id="${f(e.id)}" data-relation-id="${f(o.id)}" title="Remove link" aria-label="Remove link to ${f(o.related_issue_identifier)}">${jb.remove}</button>
                </li>`}})].sort((o,r)=>Ju[o.kind]-Ju[r.kind]);return`
        <section class="related-work" aria-label="Related work">
            <div class="related-head">
                <h3>Related work</h3>
                <details class="related-add">
                    <summary class="ticket-gate-text-btn">+ Add</summary>
                    <div class="related-add-menu">
                        <button type="button" data-action="show-create-sub-issue-modal" data-issue-id="${f(e.id)}" data-project-id="${f(e.project_id)}">Sub-issue</button>
                        <button type="button" data-action="show-add-relation-modal" data-issue-id="${f(e.id)}">Link an issue</button>
                    </div>
                </details>
            </div>
            ${a.length?`<ul class="related-list">${a.map(o=>o.html).join("")}</ul>`:""}
        </section>`}const qb=e=>e&&e.is_agent?` title="${f(e.owner_name?`AI agent of ${e.owner_name}`:"AI agent")}"`:"";function Nb(e){return`
        <li class="comment timeline-comment">
            <div class="comment-avatar">${p((e.author_name||"U").charAt(0).toUpperCase())}</div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-author"${qb(e.author)}>${p(e.author_name||"User")}</span>
                    <span class="comment-date">${p(ot(e.created_at))}</span>
                </div>
                <div class="comment-content markdown-body">${zr(e.content).trim()}</div>
            </div>
        </li>`}const ep=(e,t,n=!1)=>`<details class="timeline-note"${n?" open":""}><summary>${e}</summary><div class="markdown-body comment-content">${zr(t).trim()}</div></details>`;function Ob(e,{formatText:t,formatActor:n,gateShowsIt:i,awaitingReview:s}){let a,o="",r="";return e.activity_type==="ritual_attested"?(a=`Attested <b>${p(e.field_name||"a ritual")}</b>`,i?o=' · <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">waiting for review ↑</button>':(s&&(o=" · waiting for review"),e.new_value&&(r=ep("Note",e.new_value)))):e.activity_type==="ritual_rejected"?(a=`Sent back <b>${p(e.field_name||"a ritual")}</b>`,e.new_value&&(r=ep("Reason",e.new_value,!0))):a=t(e),`
        <li class="timeline-event${e.activity_type==="ritual_rejected"?" sent-back":""}">
            <span class="timeline-dot" aria-hidden="true"></span>
            <div class="timeline-event-body">
                <span class="timeline-text">${a}</span>${o}
                <span class="timeline-meta">· ${p(n(e))} · ${p(ot(e.created_at))}</span>
                ${r}
            </div>
        </li>`}function Hb(e,t){const n=new Set((e||[]).filter(s=>s.activity_type==="ritual_attested").map(s=>s.field_name));return[...t&&t.pending_rituals||[],...t&&t.completed_rituals||[]].filter(s=>s.attestation&&!n.has(s.name)).map(s=>({activity_type:"ritual_attested",field_name:s.name,new_value:s.attestation.note||null,user_name:s.attestation.attested_by_name||null,user:s.attestation.attester||null,created_at:s.attestation.attested_at}))}function Fb({comments:e=[],activities:t=[],ritualStatus:n=null,gateRitualName:i=null,activitiesTruncated:s=!1,commentsLoadFailed:a=!1,issueId:o},r){const l=new Set((n&&n.pending_rituals||[]).filter(g=>g.attestation&&!g.attestation.approved_at).map(g=>g.name)),c=[...t||[],...Hb(t,n)],d=new Map;for(const g of c){if(g.activity_type!=="ritual_attested"||!l.has(g.field_name))continue;const v=d.get(g.field_name);(!v||new Date(g.created_at)>new Date(v.created_at))&&d.set(g.field_name,g)}const u=[...(e||[]).map(g=>({at:g.created_at,html:Nb(g)})),...c.filter(g=>g.activity_type!=="commented").map(g=>{const v=d.get(g.field_name)===g;return{at:g.created_at,html:Ob(g,{...r,awaitingReview:v,gateShowsIt:v&&g.field_name===i})}})].sort((g,v)=>new Date(g.at)-new Date(v.at)),m=(e||[]).length;return`
        <section class="issue-detail-section ticket-timeline" id="comments-section" aria-label="Comments and activity">
            <h3>Activity${m?` <span class="section-count">· ${m} ${m===1?"comment":"comments"}</span>`:""}</h3>
            ${a?`
                <div class="comments-error">
                    Comments failed to load.
                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${f(o)}">Retry</button>
                </div>`:""}
            ${s?'<div class="timeline-truncated">Older activity is not shown.</div>':""}
            ${u.length?`<ol class="timeline comments-list">${u.map(g=>g.html).join("")}</ol>`:a?"":'<div class="comments-empty">No comments yet</div>'}
        </section>`}function tp(e,t,{formatEstimate:n=null}={}){const i=[`${Ke(e.status)}<span>${p(Ie(e.status))}</span>`,p(t||"Unassigned"),p(Te(e.priority)),p(rt(e.issue_type))];return e.estimate!=null&&i.push(p(n?n(e.estimate,e.project_id):`${e.estimate} pts`)),`<div class="issue-meta-line">${i.map(s=>`<span class="issue-meta-part">${s}</span>`).join('<span class="issue-meta-sep" aria-hidden="true">·</span>')}</div>`}const np=Dr,Ub=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let Lt=[],ip=Promise.resolve();const Gb={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};function Aa(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const zb={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function sp(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function ti(){return!!document.querySelector(".inline-dropdown")}function ap(){return Lt}function op(e){Lt=e}async function Vr(e,t,n,i){var u,m,g,v;e.preventDefault(),Ft();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${np.map((y,w)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${f(n)}" data-field="status" data-value="${y}">
                    ${Ke(y)}
                    <span>${Ie(y)}</span>
                    <span class="dropdown-shortcut">${w+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${Mr.map((y,w)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${f(n)}" data-field="priority" data-value="${y}">
                    ${pt(y)}
                    <span>${Te(y)}</span>
                    <span class="dropdown-shortcut">${w}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Ub.map(y=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${f(n)}" data-field="issue_type" data-value="${y}">
                    <span class="issue-type-badge type-${y}">${rt(y)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const y=we(),w=X().find(_=>_.id===n)||Ue().find(_=>_.id===n)||((y==null?void 0:y.id)===n?y:null),S=ss({keepId:(w==null?void 0:w.assignee_id)||null});o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${f(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${S.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:S.map(({assignee:_,indent:D},M)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${f(n)}" data-field="assignee_id" data-value="${f(_.id)}">
                    ${Ut(_,"avatar-small")}
                    <span>${xa(_,D)}</span>
                    ${M<9?`<span class="dropdown-shortcut">${M+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const y=document.querySelector(`.issue-row[data-issue-id="${n}"]`),w=(y==null?void 0:y.dataset.projectId)||((u=we())==null?void 0:u.project_id),S=vi(w);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${S.map((_,D)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${f(n)}" data-field="estimate" data-value="${_.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${_.label}</span>
                    ${D<9?`<span class="dropdown-shortcut">${D}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const y=X(),w=Ue(),S=we(),_=y.find(R=>R.id===n)||w.find(R=>R.id===n)||S,D=new Set(((_==null?void 0:_.labels)||[]).map(R=>R.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const M=o.getBoundingClientRect();let ne=a.bottom+4,E=a.left;E+M.width>window.innerWidth-8&&(E=a.right-M.width),ne+M.height>window.innerHeight-8&&(ne=a.top-M.height-4),o.style.top=`${ne}px`,o.style.left=`${Math.max(8,E)}px`,Zi(o,{multiSelect:!0});let P=[];const U=T();if(U)try{P=await b.getLabels(U.id)}catch(R){console.error("Failed to load labels:",R)}if(!o.parentNode)return;lp(o,n,P,D);const W=o.getBoundingClientRect();let Ee=a.bottom+4,x=a.left;x+W.width>window.innerWidth-8&&(x=a.right-W.width),Ee+W.height>window.innerHeight-8&&(Ee=a.top-W.height-4),o.style.top=`${Ee}px`,o.style.left=`${Math.max(8,x)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const y=X(),w=Ue(),S=we(),_=y.find(C=>C.id===n)||w.find(C=>C.id===n)||S,D=(_==null?void 0:_.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const M=o.getBoundingClientRect();let ne=a.bottom+4,E=a.left;E+M.width>window.innerWidth-8&&(E=a.right-M.width),ne+M.height>window.innerHeight-8&&(ne=a.top-M.height-4),o.style.top=`${ne}px`,o.style.left=`${Math.max(8,E)}px`,Zi(o);let P=[];if(D)try{P=await b.getSprints(D),Z$(D,P)}catch(C){console.error("Failed to load sprints:",C)}if(!o.parentNode)return;const U=P.filter(C=>C.status!=="completed"||C.id===(_==null?void 0:_.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${f(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${U.map((C,Q)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${f(n)}" data-field="sprint_id" data-value="${f(C.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${p(C.name)}${C.status==="active"?" (Active)":""}</span>
                    ${Q<9?`<span class="dropdown-shortcut">${Q+1}</span>`:""}
                </button>
            `).join("")}
        `;const W=o.getBoundingClientRect();let Ee=a.bottom+4,x=a.left;x+W.width>window.innerWidth-8&&(x=a.right-W.width),Ee+W.height>window.innerHeight-8&&(Ee=a.top-W.height-4),o.style.top=`${Ee}px`,o.style.left=`${Math.max(8,x)}px`,o.classList.remove("dropdown-positioning");const R=C=>{const Q=C.key;if(Q==="Escape"||Q==="Tab"){Ft(),document.removeEventListener("keydown",R),Qi(null);return}if(sp(C,o))return;const _e=parseInt(Q);if(isNaN(_e))return;const ce=o.querySelectorAll(".dropdown-option");let ht=!1;_e===0?(ni(n,"sprint_id",null),ht=!0):_e>=1&&_e<ce.length&&(ce[_e].click(),ht=!0),ht&&(document.removeEventListener("keydown",R),Qi(null))};Qi(R),document.addEventListener("keydown",R),(g=o.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let l=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),l+r.height>window.innerHeight-8&&(l=a.top-r.height-4),o.style.top=`${l}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const d=y=>{const w=y.key;if(w==="Escape"||w==="Tab"){Ft(),document.removeEventListener("keydown",d);return}if(sp(y,o))return;const S=parseInt(w);if(isNaN(S))return;let _=!1;if(t==="status"&&S>=1&&S<=6)ni(n,"status",np[S-1]),_=!0;else if(t==="priority"&&S>=0&&S<=4)ni(n,"priority",Mr[S]),_=!0;else if(t==="estimate"){const D=we(),M=vi(D==null?void 0:D.project_id);S>=0&&S<M.length&&(ni(n,"estimate",M[S].value),_=!0)}_&&(document.removeEventListener("keydown",d),Qi(null))};Qi(d),document.addEventListener("keydown",d),(v=o.querySelector(".dropdown-option[data-action]"))==null||v.focus(),Zi(o)}function Vb(e,t,n,i){Vr(e,t,n,i)}function Wb(e,t,n){ip=ip.then(()=>rp(e,t,n))}async function rp(e,t,n){const i=X(),s=Ue(),a=we(),o=i.find(d=>d.id===e)||s.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const d=await b.updateIssue(e,{label_ids:c}),u=d.labels||[],m=_=>({..._,labels:u,updated_at:d.updated_at??_.updated_at}),g=X();g.some(_=>_.id===e)&&Ze(g.map(_=>_.id===e?m(_):_));const v=Ue();v.some(_=>_.id===e)&&In(v.map(_=>_.id===e?m(_):_));const y=we();(y==null?void 0:y.id)===e&&Qn(m(y));const w=Aa(e);if(w&&w.parentNode){const _=X().find(D=>D.id===e)||Ue().find(D=>D.id===e);_&&(w.outerHTML=ri(_))}const S=document.querySelector(".property-labels-btn");S&&(S.innerHTML=u.length>0?u.map(_=>`
                    <span class="issue-label" style="background: ${te(_.color)}20; color: ${te(_.color)}">${p(_.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(k("update labels",d),n){const u=l>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function lp(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${f(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${f(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${f(t)}" data-label-id="${f(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${te(s.color)}20; color: ${te(s.color)}">${p(s.name)}</span>
                </button>
            `}).join("")}
    `}async function cp(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=T();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await b.createLabel(i.id,{name:s}),o=await b.getLabels(i.id);es(o),a!=null&&a.id&&await rp(e,a.id,null);const r=X(),l=Ue(),c=we(),d=r.find(m=>m.id===e)||l.find(m=>m.id===e)||c,u=new Set(((d==null?void 0:d.labels)||[]).map(m=>m.id));t&&lp(t,e,o,u),n.value=""}catch(a){k("create label",a)}finally{n.disabled=!1,n.focus()}}}function Ca(){const e=document.getElementById("create-issue-labels-label");e&&(Lt.length===0?e.textContent="Labels":e.textContent=`Labels (${Lt.length})`)}function Wr(e,{failed:t=!1}={}){const n=Lr();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=Lt.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${f(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${te(i.color)}20; color: ${te(i.color)}">${p(i.name)}</span>
                </button>
            `}).join("")}
    `}function Kb(e){const t=Lt.indexOf(e);t>=0?Lt.splice(t,1):Lt.push(e),xr(),Ca();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Wr(n)}async function dp(){const e=T();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await b.createLabel(e.id,{name:i}),a=await b.getLabels(e.id);es(a),s!=null&&s.id&&!Lt.includes(s.id)&&(Lt.push(s.id),xr()),Ca(),t&&Wr(t),n.value=""}catch(s){k("create label",s)}finally{n.disabled=!1,n.focus()}}}async function ni(e,t,n){var r;Ft();const i=Xb(e,t,n),s=ty(e,t),a=(r=jr(e))==null?void 0:r[t],o=pp(e,t,()=>n);o&&Kr(e,t,{focus:!0});try{const l={};l[t]=n;const c=await b.updateIssue(e,l);if(!c||!c.id)throw new Error("Invalid response from server");if(rs(c),up(e,t,i)){const d={...c,...ey(e,t)};ny(e,{issue:d,myIssue:d,detail:d}),Ea(d),Kr(e,t,{focus:!o})}}catch(l){if(k("update issue",l),up(e,t,i)){pp(e,t,(d,u)=>d[t]===n?s[u]:d[t]);const c=jr(e);c&&c[t]===n&&Ea({...c,[t]:a}),Kr(e,t,{focus:!1})}return}finally{Jb(e,t,i)}if($("Issue updated","success"),t==="status")try{const l=K();if(l){const d=(await b.getSprints(l)).find(u=>u.status==="active");Yr(d||null)}}catch{}}const Yb=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),sn=new Map;function Qb(e){const t=e&&sn.get(e.id);if(!(t!=null&&t.size))return e;const n={...e};return t.forEach((i,s)=>{n[s]=i.value}),n}let Zb=0;function Xb(e,t,n){const i=++Zb;return sn.has(e)||sn.set(e,new Map),sn.get(e).set(t,{seq:i,value:n}),i}function up(e,t,n){var i,s;return((s=(i=sn.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function Jb(e,t,n){var s;const i=sn.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&sn.delete(e))}function ey(e,t){var i;const n={};return(i=sn.get(e))==null||i.forEach((s,a)=>{a!==t&&(n[a]=s.value)}),n}function ty(e,t){var i,s;const n=we();return{issue:(i=X().find(a=>a.id===e))==null?void 0:i[t],myIssue:(s=Ue().find(a=>a.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0}}function pp(e,t,n){const i=(l,c)=>({...l,[t]:n(l,c)});let s=!1;const a=X();a.some(l=>l.id===e)&&(s=!0,Ze(a.map(l=>l.id===e?i(l,"issue"):l)));const o=Ue();o.some(l=>l.id===e)&&(s=!0,In(o.map(l=>l.id===e?i(l,"myIssue"):l)));const r=we();return(r==null?void 0:r.id)===e&&(s=!0,Qn(i(r,"detail"))),s}function ny(e,t){var s;const n=X();t.issue&&n.some(a=>a.id===e)&&Ze(n.map(a=>a.id===e?t.issue:a));const i=Ue();t.myIssue&&i.some(a=>a.id===e)&&In(i.map(a=>a.id===e?t.myIssue:a)),t.detail&&((s=we())==null?void 0:s.id)===e&&Qn(t.detail)}function iy(e){return e==="estimate"||Gb[Sa()]===e}function sy(e,t,n,{focus:i}){var d;const s=Aa(e);if(!s||!s.parentNode||!n)return;const a=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&iy(t)&&X().some(u=>u.id===e))ut();else if(t==="status"&&s.closest("#my-issues-list"))Sn();else{const u=s.classList.contains("keyboard-selected");s.outerHTML=ri(n),u&&((d=Aa(e))==null||d.classList.add("keyboard-selected"))}if(!i&&!a)return;const r=Aa(e),l=zb[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus({preventScroll:!0})}function Kr(e,t,{focus:n}){const i=X().find(a=>a.id===e)||Ue().find(a=>a.id===e);i&&Ea(i),sy(e,t,i,{focus:n});const s=we();(s==null?void 0:s.id)===e&&Yb.has(t)&&ay(t,s)}function ay(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".issue-meta-line");if(i){const c=t.assignee_id?yt(t.assignee_id):null;i.outerHTML=tp(t,c?dt(c):null,{formatEstimate:un})}const s=n.querySelector(".detail-sidebar");if(!s)return;let a=e;e==="assignee_id"&&(a="assignee"),e==="sprint_id"&&(a="sprint"),e==="issue_type"&&(a="type");const o=s.querySelectorAll(".property-row");let r=null;for(const c of o){const d=c.querySelector(".property-label");if(d&&d.textContent.toLowerCase()===a.toLowerCase()){r=c;break}}if(!r)return;const l=r.querySelector(".property-value");if(l){if(e==="status")l.innerHTML=`
            ${Ke(t.status)}
            <span>${Ie(t.status)}</span>
        `;else if(e==="priority")l.innerHTML=`
            ${pt(t.priority)}
            <span>${Te(t.priority)}</span>
        `;else if(e==="issue_type")l.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${rt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?yt(t.assignee_id):null,d=c?dt(c):null;l.innerHTML=d?`${Ut(c,"avatar-small")}<span>${p(d)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=Kv(),d=t.sprint_id&&c?c.find(u=>u.id===t.sprint_id):null;l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${d?p(d.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${un(t.estimate,t.project_id)}</span>
        `);l.classList.add("updated"),setTimeout(()=>l.classList.remove("updated"),500),l==null||l.focus()}}ie({"update-issue-field":(e,t)=>{e.type==="keydown"&&e.preventDefault();const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?ni(t.issueId,i,n==="null"?null:Number(n)):ni(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{e.type==="keydown"&&e.preventDefault(),Wb(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{cp(t.issueId)},"toggle-create-issue-label":(e,t)=>{Kb(t.labelId)},"create-label-for-create-issue":()=>{dp()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),cp(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),dp())}});function Ba(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",mp)},0))}function mp(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",mp))}function oy(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",ii)):(e.classList.remove("hidden"),e.classList.remove("show-options"),Me(),Ge(mu()),setTimeout(()=>{document.addEventListener("click",ii)},0))}function ry(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",ii)):(e.classList.remove("hidden"),vy(),setTimeout(()=>{document.addEventListener("click",ii)},0))}function ii(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",ii))}function Bn(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",ii)}function Me(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=K();e.innerHTML=Fu.map(n=>{const i=Gu(n.key),s=mu()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${f(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function Ge(e){qv(e),Me();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":cy(t);break;case"status":dy(t);break;case"priority":uy(t);break;case"type":py(t);break;case"assignee":my(t);break;case"sprint":fy(t);break;case"labels":gy(t);break;case"exclude_labels":hy(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function ly(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),Me()}function cy(e){const t=K()||"",n=J()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${t?'<button class="filter-options-clear" data-action="set-project-filter" data-value="">Clear</button>':""}
        </div>
        <label class="filter-option" data-action="set-project-filter" data-value="">
            <input type="radio" name="project-filter-radio" value="" ${t?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;n.forEach(s=>{i+=`
            <label class="filter-option" data-action="set-project-filter" data-value="${f(s.id)}">
                <input type="radio" name="project-filter-radio" value="${f(s.id)}" ${t===s.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${te(s.color)};"></span>
                <span class="filter-option-label">${p(s.name)}</span>
            </label>
        `}),e.innerHTML=i}function dy(e){const t=nn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=ei(t);let s=`
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
                <input type="checkbox" value="${a.value}" ${t.includes(a.value)?"checked":""} data-action="toggle-status-option" data-filter-value="${f(a.value)}">
                <span class="filter-option-icon">${a.icon}</span>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function uy(e){const t=Tn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Priority</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-priority-filter-new">Clear</button>':""}
        </div>
    `;n.forEach(s=>{i+=`
            <label class="filter-option">
                <input type="checkbox" value="${s.value}" ${t.includes(s.value)?"checked":""} data-action="toggle-priority-option" data-filter-value="${f(s.value)}">
                <span class="filter-option-icon">${s.icon}</span>
                <span class="filter-option-label">${s.label}</span>
            </label>
        `}),e.innerHTML=i}function py(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${f(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function my(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"";let i=`
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
    `;ss({keepId:n||null}).forEach(({assignee:s,indent:a})=>{i+=`
            <label class="filter-option" data-action="set-assignee-filter" data-value="${f(s.id)}">
                <input type="radio" name="assignee-filter-radio" value="${f(s.id)}" ${n===s.id?"checked":""}>
                <span class="filter-option-label">${xa(s,a)}</span>
            </label>
        `}),e.innerHTML=i}function fy(e){if(!K()){e.innerHTML=`
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
            <label class="filter-option" data-action="set-sprint-filter" data-value="${f(o.value)}">
                <input type="radio" name="sprint-filter-radio" value="${f(o.value)}" ${i===o.value?"checked":""}>
                <span class="filter-option-label">${p(o.text)}</span>
            </label>
        `}),e.innerHTML=a}function gy(e){const t=Ln(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${f(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${f(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${te(d)};"></span>
                    <span class="filter-option-label">${p(c)}</span>
                </label>
            `}),e.innerHTML=s}function hy(e){const t=An(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${f(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${f(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${te(d)};"></span>
                    <span class="filter-option-label">${p(c)}</span>
                </label>
            `}),e.innerHTML=s}function vy(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(l=>`
                <div class="display-option ${i===l.value?"active":""}" data-action="set-sort" data-value="${f(l.value)}">
                    <span>${l.label}</span>
                    ${i===l.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(l=>`
                <div class="display-option ${s===l.value?"active":""}" data-action="set-group-by" data-value="${f(l.value)}">
                    <span>${l.label}</span>
                    ${s===l.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function ze(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=K();if(n){const m=(J()||[]).find(g=>g.id===n);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearAction:"clear-project-filter"})}const i=nn();if(i.length>0){const u=ei(i),m=u==="open"?"Open":u==="closed"?"Closed":i.map(g=>Ie(g)).join(", ");t.push({category:"status",label:"Status",value:m,clearAction:"clear-status-filter-new"})}const s=Tn();if(s.length>0){const u=s.map(m=>Te(m)).join(", ");t.push({category:"priority",label:"Priority",value:u,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const u=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:u?u.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let u;o.value==="me"?u="Me":o.value==="unassigned"?u="Unassigned":u=dt(yt(o.value))||"Unknown",t.push({category:"assignee",label:"Assignee",value:u,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const u=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(u==null?void 0:u.text)||r.value,clearAction:"clear-sprint-filter"})}const l=Ln();if(l.length>0){const u=document.getElementById("label-filter-dropdown"),m=l.map(g=>{var w;const v=u==null?void 0:u.querySelector(`input[value="${g}"]`),y=(w=v==null?void 0:v.closest("label"))==null?void 0:w.querySelector(".label-name");return(y==null?void 0:y.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearAction:"clear-label-filter-new"})}const c=An();if(c.length>0){const u=document.getElementById("exclude-label-filter-dropdown"),m=c.map(g=>{var w;const v=u==null?void 0:u.querySelector(`input[value="${g}"]`),y=(w=v==null?void 0:v.closest("label"))==null?void 0:w.querySelector(".label-name");return(y==null?void 0:y.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:m,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(u=>`
        <span class="filter-chip" title="${f(u.label)}: ${f(u.value)}">
            <span class="filter-chip-label">${u.label}:</span>
            <span class="filter-chip-value">${p(u.value)}</span>
            <button class="filter-chip-remove" data-action="${u.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=d}function Ve(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Gr();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function fp(){const e=document.getElementById("sprint-filter");if(!e)return;const t=K(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",Yr(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await b.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${p(a.name)})</option>`),gm(t,a==null?void 0:a.id),Yr(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${p(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function Yr(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${p(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${p(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function by(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let gp=!1;lt(e=>{if(e!=="currentProject"||A()!=="issues"||gp)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([fp(),Ku()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),Ta(),La(),it(),ze(),Ve()}).catch(n=>{console.error("Failed to update filters on project switch:",n),it(),ze(),Ve()})});function yy(){Mb(e=>{gp=e})}function Da(){Vu(),it(),ze(),Ve()}function Ma(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Da()}function Qr(){Wu(),it(),ze(),Ve()}function Zr(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Qr()}function Xr(){Ta(),it(),ze(),Ve()}function ja(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Xr()}function Jr(){La(),it(),ze(),Ve()}function Ra(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Jr()}function wy(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function hp(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${wy(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let ls=0;function cs(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function vp(){var t,n,i,s,a,o;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=T())==null?void 0:t.id)||"",project:K()||"",status:[...nn()].sort(),priority:[...Tn()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim())||""})}let an=null;function $y(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function si(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function bp(e,t){si(!1),_a(e),Ze(t),A()==="issues"&&St(t),ut(),an=e,cs(Jv(e).hiddenClosed||0)}function ky(e,t,{loading:n}){_a(null),Ze(t),A()==="issues"&&St(t),ut(),si(n),an=e,cs(0)}function yp(){_a(null),an=null,si(!1),by(),cs(0)}function Ey(){const e=document.getElementById("issues-list");cs(0),e!=null&&e.querySelector(".issue-row")?si(!0):yp()}function _y(){const e=ab(vp()),t=e?xu(e):null;return t?(_n(-1),bp(e,t),!0):(yp(),!1)}function xy(e,t,n,i=()=>!0){if(!Array.isArray(t))return t;const s=new Map(e.map(c=>[c.id,c])),a=new Set(t.map(c=>c.id)),o=new Set(t.filter(c=>!n.has(c.id)).map(c=>c.title)),r=e.filter(c=>!n.has(c.id)&&!a.has(c.id)&&!(c._isOptimistic&&o.has(c.title))&&(c._isOptimistic||i(c))),l=[];for(const c of t){const d=s.get(c.id);if(!d&&n.has(c.id))continue;const u=d&&Iu(d.updated_at,c.updated_at)?d:c;l.push(Qb(u))}return r.length?[...r,...l]:l}async function At(){var w,S,_,D,M,ne,E;_n(-1),$y();const e=++ls;if(!T())return;const t=K()||"",n=nn(),i=Tn(),s=(w=document.getElementById("assignee-filter"))==null?void 0:w.value,a=(_=(S=document.getElementById("issue-search"))==null?void 0:S.value)==null?void 0:_.trim();if(!t&&J().length===0){an=null,document.getElementById("issues-list").innerHTML=F({icon:N.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const o=vp(),r={limit:1e3},l=((D=document.getElementById("sort-by-select"))==null?void 0:D.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(M=fe())==null?void 0:M.id:r.assignee_id=s);const u=(ne=document.getElementById("sprint-filter"))==null?void 0:ne.value;if(u)if(u==="current"){if(t){const P=X$(t);if(P!==void 0)P&&(r.sprint_id=P);else try{const W=(await b.getSprints(t)).find(Ee=>Ee.status==="active");gm(t,W==null?void 0:W.id),W&&(r.sprint_id=W.id)}catch(U){console.error("Failed to resolve current sprint:",U)}}}else r.sprint_id=u;const m=(E=document.getElementById("issue-type-filter"))==null?void 0:E.value;m&&(r.issue_type=m),a&&a.length>=1?r.search=a:r.fields="list";let g=!1,v=!1,y=null;try{const P=hp(Ln(),"label-filter-dropdown");P.length>0&&(r.label=P,r.label_match="any");const U=hp(An(),"exclude-label-filter-dropdown");U.length>0&&(r.exclude_label=U),t&&(r.project_id=t);const W=t||`team:${T().id}`;y=Eu({...r,scope:W});const Ee=xu(y);if(Ee)g=!0,an===y&&sb()===y&&Au(X(),Ee)||bp(y,Ee);else{const ee=ub({...r,scope:W});ee&&(ee.complete||ee.rows.length>0)?(v=!0,ky(y,ee.rows,{loading:!ee.complete})):Ey()}const x=ee=>t?b.getIssues(ee):J().length>0?b.getTeamIssues(T().id,ee):Promise.resolve(void 0),R=r.search&&ei(n)==="open"?x({...r,status:Ur}).then(ee=>Array.isArray(ee)?ee.length:0).catch(ee=>(console.error("Failed to count closed search matches:",ee),0)):Promise.resolve(0),C=new Set(X().map(ee=>ee.id)),Q=await x(r);if(Su(y,Q),e!==ls)return;Tu(o,y);const _e=(g||v)&&an===y,ce=_e?xy(X(),Q,C,Du(r)):Q,ht=_e&&Au(X(),ce);_a(y),Ze(ce),A()==="issues"&&St(Array.isArray(ce)?ce.filter(ee=>!ee._isOptimistic):ce);const L=[...new Set(ce.map(ee=>ee.project_id).filter(Boolean))],de=Object.keys(ro()).length;if(await fm(L),e!==ls)return;const ge=Object.keys(ro()).length!==de;(!ht||ge)&&ut(),an=y,si(!1);const ue=await R;if(tb(y,{hiddenClosed:ue}),e!==ls)return;cs(ue)}catch(P){if(e!==ls)return;si(!1);const U=(P==null?void 0:P.status)===403||(P==null?void 0:P.status)===404;if(g&&!U){k("refresh issues",P);return}U&&y&&nb(y),an=null;const W=document.getElementById("issues-list");W&&(W.innerHTML=F({icon:N.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),k("load issues",P)}}function Iy(){clearTimeout(zv()),Vv(setTimeout(()=>{At()},300))}function it(){zu(),At()}async function wp(){if(zu(),Sa()==="sprint"){const e=X(),t=[...new Set(e.map(n=>n.project_id))];await fm(t)}ut()}function Sy(){ze(),Ve()}function $p(e){ct(e),Me(),Ge("project"),Bn()}function Ty(){$p("")}function Ly(e){const t=e==="open"?ns:e==="closed"?Ur:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),Da(),Me(),Ge("status")}function Ay(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Da()),Me(),Ge("status")}function Cy(){Ma(),Me(),Ge("status"),ze(),Ve()}function By(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Qr()),Me(),Ge("priority")}function Dy(){Zr(),Me(),Ge("priority"),ze(),Ve()}function kp(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,it()),Me(),Ge("type"),ze(),Ve(),Bn()}function My(){kp("")}function Ep(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,it()),Me(),Ge("assignee"),ze(),Ve(),Bn()}function jy(){Ep("")}function _p(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,it()),Me(),Ge("sprint"),ze(),Ve(),Bn()}function Ry(){_p("")}function Py(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Xr()),Me(),Ge("labels")}function qy(){ja(),Me(),Ge("labels"),ze(),Ve()}function Ny(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Jr()),Me(),Ge("exclude_labels")}function Oy(){Ra(),Me(),Ge("exclude_labels"),ze(),Ve()}function Hy(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,At()),Bn()}function Fy(e){const t=document.getElementById("group-by-select");t&&(t.value=e,wp()),Bn()}function Uy(){ct(null),Ma(),Zr();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),ja(),Ra(),it(),ze(),Ve()}ie({"update-label-filter":()=>Xr(),"clear-label-filter":()=>ja(),"update-exclude-label-filter":()=>Jr(),"clear-exclude-label-filter":()=>Ra(),"show-filter-category":(e,t)=>{var n,i;Ge(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{ly();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>$p(t.value),"clear-project-filter":()=>Ty(),"clear-status-filter-new":()=>Cy(),"set-status-preset":(e,t)=>Ly(t.value),"show-all-statuses":()=>Ma(),"toggle-status-option":(e,t)=>Ay(t.filterValue,e),"clear-priority-filter-new":()=>Dy(),"toggle-priority-option":(e,t)=>By(t.filterValue,e),"set-type-filter":(e,t)=>kp(t.value),"clear-type-filter":()=>My(),"set-assignee-filter":(e,t)=>Ep(t.value),"clear-assignee-filter":()=>jy(),"set-sprint-filter":(e,t)=>_p(t.value),"clear-sprint-filter":()=>Ry(),"clear-label-filter-new":()=>qy(),"toggle-label-option":(e,t)=>Py(t.filterValue,e),"clear-exclude-label-filter-new":()=>Oy(),"toggle-exclude-label-option":(e,t)=>Ny(t.filterValue,e),"set-sort":(e,t)=>Hy(t.value),"set-group-by":(e,t)=>Fy(t.value),"clear-all-filters":()=>Uy(),"retry-load-issues":()=>At()});const xp=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function on(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function ai(e){const t=on(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const Gy=60,zy=150;let We=[],ds=1/0,rn=null,Pa=null,us=null;const qa=new Map;let oi=null,Na=[],ps=null;const Ip=e=>{var t;return`${((t=fe())==null?void 0:t.id)??""}|${e}`},Vy=24;function Wy(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(Gy,Math.ceil((e+2*t)/Vy))}function ln(e,t){if(e!==null&&(oi!=null&&oi.has(String(e))))return Na.push({groupKey:e,ids:t.map(i=>i.id)}),"";const n=t.slice(0,Math.max(0,ds));return ds-=n.length,n.length<t.length&&We.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>ri(i)).join("")}function Sp(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function Tp(){clearTimeout(rn),rn=null,tl++,We=[],Pa=null,ps=null,us=null}function el(e=1/0){if(We.length===0)return;const t=document.getElementById("issues-list");if(!t||!(us!=null&&us.isConnected)){Tp();return}const n=new Map(X().map(s=>[s.id,s]));let i=e;for(;We.length>0&&i>0;){const s=We[0],a=s.ids.slice(0,i),o=Sp(t,s.groupKey),r=a.map(l=>n.get(l)).filter(Boolean).map(l=>ri(l)).join("");o==null||o.insertAdjacentHTML("beforeend",r),i-=a.length,a.length===s.ids.length?We.shift():s.ids=s.ids.slice(a.length)}if(ps){const s=ps;Oa(t,s.issueId)&&(ps=null,Dp(t,s))}if(We.length===0){clearTimeout(rn),rn=null;const s=Pa;Pa=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&Lp(s)}}const Ky=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{rn=setTimeout(e,0)}):rn=setTimeout(e,16);let tl=0;function Yy(){if(clearTimeout(rn),We.length===0)return;const e=++tl;Ky(function t(){e===tl&&(el(zy),We.length>0&&(rn=setTimeout(t,0)))})}function ut(){var d,u;const e=document.getElementById("issues-list");if(!e)return;const t=e.querySelector(".issue-row.keyboard-selected"),n=t==null?void 0:t.dataset.issueId,i=aw(e),s=m=>{var g;return((g=m==null?void 0:m.closest(".issue-group"))==null?void 0:g.dataset.group)??null},a=[[n,s(t)],[i==null?void 0:i.issueId,s(i==null?void 0:i.row)]];e.classList.add("issue-list-linear"),Tp(),ds=Wy();const o=X();if(o.length===0){const m=(u=(d=document.getElementById("issue-search"))==null?void 0:d.value)==null?void 0:u.trim(),g=Gr()>0,v=m&&m.length>=2;if(g||v){const y=Gr(),w=[];v&&w.push(`search "${m}"`),g&&w.push(`${y} active filter${y>1?"s":""}`),e.innerHTML=F({icon:N.issues,heading:"No matching issues",description:`No issues match your ${w.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=F({icon:N.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});_n(-1),ds=1/0;return}const r=Sa();oi=qa.get(Ip(r))||null,Na=[],r==="status"?Qy(e,o):r==="priority"?Zy(e,o):r==="type"?Xy(e,o):r==="assignee"?Jy(e,o):r==="sprint"?ew(e,o):e.innerHTML=ai(o)+ln(null,o),ds=1/0,us=e.firstElementChild,We.push(...Na),Na=[];const l=oi;oi=null,l!=null&&l.size&&(e.querySelectorAll(".issue-group").forEach(m=>{l.has(m.dataset.group)&&Cp(m,!0)}),a.forEach(([m,g])=>{m&&sw(m,e,g)})),i&&(Oa(e,i.issueId)?Dp(e,i):We.length>0&&(ps=i));const c=!!n&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),m=>m.dataset.issueId===n);n&&We.length>0&&!c?Pa=n:Lp(n),Yy()}function Lp(e){const t=fu();if(t<0)return;const n=document.querySelectorAll($a);if(n.length===0){_n(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),_n(i),n[i].classList.add("keyboard-selected")}function Qy(e,t){const n={};Dr.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=ai(t);Dr.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ke(s)}</span>
                    <span class="group-title">${Ie(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${on(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${ln(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function Zy(e,t){const n={};wu.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=ai(t);wu.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${pt(s)}</span>
                    <span class="group-title">${Te(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${on(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${ln(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function Xy(e,t){const n={};xp.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=ai(t);xp.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${rt(s)}</span></span>
                    <span class="group-title">${rt(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${on(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${ln(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function Jy(e,t){const n={},i="__unassigned__";n[i]=[];const s=ss({includeIdle:!0});s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=ai(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${on(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${ln(i,n[i])}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=dt(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${f(o.id)}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${f(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ut(o,"avatar-small")}</span>
                    <span class="group-title">${p(l)}${p(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${on(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${ln(o.id,r)}
                </div>
            </div>
        `}),e.innerHTML=a}function ew(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const a={active:0,planned:1,completed:2},o=ro();s.sort((l,c)=>{const d=o[l],u=o[c],m=d?a[d.status]??3:3,g=u?a[u.status]??3:3;return m-g});let r=ai(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=o[l],u=d?d.name:l,m=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${g}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${p(u)}${m}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${on(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${ln(g,c)}
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
                    <span class="group-points">${on(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${ln(n,i[n])}
                </div>
            </div>
        `),e.innerHTML=r}function Ap(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-group"),n=>n.dataset.group===String(t))||null}function Oa(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-row"),n=>n.dataset.issueId===t)||null}function tw(e,t){const n=Sp(e,t);if(!n)return;const i=new Map(X().map(s=>[s.id,s]));We=We.filter(s=>{if(String(s.groupKey)!==String(t))return!0;const a=s.ids.map(o=>i.get(o)).filter(Boolean).map(o=>ri(o)).join("");return n.insertAdjacentHTML("beforeend",a),!1})}function Cp(e,t){var n;e.classList.toggle("collapsed",t),(n=e.querySelector(".issue-group-header"))==null||n.setAttribute("aria-expanded",String(!t))}function nw(e,t){const n=Array.from(document.querySelectorAll($a)),i=e.querySelector(".issue-row.keyboard-selected");if(!i)return;let s=n.indexOf(i);s<0&&(i.classList.remove("keyboard-selected"),s=n.findIndex(a=>t.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING&&!t.contains(a)),s<0&&(s=n.length-1),s>=0&&n[s].classList.add("keyboard-selected")),_n(s)}function Bp(e,t,n){Cp(t,n);const i=Ip(Sa());qa.has(i)||qa.set(i,new Set);const s=qa.get(i);n?s.add(t.dataset.group):(s.delete(t.dataset.group),tw(e,t.dataset.group)),nw(e,t)}function iw(e){const t=document.getElementById("issues-list"),n=t&&Ap(t,e);n&&Bp(t,n,!n.classList.contains("collapsed"))}function sw(e,t=document.getElementById("issues-list"),n=void 0){var a;if(!e||!t)return;const i=We.find(o=>o.ids.includes(e)),s=i?i.groupKey===null?null:Ap(t,i.groupKey):(a=Oa(t,e))==null?void 0:a.closest(".issue-group");s!=null&&s.classList.contains("collapsed")&&(n!==void 0&&s.dataset.group===n||Bp(t,s,!1))}function aw(e){var i;const t=document.activeElement;if(!t||t===e||!e.contains(t))return null;const n=t.closest(".issue-row");return n!=null&&n.dataset.issueId?{issueId:n.dataset.issueId,row:n,dropdownType:((i=t.dataset)==null?void 0:i.dropdownType)||null,isTitle:t.classList.contains("issue-title")}:null}function Dp(e,{issueId:t,dropdownType:n,isTitle:i}){if(e.contains(document.activeElement))return;const s=Oa(e,t);if(!s)return;const a=n?s.querySelector(`[data-dropdown-type="${n}"]`):i?s.querySelector(".issue-title"):s.querySelector("a[href], button");a==null||a.focus({preventScroll:!0})}function Mp(e,t){if(!e)return"";if(!t)return p(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return p(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${p(i)}<mark class="search-match">${p(s)}</mark>${p(a)}`}function ow(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=Mp(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}const rw=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function ri(e){var m,g,v;const t=e.assignee_id?yt(e.assignee_id):null,n=t?dt(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":rw.format(i),a=e.estimate!=null?un(e.estimate,e.project_id):"",o=go(e.estimate,e.project_id),r=e.sprint_id?ro()[e.sprint_id]:null,l=r?r.name:null,c=(g=(m=document.getElementById("issue-search"))==null?void 0:m.value)==null?void 0:g.trim(),d=!!c&&((v=e.title)==null?void 0:v.toLowerCase().includes(c.toLowerCase())),u=c&&!d?ow(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${f(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${f(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${f(e.id)}" title="Priority: ${Te(e.priority)}">
                    ${pt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${f(e.id)}" title="Status: ${Ie(e.status)}">
                    ${Ke(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${rt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${f(e.id)}">${Mp(e.title,c)}${u?` <span class="issue-search-snippet" title="Matched in description">— ${u}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(y=>`
                            <span class="issue-label" style="background: ${te(y.color)}20; color: ${te(y.color)}">${p(y.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${f(e.id)}" title="Sprint: ${l?p(l):"None"}">
                    ${l?`<span class="sprint-badge">${p(l)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${f(e.id)}" title="${o?"Estimate outside current scale":`Estimate: ${a||"None"}`}">
                    ${a?`<span class="estimate-badge${o?" out-of-scale":""}">${a}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${f(e.id)}" title="${f(n||"Unassigned")}">
                    ${n?Ut(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function pt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Ke(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}ie({"toggle-group":(e,t)=>{if((e==null?void 0:e.type)==="keydown"){if(e.repeat)return;e.preventDefault()}iw(t.group)},"show-inline-dropdown":(e,t,n)=>{Vr(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),ae(t.issueId))}});let li=[];function Dn(){return li}function lw(e){li=Array.isArray(e)?e:[]}function cw(e){const t=e==null?void 0:e.avatar_url,n=f((e==null?void 0:e.name)||"Agent");return t?du(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${f(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${p(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function dw(e){var t,n;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{const i=await b.getTeamAgents(e);if(((n=T())==null?void 0:n.id)!==e)return;li=i,is(fn,Dn),Zn()}catch(i){console.error("Failed to load team agents:",i),k("load team agents",i)}}async function Ha(e){var t;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{li=await b.getTeamAgents(e),is(fn,Dn),Zn(),uw()}catch(n){k("load agents",n)}}function uw(){const e=document.getElementById("agents-list");if(e){if(li.length===0){e.innerHTML=F({icon:N.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=li.map(t=>{var l;const n=p(t.name),i=p(t.parent_user_name||"Unknown"),s=t.kind==="session",a=t.can_register?'<span class="agent-scope" title="Registers one identity per session; cannot write as itself">Registrar</span>':s?`<span class="agent-scope" title="Registered by a registrar for one session">Session${t.idle?" · idle":""}</span>`:"",r=!s&&t.is_active!==!1&&(t.parent_user_id===((l=fe())==null?void 0:l.id)||ko())?`<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${f(t.id)}" data-agent-name="${f(t.name||"Agent")}" data-can-register="${t.can_register?"true":"false"}">${t.can_register?"Stop being a registrar":"Make registrar"}</button>`:"";return`
      <div class="agent-item">
        ${cw(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            ${a}
            <span class="agent-date">Created by ${i} ${nt(t.created_at)}</span>
          </div>
        </div>
        ${r}
        <button class="btn btn-secondary" data-action="generate-agent-key" data-agent-id="${f(t.id)}" data-agent-name="${f(t.name||"Agent")}">Generate new key</button>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${f(t.id)}" data-agent-name="${f(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function pw(){const e=J();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),z()}function jp(e,t,n=!1){const i=p(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,z()}async function mw(e){var r,l,c,d;e.preventDefault();const t=(r=T())==null?void 0:r.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value,o=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let u;s&&a?u=await b.createProjectAgent(a,n,i,o):u=await b.createTeamAgent(t,n,i,o),H(),jp("Agent Created",u.api_key,!!u.can_register)}catch(u){k("create agent",u)}return!1}async function fw(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await b.createAgentKey(e);jp("New Agent Key",n.key)}catch(n){k("generate agent key",n)}}async function gw(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await b.updateAgent(e,{can_register:n}),$(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),Ha()}catch(s){k("change registrar",s)}}function hw(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{$("Agent API key copied to clipboard","success")}).catch(()=>{$("Failed to copy","error")})}async function vw(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await b.deleteAgent(e),$("Agent deleted","success"),Ha()}catch(n){k("delete agent",n)}}ie({"create-agent":e=>{mw(e)},"copy-agent-key":()=>{hw()},"dismiss-agent-modal":()=>{H(),Ha()},"delete-agent":(e,t)=>{vw(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{fw(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{gw(t.agentId,t.agentName,t.canRegister!=="true")}});function bw(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function yw(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const a of e){const o=a.user_id||a.id;i.has(o)||(i.add(o),s.push({id:o,name:a.user_name||a.name||a.user_email||a.email||"User",email:a.user_email||a.email||"",handle:bw(a),isAgent:!1}))}for(const a of t)!a.mention_handle||a.is_active===!1||a.idle||i.has(a.id)||n!==void 0&&a.agent_project_id&&a.agent_project_id!==n||(i.add(a.id),s.push({id:a.id,name:a.name||"Agent",email:"",handle:a.mention_handle,isAgent:!0}));return s}function ww(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function nl(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let a=-1;const o=()=>{s.classList.add("hidden"),s.innerHTML="",a=-1},r=d=>{var m,g;const u=s.querySelectorAll(".mention-suggestion");u.length!==0&&(a=(d%u.length+u.length)%u.length,u.forEach((v,y)=>v.classList.toggle("highlighted",y===a)),(g=(m=u[a]).scrollIntoView)==null||g.call(m,{block:"nearest"}))},l=d=>{const u=i.selectionStart||0,m=i.value.slice(0,u).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),g=i.value.slice(u);i.value=m+g,i.focus(),o()},c=()=>{const d=i.selectionStart||0;if(ww(i.value,d)){o();return}const m=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!m){o();return}const g=m[2].toLowerCase(),v=yw(fn(),Dn(),i.mentionContext||{}).filter(y=>!g||y.handle.includes(g)||y.name.toLowerCase().includes(g)||y.email.toLowerCase().includes(g)).slice(0,6);if(!v.length){o();return}s.innerHTML=v.map(y=>`
            <button type="button" class="mention-suggestion" data-handle="${f(y.handle)}">
                <span class="mention-name">${p(y.name)}${y.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${p(y.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((y,w)=>{y.addEventListener("click",()=>l(y.dataset.handle)),y.addEventListener("mouseenter",()=>r(w))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const u=!s.classList.contains("hidden");if(d.key==="Escape"&&u){d.preventDefault(),d.stopPropagation(),o();return}if(u){if(d.key==="ArrowDown")d.preventDefault(),r(a+1);else if(d.key==="ArrowUp")d.preventDefault(),r(a-1);else if(d.key==="Enter"||d.key==="Tab"){const g=s.querySelectorAll(".mention-suggestion")[a];g&&(d.preventDefault(),l(g.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(o,150)})}const ci={check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',ring:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>',link:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'};function di(e){return!!(e&&e.attestation&&!e.attestation.approved_at)}function ms(e){return!!(e&&e.approval_mode==="gate"&&!e.attestation)}function il(e){const t=e&&e.last_rejection;return t&&!t.superseded_at?t:null}function Fa(e){return ms(e)&&!!il(e)}function Ua(e,{canAct:t=!1}={}){const n=e&&e.pending_rituals||[],i=e&&e.completed_rituals||[],s=[],a=[];for(const o of n)((di(o)||ms(o)&&!Fa(o))&&t?s:a).push(o);return{needsYou:s,waiting:a,done:i,total:n.length+i.length}}function sl(e,t,n){return e===1?t:n}function fs(e){return di(e)?"Review":Fa(e)?"Ask again for":ms(e)?"Sign off on":il(e)?"Re-attest":"Attest"}function al(e,t){return di(e)?"an admin":ms(e)&&!Fa(e)?"a person":t||"the assignee"}function $w(e){return e&&e.trigger==="ticket_claim"?"needed to start":"needed to close"}function Rp(e,t){return`<div class="ticket-gate-kicker">Waiting on ${p(e)}<span class="ticket-gate-when"> · ${$w(t)}</span></div>`}function kw(e){const t=e&&e.artifact_ref;if(!t||typeof t!="string")return"";if(/^https?:\/\//i.test(t))return`<a class="ticket-gate-artifact" href="${f(t)}" target="_blank" rel="noopener noreferrer">${ci.link}${p(t.replace(/^https?:\/\//i,""))}</a>`;const n=`/document/${encodeURIComponent(t)}`;return`<a class="ticket-gate-artifact" href="${f(n)}" data-action="open-gate-document" data-document-id="${f(t)}">${ci.link}Linked document</a>`}function Pp(e){const t=e.attestation;return t?`
        <div class="ticket-gate-attestation">
            <div class="ticket-gate-by">${p(t.attested_by_name||"Someone")} attested ${p(ot(t.attested_at))}</div>
            ${t.note?`<div class="ticket-gate-note markdown-body">${mt(t.note)}</div>`:""}
            ${kw(t)}
        </div>`:""}function qp(e){const t=p(e.rejected_by_name||"Someone"),n=e.rejected_at?` ${p(ot(e.rejected_at))}`:"";return`${t} sent it back${n}: “${p(e.note||"")}”`}function Np(e){const t=e&&e.last_rejection;return!t||!t.superseded_at||!di(e)?"":`<div class="ticket-gate-earlier">Sent back before: ${qp(t)}</div>`}const ui=(e,t)=>`data-ritual-id="${f(e.id)}" data-issue-id="${f(t)}" data-ritual-name="${f(e.name)}"`;function Ew(e,t){const n=`<button type="button" class="ticket-gate-text-btn" data-action="reject-ticket-ritual" ${ui(e,t)}>Send back…</button>`;return di(e)?`
            <button type="button" class="btn btn-primary" data-action="approve-ticket-ritual" ${ui(e,t)}>Approve</button>
            ${n}`:`
        <button type="button" class="btn btn-primary" data-action="complete-ticket-ritual" ${ui(e,t)} data-ritual-artifact="${f(e.artifact||"")}">Sign off</button>
        ${n}`}function _w(e,t,n){return Fa(e)?n?`<button type="button" class="ticket-gate-text-btn" data-action="complete-ticket-ritual" ${ui(e,t)} data-ritual-artifact="${f(e.artifact||"")}">Sign off anyway</button>`:"":di(e)||ms(e)?"":e.note_required||e.artifact?`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual-modal" ${ui(e,t)} data-ritual-prompt="${f(e.prompt||"")}" data-ritual-artifact="${f(e.artifact||"")}" data-ritual-note-required="${e.note_required?"1":""}">Attest it yourself…</button>`:`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual" ${ui(e,t)}>Attest it yourself</button>`}function Op(e,t){if(e.length===0)return"";const[n,...i]=e,s=i.length?`, and ${i.length} more`:"";return`<div class="ticket-gate-then">${t}: ${p(fs(n).toLowerCase())} <b>${p(n.name)}</b>${s}.</div>`}function ol(e,t){const{needsYou:n,waiting:i,done:s,total:a}=e,o=(l,c,d,u)=>`<li class="${c}"><span class="ticket-gate-li-ic">${l}</span><span class="ticket-gate-li-name">${p(d)}</span><span class="ticket-gate-li-who">${p(u)}</span></li>`,r=[...s.map(l=>{var c;return o(ci.check,"done",l.name,(c=l.attestation)!=null&&c.attested_by_name?`by ${l.attestation.attested_by_name}`:"done")}),...n.map(l=>o(ci.ring,"you",l.name,"waiting on you")),...i.map(l=>o(ci.ring,"",l.name,`waiting on ${al(l,t)}`))];return`
        <details class="ticket-gate-list">
            <summary>${s.length} of ${a} ${sl(a,"ritual","rituals")} done</summary>
            <ul>${r.join("")}</ul>
        </details>`}function xw(e,{canAct:t=!1}={}){const{needsYou:n,waiting:i}=Ua(e,{canAct:t});return n[0]||i[0]||null}function Iw(e,{canAct:t=!1,assigneeName:n=null}={}){const{needsYou:i,waiting:s,total:a}=Ua(e,{canAct:t});if(a===0)return"";const o=i[0]||s[0];return o?`Waiting on ${i.length?"you":al(o,n)}: ${fs(o).toLowerCase()} ${o.name}.`:`All ${a} ${sl(a,"ritual","rituals")} done.`}function Sw(e,t,{canAct:n=!1,assigneeName:i=null}={}){const s=Ua(e,{canAct:n}),{needsYou:a,waiting:o,total:r}=s;if(r===0)return"";if(a.length===0&&o.length===0)return`
            <section class="ticket-gate clear" aria-label="Rituals" tabindex="-1">
                <span class="ticket-gate-clear-ic">${ci.check}</span>
                ${ol(s,i).replace(/<summary>[^<]*<\/summary>/,`<summary>All ${r} ${sl(r,"ritual","rituals")} done</summary>`)}
            </section>`;if(a.length>0){const u=a[0];return`
            <section class="ticket-gate you" aria-label="Rituals" tabindex="-1" data-ritual-id="${f(u.id)}">
                ${Rp("you",u)}
                <h2 class="ticket-gate-step">${p(fs(u))} <b>${p(u.name)}</b></h2>
                ${u.prompt?`<div class="ticket-gate-asks markdown-body">${mt(u.prompt)}</div>`:""}
                ${Pp(u)}
                ${Np(u)}
                <div class="ticket-gate-actions">${Ew(u,t)}</div>
                ${Op([...a.slice(1),...o],"Then")}
                ${ol(s,i)}
            </section>`}const l=o[0],c=l.attestation?null:il(l),d=_w(l,t,n);return`
        <section class="ticket-gate waiting" aria-label="Rituals" tabindex="-1" data-ritual-id="${f(l.id)}">
            ${Rp(al(l,i),l)}
            <h2 class="ticket-gate-step">${p(fs(l))} <b>${p(l.name)}</b></h2>
            ${c?`<div class="ticket-gate-asks">${qp(c)}</div>`:l.prompt?`<div class="ticket-gate-asks markdown-body">${mt(l.prompt)}</div>`:""}
            ${Pp(l)}
            ${Np(l)}
            ${d?`<div class="ticket-gate-actions">${d}</div>`:""}
            ${Op(o.slice(1),"After that")}
            ${ol(s,i)}
        </section>`}function Tw(e,{canAct:t=!1}={}){const{needsYou:n}=Ua(e,{canAct:t});if(n.length===0)return"";const i=n[0],s=n.length>1?`<span class="ticket-gate-sticky-more"> and ${n.length-1} more</span>`:"";return`
        <span class="ticket-gate-sticky-text">Waiting on you: ${p(fs(i).toLowerCase())} <b>${p(i.name)}</b>${s}</span>
        <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">Go to it ↑</button>`}const Ga=new Map;function rl(){var e;return`${((e=T())==null?void 0:e.id)??""}|${K()??""}`}function pi(e,t,n){Ga.set(e,{key:t,value:n})}function za(e,t){const n=Ga.get(e);return n&&n.key===t?n.value:void 0}function gs(e,...t){for(const n of t)n!==e&&Ga.delete(n)}function ll(){Ga.clear()}function Va(e,t){if(e===t)return!0;try{return JSON.stringify(e)===JSON.stringify(t)}catch{return!1}}lt((e,t,n)=>{e==="currentTeam"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&ll(),e==="currentUser"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&ll()});let Le=null,Hp=!1,Mn=!1,Fp="new-comment";function Lw(){return Le||(Le=document.createElement("div"),Le.className="quote-tooltip",Le.setAttribute("role","button"),Le.setAttribute("tabindex","0"),Le.setAttribute("aria-label","Quote selection in comment"),Le.textContent="Quote",Le.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),Wa())}),Le.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),Le.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Wa()}),document.body.appendChild(Le),Le)}function Up(e,t){const n=Lw();n.style.display="flex",Mn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!Mn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function hs(){Le&&(Le.style.display="none"),Mn=!1}function Aw(){return Mn}function Gp(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function cl(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=Gp(t.startContainer),i=Gp(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function Cw(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function Wa(e=Fp){const t=cl();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=Cw(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),hs(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function Bw(){var i;if(!cl())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return Up(n.left+n.width/2,n.top),!0}function Dw(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!cl()){hs();return}Up(t,n)},10)}function zp({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(Fp=t,i.addEventListener("mouseup",Dw,n?{signal:n}:void 0),Hp||(Hp=!0,document.addEventListener("mousedown",s=>{Mn&&Le&&!Le.contains(s.target)&&hs()}),document.addEventListener("selectionchange",()=>{Mn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&hs()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&Mn&&(s.stopImmediatePropagation(),hs())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&Bw()})))}function Vp(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let cn=[],vs=[],Ka=null,le=new Set,mi="list",jn=!1,dl=null,Ya=null,ul=null,pl=null,Wp=null;function Kp(e){if(Wp!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const ml=wv();(ml==="list"||ml==="grid")&&(mi=ml);function Yp(e){if(e!=="list"&&e!=="grid")return;mi=e,e==="grid"&&jn&&fl(),$v(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Vt()}function Qp(){if(mi!=="list")return;jn=!0,le.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Vt(),gi()}function fl(){jn=!1,le.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Vt(),gi()}function Mw(){dl&&clearTimeout(dl),dl=setTimeout(()=>{Vt()},300)}function jw(){const e=document.getElementById("doc-search");e&&(e.value=""),Vt()}async function Rw(){ct(null)}async function Pw(){const e=document.getElementById("doc-search");e&&(e.value=""),ct(null)}function qw(){var s;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((s=document.getElementById("doc-search"))==null?void 0:s.value)||"",n=K()||"",i=[];if(t&&i.push(`<span class="filter-chip">Search: "${p(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=J().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";i.push(`<span class="filter-chip">Project: ${p(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(i.length>0){let a=i.join(" ");i.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Nw(){return cn}function Vt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";qw(),vs=cn.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),vs.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),zw("",mi)}let fi=0;async function Ow(){var i;const e=Ka||((i=T())==null?void 0:i.id);if(!e)return;const t=++fi,n=K()||null;try{const s=await b.getDocuments(e,n);if(t!==fi)return;pi("documents",`${e}|${n??""}`,s),cn=s,Vt()}catch(s){if(t!==fi)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=F({icon:N.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),k("load documents",s)}}lt(e=>{e==="currentProject"&&A()==="documents"&&Ow()});async function Rn(e,t=null,{fromMemory:n=!1}={}){var r;if(e||(e=(r=T())==null?void 0:r.id),!e)return;Ka=e,gu(-1);const i=++fi;t===null&&(t=K()||null);const s=`${e}|${t??""}`,a=n?za("documents",s):void 0,o=document.getElementById("documents-list");a?(cn=a,Vt()):o&&(o.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join(""));try{const l=await b.getDocuments(e,t);if(i!==fi)return;pi("documents",s,l);const c=a&&Va(cn,l);cn=l;const d=document.getElementById("doc-view-list"),u=document.getElementById("doc-view-grid");d&&u&&(d.classList.toggle("active",mi==="list"),u.classList.toggle("active",mi==="grid")),c||Vt()}catch(l){if(i!==fi)return;const c=document.getElementById("documents-list");c&&(c.innerHTML=F({icon:N.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),k("load documents",l)}}function Zp(){var t,n;if(A()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=Ka||((n=T())==null?void 0:n.id);e&&Rn(e).catch(i=>console.error("Failed to refresh documents list:",i))}function Xp(e){Kp(e)&&Ae(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function Hw(e,t){Kp(e)&&($(`Document "${t||"Untitled"}" was deleted`,"warning"),q("documents"))}function Fw(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${te(t.color)}20; color: ${te(t.color)}">${p(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function Uw(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Fw(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${f(e.id)}" data-action="view-document" data-document-id="${f(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${p(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${p(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?p(Vp(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${p(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Gw(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${te(r.color)}20; color: ${te(r.color)}">${p(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?Vp(e.content).substring(0,80):"No content",s=jn?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${f(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${le.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${jn&&le.has(e.id)?" selected":""}" data-action="${jn?"toggle-doc-selection":"view-document"}" data-document-id="${f(e.id)}" data-doc-id="${f(e.id)}">
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
  `}function zw(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;le.clear(),gi();const i=vs;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,u=K(),m=d||u;n.innerHTML=F({icon:m?N.search:N.documents,heading:m?"No documents match your filters":"No documents yet",description:m?"Try different search terms or filters":"Create your first document to get started",...!m&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?Uw:Gw,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=J();i.forEach(d=>{let u,m;if(e==="project")if(u=d.project_id||"__global__",u==="__global__")m="Global (Team-wide)";else{const g=r.find(v=>v.id===d.project_id);m=g?g.name:"Unknown Project"}else e==="sprint"&&(u=d.sprint_id||"__no_sprint__",m=d.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:m,docs:[]}),o[u].docs.push(d)});let l="";for(const[d,u]of Object.entries(o)){const m=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${p(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${m}">
          ${u.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function Vw(e){le.has(e)?le.delete(e):le.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=le.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",le.has(e)),gi()}function Ww(){vs.forEach(e=>le.add(e.id)),vs.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),gi()}function Jp(){le.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),le.clear(),gi()}function gi(){const e=document.getElementById("doc-bulk-actions");e&&(jn?(e.classList.remove("hidden"),le.size>0?e.innerHTML=`
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
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function Kw(){if(le.size===0){$("No documents selected","error");return}const t=J().map(n=>`<option value="${n.id}">${p(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${le.size} Document${le.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
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
  `,z()}async function Yw(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(le);let i=0;const s=[];for(const l of n)try{await b.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((o=cn.find(d=>d.id===l))==null?void 0:o.title)||l)}H(),Jp(),s.length===0?$(`Moved ${i} document${i>1?"s":""}!`,"success"):$(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=T())==null?void 0:r.id;return await Rn(a),!1}async function Qw(){var a,o;if(le.size===0){$("No documents selected","error");return}const e=le.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(le);let n=0;const i=[];for(const r of t)try{await b.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((a=cn.find(c=>c.id===r))==null?void 0:a.title)||r)}fl(),i.length===0?$(`Deleted ${n} document${n>1?"s":""}!`,"success"):$(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=T())==null?void 0:o.id;await Rn(s)}async function Zw(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await b.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${f(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${p(s.author_name||"Unknown")}</span>
                ${va(s.author)}
                <span class="comment-date">${ot(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${zr(s.content)}</div>
            </div>
          </div>
        `}).join("")}</div>
        <form class="comment-form comment-form-sticky" data-action="add-document-comment" data-document-id="${f(e.id)}">
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
          <button type="button" class="btn btn-secondary btn-sm" data-action="retry-document-comments" data-document-id="${f(e.id)}">Retry</button>
        </div>
      </div>
    `}}function Xw(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=tu(e);s&&(i.value=s),i.addEventListener("input",()=>{ga(e,i.value)},{signal:t}),i.addEventListener("keydown",a=>{var o;a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),(o=i.closest("form"))==null||o.requestSubmit())},{signal:t}),nl("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function Ae(e,t=!0){try{t&&pn();const n=await b.getDocument(e);Wp=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(E=>E.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await Zw(n);let a=null,o=null,r=!1;if(n.project_id){const P=J().find(U=>U.id===n.project_id);if(a=P?P.name:null,n.sprint_id)try{const U=await b.getSprint(n.sprint_id);o=U?U.name:null}catch(U){console.error("Failed to load sprint name:",U),r=!0}}let l=n.content||"";const c=Y.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=Nw(),u=d.findIndex(E=>E.id===n.id),m=u>0?d[u-1]:null,g=u>=0&&u<d.length-1?d[u+1]:null,v=u>=0,y=A()||"documents",w=n.labels&&n.labels.length>0?n.labels.map(E=>`
          <span class="issue-label" style="background: ${te(E.color)}20; color: ${te(E.color)}">
            ${p(E.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${f(n.id)}" data-label-id="${f(E.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let S='<span class="text-muted">None</span>';try{const E=await b.getDocumentIssues(n.id);E.length>0&&(S=E.map(P=>`
          <div class="linked-item">
            <span class="linked-item-id">${p(P.identifier)}</span>
            <span class="linked-item-title">${p(P.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${f(n.id)}" data-issue-id="${f(P.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(E){console.error("Failed to load linked issues:",E),S=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${f(y)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${v?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${m?`data-action="view-document" data-document-id="${f(m.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${u+1} / ${d.length}</span>
              <button class="issue-nav-btn" ${g?`data-action="view-document" data-document-id="${f(g.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?p(a)+" ›":""} ${p(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?p(n.icon)+" ":""}${p(n.title)}</h1>

          <div class="document-content markdown-body">${l?Cn(l):'<p class="text-muted">No content</p>'}</div>

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
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${f(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${p(n.author_name||"Unknown")} ${va(n.author)}</span>
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
            <button class="btn btn-secondary btn-small sidebar-link-btn" data-action="show-link-issue-modal" data-document-id="${f(n.id)}">+ Link Issue</button>
          </div>

          <div class="sidebar-section sidebar-actions">
            <div class="sidebar-overflow-menu">
              <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
              </button>
              <div class="overflow-menu-dropdown hidden">
                <button class="overflow-menu-item" data-action="show-edit-document-modal" data-document-id="${f(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit document
                </button>
                <button class="overflow-menu-item" data-action="show-document-revisions" data-document-id="${f(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  View history
                </button>
                <button class="overflow-menu-item overflow-menu-danger" data-action="delete-document" data-document-id="${f(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  Delete document
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    `,Ya&&Ya.abort(),Ya=new AbortController;const{signal:_}=Ya,D=i.querySelector(".sidebar-overflow-trigger"),M=i.querySelector(".overflow-menu-dropdown");if(D&&M){const E=()=>{M.classList.add("hidden"),D.setAttribute("aria-expanded","false")},P=()=>{const U=M.classList.toggle("hidden");D.setAttribute("aria-expanded",String(!U))};D.addEventListener("click",P,{signal:_}),document.addEventListener("click",U=>{!D.contains(U.target)&&!M.contains(U.target)&&E()},{signal:_}),M.addEventListener("keydown",U=>{U.key==="Escape"&&(E(),D.focus())},{signal:_})}Xw(n.id,_,n.project_id||null),zp({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:_}),ul=m?m.id:null,pl=g?g.id:null;const ne=E=>{if((E.metaKey||E.ctrlKey)&&E.shiftKey&&(E.key===">"||E.key==="."||E.code==="Period")&&Wa("new-doc-comment")){E.preventDefault();return}E.metaKey||E.ctrlKey||E.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||E.target.tagName==="INPUT"||E.target.tagName==="TEXTAREA"||E.target.tagName==="SELECT"||E.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(E.key==="ArrowLeft"&&ul?(E.preventDefault(),Ae(ul)):E.key==="ArrowRight"&&pl&&(E.preventDefault(),Ae(pl)))};document.addEventListener("keydown",ne,{signal:_})}catch(n){k("load document",n)}}async function Qa(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await b.getSprints(t);let o=n;if(i&&!n){const l=a.find(c=>c.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${p(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function gl(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${p(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function Jw(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?Cn(r):'<span class="text-muted">Nothing to preview.</span>'}}function hl(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=au(e);if(o){const l=vv(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){ha(e,null);return}ha(e,l,n)};[i,s,a].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function em(){bs=null;const e=J(),t=Am()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${p(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${gl("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,z(),hl("new"),t&&await Qa("doc-sprint",t,null,!0)}let bs=null;async function e$(e,t,n){bs=n||null;const s=J().map(a=>`<option value="${f(a.id)}" ${a.id===t?"selected":""}>${p(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${gl("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,z(),hl("new"),t&&await Qa("doc-sprint",t,e)}async function t$(e){var a;e.preventDefault();const t=(a=T())==null?void 0:a.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await b.createDocument(t,s),ha("new",null),await Rn(t),H(),$("Document created!","success"),bs){const o=bs;bs=null,o()}}catch(o){k("create document",o)}return!1}let vl=null,ys=null,bl=!1;async function tm(e){try{const t=await b.getDocument(e);vl=e,ys={title:t.title||"",content:t.content||""},bl=!1;const i=J().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${p(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
      <form data-action="update-document" data-document-id="${f(e)}">
        <div class="form-group">
          <label for="edit-doc-title">Title</label>
          <input type="text" id="edit-doc-title" value="${f(t.title)}" required>
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
        ${gl("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${f(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,z(),hl(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await Qa("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){k("load document",t)}}async function n$(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&vl===t&&ys&&!bl){let o=null;try{o=await b.getDocument(t)}catch{}if(o&&((o.title||"")!==ys.title||(o.content||"")!==ys.content))return bl=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await b.updateDocument(t,s),vl=null,ys=null;const o=au(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&ha(t,null),H(),await Ae(t),$("Document updated!","success")}catch(o){k("update document",o)}return!1}async function i$(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await b.deleteDocument(e);const n=(t=T())==null?void 0:t.id;await Rn(n),q("documents"),$("Document deleted!","success")}catch(n){k("delete document",n)}}function s$(e,t){Qa(e,t)}async function a$(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${f(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,z()}async function o$(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=T())==null?void 0:i.id,a=await b.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${f(t)}" data-issue-id="${f(o.id)}">
        <span class="link-result-id">${p(o.identifier)}</span>
        <span class="link-result-title">${p(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function r$(e,t){try{await b.linkDocumentToIssue(e,t),H(),$("Issue linked!","success"),await Ae(e,!1)}catch(n){k("link issue",n)}}async function l$(e,t){if(confirm("Unlink this issue from the document?"))try{await b.unlinkDocumentFromIssue(e,t),$("Issue unlinked!","success"),await Ae(e,!1)}catch(n){k("unlink issue",n)}}let yl=!1;async function c$(e,t){if(e.preventDefault(),yl)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return $("Please enter a comment","error"),!1;yl=!0;try{const s=await b.createDocumentComment(t,i);n.value="",$("Comment added!","success"),Ir(s),await Ae(t,!1)}catch(s){k("add comment",s)}finally{yl=!1}return!1}async function d$(e){var n;const t=(n=T())==null?void 0:n.id;if(!t){$("No team selected","error");return}try{const i=await b.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,z();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${f(e)}" data-label-id="${f(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${te(a.color)}; color: white;">${p(a.name)}</span>
        ${a.description?`<span class="text-muted">${p(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,z()}catch(i){k("load labels",i)}}async function u$(e,t){try{await b.addLabelToDocument(e,t),H(),$("Label added!","success"),await Ae(e,!1)}catch(n){k("add label",n)}}async function p$(e,t){try{await b.removeLabelFromDocument(e,t),$("Label removed!","success"),await Ae(e,!1)}catch(n){k("remove label",n)}}ie({"view-document":(e,t)=>{e.preventDefault(),Ae(t.documentId)},"set-doc-editor-mode":(e,t)=>{Jw(t.target,t.mode)},"retry-load-documents":()=>{Rn(Ka)},"retry-document-comments":(e,t)=>{Ae(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{Vw(t.docId)},"clear-doc-search":()=>{jw()},"clear-doc-project-filter":()=>{Rw()},"clear-all-doc-filters":()=>{Pw()},"show-bulk-move-modal":()=>{Kw()},"bulk-delete-documents":()=>{Qw()},"select-all-docs":()=>{Ww()},"clear-doc-selection":()=>{Jp()},"exit-selection-mode":()=>{fl()},"enter-selection-mode":()=>{Qp()},"handle-bulk-move":e=>{Yw(e)},"unlink-document-issue":(e,t)=>{l$(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{a$(t.documentId)},"add-document-comment":(e,t)=>{c$(e,t.documentId)},"remove-label-from-doc":(e,t)=>{p$(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{d$(t.documentId)},"show-edit-document-modal":(e,t)=>{tm(t.documentId)},"delete-document":(e,t)=>{i$(t.documentId)},"create-document":e=>{t$(e)},"update-doc-sprint-dropdown":(e,t,n)=>{s$(t.sprintSelect,n.value)},"update-document":(e,t)=>{n$(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{o$(n.value,t.documentId)},"link-to-issue":(e,t)=>{r$(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{u$(t.documentId,t.labelId)}});async function nm(e){try{const t=await b.getIssue(e),n=await b.getSprints(t.project_id),s=vi(t.project_id).map(o=>`
            <option value="${o.value===null?"":o.value}" ${t.estimate===o.value?"selected":""}>${p(o.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form data-action="update-issue" data-issue-id="${f(e)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${f(t.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <div id="edit-issue-description-draft-warning" class="description-draft-warning hidden"></div>
                    <textarea id="edit-issue-description">${p(t.description||"")}</textarea>
                </div>
                <div class="form-group">
                    <label for="edit-issue-status">Status</label>
                    <select id="edit-issue-status" data-original="${f(t.status)}">
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
        `,z();const a=document.getElementById("edit-issue-description");if(a){const o=Ki(e);if(o){const r=iu(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?kn(e,r,t.description||""):kn(e,null)})}}catch(t){k("load issue",t)}}async function m$(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(c.status=s.value);const d=await b.updateIssue(t,c);Ki(t)===c.description&&kn(t,null),H(),await ae(t),$("Issue updated!","success"),rs(d)}catch(n){k("update issue",n)}}async function f$(e){if(confirm("Are you sure you want to delete this issue?"))try{await b.deleteIssue(e),await At(),await ft(),q("issues"),$("Issue deleted!","success")}catch(t){k("delete issue",t)}}ie({"update-issue":(e,t)=>{m$(e,t.issueId)}});let wl=!1,$l=!1,Za=null,ws=null,$s=null,Xa=null,kl=!1,Ja=null;function El(e=null){kl=!0,e&&(Ja=e)}function im(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔",ritual_approved:"✅"}[e]||"•"}function _l(e){return e.user_name||e.user_email||"Unknown"}const xl=e=>String(e||"").toLowerCase()==="claim"?"start":"close";function Il(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?f(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${p(Ie(t(e.old_value)))}</strong> to <strong>${p(Ie(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${p(Te(t(e.old_value)))}</strong> to <strong>${p(Te(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${p(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${p(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=p(e.field_name||"ritual"),s=e.new_value?f(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=p(e.field_name||"ritual"),s=e.new_value?f(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"ritual_approved":return`Approved <strong>${p(e.new_value||"a ritual")}</strong>`;case"intent_opened":return`Tried to ${xl(e.new_value)} it; waiting on rituals`;case"intent_cleared":return`No longer waiting on rituals to ${xl(e.new_value)}`;case"intent_canceled":return`Canceled the pending ${xl(e.new_value)}`;case"lease_expired":return"Claim expired; moved back to <strong>Todo</strong>";case"email_delivery_failed":return p(e.new_value||"An email could not be delivered");case"updated":return e.field_name?`Updated ${n[e.field_name]||p(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||p(e.field_name)}`:"Updated issue"}}async function ks(e){const t=()=>{var i;const n=(i=we())==null?void 0:i.id;return!n||n===e};try{const n=await b.getTicketRitualsStatus(e);if(!t())return;Za=n,Al(e)}catch(n){if(console.error("Failed to load ticket rituals:",n),!t())return;Za=null,Al(e)}}function sm(){const e=fe();if(!e||e.is_agent)return!1;const t=fn();if(!t||t.length===0)return!0;const n=t.find(i=>i.user_id===e.id);return!!n&&(n.role==="admin"||n.role==="owner")}let Es=null,Sl=!0;function Tl(){var a;const e=document.getElementById("ticket-gate-sticky");if(!e)return;const n=e.innerHTML.trim()!==""&&!Sl;e.classList.toggle("hidden",!n);const i=document.getElementById("issue-detail-view"),s=n&&((a=e.firstElementChild)==null?void 0:a.offsetHeight)||0;i&&i.style.setProperty("--gate-bar-h",`${s}px`)}function am(){Es&&(Es.disconnect(),Es=null),Sl=!0,Tl()}const g$=()=>typeof CSS>"u"||typeof CSS.supports!="function"||CSS.supports("selector(:has(*))");function h$(){am();const e=document.getElementById("ticket-gate");!e||typeof IntersectionObserver>"u"||!g$()||(Es=new IntersectionObserver(t=>{Sl=t[t.length-1].isIntersecting,Tl()}),Es.observe(e))}function v$(){var n,i;const e=document.getElementById("ticket-gate");if(!e||e.classList.contains("hidden"))return;(n=e.scrollIntoView)==null||n.call(e,{behavior:"smooth",block:"start"});const t=e.querySelector(".ticket-gate-actions .btn-primary");(i=t==null?void 0:t.focus)==null||i.call(t,{preventScroll:!0})}let Ll=null;function Al(e){var g;const t=document.getElementById("ticket-gate"),n=document.getElementById("ticket-gate-sticky"),i=!!t&&t.dataset.issueId===e&&Ll===e,s=document.activeElement,a=!!t&&!!s&&(t.contains(s)||s===document.body),o=Za,r=sm(),l=we(),c=l&&l.id===e?l:null,d=c!=null&&c.assignee_id?yt(c.assignee_id):null,u=d?dt(d):(c==null?void 0:c.assignee_name)||null;if(((v,y)=>{v&&(v.innerHTML=y,v.classList.toggle("hidden",y.trim()===""))})(t,o?Sw(o,e,{canAct:r,assigneeName:u}):""),t&&(t.dataset.issueId=e),Ll=e,n){const v=o?Tw(o,{canAct:r}):"";n.innerHTML=v?`<div class="ticket-gate-sticky-bar">${v}</div>`:"",Tl()}if(i){const v=document.getElementById("ticket-gate-live");if(v&&(v.textContent=o?Iw(o,{canAct:r,assigneeName:u}):""),a&&t&&!t.classList.contains("hidden")){const y=t.querySelector(".ticket-gate-actions .btn-primary")||t.querySelector(".ticket-gate");(g=y==null?void 0:y.focus)==null||g.call(y,{preventScroll:!0})}}}function eo({focus:e=!1}={}){var n;const t=document.querySelector("#issue-detail-view details.related-add[open]");return t?(t.open=!1,e&&((n=t.querySelector("summary"))==null||n.focus()),!0):!1}function b$(e){document.addEventListener("keydown",t=>{t.key==="Escape"&&eo({focus:!0})&&(t.stopPropagation(),t.preventDefault())},{capture:!0,signal:e}),document.addEventListener("click",t=>{var n,i;(i=(n=t.target).closest)!=null&&i.call(n,"details.related-add")||eo()},{signal:e})}async function to(e){try{let t;return e.includes("-")?t=await b.getIssueByIdentifier(e):t=await b.getIssue(e),t?(await ae(t.id,!1),!0):(q("my-issues",!1),!1)}catch{return q("my-issues",!1),!1}}function Cl(e){const t=Ji(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function Bl({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${f(n.id)}" data-identifier="${f(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${f(i.id)}" data-identifier="${f(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function y$(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=we();if(!t)return;const n=Cl(t.id);ws=n.prevIssue?n.prevIssue.id:null,$s=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=Bl(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}lt(e=>{e==="detailNavContext"&&y$()});let _s=0;const om=500;function w$(){_s++}let rm=0,no=!1;function lm(){if(document.querySelector(".description-inline-editor"))return"editor";if(ti())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)")||e!=null&&e.querySelector("details.related-add[open]"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||no?"transient":null}function cm(e){return El(),e==="editor"?"deferred":"retry"}function $$(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=we())==null?void 0:n.id)===e}function k$(e){return X().find(t=>t.id===e)||jr(e)||Ji().find(t=>t.id===e)||null}function E$(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;am(),Ll=null,Qn(e);const i=Cl(e.id);ws=i.prevIssue?i.prevIssue.id:null,$s=i.nextIssue?i.nextIssue.id:null;const s=J().find(r=>r.id===e.project_id),a=e.assignee_id?yt(e.assignee_id):null,o=A()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${f(o)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Bl(i)}
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
                        <div class="property-row"><span class="property-label">Status</span><span class="property-value">${Ke(e.status)}<span>${Ie(e.status)}</span></span></div>
                        <div class="property-row"><span class="property-label">Priority</span><span class="property-value">${pt(e.priority)}<span>${Te(e.priority)}</span></span></div>
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${a?p(dt(a)):"Unassigned"}</span></div>
                    </div>
                </aside>
            </div>`}async function ae(e,t=!0,{refresh:n=!1}={}){var a;const i=n?_s:++_s,s=++rm;if(n){const o=lm();if(o)return cm(o)}try{t&&pn();let o=!1;if(!n){const L=k$(e);L&&(E$(L),t&&(history.pushState({issueId:e,view:A()},"",`/issue/${L.identifier}`),o=!0))}let r=!1;const[l,c,d,u,m,g]=await Promise.all([b.getIssue(e),b.getComments(e).catch(L=>(console.error("Failed to load comments:",L),r=!0,[])),b.getActivities(e,0,om),b.getSubIssues(e),b.getRelations(e),b.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),v=[...c].sort((L,de)=>new Date(L.created_at)-new Date(de.created_at)),y=[l.parent_id?b.getIssue(l.parent_id):Promise.resolve(null),b.getSprints(l.project_id).catch(L=>(console.error("Failed to load sprints:",L),[]))],[w,S]=await Promise.all(y);if(i!==_s)return"dropped";let _=null,D=null;if(n){if(s!==rm||!$$(e))return"dropped";const L=lm();if(L)return cm(L);D=window.scrollY;const de=document.activeElement;de!=null&&de.id&&document.getElementById("issue-detail-view").contains(de)&&(_={id:de.id,start:de.selectionStart,end:de.selectionEnd})}Za=g,t&&!o&&history.pushState({issueId:e,view:A()},"",`/issue/${l.identifier}`),Qn(l),bu(S),kl=!1,Ja=null,document.querySelectorAll(".view").forEach(L=>L.classList.add("hidden"));const M=document.getElementById("issue-detail-view");M.classList.remove("hidden");const ne=A()||"my-issues",E=J().find(L=>L.id===l.project_id),P=l.assignee_id?yt(l.assignee_id):null,U=P?dt(P):null,W=l.sprint_id?S.find(L=>L.id===l.sprint_id):null,Ee=Cl(l.id),{prevIssue:x,nextIssue:R}=Ee;M.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div id="ticket-gate-sticky" class="ticket-gate-sticky hidden" role="region" aria-label="Rituals waiting on you"></div>
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${f(ne)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Bl(Ee)}
                        <span class="issue-detail-breadcrumb">${E?p(E.name):"Project"} › ${p(l.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${p(l.title)}</h1>
                    ${tp(l,U,{formatEstimate:un})}

                    ${w?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(w.identifier)}" data-action="navigate-issue" data-issue-id="${f(w.id)}" data-identifier="${f(w.identifier)}">${w.identifier}: ${p(w.title)}</a>
                    </div>
                    `:""}

                    <div id="ticket-gate" class="ticket-gate-slot hidden"></div>
                    <div id="ticket-gate-live" class="sr-only" role="status" aria-live="polite"></div>

                    <div class="issue-detail-description">
                        <div class="section-header description-edit-row">
                            <button type="button" class="description-edit-btn${Ki(l.id)?" has-draft":""}" data-action="edit-description" data-issue-id="${f(l.id)}">
                                ${Ki(l.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span><span class="sr-only">: edit description (unsaved draft)</span>':'Edit<span class="sr-only"> description</span>'}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${l.description?"":"empty"}" data-action="edit-description" data-issue-id="${f(l.id)}">
                            ${l.description?Cn(l.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    ${Pb(l,u,m,{formatEstimate:un})}

                    ${Fb({comments:v,activities:d,ritualStatus:g,commentsLoadFailed:r,issueId:l.id,gateRitualName:((a=xw(g,{canAct:sm()}))==null?void 0:a.name)||null,activitiesTruncated:d.length>=om},{formatText:Il,formatActor:_l})}

                    <form class="comment-form comment-form-sticky" data-action="save-comment" data-issue-id="${f(l.id)}">
                        <textarea id="new-comment" placeholder="Write a comment... (${/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl"}+Enter to submit)" rows="1"></textarea>
                        <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                        <button type="submit" class="btn btn-primary btn-sm comment-submit-btn">Comment</button>
                    </form>
                </div>

                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${f(l.id)}">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${Ke(l.status)}
                                <span>${Ie(l.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${f(l.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${pt(l.priority)}
                                <span>${Te(l.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${f(l.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${l.issue_type||"task"}">${rt(l.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${f(l.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${U?`${Ut(P,"avatar-small")}<span>${p(U)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${f(l.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${W?p(W.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${f(l.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${l.labels&&l.labels.length>0?l.labels.map(L=>`
                                        <span class="issue-label" style="background: ${te(L.color)}20; color: ${te(L.color)}">${p(L.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${E?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${p(E.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${f(l.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${go(l.estimate,l.project_id)?" out-of-scale":""}" ${go(l.estimate,l.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${un(l.estimate,l.project_id)}</span>
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
                            <span class="property-value-static">${p(l.creator_name||"Unknown")} ${va(l.creator)}</span>
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
                                <button class="overflow-menu-item" data-action="edit" data-issue-id="${f(l.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Edit all fields
                                </button>
                                <button class="overflow-menu-item" data-action="show-issue-description-revisions" data-issue-id="${f(l.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    Description history
                                </button>
                                <button class="overflow-menu-item overflow-menu-danger" data-action="delete" data-issue-id="${f(l.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    Delete issue
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        `,Xa&&Xa.abort(),Xa=new AbortController;const{signal:C}=Xa,Q=document.querySelector(".sidebar-overflow-trigger"),_e=document.querySelector(".overflow-menu-dropdown");if(Q&&_e){const L=()=>{_e.classList.add("hidden"),Q.setAttribute("aria-expanded","false")},de=()=>{const ge=_e.classList.toggle("hidden");Q.setAttribute("aria-expanded",String(!ge))};Q.addEventListener("click",de,{signal:C}),document.addEventListener("click",ge=>{!Q.contains(ge.target)&&!_e.contains(ge.target)&&L()},{signal:C}),_e.addEventListener("keydown",ge=>{ge.key==="Escape"&&(ge.stopPropagation(),L(),Q.focus())},{signal:C})}h$(),Al(l.id),nl("new-comment","mention-suggestions",{projectId:l.project_id}),zp({signal:C}),b$(C);const ce=document.getElementById("new-comment");if(no=!1,ce){ce.addEventListener("compositionstart",()=>{no=!0},{signal:C}),ce.addEventListener("compositionend",()=>{no=!1},{signal:C});const L=tu(l.id);L&&(ce.value=L),ce.addEventListener("input",()=>{ga(l.id,ce.value)}),ce.addEventListener("keydown",de=>{var ge;de.key==="Enter"&&(de.metaKey||de.ctrlKey)&&(de.preventDefault(),(ge=ce.closest("form"))==null||ge.requestSubmit())})}ws=x?x.id:null,$s=R?R.id:null;const ht=L=>{var ue;if((L.metaKey||L.ctrlKey)&&L.shiftKey&&(L.key===">"||L.key==="."||L.code==="Period")&&Wa()){L.preventDefault();return}if(L.metaKey||L.ctrlKey||L.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||L.target.tagName==="INPUT"||L.target.tagName==="TEXTAREA"||L.target.tagName==="SELECT"||L.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||ti())return;if(L.key==="ArrowLeft"&&ws)L.preventDefault(),ae(ws);else if(L.key==="ArrowRight"&&$s)L.preventDefault(),ae($s);else if(L.key==="c"){L.preventDefault(),L.stopImmediatePropagation();const ee=document.getElementById("new-comment");ee&&(ee.focus(),ee.scrollIntoView({behavior:"smooth",block:"nearest"}))}else L.key==="j"?(L.preventDefault(),L.stopImmediatePropagation(),io(1)):L.key==="k"?(L.preventDefault(),L.stopImmediatePropagation(),io(-1)):L.key==="d"&&(L.preventDefault(),(ue=document.querySelector('[data-action="edit-description"]'))==null||ue.click());const ge={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[L.key];if(ge){const ee=document.querySelector(`.property-row[data-field="${ge}"]`);ee&&(L.preventDefault(),ee.click())}};if(document.addEventListener("keydown",ht,{signal:C}),_){const L=document.getElementById(_.id);if(L&&(L.focus({preventScroll:!0}),typeof _.start=="number"&&typeof L.setSelectionRange=="function"))try{L.setSelectionRange(_.start,_.end)}catch{}}return D!==null&&window.scrollTo(0,D),"rendered"}catch(o){if(n)console.error("Failed to refresh issue detail:",o);else{if(i!==_s)return"dropped";k("load issue",o);const r=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(r){const l=(o==null?void 0:o.status)===403||(o==null?void 0:o.status)===404;r.innerHTML=F(l?{icon:N.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:N.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function _$(e,t){if(e.preventDefault(),wl)return!1;const n=document.getElementById("new-comment").value;ga(t,null),wl=!0;try{const i=await b.createComment(t,n);$("Comment added!","success"),Ir(i),await ae(t)}catch(i){ga(t,n),k("add comment",i)}finally{wl=!1}return!1}async function x$(e){const t=we()||await b.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
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
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=Ki(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=iu(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}nl("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?kn(e,c,t.description||""):kn(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&dm()}),a.addEventListener("keydown",c=>{var d,u;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,m;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(kn(e,null),kl){ae(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?Cn(t.description):'<span class="add-description-link">Add description...</span>',(m=n.querySelector('[data-action="edit-description"]'))==null||m.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,v;if($l)return;const c=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(c===void 0)return;const d=Ja?Ja.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const y=document.getElementById("description-draft-warning");y&&(y.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",y.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");$l=!0,u&&(u.disabled=!0);const m=window.scrollY;try{await b.updateIssue(e,{description:c}),kn(e,null),$("Description updated","success"),await ae(e,!1),window.scrollTo(0,m),(v=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||v.focus()}catch(y){k("update description",y)}finally{$l=!1,u&&(u.disabled=!1)}})}function dm(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Cn(n):'<span class="text-muted">Nothing to preview.</span>'}function I$(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?dm():i.focus()}function S$(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-add-relation" data-issue-id="${f(e)}">
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
                <input type="text" id="relation-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-relate" data-issue-id="${f(e)}">
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
    `,z(),document.getElementById("relation-issue-search").focus()}async function T$(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=T())==null?void 0:i.id,o=(await b.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${f(r.id)}" data-identifier="${f(r.identifier)}" data-title="${f(r.title)}">
                <span class="link-result-id">${p(r.identifier)}</span>
                <span class="link-result-title">${p(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function L$(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function A$(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function C$(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return $("Please select an issue","error"),!1;try{n==="blocked_by"?await b.createRelation(i,t,"blocks"):await b.createRelation(t,i,n),H(),$("Relation added","success"),ae(t)}catch(s){k("add relation",s)}return!1}async function B$(e,t){try{await b.deleteRelation(e,t),$("Relation removed","success"),ae(e)}catch(n){k("remove relation",n)}}function io(e){const t=we();if(!t)return;const n=Ji();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||ae(n[s].id)}ie({"retry-issue-comments":(e,t)=>{ae(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{Vb(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||x$(t.issueId)},"open-gate-document":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),Ae(t.documentId))},"scroll-to-ticket-gate":()=>{v$()},"save-comment":(e,t)=>{_$(e,t.issueId)},"show-add-relation-modal":(e,t)=>{eo(),S$(t.issueId)},"remove-relation":(e,t)=>{B$(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{eo(),Ou(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{C$(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{T$(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{L$(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{A$()},"set-description-editor-mode":(e,t)=>{I$(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>io(-1),"navigate-next-issue":()=>io(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),nm(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),f$(t.issueId)}});let Ct=[],so={},ao=new Set,Wt=null,Dl=null,oo=[],xs=[],Ml=[];function ro(){return so}function D$(){return Dl}function M$(){return Wt}lt(e=>{e==="currentProject"&&A()==="sprints"&&dn()});let jl=0;async function dn({fromMemory:e=!1}={}){vu(-1);const t=K();if(!t){const o=document.getElementById("sprints-list");o&&(o.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}const n=++jl;Q$();const i=document.getElementById("sprints-list"),s=rl(),a=e?za("sprints",s):void 0;a?(Ct=a,um()):i&&(i.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{const[,o]=await Promise.all([b.getCurrentSprint(t),b.getSprints(t)]),r=o.some(c=>c.status==="active")?o:await b.getSprints(t);if(n!==jl)return;const l=a&&Va(Ct,r);Ct=r,pi("sprints",s,r),l||um(),await lo()}catch(o){return n!==jl?void 0:(i&&(i.innerHTML=F({icon:N.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),k("load sprints",o),!1)}return!0}function um(){const e=document.getElementById("sprints-list");if(!e)return;const t=Ct.find(a=>a.status==="active"),n=Ct.find(a=>a.status==="planned"),i=Ct.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 data-action="view-sprint" data-sprint-id="${f(t.id)}" data-sprint-url="/sprint/${f(t.id)}" style="cursor: pointer;">
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
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${f(t.id)}" data-sprint-name="${f(t.name)}" data-budget="${t.budget||""}" data-project-id="${f(t.project_id)}">Edit Sprint</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" data-action="show-limbo-details-modal">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" data-action="show-close-sprint-confirmation" data-sprint-id="${f(t.id)}">Close Sprint</button>
                    `}
                </div>
            </div>
        `,s+=j$(t)}if(n){const a=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",o=(n.budget?`${n.budget} point budget`:"No budget set")+(a?` <span class="text-muted">· ${a}</span>`:"");s+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${f(n.id)}" data-sprint-url="/sprint/${f(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${p(n.name)}</div>
                <div class="sprint-card-budget">${o}</div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${f(n.id)}" data-sprint-name="${f(n.name)}" data-budget="${n.budget||""}" data-project-id="${f(n.project_id)}">Edit Sprint</button>
                    ${n.budget_explicit===!0?`
                        <button class="btn btn-secondary btn-small" data-action="follow-default-budget" data-sprint-id="${f(n.id)}" title="Drop the hand-set budget: this sprint takes the project default and follows later changes to it">Follow project default</button>
                    `:""}
                </div>
            </div>
        `}i.length>0&&(s+=`
            <details class="sprint-history">
                <summary>Completed Sprints (${i.length})</summary>
                <div class="sprint-history-list">
                    ${i.map(a=>`
                        <div class="sprint-history-item" data-action="view-sprint" data-sprint-id="${f(a.id)}" data-sprint-url="/sprint/${f(a.id)}" style="cursor: pointer;">
                            <span class="sprint-history-name">${p(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=s||F({icon:N.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function pm(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${Ol(e.activated_at)}, closed ${Ol(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${Ol(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function j$(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${p(pm(e))||"not yet activated"}</span>
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
    `}let Rl=0;async function hi(e,t=!0){var n;try{t&&pn();const i=++Rl,s=A(),a=await b.getSprint(e);if(i!==Rl)return;if(!a){$("Sprint not found","error"),q("sprints");return}Dl=a;const o=(n=T())==null?void 0:n.id,[r,l,c]=await Promise.all([b.getIssues({sprint_id:e,limit:500}),b.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),o?b.getDocuments(o,a.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==Rl)return;oo=r,Ml=l,xs=c,A()===s&&St(oo),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),P$()}catch(i){console.error("Failed to load sprint:",i),$("Failed to load sprint","error"),q("sprints")}}async function R$(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){$("Invalid sprint ID","error"),q("sprints",!1);return}try{await hi(e,!1)}catch{q("sprints",!1)}}function P$(){const e=Dl,t=oo;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=A()||"sprints",s=t.filter(g=>ns.includes(g.status)),a=t.filter(g=>g.status==="done"),o=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((v,y)=>v+(y.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),c=r(a),d=o.length>0?`<div class="stat-note">${o.length} canceled not counted</div>`:"";let u="";e.status==="active"?u='<span class="badge badge-status-active">Active</span>':e.status==="planned"?u='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(u='<span class="badge badge-status-completed">Completed</span>');const m=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${f(i)}">
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
                    ${p(pm(e))}
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
                ${s.length===0?F({icon:N.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(g=>Pl(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?F({icon:N.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(g=>Pl(g)).join("")}
                    </div>
                `}
            </details>

            ${o.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${o.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${o.map(g=>Pl(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${N$()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${xs.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${f(e.id)}"
                        data-project-id="${f(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${xs.length>0?`
                    <div class="sprint-issues-list">
                        ${xs.map(g=>q$(g)).join("")}
                    </div>
                `:F({icon:N.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function Pl(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...$u,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${f(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${p(e.identifier)}</span>
            <span class="sprint-issue-title">${p(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${J$(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function q$(e){const t=p(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${f(e.id)}" data-document-url="/document/${f(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${p(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${ot(e.created_at)}</span>
            </span>
        </div>
    `}function N$(){const e=Ml;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${O$(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function O$(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function H$(e,t,n,i){const s=i?Ek(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${f(e)}" data-project-id="${f(i)}" data-current-budget="${f(n??"")}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${f(t)}" placeholder="Sprint name">
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
    `,z()}async function F$(e,t,n){var u,m,g,v;e.preventDefault();const i=(m=(u=document.getElementById("sprint-name"))==null?void 0:u.value)==null?void 0:m.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(v=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:v.dataset.currentBudget,l=r?parseInt(r):null,c=a!==l,d=Ct.find(y=>y.id===t);try{const y={};i&&(y.name=i);const w=o==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!w&&(y.budget=a),Object.keys(y).length&&await b.updateSprint(t,y),o==="planned"){const _=Ct.filter(D=>D.status==="planned"&&D.id!==t);for(const D of _)await b.updateSprint(D.id,{budget:a})}o==="default"&&n&&await b.updateProject(n,{default_sprint_budget:a}),await dn(),H(),$(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(y){k("update budget",y)}return!1}const mm="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function U$(e,t=null){const n=Ct.find(c=>c.id===e),i=n?J().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${mm}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let a;try{a=await b.updateSprint(e,{budget_follows_default:!0})}catch(c){k("reset budget to project default",c),t&&(t.disabled=!1);try{await dn()}catch{}return}const o=(a==null?void 0:a.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await dn()!==!1}catch{l=!1}$(`'${o}' follows the project default budget again: ${s(a==null?void 0:a.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((a==null?void 0:a.budget)===null||(a==null?void 0:a.budget)===void 0)&&$(mm,"warning")}async function G$(e){const t=Ct.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,z();const n=ns;let i=0,s=!1,a=!1;try{const[l,c]=await Promise.all([b.getIssues({sprint_id:e,limit:500}),b.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${p(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':i>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${i}</strong> incomplete issue${i===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${s?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${f(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function z$(e){try{const t=await b.closeSprint(e);await dn(),hm(),t.limbo?W$(t):$("Sprint completed!","success")}catch(t){k("complete sprint",t)}}async function lo(){const e=K();if(e)try{Wt=await b.getLimboStatus(e),V$()}catch(t){console.error("Failed to load limbo status:",t)}}function V$(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Wt||!Wt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Wt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function W$(e){const t=K();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,z(),K$(t)}async function K$(e){try{const t=await b.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${p(i.name)} <span class="ritual-mode">(${p(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${mt(i.prompt)}</div>
                    ${Nl(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function ql(){var t,n;if(!Wt)return;const e=K();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
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
                            <span class="badge badge-ritual-${f(i.approval_mode)}">${p(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${mt(i.prompt)}</div>
                        ${Nl(i.attestation)}
                        ${Y$(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=Wt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Wt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${p(i.name)}</div>
                            ${Nl(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,z()}function Nl(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${p(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${p(ot(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${mt(e.note)}</div>
        </div>
    `}function Y$(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${f(e.id)}" data-project-id="${f(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${f(e.id)}" data-project-id="${f(t)}" data-ritual-name="${f(e.name)}" data-ritual-artifact="${f(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function fm(e){for(const t of e)if(!ao.has(t))try{(await b.getSprints(t)).forEach(i=>{so[i.id]=i}),ao.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Q$(){so={},ao=new Set,oo=[],Ml=[],xs=[],co={}}function Z$(e,t){t.forEach(n=>{so[n.id]=n}),ao.add(e)}let co={};function X$(e){return co[e]}function gm(e,t){co[e]=t??null}function hm(){co={}}ie({"retry-load-sprints":()=>dn(),"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}hi(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;H$(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{U$(t.sprintId,n)},"show-limbo-details-modal":()=>{ql()},"show-close-sprint-confirmation":(e,t)=>{G$(t.sprintId)},"handle-update-budget":(e,t)=>{F$(e,t.sprintId,t.projectId)},"close-modal":()=>{H()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,H(),z$(t.sprintId)},"dismiss-limbo-modal":()=>{H(),lo()},"approve-ritual":(e,t)=>{ik(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{bm(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}ae(t.issueId)},"create-sprint-document":async(e,t)=>{await e$(t.sprintId,t.projectId,()=>{hi(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Ae(t.documentId)}});function Ol(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function J$(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}lt(e=>{e==="currentProject"&&A()==="rituals"&&Hl()});let vm=0;async function Hl(){const e=K(),t=document.getElementById("rituals-content"),n=++vm;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=F({icon:N.projects,heading:"Select a project",description:"Choose a project to view and manage its rituals"}));return}Ak(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await Ts();n===vm&&!i&&t&&(t.innerHTML=F({icon:N.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function ek(){Sm(tk),Hl()}function tk(){const e=document.getElementById("rituals-content"),t=Ck(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,bi("rv-sprint-rituals-list",n,"sprint"),bi("rv-close-rituals-list",i,"close"),bi("rv-claim-rituals-list",s,"claim")}function nk(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function ik(e,t){try{await b.approveAttestation(e,t),$("Ritual approved!","success"),await lo(),ql()}catch(n){k("approve ritual",n)}}function Fl(e){return e==="document"?`
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
        `:""}function Ul(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){$("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){$("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function bm(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Fl(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{sk(s,e,t,i)}),z()}async function sk(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=Ul(i);if(a===void 0)return!1;try{await b.completeGateRitual(t,n,s||null,a),$("Ritual completed!","success"),await lo();const o=M$();o&&!o.in_limbo?(H(),$("Limbo cleared! Next sprint is now active.","success")):ql()}catch(o){k("complete gate ritual",o)}return!1}function ak(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${p(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${Fl(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{ok(o,e,t,s,a)}),z()}async function ok(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return $("A note is required for this attestation.","error"),!1;const o=Ul(i);if(o===void 0)return!1;try{await b.attestTicketRitual(t,n,a||null,o),$("Ritual attested!","success"),H(),await ks(n)}catch(r){k("attest ticket ritual",r)}return!1}async function rk(e,t){try{await b.attestTicketRitual(e,t),$("Ritual attested!","success"),await ks(t)}catch(n){k("attest ticket ritual",n)}}async function lk(e,t){try{await b.approveTicketRitual(e,t),$("Ritual approved!","success"),await ks(t)}catch(n){k("approve ticket ritual",n)}}function ym(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{ck(s,e,t,n,i)}),z()}async function ck(e,t,n,i,s=null){e.preventDefault();const a=document.getElementById("reject-ritual-note").value.trim();if(!a)return $("A rejection needs a reason.","error"),!1;try{await b.rejectTicketRitual(t,n,a),$(`"${i}" rejected. The attester has been told why.`,"success"),H(),s&&await s()}catch(o){k("reject ritual",o)}return!1}function dk(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Fl(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{uk(s,e,t,i)}),z()}async function uk(e,t,n,i=""){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value,a=Ul(i);if(a===void 0)return!1;try{await b.completeTicketGateRitual(t,n,s||null,a),$("Ritual completed!","success"),H(),await ks(n)}catch(o){k("complete ticket ritual",o)}return!1}ie({"show-create-ritual-modal":(e,t)=>{jm(t.trigger)},"approve-ticket-ritual":(e,t)=>{lk(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{ym(t.ritualId,t.issueId,t.ritualName,()=>ks(t.issueId))},"complete-ticket-ritual":(e,t)=>{dk(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{ak(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{rk(t.ritualId,t.issueId)},"retry-load-rituals":()=>Hl()});function mt(e){if(!e)return"";try{Y.setOptions({breaks:!0,gfm:!0});const n=Y.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return Jd.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function Is(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function pk(e,t,n,i,s,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${p(s)}</span>
                    <span class="gate-approval-issue-title">${p(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${f(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${p(i)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${p(o)}</strong>${r?` ${Is(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{mk(c,e,t,n)}),z(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function mk(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await b.completeTicketGateRitual(t,n,s||null),$(`GATE ritual "${i}" approved!`,"success"),H(),Bt()}catch(a){k("complete gate ritual",a)}}function fk(e,t,n,i,s,a,o,r){pk(e,t,n,i,s,a,o,r)}function gk(e,t,n,i,s,a,o,r,l){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${p(s)}</span>
                    <span class="gate-approval-issue-title">${p(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${f(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${p(i)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${p(o)}</strong>${r?` ${Is(r)}`:""}</div>`:""}
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
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{hk(d,e,t,n)}),z(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function hk(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{await b.approveTicketRitual(t,n);let r=null;if(s)try{r=await b.createComment(n,s)}catch(l){console.error("Failed to post approval comment:",l)}$(`Review ritual "${i}" approved!`,"success"),Ir(r),H(),Bt()}catch(r){k("approve review ritual",r)}}function vk(e,t,n,i,s,a,o,r,l){gk(e,t,n,i,s,a,o,r,l)}lt(e=>{e==="currentProject"&&A()==="approvals"&&Bt()});let Gl=[],zl=0;async function Bt(){if(!T())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++zl;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=K(),i=n?J().filter(r=>r.id===n):J(),s=await Promise.all(i.map(async r=>{const[l,c]=await Promise.all([b.getPendingApprovals(r.id),b.getLimboStatus(r.id)]);return{project:r,approvals:l,limbo:c}}));if(t!==zl)return;const a=[],o=[];for(const{project:r,approvals:l,limbo:c}of s)if(a.push(...l),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(u=>{var m;return(m=u.attestation)!=null&&m.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});d.length>0&&o.push({project:r,rituals:d})}Gv(a),Gl=o,wm()}catch(n){if(t!==zl)return;e.innerHTML=F({icon:N.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),k("load approvals",n)}}function wm(){const e=document.getElementById("approvals-list");if(!e)return;const t=Uv(),n=Gl.length>0,i=!kv();if(t.length===0&&!n){i?e.innerHTML=`
                <div class="empty-state approvals-explainer">
                    <div class="empty-state-icon">${N.issues}</div>
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
            `:e.innerHTML=F({icon:N.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let s="";n&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${Gl.map(({project:d,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${p(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(m=>{const g=m.attestation&&!m.attestation.approved_at,v=g?"⏳":"○",y=g?`<span class="gate-waiting-info">Attested by <strong>${p(m.attestation.attested_by_name||"Unknown")}</strong></span>`:m.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',w=g?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${f(m.id)}"
                                            data-project-id="${f(d.id)}">Approve</button>`:m.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${f(m.id)}"
                                                data-project-id="${f(d.id)}"
                                                data-ritual-name="${f(m.name)}"
                                                data-ritual-artifact="${f(m.artifact||"")}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${v} ${p(m.name)}
                                                    <span class="badge badge-ritual-${f(m.approval_mode)}">${p(m.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${p(m.prompt)}</span>
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
        `);const a=d=>d.pending_approvals||[],o=d=>u=>{const m=a(u).filter(d);return m.length>0?{...u,_filteredApprovals:m}:null},r=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="claim")).filter(Boolean),l=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="close")).filter(Boolean),c=t.map(o(d=>d.approval_mode==="review")).filter(Boolean);r.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(Vl).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(Vl).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(Vl).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;fk(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var g;d.disabled=!0;const u=(g=d.closest(".gate-ritual-actions"))==null?void 0:g.querySelector(".review-approve-btn");u&&(u.disabled=!0);const m=d.dataset;try{await b.approveTicketRitual(m.ritualId,m.issueId),$(`Review ritual "${m.ritualName}" approved!`,"success"),await Bt()}catch(v){d.disabled=!1,u&&(u.disabled=!1),k("approve review ritual",v)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;vk(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".gate-reject-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;ym(u.ritualId,u.issueId,u.ritualName,()=>Bt())})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await b.approveAttestation(d.dataset.ritualId,d.dataset.projectId),$("Sprint ritual approved!","success"),await Bt()}catch(u){d.disabled=!1,k("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{bm(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName,d.dataset.ritualArtifact||"")})})}function bk(){Ev(),wm()}function Vl(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${p(i.requested_by_name)}</strong>${i.requested_at?` (${Is(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note">${mt(i.attestation_note)}</div>`:"",l=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=!s&&i.rejection_note,d=c?`<div class="gate-rejection-note"><strong>Rejected by ${p(i.rejected_by_name||"Someone")}</strong>${i.rejected_at?` (${Is(i.rejected_at)})`:""}: ${p(i.rejection_note)}<br><span class="text-muted">Waiting for the requester to ask again.</span></div>`:"",u=`<button class="btn btn-small btn-secondary gate-reject-btn"
                        data-ritual-id="${f(i.ritual_id)}"
                        data-issue-id="${f(e.issue_id)}"
                        data-ritual-name="${f(i.ritual_name)}">Reject</button>`,m=s?`<div class="gate-ritual-actions">
                    <button class="btn btn-small btn-primary review-quick-approve-btn"
                        data-ritual-id="${f(i.ritual_id)}"
                        data-issue-id="${f(e.issue_id)}"
                        data-ritual-name="${f(i.ritual_name)}">Approve</button>
                    <button class="btn btn-small btn-secondary review-approve-btn"
                        data-ritual-id="${f(i.ritual_id)}"
                        data-issue-id="${f(e.issue_id)}"
                        data-ritual-name="${f(i.ritual_name)}"
                        data-ritual-prompt="${f(i.ritual_prompt)}"
                        data-issue-identifier="${f(e.identifier)}"
                        data-issue-title="${f(e.title)}"
                        data-requested-by="${f(i.requested_by_name||"")}"
                        data-requested-at="${f(i.requested_at||"")}"
                        data-attestation-note="${f(i.attestation_note||"")}">Comment &amp; Approve</button>
                    ${u}
                </div>`:`<div class="gate-ritual-actions">
                    <button class="btn btn-small btn-primary gate-approve-btn"
                    data-ritual-id="${f(i.ritual_id)}"
                    data-issue-id="${f(e.issue_id)}"
                    data-ritual-name="${f(i.ritual_name)}"
                    data-ritual-prompt="${f(i.ritual_prompt)}"
                    data-issue-identifier="${f(e.identifier)}"
                    data-issue-title="${f(e.title)}"
                    data-requested-by="${f(i.requested_by_name||"")}"
                    data-requested-at="${f(i.requested_at||"")}">Complete</button>
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
                ${m}
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${f(e.issue_id)}" class="gate-issue-link">
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
    `}ie({"view-issue-from-modal":(e,t)=>{e.preventDefault(),H(),ae(t.issueId)},"dismiss-approvals-explainer":()=>{bk()},"retry-load-approvals":()=>Bt()});const uo={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},po={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let $m=0;function km(e){$m=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=Em(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Em(e="",t="",n=""){const i=$m++,s=Object.keys(uo).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?uo[e]:uo.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${po[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
        <div class="condition-row" id="condition-row-${i}">
            <select class="condition-field" data-action="update-operator-options" data-row-id="${i}">
                <option value="">Select field...</option>
                ${s}
            </select>
            <select class="condition-operator" id="condition-operator-${i}" data-action="toggle-value-input" data-row-id="${i}">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${i}" value="${f(String(r))}" placeholder="Value"${l?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" data-action="remove-condition-row" data-row-id="${i}">&times;</button>
        </div>
    `}function yk(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Em()),mo()}function wk(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),mo()}function $k(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=uo[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${po[o]}</option>`).join(""),_m(e),mo()}function _m(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Ss(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function mo(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function xm(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,l=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,c=o.querySelector(".condition-value");let d=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw Ss("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw Ss("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${l}`;if(n.has(u))throw Ss(`Duplicate condition: ${r} ${po[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),l==="isnull")t[u]=!0;else if(l==="in"||l==="contains")t[u]=d?d.split(",").map(m=>m.trim()).filter(m=>m):[];else if(l==="gte"||l==="lte"){if(!d)throw Ss(`Please enter a numeric value for ${r} ${po[l]}.`),new Error(`Missing numeric value for ${u}`);const m=parseInt(d,10);if(isNaN(m))throw Ss(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${d}`);t[u]=m}else t[u]=d}return mo(),Object.keys(t).length>0?t:null}ie({"add-condition-row":()=>{yk()},"remove-condition-row":(e,t)=>{wk(Number(t.rowId))},"update-operator-options":(e,t)=>{$k(Number(t.rowId))},"toggle-value-input":(e,t)=>{_m(Number(t.rowId))}});let Se=[],Wl=null;const Im=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];lt((e,t)=>{e==="currentProject"&&(t&&uv(t),Im.forEach(n=>{const i=document.getElementById(n);i&&(i.value=t||"")}),Hk(t||""))});const fo={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function Sm(e){Wl=e}function J(){return Se}function kk(e){Se=e}function vi(e){const t=Se.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return fo[n]||fo.fibonacci}function un(e,t){if(e==null)return"No estimate";const i=vi(t).find(s=>s.value===e);return i?i.label:`${e} points`}function go(e,t){return e==null||e===0?!1:!vi(t).some(i=>i.value===e)}function Ek(e){const t=Se.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(fo[n]||fo.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function ft(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await b.getProjects(e);if(((n=T())==null?void 0:n.id)!==e)return;Se=i,Lm(),Tm()}catch(i){k("load projects",i)}}function Tm(){const e=K();if(e&&Se.some(i=>i.id===e))return;const t=Kl();if(t&&Se.some(i=>i.id===t)){ct(t);return}const n=eu();if(n&&Se.some(i=>i.id===n)){ct(n);return}Se.length>0&&ct(Se[0].id)}function Lm(){const e='<option value="">All Projects</option>'+Se.map(a=>`<option value="${a.id}">${p(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+Se.map(a=>`<option value="${a.id}">${p(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],i=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),i.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const s=K();Im.forEach(a=>{const o=document.getElementById(a);o&&(o.value=s||"")})}function Am(){return eu()}function Pn(){const e=document.getElementById("projects-list");if(Se.length===0){e.innerHTML=F({icon:N.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=Se.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${f(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${te(t.color)}20; color: ${te(t.color)}">
                    ${p(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${p(t.name)}</div>
                <button class="grid-item-edit" data-action="view-project-settings" data-project-id="${f(t.id)}" title="Project settings">
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
    `).join("")}function _k(e){ct(e),q("issues")}function Cm(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,z()}async function xk(e){e.preventDefault();const t=T();if(!t){$("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await b.createProject(t.id,n),await ft(),Pn(),H(),$("Project created!","success")}catch(i){k("create project",i)}return!1}async function Ik(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await b.updateProject(t,n),await ft(),Pn(),H(),$("Project updated!","success")}catch(i){k("update project",i)}return!1}async function Sk(e){const t=Se.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await b.deleteProject(e),await ft(),Pn(),H(),$("Project deleted","success")}catch(n){k("delete project",n)}}let je=null;function Bm(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function Tk(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await b.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(je!==e.id)return;const i=n.filter(a=>a.id===e.default_epic_id||a.status!=="done"&&a.status!=="canceled"),s=e.default_epic_id&&!i.some(a=>a.id===e.default_epic_id)?`<option value="${f(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(a=>`<option value="${f(a.id)}">${p(a.identifier)} ${p(a.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function Dm(e){je=e,Se.length===0&&await ft();const t=Se.find(n=>n.id===e);if(!t){$("Project not found","error"),q("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,Bm("ps-require-assignee-on-claim",t.require_assignee_on_claim===!0),Bm("ps-require-epic-on-close",t.require_epic_on_close===!0),Tk(t),document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Mm("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Mm(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Kt||Kt.length===0)&&Ts()}function Lk(){je=null,Kt=[]}function Ak(e){je=e}function Ck(){return Kt}async function Bk(){if(!je)return;const e=document.getElementById("ps-name").value.trim();if(!e){$("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await b.updateProject(je,t),await ft(),$("Settings saved","success");const n=Se.find(i=>i.id===je);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){k("save project settings",n)}}async function Dk(){if(!je)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const a=document.getElementById("ps-default-epic");a&&!a.disabled&&(n.default_epic_id=a.value||null);try{await b.updateProject(je,n),await ft(),$("Settings saved","success")}catch(o){k("save settings",o)}}let Kt=[];async function Ts(){if(!je)return!1;try{return Kt=await b.getRituals(je),Mk(),typeof Wl=="function"&&Wl(),!0}catch(e){return k("load rituals",e),!1}}function Mk(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Kt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Kt.filter(i=>i.trigger==="ticket_close"),n=Kt.filter(i=>i.trigger==="ticket_claim");bi("ps-sprint-rituals-list",e,"sprint"),bi("ps-close-rituals-list",t,"close"),bi("ps-claim-rituals-list",n,"claim")}function bi(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>f(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${p(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${p(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${mt(a.prompt)}</div>
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
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${f(a.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${f(a.id)}" data-ritual-name="${f(a.name)}">Delete</button>
      </div>
    </div>
  `}).join("")}async function jm(e){if(!je)return;let t=[];try{t=await b.getRitualGroups(je)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
          ${t.map(n=>`<option value="${f(n.id)}" data-mode="${f(n.selection_mode)}">${p(n.name)} (${p(n.selection_mode)})</option>`).join("")}
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
        ${km(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,z()}function jk(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Rk(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function Rm(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw $("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await b.createRitualGroup(je,{name:t,selection_mode:n})).id}return e.value||null}async function Pk(e){var s;e.preventDefault();let t;try{t=xm()}catch{return!1}let n;try{n=await Rm()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await b.createRitual(je,i),await Ts(),H(),$("Ritual created!","success")}catch(a){k("create ritual",a)}return!1}async function qk(e){const t=Kt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await b.getRitualGroups(je)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form data-action="update-project-ritual" data-ritual-id="${f(e)}">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${f(t.name)}" required>
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
          ${n.map(o=>`<option value="${f(o.id)}" data-mode="${f(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${p(o.name)} (${p(o.selection_mode)})</option>`).join("")}
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
        ${km(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,z()}async function Nk(e,t){var a;e.preventDefault();let n;try{n=xm()}catch{return!1}let i;try{i=await Rm()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await b.updateRitual(t,s),await Ts(),H(),$("Ritual updated!","success")}catch(o){k("update ritual",o)}return!1}async function Ok(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await b.deleteRitual(e),await Ts(),$("Ritual deleted","success")}catch(n){k("delete ritual",n)}}ie({"view-project":(e,t)=>{_k(t.projectId)},"view-project-settings":(e,t)=>{Dm(t.projectId)},"create-project":e=>{xk(e)},"update-project":(e,t)=>{Ik(e,t.projectId)},"confirm-delete-project":(e,t)=>{Sk(t.projectId)},"edit-project-ritual":(e,t)=>{qk(t.ritualId)},"delete-project-ritual":(e,t)=>{Ok(t.ritualId,t.ritualName)},"create-project-ritual":e=>{Pk(e)},"update-project-ritual":(e,t)=>{Nk(e,t.ritualId)},"toggle-ritual-conditions":()=>{jk()},"ritual-group-change":()=>{Rk()}});function Kl(){const t=new URLSearchParams(window.location.search).get("project");return t||Am()}function Hk(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const Yl={},Pm=new Map;let Ql=null,Zl=null,Xl=null,Jl=null,ec=null,tc=null,nc=null,qm=!1;function Fk(e){Object.assign(Yl,e)}function Uk({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a,beforeScrollRestore:o}={}){e&&(Ql=e),t&&(Zl=t),n&&(Xl=n),i&&(Jl=i),s&&(ec=s),a&&(tc=a),o&&(nc=o)}function Nm(){return Object.keys(Yl)}const Gk=["issues","query","board","sprints","epics","documents","rituals","approvals","my-issues"],Om={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects",people:"people"};function Ls(e){document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)})}function Hm(){Ql&&Ql()}function q(e,t=!0,{transition:n=!1}={}){if(t&&pn(),Xi(e),t){let a;const o=Kl();e==="my-issues"?a=o?`/?project=${o}`:"/":e==="issues"&&window.location.search?a=`/issues${window.location.search}`:Gk.includes(e)&&o?a=`/${e}?project=${o}`:a=`/${e}`,history.pushState({view:e},"",a)}Ls(e),Hm();const i=()=>{document.querySelectorAll(".view").forEach(o=>o.classList.add("hidden"));const a=document.getElementById(`${e}-view`);a&&a.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=Yl[e];s&&s(),t&&window.scrollTo(0,0)}function Fm(){var s;Xi(null);const e=window.location.pathname.split("/").filter(Boolean),t={"gate-approvals":"approvals"},n=e.length===0?"my-issues":t[e[0]]||e[0],i=e.length<=1&&Nm().includes(n);document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden")),i?((s=document.getElementById(`${n}-view`))==null||s.classList.remove("hidden"),Ls(n)):Ls(Om[e[0]]||null)}function ic(){var i;const t=window.location.pathname.split("/").filter(Boolean);Jl&&Jl(),A()||Xi("my-issues");let n="my-issues";if(t.length===0||t[0]==="")q("my-issues",!1);else if(Zl&&Zl(t)){const s=Om[t[0]];s&&Ls(s);return}else{n=t[0];const s={"gate-approvals":"approvals"};s[n]&&(n=s[n]),Nm().includes(n)?q(n,!1):(n="my-issues",q("my-issues",!1))}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function pn(){Pm.set(window.location.href,window.scrollY)}function sc(e){pn(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),ec&&ec(e)}function Um(e){pn(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),tc&&tc(e)}function Gm(){const e=Pm.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{nc&&nc(),window.scrollTo(0,e)})}function zm(){qm||(qm=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&Xl&&Xl(e.state)){Gm();return}(t=e.state)!=null&&t.view?q(e.state.view,!1):ic(),Gm()}))}let Yt=0,yi=!1,As=null,ho=null,Cs=0;const qn=new Map;function vo(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Yt===0&&!yi),e.textContent=yi?"Stopped":"Offline",e.title=yi?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function Ye(e,t){return qn.has(e)||qn.set(e,new Set),qn.get(e).add(t),()=>{var n;return(n=qn.get(e))==null?void 0:n.delete(t)}}function zk(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const Vk=1e3;function bo(){ho&&(clearTimeout(ho),ho=null)}const Wk="chaotic",ac=4001,Kk=4003,Yk="chaotic.bearer.";function Qk(e){return[Wk,Yk+e]}function Vm(e,{isReconnect:t=!1}={}){As&&(clearTimeout(As),As=null),bo();const n=Wv();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),Cr(null)),!t&&(Yt>0||yi)&&(Yt=0,yi=!1,vo());const i=b.getToken();if(!i)return;const s=++Cs,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o,Qk(i));Cr(r);let l=!1;const c=()=>{if(l||s!==Cs)return;l=!0,bo();const d=Yt>0;d&&$("Live updates reconnected","success"),Yt=0,vo(),d&&oc({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===Cs&&(console.log("WebSocket connected"),bo(),ho=setTimeout(c,Vk))},r.onmessage=d=>{if(s!==Cs)return;c();let u;try{u=JSON.parse(d.data)}catch(m){console.error("WebSocket: malformed message",m);return}oc(u)},r.onclose=d=>{if(s!==Cs)return;console.log("WebSocket disconnected"),bo();const u=d==null?void 0:d.code;if(u===ac||u===Kk){Cr(null),Yt=0;const g=u===ac&&wr()===i;yi=!g,vo();let v="forbidden";u===ac&&(v=g?"unauthorized":"superseded"),oc({type:v,entity:"connection",data:{code:u,teamId:e}});return}Yt++,Yt===1&&$("Live updates disconnected. Reconnecting...","warning"),vo();const m=zk(Yt-1);As=setTimeout(()=>{As=null,T()&&T().id===e&&Vm(e,{isReconnect:!0})},m)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function oc(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=qn.get(`${n}:${t}`);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=qn.get(n);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=qn.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}const Zk={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device",children_closed:"Nothing left open"};let wi=0,Dt=!1,$e=null,mn=null;const Bs=new Set,Mt=new Map,gt=new Map;function Wm(e){Mt.get(e)===null&&Mt.set(e,wi)}function rc(e){const t=gt.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=wi)}function Xk(e){return e.filter(t=>!Mt.has(t.id)).map(t=>{const n=gt.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(Dt&&gt.has(t.id)&&t.id!==$e))}function Jk(e){for(const[t,n]of Mt)n!==null&&e>n&&Mt.delete(t);for(const[t,n]of gt)n.confirmedAfter!==null&&e>n.confirmedAfter&&gt.delete(t)}function eE(e,t){t!=null&&t.id&&(e==="archived"?(Mt.has(t.id)||Mt.set(t.id,null),Wm(t.id)):e==="read"&&rc(t.id))}async function $i(){const e=T();if(e){try{const t=await b.getInboxUnreadCount(e.id);ts(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}Ds()}}function Ds(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=wa();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0);const n=document.getElementById("inbox-header-count");n&&(n.textContent=t>0?`${t} unread`:"")}async function Ms({focusFirst:e=!1,background:t=!1}={}){const n=T();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++wi;t||(mn={focusFirst:e||!!(mn!=null&&mn.focusFirst)},$e=null,tE(i));try{const a=await b.getInbox(n.id,{unread:Dt,limit:100});if(s!==wi)return;const o=new Set(Mt.keys());Jk(s);const r=Xk(a||[]),l=mn;mn=null,l?(Gt(r),Rs(),l.focusFirst&&!tt()&&sE()):nE(r,o)}catch(a){if(s!==wi)return;mn?(mn=null,i.innerHTML=F({icon:N.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),k("load inbox",a)):console.error("Failed to refresh inbox:",a)}$i()}function tE(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function yo(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function Km(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function Ym(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function Qm(e,t){if(!e)return;const n=yo(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=Km(n||t)),i==null||i.focus({preventScroll:!0})}function nE(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=ye(),s=[...n.querySelectorAll(".inbox-row")],a=n.querySelector(".inbox-row.keyboard-selected"),o=(a==null?void 0:a.dataset.entryId)||null,r=a?s.indexOf(a):-1,l=Ym(),c=window.scrollY,d=n.scrollTop;let u=e;if($e&&!e.some(v=>v.id===$e)){const v=i.find(y=>y.id===$e);if(v&&Dt&&!t.has($e)){u=[...e];const y=u.findIndex(w=>w.created_at<v.created_at);u.splice(y===-1?u.length:y,0,v)}else $e=null}Gt(u),Rs();let m=-1;o&&(m=u.findIndex(v=>v.id===o),m===-1&&u.length&&(m=Math.min(r,u.length-1))),m>=0?js(m,{focus:!1}):ya(-1);const g=m>=0?n.querySelectorAll(".inbox-row")[m]:null;Qm(l,g),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function iE(e,t){if(!(t!=null&&t.id))return!1;const n=ye().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function ki(e){const t=ye();for(const n of new Set(e)){const i=yo(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const a=i.contains(document.activeElement)?Ym():null,o=document.createElement("template");o.innerHTML=tf(s).trim();const r=o.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),Qm(a,r)}}function js(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){ya(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),ya(i),t&&Km(n[i]).focus({preventScroll:!0})}function sE(){js(0)}async function lc(e){const t=ye(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;$e===e&&($e=null),Mt.set(e,null),Gt(t.filter(a=>a.id!==e)),s&&ts(Math.max(0,wa()-1)),Rs(),Ds(),js(n);try{await b.archiveInbox(e),Wm(e)}catch(a){Mt.delete(e),console.error("Failed to archive inbox entry:",a)}}function Zm(e){var s,a;const n=ye().findIndex(o=>o.id===e);if(n===-1)return;const i=$e;$e=i===e?null:e,$e===e&&Xm(e),ki([i,e]),js(n),$e===e&&((a=(s=yo(e))==null?void 0:s.scrollIntoView)==null||a.call(s,{block:"nearest"}))}function Xm(e){const t=ye(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,gt.set(e,{readAt:i,confirmedAfter:null}),Gt([...t]),ts(Math.max(0,wa()-1)),Ds(),b.markInboxRead(e).then(()=>rc(e),s=>{var o;((o=gt.get(e))==null?void 0:o.readAt)===i&&gt.delete(e);const a=ye().find(r=>r.id===e);a&&a.read_at===i&&(a.read_at=null,Gt([...ye()]),ki([e])),$i(),k("mark inbox entry read",s)})}function aE(e){var i;const n=ye().findIndex(s=>s.id===e);if(n!==-1){if(Xm(e),Dt)$e===e&&($e=null),Gt(ye().filter(s=>s.id!==e)),Rs(),js(n);else if(ki([e]),!document.activeElement||document.activeElement===document.body){const s=yo(e);(i=s==null?void 0:s.querySelector(".inbox-row-toggle"))==null||i.focus({preventScroll:!0})}}}function oE(){if($e===null)return!1;const e=$e;return $e=null,ki([e]),!0}function Jm(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function rE(e){if(Bs.has(e))return;const t=ye().find(i=>i.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender";Bs.add(e),Jm(e,!0);try{await b.updateIssue(t.issue_id,{assignee_id:t.source_user_id})}catch(i){Bs.delete(e),Jm(e,!1),k(`reassign ${t.issue_identifier||"issue"} back to ${n}`,i);return}Bs.delete(e),lc(e)}function lE(){ef(!Dt)}function ef(e){e!==Dt&&(Dt=e,document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(t=>{const n=t.dataset.filter==="unread"===Dt;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),Ms({focusFirst:!0}))}const cE='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',dE='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';function uE(e){const t=[...(e||"").trim()][0];return t?t.toUpperCase():"•"}function tf(e){const t=!e.read_at,n=e.id===$e,i=Zk[e.kind]||e.kind,s=e.issue_identifier||e.document_title||"",a=[`data-entry-id="${f(e.id)}"`,e.issue_id?`data-issue-id="${f(e.issue_id)}"`:"",e.document_id?`data-document-id="${f(e.document_id)}"`:""].filter(Boolean).join(" "),o=`inbox-panel-${e.id}`;return`
        <div class="inbox-row${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${a}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${f(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${f(o)}"`:""}>
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':'<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${p(uE(e.source_user_name))}</span>
                    <span class="inbox-row-header">
                        <span class="badge badge-inbox-${f(e.kind)}">${p(i)}</span>
                        ${s?`<span class="inbox-row-source">${p(s)}</span>`:""}
                    </span>
                    <span class="inbox-row-text">
                        <span class="inbox-row-title">${p(e.title)}</span>
                        ${!n&&e.body?`<span class="inbox-row-body">${p(e.body)}</span>`:""}
                    </span>
                </button>
                ${n?pE(e,s,o):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${t?`<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${f(e.id)}" title="Mark read" aria-label="Mark read">${cE}</button>`:""}
                    <button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${f(e.id)}" title="Archive (e)" aria-label="Archive">${dE}</button>
                </span>
                <span class="inbox-row-time">${p(Is(e.created_at))}</span>
            </div>
        </div>
    `}function pE(e,t,n){const i=(e.kind==="assignment"||e.kind==="review_requested")&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,a=e.source_user_name,o=t?`Open ${p(t)}`:"Open",r=[i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${f(e.id)}"${Bs.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${a?` to ${p(a)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
                    data-entry-id="${f(e.id)}"
                    ${e.issue_id?`data-issue-id="${f(e.issue_id)}"`:""}
                    ${e.document_id?`data-document-id="${f(e.document_id)}"`:""}>${o}</button>`:"",`<button type="button" class="inbox-action-btn" data-action="archive-inbox-entry"
                data-entry-id="${f(e.id)}">Archive</button>`].filter(Boolean).join("");return`
        <div class="inbox-row-expanded-panel" id="${f(n)}" role="region"
             aria-label="${f(e.title)}">
            ${a?`<div class="inbox-expanded-source">from ${p(a)}</div>`:""}
            ${e.body?`<div class="inbox-expanded-body">${p(e.body)}</div>`:""}
            <div class="inbox-action-bar">${r}</div>
        </div>
    `}function Rs(){const e=document.getElementById("inbox-list");if(!e)return;const t=ye();if(t.length===0){e.innerHTML=F({icon:N.inbox,heading:Dt?"No unread items":"Inbox zero",description:Dt?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=fE(t)}function mE(e,t=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"Older";const i=a=>new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),s=Math.round((i(t)-i(n))/864e5);return s<=0?"Today":s===1?"Yesterday":s<7?"Last 7 days":"Older"}function fE(e){const t=[];for(const n of e){const i=mE(n.created_at),s=t[t.length-1];s&&s.label===i?s.entries.push(n):t.push({label:i,entries:[n]})}return t.map((n,i)=>`
        <section class="inbox-group" aria-labelledby="inbox-group-${i}">
            <h3 class="inbox-group-header" id="inbox-group-${i}">${p(n.label)}</h3>
            ${n.entries.map(s=>tf(s)).join("")}
        </section>
    `).join("")}async function gE(e){var s;const t=ye().find(a=>a.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();gt.set(e,{readAt:n,confirmedAfter:null});try{await b.markInboxRead(e)}catch(a){((s=gt.get(e))==null?void 0:s.readAt)===n&&gt.delete(e);const o=ye().find(r=>r.id===e);o&&o.read_at===n&&(o.read_at=null,Gt([...ye()]),ki([e])),console.error("Failed to mark inbox entry read:",a);return}rc(e);const i=ye().find(a=>a.id===e);i&&!i.read_at?(i.read_at=n,Gt([...ye()]),ts(Math.max(0,wa()-1)),Ds(),ki([e])):$i()}async function hE(){const e=T();if(e)try{await b.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of ye())n.read_at||gt.set(n.id,{readAt:t,confirmedAfter:wi});Gt(ye().map(n=>({...n,read_at:n.read_at||t}))),ts(0),Ds(),Rs()}catch(t){k("mark all inbox entries read",t)}}function vE(e){e.entryId&&gE(e.entryId),e.issueId?ae(e.issueId):e.documentId&&Ae(e.documentId)}function bE(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&lc(e.dataset.entryId)}function yE(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Zm(e.dataset.entryId)}const wE='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function $E(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(wE);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function kE(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}ie({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&kE((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||$E(e.target,n)||(e.preventDefault(),t.entryId&&Zm(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),vE(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&rE(t.entryId)},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&lc(t.entryId)},"toggle-inbox-unread-filter":()=>lE(),"set-inbox-filter":(e,t)=>ef(t.filter==="unread"),"mark-inbox-read":(e,t)=>{e.preventDefault(),t.entryId&&aE(t.entryId)},"mark-all-inbox-read":()=>hE(),"retry-load-inbox":()=>Ms({focusFirst:!0})});let Ps=[],Nn=[],cc=[],dc=[];function uc(){return Ps}function nf(e){Ps=Array.isArray(e)?e:[],sf()}function fn(){return Nn}async function wo(e=null){try{Ps=await(e||b.getMyTeams()),sf()}catch(t){k("load teams",t)}}function sf(){const e=document.getElementById("team-list");Ps.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Ps.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${f(JSON.stringify(t))}">${p(t.name)}</button>
        `).join("")}async function $o(e,t=!1,{seed:n=null}={}){On=null,Yn(e),document.getElementById("current-team-name").textContent=e.name;const i=document.getElementById("mobile-team-name");i&&(i.textContent=e.name);const s=document.getElementById("team-description-text");if(s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),Vm(e.id),n&&_E(n)){let a=!1;try{xE(n),On=e.id,t?ic():q(A()||"my-issues"),a=!0}catch(o){console.error("Failed to paint from the boot cache:",o),On=null}if(a){af(e).catch(o=>console.error("Failed to refresh team data:",o));return}}await af(e),t?ic():q(A()||"my-issues")}let On=null;function EE(){var e;return On&&On===((e=T())==null?void 0:e.id)?On:null}async function af(e){var t;await Promise.all([ft(),GE(),SE(),dw(),$i()]),((t=T())==null?void 0:t.id)===e.id&&(On=e.id)}function _E(e){const t=new URLSearchParams(window.location.search).get("project");return!t||Array.isArray(e.projects)&&e.projects.some(n=>n.id===t)}function xE(e){kk(Array.isArray(e.projects)?e.projects:[]),Lm(),Tm(),es(Array.isArray(e.labels)?e.labels:[]),Nn=Array.isArray(e.members)?e.members:[],lw(e.agents),is(fn,Dn),Zn(),rb(e.issues)}function of(){document.getElementById("team-dropdown").classList.toggle("hidden")}function IE(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function SE(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await b.getTeamMembers(e);if(((n=T())==null?void 0:n.id)!==e)return;Nn=i,is(fn,Dn),Zn()}catch(i){console.error("Failed to load team members:",i),k("load team members",i)}}function pc(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let mc=0;async function fc(){if(!T())return;const e=++mc,t=document.getElementById("team-members-list");t&&(t.innerHTML=pc());try{const n=await b.getTeamMembers(T().id);if(e!==mc)return;Nn=n,is(fn,Dn),Zn(),TE()}catch(n){if(e!==mc)return;t&&(t.innerHTML=F({icon:N.team,heading:"Couldn't load members",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-members"},variant:"error"})),Nn=[],rf(),k("load team members",n)}}function ko(){var n;const e=(n=fe())==null?void 0:n.id,t=Nn.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function rf(){const e=document.getElementById("invite-member-btn");e&&e.classList.toggle("hidden",!ko())}function TE(){const e=document.getElementById("team-members-list"),t=ko();rf(),e.innerHTML=Nn.map(n=>`
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
                ${t&&n.user_id!==fe().id&&n.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${f(n.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}let gc=0;async function Eo(){if(!T())return;const e=++gc,t=document.getElementById("team-invitations-list");t&&(t.innerHTML=pc());try{const n=await b.getTeamInvitations(T().id);if(e!==gc)return;cc=n,LE()}catch(n){if(e!==gc)return;if((n==null?void 0:n.status)===403){document.getElementById("team-invitations-list").innerHTML="";return}console.error("Failed to load team invitations:",n),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function LE(){const e=document.getElementById("team-invitations-list");if(cc.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}const t=ko();e.innerHTML=cc.map(n=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${p(n.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${p(n.role)}</span>
                    <span>Expires: ${new Date(n.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            ${t?`<button class="btn btn-secondary btn-small" data-action="issue-invitation-code" data-invitation-id="${f(n.id)}" title="For an invitee whose verification email never arrives">Code for invitee</button>
            <button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${f(n.id)}">Cancel</button>`:""}
        </div>
    `).join("")}let hc=0;async function lf(){if(!T())return;const e=++hc,t=document.getElementById("team-agents-list");t&&(t.innerHTML=pc());try{const n=await b.getTeamAgents(T().id);if(e!==hc)return;dc=n,AE()}catch(n){if(e!==hc)return;t&&(t.innerHTML=F({icon:N.team,heading:"Couldn't load agents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-agents"},variant:"error"})),k("load team agents",n)}}function AE(){const e=document.getElementById("team-agents-list");if(e){if(dc.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=dc.map(t=>{const n=p(t.name),i=p(t.parent_user_name||"Unknown"),s=t.avatar_url||"🤖";return`
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
      `}).join("")}}function cf(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,z()}async function CE(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await b.createInvitation(T().id,t,n);if(await Eo(),i&&i.accept_url)return ME(t,DE(i.accept_url),i.email_queued===!0),!1;H(),$("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){BE(i)?$(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):k("send invitation",i)}return!1}function BE(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function df(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function DE(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!df(n.hostname)||df(i.hostname)?e:i.origin+n.pathname}function ME(e,t,n=!1){var a;const i=p(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${p(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,tt()||z(),(a=document.querySelector('[data-action="copy-invite-link"]'))==null||a.focus(),uf()}function uf(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function jE(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),$("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),$("Could not copy: the link is selected, copy it by hand","error")}}async function RE(e){let t;try{t=await b.issueInvitationVerificationCode(T().id,e)}catch(n){k("get a verification code",n);return}qE(t)}function PE(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let a;return s<3600?a=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?a=`${Math.round(s/3600)} h`:a=`${Math.round(s/86400)} days`,`${a} ${n>=i?"after":"before"} the invitation was created`}function qE(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=PE(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
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
    `,tt()||z(),uf("invitation-code")}async function NE(e){if(confirm("Are you sure you want to remove this member?"))try{await b.removeMember(T().id,e),await fc(),$("Member removed!","success")}catch(t){k("remove member",t)}}async function OE(e){try{await b.deleteInvitation(T().id,e),await Eo(),$("Invitation canceled!","success")}catch(t){k("cancel invitation",t)}}function pf(){of(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,z()}function HE(){T()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${f(T().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${f(T().key)}" disabled class="input-disabled">
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
    `,z())}async function FE(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await b.createTeam(t);await wo(),await $o(n),H(),$("Team created!","success")}catch(n){k("create team",n)}return!1}async function UE(e){if(e.preventDefault(),!T())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await b.updateTeam(T().id,t);Yn(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||"No description"),await wo(),H(),$("Team updated!","success")}catch(n){k("update team",n)}return!1}async function GE(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await b.getLabels(e);if(((n=T())==null?void 0:n.id)!==e)return;es(i)}catch(i){console.error("Failed to load labels:",i),k("load labels",i)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),ie({"select-team":(e,t)=>{$o(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{NE(t.userId)},"delete-invitation":(e,t)=>{OE(t.invitationId)},"issue-invitation-code":(e,t)=>{RE(t.invitationId)},"retry-load-team-invitations":()=>{Eo()},"retry-load-team-members":()=>{fc()},"retry-load-team-agents":()=>{lf()},"invite-member":e=>{CE(e)},"copy-invite-link":()=>{jE()},"dismiss-invite-link":()=>{H()},"create-team":e=>{FE(e)},"update-team":e=>{UE(e)}});let jt=null,Qt=0,Ei=null,_i=null,qs=null,vc=!1;function zE(){return pv()}function mf(){mv()}function ff(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function VE(){jt||(jt=document.createElement("div"),jt.id="onboarding-overlay",jt.className="onboarding-overlay",document.getElementById("app").appendChild(jt))}function Ns(){if(!jt)return;const e=vc?hf():gf(),t=e[Qt],n=e.map((i,s)=>`<span class="onboarding-dot${s===Qt?" active":""}${s<Qt?" completed":""}"></span>`).join("");jt.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function gf(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=ff(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=ff(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Ei&&(e.textContent=`${Ei.name} (${Ei.key})`),t&&_i&&(t.textContent=`${_i.name} (${_i.key})`),n&&qs&&(n.textContent=`${qs.identifier} - ${qs.title}`)}}]}function hf(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function bc(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function yc(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function xi(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function WE(){const e=vc?hf():gf();Qt<e.length-1&&(Qt++,Ns())}function KE(){mf(),bf(),Hn()}function YE(){mf(),bf(),Hn()}async function QE(e){e.preventDefault(),yc("onboarding-team-error"),xi("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Ei=await b.createTeam({name:t,key:n}),Qt++,Ns()}catch(i){bc("onboarding-team-error",i.message||"Failed to create team"),xi("onboarding-team-submit",!1)}}async function ZE(e){e.preventDefault(),yc("onboarding-project-error"),xi("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{_i=await b.createProject(Ei.id,{name:t,key:n}),Qt++,Ns()}catch(i){bc("onboarding-project-error",i.message||"Failed to create project"),xi("onboarding-project-submit",!1)}}async function XE(e){e.preventDefault(),yc("onboarding-issue-error"),xi("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{qs=await b.createIssue(_i.id,{title:t}),Qt++,Ns()}catch(n){bc("onboarding-issue-error",n.message||"Failed to create issue"),xi("onboarding-issue-submit",!1)}}function vf(e=!1){vc=e,Qt=0,Ei=null,_i=null,qs=null,VE(),Ns()}function bf(){jt&&(jt.remove(),jt=null)}function yf(){fv(),vf(!0)}ie({"onboarding-next":e=>{e.preventDefault(),WE()},"onboarding-skip":e=>{e.preventDefault(),KE()},"onboarding-finish":e=>{e.preventDefault(),YE()},"onboarding-create-team":e=>{QE(e)},"onboarding-create-project":e=>{ZE(e)},"onboarding-create-issue":e=>{XE(e)}});const wf="/oauth/consent/";function JE(e){if(!e||!e.startsWith(wf))return null;const t=e.slice(wf.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function e_(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function t_(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function n_(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const $f={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function _o(e){const t=$f[e.trust]||$f.unverified,n=e.host?` · ${p(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${f(e.trust)}">${p(t)}${n}</span>`}function i_(e,t){return e.teams.map(n=>`<option value="${f(n.id)}"${n.id===t?" selected":""}>${p(n.name)}</option>`).join("")}function s_(e,t){const n=e&&t?e.agents.find(a=>a.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${p(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function kf(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",a=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${f(i.id)}"${s}>${p(i.name+a)}</option>`)}return n.join("")}function Ef(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${f(t.id)}">
            ${p(t.name)} <span class="oauth-muted">${p(t.key)}</span>
        </label>`).join("")}function a_(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${f(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${p(t.name)}${p(i)}
        </label>`}).join("")}function o_(e,t){const n=p(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${_o(t.client)}</p>
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
        </div>`}function r_(e,t){if(t.acts_as==="person"){o_(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=p(t.client.name),a=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",o=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${p(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${_o(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${p(t.redirect_host)}</strong></p>
            ${o}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${i_(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${kf(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${f(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${Ef(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${a_(t)}
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,wc(e,t)}function wc(e,t){var a;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const o=(a=e.querySelector("#oauth-team"))==null?void 0:a.value,r=s_(t.teams.find(l=>l.id===o),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function l_(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(o=>o.value),s=e.querySelector('input[name="oauth-policy"]:checked'),a={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const o=e.querySelector("#oauth-agent-name").value.trim();o&&(a.agent_name=o)}return a}function c_(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function Os(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${p(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function d_(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{b.logout(),t()})}function u_(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(u=>u.id===s.value);e.querySelector("#oauth-agent").innerHTML=kf(d,null),e.querySelector("#oauth-projects").innerHTML=Ef(d),wc(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>wc(e,n));let a=!1;const o=async d=>{if(!a){a=!0;try{const u=d?await b.approveOAuthRequest(t,l_(e)):await b.denyOAuthRequest(t);if(!e_(u.redirect)){Os(e,"The app's return address isn't one a browser should be sent to.");return}i(u.redirect)}catch(u){if(a=!1,u&&u.status===404){Os(e,"It has expired, was already answered, or belongs to someone else.");return}c_(e,u&&u.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),o(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>o(!1))}async function p_(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=t_();n_(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await b.getOAuthRequest(e)}catch(a){a&&a.status===404?Os(i,"It has expired, was already answered, or belongs to someone else."):a&&a.status===403&&a.detail&&a.detail.error_code==="web_login_required"?d_(i,n):a&&a.status===403?Os(i,"Only a person signed in to Chaotic can approve an app."):Os(i,a&&a.message||"Something went wrong");return}r_(i,s),u_(i,e,s,t)}const $c="/invite/",Hs="/invite",kc="chaotic.inviteToken",_f="invite-auth-notice";let Ec=null;const m_="This invitation is no longer valid.",f_={owner:"an owner",admin:"an admin",member:"a member"};function g_(e){if(!e||!e.startsWith($c))return null;const t=e.slice($c.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function xf(){const{pathname:e}=window.location,t=g_(e);if(t){Ec=t;try{sessionStorage.setItem(kc,t)}catch{}return history.replaceState(null,"",Hs),t}if(!If(e))return null;let n=null;try{n=sessionStorage.getItem(kc)}catch{}const i=n||Ec;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function If(e){return e===Hs||e===`${Hs}/`}function Sf(e){return If(e)||!!(e&&e.startsWith($c))}function _c(){Ec=null;try{sessionStorage.removeItem(kc)}catch{}}function h_(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function v_(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function xc(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function Tf(){const e=v_();return xo(),xc(e),e}function b_(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),xo()}function xo(){var e;(e=document.getElementById(_f))==null||e.remove()}function Ic(e){const t=e.invited_by_name?`<strong>${p(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=f_[e.role]||`a ${p(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${p(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${p(e.email_hint)}</strong>${y_(e)}</p>`}function y_(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${p(n)}`}const w_="Ask whoever invited you to send a new invitation.",$_="Reload the page to try again.";function Sc(e,t=m_,n=w_){e.innerHTML=`
        <div class="invite-page">
            <h1>${p(t)}</h1>
            <p class="invite-muted">${p(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function k_(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function Lf(){window.location.pathname!==Hs&&history.replaceState(null,"",Hs),k_(Tf())}function E_(e,t){e.innerHTML=`
        <div class="invite-page">
            ${Ic(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function __(e,t,n){const i=h_(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${p(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${Ic(t)}
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
            ${Ic(t)}
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
        </div>`}function x_(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function I_(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),a=e.querySelector("#invite-code-form"),o=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=u=>{l.textContent=u,l.classList.remove("hidden")},d=()=>{var u;a.classList.remove("hidden"),(u=o.focus)==null||u.call(o)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const u=await b.requestEmailVerification(),m=x_(u.expires_at);c(`We sent a code to ${u.email}${m?`; it works until ${m}`:""}.`),s.textContent="Send a new code",d()}catch(u){const m=u&&u.detail&&u.detail.error_code;if(u&&u.status===401){n();return}if(m==="email_already_verified"){t();return}c(u&&u.message||"Something went wrong"),u&&u.status===429&&d()}finally{s.disabled=!1}}}),a.addEventListener("submit",async u=>{var g;if(u.preventDefault(),r.disabled)return;const m=o.value.trim();if(m){r.disabled=!0;try{await b.confirmEmailVerification(m)}catch(v){r.disabled=!1;const y=v&&v.detail&&v.detail.error_code;v&&v.status===401?n():y==="email_already_verified"?t():(c(v&&v.message||"Something went wrong"),(g=o.select)==null||g.call(o));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function S_(e,t){xo();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=_f,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${p(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${p(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),xo(),t()})}function Io(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function T_(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,u;const a=Tf();a.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let o;try{o=await b.getInvitation(e)}catch(m){m&&m.status===404?(_c(),Sc(a)):Sc(a,m&&m.message||"Something went wrong.",$_);return}if(!t){E_(a,o);const m=g=>{S_(o,()=>xc(a)),n(g)};a.querySelector("#invite-sign-in").addEventListener("click",()=>m("login")),a.querySelector("#invite-sign-up").addEventListener("click",()=>m("signup"));return}__(a,o,t),(d=a.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=a.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async m=>{var v,y;if(l)return;l=!0,r.disabled=!0;let g;try{g=m===void 0?await b.acceptInvitation(e):await b.acceptInvitation(e,m)}catch(w){l=!1,r.disabled=!1;const S=w&&w.detail&&w.detail.error_code;if(m!==void 0&&(S==="invalid_verification_code"||S==="invitation_code_expired"||w&&w.status===429)){Io(a,w&&w.message||"That code did not work."),(y=(v=a.querySelector("#invite-admin-code"))==null?void 0:v.select)==null||y.call(v);return}w&&w.status===401?s():w&&(w.status===404||w.status===400)?(_c(),Sc(a)):w&&w.status===403&&w.detail&&w.detail.error_code==="email_unverified"?(Io(a,"Verify your email address to continue."),a.querySelector("#invite-accept-actions").classList.add("hidden"),a.querySelector("#invite-verify").classList.remove("hidden")):w&&w.status===403?Io(a,`This invitation is for a different email address. Only ${o.email_hint} can accept it.`):Io(a,w&&w.message||"Something went wrong");return}_c(),Af(a,o);try{await i(g.team_id,o.team_name)}catch(w){console.error("Joined the team but could not open it:",w),xc(a),Af(a,o)}};r.addEventListener("click",()=>c()),(u=a.querySelector("#invite-admin-code-form"))==null||u.addEventListener("submit",m=>{m.preventDefault();const g=a.querySelector("#invite-admin-code").value.trim();g&&c(g)}),I_(a,{onVerified:()=>{a.querySelector("#invite-verify").classList.add("hidden"),a.querySelector("#invite-error").classList.add("hidden"),a.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function Af(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${p(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${p(t.team_name)}</a>
            </div>
        </div>`}function Tc(e){return T_(e,{user:fe(),showAuth:t=>{Gs(),t==="signup"?jf():Mf()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),b_(),await Hn({teamId:t}),$(`You joined ${n}`,"success")},signOut:()=>{b.logout(),It(null),Yn(null),Tc(e)}})}async function Cf(){const e=xf();if(e){await Tc(e);return}if(Sf(window.location.pathname)){Lf();return}Gs()}async function Hn({teamId:e,teamsRequest:t=null,snapshot:n=null}={}){var r,l;const i=JE(window.location.pathname);if(i){await p_(i);return}const s=xf();if(s){await Tc(s);return}if(Sf(window.location.pathname)){Lf();return}R_(),Fm(),So(),D_();const a=!e&&((l=(r=n==null?void 0:n.teams)==null?void 0:r.find)==null?void 0:l.call(r,c=>c.id===n.teamId));if(a){await L_(n,a,t);return}await wo(t);const o=uc();if(o.length===0&&!zE()){vf();return}o.length===0&&Xi("my-issues");try{if(o.length>0){const c=e&&o.find(d=>d.id===e)||o[0];await $o(c,!0)}}finally{zm()}}async function L_(e,t,n){nf(e.teams);try{await $o(t,!0,{seed:e})}finally{zm()}Promise.resolve(n||wo().then(uc)).then(async i=>{var a;if(!Array.isArray(i))return;nf(i);const s=i.find(o=>o.id===t.id);if(!s){await C_(),window.location.reload();return}if(((a=T())==null?void 0:a.id)===s.id&&s.name!==T().name){Yn(s);const o=document.getElementById("current-team-name");o&&(o.textContent=s.name)}},i=>console.error("Failed to refresh teams:",i))}const A_=2e3;let Ii=null,Bf=!1,Df=!1;function C_(){return Df=!0,clearTimeout(Ii),Ii=null,_r()}function Lc(){if(clearTimeout(Ii),Ii=null,Df)return Promise.resolve();const e=fe(),t=T();return!(e!=null&&e.id)||!(t!=null&&t.id)||lu(wr())!==e.id||EE()!==t.id?Promise.resolve():Lv(e.id,{user:e,teams:uc(),teamId:t.id,projects:J(),labels:Lr(),members:fn(),agents:Dn(),issues:ob({maxQueries:3})})}function B_(){clearTimeout(Ii),Ii=setTimeout(Lc,A_)}function D_(){Bf||(Bf=!0,eb(B_),document.addEventListener("visibilitychange",M_),window.addEventListener("pagehide",j_))}function M_(){document.visibilityState==="hidden"&&Lc()}function j_(){Lc()}let Si=null,Fs=null,wt=null,$t=null;function Us(){Si||(Si=document.getElementById("auth-screen"),Fs=document.getElementById("main-screen"),wt=document.getElementById("login-form"),$t=document.getElementById("signup-form"))}function Gs(){Us(),Si&&Si.classList.remove("hidden"),Fs&&Fs.classList.add("hidden")}function R_(){Us(),Si&&Si.classList.add("hidden"),Fs&&Fs.classList.remove("hidden")}function Mf(){Us(),wt&&wt.classList.remove("hidden"),$t&&$t.classList.add("hidden")}function jf(){Us(),wt&&wt.classList.add("hidden"),$t&&$t.classList.remove("hidden")}async function P_(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await b.login(t,n),It(await b.getMe()),await Hn(),$("Welcome back!","success")}catch(i){k("log in",i)}return!1}async function q_(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await b.signup(t,n,i),await b.login(n,i),It(await b.getMe()),await Hn(),$("Account created successfully!","success")}catch(s){k("sign up",s)}return!1}function Rf(){b.logout(),It(null),Yn(null),Gs(),$("Signed out","success")}function N_(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||/^\/api\/avatars\/[0-9a-f]{64}$/.test(e))}function So(){var i;const e=fe();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",uu(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?N_(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${f(s)}" alt="${f(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function O_(){Us();const e=wt==null?void 0:wt.querySelector("form");e&&e.addEventListener("submit",s=>P_(s));const t=$t==null?void 0:$t.querySelector("form");t&&t.addEventListener("submit",s=>q_(s));const n=wt==null?void 0:wt.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),jf()});const i=$t==null?void 0:$t.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),Mf()})}let Ac=[];async function Cc(){try{Ac=await b.getApiKeys(),H_()}catch(e){k("load API keys",e)}}function H_(){const e=document.getElementById("api-keys-list");if(e){if(Ac.length===0){e.innerHTML=F({icon:N.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=Ac.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${p(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${p(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${nt(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${nt(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${f(t.id)}" data-key-name="${f(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function F_(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,z()}async function U_(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await b.createApiKey(t);H(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,z()}catch(n){k("create API key",n)}return!1}async function G_(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),$("API key copied to clipboard","success")}catch{$("Failed to copy","error")}}async function z_(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await b.revokeApiKey(e),$("API key revoked","success"),await Cc()}catch(n){k("revoke API key",n)}}ie({"create-api-key":e=>{U_(e)},"copy-api-key":()=>{G_()},"dismiss-api-key-modal":()=>{H(),Cc()},"revoke-api-key":(e,t)=>{z_(t.keyId,t.keyName)}});let Bc=[];async function Pf(){try{Bc=await b.getConnections(),W_()}catch(e){k("load connected apps",e)}}function Dc(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function V_(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function W_(){const e=document.getElementById("connected-apps-list");if(e){if(Bc.length===0){e.innerHTML=F({icon:N.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=Bc.map(t=>t.acts_as==="person"?K_(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${p(Dc(t))} ${_o(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${p(t.agent?t.agent.name:"an agent")}</span>
                    <span>${p(V_(t))}</span>
                    <span>policy ${p(t.policy)}</span>
                    <span class="api-key-date">Connected ${nt(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${nt(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${p(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${f(t.id)}" data-connection-name="${f(Dc(t))}">Disconnect</button>
        </div>
    `).join("")}}function K_(e){const n=`${e.device_name||"A device"} · ${Dc(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${p(n)} ${_o(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${nt(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${nt(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${f(e.id)}" data-connection-name="${f(n)}">Sign out</button>
        </div>
    `}async function Y_(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await b.revokeConnection(e),$("App disconnected","success"),await Pf()}catch(n){k("disconnect app",n)}}ie({"revoke-connection":(e,t)=>{Y_(t.connectionId,t.connectionName)}});let Mc=[];async function qf(){try{Mc=await b.getPushDevices(),Q_()}catch(e){k("load push devices",e)}}const Nf={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function Of(e){return e.label||e.platform||"Unnamed device"}function Q_(){const e=document.getElementById("push-devices-list");if(e){if(Mc.length===0){e.innerHTML=F({icon:N.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=Mc.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${p(Of(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${p(t.platform)}</span>`:""}
                    <span>via ${p(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${nt(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${nt(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${p(String(t.failure_count))} failed deliveries</span>`:""}
                    ${Nf[t.status]?`<span class="push-device-status">${p(Nf[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${f(t.installation_id)}" data-device-name="${f(Of(t))}">Remove</button>
        </div>
    `).join("")}}async function Z_(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await b.deletePushDevice(e),$("Device removed","success"),await qf()}catch(n){k("remove push device",n)}}ie({"remove-push-device":(e,t)=>{Z_(t.installationId,t.deviceName)}});let To=!1,Zt=0,gn=[],Lo=[];function X_(e){Lo=e,gn=[...e]}function hn(){return To}function J_(){if(To)return;To=!0,Zt=0,gn=[...Lo];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Ao()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>ex(n.target.value)),t.addEventListener("keydown",nx),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&tx(Number(i.dataset.commandIndex))}),zs(),requestAnimationFrame(()=>t.focus())}function Ao(){To=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function ex(e){const t=e.toLowerCase().trim();t?gn=Lo.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):gn=[...Lo],Zt=0,zs()}function zs(){const e=document.getElementById("command-results");if(!e)return;if(gn.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};gn.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===Zt?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function tx(e){Zt=e,zs()}function Hf(e){const t=gn[e];t&&(Ao(),t.action())}function nx(e){switch(e.key){case"ArrowDown":e.preventDefault(),Zt=Math.min(Zt+1,gn.length-1),zs();break;case"ArrowUp":e.preventDefault(),Zt=Math.max(Zt-1,0),zs();break;case"Enter":e.preventDefault(),Hf(Zt);break;case"Escape":e.preventDefault(),Ao();break}}ie({"execute-command":(e,t)=>{Hf(Number(t.commandIndex))}});const ix=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function sx(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${p(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${p(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function ax(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${p(e.title)}</h4>
        ${e.shortcuts.map(sx).join("")}
    </div>`}function Ff(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${ix.map(ax).join("")}
        </div>
    `,z()}const Co=100,jc="status!=done,canceled",ox=["created","updated","priority","status","title","estimate"];function ke(e){return e==null?"":p(String(e))}function Uf(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${f(t)}">${ke(n)}</a>`}function Gf(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const Rc=[{id:"identifier",label:"ID",fixed:!0,render:e=>Uf(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>Uf(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>ke(Ie(e.status))},{id:"priority",label:"Priority",render:e=>ke(Te(e.priority))},{id:"type",label:"Type",render:e=>ke(rt(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>ke(Gf(e,"assignee"))},{id:"creator",label:"Creator",render:e=>ke(Gf(e,"creator"))},{id:"project",label:"Project",render:e=>ke(e.project_key)},{id:"sprint",label:"Sprint",render:e=>ke(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=te(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${ke(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>ke(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${f(e.parent_id)}">${ke(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>ke(nt(e.created_at))},{id:"updated",label:"Updated",render:e=>ke(nt(e.updated_at))},{id:"completed",label:"Completed",render:e=>ke(nt(e.completed_at))},{id:"due",label:"Due",render:e=>ke(nt(e.due_date))}],Bo=Object.fromEntries(Rc.map(e=>[e.id,e])),rx=Rc.filter(e=>e.fixed).map(e=>e.id),Pc=["identifier","title","status","priority","assignee","updated"];function qc(e){const t=new Set,n=[];for(const s of e||[]){const a=String(s).trim();!Bo[a]||t.has(a)||(t.add(a),n.push(a))}return n.length===0?[...Pc]:[...rx.filter(s=>!t.has(s)),...n]}function lx(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function cx(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?qc(t.get("cols").split(",")):[...Pc],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function dx(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!lx(e.cols,Pc)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function ux(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function px({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=Co,skip:a=0}){const o=["chaotic","issue","list"];let r=e||"",l=null;n||i?(o.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",o.push("--where",ux(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],u=d.startsWith("-"),m=d.replace(/^[-+]/,"");let g=null;ox.includes(m)?(o.push("--sort",m,"--order",u?"desc":"asc"),c.length>1&&(g=`The CLI sorts by one field; only "${d}" was copied.`)):g=`The CLI cannot sort by "${m}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return o.push("--limit",String(s)),a>0&&o.push("--skip",String(a)),{command:o.join(" "),warning:l}}function mx(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function fx(e,t){const n=qc(t).map(a=>Bo[a]),i=n.map(a=>`<th data-col="${f(a.id)}">${ke(a.label)}</th>`).join(""),s=e.map(a=>`<tr class="query-row" data-issue-id="${f(a.id)}">${n.map(o=>`<td class="query-col-${f(o.id)}">${o.render(a)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function gx(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,a=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${a?"":" disabled"}>Next</button>`}let O=null,Nc=null,Je=null,Oc=0,Ti=!1,zf=!1;function re(e){return document.getElementById(e)}function Vf(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function Wf(e){const t=dx({...Nc,cols:O.cols,group:O.group,view:O.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function hx(){const e=re("query-project-filter");if(!e)return;const t=['<option value="">All projects</option>'].concat(J().map(n=>`<option value="${f(n.id)}">${ke(n.name)}</option>`));e.innerHTML=t.join(""),e.value=O.teamScope?"":O.projectId||""}function vx(){const e=re("query-columns-menu");e&&(e.innerHTML=Rc.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${f(t.id)}"${O.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${ke(t.label)}
        </label>`).join(""))}function Do(e){const t=re("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${ke(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function Kf(e){const t=re("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function Hc(e){var t;(t=re("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function Vs(){const e=re("query-results"),t=re("query-pager");if(!e)return;if(!Je){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=Je;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=fx(n,O.cols),t&&(t.innerHTML=gx(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(a=>{a.dataset.enabled=String(!a.disabled)}),Ti&&Hc(!0))}async function Mo(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!O)return;const i=T(),s=O.teamScope?{teamId:i==null?void 0:i.id}:{projectId:O.projectId};if(!s.teamId&&!s.projectId){Je=null,Vs(),Do(O.teamScope?"Select a team first.":"Select a project.");return}const a=++Oc,o=O.where===null?jc:O.where,r=re("query-results");Ti=!0,r&&r.classList.add("loading"),Hc(!0);const l=()=>a===Oc&&A()==="query";try{const c=await b.queryIssues({...s,where:o,order:O.order,skip:(O.page-1)*Co,limit:Co});if(!l())return;O.where=c.where,O.order=c.order||null,Nc=Vf(O),Je={issues:c.issues||[],total:c.total,skip:c.skip};const d=re("query-where");d&&d.value.trim()===o.trim()&&(d.value=c.where),Do(null),Ti=!1,Vs(),Wf(e),t&&t()}catch(c){if(!l())return;Ti=!1,n?n():Je=null,Vs(),Do(mx(c))}finally{a===Oc&&(Ti=!1,r&&r.classList.remove("loading"),Hc(!1))}}function Yf(){if(!O)return;const e=re("query-where");return O.where=e?e.value.trim():"",O.page=1,Mo("push")}function bx(e){if(O)return O.teamScope=!e,e&&(O.projectId=e),O.page=1,Kf(null),Mo("push",{onSuccess:()=>{e&&ct(e)}})}function yx(e,t){if(!O||!Bo[e]||Bo[e].fixed)return;const n=O.cols.filter(i=>i!==e);O.cols=qc(t?[...n,e]:n),Vs(),Wf("replace")}function wx(e){if(!O||!Je||Ti)return;const t=O.page+e;if(t<1||e>0&&Je.skip+Je.issues.length>=Je.total)return;const n={page:O.page,result:Je};return O.page=t,Mo("push",{onFailure:()=>{O.page=n.page,Je=n.result}})}async function $x(){if(!O)return null;const e=re("query-where"),t=e?e.value.trim():O.where??jc,n=O.teamScope?null:J().find(o=>o.id===O.projectId),{command:i,warning:s}=px({where:t,order:O.order,teamScope:O.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:Co,skip:Je?Je.skip:0}),a=re("query-cli-preview");try{await navigator.clipboard.writeText(i),$(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),a&&a.classList.add("hidden")}catch{a&&(a.textContent=i,a.classList.remove("hidden")),$("Could not copy; the command is shown below the box","warning")}return i}function kx(){var e,t,n,i,s,a,o;zf||(zf=!0,(e=re("query-where"))==null||e.addEventListener("keydown",r=>{r.key==="Enter"&&!r.shiftKey&&!r.isComposing&&(r.preventDefault(),Yf())}),(t=re("query-run-btn"))==null||t.addEventListener("click",()=>Yf()),(n=re("query-copy-cli-btn"))==null||n.addEventListener("click",()=>$x()),(i=re("query-project-filter"))==null||i.addEventListener("change",r=>bx(r.target.value)),(s=re("query-columns-btn"))==null||s.addEventListener("click",r=>{r.stopPropagation();const l=re("query-columns-menu");if(!l)return;const c=l.classList.toggle("hidden")===!1;r.currentTarget.setAttribute("aria-expanded",String(c))}),(a=re("query-columns-menu"))==null||a.addEventListener("change",r=>{r.target.matches('input[type="checkbox"]')&&yx(r.target.value,r.target.checked)}),(o=re("query-pager"))==null||o.addEventListener("click",r=>{const l=r.target.closest("button[data-query-page]");!l||l.disabled||wx(Number(l.dataset.queryPage))}),document.addEventListener("click",r=>{var c;const l=re("query-columns-menu");l&&!l.classList.contains("hidden")&&!r.target.closest("#query-columns-picker")&&(l.classList.add("hidden"),(c=re("query-columns-btn"))==null||c.setAttribute("aria-expanded","false"))}))}function Ex(){var s,a;kx();const e=cx(window.location.search),t=J();let n=null;if(!e.teamScope){const o=r=>r&&t.some(l=>l.id===r);if(!o(e.projectId)){const r=e.projectId;e.projectId=o(K())?K():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}O=e,Nc=Vf(O),Je=null;const i=re("query-where");return i&&(i.value=O.where===null?jc:O.where),(s=re("query-cli-preview"))==null||s.classList.add("hidden"),(a=re("query-columns-menu"))==null||a.classList.add("hidden"),hx(),vx(),Do(null),Kf(n),Vs(),Mo("replace")}let jo=[];function _x(){return jo}lt(e=>{e==="currentProject"&&A()==="epics"&&vn()});let Fc=0;const Ws=new Set(["done","canceled"]);let Ro=!1;async function vn({fromMemory:e=!1}={}){var a;Ar(-1);const t=document.getElementById("epics-list");if(!t)return;const n=++Fc,i=rl(),s=e?za("epics",i):void 0;s?Qf(s,t):t.innerHTML=Array(4).fill(0).map(()=>`
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
        `).join("");try{if(!((a=T())!=null&&a.id)){jo=[],t.innerHTML=F({icon:N.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const o=K(),r=o?await b.getProjectEpicProgress(o):await b.getTeamEpicProgress(T().id);if(n!==Fc||(pi("epics",i,r),s&&Va(s,r)))return;Qf(r,t)}catch(o){if(n!==Fc)return;t.innerHTML=F({icon:N.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),k("load epics",o)}}function Qf(e,t){var n;if(!((n=e==null?void 0:e.epics)!=null&&n.length)){jo=[],t.innerHTML=F({icon:N.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}tg(e,t)}function Uc(e,t){return`${e} ${t}${e===1?"":"s"}`}function Zf(e,t){return t<=0?"-":e>=t?"100%":`${Math.floor(e/t*100)}%`}function xx(e){const t=e.children||{},n=(t.total||0)-(t.canceled||0);if(n<=0)return'<span class="epic-progress-text">No tickets</span>';const i=Math.round((t.done||0)/n*100),s=Math.round(((t.in_progress||0)+(t.in_review||0))/n*100),a=t.done===n,o=`${t.done||0} done, ${(t.in_progress||0)+(t.in_review||0)} in progress, ${(t.todo||0)+(t.backlog||0)} not started`+(t.canceled?`, ${t.canceled} canceled`:"");return`
        <div class="epic-progress-bar-container" title="${f(o)}">
            <div class="epic-progress-bar">
                <div class="epic-progress-fill${a?" epic-progress-complete":""}" style="width: ${i}%"></div>
                <div class="epic-progress-active" style="width: ${Math.min(s,100-i)}%"></div>
            </div>
            <span class="epic-progress-pct" title="Tickets done">${Zf(t.done||0,n)}</span>
            <span class="epic-progress-text">${t.done||0}/${n}</span>
        </div>
    `}function Xf(e){if(!e||e.length===0)return'<span class="text-muted">-</span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,a=`${i.name}${i.status==="active"?" (current)":""}: ${Uc(i.closed||0,"ticket")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${f(a)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}function Jf(e,t){return e?`<span class="epic-this-sprint">+${e} <span class="text-muted">(${t} pts)</span></span>`:'<span class="text-muted">-</span>'}function Ix(e){const t=e.status_pinned&&!Ws.has(e.status)?' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its tickets">✎<span class="sr-only"> (status set by hand)</span></span>':"",n=e.status==="canceled"?' <span class="epic-canceled-tag">Canceled</span>':"",i=(e.points_total||0)>0?`${e.points_done||0}/${e.points_total} pts`:"-",s=Ks(e)<=0;return`
        <tr class="epic-row${Ws.has(e.status)?" epic-row-closed":""}${s?" epic-row-empty":""}" data-identifier="${f(e.identifier)}">
            <td class="epic-identifier">${p(e.identifier)}</td>
            <td class="epic-title">${p(e.title)}${t}${n}</td>
            <td class="epic-progress">${xx(e)}</td>
            <td class="epic-points">${i}</td>
            <td class="epic-sprint">${Jf(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${Xf(e.sprints)}</td>
        </tr>
    `}function Sx(e){return!e||!e.open&&!e.closed_this_sprint&&!(e.sprints||[]).some(t=>t.closed)?"":`
        <tr class="epic-untracked-row">
            <td class="epic-identifier">${p(e.project_key)}</td>
            <td class="epic-title text-muted">No epic</td>
            <td class="epic-progress"><span class="epic-progress-text">${Uc(e.open||0,"open ticket")}</span></td>
            <td class="epic-points"></td>
            <td class="epic-sprint">${Jf(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${Xf(e.sprints)}</td>
        </tr>
    `}function Ks(e){const t=e.children||{};return(t.total||0)-(t.canceled||0)}function eg(e){var n;const t=Ks(e);return t>0?(((n=e.children)==null?void 0:n.done)||0)/t:0}const Gc=[{key:"active",label:"In progress",statuses:["in_progress","in_review"]},{key:"todo",label:"Todo",statuses:["todo"]},{key:"backlog",label:"Backlog",statuses:["backlog"]},{key:"closed",label:"Closed",statuses:["done","canceled"]}];function Tx(e){const t=e.status||"backlog";return Gc.find(n=>n.statuses.includes(t))||Gc[2]}function Lx(e,t){const n=Ks(e)<=0,i=Ks(t)<=0;if(n!==i)return n?1:-1;const s=(t.points_this_sprint||0)-(e.points_this_sprint||0);if(s)return s;const a=(t.closed_this_sprint||0)-(e.closed_this_sprint||0);return a||eg(t)-eg(e)}function Ax(e){return Gc.map(t=>({group:t,epics:e.filter(n=>Tx(n)===t).sort(Lx)})).filter(t=>t.epics.length)}function Cx(e,t){const n=e.filter(u=>!Ws.has(u.status)),i=n.filter(u=>(u.closed_this_sprint||0)>0).length,s=n.reduce((u,m)=>{var g;return u+(((g=m.children)==null?void 0:g.done)||0)},0),a=n.reduce((u,m)=>u+Ks(m),0),o=[...e,...t],r=o.reduce((u,m)=>u+(m.closed_this_sprint||0),0),l=o.reduce((u,m)=>u+(m.points_this_sprint||0),0),c=t.reduce((u,m)=>u+(m.open||0),0);if(!n.length&&!r&&!c)return"";const d=(u,m,g="")=>`
        <div class="epic-stat${g}">
            <div class="epic-stat-value">${u}</div>
            <div class="epic-stat-label">${m}</div>
        </div>`;return`
        <div class="epic-summary" role="group" aria-label="Progress summary">
            ${n.length?d(`${i}<span class="epic-stat-of"> / ${n.length}</span>`,"open epics moved this sprint"):""}
            ${n.length?d(Zf(s,a),a?`of their tickets done (${s}/${a})`:"no tickets yet"):""}
            ${d(r?`+${r}`:"0",`${r===1?"ticket":"tickets"} closed this sprint (${l} pts)`,r?" epic-stat-up":"")}
            ${c?d(String(c),`open ${c===1?"ticket":"tickets"} under no epic`," epic-stat-warn"):""}
        </div>`}const zc=6;function tg(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=n.filter(m=>Ws.has(m.status)).length,a=Ro?n:n.filter(m=>!Ws.has(m.status)),o=[...new Set([...n.map(m=>m.project_key),...i.map(m=>m.project_key)])],r=o.length>1,l=[],c=o.map(m=>{const v=Ax(a.filter(S=>S.project_key===m)).map(({group:S,epics:_})=>(l.push(..._),`<tr class="epic-state-row epic-state-${S.key}"><th colspan="${zc}" scope="colgroup"><span class="epic-state-dot" aria-hidden="true"></span>${S.label}<span class="epic-state-count">${_.length}</span></th></tr>`+_.map(Ix).join(""))).join(""),y=Sx(i.find(S=>S.project_key===m));return!v&&!y?"":(r?`<tr class="epic-group-row"><th colspan="${zc}" scope="colgroup">${p(m)}</th></tr>`:"")+v+y}).join("");jo=l;const d=!c.trim()&&s>0?`<tr class="epic-empty-row"><td colspan="${zc}" class="text-muted">Every epic here is closed.</td></tr>`:"",u=s>0?`<button class="btn btn-secondary btn-small epic-closed-toggle" data-epics-toggle-closed>${Ro?"Hide":"Show"} ${Uc(s,"closed epic")}</button>`:"";t.innerHTML=`
        ${Cx(n,i)}
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
    `,t._epicProgress=e,t._epicClickHandler||(t._epicClickHandler=m=>{if(m.target.closest("[data-epics-toggle-closed]")){Ro=!Ro,Ar(-1),tg(t._epicProgress,t);return}const g=m.target.closest(".epic-row");g&&g.dataset.identifier&&Um(g.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function Bx(){const e=K(),t=J().map(n=>`
        <option value="${f(n.id)}" ${n.id===e?"selected":""}>${p(n.name)}</option>
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
    `,z(),document.getElementById("create-epic-form").addEventListener("submit",Dx),document.getElementById("create-epic-title").focus()}async function Dx(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}try{const s=await b.createIssue(t,{title:n,description:i||null,issue_type:"epic"});H(),$(`Created epic ${s.identifier}`,"success"),vn()}catch(s){k("create epic",s)}}async function ng(e){try{let t;if(e.includes("-")?t=await b.getIssueByIdentifier(e):t=await b.getIssue(e),t){if(t.issue_type!=="epic"){ae(t.id,!1);return}await Po(t.id,!1)}else q("epics",!1)}catch{q("epics",!1)}}async function Po(e,t=!0){var n;try{t&&pn();const[i,s,a,o]=await Promise.all([b.getIssue(e),b.getSubIssues(e),b.getActivities(e),b.getComments(e)]);if(i.issue_type!=="epic"){ae(e,t);return}t&&history.pushState({epicId:e,view:A()},"",`/epic/${i.identifier}`),document.querySelectorAll(".view").forEach(E=>E.classList.add("hidden"));const r=document.getElementById("epic-detail-view");r.classList.remove("hidden");const l=A()||"epics",c=J().find(E=>E.id===i.project_id),d=i.assignee_id?yt(i.assignee_id):null,u=d?dt(d):null,m=_x(),g=(n=m.find(E=>E.id===i.id))==null?void 0:n.children,v=g?(g.total||0)-(g.canceled||0):s.filter(E=>E.status!=="canceled").length,y=g?g.done||0:s.filter(E=>E.status==="done").length,w=v>0?Math.round(y/v*100):0,S=m.findIndex(E=>E.id===i.id),_=S>0?m[S-1]:null,D=S>=0&&S<m.length-1?m[S+1]:null,M=S>=0;r.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${f(l)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${M?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${_?`data-action="navigate-epic" data-epic-id="${f(_.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${S+1} / ${m.length}</span>
                            <button class="issue-nav-btn" ${D?`data-action="navigate-epic" data-epic-id="${f(D.id)}"`:"disabled"} title="Next epic">
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
                            ${Cn(i.description)}
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
                            ${s.length===0?F({icon:N.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(E=>{const P=E.assignee_id?yt(E.assignee_id):null,U=P?dt(P):null;return`
                                <div class="sub-issue-item" data-issue-id="${f(E.id)}" data-identifier="${f(E.identifier)}">
                                    <span class="sub-issue-status">${Ke(E.status)}</span>
                                    <span class="sub-issue-id">${p(E.identifier)}</span>
                                    <span class="sub-issue-title">${p(E.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(E.status||"backlog").replace(/_/g,"-")}">${Ie(E.status)}</span>
                                    ${U?`<span class="sub-issue-assignee">${p(U)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${a.length===0?F({icon:N.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):a.map(E=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${im(E.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Il(E)}</span>
                                        <span class="activity-actor">by ${p(_l(E))}</span>
                                        <span class="activity-time">${ot(E.created_at)}</span>
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
                                            <span class="comment-date">${ot(E.created_at)}</span>
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
                                ${Ke(i.status)}
                                ${Ie(i.status)}
                            </span>
                        </div>
                        ${i.status_pinned&&!["done","canceled"].includes(i.status)?`
                        <div class="property-row epic-status-pinned">
                            <span class="property-label"></span>
                            <span class="property-value-static">
                                <span class="text-muted" title="Set by hand, so it no longer follows its sub-issues">Set by hand</span>
                                <button class="btn btn-secondary btn-small" data-action="epic-follow-children" data-epic-id="${f(i.id)}">Follow sub-issues</button>
                            </span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${pt(i.priority)}
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
                                ${un(i.estimate,i.project_id)}
                            </span>
                        </div>

                        ${i.labels&&i.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${i.labels.map(E=>`
                                    <span class="issue-label" style="background: ${te(E.color)}20; color: ${te(E.color)}">${p(E.name)}</span>
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
        `;const ne=r.querySelector(".sub-issues-list");ne&&ne.addEventListener("click",E=>{const P=E.target.closest(".sub-issue-item");P&&P.dataset.issueId&&ae(P.dataset.issueId)})}catch(i){k("load epic",i)}}ie({"navigate-epic":(e,t)=>{Po(t.epicId)},"epic-follow-children":async(e,t)=>{try{await b.updateIssue(t.epicId,{status_follows_children:!0}),$("Status now follows sub-issues"),await Po(t.epicId,!1)}catch(n){k("update epic",n)}}});function Mx(e){let t=!1,n=null;return function(s){var o,r,l,c,d,u,m;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((u=e.isDetailViewActive)!=null&&u.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((m=e.isDetailViewActive)!=null&&m.call(e))break;s.preventDefault(),e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function jx(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function Xt(e,t,n=$a){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function ig(){const e=document.querySelector(".main-content");e&&(e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1"),e.focus({preventScroll:!0}))}function Ys(e){var n,i;return(i=(n=e.target).closest)!=null&&i.call(n,".sidebar-nav")?!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.key==="j"||e.key==="k")?(ig(),!1):!0:!1}function Rx(e){const t=$a;function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const l=n(a);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,o,c,d)}return function(a){var l,c,d,u,m;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||Ys(a)||(a.key==="Enter"||a.key===" ")&&((d=(c=a.target).closest)!=null&&d.call(c,".issue-group-header"))||e.isModalOpen()||e.isCommandPaletteOpen()||(u=e.isInlineDropdownOpen)!=null&&u.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(a.key)&&((m=e.beforeNavigate)==null||m.call(e));const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Xt(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),Xt(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Px(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||Ys(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Xt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Xt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Fn(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function qx(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,u,m;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||Ys(i)||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex(),o=g=>{var y,w,S,_;const v=!!((w=(y=document.activeElement)==null?void 0:y.closest)!=null&&w.call(y,"#inbox-list"));if((S=e.collapseInboxExpand)==null||S.call(e),Xt(a+g,e.setSelectedIndex,t),v){const D=document.querySelector(`${t}.keyboard-selected`);(_=(D==null?void 0:D.querySelector(".inbox-row-toggle"))||D)==null||_.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),o(1);break;case"k":case"ArrowUp":i.preventDefault(),o(-1);break;case"Enter":if((d=(c=i.target).closest)!=null&&d.call(c,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;a>=0&&s[a]&&(i.preventDefault(),e.toggleInboxExpand(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":if((u=e.isEscapeLayerAbove)!=null&&u.call(e))break;if((m=e.collapseInboxExpand)!=null&&m.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}a>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Nx(e){const t="#kanban-board .kanban-card";return function(i){var o;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||Ys(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Xt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Xt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.id;r&&e.viewIssue(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Ox(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function Vc(e){const{view:t,selector:n,open:i}=e;return function(a){var l,c,d,u;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||Ys(a)||e.isModalOpen()||e.isCommandPaletteOpen()||(c=e.isInlineDropdownOpen)!=null&&c.call(e))return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Xt(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),Xt(r-1,e.setSelectedIndex,n);break;case"Enter":if((u=(d=a.target).closest)!=null&&u.call(d,'button, a[href], [role="button"]'))break;r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(m=>m.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const Hx=7,Wc=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value"),sg=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex"),Fx='<svg class="picker-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',Ux='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';let ag=!1;function Gx(){ag||(ag=!0,Object.defineProperty(HTMLSelectElement.prototype,"value",{...Wc,set(e){var t;Wc.set.call(this,e),(t=this._picker)==null||t.sync()}}),Object.defineProperty(HTMLSelectElement.prototype,"selectedIndex",{...sg,set(e){var t;sg.set.call(this,e),(t=this._picker)==null||t.sync()}}))}let Ce=null,zx=0;function og({restoreFocus:e=!0}={}){return Ce?(Ce.close(e),!0):!1}function Vx(e=document){e.querySelectorAll("select[data-picker]").forEach(Wx)}function Wx(e){var i;if(!e||e._picker)return((i=e==null?void 0:e._picker)==null?void 0:i.button)||null;const t=document.createElement("button");t.type="button",t.className="picker-btn",t.setAttribute("aria-haspopup","listbox"),t.setAttribute("aria-expanded","false"),e.id&&(t.dataset.pickerFor=e.id),t.innerHTML=`<span class="picker-label"></span>${Fx}`,e.classList.add("picker-native"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,e.insertAdjacentElement("afterend",t);const n=()=>{rg(e,t),(Ce==null?void 0:Ce.select)===e&&Ce.refresh()};return e._picker={button:t,sync:n},Gx(),e.addEventListener("change",n),typeof MutationObserver<"u"&&new MutationObserver(n).observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["disabled","selected","hidden"]}),t.addEventListener("click",s=>{s.preventDefault(),(Ce==null?void 0:Ce.select)===e?og():cg(e,t)}),t.addEventListener("keydown",s=>{s.metaKey||s.ctrlKey||s.altKey||(["ArrowDown","ArrowUp","Enter"," "].includes(s.key)?(s.preventDefault(),s.stopPropagation(),(Ce==null?void 0:Ce.select)!==e&&cg(e,t)):s.key.length===1&&s.stopPropagation())}),n(),t}function rg(e,t){const n=e.options[e.selectedIndex],i=n?n.textContent.trim():"";t.querySelector(".picker-label").textContent=i,t.disabled=e.disabled,t.title=i;const s=e.getAttribute("aria-label");s&&t.setAttribute("aria-label",i?`${s}: ${i}`:s)}function lg(e){return[...e.options].filter(t=>!t.hidden).map(t=>({value:t.value,text:t.textContent.trim(),disabled:t.disabled}))}function cg(e,t){og({restoreFocus:!1});const n=lg(e),i=`picker-list-${++zx}`,s=n.length>=Hx,a=e.getAttribute("aria-label")||"Options",o=document.createElement("div");o.className="picker-popover",o.tabIndex=-1,o.innerHTML=`
        ${s?`<input type="text" class="picker-search" placeholder="Filter…" aria-label="Filter ${f(a)}"
            role="combobox" aria-expanded="true" aria-controls="${i}" aria-autocomplete="list" autocomplete="off" spellcheck="false">`:""}
        <ul class="picker-list" role="listbox" id="${i}" tabindex="-1" aria-label="${f(a)}"></ul>
    `,document.body.appendChild(o);const r=o.querySelector(".picker-list"),l=o.querySelector(".picker-search"),c=x=>Math.max(0,x.findIndex(R=>!R.disabled));let d=n.findIndex(x=>x.value===e.value&&!x.disabled);d===-1&&(d=c(n));let u=n;const m=()=>{var R;r.innerHTML=u.length?u.map((C,Q)=>`
                <li role="option" id="${i}-${Q}" class="picker-option${Q===d?" active":""}${C.disabled?" disabled":""}"
                    data-index="${Q}" data-value="${f(C.value)}"
                    aria-selected="${C.value===e.value?"true":"false"}"${C.disabled?' aria-disabled="true"':""}>
                    <span class="picker-option-text">${p(C.text)}</span>
                    ${C.value===e.value?`<span class="picker-check">${Ux}</span>`:""}
                </li>`).join(""):'<li class="picker-empty" role="presentation">No matches</li>';const x=r.querySelector(".picker-option.active");x?(l||r).setAttribute("aria-activedescendant",x.id):(l||r).removeAttribute("aria-activedescendant"),(R=x==null?void 0:x.scrollIntoView)==null||R.call(x,{block:"nearest"})},g=()=>{var L,de;const x=t.getBoundingClientRect(),R=((L=window.visualViewport)==null?void 0:L.width)||window.innerWidth,C=((de=window.visualViewport)==null?void 0:de.height)||window.innerHeight;o.style.minWidth=`${Math.min(Math.max(x.width,220),R-16)}px`,o.style.maxHeight="",o.style.top="0px";const Q=o.offsetWidth||Math.max(x.width,220),_e=o.offsetHeight;o.style.left=`${Math.max(8,Math.min(x.left,R-Q-8))}px`;const ce=C-x.bottom-12,ht=x.top-12;if(_e>ce&&ht>ce){const ge=Math.max(120,ht);o.style.maxHeight=`${ge}px`,o.style.top=`${Math.max(8,x.top-4-Math.min(_e,ge))}px`}else o.style.maxHeight=`${Math.max(120,ce)}px`,o.style.top=`${x.bottom+4}px`},v=x=>{if(!x||x.disabled||e.disabled)return;if(![...e.options].some(C=>C.value===x.value&&!C.disabled)){W(!0);return}const R=x.value!==e.value;Wc.set.call(e,x.value),rg(e,t),W(!0),R&&e.dispatchEvent(new Event("change",{bubbles:!0}))},y=x=>{let R=d+x;for(;R>=0&&R<u.length&&u[R].disabled;)R+=x;R<0||R>=u.length||(d=R,m())},w=(x,R)=>{let C=x;for(;C>=0&&C<u.length&&u[C].disabled;)C+=R;C>=0&&C<u.length&&(d=C,m())},S=x=>{if(!(x.metaKey||x.ctrlKey))switch(x.stopPropagation(),x.key){case"ArrowDown":x.preventDefault(),y(1);break;case"ArrowUp":x.preventDefault(),y(-1);break;case"Home":l||(x.preventDefault(),w(0,1));break;case"End":l||(x.preventDefault(),w(u.length-1,-1));break;case"PageDown":x.preventDefault(),w(Math.min(u.length-1,d+8),-1);break;case"PageUp":x.preventDefault(),w(Math.max(0,d-8),1);break;case"Enter":x.preventDefault(),v(u[d]);break;case"Escape":x.preventDefault(),W(!0);break;case"Tab":W(!0);break;case" ":l||(x.preventDefault(),v(u[d]));break;default:if(!l&&x.key.length===1&&!x.metaKey&&!x.ctrlKey&&!x.altKey){_=(Date.now()-D<700?_:"")+x.key.toLowerCase(),D=Date.now();const R=u.findIndex(C=>!C.disabled&&C.text.toLowerCase().startsWith(_));R!==-1&&(d=R,m())}}};let _="",D=0;const M=()=>{const x=l.value.trim().toLowerCase();u=x?n.filter(C=>C.text.toLowerCase().includes(x)):n;const R=u.findIndex(C=>C.value===e.value&&!C.disabled);d=!x&&R!==-1?R:c(u),m()},ne=x=>{o.contains(x.target)||t.contains(x.target)||W(!1)},E=()=>g(),P=x=>{x.key!=="Escape"||o.contains(x.target)||(x.preventDefault(),x.stopPropagation(),W(!0))},U=()=>W(!1);function W(x){(Ce==null?void 0:Ce.popover)===o&&(Ce=null,o.remove(),t.setAttribute("aria-expanded","false"),t.classList.remove("open"),t.removeAttribute("aria-controls"),document.removeEventListener("pointerdown",ne,!0),document.removeEventListener("keydown",P,!0),window.removeEventListener("popstate",U),window.removeEventListener("resize",E),window.removeEventListener("scroll",E,!0),x&&t.focus({preventScroll:!0}))}r.addEventListener("click",x=>{const R=x.target.closest(".picker-option");R&&v(u[Number(R.dataset.index)])}),r.addEventListener("mousemove",x=>{const R=x.target.closest(".picker-option");if(!R)return;const C=Number(R.dataset.index);C!==d&&(d=C,m())}),o.addEventListener("keydown",S),l&&l.addEventListener("input",M),document.addEventListener("pointerdown",ne,!0),document.addEventListener("keydown",P,!0),window.addEventListener("popstate",U),window.addEventListener("resize",E),window.addEventListener("scroll",E,!0),Ce={select:e,button:t,popover:o,close:W,refresh:()=>{const x=lg(e);!(x.length===n.length&&x.every((C,Q)=>C.value===n[Q].value&&C.text===n[Q].text&&C.disabled===n[Q].disabled))||e.disabled?W(!1):m()}},t.setAttribute("aria-expanded","true"),t.setAttribute("aria-controls",i),t.classList.add("open"),m(),g(),(l||r).focus({preventScroll:!0})}const Kx={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>b.getDocumentRevisions(e),fetchOne:(e,t)=>b.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>b.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>b.getIssueDescriptionRevision(e,t)}};let V=null,bn=0;async function dg(e,t){var a,o;const n=Kx[e];if(!n){k("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++bn;V=null;let s;try{s=await n.fetchList(t)}catch(r){k("load revision history",r);return}if(i===bn){if(V={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},V.viewVersion!=null)try{const r=await n.fetchOne(t,V.viewVersion);if(i!==bn)return;V.cache.set(V.viewVersion,r)}catch(r){i===bn&&k("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),qo(),z()}}function qo(){const e=document.getElementById("modal-content");if(!e||!V)return;if(V.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=Yx(),n=V.mode==="compare"?Zx():Qx();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function Yx(){const e=V.revisions.map(n=>{const i=V.mode==="view"?n.version===V.viewVersion:n.version===V.compareFromVersion||n.version===V.compareToVersion,s=V.mode==="compare"?n.version===V.compareFromVersion?' <span class="rev-tag">from</span>':n.version===V.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${p(n.author_name||"Unknown")} ${va(n.author)}</span>
          <span class="revision-time">${ot(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${V.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function Qx(){const e=V.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=V.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${p(t.title)}</h3>`:"",i=t[V.adapter.bodyField]||"",s=i?`<div class="markdown-body">${mt(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${p(t.author_name||"Unknown")} &middot; ${ot(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function Zx(){const e=V.compareFromVersion,t=V.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=V.cache.get(e),i=V.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[V.adapter.bodyField]||"",a=i[V.adapter.bodyField]||"",o=Xx(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
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
  `}function Xx(e,t){const n=e.split(`
`),i=t.split(`
`),s=Jx(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${p(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${p(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${p(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function Jx(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(Qs(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(Qs(a,"del",e[o]),o++):(Qs(a,"add",t[r]),r++);for(;o<n;)Qs(a,"del",e[o++]);for(;r<i;)Qs(a,"add",t[r++]);return a}function Qs(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function eI(e){if(!V)return;const t=V.token,n=V;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(V!==n||bn!==t)return;n.cache.set(e,i)}catch(i){V===n&&bn===t&&k("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),qo()}function tI(){if(!V)return;const e=V.token,t=V;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{V===t&&bn===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{V!==t||bn!==e||(s&&k("load revisions to compare",s),qo())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;qo()}ie({"show-document-revisions":(e,t)=>{dg("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{dg("issue",t.issueId)},"select-revision-version":(e,t)=>{eI(Number(t.version))},"toggle-revision-compare":()=>{tI()},"close-revision-viewer":()=>{V=null,H()}});const No={bio:4e3,pronouns:40,tagline:120,name:255};let Rt=[],Kc=null,Yc=!1,Qc=0,Oo=null,Li=null,Zs=null,Ho=!1,Zc=0;async function ug(e,t){return b.getTeamRoster(e,{includeIdle:t})}function nI(e,t){!t||Kc!==e||(Rt=Rt.map(n=>n.user_id===t.user_id?t:n))}function iI(){return Array(4).fill(0).map(()=>`
        <div class="person-card person-card-skeleton">
            <div class="skeleton skeleton-title"></div>
        </div>
    `).join("")}async function Xc(){const e=T();if(!e)return;const t=++Qc,n=Yc,i=document.getElementById("people-list");i&&(i.innerHTML=iI(),i.setAttribute("aria-busy","true"));const s=document.getElementById("people-show-idle");s&&(s.checked=Yc);try{const a=await ug(e.id,n);if(t!==Qc)return;Rt=a,Kc=e.id,fg()}catch(a){if(t!==Qc)return;i==null||i.removeAttribute("aria-busy"),i&&(i.innerHTML=F({icon:N.team,heading:"Couldn't load the roster",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-people"},variant:"error"})),k("load the roster",a)}}function pg(e){if(!e.is_agent){const i=e.role||"member";return i.charAt(0).toUpperCase()+i.slice(1)}const n=[e.kind==="session"?"Session":e.kind==="service"?"Registrar":"Agent"];return e.owner_name&&n.push(`of ${e.owner_name}`),e.idle&&n.push("· idle"),n.join(" ")}function mg(e){const t=f(e.user_id),n=e.pronouns?`<span class="person-pronouns">${p(e.pronouns)}</span>`:"",i=e.mention_handle?`<div class="person-handle">@${p(e.mention_handle)}</div>`:"",s=e.tagline?`<div class="person-tagline">${p(e.tagline)}</div>`:"";return`
        <a class="person-card${e.is_agent?" person-card-agent":""}${e.idle?" person-card-idle":""}"
           href="/people/${t}" data-action="view-person" data-user-id="${t}">
            <span class="person-card-avatar" aria-hidden="true">${Ut(e,"avatar person-avatar")}</span>
            <div class="person-card-body">
                <div class="person-name">${p(e.name)}${n}</div>
                ${i}
                ${s}
                <div class="person-role">${p(pg(e))}</div>
            </div>
        </a>
    `}function fg(){const e=document.getElementById("people-list");if(!e)return;e.removeAttribute("aria-busy");const t=Rt.filter(a=>!a.is_agent),n=Rt.filter(a=>a.is_agent),i=fe(),s=i?`<button class="btn btn-secondary btn-small" data-action="edit-profile" data-user-id="${f(i.id)}">Edit your profile</button>`:"";e.innerHTML=`
        <div class="people-section-header"><h3>People</h3>${s}</div>
        <div class="people-grid">${t.map(mg).join("")||'<p class="people-empty">No one yet.</p>'}</div>
        <div class="people-section-header"><h3>Agents</h3></div>
        <div class="people-grid">${n.map(mg).join("")||'<p class="people-empty">No agents yet.</p>'}</div>
    `}function gg(e,t=fe()){return!e||!t?!1:e.user_id===t.id||e.is_agent&&e.owner_id===t.id}async function hg(e,t,{fresh:n=!1}={}){if(!n&&Kc===e){const a=Rt.find(o=>o.user_id===t);if(a)return a}const s=(await ug(e,!0)).find(a=>a.user_id===t)||null;return nI(e,s),s}let vg=0,Jc=null;async function Fo(e,t=!0){var r;t&&pn(),Hm();const n=++vg,i=T();if(!i)return;const s=window.location.pathname,a=()=>{var l;return n!==vg||((l=T())==null?void 0:l.id)!==i.id||window.location.pathname!==s};let o;try{o=await hg(i.id,e)}catch(l){if(a())return;k("load this profile",l),t||history.replaceState({view:"people"},"","/people"),q("people",t);return}if(!a()){if(!o){$("Not on this team’s roster","error"),t||history.replaceState({view:"people"},"","/people"),q("people",t);return}t&&history.pushState({personId:e,view:"people"},"",`/people/${encodeURIComponent(e)}`),Xi("people"),Ls("people"),bg(o),window.scrollTo(0,0),(r=document.querySelector("#person-detail-view .person-profile-name"))==null||r.focus({preventScroll:!0})}}function sI(){let e=document.getElementById("person-detail-view");return e||(e=document.createElement("div"),e.id="person-detail-view",e.className="view",document.querySelector(".main-content").appendChild(e)),e}function bg(e,{withIssues:t=!0}={}){var l;document.querySelectorAll(".view").forEach(c=>c.classList.add("hidden"));const n=sI();n.classList.remove("hidden"),n.dataset.userId=e.user_id,Jc=e;const i=f(e.user_id),s=gg(e),a=e.user_id===((l=fe())==null?void 0:l.id),o=e.bio?`<div class="person-bio markdown-body">${Cn(e.bio)}</div>`:`<p class="person-bio-empty">${a?"You haven’t written a bio yet.":"No bio yet."}</p>`,r=e.joined_at?`<span>Joined ${p(new Date(e.joined_at).toLocaleDateString())}</span>`:"";n.innerHTML=`
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
                <div class="person-role">${p(pg(e))}${r?" · ":""}${r}</div>
            </div>
        </div>
        ${o}
        <section class="person-work">
            <h3>Working on</h3>
            <div id="person-issues" class="person-issues"><div class="skeleton skeleton-title"></div></div>
        </section>
    `,t&&aI(e.user_id)}const yg=["in_progress","in_review","todo"];let wg=0;async function aI(e){const t=T();if(!t)return;const n=++wg;let i;try{i=await b.getTeamIssues(t.id,{assignee_id:e,status:yg,sort_by:"status",order:"asc",limit:20})}catch(o){i=null,console.error("Failed to load their issues:",o)}if(n!==wg)return;const s=document.getElementById("person-issues");if(!s)return;if(i===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load their issues.</p>';return}if(!i.length){s.innerHTML='<p class="person-bio-empty">Nothing open assigned.</p>';return}const a=o=>yg.indexOf(o.status);s.innerHTML=[...i].sort((o,r)=>a(o)-a(r)).map(o=>`
        <a class="person-issue" href="/issue/${encodeURIComponent(o.identifier)}" data-action="person-open-issue" data-identifier="${f(o.identifier)}">
            <span class="person-issue-id">${p(o.identifier)}</span>
            <span class="person-issue-title">${p(o.title)}</span>
            <span class="person-issue-status">${p(String(o.status).replace("_"," "))}</span>
        </a>
    `).join("")}const ed=["name","avatar_url","pronouns","tagline","bio"];function oI(e){const t=(n,i)=>{const s=String(i??"").replace(/\r\n?/g,`
`);return n==="bio"&&s.startsWith(`
`)?s.slice(1):s};return Object.fromEntries(ed.map(n=>[n,t(n,e==null?void 0:e[n])]))}let td=0;async function rI(e){var l;const t=fe(),n=T();if(!t||!n)return;const i=++td,s=window.location.pathname;let a;try{a=await hg(n.id,e,{fresh:!0})}catch(c){i===td&&k("load this profile",c);return}if(i!==td||window.location.pathname!==s||((l=T())==null?void 0:l.id)!==n.id||(!a&&e===t.id&&(a={...t,user_id:t.id}),!a||!gg(a,t)))return;Oo=e,Zs=a,Li=oI(a),Zc++;const o=e===t.id,r=c=>f(c||"");document.getElementById("modal-title").textContent=o?"Edit your profile":`Edit ${a.name}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="save-profile">
            <div class="form-group">
                <label for="profile-name">Name</label>
                <input type="text" id="profile-name" value="${r(a.name)}" maxlength="${No.name}" required>
            </div>
            <div class="form-group">
                <label for="profile-avatar">Avatar</label>
                <input type="text" id="profile-avatar" value="${r(a.avatar_url)}" placeholder="An emoji, or an image URL">
            </div>
            ${o?`<div class="form-group">
                <label for="profile-photo">Photo</label>
                <div class="profile-photo-row">
                    <input type="file" id="profile-photo" accept="image/png,image/jpeg,image/webp,image/gif" data-action="pick-profile-photo"${Xs?" disabled":""}>
                    <button type="button" class="btn btn-secondary btn-small${Sr.test(a.avatar_url||"")?"":" hidden"}" id="profile-photo-remove" data-action="remove-profile-photo"${Xs?" disabled":""}>Remove photo</button>
                </div>
                <p class="form-help">Uploads at once, cropped square and resized to ${_g}px.</p>
            </div>`:""}
            <div class="form-group">
                <label for="profile-pronouns">Pronouns</label>
                <input type="text" id="profile-pronouns" value="${r(a.pronouns)}" maxlength="${No.pronouns}" placeholder="e.g. they/them">
            </div>
            <div class="form-group">
                <label for="profile-tagline">Tagline</label>
                <input type="text" id="profile-tagline" value="${r(a.tagline)}" maxlength="${No.tagline}" placeholder="One line under your name">
            </div>
            <div class="form-group">
                <label for="profile-bio">Bio</label>
                <textarea id="profile-bio" rows="8" maxlength="${No.bio}" placeholder="Markdown: who you are, what you work on, how to work with you">${p(a.bio||"")}</textarea>
                <p class="form-help">Leave a field blank to clear it.</p>
            </div>
            <button type="submit" class="btn btn-primary"${Ho?" disabled":""}>Save</button>
        </form>
    `,z()}function lI(e,t=null){const n=a=>{var o;return((o=e.querySelector(`#${a}`))==null?void 0:o.value)??""},i={name:n("profile-name"),avatar_url:n("profile-avatar").trim(),pronouns:n("profile-pronouns"),tagline:n("profile-tagline"),bio:n("profile-bio")},s={};for(const a of ed){const o=t?String(t[a]??""):null;(a==="avatar_url"?i[a]===(o==null?void 0:o.trim()):i[a]===o)||(s[a]=a==="avatar_url"?i[a]||null:i[a])}return s}function $g(e){var i;const t=window.scrollY,n=document.getElementById("person-issues");bg(e,{withIssues:!1}),n&&((i=document.getElementById("person-issues"))==null||i.replaceWith(n)),window.scrollTo(0,t)}function kg(e){const t=document.getElementById("person-detail-view");return!!t&&!t.classList.contains("hidden")&&t.dataset.userId===e}function Eg(){Oo=null,Li=null,Zs=null,H()}async function cI(e){e.preventDefault();const t=Oo;if(!t||Ho)return;const n=e.target.closest("form")||e.target,i=lI(n,Li);if(!Object.keys(i).length){Eg();return}const s=fe(),a=t===(s==null?void 0:s.id),o=Zs,r=Zc,l=n.querySelector('button[type="submit"]');Ho=!0,l&&(l.disabled=!0);try{const c=a?await b.updateMe(i):await b.updateAgent(t,i),d=Object.fromEntries(ed.map(u=>[u,(c==null?void 0:c[u])??null]));Rt=Rt.map(u=>u.user_id===t?{...u,...d}:u),a&&(It({...s,...d}),So()),r===Zc&&Eg(),$("Profile saved","success"),kg(t)?$g({...o,...d}):fg()}catch(c){k("save the profile",c)}finally{Ho=!1,l&&(l.disabled=!1);const c=document.querySelector('#modal-content form[data-action="save-profile"] button[type="submit"]');c&&(c.disabled=!1)}}const _g=256;async function dI(e,t=_g){var l;const n=await createImageBitmap(e),i=Math.min(n.width,n.height),s=document.createElement("canvas");s.width=t,s.height=t,s.getContext("2d").drawImage(n,(n.width-i)/2,(n.height-i)/2,i,i,0,0,t,t),(l=n.close)==null||l.call(n);const a=c=>new Promise(d=>s.toBlob(d,c,.9)),o=await a("image/webp");let r=o&&o.type==="image/webp"?o:null;if(!r){const c=s.getContext("2d");c.globalCompositeOperation="destination-over",c.fillStyle="#fff",c.fillRect(0,0,t,t),r=await a("image/jpeg")}if(!r)throw new Error("This browser could not convert the picture. Try a PNG or JPEG file.");return r}let Xs=!1;function xg(e){for(const t of["profile-photo","profile-photo-remove"]){const n=document.getElementById(t);n&&(n.disabled=e)}}function uI(e){var i;const t=fe();if(!t||!e||e.id&&e.id!==t.id)return;const n=e.avatar_url??null;if(Rt=Rt.map(s=>s.user_id===t.id?{...s,avatar_url:n}:s),It({...t,avatar_url:n}),So(),Oo===t.id&&Li){const s=document.getElementById("profile-avatar");s&&(s.value=n||""),Li={...Li,avatar_url:n||""},Zs={...Zs,avatar_url:n},(i=document.getElementById("profile-photo-remove"))==null||i.classList.toggle("hidden",!Sr.test(n||""))}Jc&&kg(t.id)&&$g({...Jc,avatar_url:n})}async function Ig(e,t,n){if(!Xs){Xs=!0,xg(!0);try{uI(await e()),$(t,"success")}catch(i){k(n,i)}finally{Xs=!1,xg(!1)}}}async function pI(e,t=dI){var i;const n=(i=e.files)==null?void 0:i[0];if(n)try{await Ig(async()=>b.uploadAvatar(await t(n)),"Photo uploaded","upload the photo")}finally{e.value=""}}function mI(){return Ig(()=>b.deleteAvatar(),"Photo removed","remove the photo")}function nd(e){return e.metaKey||e.ctrlKey||e.shiftKey||e.button===1}ie({"view-person":(e,t)=>{e.type!=="click"||nd(e)||(e.preventDefault(),Fo(t.userId))},"edit-profile":(e,t)=>{e.type==="click"&&(e.preventDefault(),rI(t.userId))},"view-my-profile":e=>{var n;if(e.type!=="click")return;e.preventDefault(),(n=document.getElementById("user-dropdown"))==null||n.classList.add("hidden");const t=fe();t&&Fo(t.id)},"pick-profile-photo":(e,t,n)=>{e.type==="change"&&pI(n)},"remove-profile-photo":e=>{e.type==="click"&&mI()},"save-profile":e=>{cI(e)},"retry-load-people":e=>{e.type==="click"&&Xc()},"person-open-issue":(e,t)=>{e.type!=="click"||nd(e)||(e.preventDefault(),sc(t.identifier))},"back-to-roster":e=>{e.type!=="click"||nd(e)||(e.preventDefault(),q("people"))},"toggle-people-idle":(e,t,n)=>{e.type==="change"&&(Yc=!!n.checked,Xc())}});const fI=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let kt=[],Uo=null,Go=null,id=0;lt(e=>{e==="currentProject"&&A()==="board"&&Js()});async function Js({fromMemory:e=!1}={}){ba(-1);const t=++id,n=K();if(!n){const o=document.getElementById("kanban-board");o&&(o.innerHTML=J().length===0?F({icon:N.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):F({icon:N.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const i=document.getElementById("kanban-board"),s=rl(),a=e?za("board",s):void 0;a?(kt=a,Uo=s,A()==="board"&&St(kt),Ai()):i&&(i.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const o=await b.getIssues({project_id:n});if(t!==id)return;const r=a&&Va(kt,o);kt=o,Uo=s,pi("board",s,o),A()==="board"&&St(kt),r||Ai()}catch(o){if(t!==id)return;i&&(i.innerHTML=F({icon:N.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),k("load board",o)}}const sd=Pv(()=>Js(),200);function Ai(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;Uo&&pi("board",Uo,kt),e.innerHTML=fI.map(i=>{const s=kt.filter(a=>a.status===i.key);return`
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
                    `:s.map(gI).join("")}
                </div>
            </div>
        `}).join(""),hI(t)}function gI(e){const t=e.assignee_id?yt(e.assignee_id):null,n=t?dt(t):null,i=e.estimate!=null?un(e.estimate,e.project_id):"",s=go(e.estimate,e.project_id),a=(e.labels||[]).slice(0,2);return`
        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${f(e.id)}" data-identifier="${f(e.identifier)}">
            <div class="kanban-card-top">
                <span class="kanban-card-identifier">${p(e.identifier)}</span>
                ${n?`<span class="kanban-card-assignee" title="${f(n)}">${Ut(t,"avatar-small")}</span>`:""}
            </div>
            <div class="kanban-card-title">${p(e.title)}</div>
            <div class="kanban-card-meta">
                <span class="kanban-card-priority" title="Priority: ${f(Te(e.priority))}">${pt(e.priority)}</span>
                ${i?`<span class="estimate-badge${s?" out-of-scale":""}"${s?' title="Estimate outside current scale"':""}>${p(i)}</span>`:""}
                ${a.map(o=>`<span class="issue-label" title="${f(o.name)}" style="background: ${te(o.color)}20; color: ${te(o.color)}">${p(o.name)}</span>`).join("")}
            </div>
        </div>
    `}function hI(e){const t=hu();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){ba(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),ba(i),n[i].classList.add("keyboard-selected")}function vI(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Go=t.dataset.id,t.classList.add("dragging")}function bI(e,t){t.classList.remove("dragging"),Go=null}function Sg(e){const t=kt.find(n=>n.id===Go);return!!t&&t.status===e}function yI(e,t){e.preventDefault(),!Sg(t.dataset.status)&&t.classList.add("drag-over")}function wI(e,t){t.classList.remove("drag-over")}function $I(e,t){e.preventDefault();const n=kt.find(i=>i.id===t.dataset.id);n&&Sg(n.status)||t.classList.add("drag-over")}function kI(e,t){t.classList.remove("drag-over")}async function EI(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=kt.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,Ai();try{const o=await b.updateIssue(n,{status:i});$("Status updated","success"),rs(o)}catch(o){s.status=a,Ai(),k("update status",o)}}}async function _I(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Go||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=kt.find(l=>l.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,Ai();try{const l=await b.updateIssue(n,{status:a});$("Status updated","success"),rs(l)}catch(l){o.status=r,Ai(),k("update status",l)}}}ie({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),ae(t.id)):e.type==="dragstart"?vI(e,n):e.type==="dragend"?bI(e,n):e.type==="dragover"?$I(e,n):e.type==="dragleave"?kI(e,n):e.type==="drop"&&_I(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?yI(e,n):e.type==="dragleave"?wI(e,n):e.type==="drop"&&EI(e,n)},"retry-load-board":()=>Js()});const yn=new Map,Tg=6e4,ad=100;let Re=null,zo=null,Vo=null,ea=null,Lg=!1;const xI={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},II={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Ag={api:null};let od={...Ag};function SI(e={}){od={...Ag,...e},Re||(Re=document.createElement("div"),Re.className="issue-tooltip",Re.style.display="none",document.body.appendChild(Re),Re.addEventListener("mouseenter",()=>{clearTimeout(zo)}),Re.addEventListener("mouseleave",()=>{rd()})),Lg||(document.addEventListener("mouseover",TI),document.addEventListener("mouseout",LI),Lg=!0)}function TI(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=AI(t);if(n){if(n===ea&&Re.style.display!=="none"){clearTimeout(zo);return}clearTimeout(Vo),Vo=setTimeout(()=>{CI(t,n)},200)}}function LI(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Vo),zo=setTimeout(()=>{rd()},150))}function AI(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function CI(e,t){ea=t;const n=e.getBoundingClientRect();Re.style.left=`${n.left+window.scrollX}px`,Re.style.top=`${n.bottom+window.scrollY+8}px`,Re.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Re.style.display="block";try{const i=await DI(t);if(ea!==t)return;MI(i)}catch{if(ea!==t)return;Re.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function rd(){clearTimeout(Vo),clearTimeout(zo),Re&&(Re.style.display="none"),ea=null}function BI(){const e=Date.now();for(const[t,n]of yn.entries())e-n.timestamp>=Tg&&yn.delete(t)}async function DI(e){yn.size>ad/2&&BI();const t=yn.get(e);if(t&&Date.now()-t.timestamp<Tg)return t.issue;if(!od.api)throw new Error("API not initialized");const n=await od.api.getIssueByIdentifier(e);if(yn.size>=ad){const i=Array.from(yn.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,ad/2);for(const[a]of s)yn.delete(a)}return yn.set(e,{issue:n,timestamp:Date.now()}),n}function MI(e){const t=xI[e.status]||"#6b7280",n=II[e.priority]||"#6b7280",i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Re.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${p(e.identifier)}</span>
            <span class="issue-tooltip-type">${p(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${p(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${jI(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${RI(e.priority)}</span>
        </div>
    `}function jI(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function RI(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Cg(){return!!document.querySelector(".description-inline-editor")}function ld(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function cd(){var e;return ld("issue-detail-view")?((e=we())==null?void 0:e.id)??null:null}function Un(e){return!!e&&cd()===e}function PI(){Ye("issue:created",UI),Ye("issue:updated",GI),Ye("issue:deleted",zI),Ye("comment",KI),Ye("relation",QI),Ye("attestation",ZI),Ye("activity",JI),Ye("project",e0),Ye("sprint",t0),Ye("document",YI),Ye("inbox",XI),Ye("connection:reconnected",n0),Ye("connection:unauthorized",NI),Ye("connection:forbidden",OI),Ye("connection:superseded",qI)}function qI(){$("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function NI(){b.logout(),It(null),Yn(null),Gs(),$("Your session has ended. Please sign in again.","warning")}function OI(){$("Live updates stopped: you no longer have access to this team.","error")}function Bg(e,t){var n;return e&&e===((n=fe())==null?void 0:n.id)?"You":t||"Someone"}function HI(e){var s;const t=Bg(e.creator_id,e.creator_name),n=e.title?`${t} created ${e.identifier}: ${e.title}`:`${t} created ${e.identifier}`,i=[];return e.issue_type&&i.push(rt(e.issue_type)),e.priority&&e.priority!=="no_priority"&&i.push(`${Te(e.priority)} priority`),e.estimate!=null&&i.push(`${e.estimate} pt${e.estimate===1?"":"s"}`),e.assignee_id&&i.push(e.assignee_id===((s=fe())==null?void 0:s.id)?"assigned to you":`assigned to ${e.assignee_name||"someone"}`),e.parent_identifier&&i.push(`under ${e.parent_identifier}`),i.length?[n,i.join(" · ")]:[n]}function FI(e,t){const n=t?`${e.identifier}: ${t}`:e.identifier;return e.deleted_by_id||e.deleted_by_name?[`${Bg(e.deleted_by_id,e.deleted_by_name)} deleted ${n}`]:[`Issue ${n} was deleted`]}function Dg(e,t,n){const i=$(t.join(`
`),n);if(i&&(t.length>1&&i.classList.add("toast-multiline"),e!=null&&e.id)){const s=i.querySelector(".toast-message");if(s){i.classList.add("toast-clickable"),s.title=`Open ${e.identifier}`,s.setAttribute("role","button"),s.tabIndex=0;const a=()=>{var o;(o=i.querySelector(".toast-close"))==null||o.click(),Promise.resolve(ae(e.id)).catch(r=>console.error("Failed to open issue:",r))};s.addEventListener("click",a),s.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),a())})}}}function UI(e){var s;gs(A(),"board","sprints","epics");const t=X(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,Ze(a),A()==="issues"&&ut()}else Ze([e,...t]),A()==="issues"&&ut(),Dg(e,HI(e),"info");if(e.assignee_id===((s=fe())==null?void 0:s.id)){const a=Ue(),o=a.findIndex(l=>l.id===e.id),r=a.findIndex(l=>l._isOptimistic&&l.title===e.title);if(o===-1&&r===-1)In([e,...a]),A()==="my-issues"&&Sn();else if(r>=0){const l=[...a];l[r]=e,In(l),A()==="my-issues"&&Sn()}}A()==="board"?sd():A()==="sprints"?ta():A()==="epics"&&vn(),Un(e.parent_id)&&Gn(e.parent_id)}function GI(e){gs(A(),"board","sprints","epics"),Ea(e);const t=X();t.some(s=>s.id===e.id)&&Ze(t.map(s=>s.id===e.id?e:s));const n=Ue();n.some(s=>s.id===e.id)&&In(n.map(s=>s.id===e.id?e:s));const i=Ji();i.some(s=>s.id===e.id)&&St(i.map(s=>s.id===e.id?e:s)),A()==="issues"?ut():A()==="my-issues"?Sn():A()==="board"?sd():A()==="sprints"?ta():A()==="epics"&&vn(),Un(e.id)&&(Cg()?El(e):Gn(e.id))}function zI(e){var s,a;const t=e.title??((s=X().find(o=>o.id===e.id))==null?void 0:s.title)??((a=Ue().find(o=>o.id===e.id))==null?void 0:a.title);gs(A(),"board","sprints","epics"),ib(e.id),Ze(X().filter(o=>o.id!==e.id)),In(Ue().filter(o=>o.id!==e.id));const n=Ji();n.some(o=>o.id===e.id)&&St(n.filter(o=>o.id!==e.id)),A()==="issues"?ut():A()==="my-issues"?(Sn(),Jn({showLoading:!1})):A()==="board"?sd():A()==="sprints"?ta():A()==="epics"&&vn();const i=Un(e.id);Dg(null,FI(e,t),i?"warning":"info"),i&&q("my-issues")}const Mg=250,VI=1e3,Ci=new Map;function Gn(e){Cg()?El():dd(e,Mg)}function dd(e,t){let n=Ci.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},Ci.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>WI(e),t))}async function WI(e){const t=Ci.get(e);if(!t)return;if(t.timer=null,!Un(e)){Ci.delete(e);return}t.inFlight=!0;let n;try{n=await ae(e,!1,{refresh:!0})}finally{t.inFlight=!1}Ci.get(e)===t&&(t.again?(t.again=!1,dd(e,Mg)):n==="retry"?dd(e,VI):Ci.delete(e))}function KI(e){A()==="my-issues"&&Jn({showLoading:!1}),Un(e.issue_id)&&Gn(e.issue_id),e.document_id&&Xp(e.document_id)}function YI(e,{type:t}={}){gs(A(),"documents"),Zp(),t==="deleted"?Hw(e.id,e.title):Xp(e.id)}function QI(e){const t=cd();t&&(e.source_issue_id===t||e.target_issue_id===t)&&Gn(t)}function ZI(e){A()==="approvals"&&Bt(),Un(e.issue_id)&&Gn(e.issue_id)}function XI(e,t){var n;e.recipient_user_id===((n=fe())==null?void 0:n.id)&&($i(),eE(t==null?void 0:t.type,e),A()==="inbox"&&!iE(t==null?void 0:t.type,e)&&Ms({background:!0}))}function JI(e){A()==="my-issues"&&Jn({showLoading:!1}),Un(e.issue_id)&&Gn(e.issue_id)}function e0(e,{type:t}){ft().then(()=>{A()==="projects"&&Pn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?$(`New project: ${e.name}`,"info"):t==="deleted"&&$(`Project ${e.name} deleted`,"info")}function ta(){const e=D$();e&&ld("sprint-detail-view")?hi(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):ld("sprints-view")&&dn().catch(t=>console.error("Failed to reload sprints:",t))}function t0(e,{type:t}={}){if(gs(A(),"sprints"),hm(),A()==="sprints"?ta():A()==="my-issues"&&as(),t==="created")$(`New sprint: ${e.name}`,"info");else if(t==="closed"){const n=/^sprint\b/i.test(e.name||"")?e.name:`Sprint ${e.name}`,i=e.budget!=null&&e.points_spent!=null?` at ${e.points_spent}/${e.budget} points`:"";$(e.limbo?`${n} is closing${i}: rituals pending`:`${n} closed${i}`,"info")}}function n0(){const e=A();ll(),$i(),e==="issues"?At().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(Xn().catch(n=>console.error("Failed to resync my issues:",n)),as().catch(n=>console.error("Failed to resync sprint status:",n)),Jn({showLoading:!1})):e==="board"?Js():e==="sprints"?ta():e==="epics"?vn().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?ft().then(()=>{A()==="projects"&&Pn()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?Zp():e==="approvals"?Bt():e==="inbox"&&Ms({background:!0});const t=cd();t&&Gn(t)}const i0='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function jg(e){return Array.from(e.querySelectorAll(i0)).filter(t=>!t.closest(".hidden, [hidden]"))}function Rg(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function s0(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Rg(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=jg(t);n&&n.focus()}}}function Wo(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Rg(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=jg(n);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Wo()});async function a0(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=K();if(!i){$("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=J().find(c=>c.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Ze([r,...X()]),ut();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const c=await b.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=X();d.some(u=>u.id===c.id)?Ze(d.filter(u=>u.id!==a)):d.some(u=>u.id===a)&&Ze(d.map(u=>u.id===a?c:u)),ut(),ft(),$("Issue created!","success")}catch(c){Ze(X().filter(d=>d.id!==a)),ut(),k("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}Uk({beforeScrollRestore:el,beforeNavigate:()=>{w$(),Lk(),Sm(null),Qn(null),bu(null),Wo(),rd()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return ng(e[1]),!0;if(e[0]==="issue"&&e[1])return to(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(to(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(h0(e[1]),!0):e[0]==="sprint"&&e[1]?(R$(e[1]),!0):e[0]==="people"&&e[1]?(Fo(decodeURIComponent(e[1]),!1),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Dm(e[1]),!0):!1},detailPopstate:e=>e.epicId?(Po(e.epicId,!1),!0):e.issueId?(ae(e.issueId,!1),!0):e.identifier?(to(e.identifier),!0):e.documentId?(Ae(e.documentId,!1),!0):e.sprintId?(hi(e.sprintId,!1),!0):e.personId?(Fo(e.personId,!1),!0):!1,restoreProject:()=>{const e=Kl();e&&J().some(t=>t.id===e)&&ct(e)},issueNavigate:e=>to(e),epicNavigate:e=>ng(e)}),Fk({"my-issues":()=>{as(),Xn(),Jn()},approvals:()=>{Bt()},inbox:()=>{Ms({focusFirst:!0})},issues:()=>{var r;yy(),_y(),Sy();const e=new URLSearchParams(window.location.search),t=e.getAll("label"),n=e.getAll("exclude_label"),i=e.get("sprint"),s=t.length>0||n.length>0||!!i||!!((r=document.getElementById("sprint-filter"))!=null&&r.value)||Ln().length>0||An().length>0;s||At();const a=Ku().then(()=>{if(t.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=t.includes(d.value)}),Ta())}if(n.length>0){const l=document.getElementById("exclude-label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=n.includes(d.value)}),La())}}),o=fp().then(()=>{if(i){const l=document.getElementById("sprint-filter");l&&(l.value=i)}});s?Promise.allSettled([a,o]).then(()=>At()):(a.catch(l=>console.error("Failed to populate label filter:",l)),o.catch(l=>console.error("Failed to update sprint filter:",l)))},query:()=>{Ex()},epics:()=>{vn({fromMemory:!0})},board:()=>{Js({fromMemory:!0})},projects:()=>{Pn(),ft().then(Pn)},sprints:()=>{dn({fromMemory:!0})},rituals:()=>{ek()},documents:()=>{Rn(null,null,{fromMemory:!0})},people:Xc,team:()=>{fc(),lf(),Eo()},settings:()=>{Cc(),Pf(),qf(),Ha()}});function o0(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||H()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>H())}function r0(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>Mm(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>Bk());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>Dk()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>jm(a))})}function l0(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Yp("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Yp("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Qp());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>Mw());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Vt())}function c0(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>qu())}function d0(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>Iy());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>oy());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>ry()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const v=g.parentElement;v!=null&&v.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>Ba("status-filter-dropdown")):v!=null&&v.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>Ba("priority-filter-dropdown")):v!=null&&v.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>Ba("label-filter-dropdown")):v!=null&&v.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>Ba("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.addEventListener("change",()=>Da())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>Ma())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.addEventListener("change",()=>Qr())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>Zr())}const a=document.getElementById("label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>ja())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>Ra())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>it());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>it());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>it());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>At());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>wp());const m=document.querySelector(".quick-create-input");m&&m.addEventListener("keydown",g=>a0(g))}function u0(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>nk(t.dataset.tab))})}function p0(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>of());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>os()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),q(o.dataset.view),r.detail>0&&ig())})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>IE());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>Wo());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>s0());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>os())}ie({"navigate-to":(e,t)=>{q(t.view)},"set-current-project":(e,t,n)=>{ct(n.value)},showCreateIssueModal:()=>os(),showCreateEpicModal:()=>Bx(),"retry-load-epics":()=>vn(),showCreateProjectModal:()=>Cm(),showCreateDocumentModal:()=>em(),showCreateTeamModal:()=>pf(),showEditTeamModal:()=>HE(),showInviteModal:()=>cf(),showCreateApiKeyModal:()=>F_(),showCreateAgentModal:()=>pw(),resetOnboarding:()=>yf(),logout:()=>Rf(),navigateToProjects:()=>q("projects")});async function m0(){if(!b.getToken()){await Cf();return}Fm();const e=b.getMyTeams();e.catch(()=>{});const t=b.getMe(),n=await Tv(lu(b.getToken()));if(n){t.then(i=>{It(i),So()},async i=>{if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){b.logout(),await _r(),window.location.reload();return}console.error("Failed to confirm the session on boot:",i),$("Showing saved data — check your connection and reload","error")}),It(n.user),await Hn({teamsRequest:e,snapshot:n});return}try{const i=await t;It(i),await Hn({teamsRequest:e})}catch(i){if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){b.logout(),await Cf();return}console.error("Failed to load current user on boot:",i),Gs(),$("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{Qv(),O_(),p0(),o0(),c0(),d0(),u0(),r0(),l0(),f0(),Vx(),g0(),SI({api:b}),PI(),await m0()});function f0(){const e=document.getElementById("theme-toggle");if(!e)return;const t=cv()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),dv(n?"light":"dark")})}function g0(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");sc(i)}}})}async function h0(e){try{await Ae(e,!1)}catch{q("documents",!1)}}document.addEventListener("keydown",Rx({getCurrentView:A,getSelectedIndex:fu,setSelectedIndex:_n,viewIssue:ae,showEditIssueModal:nm,showInlineDropdown:Vr,isInlineDropdownOpen:ti,isModalOpen:tt,isCommandPaletteOpen:hn,isDetailViewActive:Fn,beforeNavigate:el})),document.addEventListener("keydown",Px({getCurrentView:A,getSelectedIndex:Nv,setSelectedIndex:gu,viewDocument:Ae,showEditDocumentModal:tm,isModalOpen:tt,isCommandPaletteOpen:hn,isDetailViewActive:Fn})),document.addEventListener("keydown",Nx({getCurrentView:A,getSelectedIndex:hu,setSelectedIndex:ba,viewIssue:ae,isModalOpen:tt,isCommandPaletteOpen:hn,isDetailViewActive:Fn})),document.addEventListener("keydown",qx({getCurrentView:A,getSelectedIndex:Ov,setSelectedIndex:ya,toggleInboxExpand:yE,collapseInboxExpand:oE,archiveInboxEntry:bE,isInlineDropdownOpen:ti,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:tt,isCommandPaletteOpen:hn,isDetailViewActive:Fn})),document.addEventListener("keydown",Ox()),document.addEventListener("keydown",Vc({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&hi(e.dataset.sprintId)},getCurrentView:A,getSelectedIndex:Hv,setSelectedIndex:vu,isModalOpen:tt,isCommandPaletteOpen:hn,isDetailViewActive:Fn})),document.addEventListener("keydown",Vc({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&Um(e.dataset.identifier)},getCurrentView:A,getSelectedIndex:Fv,setSelectedIndex:Ar,isModalOpen:tt,isCommandPaletteOpen:hn,isDetailViewActive:Fn})),document.addEventListener("keydown",Vc({view:"my-issues",selector:"#my-issues-list .issue-row",open:e=>{var t;return(t=e.querySelector(".issue-title"))==null?void 0:t.click()},getCurrentView:A,getSelectedIndex:vb,setSelectedIndex:bb,isInlineDropdownOpen:ti,isModalOpen:tt,isCommandPaletteOpen:hn,isDetailViewActive:Fn}));function Pg(){var e;q("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus()}function v0(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)")||!!document.querySelector("#issue-detail-view details.related-add[open]")||Aw()}document.addEventListener("keydown",Mx({closeModal:H,closeSidebar:Wo,navigateTo:q,showCreateIssueModal:os,showKeyboardShortcutsHelp:Ff,isModalOpen:tt,focusSearch:Pg,isInlineDropdownOpen:ti,closeInlineDropdowns:Rv,isModalDirty:Mv,focusModalField:cu,closeDropdowns:()=>{var t;document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),Bn();const e=document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)");e&&(e.classList.add("hidden"),(t=document.querySelector("#issue-detail-view .sidebar-overflow-trigger"))==null||t.setAttribute("aria-expanded","false"))},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:v0,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),X_([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>q("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>q("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>q("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>q("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>q("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>q("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>q("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>q("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>q("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>q("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>q("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>q("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{q("issues"),setTimeout(os,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{q("projects"),setTimeout(Cm,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{q("documents"),setTimeout(em,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>pf(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:Pg,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{q("team"),setTimeout(cf,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>Ff(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>yf(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Rf(),category:"Account"}]),document.addEventListener("keydown",jx({isModalOpen:tt,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:hn,openCommandPalette:J_,closeCommandPalette:Ao})),window.marked=Y,window.DOMPurify=Jd,console.log("Chaotic frontend loaded via Vite")})();
