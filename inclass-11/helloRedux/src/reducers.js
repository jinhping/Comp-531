
const Reducer = (state =  {
	nextId: 2,
	todoItems: [
	    {id: 0, text: "This is an item", done: false},
	    {id: 1, text: "Another item", done: false}
	]
}, action) => {
	switch(action.type) {
		case 'ADD_TODO':
			// IMPLEMENT ME
			state =  {
				nextId : state.nextId + 1, 
				todoItems : [
								...state.todoItems, {id: state.nextId + 1, text: action.text , done: false},
	    					]
	    	} 			 
			return state;
		case 'REMOVE_TODO':
			// IMPLEMENT ME
			state =  {
				nextId : state.nextId, 
				todoItems : state.todoItems.filter(({id,text,done}) => {return id != action.id} ) 
	    					
			}
			return state;
		case 'TOGGLE_TODO':
			// IMPLEMENT ME
			state = {
				nextId : state.nextId, 
				todoItems : state.todoItems.map(({id,text,done}) => {
					if(id == action.id) {
						return {id:id, text:text, done:!done};
					} else {
						return {id:id, text:text, done:done};
					}
				} ) 
			}
			return state	
		default: 
			return state
	}
}


export default Reducer