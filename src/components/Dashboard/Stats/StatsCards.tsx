import { FaCalendar, FaUsers, FaChair, FaStar } from 'react-icons/fa';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

const StatCard = ({ title, value, icon, trend }: StatCardProps) => (
    <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <h3 className="text-2xl font-bold mt-1">{value}</h3>
                {trend && (
                    <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% vs último mes
                    </p>
                )}
            </div>
            <div className="text-blue-500 text-2xl">{icon}</div>
        </div>
    </div>
);

const StatsCards = () => {
    // Estos datos deberían venir de tu backend
    const stats = [
        {
            title: "Reservas Hoy",
            value: "24",
            icon: <FaCalendar />,
            trend: { value: 12, isPositive: true }
        },
        {
            title: "Total Comensales",
            value: "86",
            icon: <FaUsers />,
            trend: { value: 8, isPositive: true }
        },
        {
            title: "Mesas Disponibles",
            value: "6",
            icon: <FaChair />,
        },
        {
            title: "Calificación Promedio",
            value: "4.8",
            icon: <FaStar className="text-yellow-400" />,
            trend: { value: 5, isPositive: true }
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

export default StatsCards;
