const continents = [
    {
        "_id" :1,
        "name": "Africa"
    },
    {
        "_id" :2,
        "name": "Europe"
    },
    {
        "_id" :3,
        "name": "Asia"
    },
    {
        "_id" :4,
        "name": "North America"
    },
    {
        "_id" :5,
        "name": "South America"
    },
    {
        "_id" :6,
        "name": "Australia"
    },
    {
        "_id" :7,
        "name": "Antarctica"
    }
]


const prices = [
    {
        "_id": 0,
        "name": "Any",
        "array": []
    },
    {
        "_id": 1,
        "name": "$0 to $3000",
        "array": [0, 3000]
    },
    {
        "_id": 2,
        "name": "$3001 to $5000",
        "array": [3001, 5000]
    },
    {
        "_id": 3,
        "name": "$5001 to $6000",
        "array": [5001, 6000]
    },
    {
        "_id": 4,
        "name": "$6001 to $10000",
        "array": [6001, 10000]
    },
    {
        "_id": 5,
        "name": "$10001 to $50000",
        "array": [10001, 50000]
    }
]

export {
    continents,
    prices
}