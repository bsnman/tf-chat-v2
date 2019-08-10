

export default {
	state: {
		currentUser: {}
	},
	getters: {
		getCurrentUser: state => state.currentUser
	},
	mutations: {
		setCurrentUser(state, v) {
			state.currentUser = v
		}
	},
	actions: {
		getCurrentUser(context) {
			
		}
	}
}