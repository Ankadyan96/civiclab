
# 📊 All Data Listing Page — CivicDataSpace

This project is a responsive **dataset listing interface** built with **Next.js (App Router)** and **Tailwind CSS**, implementing filters, pagination, and search as per the **Senior Frontend Engineer assignment** by CivicDataSpace.

## 🚀 Features

- 🔍 **Search datasets** by title or keywords.
- 🎛 **Filter sidebar** with support for:
  - Sectors
  - Data Types
  - Time Periods (Auto-grouped)
  - Tags
  - Licenses *(if available)*
  - Geographies
- 📄 **Grid and List views** toggle
- 📄 **Pagination**:
  - Page numbers
  - Rows per page selection
  - First, Previous, Next, Last navigation buttons
- 🖼 **Organization logo**, dataset metadata, and descriptions
- 📱 Fully **responsive** (mobile-first design)
- ⚙️ Integrated with live API: [`https://api.datakeep.civicdays.in/api/search/dataset/`](https://api.datakeep.civicdays.in/api/search/dataset/)

## 🏗 Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Loading State**: Geist UI Spinner

## 📁 Folder Structure

\`\`\`
src/
├── app/
│   └── page.js                  # Main home page layout
├── components/
│   ├── common/
│   │   └── Header.jsx           # Top header bar
│   ├── AllData.jsx              # Main content listing with pagination
│   └── FilteredSidebar.jsx      # Sidebar filters with checkboxes
├── assets/
│   └── Images/                  # (Optional) Static assets
\`\`\`

## 🔧 How to Run Locally

1. **Clone this repo**
   \`\`\`bash
   git clone https://github.com/your-username/civic-dataset-assignment.git
   cd civic-dataset-assignment
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. Visit [http://localhost:3000](http://localhost:3000) in your browser.



## 🧑‍💻 Developed by

**Ankit Kadyan**  
Frontend Developer
