export type AttackResultsType = { key: number; value: string }[];

export type AttackFunction = (cipher: string, alphabet: string) => AttackResultsType;
