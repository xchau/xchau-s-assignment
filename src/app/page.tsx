"use client";

import { Advocate } from "@/types";
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
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={handleSearch} value={searchTerm ?? ''} />
        <button onClick={handleResetSearch}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={`${advocate.firstName}${advocate.lastName}${advocate.phoneNumber}`}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
