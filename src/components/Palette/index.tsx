import { useState } from 'react'
// types

type colorArray = {
  [key: string]: string
}
const Palette = () => {
  const ranges = [
    '700',
    '600',
    '500',
    '400',
    '300',
    '200',
    '100',
    '50',
    '40',
    '30',
    '20',
    '10',
    '05',
    '01',
  ]
  const [colors, setColors] = useState<colorArray[]>([])
  const [colorName, setColorName] = useState<string>('color')
  const [value1, setValue1] = useState<number>(0)
  const [value2, setValue2] = useState<number>(0)
  const [value3, setValue3] = useState<number>(0)
  const [inc1, setInc1] = useState<number>(0)
  const [inc2, setInc2] = useState<number>(0)
  const [inc3, setInc3] = useState<number>(0)

  const generateColors = () => {
    let v1 = value1;
    let v2 = value2;
    let v3 = value3;
    const result = ranges.map((ra, index) => {
      if (index == 0 ) {
        v1 = value1;
        v2 = value2;
        v3 = value3;
      } else {
        v1 += inc1;
        v2 += inc2;
        v3 += inc3;
      }
      return { name: `${colorName}${ra}`, value: `rgb(${v1}, ${v2}, ${v3})`}
    })
    setColors(result)
  }

  return (
    <div className='w-5/6 mx-auto p-5'>
      <div className='flex gap-2 justify-center'>
        <div className='flex flex-col gap-2'>
          <div className=''>
            <input type="text" placeholder='name' className='px-2 text-black'
              onChange={ (e) => setColorName(e.target.value)}
            />
          </div>
          <div className='flex gap-2'>
            <input type="number" placeholder='value 1' className='w-[100px] px-2 text-black'
              onChange={ (e) => setValue1(parseInt(e.target.value))}
            />
            <input type="number" placeholder='value 2' className='w-[100px] px-2 text-black'
              onChange={ (e) => setValue2(parseInt(e.target.value))}
            />

            <input type="number" placeholder='value 3' className='w-[100px] px-2 text-black'
              onChange={ (e) => setValue3(parseInt(e.target.value))}
            />
          </div>
          <div className='flex gap-2'>
            <input type="number" placeholder='incrementador 1' className='w-[100px] px-2 text-black'
              onChange={ (e) => setInc1(parseInt(e.target.value))}
            />
            <input type="number" placeholder='incrementador 1' className='w-[100px] px-2 text-black'
              onChange={ (e) => setInc2(parseInt(e.target.value))}
            />

            <input type="number" placeholder='incrementador 3' className='w-[100px] px-2 text-black'
              onChange={ (e) => setInc3(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className='pt-3'>
          <button className='bg-primary-female-500 text-white-01 p-2 rounded-lg' onClick={generateColors}>
            Generate Colors
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-2 mt-5'>
        {colors.map((color, index) => (
          <div className='flex gap-4 justify-evenly'>
            <div>
              "{color.name}": "{color.value}"
            </div>
            <div key={`color-${index}`}
              className='w-[70%] h-[40px] text-white-01 px-2 rounded-md'
              style={{backgroundColor: color.value}}
            >
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Palette;