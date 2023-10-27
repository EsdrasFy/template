declare module "js-cookie" {
  export function get(name: string): string | null;
  export function set(name: string, value: string, options?: object): void;
  export function remove(name: string, options?: object): void;
  export function getJSON(name: string): object | null;
  export function setJSON(name: string, value: object, options?: object): void;
}
