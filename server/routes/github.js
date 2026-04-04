const express = require("express");

const router = express.Router();

const CACHE_TTL_MS = 10 * 60 * 1000;
const responseCache = new Map();

const readCache = (key) => {
  const cached = responseCache.get(key);
  if (!cached) return null;

  const isExpired = Date.now() - cached.timestamp > CACHE_TTL_MS;
  if (isExpired) {
    responseCache.delete(key);
    return null;
  }

  return cached.payload;
};

const writeCache = (key, payload) => {
  responseCache.set(key, {
    timestamp: Date.now(),
    payload,
  });
};

const githubHeaders = () => {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-website-server",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
};

const fetchGitHub = async (path) => {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: githubHeaders(),
  });

  if (!response.ok) {
    let message = "GitHub API request failed.";

    try {
      const errorPayload = await response.json();
      message = errorPayload?.message || message;
    } catch (error) {
      // Keep default message when body is not JSON.
    }

    const err = new Error(message);
    err.status = response.status;
    throw err;
  }

  return response.json();
};

router.get("/metrics/:username", async (req, res) => {
  const username = req.params.username?.trim();

  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }

  const cacheKey = `metrics:${username.toLowerCase()}`;
  const cached = readCache(cacheKey);
  if (cached) {
    return res.json({ ...cached, cached: true });
  }

  try {
    const [prs, issues] = await Promise.all([
      fetchGitHub(`/search/issues?q=${encodeURIComponent(`author:${username} type:pr`)}`),
      fetchGitHub(`/search/issues?q=${encodeURIComponent(`author:${username} type:issue`)}`),
    ]);

    const payload = {
      metrics: {
        prs: prs?.total_count || 0,
        issues: issues?.total_count || 0,
      },
      cached: false,
    };

    writeCache(cacheKey, payload);
    return res.json(payload);
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message || "Failed to load GitHub metrics.",
    });
  }
});

router.get("/top-languages/:username", async (req, res) => {
  const username = req.params.username?.trim();

  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }

  const cacheKey = `top-languages:${username.toLowerCase()}`;
  const cached = readCache(cacheKey);
  if (cached) {
    return res.json({ ...cached, cached: true });
  }

  try {
    const repos = await fetchGitHub(
      `/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
    );

    const languageCounts = repos.reduce((acc, repo) => {
      if (!repo?.language || repo?.fork) {
        return acc;
      }

      acc[repo.language] = (acc[repo.language] || 0) + 1;
      return acc;
    }, {});

    const total = Object.values(languageCounts).reduce((sum, count) => sum + count, 0);

    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({
        name,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      }));

    const payload = {
      topLanguages,
      metadata: {
        totalRepositories: repos.filter((repo) => !repo?.fork).length,
        totalLanguageTaggedRepositories: total,
      },
      cached: false,
    };

    writeCache(cacheKey, payload);
    return res.json(payload);
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message || "Failed to load top languages.",
    });
  }
});

module.exports = router;
