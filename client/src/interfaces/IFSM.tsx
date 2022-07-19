import React from 'react';

export interface IState {
    Action: () => void;
    OnExit: () => void;
}

export interface IJsxState {
    Action: () => JSX.Element;
    OnExit: () => void;
}

export interface ITransition {
    condition: () => boolean;
    to: IState | IJsxState;
}

export class StateMachine {
    currentState: IState | IJsxState;
    transitions: Map<IState | IJsxState, ITransition[]>;
    currentTransitions: ITransition[];
    anyTransitions: ITransition[];

    constructor(initialState: IState | IJsxState) {
        this.currentState = initialState;
        this.transitions = new Map<IState | IJsxState, ITransition[]>();
        this.currentTransitions = [] as ITransition[];
        this.anyTransitions = [] as ITransition[];
    }

    Update() {
        const transition = this.GetTransition();
        if (transition) {
            this.currentState = transition.condition() ? transition.to : this.currentState;
            return this.UpdateCurrentState();
        }
    }

    UpdateCurrentState() {
        return this.currentState.Action();
    }

    AddTransition(from: IState | IJsxState, to: IState | IJsxState, condition: () => boolean) {
        if (!this.transitions.has(from)) {
            this.transitions.set(from, [] as ITransition[]);
        }
        const transitions = [] as ITransition[];
        transitions.push({ condition, to });
        this.transitions.set(from, transitions);
    }

    GetTransition() {
        const anyTransition = this.anyTransitions.find(t => t.condition());
        if (anyTransition) {
            return anyTransition;
        }
        const currentTransition = this.currentTransitions.find(t => t.condition());
        if (currentTransition) {
            return currentTransition;
        }
    }
}