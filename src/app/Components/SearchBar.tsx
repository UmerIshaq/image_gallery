import React from 'react'
import { FaSearch } from "react-icons/fa";
import { cn } from '../lib/utils';

type SearchBarProps = {
    className?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
    value?: string | number | readonly string[] | undefined
}

const SearchBar = ({ className, value, onChange }: SearchBarProps) => {
    return (
        <div className={cn('w-full relative flex  items-center', className)}>
            <FaSearch className='absolute left-5 text-gray-500' />
            <input type='text'
                className=' w-full transition-all h-12 rounded-full pl-12 outline-blue-300 bg-gray-300 dark:bg-gray-800 border'
                placeholder='Search Images...'
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default SearchBar