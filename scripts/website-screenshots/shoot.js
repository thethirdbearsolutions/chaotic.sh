const {chromium}=require('playwright');
const S=process.argv[2], B=process.env.CHAOTIC_URL||'http://127.0.0.1:24300';
(async()=>{const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2,colorScheme:'dark'});
const p=await ctx.newPage(); p.on('pageerror',e=>console.log('ERR',e.message));
const r=await (await fetch(B+'/api/auth/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:'ada@example.com',password:'demo-password-1'})})).json();
await p.goto(B+'/');
await p.evaluate(t=>{localStorage.setItem('chaotic_token',t);localStorage.setItem('chaotic_onboarding_complete','true');},r.access_token);
for (const [name,path] of JSON.parse(process.argv[3])){
  await p.goto(B+path); await p.waitForTimeout(2500);
  await p.screenshot({path:`${S}/${name}.png`}); console.log('shot',name);
}
await b.close();})();
