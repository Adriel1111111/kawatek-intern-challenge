# Solution : Challenge B: AI Programming & UX
# Adriel Fernandes

This project was implemented as a React-based rehabilitation dashboard that turns structured therapy data into a clear, professional clinical interface. The solution focuses on clarity, responsiveness, and data storytelling rather than relying on a backend or external services.

## Approach

The dashboard is built around a single-page experience that presents patient information, recovery metrics, and analytics in a layout designed for therapists and clinical reviewers. The implementation uses reusable UI components and a centralized analytics utility so the data presentation remains consistent across the app.

## Architecture and Design Decisions

- React and Vite were used to create a lightweight, modern frontend experience.
- Tailwind CSS was used to maintain the existing visual system while keeping styling organized and responsive.
- Chart.js through react-chartjs-2 was selected for flexible and professional chart rendering.
- Patient data is processed in a dedicated analytics module to compute summary metrics, recommendations, and warnings.
- The export workflow uses @react-pdf/renderer to generate a clean report that does not depend on the dashboard’s live styling.

## Milestones

### 1. Project Setup
The frontend project was initialized with Vite and React, then styled with Tailwind CSS. Core dependencies for charts, icons, and PDF generation were added to support the dashboard and report export.

### 2. Dashboard UI
The main interface was built as a polished single-page dashboard with a patient profile card, performance metrics, and multiple analytic panels. The layout was kept responsive so it works across desktop, tablet, and smaller screens.

### 3. Patient Information
The dashboard surfaces patient-specific details such as age, device, therapist, and program start date. This information is shown in a structured profile section to give immediate context before the analytic views.

### 4. Analytics and Charts
Session data is analyzed to derive recovery trends, average EMG quality, fatigue levels, exercise accuracy, and response time. These values are visualized through progress, fatigue, exercise, EMG, and radar charts.

### 5. Clinical Intelligence Section
A clinical insights section was implemented to present data-driven recommendations and warnings. These are derived from the rehabilitation dataset and presented in a compact, professional format.

### 6. Session History
The session history section provides expandable cards so reviewers can inspect the details of individual therapy sessions without overwhelming the main dashboard.

### 7. PDF Export
A PDF export feature was added so users can generate a summary report for patient review or clinical handoff. The exported document includes patient information, recovery score, key metrics, recommendations, and session context.

## Technical Challenges and Solutions

- Tailwind color handling caused issues in earlier export attempts. This was resolved by switching to a React-based PDF generation approach that is stable and does not depend on browser canvas parsing.
- The dashboard needed to remain visually consistent while handling missing or incomplete data. Empty states and fallback values were added to keep the experience robust.
- The UI needed to balance detail and readability. This was addressed through structured cards, compact analytics panels, and responsive stacking for smaller screens.

## Why These Technologies Were Chosen

- React was selected for its component-based structure and maintainability.
- Tailwind CSS enabled fast styling and kept the UI consistent with the intended clinical aesthetic.
- Chart.js and react-chartjs-2 were used because they offer reliable, responsive charting support for the required rehabilitation metrics.
- @react-pdf/renderer was chosen for export functionality because it provides a reliable way to generate a professional PDF from React content.

## Future Improvements

- Integrate with a real data source or backend API
- Add filtering and session comparison tools
- Expand the recommendation logic with richer clinical rules
- Add additional accessibility and usability refinements
