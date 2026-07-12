# ACTIVAI Rehabilitation Dashboard

A polished, data-driven rehabilitation dashboard for reviewing patient progress, therapy performance, and clinical insights. The project was built as a frontend-only React application that transforms sample rehabilitation session data into a professional, clinician-friendly interface.

## Overview

This dashboard presents patient rehabilitation information in a clear, structured way for therapists and clinical reviewers. It combines patient details, progress metrics, analytics charts, and data-driven recommendations into a single-page experience.

## Implemented Features

- Responsive rehabilitation dashboard layout
- Patient profile and care summary cards
- Recovery, EMG, fatigue, and exercise performance metrics
- Interactive charts for progress, exercise accuracy, fatigue, EMG trend, and recovery radar analysis
- Data-driven clinical intelligence section with recommendations and warnings
- Expandable session history for reviewing detailed therapy sessions
- PDF export for a clean summary report
- Loading skeletons, empty states, and accessible UI patterns

## Technologies Used

- React + Vite
- Tailwind CSS
- Chart.js and react-chartjs-2
- react-icons
- @react-pdf/renderer

## Installation

Prerequisites:
- Node.js 18+
- npm

```bash
cd challenges/challenge-b/frontend
npm install
```

## Run Locally

```bash
cd challenges/challenge-b/frontend
npm run dev
```

Then open the local Vite URL in your browser.

## Build for Production

```bash
cd challenges/challenge-b/frontend
npm run build
```

## Project Structure

```text
src/
├── App.jsx
├── components/
│   ├── charts/
│   ├── ClinicalInsightsPanel.jsx
│   ├── Header.jsx
│   ├── MetricCard.jsx
│   ├── PanelCard.jsx
│   ├── PatientProfileCard.jsx
│   ├── SessionHistory.jsx
│   ├── LoadingSkeleton.jsx
│   ├── EmptyState.jsx
│   ├── ExportSummaryButton.jsx
│   └── PdfExportDocument.jsx
├── data/
│   └── patient_sessions.json
└── utils/
    └── analytics.js
```

## PDF Export

The dashboard includes an Export Summary button that generates a professional PDF report using the current patient data, clinical intelligence summary, and latest recommendations.

## Screenshots

- Dashboard preview: placeholder coming soon
- PDF export preview: placeholder coming soon

## Future Improvements

- Connect the dashboard to a real backend or live patient data source
- Add filtering and session comparison tools
- Expand the recommendation engine with richer clinical logic
- Introduce dark mode and additional accessibility refinements
