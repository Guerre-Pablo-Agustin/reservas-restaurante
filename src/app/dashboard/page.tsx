import StatsCards from "@/components/Dashboard/Stats/StatsCards";
import UpcomingReservations from "@/components/Dashboard/UpcomingReservations/UpcomingReservations";

export default function DashboardHome() {
    return (
        <div className="p-6 space-y-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600">Bienvenido al panel de administración</p>
            </div>

            {/* Estadísticas */}
            <section className="mb-8">
                <StatsCards />
            </section>

            {/* Próximas Reservas */}
            <section>
                <UpcomingReservations />
            </section>
        </div>
    );
}