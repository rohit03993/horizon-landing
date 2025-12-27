(()=>{var e={};e.id=909,e.ids=[909],e.modules={2849:e=>{function t(e){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=2849,e.exports=t},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8893:e=>{"use strict";e.exports=require("buffer")},4770:e=>{"use strict";e.exports=require("crypto")},7702:e=>{"use strict";e.exports=require("events")},8216:e=>{"use strict";e.exports=require("net")},5816:e=>{"use strict";e.exports=require("process")},6162:e=>{"use strict";e.exports=require("stream")},4026:e=>{"use strict";e.exports=require("string_decoder")},5346:e=>{"use strict";e.exports=require("timers")},2452:e=>{"use strict";e.exports=require("tls")},7360:e=>{"use strict";e.exports=require("url")},1764:e=>{"use strict";e.exports=require("util")},1568:e=>{"use strict";e.exports=require("zlib")},4945:(e,t,s)=>{"use strict";s.r(t),s.d(t,{originalPathname:()=>N,patchFetch:()=>_,requestAsyncStorage:()=>R,routeModule:()=>A,serverHooks:()=>m,staticGenerationAsyncStorage:()=>l});var r={};s.r(r),s.d(r,{GET:()=>E,POST:()=>d});var a=s(9303),i=s(8716),o=s(670),n=s(7070),u=s(9487),c=s(2023),p=s.n(c);async function T(){try{await (0,u.q)();let e=(0,u.o)(),t=process.env.ADMIN_USERNAME||"admin",s=process.env.ADMIN_PASSWORD||"admin123",[r]=await e.execute("SELECT * FROM admin_users WHERE username = ?",[t]);if(r.length>0)return{success:!0,message:"Database already initialized. Admin user exists.",username:t};let a=await p().hash(s,10);return await e.execute("INSERT INTO admin_users (username, password_hash, email) VALUES (?, ?, ?)",[t,a,""]),{success:!0,message:"Database initialized successfully",username:t,password:s,warning:"Please change the default password after first login!"}}catch(e){throw console.error("Error setting up database:",e),e}}async function E(e){try{let e=await T();return n.NextResponse.json(e,{status:200})}catch(e){return n.NextResponse.json({error:"Failed to setup database: "+e.message},{status:500})}}async function d(e){try{let e=await T();return n.NextResponse.json(e,{status:200})}catch(e){return n.NextResponse.json({error:"Failed to setup database: "+e.message},{status:500})}}let A=new a.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/admin/setup/route",pathname:"/api/admin/setup",filename:"route",bundlePath:"app/api/admin/setup/route"},resolvedPagePath:"F:\\Rohit Development\\Landing page\\app\\api\\admin\\setup\\route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:R,staticGenerationAsyncStorage:l,serverHooks:m}=A,N="/api/admin/setup/route";function _(){return(0,o.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:l})}},9487:(e,t,s)=>{"use strict";s.d(t,{o:()=>i,q:()=>o});var r=s(3785);let a=null;function i(){if(!a){let e={host:process.env.DB_HOST||"localhost",port:parseInt(process.env.DB_PORT||"3306"),database:process.env.DB_NAME||"horizon_school_db",user:process.env.DB_USER||"root",password:process.env.DB_PASSWORD||"",waitForConnections:!0,connectionLimit:10,queueLimit:0};console.log("Database config:",{...e,password:e.password?"***":"empty"}),a=r.createPool(e)}return a}async function o(){let e=i();try{await e.execute(`
      CREATE TABLE IF NOT EXISTS form_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        message TEXT,
        source VARCHAR(50) DEFAULT 'website',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `),await e.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `),await e.execute(`
      CREATE TABLE IF NOT EXISTS page_content (
        id INT AUTO_INCREMENT PRIMARY KEY,
        section_key VARCHAR(100) UNIQUE NOT NULL,
        content_type VARCHAR(50) NOT NULL,
        content_data TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `),console.log("Database tables initialized successfully")}catch(e){throw console.error("Error initializing database:",e),e}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[276,240,23],()=>s(4945));module.exports=r})();