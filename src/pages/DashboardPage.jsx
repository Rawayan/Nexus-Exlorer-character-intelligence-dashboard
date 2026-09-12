import { useQuery } from "@tanstack/react-query";
import { useWatchlistState } from "../context/watchlist/useWatchlist";
import { fetchCharacters } from "../api/characterQueries";

import StatCard from "../components/ui/StatCard";
import StatGrid from "../components/ui/StatGrid";

function DashboardPage() {
  const { ids: watchlistIds } = useWatchlistState();

  const { data: totalData, isLoading: totalLoading } = useQuery({
    queryKey: ["characters", { page: 1 }],
    queryFn: () => fetchCharacters({ page: 1 }),
  });

  const { data: aliveData, isLoading: aliveLoading } = useQuery({
    queryKey: ["characters", { page: 1, status: "alive" }],
    queryFn: () => fetchCharacters({ page: 1, status: "alive" }),
  });

  const { data: deadData, isLoading: deadLoading } = useQuery({
    queryKey: ["characters", { page: 1, status: "dead" }],
    queryFn: () => fetchCharacters({ page: 1, status: "dead" }),
  });

  const total = totalData?.info?.count ?? 0;
  const alive = aliveData?.info?.count ?? 0;
  const dead = deadData?.info?.count ?? 0;
  const watchlist = watchlistIds?.length ?? 0;

  const isLoading = totalLoading || aliveLoading || deadLoading;

  const alivePct = total > 0 ? ((alive / total) * 100).toFixed(1) : 0;
  const deadPct = total > 0 ? ((dead / total) * 100).toFixed(1) : 0;
  const watchlistPct = total > 0 ? ((watchlist / total) * 100).toFixed(1) : 0;

  return (
    <div>
      <h1 className="page-title">
        Dashboard
      </h1>

      <p className="page-subtitle">
        Character Intelligence Overview
      </p>

      <section style={{ marginTop: "24px" }}>
        <StatGrid>
          <StatCard
            label="Total Characters"
            value={isLoading ? "—" : total.toLocaleString()}
            description={isLoading ? "Loading..." : "All characters in database"}
            icon="C"
          />

          <StatCard
            label="Alive"
            value={isLoading ? "—" : alive.toLocaleString()}
            description={isLoading ? "Loading..." : `${alivePct}% of total`}
            icon="A"
          />

          <StatCard
            label="Dead"
            value={isLoading ? "—" : dead.toLocaleString()}
            description={isLoading ? "Loading..." : `${deadPct}% of total`}
            icon="D"
          />

          <StatCard
            label="Watchlist"
            value={isLoading ? "—" : watchlist.toLocaleString()}
            description={isLoading ? "Loading..." : `${watchlistPct}% of total`}
            icon="★"
          />
        </StatGrid>
      </section>
    </div>
  );
}

export default DashboardPage;