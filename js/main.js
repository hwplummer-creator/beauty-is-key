/* Beauty Is Key Salon — site script */
var menu = {
  braids: [
    ["Box braids","","3+ hrs","$180+","Braids"],
    ["Knotless braids","","3+ hrs","$185+","Braids"],
    ["Half & half Fulani","","3+ hrs","$175+","Braids"],
    ["Fulani with boho","","3+ hrs","$185+","Braids"],
    ["Boho braids","Human hair extra","3+ hrs","$200+","Braids"],
    ["Kids' braids","Singles","1½+ hrs","$165+","Kids' braids"]
  ],
  cornrows: [
    ["Cornrow style","6 or more cornrows","2+ hrs","$80+","Cornrows"],
    ["Cornrows with added hair","","2+ hrs","$100+","Cornrows"],
    ["Crochet","Plus the cost of hair","2+ hrs","$100+","Crochet"]
  ],
  locs: [
    ["Retwist","","","$75+","Locs"],
    ["Retwist and style","","","$85+","Locs"],
    ["Interlocking","","","$135+","Locs"]
  ],
  natural: [
    ["Natural style","","","$85+","Natural hair / silk press"],
    ["Silk press","","","$80+","Natural hair / silk press"],
    ["Trim","Add-on to any service","","+$10","Not sure yet"]
  ]
};
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");}
function find(name){for(var k in menu){for(var i=0;i<menu[k].length;i++){if(menu[k][i][0]===name)return menu[k][i];}}}

/* services */
var svclist=document.getElementById("svclist");
function showMenu(k){
  svclist.innerHTML=menu[k].map(function(r,i){
    return '<div class="li"><span class="t">'+esc(r[0])+(r[1]?'<small>'+esc(r[1])+'</small>':'')+'</span><span class="price">'+esc(r[3])+'</span><span class="dur">'+(r[2]?'<svg width="14" height="14"><use href="#clock"/></svg>'+esc(r[2]):'')+'</span><a class="bk" href="#book" data-book data-svc="'+esc(r[4])+'" data-style="'+esc(r[0])+'">Book this style →</a></div>';
  }).join("");
  applyBooking();
}
var tabs=[].slice.call(document.querySelectorAll(".tab"));
function selectTab(b,focus){
  tabs.forEach(function(t){var on=t===b;t.setAttribute("aria-selected",on?"true":"false");t.tabIndex=on?0:-1;});
  svclist.setAttribute("aria-labelledby",b.id);
  if(focus){b.focus();if(b.scrollIntoView)b.scrollIntoView({block:"nearest",inline:"nearest"});}
  showMenu(b.dataset.k);
}
tabs.forEach(function(b,i){
  b.id="tab-"+b.dataset.k;b.setAttribute("aria-controls","svclist");b.tabIndex=i?-1:0;
  b.addEventListener("click",function(){selectTab(b);});
  b.addEventListener("keydown",function(e){
    var n=e.key==="ArrowRight"?i+1:e.key==="ArrowLeft"?i-1:e.key==="Home"?0:e.key==="End"?tabs.length-1:null;
    if(n===null)return;e.preventDefault();selectTab(tabs[(n+tabs.length)%tabs.length],true);
  });
});
svclist.setAttribute("aria-labelledby","tab-braids");
function preselect(svc,style){
  var sel=document.getElementById("svc");
  for(var i=0;i<sel.options.length;i++){if(sel.options[i].text===svc)sel.selectedIndex=i;}
  if(style){var m=document.getElementById("msg");if(!m.value)m.value=style+", ";}
}
document.addEventListener("click",function(e){
  var a=e.target.closest("[data-svc]");
  if(a&&!BOOKING_URL)preselect(a.dataset.svc,a.dataset.style);
});

