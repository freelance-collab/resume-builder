// 'use client';

// import { CommandInput as CommandInputPrimitive } from 'cmdk';
// import { Check, X } from 'lucide-react';
// import * as React from 'react';

// import { Command, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { cn } from '@/lib/utils';

// import { Badge } from '../ui/badge';
// import { Input } from '../ui/input';

// type Framework = Record<'value' | 'label', string>;

// const FRAMEWORKS = [
//   {
//     value: 'next.js',
//     label: 'Next.js',
//   },
//   {
//     value: 'sveltekit',
//     label: 'SvelteKit',
//   },
//   {
//     value: 'nuxt.js',
//     label: 'Nuxt.js',
//   },
//   {
//     value: 'remix',
//     label: 'Remix',
//   },
//   {
//     value: 'astro',
//     label: 'Astro',
//   },
// ] satisfies Framework[];

// export function Combobox() {
//   const inputRef = React.useRef<HTMLInputElement>(null);
//   const [open, setOpen] = React.useState(false);
//   const [selected, setSelected] = React.useState<Framework[]>([FRAMEWORKS[4]]);
//   const [inputValue, setInputValue] = React.useState('');

//   const handleUnselect = React.useCallback((framework: Framework) => {
//     setSelected((prev) => prev.filter((s) => s.value !== framework.value));
//   }, []);

//   const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
//     const input = inputRef.current;
//     if (input) {
//       if (e.key === 'Delete' || e.key === 'Backspace') {
//         if (input.value === '') {
//           setSelected((prev) => {
//             const newSelected = [...prev];
//             newSelected.pop();
//             return newSelected;
//           });
//         }
//       }
//       // This is not a default behaviour of the <input /> field
//       if (e.key === 'Escape') {
//         input.blur();
//       }
//     }
//   }, []);

//   const selectables = FRAMEWORKS.filter((framework) => !selected.includes(framework));

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <Command className='h-auto overflow-visible' onKeyDown={handleKeyDown}>
//         <PopoverTrigger asChild>
//           <div
//             onClick={(e) => e.preventDefault()}
//             className='group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'
//           >
//             <div cmdk-input-wrapper='' className='flex flex-wrap gap-1'>
//               {selected.map((framework) => {
//                 return (
//                   <Badge key={framework.value} variant='secondary'>
//                     {framework.label}
//                     <button
//                       className='ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
//                       onKeyDown={(e) => {
//                         if (e.key === 'Enter') {
//                           handleUnselect(framework);
//                         }
//                       }}
//                       onMouseDown={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                       }}
//                       onClick={() => handleUnselect(framework)}
//                     >
//                       <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
//                     </button>
//                   </Badge>
//                 );
//               })}
//               <CommandInputPrimitive
//                 ref={inputRef}
//                 value={inputValue}
//                 onValueChange={setInputValue}
//                 onBlur={() => setOpen(false)}
//                 onFocus={() => setOpen(true)}
//                 className='ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground'
//               />
//             </div>
//           </div>
//         </PopoverTrigger>

//         <PopoverContent className='w-[500px] p-0' onOpenAutoFocus={(e) => e.preventDefault()}>
//           <CommandEmpty>No framework found.</CommandEmpty>
//           <CommandGroup>
//             {selectables.map((framework) => (
//               <CommandItem
//                 key={framework.value}
//                 value={framework.value}
//                 onMouseDown={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                 }}
//                 onSelect={(value) => {
//                   setInputValue('');
//                   setSelected((prev) => [...prev, framework]);
//                 }}
//               >
//                 {framework.label}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </PopoverContent>
//       </Command>
//     </Popover>
//   );
// }
