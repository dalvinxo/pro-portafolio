export const FormatterDate = (date: string): string => {
  return date?.replace(/(\d+)-(\d+)-(\d+)T.+/, '$3/$2/$1')
}
