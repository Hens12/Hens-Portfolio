import { useState, useEffect } from 'react';

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
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
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!username || username === 'hens') {
      // Use placeholder data if no real username is set
      setStats({
        publicRepos: 42,
        followers: 256,
        following: 18,
        totalStars: 890,
        topLanguages: [
          { name: 'TypeScript', count: 15 },
          { name: 'Python', count: 12 },
          { name: 'JavaScript', count: 8 },
          { name: 'Go', count: 4 },
          { name: 'Rust', count: 3 },
        ],
        loading: false,
        error: null,
      });
      return;
    }

    const fetchStats = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

        const user = await userRes.json();
        const repos = await reposRes.json();

        // Calculate total stars
        const totalStars = repos.reduce(
          (acc: number, repo: { stargazers_count: number }) => acc + repo.stargazers_count,
          0
        );

        // Calculate top languages
        const langMap: Record<string, number> = {};
        repos.forEach((repo: { language: string | null }) => {
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
          }
        });
        const topLanguages = Object.entries(langMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setStats({
          publicRepos: user.public_repos,
          followers: user.followers,
          following: user.following,
          totalStars,
          topLanguages,
          loading: false,
          error: null,
        });
      } catch (err) {
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to fetch',
        }));
      }
    };

    fetchStats();
  }, [username]);

  return stats;
}
