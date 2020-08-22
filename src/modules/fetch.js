
const dbUrl = "https://grunvald-shop.firebaseio.com"
const key = "AIzaSyDej-OXDlMXnxacCMYvPU32QtQJtSXoSm8"

export class Rest {
	name = ""

	static async auth(email, password, method) {
		const response = await fetch(`
		https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=${key}`, {
			method: 'POST',
			body: JSON.stringify({
				email, password, returnSecureToken: true
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		return await response.json()
	}

	static new(obj, where, idToken) {
		return fetch(`
		${dbUrl}/${where}.json?auth=${idToken}`, {
			method: 'POST',
			body: JSON.stringify(obj),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	static newUser(name, email, tel) {
		return fetch(`
		${dbUrl}/users.json`, {
			method: 'POST',
			body: JSON.stringify({
				name,
				email,
				tel,
				status: 'user'
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	static delete(where, id, idToken) {
		return fetch(`
		${dbUrl}/${where}.json?auth=${idToken}`, {
			method: 'PATCH',
			body: JSON.stringify({[id]: null}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	static update(obj, where, whereId, idToken) {
		return fetch(`
		${dbUrl}/${where}.json?auth=${idToken}`, {
			method: 'PATCH',
			body: JSON.stringify({[whereId]: obj}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	static getMessagesByTheme(where, idToken) {
		return fetch(`${dbUrl}/${where}.json?auth=${idToken}`)
		.then(response => response.json())
	}

	static getUser(email, idToken) {
		return fetch(`
		${dbUrl}/users.json?
		auth=${idToken}&
		orderBy="email"&
		equalTo="${email}"`)
		.then(response => response.json())
	}

}