/* style finder */
var answers={};
var picks={
  braids:{short:"Half & half Fulani",long:"Knotless braids",perm:"Box braids"},
  cornrows:{short:"Cornrow style",long:"Cornrows with added hair",perm:"Crochet"},
  locs:{short:"Retwist",long:"Retwist and style",perm:"Interlocking"},
  natural:{short:"Silk press",long:"Natural style",perm:"Natural style"}
};
var quick={"Knotless braids":"Cornrows with added hair","Box braids":"Cornrows with added hair","Half & half Fulani":"Cornrow style"};
var any={"Knotless braids":"Boho braids","Half & half Fulani":"Fulani with boho","Cornrow style":"Cornrows with added hair"};
var why={
  "Box braids":"The classic protective style. Neat, versatile and long-lasting.",
  "Knotless braids":"Lighter on your scalp than classic box braids, with a natural-looking root. A go-to protective style.",
  "Half & half Fulani":"Fulani cornrows on top with braids on the other half. Bold, fun and a little quicker than a full set.",
  "Fulani with boho":"Fulani braids finished with soft curly pieces for a textured, romantic look.",
  "Boho braids":"Braids with curly pieces left out for a soft, effortless finish. Worth the extra time.",
  "Cornrow style":"Six or more sleek cornrows. Quick, neat and easy to keep up.",
  "Cornrows with added hair":"Cornrows with extensions for extra length and fullness.",
  "Crochet":"A full look installed over cornrows, faster than individual braids. Hair cost is extra.",
  "Retwist":"Already have locs? Keep them neat between bigger appointments.",
  "Retwist and style":"A fresh retwist finished with a style, ready to wear out.",
  "Interlocking":"A tight, long-lasting way to maintain locs that holds up between visits.",
  "Natural style":"A style using your own hair, no extensions needed.",
  "Silk press":"A smooth, bouncy, heat-styled finish for natural hair, with no extensions needed."
};
var result=document.getElementById("result");
document.querySelectorAll(".q").forEach(function(q){
  var g=q.querySelector(".chips");g.setAttribute("role","group");g.setAttribute("aria-label",q.querySelector("h3").textContent);
  q.querySelectorAll(".chip").forEach(function(x){x.setAttribute("aria-pressed","false");});
  q.addEventListener("click",function(e){
    var c=e.target.closest(".chip");if(!c)return;
    q.querySelectorAll(".chip").forEach(function(x){x.setAttribute("aria-pressed","false");});
    c.setAttribute("aria-pressed","true");answers[q.dataset.q]=c.dataset.v;renderResult();
  });
});
function renderResult(){
  if(!answers.look||!answers.commit||!answers.time){
    var n=["look","commit","time"].filter(function(k){return answers[k];}).length;
    result.className="result empty";
    result.innerHTML='<svg aria-hidden="true"><use href="#key"/></svg><p class="m0">'+(n?n+' of 3 answered. Keep going.':'Pick an answer for each question and we\'ll suggest a style to start with.')+'</p>';
    return;
  }
  var name=picks[answers.look][answers.commit];
  if(answers.time==="quick"&&quick[name])name=quick[name];
  if(answers.time==="any"&&any[name])name=any[name];
  var r=find(name);
  result.className="result";
  result.innerHTML='<span class="k">Your match</span><h3>'+esc(r[0])+'</h3><p>'+esc(why[r[0]]||"")+'</p><div class="facts"><div><b>'+esc(r[3])+'</b><span>Starting price</span></div>'+(r[2]?'<div><b>'+esc(r[2])+'</b><span>In the chair</span></div>':'')+'</div><div><a class="btn gold" href="#book" data-book data-svc="'+esc(r[4])+'" data-style="'+esc(r[0])+'">Book this style <svg><use href="#arrow"/></svg></a></div>';
  applyBooking();
}

