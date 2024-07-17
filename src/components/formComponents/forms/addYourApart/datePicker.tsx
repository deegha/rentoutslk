import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const DateSelect = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: '#FFF',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#222',
            },
            '& .MuiButtonBase-root': {
              color: '#717171',
            },
            '& .MuiPickersDay-root': {
              backgroundColor: '#FFF',
              '&.Mui-selected': {
                backgroundColor: '#222',
                color: '#222',
                '&:hover': {
                  backgroundColor: '#222',
                },
              },
              '&:hover': {
                backgroundColor: '#222',
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
