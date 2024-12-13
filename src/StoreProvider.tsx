"use client"

import { AppStore, makeStore } from "@/lib/store/store";
import React, { ReactNode, useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({children}: {children:ReactNode}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this render
    storeRef.current=makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}