/* gallery: each look groups photos of the same style. Add a look by adding a line; photos sit next to index.html. */
var looks=[
  {cap:"Fulani with boho",sub:"Star cornrow design",cat:"braids",svc:"Braids",pics:["images/gallery/work-fulani-boho-1.jpg","images/gallery/work-fulani-boho-2.jpg","images/gallery/work-fulani-boho-3.jpg"]},
  {cap:"Boho braids",sub:"Two-tone with curly ends",cat:"braids",svc:"Braids",pics:["images/gallery/work-boho-braids-1.jpg","images/gallery/work-boho-braids-2.jpg"]},
  {cap:"Men's cornrows",sub:"Straight back and swirl",cat:"cornrows",svc:"Cornrows",pics:["images/gallery/work-mens-cornrows-1.jpg","images/gallery/work-mens-cornrows-2.jpg"]},
  {cap:"Retwist and style",sub:"Barrel twist style",cat:"locs",svc:"Locs",pics:["images/gallery/work-loc-style-1.jpg"]},
  {cap:"Silk press",sub:"Smooth with bouncy curls",cat:"natural",svc:"Natural hair / silk press",pics:["images/gallery/work-silk-press-1.jpg","images/gallery/work-silk-press-2.jpg"]},
  {cap:"Cornrows with added hair",sub:"Curved feed-in design",cat:"cornrows",svc:"Cornrows",pics:["images/gallery/work-cornrows-added-hair-1.jpg","images/gallery/work-cornrows-added-hair-2.jpg"]},
  {cap:"Kids' braids",sub:"Neat parts, gentle hands",cat:"kids",svc:"Kids' braids",pics:["images/gallery/work-kids-braids-1.jpg","images/gallery/work-kids-braids-2.jpg"]},
  {cap:"Knotless bob",sub:"Short, light and easy",cat:"braids",svc:"Braids",pics:["images/gallery/work-knotless-bob-1.jpg"]},
  {cap:"Loc retwist",sub:"Fresh retwist, styled back",cat:"locs",svc:"Locs",pics:["images/gallery/work-loc-retwist-1.jpg","images/gallery/work-loc-retwist-2.jpg"]},
  {cap:"Cornrow designs",sub:"Waves and curves",cat:"cornrows",svc:"Cornrows",pics:["images/gallery/work-cornrow-design-1.jpg","images/gallery/work-cornrow-design-2.jpg"]},
  {cap:"Rope twists",sub:"Chunky and defined",cat:"braids",svc:"Braids",pics:["images/gallery/work-rope-twists-1.jpg"]}
];
var gal=document.getElementById("gal");
gal.innerHTML=looks.map(function(L,i){
  return '<button class="look" type="button" data-i="'+i+'" data-cat="'+L.cat+'" aria-label="'+esc(L.cap)+', '+L.pics.length+' photo'+(L.pics.length>1?'s':'')+'"><img src="'+esc(L.pics[0])+'" alt="" loading="lazy" decoding="async" width="1000" height="1778">'+(L.pics.length>1?'<span class="cnt">'+L.pics.length+' photos</span>':'')+'<span class="lk-cap"><b>'+esc(L.cap)+'</b><small>'+esc(L.sub)+'</small></span></button>';
}).join("");
var gfs=[].slice.call(document.querySelectorAll(".gf"));
gfs.forEach(function(b){b.addEventListener("click",function(){
  gfs.forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false");});
  var f=b.dataset.f;
  gal.querySelectorAll(".look").forEach(function(c){c.hidden=!(f==="all"||c.dataset.cat===f);});
});});
var lb=document.getElementById("lb"),lbImg=document.getElementById("lbImg"),cur=null,ci=0,lastBtn=null;
function showPic(){
  lbImg.src=cur.pics[ci];lbImg.alt=cur.cap+", photo "+(ci+1)+" of "+cur.pics.length;
  document.getElementById("lbCap").textContent=cur.cap;
  document.getElementById("lbNum").textContent=cur.pics.length>1?(ci+1)+" / "+cur.pics.length:"";
  var one=cur.pics.length<2;
  document.getElementById("lbPrev").hidden=one;document.getElementById("lbNext").hidden=one;
  var t=document.getElementById("lbThumbs");
  t.innerHTML=one?"":cur.pics.map(function(p,j){return '<button type="button" data-j="'+j+'"'+(j===ci?' aria-current="true"':'')+' aria-label="Photo '+(j+1)+'"><img src="'+esc(p)+'" alt=""></button>';}).join("");
}
function step(d){ci=(ci+d+cur.pics.length)%cur.pics.length;showPic();}
gal.addEventListener("click",function(e){
  var c=e.target.closest(".look");if(!c)return;
  lastBtn=c;cur=looks[+c.dataset.i];ci=0;showPic();
  if(lb.showModal)lb.showModal();else lb.setAttribute("open","");
});
function closeLb(){if(lb.close)lb.close();else lb.removeAttribute("open");}
lb.addEventListener("close",function(){if(lastBtn)lastBtn.focus();});
document.getElementById("lbX").addEventListener("click",closeLb);
document.getElementById("lbPrev").addEventListener("click",function(){step(-1);});
document.getElementById("lbNext").addEventListener("click",function(){step(1);});
document.getElementById("lbThumbs").addEventListener("click",function(e){var b=e.target.closest("[data-j]");if(b){ci=+b.dataset.j;showPic();}});
lb.addEventListener("click",function(e){if(e.target===lb)closeLb();});
lb.addEventListener("keydown",function(e){if(cur&&cur.pics.length>1){if(e.key==="ArrowRight")step(1);if(e.key==="ArrowLeft")step(-1);}});
(function(){var x0=null;lb.addEventListener("touchstart",function(e){x0=e.touches[0].clientX;},{passive:true});
lb.addEventListener("touchend",function(e){if(x0===null||!cur||cur.pics.length<2)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)step(dx<0?1:-1);x0=null;});})();

