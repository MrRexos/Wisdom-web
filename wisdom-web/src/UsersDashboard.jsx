import { useCallback, useEffect, useMemo, useState } from 'react';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://api.wisdomapp.es').replace(/\/$/, '');

const metricDefinitions = [
  {
    key: 'users',
    label: 'Usuarios',
    description: 'Cuentas registradas',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    key: 'professionals',
    label: 'Profesionales',
    description: 'Modo profesional activo',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
      </svg>
    ),
  },
  {
    key: 'services',
    label: 'Servicios',
    description: 'Servicios creados',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2 4 6v12l8 4 8-4V6l-8-4Z" />
        <path d="m4 6 8 4 8-4M12 10v12" />
      </svg>
    ),
  },
  {
    key: 'bookings',
    label: 'Reservas',
    description: 'Reservas totales',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
];

const numberFormatter = new Intl.NumberFormat('es-ES');
const dayFormatter = new Intl.DateTimeFormat('es-ES', {
  weekday: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});
const updatedAtFormatter = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

function formatDay(date) {
  return dayFormatter.format(new Date(`${date}T00:00:00Z`)).replace('.', '');
}

function UsersDashboard() {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState('loading');

  const loadStats = useCallback(async (signal) => {
    setStatus('loading');

    try {
      const response = await fetch(`${API_BASE_URL}/api/public/platform-stats`, {
        method: 'GET',
        cache: 'no-store',
        signal,
      });

      if (!response.ok) {
        throw new Error(`Unexpected response: ${response.status}`);
      }

      const nextStats = await response.json();
      setStats(nextStats);
      setStatus('success');
    } catch (error) {
      if (error.name !== 'AbortError') {
        setStatus('error');
      }
    }
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    const controller = new AbortController();
    document.title = 'Wisdom en números';
    document.body.classList.add('users-dashboard-active');
    loadStats(controller.signal);

    return () => {
      controller.abort();
      document.title = previousTitle;
      document.body.classList.remove('users-dashboard-active');
    };
  }, [loadStats]);

  const dailyUsers = useMemo(() => stats?.users_last_7_days || [], [stats]);
  const maxDailyUsers = Math.max(...dailyUsers.map((day) => day.count), 1);
  const newUsersThisWeek = useMemo(
    () => dailyUsers.reduce((total, day) => total + day.count, 0),
    [dailyUsers],
  );

  return (
    <div className="min-h-screen bg-[#f5f5f2] text-[#11110f]">
      <main className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
        <header className="flex items-center justify-between border-b border-black/10 pb-5">
          <a href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[-0.02em] text-[#11110f] no-underline">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#11110f] text-[11px] font-bold text-white">W</span>
            WISDOM
          </a>
          <div className="flex items-center gap-2 text-xs font-medium text-[#6f6f69]">
            <span className="h-2 w-2 rounded-full bg-[#56b781] shadow-[0_0_0_4px_rgba(86,183,129,0.12)]" />
            Producción
          </div>
        </header>

        <section className="flex flex-1 flex-col py-10 sm:py-14 lg:py-16">
          <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-11 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b8b84]">Vista general</p>
              <h1 className="m-0 max-w-2xl text-4xl font-semibold tracking-[-0.055em] sm:text-5xl lg:text-[58px]">
                Wisdom en números
              </h1>
            </div>
            {stats?.generated_at ? (
              <p className="m-0 text-sm text-[#84847d]">
                Actualizado {updatedAtFormatter.format(new Date(stats.generated_at))}
              </p>
            ) : null}
          </div>

          {status === 'error' ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[28px] border border-black/10 bg-white px-6 text-center">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#f1f1ed] text-xl">!</div>
              <h2 className="m-0 text-xl font-semibold tracking-[-0.03em]">No se pudieron cargar las cifras</h2>
              <p className="mb-6 mt-2 max-w-sm text-sm text-[#777770]">La conexión con producción no está disponible ahora mismo.</p>
              <button
                type="button"
                onClick={() => loadStats()}
                className="rounded-full border-0 bg-[#11110f] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Reintentar
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 overflow-hidden rounded-[28px] border border-black/10 bg-white lg:grid-cols-4">
                {metricDefinitions.map((metric, index) => (
                  <article
                    key={metric.key}
                    className={`min-h-[176px] p-5 sm:min-h-[190px] sm:p-7 ${index % 2 === 1 ? 'border-l border-black/10' : ''} ${index >= 2 ? 'border-t border-black/10' : ''} ${index > 0 ? 'lg:border-l' : 'lg:border-l-0'} lg:border-t-0`}
                  >
                    <div className="mb-6 flex items-start justify-between sm:mb-10">
                      <span className="text-sm font-medium text-[#6f6f69]">{metric.label}</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f3ef] text-[#55554f] [&>svg]:h-[17px] [&>svg]:w-[17px] [&>svg]:fill-none [&>svg]:stroke-current [&>svg]:stroke-[1.7]">
                        {metric.icon}
                      </span>
                    </div>
                    {status === 'loading' ? (
                      <div className="h-11 w-24 animate-pulse rounded-xl bg-[#ecece7]" />
                    ) : (
                      <p className="m-0 text-[38px] font-semibold tracking-[-0.055em] sm:text-[42px]">
                        {numberFormatter.format(stats?.totals?.[metric.key] || 0)}
                      </p>
                    )}
                    <p className="mb-0 mt-2 text-[11px] text-[#999991] sm:text-xs">{metric.description}</p>
                  </article>
                ))}
              </div>

              <section className="mt-5 rounded-[28px] border border-black/10 bg-white p-6 sm:p-8 lg:p-9">
                <div className="mb-10 flex items-start justify-between gap-4 sm:items-center">
                  <div>
                    <h2 className="m-0 text-lg font-semibold tracking-[-0.035em]">Nuevos usuarios</h2>
                    <p className="mb-0 mt-1 text-sm text-[#8a8a83]">Altas diarias · últimos 7 días · UTC</p>
                  </div>
                  {status === 'success' ? (
                    <span className="shrink-0 rounded-full bg-[#f1f5ef] px-3 py-1.5 text-xs font-semibold text-[#56805f]">
                      +{numberFormatter.format(newUsersThisWeek)} altas
                    </span>
                  ) : null}
                </div>

                {status === 'loading' ? (
                  <div className="h-[220px] animate-pulse rounded-2xl bg-[#f2f2ee]" />
                ) : (
                  <div className="grid h-[230px] grid-cols-7 items-end gap-2 sm:gap-4" aria-label="Usuarios registrados por día durante los últimos siete días">
                    {dailyUsers.map((day) => {
                      const height = day.count === 0 ? 4 : Math.max((day.count / maxDailyUsers) * 100, 14);

                      return (
                        <div key={day.date} className="flex h-full min-w-0 flex-col items-center justify-end">
                          <span className="mb-2 text-xs font-semibold text-[#55554f]">{day.count}</span>
                          <div className="flex h-[168px] w-full items-end rounded-[12px] bg-[#f4f4f0] p-1 sm:rounded-2xl">
                            <div
                              className="w-full rounded-[9px] bg-[#171714] transition-[height] duration-500 sm:rounded-xl"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                          <span className="mt-3 truncate text-[10px] font-medium capitalize text-[#92928b] sm:text-xs">
                            {formatDay(day.date)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            </>
          )}
        </section>

        <footer className="flex items-center justify-between border-t border-black/10 pt-5 text-xs text-[#91918a]">
          <span>Datos agregados, sin información personal</span>
          <span>© 2026 Wisdom</span>
        </footer>
      </main>
    </div>
  );
}

export default UsersDashboard;
