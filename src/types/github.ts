export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    open_issues_count: number;
    topics: string[];
    created_at: string;
    updated_at: string;
    pushed_at: string;
    fork: boolean;
    archived: boolean;
    disabled: boolean;
    visibility: string;
    license: {
        key: string;
        name: string;
        spdx_id: string;
    } | null;
    default_branch: string;
    size: number;
}

export interface GitHubRepoStats {
    totalStars: number;
    totalForks: number;
    totalRepos: number;
    languages: { name: string; count: number }[];
}
