var value = 5;
var prom = new Promise(function (res, rej) {
    res(value);
});
var pChain = new PromiseChain(prom);

pChain.then(function (res) {
    console.log("res1", res);
    var prom2 = new Promise(function (res2, rej) {
        // res2(res + 2);
        rej("Heckin error 2");
    });
    return prom2;
})
    .catch(console.warn)
    .catch(console.warn)
    .then(function (res) {
        console.log("res2", res);
        var prom2 = new Promise(function (res2, rej) {
            // res2(res + 2);
            rej("Heckin error");
        });
        return prom2;
    })
    .catch(console.warn)
    .catch(console.warn)
    .catch(console.warn)
    .catch(console.warn)
    .catch(console.warn)
    .catch(console.warn)
    .catch(console.warn)
    .then(function (res) {
        console.log("res3", res);
        var prom2 = new Promise(function (res2, rej) {
            res2(res + 2);
        });
        return prom2;
    })
    .catch(console.warn)
    .then(function (res) {
        console.log("res4", res);
        var prom2 = new Promise(function (res2, rej) {
            res2(res + 2);
        });
        return prom2;
    });