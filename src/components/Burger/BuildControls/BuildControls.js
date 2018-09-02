import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { Label: 'Salad', type: 'salad'},
    { Label: 'Bacon', type: 'bacon'},
    { Label: 'Cheese', type: 'cheese'},
    { Label: 'Meat', type: 'meat'},
]

const buildcontrols = (props) => (
    <div className={classes.BuildControls}>
        {controls.map( ctrl  => (
            <BuildControl 
                key={ctrl.Label} 
                label={ctrl.Label} 
                added={ () => props.ingredientAdded(ctrl.type)}
                removed={ () => props.ingredientRemoved(ctrl.type)}
                disabledInfo={props.disabledInfo[ctrl.type]}
            />
        ) )}
    </div>
);

export default buildcontrols;