module.exports = async function handler(req, res) {
    const { path = [], ...query } = req.query;
    const pathStr = Array.isArray(path) ? path.join('/') : (path || '');

    const search = new URLSearchParams(query).toString();
    const apiUrl = `https://api.football-data.org/${pathStr}${search ? '?' + search : ''}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-Auth-Token': process.env.FOOTBALL_API_KEY,
                'Accept': 'application/json',
            },
        });

        const data = await response.json();
        res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
        res.status(response.status).json(data);
    } catch {
        res.status(500).json({ error: 'Proxy error' });
    }
};
