import React from 'react'

const for_storage = () => {
    return (
        <div>
            <Typography variant="h6" fontFamily="Roboto, sans-serif" sx={{ mb: 1, textAlign: 'center' }}>
                Drive Overview
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
                <strong>Ongoing Round:</strong> {selectedDrive && selectedDrive.roundName}
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
                <strong>Drive Name:</strong> {selectedDrive && selectedDrive.Name}
            </Typography>
            <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
                <strong>Start Date:</strong> {selectedDrive && selectedDrive.StartDate}
            </Typography>
            <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
                <strong>MaxCTC:</strong> {selectedDrive && selectedDrive.MaxCTC}
            </Typography>
            <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
                <strong>Slab:</strong> {selectedDrive && selectedDrive.Slab}
            </Typography>
            <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
                <strong>Roles Offered:</strong> {selectedDrive && selectedDrive.RolesOffered}
            </Typography>
            <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
                <strong>Mode:</strong> {selectedDrive && selectedDrive.Mode}
            </Typography>

            ------------
            {/* round dropdown and selceted */}
            <TableCell>
                <FormControl fullWidth>
                    <InputLabel>Round</InputLabel>
                    <Select value={driveRounds.data[index % driveRounds.data.length].id}>
                        {driveRounds.data.map(round => (
                            <MenuItem key={round.id} value={round.id}>
                                {round.RoundName} ({round.id})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell>
                <Checkbox />
            </TableCell>
        </div>
    )
}

export default for_storage
