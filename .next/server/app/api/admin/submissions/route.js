(()=>{var e={};e.id=498,e.ids=[498],e.modules={2849:e=>{function t(e){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=2849,e.exports=t},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8893:e=>{"use strict";e.exports=require("buffer")},4770:e=>{"use strict";e.exports=require("crypto")},7702:e=>{"use strict";e.exports=require("events")},8216:e=>{"use strict";e.exports=require("net")},5816:e=>{"use strict";e.exports=require("process")},6162:e=>{"use strict";e.exports=require("stream")},4026:e=>{"use strict";e.exports=require("string_decoder")},5346:e=>{"use strict";e.exports=require("timers")},2452:e=>{"use strict";e.exports=require("tls")},7360:e=>{"use strict";e.exports=require("url")},1764:e=>{"use strict";e.exports=require("util")},1568:e=>{"use strict";e.exports=require("zlib")},195:(e,t,s)=>{"use strict";s.r(t),s.d(t,{originalPathname:()=>l,patchFetch:()=>m,requestAsyncStorage:()=>A,routeModule:()=>p,serverHooks:()=>R,staticGenerationAsyncStorage:()=>d});var r={};s.r(r),s.d(r,{GET:()=>E});var o=s(9303),i=s(8716),n=s(670),u=s(7070),a=s(9487),c=s(1482),T=s.n(c);async function E(e){try{let t=e.headers.get("authorization"),s=t?.replace("Bearer ","")||null;if(!function(e){if(!e)return null;try{return T().verify(e,process.env.JWT_SECRET||"your-secret-key")}catch{return null}}(s))return u.NextResponse.json({error:"Unauthorized"},{status:401});let r=(0,a.o)(),[o]=await r.execute("SELECT * FROM form_submissions ORDER BY created_at DESC LIMIT 100");return u.NextResponse.json({success:!0,submissions:o},{status:200})}catch(e){return console.error("Error fetching submissions:",e),u.NextResponse.json({error:"Failed to fetch submissions"},{status:500})}}let p=new o.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/admin/submissions/route",pathname:"/api/admin/submissions",filename:"route",bundlePath:"app/api/admin/submissions/route"},resolvedPagePath:"F:\\Rohit Development\\Landing page\\app\\api\\admin\\submissions\\route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:A,staticGenerationAsyncStorage:d,serverHooks:R}=p,l="/api/admin/submissions/route";function m(){return(0,n.patchFetch)({serverHooks:R,staticGenerationAsyncStorage:d})}},9487:(e,t,s)=>{"use strict";s.d(t,{o:()=>i,q:()=>n});var r=s(3785);let o=null;function i(){if(!o){let e={host:process.env.DB_HOST||"localhost",port:parseInt(process.env.DB_PORT||"3306"),database:process.env.DB_NAME||"horizon_school_db",user:process.env.DB_USER||"root",password:process.env.DB_PASSWORD||"",waitForConnections:!0,connectionLimit:10,queueLimit:0};console.log("Database config:",{...e,password:e.password?"***":"empty"}),o=r.createPool(e)}return o}async function n(){let e=i();try{await e.execute(`
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
    `),console.log("Database tables initialized successfully")}catch(e){throw console.error("Error initializing database:",e),e}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[276,240,482],()=>s(195));module.exports=r})();