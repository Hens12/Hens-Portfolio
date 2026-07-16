import { useState, useEffect } from 'react';

export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0: none, 1: low, 2: medium, 3: high, 4: max
}

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  contributions: ContributionDay[][];
  totalContributions: number;
  loading: boolean;
  error: string | null;
}

export function useGitHubStats(username: string): GitHubStats {
  const [stats, setStats] = useState<GitHubStats>({
    publicRepos: 0,
    followers: 0,
    following: 0,
    totalStars: 0,
    topLanguages: [],
    contributions: [],
    totalContributions: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!username) {
      setStats((prev) => ({ ...prev, loading: false }));
      return;
    }

    const fetchStats = async () => {
      try {
        // Fetch GitHub user data, repos, and live contribution graph concurrently
        const [userRes, reposRes, contribRes] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
          fetch(`https://github-contributions-api.deno.dev/${username}.json`),
        ]);

        let publicRepos = 0;
        let followers = 0;
        let following = 0;
        let totalStars = 0;
        let topLanguages: { name: string; count: number }[] = [];
        let contributions: ContributionDay[][] = [];
        let totalContributions = 0;

        // 1. Process User Info
        if (userRes.status === 'fulfilled' && userRes.value.ok) {
          const user = await userRes.value.json();
          publicRepos = user.public_repos || 0;
          followers = user.followers || 0;
          following = user.following || 0;
        }

        // 2. Process Repos Info
        if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
          const repos = await reposRes.value.json();
          totalStars = repos.reduce(
            (acc: number, repo: { stargazers_count: number }) => acc + (repo.stargazers_count || 0),
            0
          );

          const langMap: Record<string, number> = {};
          repos.forEach((repo: { language: string | null }) => {
            if (repo.language) {
              langMap[repo.language] = (langMap[repo.language] || 0) + 1;
            }
          });
          topLanguages = Object.entries(langMap)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
        }

        // 3. Process Live Contributions Graph
        if (contribRes.status === 'fulfilled' && contribRes.value.ok) {
          const contribData = await contribRes.value.json();
          if (Array.isArray(contribData.contributions)) {
            contributions = contribData.contributions.map((week: any[]) =>
              week.map((day: any) => {
                const count = day.contributionCount || day.count || 0;
                let level = 0;
                const lvlStr = String(day.contributionLevel || '').toUpperCase();
                if (lvlStr === 'FIRST_QUARTILE' || lvlStr === 'LOW' || count === 1) level = 1;
                else if (lvlStr === 'SECOND_QUARTILE' || lvlStr === 'MEDIUM' || count === 2) level = 2;
                else if (lvlStr === 'THIRD_QUARTILE' || lvlStr === 'HIGH' || count >= 3) level = 3;
                else if (lvlStr === 'FOURTH_QUARTILE' || lvlStr === 'MAX' || count >= 5) level = 4;
                totalContributions += count;
                return {
                  date: day.date || '',
                  count,
                  level,
                };
              })
            );
          }
        }

        setStats({
          publicRepos,
          followers,
          following,
          totalStars,
          topLanguages,
          contributions,
          totalContributions,
          loading: false,
          error: null,
        });
      } catch (err) {
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to fetch GitHub stats',
        }));
      }
    };

    fetchStats();
  }, [username]);

  return stats;
}
