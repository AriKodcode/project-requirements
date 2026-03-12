import Papa from "papaparse";
export default async function csvToObj(csv) {
  const result = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
    trimHeaders: true,
  });
  return result.data;
}
