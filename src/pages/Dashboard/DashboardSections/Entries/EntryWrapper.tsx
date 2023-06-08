type Props = {
  children: JSX.Element
  setAction?: () => void
}

const EntryWrapper = ({children, setAction}: Props) => {
  const KlassEntriesScroller = `entry-wrapper-section mt-10 w-full flex   justify-center flex-wrap gap-8`

  return (
    <div className={KlassEntriesScroller} id="entry-wrapper-section">
        {children}
    </div>
  )
}

export default EntryWrapper;