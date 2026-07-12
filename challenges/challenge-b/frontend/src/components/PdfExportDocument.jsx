import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v8/1Ptug8zYS_SKggPNyC0ISg.ttf' },
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v8/1Ptug8zYS_SKggPNyC0ISg.ttf', fontWeight: 'bold' },
  ],
})

const styles = StyleSheet.create({
  page: {
    padding: 34,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    color: '#0f172a',
  },
  header: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 10,
    color: '#475569',
    marginTop: 2,
  },
  metadataBlock: {
    position: 'absolute',
    top: 18,
    right: 34,
    alignItems: 'flex-end',
  },
  metadataText: {
    fontSize: 8,
    color: '#64748b',
    marginBottom: 1,
  },
  reportId: {
    fontSize: 8,
    color: '#0f172a',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fcfdff',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 6,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoItem: {
    width: '48%',
    marginRight: '2%',
    marginBottom: 6,
    paddingVertical: 2,
  },
  infoLabel: {
    fontSize: 8,
    color: '#64748b',
    textTransform: 'uppercase',
    marginBottom: 1,
  },
  infoValue: {
    fontSize: 10,
    color: '#0f172a',
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    padding: 12,
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 3,
    textTransform: 'uppercase',
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  summaryMeta: {
    fontSize: 9,
    color: '#334155',
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  metricCard: {
    width: '23%',
    marginRight: '2%',
    marginBottom: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  metricTitle: {
    fontSize: 8,
    color: '#64748b',
    marginBottom: 3,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  metricSubtitle: {
    fontSize: 7,
    color: '#64748b',
    marginTop: 3,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0f766e',
    marginTop: 4,
    marginRight: 6,
  },
  text: {
    fontSize: 9,
    color: '#334155',
    flexShrink: 1,
  },
  footer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    fontSize: 8,
    color: '#64748b',
    textAlign: 'center',
  },
})

function PdfExportDocument({ patient, metrics, summary, recommendations, latestSession, averageProgress, averageEmg, totalTherapyDuration }) {
  const generatedAt = new Date()
  const generatedDate = generatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const generatedTime = generatedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.metadataBlock}>
          <Text style={styles.metadataText}>Generated date: {generatedDate}</Text>
          <Text style={styles.metadataText}>Generated time: {generatedTime}</Text>
          <Text style={styles.reportId}>Report ID: RYO-2027-001</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>ACTIVAI CARE CONSOLE</Text>
          <Text style={styles.subtitle}>Rehabilitation Summary Report</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Overall Recovery Score</Text>
          <Text style={styles.summaryValue}>{summary.score} / 100</Text>
          <Text style={styles.summaryMeta}>Confidence: {summary.confidence} • Current status: {summary.status}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Overview</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}><Text style={styles.infoLabel}>Patient ID</Text><Text style={styles.infoValue}>{patient.id}</Text></View>
            <View style={styles.infoItem}><Text style={styles.infoLabel}>Patient Name</Text><Text style={styles.infoValue}>{patient.name}</Text></View>
            <View style={styles.infoItem}><Text style={styles.infoLabel}>Age</Text><Text style={styles.infoValue}>{patient.age}</Text></View>
            <View style={styles.infoItem}><Text style={styles.infoLabel}>Device</Text><Text style={styles.infoValue}>{patient.device}</Text></View>
            <View style={styles.infoItem}><Text style={styles.infoLabel}>Primary Therapist</Text><Text style={styles.infoValue}>{patient.therapist}</Text></View>
            <View style={styles.infoItem}><Text style={styles.infoLabel}>Program Start Date</Text><Text style={styles.infoValue}>{patient.start_date}</Text></View>
            <View style={styles.infoItem}><Text style={styles.infoLabel}>Current Status</Text><Text style={styles.infoValue}>On Track</Text></View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clinical Intelligence</Text>
          {summary.trends.map((trend) => (
            <View key={trend} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={styles.text}>{trend}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary Metrics</Text>
          <View style={styles.row}>
            {metrics.map((metric) => (
              <View key={metric.title} style={styles.metricCard}>
                <Text style={styles.metricTitle}>{metric.title}</Text>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricSubtitle}>{metric.subtitle}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Recommendations</Text>
          {recommendations.slice(0, 3).map((item) => (
            <View key={item.title} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={styles.text}>{item.title} — {item.reason}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session Snapshot</Text>
          <Text style={styles.text}>Latest session: {latestSession?.date ?? 'No session recorded yet'} • Progress {latestSession?.overall_progress_percent ?? 0}% • EMG {latestSession?.emg_quality_score?.toFixed(2) ?? '0.00'}</Text>
          <Text style={styles.text}>Average progress: {averageProgress}% • Average EMG: {Math.round(averageEmg * 100)}% • Total therapy time: {totalTherapyDuration} min</Text>
        </View>

        <Text style={styles.footer}>{`Generated automatically by ActivAI Care Console
Professional Clinical Rehabilitation Report
Generated on: ${generatedDate} at ${generatedTime}`}</Text>
      </Page>
    </Document>
  )
}

export default PdfExportDocument
