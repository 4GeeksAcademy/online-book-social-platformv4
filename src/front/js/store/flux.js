const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null, 
			backurl: process.env.BACKEND_URL,
			profile: [],
			currentUser: null
			// backurl: "https://crob001-literate-umbrella-g99pg94vp4vcwqv6-3001.app.github.dev",
			fronturl: "https://crob001-literate-umbrella-g99pg94vp4vcwqv6-3000.app.github.dev",
			discussions: []
		},
		actions: {
			login: async (email, password) => {
				const backurl = getStore().backurl
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
				  const res = await fetch(backurl + "/api/login", opts);
				 
				  const data = await res.json();
				  sessionStorage.setItem("token", data.access_token);
				 console.log(data)
				  setStore({ token: data.access_token, currentUser:data.user });
				  return true;
				} catch (error) {console.error(error)}
			  },
			  createUser: async (name, email, password, profession, bio, twitter_username, ig_username  ) => {
				const backurl = getStore().backurl
				
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
				  const res = await fetch(backurl + "/api/createUser", opts);
				 
				  const data = await res.json();
				  console.log(data)
				if (data.status==="true") {
					window.location.href="https://techprenuer1-studious-carnival-9vrpvq5q4ppc77xv-3000.app.github.dev/signin"
				}
				  
				  return true;
				} catch (error) {console.error(error);}
			  },

			  updateProfile: async (favorite_book, favorite_genres, favorite_author, number_books_read, favorite_quotes) => {
				const backurl = getStore().backurl
				const opts = {
				  method: "POST",
				  mode: "cors",
				  headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					Authorization: "Bearer " + sessionStorage.getItem("token")
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
					console.log(backurl+"/api/profile")
				  const res = await fetch(backurl + "/api/profile", opts);
				 
				  const data = await res.json();
				  
				  return true;
				} catch (error) {console.error(error)}
			  },

			  getProfile: async () => {
				const store = getStore();
				const opts = {
				  method: "GET",
				  mode: "cors",
				  headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					Authorization: "Bearer " + store.token,
				  },
				};
				try {
				  const response = await fetch(store.backurl + "/api/profile", opts);
				  const data = await response.json();
				  console.log(store.token, "this is data") ;
				  console.log(process.env.BACKEND_URL, "this is routes");
				  setStore({ profile: data });
				} catch (error) {
				  console.error(error);
				}
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
			}, 
			syncSessionToStore: () => {
                let ssToken = sessionStorage.getItem('token')
                setStore({ token:ssToken })
            },
            getAllDiscussions: () => {
                let backurl = getStore().backurl
                fetch(backurl + "/api/discussions")
                .then((res) => res.json())
                .then((data) => {
                    setStore({ discussions: data });
                })
                .catch((error) => {
                    console.error("GET ALL DISCUSSIONS flux",error);
                });
            },

			createAccount: async (name, email, password, profession, bio, twitter, ig) => {
				let backurl=getStore().backurl
				let fronturl=getStore().fronturl
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
					twitter: twitter, 
					ig: ig
				  }),
				};
				try {
				  const res = await fetch(backurl + "/api/createAccount", opts);
				 
				  const data = await res.json();
					if(data.status==="true"){
						window.location.href= fronturl 
					}
				  return true;
				} catch (error) {console.error(error);}
			  },
			  login: async (email, password) => {
				const backurl = getStore().backurl
				const fronturl=getStore().fronturl
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
				  const res = await fetch(backurl + "/api/login", opts);
				  const data = await res.json();
				  sessionStorage.setItem("token", data.access_token);
				  setStore({ token: data.access_token });
				  if(data.status==="true"){
					window.location.href= fronturl + "/profile"
				}
					syncSessionToStore()
				  return true;
				} catch (error) {console.error(error)}
			  },

		}
	};
};

export default getState;
