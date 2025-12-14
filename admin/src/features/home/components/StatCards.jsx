import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { Wallet, Users, UserPlus, BarChart3 } from 'lucide-react';

const { Text, Title } = Typography;

const stats = [
  {
    title: "Today's Money",
    value: '$53k',
    change: '+55%',
    desc: 'than last week',
    positive: true,
    icon: Wallet,
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    title: "Today's Users",
    value: '2,300',
    change: '+3%',
    desc: 'than last month',
    positive: true,
    icon: Users,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'New Clients',
    value: '3,462',
    change: '-2%',
    desc: 'than yesterday',
    positive: false,
    icon: UserPlus,
    gradient: 'from-orange-500 to-rose-500',
  },
  {
    title: 'Sales',
    value: '$103,430',
    change: '+5%',
    desc: 'than yesterday',
    positive: true,
    icon: BarChart3,
    gradient: 'from-emerald-500 to-teal-500',
  },
];

const StatCards = () => {
  return (
    <Row gutter={[24, 24]}>
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              className="group rounded-2xl border border-gray-300! transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              bodyStyle={{ padding: 20 }}
            >
              <div className="flex flex-col gap-4">
                {/* Top */}
                <div className="flex items-center justify-between">
                  <div
                    className={`
                      w-12 h-12 rounded-xl
                      bg-linear-to-br ${item.gradient}
                      flex items-center justify-center
                      shadow-md
                      transition-transform duration-300
                      group-hover:scale-110
                    `}
                  >
                    <Icon size={22} className="text-white" />
                  </div>

                  <div className="text-right">
                    <Text className="text-gray-500 text-sm">{item.title}</Text>
                    <Title level={2} className="m-0! font-bold! tracking-tight">
                      {item.value}
                    </Title>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100" />

                {/* Bottom */}
                <div className="flex items-center gap-1">
                  <span
                    className={`font-semibold text-base ${
                      item.positive ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {item.change}
                  </span>
                  <Text className="text-gray-400 text-sm">{item.desc}</Text>
                </div>
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default StatCards;
