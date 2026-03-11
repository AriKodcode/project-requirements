export const createReportService = (category, urgency, message) => {
  if (!category || !urgency || !message) {
    const error = new Error("category and urfency and message are required");
    error.status = 400;
    throw error;
  }
};
export const createReportByCsvService = (csv) => {
  if (!csv) {
    const error = new Error("missing csv file");
    error.status = 400;
    throw error;
  }
  const { category, urgency, message } = csv[0];
  if (!category || !urgency || !message) {
    const error = new Error("category and urfency and message are required");
    error.status = 400;
    throw error;
  }
  const reports = csv.map((report) => {
    const { category, urgency, message } = report;
    const newReport = {
      category,
      urgency,
      message,
    };
    return newReport;
  });

  return reports;
};
