import { Box, Button, Input, Text } from "@mantine/core"

type ControlsProps = {
  searchTerm: string;
  onResetSearch: (e: React.MouseEvent) => void;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Controls = ({
  searchTerm,
  onResetSearch,
  onSearch,
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
      <Box mt="sm" mb="sm" style={{
        display: "flex",
        gap: "24px",
      }}>
        <Input value={searchTerm} onChange={onSearch}/>
        <Button onClick={onResetSearch}>Reset search</Button>
      </Box>
    </Box>
  )
}