(()=>{var e={};e.id=672,e.ids=[672],e.modules={2849:e=>{function r(e){var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}r.keys=()=>[],r.resolve=r,r.id=2849,e.exports=r},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8893:e=>{"use strict";e.exports=require("buffer")},4770:e=>{"use strict";e.exports=require("crypto")},7702:e=>{"use strict";e.exports=require("events")},8216:e=>{"use strict";e.exports=require("net")},5816:e=>{"use strict";e.exports=require("process")},6162:e=>{"use strict";e.exports=require("stream")},4026:e=>{"use strict";e.exports=require("string_decoder")},5346:e=>{"use strict";e.exports=require("timers")},2452:e=>{"use strict";e.exports=require("tls")},7360:e=>{"use strict";e.exports=require("url")},1764:e=>{"use strict";e.exports=require("util")},1568:e=>{"use strict";e.exports=require("zlib")},1395:(e,r,t)=>{"use strict";t.r(r),t.d(r,{originalPathname:()=>N,patchFetch:()=>_,requestAsyncStorage:()=>A,routeModule:()=>l,serverHooks:()=>m,staticGenerationAsyncStorage:()=>R});var s={};t.r(s),t.d(s,{POST:()=>d});var o=t(9303),i=t(8716),n=t(670),a=t(7070),u=t(9487),c=t(2023),T=t.n(c),E=t(1482),p=t.n(E);async function d(e){try{let{username:r,password:t}=await e.json();if(!r||!t)return a.NextResponse.json({error:"Username and password are required"},{status:400});let s=(0,u.o)(),[o]=await s.execute("SELECT * FROM admin_users WHERE username = ?",[r]);if(0===o.length)return a.NextResponse.json({error:"Invalid credentials"},{status:401});let i=o[0];if(!await T().compare(t,i.password_hash))return a.NextResponse.json({error:"Invalid credentials"},{status:401});let n=p().sign({id:i.id,username:i.username},process.env.JWT_SECRET||"your-secret-key",{expiresIn:"7d"});return a.NextResponse.json({success:!0,token:n,user:{id:i.id,username:i.username,email:i.email}},{status:200})}catch(e){return console.error("Error during login:",e),a.NextResponse.json({error:"Login failed. Please try again."},{status:500})}}let l=new o.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/admin/login/route",pathname:"/api/admin/login",filename:"route",bundlePath:"app/api/admin/login/route"},resolvedPagePath:"F:\\Rohit Development\\Landing page\\app\\api\\admin\\login\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:A,staticGenerationAsyncStorage:R,serverHooks:m}=l,N="/api/admin/login/route";function _(){return(0,n.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:R})}},9487:(e,r,t)=>{"use strict";t.d(r,{o:()=>i,q:()=>n});var s=t(3785);let o=null;function i(){if(!o){let e={host:process.env.DB_HOST||"localhost",port:parseInt(process.env.DB_PORT||"3306"),database:process.env.DB_NAME||"horizon_school_db",user:process.env.DB_USER||"root",password:process.env.DB_PASSWORD||"",waitForConnections:!0,connectionLimit:10,queueLimit:0};console.log("Database config:",{...e,password:e.password?"***":"empty"}),o=s.createPool(e)}return o}async function n(){let e=i();try{await e.execute(`
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
    `),console.log("Database tables initialized successfully")}catch(e){throw console.error("Error initializing database:",e),e}}}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[276,240,482,23],()=>t(1395));module.exports=s})();