/* booking: paste the salon's live booking page (Booksy, StyleSeat, Square, Vagaro...). Leave "" to keep the request form. */
var BOOKING_URL="";
function applyBooking(){
  if(!BOOKING_URL)return;
  document.querySelectorAll("[data-book]").forEach(function(a){a.href=BOOKING_URL;a.target="_blank";a.rel="noopener";});
  document.getElementById("bookform").hidden=true;
  document.getElementById("bookext").classList.add("show");
}
/* deposits: the salon's Venmo username (no @) and deposit amount. Set VENMO="" to hide the Venmo button. */
var VENMO="Badkey127",DEPOSIT=25;
var form=document.getElementById("bookform");
function flag(el,errEl,bad){errEl.hidden=!bad;if(bad)el.setAttribute("aria-invalid","true");else el.removeAttribute("aria-invalid");return bad;}
form.addEventListener("submit",function(e){
  e.preventDefault();
  var name=document.getElementById("name"),tel=document.getElementById("tel");
  var b1=flag(name,document.getElementById("nameErr"),!name.value.trim());
  var b2=flag(tel,document.getElementById("telErr"),tel.value.replace(/\D/g,"").length<7);
  if(b1||b2){(b1?name:tel).focus();return;}
  var d=document.getElementById("date").value,em=document.getElementById("email").value.trim();
  var svc=document.getElementById("svc").value,sty=document.getElementById("msg").value.trim();
  var txt="Hi Beauty Is Key! I'd like to book an appointment.\nName: "+name.value.trim()+
    "\nPhone: "+tel.value.trim()+(em?"\nEmail: "+em:"")+
    "\nService: "+svc+
    (d?"\nPreferred date: "+new Date(d+"T12:00").toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"}):"")+
    (sty?"\nStyle: "+sty:"");
  var note="Deposit - "+name.value.trim()+" - "+(sty||svc)+(d?" - "+new Date(d+"T12:00").toLocaleDateString(undefined,{month:"short",day:"numeric"}):"");
  document.getElementById("depNote").value=VENMO?note:"";
  var v=document.getElementById("venmo");
  if(VENMO){
    v.href="https://venmo.com/"+encodeURIComponent(VENMO)+"?txn=pay&amount="+DEPOSIT+"&note="+encodeURIComponent(note.slice(0,250));
    txt+="\nDeposit: $"+DEPOSIT+" sent on Venmo to @"+VENMO;
  }
  [v,document.getElementById("venmoNote"),document.getElementById("stepPay")].forEach(function(x){x.hidden=!VENMO;});
  document.getElementById("ticketText").textContent=txt;
  var btn=document.getElementById("sendBtn");btn.disabled=true;btn.firstChild.textContent="Sending… ";
  function show(sent){
    btn.disabled=false;btn.firstChild.textContent="Request appointment ";
    document.getElementById("tkHead").textContent=sent?"Request sent":"Your request is ready";
    document.getElementById("tkSent").hidden=!sent;
    document.getElementById("ticketText").hidden=sent;
    document.getElementById("tkCopy").hidden=sent;
    document.getElementById("stepPay").textContent=sent?"Last step: pay the $"+DEPOSIT+" deposit":"First, pay the $"+DEPOSIT+" deposit";
    var t=document.getElementById("ticket");t.classList.add("show");t.focus({preventScroll:true});
    if(t.scrollIntoView)t.scrollIntoView({behavior:"smooth",block:"nearest"});
  }
  /* Netlify Forms emails each request to the salon. Anywhere else (preview, GitHub Pages) it falls back to copy-and-text. */
  var noEmail=location.protocol==="file:"||/github\.io$/.test(location.hostname);
  try{if(window.top!==window.self)noEmail=true;}catch(x){noEmail=true;}
  if(noEmail){show(false);return;}
  fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(new FormData(form)).toString()})
    .then(function(r){show(r.ok);}).catch(function(){show(false);});
});
document.getElementById("copyBtn").addEventListener("click",function(){
  var t=document.getElementById("ticketText").textContent,n=document.getElementById("copyNote");
  try{navigator.clipboard.writeText(t).then(function(){n.textContent="Copied. Text or call (703) 331-3092 to send it.";},function(){n.textContent="Couldn't copy automatically. Select the text above to copy it.";});}
  catch(err){n.textContent="Couldn't copy automatically. Select the text above to copy it.";}
});

