// /api/data.js
export default async function handler(req, res) {
    const apiUrl = 'https://eapi.binance.com/eapi/v1/mark';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // 设置允许跨域的响应头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Content-Type', 'application/json');
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: '无法获取币安数据: ' + error.message });
    }
}