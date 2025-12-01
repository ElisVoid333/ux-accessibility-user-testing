'use strict';
const FirstState = 'FIRST';
const SecondState = 'SECOND';
const CompareState = 'COMPARE';
const ResetState = 'RESET';
const NextState = 'NEXT';
const FinishState = 'FINISH';

let GameState = 'DEFAULT';

AFRAME.registerComponent('puzzle-manager', {
    schema: {
        pairID:{type:'number',   default:'0'},
        firstID:{type:'string',   default:''},
        secondID:{type:'string',   default:''},
        matches:{type:'number',   default:'0'},
    },

    init: function() {
        const CONTEXT_AF = this;

        CONTEXT_AF.el.addEventListener('selected', function(evt) {
            if(GameState == 'DEFAULT' || GameState == NextState){
                GameState = FirstState;
                CONTEXT_AF.data.pairID = evt.detail.id;
                CONTEXT_AF.data.firstID = evt.detail.name;
            }else if(GameState == FirstState){
                GameState = SecondState;
                CONTEXT_AF.data.secondID = evt.detail.name;
                CONTEXT_AF.compareBox(evt.detail.id);
            }
        });
    },

    compareBox: function(id){
        const CONTEXT_AF = this;
        const data = this.data;
        console.log('Compare Boxes with ID: ' + id);
        GameState = CompareState;
        
        if(id == data.pairID){
            console.log('They match!');
            CONTEXT_AF.data.matches++;

            if(CONTEXT_AF.data.matches < 2){
                GameState = NextState;
            }else{
                GameState = FinishState;
                console.log('Finished!');
            }
        }else{
            document.getElementById(data.firstID).emit('reset');
            document.getElementById(data.secondID).emit('reset');

            
            CONTEXT_AF.data.pairID = 0;
            CONTEXT_AF.data.firstID = '';
            CONTEXT_AF.data.secondID = '';

            GameState = NextState;
        }
    }
});