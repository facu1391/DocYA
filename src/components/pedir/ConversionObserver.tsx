'use client';
import {useEffect} from 'react';
import {usePathname,useSearchParams} from 'next/navigation';
import {startFlow,requestCreated,checkoutStarted,retryWithdrawal} from '@/lib/pedir/conversion';

export default function ConversionObserver(){
  const path=usePathname(),params=useSearchParams();
  const kind=params.get('tipo'),id=params.get('consulta_id');
  useEffect(()=>{
    void retryWithdrawal().catch(()=>undefined);
    try{
      if(['/pedir/filtro','/pedir/solicitar'].includes(path)){
        if(kind==='enfermero')return;
        startFlow(kind==='teleconsulta'?'teleconsulta':'domicilio');
      }
      if(['/pedir/pago','/pedir/qr','/pedir/transferencia'].includes(path) && id){requestCreated(id);checkoutStarted(id);}
    }catch{/* Measurement never blocks care. */}
  },[path,kind,id]);
  return null;
}
