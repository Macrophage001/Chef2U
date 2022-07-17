import React from 'react'

export interface IFormEventsProps {
    handleOnSubmit: (e: React.FormEvent) => void;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}