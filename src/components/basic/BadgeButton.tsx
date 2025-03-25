
type Props = {
  count: number
  icon: JSX.Element
}


const BadgeButton = ({ count, icon }: Props) => {
  return (
    <section className="flex items-center">
      <div className="flex-shrink-0">
        <button type="button" className="relative inline-flex items-center">
          <span className="sr-only">Notifications</span>
          {icon}
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{count}</div>
        </button>
      </div>
    </section>
  )
}

export default BadgeButton