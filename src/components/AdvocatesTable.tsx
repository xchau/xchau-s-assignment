import { Advocate } from "@/types";
import { Pagination, Table } from "@mantine/core";

type AdvocatesTableProps = {
  advocates: Array<Advocate>;
  currPage: number;
  totalPages: number;
  onSetPage: (page: number) => void;
};

export const AdvocatesTable = ({
  advocates,
  currPage,
  totalPages,
  onSetPage,
}: AdvocatesTableProps) => {
  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>First Name</Table.Th>
            <Table.Th>Last Name</Table.Th>
            <Table.Th>City</Table.Th>
            <Table.Th>Degree</Table.Th>
            <Table.Th>Specialties</Table.Th>
            <Table.Th>Years of Experience</Table.Th>
            <Table.Th>Phone Number</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {advocates.map(
            ({
              firstName,
              lastName,
              city,
              phoneNumber,
              degree,
              specialties,
              yearsOfExperience,
            }) => {
              return (
                <Table.Tr key={`${firstName}${lastName}${phoneNumber}`}>
                  <Table.Td>{firstName}</Table.Td>
                  <Table.Td>{lastName}</Table.Td>
                  <Table.Td>{city}</Table.Td>
                  <Table.Td>{degree}</Table.Td>
                  <Table.Td>
                    {specialties.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </Table.Td>
                  <Table.Td>{yearsOfExperience}</Table.Td>
                  <Table.Td>{phoneNumber}</Table.Td>
                </Table.Tr>
              );
            }
          )}
        </Table.Tbody>
      </Table>
      <Pagination value={currPage} total={totalPages} onChange={onSetPage} />
    </>
  );
};
