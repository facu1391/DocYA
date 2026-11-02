/** Neutral, sandboxed document: no access to the patient's parent DOM/location. */
export async function GET(request:Request) {
  const url=new URL(request.url);
  const nonce=url.searchParams.get("nonce") || "";
  if (!/^[0-9a-f-]{36}$/i.test(nonce)) return new Response("Not found",{status:404});
  const origin=url.origin;
  const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="referrer" content="no-referrer"><title>DocYa</title></head><body><script>
  (()=>{
    const nonce=${JSON.stringify(nonce)}, origin=${JSON.stringify(origin)};
    if (parent===window) return;
    let loaded=false,initialized=false;
    const sent=new Set();
    const post=(type,extra={})=>parent.postMessage({type,nonce,...extra},origin);
    window.dataLayer=window.dataLayer||[];
    const gtag=function(){window.dataLayer.push(arguments);};
    window.gtag=gtag;
    gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    addEventListener('message',event=>{
      if(event.source!==parent || event.origin!==origin || event.data?.nonce!==nonce)return;
      const data=event.data;
      if(data.type==='consent'&&!initialized){
        initialized=true;
        gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'denied',analytics_storage:'denied'});
        gtag('set','allow_ad_personalization_signals',false);
        gtag('set','allow_google_signals',false);
        gtag('set','url_passthrough',false);
        gtag('js',new Date());
        gtag('config','AW-18548149251',{send_page_view:false,allow_enhanced_conversions:false,allow_ad_personalization_signals:false,page_title:'DocYa',page_referrer:''});
        const script=document.createElement('script');script.async=true;script.referrerPolicy='no-referrer';
        script.src='https://www.googletagmanager.com/gtag/js?id=AW-18548149251';
        script.onload=()=>{loaded=true;post('loaded');};document.head.appendChild(script);
      }
      if(data.type==='poll'&&loaded)post('loaded');
      if(data.type==='conversion'&&loaded&&/^AW-18548149251\\/[A-Za-z0-9_-]{5,100}$/.test(data.send_to)
        && /^[0-9a-f-]{36}$/i.test(data.transaction_id)&&data.currency==='ARS'&&Number.isFinite(data.value)&&data.value>0&&!sent.has(data.transaction_id)){
        sent.add(data.transaction_id);
        gtag('event','conversion',{send_to:data.send_to,value:data.value,currency:'ARS',transaction_id:data.transaction_id,
          page_title:'DocYa',page_referrer:'',event_callback:()=>post('dispatched',{transaction_id:data.transaction_id})});
      }
    });
    post('ready');
  })();</script></body></html>`;
  return new Response(html,{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store",
    "Referrer-Policy":"no-referrer","X-Robots-Tag":"noindex, noarchive",
    "Content-Security-Policy":"frame-ancestors 'self'; base-uri 'none'; form-action 'none'"}});
}
