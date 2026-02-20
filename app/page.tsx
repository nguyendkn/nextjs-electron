"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [version, setVersion] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.electronAPI) {
      window.electronAPI.getAppVersion().then(setVersion);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Electron + Next.js</h1>
        {version && <p className="text-gray-600">Version: {version}</p>}
      </div>
    </div>
  );
}
