import { useEffect, useRef } from "react";

export function useTaskTracking(task, enabled, { intervalMs = 120000, useWatch = false } = {}) {
  const intervalRef = useRef(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (watchIdRef.current != null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };

    if (!task?.id || !enabled) {
      stop();
      return;
    }


    const pushOnce = () => {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            await fetch(`/api/tasks/${task.id}/gps`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ latitude, longitude }),
            });
          } catch (e) {
            console.error("No se pudo reportar GPS:", e);
          }
        },
        (err) => console.warn("GPS error:", err),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
      );
    };


    pushOnce();


    if (useWatch && navigator.geolocation?.watchPosition) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          await fetch(`/api/tasks/${task.id}/gps`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude }),
          });
        },
        (err) => console.warn("watchPosition error:", err),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
      );
    } else {

      intervalRef.current = setInterval(pushOnce, intervalMs);
    }

    return stop;
  }, [task?.id, enabled, intervalMs, useWatch]);
}
