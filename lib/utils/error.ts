
export function disabledIdentifier(identifier: string): Error {
  return new Error(`sec:violation:id_disabled: This identifier [${identifier}] has been disabled due to security or stability concerns.`);
}

export function unknownIdentifier(identifier: string): Error {
  return new Error(`sec:violation:id_unknown: This identifier [${identifier}] was not found in the known list.`);
}
