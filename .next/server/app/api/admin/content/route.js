(()=>{var e={};e.id=710,e.ids=[710],e.modules={2849:e=>{function t(e){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=2849,e.exports=t},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8893:e=>{"use strict";e.exports=require("buffer")},4770:e=>{"use strict";e.exports=require("crypto")},7702:e=>{"use strict";e.exports=require("events")},8216:e=>{"use strict";e.exports=require("net")},5816:e=>{"use strict";e.exports=require("process")},6162:e=>{"use strict";e.exports=require("stream")},4026:e=>{"use strict";e.exports=require("string_decoder")},5346:e=>{"use strict";e.exports=require("timers")},2452:e=>{"use strict";e.exports=require("tls")},7360:e=>{"use strict";e.exports=require("url")},1764:e=>{"use strict";e.exports=require("util")},1568:e=>{"use strict";e.exports=require("zlib")},5853:(e,t,r)=>{"use strict";r.r(t),r.d(t,{originalPathname:()=>_,patchFetch:()=>m,requestAsyncStorage:()=>A,routeModule:()=>R,serverHooks:()=>N,staticGenerationAsyncStorage:()=>l});var n={};r.r(n),r.d(n,{GET:()=>p,POST:()=>d});var s=r(9303),o=r(8716),i=r(670),a=r(7070),u=r(9487),c=r(1482),E=r.n(c);function T(e){if(!e)return null;try{return E().verify(e,process.env.JWT_SECRET||"your-secret-key")}catch{return null}}async function p(e){try{let t=e.headers.get("Authorization"),r=t?.replace("Bearer ","")||null;if(!T(r))return a.NextResponse.json({error:"Unauthorized"},{status:401});let n=(0,u.o)(),[s]=await n.execute("SELECT * FROM page_content ORDER BY section_key");return a.NextResponse.json({content:s})}catch(e){return console.error("Error fetching content:",e),a.NextResponse.json({error:"Failed to fetch content"},{status:500})}}async function d(e){try{let t=e.headers.get("Authorization"),r=t?.replace("Bearer ","")||null;if(!T(r))return a.NextResponse.json({error:"Unauthorized"},{status:401});let{sectionKey:n,contentType:s,contentData:o}=await e.json();if(!n||!s)return a.NextResponse.json({error:"sectionKey and contentType are required"},{status:400});let i=(0,u.o)(),[c]=await i.execute("SELECT * FROM page_content WHERE section_key = ?",[n]);return c.length>0?await i.execute("UPDATE page_content SET content_type = ?, content_data = ? WHERE section_key = ?",[s,JSON.stringify(o),n]):await i.execute("INSERT INTO page_content (section_key, content_type, content_data) VALUES (?, ?, ?)",[n,s,JSON.stringify(o)]),a.NextResponse.json({success:!0,message:"Content updated successfully"})}catch(e){return console.error("Error updating content:",e),a.NextResponse.json({error:"Failed to update content"},{status:500})}}let R=new s.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/admin/content/route",pathname:"/api/admin/content",filename:"route",bundlePath:"app/api/admin/content/route"},resolvedPagePath:"F:\\Rohit Development\\Landing page\\app\\api\\admin\\content\\route.ts",nextConfigOutput:"",userland:n}),{requestAsyncStorage:A,staticGenerationAsyncStorage:l,serverHooks:N}=R,_="/api/admin/content/route";function m(){return(0,i.patchFetch)({serverHooks:N,staticGenerationAsyncStorage:l})}},9487:(e,t,r)=>{"use strict";r.d(t,{o:()=>o,q:()=>i});var n=r(3785);let s=null;function o(){if(!s){let e={host:process.env.DB_HOST||"localhost",port:parseInt(process.env.DB_PORT||"3306"),database:process.env.DB_NAME||"horizon_school_db",user:process.env.DB_USER||"root",password:process.env.DB_PASSWORD||"",waitForConnections:!0,connectionLimit:10,queueLimit:0};console.log("Database config:",{...e,password:e.password?"***":"empty"}),s=n.createPool(e)}return s}async function i(){let e=o();try{await e.execute(`
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
    `),console.log("Database tables initialized successfully")}catch(e){throw console.error("Error initializing database:",e),e}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[276,240,482],()=>r(5853));module.exports=n})();