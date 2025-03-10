import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
   
  interface File {
    name: string;
    type: string;
    tag: string;
    modified: string;
    created: string;
  }

  interface FileTableProps {
    files: File[];
  }

  export function FileTable({ files }: FileTableProps) {
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
            <TableRow className="px-5" key={file.name}>
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