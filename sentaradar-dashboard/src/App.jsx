import { useState, useEffect } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';

const API_KEY = 'b9f7cda19c26adfe441392eb25a78141-c-app';

function App() {
  const [loading, setLoading] = useState(true);
  const [stockData, setStockData] = useState({});
  const [fearIndex, setFearIndex] = useState(50);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.alltick.com/realtime', {
        params: {
          symbol: 'NVDA',
          apikey: API_KEY
        }
      });
      
      // 恐慌指数计算逻辑（待完善）
      const newIndex = Math.random() * 100;
      
      setStockData(response.data);
      setFearIndex(newIndex);
      setLoading(false);
    } catch (error) {
      console.error('API请求失败:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const gaugeOption = {
    series: [{
      type: 'gauge',
      center: ['50%', '60%'],
      detail: { fontSize: 20 },
      data: [{ value: fearIndex }],
      axisLine: { lineStyle: { color: [[0.3, '#67e480'], [0.7, '#37a2ff'], [1, '#fd666d']] } }
    }]
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[20, 20]}>
        <Col span={8}>
          <Card title="NVDA恐慌指数" style={{ borderRadius: '12px' }}>
            {loading ? <Spin /> : <ReactECharts option={gaugeOption} />}
          </Card>
        </Col>
        <Col span={16}>
          <Card title="实时行情" style={{ borderRadius: '12px' }}>
            {/* 行情数据展示区 */}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
