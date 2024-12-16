import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

interface Student {
  id: string
  naam: string
  klas: string
  spreken: number
  schrijven: number
  lezen: number
  luisteren: number
  [key: string]: string | number
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
  },
})

const getNiveau = (score: number) => {
  const niveaus = ['Niks', 'A1', 'A2', 'B1', 'B2']
  const index = Math.floor(score / 10)
  return `${niveaus[index]} (${score % 10 + 1}/10)`
}

interface RapportPDFProps {
  student: Student
}

const RapportPDF: React.FC<RapportPDFProps> = ({ student }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Taalvaardigheidsrapport</Text>
        <Text style={styles.subtitle}>{student.naam}</Text>
        <Text style={styles.content}>Klas: {student.klas}</Text>
        
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Vaardigheid</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Score</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Niveau</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Opmerkingen</Text>
            </View>
          </View>
          {['spreken', 'schrijven', 'lezen', 'luisteren'].map((vaardigheid) => (
            <View style={styles.tableRow} key={vaardigheid}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{vaardigheid.charAt(0).toUpperCase() + vaardigheid.slice(1)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{student[vaardigheid]}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{getNiveau(student[vaardigheid] as number)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={[styles.content, { marginTop: 20 }]}>Datum: {new Date().toLocaleDateString()}</Text>
        <Text style={styles.content}>Docent: ______________________</Text>
      </View>
    </Page>
  </Document>
)

export default RapportPDF

