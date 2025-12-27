(()=>{var e={};e.id=735,e.ids=[735],e.modules={2849:e=>{function t(e){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=2849,e.exports=t},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8893:e=>{"use strict";e.exports=require("buffer")},4770:e=>{"use strict";e.exports=require("crypto")},7702:e=>{"use strict";e.exports=require("events")},8216:e=>{"use strict";e.exports=require("net")},5816:e=>{"use strict";e.exports=require("process")},6162:e=>{"use strict";e.exports=require("stream")},4026:e=>{"use strict";e.exports=require("string_decoder")},5346:e=>{"use strict";e.exports=require("timers")},2452:e=>{"use strict";e.exports=require("tls")},7360:e=>{"use strict";e.exports=require("url")},1764:e=>{"use strict";e.exports=require("util")},1568:e=>{"use strict";e.exports=require("zlib")},8082:(e,t,s)=>{"use strict";s.r(t),s.d(t,{originalPathname:()=>R,patchFetch:()=>_,requestAsyncStorage:()=>E,routeModule:()=>T,serverHooks:()=>A,staticGenerationAsyncStorage:()=>p});var r={};s.r(r),s.d(r,{GET:()=>u});var o=s(9303),n=s(8716),i=s(670),a=s(7070),c=s(9487);async function u(e){try{let e=(0,c.o)(),[t]=await e.execute("SELECT 1 as test"),[s]=await e.execute("SELECT DATABASE() as db_name"),r=s[0]?.db_name||"unknown",[o]=await e.execute("SHOW TABLES LIKE 'form_submissions'"),n=o.length>0;return a.NextResponse.json({success:!0,connected:!0,database:r,message:"Database connection successful!",tablesExist:n,env:{DB_HOST:process.env.DB_HOST||"not set",DB_PORT:process.env.DB_PORT||"not set",DB_NAME:process.env.DB_NAME||"not set",DB_USER:process.env.DB_USER||"not set",DB_PASSWORD:""===process.env.DB_PASSWORD?"empty":"set"}},{status:200})}catch(e){return a.NextResponse.json({success:!1,connected:!1,error:e.message,env:{DB_HOST:process.env.DB_HOST||"not set",DB_PORT:process.env.DB_PORT||"not set",DB_NAME:process.env.DB_NAME||"not set",DB_USER:process.env.DB_USER||"not set",DB_PASSWORD:""===process.env.DB_PASSWORD?"empty":"set"}},{status:500})}}let T=new o.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/test-db/route",pathname:"/api/test-db",filename:"route",bundlePath:"app/api/test-db/route"},resolvedPagePath:"F:\\Rohit Development\\Landing page\\app\\api\\test-db\\route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:E,staticGenerationAsyncStorage:p,serverHooks:A}=T,R="/api/test-db/route";function _(){return(0,i.patchFetch)({serverHooks:A,staticGenerationAsyncStorage:p})}},9487:(e,t,s)=>{"use strict";s.d(t,{o:()=>n,q:()=>i});var r=s(3785);let o=null;function n(){if(!o){let e={host:process.env.DB_HOST||"localhost",port:parseInt(process.env.DB_PORT||"3306"),database:process.env.DB_NAME||"horizon_school_db",user:process.env.DB_USER||"root",password:process.env.DB_PASSWORD||"",waitForConnections:!0,connectionLimit:10,queueLimit:0};console.log("Database config:",{...e,password:e.password?"***":"empty"}),o=r.createPool(e)}return o}async function i(){let e=n();try{await e.execute(`
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
    `),console.log("Database tables initialized successfully")}catch(e){throw console.error("Error initializing database:",e),e}}}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[276,240],()=>s(8082));module.exports=r})();