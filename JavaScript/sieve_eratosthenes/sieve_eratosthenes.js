/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

var sieve = function (n) {
    "use strict";

    var array = [], primes = [], i, j;

    for(var i = 0; i < n; i++){
        array.push(i);
    }

    for(var i = 0; i < n; i++){
        primes.push(true);
    }

    for (var i = 2; i <= Math.sqrt(n); i++) {
        if (array[i]) {
            for (var j = i * i; j < n; j += i) {
                primes[j] = false;
            }
        }
    }

    return primes;
};
console.log(sieve(1000000));