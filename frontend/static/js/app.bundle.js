var Xk=Object.defineProperty;var Qk=(wt,_e,Zt)=>_e in wt?Xk(wt,_e,{enumerable:!0,configurable:!0,writable:!0,value:Zt}):wt[_e]=Zt;var Z=(wt,_e,Zt)=>Qk(wt,typeof _e!="symbol"?_e+"":_e,Zt);(function(){"use strict";var pl;function wt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var _e=wt();function Zt(e){_e=e}var ri={exec:()=>null};function z(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(Ie.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var Ie={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Bp=/^(?:[ \t]*(?:\n|$))+/,jp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Dp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,li=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Mp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Oa=/(?:[*+-]|\d{1,9}[.)])/,Sl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Tl=z(Sl).replace(/bull/g,Oa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Rp=z(Sl).replace(/bull/g,Oa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ha=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Pp=/^[^\n]+/,Fa=/(?!\s*\])(?:\\.|[^\[\]\\])+/,qp=z(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Fa).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Np=z(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Oa).getRegex(),us="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ua=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Op=z("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ua).replace("tag",us).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ll=z(Ha).replace("hr",li).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",us).getRegex(),Hp=z(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ll).getRegex(),Ga={blockquote:Hp,code:jp,def:qp,fences:Dp,heading:Mp,hr:li,html:Op,lheading:Tl,list:Np,newline:Bp,paragraph:Ll,table:ri,text:Pp},Cl=z("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",li).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",us).getRegex(),Fp={...Ga,lheading:Rp,table:Cl,paragraph:z(Ha).replace("hr",li).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Cl).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",us).getRegex()},Up={...Ga,html:z(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ua).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ri,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:z(Ha).replace("hr",li).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Tl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Gp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,zp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Al=/^( {2,}|\\)\n(?!\s*$)/,Vp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ps=/[\p{P}\p{S}]/u,za=/[\s\p{P}\p{S}]/u,Bl=/[^\s\p{P}\p{S}]/u,Wp=z(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,za).getRegex(),jl=/(?!~)[\p{P}\p{S}]/u,Kp=/(?!~)[\s\p{P}\p{S}]/u,Yp=/(?:[^\s\p{P}\p{S}]|~)/u,Zp=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Dl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Xp=z(Dl,"u").replace(/punct/g,ps).getRegex(),Qp=z(Dl,"u").replace(/punct/g,jl).getRegex(),Ml="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Jp=z(Ml,"gu").replace(/notPunctSpace/g,Bl).replace(/punctSpace/g,za).replace(/punct/g,ps).getRegex(),em=z(Ml,"gu").replace(/notPunctSpace/g,Yp).replace(/punctSpace/g,Kp).replace(/punct/g,jl).getRegex(),tm=z("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Bl).replace(/punctSpace/g,za).replace(/punct/g,ps).getRegex(),nm=z(/\\(punct)/,"gu").replace(/punct/g,ps).getRegex(),im=z(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),sm=z(Ua).replace("(?:-->|$)","-->").getRegex(),am=z("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",sm).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ms=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,om=z(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ms).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Rl=z(/^!?\[(label)\]\[(ref)\]/).replace("label",ms).replace("ref",Fa).getRegex(),Pl=z(/^!?\[(ref)\](?:\[\])?/).replace("ref",Fa).getRegex(),rm=z("reflink|nolink(?!\\()","g").replace("reflink",Rl).replace("nolink",Pl).getRegex(),Va={_backpedal:ri,anyPunctuation:nm,autolink:im,blockSkip:Zp,br:Al,code:zp,del:ri,emStrongLDelim:Xp,emStrongRDelimAst:Jp,emStrongRDelimUnd:tm,escape:Gp,link:om,nolink:Pl,punctuation:Wp,reflink:Rl,reflinkSearch:rm,tag:am,text:Vp,url:ri},lm={...Va,link:z(/^!?\[(label)\]\((.*?)\)/).replace("label",ms).getRegex(),reflink:z(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ms).getRegex()},Wa={...Va,emStrongRDelimAst:em,emStrongLDelim:Qp,url:z(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},cm={...Wa,br:z(Al).replace("{2,}","*").getRegex(),text:z(Wa.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},fs={normal:Ga,gfm:Fp,pedantic:Up},ci={normal:Va,gfm:Wa,breaks:cm,pedantic:lm},dm={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ql=e=>dm[e];function at(e,t){if(t){if(Ie.escapeTest.test(e))return e.replace(Ie.escapeReplace,ql)}else if(Ie.escapeTestNoEncode.test(e))return e.replace(Ie.escapeReplaceNoEncode,ql);return e}function Nl(e){try{e=encodeURI(e).replace(Ie.percentDecode,"%")}catch{return null}return e}function Ol(e,t){var a;const n=e.replace(Ie.findPipe,(o,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(Ie.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(Ie.slashPipe,"|");return i}function di(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function um(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Hl(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function pm(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var gs=class{constructor(e){Z(this,"options");Z(this,"rules");Z(this,"lexer");this.options=e||_e}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:di(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=pm(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=di(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:di(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=di(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),o=!0;else if(!o)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=u,n.length===0)break;const f=a.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const b=f,v=b.raw+`
`+n.join(`
`),w=this.blockquote(v);a[a.length-1]=w,i=i.substring(0,i.length-b.raw.length)+w.raw,s=s.substring(0,s.length-b.text.length)+w.text;break}else if((f==null?void 0:f.type)==="list"){const b=f,v=b.raw+`
`+n.join(`
`),w=this.list(v);a[a.length-1]=w,i=i.substring(0,i.length-f.raw.length)+w.raw,s=s.substring(0,s.length-b.raw.length)+w.raw,n=v.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let l=!1,c="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),f=e.split(`
`,1)[0],b=!u.trim(),v=0;if(this.options.pedantic?(v=2,d=u.trimStart()):b?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,d=u.slice(v),v+=t[1].length),b&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),l=!0),!l){const S=this.rules.other.nextBulletRegex(v),I=this.rules.other.hrRegex(v),B=this.rules.other.fencesBeginRegex(v),E=this.rules.other.headingBeginRegex(v),P=this.rules.other.htmlBeginRegex(v);for(;e;){const T=e.split(`
`,1)[0];let V;if(f=T,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),V=f):V=f.replace(this.rules.other.tabCharGlobal,"    "),B.test(f)||E.test(f)||P.test(f)||S.test(f)||I.test(f))break;if(V.search(this.rules.other.nonSpaceChar)>=v||!f.trim())d+=`
`+V.slice(v);else{if(b||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||B.test(u)||E.test(u)||I.test(u))break;d+=`
`+f}!b&&!f.trim()&&(b=!0),c+=T+`
`,e=e.substring(T.length+1),u=V.slice(v)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let w=null,$;this.options.gfm&&(w=this.rules.other.listIsTask.exec(d),w&&($=w[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!w,checked:$,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(u=>u.type==="space"),d=c.length>0&&c.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Ol(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(Ol(r,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=di(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=um(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Hl(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Hl(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,l=a,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const u=[...i[0]][0].length,f=e.slice(0,a+i.index+u+r);if(Math.min(a,r)%2){const v=f.slice(1,-1);return{type:"em",raw:f,text:v,tokens:this.lexer.inlineTokens(v)}}const b=f.slice(2,-2);return{type:"strong",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},kt=class _l{constructor(t){Z(this,"tokens");Z(this,"options");Z(this,"state");Z(this,"tokenizer");Z(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||_e,this.options.tokenizer=this.options.tokenizer||new gs,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:Ie,block:fs.normal,inline:ci.normal};this.options.pedantic?(n.block=fs.pedantic,n.inline=ci.pedantic):this.options.gfm&&(n.block=fs.gfm,this.options.breaks?n.inline=ci.breaks:n.inline=ci.gfm),this.tokenizer.rules=n}static get rules(){return{block:fs,inline:ci}}static lex(t,n){return new _l(n).lex(t)}static lexInline(t,n){return new _l(n).inlineTokens(t)}lex(t){t=t.replace(Ie.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(Ie.tabCharGlobal,"    ").replace(Ie.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const d=t.slice(1);let u;this.options.extensions.startBlock.forEach(f=>{u=f.call({lexer:this},d),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const f=n.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let u=t;if((c=this.options.extensions)!=null&&c.startInline){let f=1/0;const b=t.slice(1);let v;this.options.extensions.startInline.forEach(w=>{v=w.call({lexer:this},b),typeof v=="number"&&v>=0&&(f=Math.min(f,v))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(u)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},hs=class{constructor(e){Z(this,"options");Z(this,"parser");this.options=e||_e}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(Ie.notSpaceStart))==null?void 0:a[0],s=e.replace(Ie.endingNewline,"")+`
`;return i?'<pre><code class="language-'+at(i)+'">'+(n?s:at(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:at(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let o=0;o<e.items.length;o++){const r=e.items[o];i+=this.listitem(r)}const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+at(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const a=e.rows[s];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${at(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=Nl(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+at(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=Nl(e);if(s===null)return at(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${at(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:at(e.text)}},Ka=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},$t=class Il{constructor(t){Z(this,"options");Z(this,"renderer");Z(this,"textRenderer");this.options=t||_e,this.options.renderer=this.options.renderer||new hs,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ka}static parse(t,n){return new Il(n).parse(t)}static parseInline(t,n){return new Il(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},vs=(pl=class{constructor(e){Z(this,"options");Z(this,"block");this.options=e||_e}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?kt.lex:kt.lexInline}provideParser(){return this.block?$t.parse:$t.parseInline}},Z(pl,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),pl),mm=class{constructor(...e){Z(this,"defaults",wt());Z(this,"options",this.setOptions);Z(this,"parse",this.parseMarkdown(!0));Z(this,"parseInline",this.parseMarkdown(!1));Z(this,"Parser",$t);Z(this,"Renderer",hs);Z(this,"TextRenderer",Ka);Z(this,"Lexer",kt);Z(this,"Tokenizer",gs);Z(this,"Hooks",vs);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new hs(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new gs(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new vs;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=s[o];vs.passThroughHooks.has(a)?s[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(u=>l.call(s,u));const d=r.call(s,c);return l.call(s,d)}:s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return kt.lex(e,t??this.defaults)}parser(e,t){return $t.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?kt.lex:kt.lexInline,l=a.hooks?a.hooks.provideParser():e?$t.parse:$t.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>l(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let d=l(c,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+at(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},Xt=new mm;function U(e,t){return Xt.parse(e,t)}U.options=U.setOptions=function(e){return Xt.setOptions(e),U.defaults=Xt.defaults,Zt(U.defaults),U},U.getDefaults=wt,U.defaults=_e,U.use=function(...e){return Xt.use(...e),U.defaults=Xt.defaults,Zt(U.defaults),U},U.walkTokens=function(e,t){return Xt.walkTokens(e,t)},U.parseInline=Xt.parseInline,U.Parser=$t,U.parser=$t.parse,U.Renderer=hs,U.TextRenderer=Ka,U.Lexer=kt,U.lexer=kt.lex,U.Tokenizer=gs,U.Hooks=vs,U.parse=U,U.options,U.setOptions,U.use,U.walkTokens,U.parseInline,$t.parse,kt.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Fl,setPrototypeOf:Ul,isFrozen:fm,getPrototypeOf:gm,getOwnPropertyDescriptor:hm}=Object;let{freeze:Se,seal:ze,create:Ya}=Object,{apply:Za,construct:Xa}=typeof Reflect<"u"&&Reflect;Se||(Se=function(t){return t}),ze||(ze=function(t){return t}),Za||(Za=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),Xa||(Xa=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const bs=Le(Array.prototype.forEach),vm=Le(Array.prototype.lastIndexOf),Gl=Le(Array.prototype.pop),ui=Le(Array.prototype.push),bm=Le(Array.prototype.splice),ys=Le(String.prototype.toLowerCase),Qa=Le(String.prototype.toString),Ja=Le(String.prototype.match),pi=Le(String.prototype.replace),ym=Le(String.prototype.indexOf),wm=Le(String.prototype.trim),et=Le(Object.prototype.hasOwnProperty),Te=Le(RegExp.prototype.test),mi=km(TypeError);function Le(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return Za(e,t,i)}}function km(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return Xa(e,n)}}function N(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ys;Ul&&Ul(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(fm(t)||(t[i]=a),s=a)}e[s]=!0}return e}function $m(e){for(let t=0;t<e.length;t++)et(e,t)||(e[t]=null);return e}function ot(e){const t=Ya(null);for(const[n,i]of Fl(e))et(e,n)&&(Array.isArray(i)?t[n]=$m(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=ot(i):t[n]=i);return t}function fi(e,t){for(;e!==null;){const i=hm(e,t);if(i){if(i.get)return Le(i.get);if(typeof i.value=="function")return Le(i.value)}e=gm(e)}function n(){return null}return n}const zl=Se(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),eo=Se(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),to=Se(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Em=Se(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),no=Se(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),xm=Se(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Vl=Se(["#text"]),Wl=Se(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),io=Se(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Kl=Se(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ws=Se(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),_m=ze(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Im=ze(/<%[\w\W]*|[\w\W]*%>/gm),Sm=ze(/\$\{[\w\W]*/gm),Tm=ze(/^data-[\-\w.\u00B7-\uFFFF]+$/),Lm=ze(/^aria-[\-\w]+$/),Yl=ze(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Cm=ze(/^(?:\w+script|data):/i),Am=ze(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Zl=ze(/^html$/i),Bm=ze(/^[a-z][.\w]*(-[.\w]+)+$/i);var Xl=Object.freeze({__proto__:null,ARIA_ATTR:Lm,ATTR_WHITESPACE:Am,CUSTOM_ELEMENT:Bm,DATA_ATTR:Tm,DOCTYPE_NAME:Zl,ERB_EXPR:Im,IS_ALLOWED_URI:Yl,IS_SCRIPT_OR_DATA:Cm,MUSTACHE_EXPR:_m,TMPLIT_EXPR:Sm});const gi={element:1,text:3,progressingInstruction:7,comment:8,document:9},jm=function(){return typeof window>"u"?null:window},Dm=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Ql=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Jl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:jm();const t=j=>Jl(j);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==gi.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:f,trustedTypes:b}=e,v=l.prototype,w=fi(v,"cloneNode"),$=fi(v,"remove"),S=fi(v,"nextSibling"),I=fi(v,"childNodes"),B=fi(v,"parentNode");if(typeof o=="function"){const j=n.createElement("template");j.content&&j.content.ownerDocument&&(n=j.content.ownerDocument)}let E,P="";const{implementation:T,createNodeIterator:V,createDocumentFragment:se,getElementsByTagName:fe}=n,{importNode:oe}=i;let Q=Ql();t.isSupported=typeof Fl=="function"&&typeof B=="function"&&T&&T.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:pe,ERB_EXPR:le,TMPLIT_EXPR:Ge,DATA_ATTR:ht,ARIA_ATTR:Qe,IS_SCRIPT_OR_DATA:Je,ATTR_WHITESPACE:Yt,CUSTOM_ELEMENT:vt}=Xl;let{IS_ALLOWED_URI:Ba}=Xl,y=null;const re=N({},[...zl,...eo,...to,...no,...Vl]);let W=null;const rs=N({},[...Wl,...io,...Kl,...ws]);let K=Object.seal(Ya(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ls=null,ml=null;const ei=Object.seal(Ya(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let pp=!0,fl=!0,mp=!1,fp=!0,ti=!1,ja=!0,mn=!1,gl=!1,hl=!1,ni=!1,Da=!1,Ma=!1,gp=!0,hp=!1;const Uk="user-content-";let vl=!0,cs=!1,ii={},bt=null;const bl=N({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let vp=null;const bp=N({},["audio","video","img","source","image","track"]);let yl=null;const yp=N({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ra="http://www.w3.org/1998/Math/MathML",Pa="http://www.w3.org/2000/svg",Dt="http://www.w3.org/1999/xhtml";let si=Dt,wl=!1,kl=null;const Gk=N({},[Ra,Pa,Dt],Qa);let qa=N({},["mi","mo","mn","ms","mtext"]),Na=N({},["annotation-xml"]);const zk=N({},["title","style","font","a","script"]);let ds=null;const Vk=["application/xhtml+xml","text/html"],Wk="text/html";let me=null,ai=null;const Kk=n.createElement("form"),wp=function(g){return g instanceof RegExp||g instanceof Function},$l=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ai&&ai===g)){if((!g||typeof g!="object")&&(g={}),g=ot(g),ds=Vk.indexOf(g.PARSER_MEDIA_TYPE)===-1?Wk:g.PARSER_MEDIA_TYPE,me=ds==="application/xhtml+xml"?Qa:ys,y=et(g,"ALLOWED_TAGS")?N({},g.ALLOWED_TAGS,me):re,W=et(g,"ALLOWED_ATTR")?N({},g.ALLOWED_ATTR,me):rs,kl=et(g,"ALLOWED_NAMESPACES")?N({},g.ALLOWED_NAMESPACES,Qa):Gk,yl=et(g,"ADD_URI_SAFE_ATTR")?N(ot(yp),g.ADD_URI_SAFE_ATTR,me):yp,vp=et(g,"ADD_DATA_URI_TAGS")?N(ot(bp),g.ADD_DATA_URI_TAGS,me):bp,bt=et(g,"FORBID_CONTENTS")?N({},g.FORBID_CONTENTS,me):bl,ls=et(g,"FORBID_TAGS")?N({},g.FORBID_TAGS,me):ot({}),ml=et(g,"FORBID_ATTR")?N({},g.FORBID_ATTR,me):ot({}),ii=et(g,"USE_PROFILES")?g.USE_PROFILES:!1,pp=g.ALLOW_ARIA_ATTR!==!1,fl=g.ALLOW_DATA_ATTR!==!1,mp=g.ALLOW_UNKNOWN_PROTOCOLS||!1,fp=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ti=g.SAFE_FOR_TEMPLATES||!1,ja=g.SAFE_FOR_XML!==!1,mn=g.WHOLE_DOCUMENT||!1,ni=g.RETURN_DOM||!1,Da=g.RETURN_DOM_FRAGMENT||!1,Ma=g.RETURN_TRUSTED_TYPE||!1,hl=g.FORCE_BODY||!1,gp=g.SANITIZE_DOM!==!1,hp=g.SANITIZE_NAMED_PROPS||!1,vl=g.KEEP_CONTENT!==!1,cs=g.IN_PLACE||!1,Ba=g.ALLOWED_URI_REGEXP||Yl,si=g.NAMESPACE||Dt,qa=g.MATHML_TEXT_INTEGRATION_POINTS||qa,Na=g.HTML_INTEGRATION_POINTS||Na,K=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&wp(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(K.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&wp(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(K.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(K.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ti&&(fl=!1),Da&&(ni=!0),ii&&(y=N({},Vl),W=[],ii.html===!0&&(N(y,zl),N(W,Wl)),ii.svg===!0&&(N(y,eo),N(W,io),N(W,ws)),ii.svgFilters===!0&&(N(y,to),N(W,io),N(W,ws)),ii.mathMl===!0&&(N(y,no),N(W,Kl),N(W,ws))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?ei.tagCheck=g.ADD_TAGS:(y===re&&(y=ot(y)),N(y,g.ADD_TAGS,me))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?ei.attributeCheck=g.ADD_ATTR:(W===rs&&(W=ot(W)),N(W,g.ADD_ATTR,me))),g.ADD_URI_SAFE_ATTR&&N(yl,g.ADD_URI_SAFE_ATTR,me),g.FORBID_CONTENTS&&(bt===bl&&(bt=ot(bt)),N(bt,g.FORBID_CONTENTS,me)),g.ADD_FORBID_CONTENTS&&(bt===bl&&(bt=ot(bt)),N(bt,g.ADD_FORBID_CONTENTS,me)),vl&&(y["#text"]=!0),mn&&N(y,["html","head","body"]),y.table&&(N(y,["tbody"]),delete ls.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw mi('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw mi('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');E=g.TRUSTED_TYPES_POLICY,P=E.createHTML("")}else E===void 0&&(E=Dm(b,s)),E!==null&&typeof P=="string"&&(P=E.createHTML(""));Se&&Se(g),ai=g}},kp=N({},[...eo,...to,...Em]),$p=N({},[...no,...xm]),Yk=function(g){let _=B(g);(!_||!_.tagName)&&(_={namespaceURI:si,tagName:"template"});const L=ys(g.tagName),ae=ys(_.tagName);return kl[g.namespaceURI]?g.namespaceURI===Pa?_.namespaceURI===Dt?L==="svg":_.namespaceURI===Ra?L==="svg"&&(ae==="annotation-xml"||qa[ae]):!!kp[L]:g.namespaceURI===Ra?_.namespaceURI===Dt?L==="math":_.namespaceURI===Pa?L==="math"&&Na[ae]:!!$p[L]:g.namespaceURI===Dt?_.namespaceURI===Pa&&!Na[ae]||_.namespaceURI===Ra&&!qa[ae]?!1:!$p[L]&&(zk[L]||!kp[L]):!!(ds==="application/xhtml+xml"&&kl[g.namespaceURI]):!1},yt=function(g){ui(t.removed,{element:g});try{B(g).removeChild(g)}catch{$(g)}},fn=function(g,_){try{ui(t.removed,{attribute:_.getAttributeNode(g),from:_})}catch{ui(t.removed,{attribute:null,from:_})}if(_.removeAttribute(g),g==="is")if(ni||Da)try{yt(_)}catch{}else try{_.setAttribute(g,"")}catch{}},Ep=function(g){let _=null,L=null;if(hl)g="<remove></remove>"+g;else{const de=Ja(g,/^[\r\n\t ]+/);L=de&&de[0]}ds==="application/xhtml+xml"&&si===Dt&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");const ae=E?E.createHTML(g):g;if(si===Dt)try{_=new f().parseFromString(ae,ds)}catch{}if(!_||!_.documentElement){_=T.createDocument(si,"template",null);try{_.documentElement.innerHTML=wl?P:ae}catch{}}const xe=_.body||_.documentElement;return g&&L&&xe.insertBefore(n.createTextNode(L),xe.childNodes[0]||null),si===Dt?fe.call(_,mn?"html":"body")[0]:mn?_.documentElement:xe},xp=function(g){return V.call(g.ownerDocument||g,g,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},El=function(g){return g instanceof u&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof d)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},_p=function(g){return typeof r=="function"&&g instanceof r};function Mt(j,g,_){bs(j,L=>{L.call(t,g,_,ai)})}const Ip=function(g){let _=null;if(Mt(Q.beforeSanitizeElements,g,null),El(g))return yt(g),!0;const L=me(g.nodeName);if(Mt(Q.uponSanitizeElement,g,{tagName:L,allowedTags:y}),ja&&g.hasChildNodes()&&!_p(g.firstElementChild)&&Te(/<[/\w!]/g,g.innerHTML)&&Te(/<[/\w!]/g,g.textContent)||g.nodeType===gi.progressingInstruction||ja&&g.nodeType===gi.comment&&Te(/<[/\w]/g,g.data))return yt(g),!0;if(!(ei.tagCheck instanceof Function&&ei.tagCheck(L))&&(!y[L]||ls[L])){if(!ls[L]&&Tp(L)&&(K.tagNameCheck instanceof RegExp&&Te(K.tagNameCheck,L)||K.tagNameCheck instanceof Function&&K.tagNameCheck(L)))return!1;if(vl&&!bt[L]){const ae=B(g)||g.parentNode,xe=I(g)||g.childNodes;if(xe&&ae){const de=xe.length;for(let Oe=de-1;Oe>=0;--Oe){const Rt=w(xe[Oe],!0);Rt.__removalCount=(g.__removalCount||0)+1,ae.insertBefore(Rt,S(g))}}}return yt(g),!0}return g instanceof l&&!Yk(g)||(L==="noscript"||L==="noembed"||L==="noframes")&&Te(/<\/no(script|embed|frames)/i,g.innerHTML)?(yt(g),!0):(ti&&g.nodeType===gi.text&&(_=g.textContent,bs([pe,le,Ge],ae=>{_=pi(_,ae," ")}),g.textContent!==_&&(ui(t.removed,{element:g.cloneNode()}),g.textContent=_)),Mt(Q.afterSanitizeElements,g,null),!1)},Sp=function(g,_,L){if(gp&&(_==="id"||_==="name")&&(L in n||L in Kk))return!1;if(!(fl&&!ml[_]&&Te(ht,_))){if(!(pp&&Te(Qe,_))){if(!(ei.attributeCheck instanceof Function&&ei.attributeCheck(_,g))){if(!W[_]||ml[_]){if(!(Tp(g)&&(K.tagNameCheck instanceof RegExp&&Te(K.tagNameCheck,g)||K.tagNameCheck instanceof Function&&K.tagNameCheck(g))&&(K.attributeNameCheck instanceof RegExp&&Te(K.attributeNameCheck,_)||K.attributeNameCheck instanceof Function&&K.attributeNameCheck(_,g))||_==="is"&&K.allowCustomizedBuiltInElements&&(K.tagNameCheck instanceof RegExp&&Te(K.tagNameCheck,L)||K.tagNameCheck instanceof Function&&K.tagNameCheck(L))))return!1}else if(!yl[_]){if(!Te(Ba,pi(L,Yt,""))){if(!((_==="src"||_==="xlink:href"||_==="href")&&g!=="script"&&ym(L,"data:")===0&&vp[g])){if(!(mp&&!Te(Je,pi(L,Yt,"")))){if(L)return!1}}}}}}}return!0},Tp=function(g){return g!=="annotation-xml"&&Ja(g,vt)},Lp=function(g){Mt(Q.beforeSanitizeAttributes,g,null);const{attributes:_}=g;if(!_||El(g))return;const L={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:W,forceKeepAttr:void 0};let ae=_.length;for(;ae--;){const xe=_[ae],{name:de,namespaceURI:Oe,value:Rt}=xe,oi=me(de),xl=Rt;let ye=de==="value"?xl:wm(xl);if(L.attrName=oi,L.attrValue=ye,L.keepAttr=!0,L.forceKeepAttr=void 0,Mt(Q.uponSanitizeAttribute,g,L),ye=L.attrValue,hp&&(oi==="id"||oi==="name")&&(fn(de,g),ye=Uk+ye),ja&&Te(/((--!?|])>)|<\/(style|title|textarea)/i,ye)){fn(de,g);continue}if(oi==="attributename"&&Ja(ye,"href")){fn(de,g);continue}if(L.forceKeepAttr)continue;if(!L.keepAttr){fn(de,g);continue}if(!fp&&Te(/\/>/i,ye)){fn(de,g);continue}ti&&bs([pe,le,Ge],Ap=>{ye=pi(ye,Ap," ")});const Cp=me(g.nodeName);if(!Sp(Cp,oi,ye)){fn(de,g);continue}if(E&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Oe)switch(b.getAttributeType(Cp,oi)){case"TrustedHTML":{ye=E.createHTML(ye);break}case"TrustedScriptURL":{ye=E.createScriptURL(ye);break}}if(ye!==xl)try{Oe?g.setAttributeNS(Oe,de,ye):g.setAttribute(de,ye),El(g)?yt(g):Gl(t.removed)}catch{fn(de,g)}}Mt(Q.afterSanitizeAttributes,g,null)},Zk=function j(g){let _=null;const L=xp(g);for(Mt(Q.beforeSanitizeShadowDOM,g,null);_=L.nextNode();)Mt(Q.uponSanitizeShadowNode,_,null),Ip(_),Lp(_),_.content instanceof a&&j(_.content);Mt(Q.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(j){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},_=null,L=null,ae=null,xe=null;if(wl=!j,wl&&(j="<!-->"),typeof j!="string"&&!_p(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw mi("dirty is not a string, aborting")}else throw mi("toString is not a function");if(!t.isSupported)return j;if(gl||$l(g),t.removed=[],typeof j=="string"&&(cs=!1),cs){if(j.nodeName){const Rt=me(j.nodeName);if(!y[Rt]||ls[Rt])throw mi("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof r)_=Ep("<!---->"),L=_.ownerDocument.importNode(j,!0),L.nodeType===gi.element&&L.nodeName==="BODY"||L.nodeName==="HTML"?_=L:_.appendChild(L);else{if(!ni&&!ti&&!mn&&j.indexOf("<")===-1)return E&&Ma?E.createHTML(j):j;if(_=Ep(j),!_)return ni?null:Ma?P:""}_&&hl&&yt(_.firstChild);const de=xp(cs?j:_);for(;ae=de.nextNode();)Ip(ae),Lp(ae),ae.content instanceof a&&Zk(ae.content);if(cs)return j;if(ni){if(Da)for(xe=se.call(_.ownerDocument);_.firstChild;)xe.appendChild(_.firstChild);else xe=_;return(W.shadowroot||W.shadowrootmode)&&(xe=oe.call(i,xe,!0)),xe}let Oe=mn?_.outerHTML:_.innerHTML;return mn&&y["!doctype"]&&_.ownerDocument&&_.ownerDocument.doctype&&_.ownerDocument.doctype.name&&Te(Zl,_.ownerDocument.doctype.name)&&(Oe="<!DOCTYPE "+_.ownerDocument.doctype.name+`>
`+Oe),ti&&bs([pe,le,Ge],Rt=>{Oe=pi(Oe,Rt," ")}),E&&Ma?E.createHTML(Oe):Oe},t.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};$l(j),gl=!0},t.clearConfig=function(){ai=null,gl=!1},t.isValidAttribute=function(j,g,_){ai||$l({});const L=me(j),ae=me(g);return Sp(L,ae,_)},t.addHook=function(j,g){typeof g=="function"&&ui(Q[j],g)},t.removeHook=function(j,g){if(g!==void 0){const _=vm(Q[j],g);return _===-1?void 0:bm(Q[j],_,1)[0]}return Gl(Q[j])},t.removeHooks=function(j){Q[j]=[]},t.removeAllHooks=function(){Q=Ql()},t}var ec=Jl();const so="chaotic_";function Re(e){try{return localStorage.getItem(so+e)}catch{return null}}function Ve(e,t){try{localStorage.setItem(so+e,t)}catch{}}function rt(e){try{localStorage.removeItem(so+e)}catch{}}function tc(){return Re("token")}function Mm(e){e?Ve("token",e):rt("token")}function Rm(){return Re("theme")}function Pm(e){Ve("theme",e)}function nc(){return Re("last_project")}function qm(e){Ve("last_project",e)}function Nm(){return Re("onboarding_complete")==="true"}function Om(){Ve("onboarding_complete","true")}function Hm(){rt("onboarding_complete")}function Fm(e){return e?Re(`issues_filters_${e}`):null}function Um(e,t){e&&(t?Ve(`issues_filters_${e}`,t):rt(`issues_filters_${e}`))}function ic(e){return Re(`comment_draft_${e}`)}function ks(e,t){t?Ve(`comment_draft_${e}`,t):rt(`comment_draft_${e}`)}function sc(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function $s(e){const t=Re(`description_draft_${e}`);if(!t)return null;const n=sc(t);return n?n.draft:t}function ac(e){const t=Re(`description_draft_${e}`);if(!t)return null;const n=sc(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function Qt(e,t,n=""){t?Ve(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):rt(`description_draft_${e}`)}function oc(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function rc(e){var n;const t=Re(`document_draft_${e}`);return t?((n=oc(t))==null?void 0:n.draft)??null:null}function Gm(e){const t=Re(`document_draft_${e}`);if(!t)return null;const n=oc(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function Es(e,t,n=null){t&&(t.title||t.content||t.icon)?Ve(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):rt(`document_draft_${e}`)}function zm(){return{title:Re("create_issue_title"),description:Re("create_issue_description")}}function lc(e,t){e?Ve("create_issue_title",e):rt("create_issue_title"),t?Ve("create_issue_description",t):rt("create_issue_description")}function Vm(){rt("create_issue_title"),rt("create_issue_description")}function Wm(){return Re("doc_view_mode")}function Km(e){Ve("doc_view_mode",e)}function Ym(){return Re("approvals_explainer_dismissed")==="1"}function Zm(){Ve("approvals_explainer_dismissed","1")}const Xm="/api";class Qm{constructor(){this.token=tc()}setToken(t){this.token=t,Mm(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s};i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(i));let o;try{o=await fetch(`${Xm}${n}`,a)}catch(l){const c=new Error("Network error - check your connection");throw c.isNetworkError=!0,c.cause=l,c}if(o.status===204)return null;let r;try{r=await o.json()}catch{const l=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${l})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let l;typeof r.detail=="string"?l=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?l=r.detail.message:l="An error occurred";const c=new Error(l);throw c.status=o.status,c.detail=r.detail,c}return r}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${encodeURIComponent(t)}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:a=null,skip:o=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),a&&c.set("order",a),c.set("skip",String(o)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/teams/${t}/agents`,a)}async createProjectAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/projects/${t}/agents`,a)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const h=new Qm;let gn=null;const Jm='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let hn=null,hi=!1;function ao(){hi=!0}function ef(){hi=!1}function cc(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function tf(){if(hi)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function F(){hn=document.activeElement,hi=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function O(){var e;Et(),hi=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),hn&&document.contains(hn)&&typeof hn.focus=="function"&&hn.focus(),hn=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(Jm);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function We(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function k(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),u=setTimeout(o,l);return a.addEventListener("click",()=>{clearTimeout(u),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(u),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),u=setTimeout(o,Math.max(c,500))}),i}function oo(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=k(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function nf(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function x(e,t){const n=nf(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";k(`Failed to ${e}: ${n}${i}`,"error")}function Et(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),gn&&(document.removeEventListener("keydown",gn),gn=null)}function sf(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));Et(),t&&We()&&cc()}function vi(e){gn&&document.removeEventListener("keydown",gn),gn=e,e&&document.addEventListener("keydown",e)}function bi(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(Et(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function we(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Pe(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function He(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function X(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function m(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function p(e){return m(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function af(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function Ke(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function lt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}function of(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function vn(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?of(i)?`<img class="${t} avatar-img" src="${p(i)}" alt="${p(n)}">`:`<div class="${t} avatar-emoji">${m(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function ro(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${p(n)}">agent</span>`}function bn(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${p(i)}">${m(n)}</span>`}return ro(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let J={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const lo=new Set;function ce(e,t){if(typeof e=="string"){const n=J[e];J[e]=t,dc(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=J[i];J[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{dc(i,s,a)})}}function ct(e){return lo.add(e),()=>lo.delete(e)}function dc(e,t,n){t!==n&&lo.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const xt=()=>J.currentUser,yn=e=>ce("currentUser",e),A=()=>J.currentView,rf=e=>ce("currentView",e),qe=()=>J.issues,dt=e=>ce("issues",e),xs=()=>J.detailNavContext,wn=e=>ce("detailNavContext",e),uc=()=>J.labels,_s=e=>ce("labels",e),pc=()=>J.activeFilterCategory,lf=e=>ce("activeFilterCategory",e),mc=()=>J.selectedIssueIndex,yi=e=>ce("selectedIssueIndex",e),cf=()=>J.selectedDocIndex,fc=e=>ce("selectedDocIndex",e),gc=()=>J.selectedBoardIndex,Is=e=>ce("selectedBoardIndex",e),df=()=>J.selectedInboxIndex,Ss=e=>ce("selectedInboxIndex",e),uf=()=>J.selectedSprintIndex,hc=e=>ce("selectedSprintIndex",e),pf=()=>J.selectedEpicIndex,vc=e=>ce("selectedEpicIndex",e),mf=()=>J.pendingGates,ff=e=>ce("pendingGates",e),ge=()=>J.inboxEntries,Pt=e=>ce("inboxEntries",e),Ts=()=>J.inboxUnreadCount,wi=e=>ce("inboxUnreadCount",e),gf=()=>J.searchDebounceTimer,hf=e=>ce("searchDebounceTimer",e),vf=()=>J.websocket,co=e=>ce("websocket",e),C=()=>J.currentTeam,ki=e=>ce("currentTeam",e),G=()=>J.currentProject,Ye=e=>ce("currentProject",e||null),Fe=()=>J.currentDetailIssue,Ls=e=>ce("currentDetailIssue",e),bf=()=>J.currentDetailSprints,bc=e=>ce("currentDetailSprints",e),uo={};function ee(e){Object.assign(uo,e)}function yf(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=uo[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let yc=!1;function wf(){if(!yc){yc=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,yf);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=uo[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const po=["backlog","todo","in_progress","in_review","done","canceled"],$i=["backlog","todo","in_progress","in_review"],wc=["urgent","high","medium","low","no_priority"],mo=["no_priority","urgent","high","medium","low"],kc=["backlog","todo","in_progress","in_review","done"];function q({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${p(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${p(r)}="${p(l)}"`).join(""):""}>${m(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${m(t)}</h3>
            <p>${m(n)}</p>
            ${a}
        </div>
    `}const M={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'};let fo=[];function kf(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function $f(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function Cs(e,t){const n=e().map(kf),i=t().map($f);fo=[...n,...i]}function Jt(e){return e&&fo.find(t=>t.id===e)||null}function en(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function go(e,t=!1){const n=m(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${m(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function As({includeIdle:e=!1,keepId:t=null}={}){const n=fo.filter(v=>e||!v.idle||v.id===t),i=n.filter(v=>!v.is_agent),s=new Set(i.map(v=>v.id)),a=n.filter(v=>v.is_agent),o=new Set(a.map(v=>v.id)),r=(v,w)=>v.name.localeCompare(w.name),l=v=>v.registered_by_id&&o.has(v.registered_by_id),c=new Map,d=new Map;a.forEach(v=>{const[w,$]=l(v)?[c,v.registered_by_id]:[d,v.parent_user_id];w.has($)||w.set($,[]),w.get($).push(v)});const u=[],f=(v,w)=>{u.push({assignee:v,indent:w}),(c.get(v.id)||[]).sort(r).forEach(S=>u.push({assignee:S,indent:2}))};return i.forEach(v=>{u.push({assignee:v,indent:!1}),(d.get(v.id)||[]).sort(r).forEach(w=>f(w,!0))}),a.filter(v=>!l(v)&&!s.has(v.parent_user_id)).sort(r).forEach(v=>f(v,!1)),u}function Ei({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;As({keepId:n}).forEach(({assignee:s,indent:a})=>{i+=`<option value="${s.id}">${go(s,a)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function Ef(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&Jt(e)&&Ei({keepId:e}),t.value=e}function tn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function kn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function $n(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function En(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function $c(){const e=document.getElementById("group-by-select");return e?e.value:""}const Ec=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],ho=["done","canceled"],xf=$i,_f="all";function xc(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function xn(e=tn()){return e.length===0?"all":xc(e,$i)?"open":xc(e,ho)?"closed":null}function _c(e){var t,n,i;switch(e){case"project":return G()?1:0;case"status":{const s=xn();return s==="all"?0:s?1:tn().length}case"priority":return kn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return $n().length;case"exclude_labels":return En().length;default:return 0}}function vo(){let e=0;return Ec.forEach(t=>{e+=_c(t.key)}),e}function Ic(){var v,w,$,S,I,B;const e=new URLSearchParams,t=tn(),n=kn(),i=$n(),s=En(),a=(v=document.getElementById("assignee-filter"))==null?void 0:v.value,o=G()||"",r=(w=document.getElementById("sprint-filter"))==null?void 0:w.value,l=($=document.getElementById("issue-type-filter"))==null?void 0:$.value,c=(S=document.getElementById("group-by-select"))==null?void 0:S.value,d=(I=document.getElementById("sort-by-select"))==null?void 0:I.value,u=xn(t);u==="all"?e.append("status",_f):u!=="open"&&t.forEach(E=>e.append("status",E)),n.forEach(E=>e.append("priority",E)),i.forEach(E=>e.append("label",E)),s.forEach(E=>e.append("exclude_label",E)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const f=e.toString(),b=f?`/issues?${f}`:"/issues";history.replaceState({view:"issues"},"",b),Um((B=C())==null?void 0:B.id,f)}function If(e){var w;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some($=>t.has($))){const $=Fm((w=C())==null?void 0:w.id);if($){t=new URLSearchParams($);const S=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",S)}}const s=t.getAll("status"),a=document.getElementById("status-filter-dropdown");if(a&&(s.length>0||!a.dataset.statusApplied)){const $=s.length>0?s:xf;a.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=$.includes(I.value)}),a.dataset.statusApplied="true",Sc()}const o=t.getAll("priority");if(o.length>0){const $=document.getElementById("priority-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=o.includes(I.value)}),Tc())}const r=t.get("assignee");r&&Ef(r);const l=t.get("project");l&&(e(!0),Ye(l),e(!1));const c=t.get("sprint");if(c){const $=document.getElementById("sprint-filter");$&&($.value=c)}const d=t.get("issue_type");if(d){const $=document.getElementById("issue-type-filter");$&&($.value=d)}const u=t.getAll("label");if(u.length>0){const $=document.getElementById("label-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=u.includes(I.value)}),Bs())}const f=t.getAll("exclude_label");if(f.length>0){const $=document.getElementById("exclude-label-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=f.includes(I.value)}),js())}const b=t.get("groupBy");if(b){const $=document.getElementById("group-by-select");$&&($.value=b)}const v=t.get("sort");if(v){const $=document.getElementById("sort-by-select");$&&($.value=v)}}function Sc(){const e=tn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=xn(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=we(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function Tc(){const e=kn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Pe(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Bs(){var i,s;const e=$n(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function js(){var i,s;const e=En(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function Lc(){if(!C())return;let e;try{e=await h.getLabels(C().id)}catch(t){console.error("Failed to load labels for filter:",t);return}Cc("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),Cc("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function Cc(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${X(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${m(r.name)}</span>
                </span>
            `,a.appendChild(l)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}function Ds(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Ac)},0))}function Ac(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Ac))}function Sf(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",_n)):(e.classList.remove("hidden"),e.classList.remove("show-options"),ke(),Ce(pc()),setTimeout(()=>{document.addEventListener("click",_n)},0))}function Tf(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",_n)):(e.classList.remove("hidden"),qf(),setTimeout(()=>{document.addEventListener("click",_n)},0))}function _n(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",_n))}function nn(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",_n)}function ke(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=G();e.innerHTML=Ec.map(n=>{const i=_c(n.key),s=pc()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${p(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function Ce(e){lf(e),ke();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":Cf(t);break;case"status":Af(t);break;case"priority":Bf(t);break;case"type":jf(t);break;case"assignee":Df(t);break;case"sprint":Mf(t);break;case"labels":Rf(t);break;case"exclude_labels":Pf(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function Lf(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),ke()}function Cf(e){const t=G()||"",n=Y()||[];let i=`
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
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${X(s.color)};"></span>
                <span class="filter-option-label">${m(s.name)}</span>
            </label>
        `}),e.innerHTML=i}function Af(e){const t=tn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=xn(t);let s=`
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
        `}),e.innerHTML=s}function Bf(e){const t=kn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function jf(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${p(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function Df(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",i=ln()||[];let s=`
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
                <span class="filter-option-label">${m(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=s}function Mf(e){if(!G()){e.innerHTML=`
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
                <span class="filter-option-label">${m(o.text)}</span>
            </label>
        `}),e.innerHTML=a}function Rf(e){const t=$n(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${X(d)};"></span>
                    <span class="filter-option-label">${m(c)}</span>
                </label>
            `}),e.innerHTML=s}function Pf(e){const t=En(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${X(d)};"></span>
                    <span class="filter-option-label">${m(c)}</span>
                </label>
            `}),e.innerHTML=s}function qf(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function Ae(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=G();if(n){const f=(Y()||[]).find(b=>b.id===n);t.push({category:"project",label:"Project",value:(f==null?void 0:f.name)||"Unknown",clearAction:"clear-project-filter"})}const i=tn();if(i.length>0){const u=xn(i),f=u==="open"?"Open":u==="closed"?"Closed":i.map(b=>we(b)).join(", ");t.push({category:"status",label:"Status",value:f,clearAction:"clear-status-filter-new"})}const s=kn();if(s.length>0){const u=s.map(f=>Pe(f)).join(", ");t.push({category:"priority",label:"Priority",value:u,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const u=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:u?u.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let u;if(o.value==="me")u="Me";else if(o.value==="unassigned")u="Unassigned";else{const b=(ln()||[]).find(v=>v.user_id===o.value);u=(b==null?void 0:b.name)||(b==null?void 0:b.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:u,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const u=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(u==null?void 0:u.text)||r.value,clearAction:"clear-sprint-filter"})}const l=$n();if(l.length>0){const u=document.getElementById("label-filter-dropdown"),f=l.map(b=>{var $;const v=u==null?void 0:u.querySelector(`input[value="${b}"]`),w=($=v==null?void 0:v.closest("label"))==null?void 0:$.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:f,clearAction:"clear-label-filter-new"})}const c=En();if(c.length>0){const u=document.getElementById("exclude-label-filter-dropdown"),f=c.map(b=>{var $;const v=u==null?void 0:u.querySelector(`input[value="${b}"]`),w=($=v==null?void 0:v.closest("label"))==null?void 0:$.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:f,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(u=>`
        <span class="filter-chip" title="${p(u.label)}: ${p(u.value)}">
            <span class="filter-chip-label">${u.label}:</span>
            <span class="filter-chip-value">${m(u.value)}</span>
            <button class="filter-chip-remove" data-action="${u.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=d}function Be(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=vo();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function Bc(){const e=document.getElementById("sprint-filter");if(!e)return;const t=G(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",bo(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await h.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${m(a.name)})</option>`),jd(t,a==null?void 0:a.id),bo(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${m(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function bo(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${m(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${m(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function jc(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let Dc=!1;ct(e=>{if(e!=="currentProject"||A()!=="issues"||Dc)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([Bc(),Lc()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),Bs(),js(),Ue(),Ae(),Be()}).catch(n=>{console.error("Failed to update filters on project switch:",n),Ue(),Ae(),Be()})});function Nf(){If(e=>{Dc=e})}function Ms(){Sc(),Ue(),Ae(),Be()}function Rs(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Ms()}function yo(){Tc(),Ue(),Ae(),Be()}function wo(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),yo()}function ko(){Bs(),Ue(),Ae(),Be()}function Ps(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),ko()}function $o(){js(),Ue(),Ae(),Be()}function qs(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),$o()}function Of(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function Mc(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${Of(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let xi=0;function Rc(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}async function _t(){var f,b,v,w,$,S,I;yi(-1);const e=++xi;if(!C())return;const t=G()||"",n=tn(),i=kn(),s=(f=document.getElementById("assignee-filter"))==null?void 0:f.value,a=(v=(b=document.getElementById("issue-search"))==null?void 0:b.value)==null?void 0:v.trim();if(!t&&Y().length===0){document.getElementById("issues-list").innerHTML=q({icon:M.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}jc(),Rc(0);const o={limit:1e3},r=((w=document.getElementById("sort-by-select"))==null?void 0:w.value)||"created-desc",[l,c]=r.includes("-")?r.split("-"):[r,null];o.sort_by=l,c&&(o.order=c),n.length>0&&(o.status=n),i.length>0&&(o.priority=i),s&&(s==="me"?o.assignee_id=($=xt())==null?void 0:$.id:o.assignee_id=s);const d=(S=document.getElementById("sprint-filter"))==null?void 0:S.value;if(d)if(d==="current"){if(t){const B=lv(t);if(B!==void 0)B&&(o.sprint_id=B);else try{const P=(await h.getSprints(t)).find(T=>T.status==="active");jd(t,P==null?void 0:P.id),P&&(o.sprint_id=P.id)}catch(E){console.error("Failed to resolve current sprint:",E)}}}else o.sprint_id=d;const u=(I=document.getElementById("issue-type-filter"))==null?void 0:I.value;u&&(o.issue_type=u),a&&a.length>=1&&(o.search=a);try{const B=Mc($n(),"label-filter-dropdown");B.length>0&&(o.label=B,o.label_match="any");const E=Mc(En(),"exclude-label-filter-dropdown");E.length>0&&(o.exclude_label=E),t&&(o.project_id=t);const P=oe=>t?h.getIssues(oe):Y().length>0?h.getTeamIssues(C().id,oe):Promise.resolve(void 0),T=o.search&&xn(n)==="open"?P({...o,status:ho}).then(oe=>Array.isArray(oe)?oe.length:0).catch(oe=>(console.error("Failed to count closed search matches:",oe),0)):Promise.resolve(0),V=await P(o);if(e!==xi)return;dt(V),A()==="issues"&&wn(V);const se=[...new Set(V.map(oe=>oe.project_id))];if(await Bd(se),e!==xi)return;St();const fe=await T;if(e!==xi)return;Rc(fe)}catch(B){if(e!==xi)return;const E=document.getElementById("issues-list");E&&(E.innerHTML=q({icon:M.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),x("load issues",B)}}function Hf(){clearTimeout(gf()),hf(setTimeout(()=>{_t()},300))}function Ue(){Ic(),_t()}async function Pc(){if(Ic(),$c()==="sprint"){const e=qe(),t=[...new Set(e.map(n=>n.project_id))];await Bd(t)}St()}function Ff(){Ae(),Be()}function qc(e){Ye(e),ke(),Ce("project"),nn()}function Uf(){qc("")}function Gf(e){const t=e==="open"?$i:e==="closed"?ho:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),Ms(),ke(),Ce("status")}function zf(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Ms()),ke(),Ce("status")}function Vf(){Rs(),ke(),Ce("status"),Ae(),Be()}function Wf(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,yo()),ke(),Ce("priority")}function Kf(){wo(),ke(),Ce("priority"),Ae(),Be()}function Nc(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Ue()),ke(),Ce("type"),Ae(),Be(),nn()}function Yf(){Nc("")}function Oc(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Ue()),ke(),Ce("assignee"),Ae(),Be(),nn()}function Zf(){Oc("")}function Hc(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Ue()),ke(),Ce("sprint"),Ae(),Be(),nn()}function Xf(){Hc("")}function Qf(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,ko()),ke(),Ce("labels")}function Jf(){Ps(),ke(),Ce("labels"),Ae(),Be()}function eg(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,$o()),ke(),Ce("exclude_labels")}function tg(){qs(),ke(),Ce("exclude_labels"),Ae(),Be()}function ng(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,_t()),nn()}function ig(e){const t=document.getElementById("group-by-select");t&&(t.value=e,Pc()),nn()}function sg(){Ye(null),Rs(),wo();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),Ps(),qs(),Ue(),Ae(),Be()}ee({"update-label-filter":()=>ko(),"clear-label-filter":()=>Ps(),"update-exclude-label-filter":()=>$o(),"clear-exclude-label-filter":()=>qs(),"show-filter-category":(e,t)=>{var n,i;Ce(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{Lf();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>qc(t.value),"clear-project-filter":()=>Uf(),"clear-status-filter-new":()=>Vf(),"set-status-preset":(e,t)=>Gf(t.value),"show-all-statuses":()=>Rs(),"toggle-status-option":(e,t)=>zf(t.filterValue,e),"clear-priority-filter-new":()=>Kf(),"toggle-priority-option":(e,t)=>Wf(t.filterValue,e),"set-type-filter":(e,t)=>Nc(t.value),"clear-type-filter":()=>Yf(),"set-assignee-filter":(e,t)=>Oc(t.value),"clear-assignee-filter":()=>Zf(),"set-sprint-filter":(e,t)=>Hc(t.value),"clear-sprint-filter":()=>Xf(),"clear-label-filter-new":()=>Jf(),"toggle-label-option":(e,t)=>Qf(t.filterValue,e),"clear-exclude-label-filter-new":()=>tg(),"toggle-exclude-label-option":(e,t)=>eg(t.filterValue,e),"set-sort":(e,t)=>ng(t.value),"set-group-by":(e,t)=>ig(t.value),"clear-all-filters":()=>sg(),"retry-load-issues":()=>_t()});let In=[],Eo=[];ct(e=>{e==="currentProject"&&A()==="my-issues"&&(Tn(),Ii(),Ln())});function It(){return In}function Sn(e){In=e}let xo=0;async function Tn(){var a;const e=C(),t=xt();if(!e||!t)return;const n=++xo,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=G();og();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await h.getIssues({...o,project_id:s}):r=await h.getTeamIssues(e.id,o),n!==xo)return;In=r,A()==="my-issues"&&wn(In),_i()}catch(o){if(n!==xo)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=q({icon:M.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),x("load issues",o)}}async function Ln({showLoading:e=!0}={}){const t=C();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=G();Eo=await h.getTeamActivities(t.id,0,10,{projectId:i}),ag()}catch{n&&(n.innerHTML=q({icon:M.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function ag(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Eo.length){e.innerHTML=q({icon:M.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=Eo.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${p(t.issue_identifier)}"><strong>${m(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const i=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${p(t.document_id)}"><strong>${i} ${m(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${m(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${Do(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Ro(t)}${n}</span>
                <span class="activity-actor">by ${m(Mo(t))}</span>
                <span class="activity-time">${Ke(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function og(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function Fc(){Tn()}function _i(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),In.length===0){e.innerHTML=q({icon:M.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}e.innerHTML=In.map(t=>tt(t)).join("")}}let _o=0;async function Ii(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++_o,n=G(),i=Y(),s=n?i.filter(a=>a.id===n):i;if(!s.length){e.innerHTML="";return}try{const a=s.map(async r=>{try{const l=await h.getCurrentSprint(r.id);if(!l)return null;let c={};try{const d=await h.getIssues({sprint_id:l.id,project_id:r.id,limit:500});for(const u of d)c[u.status]=(c[u.status]||0)+1}catch(d){console.error(`Failed to load issue counts for sprint ${l.id}:`,d)}return{project:r,sprint:l,statusCounts:c}}catch(l){return console.error(`Failed to load current sprint for project ${r.id}:`,l),null}}),o=(await Promise.all(a)).filter(Boolean);if(t!==_o)return;rg(o)}catch(a){if(t!==_o)return;console.error("Failed to load sprint status:",a),e.innerHTML=q({icon:M.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}function rg(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active Sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:i,sprint:s,statusCounts:a})=>{const o=s.budget||0,r=s.points_spent||0,l=o>0?Math.min(100,Math.round(r/o*100)):0,c=o>0&&r>o,d=s.limbo?"limbo":c?"arrears":"",u=a||{},f=Object.values(u).reduce((b,v)=>b+v,0);return`
                    <div class="sprint-status-card ${d}">
                        <div class="sprint-status-header">
                            <span class="sprint-status-project">${m(i.name)}</span>
                            ${s.limbo?'<span class="sprint-status-badge limbo">Limbo</span>':""}
                            ${c?'<span class="sprint-status-badge arrears">Arrears</span>':""}
                        </div>
                        <div class="sprint-status-name">${m(s.name)}</div>
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
                                    ${n.filter(b=>u[b]).map(b=>{const v=Math.round(u[b]/f*100);return`<div class="sprint-stacked-segment status-${b}" style="width: ${v}%" title="${we(b)}: ${u[b]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(b=>u[b]).map(b=>`<span class="sprint-count-label status-${b}">${u[b]} ${we(b)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}ee({"filter-my-issues":()=>Fc(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),nu(t.identifier)},"retry-load-my-issues":()=>Tn(),"retry-load-sprint-status":()=>Ii()});const Uc=po,lg=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let ut=[],Gc=Promise.resolve();const cg={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function zc(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function Si(){return!!document.querySelector(".inline-dropdown")}function Vc(){return ut}function Wc(e){ut=e}async function Io(e,t,n,i){var u,f,b,v;e.preventDefault(),Et();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Uc.map((w,$)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="status" data-value="${w}">
                    ${je(w)}
                    <span>${we(w)}</span>
                    <span class="dropdown-shortcut">${$+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${mo.map((w,$)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="priority" data-value="${w}">
                    ${pt(w)}
                    <span>${Pe(w)}</span>
                    <span class="dropdown-shortcut">${$}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${lg.map(w=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="issue_type" data-value="${w}">
                    <span class="issue-type-badge type-${w}">${lt(w)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const w=Fe(),$=qe().find(I=>I.id===n)||It().find(I=>I.id===n)||((w==null?void 0:w.id)===n?w:null),S=As({keepId:($==null?void 0:$.assignee_id)||null});o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${S.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:S.map(({assignee:I,indent:B},E)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="${p(I.id)}">
                    ${vn(I,"avatar-small")}
                    <span>${go(I,B)}</span>
                    ${E<9?`<span class="dropdown-shortcut">${E+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const w=document.querySelector(`.issue-row[data-issue-id="${n}"]`),$=(w==null?void 0:w.dataset.projectId)||((u=Fe())==null?void 0:u.project_id),S=Nn($);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${S.map((I,B)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="estimate" data-value="${I.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${I.label}</span>
                    ${B<9?`<span class="dropdown-shortcut">${B}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const w=qe(),$=It(),S=Fe(),I=w.find(pe=>pe.id===n)||$.find(pe=>pe.id===n)||S,B=new Set(((I==null?void 0:I.labels)||[]).map(pe=>pe.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const E=o.getBoundingClientRect();let P=a.bottom+4,T=a.left;T+E.width>window.innerWidth-8&&(T=a.right-E.width),P+E.height>window.innerHeight-8&&(P=a.top-E.height-4),o.style.top=`${P}px`,o.style.left=`${Math.max(8,T)}px`,bi(o,{multiSelect:!0});let V=[];const se=C();if(se)try{V=await h.getLabels(se.id)}catch(pe){console.error("Failed to load labels:",pe)}if(!o.parentNode)return;Yc(o,n,V,B);const fe=o.getBoundingClientRect();let oe=a.bottom+4,Q=a.left;Q+fe.width>window.innerWidth-8&&(Q=a.right-fe.width),oe+fe.height>window.innerHeight-8&&(oe=a.top-fe.height-4),o.style.top=`${oe}px`,o.style.left=`${Math.max(8,Q)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const w=qe(),$=It(),S=Fe(),I=w.find(le=>le.id===n)||$.find(le=>le.id===n)||S,B=(I==null?void 0:I.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const E=o.getBoundingClientRect();let P=a.bottom+4,T=a.left;T+E.width>window.innerWidth-8&&(T=a.right-E.width),P+E.height>window.innerHeight-8&&(P=a.top-E.height-4),o.style.top=`${P}px`,o.style.left=`${Math.max(8,T)}px`,bi(o);let V=[];if(B)try{V=await h.getSprints(B),rv(B,V)}catch(le){console.error("Failed to load sprints:",le)}if(!o.parentNode)return;const se=V.filter(le=>le.status!=="completed"||le.id===(I==null?void 0:I.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${se.map((le,Ge)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="${p(le.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${m(le.name)}${le.status==="active"?" (Active)":""}</span>
                    ${Ge<9?`<span class="dropdown-shortcut">${Ge+1}</span>`:""}
                </button>
            `).join("")}
        `;const fe=o.getBoundingClientRect();let oe=a.bottom+4,Q=a.left;Q+fe.width>window.innerWidth-8&&(Q=a.right-fe.width),oe+fe.height>window.innerHeight-8&&(oe=a.top-fe.height-4),o.style.top=`${oe}px`,o.style.left=`${Math.max(8,Q)}px`,o.classList.remove("dropdown-positioning");const pe=le=>{const Ge=le.key;if(Ge==="Escape"||Ge==="Tab"){Et(),document.removeEventListener("keydown",pe),vi(null);return}if(zc(le,o))return;const ht=parseInt(Ge);if(isNaN(ht))return;const Qe=o.querySelectorAll(".dropdown-option");let Je=!1;ht===0?(Cn(n,"sprint_id",null),Je=!0):ht>=1&&ht<Qe.length&&(Qe[ht].click(),Je=!0),Je&&(document.removeEventListener("keydown",pe),vi(null))};vi(pe),document.addEventListener("keydown",pe),(b=o.querySelector(".dropdown-option[data-action]"))==null||b.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let l=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),l+r.height>window.innerHeight-8&&(l=a.top-r.height-4),o.style.top=`${l}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const d=w=>{const $=w.key;if($==="Escape"||$==="Tab"){Et(),document.removeEventListener("keydown",d);return}if(zc(w,o))return;const S=parseInt($);if(isNaN(S))return;let I=!1;if(t==="status"&&S>=1&&S<=6)Cn(n,"status",Uc[S-1]),I=!0;else if(t==="priority"&&S>=0&&S<=4)Cn(n,"priority",mo[S]),I=!0;else if(t==="estimate"){const B=Fe(),E=Nn(B==null?void 0:B.project_id);S>=0&&S<E.length&&(Cn(n,"estimate",E[S].value),I=!0)}I&&(document.removeEventListener("keydown",d),vi(null))};vi(d),document.addEventListener("keydown",d),(v=o.querySelector(".dropdown-option[data-action]"))==null||v.focus(),bi(o)}function dg(e,t,n,i){Io(e,t,n,i)}function ug(e,t,n){Gc=Gc.then(()=>Kc(e,t,n))}async function Kc(e,t,n){const i=qe(),s=It(),a=Fe(),o=i.find(d=>d.id===e)||s.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const u=(await h.updateIssue(e,{label_ids:c})).labels||[],f=i.findIndex($=>$.id===e);f!==-1&&(i[f].labels=u,dt([...i]));const b=s.findIndex($=>$.id===e);b!==-1&&(s[b].labels=u,Sn([...s])),(a==null?void 0:a.id)===e&&Ls({...a,labels:u});const v=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(v&&v.parentNode){const $=i.find(S=>S.id===e)||s.find(S=>S.id===e);$&&(v.outerHTML=tt($))}const w=document.querySelector(".property-labels-btn");w&&(w.innerHTML=u.length>0?u.map($=>`
                    <span class="issue-label" style="background: ${X($.color)}20; color: ${X($.color)}">${m($.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(x("update labels",d),n){const u=l>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function Yc(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${p(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${p(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${p(t)}" data-label-id="${p(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${X(s.color)}20; color: ${X(s.color)}">${m(s.name)}</span>
                </button>
            `}).join("")}
    `}async function Zc(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=C();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await h.createLabel(i.id,{name:s}),o=await h.getLabels(i.id);_s(o),a!=null&&a.id&&await Kc(e,a.id,null);const r=qe(),l=It(),c=Fe(),d=r.find(f=>f.id===e)||l.find(f=>f.id===e)||c,u=new Set(((d==null?void 0:d.labels)||[]).map(f=>f.id));t&&Yc(t,e,o,u),n.value=""}catch(a){x("create label",a)}finally{n.disabled=!1,n.focus()}}}function Ns(){const e=document.getElementById("create-issue-labels-label");e&&(ut.length===0?e.textContent="Labels":e.textContent=`Labels (${ut.length})`)}function So(e,{failed:t=!1}={}){const n=uc();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=ut.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${p(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${X(i.color)}20; color: ${X(i.color)}">${m(i.name)}</span>
                </button>
            `}).join("")}
    `}function pg(e){const t=ut.indexOf(e);t>=0?ut.splice(t,1):ut.push(e),ao(),Ns();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&So(n)}async function Xc(){const e=C();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await h.createLabel(e.id,{name:i}),a=await h.getLabels(e.id);_s(a),s!=null&&s.id&&!ut.includes(s.id)&&(ut.push(s.id),ao()),Ns(),t&&So(t),n.value=""}catch(s){x("create label",s)}finally{n.disabled=!1,n.focus()}}}async function Cn(e,t,n){Et();const i=document.querySelector(`.issue-row[data-issue-id="${e}"]`);i&&i.classList.add("updating");try{const s={};s[t]=n;const a=await h.updateIssue(e,s);if(!a||!a.id)throw new Error("Invalid response from server");const o=qe(),r=o.findIndex(u=>u.id===e);r!==-1&&(o[r]=a,dt([...o]));const l=It(),c=l.findIndex(u=>u.id===e);c!==-1&&(l[c]=a,Sn([...l]));const d=Fe();if((d==null?void 0:d.id)===e&&Ls(a),i&&i.parentNode){const u=o.find(f=>f.id===e)||l.find(f=>f.id===e)||a;if(u){i.outerHTML=tt(u);const f=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(f){f.classList.add("updated"),setTimeout(()=>f.classList.remove("updated"),500);const b=cg[t],v=b&&f.querySelector(`[data-dropdown-type="${b}"]`);v&&v.focus()}}}if(k("Issue updated","success"),t==="status"){const u=G();if(u)try{const b=(await h.getSprints(u)).find(v=>v.status==="active");bo(b||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const u=document.getElementById("issue-detail-view");u&&!u.classList.contains("hidden")&&mg(t,a)}}catch(s){x("update issue",s),i&&i.classList.remove("updating")}}function mg(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".detail-sidebar");if(!i)return;let s=e;e==="assignee_id"&&(s="assignee"),e==="sprint_id"&&(s="sprint"),e==="issue_type"&&(s="type");const a=i.querySelectorAll(".property-row");let o=null;for(const l of a){const c=l.querySelector(".property-label");if(c&&c.textContent.toLowerCase()===s.toLowerCase()){o=l;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${je(t.status)}
            <span>${we(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${pt(t.priority)}
            <span>${Pe(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${lt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const l=t.assignee_id?Jt(t.assignee_id):null,c=l?en(l):null;r.innerHTML=c?`${vn(l,"avatar-small")}<span>${m(c)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const l=bf(),c=t.sprint_id&&l?l.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${c?m(c.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${ra(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500),r==null||r.focus()}}ee({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?Cn(t.issueId,i,n==="null"?null:Number(n)):Cn(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{ug(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Zc(t.issueId)},"toggle-create-issue-label":(e,t)=>{pg(t.labelId)},"create-label-for-create-issue":()=>{Xc()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Zc(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Xc())}});const Qc=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function qt(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function An(e){const t=qt(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function St(){var s,a,o;const e=document.getElementById("issues-list");if(!e)return;const t=(s=e.querySelector(".issue-row.keyboard-selected"))==null?void 0:s.dataset.issueId;e.classList.add("issue-list-linear");const n=qe();if(n.length===0){const r=(o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim(),l=vo()>0,c=r&&r.length>=2;if(l||c){const d=vo(),u=[];c&&u.push(`search "${r}"`),l&&u.push(`${d} active filter${d>1?"s":""}`),e.innerHTML=q({icon:M.issues,heading:"No matching issues",description:`No issues match your ${u.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=q({icon:M.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});yi(-1);return}const i=$c();i==="status"?gg(e,n):i==="priority"?hg(e,n):i==="type"?vg(e,n):i==="assignee"?bg(e,n):i==="sprint"?yg(e,n):e.innerHTML=An(n)+n.map(r=>tt(r)).join(""),fg(t)}function fg(e){const t=mc();if(t<0)return;const n=document.querySelectorAll("#issues-list .issue-row");if(n.length===0){yi(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),yi(i),n[i].classList.add("keyboard-selected")}function gg(e,t){const n={};po.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=An(t);po.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${je(s)}</span>
                    <span class="group-title">${we(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${qt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>tt(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=i}function hg(e,t){const n={};wc.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=An(t);wc.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${pt(s)}</span>
                    <span class="group-title">${Pe(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${qt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>tt(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=i}function vg(e,t){const n={};Qc.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=An(t);Qc.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${lt(s)}</span></span>
                    <span class="group-title">${lt(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${qt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>tt(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=i}function bg(e,t){const n={},i="__unassigned__";n[i]=[];const s=As({includeIdle:!0});s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=An(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${qt(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[i].map(o=>tt(o)).join("")}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=en(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${p(o.id)}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${p(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${vn(o,"avatar-small")}</span>
                    <span class="group-title">${m(l)}${m(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${qt(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(d=>tt(d)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function yg(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const a={active:0,planned:1,completed:2},o=Ld();s.sort((l,c)=>{const d=o[l],u=o[c],f=d?a[d.status]??3:3,b=u?a[u.status]??3:3;return f-b});let r=An(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=o[l],u=d?d.name:l,f=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",b=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${b}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${b}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${m(u)}${f}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${qt(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${c.map(v=>tt(v)).join("")}
                </div>
            </div>
        `}),i[n].length>0&&(r+=`
            <div class="issue-group" data-group="${n}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${n}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">No Sprint</span>
                    <span class="group-count">${i[n].length}</span>
                    <span class="group-points">${qt(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${i[n].map(l=>tt(l)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function wg(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Jc(e,t){if(!e)return"";if(!t)return m(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return m(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${m(i)}<mark class="search-match">${m(s)}</mark>${m(a)}`}function kg(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=Jc(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}function tt(e){var u,f,b;const t=e.assignee_id?Jt(e.assignee_id):null,n=t?en(t):null,i=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),s=e.estimate!=null?ra(e.estimate,e.project_id):"",a=cr(e.estimate,e.project_id),o=e.sprint_id?Ld()[e.sprint_id]:null,r=o?o.name:null,l=(f=(u=document.getElementById("issue-search"))==null?void 0:u.value)==null?void 0:f.trim(),c=!!l&&((b=e.title)==null?void 0:b.toLowerCase().includes(l.toLowerCase())),d=l&&!c?kg(e.description,l):null;return`
        <div class="issue-row" data-issue-id="${p(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${p(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${p(e.id)}" title="Priority: ${Pe(e.priority)}">
                    ${pt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${p(e.id)}" title="Status: ${we(e.status)}">
                    ${je(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${lt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.id)}">${Jc(e.title,l)}${d?` <span class="issue-search-snippet" title="Matched in description">— ${d}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(v=>`
                            <span class="issue-label" style="background: ${X(v.color)}20; color: ${X(v.color)}">${m(v.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${p(e.id)}" title="Sprint: ${r?m(r):"None"}">
                    ${r?`<span class="sprint-badge">${m(r)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${p(e.id)}" title="${a?"Estimate outside current scale":`Estimate: ${s||"None"}`}">
                    ${s?`<span class="estimate-badge${a?" out-of-scale":""}">${s}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${i}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${p(e.id)}" title="${p(n||"Unassigned")}">
                    ${n?vn(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function pt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function je(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}ee({"toggle-group":(e,t)=>{wg(t.group)},"show-inline-dropdown":(e,t,n)=>{Io(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),te(t.issueId))}});let Ti=[];function Li(){return Ti}function $g(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Eg(e){const t=e==null?void 0:e.avatar_url,n=p((e==null?void 0:e.name)||"Agent");return t?$g(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${p(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${m(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function xg(e){var t;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{Ti=await h.getTeamAgents(e),Cs(ln,Li),Ei()}catch(n){console.error("Failed to load team agents:",n),x("load team agents",n)}}async function Os(e){var t;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{Ti=await h.getTeamAgents(e),Cs(ln,Li),Ei(),_g()}catch(n){x("load agents",n)}}function _g(){const e=document.getElementById("agents-list");if(e){if(Ti.length===0){e.innerHTML=q({icon:M.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=Ti.map(t=>{var l;const n=m(t.name),i=m(t.parent_user_name||"Unknown"),s=t.kind==="session",a=t.can_register?'<span class="agent-scope" title="Registers one identity per session; cannot write as itself">Registrar</span>':s?`<span class="agent-scope" title="Registered by a registrar for one session">Session${t.idle?" · idle":""}</span>`:"",r=!s&&t.is_active!==!1&&(t.parent_user_id===((l=xt())==null?void 0:l.id)||fa())?`<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}" data-can-register="${t.can_register?"true":"false"}">${t.can_register?"Stop being a registrar":"Make registrar"}</button>`:"";return`
      <div class="agent-item">
        ${Eg(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            ${a}
            <span class="agent-date">Created by ${i} ${He(t.created_at)}</span>
          </div>
        </div>
        ${r}
        <button class="btn btn-secondary" data-action="generate-agent-key" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Generate new key</button>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function Ig(){const e=Y();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),F()}function ed(e,t,n=!1){const i=m(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,F()}async function Sg(e){var r,l,c,d;e.preventDefault();const t=(r=C())==null?void 0:r.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value,o=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let u;s&&a?u=await h.createProjectAgent(a,n,i,o):u=await h.createTeamAgent(t,n,i,o),O(),ed("Agent Created",u.api_key,!!u.can_register)}catch(u){x("create agent",u)}return!1}async function Tg(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await h.createAgentKey(e);ed("New Agent Key",n.key)}catch(n){x("generate agent key",n)}}async function Lg(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await h.updateAgent(e,{can_register:n}),k(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),Os()}catch(s){x("change registrar",s)}}function Cg(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{k("Agent API key copied to clipboard","success")}).catch(()=>{k("Failed to copy","error")})}async function Ag(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),k("Agent deleted","success"),Os()}catch(n){x("delete agent",n)}}ee({"create-agent":e=>{Sg(e)},"copy-agent-key":()=>{Cg()},"dismiss-agent-modal":()=>{O(),Os()},"delete-agent":(e,t)=>{Ag(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{Tg(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{Lg(t.agentId,t.agentName,t.canRegister!=="true")}});function Bg(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function jg(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const a of e){const o=a.user_id||a.id;i.has(o)||(i.add(o),s.push({id:o,name:a.user_name||a.name||a.user_email||a.email||"User",email:a.user_email||a.email||"",handle:Bg(a),isAgent:!1}))}for(const a of t)!a.mention_handle||a.is_active===!1||a.idle||i.has(a.id)||n!==void 0&&a.agent_project_id&&a.agent_project_id!==n||(i.add(a.id),s.push({id:a.id,name:a.name||"Agent",email:"",handle:a.mention_handle,isAgent:!0}));return s}function Dg(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function To(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let a=-1;const o=()=>{s.classList.add("hidden"),s.innerHTML="",a=-1},r=d=>{var f,b;const u=s.querySelectorAll(".mention-suggestion");u.length!==0&&(a=(d%u.length+u.length)%u.length,u.forEach((v,w)=>v.classList.toggle("highlighted",w===a)),(b=(f=u[a]).scrollIntoView)==null||b.call(f,{block:"nearest"}))},l=d=>{const u=i.selectionStart||0,f=i.value.slice(0,u).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),b=i.value.slice(u);i.value=f+b,i.focus(),o()},c=()=>{const d=i.selectionStart||0;if(Dg(i.value,d)){o();return}const f=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!f){o();return}const b=f[2].toLowerCase(),v=jg(ln(),Li(),i.mentionContext||{}).filter(w=>!b||w.handle.includes(b)||w.name.toLowerCase().includes(b)||w.email.toLowerCase().includes(b)).slice(0,6);if(!v.length){o();return}s.innerHTML=v.map(w=>`
            <button type="button" class="mention-suggestion" data-handle="${p(w.handle)}">
                <span class="mention-name">${m(w.name)}${w.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${m(w.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((w,$)=>{w.addEventListener("click",()=>l(w.dataset.handle)),w.addEventListener("mouseenter",()=>r($))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const u=!s.classList.contains("hidden");if(d.key==="Escape"&&u){d.preventDefault(),d.stopPropagation(),o();return}if(u){if(d.key==="ArrowDown")d.preventDefault(),r(a+1);else if(d.key==="ArrowUp")d.preventDefault(),r(a-1);else if(d.key==="Enter"||d.key==="Tab"){const b=s.querySelectorAll(".mention-suggestion")[a];b&&(d.preventDefault(),l(b.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(o,150)})}const td=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Ci(e=null){const t=e||G()||"";Wc([]);const n=Y().map(o=>`
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
            </div>
            <!-- Status, priority, type, labels, assignee, estimate and sprint
                 are what most issues are created with, so they show as chips
                 up front; only template and due date stay behind the
                 disclosure (CHT-1770). -->
            <div class="create-issue-toolbar">
                <div class="toolbar-buttons">
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="status">
                        ${je("backlog")}
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
                                ${td.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
    `,F(),Ns();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=zm();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{lc(i.value,s.value)}),s.addEventListener("input",()=>{lc(i.value,s.value)}),i.focus()}function Mg(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function Rg(e){const t=td.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function Pg(e,t){const n=Y().find(i=>i.id===t);Wc([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?m(n.name):"Project"}</span>
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
                        ${je("backlog")}
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
    `,F(),Ns(),document.getElementById("create-issue-title").focus()}async function qg(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){k("Please enter a title","error");return}try{const d=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:Vc(),parent_id:e});O(),k(`Created sub-issue ${d.identifier}`,"success"),te(e)}catch(d){x("create sub-issue",d)}}async function Ng(e,t,n){var o,r;Et();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${kc.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${p(we(c))}">
                    ${je(c)}
                    <span>${we(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${mo.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${p(Pe(c))}">
                    ${pt(c)}
                    <span>${Pe(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${p(lt(c))}">
                    <span class="issue-type-badge type-${c}">${lt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!C())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=uc(),c=!1;if(l.length===0)try{l=await h.getLabels(C().id),_s(l)}catch(d){console.error("Failed to load labels:",d),c=!0}So(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),bi(a,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=As({keepId:l});a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:u})=>{const f=en(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${p(d.id)}" data-label="${p(f)}">
                    ${vn(d,"avatar-small")}
                    <span>${go(d,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=Nn(c);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${d.map(u=>{const f=u.value===null?"":String(u.value);return`
                <button class="dropdown-option ${f===l?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${p(f)}" data-label="${p(u.value?u.label:"Estimate")}">
                    <span>${m(u.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const l=document.getElementById("create-issue-sprint").value,c=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!c)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const u=(await h.getSprints(c)).filter(f=>f.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${u.map(f=>`
                        <button class="dropdown-option ${f.id===l?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${p(f.id)}" data-label="${p(f.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${m(f.name)}${f.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),bi(a)}function Og(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Hg(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,ao();const i=m(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${je(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${pt(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${lt(t)}</span><span id="create-issue-type-label">${i}</span>`)}Et(),s==null||s.focus()}async function nd({keepOpen:e=!1}={}){var w,$;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((w=document.getElementById("create-issue-sprint"))==null?void 0:w.value)||null,u=($=document.getElementById("create-issue-due-date"))==null?void 0:$.value,f=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}const b=document.getElementById("btn-create-issue"),v=document.getElementById("btn-create-and-new");b&&(b.disabled=!0),v&&(v.disabled=!0);try{const S=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:d,label_ids:Vc(),due_date:f});k(`Created ${S.identifier}`,"success"),Vm(),A()==="issues"?_t():A()==="my-issues"&&Tn(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",ef(),document.getElementById("create-issue-title").focus()):(O(),te(S.id))}catch(S){x("create issue",S)}finally{b&&(b.disabled=!1),v&&(v.disabled=!1)}}async function Fg(){await nd({keepOpen:!1})}async function Ug(){await nd({keepOpen:!0})}ee({"toggle-create-dropdown":(e,t,n)=>{Ng(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Hg(t.field,t.value,t.label)},"create-issue-submit":()=>{Fg()},"create-issue-and-new":()=>{Ug()},"update-create-project":()=>{Og()},"apply-template":e=>{Rg(e.target.value)},"toggle-create-options":()=>{Mg()},"create-sub-issue-submit":(e,t)=>{qg(t.parentId,t.projectId)}});async function id(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),s=Nn(t.project_id).map(o=>`
            <option value="${o.value===null?"":o.value}" ${t.estimate===o.value?"selected":""}>${m(o.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form data-action="update-issue" data-issue-id="${p(e)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${p(t.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <div id="edit-issue-description-draft-warning" class="description-draft-warning hidden"></div>
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
                            <option value="${o.id}" ${t.sprint_id===o.id?"selected":""}>${m(o.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,F();const a=document.getElementById("edit-issue-description");if(a){const o=$s(e);if(o){const r=ac(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?Qt(e,r,t.description||""):Qt(e,null)})}}catch(t){x("load issue",t)}}async function Gg(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",status:s.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};await h.updateIssue(t,c),$s(t)===c.description&&Qt(t,null),O(),await te(t),k("Issue updated!","success")}catch(n){x("update issue",n)}}async function zg(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await _t(),await Ze(),R("issues"),k("Issue deleted!","success")}catch(t){x("delete issue",t)}}ee({"update-issue":(e,t)=>{Gg(e,t.issueId)}});let he=null,sd=!1,Bn=!1,ad="new-comment";function Vg(){return he||(he=document.createElement("div"),he.className="quote-tooltip",he.setAttribute("role","button"),he.setAttribute("tabindex","0"),he.setAttribute("aria-label","Quote selection in comment"),he.textContent="Quote",he.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),Hs())}),he.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),he.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Hs()}),document.body.appendChild(he),he)}function od(e,t){const n=Vg();n.style.display="flex",Bn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!Bn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Ai(){he&&(he.style.display="none"),Bn=!1}function rd(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function Lo(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=rd(t.startContainer),i=rd(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function Wg(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function Hs(e=ad){const t=Lo();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=Wg(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Ai(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function Kg(){var i;if(!Lo())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return od(n.left+n.width/2,n.top),!0}function Yg(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!Lo()){Ai();return}od(t,n)},10)}function ld({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(ad=t,i.addEventListener("mouseup",Yg,n?{signal:n}:void 0),sd||(sd=!0,document.addEventListener("mousedown",s=>{Bn&&he&&!he.contains(s.target)&&Ai()}),document.addEventListener("selectionchange",()=>{Bn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&Ai()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&Bn&&Ai()}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&Kg()})))}function cd(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function dd(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const u=d[1],f=document.createElement("a");f.href=`#/issue/${u}`,f.className="issue-link",f.textContent=u,o.appendChild(f),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+d[3],o.appendChild(u),r=d.index+d[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function ud(e){if(!e)return"";const t=nt(e),n=document.createElement("div");return n.innerHTML=t,cd(n,dd),n.innerHTML}function jn(e){if(!e)return"";const t=nt(e),n=document.createElement("div");return n.innerHTML=t,cd(n,dd),n.innerHTML}let Co=!1,Ao=!1,Nt=!0,Bi=null,Fs=null,Us=null,Gs=null,Bo=!1,zs=null;function jo(e=null){Bo=!0,e&&(zs=e)}function Do(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔"}[e]||"•"}function Mo(e){return e.user_name||e.user_email||"Unknown"}function Ro(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${m(we(t(e.old_value)))}</strong> to <strong>${m(we(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${m(Pe(t(e.old_value)))}</strong> to <strong>${m(Pe(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${m(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${m(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=m(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=m(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue"}}function Zg(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),i=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),i&&i.classList.toggle("rotated")}function Xg(){Nt=!Nt;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",Nt),n&&n.classList.toggle("rotated",Nt)}async function ji(e){try{Bi=await h.getTicketRitualsStatus(e),pd(e)}catch(t){console.error("Failed to load ticket rituals:",t),Bi=null}}function pd(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!Bi){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:i}=Bi;if(n.length===0&&i.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(Nt=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",Nt);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",Nt);const r=n.some(d=>d.trigger==="ticket_close"),l=n.some(d=>d.trigger==="ticket_claim");let c="⚠️ Complete these rituals:";r&&l?c="⚠️ Pending rituals (claim before starting, close before completing):":l?c="⚠️ Complete these rituals before claiming this ticket (or closing it unclaimed):":r&&(c="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${c}</p>
                ${n.map(d=>`
                    <div class="ticket-ritual-item pending${d.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${d.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${m(d.name)}</span>
                            <span class="badge badge-trigger-${d.trigger||"ticket_close"}">${d.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${d.approval_mode||"auto"}">${d.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${d.prompt?nt(d.prompt):""}</div>
                        ${d.attestation?"":wv(d.last_rejection)}
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ke(d.attestation.attested_at)}</span>
                                ${d.attestation.note?`<div class="attestation-note markdown-body">${nt(d.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${gv(d,e)}
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
                            <span class="ticket-ritual-name">${m(d.name)}</span>
                        </div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ke(d.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function Vs(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await te(t.id,!1),!0):(R("my-issues",!1),!1)}catch{return R("my-issues",!1),!1}}function md(e){const t=xs(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function fd({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${p(n.id)}" data-identifier="${p(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${p(i.id)}" data-identifier="${p(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function Qg(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=Fe();if(!t)return;const n=md(t.id);Fs=n.prevIssue?n.prevIssue.id:null,Us=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=fd(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}ct(e=>{e==="detailNavContext"&&Qg()});let Po=0,gd=0,Ws=!1;function hd(){if(document.querySelector(".description-inline-editor"))return"editor";if(Si())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||Ws?"transient":null}function vd(e){return jo(),e==="editor"?"deferred":"retry"}function Jg(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=Fe())==null?void 0:n.id)===e}async function te(e,t=!0,{refresh:n=!1}={}){const i=n?Po:++Po,s=++gd;if(n){const a=hd();if(a)return vd(a)}try{t&&on(),n||(Nt=!0);let a=!1;const[o,r,l,c,d,u]=await Promise.all([h.getIssue(e),h.getComments(e).catch(y=>(console.error("Failed to load comments:",y),a=!0,[])),h.getActivities(e),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),b=[...u.pending_rituals||[],...u.completed_rituals||[]].filter(y=>y.attestation&&y.attestation.note).map(y=>({id:`attestation-${y.attestation.id}`,author_name:y.attestation.attested_by_name||"Unknown",author:y.attestation.attester||null,content:y.attestation.note,created_at:y.attestation.attested_at,is_attestation:!0,ritual_name:y.name,is_pending:!y.attestation.approved_at})),v=[...r,...b].sort((y,re)=>new Date(y.created_at)-new Date(re.created_at)),w=[o.parent_id?h.getIssue(o.parent_id):Promise.resolve(null),h.getSprints(o.project_id).catch(y=>(console.error("Failed to load sprints:",y),[]))],[$,S]=await Promise.all(w);if(i!==Po)return"dropped";let I=null,B=null;if(n){if(s!==gd||!Jg(e))return"dropped";const y=hd();if(y)return vd(y);B=window.scrollY;const re=document.activeElement;re!=null&&re.id&&document.getElementById("issue-detail-view").contains(re)&&(I={id:re.id,start:re.selectionStart,end:re.selectionEnd})}Bi=u;const E=d.filter(y=>y.relation_type==="blocks"&&y.direction==="outgoing"),P=d.filter(y=>y.relation_type==="blocked_by"||y.relation_type==="blocks"&&y.direction==="incoming"),T=d.filter(y=>y.relation_type==="relates_to");t&&history.pushState({issueId:e,view:A()},"",`/issue/${o.identifier}`),Ls(o),bc(S),Bo=!1,zs=null,document.querySelectorAll(".view").forEach(y=>y.classList.add("hidden"));const V=document.getElementById("issue-detail-view");V.classList.remove("hidden");const se=A()||"my-issues",fe=Y().find(y=>y.id===o.project_id),oe=o.assignee_id?Jt(o.assignee_id):null,Q=oe?en(oe):null,pe=o.sprint_id?S.find(y=>y.id===o.sprint_id):null,le=md(o.id),{prevIssue:Ge,nextIssue:ht}=le;V.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(se)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${fd(le)}
                        <span class="issue-detail-breadcrumb">${fe?m(fe.name):"Project"} › ${m(o.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(o.title)}</h1>

                    ${$?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent($.identifier)}" data-action="navigate-issue" data-issue-id="${p($.id)}" data-identifier="${p($.identifier)}">${$.identifier}: ${m($.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" data-action="edit-description" data-issue-id="${p(o.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                                ${$s(o.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span>':""}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${o.description?"":"empty"}" data-action="edit-description" data-issue-id="${p(o.id)}">
                            ${o.description?jn(o.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-create-sub-issue-modal" data-issue-id="${p(o.id)}" data-project-id="${p(o.project_id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${c.length===0?q({icon:M.issues,heading:"No sub-issues",description:"Break this issue down by creating sub-issues"}):c.map(y=>`
                                <a href="/issue/${encodeURIComponent(y.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${p(y.id)}" data-identifier="${p(y.identifier)}">
                                    <span class="sub-issue-status">${je(y.status)}</span>
                                    <span class="sub-issue-id">${y.identifier}</span>
                                    <span class="sub-issue-title">${m(y.title)}</span>
                                    ${y.estimate!=null?`<span class="sub-issue-estimate">${y.estimate}pts</span>`:""}
                                </a>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-add-relation-modal" data-issue-id="${p(o.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${E.length===0&&P.length===0&&T.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${P.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${P.map(y=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${je(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(y.related_issue_id)}" data-identifier="${p(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${m(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(o.id)}" data-relation-id="${p(y.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${E.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${E.map(y=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${je(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(y.related_issue_id)}" data-identifier="${p(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${m(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(o.id)}" data-relation-id="${p(y.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${T.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${T.map(y=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${je(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(y.related_issue_id)}" data-identifier="${p(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${m(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(o.id)}" data-relation-id="${p(y.id)}" title="Remove relation">
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
                            <h3>Comments${v.length>0?` <span class="section-count">(${v.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle comments">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="comments-list section-collapsible-content">
                            ${a?`
                                <div class="comments-error">
                                    Comments failed to load.
                                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${p(o.id)}">Retry</button>
                                </div>
                            `:""}
                            ${v.length===0?a?"":`
                                <div class="comments-empty">No comments yet</div>
                            `:v.map(y=>{var re;return`
                                <div class="comment ${y.is_attestation?"comment-attestation":""} ${y.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${y.is_attestation?"avatar-attestation":""}">${y.is_attestation?y.is_pending?"⏳":"✓":(y.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m(y.author_name||"User")}</span>
                                            ${y.author?bn(y.author):ro((re=Jt(y.author_id))==null?void 0:re.is_agent)}
                                            ${y.is_attestation?`<span class="comment-ritual-badge">${y.is_pending?"Pending approval — ":""}Ritual: ${m(y.ritual_name)}</span>`:""}
                                            <span class="comment-date">${Ke(y.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${ud(y.content)}</div>
                                    </div>
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="activity-section">
                        <div class="section-header section-header-collapsible" data-action="toggle-section" data-section="activity">
                            <h3>Activity${l.length>0?` <span class="section-count">(${l.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle activity">
                                <svg class="section-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="activity-list section-collapsible-content collapsed">
                            ${l.length===0?q({icon:M.activity,heading:"No activity yet",description:"Activity will appear here as the issue is updated"}):l.map(y=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Do(y.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Ro(y)}</span>
                                        <span class="activity-actor">by ${m(Mo(y))} ${bn(y.user)}</span>
                                        <span class="activity-time">${Ke(y.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <form class="comment-form comment-form-sticky" data-action="save-comment" data-issue-id="${p(o.id)}">
                        <textarea id="new-comment" placeholder="Write a comment... (${/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl"}+Enter to submit)" rows="1"></textarea>
                        <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                        <button type="submit" class="btn btn-primary btn-sm comment-submit-btn">Comment</button>
                    </form>
                </div>

                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${p(o.id)}">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${je(o.status)}
                                <span>${we(o.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${p(o.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${pt(o.priority)}
                                <span>${Pe(o.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${p(o.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${o.issue_type||"task"}">${lt(o.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${p(o.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${Q?`${vn(oe,"avatar-small")}<span>${m(Q)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${p(o.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${pe?m(pe.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${p(o.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${o.labels&&o.labels.length>0?o.labels.map(y=>`
                                        <span class="issue-label" style="background: ${X(y.color)}20; color: ${X(y.color)}">${m(y.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${fe?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(fe.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${p(o.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${cr(o.estimate,o.project_id)?" out-of-scale":""}" ${cr(o.estimate,o.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${ra(o.estimate,o.project_id)}</span>
                            </button>
                        </div>

                        ${o.due_date?`
                        <div class="property-row">
                            <span class="property-label">Due date</span>
                            <span class="property-value-static">${new Date(o.due_date).toLocaleDateString()}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created by</span>
                            <span class="property-value-static">${m(o.creator_name||"Unknown")} ${bn(o.creator)}</span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(o.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="sidebar-section sidebar-actions">
                        <div class="sidebar-overflow-menu">
                            <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                            </button>
                            <div class="overflow-menu-dropdown hidden">
                                <button class="overflow-menu-item" data-action="edit" data-issue-id="${p(o.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Edit all fields
                                </button>
                                <button class="overflow-menu-item" data-action="show-issue-description-revisions" data-issue-id="${p(o.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    Description history
                                </button>
                                <button class="overflow-menu-item overflow-menu-danger" data-action="delete" data-issue-id="${p(o.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    Delete issue
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        `,Gs&&Gs.abort(),Gs=new AbortController;const{signal:Qe}=Gs,Je=document.querySelector(".sidebar-overflow-trigger"),Yt=document.querySelector(".overflow-menu-dropdown");if(Je&&Yt){const y=()=>{Yt.classList.add("hidden"),Je.setAttribute("aria-expanded","false")},re=()=>{const W=Yt.classList.toggle("hidden");Je.setAttribute("aria-expanded",String(!W))};Je.addEventListener("click",re,{signal:Qe}),document.addEventListener("click",W=>{!Je.contains(W.target)&&!Yt.contains(W.target)&&y()},{signal:Qe}),Yt.addEventListener("keydown",W=>{W.key==="Escape"&&(y(),Je.focus())},{signal:Qe})}pd(o.id),To("new-comment","mention-suggestions",{projectId:o.project_id}),ld({signal:Qe});const vt=document.getElementById("new-comment");if(Ws=!1,vt){vt.addEventListener("compositionstart",()=>{Ws=!0},{signal:Qe}),vt.addEventListener("compositionend",()=>{Ws=!1},{signal:Qe});const y=ic(o.id);y&&(vt.value=y),vt.addEventListener("input",()=>{ks(o.id,vt.value)}),vt.addEventListener("keydown",re=>{var W;re.key==="Enter"&&(re.metaKey||re.ctrlKey)&&(re.preventDefault(),(W=vt.closest("form"))==null||W.requestSubmit())})}Fs=Ge?Ge.id:null,Us=ht?ht.id:null;const Ba=y=>{var rs;if((y.metaKey||y.ctrlKey)&&y.shiftKey&&(y.key===">"||y.key==="."||y.code==="Period")&&Hs()){y.preventDefault();return}if(y.metaKey||y.ctrlKey||y.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||y.target.tagName==="INPUT"||y.target.tagName==="TEXTAREA"||y.target.tagName==="SELECT"||y.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||Si())return;if(y.key==="ArrowLeft"&&Fs)y.preventDefault(),te(Fs);else if(y.key==="ArrowRight"&&Us)y.preventDefault(),te(Us);else if(y.key==="c"){y.preventDefault(),y.stopImmediatePropagation();const K=document.getElementById("new-comment");K&&(K.focus(),K.scrollIntoView({behavior:"smooth",block:"nearest"}))}else y.key==="j"?(y.preventDefault(),y.stopImmediatePropagation(),Ks(1)):y.key==="k"?(y.preventDefault(),y.stopImmediatePropagation(),Ks(-1)):y.key==="d"&&(y.preventDefault(),(rs=document.querySelector('[data-action="edit-description"]'))==null||rs.click());const W={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[y.key];if(W){const K=document.querySelector(`.property-row[data-field="${W}"]`);K&&(y.preventDefault(),K.click())}};if(document.addEventListener("keydown",Ba,{signal:Qe}),I){const y=document.getElementById(I.id);if(y&&(y.focus({preventScroll:!0}),typeof I.start=="number"&&typeof y.setSelectionRange=="function"))try{y.setSelectionRange(I.start,I.end)}catch{}}return B!==null&&window.scrollTo(0,B),"rendered"}catch(a){return n?console.error("Failed to refresh issue detail:",a):x("load issue",a),"failed"}}async function eh(e,t){if(e.preventDefault(),Co)return!1;const n=document.getElementById("new-comment").value;ks(t,null),Co=!0;try{const i=await h.createComment(t,n);k("Comment added!","success"),oo(i),await te(t)}catch(i){ks(t,n),x("add comment",i)}finally{Co=!1}return!1}async function th(e){const t=Fe()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" data-action="set-description-editor-mode" data-mode="write">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" data-action="set-description-editor-mode" data-mode="preview">Preview</button>
            </div>
            <div id="description-draft-warning" class="description-draft-warning hidden"></div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${m(t.description||"")}</textarea>
            <div id="edit-description-mention-suggestions" class="mention-suggestions hidden"></div>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=$s(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=ac(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}To("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?Qt(e,c,t.description||""):Qt(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&bd()}),a.addEventListener("keydown",c=>{var d,u;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,f;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(Qt(e,null),Bo){te(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?jn(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var b,v;if(Ao)return;const c=(b=document.getElementById("edit-description"))==null?void 0:b.value;if(c===void 0)return;const d=zs?zs.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const w=document.getElementById("description-draft-warning");w&&(w.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",w.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");Ao=!0,u&&(u.disabled=!0);const f=window.scrollY;try{await h.updateIssue(e,{description:c}),Qt(e,null),k("Description updated","success"),await te(e,!1),window.scrollTo(0,f),(v=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||v.focus()}catch(w){x("update description",w)}finally{Ao=!1,u&&(u.disabled=!1)}})}function bd(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?jn(n):'<span class="text-muted">Nothing to preview.</span>'}function nh(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?bd():i.focus()}function ih(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,F(),document.getElementById("relation-issue-search").focus()}async function sh(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=C())==null?void 0:i.id,o=(await h.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${p(r.id)}" data-identifier="${p(r.identifier)}" data-title="${p(r.title)}">
                <span class="link-result-id">${m(r.identifier)}</span>
                <span class="link-result-title">${m(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function ah(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function oh(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function rh(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return k("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(i,t,"blocks"):await h.createRelation(t,i,n),O(),k("Relation added","success"),te(t)}catch(s){x("add relation",s)}return!1}async function lh(e,t){try{await h.deleteRelation(e,t),k("Relation removed","success"),te(e)}catch(n){x("remove relation",n)}}function Ks(e){const t=Fe();if(!t)return;const n=xs();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||te(n[s].id)}ee({"retry-issue-comments":(e,t)=>{te(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{dg(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||th(t.issueId)},"toggle-section":(e,t)=>{Zg(t.section)},"toggle-ticket-rituals":()=>{Xg()},"save-comment":(e,t)=>{eh(e,t.issueId)},"show-add-relation-modal":(e,t)=>{ih(t.issueId)},"remove-relation":(e,t)=>{lh(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{Pg(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{rh(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{sh(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{ah(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{oh()},"set-description-editor-mode":(e,t)=>{nh(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>Ks(-1),"navigate-next-issue":()=>Ks(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),id(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),zg(t.issueId)}});function yd(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let Dn=[],Di=[],Ys=null,ie=new Set,Mn="list",sn=!1,qo=null,Zs=null,No=null,Oo=null,wd=null;function kd(e){if(wd!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const Ho=Wm();(Ho==="list"||Ho==="grid")&&(Mn=Ho);function $d(e){if(e!=="list"&&e!=="grid")return;Mn=e,e==="grid"&&sn&&Fo(),Km(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Ot()}function Ed(){if(Mn!=="list")return;sn=!0,ie.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Ot(),Pn()}function Fo(){sn=!1,ie.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Ot(),Pn()}function ch(){qo&&clearTimeout(qo),qo=setTimeout(()=>{Ot()},300)}function dh(){const e=document.getElementById("doc-search");e&&(e.value=""),Ot()}async function uh(){Ye(null)}async function ph(){const e=document.getElementById("doc-search");e&&(e.value=""),Ye(null)}function mh(){var s;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((s=document.getElementById("doc-search"))==null?void 0:s.value)||"",n=G()||"",i=[];if(t&&i.push(`<span class="filter-chip">Search: "${m(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=Y().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";i.push(`<span class="filter-chip">Project: ${m(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(i.length>0){let a=i.join(" ");i.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function fh(){return Dn}function Ot(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";mh(),Di=Dn.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),Di.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),wh("",Mn)}let Rn=0;async function gh(){var i;const e=Ys||((i=C())==null?void 0:i.id);if(!e)return;const t=++Rn,n=G()||null;try{const s=await h.getDocuments(e,n);if(t!==Rn)return;Dn=s,Ot()}catch(s){if(t!==Rn)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=q({icon:M.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),x("load documents",s)}}ct(e=>{e==="currentProject"&&A()==="documents"&&gh()});async function an(e,t=null){var s;if(e||(e=(s=C())==null?void 0:s.id),!e)return;Ys=e,fc(-1);const n=++Rn,i=document.getElementById("documents-list");i&&(i.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null&&(t=G()||null);try{const a=await h.getDocuments(e,t);if(n!==Rn)return;Dn=a;const o=document.getElementById("doc-view-list"),r=document.getElementById("doc-view-grid");o&&r&&(o.classList.toggle("active",Mn==="list"),r.classList.toggle("active",Mn==="grid")),Ot()}catch(a){if(n!==Rn)return;const o=document.getElementById("documents-list");o&&(o.innerHTML=q({icon:M.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),x("load documents",a)}}function xd(){var t,n;if(A()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=Ys||((n=C())==null?void 0:n.id);e&&an(e).catch(i=>console.error("Failed to refresh documents list:",i))}function _d(e){kd(e)&&$e(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function hh(e,t){kd(e)&&(k(`Document "${t||"Untitled"}" was deleted`,"warning"),R("documents"))}function vh(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${X(t.color)}20; color: ${X(t.color)}">${m(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function bh(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${vh(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${p(e.id)}" data-action="view-document" data-document-id="${p(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${m(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${m(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?m(yd(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${m(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function yh(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${X(r.color)}20; color: ${X(r.color)}">${m(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?yd(e.content).substring(0,80):"No content",s=sn?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${p(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${ie.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${sn&&ie.has(e.id)?" selected":""}" data-action="${sn?"toggle-doc-selection":"view-document"}" data-document-id="${p(e.id)}" data-doc-id="${p(e.id)}">
      ${s}
      <div class="document-list-icon">${m(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${m(e.title)}</div>
        <div class="document-list-snippet text-muted">${m(i)}${e.content&&e.content.length>80?"...":""}</div>
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
  `}function wh(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;ie.clear(),Pn();const i=Di;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,u=G(),f=d||u;n.innerHTML=q({icon:f?M.search:M.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?bh:yh,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=Y();i.forEach(d=>{let u,f;if(e==="project")if(u=d.project_id||"__global__",u==="__global__")f="Global (Team-wide)";else{const b=r.find(v=>v.id===d.project_id);f=b?b.name:"Unknown Project"}else e==="sprint"&&(u=d.sprint_id||"__no_sprint__",f=d.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:f,docs:[]}),o[u].docs.push(d)});let l="";for(const[d,u]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${m(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${f}">
          ${u.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function kh(e){ie.has(e)?ie.delete(e):ie.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=ie.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",ie.has(e)),Pn()}function $h(){Di.forEach(e=>ie.add(e.id)),Di.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),Pn()}function Id(){ie.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),ie.clear(),Pn()}function Pn(){const e=document.getElementById("doc-bulk-actions");e&&(sn?(e.classList.remove("hidden"),ie.size>0?e.innerHTML=`
        <span class="bulk-count">${ie.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function Eh(){if(ie.size===0){k("No documents selected","error");return}const t=Y().map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${ie.size} Document${ie.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${ie.size} selected document${ie.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,F()}async function xh(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(ie);let i=0;const s=[];for(const l of n)try{await h.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((o=Dn.find(d=>d.id===l))==null?void 0:o.title)||l)}O(),Id(),s.length===0?k(`Moved ${i} document${i>1?"s":""}!`,"success"):k(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=C())==null?void 0:r.id;return await an(a),!1}async function _h(){var a,o;if(ie.size===0){k("No documents selected","error");return}const e=ie.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(ie);let n=0;const i=[];for(const r of t)try{await h.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((a=Dn.find(c=>c.id===r))==null?void 0:a.title)||r)}Fo(),i.length===0?k(`Deleted ${n} document${n>1?"s":""}!`,"success"):k(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=C())==null?void 0:o.id;await an(s)}async function Ih(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await h.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${p(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${m(s.author_name||"Unknown")}</span>
                ${bn(s.author)}
                <span class="comment-date">${Ke(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${ud(s.content)}</div>
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
    `}}function Sh(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=ic(e);s&&(i.value=s),i.addEventListener("input",()=>{ks(e,i.value)},{signal:t}),i.addEventListener("keydown",a=>{var o;a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),(o=i.closest("form"))==null||o.requestSubmit())},{signal:t}),To("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function $e(e,t=!0){try{t&&on();const n=await h.getDocument(e);wd=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(T=>T.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await Ih(n);let a=null,o=null,r=!1;if(n.project_id){const V=Y().find(se=>se.id===n.project_id);if(a=V?V.name:null,n.sprint_id)try{const se=await h.getSprint(n.sprint_id);o=se?se.name:null}catch(se){console.error("Failed to load sprint name:",se),r=!0}}let l=n.content||"";const c=U.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=fh(),u=d.findIndex(T=>T.id===n.id),f=u>0?d[u-1]:null,b=u>=0&&u<d.length-1?d[u+1]:null,v=u>=0,w=A()||"documents",$=n.labels&&n.labels.length>0?n.labels.map(T=>`
          <span class="issue-label" style="background: ${X(T.color)}20; color: ${X(T.color)}">
            ${m(T.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${p(n.id)}" data-label-id="${p(T.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let S='<span class="text-muted">None</span>';try{const T=await h.getDocumentIssues(n.id);T.length>0&&(S=T.map(V=>`
          <div class="linked-item">
            <span class="linked-item-id">${m(V.identifier)}</span>
            <span class="linked-item-title">${m(V.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${p(n.id)}" data-issue-id="${p(V.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(T){console.error("Failed to load linked issues:",T),S=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${p(w)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${v?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${f?`data-action="view-document" data-document-id="${p(f.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${u+1} / ${d.length}</span>
              <button class="issue-nav-btn" ${b?`data-action="view-document" data-document-id="${p(b.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?m(a)+" ›":""} ${m(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?m(n.icon)+" ":""}${m(n.title)}</h1>

          <div class="document-content markdown-body">${l?jn(l):'<p class="text-muted">No content</p>'}</div>

          ${s}
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-section">
            <h4>Properties</h4>

            <div class="property-row">
              <span class="property-label">Project</span>
              <span class="property-value-static">${a?m(a):'<span class="text-muted">Global</span>'}</span>
            </div>

            ${o||r?`
            <div class="property-row">
              <span class="property-label">Sprint</span>
              <span class="property-value-static">${r?`<span class="sidebar-load-error">Couldn't load</span>`:m(o)}</span>
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
              <span class="property-value-static">${m(n.author_name||"Unknown")} ${bn(n.author)}</span>
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
    `,Zs&&Zs.abort(),Zs=new AbortController;const{signal:I}=Zs,B=i.querySelector(".sidebar-overflow-trigger"),E=i.querySelector(".overflow-menu-dropdown");if(B&&E){const T=()=>{E.classList.add("hidden"),B.setAttribute("aria-expanded","false")},V=()=>{const se=E.classList.toggle("hidden");B.setAttribute("aria-expanded",String(!se))};B.addEventListener("click",V,{signal:I}),document.addEventListener("click",se=>{!B.contains(se.target)&&!E.contains(se.target)&&T()},{signal:I}),E.addEventListener("keydown",se=>{se.key==="Escape"&&(T(),B.focus())},{signal:I})}Sh(n.id,I,n.project_id||null),ld({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:I}),No=f?f.id:null,Oo=b?b.id:null;const P=T=>{if((T.metaKey||T.ctrlKey)&&T.shiftKey&&(T.key===">"||T.key==="."||T.code==="Period")&&Hs("new-doc-comment")){T.preventDefault();return}T.metaKey||T.ctrlKey||T.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||T.target.tagName==="INPUT"||T.target.tagName==="TEXTAREA"||T.target.tagName==="SELECT"||T.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(T.key==="ArrowLeft"&&No?(T.preventDefault(),$e(No)):T.key==="ArrowRight"&&Oo&&(T.preventDefault(),$e(Oo)))};document.addEventListener("keydown",P,{signal:I})}catch(n){x("load document",n)}}async function Xs(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await h.getSprints(t);let o=n;if(i&&!n){const l=a.find(c=>c.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${m(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function Uo(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${m(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function Th(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?jn(r):'<span class="text-muted">Nothing to preview.</span>'}}function Go(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=rc(e);if(o){const l=Gm(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){Es(e,null);return}Es(e,l,n)};[i,s,a].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function Sd(){Mi=null;const e=Y(),t=Vd()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${m(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${Uo("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,F(),Go("new"),t&&await Xs("doc-sprint",t,null,!0)}let Mi=null;async function Lh(e,t,n){Mi=n||null;const s=Y().map(a=>`<option value="${p(a.id)}" ${a.id===t?"selected":""}>${m(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${Uo("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,F(),Go("new"),t&&await Xs("doc-sprint",t,e)}async function Ch(e){var a;e.preventDefault();const t=(a=C())==null?void 0:a.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await h.createDocument(t,s),Es("new",null),await an(t),O(),k("Document created!","success"),Mi){const o=Mi;Mi=null,o()}}catch(o){x("create document",o)}return!1}let zo=null,Ri=null,Vo=!1;async function Td(e){try{const t=await h.getDocument(e);zo=e,Ri={title:t.title||"",content:t.content||""},Vo=!1;const i=Y().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${m(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${Uo("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${p(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,F(),Go(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await Xs("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){x("load document",t)}}async function Ah(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&zo===t&&Ri&&!Vo){let o=null;try{o=await h.getDocument(t)}catch{}if(o&&((o.title||"")!==Ri.title||(o.content||"")!==Ri.content))return Vo=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await h.updateDocument(t,s),zo=null,Ri=null;const o=rc(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&Es(t,null),O(),await $e(t),k("Document updated!","success")}catch(o){x("update document",o)}return!1}async function Bh(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=C())==null?void 0:t.id;await an(n),R("documents"),k("Document deleted!","success")}catch(n){x("delete document",n)}}function jh(e,t){Xs(e,t)}async function Dh(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${p(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,F()}async function Mh(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=C())==null?void 0:i.id,a=await h.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${p(t)}" data-issue-id="${p(o.id)}">
        <span class="link-result-id">${m(o.identifier)}</span>
        <span class="link-result-title">${m(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function Rh(e,t){try{await h.linkDocumentToIssue(e,t),O(),k("Issue linked!","success"),await $e(e,!1)}catch(n){x("link issue",n)}}async function Ph(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),k("Issue unlinked!","success"),await $e(e,!1)}catch(n){x("unlink issue",n)}}let Wo=!1;async function qh(e,t){if(e.preventDefault(),Wo)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return k("Please enter a comment","error"),!1;Wo=!0;try{const s=await h.createDocumentComment(t,i);n.value="",k("Comment added!","success"),oo(s),await $e(t,!1)}catch(s){x("add comment",s)}finally{Wo=!1}return!1}async function Nh(e){var n;const t=(n=C())==null?void 0:n.id;if(!t){k("No team selected","error");return}try{const i=await h.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,F();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${p(e)}" data-label-id="${p(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${X(a.color)}; color: white;">${m(a.name)}</span>
        ${a.description?`<span class="text-muted">${m(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,F()}catch(i){x("load labels",i)}}async function Oh(e,t){try{await h.addLabelToDocument(e,t),O(),k("Label added!","success"),await $e(e,!1)}catch(n){x("add label",n)}}async function Hh(e,t){try{await h.removeLabelFromDocument(e,t),k("Label removed!","success"),await $e(e,!1)}catch(n){x("remove label",n)}}ee({"view-document":(e,t)=>{e.preventDefault(),$e(t.documentId)},"set-doc-editor-mode":(e,t)=>{Th(t.target,t.mode)},"retry-load-documents":()=>{an(Ys)},"retry-document-comments":(e,t)=>{$e(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{kh(t.docId)},"clear-doc-search":()=>{dh()},"clear-doc-project-filter":()=>{uh()},"clear-all-doc-filters":()=>{ph()},"show-bulk-move-modal":()=>{Eh()},"bulk-delete-documents":()=>{_h()},"select-all-docs":()=>{$h()},"clear-doc-selection":()=>{Id()},"exit-selection-mode":()=>{Fo()},"enter-selection-mode":()=>{Ed()},"handle-bulk-move":e=>{xh(e)},"unlink-document-issue":(e,t)=>{Ph(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{Dh(t.documentId)},"add-document-comment":(e,t)=>{qh(e,t.documentId)},"remove-label-from-doc":(e,t)=>{Hh(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{Nh(t.documentId)},"show-edit-document-modal":(e,t)=>{Td(t.documentId)},"delete-document":(e,t)=>{Bh(t.documentId)},"create-document":e=>{Ch(e)},"update-doc-sprint-dropdown":(e,t,n)=>{jh(t.sprintSelect,n.value)},"update-document":(e,t)=>{Ah(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{Mh(n.value,t.documentId)},"link-to-issue":(e,t)=>{Rh(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{Oh(t.documentId,t.labelId)}});let Ht=[],Qs={},Js=new Set,Tt=null,Ko=null,ea=[],Pi=[],Yo=[];function Ld(){return Qs}function Fh(){return Ko}function Uh(){return Tt}ct(e=>{e==="currentProject"&&A()==="sprints"&&Ft()});let Zo=0;async function Ft(){hc(-1);const e=G();if(!e){const i=document.getElementById("sprints-list");i&&(i.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}const t=++Zo;ov();const n=document.getElementById("sprints-list");n&&(n.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{await h.getCurrentSprint(e);const i=await h.getSprints(e);if(t!==Zo)return;Ht=i,Gh(),await ta()}catch(i){return t!==Zo?void 0:(n&&(n.innerHTML=q({icon:M.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),x("load sprints",i),!1)}return!0}function Gh(){const e=document.getElementById("sprints-list");if(!e)return;const t=Ht.find(a=>a.status==="active"),n=Ht.find(a=>a.status==="planned"),i=Ht.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
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
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${p(t.id)}" data-sprint-name="${p(t.name)}" data-budget="${t.budget||""}" data-project-id="${p(t.project_id)}">Edit Sprint</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" data-action="show-limbo-details-modal">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" data-action="show-close-sprint-confirmation" data-sprint-id="${p(t.id)}">Close Sprint</button>
                    `}
                </div>
            </div>
        `,s+=zh(t)}if(n){const a=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",o=(n.budget?`${n.budget} point budget`:"No budget set")+(a?` <span class="text-muted">· ${a}</span>`:"");s+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${p(n.id)}" data-sprint-url="/sprint/${p(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${m(n.name)}</div>
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
                            <span class="sprint-history-name">${m(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=s||q({icon:M.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function Cd(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${tr(e.activated_at)}, closed ${tr(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${tr(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function zh(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${m(Cd(e))||"not yet activated"}</span>
                    <span>${m(r)}</span>
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
    `}let Xo=0;async function qn(e,t=!0){var n;try{t&&on();const i=++Xo,s=A(),a=await h.getSprint(e);if(i!==Xo)return;if(!a){k("Sprint not found","error"),R("sprints");return}Ko=a;const o=(n=C())==null?void 0:n.id,[r,l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),o?h.getDocuments(o,a.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==Xo)return;ea=r,Yo=l,Pi=c,A()===s&&wn(ea),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Wh()}catch(i){console.error("Failed to load sprint:",i),k("Failed to load sprint","error"),R("sprints")}}async function Vh(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){k("Invalid sprint ID","error"),R("sprints",!1);return}try{await qn(e,!1)}catch{R("sprints",!1)}}function Wh(){const e=Ko,t=ea;document.querySelectorAll(".view").forEach(b=>b.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=A()||"sprints",s=t.filter(b=>$i.includes(b.status)),a=t.filter(b=>b.status==="done"),o=t.filter(b=>b.status==="canceled"),r=b=>b.reduce((v,w)=>v+(w.estimate||0),0),l=r(t.filter(b=>b.status!=="canceled")),c=r(a),d=o.length>0?`<div class="stat-note">${o.length} canceled not counted</div>`:"";let u="";e.status==="active"?u='<span class="badge badge-status-active">Active</span>':e.status==="planned"?u='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(u='<span class="badge badge-status-completed">Completed</span>');const f=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${p(i)}">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${m(e.name)}</h2>
                ${u}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.activated_at?`
                <div class="sprint-detail-dates">
                    ${m(Cd(e))}
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
                ${s.length===0?q({icon:M.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(b=>Qo(b)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?q({icon:M.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(b=>Qo(b)).join("")}
                    </div>
                `}
            </details>

            ${o.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${o.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${o.map(b=>Qo(b)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${Yh()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${Pi.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${p(e.id)}"
                        data-project-id="${p(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${Pi.length>0?`
                    <div class="sprint-issues-list">
                        ${Pi.map(b=>Kh(b)).join("")}
                    </div>
                `:q({icon:M.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function Qo(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...kc,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${p(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${m(e.identifier)}</span>
            <span class="sprint-issue-title">${m(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${cv(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Kh(e){const t=m(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${p(e.id)}" data-document-url="/document/${p(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${m(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${Ke(e.created_at)}</span>
            </span>
        </div>
    `}function Yh(){const e=Yo;if(!e||e.length===0)return`
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
                            <span class="ledger-item-identifier">${m(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${m(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${Zh(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function Zh(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Xh(e,t,n,i){const s=i?Dv(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${p(e)}" data-project-id="${p(i)}" data-current-budget="${p(n??"")}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${p(t)}" placeholder="Sprint name">
            </div>
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${s?`<small class="form-hint">${m(s)}</small>`:""}
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
    `,F()}async function Qh(e,t,n){var u,f,b,v;e.preventDefault();const i=(f=(u=document.getElementById("sprint-name"))==null?void 0:u.value)==null?void 0:f.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((b=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:b.value)||"this",r=(v=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:v.dataset.currentBudget,l=r?parseInt(r):null,c=a!==l,d=Ht.find(w=>w.id===t);try{const w={};i&&(w.name=i);const $=o==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!$&&(w.budget=a),Object.keys(w).length&&await h.updateSprint(t,w),o==="planned"){const I=Ht.filter(B=>B.status==="planned"&&B.id!==t);for(const B of I)await h.updateSprint(B.id,{budget:a})}o==="default"&&n&&await h.updateProject(n,{default_sprint_budget:a}),await Ft(),O(),k(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(w){x("update budget",w)}return!1}const Ad="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function Jh(e,t=null){const n=Ht.find(c=>c.id===e),i=n?Y().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${Ad}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let a;try{a=await h.updateSprint(e,{budget_follows_default:!0})}catch(c){x("reset budget to project default",c),t&&(t.disabled=!1);try{await Ft()}catch{}return}const o=(a==null?void 0:a.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await Ft()!==!1}catch{l=!1}k(`'${o}' follows the project default budget again: ${s(a==null?void 0:a.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((a==null?void 0:a.budget)===null||(a==null?void 0:a.budget)===void 0)&&k(Ad,"warning")}async function ev(e){const t=Ht.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,F();const n=$i;let i=0,s=!1,a=!1;try{const[l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${m(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':i>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${i}</strong> incomplete issue${i===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${s?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${p(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function tv(e){try{const t=await h.closeSprint(e);await Ft(),Dd(),t.limbo?iv(t):k("Sprint completed!","success")}catch(t){x("complete sprint",t)}}async function ta(){const e=G();if(e)try{Tt=await h.getLimboStatus(e),nv()}catch(t){console.error("Failed to load limbo status:",t)}}function nv(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Tt||!Tt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Tt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function iv(e){const t=G();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,F(),sv(t)}async function sv(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${m(i.name)} <span class="ritual-mode">(${m(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${nt(i.prompt)}</div>
                    ${er(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function Jo(){var t,n;if(!Tt)return;const e=G();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Tt.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${m(i.name)}</strong>
                            <span class="badge badge-ritual-${p(i.approval_mode)}">${m(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${nt(i.prompt)}</div>
                        ${er(i.attestation)}
                        ${av(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=Tt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Tt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${m(i.name)}</div>
                            ${er(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,F()}function er(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${m(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${m(Ke(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${nt(e.note)}</div>
        </div>
    `}function av(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${p(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Bd(e){for(const t of e)if(!Js.has(t))try{(await h.getSprints(t)).forEach(i=>{Qs[i.id]=i}),Js.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function ov(){Qs={},Js=new Set,ea=[],Yo=[],Pi=[],na={}}function rv(e,t){t.forEach(n=>{Qs[n.id]=n}),Js.add(e)}let na={};function lv(e){return na[e]}function jd(e,t){na[e]=t??null}function Dd(){na={}}ee({"retry-load-sprints":()=>Ft(),"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}qn(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;Xh(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{Jh(t.sprintId,n)},"show-limbo-details-modal":()=>{Jo()},"show-close-sprint-confirmation":(e,t)=>{ev(t.sprintId)},"handle-update-budget":(e,t)=>{Qh(e,t.sprintId,t.projectId)},"close-modal":()=>{O()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,O(),tv(t.sprintId)},"dismiss-limbo-modal":()=>{O(),ta()},"approve-ritual":(e,t)=>{mv(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{Rd(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}te(t.issueId)},"create-sprint-document":async(e,t)=>{await Lh(t.sprintId,t.projectId,()=>{qn(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}$e(t.documentId)}});function tr(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function cv(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}ct(e=>{e==="currentProject"&&A()==="rituals"&&nr()});let Md=0;async function nr(){const e=G(),t=document.getElementById("rituals-content"),n=++Md;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=q({icon:M.projects,heading:"Select a project",description:"Choose a project to view and manage its rituals"}));return}Hv(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await Oi();n===Md&&!i&&t&&(t.innerHTML=q({icon:M.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function dv(){zd(uv),nr()}function uv(){const e=document.getElementById("rituals-content"),t=Fv(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,Hn("rv-sprint-rituals-list",n,"sprint"),Hn("rv-close-rituals-list",i,"close"),Hn("rv-claim-rituals-list",s,"claim")}function pv(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function mv(e,t){try{await h.approveAttestation(e,t),k("Ritual approved!","success"),await ta(),Jo()}catch(n){x("approve ritual",n)}}function ir(e){return e==="document"?`
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
        `:""}function sr(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){k("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){k("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function Rd(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${ir(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{fv(s,e,t,i)}),F()}async function fv(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=sr(i);if(a===void 0)return!1;try{await h.completeGateRitual(t,n,s||null,a),k("Ritual completed!","success"),await ta();const o=Uh();o&&!o.in_limbo?(O(),k("Limbo cleared! Next sprint is now active.","success")):Jo()}catch(o){x("complete gate ritual",o)}return!1}function gv(e,t){if(e.attestation&&e.attestation.approved_at)return'<span class="text-success">Completed</span>';if(e.attestation&&!e.attestation.approved_at)return`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Approve</button>
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}">Reject</button>
        `;const n=p(e.artifact||"");if(e.approval_mode==="gate"){const i=`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${n}">Complete</button>`;return e.last_rejection&&!e.last_rejection.superseded_at?i:`${i}
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" title="Send the gate request back with a reason">Reject</button>`}return e.note_required||e.artifact?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-prompt="${p(e.prompt||"")}" data-ritual-artifact="${n}" data-ritual-note-required="${e.note_required?"1":""}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Attest</button>`}function hv(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${m(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${ir(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{vv(o,e,t,s,a)}),F()}async function vv(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return k("A note is required for this attestation.","error"),!1;const o=sr(i);if(o===void 0)return!1;try{await h.attestTicketRitual(t,n,a||null,o),k("Ritual attested!","success"),O(),await ji(n)}catch(r){x("attest ticket ritual",r)}return!1}async function bv(e,t){try{await h.attestTicketRitual(e,t),k("Ritual attested!","success"),await ji(t)}catch(n){x("attest ticket ritual",n)}}async function yv(e,t){try{await h.approveTicketRitual(e,t),k("Ritual approved!","success"),await ji(t)}catch(n){x("approve ticket ritual",n)}}function wv(e){return!e||e.superseded_at?"":`<div class="ticket-ritual-rejection"><strong>Rejected by ${m(e.rejected_by_name||"Someone")}:</strong> ${m(e.note||"")}</div>`}function Pd(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{kv(s,e,t,n,i)}),F()}async function kv(e,t,n,i,s=null){e.preventDefault();const a=document.getElementById("reject-ritual-note").value.trim();if(!a)return k("A rejection needs a reason.","error"),!1;try{await h.rejectTicketRitual(t,n,a),k(`"${i}" rejected. The attester has been told why.`,"success"),O(),s&&await s()}catch(o){x("reject ritual",o)}return!1}function $v(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${ir(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{Ev(s,e,t,i)}),F()}async function Ev(e,t,n,i=""){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value,a=sr(i);if(a===void 0)return!1;try{await h.completeTicketGateRitual(t,n,s||null,a),k("Ritual completed!","success"),O(),await ji(n)}catch(o){x("complete ticket ritual",o)}return!1}ee({"show-create-ritual-modal":(e,t)=>{Zd(t.trigger)},"approve-ticket-ritual":(e,t)=>{yv(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{Pd(t.ritualId,t.issueId,t.ritualName,()=>ji(t.issueId))},"complete-ticket-ritual":(e,t)=>{$v(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{hv(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{bv(t.ritualId,t.issueId)},"retry-load-rituals":()=>nr()});function nt(e){if(!e)return"";try{U.setOptions({breaks:!0,gfm:!0});const n=U.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return ec.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function qi(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function xv(e,t,n,i,s,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${m(s)}</span>
                    <span class="gate-approval-issue-title">${m(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${p(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${m(i)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${m(o)}</strong>${r?` ${qi(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{_v(c,e,t,n)}),F(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function _v(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await h.completeTicketGateRitual(t,n,s||null),k(`GATE ritual "${i}" approved!`,"success"),O(),mt()}catch(a){x("complete gate ritual",a)}}function Iv(e,t,n,i,s,a,o,r){xv(e,t,n,i,s,a,o,r)}function Sv(e,t,n,i,s,a,o,r,l){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${m(s)}</span>
                    <span class="gate-approval-issue-title">${m(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${p(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${m(i)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${m(o)}</strong>${r?` ${qi(r)}`:""}</div>`:""}
                ${l?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${nt(l)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{Tv(d,e,t,n)}),F(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function Tv(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{await h.approveTicketRitual(t,n);let r=null;if(s)try{r=await h.createComment(n,s)}catch(l){console.error("Failed to post approval comment:",l)}k(`Review ritual "${i}" approved!`,"success"),oo(r),O(),mt()}catch(r){x("approve review ritual",r)}}function Lv(e,t,n,i,s,a,o,r,l){Sv(e,t,n,i,s,a,o,r,l)}ct(e=>{e==="currentProject"&&A()==="approvals"&&mt()});let ar=[],or=0;async function mt(){if(!C())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++or;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=G(),i=n?Y().filter(r=>r.id===n):Y(),s=await Promise.all(i.map(async r=>{const[l,c]=await Promise.all([h.getPendingApprovals(r.id),h.getLimboStatus(r.id)]);return{project:r,approvals:l,limbo:c}}));if(t!==or)return;const a=[],o=[];for(const{project:r,approvals:l,limbo:c}of s)if(a.push(...l),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(u=>{var f;return(f=u.attestation)!=null&&f.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});d.length>0&&o.push({project:r,rituals:d})}ff(a),ar=o,qd()}catch(n){if(t!==or)return;e.innerHTML=q({icon:M.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),x("load approvals",n)}}function qd(){const e=document.getElementById("approvals-list");if(!e)return;const t=mf(),n=ar.length>0,i=!Ym();if(t.length===0&&!n){i?e.innerHTML=`
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
                    ${ar.map(({project:d,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${m(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(f=>{const b=f.attestation&&!f.attestation.approved_at,v=b?"⏳":"○",w=b?`<span class="gate-waiting-info">Attested by <strong>${m(f.attestation.attested_by_name||"Unknown")}</strong></span>`:f.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',$=b?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${p(f.id)}"
                                            data-project-id="${p(d.id)}">Approve</button>`:f.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${p(f.id)}"
                                                data-project-id="${p(d.id)}"
                                                data-ritual-name="${p(f.name)}"
                                                data-ritual-artifact="${p(f.artifact||"")}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${v} ${m(f.name)}
                                                    <span class="badge badge-ritual-${p(f.approval_mode)}">${m(f.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${m(f.prompt)}</span>
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
        `);const a=d=>d.pending_approvals||[],o=d=>u=>{const f=a(u).filter(d);return f.length>0?{...u,_filteredApprovals:f}:null},r=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="claim")).filter(Boolean),l=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="close")).filter(Boolean),c=t.map(o(d=>d.approval_mode==="review")).filter(Boolean);r.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(rr).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(rr).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(rr).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Iv(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var b;d.disabled=!0;const u=(b=d.closest(".gate-ritual-actions"))==null?void 0:b.querySelector(".review-approve-btn");u&&(u.disabled=!0);const f=d.dataset;try{await h.approveTicketRitual(f.ritualId,f.issueId),k(`Review ritual "${f.ritualName}" approved!`,"success"),await mt()}catch(v){d.disabled=!1,u&&(u.disabled=!1),x("approve review ritual",v)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Lv(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".gate-reject-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Pd(u.ritualId,u.issueId,u.ritualName,()=>mt())})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await h.approveAttestation(d.dataset.ritualId,d.dataset.projectId),k("Sprint ritual approved!","success"),await mt()}catch(u){d.disabled=!1,x("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{Rd(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName,d.dataset.ritualArtifact||"")})})}function Cv(){Zm(),qd()}function rr(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${m(i.requested_by_name)}</strong>${i.requested_at?` (${qi(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note">${nt(i.attestation_note)}</div>`:"",l=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=!s&&i.rejection_note,d=c?`<div class="gate-rejection-note"><strong>Rejected by ${m(i.rejected_by_name||"Someone")}</strong>${i.rejected_at?` (${qi(i.rejected_at)})`:""}: ${m(i.rejection_note)}<br><span class="text-muted">Waiting for the requester to ask again.</span></div>`:"",u=`<button class="btn btn-small btn-secondary gate-reject-btn"
                        data-ritual-id="${p(i.ritual_id)}"
                        data-issue-id="${p(e.issue_id)}"
                        data-ritual-name="${p(i.ritual_name)}">Reject</button>`,f=s?`<div class="gate-ritual-actions">
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
                    <span class="gate-ritual-name">${m(i.ritual_name)} ${l}</span>
                    <span class="gate-ritual-prompt">${m(i.ritual_prompt)}</span>
                    ${o}
                    ${r}
                    ${d}
                </div>
                ${f}
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
    `}ee({"view-issue-from-modal":(e,t)=>{e.preventDefault(),O(),te(t.issueId)},"dismiss-approvals-explainer":()=>{Cv()},"retry-load-approvals":()=>mt()});const ia={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},sa={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Nd=0;function Od(e){Nd=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=Hd(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Hd(e="",t="",n=""){const i=Nd++,s=Object.keys(ia).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?ia[e]:ia.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${sa[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
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
    `}function Av(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Hd()),aa()}function Bv(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),aa()}function jv(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=ia[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${sa[o]}</option>`).join(""),Fd(e),aa()}function Fd(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Ni(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function aa(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Ud(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,l=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,c=o.querySelector(".condition-value");let d=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw Ni("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw Ni("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${l}`;if(n.has(u))throw Ni(`Duplicate condition: ${r} ${sa[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),l==="isnull")t[u]=!0;else if(l==="in"||l==="contains")t[u]=d?d.split(",").map(f=>f.trim()).filter(f=>f):[];else if(l==="gte"||l==="lte"){if(!d)throw Ni(`Please enter a numeric value for ${r} ${sa[l]}.`),new Error(`Missing numeric value for ${u}`);const f=parseInt(d,10);if(isNaN(f))throw Ni(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${d}`);t[u]=f}else t[u]=d}return aa(),Object.keys(t).length>0?t:null}ee({"add-condition-row":()=>{Av()},"remove-condition-row":(e,t)=>{Bv(Number(t.rowId))},"update-operator-options":(e,t)=>{jv(Number(t.rowId))},"toggle-value-input":(e,t)=>{Fd(Number(t.rowId))}});let ve=[],lr=null;const Gd=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];ct((e,t)=>{e==="currentProject"&&(t&&qm(t),Gd.forEach(n=>{const i=document.getElementById(n);i&&(i.value=t||"")}),Qv(t||""))});const oa={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function zd(e){lr=e}function Y(){return ve}function Nn(e){const t=ve.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return oa[n]||oa.fibonacci}function ra(e,t){if(e==null)return"No estimate";const i=Nn(t).find(s=>s.value===e);return i?i.label:`${e} points`}function cr(e,t){return e==null||e===0?!1:!Nn(t).some(i=>i.value===e)}function Dv(e){const t=ve.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(oa[n]||oa.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function Ze(){if(C())try{ve=await h.getProjects(C().id),Mv();const e=G();if(e&&ve.some(i=>i.id===e))return;const t=dr();if(t&&ve.some(i=>i.id===t)){Ye(t);return}const n=nc();if(n&&ve.some(i=>i.id===n)){Ye(n);return}ve.length>0&&Ye(ve[0].id)}catch(e){x("load projects",e)}}function Mv(){const e='<option value="">All Projects</option>'+ve.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+ve.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],i=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),i.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const s=G();Gd.forEach(a=>{const o=document.getElementById(a);o&&(o.value=s||"")})}function Vd(){return nc()}function On(){const e=document.getElementById("projects-list");if(ve.length===0){e.innerHTML=q({icon:M.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=ve.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${p(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${X(t.color)}20; color: ${X(t.color)}">
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
    `).join("")}function Rv(e){Ye(e),R("issues")}function Wd(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,F()}async function Pv(e){e.preventDefault();const t=C();if(!t){k("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(t.id,n),await Ze(),On(),O(),k("Project created!","success")}catch(i){x("create project",i)}return!1}async function qv(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await Ze(),On(),O(),k("Project updated!","success")}catch(i){x("update project",i)}return!1}async function Nv(e){const t=ve.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await Ze(),On(),O(),k("Project deleted","success")}catch(n){x("delete project",n)}}let De=null;async function Kd(e){De=e,ve.length===0&&await Ze();const t=ve.find(n=>n.id===e);if(!t){k("Project not found","error"),R("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Yd("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Yd(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Lt||Lt.length===0)&&Oi()}function Ov(){De=null,Lt=[]}function Hv(e){De=e}function Fv(){return Lt}async function Uv(){if(!De)return;const e=document.getElementById("ps-name").value.trim();if(!e){k("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(De,t),await Ze(),k("Settings saved","success");const n=ve.find(i=>i.id===De);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){x("save project settings",n)}}async function Gv(){if(!De)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await h.updateProject(De,n),await Ze(),k("Settings saved","success")}catch(i){x("save settings",i)}}let Lt=[];async function Oi(){if(!De)return!1;try{return Lt=await h.getRituals(De),zv(),typeof lr=="function"&&lr(),!0}catch(e){return x("load rituals",e),!1}}function zv(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Lt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Lt.filter(i=>i.trigger==="ticket_close"),n=Lt.filter(i=>i.trigger==="ticket_claim");Hn("ps-sprint-rituals-list",e,"sprint"),Hn("ps-close-rituals-list",t,"close"),Hn("ps-claim-rituals-list",n,"claim")}function Hn(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>p(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${m(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${m(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${nt(a.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${s(a.approval_mode)}">${m(a.approval_mode||"auto")}</span>
          ${o}
          ${!a.group_name&&a.approval_mode==="auto"?"Agent clears immediately":""}
          ${!a.group_name&&a.approval_mode==="review"?"Requires human approval":""}
          ${!a.group_name&&a.approval_mode==="gate"?"Human only":""}
          ${a.note_required===!1?'<span class="badge badge-no-note">no note</span>':""}
          ${a.artifact?`<span class="badge badge-artifact">${m(a.artifact)}</span>`:""}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${p(a.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${p(a.id)}" data-ritual-name="${p(a.name)}">Delete</button>
      </div>
    </div>
  `}).join("")}async function Zd(e){if(!De)return;let t=[];try{t=await h.getRitualGroups(De)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Od(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,F()}function Vv(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Wv(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function Xd(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw k("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(De,{name:t,selection_mode:n})).id}return e.value||null}async function Kv(e){var s;e.preventDefault();let t;try{t=Ud()}catch{return!1}let n;try{n=await Xd()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await h.createRitual(De,i),await Oi(),O(),k("Ritual created!","success")}catch(a){x("create ritual",a)}return!1}async function Yv(e){const t=Lt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(De)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Od(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,F()}async function Zv(e,t){var a;e.preventDefault();let n;try{n=Ud()}catch{return!1}let i;try{i=await Xd()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await h.updateRitual(t,s),await Oi(),O(),k("Ritual updated!","success")}catch(o){x("update ritual",o)}return!1}async function Xv(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await Oi(),k("Ritual deleted","success")}catch(n){x("delete ritual",n)}}ee({"view-project":(e,t)=>{Rv(t.projectId)},"view-project-settings":(e,t)=>{Kd(t.projectId)},"create-project":e=>{Pv(e)},"update-project":(e,t)=>{qv(e,t.projectId)},"confirm-delete-project":(e,t)=>{Nv(t.projectId)},"edit-project-ritual":(e,t)=>{Yv(t.ritualId)},"delete-project-ritual":(e,t)=>{Xv(t.ritualId,t.ritualName)},"create-project-ritual":e=>{Kv(e)},"update-project-ritual":(e,t)=>{Zv(e,t.ritualId)},"toggle-ritual-conditions":()=>{Vv()},"ritual-group-change":()=>{Wv()}});function dr(){const t=new URLSearchParams(window.location.search).get("project");return t||Vd()}function Qv(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const ur={},Qd=new Map;let pr=null,mr=null,fr=null,gr=null,hr=null,vr=null,Jd=!1;function Jv(e){Object.assign(ur,e)}function eb({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a}={}){e&&(pr=e),t&&(mr=t),n&&(fr=n),i&&(gr=i),s&&(hr=s),a&&(vr=a)}function tb(){return Object.keys(ur)}const nb=["issues","query","board","sprints","epics","documents","rituals","approvals","my-issues"],ib={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects"};function eu(e){document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)})}function R(e,t=!0){if(t&&on(),rf(e),t){let s;const a=dr();e==="my-issues"?s=a?`/?project=${a}`:"/":e==="issues"&&window.location.search?s=`/issues${window.location.search}`:nb.includes(e)&&a?s=`/${e}?project=${a}`:s=`/${e}`,history.pushState({view:e},"",s)}eu(e),pr&&pr();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const s=document.getElementById(`${e}-view`);s&&s.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const i=ur[e];i&&i(),t&&window.scrollTo(0,0)}function tu(){var i;const t=window.location.pathname.split("/").filter(Boolean);gr&&gr();let n="my-issues";if(t.length===0||t[0]==="")R("my-issues",!1);else if(mr&&mr(t)){const s=ib[t[0]];s&&eu(s);return}else{n=t[0];const s={"gate-approvals":"approvals"};s[n]&&(n=s[n]),tb().includes(n)?R(n,!1):(n="my-issues",R("my-issues",!1))}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function on(){Qd.set(window.location.href,window.scrollY)}function nu(e){on(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),hr&&hr(e)}function iu(e){on(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),vr&&vr(e)}function su(){const e=Qd.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function sb(){Jd||(Jd=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&fr&&fr(e.state)){su();return}(t=e.state)!=null&&t.view?R(e.state.view,!1):tu(),su()}))}let Ct=0,Fn=!1,Hi=null,la=null,Fi=0;const rn=new Map;function ca(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Ct===0&&!Fn),e.textContent=Fn?"Stopped":"Offline",e.title=Fn?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function Me(e,t){return rn.has(e)||rn.set(e,new Set),rn.get(e).add(t),()=>{var n;return(n=rn.get(e))==null?void 0:n.delete(t)}}function ab(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const ob=1e3;function da(){la&&(clearTimeout(la),la=null)}const rb="chaotic",br=4001,lb=4003,cb="chaotic.bearer.";function db(e){return[rb,cb+e]}function au(e,{isReconnect:t=!1}={}){Hi&&(clearTimeout(Hi),Hi=null),da();const n=vf();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),co(null)),!t&&(Ct>0||Fn)&&(Ct=0,Fn=!1,ca());const i=h.getToken();if(!i)return;const s=++Fi,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o,db(i));co(r);let l=!1;const c=()=>{if(l||s!==Fi)return;l=!0,da();const d=Ct>0;d&&k("Live updates reconnected","success"),Ct=0,ca(),d&&yr({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===Fi&&(console.log("WebSocket connected"),da(),la=setTimeout(c,ob))},r.onmessage=d=>{if(s!==Fi)return;c();let u;try{u=JSON.parse(d.data)}catch(f){console.error("WebSocket: malformed message",f);return}yr(u)},r.onclose=d=>{if(s!==Fi)return;console.log("WebSocket disconnected"),da();const u=d==null?void 0:d.code;if(u===br||u===lb){co(null),Ct=0;const b=u===br&&tc()===i;Fn=!b,ca();let v="forbidden";u===br&&(v=b?"unauthorized":"superseded"),yr({type:v,entity:"connection",data:{code:u,teamId:e}});return}Ct++,Ct===1&&k("Live updates disconnected. Reconnecting...","warning"),ca();const f=ab(Ct-1);Hi=setTimeout(()=>{Hi=null,C()&&C().id===e&&au(e,{isReconnect:!0})},f)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function yr(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=rn.get(`${n}:${t}`);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=rn.get(n);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=rn.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}const ub={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device"};let Un=0,Ut=!1,be=null,Gt=null;const Ui=new Set,ft=new Map,Xe=new Map;function ou(e){ft.get(e)===null&&ft.set(e,Un)}function wr(e){const t=Xe.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=Un)}function pb(e){return e.filter(t=>!ft.has(t.id)).map(t=>{const n=Xe.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(Ut&&Xe.has(t.id)&&t.id!==be))}function mb(e){for(const[t,n]of ft)n!==null&&e>n&&ft.delete(t);for(const[t,n]of Xe)n.confirmedAfter!==null&&e>n.confirmedAfter&&Xe.delete(t)}function fb(e,t){t!=null&&t.id&&(e==="archived"?(ft.has(t.id)||ft.set(t.id,null),ou(t.id)):e==="read"&&wr(t.id))}async function Gn(){const e=C();if(e){try{const t=await h.getInboxUnreadCount(e.id);wi(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}Gi()}}function Gi(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=Ts();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0)}async function zi({focusFirst:e=!1,background:t=!1}={}){const n=C();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++Un;t||(Gt={focusFirst:e||!!(Gt!=null&&Gt.focusFirst)},be=null,gb(i));try{const a=await h.getInbox(n.id,{unread:Ut,limit:100});if(s!==Un)return;const o=new Set(ft.keys());mb(s);const r=pb(a||[]),l=Gt;Gt=null,l?(Pt(r),pa(),l.focusFirst&&!We()&&bb()):hb(r,o)}catch(a){if(s!==Un)return;Gt?(Gt=null,i.innerHTML=q({icon:M.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),x("load inbox",a)):console.error("Failed to refresh inbox:",a)}Gn()}function gb(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function kr(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function ru(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function lu(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function cu(e,t){if(!e)return;const n=kr(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=ru(n||t)),i==null||i.focus({preventScroll:!0})}function hb(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=ge(),s=[...n.querySelectorAll(".inbox-row")],a=n.querySelector(".inbox-row.keyboard-selected"),o=(a==null?void 0:a.dataset.entryId)||null,r=a?s.indexOf(a):-1,l=lu(),c=window.scrollY,d=n.scrollTop;let u=e;if(be&&!e.some(v=>v.id===be)){const v=i.find(w=>w.id===be);v&&Ut&&!t.has(be)?(u=[...e],u.splice(Math.min(i.indexOf(v),u.length),0,v)):be=null}Pt(u),pa();let f=-1;o&&(f=u.findIndex(v=>v.id===o),f===-1&&u.length&&(f=Math.min(r,u.length-1))),f>=0?ua(f,{focus:!1}):Ss(-1);const b=f>=0?n.querySelectorAll(".inbox-row")[f]:null;cu(l,b),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function vb(e,t){if(!(t!=null&&t.id))return!1;const n=ge().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function Vi(e){const t=ge();for(const n of new Set(e)){const i=kr(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const a=i.contains(document.activeElement)?lu():null,o=document.createElement("template");o.innerHTML=pu(s).trim();const r=o.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),cu(a,r)}}function ua(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){Ss(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),Ss(i),t&&ru(n[i]).focus({preventScroll:!0})}function bb(){ua(0)}async function $r(e){const t=ge(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;be===e&&(be=null),ft.set(e,null),Pt(t.filter(a=>a.id!==e)),s&&wi(Math.max(0,Ts()-1)),pa(),Gi(),ua(n);try{await h.archiveInbox(e),ou(e)}catch(a){ft.delete(e),console.error("Failed to archive inbox entry:",a)}}function du(e){var s,a;const n=ge().findIndex(o=>o.id===e);if(n===-1)return;const i=be;be=i===e?null:e,be===e&&yb(e),Vi([i,e]),ua(n),be===e&&((a=(s=kr(e))==null?void 0:s.scrollIntoView)==null||a.call(s,{block:"nearest"}))}function yb(e){const t=ge(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,Xe.set(e,{readAt:i,confirmedAfter:null}),Pt([...t]),wi(Math.max(0,Ts()-1)),Gi(),h.markInboxRead(e).then(()=>wr(e),s=>{var o;((o=Xe.get(e))==null?void 0:o.readAt)===i&&Xe.delete(e);const a=ge().find(r=>r.id===e);a&&a.read_at===i&&(a.read_at=null,Pt([...ge()]),Vi([e])),Gn(),x("mark inbox entry read",s)})}function wb(){if(be===null)return!1;const e=be;return be=null,Vi([e]),!0}function uu(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function kb(e){if(Ui.has(e))return;const t=ge().find(i=>i.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender";Ui.add(e),uu(e,!0);try{await h.updateIssue(t.issue_id,{assignee_id:t.source_user_id})}catch(i){Ui.delete(e),uu(e,!1),x(`reassign ${t.issue_identifier||"issue"} back to ${n}`,i);return}Ui.delete(e),$r(e)}function $b(){Ut=!Ut;const e=document.getElementById("inbox-unread-toggle");e&&e.classList.toggle("active",Ut),zi({focusFirst:!0})}function pu(e){const t=!e.read_at,n=e.id===be,i=ub[e.kind]||e.kind,s=e.issue_identifier||e.document_title||"",a=[`data-entry-id="${p(e.id)}"`,e.issue_id?`data-issue-id="${p(e.issue_id)}"`:"",e.document_id?`data-document-id="${p(e.document_id)}"`:""].filter(Boolean).join(" "),o=`inbox-panel-${e.id}`;return`
        <div class="inbox-row list-item${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${a}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${p(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${p(o)}"`:""}>
                    <span class="inbox-row-header">
                        <span class="badge badge-inbox-${p(e.kind)}">${m(i)}</span>
                        ${s?`<span class="inbox-row-source">${m(s)}</span>`:""}
                        ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':""}
                    </span>
                    <span class="inbox-row-title">${m(e.title)}</span>
                    ${!n&&e.body?`<span class="inbox-row-body">${m(e.body)}</span>`:""}
                </button>
                ${n?Eb(e,s,o):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-time">${m(qi(e.created_at))}</span>
                <button type="button" class="inbox-row-archive" data-action="archive-inbox-entry"
                        data-entry-id="${p(e.id)}" title="Archive (e)" aria-label="Archive">&times;</button>
            </div>
        </div>
    `}function Eb(e,t,n){const i=(e.kind==="assignment"||e.kind==="review_requested")&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,a=e.source_user_name,o=t?`Open ${m(t)}`:"Open",r=[i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${p(e.id)}"${Ui.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${a?` to ${m(a)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
                    data-entry-id="${p(e.id)}"
                    ${e.issue_id?`data-issue-id="${p(e.issue_id)}"`:""}
                    ${e.document_id?`data-document-id="${p(e.document_id)}"`:""}>${o}</button>`:"",`<button type="button" class="inbox-action-btn" data-action="archive-inbox-entry"
                data-entry-id="${p(e.id)}">Archive</button>`].filter(Boolean).join("");return`
        <div class="inbox-row-expanded-panel" id="${p(n)}" role="region"
             aria-label="${p(e.title)}">
            ${a?`<div class="inbox-expanded-source">from ${m(a)}</div>`:""}
            ${e.body?`<div class="inbox-expanded-body">${m(e.body)}</div>`:""}
            <div class="inbox-action-bar">${r}</div>
        </div>
    `}function pa(){const e=document.getElementById("inbox-list");if(!e)return;const t=ge();if(t.length===0){e.innerHTML=q({icon:M.inbox,heading:Ut?"No unread items":"Inbox zero",description:Ut?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=t.map(n=>pu(n)).join("")}async function xb(e){var s;const t=ge().find(a=>a.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();Xe.set(e,{readAt:n,confirmedAfter:null});try{await h.markInboxRead(e)}catch(a){((s=Xe.get(e))==null?void 0:s.readAt)===n&&Xe.delete(e);const o=ge().find(r=>r.id===e);o&&o.read_at===n&&(o.read_at=null,Pt([...ge()]),Vi([e])),console.error("Failed to mark inbox entry read:",a);return}wr(e);const i=ge().find(a=>a.id===e);i&&!i.read_at?(i.read_at=n,Pt([...ge()]),wi(Math.max(0,Ts()-1)),Gi(),Vi([e])):Gn()}async function _b(){const e=C();if(e)try{await h.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of ge())n.read_at||Xe.set(n.id,{readAt:t,confirmedAfter:Un});Pt(ge().map(n=>({...n,read_at:n.read_at||t}))),wi(0),Gi(),pa()}catch(t){x("mark all inbox entries read",t)}}function Ib(e){e.entryId&&xb(e.entryId),e.issueId?te(e.issueId):e.documentId&&$e(e.documentId)}function Sb(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&$r(e.dataset.entryId)}function Tb(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&du(e.dataset.entryId)}const Lb='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function Cb(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(Lb);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function Ab(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}ee({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&Ab((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||Cb(e.target,n)||(e.preventDefault(),t.entryId&&du(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),Ib(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&kb(t.entryId)},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&$r(t.entryId)},"toggle-inbox-unread-filter":()=>$b(),"mark-all-inbox-read":()=>_b(),"retry-load-inbox":()=>zi({focusFirst:!0})});let ma=[],zn=[],Er=[],xr=[];function Bb(){return ma}function ln(){return zn}async function _r(){try{ma=await h.getMyTeams(),jb()}catch(e){x("load teams",e)}}function jb(){const e=document.getElementById("team-list");ma.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=ma.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${p(JSON.stringify(t))}">${m(t.name)}</button>
        `).join("")}async function Ir(e,t=!1){ki(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const i=document.getElementById("team-description-text");i&&(i.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),au(e.id),await Promise.all([Ze(),Xb(),Mb(),xg(),Gn()]),t?tu():R(A())}function mu(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Db(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Mb(){if(C())try{zn=await h.getTeamMembers(C().id),Cs(ln,Li),Ei()}catch(e){console.error("Failed to load team members:",e),x("load team members",e)}}function Sr(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let Tr=0;async function Lr(){if(!C())return;const e=++Tr,t=document.getElementById("team-members-list");t&&(t.innerHTML=Sr());try{const n=await h.getTeamMembers(C().id);if(e!==Tr)return;zn=n,Cs(ln,Li),Ei(),Rb()}catch(n){if(e!==Tr)return;t&&(t.innerHTML=q({icon:M.team,heading:"Couldn't load members",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-members"},variant:"error"})),zn=[],fu(),x("load team members",n)}}function fa(){var n;const e=(n=xt())==null?void 0:n.id,t=zn.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function fu(){const e=document.getElementById("invite-member-btn");e&&e.classList.toggle("hidden",!fa())}function Rb(){const e=document.getElementById("team-members-list"),t=fa();fu(),e.innerHTML=zn.map(n=>`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar">${(n.user_name||"U").charAt(0).toUpperCase()}</div>
                <div class="member-details">
                    <span class="member-name">${m(n.user_name||"Unknown")}</span>
                    <span class="member-email">${m(n.user_email||"")}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role">${n.role}</span>
                ${t&&n.user_id!==xt().id&&n.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${p(n.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}let Cr=0;async function ga(){if(!C())return;const e=++Cr,t=document.getElementById("team-invitations-list");t&&(t.innerHTML=Sr());try{const n=await h.getTeamInvitations(C().id);if(e!==Cr)return;Er=n,Pb()}catch(n){if(e!==Cr)return;if((n==null?void 0:n.status)===403){document.getElementById("team-invitations-list").innerHTML="";return}console.error("Failed to load team invitations:",n),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function Pb(){const e=document.getElementById("team-invitations-list");if(Er.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}const t=fa();e.innerHTML=Er.map(n=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${m(n.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${m(n.role)}</span>
                    <span>Expires: ${new Date(n.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            ${t?`<button class="btn btn-secondary btn-small" data-action="issue-invitation-code" data-invitation-id="${p(n.id)}" title="For an invitee whose verification email never arrives">Verification code</button>
            <button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${p(n.id)}">Cancel</button>`:""}
        </div>
    `).join("")}let Ar=0;async function gu(){if(!C())return;const e=++Ar,t=document.getElementById("team-agents-list");t&&(t.innerHTML=Sr());try{const n=await h.getTeamAgents(C().id);if(e!==Ar)return;xr=n,qb()}catch(n){if(e!==Ar)return;t&&(t.innerHTML=q({icon:M.team,heading:"Couldn't load agents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-agents"},variant:"error"})),x("load team agents",n)}}function qb(){const e=document.getElementById("team-agents-list");if(e){if(xr.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=xr.map(t=>{const n=m(t.name),i=m(t.parent_user_name||"Unknown"),s=t.avatar_url||"🤖";return`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar agent-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${m(s)}</div>
                <div class="member-details">
                    <span class="member-name">${n}</span>
                    <span class="member-email">Created by ${i} • ${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">Agent</span>
            </div>
        </div>
      `}).join("")}}function hu(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,F()}async function Nb(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await h.createInvitation(C().id,t,n);if(await ga(),i&&i.accept_url)return Fb(t,Hb(i.accept_url),i.email_queued===!0),!1;O(),k("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){Ob(i)?k(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):x("send invitation",i)}return!1}function Ob(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function vu(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function Hb(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!vu(n.hostname)||vu(i.hostname)?e:i.origin+n.pathname}function Fb(e,t,n=!1){var a;const i=m(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${m(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,We()||F(),(a=document.querySelector('[data-action="copy-invite-link"]'))==null||a.focus(),bu()}function bu(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function Ub(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),k("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),k("Could not copy: the link is selected, copy it by hand","error")}}async function Gb(e){let t;try{t=await h.issueInvitationVerificationCode(C().id,e)}catch(n){x("get a verification code",n);return}zb(t)}function zb(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Verification Code",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p>For the account signed up with the invited address:</p>
            <ul class="invitation-code-account">
                <li>Name: <strong>${m(t.name||"")}</strong></li>
                <li>Email: ${m(t.email||"")}</li>
                <li>Signed up: ${m(n)}</li>
                <li>Already in a team: ${t.member_of_any_team?"yes":"no"}</li>
            </ul>
            <p class="warning-text">Confirm with the invitee that this account is theirs before you hand the code over. If they don't recognise it, someone else signed up with their address: don't give out the code, and cancel the invitation.</p>
            <div class="api-key-display">
                <code id="invitation-code">${m((e==null?void 0:e.code)||"")}</code>
            </div>
            <p class="text-muted">Expires at ${m(i)}. They enter it on the invitation page, or with <code>chaotic auth verify-email --code</code>, then accept. You won't be able to see it again.</p>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,We()||F(),bu("invitation-code")}async function Vb(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(C().id,e),await Lr(),k("Member removed!","success")}catch(t){x("remove member",t)}}async function Wb(e){try{await h.deleteInvitation(C().id,e),await ga(),k("Invitation canceled!","success")}catch(t){x("cancel invitation",t)}}function yu(){mu(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,F()}function Kb(){C()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
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
                <textarea id="team-description">${m(C().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,F())}async function Yb(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await _r(),await Ir(n),O(),k("Team created!","success")}catch(n){x("create team",n)}return!1}async function Zb(e){if(e.preventDefault(),!C())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(C().id,t);ki(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||"No description"),await _r(),O(),k("Team updated!","success")}catch(n){x("update team",n)}return!1}async function Xb(){if(C())try{const e=await h.getLabels(C().id);_s(e)}catch(e){console.error("Failed to load labels:",e),x("load labels",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),ee({"select-team":(e,t)=>{Ir(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{Vb(t.userId)},"delete-invitation":(e,t)=>{Wb(t.invitationId)},"issue-invitation-code":(e,t)=>{Gb(t.invitationId)},"retry-load-team-invitations":()=>{ga()},"retry-load-team-members":()=>{Lr()},"retry-load-team-agents":()=>{gu()},"invite-member":e=>{Nb(e)},"copy-invite-link":()=>{Ub()},"dismiss-invite-link":()=>{O()},"create-team":e=>{Yb(e)},"update-team":e=>{Zb(e)}});let gt=null,At=0,Vn=null,Wn=null,Wi=null,Br=!1;function Qb(){return Nm()}function wu(){Om()}function ku(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Jb(){gt||(gt=document.createElement("div"),gt.id="onboarding-overlay",gt.className="onboarding-overlay",document.getElementById("app").appendChild(gt))}function Ki(){if(!gt)return;const e=Br?Eu():$u(),t=e[At],n=e.map((i,s)=>`<span class="onboarding-dot${s===At?" active":""}${s<At?" completed":""}"></span>`).join("");gt.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function $u(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=ku(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=ku(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Vn&&(e.textContent=`${Vn.name} (${Vn.key})`),t&&Wn&&(t.textContent=`${Wn.name} (${Wn.key})`),n&&Wi&&(n.textContent=`${Wi.identifier} - ${Wi.title}`)}}]}function Eu(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function jr(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Dr(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Kn(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function ey(){const e=Br?Eu():$u();At<e.length-1&&(At++,Ki())}function ty(){wu(),_u(),Yn()}function ny(){wu(),_u(),Yn()}async function iy(e){e.preventDefault(),Dr("onboarding-team-error"),Kn("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Vn=await h.createTeam({name:t,key:n}),At++,Ki()}catch(i){jr("onboarding-team-error",i.message||"Failed to create team"),Kn("onboarding-team-submit",!1)}}async function sy(e){e.preventDefault(),Dr("onboarding-project-error"),Kn("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Wn=await h.createProject(Vn.id,{name:t,key:n}),At++,Ki()}catch(i){jr("onboarding-project-error",i.message||"Failed to create project"),Kn("onboarding-project-submit",!1)}}async function ay(e){e.preventDefault(),Dr("onboarding-issue-error"),Kn("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Wi=await h.createIssue(Wn.id,{title:t}),At++,Ki()}catch(n){jr("onboarding-issue-error",n.message||"Failed to create issue"),Kn("onboarding-issue-submit",!1)}}function xu(e=!1){Br=e,At=0,Vn=null,Wn=null,Wi=null,Jb(),Ki()}function _u(){gt&&(gt.remove(),gt=null)}function Iu(){Hm(),xu(!0)}ee({"onboarding-next":e=>{e.preventDefault(),ey()},"onboarding-skip":e=>{e.preventDefault(),ty()},"onboarding-finish":e=>{e.preventDefault(),ny()},"onboarding-create-team":e=>{iy(e)},"onboarding-create-project":e=>{sy(e)},"onboarding-create-issue":e=>{ay(e)}});const Su="/oauth/consent/";function oy(e){if(!e||!e.startsWith(Su))return null;const t=e.slice(Su.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function ry(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function ly(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function cy(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const Tu={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function ha(e){const t=Tu[e.trust]||Tu.unverified,n=e.host?` · ${m(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${p(e.trust)}">${m(t)}${n}</span>`}function dy(e,t){return e.teams.map(n=>`<option value="${p(n.id)}"${n.id===t?" selected":""}>${m(n.name)}</option>`).join("")}function uy(e,t){const n=e&&t?e.agents.find(a=>a.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${m(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function Lu(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",a=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${p(i.id)}"${s}>${m(i.name+a)}</option>`)}return n.join("")}function Cu(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${p(t.id)}">
            ${m(t.name)} <span class="oauth-muted">${m(t.key)}</span>
        </label>`).join("")}function py(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${p(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${m(t.name)}${m(i)}
        </label>`}).join("")}function my(e,t){const n=m(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${ha(t.client)}</p>
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
        </div>`}function fy(e,t){if(t.acts_as==="person"){my(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=m(t.client.name),a=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",o=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${m(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${ha(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${m(t.redirect_host)}</strong></p>
            ${o}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${dy(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${Lu(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${p(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${Cu(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${py(t)}
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,Mr(e,t)}function Mr(e,t){var a;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const o=(a=e.querySelector("#oauth-team"))==null?void 0:a.value,r=uy(t.teams.find(l=>l.id===o),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function gy(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(o=>o.value),s=e.querySelector('input[name="oauth-policy"]:checked'),a={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const o=e.querySelector("#oauth-agent-name").value.trim();o&&(a.agent_name=o)}return a}function hy(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function Yi(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${m(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function vy(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{h.logout(),t()})}function by(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(u=>u.id===s.value);e.querySelector("#oauth-agent").innerHTML=Lu(d,null),e.querySelector("#oauth-projects").innerHTML=Cu(d),Mr(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>Mr(e,n));let a=!1;const o=async d=>{if(!a){a=!0;try{const u=d?await h.approveOAuthRequest(t,gy(e)):await h.denyOAuthRequest(t);if(!ry(u.redirect)){Yi(e,"The app's return address isn't one a browser should be sent to.");return}i(u.redirect)}catch(u){if(a=!1,u&&u.status===404){Yi(e,"It has expired, was already answered, or belongs to someone else.");return}hy(e,u&&u.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),o(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>o(!1))}async function yy(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=ly();cy(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await h.getOAuthRequest(e)}catch(a){a&&a.status===404?Yi(i,"It has expired, was already answered, or belongs to someone else."):a&&a.status===403&&a.detail&&a.detail.error_code==="web_login_required"?vy(i,n):a&&a.status===403?Yi(i,"Only a person signed in to Chaotic can approve an app."):Yi(i,a&&a.message||"Something went wrong");return}fy(i,s),by(i,e,s,t)}const Rr="/invite/",Zi="/invite",Pr="chaotic.inviteToken",Au="invite-auth-notice";let qr=null;const wy="This invitation is no longer valid.",ky={owner:"an owner",admin:"an admin",member:"a member"};function $y(e){if(!e||!e.startsWith(Rr))return null;const t=e.slice(Rr.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function Bu(){const{pathname:e}=window.location,t=$y(e);if(t){qr=t;try{sessionStorage.setItem(Pr,t)}catch{}return history.replaceState(null,"",Zi),t}if(!ju(e))return null;let n=null;try{n=sessionStorage.getItem(Pr)}catch{}const i=n||qr;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function ju(e){return e===Zi||e===`${Zi}/`}function Du(e){return ju(e)||!!(e&&e.startsWith(Rr))}function Nr(){qr=null;try{sessionStorage.removeItem(Pr)}catch{}}function Ey(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function xy(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function Or(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function Mu(){const e=xy();return va(),Or(e),e}function _y(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),va()}function va(){var e;(e=document.getElementById(Au))==null||e.remove()}function Hr(e){const t=e.invited_by_name?`<strong>${m(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=ky[e.role]||`a ${m(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${m(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${m(e.email_hint)}</strong>${Iy(e)}</p>`}function Iy(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${m(n)}`}const Sy="Ask whoever invited you to send a new invitation.",Ty="Reload the page to try again.";function Fr(e,t=wy,n=Sy){e.innerHTML=`
        <div class="invite-page">
            <h1>${m(t)}</h1>
            <p class="invite-muted">${m(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function Ly(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function Ru(){window.location.pathname!==Zi&&history.replaceState(null,"",Zi),Ly(Mu())}function Cy(e,t){e.innerHTML=`
        <div class="invite-page">
            ${Hr(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function Ay(e,t,n){const i=Ey(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${m(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${Hr(t)}
                ${s}
                <p class="invite-warning" role="alert">This invitation is for a different email address.
                    Only <strong>${m(t.email_hint)}</strong> can accept it. Sign out, then sign in
                    or create an account with that address.</p>
                <div class="invite-actions">
                    <a class="btn btn-secondary" href="/">Not now</a>
                    <button type="button" id="invite-sign-out" class="btn btn-primary">Sign out</button>
                </div>
            </div>`;return}e.innerHTML=`
        <div class="invite-page">
            ${Hr(t)}
            ${s}
            <p id="invite-error" class="invite-warning hidden" role="alert"></p>
            <div id="invite-verify" class="invite-verify hidden">
                <p>Verify your email address to continue: we will email a six-digit code to
                    <strong>${m(n.email)}</strong>.</p>
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
            </div>
            <div class="invite-actions" id="invite-accept-actions">
                <a class="btn btn-secondary" href="/">Not now</a>
                <button type="button" id="invite-accept" class="btn btn-primary">Accept invitation</button>
            </div>
        </div>`}function By(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function jy(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),a=e.querySelector("#invite-code-form"),o=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=u=>{l.textContent=u,l.classList.remove("hidden")},d=()=>{var u;a.classList.remove("hidden"),(u=o.focus)==null||u.call(o)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const u=await h.requestEmailVerification(),f=By(u.expires_at);c(`We sent a code to ${u.email}${f?`; it works until ${f}`:""}.`),s.textContent="Send a new code",d()}catch(u){const f=u&&u.detail&&u.detail.error_code;if(u&&u.status===401){n();return}if(f==="email_already_verified"){t();return}c(u&&u.message||"Something went wrong"),u&&u.status===429&&d()}finally{s.disabled=!1}}}),a.addEventListener("submit",async u=>{var b;if(u.preventDefault(),r.disabled)return;const f=o.value.trim();if(f){r.disabled=!0;try{await h.confirmEmailVerification(f)}catch(v){r.disabled=!1;const w=v&&v.detail&&v.detail.error_code;v&&v.status===401?n():w==="email_already_verified"?t():(c(v&&v.message||"Something went wrong"),(b=o.select)==null||b.call(o));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function Dy(e,t){va();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=Au,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${m(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${m(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),va(),t()})}function Ur(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function My(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d;const a=Mu();a.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let o;try{o=await h.getInvitation(e)}catch(u){u&&u.status===404?(Nr(),Fr(a)):Fr(a,u&&u.message||"Something went wrong.",Ty);return}if(!t){Cy(a,o);const u=f=>{Dy(o,()=>Or(a)),n(f)};a.querySelector("#invite-sign-in").addEventListener("click",()=>u("login")),a.querySelector("#invite-sign-up").addEventListener("click",()=>u("signup"));return}Ay(a,o,t),(d=a.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=a.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async()=>{if(l)return;l=!0,r.disabled=!0;let u;try{u=await h.acceptInvitation(e)}catch(f){l=!1,r.disabled=!1,f&&f.status===401?s():f&&(f.status===404||f.status===400)?(Nr(),Fr(a)):f&&f.status===403&&f.detail&&f.detail.error_code==="email_unverified"?(Ur(a,"Verify your email address to continue."),a.querySelector("#invite-accept-actions").classList.add("hidden"),a.querySelector("#invite-verify").classList.remove("hidden")):f&&f.status===403?Ur(a,`This invitation is for a different email address. Only ${o.email_hint} can accept it.`):Ur(a,f&&f.message||"Something went wrong");return}Nr(),Pu(a,o);try{await i(u.team_id,o.team_name)}catch(f){console.error("Joined the team but could not open it:",f),Or(a),Pu(a,o)}};r.addEventListener("click",c),jy(a,{onVerified:()=>{a.querySelector("#invite-verify").classList.add("hidden"),a.querySelector("#invite-error").classList.add("hidden"),a.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function Pu(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${m(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${m(t.team_name)}</a>
            </div>
        </div>`}function Gr(e){return My(e,{user:xt(),showAuth:t=>{Ji(),t==="signup"?Ou():Nu()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),_y(),await Yn({teamId:t}),k(`You joined ${n}`,"success")},signOut:()=>{h.logout(),yn(null),ki(null),Gr(e)}})}async function qu(){const e=Bu();if(e){await Gr(e);return}if(Du(window.location.pathname)){Ru();return}Ji()}async function Yn({teamId:e}={}){const t=oy(window.location.pathname);if(t){await yy(t);return}const n=Bu();if(n){await Gr(n);return}if(Du(window.location.pathname)){Ru();return}Ry(),Oy(),await _r();const i=Bb();if(i.length===0&&!Qb()){xu();return}try{if(i.length>0){const s=e&&i.find(a=>a.id===e)||i[0];await Ir(s,!0)}}finally{sb()}}let Zn=null,Xi=null,it=null,st=null;function Qi(){Zn||(Zn=document.getElementById("auth-screen"),Xi=document.getElementById("main-screen"),it=document.getElementById("login-form"),st=document.getElementById("signup-form"))}function Ji(){Qi(),Zn&&Zn.classList.remove("hidden"),Xi&&Xi.classList.add("hidden")}function Ry(){Qi(),Zn&&Zn.classList.add("hidden"),Xi&&Xi.classList.remove("hidden")}function Nu(){Qi(),it&&it.classList.remove("hidden"),st&&st.classList.add("hidden")}function Ou(){Qi(),it&&it.classList.add("hidden"),st&&st.classList.remove("hidden")}async function Py(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),yn(await h.getMe()),await Yn(),k("Welcome back!","success")}catch(i){x("log in",i)}return!1}async function qy(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await h.signup(t,n,i),await h.login(n,i),yn(await h.getMe()),await Yn(),k("Account created successfully!","success")}catch(s){x("sign up",s)}return!1}function Hu(){h.logout(),yn(null),ki(null),Ji(),k("Signed out","success")}function Ny(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Oy(){var i;const e=xt();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",ro(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?Ny(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${p(s)}" alt="${p(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function Hy(){Qi();const e=it==null?void 0:it.querySelector("form");e&&e.addEventListener("submit",s=>Py(s));const t=st==null?void 0:st.querySelector("form");t&&t.addEventListener("submit",s=>qy(s));const n=it==null?void 0:it.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),Ou()});const i=st==null?void 0:st.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),Nu()})}let zr=[];async function Vr(){try{zr=await h.getApiKeys(),Fy()}catch(e){x("load API keys",e)}}function Fy(){const e=document.getElementById("api-keys-list");if(e){if(zr.length===0){e.innerHTML=q({icon:M.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=zr.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${m(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${m(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${He(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${He(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${p(t.id)}" data-key-name="${p(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function Uy(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,F()}async function Gy(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);O(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,F()}catch(n){x("create API key",n)}return!1}async function zy(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),k("API key copied to clipboard","success")}catch{k("Failed to copy","error")}}async function Vy(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),k("API key revoked","success"),await Vr()}catch(n){x("revoke API key",n)}}ee({"create-api-key":e=>{Gy(e)},"copy-api-key":()=>{zy()},"dismiss-api-key-modal":()=>{O(),Vr()},"revoke-api-key":(e,t)=>{Vy(t.keyId,t.keyName)}});let Wr=[];async function Fu(){try{Wr=await h.getConnections(),Ky()}catch(e){x("load connected apps",e)}}function Kr(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function Wy(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function Ky(){const e=document.getElementById("connected-apps-list");if(e){if(Wr.length===0){e.innerHTML=q({icon:M.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=Wr.map(t=>t.acts_as==="person"?Yy(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${m(Kr(t))} ${ha(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${m(t.agent?t.agent.name:"an agent")}</span>
                    <span>${m(Wy(t))}</span>
                    <span>policy ${m(t.policy)}</span>
                    <span class="api-key-date">Connected ${He(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${He(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${m(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(t.id)}" data-connection-name="${p(Kr(t))}">Disconnect</button>
        </div>
    `).join("")}}function Yy(e){const n=`${e.device_name||"A device"} · ${Kr(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${m(n)} ${ha(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${He(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${He(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(e.id)}" data-connection-name="${p(n)}">Sign out</button>
        </div>
    `}async function Zy(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await h.revokeConnection(e),k("App disconnected","success"),await Fu()}catch(n){x("disconnect app",n)}}ee({"revoke-connection":(e,t)=>{Zy(t.connectionId,t.connectionName)}});let Yr=[];async function Uu(){try{Yr=await h.getPushDevices(),Xy()}catch(e){x("load push devices",e)}}const Gu={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function zu(e){return e.label||e.platform||"Unnamed device"}function Xy(){const e=document.getElementById("push-devices-list");if(e){if(Yr.length===0){e.innerHTML=q({icon:M.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=Yr.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${m(zu(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${m(t.platform)}</span>`:""}
                    <span>via ${m(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${He(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${He(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${m(String(t.failure_count))} failed deliveries</span>`:""}
                    ${Gu[t.status]?`<span class="push-device-status">${m(Gu[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${p(t.installation_id)}" data-device-name="${p(zu(t))}">Remove</button>
        </div>
    `).join("")}}async function Qy(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await h.deletePushDevice(e),k("Device removed","success"),await Uu()}catch(n){x("remove push device",n)}}ee({"remove-push-device":(e,t)=>{Qy(t.installationId,t.deviceName)}});let ba=!1,Bt=0,zt=[],ya=[];function Jy(e){ya=e,zt=[...e]}function cn(){return ba}function ew(){if(ba)return;ba=!0,Bt=0,zt=[...ya];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&wa()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>tw(n.target.value)),t.addEventListener("keydown",iw),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&nw(Number(i.dataset.commandIndex))}),es(),requestAnimationFrame(()=>t.focus())}function wa(){ba=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function tw(e){const t=e.toLowerCase().trim();t?zt=ya.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):zt=[...ya],Bt=0,es()}function es(){const e=document.getElementById("command-results");if(!e)return;if(zt.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};zt.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===Bt?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function nw(e){Bt=e,es()}function Vu(e){const t=zt[e];t&&(wa(),t.action())}function iw(e){switch(e.key){case"ArrowDown":e.preventDefault(),Bt=Math.min(Bt+1,zt.length-1),es();break;case"ArrowUp":e.preventDefault(),Bt=Math.max(Bt-1,0),es();break;case"Enter":e.preventDefault(),Vu(Bt);break;case"Escape":e.preventDefault(),wa();break}}ee({"execute-command":(e,t)=>{Vu(Number(t.commandIndex))}});const sw=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function aw(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${m(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${m(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function ow(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${m(e.title)}</h4>
        ${e.shortcuts.map(aw).join("")}
    </div>`}function Wu(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${sw.map(ow).join("")}
        </div>
    `,F()}const ka=100,Zr="status!=done,canceled",rw=["created","updated","priority","status","title","estimate"];function ue(e){return e==null?"":m(String(e))}function Ku(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${p(t)}">${ue(n)}</a>`}function Yu(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const Xr=[{id:"identifier",label:"ID",fixed:!0,render:e=>Ku(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>Ku(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>ue(we(e.status))},{id:"priority",label:"Priority",render:e=>ue(Pe(e.priority))},{id:"type",label:"Type",render:e=>ue(lt(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>ue(Yu(e,"assignee"))},{id:"creator",label:"Creator",render:e=>ue(Yu(e,"creator"))},{id:"project",label:"Project",render:e=>ue(e.project_key)},{id:"sprint",label:"Sprint",render:e=>ue(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=X(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${ue(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>ue(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${p(e.parent_id)}">${ue(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>ue(He(e.created_at))},{id:"updated",label:"Updated",render:e=>ue(He(e.updated_at))},{id:"completed",label:"Completed",render:e=>ue(He(e.completed_at))},{id:"due",label:"Due",render:e=>ue(He(e.due_date))}],$a=Object.fromEntries(Xr.map(e=>[e.id,e])),lw=Xr.filter(e=>e.fixed).map(e=>e.id),Qr=["identifier","title","status","priority","assignee","updated"];function Jr(e){const t=new Set,n=[];for(const s of e||[]){const a=String(s).trim();!$a[a]||t.has(a)||(t.add(a),n.push(a))}return n.length===0?[...Qr]:[...lw.filter(s=>!t.has(s)),...n]}function cw(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function dw(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?Jr(t.get("cols").split(",")):[...Qr],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function uw(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!cw(e.cols,Qr)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function pw(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function mw({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=ka,skip:a=0}){const o=["chaotic","issue","list"];let r=e||"",l=null;n||i?(o.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",o.push("--where",pw(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],u=d.startsWith("-"),f=d.replace(/^[-+]/,"");let b=null;rw.includes(f)?(o.push("--sort",f,"--order",u?"desc":"asc"),c.length>1&&(b=`The CLI sorts by one field; only "${d}" was copied.`)):b=`The CLI cannot sort by "${f}"; the order was not copied.`,b&&(l=l?`${l} ${b}`:b)}return o.push("--limit",String(s)),a>0&&o.push("--skip",String(a)),{command:o.join(" "),warning:l}}function fw(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function gw(e,t){const n=Jr(t).map(a=>$a[a]),i=n.map(a=>`<th data-col="${p(a.id)}">${ue(a.label)}</th>`).join(""),s=e.map(a=>`<tr class="query-row" data-issue-id="${p(a.id)}">${n.map(o=>`<td class="query-col-${p(o.id)}">${o.render(a)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function hw(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,a=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${a?"":" disabled"}>Next</button>`}let D=null,el=null,Ne=null,tl=0,Xn=!1,Zu=!1;function ne(e){return document.getElementById(e)}function Xu(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function Qu(e){const t=uw({...el,cols:D.cols,group:D.group,view:D.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function vw(){const e=ne("query-project-filter");if(!e)return;const t=['<option value="">All projects</option>'].concat(Y().map(n=>`<option value="${p(n.id)}">${ue(n.name)}</option>`));e.innerHTML=t.join(""),e.value=D.teamScope?"":D.projectId||""}function bw(){const e=ne("query-columns-menu");e&&(e.innerHTML=Xr.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${p(t.id)}"${D.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${ue(t.label)}
        </label>`).join(""))}function Ea(e){const t=ne("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${ue(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function Ju(e){const t=ne("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function nl(e){var t;(t=ne("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function ts(){const e=ne("query-results"),t=ne("query-pager");if(!e)return;if(!Ne){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=Ne;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=gw(n,D.cols),t&&(t.innerHTML=hw(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(a=>{a.dataset.enabled=String(!a.disabled)}),Xn&&nl(!0))}async function xa(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!D)return;const i=C(),s=D.teamScope?{teamId:i==null?void 0:i.id}:{projectId:D.projectId};if(!s.teamId&&!s.projectId){Ne=null,ts(),Ea(D.teamScope?"Select a team first.":"Select a project.");return}const a=++tl,o=D.where===null?Zr:D.where,r=ne("query-results");Xn=!0,r&&r.classList.add("loading"),nl(!0);const l=()=>a===tl&&A()==="query";try{const c=await h.queryIssues({...s,where:o,order:D.order,skip:(D.page-1)*ka,limit:ka});if(!l())return;D.where=c.where,D.order=c.order||null,el=Xu(D),Ne={issues:c.issues||[],total:c.total,skip:c.skip};const d=ne("query-where");d&&d.value.trim()===o.trim()&&(d.value=c.where),Ea(null),Xn=!1,ts(),Qu(e),t&&t()}catch(c){if(!l())return;Xn=!1,n?n():Ne=null,ts(),Ea(fw(c))}finally{a===tl&&(Xn=!1,r&&r.classList.remove("loading"),nl(!1))}}function ep(){if(!D)return;const e=ne("query-where");return D.where=e?e.value.trim():"",D.page=1,xa("push")}function yw(e){if(D)return D.teamScope=!e,e&&(D.projectId=e),D.page=1,Ju(null),xa("push",{onSuccess:()=>{e&&Ye(e)}})}function ww(e,t){if(!D||!$a[e]||$a[e].fixed)return;const n=D.cols.filter(i=>i!==e);D.cols=Jr(t?[...n,e]:n),ts(),Qu("replace")}function kw(e){if(!D||!Ne||Xn)return;const t=D.page+e;if(t<1||e>0&&Ne.skip+Ne.issues.length>=Ne.total)return;const n={page:D.page,result:Ne};return D.page=t,xa("push",{onFailure:()=>{D.page=n.page,Ne=n.result}})}async function $w(){if(!D)return null;const e=ne("query-where"),t=e?e.value.trim():D.where??Zr,n=D.teamScope?null:Y().find(o=>o.id===D.projectId),{command:i,warning:s}=mw({where:t,order:D.order,teamScope:D.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:ka,skip:Ne?Ne.skip:0}),a=ne("query-cli-preview");try{await navigator.clipboard.writeText(i),k(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),a&&a.classList.add("hidden")}catch{a&&(a.textContent=i,a.classList.remove("hidden")),k("Could not copy; the command is shown below the box","warning")}return i}function Ew(){var e,t,n,i,s,a,o;Zu||(Zu=!0,(e=ne("query-where"))==null||e.addEventListener("keydown",r=>{r.key==="Enter"&&!r.shiftKey&&!r.isComposing&&(r.preventDefault(),ep())}),(t=ne("query-run-btn"))==null||t.addEventListener("click",()=>ep()),(n=ne("query-copy-cli-btn"))==null||n.addEventListener("click",()=>$w()),(i=ne("query-project-filter"))==null||i.addEventListener("change",r=>yw(r.target.value)),(s=ne("query-columns-btn"))==null||s.addEventListener("click",r=>{r.stopPropagation();const l=ne("query-columns-menu");if(!l)return;const c=l.classList.toggle("hidden")===!1;r.currentTarget.setAttribute("aria-expanded",String(c))}),(a=ne("query-columns-menu"))==null||a.addEventListener("change",r=>{r.target.matches('input[type="checkbox"]')&&ww(r.target.value,r.target.checked)}),(o=ne("query-pager"))==null||o.addEventListener("click",r=>{const l=r.target.closest("button[data-query-page]");!l||l.disabled||kw(Number(l.dataset.queryPage))}),document.addEventListener("click",r=>{var c;const l=ne("query-columns-menu");l&&!l.classList.contains("hidden")&&!r.target.closest("#query-columns-picker")&&(l.classList.add("hidden"),(c=ne("query-columns-btn"))==null||c.setAttribute("aria-expanded","false"))}))}function xw(){var s,a;Ew();const e=dw(window.location.search),t=Y();let n=null;if(!e.teamScope){const o=r=>r&&t.some(l=>l.id===r);if(!o(e.projectId)){const r=e.projectId;e.projectId=o(G())?G():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}D=e,el=Xu(D),Ne=null;const i=ne("query-where");return i&&(i.value=D.where===null?Zr:D.where),(s=ne("query-cli-preview"))==null||s.classList.add("hidden"),(a=ne("query-columns-menu"))==null||a.classList.add("hidden"),vw(),bw(),Ea(null),Ju(n),ts(),xa("replace")}let _a=[];function _w(){return _a}ct(e=>{e==="currentProject"&&A()==="epics"&&Vt()});let Ia=0;async function Vt(){var n;vc(-1);const e=document.getElementById("epics-list");if(!e)return;const t=++Ia;e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((n=C())!=null&&n.id)){_a=[],e.innerHTML=q({icon:M.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const i=G();let s;if(i?s=await h.getIssues({project_id:i,issue_type:"epic"}):s=await h.getTeamIssues(C().id,{issue_type:"epic"}),t!==Ia)return;if(!s||s.length===0){_a=[],e.innerHTML=q({icon:M.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}const a=await Promise.all(s.map(async o=>{let r=[];try{r=await h.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));if(t!==Ia)return;_a=a,Iw(a,e)}catch(i){if(t!==Ia)return;e.innerHTML=q({icon:M.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),x("load epics",i)}}function Iw(e,t){const n=e.map(i=>{const s=i.subIssues?i.subIssues.length:0,a=i.subIssues?i.subIssues.filter(u=>u.status==="done"||u.status==="canceled").length:0,o=s>0?Math.round(a/s*100):0,r=s>0?`${a}/${s}`:"-",l=`status-${(i.status||"backlog").replace(/_/g,"-")}`,c=(i.status||"backlog").replace(/_/g," ").replace(/\b\w/g,u=>u.toUpperCase()),d=i.estimate!=null?`${i.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${p(i.identifier)}" style="cursor: pointer;">
                <td class="epic-identifier">${m(i.identifier)}</td>
                <td class="epic-title">${m(i.title)}</td>
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
    `,t._epicClickHandler||(t._epicClickHandler=i=>{const s=i.target.closest(".epic-row");s&&s.dataset.identifier&&iu(s.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function Sw(){const e=G(),t=Y().map(n=>`
        <option value="${p(n.id)}" ${n.id===e?"selected":""}>${m(n.name)}</option>
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
    `,F(),document.getElementById("create-epic-form").addEventListener("submit",Tw),document.getElementById("create-epic-title").focus()}async function Tw(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}try{const s=await h.createIssue(t,{title:n,description:i||null,issue_type:"epic"});O(),k(`Created epic ${s.identifier}`,"success"),Vt()}catch(s){x("create epic",s)}}async function tp(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){te(t.id,!1);return}await il(t.id,!1)}else R("epics",!1)}catch{R("epics",!1)}}async function il(e,t=!0){try{t&&on();const[n,i,s,a]=await Promise.all([h.getIssue(e),h.getSubIssues(e),h.getActivities(e),h.getComments(e)]);if(n.issue_type!=="epic"){te(e,t);return}t&&history.pushState({epicId:e,view:A()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(E=>E.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=A()||"epics",l=Y().find(E=>E.id===n.project_id),c=n.assignee_id?Jt(n.assignee_id):null,d=c?en(c):null,u=i.length,f=i.filter(E=>E.status==="done"||E.status==="canceled").length,b=u>0?Math.round(f/u*100):0,v=_w(),w=v.findIndex(E=>E.id===n.id),$=w>0?v[w-1]:null,S=w>=0&&w<v.length-1?v[w+1]:null,I=w>=0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(r)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${I?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${$?`data-action="navigate-epic" data-epic-id="${p($.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${w+1} / ${v.length}</span>
                            <button class="issue-nav-btn" ${S?`data-action="navigate-epic" data-epic-id="${p(S.id)}"`:"disabled"} title="Next epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${l?m(l.name):"Project"} › ${m(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${jn(n.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${b===100?" epic-progress-complete":""}" style="width: ${b}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${f} of ${u} done</span>
                                <span>${b}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${i.length===0?q({icon:M.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):i.map(E=>{const P=E.assignee_id?Jt(E.assignee_id):null,T=P?en(P):null;return`
                                <div class="sub-issue-item" data-issue-id="${p(E.id)}" data-identifier="${p(E.identifier)}">
                                    <span class="sub-issue-status">${je(E.status)}</span>
                                    <span class="sub-issue-id">${m(E.identifier)}</span>
                                    <span class="sub-issue-title">${m(E.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(E.status||"backlog").replace(/_/g,"-")}">${we(E.status)}</span>
                                    ${T?`<span class="sub-issue-assignee">${m(T)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${s.length===0?q({icon:M.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):s.map(E=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Do(E.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Ro(E)}</span>
                                        <span class="activity-actor">by ${m(Mo(E))}</span>
                                        <span class="activity-time">${Ke(E.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${a.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${a.map(E=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(E.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m(E.author_name||"User")}</span>
                                            <span class="comment-date">${Ke(E.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${m(E.content||"")}</div>
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
                                ${je(n.status)}
                                ${we(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${pt(n.priority)}
                                ${Pe(n.priority)}
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
                                ${ra(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(E=>`
                                    <span class="issue-label" style="background: ${X(E.color)}20; color: ${X(E.color)}">${m(E.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${l?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(l.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const B=o.querySelector(".sub-issues-list");B&&B.addEventListener("click",E=>{const P=E.target.closest(".sub-issue-item");P&&P.dataset.issueId&&te(P.dataset.issueId)})}catch(n){x("load epic",n)}}ee({"navigate-epic":(e,t)=>{il(t.epicId)}});function Lw(e){let t=!1,n=null;return function(s){var o,r,l,c,d,u;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(c=e.isDetailViewActive)!=null&&c.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((d=e.isDetailViewActive)!=null&&d.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((u=e.isDetailViewActive)!=null&&u.call(e))break;s.preventDefault(),e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function Cw(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function jt(e,t,n="#issues-list .issue-row"){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Aw(e){const t="#issues-list .issue-row";function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const l=n(a);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,o,c,d)}return function(a){var l,c,d,u;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||(d=(c=a.target).closest)!=null&&d.call(c,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen()||(u=e.isInlineDropdownOpen)!=null&&u.call(e))return;const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),jt(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),jt(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const f=o[r].dataset.issueId;f&&!f.startsWith("temp-")&&e.viewIssue(f)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const f=o[r].dataset.issueId;f&&!f.startsWith("temp-")&&e.showEditIssueModal(f)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(f=>f.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Bw(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o,r,l;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(l=(r=i.target).closest)!=null&&l.call(r,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),jt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),jt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const c=s[a].dataset.documentId;c&&e.viewDocument(c)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const c=s[a].dataset.documentId;c&&e.showEditDocumentModal&&e.showEditDocumentModal(c)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(c=>c.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Qn(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function jw(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,u,f,b,v;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(c=(l=i.target).closest)!=null&&c.call(l,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(d=e.isInlineDropdownOpen)!=null&&d.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex(),o=w=>{var S,I,B,E;const $=!!((I=(S=document.activeElement)==null?void 0:S.closest)!=null&&I.call(S,"#inbox-list"));if((B=e.collapseInboxExpand)==null||B.call(e),jt(a+w,e.setSelectedIndex,t),$){const P=document.querySelector(`${t}.keyboard-selected`);(E=(P==null?void 0:P.querySelector(".inbox-row-toggle"))||P)==null||E.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),o(1);break;case"k":case"ArrowUp":i.preventDefault(),o(-1);break;case"Enter":if((f=(u=i.target).closest)!=null&&f.call(u,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;a>=0&&s[a]&&(i.preventDefault(),e.toggleInboxExpand(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":if((b=e.isEscapeLayerAbove)!=null&&b.call(e))break;if((v=e.collapseInboxExpand)!=null&&v.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}a>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(w=>w.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Dw(e){const t="#kanban-board .kanban-card";return function(i){var o,r,l;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(l=(r=i.target).closest)!=null&&l.call(r,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),jt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),jt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const c=s[a].dataset.id;c&&e.viewIssue(c)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(c=>c.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Mw(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function np(e){const{view:t,selector:n,open:i}=e;return function(a){var l,c,d;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||(d=(c=a.target).closest)!=null&&d.call(c,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),jt(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),jt(r-1,e.setSelectedIndex,n);break;case"Enter":r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(u=>u.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const Rw={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>h.getDocumentRevisions(e),fetchOne:(e,t)=>h.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>h.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>h.getIssueDescriptionRevision(e,t)}};let H=null,Wt=0;async function ip(e,t){var a,o;const n=Rw[e];if(!n){x("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++Wt;H=null;let s;try{s=await n.fetchList(t)}catch(r){x("load revision history",r);return}if(i===Wt){if(H={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},H.viewVersion!=null)try{const r=await n.fetchOne(t,H.viewVersion);if(i!==Wt)return;H.cache.set(H.viewVersion,r)}catch(r){i===Wt&&x("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),Sa(),F()}}function Sa(){const e=document.getElementById("modal-content");if(!e||!H)return;if(H.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=Pw(),n=H.mode==="compare"?Nw():qw();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function Pw(){const e=H.revisions.map(n=>{const i=H.mode==="view"?n.version===H.viewVersion:n.version===H.compareFromVersion||n.version===H.compareToVersion,s=H.mode==="compare"?n.version===H.compareFromVersion?' <span class="rev-tag">from</span>':n.version===H.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${m(n.author_name||"Unknown")} ${bn(n.author)}</span>
          <span class="revision-time">${Ke(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${H.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function qw(){const e=H.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=H.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${m(t.title)}</h3>`:"",i=t[H.adapter.bodyField]||"",s=i?`<div class="markdown-body">${nt(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${m(t.author_name||"Unknown")} &middot; ${Ke(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function Nw(){const e=H.compareFromVersion,t=H.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=H.cache.get(e),i=H.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[H.adapter.bodyField]||"",a=i[H.adapter.bodyField]||"",o=Ow(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
      <div class="revision-title-change">
        Title: <span class="diff-del">${m(n.title||"")}</span>
        &rarr; <span class="diff-add">${m(i.title||"")}</span>
      </div>
    `),`
    <div class="revision-panel-header">
      <div>
        Comparing <strong>v${e}</strong> &rarr; <strong>v${t}</strong>
      </div>
    </div>
    ${r}
    ${o}
  `}function Ow(e,t){const n=e.split(`
`),i=t.split(`
`),s=Hw(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${m(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${m(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${m(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function Hw(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(ns(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(ns(a,"del",e[o]),o++):(ns(a,"add",t[r]),r++);for(;o<n;)ns(a,"del",e[o++]);for(;r<i;)ns(a,"add",t[r++]);return a}function ns(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function Fw(e){if(!H)return;const t=H.token,n=H;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(H!==n||Wt!==t)return;n.cache.set(e,i)}catch(i){H===n&&Wt===t&&x("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),Sa()}function Uw(){if(!H)return;const e=H.token,t=H;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{H===t&&Wt===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{H!==t||Wt!==e||(s&&x("load revisions to compare",s),Sa())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;Sa()}ee({"show-document-revisions":(e,t)=>{ip("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{ip("issue",t.issueId)},"select-revision-version":(e,t)=>{Fw(Number(t.version))},"toggle-revision-compare":()=>{Uw()},"close-revision-viewer":()=>{H=null,O()}});const Gw=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let dn=[],Ta=null,sl=0;ct(e=>{e==="currentProject"&&A()==="board"&&is()});async function is(){Is(-1);const e=++sl,t=G();if(!t){const i=document.getElementById("kanban-board");i&&(i.innerHTML=Y().length===0?q({icon:M.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):q({icon:M.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const n=document.getElementById("kanban-board");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const i=await h.getIssues({project_id:t});if(e!==sl)return;dn=i,A()==="board"&&wn(dn),ss()}catch(i){if(e!==sl)return;n&&(n.innerHTML=q({icon:M.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),x("load board",i)}}const al=af(()=>is(),200);function ss(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;e.innerHTML=Gw.map(i=>{const s=dn.filter(a=>a.status===i.key);return`
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
                            <div class="kanban-card-title">${m(a.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${a.identifier}</span>
                                <span class="badge badge-priority-${a.priority}" style="font-size: 10px;">${Pe(a.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""),zw(t)}function zw(e){const t=gc();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){Is(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),Is(i),n[i].classList.add("keyboard-selected")}function Vw(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Ta=t.dataset.id,t.classList.add("dragging")}function Ww(e,t){t.classList.remove("dragging"),Ta=null}function sp(e){const t=dn.find(n=>n.id===Ta);return!!t&&t.status===e}function Kw(e,t){e.preventDefault(),!sp(t.dataset.status)&&t.classList.add("drag-over")}function Yw(e,t){t.classList.remove("drag-over")}function Zw(e,t){e.preventDefault();const n=dn.find(i=>i.id===t.dataset.id);n&&sp(n.status)||t.classList.add("drag-over")}function Xw(e,t){t.classList.remove("drag-over")}async function Qw(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=dn.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,ss();try{await h.updateIssue(n,{status:i}),k("Status updated","success")}catch(o){s.status=a,ss(),x("update status",o)}}}async function Jw(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Ta||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=dn.find(l=>l.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,ss();try{await h.updateIssue(n,{status:a}),k("Status updated","success")}catch(l){o.status=r,ss(),x("update status",l)}}}ee({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),te(t.id)):e.type==="dragstart"?Vw(e,n):e.type==="dragend"?Ww(e,n):e.type==="dragover"?Zw(e,n):e.type==="dragleave"?Xw(e,n):e.type==="drop"&&Jw(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?Kw(e,n):e.type==="dragleave"?Yw(e,n):e.type==="drop"&&Qw(e,n)},"retry-load-board":()=>is()});const Kt=new Map,ap=6e4,ol=100;let Ee=null,La=null,Ca=null,as=null,op=!1;const ek={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},tk={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},rp={api:null};let rl={...rp};function nk(e={}){rl={...rp,...e},Ee||(Ee=document.createElement("div"),Ee.className="issue-tooltip",Ee.style.display="none",document.body.appendChild(Ee),Ee.addEventListener("mouseenter",()=>{clearTimeout(La)}),Ee.addEventListener("mouseleave",()=>{ll()})),op||(document.addEventListener("mouseover",ik),document.addEventListener("mouseout",sk),op=!0)}function ik(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=ak(t);if(n){if(n===as&&Ee.style.display!=="none"){clearTimeout(La);return}clearTimeout(Ca),Ca=setTimeout(()=>{ok(t,n)},200)}}function sk(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Ca),La=setTimeout(()=>{ll()},150))}function ak(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function ok(e,t){as=t;const n=e.getBoundingClientRect();Ee.style.left=`${n.left+window.scrollX}px`,Ee.style.top=`${n.bottom+window.scrollY+8}px`,Ee.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Ee.style.display="block";try{const i=await lk(t);if(as!==t)return;ck(i)}catch{if(as!==t)return;Ee.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function ll(){clearTimeout(Ca),clearTimeout(La),Ee&&(Ee.style.display="none"),as=null}function rk(){const e=Date.now();for(const[t,n]of Kt.entries())e-n.timestamp>=ap&&Kt.delete(t)}async function lk(e){Kt.size>ol/2&&rk();const t=Kt.get(e);if(t&&Date.now()-t.timestamp<ap)return t.issue;if(!rl.api)throw new Error("API not initialized");const n=await rl.api.getIssueByIdentifier(e);if(Kt.size>=ol){const i=Array.from(Kt.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,ol/2);for(const[a]of s)Kt.delete(a)}return Kt.set(e,{issue:n,timestamp:Date.now()}),n}function ck(e){const t=ek[e.status]||"#6b7280",n=tk[e.priority]||"#6b7280",i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Ee.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${m(e.identifier)}</span>
            <span class="issue-tooltip-type">${m(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${m(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${dk(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${uk(e.priority)}</span>
        </div>
    `}function dk(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function uk(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function lp(){return!!document.querySelector(".description-inline-editor")}function cl(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function dl(){var e;return cl("issue-detail-view")?((e=Fe())==null?void 0:e.id)??null:null}function un(e){return!!e&&dl()===e}function pk(){Me("issue:created",hk),Me("issue:updated",vk),Me("issue:deleted",bk),Me("comment",kk),Me("relation",Ek),Me("attestation",xk),Me("activity",Ik),Me("project",Sk),Me("sprint",Tk),Me("document",$k),Me("inbox",_k),Me("connection:reconnected",Lk),Me("connection:unauthorized",fk),Me("connection:forbidden",gk),Me("connection:superseded",mk)}function mk(){k("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function fk(){h.logout(),yn(null),ki(null),Ji(),k("Your session has ended. Please sign in again.","warning")}function gk(){k("Live updates stopped: you no longer have access to this team.","error")}function hk(e){var s;const t=qe(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,dt(a),A()==="issues"&&St()}else dt([e,...t]),A()==="issues"&&St(),k(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((s=xt())==null?void 0:s.id)){const a=It(),o=a.findIndex(l=>l.id===e.id),r=a.findIndex(l=>l._isOptimistic&&l.title===e.title);if(o===-1&&r===-1)Sn([e,...a]),A()==="my-issues"&&_i();else if(r>=0){const l=[...a];l[r]=e,Sn(l),A()==="my-issues"&&_i()}}A()==="board"?al():A()==="sprints"?os():A()==="epics"&&Vt(),un(e.parent_id)&&pn(e.parent_id)}function vk(e){const t=qe();t.some(s=>s.id===e.id)&&dt(t.map(s=>s.id===e.id?e:s));const n=It();n.some(s=>s.id===e.id)&&Sn(n.map(s=>s.id===e.id?e:s));const i=xs();i.some(s=>s.id===e.id)&&wn(i.map(s=>s.id===e.id?e:s)),A()==="issues"?St():A()==="my-issues"?_i():A()==="board"?al():A()==="sprints"?os():A()==="epics"&&Vt(),un(e.id)&&(lp()?jo(e):pn(e.id))}function bk(e){dt(qe().filter(n=>n.id!==e.id)),Sn(It().filter(n=>n.id!==e.id));const t=xs();t.some(n=>n.id===e.id)&&wn(t.filter(n=>n.id!==e.id)),A()==="issues"?St():A()==="my-issues"?(_i(),Ln({showLoading:!1})):A()==="board"?al():A()==="sprints"?os():A()==="epics"&&Vt(),k(`Issue ${e.identifier} deleted`,"info"),un(e.id)&&(k(`Issue ${e.identifier} was deleted`,"warning"),R("my-issues"))}const cp=250,yk=1e3,Jn=new Map;function pn(e){lp()?jo():ul(e,cp)}function ul(e,t){let n=Jn.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},Jn.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>wk(e),t))}async function wk(e){const t=Jn.get(e);if(!t)return;if(t.timer=null,!un(e)){Jn.delete(e);return}t.inFlight=!0;let n;try{n=await te(e,!1,{refresh:!0})}finally{t.inFlight=!1}Jn.get(e)===t&&(t.again?(t.again=!1,ul(e,cp)):n==="retry"?ul(e,yk):Jn.delete(e))}function kk(e){A()==="my-issues"&&Ln({showLoading:!1}),un(e.issue_id)&&pn(e.issue_id),e.document_id&&_d(e.document_id)}function $k(e,{type:t}={}){xd(),t==="deleted"?hh(e.id,e.title):_d(e.id)}function Ek(e){const t=dl();t&&(e.source_issue_id===t||e.target_issue_id===t)&&pn(t)}function xk(e){A()==="approvals"&&mt(),un(e.issue_id)&&pn(e.issue_id)}function _k(e,t){var n;e.recipient_user_id===((n=xt())==null?void 0:n.id)&&(Gn(),fb(t==null?void 0:t.type,e),A()==="inbox"&&!vb(t==null?void 0:t.type,e)&&zi({background:!0}))}function Ik(e){A()==="my-issues"&&Ln({showLoading:!1}),un(e.issue_id)&&pn(e.issue_id)}function Sk(e,{type:t}){Ze().then(()=>{A()==="projects"&&On()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?k(`New project: ${e.name}`,"info"):t==="deleted"&&k(`Project ${e.name} deleted`,"info")}function os(){const e=Fh();e&&cl("sprint-detail-view")?qn(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):cl("sprints-view")&&Ft().catch(t=>console.error("Failed to reload sprints:",t))}function Tk(e,{type:t}={}){Dd(),A()==="sprints"?os():A()==="my-issues"&&Ii(),t==="created"?k(`New sprint: ${e.name}`,"info"):t==="closed"&&k(`Sprint ${e.name} closed`,"info")}function Lk(){const e=A();Gn(),e==="issues"?_t().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(Tn().catch(n=>console.error("Failed to resync my issues:",n)),Ii().catch(n=>console.error("Failed to resync sprint status:",n)),Ln({showLoading:!1})):e==="board"?is():e==="sprints"?os():e==="epics"?Vt().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?Ze().then(()=>{A()==="projects"&&On()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?xd():e==="approvals"?mt():e==="inbox"&&zi({background:!0});const t=dl();t&&pn(t)}const dp='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function up(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function Ck(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),up(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(dp);n&&n.focus()}}}function Aa(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),up(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=n.querySelectorAll(dp);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Aa()});async function Ak(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=G();if(!i){k("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=Y().find(c=>c.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};dt([r,...qe()]),St();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const c=await h.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=qe(),u=d.findIndex(f=>f.id===a);u!==-1&&(d[u]=c,dt(d)),St(),Ze(),k("Issue created!","success")}catch(c){dt(qe().filter(d=>d.id!==a)),St(),x("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}eb({beforeNavigate:()=>{Ov(),zd(null),Ls(null),bc(null),Aa(),ll()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return tp(e[1]),!0;if(e[0]==="issue"&&e[1])return Vs(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(Vs(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(Fk(e[1]),!0):e[0]==="sprint"&&e[1]?(Vh(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Kd(e[1]),!0):!1},detailPopstate:e=>e.epicId?(il(e.epicId,!1),!0):e.issueId?(te(e.issueId,!1),!0):e.identifier?(Vs(e.identifier),!0):e.documentId?($e(e.documentId,!1),!0):e.sprintId?(qn(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=dr();e&&Y().some(t=>t.id===e)&&Ye(e)},issueNavigate:e=>Vs(e),epicNavigate:e=>tp(e)}),Jv({"my-issues":()=>{Ii(),Tn(),Ln()},approvals:()=>{mt()},inbox:()=>{zi({focusFirst:!0})},issues:()=>{jc(),Nf(),Ff(),Lc().then(()=>{const e=new URLSearchParams(window.location.search),t=e.getAll("label");if(t.length>0){const i=document.getElementById("label-filter-dropdown");i&&(i.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=t.includes(a.value)}),Bs())}const n=e.getAll("exclude_label");if(n.length>0){const i=document.getElementById("exclude-label-filter-dropdown");i&&(i.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=n.includes(a.value)}),js())}}),Bc().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}_t()})},query:()=>{xw()},epics:()=>{Vt()},board:()=>{is()},projects:()=>{Ze().then(On)},sprints:()=>{Ft()},rituals:()=>{dv()},documents:()=>{an()},team:()=>{Lr(),gu(),ga()},settings:()=>{Vr(),Fu(),Uu(),Os()}});function Bk(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||O()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>O())}function jk(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>Yd(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>Uv());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>Gv()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>Zd(a))})}function Dk(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>$d("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>$d("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Ed());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>ch());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Ot())}function Mk(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>Fc())}function Rk(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>Hf());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>Sf());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>Tf()),document.querySelectorAll(".multi-select-btn").forEach(b=>{const v=b.parentElement;v!=null&&v.querySelector("#status-filter-dropdown")?b.addEventListener("click",()=>Ds("status-filter-dropdown")):v!=null&&v.querySelector("#priority-filter-dropdown")?b.addEventListener("click",()=>Ds("priority-filter-dropdown")):v!=null&&v.querySelector("#label-filter-dropdown")?b.addEventListener("click",()=>Ds("label-filter-dropdown")):v!=null&&v.querySelector("#exclude-label-filter-dropdown")&&b.addEventListener("click",()=>Ds("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.addEventListener("change",()=>Ms())});const b=i.querySelector(".btn-small");b&&b.addEventListener("click",()=>Rs())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.addEventListener("change",()=>yo())});const b=s.querySelector(".btn-small");b&&b.addEventListener("click",()=>wo())}const a=document.getElementById("label-filter-dropdown");if(a){const b=a.querySelector(".btn-small");b&&b.addEventListener("click",()=>Ps())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const b=o.querySelector(".btn-small");b&&b.addEventListener("click",()=>qs())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>Ue());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>Ue());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>Ue());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>_t());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>Pc());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",b=>Ak(b))}function Pk(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>pv(t.dataset.tab))})}function qk(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>mu());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Ci()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),R(o.dataset.view))})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Db());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>Aa());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>Ck());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>Ci())}ee({"navigate-to":(e,t)=>{R(t.view)},"set-current-project":(e,t,n)=>{Ye(n.value)},showCreateIssueModal:()=>Ci(),showCreateEpicModal:()=>Sw(),"retry-load-epics":()=>Vt(),showCreateProjectModal:()=>Wd(),showCreateDocumentModal:()=>Sd(),showCreateTeamModal:()=>yu(),showEditTeamModal:()=>Kb(),showInviteModal:()=>hu(),showCreateApiKeyModal:()=>Uy(),showCreateAgentModal:()=>Ig(),resetOnboarding:()=>Iu(),logout:()=>Hu(),navigateToProjects:()=>R("projects")});async function Nk(){if(!h.getToken()){await qu();return}try{const e=await h.getMe();yn(e),await Yn()}catch(e){if((e==null?void 0:e.status)===401||(e==null?void 0:e.status)===403){h.logout(),await qu();return}console.error("Failed to load current user on boot:",e),Ji(),k("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{wf(),Hy(),qk(),Bk(),Mk(),Rk(),Pk(),jk(),Dk(),Ok(),Hk(),nk({api:h}),pk(),await Nk()});function Ok(){const e=document.getElementById("theme-toggle");if(!e)return;const t=Rm()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),Pm(n?"light":"dark")})}function Hk(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");nu(i)}}})}async function Fk(e){try{await $e(e,!1)}catch{R("documents",!1)}}document.addEventListener("keydown",Aw({getCurrentView:A,getSelectedIndex:mc,setSelectedIndex:yi,viewIssue:te,showEditIssueModal:id,showInlineDropdown:Io,isInlineDropdownOpen:Si,isModalOpen:We,isCommandPaletteOpen:cn,isDetailViewActive:Qn})),document.addEventListener("keydown",Bw({getCurrentView:A,getSelectedIndex:cf,setSelectedIndex:fc,viewDocument:$e,showEditDocumentModal:Td,isModalOpen:We,isCommandPaletteOpen:cn,isDetailViewActive:Qn})),document.addEventListener("keydown",Dw({getCurrentView:A,getSelectedIndex:gc,setSelectedIndex:Is,viewIssue:te,isModalOpen:We,isCommandPaletteOpen:cn,isDetailViewActive:Qn})),document.addEventListener("keydown",jw({getCurrentView:A,getSelectedIndex:df,setSelectedIndex:Ss,toggleInboxExpand:Tb,collapseInboxExpand:wb,archiveInboxEntry:Sb,isInlineDropdownOpen:Si,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:We,isCommandPaletteOpen:cn,isDetailViewActive:Qn})),document.addEventListener("keydown",Mw()),document.addEventListener("keydown",np({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&qn(e.dataset.sprintId)},getCurrentView:A,getSelectedIndex:uf,setSelectedIndex:hc,isModalOpen:We,isCommandPaletteOpen:cn,isDetailViewActive:Qn})),document.addEventListener("keydown",np({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&iu(e.dataset.identifier)},getCurrentView:A,getSelectedIndex:pf,setSelectedIndex:vc,isModalOpen:We,isCommandPaletteOpen:cn,isDetailViewActive:Qn})),document.addEventListener("keydown",Lw({closeModal:O,closeSidebar:Aa,navigateTo:R,showCreateIssueModal:Ci,showKeyboardShortcutsHelp:Wu,isModalOpen:We,focusSearch:()=>{R("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},isInlineDropdownOpen:Si,closeInlineDropdowns:sf,isModalDirty:tf,focusModalField:cc,closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),nn()},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))}})),Jy([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>R("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>R("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>R("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>R("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>R("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>R("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>R("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>R("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>R("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>R("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>R("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>R("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{R("issues"),setTimeout(Ci,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{R("projects"),setTimeout(Wd,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{R("documents"),setTimeout(Sd,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>yu(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{R("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{R("team"),setTimeout(hu,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>Wu(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Iu(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Hu(),category:"Account"}]),document.addEventListener("keydown",Cw({isModalOpen:We,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:cn,openCommandPalette:ew,closeCommandPalette:wa})),window.marked=U,window.DOMPurify=ec,console.log("Chaotic frontend loaded via Vite")})();
