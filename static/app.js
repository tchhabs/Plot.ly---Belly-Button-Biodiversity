d3.json("../data/samples.json").then(function(data)

{console.log(data)

    var sample_values_all = data.samples[0].sample_values;
    var sample_values = sample_values_all.filter(function(d,i) {return i<10}).reverse();
    console.log(sample_values);
    
    var otu_ids_all = data.samples[0].otu_ids;
    var otu_ids = otu_ids_all.filter(function(d,i) {return i<10}).reverse();
    for (var i=0;i<10;i++){
        otu_ids[i] = "OTU " + otu_ids[i]        
    }
    console.log(otu_ids);
    
    var otu_labels_all = data.samples[0].otu_labels;
    var otu_labels = otu_labels_all.filter(function(d,i) {return i<10}).reverse();
    console.log(otu_labels);

    // horizontal bar graph
    var trace = {
        x: sample_values,
        y: otu_ids,
        type: "bar",
        orientation: "h",
        text: otu_labels
    };
    var bar_data_init = [trace];
    Plotly.newPlot("bar", bar_data_init);

    // bubble chart
    var trace1 = {
        x: otu_ids_all,
        y: sample_values_all,
        mode: 'markers',
        marker: {
          size: sample_values_all,
          color: otu_ids_all
        },
        text: otu_labels_all,
      };
    var bubble_data_init = [trace1];
    Plotly.newPlot("bubble", bubble_data_init);

    // metadata table
    var table_key = Object.keys(data.metadata[0]);
    var table_value = Object.values(data.metadata[0]);
    var table_pair = [];
    for (var i = 0; i < table_key.length; i++) {
      table_pair.push(table_key[i] + ": " + table_value[i]);
      document.getElementById('sample-metadata').innerHTML += '<br>' + table_pair[i];
    }
    console.log(table_pair);
});

//Dropdown
var selectDropdown = d3.select("#selDataset");


function addOptions() {
    d3.json("../data/samples.json").then(function(data) {

        data.names.forEach((name, i) => {
            var appendOption = selectDropdown.append("option").text(name).attr('value', i);
        });
    });
}

addOptions();

d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly() {
  var selectDropdown = d3.select("#selDataset");
  var dataset = selectDropdown.property("value");
  d3.json("../data/samples.json").then(function(data){

    for (var i = 0; i < 153; i++) {
    
      if (dataset === (i.toString())) {

        var otu_labels_all = data.samples[i].otu_labels;
        var otu_labels = otu_labels_all.filter(function(d,i) {return i<10}).reverse();
        console.log(otu_labels_all);
        
        var sample_values_all = data.samples[i].sample_values;
        var sample_values = sample_values_all.filter(function(d,i) {return i<10}).reverse();
        console.log(sample_values);
        
        var otu_ids_all = data.samples[i].otu_ids;
        var otu_ids = otu_ids_all.filter(function(d,i) {return i<10}).reverse();
        for (var j=0;j<10;j++){
            otu_ids[j] = "OTU " + otu_ids[j]        
        }
        console.log(otu_ids);
        
        var table_key = Object.keys(data.metadata[i]);
        var table_value = Object.values(data.metadata[i]);


        break;
      }
    }

    var trace = {
      x: sample_values,
      y: otu_ids,
      type: "bar",
      orientation: "h",
      text: otu_labels
    };

// bar chart
    var bar_data_init = [trace];
    Plotly.newPlot("bar", bar_data_init);
    
// bubble chart
    var trace1 = {
      x: otu_ids_all,
      y: sample_values_all,
      mode: 'markers',
      marker: {
        size: sample_values_all,
        color: otu_ids_all
      },
      text: otu_labels_all,
    };
    var bubble_data_init = [trace1];
    Plotly.newPlot("bubble", bubble_data_init);

    // metadata table
    var table_pair = [];
    document.getElementById('sample-metadata').innerHTML = "";
      for (var k = 0; k < table_key.length; k++) {
        table_pair.push(table_key[k] + ": " + table_value[k]);
        document.getElementById('sample-metadata').innerHTML += '<br>' + table_pair[k];
      }



  })
}
