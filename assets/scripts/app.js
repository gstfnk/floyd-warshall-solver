new Vue({
    el: '#matrix-table',
    data: {
        matrix: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ],
        fromNode: 0,
        toNode: 0,
    },
    methods: {
        add: function () {
            if (this.isMax) {
                return;
            }
            const curr = this.matrix.length;
            this.matrix.push([null]);
            for (let i = 0; i < curr; i++) {
                this.matrix[i].push(null);
                this.matrix[this.matrix.length - 1].push(null);
            }
        },
        del: function () {
            if (this.isMin) {
                return;
            }
            this.matrix.splice(this.matrix.length - 1, 1);
            for (const row of this.matrix) {
                row.splice(row.length - 1, 1);
            }
        }
    },
    computed: {
        isMax: function () {
            return this.matrix.length >= 10;
        },
        isMin: function () {
            return this.matrix.length <= 2;
        },
        nodesCount: function () {
            return this.matrix.length;
        },
        preparedMatrix: function () {
            var dist = [];
            var size = this.matrix.length;
            for (var i = 0; i < size; i += 1) {
                dist[i] = [];
                for (var j = 0; j < size; j += 1) {
                    const x =  this.matrix[i][j];

                    if (i === j) {
                        dist[i][j] = 0;
                    } else if (x === null || isNaN(x)) {
                        dist[i][j] = Infinity;
                    } else {
                        dist[i][j] = parseInt(x);
                    }
                }
            }
            return dist;
        },
        calculatedMatrix: function () {
            const dist = this.preparedMatrix;
            var size = this.matrix.length;
            for (var k = 0; k < size; k += 1) {
                for (var i = 0; i < size; i += 1) {
                    for (var j = 0; j < size; j += 1) {
                        if (dist[i][j] > dist[i][k] + dist[k][j]) {
                            dist[i][j] = dist[i][k] + dist[k][j];
                        }
                    }
                }
            }
            return dist;
        },
        matrixOutput: function () {
            return this.calculatedMatrix[this.fromNode][this.toNode];
        }
    }
})

