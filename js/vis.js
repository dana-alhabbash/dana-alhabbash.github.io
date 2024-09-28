//flag animation
let triangle = document.getElementById('triangle');
let growing = true;
let size = 100; 

function animateFlag() {
    if (growing) {
        size += 3;
        if (size >= 110) { 
            growing = false;
        }
    } else {
        size -= 2;
        if (size <= 90) { 
            growing = true;
        }
    }
    //here I used AI to set the attributes because it wasnt working like how i wanted
    triangle.setAttribute("points", `0,0 ${size},100 0,200`);
}
setInterval(animateFlag, 100);


// Create and render the bar charts for all visualizations
async function render() {
    // Load data
    const data = await d3.csv("dataset/videogames_wide.csv"); 
    
  
    // Visualization 1: Global Sales by Genre and Platform
    const vlSpec1 = vl
      .markBar()
      .data(data)
      .encode(
        vl.y().fieldN("Platform").sort("-x"),
        vl.x().fieldQ("Global_Sales").aggregate("sum"),
        vl.color().fieldN("Genre"),
      )
      .width("container") 
      .height(400)
      .toSpec();
  
    vegaEmbed("#chart1", vlSpec1).then((result) => {
        const view = result.view;
        view.run();
    });
  
    // Visualization 2: Sales Over Time by Platform and Genre
    const vlSpec2 = vl
      .markBar()
      .data(data)
      .encode(
        vl.x().fieldT("Year"),
        vl.y().fieldQ("Global_Sales").aggregate("sum"),
        vl.color().fieldN("Platform"),
        vl.detail().fieldN("Genre")
      )
      .width("container")
      .height(400)
      .toSpec();
  
    vegaEmbed("#chart2", vlSpec2).then((result) => {
        const view = result.view;
        view.run();
    });
  
    // Visualization 3: Regional Sales vs. Platform
    // Visualization 4: Custom Story Visualization
    
  
   
  }
  
  // Call render to create all the charts
  render();
  
  
