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

function processFlatDaysToWeeks(days: { date: string; count: number; level?: number }[]): {
  weeks: ContributionDay[][];
  total: number;
} {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  let total = 0;

  days.forEach((day) => {
    const count = day.count || 0;
    total += count;

    let level = day.level ?? 0;
    if (level === 0 && count > 0) {
      if (count === 1) level = 1;
      else if (count <= 3) level = 2;
      else if (count <= 5) level = 3;
      else level = 4;
    }

    currentWeek.push({
      date: day.date || '',
      count,
      level,
    });

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return { weeks, total };
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
        const timestamp = Date.now();
        // Fetch GitHub user data, repos, and live contribution graph concurrently
        const [userRes, reposRes, contribRes] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${username}?_t=${timestamp}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&_t=${timestamp}`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last&_t=${timestamp}`).then(async (r) => {
            if (r.ok) return r.json();
            // Fallback to vercel api if jogruber fails
            const fallback = await fetch(`https://github-contributions.vercel.app/api/v1/${username}?_t=${timestamp}`);
            if (fallback.ok) return fallback.json();
            throw new Error('Contribution API failed');
          }),
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
        if (contribRes.status === 'fulfilled' && contribRes.value) {
          const contribData = contribRes.value;

          if (Array.isArray(contribData.contributions)) {
            const firstItem = contribData.contributions[0];

            if (Array.isArray(firstItem)) {
              // Array of weeks
              contributions = contribData.contributions.map((week: any[]) =>
                week.map((day: any) => {
                  const count = day.contributionCount || day.count || 0;
                  let level = day.level ?? 0;
                  if (level === 0 && count > 0) {
                    const lvlStr = String(day.contributionLevel || '').toUpperCase();
                    if (lvlStr === 'FIRST_QUARTILE' || lvlStr === 'LOW' || count === 1) level = 1;
                    else if (lvlStr === 'SECOND_QUARTILE' || lvlStr === 'MEDIUM' || count <= 3) level = 2;
                    else if (lvlStr === 'THIRD_QUARTILE' || lvlStr === 'HIGH' || count <= 5) level = 3;
                    else if (lvlStr === 'FOURTH_QUARTILE' || lvlStr === 'MAX' || count > 5) level = 4;
                  }
                  totalContributions += count;
                  return {
                    date: day.date || '',
                    count,
                    level,
                  };
                })
              );
            } else {
              // Flat array of days
              const { weeks, total } = processFlatDaysToWeeks(contribData.contributions);
              contributions = weeks;
              totalContributions = contribData.total?.lastYear ?? total;
            }
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

    // Auto-poll every 30 seconds for real-time live sync
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [username]);

  return stats;
}
