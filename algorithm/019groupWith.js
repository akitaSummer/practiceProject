const R = require('ramda')

R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 11])

R.groupWith((a, b) => a + 1 === b, [0, 1, 2, 3, 5, 8, 13, 21])

R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])

R.groupWith(R.eqBy(isVowel), 'aestiou')