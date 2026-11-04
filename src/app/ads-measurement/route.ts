// Advertising measurement retired. No provider script is served.
export async function GET(){
  return new Response(null,{status:410,headers:{'Cache-Control':'no-store'}});
}
