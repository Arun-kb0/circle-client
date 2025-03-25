
type Props = {
  firstWord: string
  secondWord: string
}

const PageTitle = ({ firstWord, secondWord }: Props) => {
  return (
    <h1 className="text-2xl font-bold tracking-tight text-gray-300 sm:text-3xl md:text-4xl p-6 text-center">
      <span className="block">
        {firstWord}
        <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-tr to-cyan-500 from-blue-600">
          {secondWord}
        </span>
      </span>
    </h1>
  )
}

export default PageTitle