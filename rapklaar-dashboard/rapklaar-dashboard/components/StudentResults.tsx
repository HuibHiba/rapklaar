interface Student {
  id: string
  name: string
  groep: string
  [key: string]: string | number
}

interface StudentResultsProps {
  students: Student[]
}

export default function StudentResults({ students }: StudentResultsProps) {
  const testSubjects = Object.keys(students[0]).filter(key => 
    key !== 'id' && key !== 'name' && key !== 'groep'
  )

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Naam</th>
            {testSubjects.map(subject => (
              <th key={subject} className="py-3 px-6 text-left">{subject}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {students.map(student => (
            <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="font-medium">{student.name}</div>
              </td>
              {testSubjects.map(subject => (
                <td key={subject} className="py-3 px-6 text-left">
                  {student[subject]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

