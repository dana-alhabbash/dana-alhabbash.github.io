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

//Genre
const vlSpec1 = vl
.markBar({ color: 'purple' })
.data(data)
.encode(
  vl.y().fieldN("Genre"),
  vl.x().fieldQ("Global_Sales").aggregate("sum"),
  vl.tooltip().fieldN("Name")
)
.width(400)
.height(400)
.toSpec();

//Platform
const vlSpec2 = vl
.markBar({ color: 'green' })
.data(data)
.encode(
  vl.x().fieldQ('Global_Sales').aggregate('sum'),
  vl.y().fieldN('Platform').sort('-x'),
  vl.tooltip().fieldN('Platform')
)
.width(400)
.height(400)
.toSpec();

const combinedSpec = vl.hconcat(vlSpec1, vlSpec2).toSpec();

vegaEmbed("#combinedChart", combinedSpec).then((result) => {
const view = result.view;
view.run();
});

  
//Visualization 2: Sales Over Time by Platform and Genre
// Genre
const vlSpec3 = vl
.markArea()
  .data(data)
  .transform(
    vl.filter("datum.Year != 'N/A'"),
    vl.filter("datum.Year != 'Misc'")
  )
  .encode(
    vl.x().fieldN('Year'),
    vl.y().fieldQ('Global_Sales').aggregate('sum'),
    vl.color().fieldN('Genre').scale({scheme: 'tableau10'}),
    vl.tooltip().fieldN('Genre')
  )
  .width(400)
  .height(400)
  .toSpec();

  vegaEmbed("#chart3", vlSpec3).then((result) => {
    const view = result.view;
    view.run();
  });

const vlSpec4 = vl
.markArea()
  .data(data)
  .transform(
    vl.filter("datum.Year != 'N/A'"),
    vl.filter("datum.Year != 'Misc'")
  )
  .encode(
    vl.x().fieldN('Year'),
    vl.y().fieldQ('Global_Sales').aggregate('sum'),
    vl.color().fieldN('Platform').scale({scheme: 'spectral'}),
    vl.tooltip().fieldN('Platform')
  )
  .width(400)
  .height(400)
  .toSpec();

  vegaEmbed("#chart4", vlSpec4).then((result) => {
    const view = result.view;
    view.run();
  });

// Visualization 3: Regional Sales vs. Platform
const vlSpec5 = vl
  .markBar({ color: 'blue' })
  .data(data)
  .encode(
    vl.x().fieldQ({repeat: "repeat"}).aggregate('sum'), 
    vl.y().fieldN('Platform').sort('-x'),
   )
  
  .width(480)
  .height(400)
  .repeat( ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"])
  .columns(2)
  .toSpec();

vegaEmbed("#chart5", vlSpec5).then((result) => {
  const view = result.view;
  view.run();
});

// Visualization 4: Custom Story Visualization
const vlSpec6 = vl
  .markBar({ color: 'orange' })
  .data(data)
  //Used AI too aggregate because it wasn't working
  .transform([
    {
      aggregate: [
        { op: 'distinct', field: 'Platform', as: 'Total_Platforms' }
      ],
      groupby: ['Publisher']
    },
    {
      filter: 'datum.Total_Platforms > 10'
    }
  ])
  .encode(
    vl.x().fieldQ('Total_Platforms').title('Total Number of Platforms'),
    vl.y().fieldN('Publisher').sort('-x'),
    vl.tooltip([
      { field: 'Total_Platforms', title: 'Number of Platforms' }
    ])
  )
  .width(600)
  .height(600)
  .toSpec();
  
  vegaEmbed("#chart6", vlSpec6).then((result) => {
    const view = result.view;
    view.run();
  });
   
  }
  
  // Call render to create all the charts
  render();
  
  
