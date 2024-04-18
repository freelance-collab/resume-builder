'use client';

/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { Country } from 'country-state-city';
import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface CountryDropdownProps {
  country?: { label: string; value: string };
  setCountry: (value: { label: string; value: string } | undefined) => void;
  disabled?: boolean;
}

const countries = Country.getAllCountries();

export const CountryDropdown = ({ country, setCountry, disabled }: CountryDropdownProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between'>
          <span>{country?.label ?? 'Select Country...'}</span>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0'>
        <Command>
          <CommandInput placeholder='Search country...' />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className='h-[300px] w-full'>
              {countries.map((c) => (
                <CommandItem
                  key={c.isoCode}
                  value={c.name}
                  onSelect={() => {
                    if (c.isoCode === country?.value) {
                      setCountry(undefined);
                    } else {
                      setCountry({ label: c.name, value: c.isoCode });
                    }

                    setOpen(false);
                  }}
                >
                  <div className='flex items-end gap-2'>
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                  </div>
                  <Check className={cn('mr-2 h-4 w-4', country?.value === c.isoCode ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
              <ScrollBar orientation='vertical' />
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
