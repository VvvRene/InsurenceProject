import { Box, CircularProgress, LinearProgress, Paper, Typography } from '@mui/material';
import React from 'react';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

interface LoadingLayoutProps {
    icon?: React.ReactNode;
    title?: string;
    description?: string;
}
export const LoadingLayout = ({ icon, title, description }: LoadingLayoutProps) => {
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
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                    <CircularProgress
                        size={80}
                        thickness={2}
                        sx={{ color: 'primary.main' }}
                    />
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
                        <Box sx={{ fontSize: 40, color: 'primary.light' }}>
                            {icon || <HourglassBottomIcon sx={{ fontSize: 40, color: 'primary.light' }} />}
                        </Box> 
                    </Box>
                </Box>

                {/* Text Information */}
                <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
                    {title || "Loading..."}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    {description || "Please wait while data is being loaded."}
                </Typography>

                {/* Progress Bar */}
                <Box sx={{ width: '300px' }}>
                    <LinearProgress
                        variant="indeterminate" // Change to "determinate" if you want to sync exactly with 5s
                        sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                            }
                        }}
                    />
                </Box>
            </Paper>
        </Box>
    );
};