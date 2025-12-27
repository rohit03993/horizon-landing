(()=>{var e={};e.id=75,e.ids=[75],e.modules={2849:e=>{function t(e){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=2849,e.exports=t},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8893:e=>{"use strict";e.exports=require("buffer")},4770:e=>{"use strict";e.exports=require("crypto")},7702:e=>{"use strict";e.exports=require("events")},8216:e=>{"use strict";e.exports=require("net")},5816:e=>{"use strict";e.exports=require("process")},6162:e=>{"use strict";e.exports=require("stream")},4026:e=>{"use strict";e.exports=require("string_decoder")},5346:e=>{"use strict";e.exports=require("timers")},2452:e=>{"use strict";e.exports=require("tls")},7360:e=>{"use strict";e.exports=require("url")},1764:e=>{"use strict";e.exports=require("util")},1568:e=>{"use strict";e.exports=require("zlib")},5460:(e,t,r)=>{"use strict";r.r(t),r.d(t,{originalPathname:()=>d,patchFetch:()=>m,requestAsyncStorage:()=>E,routeModule:()=>T,serverHooks:()=>A,staticGenerationAsyncStorage:()=>p});var s={};r.r(s),r.d(s,{POST:()=>c});var o=r(9303),i=r(8716),a=r(670),n=r(7070),u=r(9487);async function c(e){try{let{name:t,email:r,phone:s,message:o}=await e.json();if(!t||!r)return n.NextResponse.json({error:"Name and email are required"},{status:400});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r))return n.NextResponse.json({error:"Invalid email address"},{status:400});let i=(0,u.o)(),[a]=await i.execute("INSERT INTO form_submissions (name, email, phone, message, source) VALUES (?, ?, ?, ?, ?)",[t,r,s||null,o||null,"website"]);return n.NextResponse.json({success:!0,message:"Form submitted successfully",id:a.insertId},{status:200})}catch(e){return console.error("Error submitting form:",e),n.NextResponse.json({error:"Failed to submit form. Please try again."},{status:500})}}let T=new o.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/submit-form/route",pathname:"/api/submit-form",filename:"route",bundlePath:"app/api/submit-form/route"},resolvedPagePath:"F:\\Rohit Development\\Landing page\\app\\api\\submit-form\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:E,staticGenerationAsyncStorage:p,serverHooks:A}=T,d="/api/submit-form/route";function m(){return(0,a.patchFetch)({serverHooks:A,staticGenerationAsyncStorage:p})}},9487:(e,t,r)=>{"use strict";r.d(t,{o:()=>i,q:()=>a});var s=r(3785);let o=null;function i(){if(!o){let e={host:process.env.DB_HOST||"localhost",port:parseInt(process.env.DB_PORT||"3306"),database:process.env.DB_NAME||"horizon_school_db",user:process.env.DB_USER||"root",password:process.env.DB_PASSWORD||"",waitForConnections:!0,connectionLimit:10,queueLimit:0};console.log("Database config:",{...e,password:e.password?"***":"empty"}),o=s.createPool(e)}return o}async function a(){let e=i();try{await e.execute(`
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
    `),console.log("Database tables initialized successfully")}catch(e){throw console.error("Error initializing database:",e),e}}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[276,240],()=>r(5460));module.exports=s})();