'use client';

import { useState, useEffect } from 'react';

export default function CurrentYear() {
  const [year, setYear] = useState(2025); // fallback year

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year}</>;
}
