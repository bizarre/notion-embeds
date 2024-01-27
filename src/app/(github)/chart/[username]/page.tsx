import GithubContributionChart from '@/components/github-contribution-chart'

export default async function ChartEmbed({
  params: { username },
}: {
  params: { username: string }
}) {
  return <GithubContributionChart username={username} />
}
