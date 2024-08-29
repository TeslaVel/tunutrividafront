// mockSessionDataChart.js

export const mockSessionDataChart = {
  data: {
    sessionDataChart: {
      days: ["23-03-2023", "23-04-2023", "23-05-2023", "23-06-2023"],
      imc: ["31.2", "30.92", "30.5", "30.1"],
      weight: ["78.0", "77.3", "76.5", "75.8"],
      bodyGrease: ["42.7", "42.0", "41.5", "41.0"],
      muscleMass: ["25.7", "26.0", "26.3", "26.5"],
      __typename: "SessionDataChart"
    }
  }
};

export function mockUseGetSessionDataChart() {
  return {
    loading: false,
    error: null,
    data: mockSessionDataChart.data,
    refetch: () => Promise.resolve(mockSessionDataChart)
  };
}