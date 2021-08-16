type Props = {
  value: number | string
}

const IndicatesField = ({ value }: Props) => {
  return <div className="w-full pt-6 px-2 text-5xl text-right text-white bg-transparent">{value}</div>
}

export default IndicatesField
