import network from './network'

function read(endpoint) {
    return network(endpoint)
}

function create(endpoint, data) {
    return network(endpoint, {body: data})
}

// function update(endpoint, updates) {
//     return network(endpoint, {
//         method: 'PUT',
//         body: updates
//     })
// }

export { read, create } 