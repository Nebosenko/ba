export default async function handler(req, res) {
    // 使用 allorigins 代理，这可以绕过币安对 Vercel IP 的地理位置限制 (451)
    const targetUrl = 'https://eapi.binance.com/eapi/v1/mark';
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
    
    try {
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
            throw new Error(`代理服务器返回错误: ${response.status}`);
        }
        
        const data = await response.json();

        // 允许你的前端访问
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ 
            error: "代理抓取失败，请刷新页面重试。",
            details: error.message 
        });
    }
}