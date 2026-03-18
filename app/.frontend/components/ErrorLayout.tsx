import { Box, CircularProgress, LinearProgress, Paper, Typography } from '@mui/material';
import React from 'react';
import GppBadIcon from '@mui/icons-material/GppBad';

interface ErrorLayoutProps {
    title?: string;
    description?: string;
    error?: any; // You can replace 'any' with a more specific type if you have one
}
export const ErrorLayout = ({ title, description, error }: ErrorLayoutProps) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="60vh"
            sx={{ p: 3 }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'transparent'
                }}
            >
                {/* Icon & Spinner Combo */}
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 10, mt: 10 }}> 
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                      <GppBadIcon sx={{ fontSize: 160, color: '#ff0000' }} />
                    </Box>
                </Box>

                {/* Text Information */}
                <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
                    {title || "Loading..."}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    {description || "Please wait while data is being loaded."}
                </Typography>
                {
                    import.meta.env.DEV && error &&
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        { "Error Details: " + JSON.stringify(error)}
                    </Typography>
                }
            </Paper>
        </Box>
    );
};