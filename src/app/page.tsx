"use client";

import { AdvocatesTable } from "@/components/AdvocatesTable";
import { Controls } from "@/components/Controls";
import { Advocate, GetAdvocatesResponse } from "@/types";
import { Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Array<Advocate>>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [totalSize, setTotalSize] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const filteredAdvocates = advocates.filter(
    ({ firstName, lastName, city, degree, specialties, phoneNumber }) => {
      if (!searchTerm?.trim()) {
        return true;
      }

      const sanitizedToken = searchTerm.toLowerCase();

      return (
        firstName.toLowerCase().includes(sanitizedToken) ||
        lastName.toLowerCase().includes(sanitizedToken) ||
        city.toLowerCase().includes(sanitizedToken) ||
        degree.toLowerCase().includes(sanitizedToken) ||
        (specialties.length > 0 &&
          specialties.some((s) => s.toLowerCase().includes(sanitizedToken))) ||
        phoneNumber.toString().includes(sanitizedToken)
      );
    }
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  const handleResetSearch = () => setSearchTerm(null);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.append("pageSize", pageSize.toString());
    searchParams.append("pageNumber", pageNumber.toString());

    fetch(`/api/advocates?${searchParams.toString()}`).then((response) => {
      response.json().then((jsonResponse: GetAdvocatesResponse) => {
        setAdvocates(jsonResponse.data);
        setTotalSize(jsonResponse.count);
      });
    });
  }, [pageSize, pageNumber]);

  return (
    <main style={{ margin: "24px" }}>
      <Text size="xl" mb="md" fw={700}>
        Solace Advocates
      </Text>
      <Controls
        pageSize={pageSize}
        searchTerm={searchTerm ?? ""}
        onResetSearch={handleResetSearch}
        onSearch={handleSearch}
        onSetPageSize={(e) => {
          const size = e.target.value;
          !Number.isNaN(size) && setPageSize(Number.parseInt(size, 10) || 0);
        }}
      />
      <AdvocatesTable
        advocates={filteredAdvocates}
        currPage={pageNumber}
        totalPages={Math.ceil(totalSize / pageSize)}
        onSetPage={setPageNumber}
      />
    </main>
  );
}
