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

    var trace = {
        x: sample_values,
        y: otu_ids,
        type: "bar",
        orientation: "h",
        text: otu_labels
    };
    var bar_data_init = [trace];
    Plotly.newPlot("bar", bar_data_init);

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

    var table_key = Object.keys(data.metadata[0]);
    var table_value = Object.values(data.metadata[0]);
    var table_pair = [];
    for (var i = 0; i < table_key.length; i++) {
      table_pair.push(table_key[i] + ": " + table_value[i]);
      document.getElementById('sample-metadata').innerHTML += '<br>' + table_pair[i];
    }
    console.log(table_pair);

});

