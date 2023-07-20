const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null, 
			cb_url: process.env.BACKEND_URL
		},
		actions: {
			login: async (email, password) => {
				const cb_url = getStore().cb_url
				const opts = {
				  method: "POST",
				  mode: "cors",
				  headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				  },
				  body: JSON.stringify({
					email: email,
					password: password,
				  }),
				};
				try {
				  const res = await fetch(cb_url + "/api/login", opts);
				 
				  const data = await res.json();
				  sessionStorage.setItem("token", data.access_token);
				 
				  setStore({ token: data.access_token });
				  return true;
				} catch (error) {console.error(error)}
			  },
			  createUser: async (name, email, password, profession, bio, twitter_username, ig_username  ) => {
				const cb_url = getStore().cb_url
				
				const opts = {
				  method: "POST",
				  mode: "cors",
				  headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				  },
				  body: JSON.stringify({
					name: name,
					email: email,
					password: password,
					profession: profession,
					bio: bio,
					twitter_username: twitter_username, 
					ig_username: ig_username

				  }),
				};
				try {
				  const res = await fetch(cb_url + "/api/createUser", opts);
				 
				  const data = await res.json();
				  
				  return true;
				} catch (error) {console.error(error);}
			  },

			  createProfile: async (favorite_book, favorite_genres, favorite_author, number_books_read, favorite_quotes) => {
				const cb_url = getStore().cb_url
				const opts = {
				  method: "POST",
				  mode: "cors",
				  headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				  },
				  body: JSON.stringify({
					favorite_book: favorite_book,
					favorite_genres: favorite_genres,
					favorite_author: favorite_author,
					number_books_read: number_books_read,
					favorite_quotes: favorite_quotes
				  }),
				};
				try {
				  const res = await fetch(cb_url + "/api/profile", opts);
				 
				  const data = await res.json();
				  
				  return true;
				} catch (error) {console.error(error)}
			  },




			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
