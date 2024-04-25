import {
  add,
  eachMonthOfInterval,
  endOfYear,
  format,
  isEqual,
  isFuture,
  parse,
  startOfMonth,
  startOfToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Popover, PopoverContent, PopoverTrigger } from './popover';

function getStartOfCurrentMonth() {
  return startOfMonth(startOfToday());
}

interface MonthPickerProps {
  currentMonth: Date | undefined;
  onMonthChange: (newMonth: Date | undefined) => void;
}

export function MonthPicker({ currentMonth, onMonthChange }: MonthPickerProps) {
  const formattedMonth = currentMonth
    ? `${format(currentMonth, 'LLLL')}, ${currentMonth.getFullYear()}`
    : 'Select Date...';

  const [open, setOpen] = React.useState(false);
  const [currentYear, setCurrentYear] = React.useState(
    currentMonth ? format(currentMonth, 'yyyy') : format(new Date(), 'yyyy'),
  );
  const firstDayCurrentYear = parse(currentYear, 'yyyy', new Date());

  const months = eachMonthOfInterval({
    start: firstDayCurrentYear,
    end: endOfYear(firstDayCurrentYear),
  });

  function previousYear() {
    let firstDayNextYear = add(firstDayCurrentYear, { years: -1 });
    setCurrentYear(format(firstDayNextYear, 'yyyy'));
  }

  function nextYear() {
    let firstDayNextYear = add(firstDayCurrentYear, { years: 1 });
    setCurrentYear(format(firstDayNextYear, 'yyyy'));
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between'>
          <span>{formattedMonth}</span>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <div className='p-3'>
          <div className='flex w-full flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
            <div className='w-full space-y-4'>
              <div className='relative flex items-center justify-center pt-1'>
                <div className='text-sm font-medium' aria-live='polite' role='presentation' id='month-picker'>
                  {format(firstDayCurrentYear, 'yyyy')}
                </div>
                <div className='flex items-center space-x-1'>
                  <button
                    name='previous-year'
                    aria-label='Go to previous year'
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                      'absolute left-1',
                    )}
                    type='button'
                    onClick={previousYear}
                  >
                    <ChevronLeft className='h-4 w-4' />
                  </button>
                  <button
                    name='next-year'
                    aria-label='Go to next year'
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                      'absolute right-1 disabled:bg-slate-100',
                    )}
                    type='button'
                    disabled={isFuture(add(firstDayCurrentYear, { years: 1 }))}
                    onClick={nextYear}
                  >
                    <ChevronRight className='h-4 w-4' />
                  </button>
                </div>
              </div>
              <div className='grid w-full grid-cols-3 gap-2' role='grid' aria-labelledby='month-picker'>
                {months.map((month) => (
                  <div
                    key={month.toString()}
                    className='relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md dark:[&:has([aria-selected])]:bg-slate-800'
                    role='presentation'
                  >
                    <button
                      name='day'
                      className={cn(
                        'inline-flex h-9 w-full items-center justify-center rounded-md border p-0 text-sm font-normal ring-offset-white transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:opacity-100 dark:ring-offset-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-800',
                        isEqual(month, getStartOfCurrentMonth()) &&
                          'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50',
                        currentMonth &&
                          isEqual(month, currentMonth) &&
                          'bg-primary text-slate-50 hover:bg-primary hover:text-slate-50 focus:bg-primary focus:text-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900',
                      )}
                      disabled={isFuture(month)}
                      role='gridcell'
                      tabIndex={-1}
                      type='button'
                      onClick={() => {
                        if (currentMonth && isEqual(month, currentMonth)) {
                          onMonthChange(undefined);
                        } else {
                          onMonthChange(month);
                        }
                        setOpen(false);
                      }}
                    >
                      <time dateTime={format(month, 'yyyy-MM-dd')}>{format(month, 'MMM')}</time>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}