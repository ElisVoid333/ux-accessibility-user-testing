'use strict';

AFRAME.registerComponent('hidden-box', {
  schema: {
    pairID:{type:'number',   default:'0'},
  },
  init: function() {
    const CONTEXT_AF = this;

    CONTEXT_AF.el.addEventListener('click', function() {
        CONTEXT_AF.select();
        CONTEXT_AF.toggleVisible();
        console.log("Box has been clicked!");
    });

    CONTEXT_AF.el.addEventListener('reset', function() {
        CONTEXT_AF.toggleVisible();
        console.log("Box has been reset!");
    });

    console.log("Initialized!");
  },
  
  select: function() {
    this.el.emit('selected', {id:this.data.pairID, name:this.el.id});
    console.log("Box has been selected! " + this.data.pairID);
  },

  toggleVisible: function() {
    if(this.el.getAttribute('circles-interactive-visible') == true){
        this.el.setAttribute('circles-interactive-visible', false);
    }else{
        this.el.setAttribute('circles-interactive-visible', true);
    }
    
  },
});