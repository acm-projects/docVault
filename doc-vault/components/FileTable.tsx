"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
   
  interface File {
    name: string;
    path: string;
    type: string;
    tag: string;
    modified: string;
    created: string;
  }

  interface FileTableProps {
    files: File[];
    onFileSelect: (file: File) => void;
  }

  export function FileTable({ files, onFileSelect }: FileTableProps) {
    return (
      <Table className="text-darkblue border-2 rounded-lg border-gray-200">
        <TableHeader className="text-darkblue bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Modified</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="rounded-md">
          {files.map((file) => (
            <TableRow 
              key={file.name}
              className="px-5 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => onFileSelect(file)}
            >
                <TableCell className="font-medium pr-8">{file.name}</TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell>
                <p className="p-1 w-20 text-center border-red border-2 rounded-md px-2">
                    {file.tag}
                </p>
                </TableCell>
                <TableCell>{file.modified}</TableCell>
                <TableCell>{file.created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }