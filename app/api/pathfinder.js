const PF = require('pathfinding');

var grid = new PF.Grid(20, 20);

var finder = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true,
    heuristic: PF.Heuristic.chebyshev
});

const traces = [
    [{ x: 5, y: 10 }, { x: 5, y: 6 }, { x: 8, y: 12 }], // downtraces
    [{ x: 6, y: 16 }, { x: 6, y: 17 }, { x: 3, y: 10 }], // uptraces
]
const getWalkablePath = function(traces) {
    for (each in traces) {
        for (points in traces[each]) {
            grid.setWalkableAt(traces[each][points].x, traces[each][points].y, false);
        }
    }
}

const findPathBetween = function(A, B, grid) {
    return path = finder.findPath(A.x, A.y, B.x, B.y, grid);
}

exports.module = { pf: PF, getWalkablePath: getWalkablePath, findPathBetween: findPathBetween }