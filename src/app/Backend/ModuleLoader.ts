declare var System: any;

export function loadNodeModule(name: string): any{
  return System._nodeRequire(name);
}
