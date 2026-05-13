const API_URL = import.meta.env.VITE_SHEETS_API_URL;

async function fetchSheet(sheet) {
  if (!API_URL) return [];
  const res = await fetch(`${API_URL}?sheet=${sheet}`);
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${sheet}`);
  const json = await res.json();
  return json.data || [];
}

export async function getAbout() {
  const rows = await fetchSheet('about');
  return rows.reduce((acc, row) => {
    acc[row.Field] = row.Value;
    return acc;
  }, {});
}

export async function getWhyMe() {
  return fetchSheet('why_me');
}

export async function getTools() {
  return fetchSheet('tools');
}

export async function getProjects() {
  const rows = await fetchSheet('projects');
  return rows.sort((a, b) => Number(a.order) - Number(b.order));
}

export async function getReviews() {
  const rows = await fetchSheet('reviews');
  return rows.filter((r) => r.visible === 'TRUE');
}

export async function getContact() {
  return fetchSheet('contact');
}

export async function getAllSheetRows(sheet) {
  return fetchSheet(sheet);
}

export async function mutateSheet({ sheet, action, data, rowIndex }) {
  if (!API_URL) throw new Error('Sheets API URL not configured. Add VITE_SHEETS_API_URL to .env');
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sheet, action, data, rowIndex }),
  });
  if (!res.ok) throw new Error('Mutation request failed');
  return res.json();
}
