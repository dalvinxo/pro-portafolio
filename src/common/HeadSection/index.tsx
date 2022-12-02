type TypeHeadSection = {
  title: string
}

const HeadSection = ({ title }: TypeHeadSection) => {
  return (
    <div>
      <h2 className="block text-3xl font-bold first-letter:uppercase py-4 px-2 watch:px-0 watch:text-center watch:text-xl">
        {title}
      </h2>
      <hr className="watch:hidden" />
    </div>
  )
}

export default HeadSection
