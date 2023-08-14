import { useEffect } from "react";
import ScrollerLanding from '@/components/Scroller/ScrollerLanding'
import HText from "@/components/Compound/Title/HText"

// types
import { SelectedPage } from "@/types";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const policies = [
  {
    title: <span>Fecha de última actualización: <time>15/01/2023</time></span>,
    description: 'En Tunutrivida, valoramos y respetamos tu privacidad. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información personal que nos proporcionas a través de nuestro sitio web.',
    list: []
  },
  {
    title: 'Recopilación de Información',
    description: 'Podemos recopilar información personal que tú decidas proporcionarnos cuando te comunicas con nosotros a través de formularios de contacto, correos electrónicos u otras interacciones en nuestro sitio web. Esta información puede incluir, entre otros datos, tu nombre, dirección de correo electrónico, número de teléfono y cualquier otra información que elijas proporcionarnos.',
    list: [
    ]
  },
  {
    title: 'Uso de la Información',
    description: 'Utilizamos la información personal que recopilamos para los siguientes propósitos:',
    list: [
      'Proveer y mejorar nuestros servicios de nutrición, dietética y masajes terapéuticos.',
      'Responder a tus consultas, preguntas o solicitudes.',
      'Enviar información relevante sobre nuestros servicios y promociones.',
      'Mejorar y personalizar tu experiencia en nuestro sitio web.',
      'Cumplir con nuestras obligaciones legales y regulatorias.'
    ]
  },
  {
    title: 'Protección de la Información',
    description: 'En Tunutrivida, tomamos medidas razonables para proteger la información personal que recopilamos. Utilizamos medidas de seguridad técnicas y organizativas para proteger contra el acceso no autorizado, la divulgación o la destrucción de tu información personal:',
    list: []
  },
  {
    title: 'Divulgación a Terceros',
    description: 'No compartiremos tu información personal con terceros sin tu consentimiento, excepto en los siguientes casos:',
    list: [
      'Cuando sea necesario para proporcionar nuestros servicios y cumplir con nuestras obligaciones contractuales contigo.',
      'Cuando estemos legalmente obligados a divulgar tu información en respuesta a una orden judicial, solicitud de autoridades gubernamentales o para cumplir con la ley aplicable.',
      'Cuando creamos de buena fe que la divulgación es necesaria para proteger nuestros derechos, tu seguridad o la seguridad de otros, investigar fraudes o responder a una situación de emergencia.'
    ]
  },
  {
    title: 'Enlaces a Sitios de Terceros',
    description: 'Nuestro sitio web puede contener enlaces a sitios web de terceros. Ten en cuenta que no somos responsables de las prácticas de privacidad o el contenido de dichos sitios. Te recomendamos revisar las políticas de privacidad de los sitios web de terceros antes de proporcionarles cualquier información personal.',
    list: []
  },
  {
    title: 'Cambios en la Política de Privacidad',
    description: 'Nos reservamos el derecho de actualizar o modificar esta Política de Privacidad en cualquier momento y sin previo aviso. Te recomendamos revisar esta página periódicamente para estar informado sobre cualquier cambio. El uso continuado de nuestro sitio web después de los cambios en la Política de Privacidad constituirá tu aceptación de dichos cambios.',
    list: []
  },
  {
    title: 'Contacto',
    description: 'Si tienes alguna pregunta o inquietud sobre nuestra Política de Privacidad, no dudes en contactarnos a través de los canales proporcionados en nuestro sitio web.',
    list: []
  }
]

export const Policies: React.FC<Props> = ({ setSelectedPage }: Props) => {
  useEffect(() => {
    setSelectedPage(SelectedPage.Policies)
  }, []);

  return (
    <section id="policies" className="h-full pb-10 pt-[125px] flex flex-col justify-center bg-secondly-female-05" >
      <div className="flex flex-col justify-between mx-auto xxxs:px-3 xxs:px-3 xxs:w-full sm:w-full md:w-4/6 lg:w-3/6">
        <HText size={1} classes="text-center">Política de Privacidad</HText>
        <div className="mx-auto mt-5">
          { policies?.map((policy: any, index: number) => (
            <section className="py-5" key={`policy-${index}`}>
              <header>
                <strong>{policy.title}</strong>
              </header>
              <p className="mt-1 text-justify">{policy.description}</p>

              { policy.list &&
                <ul className="px-5">
                  { policy.list.map((text: any, index: number) => (
                    <li className="ml-5 list-disc" key={`policy-list-${index}`}>
                       {text}
                    </li>
                  ))}
                </ul>
              }
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Policies;
