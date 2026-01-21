export default async function handler(req, res) {
    const apiUrl = 'https://eapi.binance.com/eapi/v1/mark';
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Binance API error: ${response.status}`);
        
        const data = await response.json();

        // 允许前端访问的响应头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}