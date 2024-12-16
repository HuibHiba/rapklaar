import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Student {
  id: string
  name: string
  groep: string
  [key: string]: string | number
}

interface StudentListProps {
  students: Student[]
}

export default function StudentList({ students }: StudentListProps) {
  const columns = Object.keys(students[0]).filter(key => key !== 'id' && key !== 'groep')

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Naam</TableHead>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              {columns.map((column) => (
                <TableCell key={column}>{student[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

