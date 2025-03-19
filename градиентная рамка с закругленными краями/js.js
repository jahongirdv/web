class SvgToggleEffect {
    constructor(effect) {
      this.nodes = [...effect.nodes].map(node => SVG(node));
      this.animating = false;
  
      if (effect.random) {
        this.randomizeArray(this.nodes);
      }
  
      effect.element.addEventListener("change", () => {
        if (!this.animating) {
          this.animating = true;
          if (effect.element.checked) {
            effect.element.nextElementSibling.classList.add('checked')
          } else {
            effect.element.nextElementSibling.classList.remove('checked')
          }
          effect.handler(this.nodes, !effect.element.checked, effect.duration, effect.offset);  
          
          setTimeout(() => {
            this.animating = false;
          }, effect.duration + (effect.offset * this.nodes.length));
        }
        
      });
    }
  
    randomizeArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
  
  const svgOffset = (nodes = [], reverse = false, duration = 100, offset = 10) => {
    if (reverse) {
      for (let index = 0; index <= nodes.length - 1; index++) {
        setTimeout(() => {
          nodes[index].animate({ duration: duration }).transform({ translate: 0 });
        }, index * offset);
      }
    } else {
      let count = -1;
      for (let index = nodes.length - 1; index >= 0; index--) {
        count++;
        setTimeout(() => {
          nodes[index].animate({ duration: duration }).transform({ translate: 48 });
        }, count * offset);
      }
    }
  };
  
  
  const svgRotate = async (nodes = [], reverse = false, duration = 100, offset = 10) => {
    if (reverse) {
      for (let index = 0; index <= nodes.length - 1; index++) {
        setTimeout(() => {
          nodes[index].animate({ duration: duration }).transform({ translate: 0, rotate: 0 });
        }, index * offset);
      }
    } else {
      let count = -1;
      for (let index = nodes.length - 1; index >= 0; index--) {
        count++;
        setTimeout(() => {
          nodes[index].animate({ duration: duration }).transform({ translate: 48, rotate: 180 });
        }, count * offset);
      }
    }
  };
  
  const svgSlip = async (nodes = [], reverse = false, duration = 100, offset = 10) => {
    nodes.forEach((node, index) => {
      setTimeout(() => {
        if (reverse) {
          node.animate({ duration: duration }).transform({ translateY: 32, translateX: 48 })
              .animate({ duration: 1, delay: duration }).transform({ translateX: 0, translateY: 32 })
              .animate({ duration: duration, delay: duration}).transform({ translateY: 0, translateX: 0 });
        } else {
          node.animate({ duration: duration }).transform({ translateY: 32 })
              .animate({ duration: 1, delay: duration }).transform({ translateX: 48, translateY: 32 })
              .animate({ duration: duration, delay: duration }).transform({ translateY: 0, translateX: 48 });
        }
      }, index * offset);
    });
  };
  
  SVG.on(document, "DOMContentLoaded", () => {
    const offsetToggle = document.getElementById("offset-toggle-control");
    const offsetRotateToggle = document.getElementById("offset-rotate-toggle-control");
    const rotateToggle = document.getElementById("rotate-toggle-control");
    const slipToggle = document.getElementById("slip-toggle-control");
    const randomToggle = document.getElementById("random-toggle-control");
    const orderlyToggle = document.getElementById("orderly-toggle-control");
  
    const offset = {
      element: offsetToggle,
      handler: svgOffset,
      offset: 25,
      duration: 250,
      random: false,
      nodes: offsetToggle.nextElementSibling.querySelectorAll(".switch .col")
    };
    
    const offsetRotate = {
      element: offsetRotateToggle,
      handler: svgRotate,
      offset: 15,
      duration: 250,
      random: false,
      nodes: offsetRotateToggle.nextElementSibling.querySelectorAll(".switch .col")
    };
    
    const rotate = {
      element: rotateToggle,
      handler: svgRotate,
      offset: 0,
      duration: 250,
      random: true,
      nodes: rotateToggle.nextElementSibling.querySelectorAll(".switch .col")
    };
    
    const slip = {
      element: slipToggle,
      handler: svgSlip,
      offset: 12,
      duration: 175,
      random: true,
      nodes: slipToggle.nextElementSibling.querySelectorAll(".switch .col")
    };
    
    const random = {
      element: randomToggle,
      handler: svgOffset,
      offset: 1,
      duration: 200,
      random: true,
      nodes: randomToggle.nextElementSibling.querySelectorAll(".switch rect")
    };
    
    const orderly = {
      element: orderlyToggle,
      handler: svgOffset,
      offset: 5,
      duration: 200,
      random: false,
      nodes: orderlyToggle.nextElementSibling.querySelectorAll(".switch rect")
    };
  
    new SvgToggleEffect(offset);
    new SvgToggleEffect(offsetRotate);
    new SvgToggleEffect(rotate);
    new SvgToggleEffect(slip);
    new SvgToggleEffect(random);
    new SvgToggleEffect(orderly);
  });
  