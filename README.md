Vehicle Filter App

This is a web application for filtering vehicles by make and year, built using Next.js and Tailwind CSS. The data is retrieved from the vpic.nhtsa.dot.gov API.

Application features:

- Filtering cars by make and year of manufacture (from 2015 to the current year)
- Asynchronous data loading using Suspense
- Fully responsive interface using Tailwind CSS
- Error handling and user notifications
- Navigating to results via dynamic routes /result/[makeId]/[year]
- Application architecture
  Next.js (App Router, use client for client components)
  Tailwind CSS for styling

Pages:
/ — home page with filter
/result/[makeId]/[year] — results page

Components:
Dropdowns for selecting make and year
Go button with validation

Data fetching:
getStaticParams for route generation
Suspense for managing download states

How to start the project:

1. Clone the repository:
   git clone <URL_of_your_repository>
   cd vehicle-filter-app

2. Install dependencies:
   npm install

3. Create .env.local file:
   NEXT_PUBLIC_API_URL=https://vpic.nhtsa.dot.gov/api

4. Start local server:
   npm run dev

5. Go to http://localhost:3000 in browser.

How to build the project:

npm run build
npm start

Technologies:

Next.js 14+
Tailwind CSS
React 18+
