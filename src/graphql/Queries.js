import { gql } from '@apollo/client'

export const READ_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            status
            message
            results {
                url
                name
                image
            }
        }
    }
`

export const READ_POKEMON = gql`
query pokemon($name: String!) {
    pokemon(name: $name) {
        id
        name
            abilities {
                ability {
                    name
                }
            }
            moves {
                move {
                    name
                }
            }
            types {
                type {
                    name
                }
            }
            message
            status
        }
    }
`