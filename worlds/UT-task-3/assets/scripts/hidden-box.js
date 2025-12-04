'use strict';

AFRAME.registerComponent('hidden-box', {
  schema: {
    pairID:{type:'number',   default:'0'},
    visible:{type:'bool', default:'true'},
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

    //console.log("Initialized!");
  },
  
  select: function() {
    this.el.emit('selected', {id:this.data.pairID, name:this.el.id});
    console.log("Box has been selected! " + this.data.pairID);
  },

  toggleVisible: function() {
    const CONTEXT_AF = this;
    if(CONTEXT_AF.data.visible == true){
        //this.el.setAttribute('circles-interactive-visible', false);
        CONTEXT_AF.el.emit('hide');
        CONTEXT_AF.data.visible = false;
        //this.el.setAttribute('animation', {property: 'circles-interactive-visible', to: 'false', delay: '300'});
    }else{
        //this.el.setAttribute('circles-interactive-visible', true);
        CONTEXT_AF.el.emit('appear');
        CONTEXT_AF.data.visible = true;
        //this.el.setAttribute('animation', {property: 'circles-interactive-visible', to: 'true', delay: '300'});
    }
    
  },
});