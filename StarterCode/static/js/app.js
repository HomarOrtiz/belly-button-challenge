// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

//Initialize app
function init() {
    //Select id for dropdown meny
    let dropdownMenu = d3.select("#selDataset");

    //Get sample names to populate drop-down selector
    d3.json(url).then((data) => {

        //Set variable for the names of the samples
        let names = data.names;

        //Add samples to dropdown menu
        names.forEach((id) => {

            //Log the value of id for each iteration of the loop
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
    });

        let sample_one = names[0];

        console.log(sample_one)

        buildGaugeChart(sample);
    });

};