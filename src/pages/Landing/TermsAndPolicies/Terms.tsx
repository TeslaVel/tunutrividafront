import { useEffect } from "react";
import HText from "@/components/Compound/Title/HText"

// types
import { SelectedPage } from "@/types";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const terminos = [
  {
    title: 'Propósito y Uso',
    description: 'Nuestro sitio web tiene como objetivo proporcionar información sobre nuestros servicios de nutrición, dietética y masajes terapéuticos con tecnología avanzada.'
  },
  {
    title: 'Propiedad Intelectual',
    description: <>
      El contenido y los materiales presentes en nuestro sitio web, incluyendo, pero no limitándose a, textos, imágenes, logotipos, gráficos y videos, están protegidos por derechos de autor y otras leyes de propiedad intelectual. Sin embargo, todas las imágenes y videos utilizados en este sitio web son de uso gratuito y están disponibles en dominio público o con licencias de uso permitido.
      <br />
      Queda estrictamente prohibida la reproducción, distribución o uso no autorizado de cualquier contenido que no esté marcado como de uso gratuito. Para aquellos elementos que tengan restricciones de uso, se debe obtener nuestro consentimiento expreso por escrito antes de utilizarlos en cualquier forma.
    </>
  },
  {
    title: 'Privacidad',
    description: 'Respetamos tu privacidad y nos comprometemos a proteger tus datos personales de acuerdo con nuestra política de privacidad. Te recomendamos revisar nuestra política de privacidad para comprender cómo recopilamos, utilizamos y protegemos tu información.'
  },
  {
    title: 'Enlaces Externos',
    description: 'Nuestro sitio web puede contener enlaces a sitios web de terceros. Estos enlaces se proporcionan únicamente como una conveniencia para ti y no implican respaldo, aprobación o control de dichos sitios web externos. No nos hacemos responsables del contenido, las políticas o las prácticas de privacidad de los sitios web de terceros.'
  },
  {
    title: 'Limitación de Responsabilidad',
    description: 'El uso de nuestro sitio web es bajo tu propio riesgo. No garantizamos la disponibilidad ininterrumpida o libre de errores de nuestro sitio web, ni la precisión, actualidad o integridad de la información proporcionada. No seremos responsables de ningún daño directo, indirecto, incidental, especial o consecuente que pueda surgir del uso o la incapacidad de uso de nuestro sitio web.'
  },
  {
    title: 'Modificaciones',
    description: 'Nos reservamos el derecho de modificar o actualizar estos términos y condiciones en cualquier momento sin previo aviso. Te recomendamos revisar periódicamente esta sección para estar al tanto de los cambios. El uso continuado de nuestro sitio web después de cualquier modificación constituirá tu aceptación de los términos modificados.'
  },
  {
    title: 'Ley Aplicable y Jurisdicción',
    description: 'Estos términos y condiciones se rigen por las leyes de Venezuela. Cualquier disputa que surja en relación con nuestro sitio web estará sujeta a la jurisdicción exclusiva de los tribunales de Venezuela.'
  }
];

export const Terms: React.FC<Props> = ({ setSelectedPage }: Props) => {
  useEffect(() => {
    setSelectedPage(SelectedPage.Terms)
  }, []);

  return (
    <section id="terms" className="h-full pb-10 pt-[125px] flex flex-col justify-center bg-secondly-female-05" >
      <div className="flex flex-col justify-between mx-auto xxxs:px-3 xxs:px-3 xxs:w-full sm:w-full md:w-4/6 lg:w-3/6">
        <HText size={1} classes="text-center">Términos y Condiciones</HText>
        <div className="mx-auto mt-5">
          { terminos?.map((term: any, index: number) => (
            <div className="py-5" key={`term-${index}`}>
              <header>
                <strong>{term.title}</strong>
              </header>
              <p className="mt-1 text-justify"> {term.description} </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Terms;
