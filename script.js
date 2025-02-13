/* Ottieni il titolo di un post con una Promise.

Crea una funzione getPostTitle(id) che accetta un id 
e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}

🎯 Bonus: Ottieni l'intero post con l'autore
Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user 
che contiene i dati dell'autore, 
recuperati dalla chiamata https://dummyjson.com/users/{post.userId}. */



const getPostTitle = id => {
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(res => res.json())
            .then(obj => resolve(obj.title))
            .catch(reject)
    })
}

getPostTitle(1)
    .then(title => console.log(title))
    .catch(err => console.error(err))

const getPost = id => {
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(res => res.json())
            .then(post => {
                fetch(`https://dummyjson.com/users/${post.userId}`)
                    .then(res => res.json())
                    .then(user => resolve({ ...post, user }))
                    .catch(reject)
            })
            .catch(reject)
    })
}

getPost(1)
    .then(post => console.log(post))
    .catch(err => console.error(err))


/* 🏆 Snack 2
Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. 
Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.


🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. 
Se il numero esce due volte di fila, stampa "Incredibile!". */


function lanciaDado() {
    return new Promise((resolve, reject) => {
        console.log("Sto lanciando il dado");
        setTimeout(() => {
            const numero = Math.floor(Math.random() * 6) + 1

            if (Math.random() < 0.2) {
                reject("il dado si è incastrato")
            } else {
                resolve(numero)
            }
        }, 3000);
    })
}

lanciaDado()
    .then(result => console.log("Il risultato del dado è:", result))
    .catch(err => console.error(err));


function creaLanciaDado() {
    let ultimoLancio = null;
    return function () {
        return new Promise((resolve, reject) => {
            console.log("Sto lanciando il dado");
            setTimeout(() => {
                const numero = Math.floor(Math.random() * 6) + 1

                if (Math.random() < 0.2) {
                    reject("il dado si è incastrato")
                } else {
                    if (numero === ultimoLancio) {
                        console.log("Incredibile, stesso numero di prima")
                    }
                    ultimoLancio = numero;
                    resolve(numero)
                }
            }, 3000);
        })
    }

}

const lancia = creaLanciaDado()

lancia()
    .then(result => console.log("Il risultato del dado è:", result))
    .catch(err => console.error(err));

lancia()
    .then(result => console.log("Il risultato del dado è:", result))
    .catch(err => console.error(err));