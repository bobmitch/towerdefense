class State {
    constructor(config) {
        this.state = config.init;
        this.states = config.states;
        this.prev_transition = null;
        this.transitions = config.transitions;
        console.log('State loaded: ',this);
    }

    transition (transition_name) {
        if (this.transitions.hasOwnProperty(transition_name)) {
            if (Array.isArray(this.transitions[transition_name])) {
                if (!this.transitions[transition_name].from.includes(this.state)) {
                    console.warn('Invalid from state (checked multiple) for required transition', transition_name, this);
                    return false;
                }
            }
            else {
                if (this.transitions[transition_name].from != this.state) {
                    console.warn('Invalid from state for required transition', transition_name, this);
                    return false;
                }
            }
            // perform actions
            this.prev_transition = transition_name;
            this.state = this.transitions[transition_name].to;
            this.states[this.state].actions.forEach(action => {
                action(transition_name);
            });
            console.log('Transition complete: ', transition_name, this);
        }
        else {
            console.warn('Unknown transition', transition_name, this);
            return false;
        }
    }
}

export { State };