"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { ScrollArea } from "./ui/scroll-area";

const list = [
  {
    unitNumber: "001",
    occupantFirstName: "Jim",
    occupantLastName: "Doe",
    phone: "5555555555",
  },
  {
    unitNumber: "002",
    occupantFirstName: "John",
    occupantLastName: "Smith",
    phone: "5555555555",
  },
  {
    unitNumber: "003",
    occupantFirstName: "Jack",
    occupantLastName: "Harlow",
    phone: "5555555555",
  },
  {
    unitNumber: "004",
    occupantFirstName: "Terry",
    occupantLastName: "James",
    phone: "5555555555",
  },
  {
    unitNumber: "005",
    occupantFirstName: "Jim",
    occupantLastName: "Doe",
    phone: "5555555555",
  },
  {
    unitNumber: "006",
    occupantFirstName: "John",
    occupantLastName: "Smith",
    phone: "5555555555",
  },
  {
    unitNumber: "007",
    occupantFirstName: "Jack",
    occupantLastName: "Harlow",
    phone: "5555555555",
  },
  {
    unitNumber: "008",
    occupantFirstName: "Terry",
    occupantLastName: "James",
    phone: "5555555555",
  },
];

const Search = () => {
  return (
    <div className="flex items-end justify-center mt-4">
      <Command className="w-3/4 ">
        <CommandInput placeholder="Search..." onClick={() => {}} />
        <CommandList>
          <div className="grid grid-cols-4">
            <p>Unit #</p>
            <p>First Name</p>
            <p>Last Name</p>
            <p>Phone #</p>
          </div>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-[150px]">
              {list.map((item) => (
                <CommandItem key={item.unitNumber} className="grid grid-cols-4">
                  <p onClick={() => console.log(item.unitNumber)}>
                    {item.unitNumber}
                  </p>
                  <p>{item.occupantFirstName}</p>
                  <p>{item.occupantLastName}</p>
                  <p>{item.phone}</p>
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default Search;
