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
        console.warn(`Country '${countryCode}' not supported by NewsAPI. Falling back to 'us'.`);
        // Fallback to US instead of erroring
        // countryCode = 'us'; // variable is const so we need to change how we declare it or use a new variable
    }
    const finalCountryCode = validCountries.has(countryCode) ? countryCode : 'us';

    try {
        let articles = [];
        let totalResults = 0;

        if (apiKey.startsWith('pub_')) {
            // NewsData.io API
            // Note: validation of country codes strictly might fail here if newsdata supports more/different, but standard ones overlap.
            const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${finalCountryCode}&category=health`;
            const fetchRes = await fetch(url);
            const data = await fetchRes.json();

            if (data.status === 'error') {
                // newsdata.io error
                return res.status(502).json({
                    error: 'NewsData API error',
                    message: data.results?.message || 'Failed to fetch health news',
                });
            }

            totalResults = data.totalResults || 0;
            articles = (data.results || []).map((a: any) => ({
                title: a.title,
                description: a.description,
                url: a.link,
                urlToImage: a.image_url, // newsdata uses image_url
                source: a.source_id,     // newsdata uses source_id
                author: a.creator ? a.creator[0] : null,
                publishedAt: a.pubDate,  // newsdata uses pubDate
            }));

        } else {
            // NewsAPI.org (Default)
            const url = `${NEWS_API_BASE}/top-headlines?country=${finalCountryCode}&category=health&pageSize=10&apiKey=${apiKey}`;
            const fetchRes = await fetch(url);
            const data = await fetchRes.json();

            if (data.status === 'error') {
                return res.status(502).json({
                    error: 'News API error',
                    message: data.message || 'Failed to fetch health news',
                });
            }

            totalResults = data.totalResults || 0;
            articles = (data.articles || []).map((a: any) => ({
                title: a.title,
                description: a.description,
                url: a.url,
                urlToImage: a.urlToImage,
                source: a.source?.name,
                author: a.author,
                publishedAt: a.publishedAt,
            }));
        }

        // Filter valid articles
        const validArticles = articles.filter(
            (a: any) => a.title && a.title !== '[Removed]' && a.url
        );

        res.json({
            country: finalCountryCode.toUpperCase(),
            totalResults: totalResults,
            articles: validArticles
        });
    } catch (err: any) {
        console.error('Health news fetch error:', err);
        res.status(500).json({
            error: 'Failed to fetch health news',
            message: err.message || 'Unknown error',
        });
    }
};
