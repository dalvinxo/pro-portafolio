type TypeHeadSection = {
  title: string
}

const HeadSection = ({ title }: TypeHeadSection) => {
  return (
    <div>
      <h2 className="block text-3xl font-bold first-letter:uppercase py-4 px-2">
        {title}
      </h2>
      <hr />
    </div>
  )
}

export default HeadSection
