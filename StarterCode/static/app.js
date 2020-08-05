d3.json("../samples.json").then(function(data)

{
    console.log(data); 

    var trace1 = {
        x: data.sample_values,
        y: data.otu_ids,
        type: "bar",
        orientation: "h"
    };
    var data = [trace1];

    var layout = {
        title: "Belly Button Biodiversity",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };
    Plotly.newPlot("plot", data, layout);
});