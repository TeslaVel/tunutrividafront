import { useState } from 'react'
import IconHandler from '@/components/icons/IconHandler'
import { Colors, ThemeType } from '@/types'

type Props = {
  headerName: JSX.Element | string
  theme: ThemeType
  label?: JSX.Element
  children: JSX.Element
  collapsedByDefault?: boolean
}

const labelStyle = {
  marginRight: 'auto'
}

const sectionBody = {
  padding: '14px 25px',
  borderTop: '1px solid gray',
  borderRadius: '0 0 15px 15px'
}

const CollapsibleSection: React.FC<Props> = ({
  collapsedByDefault = true,
  children,
  label,
  headerName,
  theme
}: Props ) => {
  const [collapsed, setCollapsed] = useState(collapsedByDefault)

  const toggleChildrenVisibility = (): void => setCollapsed(!collapsed)

  return (
    <div className="flex flex-col w-full  mb-2 cursor-pointer">
      <div
        className={`flex items-center justify-between h-[30px] px-3 text-white-01 ${theme.collapsible.primaryBgColor}`}
        onClick={() => toggleChildrenVisibility()}
        style={ collapsed ? {borderRadius: '20px'} : {borderRadius: '15px 15px 0 0'}}
      >
        <span className="flex">
          {headerName}
        </span>
        {label &&
          <div style={labelStyle}>
            {label}
          </div>
        }
        <div>
          {collapsed
            ? <IconHandler name='chevron_down' color={Colors.GRAY100} />
            : <IconHandler name='chevron_up' color={Colors.GRAY100} />}
        </div>
      </div>
      { !collapsed &&
        <div className={`${theme?.collapsible.secondaryBgColor}`} style={sectionBody}>
          {children}
        </div>
      }
    </div>
  )
}

export default CollapsibleSection
