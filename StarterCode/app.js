// Place url in constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let jsonData; 

d3.json(url).then(function(data) {
    jsonData = data; 
    
    // Call the initialize function after fetching the data
    init();
});

function init() {

    let dropdownMenu = d3.select("#selDataset")

    let names = jsonData.names;
    
    names.forEach((id) => {

        dropdownMenu.append("option").text(id).property("value", id)
    });

    let sample_one = names[0]

    buildBarChart(sample_one)
    buildBubbleChart(sample_one)
    buildMetadata(sample_one)
    optionChanged(sample_one)

    dropdownMenu.on("change", function() {
        let selectedValue = d3.select("#selDataset").property("value");
        optionChanged(selectedValue);
    });
};

function buildBarChart(id) {

    // Retrieve all the data
    let sample = jsonData.samples.find(result => result.id === id); 

    //Get the data needed for the bar chart
    let sample_values = sample.sample_values
    let otu_ids = sample.otu_ids
    let otu_labels = sample.otu_labels    
    
    //Set items to display
    let xticks = sample_values.slice(0,10).reverse();
    let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse()
    let labels = otu_labels.slice(0,10).reverse()

    //Set up trace for the bar chart
    let trace = {
        x: xticks,
        y: yticks,
        text: labels,
        type: "bar",
        orientation: "h"
    };

    //Setup the layout
    let layout = {
        title: "Top 10 OTUs found"
    };

    //Plot the bar chart using Plotly
    Plotly.newPlot("bar", [trace], layout)
};

function buildBubbleChart(id) {

    // Retrieve all the data
    let sample = jsonData.samples.find(result => result.id === id); 

    //Get the data needed for the bar chart
    let sample_values = sample.sample_values
    let otu_ids = sample.otu_ids
    let otu_labels = sample.otu_labels

    //Set up trace for the bar chart
    let trace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
        }
    };

    // Set up the layout
    let layout = {
        title: "Bacteria Per Sample",
        hovermode: "closest",
        xaxis: {title: "OTU ID"}
    };

    //Plot the bar chart using Plotly
    Plotly.newPlot("bubble", [trace], layout)
};

function buildMetadata(id) {

    data = jsonData.metadata

    let value = data.find(result => result.id == id)

    sample = data[0]

    d3.select("#sample-metadata").html("");

   Object.entries(value).forEach(([key,value]) => {

            d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
        });

};

// Function that updates dashboard when sample is changed
function optionChanged(value) { 

    // Call all functions 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    
};