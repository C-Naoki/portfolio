const HorizontalLine = ({ main = true }: { main?: boolean }): JSX.Element => {
  return <div className={main ? 'horizontal-line' : 'horizontal-subline'} />
}

export default HorizontalLine
