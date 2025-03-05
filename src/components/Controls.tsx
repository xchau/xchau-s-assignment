import { Box, Button, Input, Text } from "@mantine/core";

type ControlsProps = {
  pageSize: number;
  searchTerm: string;
  onResetSearch: (e: React.MouseEvent) => void;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSetPageSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Controls = ({
  pageSize = 10,
  searchTerm,
  onResetSearch,
  onSearch,
  onSetPageSize,
}: ControlsProps) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
      mb="md"
    >
      <Text size="lg" fw={700}>
        Search
      </Text>
      <Box
        mt="sm"
        mb="sm"
        style={{
          alignItems: "flex-end",
          display: "flex",
          gap: "24px",
        }}
      >
        <Input.Wrapper label="Search">
          <Input value={searchTerm} onChange={onSearch} />
        </Input.Wrapper>
        <Button onClick={onResetSearch}>Reset search</Button>
        <Input.Wrapper label="Page size">
          <Input placeholder="10" value={pageSize} onChange={onSetPageSize} type="number" />
        </Input.Wrapper>
      </Box>
    </Box>
  );
};
