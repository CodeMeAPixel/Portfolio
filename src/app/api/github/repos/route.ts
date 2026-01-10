import { NextResponse } from 'next/server';
import type { GitHubRepo } from '@/types/github';

const GITHUB_USERNAME = 'CodeMeAPixel';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

export async function GET() {
    try {
        const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'CodeMeAPixel-Portfolio',
        };

        // Add GitHub token if available for higher rate limits
        if (process.env.GITHUB_TOKEN) {
            headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
        }

        const response = await fetch(`${GITHUB_API_URL}?per_page=100&sort=updated&direction=desc`, {
            headers,
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos: GitHubRepo[] = await response.json();

        // Filter out forks and only include owned repositories
        const ownedRepos = repos.filter((repo: GitHubRepo) => !repo.fork && !repo.archived && !repo.disabled);

        // Calculate stats
        const totalStars = ownedRepos.reduce((sum: number, repo: GitHubRepo) => sum + repo.stargazers_count, 0);
        const totalForks = ownedRepos.reduce((sum: number, repo: GitHubRepo) => sum + repo.forks_count, 0);

        // Get language distribution
        const languageCounts: Record<string, number> = {};
        ownedRepos.forEach((repo: GitHubRepo) => {
            if (repo.language) {
                languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
            }
        });

        const languages = Object.entries(languageCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);

        return NextResponse.json({
            repos: ownedRepos,
            stats: {
                totalStars,
                totalForks,
                totalRepos: ownedRepos.length,
                languages,
            }
        });
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return NextResponse.json(
            { error: 'Failed to fetch repositories' },
            { status: 500 }
        );
    }
}