/* header, mobile menu, mobile book bar */
var hdr=document.getElementById("hdr"),mbar=document.getElementById("mbar"),bookSec=document.getElementById("book");
function onScroll(){
  var y=window.scrollY;
  hdr.classList.toggle("solid",y>40||nav.classList.contains("open"));
  var b=bookSec.getBoundingClientRect();
  mbar.classList.toggle("show",y>window.innerHeight*.7&&!(b.top<window.innerHeight&&b.bottom>0));
}
var nav=document.getElementById("nav"),mb=document.getElementById("menuBtn");
mb.addEventListener("click",function(){var o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o);onScroll();});
nav.addEventListener("click",function(e){if(e.target.closest("a")){nav.classList.remove("open");mb.setAttribute("aria-expanded","false");onScroll();}});
window.addEventListener("scroll",onScroll,{passive:true});onScroll();

/* rotating words */
(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  var s=document.querySelectorAll(".rotator span"),i=0;
  setInterval(function(){
    var cur=s[i];cur.classList.remove("on");cur.classList.add("off");
    i=(i+1)%s.length;var nx=s[i];nx.classList.remove("off");void nx.offsetWidth;nx.classList.add("on");
    setTimeout(function(){cur.classList.remove("off");},500);
  },2400);
})();

/* scroll reveal */
(function(){
  var els=document.querySelectorAll(".rv");
  if(!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("in");});return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target);}});},{threshold:.12,rootMargin:"0px 0px -40px 0px"});
  els.forEach(function(e){io.observe(e);});
})();

showMenu("braids");
