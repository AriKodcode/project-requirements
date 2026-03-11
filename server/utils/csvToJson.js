export default function csvToObj(csv) {
  const rows = csv.split("\n");
  const headers = rows[0].split(",");

  const json = rows.slice(1).map((row) => {
    const values = row.split(",");
    let obj = {};

    headers.forEach((header, index) => {
      obj[header] = values[index];
    });

    return obj;
  });
  return json;
}
