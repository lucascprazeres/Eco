import { useFootprint } from '@eco/providers/footprint-provider'
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useMemo } from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.default,
    fontSize: 16,
    fontWeight: '700',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}))

export function FootprintTable() {
  const { footprint } = useFootprint()

  const footprintBreakdownRows = useMemo(() => {
    if (!footprint) return []

    return [
      {
        name: 'Electricity Usage  (Kwh/year)',
        emission: `${footprint?.electricity?.value} ${footprint?.electricity?.unit}`,
      },
      {
        name: 'Transportation fuel  (Gallons/year)',
        emission: `${footprint?.transportation?.value} ${footprint?.transportation?.unit}`,
      },
      {
        name: 'Air travel  (travels/year)',
        emission: `${footprint?.airTravel?.value} ${footprint?.airTravel?.unit}`,
      },
      {
        name: 'Total',
        emission: `${footprint?.total?.value} ${footprint?.total?.unit}`,
      },
    ]
  }, [footprint])

  return (
    <TableContainer variant="outlined" component={Paper} sx={{ width: 600 }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Emission</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {footprintBreakdownRows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 'bold' }}>
                {row.emission}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
