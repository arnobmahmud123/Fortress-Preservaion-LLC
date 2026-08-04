export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors, status: 204 });
    if (url.pathname.startsWith('/api/')) {
      if (url.pathname === '/api/health') return new Response(JSON.stringify({status:'ok',service:'fortresspreservationllc'}), {headers:{'Content-Type':'application/json',...cors}});
      if (request.method === 'POST') { try { const d = await request.json(); console.log(url.pathname, d); return new Response(JSON.stringify({success:true,message:'Received.'}),{headers:{'Content-Type':'application/json',...cors}}); } catch(e) { return new Response(JSON.stringify({error:'bad request'}),{status:400,headers:{'Content-Type':'application/json',...cors}}); } }
      return new Response(JSON.stringify({error:'not found'}),{status:404,headers:{'Content-Type':'application/json',...cors}});
    }
    return env.ASSETS.fetch(request);
  }
};
