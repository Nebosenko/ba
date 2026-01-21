export default async function handler(req, res) {
    // 目标地址
    const targetUrl = 'https://eapi.binance.com/eapi/v1/mark';
    // 使用 Cloudflare 镜像代理，这个通常比 allorigins 更稳定且不包装数据
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
    
    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        
        const data = await response.json();
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
    } catch (error) {
        // 如果 corsproxy 失败，尝试备用 allorigins
        try {
            const backupUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
            const backupRes = await fetch(backupUrl);
            const backupData = await backupRes.json();
            res.status(200).json(backupData);
        } catch (e) {
            res.status(500).json({ error: "所有代理均失效", details: e.message });
        }
    }
}