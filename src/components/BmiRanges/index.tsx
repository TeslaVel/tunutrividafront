import { useState, useEffect } from 'react'
import BmFemaleRange0 from "@/assets/ntv/bmi/bm_female_range_0.png"
import BmFemaleRange1 from "@/assets/ntv/bmi/bm_female_range_1.png"
import BmFemaleRange2 from "@/assets/ntv/bmi/bm_female_range_2.png"
import BmFemaleRange3 from "@/assets/ntv/bmi/bm_female_range_3.png"
import BmFemaleRange4 from "@/assets/ntv/bmi/bm_female_range_4.png"
import BmFemaleRange5 from "@/assets/ntv/bmi/bm_female_range_5.png"

import BmMaleRange0 from "@/assets/ntv/bmi/bm_male_range_0.png"
import BmMaleRange1 from "@/assets/ntv/bmi/bm_male_range_1.png"
import BmMaleRange2 from "@/assets/ntv/bmi/bm_male_range_2.png"
import BmMaleRange3 from "@/assets/ntv/bmi/bm_male_range_3.png"
import BmMaleRange4 from "@/assets/ntv/bmi/bm_male_range_4.png"
import BmMaleRange5 from "@/assets/ntv/bmi/bm_male_range_5.png"

import { ThemeType } from "@/types";

type Props = {
  gender: 'female' | 'male' | null
  bmi?: string
  theme: ThemeType
}

const BmiRanges: React.FC<Props> = ({ bmi, gender = 'female', theme}: Props) => {
  if (!bmi) return null
  if (!gender) return null

  const ranges = {
    'female': [
      {min: 0, max: 18.4, image: BmFemaleRange0, title: 'Bajo peso'},
      {min: 18.41, max: 24.9, image: BmFemaleRange1, title: 'Normo peso'},
      {min: 25.0, max: 29.9, image: BmFemaleRange2, title: 'Sobre Peso'},
      {min: 30.0, max: 34.9, image: BmFemaleRange3, title: 'Obesidad I'},
      {min: 35.0, max: 39.9, image: BmFemaleRange4, title: 'Obesidad II'},
      {min: 40.0, max: 999, image: BmFemaleRange5, title: 'Obesidad morbida'},
    ],
    'male': [
      {min: 0, max: 18.4, image: BmMaleRange0, title: 'Bajo peso'},
      {min: 18.41, max: 24.9, image: BmMaleRange1, title: 'Normo peso'},
      {min: 25.0, max: 29.9, image: BmMaleRange2, title: 'Sobre Peso'},
      {min: 30.0, max: 34.9, image: BmMaleRange3, title: 'Obesidad I'},
      {min: 35.0, max: 39.9, image: BmMaleRange4, title: 'Obesidad II'},
      {min: 40.0, max: 999, image: BmMaleRange5, title: 'Obesidad morbida'},
    ]
  };

  const bmiFloat = parseFloat(bmi)
  const resKlas = `` // lg:text-[14px] md:text-[12px] xs:text-[11px] xxs:text-[10px] xxxs:text-[9px]
  const imgStyle = {
    width: '200px',
    height: '100%'

  }
  return (
    <div className="flex flex-row overflow-scroll">
      {ranges[gender].map((range, index) => (
        <div key={index}
          className={` flex flex-col items-center justify-between px-3 py-3 h-auto
          ${ (bmiFloat > range.min && bmiFloat <= range.max) ? `${theme?.bmi.itemSelected} rounded-lg` : ''}
          `}
        >
          <img src={range.image} alt={`Imagen ${index}`} style={imgStyle} className=" flex-1"/>
          <div className="flex flex-col gap-3 ">
            <span className={`text-center ${theme?.general.baseTextColor}`}> {`<= ${range.max}`}</span>
            <span className={`text-center ${theme?.general.baseTextColor}`}>{range.title}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BmiRanges;