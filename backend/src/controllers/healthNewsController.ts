import { Request, Response } from 'express';

const NEWS_API_BASE = 'https://newsapi.org/v2';

export const getHealthNews = async (req: Request, res: Response) => {
    const { country } = req.query;
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
        return res.status(503).json({
            error: 'Health news service not configured',
            message: 'NEWS_API_KEY is required. Get a free key at https://newsapi.org/register',
        });
    }

    const countryCode = typeof country === 'string' ? country.toLowerCase().trim() : 'us';
    const validCountries = new Set([
        'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg',
        'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma',
        'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg',
        'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'
    ]);

    if (!validCountries.has(countryCode)) {
        return res.status(400).json({
            error: 'Invalid country code',
            message: `Country must be a 2-letter ISO code. Got: ${countryCode}`,
        });
    }

    try {
        const url = `${NEWS_API_BASE}/top-headlines?country=${countryCode}&category=health&pageSize=10&apiKey=${apiKey}`;
        const fetchRes = await fetch(url);
        const data = await fetchRes.json();

        if (data.status === 'error') {
            return res.status(502).json({
                error: 'News API error',
                message: data.message || 'Failed to fetch health news',
            });
        }

        const articles = (data.articles || []).filter(
            (a: any) => a.title && a.title !== '[Removed]' && a.url
        );

        res.json({
            country: countryCode.toUpperCase(),
            totalResults: data.totalResults || 0,
            articles: articles.map((a: any) => ({
                title: a.title,
                description: a.description,
                url: a.url,
                urlToImage: a.urlToImage,
                source: a.source?.name,
                author: a.author,
                publishedAt: a.publishedAt,
            })),
        });
    } catch (err: any) {
        console.error('Health news fetch error:', err);
        res.status(500).json({
            error: 'Failed to fetch health news',
            message: err.message || 'Unknown error',
        });
    }
};
