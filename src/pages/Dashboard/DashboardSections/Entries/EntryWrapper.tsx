type Props = {
  children: JSX.Element
  setAction?: () => void
}

const EntryWrapper: React.FC<Props> = ({children, setAction}: Props) => {
  const KlassEntriesScroller = `entry-wrapper-section mt-10 w-full flex flex-col items-center gap-5`

  return (
    <div className={KlassEntriesScroller} id="entry-wrapper-section">
      {children}
    </div>
  )
}

export default EntryWrapper;