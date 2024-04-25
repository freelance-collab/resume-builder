'use client';

/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { State } from 'country-state-city';
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

interface StateDropdownProps {
  state?: string;
  setState: (value: string | undefined) => void;
  countryCode?: string;
  disabled: boolean;
}

export const StateDropdown = ({ countryCode, state, setState, disabled }: StateDropdownProps) => {
  const [open, setOpen] = React.useState(false);

  const states = State.getStatesOfCountry(countryCode);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
          disabled={disabled}
        >
          <span>{state ?? 'Select State...'}</span>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0'>
        <Command>
          <CommandInput placeholder='Search state...' />
          <CommandEmpty>No state found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className='h-[300px] w-full'>
              {states.map((s) => (
                <CommandItem
                  key={s.isoCode}
                  value={s.name}
                  onSelect={() => {
                    setState(s.name);
                    setOpen(false);
                  }}
                >
                  <span>{s.name}</span>
                  <Check className={cn('mr-2 h-4 w-4', state === s.name ? 'opacity-100' : 'opacity-0')} />
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
