export default async function handler(req, res) {
    // 尝试使用备用 API 域名 (api1, api2, 或 api3 往往能绕过某些限制)
    const apiEndpoints = [
        'https://eapi.binance.com/eapi/v1/mark',
        'https://api.binance.com/eapi/v1/mark',
        'https://api1.binance.com/eapi/v1/mark'
    ];
    
    let lastError = '';

    for (let url of apiEndpoints) {
        try {
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            if (response.ok) {
                const data = await response.json();
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).json(data);
            }
            
            lastError = `Endpoint ${url} returned ${response.status}`;
        } catch (error) {
            lastError = error.message;
        }
    }

    res.status(500).json({ error: "所有 API 节点均被限制 (451/403)。错误详情: " + lastError });
}