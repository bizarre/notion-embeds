export interface TGithubContributionChartProps {
  username: string
}

const WEEKS = 53
const DAYS_IN_WEEK = 7
const MONTHS_IN_YEAR = 12
const DAY_COL_SPAN = 3

// TODO: @bizarre, make these colors configurable via props + api
const COLOR_REPLACEMENT_MAP_DARK = {
  '#ebedf0': 'dark:bg-[rgba(255,255,255,0.01)]', // intensity 0 bg-[#ebedf0] -> dark:bg-[rgba(255,255,255,0.01)]
  '#9be9a8': 'dark:bg-[#0e4429]', // intensity 1 bg-[#9be9a8] -> dark:bg-[#0e4429]
  '#40c463': 'dark:bg-[#006d32]', // intensity 2 bg-[#40c463] -> dark:bg-[#006d32]
  '#30a14e': 'dark:bg-[#26a641]', // intensity 3 bg-[#30a14e] -> dark:bg-[#26a641]
  '#216e39': 'dark:bg-[#39d353]', // intensity 4 bg-[#216e39] -> dark:bg-[#39d353]
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default async function GithubContributionChart({
  username,
}: TGithubContributionChartProps) {
  // get current date
  const date = new Date()
  // remove time
  date.setHours(0, 0, 0, 0)

  const contributions_raw = await fetch(
    `https://github-contributions.now.sh/api/v1/${username}`,
  )

  const { contributions } = (await contributions_raw.json()) as {
    contributions: {
      date: string
      count: number
      intensity: number
      color: keyof typeof COLOR_REPLACEMENT_MAP_DARK
    }[]
  }

  // contributions array is sorted by date, with last date of current calendar year being the first element
  // we can use this knowledge to calculate the index of the current date without having to iterate over the array
  const currentDateIndex = Math.floor(
    (new Date(date.getFullYear(), 11, 31).getTime() - date.getTime()) /
      (1000 * 60 * 60 * 24),
  )

  // we want to render the table where every row represents a specific day of the week
  // i.e: the first row represents all the sundays of the year, the second row represents all the mondays of the year, etc.
  // this means that we have to offset the index by the remaining days of the current week
  const offset = (date.getDay() + DAYS_IN_WEEK) % DAYS_IN_WEEK
  const index = currentDateIndex + offset - DAYS_IN_WEEK

  return (
    <>
      <h1></h1>
      <table
        style={{
          width: '100%',
          tableLayout: 'fixed',
        }}
      >
        <thead>
          <tr className='relative h-2'>
            <th colSpan={DAY_COL_SPAN} id='days'></th>
            {Array.from({ length: MONTHS_IN_YEAR + 1 }, (_, i) => {
              // we want to walk backwards 13 months, starting at the current month (i.e: Jan 2024, Dec 2023, Nov 2023, etc.)
              const relativeDate = new Date(
                date.getFullYear(),
                date.getMonth() - i,
                1,
              )

              const relativeDiff =
                new Date(
                  relativeDate.getFullYear(),
                  relativeDate.getMonth() + 1,
                  0,
                ).getDate() + relativeDate.getDay()

              // colspan by default is the number of weeks in the month of the relative date
              let colspan = Math.floor(relativeDiff / DAYS_IN_WEEK)

              if (i === 0) {
                // if we're at the current month, we need to offset the colspan by the number of days in the current week
                colspan = Math.floor(date.getDate() / DAYS_IN_WEEK)
              }

              if (i === MONTHS_IN_YEAR) {
                // if we're at the last month, the colspan should be whatever is left remaining after
                // the cols taken by the first month + one extra col
                colspan =
                  colspan - Math.floor(date.getDate() / DAYS_IN_WEEK) + 1
              }

              return (
                <th
                  className='text-left text-xs font-medium opacity-50'
                  key={i}
                  colSpan={colspan}
                >
                  {!!colspan &&
                    new Date(
                      date.getFullYear(),
                      date.getMonth() - i,
                    ).toLocaleString('default', {
                      month: 'short',
                    })}
                </th>
              )
            }).reverse()}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: DAYS_IN_WEEK }, (_, row) => (
            <tr key={row} className='overflow-hidden'>
              <td colSpan={DAY_COL_SPAN}>
                <div className='text-xs font-medium opacity-50 text-right pr-1'>
                  {row % 2 === 1 && DAYS[row]}
                </div>
              </td>

              {Array.from({ length: WEEKS }, (_, column) => {
                const contributionIndex =
                  index + (DAYS_IN_WEEK - row + column * DAYS_IN_WEEK)
                const contribution = contributions[contributionIndex]

                return (
                  <td
                    colSpan={1}
                    key={column}
                    className='max-h-[1px] embed-xl:p-[1.5px] embed-lg:p-[1.5px] embed-md:p-[1px] embed-sm:p-[0.25px]'
                  >
                    {contributionIndex >= currentDateIndex && (
                      <div
                        data-date={contribution?.date}
                        className={`border border-gray-500/20 dark:border-gray-300/10 box-border aspect-square embed-md:rounded-[1.5px] embed-xl:rounded-sm min-h-[2px] min-w[2px] bg-[${contribution.color}] ${COLOR_REPLACEMENT_MAP_DARK[contribution.color]}`}
                      ></div>
                    )}
                  </td>
                )
              }).reverse()}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
