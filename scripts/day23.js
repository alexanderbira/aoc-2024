// I can't wait to see how concise the Python solutions are
import read from "../read.ts";
import Graph from "graphology";

const input = await read(23);
const pairs = input.split("\n").map(pair => pair.split("-"));

const graph = new Graph({type: "undirected"});

for (const [src, dest] of pairs) {
  if (!graph.hasNode(src)) graph.addNode(src);
  if (!graph.hasNode(dest)) graph.addNode(dest);
  graph.addEdge(src, dest);
}

const triplets = new Set();
const findLoops = (start, path, curr, n) => {
  if (n === 0) {
    if (curr === start) {
      triplets.add(Array.from(path).sort().join(","));
    }
    return;
  }

  for (const neighbour of graph.neighbors(curr)) {
    if (path.has(neighbour)) continue;

    path.add(neighbour);
    findLoops(start, path, neighbour, n - 1);
    path.delete(neighbour);
  }
}

for (const start of graph.nodes()) {
  findLoops(start, new Set(), start, 3);
}

console.log(
  Array.from(triplets)
    .filter(triplet => triplet
      .split(",")
      .some(node => node.startsWith("t"))
    ).length
);

/**
 * Converted from Python to JS by Copilot
 * @cite https://networkx.org/documentation/stable/_modules/networkx/algorithms/clique.html#find_cliques
 */
function* findCliques(graph, nodes = null) {
  if (graph.order === 0) return;

  const adj = {};
  graph.forEachNode(node => {
    adj[node] = new Set(graph.neighbors(node).filter(v => v !== node));
  });

  const Q = nodes ? [...nodes] : [];
  let cand = new Set(graph.nodes());
  for (const node of Q) {
    if (!cand.has(node)) {
      throw new Error(`The given nodes ${nodes} do not form a clique`);
    }
    cand = new Set([...cand].filter(x => adj[node].has(x)));
  }

  if (cand.size === 0) {
    yield Q.slice();
    return;
  }

  let subg = new Set(cand);
  const stack = [];
  Q.push(null);

  let u = [...subg].reduce((a, b) => (adj[a].size > adj[b].size ? a : b));
  let ext_u = new Set([...cand].filter(x => !adj[u].has(x)));

  try {
    while (true) {
      if (ext_u.size > 0) {
        const q = ext_u.values().next().value;
        ext_u.delete(q);
        cand.delete(q);
        Q[Q.length - 1] = q;
        const adj_q = adj[q];
        const subg_q = new Set([...subg].filter(x => adj_q.has(x)));
        if (subg_q.size === 0) {
          yield Q.slice();
        } else {
          const cand_q = new Set([...cand].filter(x => adj_q.has(x)));
          if (cand_q.size > 0) {
            stack.push([subg, cand, ext_u]);
            Q.push(null);
            subg = subg_q;
            cand = cand_q;
            u = [...subg].reduce((a, b) => (adj[a].size > adj[b].size ? a : b));
            ext_u = new Set([...cand].filter(x => !adj[u].has(x)));
          }
        }
      } else {
        Q.pop();
        [subg, cand, ext_u] = stack.pop();
      }
    }
  } catch (e) {
    if (!(e instanceof TypeError)) throw e;
  }
}

let maxClique = [];
for (const clique of findCliques(graph)) {
  if (clique.length > maxClique.length) maxClique = clique;
}
console.log(maxClique.sort().join());
