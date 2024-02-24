let countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
let educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';

let countyData;
let educationData;

let canvas = d3.select('#canvas');

let drawMap = () => {
	canvas
		.selectAll('path')
		.data(countyData)
		.enter()
		.append('path')
		.attr('d', d3.geoPath())
		.attr('class', 'county')
		.attr('fill', (countyDataItem) => {
			let id = countyDataItem.id;
			let county = educationData.find((item) => {
				return item.fips === id;
			});
			let percentege = county.bachelorsOrHigher;
			if (percentege <= 5) {
				return '#FFF3F1';
			} else if (percentege <= 10) {
				return '#FEDDD6';
			} else if (percentege <= 15) {
				return '#FFC3B8';
			} else if (percentege <= 20) {
				return '#FFA89A';
			} else if (percentege <= 25) {
				return '#FE8976';
			} else if (percentege <= 30) {
				return '#FE8976';
			} else if (percentege <= 35) {
				return '#FE6C58';
			} else if (percentege <= 40) {
				return '#EE4E3A';
			} else if (percentege <= 45) {
				return '#E14130';
			} else if (percentege <= 50) {
				return '#D33324';
			} else if (percentege <= 55) {
				return '#C62415';
			} else if (percentege <= 60) {
				return '#B60D01';
			} else if (percentege <= 65) {
				return '#A00901';
			} else if (percentege <= 70) {
				return '#860601';
			} else {
				return '#6B0400';
			}
		})
		.attr('data-fips', (countyDataItem) => {
			return countyDataItem.id;
		})
		.attr('data-education', (countyDataItem) => {
			let id = countyDataItem.id;
			let county = educationData.find((item) => {
				return item.fips === id;
			});
			let percentege = county.bachelorsOrHigher;
			return percentege;
		});
};

// Fetch JSON Data
d3.json(countyURL).then((data, error) => {
	if (error) {
		console.log(error);
	} else {
		countyData = topojson.feature(data, data.objects.counties).features;
		console.log(countyData);

		d3.json(educationURL).then((data, error) => {
			if (error) {
				console.log(error);
			} else {
				educationData = data;
				console.log(educationData);
				drawMap();
			}
		});
	}
});
