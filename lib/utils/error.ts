
export function disabledIdentifier(identifier: string): Error {
  return new Error(`sec:violation:id_disabled: The identifier '${identifier}' has been disabled due to security or stability concerns.`);
}

export function unknownIdentifier(identifier: string): Error {
  return new Error(`sec:violation:id_unknown: The identifier '${identifier}' was not found in the known list of identifiers. Please open an issue at https://github.com/amethyst-studio/cryptocipher if you believe this is a mistake.`);
}
