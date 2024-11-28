"use client";
import { createContext, useContext, useState } from "react";

const DataContext = createContext<any>(null);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState(0);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}
