export interface TGithubContributionChartProps {
  username: string;
}

export default async function GithubContributionChart({
  username,
}: TGithubContributionChartProps) {
  return (
    <>
      <h1>{username}</h1>
    </>
  );
}
