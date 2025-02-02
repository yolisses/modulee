/* tslint:disable */
/* eslint-disable */
export function set_panic_hook(): void;
export function initialize_logging(): void;
export function greet(): void;
export class Graph {
  free(): void;
  get_debug_value(): number;
  set_debug_string(debug_string: string): void;
  set_nodes(nodes_data: string): void;
  constructor();
  static destroy_graph_pointer(ptr: number): void;
  process_block(buffer: Float32Array, length: number): void;
}
