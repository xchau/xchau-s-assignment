"use client";

import { AdvocatesTable } from "@/components/AdvocatesTable";
import { Controls } from "@/components/Controls";
import { Advocate } from "@/types";
import { Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Array<Advocate>>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const filteredAdvocates = advocates.filter(({ firstName, lastName, city, degree, specialties, phoneNumber }) => {
    if (!searchTerm?.trim()) {
      return true;
    }

    const sanitizedToken = searchTerm.toLowerCase();

    return firstName.toLowerCase().includes(sanitizedToken) || lastName.toLowerCase().includes(sanitizedToken) || city.toLowerCase().includes(sanitizedToken) || degree.toLowerCase().includes(sanitizedToken) || (specialties.length > 0 && specialties.some(s => s.toLowerCase().includes(sanitizedToken))) || phoneNumber.toString().includes(sanitizedToken)
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm( e.target.value);

  const handleResetSearch = () => setSearchTerm(null);

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data as Array<Advocate>);
      });
    });
  }, []);

  return (
    <main style={{ margin: "24px" }}>
      <Text size="xl" mb="md" fw={700}>Solace Advocates</Text>
      <Controls 
        searchTerm={searchTerm ?? ''} 
        onResetSearch={handleResetSearch} 
        onSearch={handleSearch} 
      />
      <AdvocatesTable advocates={filteredAdvocates} />
    </main>
  );
}
