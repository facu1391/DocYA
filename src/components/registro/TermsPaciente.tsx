export default function TermsPaciente() {
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      <p><strong>Consentimiento informado y Términos de uso</strong></p>
      <p><strong>Declaro bajo juramento que:</strong></p>
      <ol className="list-decimal pl-5 space-y-2">
        <li>He leído y acepto los Términos y Condiciones y la Política de Privacidad de DocYa.</li>
        <li>Entiendo que DocYa es una plataforma tecnológica que conecta pacientes con médicos y enfermeros, y que no se responsabiliza por los actos médicos que se realicen durante la atención.</li>
        <li>Comprendo que DocYa no brinda servicios de urgencias ni emergencias. Ante emergencias debo comunicarme al 911 o dirigirme al centro de salud más cercano.</li>
        <li>Autorizo a que mis datos personales y de salud sean tratados conforme a la Ley 25.326 de Protección de Datos Personales en Argentina.</li>
        <li>Manifiesto haber brindado información cierta y completa en el registro y en los formularios de triage previos a cada consulta.</li>
      </ol>
    </div>
  );
}
