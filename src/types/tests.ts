export type TestResults = boolean[];

export type TestFunction = () => {
  encodingResults: TestResults;
  decodingResults: TestResults;
};
